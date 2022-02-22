<template>
  <section class="user-register">
    <b-container>
      <div class="user-register-form">
        <b-row class="justify-content-center">
          <b-col lg="10">
            <div class="register-info">
              <h4 class="main-header">{{ $t("register.mainInformation") }}</h4>
              <a v-b-toggle.login class="back">
                <span> &#60; {{ $t("register.alreadyHaveAccount") }}</span></a
              >
            </div>
            <p class="error">{{ errorMsg }}</p>
            <form @submit.prevent="login()">
              <b-row class="justify-content-center">
                <!-- Email -->
                <b-col lg="12">
                  <b-form-group>
                    <label for="email">{{ $t("register.email") }}</label>
                    <span class="requried">*</span>
                    <b-form-input
                      type="email"
                      id="email"
                      v-model="form.email"
                      required
                    />
                  </b-form-group>
                </b-col>
                <!-- Password -->
                <b-col lg="12">
                  <b-form-group>
                    <label for="password">{{ $t("register.password") }}</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="password"
                      v-model="form.password"
                      type="password"
                      required
                    />
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
        password: "",
      },
      errorMsg: "",
    };
  },
  methods: {
    login() {
      auth
        .login("buyer", this.form)
        .then(async (res) => {
          await localStorage.setItem("token", res.data.items.access_token);
          this.$router.push("/");
          location.reload();
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;

          this.errorMsg = err.message;
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
