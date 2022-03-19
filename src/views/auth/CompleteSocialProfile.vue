<template>
  <section class="user-register my-5">
    <b-container>
      <div class="user-register-form">
        <b-row class="justify-content-center">
          <div v-if="userInfo.item.email && userInfo.item.mobile_number">
            <h1>{{ $t("profile.profileData") }}</h1>
          </div>
          <b-col lg="10" v-else>
            <div class="register-info">
              <h4 class="main-header">{{ $t("register.mainInformation") }}</h4>
            </div>
            <form @submit.prevent="completeProfile()">
              <b-row class="justify-content-center">
                <!-- Email -->
                <b-col lg="12" v-if="userInfo.item.email">
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
                <b-col lg="12" v-if="userInfo.item.mobile_number">
                  <b-form-group>
                    <label for="password">{{ $t("register.phone") }}</label>
                    <span class="requried">*</span>
                    <div class="show-password">
                      <b-form-input
                        id="password"
                        v-model="form.mobile_number"
                        type="text"
                      />
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
      },
      errorMsg: "",
      errors: {},
    };
  },
  created() {
    this.makeLoginSocail();
  },
  mounted() {
    if (this.userInfo.item.email && this.userInfo.item.mobile_number) {
      this.$router.push("/");
    }
  },
  methods: {
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
            this.$router.replace("/");
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    completeProfile() {
      auth
        .completeProfile(this.form)
        .then((res) => {
          this.sucessMsg(res.data.message);
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
