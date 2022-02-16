import globalAxios from "./global-axios";
class authManageServices {
  static register(type, payload) {
    return globalAxios.post(`auth/${type}/register`, payload);
  }
  // login services
  static getAllCountires() {
    return globalAxios.get("lists/countries");
  }
}
export default authManageServices;
