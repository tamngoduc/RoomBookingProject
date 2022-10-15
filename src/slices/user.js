import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../services/userAPI";

const initialState = {
  userDetails: {},
  isUserDetailsLoading: false,
  userDetailsError: null,

  usersList: [],
  isUsersListLoading: false,
  usersListError: null,

  updatedUserResponse: {},
  isUpdatedUserLoading: false,
  updatedUserError: null,

  deletedUserResponse: {},
  isDeletedUserLoading: false,
  deletedUserError: null,

  addedUserResponse: {},
  isAddedUserLoading: false,
  addedUserError: null,

  uploadedAvatarResponse: {},
  isUploadedAvatarLoading: false,
  uploadedAvatarError: null,
};

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (userId) => {
    try {
      const data = await userAPI.getUserDetails(userId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getUsersList = createAsyncThunk("user/getUsersList", async () => {
  try {
    const data = await userAPI.getUsersList();
    return data;
  } catch (error) {
    throw error;
  }
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, user, successAlert, errorAlert, type }) => {
    try {
      const data = await userAPI.updateUser(userId, user);
      successAlert(type);
      return data;
    } catch (error) {
      errorAlert(error.message);
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId) => {
    try {
      const data = await userAPI.deleteUser(userId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async ({ user, successAlert, errorAlert, type }) => {
    try {
      const data = await userAPI.addUser(user);
      successAlert(type);
      return data;
    } catch (error) {
      errorAlert(error.message);
      throw error;
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async ({ avatar, successAlert, errorAlert }) => {
    try {
      const data = await userAPI.uploadAvatar(avatar);
      successAlert();
      return data;
    } catch (error) {
      errorAlert(error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      return { ...state, isUserDetailsLoading: true, userDetailsError: null };
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      return { ...state, isUserDetailsLoading: false, userDetails: payload };
    });
    builder.addCase(getUserDetails.rejected, (state, { error }) => {
      return {
        ...state,
        isUserDetailsLoading: false,
        userDetailsError: error.message,
      };
    });

    builder.addCase(getUsersList.pending, (state) => {
      return { ...state, isUsersListLoading: true, usersListError: null };
    });
    builder.addCase(getUsersList.fulfilled, (state, { payload }) => {
      return { ...state, isUsersListLoading: false, usersList: payload };
    });
    builder.addCase(getUsersList.rejected, (state, { error }) => {
      return {
        ...state,
        isUsersListLoading: false,
        usersListError: error.message,
      };
    });

    builder.addCase(updateUser.pending, (state) => {
      return {
        ...state,
        isUpdatedUserLoading: true,
        updatedUserError: null,
      };
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isUpdatedUserLoading: false,
        updatedUserResponse: payload,
      };
    });
    builder.addCase(updateUser.rejected, (state, { error }) => {
      return {
        ...state,
        isUpdatedUserLoading: false,
        updatedUserError: error.message,
      };
    });

    builder.addCase(deleteUser.pending, (state) => {
      return {
        ...state,
        isDeletedUserLoading: true,
        deletedUserError: null,
      };
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isDeletedUserLoading: false,
        deletedUserResponse: payload,
      };
    });
    builder.addCase(deleteUser.rejected, (state, { error }) => {
      return {
        ...state,
        isDeletedUserLoading: false,
        deletedUserError: error.message,
      };
    });

    builder.addCase(addUser.pending, (state) => {
      return {
        ...state,
        isAddedUserLoading: true,
        addedUserError: null,
      };
    });
    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isAddedUserLoading: false,
        addedUserResponse: payload,
      };
    });
    builder.addCase(addUser.rejected, (state, { error }) => {
      return {
        ...state,
        isAddedUserLoading: false,
        addedUserError: error.message,
      };
    });

    builder.addCase(uploadAvatar.pending, (state) => {
      return {
        ...state,
        isUploadedAvatarLoading: true,
        uploadedAvatarError: null,
      };
    });
    builder.addCase(uploadAvatar.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isUploadedAvatarLoading: false,
        uploadedAvatarResponse: payload,
      };
    });
    builder.addCase(uploadAvatar.rejected, (state, { error }) => {
      return {
        ...state,
        isUploadedAvatarLoading: false,
        uploadedAvatarError: error.message,
      };
    });
  },
});

export default userSlice.reducer;
