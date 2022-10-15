import axiosClient from "./axiosClient";

const reviewAPI = {
  getReviewsList: (roomId) => {
    return axiosClient.get(`reviews/byRoom?roomId=${roomId}`);
  },
};

export default reviewAPI;
