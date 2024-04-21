import Link from "next/link";
import { LuSearch } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { IoMenu, IoCartOutline } from "react-icons/io5";
import LogoImage from "/assets/logo.png";
import DropDown from "./global/DropDown";
import { useRouter } from "next/router";
import Image from "next/image";

const options = [
  {
    name: "Movies",
    url: "/",
  },
  {
    name: "Series",
    url: "/series",
  },
];

const Navbar = ({}: {}) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="">
      <div className="flex flex-wrap items-center justify-between mx-auto py-3">
        <div className="flex items-center space-x-3">
          <Link href={"/"}>
            <Image src="/logo.png" width={100} height={50} alt="logo" />
          </Link>

          <div className="items-center justify-between hidden  md:flex pl-10">
            <ul className="flex flex-col p-4 md:p-0 mt-4 rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 ">
              {options.map((item) => (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className={`block py-2 px-3 md:p-0 hover:scale-110 duration-300  ${
                      router.pathname.includes(item.url) ? "border-b-2" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex md:order-2 gap-x-1 md:gap-x-2 md:space-x-0 items-center">
          <button type="button" className="hover:scale-105 duration-150 p-2 text-2xl">
            <LuSearch />
          </button>

          {/* <Link
              href={"/login"}
              type="button"
              className="text-white bg-primary hover:opacity-80 duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm px-5 md:px-10  py-3 text-center"
            >
              Login
            </Link> */}

          <button
            onClick={() => setIsNavbarOpen((p) => !p)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-xl text-gray-500 bg-gray-100 border rounded-2xl md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          >
            {isNavbarOpen ? <RxCross2 /> : <IoMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="relative mt-2 w-full">
        <DropDown isOpen={isNavbarOpen} className={""}>
          {options.map((item) => (
            <div key={item.url}>
              <Link href={item.url}>
                <div className="px-4 py-2 text-white rounded hover:bg-black cursor-pointer">{item.name}</div>
              </Link>
            </div>
          ))}
        </DropDown>
      </div>
    </nav>
  );
};

export default Navbar;
