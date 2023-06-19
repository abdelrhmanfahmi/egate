<template>
  <div>
    <div class="advantages my-11">
      <section class="productShipping">
        <div class="d-flex">
          <div class="shippingTime d-flex mr-3">
            <p class="mx-1 text-gray-thin">
              <font-awesome-icon
                icon="fa-solid fa-truck-fast"
                class="mx-1"
              />Shipping:
            </p>
            <p>Within 2 Days</p>
          </div>
          <div class="shippingTime d-flex mx-3">
            <p class="mx-1 text-gray-thin">
              <font-awesome-icon icon="fa-solid fa-store" class="mx-1" />Sold
              By:
            </p>
            <p>Velocity</p>
          </div>
        </div>
      </section>
      <section>
        <v-row class="aligned-row">
          <v-col cols="12" md="4" sm="12">
            <div class="box-holder">
              <div class="aligned-row">
                <span>
                  <img
                    :src="require('@/assets/images/product/Group56067.png')"
                    width="50"
                    height="50"
                    class="mx-2"
                  />
                </span>
                <span>
                  <h3 class="text-gray">Free returns</h3>
                  <p class="text-gray-thin">
                    Get Free Returns On Eligible Items
                  </p>
                </span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <div class="box-holder">
              <div class="aligned-row">
                <span>
                  <img
                    :src="require('@/assets/images/product/Group56073.png')"
                    width="50"
                    height="50"
                    class="mx-2"
                  />
                </span>
                <span>
                  <h3 class="text-gray">Safe Shopping</h3>
                  <p class="text-gray-thin">Your Data Is Always Protected</p>
                </span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <div class="box-holder">
              <div class="aligned-row">
                <span>
                  <img
                    :src="require('@/assets/images/product/Group56072.png')"
                    width="50"
                    height="50"
                    class="mx-2"
                  />
                </span>
                <span>
                  <h3 class="text-gray">Trusted Shipping</h3>
                  <p class="text-gray-thin">
                    Free Shipping When You Spend EGP 200 And Above On Express
                    Items
                  </p>
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  margin: 5% 0;
  .box-holder {
    border: 1px solid $main-color;
    padding: 25px;
    border-radius: 20px;
    min-height: 130px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
