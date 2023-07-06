<template>
  <div class="wrapper">
    <div class="modal-wrapper">
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"> Return Product </v-btn>
          </template>

          <v-card class="dialog-parent py-10 px-4 pb-5">
            <v-card-text class="text-center">
              <h4 class="mb-5">Return Product</h4>
              <h5 class="text-gray mb-8">
                We will contact you and one of our agents will receive the
                product back in 5 business days
              </h5>
              <h5 class="text-red-darken-4 mb-8">
                Are you sure you want to return this Product?
              </h5>
              <div class="product-holder">
                <v-row>
                  <v-col cols="12" md="8" sm="12" lg="8">
                    <div class="product-name-image">
                      <div class="d-flex align-self-start">
                        <div class="product-img">
                          <img
                            src="https://drive.google.com/uc?id=1-qzpXz-6SaqM3IPlQl_d9YXaPaBPw1xi"
                            alt=""
                          />
                        </div>
                        <div class="product-title">
                          <p class="text-gray">
                            Jbl Speaker A/S 165/70 R13 79T
                          </p>
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" sm="12" lg="4">
                    <div
                      class="d-flex justify-space-between align-self-start text-gray"
                    >
                      <div class="product-quantity">
                        <p><span>x</span> <span class="quantity">2</span></p>
                      </div>
                      <div class="product-price">
                        <p class="price">
                          <span>630</span>
                          <span>
                            <sup> EG </sup>
                          </span>
                        </p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block class="border-main br-5 py-3"
                >YES RETURN PRODUCT</v-btn
              >
            </v-card-actions>
            <div class="close-dialog" @click="dialog = false">
              <v-icon icon="mdi-close"></v-icon>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      rating: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.dialog-parent {
  position: relative;
  .close-dialog {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}

.product-img {
  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-right: 5px;
  }
}
</style>
