import axios from "axios";

const guestToken = axios.create({
    baseURL: process.env.VUE_APP_AXSIOS_LINK,
});

guestToken.interceptors.response.use(
    (response) => {
        console.log(response);
        if (response.status == 200) {
            localStorage.setItem("guest-token", response.data.items.uuid);
        }
    },
    (error) => {
        if (error.response.status == 400) {
            console.log('user has already guest token');
        }
        return Promise.reject(error);
    }
);

export default guestToken;