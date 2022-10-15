import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import { useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
} from "@mui/material";
import { deleteLocation, getLocationsList } from "../../slices/location";
import LocationForm from "./LocationForm";

const LocationsManagement = () => {
  const {
    locationsList,
    isLocationsListLoading,
    deletedLocationResponse,
    deletedLocationError,
    updatedLocationResponse,
    createdLocationResponse,
    uploadedLocationImageResponse,
  } = useSelector((state) => state.location);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !locationsList.length ||
      Object.keys(deletedLocationResponse).length ||
      Object.keys(updatedLocationResponse).length ||
      Object.keys(createdLocationResponse).length ||
      Object.keys(uploadedLocationImageResponse).length
    ) {
      dispatch(getLocationsList(""));
    }
  }, [
    deletedLocationResponse,
    updatedLocationResponse,
    createdLocationResponse,
    uploadedLocationImageResponse,
  ]);

  useEffect(() => {
    if (Object.keys(deletedLocationResponse).length) {
      successDelete();
    }
  }, [deletedLocationResponse]);

  useEffect(() => {
    if (deletedLocationError) {
      errorDelete();
    }
  }, [deletedLocationError]);

  const { enqueueSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = useState(false);

  const selectedLocation = useRef(null);

  const successDelete = () => {
    enqueueSnackbar("Delete location successfully!", { variant: "success" });
  };

  const errorDelete = () => {
    enqueueSnackbar(`${deletedLocationError}`, {
      variant: "error",
    });
  };

  const handleEdit = (location) => {
    setOpenModal(true);
    selectedLocation.current = location;
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        display: false,
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "province",
      label: "Province",
    },
    {
      name: "country",
      label: "Country",
    },
    {
      name: "image",
      label: "Image",
      options: {
        customBodyRender: (value) => {
          return (
            <Box
              component="img"
              src={value}
              sx={{ maxWidth: 50, width: "auto" }}
            />
          );
        },
      },
    },
    {
      name: "valueate",
      label: "Evaluate",
    },
    {
      name: "Manipulation",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              color="warning"
              aria-label="delete"
              onClick={() => handleEdit({ ...tableMeta.rowData })}
            >
              <BuildRoundedIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    selectableRows: "single",
    filterType: "dropdown",
    responsive: "standard",
    rowsPerPage: 10,
    onRowsDelete: (rowsDeleted) => {
      const locationId = rowsDeleted.data.map(
        (d) => locationsList[d.dataIndex]._id
      );
      dispatch(deleteLocation(locationId));
    },
    customToolbar: () => (
      <Tooltip title={"Add"}>
        <IconButton onClick={() => handleEdit(null)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    ),
  };

  return (
    <React.Fragment>
      {isLocationsListLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <MUIDataTable
            title={"Location Management"}
            data={locationsList}
            columns={columns}
            options={options}
          />

          <Dialog open={openModal}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
              <Typography>
                {selectedLocation.current ? "Update Location" : "Add Location"}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <LocationForm
                location={selectedLocation.current}
                onModal={handleClose}
              />
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </React.Fragment>
  );
};

export default LocationsManagement;
