import DefaultProduct from '../assets/images/products/default.png'
import formatCurrencyVND from '../helpers/formatCurrencyVND'
import Brand from './Brand'
import Filter from './Filter'

export default function ProductList(_props) {
  return (
    <>
      <Brand />
      <Filter />
      <div className="grid grid-cols-2 border-2 border-slate-400 gap-2 tablet:grid-cols-3 laptop:grid-cols-4">
        <div className="bg-slate-300 border-r-2 last:border-r-0 border-b-2 last:border-b-0 border-slate-400 
            p-2 flex flex-col gap-4">
          <div className="m-3 max-w-full max-h-full">
            <img className="w-full h-full" src={DefaultProduct} />
          </div>
          <div className="flex flex-col flex-wrap gap-3">
            <div className="text-black text-md font-bold">Xiaomi Redmi Note 12 (Snapdragon 4 Gen 1)</div>
            <div className="text-red-600 text-sm font-bold">{formatCurrencyVND(12350000)}</div>
            <button className="block mx-6 py-1 rounded-md text-white uppercase bg-slate-900">
              Mua
            </button>
          </div>
        </div>
        <div className="bg-slate-300 border-r-2 last:border-r-0 border-b-2 last:border-b-0 border-slate-400 
            p-2 flex flex-col gap-4">
          <div className="m-3 max-w-full max-h-full">
            <img className="w-full h-full" src={DefaultProduct} />
          </div>
          <div className="flex flex-col flex-wrap gap-3">
            <div className="text-black text-md font-bold">Xiaomi Redmi Note 12 (Snapdragon 4 Gen 1)</div>
            <div className="text-red-600 text-sm font-bold">{formatCurrencyVND(12350000)}</div>
            <button className="block mx-6 py-1 rounded-md text-white uppercase bg-slate-900">
              Mua
            </button>
          </div>
        </div>
        <div className="bg-slate-300 border-r-2 last:border-r-0 border-b-2 last:border-b-0 border-slate-400 
            p-2 flex flex-col gap-4">
          <div className="m-3 max-w-full max-h-full">
            <img className="w-full h-full" src={DefaultProduct} />
          </div>
          <div className="flex flex-col flex-wrap gap-3">
            <div className="text-black text-md font-bold">Xiaomi Redmi Note 12 (Snapdragon 4 Gen 1)</div>
            <div className="text-red-600 text-sm font-bold">{formatCurrencyVND(12350000)}</div>
            <button className="block mx-6 py-1 rounded-md text-white uppercase bg-slate-900">
              Mua
            </button>
          </div>
        </div>
        <div className="bg-slate-300 border-r-2 last:border-r-0 border-b-2 last:border-b-0 border-slate-400 
            p-2 flex flex-col gap-4">
          <div className="m-3 max-w-full max-h-full">
            <img className="w-full h-full" src={DefaultProduct} />
          </div>
          <div className="flex flex-col flex-wrap gap-3">
            <div className="text-black text-md font-bold">Xiaomi Redmi Note 12 (Snapdragon 4 Gen 1)</div>
            <div className="text-red-600 text-sm font-bold">{formatCurrencyVND(12350000)}</div>
            <button className="block mx-6 py-1 rounded-md text-white uppercase bg-slate-900">
              Mua
            </button>
          </div>
        </div>
        <div className="bg-slate-300 border-r-2 last:border-r-0 border-b-2 last:border-b-0 border-slate-400 
            p-2 flex flex-col gap-4">
          <div className="m-3 max-w-full max-h-full">
            <img className="w-full h-full" src={DefaultProduct} />
          </div>
          <div className="flex flex-col flex-wrap gap-3">
            <div className="text-black text-md font-bold">Xiaomi Redmi Note 12 (Snapdragon 4 Gen 1)</div>
            <div className="text-red-600 text-sm font-bold">{formatCurrencyVND(12350000)}</div>
            <button className="block mx-6 py-1 rounded-md text-white uppercase bg-slate-900">
              Mua
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
