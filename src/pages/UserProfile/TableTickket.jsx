import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Box, CircularProgress } from "@mui/material";
import { getTicketsList } from "../../slices/ticket";
import { useSelector, useDispatch } from "react-redux";
import { flexCenter } from "../../themes/comonStyles";

const TableTicket = () => {
  const { ticketsList, isTicketsListLoading, ticketsListError } = useSelector(
    (store) => store.ticket
  );

  const userId = useSelector((store) => store.auth.currentUser.user._id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTicketsList(userId));
  }, [userId]);

  const columns = [
    {
      name: "roomId",
      label: "Place",
      options: {
        customBodyRender: (value) => {
          return <Box>{value?.name}</Box>;
        },
        filter: true,
        display: "true",
        customFilterListOptions: { render: (value) => value.name },
      },
    },
    {
      name: "checkIn",
      label: "Check-In",
      options: {
        customBodyRender: (value) => {
          return <Box>{value.slice(0, 10)}</Box>;
        },
      },
    },
    {
      name: "checkOut",
      label: "Check-Out",
      options: {
        customBodyRender: (value) => {
          return <Box>{value.slice(0, 10)}</Box>;
        },
      },
    },
    {
      name: "roomId",
      label: "Image",
      options: {
        customBodyRender: (value) => {
          return (
            <Box
              component="img"
              src={value?.image}
              sx={{ maxWidth: 50, width: "auto" }}
            />
          );
        },
      },
    },
    {
      name: "roomId",
      label: "Price (VND)",
      options: {
        customBodyRender: (value) => {
          return <Box>{value?.price}</Box>;
        },
      },
    },
  ];
  const options = {
    filter: false,
    selectableRows: "none",
    filterType: "dropdown",
    responsive: "standard",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  };

  if (ticketsListError) {
    return <Box>{ticketsListError}</Box>;
  }

  return (
    <React.Fragment>
      {isTicketsListLoading ? (
        <Box sx={flexCenter}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: "100vw", overflow: "visible" }}>
          <MUIDataTable
            title={"Reservations History"}
            data={ticketsList.map((ticket) => ticket).reverse()}
            columns={columns}
            options={options}
          />
        </Box>
      )}
    </React.Fragment>
  );
};

export default TableTicket;
