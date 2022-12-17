import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer } from 'react-toastify';

import { SUCCESS } from "../../constants";
import Alert from "../../shared/Alert";
import Footer from "../../shared/Footer/Footer";
import Header from "../../shared/Header/Header";
import { clearStatusCode } from "../auth/authSlice";
import { clearMessage } from './publicSlice';

const authConstants = {
  200: 'Đăng xuất thành công',
  404: 'Đăng xuất thành công nhưng đã có lỗi xảy ra vui lòng reset trang',
}

export default function PublicLayout(_props) {
  const { statusCode } = useSelector(store => store.auth)
  const { message } = useSelector(store => store.public)
  const dispatch = useDispatch()

  useEffect(() => {
    if (statusCode) {
      setTimeout(() => {
        dispatch(clearStatusCode())
      }, 1500)
    }

    if (message) {
      if (message === 'Đã thanh toán thành công, vui lòng kiểm tra hòm thư email') {
        setTimeout(() => {
          dispatch(clearMessage())
        }, 3000)
      } else {
        setTimeout(() => {
          dispatch(clearMessage())
        }, 1500)
      }
    }
  })

  return (
    <div className="min-h-screen relative pb-[5.75rem] bg-slate-200 w-auto tablet:w-[970px] laptop:w-[1170px] tablet:px-4 tablet:mx-auto">
      <ToastContainer />
      {statusCode && (
        <div className="absolute top-3 left-3 z-50 max-w-lg bg-transparent">
          <Alert type={SUCCESS} title={'Success'} contents={authConstants[statusCode]} id={uuidv4()} />
        </div>
      )}
      {message && (
        <div className="absolute top-3 left-3 z-50 max-w-lg bg-transparent">
          <Alert type={SUCCESS} title={'Success'} contents={message} id={uuidv4()} />
        </div>
      )}
      <Header />
      <Outlet />
      <Footer phoneNumber='0584637490' />
    </div>
  );
}
