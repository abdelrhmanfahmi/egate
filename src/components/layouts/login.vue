<template>
  <div class="user-login">
    <b-sidebar
      id="login"
      backdrop
      width="450px"
      :right="getDir === 'rtl'"
      shadow
      z-index="5"
      body-class="sidebar-login"
      bg-variant="#fff"
    >
      <div class="user-login-form">
        <h6 class="title">{{ $t("login.login") }}</h6>
        <p class="mb-2">{{ $t("login.WelcomeAgain") }}</p>
        <p class="error">{{ errorMsg }}</p>
        <form @submit.prevent="loginB2c()">
          <b-form-input
            v-model="form.email"
            type="email"
            :placeholder="$t('register.email')"
            required
          />
          <div class="show-password">
            <b-form-input
              required
              class="my-2"
              v-model="form.password"
              :type="fieldType"
              :placeholder="$t('register.password')"
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

          <a class="forget-password">{{ $t("login.fogetPassword") }}</a>
          <b-button type="submit" class="login-button">
            {{ $t("login.login") }}
          </b-button>
        </form>
      </div>
      <!-- social login -->
      <div class="social-login">
        <p>{{ $t("login.LoginSocial") }}</p>
        <div class="social-icons">
          <button @click="getLink('facebook')" class="button-social">
            <font-awesome-icon icon="fa-brands fa-facebook-f" size="lg" />
          </button>
          <button @click="getLink('google')" class="button-social">
            <font-awesome-icon icon="fa-brands fa-google" size="lg" />
          </button>
          <button @click="getLink('azure')" class="button-social">
            <font-awesome-icon icon="fa-brands fa-windows" size="lg" />
          </button>
          <button @click="getLink('apple')" class="button-social">
            <font-awesome-icon icon="fa-brands fa-apple" size="lg" />
          </button>
        </div>
      </div>

      <div class="user-login-form">
        <p class="title">{{ $t("login.DontHave") }}</p>
        <b-button to="/user-register" class="login-button my-2">
          {{ $t("login.createAccount") }}
        </b-button>
      </div>
    </b-sidebar>
  </div>
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
      fieldType: "password",
    };
  },
  methods: {
    loginB2c() {
      auth
        .login("b2c", this.form)
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
    async getLink(provider) {
      await localStorage.setItem("provider", provider);
      auth
        .getSocialLink("b2c", provider, this.mainDoamin)
        .then((res) => {
          window.location.href = res.data.items.url;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
  },
};
</script>

<style lang="scss" scoped>
.user-login {
  .user-login-form {
    text-align: center;
    border: 1px solid rgba(204, 204, 204, 0.251);
    border-radius: 4px;
    background-color: rgba(216, 220, 221, 0.251);
    padding: 40px 30px 20px;
    .title {
      padding-bottom: 10px;
      position: relative;
      &:after {
        margin: 0 auto;
        right: 0;
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 20px;
        height: 3px;
        background: #ed2124;
      }
    }
    .forget-password {
      font-weight: 500;
      color: $header-color;
      &:hover {
        color: $main-color;
      }
    }
  }
  .social-login {
    padding: 20px 0;
    .social-icons {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .button-social {
    padding: 20px 30px;
    margin: 0 5px;
    color: #fff;
    border: 0;
    border-radius: 5px;
    margin-bottom: 10px;
    &:first-child {
      background-color: #3b5998;
    }
    &:nth-child(2) {
      background-color: #c5221f;
    }
    &:nth-child(3) {
      background-color: #3b5998;
    }
    &:last-child {
      background-color: #c5221f;
    }
  }
}
</style>
