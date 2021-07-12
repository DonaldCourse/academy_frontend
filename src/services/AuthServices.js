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

export default {
  login,
  logout,
  validateUser,
  register,
  updateProfile,
  getProfile,
};
