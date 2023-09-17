<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <div class="productDescription">
          <h3>Description</h3>
          <div class="text-gray-thin styleCss" v-html="product.description_en"></div>
        </div>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <h3>Details</h3>
        <v-row>
          <v-col md="6" sm="6" xs="12" v-for="i in 8" :key="i">
            <div class="productInfo">
              <div class="d-flex">
                <span>
                  <v-icon icon="mdi-check" class="second-color"></v-icon>
                </span>
                <span>
                  <h5 class="productProperty text-gray">Type</h5>
                  <p class="text-gray-thin">{{ option.name_en }}</p>
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="moreTabInfo">
      <v-tabs v-model="tab" align-tabs="start">
        <v-tab value="1">More Info</v-tab>
        <v-tab value="2">Reveiws</v-tab>
        <v-tab value="3">Return Policy</v-tab>
        <v-tab value="4">Shipping Policy</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="1">
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">SKU</h4>
                    <p>{{ product.sku }}</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Brand</h4>
                    <p>{{ product.brand_name }}</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
        <v-window-item value="2">
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">SKU</h4>
                    <p>Conhfw12c-CONF</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Brand</h4>
                    <p>Fresh</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Cooling System</h4>
                    <p>Cooling</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Sub Color</h4>
                    <p>White</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Model Number</h4>
                    <p>Hfw12c/Iw</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Filter Type</h4>
                    <p>Anti-Bacterial</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
        <v-window-item value="3">
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">SKU</h4>
                    <p>Conhfw12c-CONF</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Brand</h4>
                    <p>Fresh</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Cooling System</h4>
                    <p>Cooling</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Sub Color</h4>
                    <p>White</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Model Number</h4>
                    <p>Hfw12c/Iw</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Filter Type</h4>
                    <p>Anti-Bacterial</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
        <v-window-item value="4">
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">SKU</h4>
                    <p>Conhfw12c-CONF</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Brand</h4>
                    <p>Fresh</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Cooling System</h4>
                    <p>Cooling</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Sub Color</h4>
                    <p>White</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Model Number</h4>
                    <p>Hfw12c/Iw</p>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="text-gray">Filter Type</h4>
                    <p>Anti-Bacterial</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null
    }
  },
  props:['product']
  // props: {
  //   product: {
  //     type: Object,
  //     required: true
  //   }
  // }
};
</script>

<style lang="scss">
p{
  color: #000;
}
.styleCss{
  color: #000;
}
</style>
