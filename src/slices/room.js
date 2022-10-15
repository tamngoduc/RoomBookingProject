import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomAPI from "../services/roomAPI";

const initialState = {
  roomsList: [],
  isRoomsListLoading: false,
  roomsListError: null,

  roomDetails: {},
  isRoomDetailsLoading: false,
  roomDetailsError: null,

  bookingResponse: {},
  isBookingLoading: false,
  bookingError: null,

  updatedRoomResponse: {},
  isUpdatedRoomLoading: false,
  updatedRoomError: null,

  deletedRoomResponse: {},
  isDeletedRoomLoading: false,
  deletedRoomError: null,

  uploadedRoomImageResponse: {},
  isUploadedRoomImageLoading: false,
  uploadedRoomImageError: null,

  createdRoomResponse: {},
  isCreatedRoomLoading: false,
  createdRoomError: null,
};

export const getRoomsList = createAsyncThunk(
  "room/getRoomsList",
  async (locationId) => {
    try {
      const data = await roomAPI.getRoomsList(locationId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getRoomDetails = createAsyncThunk(
  "room/getRoomDetails",
  async (roomId) => {
    try {
      const data = await roomAPI.getRoomDetails(roomId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const bookRoom = createAsyncThunk(
  "room/bookRoom",
  async ({ bookingData, successAlert, errorAlert }) => {
    try {
      const data = await roomAPI.bookRoom(bookingData);
      successAlert(data.message);
      return data;
    } catch (error) {
      errorAlert(error.message);
      throw error;
    }
  }
);

export const updateRoom = createAsyncThunk(
  "room/updateRoom",
  async ({ roomId, room, successAlert, errorAlert, type }) => {
    try {
      const data = await roomAPI.updateRoom(roomId, room);
      successAlert(type);
      return data;
    } catch (error) {
      errorAlert(error.message);
      throw error;
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async (roomId) => {
    try {
      const data = await roomAPI.deleteRoom(roomId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const uploadRoomImage = createAsyncThunk(
  "room/uploadRoomImage",
  async ({ roomId, image, successAlert, errorAlert, type }) => {
    try {
      const data = await roomAPI.uploadRoomImage(roomId, image);
      successAlert(type);
      return data;
    } catch (error) {
      errorAlert(error.message);
      throw error;
    }
  }
);

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async ({ room, successAlert, errorAlert, type }) => {
    try {
      const data = await roomAPI.createRoom(room);
      successAlert(type);
      return data;
    } catch (error) {
      errorAlert(error.message);
      throw error;
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomsList.pending, (state) => {
      return { ...state, isRoomsListLoading: true, roomsListError: null };
    });
    builder.addCase(getRoomsList.fulfilled, (state, { payload }) => {
      return { ...state, isRoomsListLoading: false, roomsList: payload };
    });
    builder.addCase(getRoomsList.rejected, (state, { error }) => {
      return {
        ...state,
        isRoomsListLoading: false,
        roomsListError: error.message,
      };
    });

    builder.addCase(getRoomDetails.pending, (state) => {
      return { ...state, isRoomDetailsLoading: true, roomDetailsError: null };
    });
    builder.addCase(getRoomDetails.fulfilled, (state, { payload }) => {
      return { ...state, isRoomDetailsLoading: false, roomDetails: payload };
    });
    builder.addCase(getRoomDetails.rejected, (state, { error }) => {
      return {
        ...state,
        isRoomDetailsLoading: false,
        roomDetailsError: error.message,
      };
    });

    builder.addCase(bookRoom.pending, (state) => {
      return {
        ...state,
        isBookingLoading: true,
        bookingError: null,
      };
    });
    builder.addCase(bookRoom.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isBookingLoading: false,
        bookingResponse: payload,
      };
    });
    builder.addCase(bookRoom.rejected, (state, { error }) => {
      return {
        ...state,
        isBookingLoading: false,
        bookingError: error.message,
      };
    });

    builder.addCase(updateRoom.pending, (state) => {
      return {
        ...state,
        isUpdatedRoomLoading: true,
        updatedRoomError: null,
      };
    });
    builder.addCase(updateRoom.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isUpdatedRoomLoading: false,
        updatedRoomResponse: payload,
      };
    });
    builder.addCase(updateRoom.rejected, (state, { error }) => {
      return {
        ...state,
        isUpdatedRoomLoading: false,
        updatedRoomError: error.message,
      };
    });

    builder.addCase(deleteRoom.pending, (state) => {
      return {
        ...state,
        isDeletedRoomLoading: true,
        deletedRoomError: null,
      };
    });
    builder.addCase(deleteRoom.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isDeletedRoomLoading: false,
        deletedRoomResponse: payload,
      };
    });
    builder.addCase(deleteRoom.rejected, (state, { error }) => {
      return {
        ...state,
        isDeletedRoomLoading: false,
        deletedRoomError: error.message,
      };
    });

    builder.addCase(uploadRoomImage.pending, (state) => {
      return {
        ...state,
        isUploadedRoomImageLoading: true,
        uploadedRoomImageError: null,
      };
    });
    builder.addCase(uploadRoomImage.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isUploadedRoomImageLoading: false,
        uploadedRoomImageResponse: payload,
      };
    });
    builder.addCase(uploadRoomImage.rejected, (state, { error }) => {
      return {
        ...state,
        isUploadedRoomImageLoading: false,
        uploadedRoomImageError: error.message,
      };
    });

    builder.addCase(createRoom.pending, (state) => {
      return {
        ...state,
        isCreatedRoomLoading: true,
        createdRoomError: null,
      };
    });
    builder.addCase(createRoom.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isCreatedRoomLoading: false,
        createdRoomResponse: payload,
      };
    });
    builder.addCase(createRoom.rejected, (state, { error }) => {
      return {
        ...state,
        isCreatedRoomLoading: false,
        createdRoomError: error.message,
      };
    });
  },
});

export default roomSlice.reducer;
