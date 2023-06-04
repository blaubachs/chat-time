import axios from "axios";
import { UserObject } from "./interfaces";
const URL_PREFIX = "http://localhost:30001/api";

const API = {
  login: async (user: UserObject) => {
    try {
      const loginUser = await axios.post(`${URL_PREFIX}/api/users/login`, user);
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
      return createdUser.data;
    } catch (err) {
      return err;
    }
  },
};

export default API;
