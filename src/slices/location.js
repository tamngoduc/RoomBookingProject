import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import locationAPI from "../services/locationAPI";

const initialState = {
  locationsList: [],
  isLocationsListLoading: false,
  locationsListError: null,

  locationDetails: {},
  isLocationDetailsLoading: false,
  locationDetailsError: null,

  updatedLocationResponse: {},
  isUpdatedLocationLoading: false,
  updatedLocationError: null,

  deletedLocationResponse: {},
  isDeletedLocationLoading: false,
  deletedLocationError: null,

  uploadedLocationImageResponse: {},
  isUploadedLocationImageLoading: false,
  uploadedLocationImageError: null,

  createdLocationResponse: {},
  isCreatedLocationLoading: false,
  createdLocationError: null,
};

export const getLocationsList = createAsyncThunk(
  "location/getLocationsList",
  async (location) => {
    try {
      const data = await locationAPI.getLocationsList(location);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getLocationDetails = createAsyncThunk(
  "location/getLocationDetails",
  async (locationId) => {
    try {
      const data = await locationAPI.getLocationDetails(locationId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async ({ locationId, location, successAlert, errorAlert, type }) => {
    try {
      const data = await locationAPI.updateLocation(locationId, location);
      successAlert(type);
      return data;
    } catch (error) {
      errorAlert(error.message);
      throw error;
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "location/deleteLocation",
  async (locationId) => {
    try {
      const data = await locationAPI.deleteLocation(locationId);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const uploadLocationImage = createAsyncThunk(
  "location/uploadLocationImage",
  async ({ locationId, image, successAlert, errorAlert, type }) => {
    try {
      const data = await locationAPI.uploadLocationImage(locationId, image);
      successAlert(type);
      return data;
    } catch (error) {
      errorAlert(error.message);
      throw error;
    }
  }
);

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async ({ location, successAlert, errorAlert, type }) => {
    try {
      const data = await locationAPI.createLocation(location);
      successAlert(type);
      return data;
    } catch (error) {
      errorAlert(error.message);
      throw error;
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocationsList.pending, (state) => {
      return {
        ...state,
        isLocationsListLoading: true,
        locationsListError: null,
      };
    });
    builder.addCase(getLocationsList.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLocationsListLoading: false,
        locationsList: payload,
      };
    });
    builder.addCase(getLocationsList.rejected, (state, { error }) => {
      return {
        ...state,
        isLocationsListLoading: false,
        locationsListError: error.message,
      };
    });

    builder.addCase(getLocationDetails.pending, (state) => {
      return {
        ...state,
        isLocationDetailsLoading: true,
        locationDetailsError: null,
      };
    });
    builder.addCase(getLocationDetails.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLocationDetailsLoading: false,
        locationDetails: payload,
      };
    });
    builder.addCase(getLocationDetails.rejected, (state, { error }) => {
      return {
        ...state,
        isLocationDetailsLoading: false,
        locationDetailsError: error.message,
      };
    });

    builder.addCase(updateLocation.pending, (state) => {
      return {
        ...state,
        isUpdatedLocationLoading: true,
        updatedLocationError: null,
      };
    });
    builder.addCase(updateLocation.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isUpdatedLocationLoading: false,
        updatedLocationResponse: payload,
      };
    });
    builder.addCase(updateLocation.rejected, (state, { error }) => {
      return {
        ...state,
        isUpdatedLocationLoading: false,
        updatedLocationError: error.message,
      };
    });

    builder.addCase(deleteLocation.pending, (state) => {
      return {
        ...state,
        isDeletedLocationLoading: true,
        deletedLocationError: null,
      };
    });
    builder.addCase(deleteLocation.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isDeletedLocationLoading: false,
        deletedLocationResponse: payload,
      };
    });
    builder.addCase(deleteLocation.rejected, (state, { error }) => {
      return {
        ...state,
        isDeletedLocationLoading: false,
        deletedLocationError: error.message,
      };
    });

    builder.addCase(uploadLocationImage.pending, (state) => {
      return {
        ...state,
        isUploadedLocationImageLoading: true,
        uploadedLocationImageError: null,
      };
    });
    builder.addCase(uploadLocationImage.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isUploadedLocationImageLoading: false,
        uploadedLocationImageResponse: payload,
      };
    });
    builder.addCase(uploadLocationImage.rejected, (state, { error }) => {
      return {
        ...state,
        isUploadedLocationImageLoading: false,
        uploadedLocationImageError: error.message,
      };
    });

    builder.addCase(createLocation.pending, (state) => {
      return {
        ...state,
        isCreatedLocationLoading: true,
        createdLocationError: null,
      };
    });
    builder.addCase(createLocation.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isCreatedLocationLoading: false,
        createdLocationResponse: payload,
      };
    });
    builder.addCase(createLocation.rejected, (state, { error }) => {
      return {
        ...state,
        isCreatedLocationLoading: false,
        createdLocationError: error.message,
      };
    });
  },
});

export default locationSlice.reducer;
