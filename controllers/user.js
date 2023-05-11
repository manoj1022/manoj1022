  /*
 * @file: user.js
 * @description: It Contain function layer for user controller.
 * @author: Jaswinder Kumar
 */

import { successAction, failAction } from "../utilities/response";
import { registerService, onLogin, logoutUser, addteammemberService, getteammemberService } from "../services/user";
import Message from "../utilities/messages";

/**************** registerUser ***********/
export const register = async (req, res, next) => {
  const payload = req.body;
  try { 
      const data = await registerService(payload);
      if(data.success == false){
        res.json(failAction(Message.emailAlreadyExists));
        return false;
      }
      res.json(successAction(data, Message.userAdded));
  } catch(error) {
      res.json(failAction(error.message));
  }
};
/**************** appLogin ***********/
export const login = async (req, res, next) => {
  const payload = req.body;
  try {
    const data = await onLogin(payload);
    res.status(200).json(successAction(data, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Logout user ***********/
export const logout = async (req, res, next) => {
  const payload = req.user;
  try {
    await logoutUser(payload);
    res.status(200).json(successAction(null, Message.success));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**************** Add TeamMembers ***********/
export const addteammember = async (req, res, next) => {
  const payload = req.body;
  try { 
      payload['ownerId'] = req.user.userId
      const data = await addteammemberService(payload);
      if(data.success == false){
        res.json(failAction(Message.emailAlreadyExists));
        return false;
      }
      res.json(successAction(data, Message.userAdded));
  } catch(error) {
      res.json(failAction(error.message));
  }
};

/**************** Get Team Members ***********/
export const getteammember = async (req, res, next) => {
  const payload = req.body;
  try { 
      payload['ownerId'] = req.user.userId;
      const data = await getteammemberService(payload);
      res.json(successAction(data, Message.success));
  } catch(error) {
      res.json(failAction(error.message));
  }
};

