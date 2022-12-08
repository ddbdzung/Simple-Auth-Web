import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import DefaultProduct from '../../assets/images/products/default.png'
import Slider from '../../components/Slider'
import { GIGABYTE, INCH, MILIAMPEHOUR, MONTH, VIEW } from '../../constants'
import formatCurrencyVND from '../../helpers/formatCurrencyVND'

const checkQuantityStatus = qty => (qty === 0) ? 'Hết hàng' : 'Còn hàng'

export default function ProductDetail(_props) {
  const product = {
    name: 'Điện thoại Xiaomi Redmi Note 12 (Snapdragon 4 Gen 1)',
    price: 4250000,
    discount: 0,
    view: 0,
    description: 'Thiết kế thanh thoát tối giản, Mặt sau có cụm camera hình chữ nhật nổi bật, tạo điểm nhấn đối diện là logo Redmi được đặt ở vị trí quen thuộc với các máy Xiaomi gần đây. Tuy được làm hoàn toàn bằng nhựa, nhưng Redmi Note 12 vẫn cho vẻ bề ngoài khá sang trọng với các màu đen và trắng, cũng không kém phần trẻ trung với màu xanh. Vì vậy chiếc máy này phù hợp với mọi đối tương người dùng.',
    quantity: 1,
    ram: 4,
    rom: 128,
    battery: 5000,
    screensize: 6.67,
    screenType: 'AMOLED',
    color: 'đỏ',
    cpu: 'Qualcomm SM4375 Snapdragon 4 Gen 1 (6 nm) 8 nhân',
    gpu: 'Adreno 619',
    // release: '27/10/2022',
    warranty: 12,
    bonus: `Tặng: Cường lực - Ốp lưng - Tai nghe khi mua BHV (Nếu trong hộp chưa có) Giảm: 100K áp dụng HSSV mua BHV tại 42 phố Vọng Mua: Dán cường lực 21D full màn chỉ 30K`,
    catalogId: {
      id: '6390a784886a0e65802670a1',
      name: 'Điện thoại',
    },
    brandId: {
      id: '6390a817886a0e65802670a5',
      name: 'Xiaomi',
      link: 'https://www.xiaomi.com'
    },
  }
  // const { id } = useParams()
  // const subImgs = [Sub1, Sub2, Sub3, Sub4, Sub5, Sub6, Sub7]

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
            <img className="w-full h-full" src={DefaultProduct} />
            {/* Slide in mobile view */}
            <div className="tablet:hidden mt-4">
              <Slider subImg={[]} />
            </div>
          </div>

          {/* Info in min tablet view */}
          <div className="bg-slate-400 hidden tablet:block tablet:basis-2/3">
            <div className="p-2 bg-slate-400 hidden grid-cols-2 tablet:grid text-sm border-b-2 last:border-b-0 border-solid">
              <div>Tình trạng:{' '}
                <span className={`${(product.quantity === 0) ? 'text-red-800}' : 'text-green-800'} font-semibold`}>
                  {checkQuantityStatus(product.quantity)}
                </span>
              </div>
              <div>Giá tiền:{' '}
                <span className="text-red-800 font-semibold">
                  {formatCurrencyVND(product.price)}
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
          <Slider subImg={[]} />
          <div className="basis-2/3 tablet:pl-6 tablet:py-2 laptop:py-0 text-md">
            {`Mô tả: ${product.description}`}
          </div>
        </div>

        <div className="tablet:flex justify-center items-center hidden">
          <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Thêm vào giỏ hàng
          </button>
          <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Mua ngay
          </button>
        </div>
        {/* Info in mobile view */}
        <div className="w-full h-fit border-2 border-slate-300 tablet:hidden">
          <div className="p-2 bg-slate-400 grid grid-cols-2 tablet:hidden text-sm border-b-2 last:border-b-0  border-solid ">
            <div>Tình trạng:{' '}
              <span className={`${(product.quantity === 0) ? 'text-red-800}' : 'text-green-800'} font-semibold`}>
                {checkQuantityStatus(product.quantity)}
              </span>
            </div>
            <div>Giá tiền:{' '}
              <span className="text-red-800 font-semibold">
                {formatCurrencyVND(product.price)}
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
          <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Thêm vào giỏ hàng
          </button>
          <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Mua ngay
          </button>
        </div>
        <hr />
        <div className="tablet:hidden">
          {`Mô tả: ${product.description}`}
        </div>
        <hr />
      </section>
    </>
  )
}
