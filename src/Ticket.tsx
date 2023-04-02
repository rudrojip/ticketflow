import React, { useEffect, useState } from "react";
import Title from "./Title";
import {
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useParams } from "react-router-dom";

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
  Status: "Open" | "InProgress" | "CodeReview" | "Closed" | null | string;
  [key: string]: any;
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
  [key: string]: string[];
};

const ticketWorkFlow: IticketWorkFlow = {
  Open: ["Open", "InProgress", "CodeReview", "Closed"],
  InProgress: ["Open", "InProgress", "CodeReview"],
  CodeReview: ["InProgress", "CodeReview", "Closed"],
  Closed: ["CodeReview", "Closed"],
};

type IDisplayValuePair = {
  [key: string]: string;
  "Ticket ID": string;
  Description: string;
  "Created Date": string;
  "Assigned To": string;
  Status: string;
};

const DisplayValuePair: IDisplayValuePair = {
  "Ticket ID": "TicketID",
  Description: "Description",
  "Created Date": "CreatedDate",
  "Assigned To": "AssignedTo",
  Status: "Status",
};

export default function Ticket() {
  const { ticketId } = useParams();
  const [ticketData, setTicketData] = useState<ITicket>({
    AssignedTo: "",
    CreatedDate: "",
    Description: "",
    TicketID: 0,
    Status: "Open",
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/tickets/${ticketId}`)
      .then(async (response) => {
        const ticketsData: ITicket = await response.json();
        setTicketData(ticketsData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(
          `Error occurred while fetching ticket with Id ${ticketId}: `,
          error
        );
        setLoading(false);
      });
  }, [ticketId]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const updatedTicket: ITicket = {
      ...ticketData,
      Status: event.target.value || "Open",
    };

    setTicketData(updatedTicket);
  };

  return loading ? (
    <LinearProgress />
  ) : (
    <React.Fragment>
      <Title>Tickets Details</Title>
      <Box>
        <Container>
          <Paper>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(DisplayValuePair).map((key) => {
                  return (
                    <TableRow>
                      <TableCell>{`${key}`}</TableCell>
                      {key !== "Status" ? (
                        <TableCell>{`${
                          ticketData[DisplayValuePair[key]]
                        }`}</TableCell>
                      ) : (
                        <TableCell sx={{ minWidth: "180px" }}>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={ticketData.Status ? ticketData.Status : "Open"}
                            onChange={(event: SelectChangeEvent<string>) =>
                              handleStatusChange(event)
                            }
                            MenuProps={MenuProps}
                            sx={{ width: "100%" }}
                          >
                            {ticketWorkFlow[
                              ticketData.Status ? ticketData.Status : "Open"
                            ].map((name) => (
                              <MenuItem
                                disabled={name === ticketData.Status}
                                key={name}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {/* <Typography component="h2" variant="h6">
              {`Ticket ID: ${ticketData.TicketID}`}
            </Typography>
            <Divider />
            <Typography component="h2" variant="h6">
              {`Description: ${ticketData.Description}`}
            </Typography>
            <Divider />
            <Typography component="h2" variant="h6">
              {`Created Date: ${ticketData.CreatedDate}`}
            </Typography>
            <Typography component="h2" variant="h6">
              {`Assigned To: ${ticketData.AssignedTo}`}
            </Typography>
            <Typography component="h2" variant="h6">
              {`Status: `}
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={ticketData.Status ? ticketData.Status : "Open"}
                onChange={(event: SelectChangeEvent<string>) =>
                  handleStatusChange(event)
                }
                MenuProps={MenuProps}
                sx={{ width: "100%" }}
              >
                {ticketWorkFlow[ticketData?.Status || "Open"].map((name) => (
                  <MenuItem
                    disabled={name === ticketData.Status}
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Typography> */}
          </Paper>
        </Container>
      </Box>
    </React.Fragment>
  );
}
