import axios from "axios";

const Api = axios.create({
    baseURL: process.env.VUE_APP_AXSIOS_LINK,
});

export const baseURL = process.env.VUE_APP_AXSIOS_LINK;
export default Api;