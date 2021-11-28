import React, { FC, useState } from "react";
import { MdMail, MdLock } from "react-icons/md";
import { FaGoogle, FaFacebook, FaUser } from "react-icons/fa";
import { useRouter } from "next/dist/client/router";
import constants from "../constants";
const Register: FC = () => {
  const router = useRouter();
  const icons = [
    {
      icon: (styles: string) => <FaGoogle className={styles} />,
      endPoint: `${constants.serverHost}/auth/google`,
    },
    {
      icon: (styles: string) => <FaFacebook className={styles} />,
      endPoint: `${constants.serverHost}/auth/facebook`,
    },
  ];

  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputStyle =
    "border border-black border-opacity-30 rounded-lg p-1 px-2 my-2 flex items-center";
  return (
    <div className="flex flex-col gap-4 w-96 border border-black border-opacity-30 rounded-2xl p-8">
      <div>devChallenges</div>
      <div>Join thousands of learners from around the world </div>
      <div>
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </div>
      <div>
        <div className={inputStyle}>
          <FaUser className="opacity-60 mr-1" />{" "}
          <input
            className="outline-none"
            type="text"
            placeholder="Username"
            value={value.username}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
          />
        </div>
        <div className={inputStyle}>
          <MdMail className="opacity-60 mr-1" />{" "}
          <input
            className="outline-none"
            type="text"
            placeholder="Email"
            value={value.email}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
          />
        </div>
        <div className={inputStyle}>
          <MdLock className="opacity-60 mr-1" />
          <input
            className="outline-none"
            type="text"
            placeholder="Password"
            value={value.password}
            onChange={(e) => setValue({ ...value, password: e.target.value })}
          />
        </div>

        <div className="cursor-pointer bg-blue-600 w-full text-white text-center mt-4  py-1 rounded-lg">
          Start coding now
        </div>
      </div>
      <div className="text-center opacity-60">
        or continue with these social profile
      </div>
      <div className="flex gap-2 w-full justify-center">
        {icons.map(({ icon, endPoint }, index) => (
          <div
            key={index}
            onClick={() => router.push(endPoint)}
            className="group cursor-pointer rounded-full w-8 h-8 border border-opacity-30 border-black flex items-center justify-center"
          >
            {icon("opacity-60 transition group-hover:opacity-80")}
          </div>
        ))}
      </div>
      <div className="text-center">
        Already a member ?{" "}
        <span
          onClick={() => router.push("auth/login")}
          className="cursor-pointer text-blue-600"
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default Register;
