import axios from "axios";

const Api = axios.create({
    baseURL: "https://api.humhum.work/api/v1/",
});

export const baseURL = process.env.VUE_APP_AXSIOS_LINK;
export default Api;