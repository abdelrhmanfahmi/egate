<template>
  <div class="account-information">
    <h4 class="main-header">{{ $t("profile.accountInformation") }}</h4>
    <form @submit.prevent="updateProfile()" class="account-information-form">
      <b-row>
        <!-- First Name -->
        <b-col lg="6">
          <b-form-group>
            <label for="f-name">{{ $t("register.firstName") }}</label>
            <span class="requried">*</span>
            <b-form-input id="f-name" v-model="form.first_name" />
            <div
              class="error"
              v-for="(error, index) in errors.first_name"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- Last Name -->
        <b-col lg="6">
          <b-form-group>
            <label for="l-name">{{ $t("register.lastName") }}</label>
            <span class="requried">*</span>
            <b-form-input id="l-name" v-model="form.last_name" />
            <div
              class="error"
              v-for="(error, index) in errors.last_name"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- Email -->
        <b-col lg="6">
          <b-form-group>
            <label for="email">{{ $t("register.email") }}</label>
            <span class="requried">*</span>
            <b-form-input id="email" v-model="form.email" />
            <div
              class="error"
              v-for="(error, index) in errors.email"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- phone -->
        <b-col lg="6">
          <b-form-group>
            <label for="phone">{{ $t("register.phone") }}</label>
            <span class="requried">*</span>
            <b-form-input
              id="phone"
              v-model="form.mobile_number"
              type="number"
            />
            <div
              class="error"
              v-for="(error, index) in errors.mobile_number"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>

        <!-- Job_title -->
        <b-col lg="6">
          <b-form-group>
            <label for="jobTitle">{{ $t("register.jobTitle") }}</label>
            <span class="requried">*</span>
            <b-form-input id="jobTitle" v-model="form.Job_title" />
            <div
              class="error"
              v-for="(error, index) in errors.Job_title"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <div class="work-info my-5">
        <h4 class="main-header my-4">
          {{ $t("profile.businessInformation") }}
        </h4>
        <b-row>
          <!-- Company Name -->
          <b-col lg="6">
            <b-form-group>
              <label for="companyName">{{ $t("register.companyName") }}</label>
              <span class="requried">*</span>
              <b-form-input id="companyName" v-model="form.companyName" />
              <div
                class="error"
                v-for="(error, index) in errors.companyName"
                :key="index"
              >
                {{ error }}
              </div>
            </b-form-group>
          </b-col>
          <!-- Registration number -->
          <b-col lg="6">
            <b-form-group>
              <label for="RegistrationNumber">{{
                $t("profile.RegistrationNumber")
              }}</label>
              <span class="requried">*</span>
              <b-form-input
                id="RegistrationNumber"
                v-model="form.RegistrationNumber"
              />
              <div
                class="error"
                v-for="(error, index) in errors.RegistrationNumber"
                :key="index"
              >
                {{ error }}
              </div>
            </b-form-group>
          </b-col>
        </b-row>
      </div>

      <b-button type="submit" class="login-button">
        {{ $t("register.submit") }}
      </b-button>
    </form>
  </div>
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
        country_code: "KW",
        mobile_number: "",
        Job_title: "",
        companyName: "",
        RegistrationNumber: "",
      },
      countries: [],
      errors: {},
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
    updateProfile() {
      console.log("yes");
    },
  },
};
</script>

<style lang="scss" scoped>
.account-information {
  padding-top: 40px;
  .main-header {
    text-transform: uppercase;
  }
  .account-information-form {
    padding: 20px 0;
    .login-button {
      margin: 30px 0px;
      width: 20%;
    }
  }
}

html:lang(ar) {
  .account-information {
    text-align: right;
  }
}
</style>