import React from "react";
import DropDown from "./dropdown";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <div className=" shadow-2xl shadow-gray-500 py-2 mb-2 max-sm:py-4 lg:py-4 px-24 max-lg:py-4 max-lg:px-18 fixed w-full z-10 bg-[#FFF2E2] rounded-lg ">
        <div className="flex items-center justify-between text-[#4B3F36]">
          <div className="flex flex-col items-base">
            <h1 className="font-bold text-md">
              TAT-<span className="text-red-500">AL</span> <br />
              Restaurant <br /> (Berber Ali'nin Yeri)
            </h1>
          </div>

          <div className="max-lg:hidden">
            <ul className="flex items-center gap-5 font-bold hover:text-underline duration-300">
              <Link href={"/dashboard"}>Yönetim Paneli</Link>
              <Link href={"/login"}>Giriş Yap</Link>

              <Link href={"/menu"}>Anasayfa</Link>
              <Link href={"/menu1"} className="cursor-pointer">
                Izgaralar
              </Link>
              <Link href={"/menu2"} className="cursor-pointer">
                Çorbalar
              </Link>
              <Link href={"/menu3"} className="cursor-pointer">
                Pideler
              </Link>
              <Link href={"/menu4"} className="cursor-pointer">
                Kahvaltı
              </Link>
              <Link href={"/menu5"} className="cursor-pointer">
                Tatlı
              </Link>
              <Link href={"/menu6"} className="cursor-pointer">
                İçecekler
              </Link>
            </ul>
          </div>

          <DropDown />
        </div>
      </div>
    </div>
  );
};

export default Header;
