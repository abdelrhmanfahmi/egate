import globalAxios from "./global-axios";
export default {
    getAdressBooks() {
        return globalAxios.get('client/address-books');
    },
    showAddressBook(id) {
        return globalAxios.get(`client/address-books/${id}`);
    },
    editAddressBook(id) {
        return globalAxios.patch(`client/address-books/${id}`);
    }
}