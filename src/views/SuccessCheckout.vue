<template>
  <div>
    <div class="container">
      <div class="card success">
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

        <b-button
          variant="outline-success mt-4 text-capitalize"
         
          id="show-btn"
          class="mx-2"
          @click="loginFirst"
        >
          {{ $t("payment.orderTrack") }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);
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
        order_uuid: this.$route.query.order_uuid,
        payment_charge_id: this.$route.query.tap_id,
      };
      auth
        .checkoutComplete(data)
        .then((res) => {
          console.log(res);
          if (res.data.items.status === "CAPTURED") {
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
    loginFirst() {
      Vue.swal({
        title: this.$t("singleProduct.loginFirst"),
        text: this.$t("singleProduct.orderTrack2"),
        icon: "warning",
        // buttons: ["Oh noez!", true],
        dangerMode: true,
      }).then(() => {
        this.$router.push("/user-register");
      });
    },
  },
  mounted() {
    // this.checkComplete();
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
