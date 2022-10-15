import axiosClient from "./axiosClient";

const ticketAPI = {
  getTickets: (userId) => {
    return axiosClient.get(`tickets/by-user?userId=${userId}`);
  },

  createTicket: (ticket) => {
    return axiosClient.post("tickets", ticket);
  },
};

export default ticketAPI;
