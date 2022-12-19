import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { Image } from "cloudinary-react";

import { authAxios } from "../../../../configs/axios.mjs"
import { API } from "../../../../constants/index.js"
import formatCurrencyVND from "../../../../helpers/formatCurrencyVND.js"
import { pricePerProduct } from "../../../public/Cart.jsx";

const getStatusTransaction = status => {
  if (status === '-1') {
    return 'Đã hủy ❌'
  } else if (status === '0') {
    return 'Chưa paid 🤑'
  } else if (status === '1') {
    return 'Đã paid ✅'
  } else {
    return ''
  }
}

export default function OrderDetail() {
  const { id } = useParams()
  const [transaction, setTransaction] = useState()
  const [orderList, setOrderList] = useState()

  useEffect(() => {
    let mounted = true
    authAxios.get(`${API.TRANSACTION.BASE}/${API.ADMIN}/${API.TRANSACTION.GET_TRANSACTION}${id}`)
      .then(({ data }) => {
        if (mounted) {
          setTransaction(data.data.transaction)
          setOrderList(data.data.orderList)
        }
      })

    return () => mounted = false
  }, [])


  return (
    <>
      {/* Navigation */}
      <div className="tablet:ml-60 mb-2">
        <span className="text-black font-medium text-sm">
          <NavLink to="/admin">Trang chủ</NavLink>
          {' / '}
          <NavLink to="/admin/order">Đơn hàng</NavLink>
        </span>
      </div>
      <div className="tablet:ml-60 font-semibold mb-2">
        Thông tin giao dịch
      </div>
      <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-3" >
        <div>
          <label htmlFor="username">Tên người mua</label>
          <input type="text" id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={transaction?.username || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="userEmail">Địa chỉ email</label>
          <input type="text" id="userEmail"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={transaction?.userEmail || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="userPhone">Số điện thoại</label>
          <input type="text" id="userPhone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={transaction?.userPhone || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="totalAmount">Tổng giá trị đơn hàng</label>
          <input type="text" id="totalAmount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formatCurrencyVND(transaction?.totalAmount) || formatCurrencyVND(0)}
            disabled />
        </div>
        <div>
          <label htmlFor="status">Trạng thái đơn hàng</label>
          <input type="text" id="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={getStatusTransaction(transaction?.status) || ''}
            disabled />
        </div>
      </div >
      <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-2">
        <div>
          <label htmlFor="userAddress">Địa chỉ người nhận</label>
          <textarea type="text" id="userAddress"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={transaction?.userAddress || ''}
            disabled></textarea>
        </div>
        <div>
          <label htmlFor="note">Ghi chú</label>
          <textarea type="text" id="note"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={transaction?.note || ''}
            disabled></textarea>
        </div>
      </div>
      <div className="tablet:ml-60 font-semibold my-4">
        Thông tin đơn hàng
      </div>
      <div className="tablet:ml-60 mt-4">
        <div className="clear-both border-2 overflow-auto h-[27rem]">
          <table className="text-center">
            <thead className="border-b-2 border-slate-300">
              <tr>
                <th className="tablet:min-w-[2rem] px-2">STT</th>
                <th className="tablet:min-w-[8rem]">Ảnh</th>
                <th className="tablet:min-w-[20rem]">Sản phẩm</th>
                <th className="tablet:min-w-[6rem]">Đơn giá</th>
                <th className="tablet:min-w-[6rem]">Giảm giá</th>
                <th className="tablet:min-w-[6rem]">Số lượng</th>
                <th className="tablet:w-full">Tổng tiền</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orderList && (orderList?.length > 0) &&
                <>
                  {orderList?.map((item, idx) => (
                    <tr key={idx} className="border-b-2 last:border-b-0">
                      <td>
                        <span>{idx + 1}</span>
                      </td>
                      <td className="py-2">
                        <NavLink to="#">
                          <Image
                            className="max-h-36"
                            cloudName="dbbifu1w6"
                            publicId={item?.productId?.imageLink}
                            crop="scale"
                          />
                        </NavLink>
                      </td>
                      <td>
                        <p className="font-bold">
                          <a href="#" className="text-[0.9rem]">
                            {item?.productId?.name}
                          </a>
                        </p>
                      </td>
                      <td>
                        <p className="text-base">{formatCurrencyVND(item?.price)}</p>
                      </td>
                      <td>
                        <p className="text-base">{`${(item?.discount > 0) ? item?.discount + ' %' : '0 %'}`}</p>
                      </td>
                      <td>
                        <p className="text-base">{item?.amount}</p>
                      </td>
                      <td>
                        <p className="text-base">{formatCurrencyVND(pricePerProduct(item?.price, item?.amount, item?.discount))}</p>
                      </td>
                    </tr>
                  ))}
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
