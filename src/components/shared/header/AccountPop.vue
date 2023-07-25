<template>
  <span
    class="iconHolder cart"
    role="button"
    @click.stop="sideVisible = !sideVisible"
  >
    <v-icon icon="mdi-account-outline"></v-icon>
  </span>
  <div class="sideCartHolder">
    <div
      class="shadedMenu"
      @click.stop="sideVisible = !sideVisible"
      v-show="sideVisible"
    ></div>
    <div
      class="closeMenuX"
      role="button"
      v-if="sideVisible"
      @click.stop="sideVisible = !sideVisible"
    >
      x
    </div>
    <div
      class="cartSideMenu"
      :class="{ sideOpened: sideVisible, sideClosed: !sideVisible }"
    >
      <div class="text-center my-8">
        <h4>Sign In</h4>
      </div>

      <div class="profile">
        <form @submit.prevent="login">
          <label for="email">Email <span class="required">*</span></label>
          <v-text-field v-model="form.email" label="E-mail"></v-text-field>

          <span class="mb-3" v-if="AuthErrors">
            <div
              class="error text-red"
              v-for="(error, index) in AuthErrors.email"
              :key="index"
            >
              {{ error }}
            </div>
          </span>

          <label for="password">Password <span class="required">*</span></label>
          <v-text-field
            v-model.trim="form.password"
            label="Password"
            autocomplete="new-password"
            :rules="repeatPasswordRules"
            :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show2 = !show2"
            :type="show2 ? 'text' : 'password'"
          />

          <span class="mb-3" v-if="AuthErrors">
            <div
              class="error text-red"
              v-for="(error, index) in AuthErrors.password"
              :key="index"
            >
              {{ error }}
            </div>
          </span>
          <button class="buy-btn" type="submit">SIGN IN</button>
          <p class="my-5">
            <span class="text-gray">Don't Have An Account?</span
            ><span>
              <router-link to="/auth/register" class="text-red">
                <span role="button" @click="sideVisible = false">SignUp</span>
              </router-link>
            </span>
          </p>
        </form>
        <div class="mt-11 pt-5">
          <p>Or Continue With Your Social Accounts</p>
          <LoginAuth />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import LoginAuth from "@/components/shared/socialAuth/LoginAuth.vue";
import myMixin from "@/mixins.js";
export default {
  mixins: [myMixin],
  data() {
    return {
      sideVisible: false,
      show1: false,
      show2: false,
      form: {
        email: null,
        password: null,
      },
      errors: null,
    };
  },
  computed: {
    AuthErrors() {
      return this.$store.getters['Auth/AuthErrors'];
    },
  },
  methods: {
    login() {
      this.$store.dispatch("Auth/Login", this.form);
    },
  },
  mounted() {
    this.$store.dispatch("Auth/resetErrors");
  },
  components: {
    LoginAuth,
  },
};
</script>
  
<style lang="scss" scoped>
.sideCartHolder,
.shadedMenu,
.cartSideMenu {
  transition: all 0.3s ease-in-out;
  position: relative;

  .floatingAction {
    position: absolute;
    top: 46px;
    right: 5px;
  }
}

.closeMenuX {
  position: fixed;
  top: 46px;
  right: 360px;
  color: #fff;
  font-size: 25px;
  z-index: 100;
}

.cartSideMenu {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 350px;
  background: #fff;
  z-index: 99;
  padding: 15px;
  overflow-y: scroll;
}

.shadedMenu {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 90;
}

.sideOpened {
  opacity: 1;

  transform: translateX(0);
  color: #000;
}

.sideClosed {
  opacity: 0;

  transform: translateX(100%);
}

.products {
  .product {
    border: 1px solid #a3a3a1;
    border-radius: 16px;
    padding: 15px;
    position: relative;

    .removeProduct {
      position: absolute;
      top: -10px;
      right: -5px;
      width: 29px;
      height: 29px;
      background: #b5140e;
      color: #fff;
      text-align: center;
      border-radius: 50%;
      line-height: 29px;
      font-size: 20px;
      cursor: pointer;
    }
  }
}

.actions {
  button,
  a {
    box-shadow: none !important;
    padding: 20px !important;
  }

  .viewCart {
    border: 1px solid $gray;
  }
}

.product-image {
  max-width: 100%;
  max-height: 1;
  height: 75px;
  object-fit: cover;
}
</style>
  