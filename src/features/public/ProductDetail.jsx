import { Image } from 'cloudinary-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Slider from '../../components/Slider'
import { authAxios } from '../../configs/axios.mjs'
import { API, GIGABYTE, INCH, MILIAMPEHOUR, MONTH, VIEW } from '../../constants'
import formatCurrencyVND from '../../helpers/formatCurrencyVND'

const checkQuantityStatus = qty => (qty === 0) ? 'Hết hàng' : 'Còn hàng'

export default function ProductDetail(_props) {
  const [product, setProduct] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    let mounted = true
    authAxios.get(`${API.PRODUCT.BASE}/${API.PRODUCT.GET_PRODUCT}/${id}`)
      .then(({ data }) => {
        if (mounted) {
          setProduct(data.data)
        }
      })

    return () => mounted = false
  }, [])


  return (
    <>
      <section className="flex flex-col gap-2 p-4 tablet:p-8">
        <div className="pr-28">
          <h1 className="text-md tablet:text-lg laptop:text-xl font-semibold">
            {product?.name}
          </h1>
        </div>
        <div className="w-full h-fit tablet:flex tablet:flex-row tablet:justify-between">
          <div className="mx-4 my-2 tablet:basis-1/3 relative">
            <Image
              className="w-full h-full"
              cloudName="dbbifu1w6"
              publicId={product?.imageLink}
              crop="scale"
            />
            {/* Slide in mobile view */}
            <div className="tablet:hidden mt-4">
              <Slider subImg={product?.imageList} />
            </div>
          </div>

          {/* Info in min tablet view */}
          <div className="bg-slate-400 hidden tablet:block tablet:basis-2/3">
            <div className="p-2 bg-slate-400 hidden grid-cols-2 tablet:grid text-sm border-b-2 last:border-b-0 border-solid">
              <div>Tình trạng:{' '}
                <span className={`${(product?.quantity === 0) ? 'text-red-800}' : 'text-green-800'} font-semibold`}>
                  {checkQuantityStatus(product?.quantity)}
                </span>
              </div>
              <div>Giá tiền:{' '}
                <span className="text-red-800 font-semibold">
                  {formatCurrencyVND(product?.price)}
                </span>
              </div>
            </div>

            <div className="p-2 bg-slate-400 hidden grid-cols-2 tablet:grid text-sm border-b-2 last:border-b-0 border-solid">
              <div>RAM:{' '}
                <span className="text-red-800 font-semibold">
                  {`${product?.ram ?? ''} ${GIGABYTE}`}
                </span>
              </div>
              <div>ROM:{' '}
                <span className="text-red-800 font-semibold">
                  {`${product?.rom ?? ''} ${GIGABYTE}`}
                </span>
              </div>
            </div>

            <div className="p-2 bg-slate-400 hidden grid-cols-2 tablet:grid text-sm border-b-2 last:border-b-0 border-solid">
              <div>Công nghệ màn:{' '}
                <span className={`text-red-800 font-semibold`}>
                  {`${product?.screenType ?? ''}`}
                </span>
              </div>
              <div>Kích thước màn:{' '}
                <span className="text-red-800 font-semibold">
                  {`${product?.screensize ?? ''} ${INCH}`}
                </span>
              </div>
            </div>

            <div className="p-2 bg-slate-400 hidden grid-cols-2 tablet:grid text-sm border-b-2 last:border-b-0 border-solid">
              <div>Pin:{' '}
                <span className="text-red-800 font-semibold">
                  {`${product?.battery ?? ''} ${MILIAMPEHOUR}`}
                </span>
              </div>
              <div>Màu sắc:{' '}
                <span className="text-red-800 font-semibold">
                  {`${product?.color ?? ''}`}
                </span>
              </div>
            </div>

            <div className="p-2 bg-slate-400 hidden grid-cols-2 tablet:grid text-sm border-b-2 last:border-b-0 border-solid">
              <div>CPU:{' '}
                <span className="text-red-800 font-semibold">
                  {`${product?.cpu ?? ''}`}
                </span>
              </div>
              <div>GPU:{' '}
                <span className="text-red-800 font-semibold">
                  {`${product?.gpu ?? ''}`}
                </span>
              </div>
            </div>

            <div className="p-2 bg-slate-400 hidden grid-cols-2 tablet:grid text-sm border-b-2 last:border-b-0 border-solid">
              <div>Ngày ra mắt:{' '}
                <span className="text-red-800 font-semibold">
                  {`${product?.release ?? ''}`}
                </span>
              </div>
              <div>Thời gian bảo hành:{' '}
                <span className="text-red-800 font-semibold">
                  {`${product?.warranty ?? ''} ${MONTH}`}
                </span>
              </div>
            </div>

            <div className="p-2 bg-slate-400 hidden grid-cols-2 tablet:grid text-sm border-b-2 last:border-b-0 border-solid">
              <div>Hãng sản xuất:{' '}
                <span className="text-red-800 font-semibold">
                  {`${product?.brandId?.name ?? ''}`}
                </span>
              </div>
              <div>Số lượt xem:{' '}
                <span className="text-red-800 font-semibold">
                  {`${product?.view ?? ''} ${VIEW}`}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Slide in min tablet view */}
        <div className="hidden tablet:flex tablet:justify-between">
          <Slider subImg={product?.imageList} />
          <div className="basis-2/3 tablet:pl-6 tablet:py-2 laptop:py-0 text-md">
            {`Mô tả: ${product?.description}`}
          </div>
        </div>

        <div className="tablet:flex justify-center items-center hidden">
          <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Thêm vào giỏ hàng
          </button>
          <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Mua ngay
          </button>
        </div>
        {/* Info in mobile view */}
        <div className="w-full h-fit border-2 border-slate-300 tablet:hidden">
          <div className="p-2 bg-slate-400 grid grid-cols-2 tablet:hidden text-sm border-b-2 last:border-b-0  border-solid ">
            <div>Tình trạng:{' '}
              <span className={`${(product?.quantity === 0) ? 'text-red-800}' : 'text-green-800'} font-semibold`}>
                {checkQuantityStatus(product?.quantity)}
              </span>
            </div>
            <div>Giá tiền:{' '}
              <span className="text-red-800 font-semibold">
                {formatCurrencyVND(product?.price)}
              </span>
            </div>
          </div>


          <div className="p-2 bg-slate-400 grid grid-cols-2 tablet:hidden text-sm border-b-2 last:border-b-0 border-solid ">
            <div>RAM:{' '}
              <span className="text-red-800 font-semibold">
                {`${product?.ram ?? ''} ${GIGABYTE}`}
              </span>
            </div>
            <div>ROM:{' '}
              <span className="text-red-800 font-semibold">
                {`${product?.rom ?? ''} ${GIGABYTE}`}
              </span>
            </div>
          </div>

          <div className="p-2 bg-slate-400 grid grid-cols-2 tablet:hidden text-sm border-b-2 last:border-b-0  border-solid ">
            <div>Công nghệ màn:{' '}
              <span className={`text-red-800 font-semibold`}>
                {`${product?.screenType ?? ''}`}
              </span>
            </div>
            <div>Kích thước màn:{' '}
              <span className="text-red-800 font-semibold">
                {`${product?.screensize ?? ''} ${INCH}`}
              </span>
            </div>
          </div>

          <div className="p-2 bg-slate-400 grid grid-cols-2 tablet:hidden text-sm border-b-2 last:border-b-0  border-solid ">
            <div>Pin:{' '}
              <span className="text-red-800 font-semibold">
                {`${product?.battery ?? ''} ${MILIAMPEHOUR}`}
              </span>
            </div>
            <div>Màu sắc:{' '}
              <span className="text-red-800 font-semibold">
                {`${product?.color ?? ''}`}
              </span>
            </div>
          </div>

          <div className="p-2 bg-slate-400 grid grid-cols-2 tablet:hidden text-sm border-b-2 last:border-b-0  border-solid ">
            <div>CPU:{' '}
              <span className="text-red-800 font-semibold">
                {`${product?.cpu ?? ''}`}
              </span>
            </div>
            <div>GPU:{' '}
              <span className="text-red-800 font-semibold">
                {`${product?.gpu ?? ''}`}
              </span>
            </div>
          </div>

          <div className="p-2 bg-slate-400 grid grid-cols-2 tablet:hidden text-sm border-b-2 last:border-b-0  border-solid ">
            <div>Ngày ra mắt:{' '}
              <span className="text-red-800 font-semibold">
                {`${product?.release ?? ''}`}
              </span>
            </div>
            <div>Thời gian bảo hành:{' '}
              <span className="text-red-800 font-semibold">
                {`${product?.warranty ?? ''} ${MONTH}`}
              </span>
            </div>
          </div>

          <div className="p-2 bg-slate-400 grid grid-cols-2 tablet:hidden text-sm border-b-2 last:border-b-0  border-solid ">
            <div>Hãng sản xuất:{' '}
              <span className="text-red-800 font-semibold">
                {`${product?.brandId?.name ?? ''}`}
              </span>
            </div>
            <div>Số lượt xem:{' '}
              <span className="text-red-800 font-semibold">
                {`${product?.view ?? ''} ${VIEW}`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center tablet:hidden">
          <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Thêm vào giỏ hàng
          </button>
          <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Mua ngay
          </button>
        </div>
        <div className="tablet:hidden">
          {`Mô tả: ${product?.description}`}
        </div>
      </section>
    </>
  )
}
