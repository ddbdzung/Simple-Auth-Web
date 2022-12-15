import { Image } from "cloudinary-react";
import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Brand from "../../components/Brand";
import { API, GIGABYTE, MILIAMPEHOUR } from "../../constants";
import { customAxios } from "../../helpers/customAxios";
import formatCurrencyVND from "../../helpers/formatCurrencyVND";
import { decreaseItemInCart, increaseItemInCart, removeItemInCart } from "./publicSlice";

export default function Cart() {
  const shipCost = 30000
  const dispatch = useDispatch()
  const { cart } = useSelector(store => store.public)

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

  const totalAmount = (cartList, shipCost) => {
    let list = (!Array.isArray(cartList)) ? [cartList] : cartList

    const result = list.reduce((accumulator, currentItem) => {
      const pricePerProd = pricePerProduct(currentItem?.price, currentItem?.amount, currentItem?.discount)
      return accumulator + pricePerProd
    }, 0)

    return result + shipCost
  }

  const originalAmount = cartList => {
    let list = (!Array.isArray(cartList)) ? [cartList] : cartList

    return list.reduce((accumulator, currentItem) => {
      return accumulator + pricePerProduct(currentItem?.price, currentItem?.amount)
    }, 0)
  }

  const totalDiscount = cartList => {
    let list = (!Array.isArray(cartList)) ? [cartList] : cartList

    return list.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem?.price * currentItem?.amount * currentItem?.discount / 100)
    }, 0)
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

  const handleIncreaseItem = (idItem) => {
    if (!idItem) return

    dispatch(increaseItemInCart({ id: idItem }))
  }

  const handleDecreaseItem = (idItem) => {
    if (!idItem) return

    dispatch(decreaseItemInCart({ id: idItem }))
  }

  const handleRemoveItem = (idItem) => {
    if (!idItem) return

    dispatch(removeItemInCart({ id: idItem }))
  }

  return (
    <>
      <Brand />
      <div className="mt-4">
        <div className="clear-both border-2 overflow-auto h-[27rem]">
          <table className="text-center">
            <thead className="border-b-2">
              <tr>
                <th className="tablet:min-w-[2rem] px-2">STT</th>
                <th className="tablet:min-w-[8rem]">Ảnh</th>
                <th className="tablet:min-w-[20rem]">Sản phẩm</th>
                <th className="tablet:min-w-[6rem]">Đơn giá</th>
                <th className="tablet:min-w-[6rem]">Giảm giá</th>
                <th className="tablet:min-w-[6rem]">Số lượng</th>
                <th className="tablet:w-full">Tổng tiền</th>
                <th className="tablet:min-w-[6rem]">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {cartList && (cartList?.length > 0)
                ?
                <>
                  {cartList?.map((item, idx) => (
                    <tr key={idx} className="border-b-2 last:border-b-0">
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
                        <p className="text-base">{formatCurrencyVND(item?.price)}</p>
                      </td>
                      <td>
                        <p className="text-base">{`${(item?.discount > 0) ? item?.discount + ' %' : '0 %'}`}</p>
                      </td>
                      <td>
                        <div className="flex flex-col justify-center items-center w-full">
                          <input
                            type="button"
                            defaultValue="+"
                            onClick={e => handleIncreaseItem(item?._id)}
                            className="inline-flex items-center justify-center btn hover:text-[#212529] hover:bg-[#e2e6ea] hover:border-[#dae0e5] hover:cursor-pointer"
                          />
                          <input
                            type="text"
                            className="my-2 text-center w-1/3"
                            value={cart.find(x => x.id === item._id)?.amount ?? 0}
                            readOnly
                          />
                          <input
                            type="button"
                            defaultValue="-"
                            className="inline-flex items-center justify-center btn hover:text-[#212529] hover:bg-[#e2e6ea] hover:border-[#dae0e5] hover:cursor-pointer"
                            onClick={e => handleDecreaseItem(item?._id)}
                          />
                        </div>
                      </td>
                      <td>
                        <p className="text-base">{formatCurrencyVND(pricePerProduct(item?.price, item?.amount, item?.discount))}</p>
                      </td>
                      <td>
                        <a onClick={e => handleRemoveItem(item?._id)} className="font-semibold inline-flex items-center justify-center btn hover:text-[#212529] hover:bg-[#e2e6ea] hover:border-[#dae0e5] hover:cursor-pointer">
                          Xóa
                        </a>
                      </td>
                    </tr>
                  ))}
                </>
                :
                <tr>
                  <td colSpan="8" rowSpan="2" className="text-md pt-4">Không có món hàng nào trong giỏ</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-row-reverse mt-2">
        <div className="w-full tablet:w-1/2 shadow p-3 mb-5 rounded-xl">
          {cartList && (cartList?.length > 0)
            ?
            <>
              <div>
                <div>
                  <span>Giá gốc:</span>
                  <span className="float-right">{formatCurrencyVND(originalAmount(cartList))}</span>
                </div>
                <div>
                  <span>Giảm giá:</span>
                  <span className="float-right">{`- ${formatCurrencyVND(totalDiscount(cartList))}`}</span>
                </div>
                <div>
                  <span>Giá sau khi giảm:</span>
                  <span className="float-right">{`${formatCurrencyVND(originalAmount(cartList) - totalDiscount(cartList))}`}</span>
                </div>
                <div>
                  <span>Phí vận chuyển:</span>
                  <span className="float-right">{`+ ${formatCurrencyVND(shipCost)}`}</span>
                </div>
                <div>
                  <span>Tổng tiền:</span>
                  <span className="float-right">{`= ${formatCurrencyVND(totalAmount(cartList, shipCost)) ?? ''}`}</span>
                </div>
              </div>
            </>
            :
            <>
              <div>
                <div>
                  <span>Giá gốc:</span>
                  <span className="float-right"></span>
                </div>
                <div>
                  <span>Giảm giá:</span>
                  <span className="float-right"></span>
                </div>
                <div>
                  <span>Giá sau khi giảm:</span>
                  <span className="float-right"></span>
                </div>
                <div>
                  <span>Phí vận chuyển:</span>
                  <span className="float-right"></span>
                </div>
                <div>
                  <span>Tổng tiền:</span>
                  <span className="float-right"></span>
                </div>
              </div>
            </>
          }
        </div>
      </div>

      <div className="flex flex-row-reverse mt-2">
        <div className="inline-flex items-center justify-center btn bg-[#007bff] hover:bg-[#0069d9] hover:border-[#dae0e5] hover:cursor-pointer">
          <NavLink to="/" className="text-white font-semibold" href="#">
            Tiếp tục mua sắm
          </NavLink>
        </div>
      </div>
    </>
  )
}
