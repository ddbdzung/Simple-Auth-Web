import { Image } from "cloudinary-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Brand from "../../components/Brand";
import { authAxios } from "../../configs/axios.mjs";
import { API, GIGABYTE, MILIAMPEHOUR } from "../../constants";
import formatCurrencyVND from "../../helpers/formatCurrencyVND";

export default function Cart() {
  const pricePerProduct = (price, quantity, discount = 0) => {
    return price * quantity * (100 - discount) / 100
  }

  const shipCost = 30000

  const totalAmount = (cartList, shipCost) => {
    let list = (!Array.isArray(cartList)) ? [cartList] : cartList

    const result = list.reduce((accumulator, currentItem) => {
      const pricePerProd = pricePerProduct(currentItem?.price, currentItem?.quantity, currentItem?.discount)
      return accumulator + pricePerProd
    }, 0)

    return result + shipCost
  }

  const originalAmount = cartList => {
    let list = (!Array.isArray(cartList)) ? [cartList] : cartList

    return list.reduce((accumulator, currentItem) => {
      return accumulator + pricePerProduct(currentItem?.price, currentItem?.quantity)
    }, 0)
  }

  const totalDiscount = cartList => {
    let list = (!Array.isArray(cartList)) ? [cartList] : cartList

    return list.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem?.price * currentItem?.quantity * currentItem?.discount / 100)
    }, 0)
  }

  const getOverviewProduct = item => {
    return `RAM: ${item?.ram ?? ''} ${GIGABYTE} | ROM: ${item?.rom ?? ''} ${GIGABYTE} | Màu: ${item?.color} | Pin: ${item?.battery ?? ''} ${MILIAMPEHOUR}`
  }

  const id = '6393bce4ee790d66c85cd187'
  const [cartList, setCartList] = useState()
  useEffect(() => {
    let mounted = true
    authAxios.get(`${API.PRODUCT.BASE}/${API.PRODUCT.GET_PRODUCT}/${id}`)
      .then(({ data }) => {
        if (mounted) {
          setCartList([data.data])
        }
      })

    return () => mounted = false
  }, [])
  return (
    <>
      <Brand />
      <div className="mt-4">
        <div className="clear-both border-2 overflow-x-auto">
          <table className="text-center">
            <thead className="border-b-2">
              <tr>
                <th className="tablet:min-w-[2rem] px-2">STT</th>
                <th className="tablet:min-w-[8rem]">Ảnh</th>
                <th className="tablet:min-w-[24rem]">Sản phẩm</th>
                <th className="tablet:min-w-[6rem]">Đơn giá</th>
                <th className="tablet:min-w-[6rem]">Giảm giá</th>
                <th className="tablet:min-w-[6rem]">Số lượng</th>
                <th className="tablet:w-full">Tổng tiền</th>
                <th className="tablet:min-w-[6rem]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cartList && cartList?.map((item, idx) => (
                <tr key={item?._id} className="border-b-2 last:border-b-0">
                  <td>
                    <span>{idx + 1}</span>
                  </td>
                  <td className="py-2">
                    <NavLink to="#">
                      <Image
                        className="max-h-36"
                        cloudName="dbbifu1w6"
                        publicId="products/u9x7m9sslirjhzmgluuv"
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
                        className="inline-flex items-center justify-center btn hover:text-[#212529] hover:bg-[#e2e6ea] hover:border-[#dae0e5] hover:cursor-pointer"
                      />
                      <input
                        type="text"
                        className="my-2 text-center w-1/3"
                        name="quantity"
                      />
                      <input
                        type="button"
                        defaultValue="-"
                        className="inline-flex items-center justify-center btn hover:text-[#212529] hover:bg-[#e2e6ea] hover:border-[#dae0e5] hover:cursor-pointer"
                      />
                    </div>
                  </td>
                  <td>
                    <p className="text-base">{formatCurrencyVND(pricePerProduct(item?.price, item?.quantity))}</p>
                  </td>
                  <td>
                    <a onClick={e => { alert('helo') }} className="font-semibold inline-flex items-center justify-center btn hover:text-[#212529] hover:bg-[#e2e6ea] hover:border-[#dae0e5] hover:cursor-pointer">
                      Xóa
                    </a>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-row-reverse mt-2">
        <div className="inline-flex items-center justify-center btn bg-[#007bff] hover:bg-[#0069d9] hover:border-[#dae0e5] hover:cursor-pointer">
          <a className="text-white font-semibold" href="#">
            Cập nhật giỏ hàng
          </a>
        </div>
      </div>

      <div className="flex flex-row-reverse mt-2">
        <div className="w-full tablet:w-1/2 shadow p-3 mb-5 rounded-xl">
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
            <a className="float-right text-slate-600 font-bold mt-2 hover:text-black" href="#">
              Tiếp tục mua sắm
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
