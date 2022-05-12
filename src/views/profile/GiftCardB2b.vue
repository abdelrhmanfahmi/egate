<template>
  <div>
    <h5 class="profileB2b-header-table">
      {{ $t("profile.giftCard") }}
    </h5>
    <b-row>
      <b-col lg="6">
        <b-form-group>
          <label for="f-name">{{ $t("profile.giftCardCoupon") }}</label>
          <span class="required">*</span>
          <b-form-input id="f-name" v-model="coupon" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md="6" lg="3">
        <button
          @click="checkProfilecoupon"
          href="#"
          type="submit"
          class="login-button white my-3"
        >
          {{ $t("profile.giftCardCheck") }}
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import profile from "@/services/profile";
export default {
  data() {
    return {
      fields: [
        {
          key: "nameDescription",
          label: this.$t("profile.nameDescription"),
        },
        {
          key: "products",
          label: this.$t("profile.products"),
        },
        {
          key: "finalActivity",
          label: this.$t("profile.finalActivity"),
        },
        {
          key: "procedure",
          label: this.$t("profile.procedure"),
        },
      ],
      items: [
        {
          nameDescription: "مشتريات الشهر",
          products: 2,
          finalActivity: "07/24/2021",
        },
      ],
      coupon: null,
      errors:null
    };
  },
  methods: {
    checkProfilecoupon() {
      profile
        .checkCoupon(this.coupon)
        .then((res) => {
          console.log(res);
          this.sucessMsg(this.$t('profile.couponValid'));
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
<style></style>
