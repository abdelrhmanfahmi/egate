<template>
    <div class="profile">
        <div class="addresses-page">
            <div class="page-title">
                <h2 class="profile-title">Edit Address Book</h2>
            </div>
            <div class="form-holder">
                <Form @submit="editSubmitForm">

                    <!-- firstName  -->
                    <div class="col mb-3">
                        <label for="firstName">First Name <span class="required">*</span></label>
                        <Field name="first_name" v-model="first_name" id="firstName" placeholder="First Name"
                            class="w-100 form-control styleSelects mb-3" :rules="isRequired" />
                        <ErrorMessage class="text-danger" name="first_name" />
                    </div>

                    <!-- lastName  -->
                    <div class="col mb-3">
                        <label for="lastName">Last Name <span class="required">*</span></label>
                        <Field name="last_name" v-model="last_name" id="lastName" placeholder="Last Name"
                            class="w-100 form-control styleSelects mb-3" :rules="isRequired" />
                        <ErrorMessage class="text-danger" name="last_name" />
                    </div>

                    <!-- phone  -->
                    <div class="col mb-3">
                        <label for="phone">Phone Number <span class="required">*</span></label>
                        <Field name="mobile" id="phone" v-model="mobile" placeholder="Mobile Number"
                            class="w-100 form-control styleSelects mb-3" type="number" :rules="isRequired" />
                        <ErrorMessage class="text-danger" name="mobile" />
                    </div>

                    <!-- address  -->
                    <div class="col mb-3">
                        <label for="address">
                            Address <span class="required">*</span>
                        </label>
                        <Field name="address" id="address" v-model="address" class="w-100 form-control styleSelects mb-3"
                            placeholder="Address" type="text" :rules="isRequired" />
                        <ErrorMessage class="text-danger" name="address" />
                    </div>

                    <!-- country  -->
                    <div class="col mb-3">
                        <label for="country">Country <span class="required">*</span></label>
                        <Field @change="getCountryId" class="form-control styleSelects mb-3" name="country_id"
                            :rules="isRequired" as="select" v-model="country_id">
                            <option disabled value="">-- Country --</option>
                            <option v-for="(country, idx) in countries" :key="idx" :value="country.id">{{ country.name_en }}
                            </option>
                        </Field>
                        <ErrorMessage class="text-danger" name="country_id" />
                    </div>

                    <!-- state  -->
                    <div class="col mb-3">
                        <label for="State">State <span class="required">*</span></label>
                        <Field @change="getCityId" class="form-control styleSelects mb-3" name="governorate_id"
                            :rules="isRequired" as="select" v-if="flagCountry">
                            <option disabled selected value="">-- State --</option>
                            <option v-for="(state, idx) in states" :key="idx" :value="state.id">{{ state.name_en }}
                            </option>
                        </Field>
                        <Field @change="getCityId" class="form-control styleSelects mb-3" name="governorate_id"
                            :rules="isRequired" as="select" v-model="governorate_id" v-else>
                            <option selected :value="governorate_id">{{ governorate_name }}</option>
                        </Field>
                        <ErrorMessage class="text-danger" name="governorate_id" />
                    </div>

                    <!-- city  -->
                    <div class="col mb-3">
                        <label for="City">City <span class="required">*</span></label>
                        <Field class="form-control styleSelects mb-3" name="city_id" :rules="isRequired" as="select"
                            v-if="flagState">
                            <option disabled selected value="">-- City --</option>
                            <option v-for="(city, idx) in cities" :key="idx" :value="city.id">{{ city.name_en }}</option>
                        </Field>
                        <Field class="form-control styleSelects mb-3" v-model="city_id" name="city_id" :rules="isRequired"
                            as="select" v-else>
                            <option selected :value="city_id">{{ city_name }}</option>
                        </Field>
                        <ErrorMessage class="text-danger" name="city_id" />
                    </div>


                    <button type="submit" class="mt-2 buy-btn w-50">Save Changes</button>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import globalApis from "@/services/globalApis";
import { useMeta } from "vue-meta";
import globalAxios from "@/services/global-axios";
import { useToast } from "vue-toastification";
import { Form, Field, ErrorMessage } from 'vee-validate';
import account from '@/services/account';
export default {
    setup() {
        useMeta({
            title: "Edit Profile Address",
            htmlAttrs: { lang: "en", amp: true },
        });
    },
    mounted() {
        this.getCountriesData();
        this.getAddressBook();
    },
    data() {
        return {
            countries: [],
            states: [],
            cities: [],
            first_name: null,
            last_name: null,
            mobile: null,
            address: null,
            country_id: null,
            governorate_id: null,
            city_id: null,
            governorate_name: null,
            city_name: null,
            flagCountry: false,
            flagState: false

        };
    },
    methods: {
        isRequired(value) {
            if (value) {
                return true;
            }

            return 'This field is required';
        },
        async getAddressBook() {
            let addressId = this.$route.params.id;
            const response = await account.showAddressBook(addressId);
            this.first_name = response?.data?.items.first_name;
            this.last_name = response?.data?.items.last_name;
            this.address = response?.data?.items.address;
            this.mobile = response?.data?.items.mobile;
            this.country_id = response?.data?.items.country_id;
            this.governorate_id = response?.data?.items.governorate_id;
            this.city_id = response?.data?.items.city_id;
            this.governorate_name = response?.data?.items.governorate_name;
            this.city_name = response?.data?.items.city_name;
        },

        async getCountriesData() {
            try {
                const response = await globalApis.getCountries();
                this.countries = response.data.items;
            } catch (e) {
                console.log(e);
            }
        },
        async getCountryId(e) {
            this.flagCountry = true;
            let countryId = e.target.value;
            const response = await globalApis.getStates(countryId);
            this.states = response.data.items;
        },
        async getCityId(e) {
            this.flagState = true;
            let stateId = e.target.value;
            const response = await globalApis.getCities(stateId);
            this.cities = response.data.items;
        },

        async editSubmitForm(values, { resetForm }) {
            const toast = useToast();
            let addresId = this.$route.params.id;
            try {
                const response = await globalAxios.patch(`client/address-books/${addresId}`, values);
                if (response.data.code == 200) {
                    toast.success(`Address Book Updated Successfully`, {
                        position: "top-right",
                        transition: "slide",
                        hideProgressBar: false,
                        showIcon: true,
                        timeout: 3000,
                        showCloseButton: true,
                        swipeClose: true,
                    });
                    resetForm();
                }
            } catch (e) {
                toast.error(`${e.response.data.message}`, {
                    position: "top-right",
                    transition: "slide",
                    hideProgressBar: false,
                    showIcon: true,
                    timeout: 3000,
                    showCloseButton: true,
                    swipeClose: true,
                });
            }
        }
    },
    components: {
        Field,
        Form,
        ErrorMessage
    },
};
</script>

<style lang="scss" scoped>
.styleSelects {
    padding: 1rem;
    border: 1px solid #999;
}

.addresses-page {
    .form-holder {
        width: 80%;

        .v-text-field {
            width: 100% !important;
            margin-bottom: 20px;
        }
    }
}
</style>
