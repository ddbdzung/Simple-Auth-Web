import ModalImage from "react-modal-image";
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"

import { authAxios } from "../../../../configs/axios.mjs"
import { API } from "../../../../constants/index.js"
import formatCurrencyVND from "../../../../helpers/formatCurrencyVND.js"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState()
  useEffect(() => {
    let mounted = true
    authAxios.get(`${API.PRODUCT.BASE}/${API.ADMIN}/${API.PRODUCT.GET_PRODUCT}${id}`)
      .then(({ data }) => {
        if (mounted) {
          setProduct(data.data)
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
          <NavLink to="/admin/product">Sản phẩm</NavLink>
        </span>
      </div>
      <div className="tablet:ml-60 font-semibold mb-2">
        Thông tin chung
      </div>
      <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-3" >
        <div>
          <label htmlFor="name">Tên sản phẩm</label>
          <input type="text" id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.name || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="price">Giá tiền</label>
          <input type="text" id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formatCurrencyVND(product?.price) || formatCurrencyVND(0)}
            disabled />
        </div>
        <div>
          <label htmlFor="discount">Giảm giá (%)</label>
          <input type="text" id="discount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.discount || 0}
            disabled />
        </div>
        <div>
          <label htmlFor="quantity">Số lượng</label>
          <input type="text" id="quantity"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.quantity || 0}
            disabled />
        </div>
        <div>
          <label htmlFor="warranty">Bảo hành (tháng)</label>
          <input type="text" id="warranty"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.warranty || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="brand">Hãng sản xuất</label>
          <input type="text" id="brand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.brandId?.name || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="catalog">Danh mục hàng</label>
          <input type="text" id="catalog"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.catalogId?.name || ''}
            disabled />
        </div>
      </div >
      <div className="tablet:ml-60 font-semibold my-4">
        Thông số
      </div>
      <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-3">
        <div>
          <label htmlFor="view">Lượt xem</label>
          <input type="text" id="view"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.view || 0}
            disabled />
        </div>
        <div>
          <label htmlFor="ram">RAM (GB)</label>
          <input type="text" id="ram"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.ram || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="rom">ROM (GB)</label>
          <input type="text" id="rom"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.rom || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="battery">Thời lượng pin (mAh)</label>
          <input type="text" id="battery"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.battery || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="screensize">Kích thước màn hình (inch)</label>
          <input type="text" id="screensize"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.screensize || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="screenType">Công nghệ màn hình</label>
          <input type="text" id="screenType"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.screenType || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="cpu">CPU</label>
          <input type="text" id="cpu"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.cpu || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="gpu">GPU</label>
          <input type="text" id="gpu"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.gpu || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="color">Màu sắc</label>
          <input type="text" id="color"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.color || ''}
            disabled />
        </div>
        <div>
          <label htmlFor="release">Ngày ra mắt</label>
          <input type="text" id="release"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.release || ''}
            disabled />
        </div>
      </div>
      <div className="tablet:ml-60 font-semibold my-4">
        Chi tiết
      </div>
      <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-2">
        <div>
          <label htmlFor="description">Mô tả ngắn</label>
          <textarea type="text" id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.description || ''}
            disabled></textarea>
        </div>
        <div>
          <label htmlFor="bonus">Quà tặng kèm</label>
          <textarea type="text" id="bonus"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product?.bonus || ''}
            disabled></textarea>
        </div>
      </div>
      <div className="tablet:ml-60 font-semibold my-4">
        Ảnh chính
      </div>
      <div className="tablet:ml-60">
        <div>
          <ModalImage
            small={`https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale/v1/${product?.imageLink || ''}`}
            medium={`https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale/v1/${product?.imageLink || ''}`}
            large={`https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale,w_1700/v1/${product?.imageLink || ''}`}
            alt="Ảnh chính"
          />
        </div>
      </div>
      <div className="tablet:ml-60 font-semibold my-4">
        Ảnh phụ
      </div>
      <div className="tablet:ml-60 gap-2 tablet:grid tablet:grid-cols-3">
        {product?.imageList?.length > 0 &&
          product?.imageList.map((imageLink, idx) => (
            <div key={idx}>
              <ModalImage
                small={`https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale/v1/${imageLink || ''}`}
                medium={`https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale/v1/${imageLink || ''}`}
                large={`https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale,w_1700/v1/${imageLink || ''}`}
                alt={`Ảnh phụ ${idx}`}
              />
            </div>
          ))
        }
      </div>
    </>
  )
}
