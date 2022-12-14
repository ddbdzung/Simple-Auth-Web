import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'

import { SUCCESS } from "../../constants";
import Alert from "../../shared/Alert";
import Footer from "../../shared/Footer/Footer";
import Header from "../../shared/Header/Header";

export default function PublicLayout(_props) {
  const { statusCode } = useSelector(store => store.auth)
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (statusCode) {
      if (statusCode === 200) {
        setStatusMessage('Đăng xuất thành công')
      } else if (statusCode === 404) {
        setStatusMessage('Đăng xuất thành công nhưng đã có lỗi xảy ra vui lòng reset trang')
      }
    }

    return () => {
      if (statusMessage) {
        setTimeout(() => { setStatusMessage('') }, 1500)
      }
    }
  })

  return (
    <div className="min-h-screen relative pb-[5.75rem] bg-white w-auto tablet:w-[970px] laptop:w-[1170px] tablet:px-4 tablet:mx-auto">
      {statusMessage && (
        <div className="absolute top-3 left-3 z-50 max-w-lg bg-transparent">
          <Alert type={SUCCESS} title={'Success'} contents={statusMessage} id={uuidv4()} />
        </div>
      )}
      <Header />
      <Outlet />
      <Footer phoneNumber='0584637490' />
    </div>
  );
}
