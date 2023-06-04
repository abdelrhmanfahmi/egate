<template>
  <!-- check wallet charge page  -->
  <div>
    <div class="container">
      <div class="card success" v-if="success">
        <div style="
              border-radius: 200px;
              height: 200px;
              width: 200px;
              background: #f8faf5;
              margin: 0 auto;
            ">
          <i class="checkmark">✓</i>
        </div>
        <h1>
          {{ $t("payment.congrats") }}
        </h1>
        <div>
          <p>
            {{ $t("payment.waitPurchace1") }}
          </p>
          <p>
            <!-- order id  -->
            <span>{{ $t("profile.orderSerial") }} :</span>
            <span>{{ id }} #</span>
          </p>
          <!-- tab charge id  -->
          <p>
            TID : {{ tap_charge_id }}
          </p>
          <br />
          {{ $t("payment.waitPurchace2") }}
        </div>
        <router-link to="/profile/Wallet" v-if="buyerUserData">
          <b-button variant="outline-success mt-4">
            {{ $t("profile.wallet") }}
          </b-button>
        </router-link>
        <p>{{ $t('profile.WalletRedirect') }}</p>
      </div>
      <div class="card fail" v-if="fail">
        <div style="
              border-radius: 200px;
              height: 200px;
              width: 200px;
              background: #f8faf5;
              margin: 0 auto;
            ">
          <i class="checkmark m-0">
            <font-awesome-icon icon="fa-solid fa-exclamation" />
          </i>
        </div>
        <h1 class="mt-3" v-if="failReason == null">
          {{ $t("payment.fail1") }}
        </h1>
        <h1 class="mt-3" v-else>
          <p>
            {{ $t("payment.fail1") }}
          </p>
          <p>
            {{ failReason }}
          </p>
          <p>{{ $t('profile.WalletRedirect') }}</p>
        </h1>
      </div>
    </div>
  </div>
</template>
  
<script>
/**
 *  check wallet charge page
 * @displayName  check wallet charge page
 */
import profile from "@/services/profile";
export default {
  data() {
    return {
      success: false,
      fail: false,
      failReason: null,
      orderId: null,
      id: this.$route.query.id,
      tap_charge_id: this.$route.query.tap_id
    };
  },
  methods: {
    /**
     * check Wallet Charge function 
     * @vuese 
     */
    checkWalletCharge() {
      let data = {
        id: this.$route.query.id,
        tap_charge_id: this.$route.query.tap_id,
      };
      profile
        .checkWalletCharge(data)
        .then((res) => {
          this.orderId = res.data.items.order_id
          if (res.data.items.status === 'CAPTURED') {
            this.success = true;
            this.fail = false;
          } else {
            this.failReason = res.data.items.status_lang
            this.success = false;
            this.fail = true;
          }
          setTimeout(() => {
            this.$router.push('/profile/Wallet')
          }, 0);
        })
        .catch((err) => {
          console.log(err);
        });


    },
  },
  mounted() {
    this.$router.push('/profile/Wallet')
    /**
     * check Wallet Charge function  when page load
     * @vuese 
     */
    this.checkWalletCharge();
  },
};
</script>
  
<style lang="scss" scoped>
.container {
  text-align: center;
  padding: 40px 0;
  // background: #ebf0f5;
  min-height: 500px;
}

h1 {
  color: #88b04b;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 10px;
}

p {
  color: #404f5e;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
  margin: 0;
}

i {
  color: #9abc66;
  font-size: 100px;
  line-height: 200px;
  margin-left: -15px;
}

.card {
  background: white;
  padding: 60px;
  border-radius: 4px;
  box-shadow: 0 2px 3px #c8d0d8;
  display: inline-block;
  margin: 0 auto;
}

.success {
  h1 {
    color: #88b04b;
    font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  }

  i {
    color: #9abc66;
  }
}

.fail {
  h1 {
    color: $main-color;
    font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  }

  i {
    color: $main-color;
  }
}
</style>
  