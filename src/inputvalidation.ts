import { Request, Response, NextFunction } from "express";
import {log} from "./index"

const addressRegex = /^[a-zA-Z0-9\s,'-]*$/; // Regex pattern for validating address

export const inputvalidation = (req: Request, res: Response, next: NextFunction) => {
  const endpoint = req.originalUrl.split("/")[1];
  switch (endpoint) {
    case "books":
      if (req.originalUrl.endsWith("/new")) {
        if (
          typeof req.body.title === "string")
          {next();}
          else{
            res.status(400).send("title should always be a string");
            log("request denied as title is not an string")
          }
          if(typeof req.body.author === "string")
          {next();}
          else{
            res.status(400).send("author should always be a string");
            log("request denied as Author field is not an string")
          }
          if(typeof req.body.price === "number")
          {next();}
          else{
            res.status(400).send("price should always be a number");
          }
          if( req.body.price >= 0 )
          {next();}
          else{
            res.status(400).send("price should always be a positive number");
          }
          
      } else if (req.originalUrl.endsWith("/price")) {
        if (
          typeof req.body.title === "string" &&
          typeof req.body.author === "string" &&
          req.body.title.trim().length > 0 && // title should not be an empty string
          req.body.author.trim().length > 0 // author should not be an empty string
        ) {
          next();
        } else {
          res.status(400).send("Invalid values in the request body");
          log("Invalid values in the request body");
        }
      } else {
        res.status(404).send("Invalid endpoint");
        log("Invalid endpoint");
      }
      break;
    case "customers":
      if (req.originalUrl.endsWith("/new")) {
        if (
          typeof req.body.name === "string" &&
          typeof req.body.shippingAddress === "string" &&
          req.body.name.trim().length > 0 && // name should not be an empty string
          addressRegex.test(req.body.shippingAddress) // validate the shipping address with regex pattern
        ) {
          next();
        } else {
          res.status(400).send("Invalid request body");
        }
      } else if (req.originalUrl.endsWith("/address")) {
        if (
          typeof req.body.cid === "number" &&
          typeof req.body.address === "string" &&
          req.body.address.trim().length > 0 && // address should not be an empty string
          addressRegex.test(req.body.address) // validate the address with regex pattern
        ) {
          next();
        } else {
          res.status(400).send("Invalid request body");
        }
      } else if (req.originalUrl.endsWith("/balance")) {
        if (
          typeof req.body.cid === "number" &&
          req.body.cid >= 0 // cid should be a non-negative number
        ) {
          next();
        } else {
          res.status(400).send("Invalid request body");
        }
      } else {
        res.status(404).send("Invalid endpoint");
      }
      break;
    case "orders":
  if (req.originalUrl.endsWith("/new") || req.originalUrl.endsWith("/shipped")) {
    if (
      typeof req.body.title === "string" &&
      typeof req.body.author === "string" &&
      typeof req.body.name === "string" &&
      typeof req.body.shippingAddress === "string" &&
      req.body.title.trim().length > 0 && // title should not be an empty string
      req.body.author.trim().length > 0 && // author should not be an empty string
      req.body.name.trim().length > 0 && // name should not be an empty string
      req.body.shippingAddress.trim().length > 0 // shippingAddress should not be an empty string
    ) {
      next();
    } else {
      res.status(400).send("Invalid request body");
      log("can not create order as Invalid values in the request body");
    }
  } else if (req.originalUrl.endsWith("/ship")) {
    if (typeof req.body.pid === "number") {
      next();
    } else {
      res.status(400).send("Invalid request body");
      ("can not ship as Invalid values in the request body");
    }
  } else if (req.originalUrl.endsWith("/status")) {
    if (
      typeof req.body.cid === "number" &&
      typeof req.body.bid === "number"
    ) {
      next();
    } else {
      res.status(400).send("Invalid request body");
    }
  } else {
    res.status(404).send("Invalid endpoint");
  }
  break;
  default:
          res.status(404).send("Invalid endpoint");
      }
    };