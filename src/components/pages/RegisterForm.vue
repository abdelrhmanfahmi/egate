<template>
  <section class="user-register">
    <b-container>
      <div class="main-title">
        <span class="sub-title"></span>
        <h2 class="main-header">create customer account</h2>
      </div>
      <div class="user-register-form">
        <b-row class="justify-content-center">
          <b-col lg="10">
            <div class="register-info">
              <h4 class="main-header">main information</h4>
              <router-link to="/" class="back">
                <span> &#60; Already have account</span></router-link
              >
            </div>
            <form @submit.prevent="register()">
              <b-row class="justify-content-center">
                <!-- First Name -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="f-name">first name</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="f-name"
                      v-model="form.first_name"
                      required
                    />
                  </b-form-group>
                </b-col>
                <!-- Last Name -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="l-name">last name</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="l-name"
                      v-model="form.last_name"
                      required
                    />
                  </b-form-group>
                </b-col>
                <!-- Email -->
                <b-col lg="12">
                  <b-form-group>
                    <label for="email">email</label>
                    <span class="requried">*</span>
                    <b-form-input id="email" v-model="form.email" required />
                  </b-form-group>
                  <span class="err">asdas</span>
                </b-col>
                <!-- Password -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="password">password</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="password"
                      v-model="form.password"
                      required
                    />
                  </b-form-group>
                </b-col>
                <!-- Confirm Password -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="confirmPassword">confirm password</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="confirmPassword"
                      v-model="form.password_confirmation"
                      required
                    />
                  </b-form-group>
                </b-col>
                <!-- country code -->
                <b-col lg="3" cols="4">
                  <b-form-group>
                    <label for="countryCode">country code</label>
                    <span class="requried">*</span>
                    <b-form-select v-model="form.country_code">
                      <b-form-select-option
                        v-for="country in countries"
                        :key="country.id"
                        :value="country.iso"
                        >{{ country.iso }}
                        {{ country.phone_prefix }}</b-form-select-option
                      >
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <!-- phone -->
                <b-col lg="9" cols="8">
                  <b-form-group>
                    <label for="phone">phone</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="phone"
                      v-model="form.mobile_number"
                      required
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- active_with -->
              <b-form-group
                class="my-4"
                label="Choose one of the ways to activate your account"
              >
                <b-form-radio
                  class="pt-2"
                  v-for="(connect, index) in connects"
                  :key="index"
                  v-model="form.active_with"
                  name="some-radios"
                  :value="connect.value"
                  >{{ connect.name }}</b-form-radio
                >
              </b-form-group>

              <b-form-checkbox v-model="terms">
                Please review and agree to the
                <router-link to="/" class="terms"
                  >Terms and Conditions</router-link
                >
                to complete the registration process
              </b-form-checkbox>

              <b-form-checkbox v-model="form.register_mailing_list" class="py-3">
                Subscribe to the newsletter
              </b-form-checkbox>

              <input type="submit" value="Ok" :disabled="!terms">
            </form>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </section>
</template>
<script>
import auth from "@/services/auth";
export default {
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        country_code: "",
        mobile_number:"",
        active_with: "",
        register_mailing_list: ""
      },
      terms:"",
      connects: [
        { name: "Phone number", value: "sms" },
        { name: "Email", value: "email" },
      ],
      countries: [],
    };
  },
  mounted() {
    this.getAllCountires();
  },
  methods: {
    getAllCountires() {
      auth
        .getAllCountires()
        .then((res) => {
          this.countries = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    register() {
      auth.register(this.form).then((res) => {
        console.log(res)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.user-register {
  height: 1200px;
  .main-title {
    text-align: center;
    padding: 30px 0;
  }
  .user-register-form {
    .register-info {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 25px;
      .back {
        font-weight: 500;
        color: $header-color;
        &:hover {
          color: $main-color;
        }
      }
    }
    .custom-select {
      height: 3.2rem;
    }
    .terms {
      color: $main-color;
      text-decoration: underline !important;
      display: inline-block;
    }
  }
}
</style>
