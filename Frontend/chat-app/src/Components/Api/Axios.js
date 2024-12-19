import Axios from "axios";

const Api = Axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default Api;
