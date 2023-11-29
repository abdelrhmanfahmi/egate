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
                        <p class="text-blue styleParagraph">Pick Local Point Or Choose From Your Address Book One Shipping
                            Address</p>
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
                                <p class="styleParagraph">Or Choose From Your Address Book One Shipping Address</p>
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
                            <p>Add New Shipping Address</p>
                        </div>
                        <div>
                            <button @click="openFormAddessBook" class="btn btn-primary">Add New Shipping Address</button>
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
                                    @change="checkFastRegularButton" v-model="orderCheckout.shipping_type_id" value="1" />
                            </div>
                            &nbsp;&nbsp;
                            <div>
                                <p>Regular Charging</p>
                            </div>
                        </div>

                        <div class="d-flex">
                            <div>
                                <input type="radio" id="fast" class="FastRegularRadio" disabled
                                    @change="checkFastRegularButton" v-model="orderCheckout.shipping_type_id" value="2" />
                            </div>
                            &nbsp;&nbsp;
                            <div>
                                <p>Fast Charging</p>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3" v-if="sailPoints.length > 0 || addressBooks.length > 0">
                        <div class="row">
                            <div class="col-md-12" v-if="orderCheckout.shipping_type_id == 1">
                                <label class="mb-1">Order Recieve Date</label>
                                <flatPickr id="delivery_time" disabled @on-change="changeOrderDate"
                                    v-model="orderCheckout.delivery_time" :config="configOne" class="form-control"
                                    placeholder="Select date" name="delivery_time" />
                            </div>
                            <div class="col-md-12" v-else>
                                <label class="mb-1">Order Recieve Date</label>
                                <flatPickr id="delivery_time" disabled @on-change="changeOrderDate"
                                    v-model="orderCheckout.delivery_time" :config="configTwo" class="form-control"
                                    placeholder="Select date" name="delivery_time" />
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
                                <h4 class="my-5">Add New Shipping Address</h4>
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
                                <div class="w-100 d-flex justify-content-center">
                                    <button class="btn btn-success w-100" type="submit">Add Address Book</button>
                                </div>
                            </div>
                        </Form>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogFormContact" width="1000">
                <v-card class="styleContainer">
                    <v-card-text>
                        <Form>
                            <div class="shipping-address-data mb-3">
                                <h4 class="my-5">Update Contact In Order</h4>
                                <div class="row">
                                    <div class="col-md-6">
                                        <Field name="email" id="email" hide-details="true" v-model="orderCheckout.email"
                                            class="w-100 form-control styleSelects mb-3" :rules="isRequired"
                                            placeholder="E-mail" type="email" />
                                        <ErrorMessage class="text-danger" name="email" />
                                    </div>
                                    <div class="col-md-6">
                                        <Field name="mobile" id="mobile" hide-details="true" placeholder="Mobile Number"
                                            class="w-100 form-control styleSelects mb-3" :rules="isRequired" type="text"
                                            v-model="orderCheckout.mobile" />
                                        <ErrorMessage class="text-danger" name="mobile" />
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex w-100">
                                <div class="w-100 d-flex justify-content-center">
                                    <button class="btn btn-success w-100" @click.prevent="submitContactForm">Update
                                        Contact</button>
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
import moment from 'moment';
import globalApis from "@/services/globalApis";
import { useToast } from "vue-toastification";
import { Form, Field, ErrorMessage } from 'vee-validate';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';

import globalAxios from "@/services/global-axios";
export default {
    props: ['addressBooks', 'countries', 'sailPoints'],
    components: {
        Field,
        Form,
        ErrorMessage,
        flatPickr
    },
    mounted() { },
    data() {
        return {
            configOne: {
                dateFormat: "Y-m-d",
                enable: [
                    {
                        from: '2023-12-14'
                    }
                ]
            },
            configTwo: {
                dateFormat: "Y-m-d",
                enable: [

                ]
            },
            dialogForm: false,
            dialogFormContact: false,
            states: [],
            cities: [],
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
                shipping_type_id: null,
                delivery_time: null,
                email: null,
                mobile: null
            }
        };
    },

    methods: {
        updateUserContact() {
            this.dialogFormContact = true;
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
            } catch (e) {
                console.log(e);
            }
        },

        async checkFastRegularButton(e) {
            try {
                if (e.target.value == 1 && e.target.checked) {
                    let date = new Date();
                    date.setDate(date.getDate() + 15);
                    let afterFiftenDays = date.toISOString().split('T')[0];
                    console.log(afterFiftenDays);

                    let dateTwo = new Date(afterFiftenDays);
                    dateTwo.setDate(date.getDate() + 15);
                    let endOfMonth = dateTwo.toISOString().split('T')[0];
                    console.log(endOfMonth);

                    let objOne = {};
                    objOne.from = String(afterFiftenDays);
                    objOne.to = String(endOfMonth);

                    this.configOne.enable.push(objOne);
                    await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
                } else {
                    let date = new Date();
                    let dateTwo = new Date();
                    dateTwo.setDate(date.getDate() + 2);
                    let afterTwoDays = dateTwo.toISOString().split('T')[0];
                    // console.log(afterTwoDays);

                    let dateThree = new Date(afterTwoDays);
                    dateThree.setDate(dateTwo.getDate() + 2);
                    let afterTwoDaysAfter = dateThree.toISOString().split('T')[0];
                    // console.log(afterTwoDaysAfter);

                    let objTwo = {};
                    objTwo.from = String(afterTwoDays);
                    objTwo.to = String(afterTwoDaysAfter);

                    this.configTwo.enable.push(objTwo);
                    await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
                }
                document.getElementById('delivery_time').disabled = false;
            } catch (e) {
                console.log(e);
            }
        },

        async changeOrderDate(e) {
            try {
                let date = moment(new Date(e)).format('YYYY-MM-DD');
                this.orderCheckout.delivery_time = date;
                await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
                document.getElementById('checkoutBtn').style.pointerEvents = 'auto';
            } catch (err) {
                console.log(err);
            }
        },

        async submitContactForm() {
            const toast = useToast();
            try {
                await this.$store.dispatch('Order/updateOrderCheckoutObject', this.orderCheckout);
                toast.success(`Contact In Order Updated`, {
                    position: "top-right",
                    transition: "slide",
                    hideProgressBar: false,
                    showIcon: true,
                    timeout: 3000,
                    showCloseButton: true,
                    swipeClose: true,
                });
                this.dialogFormContact = false;
            } catch (e) {
                console.log(e);
            }
        },
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
.styleParagraph {
    font-size: 16px;
}

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