import axiosClient from "./axiosClient";

const userAPI = {
  addUser: (user) => {
    return axiosClient.post("users", user);
  },

  getUserDetails: (userId) => {
    return axiosClient.get(`users/${userId}`);
  },

  getUsersList: () => {
    return axiosClient.get("users/pagination");
  },

  deleteUser: (userId) => {
    return axiosClient.delete(`users/${userId}`);
  },

  updateUser: (userId, user) => {
    return axiosClient.put(`users/${userId}`, user);
  },

  uploadAvatar: (avatar) => {
    return axiosClient.post("users/upload-avatar", avatar);
  },
};

export default userAPI;
