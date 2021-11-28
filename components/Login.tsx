import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { FC, useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { MdLock, MdMail } from "react-icons/md";
import constants from "../constants";
import { setToken } from "../localStorage";

const Login: FC = () => {
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
    email: "",
    password: "",
  });

  const login = () => {
    axios.post(`${constants.serverHost}/auth/login`, value).then((res) => {
      setToken(res.data.access_token);
      router.push("/");
    });
  };

  const inputStyle =
    "border border-black border-opacity-30 rounded-lg p-1 px-2 my-2 flex items-center";
  return (
    <div className="flex flex-col gap-4 w-96 border border-black border-opacity-30 rounded-2xl p-8">
      <div>devChallenges</div>
      <div>Login</div>
      <div>
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

        <div
          onClick={login}
          className="cursor-pointer bg-blue-600 w-full text-white text-center mt-4  py-1 rounded-lg"
        >
          Login
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
        Not a member yet?{" "}
        <span
          onClick={() => router.push("auth/register")}
          className="cursor-pointer text-blue-600"
        >
          Register
        </span>
      </div>
    </div>
  );
};

export default Login;
