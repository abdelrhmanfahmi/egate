<template>
  <section class="user-register">
    <b-container>
      <div class="main-title">
        <span class="sub-title"></span>
        <h2 class="main-header">{{ $t("register.resetPassword") }}</h2>
      </div>
      <div class="user-register-form">
        <b-row class="justify-content-center">
          <b-col lg="10">
            <form @submit.prevent="forgetPassWord()">
              <b-row class="justify-content-center">
                <!-- password -->
                <b-col lg="12">
                  <b-form-group>
                    <label for="password">{{
                      $t("profile.NewPassword")
                    }}</label>
                    <span class="requried">*</span>
                    <div class="show-password">
                      <b-form-input
                        id="password"
                        v-model="form.password"
                        :type="fieldType"
                      />
                      <div class="icon-passowrd" @click="switchField()">
                        <font-awesome-icon
                          icon="fa-solid fa-eye"
                          v-if="fieldType === 'password'"
                          size="lg"
                        />
                        <font-awesome-icon
                          icon="fa-solid fa-eye-slash"
                          v-else
                          size="lg"
                        />
                      </div>
                    </div>
                    <div
                      class="error"
                      v-for="(error, index) in errors.password"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!--password_confirmation -->
                <b-col lg="12">
                  <b-form-group>
                    <label for="password">{{
                      $t("profile.NewPassword")
                    }}</label>
                    <span class="requried">*</span>
                    <div class="show-password">
                      <b-form-input
                        id="password"
                        v-model="form.password_confirmation"
                        :type="fieldType"
                      />
                      <div class="icon-passowrd" @click="switchField()">
                        <font-awesome-icon
                          icon="fa-solid fa-eye"
                          v-if="fieldType === 'password'"
                          size="lg"
                        />
                        <font-awesome-icon
                          icon="fa-solid fa-eye-slash"
                          v-else
                          size="lg"
                        />
                      </div>
                    </div>
                    <div
                      class="error"
                      v-for="(error, index) in errors.password_confirmation"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="submition-box">
                <b-button type="submit" variant="danger">
                  {{ $t("register.save") }}
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
        password: "",
        password_confirmation: "",
      },
      errors: {},
      fieldType: "password",
    };
  },
  methods: {
    switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
    // Step 3 forget Password
    forgetPassWord() {
      // if (this.$route.query.email && this.$route.query.token) {
        const payload = {
          email: this.$route.query.email
            ? this.$route.query.email
            : this.buyerUserData.email,
          token: this.$route.query.token
            ? this.$route.query.token
            : this.userInfo.access_token,
          ...this.form,
        };
        auth
          .forgetPassWord(payload)
          .then((res) => {
            this.sucessMsg(res.data.message);
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          })
          .catch((error) => {
            const err = Object.values(error)[2].data;
            this.errors = err.items;
            this.errMsg(err.message);
          });
      // }
    },
  },
  created() {
    let profileData = this.buyerUserData;
    if (!profileData) {
      // location.replace("");
      this.$router.push("/b2b-login");
    }
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
    .submition-box {
      text-align: center;
      border: 1px solid rgba(204, 204, 204, 0.251);
      border-radius: 4px;
      background-color: rgba(216, 220, 221, 0.251);
      padding: 40px 30px;
    }
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
