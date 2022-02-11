import globalAxios from "./global-axios";
class authManageServices {
  // login services
  static getAllCountires() {
    return globalAxios.get("lists/countries");
  }
}
export default authManageServices;
