<template>
  <section class="user-register my-5">
    <b-container>
      <div class="user-register-form">
        <b-row class="justify-content-center">
          <b-col lg="10">
            <div class="register-info">
              <h4 class="main-header">{{ $t("register.mainInformation") }}</h4>
              <router-link to="/b2b-register" class="back">
                <span>
                  &#60; {{ $t("register.haveNotAccount") }}</span
                ></router-link
              >
            </div>
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
                <!-- Password -->
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
                      <div class="icon-passowrd" @click.stop="switchField()">
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
              </b-row>
              <b class="forget-password my-3" v-b-modal.ForgetPassword>
                {{ $t("login.fogetPassword") }}
              </b>

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
      fieldType: "password",
      errors: {},
    };
  },
  methods: {
    login() {
      auth
        .login("buyer", this.form)
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data.items));
          if (!res.data.items.item.verify_email_required) {
            localStorage.setItem("massege", this.$t("register.openEmail"));
          }
          this.$router.push("/");
          location.reload();
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    //
    switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
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
