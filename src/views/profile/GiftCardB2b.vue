<template>
  <!-- gift cards b2b page  (not working now) -->
  <div>
    <h5 class="profileB2b-header-table">
      {{ $t("profile.giftCard") }}
    </h5>
    <b-row class="align-items-center">
      <b-col lg="6">
        <b-form-group>
          <label for="f-name">{{ $t("profile.giftCardCoupon") }}</label>
          <span class="required">*</span>
          <b-form-input id="f-name" v-model="coupon" />
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6" lg="3">
        <button
          @click="checkProfilecoupon"
          href="#"
          type="submit"
          class="login-button white mt-3"
        >
          {{ $t("profile.giftCardCheck") }}
        </button>
      </b-col>
    </b-row>
    <div class="" v-if="errors">
      <div
        class="error text-start"
        v-for="(error, index) in errors.coupon"
        :key="index"
      >
        {{ error }}
      </div>
    </div>
    <div class="response-data mt-5" v-if="success">
      <table class="table table-striped table-hover table-bordered selectable">
        <thead>
          <tr>
            <th scope="col" v-for="(tab, index) in fields" :key="index">
              {{ tab.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center">
            <!-- <td>{{ coupon.client.company_name }}</td> -->
            <td>{{ myCoupon.discount }} {{ myCoupon.discount_type }}</td>
            <td>{{ myCoupon.end_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
//  gift cards b2b page 
import profile from "@/services/profile";
export default {
  data() {
    return {
      fields: [
        {
          key: "products",
          label: this.$t("profile.discountvalue"),
        },
        {
          key: "finalActivity",
          label: this.$t("profile.validTill"),
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
      errors: null,
      success: false,
      myCoupon: null,
    };
  },
  methods: {
    /**
     * check Profile coupon function 
     * @vuese
     */
    checkProfilecoupon() {
      profile
        .checkCoupon(this.coupon)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.success = true;
            this.sucessMsg(this.$t("profile.couponValid"));
            this.myCoupon = res.data.items;
            this.errors = [];
          }else{
            this.success = false;
          }
        })
        .catch((error) => {
          this.success = false;
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.valid-for {
  font-size: 20px;
}
.title {
  width: 20%;
  @media (max-width: 767px) {
    width: 50%;
  }
}
</style>
