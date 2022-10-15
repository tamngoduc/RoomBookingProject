import { configureStore } from "@reduxjs/toolkit";
import location from "./location";
import auth from "./auth";
import room from "./room";
import user from "./user";
import review from "./review";
import ticket from "./ticket";

const store = configureStore({
  reducer: {
    location,
    auth,
    room,
    user,
    review,
    ticket,
  },
});

export default store;
