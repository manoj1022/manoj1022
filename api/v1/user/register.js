/*
 * @file: register.js
 * @description: It Contain register router/api.
 * @author: Jaswinder Kumar
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { register } from "../../../controllers/user";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/register:
 *  post:
 *   tags: ["Auth"]
 *   summary: user login api
 *   description: api used to login users <br/>
 *   parameters:
 *      - in: body
 *        name: user
 *        description: The user to login.
 *        schema:
 *         type: object
 *         required:
 *          - user login
 *         properties:
 *           firstName:
 *             type: string
 *             required:
 *           lastName:
 *             type: string
 *             required:
 *           email:
 *             type: string
 *             required:
 *           phone:
 *              type: string
 *           password: 
 *             type: string
 *             required:  
 *           timeZone:
 *             type: string
 *           country:
 *             type: string             
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .label("First Name"),
  lastName: Joi.string()
    .required()
    .label("Last Name"),
  email: Joi.string()
    .trim()
    .required()
    .label("email"),
  phone: Joi.string()
    .trim()
    .label("Phone"),  
  password: Joi.string()
    .trim()
    .min(3)
    .required()
    .label("password"),
  timeZone: Joi.any()
    .optional()
    .allow("")
    .label("timeZone"),
  country: Joi.string()
    .optional()
    .allow("")
    .label("country")
});

app.post(
  "/register",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  register
);

export default app;
