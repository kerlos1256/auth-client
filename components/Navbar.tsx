import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdGroup,
  MdPerson,
  MdLogout,
} from "react-icons/md";
import { getProfile, unauthoraized } from "../utils/apiCalls";
import { User } from "./PersonalInfo";

export interface NavLink {
  content: string;
  url: string;
  icon: ReactElement;
}

const Navbar: FC<{ user: User | undefined }> = ({ user }) => {
  const [dropDown, setDropDown] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    {
      content: "My Profile",
      url: "/",
      icon: <MdPerson />,
    },
    {
      content: "Group Chat",
      url: "/",
      icon: <MdGroup />,
    },
  ];

  return (
    <div className="flex justify-between items-center py-6 px-2">
      <div>devChallenges</div>
      <div>
        <div className="flex gap-3 items-center">
          <div className="h-10 rounded-lg overflow-hidden">
            <img className="h-full w-full object-cover" src={user?.photo} />
          </div>
          <div className="font-semibold text-lg">{user?.name}</div>
          <div>
            <div
              onClick={() => setDropDown(!dropDown)}
              className="cursor-pointer text-xl "
            >
              {dropDown ? <MdArrowDropDown /> : <MdArrowDropUp />}
            </div>
          </div>
          <div>
            <div
              className={`${
                dropDown
                  ? "translate-y-10"
                  : "pointer-events-none opacity-0 translate-y-6"
              } transform transition duration-300 absolute border border-gray-400 border-opacity-50 bg-white px-3 py-1.5 rounded-xl
                w-56 -translate-x-full
                `}
            >
              <div className="mb-2">
                {navLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-200 py-1.5 px-3 my-2 rounded-lg"
                  >
                    {link.icon}
                    {link.content}
                  </div>
                ))}
              </div>
              <div className="cursor-pointer border-t border-gray-400 border-opacity-30 ">
                <div
                  onClick={() => unauthoraized()}
                  className="flex items-center gap-1.5 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 my-2"
                >
                  <MdLogout /> Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
