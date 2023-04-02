import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import MockData from "./mockData/MOCK_DATA";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/tickets", (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send(MockData);
});

app.get("/tickets/:ticketId", (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send(
    MockData.find((ticket) => ticket.TicketID === parseInt(req.params.ticketId))
  );
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
