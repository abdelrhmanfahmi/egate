import axios from "axios";

const Api = axios.create({
    baseURL: process.env.VUE_APP_AXIOS_LINK,
});

export const baseURL = process.env.VUE_APP_AXIOS_LINK;
export default Api;