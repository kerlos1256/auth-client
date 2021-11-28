import axios from "axios";
import { User } from "../components/PersonalInfo";
import constants from "../constants";
import { getToken, removeToken } from "../localStorage";

export const unauthoraized = () => {
  removeToken();
  window.location.href = "auth/login";
};

export const getProfile = async () => {
  const token = await getToken();
  if (!token) return unauthoraized();
  return axios({
    method: "get",
    url: `${constants.serverHost}/profile`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res: { data: User }) => {
      return res.data;
    })
    .catch((err) => {
      return unauthoraized();
    });
};

export const UpdateInfo = async (Data: any) => {
  const data: any = {};
  Object.entries(Data).map((entry) => {
    if (Data[entry[0]] && Data[entry[0]] !== "") {
      data[entry[0]] = entry[1];
    }
  });

  const token = await getToken();
  if (!token) return unauthoraized();
  return axios({
    method: "post",
    url: `${constants.serverHost}/profile/update`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  })
    .then((res) => true)
    .catch((err) => unauthoraized());
};
