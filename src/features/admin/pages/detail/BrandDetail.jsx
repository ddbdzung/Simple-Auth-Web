import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"

import { authAxios } from "../../../../configs/axios.mjs"
import { API } from "../../../../constants/index.js"

export default function BrandDetail() {
  const { id } = useParams()
  const [brand, setBrand] = useState()
  useEffect(() => {
    let mounted = true
    authAxios.get(`${API.BRAND.BASE}/${API.BRAND.GET_BRAND}/${id}`)
      .then(({ data }) => {
        if (mounted) {
          setBrand(data.data)
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
          <NavLink to="/admin/brand">Thương hiệu</NavLink>
        </span>
      </div>
      <div className="tablet:ml-60 font-semibold mb-2">
        Thông tin
      </div>
      <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-3" >
        <div>
          <label htmlFor="name">Tên thương hiệu</label>
          <input type="text" id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={brand?.name || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="link">Đường dẫn gốc</label>
          <input type="text" id="link"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={brand?.link || ''}
            disabled />
        </div>
      </div >
    </>
  )
}
