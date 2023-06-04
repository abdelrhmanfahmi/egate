<template>
  <!-- subscribe news letter page  -->
  <div class="subscribe-newsletter">
    <div class="img-holder text-center">
      <img
        src="@/assets/images/new-design/newsletter.png"
        alt="newsletter"
        class="img-fluid"
      />
    </div>
    <div class="sec-subscribe">
      <h1 class="main-header">{{ $t("profile.subscribeNewsletter") }}</h1>
      <p>Receive special offers and exclusive coupons</p>

      <div
        class="hold-it"
        :class="{ 'text-left': $i18n.locale == 'en', 'text-right': $i18n.locale == 'ar' }"
      >
        <!-- Email -->
        <b-col lg="6 subscribe-newsletter-form">
          <b-form-group>
            <label for="email">{{ $t("register.email") }}</label>
            <span class="requried">*</span>
            <b-form-input id="email" v-model="form.email" />
            <div class="error" v-for="(error, index) in errors.email" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>

        <b-button type="submit" class="login-button" @click="makeSubscribe()">
          {{ $t("profile.subscribe") }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * subscribe news letter page
 * @displayName subscribe news letter page
 */
import profile from "@/services/profile";

export default {
  data() {
    return {
      form: {
        email: "",
      },
      emailExaxt: {},
      errors: {},
    };
  },
  mounted() {
    this.getSubscriptions();
  },
  methods: {
    /**
     * get Subscriptions function
     * @vuese
     */
    getSubscriptions() {
      profile.getSubscriptions().then((res) => {
        this.form.email = res.data.items.email;
        this.emailExaxt = res.data.items.email;
      });
    },
    /**
     * make Subscribe function
     * @vuese
     */
    makeSubscribe() {
      profile
        .makeSubscribe(this.form)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.errors = {};
          this.getSubscriptions();
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    /**
     * cancel Subscribe function
     * @vuese
     */

    cancelSubscribe() {
      profile
        .cancelSubscribe()
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.getSubscriptions();
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errMsg(err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.subscribe-newsletter {
  padding: 30px 0;
  .subscribe-newsletter-form {
    margin: auto;
  }
  .sec-subscribe {
    margin: 30px 0;
    padding: 30px 0;
    text-align: center;
    //border-bottom: 2px solid #dee2e6;
    //border-top: 2px solid #dee2e6;
    .login-button {
      margin: 10px auto 0;
      width: 20%;
      @media (max-width: 992px) {
        width: 100%;
      }
    }
  }
}
html:lang(ar) {
  .subscribe-newsletter {
    text-align: right;
  }
}
</style>
