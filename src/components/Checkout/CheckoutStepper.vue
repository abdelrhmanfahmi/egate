<template>
  <div class="wrapper">
    <div class="steps-holder">
      <div class="1st-step" v-if="activeStep == 1">
        <div class="step-wrapper">
          <div class="stepper-holder">
            <!--    muchos disgustimos   -->
            <div class="breadcrumb-pagination">
              <div class="active styleActiveMobile">
                <p class="active-p">Shipping</p>
                <div class="">
                  <div class="arrow-down"></div>
                </div>
              </div>
              <span class="styleChvron">
                <v-icon icon="mdi-chevron-right" size="x-large" class="styleArrowAfterActive"></v-icon>
              </span>
              <div class="todo">
                <p>Payment</p>
              </div>
            </div>
          </div>
          <div class="checkoutCartStep my-11">
            <checkoutCartStep @changeSteper="changeActiveStep" />
          </div>
        </div>
      </div>
      <div class="3rd-step" v-if="activeStep == 2">
        <div class="step-wrapper">
          <div class="stepper-holder">
            <div class="breadcrumb-pagination">
              <div class="active styleActiveMobile">
                <p class="active-p">Shipping</p>
              </div>
              <span class="styleChvron">
                <v-icon icon="mdi-chevron-right" size="x-large" class="styleArrowAfterActive"></v-icon>
              </span>
              <div class="active">
                <p class="active-p">Payment</p>
                <div class="">
                  <div class="arrow-down"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="checkoutCompleteOrderStep my-11">
            <checkoutCompleteOrderStep @changeSteper="changeActiveStep" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import checkoutCartStep from "@/components/Checkout/Steps/Step1/CheckoutCartStep.vue";
import checkoutCompleteOrderStep from "@/components/Checkout/Steps/Step3/CheckoutCompleteOrderStep.vue";
export default {
  setup() { },
  methods: {
    changeActiveStep(activeTo) {
      this.activeStep = activeTo;
      window.scrollTo(0, 0);
    },
    checkout() {
      alert("checkout clicked");
    },
  },
  data() {
    return {
      activeStep: 1,
    };
  },
  components: {
    checkoutCartStep,
    checkoutCompleteOrderStep,
  },
};
</script>
<style lang="scss" scoped>
.styleArrowAfterActive {
  font-size: 50px;
}

.mdi-chevron-right::before {
  color: #3399FF !important;
}

p {
  color: #969696;
  font-weight: bold;
}

.step-wrapper {
  min-height: 50vh;

  .stepper-holder {
    .breadcrumb-pagination {
      width: 100%;

      text-align: center;

      color: #969696;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 50%;
      margin: auto;
    }

    .breadcrumb-pagination div {
      min-width: 20%;
      display: inline-block;
      align-content: center;
      margin: auto;
    }

    .active {
      position: relative;

      .arrow-down {
        position: absolute;
        //bottom: 0;
        top: 44px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .active p {
      //border-bottom: 2px solid #3399FF;

      margin-bottom: 0px !important;
      color: #3399FF;
      font-weight: 700;
    }
  }

  .arrow-down {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 15px solid #3399FF;
  }

  .active-p {
    margin-top: 22px;
  }
}

@media only screen and (max-width: 480px){
  .styleActiveMobile{
    bottom:8px;
  }
  .styleChvron{
    position: relative;
    bottom: 8px;
  }
}

</style>
