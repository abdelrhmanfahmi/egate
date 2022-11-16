<template>
  <div class="account-information">
    <h4 class="main-header">{{ $t("profile.accountInfo") }}</h4>
    <form @submit.prevent="updateProfile()" class="account-information-form">
      <b-row>
        <!-- First Name -->
        <b-col lg="6">
          <b-form-group>
            <label for="f-name">{{ $t("register.firstName") }}</label>
            <span class="requried">*</span>
            <!-- <b-form-input id="f-name" v-model="form.first_name" /> -->
            <div class="row justify-content-start align-items-center">
              <div class="col-3" v-if="form.perfix"><span>{{ form.perfix }}</span></div>
              <div class="col-12">
                <b-form-input id="f-name" v-model="form.first_name" />
              </div>
            </div>
            <div class="error" v-for="(error, index) in errors.first_name" :key="index">
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
            <div class="error" v-for="(error, index) in errors.last_name" :key="index">
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
            <div class="error" v-for="(error, index) in errors.email" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- phone -->
        <b-col lg="6">
          <b-form-group>
            <label for="phone">{{ $t("register.phone") }} (<span><b>{{ phonePrefix }}</b></span>)</label>
            <span class="requried">*</span>
            <router-link to="/contact-us" class="mx-1 text-lowercase">
              {{ $t("profile.needPhoneContact") }}
            </router-link>
            
            <div class="row justify-content-start align-items-center">
              <div class="col-12">
                <b-form-input id="phone" v-model="form.mobile_number" disabled />
              </div>
            </div>
            <div class="error" v-for="(error, index) in errors.mobile_number" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group>
            <label for="country">country : egypt</label>
            <!-- <span class="requried">*</span> -->

            <b-form-select v-model="form.country" >
              <b-form-select-option value="null" disabled>{{ $t("profile.country") }}
                <span class="requried text-danger">*</span>
              </b-form-select-option>
              <b-form-select-option v-for="(country, index) in countries" :key="index" :value="country.id">{{
                  country.title
              }}
              </b-form-select-option>
            </b-form-select>

            <div class="error" v-for="(error, index) in errors.country" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group>
            <label for="country">currency : {{currency}} </label>
            <!-- <span class="requried">*</span> -->

            <b-form-select v-model="form.currency" >
              <b-form-select-option value="null" disabled>{{ $t("profile.country") }}
                <span class="requried text-danger">*</span>
              </b-form-select-option>
              <b-form-select-option v-for="(currency, index) in userCurrencies.currencies" :key="index" :value="currency.country_id">{{
                  currency.code
              }}
              </b-form-select-option>
            </b-form-select>

            <div class="error" v-for="(error, index) in errors.country" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group>
            <label for="country">language : en</label>
            <!-- <span class="requried">*</span> -->

            <b-form-select v-model="form.language">
              <b-form-select-option value="null" disabled>select language
                <span class="requried text-danger">*</span>
              </b-form-select-option>
              <b-form-select-option value="ar">ar</b-form-select-option>
              <b-form-select-option value="en">en</b-form-select-option>
            </b-form-select>

            <div class="error" v-for="(error, index) in errors.country" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>

        <!-- Job_title -->
        <!-- <b-col lg="6">
          <b-form-group>
            <label for="jobTitle" v-if="form.job_title">{{ form.job_title }}</label>
            <label for="jobTitle" v-else>{{ $t("register.jobTitle") }}</label>
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
        </b-col> -->
      </b-row>

      <div class="work-info my-5" v-if="
        (buyerUserData && buyerUserData.type === 'buyer') ||
        buyerUserData.type === 'b2b' ||
        (buyerUserData.type === 'supplier' && buyerUserData.is_buyer == 1)
      ">
        <h4 class="main-header my-4">
          {{ $t("profile.businessInformation") }}
        </h4>
        <b-row>
          <!-- Company Name -->
          <b-col lg="6">
            <b-form-group>
              <div class="row">
                <div class="col-md-6 col-sm-12">
                  <label for="companyName">{{
                      $t("register.englishCompanyName")
                  }}</label>
                  <span class="requried">*</span>
                  <b-form-input id="companyName" v-model="form.company_name_en" disabled />
                </div>
                <div class="col-md-6 col-sm-12">
                  <label for="companyName">{{
                      $t("register.arabicCompanyName")
                  }}</label>
                  <span class="requried">*</span>
                  <b-form-input id="companyName" v-model="form.company_name_ar" disabled />
                </div>
              </div>
              <router-link to="/contact-us" class="mx-1 text-lowercase">
                {{ $t("profile.needCompanyContact") }}
              </router-link>
              <!-- <b-form-input
                id="companyName"
                v-model="form.company_name"
                disabled
              /> -->
              <div class="error" v-for="(error, index) in errors.company_name" :key="index">
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
              <div class="error" v-for="(error, index) in errors.reg_number" :key="index">
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
        perfix: "",
        // job_title: "",
        company_name_en: "",
        company_name_ar: "",
        reg_number: "",
        country:"",
        currency:"",
        language:""
      },
      countries: [],
      errors: {},
      phonePrefix: null
    };
  },
  mounted() {
    this.getAllCountires();
    this.form = { ...this.buyerUserData };
    this.phonePrefix = this.buyerUserData.phone_prefix
    this.form.mobile_number = this.buyerUserData.phone
    // test 
  },
  created() {
    this.reloadPage();
  },
  methods: {
    getAllCountires() {
      auth
        .getAllCountires()
        .then((res) => {
          this.countries = res.data.items;
        })
        .catch((err) => {
          console.log(err); //
        });
    },
    // Update Profile
    updateProfile() {
      const payload = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        job_title: this.form.job_title,
        reg_number: this.form.reg_number,
        portal: "buyer",
      };
      auth
        .storeInfo(payload)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.errors = {};
          // this.$store.commit("SET_USER_DATA_INFO", res.data.items);
          this.$store.dispatch("getUserInfo");
          if (res.status == 200) {
            setTimeout(() => {
              this.$router.replace("/profile/adress-book");
            }, 500);
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    reloadPage() {
      if (localStorage.getItem("reloaded")) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem("reloaded");
      } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem("reloaded", "1");
        setTimeout(() => {
          location.reload();
        }, 1200);
      }
    },
  },
  computed:{
    userCurrencies(){
      return JSON.parse(localStorage.getItem('country'))
    }
  }
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
