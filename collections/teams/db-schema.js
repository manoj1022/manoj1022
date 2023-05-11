/*
 * @file: db-schema.js
 * @description: It Contain db schema for user collection.
 * @author: Jaswinder Kumar
 */

import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User"
      },
    member: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User"
    },
    createdAt: {
      type: Date,
      default: new Date()
    }
  },
  { timestamps: true }
);

export default teamSchema;
