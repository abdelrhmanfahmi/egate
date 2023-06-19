<template>
    <div class="register-wrapper profile">

        <form @submit.prevent="submit" class="py-11">

            <v-row>
                <v-col cols="12" md="5" sm="12">
                    <div class="">
                        <div class="form-holder">
                            <v-form @submit.prevent>
                                <!-- firstName  -->
                                <div class="mb-3">
                                    <label for="firstName">First Name <span class="required">*</span></label>
                                    <v-text-field v-model="form.first_name" :rules="rules" id="firstName"
                                        hide-details="true" class="w-100"></v-text-field>

                                    <span class="mb-3" v-if="AuthErrors">
                                        <div class="error text-red" v-for="(error, index) in AuthErrors.first_name"
                                            :key="index">
                                            {{ error }}
                                        </div>
                                    </span>
                                </div>
                                <!-- lastName  -->
                                <div class="mb-3">

                                    <label for="lastName">Last Name <span class="required">*</span></label>
                                    <v-text-field v-model="form.last_name" :rules="rules" id="lastName" hide-details="true"
                                        class="w-100"></v-text-field>

                                    <span class="mb-3" v-if="AuthErrors">
                                        <div class="error text-red" v-for="(error, index) in AuthErrors.last_name"
                                            :key="index">
                                            {{ error }}
                                        </div>
                                    </span>
                                </div>

                                <!-- email  -->
                                <div class="mb-3">

                                    <label for="email">Email <span class="required">*</span></label>
                                    <v-text-field v-model="form.email" :rules="rules" id="email" hide-details="true"
                                        class="w-100"></v-text-field>

                                    <span class="mb-3" v-if="AuthErrors">
                                        <div class="error text-red" v-for="(error, index) in AuthErrors.email" :key="index">
                                            {{ error }}
                                        </div>
                                    </span>
                                </div>

                                <!-- phone  -->
                                <div class="mb-3">

                                    <label for="phone">Phone Number <span class="required">*</span></label>
                                    <v-text-field v-model="form.phone" :rules="rules" id="phone" hide-details="true"
                                        placeholder="+2 111 90 30 626" class="w-100" type="number" min="0"></v-text-field>
                                    <!-- address  -->
                                    <span class="mb-3" v-if="AuthErrors">
                                        <div class="error text-red" v-for="(error, index) in AuthErrors.phone" :key="index">
                                            {{ error }}
                                        </div>
                                    </span>
                                </div>

                                <!-- PASSWORD  -->
                                <div class="mb-3">

                                    <label for="password">Password <span class="required">*</span></label>
                                    <v-text-field v-model.trim="form.password" autocomplete="new-password" required
                                        :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append-inner="show2 = !show2" :type="show2 ? 'text' : 'password'"
                                        hide-details="true" />
                                </div>
                                <!-- Confirm Password -->
                                <div class="mb-3">

                                    <label for="confirm_password">Confirm Password <span class="required">*</span></label>

                                    <v-text-field v-model.trim="form.password_confirmation" autocomplete="new-password"
                                        required :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append-inner="show1 = !show1" :type="show1 ? 'text' : 'password'"
                                        hide-details="true" />

                                    <span class="mb-3" v-if="AuthErrors">
                                        <div class="error text-red" v-for="(error, index) in AuthErrors.password"
                                            :key="index">
                                            {{ error }}
                                        </div>
                                    </span>
                                </div>



                            </v-form>
                        </div>
                        <v-row class="my-4">
                            <v-col cols="12" md="6" sm="12">
                                <button class="buy-btn text-black" @click="register">
                                    SIGN UP
                                </button>
                            </v-col>
                            <v-col cols="12" md="6" sm="12" class="text-black">
                                <button class="view-btn border-gray color-gray" @click="form = {}">CLEAR
                                </button>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="12" md="2" sm="12" class="text-center">
                    <h2 class="h1">OR</h2>
                </v-col>
                <v-col cols="12" md="5" sm="12">
                    <p class="text-gray mb-11">Sign Up With Your Social Accounts</p>
                    <SignUpAuth />
                </v-col>
            </v-row>
            <div class="d-flex aligned-row">
                <p class="my-5"><span class="text-gray">Already Have An Account?</span><span>
                        <router-link to="/auth/login" class="text-red">
                            Login
                        </router-link>
                    </span></p>
            </div>
        </form>
    </div>
</template>

<script>
import SignUpAuth from "@/components/shared/socialAuth/SignUpAuth.vue"
export default {

    data() {
        return {
            show1: false,
            show2: false,
            form: {
                first_name: null,
                last_name: null,
                email: null,
                password: null,
                password_confirmation: null,
            },
            validPassword: null,
            rules: [
                // passwordRules: v => !!v || "Password is required",
                // confirmPasswordRules: v => !!v || "Password is required"
            ],
            errors: null
        }
    },
    computed: {
        // repeatPasswordRules() {
        //     return [
        //         (v) => !!v || 'password not informed',
        //         (v) => (v && v.length >= 8) || 'Password must be at least 8 characters long',
        //         (v) => (v !== this.password) || 'Different passwords!',
        //         (v) => (v === this.password) || '',
        //     ];
        // },
        AuthErrors() {
            return this.$store.getters.AuthErrors
        }
    },
    methods: {
        checkPassword(invalid) {
            // correct: false
            if (true == invalid) {
                this.validPassword = false;
            } else {
                this.validPassword = true;
            }
        },
        handleReset() {
            this.form = {}
        },
        register() {
            this.$store.dispatch('Register', this.form).then(res => {
                console.log('res', res);
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.$store.dispatch('resetErrors')
    },
    components: {
        SignUpAuth
    }
}
</script>

<style lang="scss" scoped>
label {
    margin-bottom: 10px !important;
}
</style>