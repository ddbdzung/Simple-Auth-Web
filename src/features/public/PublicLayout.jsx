import { Outlet } from "react-router-dom";

import Footer from "../../shared/Footer/Footer";
import Header from "../../shared/Header/Header";

export default function PublicLayout(_props) {
  return (
    <div className="min-h-screen bg-white tablet:bg-orange-300 laptop:bg-green-500 w-auto tablet:w-[970px] laptop:w-[1170px] tablet:px-4 tablet:mx-auto">
      <Header />
      <Outlet />
      <Footer phoneNumber='0584637490' />
    </div>
  );
}
