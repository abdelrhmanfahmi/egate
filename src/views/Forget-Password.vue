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
            <form>
              <b-row class="justify-content-center">
                <!-- password -->
                <b-col lg="12">
                  <b-form-group>
                    <label for="password">{{ $t("register.password") }}</label>
                    <b-form-input id="password" type="password" />
                  </b-form-group>
                </b-col>
                <!--passwordConfirmation -->
                <b-col lg="12">
                  <b-form-group>
                    <label for="passwordConfirmation">{{
                      $t("register.passwordConfirmation")
                    }}</label>
                    <b-form-input id="passwordConfirmation" type="password" />
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
    return {};
  },
  methods: {
    // Step 3 forget Password
    forgetPassWord() {
      if (this.$route.query.email && this.$route.query.token) {
        const payload = {
          email: this.$route.query.email,
          code: this.$route.query.token,
        };
        auth
          .forgetPassWord(payload)
          .then((res) => {
            this.$bvToast.toast(res.data.message, {
              variant: "success",
              title: "success",
              autoHideDelay: 5000,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
