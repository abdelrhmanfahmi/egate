<template>
  <div class="profile">

    <div class="orders-page ">
      <div class="page-title">
        <h2 class="profile-title">Orders</h2>
      </div>
      <div class="moreTabInfo">
        <v-tabs v-model="tab" align-tabs="start">
          <v-tab value="1">Orders</v-tab>
          <v-tab value="2">Buy Again</v-tab>
          <v-tab value="3">Not Yet Dispatched</v-tab>
          <v-tab value="4">Cancelled Orders</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="1">
            <div class="aligned-row mt-8">
              <h4>2 Orders <span class="text-gray">Placed In</span></h4>
              <div class="mx-3">
                <v-select
                  label="Year"
                  hide-details="true"
                  :items="['2012', '2013', '2014', '2015', '2016', '2017']"
                  v-model="form.Placedyear"
                ></v-select>
              </div>
            </div>
            <div class="order-info my-8">
              <v-row>
                <v-col cols="12" lg="6" md="6" sm="12">
                  <p class="order-number">#0123443444</p>
                </v-col>
                <v-col cols="12" lg="6" md="6" sm="12">
                  <p class="order-date">April 11, 2022, 17:33</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="6" md="6" sm="12">
                  <div class="aligned-row">
                    <div class="order-image">
                      <v-img
                        src="@/assets/images/product/Image15.png"
                        width="100"
                      ></v-img>
                    </div>
                    <p class="order-data mx-5">
                      Fresh 65Lu433Rg Smart Android Tv, 65 Inch, Frameless,…
                    </p>
                  </div>
                  <div class="order-status">
                    <span><v-icon icon="mdi-truck-outline"></v-icon></span>
                    <span class="mx-3">Dispatched</span>
                  </div>
                </v-col>
                <v-col cols="12" lg="6" md="6" sm="12" class="mt-5">
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">x2</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">600 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Shipping Fees:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">80 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Estimated Shipping Time:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">3 Days</p>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- prices  -->
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Subtotal:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="product-price">600 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- shipping fees  -->
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Shipping Fees:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="product-price">80 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- Taxes:  -->
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Taxes:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="product-price">50 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- Total::  -->
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Total:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="product-price">730 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="my-8">
                <v-col cols="12" lg="6" md="6" sm="12">
                  <button class=" buy-btn">
                    BUY IT AGAIN
                  </button>
                </v-col>
                <v-col cols="12" lg="6" md="6" sm="12">
                  <button class=" view-btn">VIEW YOUR ITEM</button>
                </v-col>
              </v-row>
            </div>
            <div class="order-info my-8">
              <v-row>
                <v-col cols="12" lg="6" md="6" sm="12">
                  <p class="order-number">#012346222</p>
                </v-col>
                <v-col cols="12" lg="6" md="6" sm="12">
                  <p class="order-date">January 11, 2022, 17:33</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="6" md="6" sm="12">
                  <div class="aligned-row">
                    <div class="order-image">
                      <v-img
                        src="@/assets/images/product/Image15.png"
                        width="100"
                      ></v-img>
                    </div>
                    <p class="order-data mx-5">
                      Canon Hd Camera
                    </p>
                  </div>
                  <h4 class="text-main">ADD A REVIEW</h4>
                  <div class="order-status">
                    <span><v-icon icon="mdi-truck-outline" color="success"></v-icon></span>
                    <span class="mx-3 text-success">Delivered</span>
                  </div>
                </v-col>
                <v-col cols="12" lg="6" md="6" sm="12" class="mt-5">
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">x2</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">600 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Shipping Fees:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">80 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- Estimated Shipping Time  -->
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Estimated Shipping Time:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">3 Days</p>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- prices  -->
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Subtotal:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="product-price">600 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- shipping fees  -->
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Shipping Fees:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="product-price">80 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- Taxes:  -->
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Taxes:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="product-price">50 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- Total::  -->
                  <v-row class="aligned-row">
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="order-qty">Total:</p>
                      </div>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                      <div class="order-date">
                        <p class="product-price">730 Egp</p>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="my-8">
                <v-col cols="12" lg="6" md="6" sm="12">
                  <button class=" buy-btn">
                    BUY IT AGAIN
                  </button>
                </v-col>
                <v-col cols="12" lg="6" md="6" sm="12">
                  <button class=" view-btn">VIEW YOUR ITEM</button>
                </v-col>
              </v-row>
            </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      form: {
        Placedyear: null,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.order-info {
  background: #fff;
  padding: 20px;
  box-shadow: 0px 6px 14px #76715445;
  border-radius: 5px;
}

</style>
