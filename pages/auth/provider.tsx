import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { setToken } from "../../localStorage";

const Provider: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      console.log(token);
      if (typeof token === "string") {
        setToken(token).then(() => router.push(""));
      } else {
        setToken(token[0]).then(() => router.push(""));
      }
    } else {
      router.push("/auth/login");
    }
  }, [token]);

  return null;
};

export default Provider;
