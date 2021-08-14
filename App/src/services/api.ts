import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

if(!manifest) {
  throw new Error();
}


const api = axios.create({
  baseURL: 'http://192.168.0.106:3333',
});

export default api;
