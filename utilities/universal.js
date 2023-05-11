/*
 * @file: universal.js
 * @description: It Contain function layer for all commom function.
 * @author: Jaswinder Kumar
 */
import md5 from "md5";
import jwt from "jsonwebtoken";
import config from "config";
const { jwtAlgo, jwtKey } = config.get("app");
import User from "../collections/user";
import { failAction } from "./response";
import Message from "./messages";
const nodemailer = require("nodemailer");
// password encryption.
export const encryptpassword = password => {
  return md5(password);
};
/*********** Generate JWT token *************/
export const generateToken = data =>
  jwt.sign(data, jwtKey, { algorithm: jwtAlgo, expiresIn: "90d" });
/*********** Decode JWT token *************/
export const decodeToken = token => jwt.verify(token, jwtKey);
/*********** Verify token *************/
export const checkToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  
  let decoded = {};
  try {
    decoded = jwt.verify(token, jwtKey);
  } catch (err) {
    return res.status(401).json(failAction(Message.tokenExpired, 401));
  }
  const user = await User.checkToken(token);

  if (user) {
    req.user = { ...decoded, token };
    next();
  } else {
    res.status(401).json(failAction(Message.unauthorizedUser, 401));
  }
};
/*********** Send email *************/
export const email = async (message, subject , next)=>{
  return new Promise((res,rej)=>{
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'socialsitemohamed@gmail.com',
        pass: 'sanju#@!321'
      }
    });
    
    let mailOptions = {
      from: 'socialsitemohamed@gmail.com',
      to: 'kumarsanju54@gmail.com',
      subject: subject,
      html: message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res(false)
      } else {
        console.log('Email sent: ' + info.response);
        res(true)
      }
    });

  })
};
