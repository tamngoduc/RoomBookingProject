import React, { useEffect, useState, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, getRoomsList } from "../../slices/room";
import RoomForm from "./RoomForm";
import { getLocationsList } from "../../slices/location";

const RoomsManagement = () => {
  const {
    roomsList,
    isRoomsListLoading,
    deletedRoomResponse,
    deletedRoomError,
    updatedRoomResponse,
    createdRoomResponse,
    uploadedRoomImageResponse,
  } = useSelector((state) => state.room);

  const { locationsList } = useSelector((state) => state.location);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !roomsList.length ||
      Object.keys(deletedRoomResponse).length ||
      Object.keys(updatedRoomResponse).length ||
      Object.keys(createdRoomResponse).length ||
      Object.keys(uploadedRoomImageResponse).length
    ) {
      dispatch(getRoomsList(""));
    }
  }, [
    deletedRoomResponse,
    updatedRoomResponse,
    createdRoomResponse,
    uploadedRoomImageResponse,
  ]);

  useEffect(() => {
    if (!locationsList.length) {
      dispatch(getLocationsList(""));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(deletedRoomResponse).length) {
      successDelete();
    }
  }, [deletedRoomResponse]);

  useEffect(() => {
    if (deletedRoomError) {
      errorDelete();
    }
  }, [deletedRoomError]);

  const { enqueueSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = useState(false);

  const selectedRoom = useRef(null);

  const successDelete = () => {
    enqueueSnackbar("Delete room successfully!", { variant: "success" });
  };

  const errorDelete = () => {
    enqueueSnackbar(`${deletedRoomError}`, { variant: "error" });
  };

  const handleEdit = (room) => {
    setOpenModal(true);
    selectedRoom.current = room;
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
      name: "locationId",
      label: "Location",
      options: {
        customBodyRender: (value) => {
          return <Box>{value ? `${value.name}, ${value.province}` : null}</Box>;
        },
      },
    },
    {
      name: "guests",
      label: "Guests",
    },
    {
      name: "bedRoom",
      label: "Bedroom",
    },
    {
      name: "bath",
      label: "Bath",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "price",
      label: "Price",
    },
    {
      name: "elevator",
      label: "elevator",
      options: {
        display: false,
      },
    },
    {
      name: "pool",
      options: {
        display: false,
      },
    },
    {
      name: "dryer",
      options: {
        display: false,
      },
    },
    {
      name: "gym",
      options: {
        display: false,
      },
    },
    {
      name: "kitchen",
      options: {
        display: false,
      },
    },
    {
      name: "wifi",
      options: {
        display: false,
      },
    },
    {
      name: "heating",
      options: {
        display: false,
      },
    },
    {
      name: "cableTV",
      options: {
        display: false,
      },
    },
    {
      name: "hotTub",
      options: {
        display: false,
      },
    },
    {
      name: "indoorFireplace",
      options: {
        display: false,
      },
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
      const roomId = rowsDeleted.data.map((d) => roomsList[d.dataIndex]._id);
      dispatch(deleteRoom(roomId));
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
      {isRoomsListLoading ? (
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
            title={"Room Management"}
            data={roomsList}
            columns={columns}
            options={options}
          />

          <Dialog open={openModal}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
              <Typography>
                {selectedRoom.current ? "Update Room" : "Add Room"}
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
              <RoomForm room={selectedRoom.current} onModal={handleClose} />
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </React.Fragment>
  );
};

export default RoomsManagement;
