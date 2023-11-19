<template>
  <div class="wrapper">
    <v-app>
      <v-container v-if="isAuthenticated">
        <CheckoutStepper />
      </v-container>
      <v-container v-else>
        <template>
          <div class="text-center">
            <v-dialog v-model="dialog" activator="parent" width="auto" @click:outside="closeDialog">
              <v-card class="styleContainer">
                <v-card-text>
                  <h3>
                    To Complete Checkout please Register Or
                    <span>
                      <router-link to="/auth/login" class="text-red">
                        Login
                      </router-link>
                    </span>
                  </h3>
                  <br>
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
                          placeholder="Confirm Password" class="w-100 form-control styleSelects mb-3"
                          :rules="isRequired" />
                        <ErrorMessage class="text-danger" name="password_confirmation" />
                      </div>
                    </div>

                    <div class="text-center w-100">
                      <button class="btn btn-primary w-100">Register</button>
                    </div>
                  </Form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </template>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import CheckoutStepper from "@/components/Checkout/CheckoutStepper.vue";
import globalAxios from "@/services/global-axios";
import { useToast } from "vue-toastification";
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useMeta } from "vue-meta";
export default {
  components: {
    CheckoutStepper,
    Field,
    Form,
    ErrorMessage
  },
  data() {
    return {
      dialog: true,
    }
  },
  setup() {
    useMeta({
      title: "Checkout",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
  mounted() {
    this.$nextTick(() => {
      document.dispatchEvent(new Event("render-complete"));
    });
  },
  methods: {
    closeDialog() {
      this.$router.push('/auth/login');
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
        const response = await globalAxios.post("auth/register", values);
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
          this.$router.push({ path: '/auth/login' });
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

  computed: {
    isAuthenticated: function () {
      return this.$store.getters['Auth/isAuthenticated'];
    },
  }
};
</script>

<style scoped lang="scss">
.styleContainer {
  padding: 3rem;
}

.styleSelects {
  padding: 1rem;
  border: 1px solid #999;
}
</style>