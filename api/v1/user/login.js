/*
 * @file: login.js
 * @description: It Contain login router/api.
 * @author: Jaswinder Kumar
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { login } from "../../../controllers/user";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/login:
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
 *           email:
 *             type: string
 *             required:
 *           password:
 *             type: string
 *             required:
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({
  email: Joi.string()
    .required()
    .label("email"),
  password: Joi.string()
    .required()
    .label("Password")
});

app.post(
  "/login",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  login
);

export default app;
