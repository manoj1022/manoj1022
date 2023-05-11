/*
 * @file: index.js
 * @description: It's combine all user routers.
 * @author: Jaswinder Kumar
 */

import login from "./login";
import logout from "./logout";
import register from "./register";

export default [
  login,logout,register
];
