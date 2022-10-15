import axiosClient from "./axiosClient";

const authAPI = {
  login: (loginUser) => {
    return axiosClient.post("auth/login", loginUser);
  },

  register: (registerUser) => {
    return axiosClient.post("auth/register", registerUser);
  },
};

export default authAPI;
