<template>
    <div class="checkoutComponentGuest">
        <div class="row mb-5">
            <div class="col-md-12">
                <h5>To Complete Checkout Order Please Register Or
                    <span class="text-red" @click="showLoginForm" style="cursor: pointer;">Login</span>
                </h5>
            </div>
        </div>
        <Form @submit="submitRegisterForm">
            <div class="row mb-3">
                <div class="col-md-6 mb-3">
                    <label for="firstName">First Name <span class="required">*</span></label>
                    <Field name="first_name" id="firstName" hide-details="true" placeholder="First Name"
                        class="w-100 form-control styleSelects mb-3" :rules="isRequired" />
                    <ErrorMessage class="text-danger" name="first_name" />
                </div>

                <div class="col-md-6 mb-3">
                    <label for="lastName">Last Name <span class="required">*</span></label>
                    <Field name="last_name" id="lastName" hide-details="true" placeholder="Last Name"
                        class="w-100 form-control styleSelects mb-3" :rules="isRequired" />
                    <ErrorMessage class="text-danger" name="last_name" />
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6 mb-3">
                    <label for="email">E-mail <span class="required">*</span></label>
                    <Field name="email" id="email" hide-details="true" placeholder="E-mail"
                        class="w-100 form-control styleSelects mb-3" :rules="isRequired" />
                    <ErrorMessage class="text-danger" name="email" />
                </div>

                <div class="col-md-6 mb-3">
                    <label for="mobile">Phone Number <span class="required">*</span></label>
                    <Field name="mobile" id="mobile" hide-details="true" placeholder="Phone Number"
                        class="w-100 form-control styleSelects mb-3" :rules="isRequired" />
                    <ErrorMessage class="text-danger" name="mobile" />
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6 mb-3">
                    <label for="password">Password <span class="required">*</span></label>
                    <Field name="password" id="password" hide-details="true" placeholder="Password"
                        class="w-100 form-control styleSelects mb-3" :rules="isRequired" />
                    <ErrorMessage class="text-danger" name="password" />
                </div>

                <div class="col-md-6 mb-3">
                    <label for="Confirm Password">Confirm Password <span class="required">*</span></label>
                    <Field name="password_confirmation" id="password_confirmation" hide-details="true"
                        placeholder="Confirm Password" class="w-100 form-control styleSelects mb-3" :rules="isRequired" />
                    <ErrorMessage class="text-danger" name="password_confirmation" />
                </div>
            </div>

            <div class="text-center w-100">
                <button class="btn btn-primary w-100">Register</button>
            </div>
        </Form>

        <v-dialog v-model="dialog" width="1000" persistent>
            <v-card class="styleContainer">
                <v-card-text>
                    <Form @submit="submitLoginForm">
                        <div class="col mb-3">
                            <label for="email">E-mail <span class="required">*</span></label>
                            <Field name="email" id="email" hide-details="true" placeholder="E-mail"
                                class="w-100 form-control styleSelects mb-3" :rules="isRequired" />
                            <ErrorMessage class="text-danger" name="email" />
                        </div>
                        <div class="col mb-3">
                            <label for="password">Password <span class="required">*</span></label>
                            <Field name="password" id="password" hide-details="true" placeholder="Password"
                                class="w-100 form-control styleSelects mb-3" :rules="isRequired" />
                            <ErrorMessage class="text-danger" name="password" />
                        </div>
                        <div class="d-flex w-100">
                            <div class="d-flex justify-content-center w-50">
                                <button class="btn btn-success w-75" type="submit">Login</button>
                            </div>
                            <div class="d-flex justify-content-center w-50">
                                <button class="btn btn-danger w-75" @click="closeDialog">Cancel</button>
                            </div>
                        </div>
                    </Form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import globalApis from "@/services/globalApis";
import { useToast } from "vue-toastification";
import { Form, Field, ErrorMessage } from 'vee-validate';
import globalAxios from "@/services/global-axios";
import store from "@/store";
export default {
    components: {
        Field,
        Form,
        ErrorMessage
    },
    data() {
        return {
            dialog: false,
            addressBooks: [],
            cartItems: [],
            cartTotalPrice: 0
        };
    },
    methods: {
        closeDialog() {
            this.dialog = false;
        },

        showLoginForm() {
            this.dialog = true;
        },

        isRequired(value) {
            if (value) {
                return true;
            }

            return 'This field is required';
        },

        async submitRegisterForm(values, { resetForm }) {
            const toast = useToast();
            values.type = 'client';
            values.country_code = 'EG';
            try {
                const response = await globalAxios.post("auth/register", values, {
                    headers: {
                        'guest-token-uuid': localStorage.getItem('guest-token')
                    }
                });
                if (response.data.code == 200) {
                    toast.success(`User Added Successfully`, {
                        position: "top-right",
                        transition: "slide",
                        hideProgressBar: false,
                        showIcon: true,
                        timeout: 3000,
                        showCloseButton: true,
                        swipeClose: true,
                    });
                    resetForm();
                    this.dialog = true;
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

        async submitLoginForm(values, { resetForm }) {
            const toast = useToast();
            try {
                const response = await globalAxios.post("auth/client/login", values);
                console.log(response.data);
                if (response.data.code == 200) {
                    toast.success(`User Logged In Successfully`, {
                        position: "top-right",
                        transition: "slide",
                        hideProgressBar: false,
                        showIcon: true,
                        timeout: 3000,
                        showCloseButton: true,
                        swipeClose: true,
                    });
                    await store.commit("SET_USER_DATA", response.data.items);
                    localStorage.setItem("EGate-userInfo", JSON.stringify(response.data.items));
                    await store.dispatch("cart/getCartProducts");
                    resetForm();
                    location.reload();
                }
            } catch (e) {
                console.log(e);
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
    }
}
</script>

<style lang="scss" scoped>
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