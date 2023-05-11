/*
 * @file: index.js
 * @description: It Contain function layer for teams collection.
 * @author: Jaswinder Kumar
 */

import mongoose from "mongoose";
import dbSchema from "./db-schema";

class TeamClass {
  static save(payload) {
    return this(payload).save();
  }
  static checkTeam(payload) {
    return this.findOne(payload);
  }
  static findOneByCondition(condition) {   
    return this.findOne(condition);
  }
  static findByCondition(condition,options) {
    return this.find(condition,options);
  }
}

dbSchema.loadClass(TeamClass);

export default mongoose.model("Team", dbSchema);
