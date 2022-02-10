import axios from "axios";

let hasToken = null;

if (process.client) {
  hasToken = JSON.parse(localStorage.getItem("userData"));
}
const globalAxios = axios.create({
  baseURL: "http://3.144.231.4/api/v1",
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Content-Type": "multipart/form-data",
    Authorization: hasToken ? `Bearer ${hasToken.api_token}` : "",
  },
});

export default globalAxios;
