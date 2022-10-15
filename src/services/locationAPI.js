import axiosClient from "./axiosClient";

const locationAPI = {
  getLocationsList: (location) => {
    return axiosClient.get(`locations?location=${location}`);
  },

  getLocationDetails: (locationId) => {
    return axiosClient.get(`locations/${locationId}`);
  },

  updateLocation: (locationId, location) => {
    return axiosClient.put(`locations/${locationId}`, location);
  },

  uploadLocationImage: (locationId, image) => {
    return axiosClient.post(`locations/upload-images/${locationId}`, image);
  },

  createLocation: (location) => {
    return axiosClient.post("locations", location);
  },

  deleteLocation: (locationId) => {
    return axiosClient.delete(`locations/${locationId}`);
  },
};

export default locationAPI;
