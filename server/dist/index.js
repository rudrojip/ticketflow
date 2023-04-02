"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const MOCK_DATA_1 = __importDefault(require("./mockData/MOCK_DATA"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/tickets", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.send(MOCK_DATA_1.default);
});
app.get("/tickets/:ticketId", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.send(MOCK_DATA_1.default.find((ticket) => ticket.TicketID === parseInt(req.params.ticketId)));
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
