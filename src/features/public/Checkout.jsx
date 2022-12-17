import { Image } from "cloudinary-react";
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import _, { throttle } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Brand from "../../components/Brand";
import { API, GIGABYTE, MILIAMPEHOUR } from "../../constants";
import { customAxios } from "../../helpers/customAxios";
import formatCurrencyVND from "../../helpers/formatCurrencyVND";
import { checkoutAsync } from "./publicSlice";
import TextInput2 from "../../shared/custom/TextInput2";
import Textarea from "../../shared/custom/Textarea";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export default function Checkout() {
  const shipCost = 30000
  const dispatch = useDispatch()
  const { cart } = useSelector(store => store.public)
  const { id: userId } = useSelector(store => store.auth)

  const idList = useMemo(() => {
    return cart.map(item => item.id)
  }, [cart])
  const [cartList, setCartList] = useState()

  const mapAmountToCartList = useCallback((cart, cartList) => cartList?.map(item => {
    const { amount } = _.find(cart, i => i.id === item._id)
    return { ...item, amount }
  }), [idList])

  const pricePerProduct = (price, amount, discount = 0) => {
    return price * amount * (100 - discount) / 100
  }

  const totalAmountTransaction = (cartList, shipCost) => {
    let list = (!Array.isArray(cartList)) ? [cartList] : cartList

    const result = list.reduce((accumulator, currentItem) => {
      const pricePerProd = pricePerProduct(currentItem?.price, currentItem?.amount, currentItem?.discount)
      return accumulator + pricePerProd
    }, 0)

    return result + shipCost
  }

  const getOverviewProduct = item => {
    return `RAM: ${item?.ram ?? ''} ${GIGABYTE} | ROM: ${item?.rom ?? ''} ${GIGABYTE} | Màu: ${item?.color} | Pin: ${item?.battery ?? ''} ${MILIAMPEHOUR}`
  }

  useEffect(() => {
    let mounted = true
    customAxios.post(`${API.PRODUCT.BASE}/${API.CLIENT}${API.PRODUCT.GET_PRODUCTS}`, {}, { idList })
      .then(({ data }) => {
        if (mounted) {
          setCartList(mapAmountToCartList(cart, data.data))
        }
      })

    return () => mounted = false
  }, [idList])

  const throttleWrapper = throttle(async (values, _actions, dispatch) => {
    const data = values
    data.totalAmount = totalAmountTransaction(cartList, shipCost)
    const checkoutCart = cartList.map(item => ({ id: item?._id, amount: item?.amount, price: item?.price, discount: item?.discount }))
    data.cart = checkoutCart

    dispatch(checkoutAsync(data))
  }, 3000, { trailing: false })

  return (
    <>
      <Brand />

      <Formik enableReinitialize={true}
        initialValues={{
          username: '',
          userEmail: '',
          userPhone: '',
          userId: userId ?? null,
          userAddress: '',
          note: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required('Yêu cầu không được bỏ trống'),
          userEmail: Yup.string()
            .required('Yêu cầu không được bỏ trống')
            .email('Địa chỉ email phải hợp lệ'),
          userPhone: Yup.string()
            .required('Yêu cầu không được bỏ trống')
            .matches(phoneRegExp, 'Số điện thoại phải hợp lệ'),
          note: Yup.string()
            .max(512, 'Tối đa 512 kí tự'),
          userAddress: Yup.string()
            .required('Yêu cầu không được bỏ trống')
            .max(512, 'Tối đa 512 kí tự'),
          userId: Yup.string(),
        })}
        onSubmit={(values, actions) => {
          throttleWrapper(values, actions, dispatch)
        }}
      >
        <Form className="my-4">
          <div className="text-xl font-semibold mb-2">
            Thanh toán
          </div>
          <div className="gap-8 mx-4 tablet:mx-0 tablet:grid tablet:grid-cols-3" >
            <div>
              <label htmlFor="username">Họ tên người nhận</label>
              <TextInput2 type="text" id="username" name="username" />
            </div>
            <div>
              <label htmlFor="userEmail">Địa chỉ email</label>
              <TextInput2 type="text" id="userEmail" name="userEmail" />
            </div>
            <div>
              <label htmlFor="userPhone">Số điện thoại liên hệ</label>
              <TextInput2 type="text" id="userPhone" name="userPhone" />
            </div>
          </div >
          <div className="gap-8 mx-4 tablet:mx-0 tablet:grid tablet:grid-cols-2" >
            <div>
              <label htmlFor="userAddress">Địa chỉ người nhận</label>
              <Textarea type="text" id="userAddress" name="userAddress" />
            </div>
            <div>
              <label htmlFor="note">Ghi chú đơn hàng</label>
              <Textarea type="text" id="note" name="note" />
            </div>
          </div>
          <div>
            <TextInput2 type="hidden" id="userId" name="userId" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 mr-4 block bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
              Thanh toán
            </button>
          </div>
        </Form>
      </Formik>

      <div className="my-4">
        <div className="clear-both border-2 border-slate-300 overflow-auto h-[27rem]">
          <table className="text-center">
            <thead className="border-b-2">
              <tr>
                <th className="tablet:min-w-[2rem] p-2">STT</th>
                <th className="tablet:min-w-[8rem] py-2">Ảnh</th>
                <th className="tablet:min-w-[20rem] py-2">Sản phẩm</th>
                <th className="tablet:min-w-[6rem] py-2">Đơn giá</th>
                <th className="tablet:min-w-[6rem] py-2">Giảm giá</th>
                <th className="tablet:min-w-[6rem] py-2">Số lượng</th>
                <th className="tablet:w-full">Tổng tiền</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {cartList && (cartList?.length > 0)
                &&
                <>
                  {cartList?.map((item, idx) => (
                    <tr key={idx} className="border-b-2 last:border-b-0 text-base">
                      <td>
                        <span>{idx + 1}</span>
                      </td>
                      <td className="py-2">
                        <NavLink to="#">
                          <Image
                            className="max-h-36"
                            cloudName="dbbifu1w6"
                            publicId={item?.imageLink}
                            crop="scale"
                          />
                        </NavLink>
                      </td>
                      <td>
                        <p className="font-bold">
                          <a href="#" className="text-[0.9rem]">
                            {item?.name}
                          </a>
                        </p>
                        <p className="text-left text-[0.85rem]">
                          {getOverviewProduct(item)}
                        </p>
                      </td>
                      <td>
                        <p>{formatCurrencyVND(item?.price)}</p>
                      </td>
                      <td>
                        <p>{`${(item?.discount > 0) ? item?.discount + ' %' : '0 %'}`}</p>
                      </td>
                      <td>
                        <p>{cart.find(x => x.id === item._id)?.amount ?? 0}</p>
                      </td>
                      <td>
                        <p>{formatCurrencyVND(pricePerProduct(item?.price, item?.amount, item?.discount))}</p>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-[3px] border-b-[3px] border-slate-300 font-semibold">
                    <td className="py-2" colSpan={6}>Tổng giá trị đơn hàng</td>
                    <td className="py-2">{formatCurrencyVND(totalAmountTransaction(cartList, shipCost))}</td>
                  </tr>
                  <tr colSpan="" className="border-t-[3px] border-b-[3px] border-slate-300 font-semibold">
                    <td className="py-2" colSpan={6}>Phương thức thanh toán</td>
                    <td className="py-2">COD</td>
                  </tr>
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
