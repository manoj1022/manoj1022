/*
 * @file: getteammember.js
 * @description: Get team members of owner. 
 * @author: Jaswinder Kumar
 */
import express from "express";
import { createValidator } from "express-joi-validation";
import Joi from "@hapi/joi";
import { getteammember } from "../../../controllers/user";
import { checkToken } from "../../../utilities/universal";
const app = express();
const validator = createValidator({ passError: true });

/**
 * @swagger
 * /api/v1/getteammembers:
 *  get:
 *   tags: ["Teams"]
 *   summary: getteam member
 *   description: It will get team member according to owner token.
 *   parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true           
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const userSchema = Joi.object({});
app.get(
  "/getteammembers",
  validator.body(userSchema, {
    joi: { convert: true, allowUnknown: false }
  }),
  checkToken,
  getteammember
);

export default app;
