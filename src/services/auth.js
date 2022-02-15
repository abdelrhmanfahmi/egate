import globalAxios from "./global-axios";
class authManageServices {
  static register(payload) {
    return globalAxios.post("auth/b2c/register" , payload);
  }
  // login services
  static getAllCountires() {
    return globalAxios.get("lists/countries");
  }
}
export default authManageServices;
