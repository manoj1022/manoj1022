/*
 * @file: user.js
 * @description: It Contain function layer for user service.
 * @author: Jaswinder Kumar
 */

import User from "../collections/user";
import Teams from "../collections/teams";
import Message from "../utilities/messages";
import { encryptpassword, generateToken ,email } from "../utilities/universal";

export const registerService = async (payload) => {
  let chkUser = { email : payload.email }
  var userData = await User.checkUser(chkUser);
  if (!userData) {
    
    payload['password'] = encryptpassword(payload['password']);

    userData = await User.saveUser({
      ...payload,
    });
    return {success:true}
  }else{
    return { success:false }
  }
}
/********** Save users **********/
export const save = async payload => {
  if (await User.checkEmail(payload.email))
    throw new Error(Message.emailAlreadyExists);

  payload.password = encryptpassword(payload.password);

  const userData = await User.saveUser({
    ...payload,
    role:3
  });
  return userData;
};

/********** Login users **********/
export const onLogin = async payload => {

  payload['password'] = encryptpassword(payload['password']); 
  const userData = await User.findOneByCondition({email : payload.email , password : payload.password});

  let loginToken = generateToken({
    when: new Date(),
    lastLogin: userData.lastLogin,
    userId: userData._id
  });
  const data = await User.onLoginDone(userData._id, loginToken, payload);
  return {
    _id: data._id,
    firstName:data.firstName,
    lastName:data.lastName,
    email:data.email,
    number:data.number,
    role : data.role,
    token: data.loginToken[data.loginToken.length - 1].token
  };
};
/********** Logout users **********/
export const logoutUser = async payload => {
  return await User.logout(payload.userId, payload.token);
};

/********* get users *********/
export const getUsers = async (filter,options,sort) => {
  let data = await User.findByCondition(filter,options).sort(sort);
  return data
};

/********* get members of owner *********/
export const getteammemberService = async (payload) => {
  return await Teams.find({owner : payload.ownerId},{owner : 0, __v : 0}).populate('member','-password -loginToken -status -lastLogin -isDeleted -__v');
}

