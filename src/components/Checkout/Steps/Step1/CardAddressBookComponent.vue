<template>
    <div class="checkoutComponent">
        <div class="form-holder">
            <v-card class="mx-auto mb-3 styleCardAddress" elevation="4">
                <v-card-item>
                    <v-card-title>
                        <p class="text-blue">Information</p>
                    </v-card-title>
                </v-card-item>

                <v-card-text>
                    <div class="addresses">
                        <div class="address">
                            <v-row>
                                <v-col cols="2" md="2" sm="2">
                                    <div class="name">Contact</div>
                                </v-col>
                                <v-col cols="8" md="8" sm="8">
                                    <div class="shipp-to">
                                        <p>E-mail: {{ user?.user?.email }}</p>
                                        <p>Phone: {{ user?.user?.mobile }}</p>
                                    </div>
                                </v-col>
                                <v-col cols="2" md="2" sm="2">
                                    <div class="change">
                                        <p role="button" class="stepDone" @click="updateUserContact">Change</p>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </div>

                </v-card-text>
            </v-card>
            <v-card class="mx-auto styleCardAddress" elevation="4">
                <v-card-item>
                    <v-card-title>
                        <p class="text-blue">Choose Address Or Local Point</p>
                    </v-card-title>
                </v-card-item>

                <v-card-text>
                    <div class="mb-3" v-if="sailPoints.length > 0">
                        <div class="mb-4">
                            <h6>Pick Local Point</h6>
                        </div>

                        <div class="d-flex mb-3" v-for="(sailPoint, idx) in sailPoints" :key="idx">
                            <div>
                                <input type="radio" class="sailPointsRadio" :value="sailPoint.id"
                                    @change="undisableCheckout" v-model="orderCheckout.sail_point_id" />
                            </div>
                            &nbsp;&nbsp;
                            <div>
                                <div>{{ sailPoint.country_name }}, {{ sailPoint.governorate_name }}, {{ sailPoint.city_name
                                }},
                                    {{ sailPoint.address }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3" v-else>
                        <p>No Local Points Yet</p>
                    </div>

                    <div>
                        <hr />
                    </div>

                    <div class="mb-3" v-if="addressBooks.length > 0">
                        <div class="d-flex justify-content-between">
                            <div class="mb-3">
                                <h6>Choose Address Book</h6>
                            </div>

                            <div class="">
                                <button @click="openFormAddessBook" class="btn btn-primary" style="height: 34px;">+ Add
                                    New</button>
                            </div>
                        </div>

                        <div class="d-flex mb-3" v-for="(addressBook, idx) in addressBooks" :key="idx">
                            <div>
                                <input type="radio" class="addressBooksRadio" :value="addressBook.id"
                                    @change="undisableCheckout" v-model="orderCheckout.address_book_id" />
                            </div>
                            &nbsp;&nbsp;
                            <div>
                                <p>{{ addressBook.country_name }}, {{ addressBook.governorate_name }}, {{
                                    addressBook.city_name }},
                                    {{ addressBook.address }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3" v-else>
                        <div class="mb-3">
                            <p>No Address Book Yet</p>
                        </div>
                        <div>
                            <button @click="openFormAddessBook" class="btn btn-primary">Add New Address Book</button>
                        </div>
                    </div>

                    <div>
                        <hr />
                    </div>

                    <div class="mb-3" v-if="sailPoints.length > 0 || addressBooks.length > 0">
                        <div class="mb-4">
                            <h6>Choose Fast Charging Or Regular Charging</h6>
                        </div>
                        <div class="d-flex">
                            <div>
                                <input type="radio" id="regular" class="FastRegularRadio" disabled
                                    @change="checkFastRegularButton" v-model="orderCheckout.regular_charging"
                                    value="regular" />
                            </div>
                            &nbsp;&nbsp;
                            <div>
                                <p>Regular Charging</p>
                            </div>
                        </div>

                        <div class="d-flex">
                            <div>
                                <input type="radio" id="fast" class="FastRegularRadio" disabled
                                    @change="checkFastRegularButton" v-model="orderCheckout.fast_charging" value="fast" />
                            </div>
                            &nbsp;&nbsp;
                            <div>
                                <p>Fast Charging</p>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3" v-if="sailPoints.length > 0 || addressBooks.length > 0">
                        <div class="row">
                            <div class="col-md-6">
                                <label>From</label>
                                <input type="date" @change="changeDateFrom" id="date_from" disabled
                                    v-model="orderCheckout.date_from" class="form-control styleDate">
                            </div>
                            <div class="col-md-6">
                                <label>To</label>
                                <input type="date" @change="changeDateTo" id="date_to" disabled
                                    v-model="orderCheckout.date_to" class="form-control styleDate">
                            </div>
                        </div>
                    </div>
                </v-card-text>
            </v-card>

            <v-dialog v-model="dialogForm" width="auto">
                <v-card class="styleContainer">
                    <v-card-text>
                        <Form @submit="submitDataForm">
                            <div class="shipping-address-data mb-3">
                                <h4 class="my-5">Add New Address Book</h4>
                                <v-row>
                                    <v-col cols="12" lg="4" md="4" sm="12">
                                        <Field @change="getCountryId" class="form-control styleSelects mb-3"
                                            name="country_id" :rules="isRequired" as="select" v-model="form.country_id">
                                            <option disabled value="">Country</option>
                                            <option v-for="(country, idx) in countries" :key="idx" :value="country.id">{{
                                                country.name_en }}
                                            </option>
                                        </Field>
                                        <ErrorMessage class="text-danger" name="country_id" />
                                    </v-col>

                                    <v-col cols="12" lg="4" md="4" sm="12">
                                        <Field @change="getCityId" id="governorate_id"
                                            class="form-control styleSelects mb-3" name="governorate_id" :rules="isRequired"
                                            as="select" v-model="form.governorate_id">
                                            <option disabled selected value="">State</option>
                                            <option v-for="(state, idx) in states" :key="idx" :value="state.id">{{
                                                state.name_en }}</option>
                                        </Field>
                                        <ErrorMessage class="text-danger" name="governorate_id" />
                                    </v-col>

                                    <v-col cols="12" lg="4" md="4" sm="12">
                                        <Field class="form-control styleSelects mb-3" name="city_id" :rules="isRequired"
                                            as="select" v-model="form.city_id">
                                            <option disabled selected value="">City</option>
                                            <option v-for="(city, idx) in cities" :key="idx" :value="city.id">{{
                                                city.name_en }}</option>
                                        </Field>
                                        <ErrorMessage class="text-danger" name="city_id" />
                                    </v-col>

                                    <v-col cols="12" lg="12" md="12" sm="12">
                                        <Field name="address" id="address" hide-details="true" v-model="form.address"
                                            class="w-100 form-control styleSelects mb-3" placeholder="Address" type="text"
                                            :rules="isRequired" />
                                        <ErrorMessage class="text-danger" name="address" />
                                    </v-col>

                                    <v-col cols="12" lg="4" md="4" sm="12">
                                        <Field name="first_name" id="firstName" hide-details="true" placeholder="First Name"
                                            class="w-100 form-control styleSelects mb-3" :rules="isRequired"
                                            v-model="form.first_name" />
                                        <ErrorMessage class="text-danger" name="first_name" />
                                    </v-col>

                                    <v-col cols="12" lg="4" md="4" sm="12">
                                        <Field name="last_name" id="lastName" hide-details="true" placeholder="Last Name"
                                            class="w-100 form-control styleSelects mb-3" :rules="isRequired"
                                            v-model="form.last_name" />
                                        <ErrorMessage class="text-danger" name="last_name" />
                                    </v-col>

                                    <v-col cols="12" lg="4" md="4" sm="12">
                                        <Field name="mobile" id="phone" hide-details="true" placeholder="Mobile Number"
                                            class="w-100 form-control styleSelects mb-3" type="number" :rules="isRequired"
                                            v-model="form.mobile" />
                                        <ErrorMessage class="text-danger" name="mobile" />
                                    </v-col>
                                </v-row>
                            </div>

                            <div class="d-flex w-100">
                                <div class="w-50 d-flex justify-content-center">
                                    <button class="btn btn-success w-75" type="submit">Add Address Book</button>
                                </div>
                                <div class="w-50 d-flex justify-content-center">
                                    <button class="btn btn-danger w-75" @click="closeDialog">Cancel</button>
                                </div>
                            </div>
                        </Form>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogFormContact" width="1000">
                <v-card class="styleContainer">
                    <v-card-text>
                        <Form @submit="submitContactForm">
                            <div class="shipping-address-data mb-3">
                                <h4 class="my-5">Update Contact</h4>
                                <div class="row">
                                    <div class="col-md-6">
                                        <Field name="first_name" id="firstName" hide-details="true" placeholder="First Name"
                                            class="w-100 form-control styleSelects mb-3" :rules="isRequired"
                                            v-model="formContact.first_name" />
                                        <ErrorMessage class="text-danger" name="first_name" />
                                    </div>
                                    <div class="col-md-6">
                                        <Field name="last_name" id="lastName" hide-details="true" placeholder="Last Name"
                                            class="w-100 form-control styleSelects mb-3" :rules="isRequired"
                                            v-model="formContact.last_name" />
                                        <ErrorMessage class="text-danger" name="last_name" />
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <Field name="email" id="email" hide-details="true" v-model="formContact.email"
                                            class="w-100 form-control styleSelects mb-3" :rules="isRequired"
                                            placeholder="E-mail" type="email" />
                                        <ErrorMessage class="text-danger" name="email" />
                                    </div>
                                    <div class="col-md-6">
                                        <Field name="mobile" id="mobile" hide-details="true" placeholder="Mobile Number"
                                            class="w-100 form-control styleSelects mb-3" :rules="isRequired" type="text"
                                            v-model="formContact.mobile" />
                                        <ErrorMessage class="text-danger" name="mobile" />
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex w-100">
                                <div class="w-100 d-flex justify-content-center">
                                    <button class="btn btn-success w-100" type="submit">Update Contact</button>
                                </div>
                            </div>
                        </Form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import globalApis from "@/services/globalApis";
import { useToast } from "vue-toastification";
import { Form, Field, ErrorMessage } from 'vee-validate';
import globalAxios from "@/services/global-axios";
import store from '@/store';
export default {
    props: ['addressBooks', 'countries', 'sailPoints'],
    components: {
        Field,
        Form,
        ErrorMessage
    },
    mounted() { },
    data() {
        return {
            dialogForm: false,
            dialogFormContact: false,
            states: [],
            cities: [],
            formContact: {
                first_name: null,
                last_name: null,
                email: null,
                mobile: null
            },
            form: {
                country_id: null,
                city_id: null,
                governorate_id: null,
                address: null,
                first_name: null,
                last_name: null,
                mobile: null,
            },
            cartItems: [],
            cartTotalPrice: 0,
            orderCheckout: {
                address_book_id: null,
                sail_point_id: null,
                payment_type: null,
                coupoun: null,
                fast_charging: null,
                regular_charging: null,
                date_from: null,
                date_to: null
            }
        };
    },

    methods: {
        updateUserContact() {
            this.dialogFormContact = true;
            this.formContact.first_name = this.user?.user?.first_name;
            this.formContact.last_name = this.user?.user?.last_name;
            this.formContact.email = this.user?.user?.email;
            this.formContact.mobile = this.user?.user?.mobile;
        },

        closeDialog() {
            this.dialogForm = false;
        },

        closeDialogContact() {
            this.dialogFormContact = false;
        },

        isRequired(value) {
            if (value) {
                return true;
            }

            return 'This field is required';
        },

        async getAddressBooks() {
            try {
                const response = await globalAxios.get('client/address-books', {
                    headers: {
                        Authorization: 'Bearer ' + this.$store.state.Auth.user.token
                    }
                });
                this.addressBooks = response.data.items.data;
            } catch (e) {
                console.log(e);
            }
        },

        async getCountryId(e) {
            let countryId = e.target.value;
            const response = await globalApis.getStates(countryId);
            this.states = response.data.items;
        },

        async getCityId(e) {
            let stateId = e.target.value;
            const response = await globalApis.getCities(stateId);
            this.cities = response.data.items;
        },

        openFormAddessBook() {
            this.dialogForm = true;
        },

        async submitDataForm(values, { resetForm }) {
            const toast = useToast();
            try {
                const response = await globalAxios.post('client/address-books', values);
                if (response.data.code == 200) {
                    toast.success(`Address Book Stores Successfully`, {
                        position: "top-right",
                        transition: "slide",
                        hideProgressBar: false,
                        showIcon: true,
                        timeout: 3000,
                        showCloseButton: true,
                        swipeClose: true,
                    });
                    resetForm();
                    this.dialogForm = false;
                    location.reload();
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
        },

        async undisableCheckout(e) {
            try {
                let sailPoints = document.getElementsByClassName('sailPointsRadio');
                let addressBooks = document.getElementsByClassName('addressBooksRadio');
                if (e.target.className == 'addressBooksRadio' && e.target.checked) {
                    for (let i = 0; i < sailPoints.length; i++) {
                        sailPoints[i].checked = false;
                    }
                    this.orderCheckout.sail_point_id = null;
                    await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
                } else {
                    for (let i = 0; i < addressBooks.length; i++) {
                        addressBooks[i].checked = false;
                    }
                    this.orderCheckout.address_book_id = null;
                    await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
                }
                document.getElementsByClassName('FastRegularRadio')[0].disabled = false;
                document.getElementsByClassName('FastRegularRadio')[1].disabled = false;
                document.getElementById('date_from').disabled = false;
            } catch (e) {
                console.log(e);
            }
        },

        async checkFastRegularButton(e) {
            try {
                if (e.target.id == 'regular' && e.target.checked) {
                    this.orderCheckout.fast_charging = null;
                    await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
                } else {
                    this.orderCheckout.regular_charging = null;
                    await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
                }
            } catch (e) {
                console.log(e);
            }
        },

        async changeDateFrom(e) {
            try {
                this.orderCheckout.date_from = e.target.value;
                await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
                document.getElementById('date_to').disabled = false;
            } catch (e) {
                console.log(e);
            }
        },

        async changeDateTo(e) {
            try {
                this.orderCheckout.date_to = e.target.value;
                await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
                document.getElementById('checkoutBtn').style.pointerEvents = 'auto';
            } catch (e) {
                console.log(e);
            }
        },

        async submitContactForm(values, { resetForm }) {
            const toast = useToast();
            try {
                this.$store.dispatch('Auth/updateInfo', values);
                await store.dispatch("cart/getCartProducts");
                resetForm();
                this.dialogFormContact = false;
            } catch (e) {
                console.log(e);
            }
        }
    },
    computed: {
        orderCheckoutObject: function () {
            return this.$store.getters['Order/orderCheckoutObject'];
        },
        user() {
            return this.$store.getters['Auth/User'];
        }
    },
    watch: {
        orderCheckoutObject(newOrderCheckoutObject, oldOrderCheckoutObject) {
            // console.log(newOrderCheckoutObject);
        },
        user(newUser, oldUser) {
            console.log(newUser);
        }
    }
}
</script>

<style lang="scss" scoped>
.styleDate {
    background: inherit;
}

.styleCardAddress {
    background: inherit;
}

.styleCardAddress p {
    color: #000;
}

.styleContainer {
    padding: 3rem;
}

.styleSelects {
    padding: 1rem;
    border: 1px solid #999;
    background: inherit;
}

.return-btn {
    background-color: inherit;
}

.mdi-chevron-left::before {
    color: #003399;
}

.mdi-chevron-right::before i {
    color: #fff;
}

p {
    color: #6E6C5A;
}

.login-btn {
    color: #3399FF;
}

.form-holder {
    margin: 20px 0;

    .email-form {
        width: 70%;
    }

    .v-col-lg-4 {
        padding-bottom: 0;
    }

    .v-text-field .v-input__details {
        display: none;
    }

    .v-checkbox {
        height: 40px;
    }
}
</style>