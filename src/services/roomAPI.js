import axiosClient from "./axiosClient";

const roomAPI = {
  getRoomsList: (locationId) => {
    return axiosClient.get(`rooms?locationId=${locationId}`);
  },

  getRoomDetails: (roomId) => {
    return axiosClient.get(`rooms/${roomId}`);
  },

  bookRoom: (bookingData) => {
    return axiosClient.post("rooms/booking", bookingData);
  },

  createRoom: (room) => {
    return axiosClient.post("rooms", room);
  },

  updateRoom: (roomId, room) => {
    return axiosClient.put(`rooms/${roomId}`, room);
  },

  deleteRoom: (roomId) => {
    return axiosClient.delete(`rooms/${roomId}`);
  },

  uploadRoomImage: (roomId, image) => {
    return axiosClient.post(`rooms/upload-image/${roomId}`, image);
  },
};

export default roomAPI;
