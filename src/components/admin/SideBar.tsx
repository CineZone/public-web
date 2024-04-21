import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaBars } from "react-icons/fa";
import { deleteCookie } from "cookies-next";
import constants from "@/constants/constants";

export default function Sidebar() {
  const [options, setOptions] = useState(allOptions);
  const [collapseShow, setCollapseShow] = useState("hidden");
  const router = useRouter();

  const logoutUser = () => {
    const ok = confirm("Are you sure you want to delete the key?");
    if (ok) {
      deleteCookie(constants.ADMIN_API_KEY);
      router.reload();
    }
  };

  return (
    <>
      <nav
        id="hide-element"
        className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  bg-gray-900 flex flex-wrap items-center justify-between relative md:w-56 z-10 py-2 px-6"
      >
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <div
            className="my-button md:hidden cursor-pointer"
            onClick={() => setCollapseShow("bg-gray-900 m-2 py-3 px-6")}
          >
            <FaBars />
          </div>
          {/* Brand */}

          <Link href="/">
            <div className="text-left cursor-pointer md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 md:hidden">
              CineZone
            </div>
          </Link>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {/*Dashboard*/}
              {[
                ...options,
                // sign out
                {
                  name: "Delete Key",
                  link: "",
                  onClick: logoutUser,
                  color: "text-red-500",
                },
              ].map((item, index) => (
                <Option {...item} router={router} setCollapseShow={setCollapseShow} key={index} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

type OptionProps = {
  color?: string;
  name: string;
  link: string;
  onClick?: () => void;
  setCollapseShow: (show: string) => void;
  router: any;
};

const Option = ({ color = "", name, link, onClick = () => {}, setCollapseShow, router }: OptionProps) => (
  <li
    className={`items-center flex  h-fit mb-1 my-3 ${
      router.pathname.split("/")[2] === link.split("/")[2] ? "bg-gray-800" : ""
    }`}
    onClick={() => {
      if (link) {
        router.replace(link);
      }

      setCollapseShow("hidden");
      onClick();
    }}
  >
    <div
      className={`${
        router.pathname.split("/")[2] === link.split("/")[2] ? "bg-primary" : ""
      } h-6 w-[2px] mr-2 rounded`}
    />
    <a
      className={`text-xs uppercase cursor-pointer font-bold block ${
        router.pathname.split("/")[2] === link.split("/")[2]
          ? ` text-white `
          : `${color ? color : "text-white hover:scale-105"}`
      }`}
    >
      {name}
    </a>
  </li>
);

const allOptions = [
  {
    name: "Movies",
    link: "/admin-panel/movies",
  },
];
