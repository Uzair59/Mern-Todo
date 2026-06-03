import API from "../api/axios";

export const signupUser = async (data) => {
  return await API.post("/auth/register", data);
};

export const loginUser = async (data) => {
  return await API.post("/auth/login", data);
};