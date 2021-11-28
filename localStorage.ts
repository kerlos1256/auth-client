import jwtDecode from "jwt-decode";

export interface decodedUser {
  name: string;
  id: number;
  iat: number;
  exp: number;
}

export const getToken = () => {
  return new Promise<string | null>((resolve, reject) => {
    const interval = setInterval(() => {
      if (typeof localStorage !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          resolve(token);
          clearInterval(interval);
        } else {
          resolve(null);
          clearInterval(interval);
        }
      }
    }, 100);
  });
};

export const getUser = () => {
  return new Promise<decodedUser | null>((resolve, reject) => {
    const interval = setInterval(() => {
      if (typeof localStorage !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decodedToken: decodedUser = jwtDecode(token);
            if (decodedToken.exp < Date.now() / 1000) {
              removeToken();
              resolve(null);
              clearInterval(interval);
            } else {
              resolve(decodedToken);
              clearInterval(interval);
            }
          } catch (error) {
            resolve(null);
            clearInterval(interval);
          }
        } else {
          resolve(null);
          clearInterval(interval);
        }
      }
    }, 100);
  });
};

export const setToken = (token: string) => {
  return new Promise((reslove, reject) => {
    const interval = setInterval(() => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("token", token);
        reslove(true);
        clearInterval(interval);
      }
    }, 300);
  });
};

export const removeToken = () => {
  return new Promise<boolean>((res, rej) => {
    const interval = setInterval(() => {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("token");
        res(true);
      } else {
        res(false);
      }
    }, 100);
  });
};
