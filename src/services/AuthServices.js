import { postAPI, getAPI, delAPI, postAPIConfig, putAPI } from "./index";

const target = "/api/auth/login";

const login = (data) => {
  return postAPI(target, data);
};

const logout = () => {
  return getAPI("/api/auth/logout");
};

const validateUser = () => {
  return getAPI("/api/auth/validate-user", {});
};

const register = (body) => {
  return postAPI("/api/auth/register", body);
};

const updateProfile = (body) => {
  return putAPI("/api/profile", body);
};

const getProfile = (body) => {
  return getAPI("/api/profile", body);
};

const validateRegister = (token) => {
  return getAPI(`/api/auth/validate-account?token=${token}`);
};

const updatePassword = (body) => {
  return postAPI("/api/auth/updatepassword", body);
};

const forgotPassword = (body) => {
  return postAPI("/api/auth/forgotpassword", body);
};

const resetPassword = (body, token) => {
  return postAPI(`/api/auth/resetpassword?token=${token}`, body);
};

export default {
  login,
  logout,
  validateUser,
  register,
  updateProfile,
  getProfile,
  validateRegister,
  updatePassword,
  forgotPassword,
  resetPassword
};
