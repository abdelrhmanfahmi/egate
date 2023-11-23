import globalAxios from "./global-axios";
export default {
    getCountries() {
        return globalAxios.get('countries?paginate=0');
    },
    getStates(countryId) {
        return globalAxios.get(`governorates?country_id=${countryId}&paginate=0`);
    },
    getCities(cityId) {
        return globalAxios.get(`cities?governorate_id=${cityId}&paginate=0`);
    },
    getSailPoints() {
        return globalAxios.get(`client/sail-points`);
    }
}