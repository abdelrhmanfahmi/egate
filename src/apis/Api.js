import axios from "axios";

const Api = axios.create({
    baseURL: 'https://api.dev.humhum.work/api/v1/'
});

export default Api;