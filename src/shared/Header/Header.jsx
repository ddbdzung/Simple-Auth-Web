import { faUser } from '@fortawesome/free-regular-svg-icons'
import * as Yup from 'yup'
import axios from 'axios'
import { faBars, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Formik } from 'formik';
import { useState } from 'react'
import { NavLink } from 'react-router-dom';

import { API_ENTRY, BASE_DOMAIN, PRODUCT } from '../../constants/index'
import IconButton from '../custom/IconButton';
import IconNavLink from '../custom/IconNavLink';
import logo from '../../assets/images/public/logo.png'
import { loadState } from '../../helpers/handleState';

export default Header;

function Header(_props) {
  const [searchContent, setSearchContent] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isOpeningMenuBars, setIsOpeningMenuBars] = useState(false)
  const handleSearching = async (e) => {
    e.preventDefault()
    console.log(searchContent)
    if (!searchContent) return

    const queryString = `?search=${encodeURIComponent(searchContent)}`
  }

  return (
    <>
      <Formik
        initialValues={{
        }}
        validationSchema={Yup.object({

        })
        }
        onSubmit={(values, actions) => {
          // throttleWrapper(values, actions, dispatch)
        }}
      >
        <div className="h-11 w-auto tablet:h-16 tablet:w-[970px] laptop:h-16 laptop:w-[1170px] tablet:px-4 tablet:mx-auto">
          <div className="flex h-full tablet:gap-32 laptop:gap-8">
            {/* Menu */}
            <div className="basis-[14.29%] tablet:basis-[9.09%] laptop:hidden bg-slate-200">
              <IconButton icon={faBars} handleClick={() => setIsOpeningMenuBars(!isOpeningMenuBars)} />
            </div>
            {/* Menu slides out */}
            {isOpeningMenuBars &&
              <div onClick={() => setIsOpeningMenuBars(!isOpeningMenuBars)} className="absolute top-0 bottom-0 left-0 right-0 bg-[#2d2d2da6]" />}
            <div className={`${!isOpeningMenuBars ? '-translate-x-full' : 'translate-x-0'} right-1/4 transition-transform ease-in duration-500 fixed top-0 bottom-0 left-0 z-10 bg-slate-100`}>
              {/* Menu list goes here */}
              <ul className="bg-slate-200 my-4 mx-2 p-8">
                <li className="inline-block w-full bg-pink-200 mb-8 last:mb-0">
                  <NavLink className="w-full h-full bg-blue-200 flex items-center py-1" to="">Điện thoại</NavLink>
                </li>
                <li className="inline-block w-full bg-pink-200 mb-8 last:mb-0">
                  <NavLink className="w-full h-full bg-blue-200 flex items-center py-1" to="">Củ sạc</NavLink>
                </li>
                <li className="inline-block w-full bg-pink-200 mb-8 last:mb-0">
                  <NavLink className="w-full h-full bg-blue-200 flex items-center py-1" to="">Cáp sạc</NavLink>
                </li>
              </ul>
              <button onClick={() => setIsOpeningMenuBars(!isOpeningMenuBars)}
                className={`${(!isOpeningMenuBars) ? 'hidden' : ''} absolute left-full top-0 bg-black py-4 px-6 font-bold text-white`}>
                X
              </button>
            </div>
            {/* Logo */}
            <div className="basis-[57.14%] tablet:basis-[36.36%] laptop:basis-[22.22%] bg-green-500">
              <div className="w-full h-full border-2">
                <NavLink to="/">
                  <img className="w-full h-full" src={logo} alt="logo" />
                </NavLink>
              </div>
            </div>
            {/* Actions */}
            <div className="flex basis-[28.57%] tablet:basis-[54.55%] laptop:basis-[77.78%] tablet:justify-between laptop:gap-8">
              <div className="hidden laptop:flex laptop:basis-[71.42%] laptop:justify-center laptop:items-center">
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
                <IconButton handleClick={() => { setIsSearching(!isSearching) }} icon={faMagnifyingGlass} />
                {(!isSearching)
                  ? <></>
                  :
                  <div className="fixed top-0 bottom-[89%] left-0 right-0 bg-white z-20">
                    <div className="h-full p-1 flex justify-center items-center">
                      <form>
                        <input type="text" placeholder="Tìm kiếm sản phẩm..."
                          className="px-8 py-2 border-2 tablet:w-[45vw]  border-slate-300 rounded-xl"
                          onChange={e => setSearchContent(e.target.value)}
                        />
                        <button className="ml-2 p-2 bg-slate-100 rounded-2xl border-2 border-slate-200 focus:ring-cyan-200 focus:ring-2"
                          onClick={e => handleSearching(e)} type="submit">
                          Tìm
                        </button>
                      </form>
                      <button onClick={() => { setIsSearching(!isSearching) }}
                        className="ml-2 p-2 bg-slate-100 rounded-2xl border-2 border-slate-200 focus:ring-cyan-200 focus:ring-2">
                        X
                      </button>
                    </div>
                  </div>
                }
              </div>
              <div className="basis-2/3 tablet:basis-3/6 laptop:basis-[21.42%] flex">
                {loadState('role') && loadState('role')?.role !== 'admin'
                  ? <IconNavLink linkTo="/auth/sign-in" icon={faUser} description="Tài khoản" />
                  : <IconNavLink linkTo="/admin" icon={faUser} description="Admin" />
                }
                <IconNavLink icon={faCartShopping} description="Giỏ hàng" />
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
}
