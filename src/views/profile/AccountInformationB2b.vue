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
            <a @click="showEmailModal" class="mx-1 text-lowercase">
              {{ $t("profile.needEmailContact") }}
            </a>
            <!-- <router-link to="/contact-us" class="mx-1 text-lowercase">
              {{ $t("profile.needEmailContact") }}
            </router-link> -->
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
            <a @click="showPhoneModal" class="mx-1 text-lowercase">
              {{ $t("profile.needPhoneContact") }}
            </a>
            <!-- <router-link to="/contact-us" class="mx-1 text-lowercase">
              {{ $t("profile.needPhoneContact") }}
            </router-link> -->

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
            <label for="country">{{ $t('profile.defaultCountry') }} : {{ userStoredData.title }}</label>
            <!-- <span class="requried">*</span> -->

            <b-form-select v-model="form.country_id" @change="selectCountry($event)">
              <b-form-select-option value="null" disabled>{{ $t("profile.defaultCountry") }}
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
            <label for="country">{{ $t('profile.currency') }} : {{ currency }} </label>

            <!-- <span class="requried">*</span> -->

            <b-form-select v-model="form.currency_id" @change="changeCurrency($event)">
              <b-form-select-option value="null" disabled>{{ $t("profile.currency") }}
                <span class="requried text-danger">*</span>
              </b-form-select-option>
              <b-form-select-option v-for="(currency, index) in userStoredData.currencies" :key="index"
                :value="currency.id">{{
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
            <label for="country">{{ $t('profile.lang') }} : {{ form.language }}</label>
            <!-- <span class="requried">*</span> -->

            <b-form-select v-model="form.language" @change="changeLang($event)">
              <b-form-select-option value="null" disabled>{{ $t('profile.selectLang') }}
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
    <b-modal ref="email-modal" hide-footer centered :title="$t('profile.emailVerify')">
      <div class="d-block text-center">
        <form action="">
          <b-form-group>
            <div class="" :class="{ 'text-left': $i18n.locale == 'en', 'text-right': $i18n.locale == 'ar' }">
              <label for="email">{{ $t("profile.newEmail") }}</label>
              <span class="requried">*</span>
            </div>
            <b-form-input id="newEmail" v-model="newForm.verify_email" />
            <div class="error" v-for="(error, index) in errors.verify_email" :key="index">
              {{ error }}
            </div>
          </b-form-group>
          <b-form-group>
            <div class="" :class="{ 'text-left': $i18n.locale == 'en', 'text-right': $i18n.locale == 'ar' }">
              <label for="email">{{ $t("profile.oldPhone") }}</label>
              <span class="requried">*</span>
            </div>
            <b-form-input id="oldPhone" v-model="newForm.verify_mobile_number" type="number" />
            <div class="error" v-for="(error, index) in errors.verify_mobile_number" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </form>
      </div>
      <div class="row justify-content-around align-items-center">
        <b-button class="mt-3" variant="outline-danger" @click="hideEmailModal">{{ $t('cart.cancel') }}</b-button>
        <b-button class="mt-2" variant="outline-success" @click="goToVerify">{{ $t('register.verify') }}
        </b-button>
      </div>
    </b-modal>
    <b-modal ref="phone-modal" hide-footer centered :title="$t('profile.phoneVerify')">
      <div class="d-block text-center">
        <form action="">
          <b-form-group>
            <div class="" :class="{ 'text-left': $i18n.locale == 'en', 'text-right': $i18n.locale == 'ar' }">
              <label for="email">{{ $t("profile.oldEmail") }}</label>
              <span class="requried">*</span>
            </div>
            <b-form-input id="oldEmail" v-model="newForm.verify_email" />
            <div class="error" v-for="(error, index) in errors.verify_email" :key="index">
              {{ error }}
            </div>
          </b-form-group>
          <b-form-group>
            <div class="" :class="{ 'text-left': $i18n.locale == 'en', 'text-right': $i18n.locale == 'ar' }">
              <label for="email">{{ $t("profile.newPhone") }}</label>
              <span class="requried">*</span>
            </div>
            <b-form-input id="newPhone" v-model="newForm.verify_mobile_number" type="number" />
            <div class="error" v-for="(error, index) in errors.verify_mobile_number" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </form>
      </div>
      <div class="row justify-content-around align-items-center">
        <b-button class="mt-3" variant="outline-danger" @click="hidePhoneModal">{{ $t('cart.cancel') }}</b-button>
        <b-button class="mt-2" variant="outline-success" @click="goToVerify">{{ $t('register.verify') }}
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import auth from "@/services/auth";
import profile from "@/services/profile";

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
        country_id: "",
        currency_id: "",
        language: ""
      },
      newForm: {
        email: "",
        phone: "",
        callback_url: ""
      },
      countries: [],
      errors: {},
      phonePrefix: null,
      modalShow: false
    };
  },
  mounted() {
    this.getAllCountires();
    this.form = { ...this.buyerUserData };
    this.phonePrefix = this.buyerUserData.phone_prefix
    this.form.mobile_number = this.buyerUserData.phone

    this.form.language = this.buyerUserData.language ? this.buyerUserData.language : 'en'
    this.form.currency = this.buyerUserData.currency_name ? this.buyerUserData.currency_name : 'KWD'
    this.form.country = this.userStoredData.country_code;



    this.newForm.callback_url = `${this.mainDoamin}otp-verification`;

    // test 
  },
  created() {
    // this.reloadPage();

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
        country_id: this.form.country,
        language: this.form.language,
        currency_id: this.form.currency,
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
    showEmailModal() {
      this.$refs['email-modal'].show()
    },
    hideEmailModal() {
      this.$refs['email-modal'].hide();
      this.errors = {}
    },
    showPhoneModal() {
      this.$refs['phone-modal'].show()
    },  
    hidePhoneModal() {
      this.$refs['phone-modal'].hide();
      this.errors = {}
    },
    goToVerify() {


      let data = {
        callback_url: this.newForm.callback_url,
        verify_mobile_number: this.newForm.phone,
        verify_email: this.newForm.email,
        country_code: this.buyerUserData.country_code,
      }
      profile.changeProfileEmailMobile(data, this.buyerUserData.type).then((res) => {
        console.log(res);
      }).catch(error => {
        const err = Object.values(error)[2].data;
        this.errors = err.items;
        this.errMsg(err.message);
      })
    },
    changeCurrency(event) {
      localStorage.setItem("currency", event);
    },
    changeLang() {
      // localStorage.setItem("lang", event);
      localStorage.setItem("lang", this.form.language);
      location.reload()
    },
    selectCountry() {
      // localStorage.removeItem("currency");
      // localStorage.setItem("country", JSON.stringify(data));
      // // this.countryImg = data.flag;
      // // this.countryName = data.title;
      // localStorage.setItem("country", JSON.stringify(data));
      // if (data) {
      //   if (localStorage.getItem("is_default")) {
      //     localStorage.setItem("is_default", data.currencies[0].id);
      //   } else {
      //     localStorage.setItem("is_default", data.currencies[0].is_default);
      //   }
      // }
    },
  },
  computed: {
    userStoredData() {
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
