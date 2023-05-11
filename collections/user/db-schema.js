/*
 * @file: db-schema.js
 * @description: It Contain db schema for user collection.
 * @author: Jaswinder Kumar
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: ""
    },
    lastName: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required:true
    },
    password: {
      type: String,
      required:true
    },
    timeZone: {
      type: String,
      required: true
    },
    expireTime: {
      type: Date
    },
    country: {
      type:String
    },
    loginToken: [
      {
        token: {
          type: String,
          default: ""
        },
        deviceToken: {
          type: String,
          default: null
        },
        createdAt: {
          type: Date,
          default: new Date()
        }
      }
    ],
    status: {
      type: Number,
      default: 1 // 0 account deleted, 1 active, 2 block
    },
    lastLogin: {
      type: Date,
      default: null
    },
    isDeleted :{
      type: Boolean,
      default: false
    },
    role: {
      type: Number,
      default:1,
      enum: [1,2] //1 = owner , 2 = member 
    }
  },
  { timestamps: true }
);

export default userSchema;
