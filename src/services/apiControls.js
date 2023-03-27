import globalAxios from "./global-axios";

export default {
    checkApiControls(){
        return globalAxios.get('api-controles')
    }
}