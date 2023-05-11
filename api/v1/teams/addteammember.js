/*
 * @file: addteammember.js
 * @description: It will add team member in system according to ownder id with token it will auto calculate _id and email will send to member's email address.
 * @author: Jaswinder Kumar
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { addteammember } from "../../../controllers/user";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/addteammember:
 *  post:
 *   tags: ["Teams"]
 *   summary: Add team member
 *   description: It will add team member in system and email will send to member email address
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
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
  "/addteammember",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  addteammember
);

export default app;
