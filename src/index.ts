import express, { Express } from "express";
import * as handlers from "./handlers";
import bodyParser from "body-parser";
import { inputvalidation } from "./inputvalidation";
import { appendFileSync } from "fs";

//log implementation
import * as fs from 'fs';

export const log = (message: string) => {
    fs.appendFileSync('log.txt', `${new Date().toUTCString()}: ${message}\n`);
  };

const app: Express = express();
const port = 8080;

app.use(bodyParser.json());
app.use(inputvalidation);

app.post("/books/new", (req, res) => {
  handlers.createBook(req, res);
  log("New book has been created")
});

app.get("/books/price", (req, res) => {
  handlers.getPrice(req, res);
  log("Book prices has been Retrieved");
});

app.post("/customers/new", (req, res) => {
  handlers.createCustomer(req, res);
  log("New customer has been created");
});

app.put("/customers/address", (req, res) => {
  handlers.updateCustomerAddress(req, res);
  log("Customer address has been updated");
});

app.get("/customers/balance", (req, res) => {
  handlers.getCustomerBalance(req, res);
 log("Customer balance has been retrieved");
});

app.post("/orders/new", (req, res) => {
  handlers.createOrder(req, res);
  log("A new order has been created");
});

app.get("/orders/shipped", (req, res) => {
  handlers.getShipmentStatus(req, res);
  log("Shipment status has been retrieved");
});

app.put("/orders/ship", (req, res) => {
  handlers.shipOrder(req, res);
  log("An order has been shipped");
});

app.get("/orders/status", (req, res) => {
  handlers.getOrderStatus(req, res);
  log("Order status has been retrieved");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
