import axios from "axios";
import { UserObject } from "./interfaces";
const URL_PREFIX = "http://localhost:30001/api";

const API = {
  login: async (user: UserObject) => {
    try {
      const loginUser = await axios.post(`${URL_PREFIX}/api/users/login`, user);
      console.log(loginUser);
      return loginUser.data;
    } catch (err) {
      return err;
    }
  },
  signup: async (user: UserObject) => {
    try {
      const createdUser = await axios.post(
        `${URL_PREFIX}/api/users/signup`,
        user
      );
      console.log(createdUser);
      return createdUser.data;
    } catch (err) {
      return err;
    }
  },
};

export default API;
