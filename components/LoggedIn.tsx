import { useRouter } from "next/dist/client/router";
import React, {
  FC,
  ReactChild,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { decodedUser, getUser } from "../localStorage";

interface props {
  fallbackUrl: string;
  isLoggedIn: boolean;
  LoadingComponent: ReactElement;
}

const LoggedIn: FC<props> = ({
  children,
  fallbackUrl,
  isLoggedIn,
  LoadingComponent,
}): any => {
  const router = useRouter();

  const redirect = () => {
    router.push(fallbackUrl);
    return null;
  };

  const [user, setUser] = useState<decodedUser | null>();
  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => setUser(null));
  }, []);

  return user === undefined
    ? LoadingComponent
    : user === null
    ? isLoggedIn
      ? redirect()
      : children
    : isLoggedIn
    ? children
    : redirect();
};

export default LoggedIn;
