import globalAxios from "./global-axios";

export default {
  // register
  register(type, payload) {
    return globalAxios.post(`auth/${type}/register`, payload);
  },
  getAllCountires() {
    return globalAxios.get("lists/countries");
  },
};
