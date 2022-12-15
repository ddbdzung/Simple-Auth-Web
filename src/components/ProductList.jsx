import { Image } from 'cloudinary-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API, GIGABYTE, MILIAMPEHOUR } from '../constants'
import { customAxios } from '../helpers/customAxios'
import formatCurrencyVND from '../helpers/formatCurrencyVND'
import Brand from './Brand'
import Filter from './Filter'

export default function ProductList(_props) {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    customAxios.get(`${API.PRODUCT.BASE}/${API.CLIENT}/${API.PRODUCT.GET_PRODUCTS}`, {})
      .then(({ data }) => {
        if (mounted) {
          const prods = (Array.isArray(data.data)) ? data.data : [data.data]
          setProducts(prods)
        }
      })

    return () => mounted = false
  }, [])

  return (
    <>
      <Brand />
      <Filter />
      <div className="grid grid-cols-2 border-0 border-slate-400 gap-2 tablet:grid-cols-3 laptop:grid-cols-4 mb-4">
        {products && products?.map((item, idx) => (
          <div key={idx} className="bg-gray-100 rounded-lg
            p-2 flex flex-col gap-4">
            <div className="m-3 max-w-full max-h-full">
              <Image
                className="w-full h-full"
                cloudName="dbbifu1w6"
                publicId={item?.imageLink}
                crop="scale"
              />
            </div>
            <div className="flex flex-col flex-wrap gap-4">
              <div className="text-black text-md font-bold">{item?.name}</div>
              <div className="text-xs font-semibold flex justify-between px-2">
                <div>
                  <div>RAM: {`${item?.ram ?? ''} ${GIGABYTE}`}</div>
                  <div>ROM: {`${item?.rom ?? ''} ${GIGABYTE}`}</div>
                </div>
                <div>
                  <div>Màu: {item?.color}</div>
                  <div>Pin: {`${item?.battery ?? ''} ${MILIAMPEHOUR}`}</div>
                </div>
              </div>
              <div className="text-xs font-semibold px-2">
                <div className="text-slate-400 line-through">{formatCurrencyVND(item?.price)}</div>
                <div className="text-red-600 text-sm">{formatCurrencyVND(item?.price * (100 - item?.discount) / 100)}</div>
              </div>
              <button onClick={e => { navigate(`/products/${item?._id}`) }}
                className="block mx-6 py-1 rounded-md text-white uppercase bg-slate-900">
                Mua
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
