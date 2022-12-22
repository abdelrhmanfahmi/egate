<template>
  <!-- buyer user  account information page  -->
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
              <div class="col-3" v-if="form.perfix">
                <span>{{ form.perfix }}</span>
              </div>
              <div class="col-12">
                <b-form-input id="f-name" v-model="form.first_name" />
              </div>
            </div>
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
            <a @click="showEmailModal" class="mx-1 text-lowercase">
              {{ $t("profile.needEmailContact") }}
            </a>
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
            <label for="phone"
              >{{ $t("register.phone") }} (<span
                ><b>{{ phonePrefix }}</b></span
              >)</label
            >
            <span class="requried">*</span>
            <a @click="showPhoneModal" class="mx-1 text-lowercase">
              {{ $t("profile.needPhoneContact") }}
            </a>
            <div class="row justify-content-start align-items-center">
              <div class="col-12">
                <b-form-input
                  id="phone"
                  v-model="form.mobile_number"
                  disabled
                />
              </div>
            </div>
            <div
              class="error"
              v-for="(error, index) in errors.mobile_number"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group>
            <label for="country"
              >{{ $t("profile.defaultCountry") }} :
              {{ userStoredData.title }}</label
            >

            <b-form-select
              v-model="form.country_id"
              
            >
              <b-form-select-option value="null" disabled
                >{{ $t("profile.defaultCountry") }}
                <span class="requried text-danger">*</span>
              </b-form-select-option>
              <b-form-select-option
                v-for="(country, index) in countries"
                :key="index"
                :value="country.id"
                >{{ country.title }}
              </b-form-select-option>
            </b-form-select>

            <div
              class="error"
              v-for="(error, index) in errors.country"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group>
            <label for="country"
              >{{ $t("profile.currency") }} : {{ currency }}
            </label>
            <b-form-select
              v-model="form.currency_id"
              
            >
              <b-form-select-option value="null" disabled
                >{{ $t("profile.currency") }}
                <span class="requried text-danger">*</span>
              </b-form-select-option>
              <b-form-select-option
                v-for="(currency, index) in userStoredData.currencies"
                :key="index"
                :value="currency.id"
                >{{ currency.code }}
              </b-form-select-option>
            </b-form-select>

            <div
              class="error"
              v-for="(error, index) in errors.country"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group>
            <label for="country"
              >{{ $t("profile.lang") }} : {{ form.language }}</label
            >
            <b-form-select v-model="form.language" >
              <b-form-select-option value="null" disabled
                >{{ $t("profile.selectLang") }}
                <span class="requried text-danger">*</span>
              </b-form-select-option>
              <b-form-select-option value="ar">ar</b-form-select-option>
              <b-form-select-option value="en">en</b-form-select-option>
            </b-form-select>

            <div
              class="error"
              v-for="(error, index) in errors.country"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <div
        class="work-info my-5"
        v-if="
          (buyerUserData && buyerUserData.type === 'buyer') ||
          buyerUserData.type === 'b2b' ||
          (buyerUserData.type === 'supplier' && buyerUserData.is_buyer == 1)
        "
      >
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
                  <b-form-input
                    id="companyName"
                    v-model="form.company_name_en"
                    disabled
                  />
                </div>
                <div class="col-md-6 col-sm-12">
                  <label for="companyName">{{
                    $t("register.arabicCompanyName")
                  }}</label>
                  <span class="requried">*</span>
                  <b-form-input
                    id="companyName"
                    v-model="form.company_name_ar"
                    disabled
                  />
                </div>
              </div>
              <router-link to="/contact-us" class="mx-1 text-lowercase">
                {{ $t("profile.needCompanyContact") }}
              </router-link>
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
    <b-modal
      ref="email-modal"
      hide-footer
      centered
      :title="$t('profile.emailVerify')"
    >
      <div class="d-block text-center">
        <form action="">
          <b-form-group>
            <div
              class=""
              :class="{
                'text-left': $i18n.locale == 'en',
                'text-right': $i18n.locale == 'ar',
              }"
            >
              <label for="email">{{ $t("profile.newEmail") }}</label>
              <span class="requried">*</span>
            </div>
            <b-form-input id="newEmail" v-model="newForm.verify_email" />
            <div
              class="error"
              v-for="(error, index) in errors.verify_email"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
          <b-form-group>
            <div
              class=""
              :class="{
                'text-left': $i18n.locale == 'en',
                'text-right': $i18n.locale == 'ar',
              }"
            >
              <label for="email">{{ $t("profile.oldPhone") }}</label>
              <span class="requried">*</span>
            </div>
            <b-form-input
              id="oldPhone"
              v-model="newForm.verify_mobile_number"
              type="number"
            />
            <div
              class="error"
              v-for="(error, index) in errors.verify_mobile_number"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </form>
      </div>
      <div class="row justify-content-around align-items-center">
        <b-button
          class="mt-3"
          variant="outline-danger"
          @click="hideEmailModal"
          >{{ $t("cart.cancel") }}</b-button
        >
        <b-button class="mt-2" variant="outline-success" @click="goToVerify"
          >{{ $t("register.verify") }}
        </b-button>
      </div>
    </b-modal>
    <b-modal
      ref="phone-modal"
      hide-footer
      centered
      :title="$t('profile.phoneVerify')"
    >
      <div class="d-block text-center">
        <form action="">
          <b-form-group>
            <div
              class=""
              :class="{
                'text-left': $i18n.locale == 'en',
                'text-right': $i18n.locale == 'ar',
              }"
            >
              <label for="email">{{ $t("profile.oldEmail") }}</label>
              <span class="requried">*</span>
            </div>
            <b-form-input id="oldEmail" v-model="newForm.verify_email" />
            <div
              class="error"
              v-for="(error, index) in errors.verify_email"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
          <b-form-group>
            <div
              class=""
              :class="{
                'text-left': $i18n.locale == 'en',
                'text-right': $i18n.locale == 'ar',
              }"
            >
              <label for="email">{{ $t("profile.newPhone") }}</label>
              <span class="requried">*</span>
            </div>
            <b-form-input
              id="newPhone"
              v-model="newForm.verify_mobile_number"
              type="number"
            />
            <div
              class="error"
              v-for="(error, index) in errors.verify_mobile_number"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </form>
      </div>
      <div class="row justify-content-around align-items-center">
        <b-button
          class="mt-3"
          variant="outline-danger"
          @click="hidePhoneModal"
          >{{ $t("cart.cancel") }}</b-button
        >
        <b-button class="mt-2" variant="outline-success" @click="goToVerify"
          >{{ $t("register.verify") }}
        </b-button>
      </div>
    </b-modal>
    <b-modal ref="check-modal" hide-footer centered>
      <div class="d-block text-center">
        <checkMailModal />
      </div>
      <div class="row justify-content-around align-items-center">
        <b-button
          class="mt-3"
          variant="outline-success"
          @click="hideCheckModal"
          >{{ $t("home.ok") }}</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import auth from "@/services/auth";
import profile from "@/services/profile";
import checkMailModal from "@/components/changeprofileReply.vue";

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
        language: "",
      },
      newForm: {
        email: "",
        phone: "",
        callback_url: "",
      },
      countries: [],
      errors: {},
      phonePrefix: null,
      modalShow: false,
    };
  },
  mounted() {
    /**
     * get AllCountires  function
     * @function
     */
    this.getAllCountires();

    /**
     * spread user data function ,  that comes from backend
     * @function
     */

    this.form = { ...this.buyerUserData };
    this.phonePrefix = this.buyerUserData.phone_prefix;
    this.form.mobile_number = this.buyerUserData.phone;

    this.form.language = this.buyerUserData.language
      ? this.buyerUserData.language
      : "en";
    this.form.currency_id = this.buyerUserData.currency_id
      ? this.buyerUserData.currency_id
      : "3";
    this.form.country_id = this.buyerUserData.country_id;

    /**
     * check if country exist function  , else reload page
     * @function
     */

    if (!this.buyerUserData.country_id) {
      this.reloadPage();
    }

    /**
     * prepare callback_url to send it to backend with request
     * @function
     */

    this.newForm.callback_url = `${this.mainDoamin}otp-verification`;
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
     /**
     * Update Profile function
     * @function
     */
    updateProfile() {
      const payload = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        job_title: this.form.job_title,
        reg_number: this.form.reg_number,
        portal: "buyer",
        country_id: this.form.country_id,
        language: this.form.language,
        currency_id: this.form.currency_id,
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

    /**
     * reload Page function
     * @function
     */
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
    /**
     * show Email Modal function
     * @function
     */
    showEmailModal() {
      this.$refs["email-modal"].show();
    },
    /**
     * hide Email Modal function
     * @function
     */
    hideEmailModal() {
      this.$refs["email-modal"].hide();
      this.errors = {};
    },
    /**
     * show Phone Modal function
     * @function
     */
    showPhoneModal() {
      this.$refs["phone-modal"].show();
    },
    /**
     * hide Phone Modal function
     * @function
     */
    hidePhoneModal() {
      this.$refs["phone-modal"].hide();
      this.errors = {};
    },
    /**
     * show Check Modal function
     * @function
     */
    showCheckModal() {
      this.$refs["check-modal"].show();
    },
     /**
     * hide Check Modal function
     * @function
     */
    hideCheckModal() {
      this.$refs["check-modal"].hide();
      this.errors = {};
    },
    /**
     * go To Verify function to send data to backend to verify new changes
     * @function
     */
    goToVerify() {
      let data = {
        callback_url: this.newForm.callback_url,
        verify_mobile_number: this.newForm.verify_mobile_number,
        verify_email: this.newForm.verify_email,
        country_code: this.buyerUserData.country_code
          ? this.buyerUserData.country_code
          : this.userInfo.item.country_code,
      };
      profile
        .changeProfileEmailMobile(
          data,
          this.buyerUserData.type
            ? this.buyerUserData.type
            : this.userInfo.item.type
        )
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.hideEmailModal();
          this.hidePhoneModal();
          // this.$router.push("/otp-verification");
          // location.reload();
          if (res.data.message == "Success" || res.data.message == "تم بنجاح") {
            this.showCheckModal();
          }
        })
        .catch((error) => {
          if (error) {
            console.log("error", error);
            const err = Object.values(error)[2].data;
            this.errors = err.items;
            this.errMsg(err.message);
          }
        });
    },
  },
  computed: {
    /**
     * userStoredData
     * @function
     */
    userStoredData() {
      return JSON.parse(localStorage.getItem("country"));
    },
  },
  components: {
    checkMailModal,
  },
};
</script>

<style lang="scss" scoped>
/**
     * page style
     */
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
