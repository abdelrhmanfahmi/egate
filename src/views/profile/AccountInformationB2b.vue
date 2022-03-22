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
            <router-link to="/contact-us" class="mx-1 text-lowercase">
              {{ $t("profile.needEmailContact") }}
            </router-link>
            <b-form-input id="email" v-model="form.email" disabled />
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
            <router-link to="/contact-us" class="mx-1 text-lowercase">
              {{ $t("profile.needPhoneContact") }}
            </router-link>
            <b-form-input id="phone" v-model="form.mobile_number" disabled />
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
            <b-form-input id="jobTitle" v-model="form.job_title" />
            <div
              class="error"
              v-for="(error, index) in errors.job_title"
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
              <router-link to="/contact-us" class="mx-1 text-lowercase">
                {{ $t("profile.needCompanyContact") }}
              </router-link>
              <b-form-input
                id="companyName"
                v-model="form.company_name"
                disabled
              />
              <div
                class="error"
                v-for="(error, index) in errors.company_name"
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
              <b-form-input id="RegistrationNumber" v-model="form.reg_number" />
              <div
                class="error"
                v-for="(error, index) in errors.reg_number"
                :key="index"
              >
                {{ error }}
              </div>
            </b-form-group>
          </b-col>
        </b-row>
      </div>

      <b-button type="submit" class="login-button">
        {{ $t("profile.save") }}
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
        mobile_number: "",
        job_title: "",
        company_name: "",
        reg_number: "",
      },
      countries: [],
      errors: {},
    };
  },
  mounted() {
    this.getAllCountires();
    this.form = { ...this.userInfo.item };
    console.log("this.userInfo" , this.userInfo);
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
    // Update Profile
    updateProfile() {
      const payload = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        job_title: this.form.job_title,
        reg_number: this.form.reg_number,
      };
      auth
        .storeInfo(payload)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.errors = {};
          // this.$store.commit("SET_USER_DATA_INFO", res.data.items);
          this.$store.dispatch("getUserInfo");
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
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
