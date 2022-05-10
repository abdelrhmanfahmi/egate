<template>
  <div>
    <div class="container">
      <div class="card success" v-if="success">
        <div
          style="
            border-radius: 200px;
            height: 200px;
            width: 200px;
            background: #f8faf5;
            margin: 0 auto;
          "
        >
          <i class="checkmark">✓</i>
        </div>
        <h1>
          {{ $t("payment.congrats") }}
        </h1>
        <p>
          {{ $t("payment.waitPurchace1") }}
          <br />
          {{ $t("payment.waitPurchace2") }}
        </p>
        <router-link to="">
          <b-button variant="outline-success mt-4">
            {{ $t("payment.orderTrack") }}
          </b-button>
        </router-link>
      </div>
      <div class="card fail" v-if="fail">
        <div
          style="
            border-radius: 200px;
            height: 200px;
            width: 200px;
            background: #f8faf5;
            margin: 0 auto;
          "
        >
          <i class="checkmark m-0">
            <font-awesome-icon icon="fa-solid fa-exclamation" />
          </i>
        </div>
        <h1 class="mt-3">
          {{ $t("payment.fail1") }}
        </h1>
        <!-- <p>
          {{ $t("payment.waitPurchace1") }}
          <br />
          {{ $t("payment.waitPurchace2") }}
        </p> -->
        <!-- <router-link to="">
          <b-button variant="outline-success mt-4">
            {{ $t("payment.orderTrack") }}
          </b-button>
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/services/auth";
export default {
  data() {
    return {
      success: false,
      fail: false,
    };
  },
  methods: {
    checkComplete() {
      let data = {
        order_uuid: this.$route.query.order_uuid || "",
        payment_charge_id: this.$route.query.tap_id || "",
      };
      auth
        .checkoutComplete(data)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.success = true;
            this.fail = false;
          } else {
            this.success = false;
            this.fail = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.checkComplete();
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
