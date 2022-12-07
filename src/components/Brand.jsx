import { NavLink } from "react-router-dom";

export default function Brand() {
  return (
    <div className="mb-2 px-2 flex py-4 gap-4 max-w-full bg-pink-300">
      <div className="flex justify-center items-center">
        <span className="cursor-default">Hãng</span>
      </div>
      <ul className="flex gap-4 w-full overflow-auto webkitScroll">
        <li className="inline-block">
          <NavLink to="" className="hover:text-red-700 active:text-red-800">
            Apple
          </NavLink>
        </li>
        <li className="inline-block">
          <NavLink to="" className="hover:text-red-700 active:text-red-800">
            Samsung
          </NavLink>
        </li>
        <li className="inline-block">
          <NavLink to="" className="hover:text-red-700 active:text-red-800">
            Nokia
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
