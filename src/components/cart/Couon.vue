<template>
  <div>
    <!-- this is old coupon  -->
    <div class="d-flex flex-wrap align-items-center">
      <b-button
        type="submit"
        @click="checkCoupon(supplier, $event)"
        class="login-button my-2 py-3 px-4 w-auto"
      >
        {{ $t("cart.couponDiscount") }}
      </b-button>
      <div class="input-holder">
        <input
          type="text"
          :placeholder="$t('cart.addCoupon')"
          class="my-2 h-100 p-4 itemInput"
          @input="changeCoupon($event)"
        />
        <span
          :title="$t('cart.enableButton')"
          class="close"
          @click="removeDisabled(supplier)"
          >x</span
        >
      </div>
    </div>

    <h6 class="couponValid text-success m-0 p-0"></h6>
    <h6 class="couponNotValid text-danger m-0 p-0"></h6>
  </div>
</template>

<script>
/**
 *  coupon.
 * @displayName coupon
 */
import suppliers from "@/services/suppliers";
import globalAxios from "@/services/global-axios";
export default {
  methods: {
    /**
      * remove coupon disabled button 
    */
    removeDisabled(supplier) {
      let myInput = this.selectedInput;

      myInput.removeAttribute("disabled");
      myInput.value = "";
      let button = this.selectedButton;
      button.removeAttribute("disabled");

      this.couponChecked = false;
      globalAxios.post(`cart`).then((res) => {
        this.total_cart = res.data.items;
      });

      this.selectedSpan.style.display = "none";
      document.querySelector(".itemInput").removeAttribute("disabled");
      document.querySelector(".login-button").removeAttribute("disabled");

      this.totalDiscountReplacement = parseFloat(0).toFixed(3);
      if (this.totalDiscountReplacement == 0) {
        this.totalPaymentReplacement = this.totalPayment;
      }
      this.selectedInput.parentElement.parentElement.parentElement.querySelector(
        ".couponValid"
      ).innerHTML = "";
      this.selectedInput.parentElement.parentElement.parentElement.querySelector(
        ".couponNotValid"
      ).innerHTML = "";

      let enteredCoupons = document.getElementsByClassName("couponNotValid");
      if (enteredCoupons) {
        for (let index = 0; index < enteredCoupons.length; index++) {
          const element = enteredCoupons[index];
          element.innerHTML = "";
        }
      }

      // remove couppn
      let removeCoupon = {
        id: supplier.supplier_id,
        supplier_id: supplier.supplier_id,
        shipping_type: 1,
        coupon: supplier.coupon ? supplier.coupon : "",
        // point_of_sell_uuid: this.supplierAddress,
        point_of_sell_uuid:
          localStorage.getItem("addressUUID") !== null ||
          localStorage.getItem("addressUUID") !== undefined
            ? localStorage.getItem("addressUUID")
            : "",
      };
      this.$store.dispatch("suppliers/addSupplierToCart", {
        supplier: removeCoupon,
      });

      let myControler = this.$store.state.suppliers.suppliers;
      for (let index = 0; index < myControler.length; index++) {
        const element = myControler[index].supplier;
        // console.log("element" , element.id);

        if (
          (element.shipping_type == 0 && element.id == supplier.supplier_id) ||
          (element.shipping_type == 1 && element.id == supplier.supplier_id)
        ) {
          element.coupon = "";
          // element.couponDisc = 0;
        }
        this.couponRemoved = true;
      }
      setTimeout(() => {
        this.removeDiscount();
      }, 200);
      setTimeout(() => {
        localStorage.removeItem("cou");
      }, 1000);
    },
    changeCouponInput($event) {
      // console.log($event.target.parentElement.querySelector('.itemInput'))
      let elementsHolder = $event.target.parentElement;
      this.selectedInput = elementsHolder.querySelector(".itemInput");
      elementsHolder.parentElement
        .querySelector(".login-button")
        .removeAttribute("disabled");
    },
    /**
      * add coupon disabled button 
    */
    backDisable() {
      this.selectedInput.parentElement.parentElement
        .querySelector(".login-button")
        .removeAttribute("disabled");
    },
    checkCoupon(supplier, $event) {
      console.log(supplier);
      this.selectedInput = $event.target.parentElement
        .querySelector(".input-holder")
        .querySelector(".itemInput");
      var data = {
        coupons: [
          {
            coupon: this.selectedCoupon,
            supplier_id: supplier.supplier_id,
          },
        ],
      };

      suppliers
        .checkCoupon(data)
        .then((res) => {
          // let coupons = [];

          // console.log(res.data.items.total_cart.total_discount);
          if (res.status == 200) {
            localStorage.setItem("cou", this.selectedCoupon);

            if (res.data.items.total_cart.total_discount !== 0) {
              this.selectedInput.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".couponValid"
              ).innerHTML = `${this.$t("payment.couponValid")} `;

              this.selectedInput.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".couponNotValid"
              ).innerHTML = ``;
            } else {
              this.selectedInput.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".couponNotValid"
              ).innerHTML = `${this.$t("payment.couponNotValid")}`;

              this.selectedInput.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".couponValid"
              ).innerHTML = ``;
            }

            this.sucessMsg(res.data.message);
            this.couponChecked = true;

            let myInput = this.selectedInput;
            let button = this.selectedButton;

            let span = this.selectedSpan;

            span.style.display = "block";
            button.setAttribute("disabled", "true");

            myInput.setAttribute("disabled", "true");

            this.changevalue(res);

            // add coupon to supplier

            let newAddCoupon = {
              id: supplier.supplier_id,
              supplier_id: supplier.supplier_id,
              shipping_type: 1,
              coupon: supplier.coupon ? supplier.coupon : "",
              // point_of_sell_uuid: this.supplierAddress,
              point_of_sell_uuid:
                localStorage.getItem("addressUUID") !== null ||
                localStorage.getItem("addressUUID") !== undefined
                  ? localStorage.getItem("addressUUID")
                  : "",
            };
            this.$store.dispatch("suppliers/addSupplierToCart", {
              supplier: newAddCoupon,
            });

            let myControler = this.$store.state.suppliers.suppliers;
            for (let index = 0; index < myControler.length; index++) {
              const element = myControler[index].supplier;
              // console.log("element" , element.id);

              if (
                (element.shipping_type == 0 &&
                  element.id == supplier.supplier_id) ||
                (element.shipping_type == 1 &&
                  element.id == supplier.supplier_id)
              ) {
                element.coupon = localStorage.getItem("cou");
                element.couponDisc = res.data.items.suppliers[0].discount;
              }
              setTimeout(() => {
                localStorage.removeItem("cou");
              }, 1000);
            }
          } else {
            localStorage.removeItem("cou");
          }
        })
        .catch((error) => {
          localStorage.removeItem("cou");
          if (error) {
            const err = Object.values(error)[2].data;
            this.errors = err.items;
            this.errMsg(err.message);
          }
        });
    },
    changeCoupon($event) {
      // console.log($event.target.value);
      this.selectedCoupon = $event.target.value;
      // $event.target.setAttribute('disabled' , 'true')

      let input = $event.target;

      this.selectedInput = input;

      let button = input.parentElement.previousElementSibling;

      this.selectedButton = button;

      let span = input.nextElementSibling;

      this.selectedSpan = span;
    },
    changevalue(res) {
      this.$emit("changeRate", res);
    },
    /**
      * remove discount
    */
    removeDiscount() {
      this.$emit("removeDiscount");
    },
  },
  data() {
    return {
      coupon: null,
      discount: 0,
      couponChecked: false,
      selectedInput: null,
      selectedButton: null,
      selectedSpan: null,
    };
  },
  props: ["item", "supplier"],
};
</script>

<style lang="scss" scoped>
/**
  * import cart style 
*/
@import "~/src/assets/scss/_cartStyle.scss";
</style>
