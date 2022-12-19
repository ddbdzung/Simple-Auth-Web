import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { DateTime } from 'luxon'

import { authAxios } from "../../../../configs/axios.mjs"
import { API } from "../../../../constants/index.js"

export default function CustomerDetail() {
  const { id } = useParams()
  const [user, setUser] = useState()
  useEffect(() => {
    let mounted = true
    authAxios.get(`${API.USER.BASE}/${API.ADMIN}${API.USER.GET_CLIENT}/${id}`)
      .then(({ data }) => {
        if (mounted) {
          setUser(data.data)
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
          <NavLink to="/admin/customer">Khách hàng</NavLink>
        </span>
      </div>
      <div className="tablet:ml-60 font-semibold mb-2">
        Thông tin khách hàng
      </div>
      <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-3" >
        <div>
          <label htmlFor="username">Họ và tên</label>
          <input type="text" id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={user?.username || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="email">Địa chỉ email</label>
          <input type="text" id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={user?.email || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="phoneNumber">Số điện thoại</label>
          <input type="text" id="phoneNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={user?.phoneNumber || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="gender">Giới tính</label>
          <input type="text" id="gender"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={user?.gender || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="status">Trạng thái</label>
          <input type="text" id="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={user?.status || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="createdAt">Khởi tạo lúc</label>
          <input type="text" id="createdAt"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={DateTime.fromMillis(Date.parse(user?.createdAt))
              .setLocale('vi')
              .toFormat('dd/LL/yyyy-hh:mm:ss') || ''}
            disabled />
        </div>
        <div className="tablet:col-start-3">
          <label htmlFor="updatedAt">Cập nhật lúc</label>
          <input type="text" id="updatedAt"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={DateTime.fromMillis(Date.parse(user?.updatedAt))
              .setLocale('vi')
              .toFormat('dd/LL/yyyy-hh:mm:ss') || ''}
            disabled />
        </div>
      </div >
      <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-2">
        <div className="tablet:row-start-2 tablet:col-start-2">
          <label htmlFor="address">Địa chỉ</label>
          <textarea type="text" id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={user?.address || ''}
            disabled></textarea>
        </div>
      </div>
    </>
  )
}
