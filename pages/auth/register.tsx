import { NextPage } from "next";
import React from "react";
import Loading from "../../components/Loading";
import LoggedIn from "../../components/LoggedIn";
import Register from "../../components/Register";

const register: NextPage = () => {
  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <LoggedIn
        isLoggedIn={false}
        fallbackUrl="/"
        LoadingComponent={<Loading />}
      >
        <Register />
      </LoggedIn>
    </div>
  );
};

export default register;
