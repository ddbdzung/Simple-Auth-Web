import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import IconButton from '../custom/IconButton';

import IconNavLink from '../custom/IconNavLink';

export default Header;

function Header(_props) {
  const [isSearching, setIsSearching] = useState(false)
  const [isOpeningMenuBars, setIsOpeningMenuBars] = useState(false)


  return (
    <>
      <div className="bg-blue-400 h-11 w-auto tablet:h-16 tablet:w-[970px] laptop:h-16 laptop:w-[1170px] tablet:px-4 tablet:mx-auto">
        <div className="bg-yellow-500 flex h-full tablet:gap-32 laptop:gap-8">
          {/* Menu */}
          <div className="basis-[14.29%] tablet:basis-[9.09%] laptop:hidden bg-slate-400">
            <IconButton icon={faBars} handleClick={() => setIsOpeningMenuBars(!isOpeningMenuBars)} />
          </div>
          {/* Menu slides out */}
          <div className={`${!isOpeningMenuBars ? '-translate-x-full' : 'translate-x-0'} right-1/4 transition-transform fixed top-0 bottom-0 left-0 z-10 bg-slate-100`}>
            <button onClick={() => setIsOpeningMenuBars(!isOpeningMenuBars)} className={`${(!isOpeningMenuBars) ? 'hidden' : ''} absolute left-full bg-slate-300 py-4 px-6`}>
              X
            </button>
          </div>
          {/* Logo */}
          <div className="basis-[57.14%] tablet:basis-[36.36%] laptop:basis-[22.22%] bg-green-500">
            <div className="w-full h-full border-2">
              {/* TODO Logo image goes here */}
            </div>
          </div>
          {/* Actions */}
          <div className="bg-slate-600 flex basis-[28.57%] tablet:basis-[54.55%] laptop:basis-[77.78%] tablet:justify-between laptop:gap-8">
            <div className="bg-yellow-200 hidden laptop:flex laptop:basis-[71.42%] laptop:justify-center laptop:items-center">
              <ul className="px-6 w-full h-full flex justify-end items-center">
                <li className="h-full">
                  <NavLink to="" className="flex items-center px-2 h-full">Điện thoại</NavLink>
                </li>
                <li className="h-full">
                  <NavLink to="" className="flex items-center px-2 h-full">Củ sạc</NavLink>
                </li>
                <li className="h-full">
                  <NavLink to="" className="flex items-center px-2 h-full">Cáp sạc</NavLink>
                </li>
              </ul>
            </div>
            <div className="basis-1/3 tablet:basis-1/6 laptop:basis-[7.14%]">
              {(!isSearching)
                ? <IconNavLink icon={faMagnifyingGlass} />
                :
                <div></div>
              }
            </div>
            <div className="basis-2/3 tablet:basis-3/6 laptop:basis-[21.42%] flex">
              <IconNavLink icon={faUser} description="Tài khoản" />
              <IconNavLink icon={faCartShopping} description="Giỏ hàng" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
