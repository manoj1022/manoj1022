/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: Jaswinder Kumar
 */

import user from "./v1/user";
import teams from "./v1/teams";
/*********** Combine all Routes ********************/
export default [
    ...user,
    ...teams
];
