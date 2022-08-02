<template>
  <div class="subscribe-newsletter">
    <h4 class="main-header">{{ $t("profile.subscribeNewsletter") }}</h4>
    <div class="sec-subscribe">
      <h6 class="main-header">{{ $t("profile.notSubscribed") }}</h6>
      <p>{{ $t("profile.exclusiveOffers") }}</p>

      <!-- Email -->
      <b-col lg="6 subscribe-newsletter-form">
        <b-form-group>
          <label for="email">{{ $t("register.email") }}</label>
          <span class="requried">*</span>
          <b-form-input id="email" v-model="form.email" />
          <div
            class="error"
            v-for="(error, index) in errors.email"
            :key="index"
          >
            {{ error }}
          </div>
        </b-form-group>
      </b-col>

      <b-button type="submit" class="login-button" @click="makeSubscribe()">
        {{ $t("profile.subscribe") }}
      </b-button>

      <b-button
        type="submit"
        class="login-button dark"
        v-if="emailExaxt"
        @click="cancelSubscribe()"
      >
        {{ $t("profile.cancelSubscribe") }}
      </b-button>
    </div>
  </div>
</template>

<script>
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
    getSubscriptions() {
      profile.getSubscriptions().then((res) => {
        this.form.email = res.data.items.email;
        this.emailExaxt = res.data.items.email;
      });
    },
    // makeSubscribe
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
    border-bottom: 2px solid #dee2e6;
    border-top: 2px solid #dee2e6;
    .login-button {
      margin: 10px auto 0;
      width: 20%;
      @media(max-width:992px){
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