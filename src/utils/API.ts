import axios from "axios";
import { NewExpeditionForm, UserObject } from "./interfaces";
const URL_PREFIX = "http://localhost:3001/api";

const API = {
  login: async (user: UserObject) => {
    try {
      const loginUser = await axios.post(`${URL_PREFIX}/users/login`, user);
      console.log(loginUser);
      return loginUser.data;
    } catch (err) {
      return err;
    }
  },
  signup: async (user: UserObject) => {
    try {
      const createdUser = await axios.post(`${URL_PREFIX}/users/signup`, user);
      console.log(createdUser);
      return createdUser.data;
    } catch (err) {
      return err;
    }
  },
  isValidToken: async (token: string) => {
    const checkToken = await axios.get(
      `${URL_PREFIX}/users/token/isValidToken`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(checkToken);
    return checkToken;
  },
  createNewExpedition: async (newExp: NewExpeditionForm) => {
    try {
      const createdExp = await axios.post(
        `${URL_PREFIX}/expeditions/new`,
        newExp
      );
      console.log(createdExp);
      return createdExp.data;
    } catch (err) {
      return err;
    }
  },
  getOneRoom: async (roomId: string) => {
    try {
      console.log(roomId);
      const foundRoom = await axios.get(`${URL_PREFIX}/expeditions/${roomId}`);
      return foundRoom.data;
    } catch (err) {
      return err;
    }
  },
  getAllRooms: async () => {
    try {
      const allRooms = await axios.get(`${URL_PREFIX}/expeditions`);
      return allRooms.data;
    } catch (err) {
      return err;
    }
  },
};

export default API;
