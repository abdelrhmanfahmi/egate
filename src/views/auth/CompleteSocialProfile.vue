<template>
    <!-- complete social profile page if user logged in socially  -->
  <section class="user-register my-5">
    <b-container>
      <div class="user-register-form">
        <b-row class="justify-content-center">
          <div div v-if="userInfo.item.email && userInfo.item.mobile_number">
            <h1>{{ $t("profile.profileData") }}</h1>
          </div>
          <b-col lg="10" v-else>
            <div class="register-info">
              <h4 class="main-header">
                {{ $t("profile.completeInformation") }}
              </h4>
            </div>
            <form @submit.prevent="completeProfile()">
              <b-row class="justify-content-center">
                <!-- Email -->
                <b-col lg="12" v-if="!userInfo.item.email || !userInfo.item.email.includes('@')">
                  <b-form-group>
                    <label for="email">{{ $t("register.email") }}</label>
                    <span class="requried">*</span>
                    <b-form-input
                      type="email"
                      id="email"
                      v-model="form.email"
                    />
                    <div
                      class="error"
                      v-for="(error, index) in errors.email"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- country code -->
                <b-col lg="3" cols="4" v-if="!userInfo.item.mobile_number">
                  <b-form-group>
                    <label for="countryCode">{{
                      $t("register.countryCode")
                    }}</label>
                    <span class="requried">*</span>
                    <b-form-select v-model="form.country_code">
                      <b-form-select-option
                        v-for="country in countries"
                        :key="country.id"
                        :value="country.iso"
                        >{{ country.title }}
                        {{ country.phone_prefix }}</b-form-select-option
                      >
                    </b-form-select>
                    <div
                      class="error"
                      v-for="(error, index) in errors.country_code"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- phone -->
                <b-col lg="9" cols="8" v-if="!userInfo.item.mobile_number">
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
              </b-row>
              <div class="submition-box">
                <b-button type="submit" variant="danger">
                  {{ $t("register.submit") }}
                </b-button>
              </div>
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
        email: "",
        mobile_number: "",
        country_code: "KW",
        active_with: "sms",
      },
      connects: [
        { name: this.$t("register.phone"), value: "sms" },
        { name: this.$t("register.email"), value: "email" },
      ],
      errorMsg: "",
      errors: {},
      provider: localStorage.getItem("provider"),
      countries: [],
    };
  },
  async created() {
    /**
     * sociall login
     * @public This is a public 
    */
    await this.makeLoginSocail();
    if (this.userInfo.item.email && this.userInfo.item.mobile_number) {
      this.$router.push("/");
    }
    this.getAllCountires();
  },
  methods: {
    /**
     * get all countries function
     * @public This is a public 
    */
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
    /**
     * make Login Socail function
     * @public This is a public 
    */
    makeLoginSocail() {
      if (this.$route.query.code) {
        const payload = {
          redirect: `${this.mainDoamin}complete-social-profile`,
          code: this.$route.query.code,
        };
        auth
          .makeLoginSocail("b2c", this.provider, payload)
          .then((res) => {
            localStorage.setItem("userInfo", JSON.stringify(res.data.items));
            this.$router.replace("/complete-social-profile");
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /**
     * complete Profile function
     * @public This is a public 
    */
    completeProfile() {
      auth
        .completeProfile(this.form)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.$router.replace("/");
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
.user-register {
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
    .submition-box {
      text-align: center;
      border: 1px solid rgba(204, 204, 204, 0.251);
      border-radius: 4px;
      background-color: rgba(216, 220, 221, 0.251);
      padding: 20px;
    }
  }
}

.forget-password {
  display: block;
  font-weight: 500;
  color: $header-color;
  background-color: transparent;
  border: none;
  &:hover {
    color: $main-color;
  }
}
// style arabic
html:lang(ar) {
  .user-register {
    .user-register-form {
      text-align: right;
    }
  }
}
</style>