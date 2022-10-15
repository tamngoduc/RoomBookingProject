import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import { useSnackbar } from "notistack";
import { deleteUser, getUsersList } from "../../slices/user";
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
import UserForm from "./UserForm";

const UsersManagement = () => {
  const {
    usersList,
    isUsersListLoading,
    deletedUserResponse,
    deletedUserError,
    updatedUserResponse,
    addedUserResponse,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !usersList.length ||
      Object.keys(deletedUserResponse).length ||
      Object.keys(updatedUserResponse).length ||
      Object.keys(addedUserResponse).length
    ) {
      dispatch(getUsersList());
    }
  }, [deletedUserResponse, updatedUserResponse, addedUserResponse]);

  useEffect(() => {
    if (Object.keys(deletedUserResponse).length) {
      successDelete();
    }
  }, [deletedUserResponse]);

  useEffect(() => {
    if (deletedUserError) {
      errorDelete();
    }
  }, [deletedUserError]);

  const { enqueueSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = useState(false);

  const selectedUser = useRef(null);

  const successDelete = () => {
    enqueueSnackbar("Delete user successfully!", { variant: "success" });
  };

  const errorDelete = () => {
    enqueueSnackbar(`${deletedUserError}`, { variant: "error" });
  };

  const handleEdit = (user) => {
    setOpenModal(true);
    selectedUser.current = user;
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
      name: "email",
      label: "Email",
    },
    {
      name: "phone",
      label: "Phone",
    },
    {
      name: "address",
      label: "Address",
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        customBodyRender: (value) => {
          return <Typography>{value ? "Male" : "Female"}</Typography>;
        },
      },
    },
    {
      name: "birthday",
      label: "Date of Birth",
      options: {
        customBodyRender: (value) => {
          return (
            <Typography>{value ? String(value).slice(0, 10) : null}</Typography>
          );
        },
      },
    },
    {
      name: "type",
      label: "Type",
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
      const userId = rowsDeleted.data.map((d) => usersList[d.dataIndex]._id);
      dispatch(deleteUser(userId));
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
      {isUsersListLoading ? (
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
            title={"User Management"}
            data={usersList}
            columns={columns}
            options={options}
          />
          <Dialog open={openModal}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
              <Typography>
                {selectedUser.current ? "Update User" : "Add User"}
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
              <UserForm user={selectedUser.current} onModal={handleClose} />
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </React.Fragment>
  );
};

export default UsersManagement;
