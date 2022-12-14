import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { authAxios } from "../configs/axios.mjs";
import { API } from "../constants";

export default function Brand() {
  const [brandList, setBrandList] = useState([])
  const getBrands = async (mounted) => {
    try {
      const data = await authAxios.get(`${API.BRAND.BASE}/${API.BRAND.GET_BRANDS}`)
      if (mounted) {
        setBrandList(data.data.data)
      }
    } catch (err) {
      console.log(err)
      return
    }
  }

  useEffect(() => {
    let mounted = true
    getBrands(mounted)

    return () => mounted = false
  }, [])

  return (
    <div className="mb-2 px-2 flex py-4 gap-4 max-w-full bg-gray-200">
      <div className="flex justify-center items-center">
        <span className="cursor-default">Hãng</span>
      </div>
      <ul className="flex gap-4 w-full overflow-auto webkitScroll">
        {brandList && brandList?.map(item => (
          <li key={item?._id} className="inline-block">
            <NavLink to="/" className="hover:text-red-700 active:text-red-800">
              {item?.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
