import { NextPage } from "next";
import React, { FC } from "react";
import Loading from "../../components/Loading";
import LoggedIn from "../../components/LoggedIn";
import Login from "../../components/Login";

const login: NextPage = () => {
  return (
    <div className="h-screen container mx-auto flex justify-center items-center">
      <LoggedIn
        fallbackUrl="/"
        isLoggedIn={false}
        LoadingComponent={<Loading />}
      >
        <Login />
      </LoggedIn>
    </div>
  );
};

export default login;
