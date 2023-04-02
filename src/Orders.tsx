import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LinearProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

/*
  TicketID: 1,
  Description:
      "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
  CreatedDate: "03/02/2023",
  AssignedTo: "lthomas0@telegraph.co.uk",
  Status: null,
*/

interface ITicket {
  TicketID: number;
  Description: string;
  CreatedDate: string;
  AssignedTo: string;
  Status: "Open" | "InProgress" | "CodeReview" | "Closed" | null;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type IticketWorkFlow = {
  Open: string[];
  InProgress: string[];
  CodeReview: string[];
  Closed: string[];
};

const ticketWorkFlow: IticketWorkFlow = {
  Open: ["Open", "InProgress", "CodeReview", "Closed"],
  InProgress: ["Open", "InProgress", "CodeReview"],
  CodeReview: ["InProgress", "CodeReview", "Closed"],
  Closed: ["CodeReview", "Closed"],
};

export default function Orders() {
  const [ticketsData, setTicketsData] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/tickets`)
      .then(async (response) => {
        const ticketsData: ITicket[] = await response.json();
        setTicketsData(ticketsData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error occurred while fetching tickets: ", error);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (
    event: SelectChangeEvent<string>,
    row: ITicket
  ) => {
    const updatedTickets: ITicket[] = ticketsData.map((ticket) => {
      if (ticket.TicketID === row.TicketID) {
        return {
          ...ticket,
          Status: event.target.value,
        };
      }
      return ticket;
    }) as ITicket[];

    setTicketsData(updatedTickets);
  };

  return loading ? (
    <LinearProgress />
  ) : (
    <React.Fragment>
      <Title>All Tickets</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Ticket ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ticketsData.map((row: ITicket) => (
            <TableRow key={row.TicketID}>
              <TableCell>
                <Link to={`/ticket/${row.TicketID}`} >
                  {row.TicketID}
                </Link>
              </TableCell>
              <TableCell>{row.Description}</TableCell>
              <TableCell>{row.CreatedDate}</TableCell>
              <TableCell>{row.AssignedTo}</TableCell>
              <TableCell sx={{ minWidth: "180px" }}>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={row.Status ? row.Status : "Open"}
                  onChange={(event: SelectChangeEvent<string>) =>
                    handleStatusChange(event, row)
                  }
                  MenuProps={MenuProps}
                  sx={{ width: "100%" }}
                >
                  {ticketWorkFlow[row.Status ? row.Status : "Open"].map(
                    (name) => (
                      <MenuItem
                        disabled={name === row.Status}
                        key={name}
                        value={name}
                      >
                        {name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
