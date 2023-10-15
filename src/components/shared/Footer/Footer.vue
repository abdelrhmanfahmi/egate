<template>
  <footer>
    <TopFooter />
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="4">
          <div class="">
            <div class="logo">
              <router-link to="/">
                <v-img width="100" src="@/assets/images/logo.png"></v-img>
              </router-link>
            </div>
          </div>
          <div class="media aligned-row mt-11">
            <div class="image-holder">
              <v-img width="50" src="@/assets/images/footer/Group56027.png"></v-img>
            </div>
            <div class="info mx-2">
              <p class="text-gray gray-only">Got questions? Call us 24/7!</p>
              <p class="text-gray-dark">(800) 8001-8588, (0600) 874 548</p>
            </div>
          </div>
          <div class="additionl-data mt-11">
            <h2>Contact Info</h2>
          </div>
          <p class="text-gray-dark">
            17 Princess Road, Cairo, Greater Alexander NW1
          </p>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="5">
          <div class="titleHolder">

            <h2>Find It Fast</h2>
          </div>
          <v-row>
            <v-col cols='6' md='6' sm='12'>
              <ul>
                <li>
                  <router-link class="text-gray" to="/">Laptops & Computers</router-link>
                </li>
                <li>
                  <router-link class="text-gray" to="/">Cameras & Photography</router-link>
                </li>
                <li>
                  <router-link class="text-gray" to="/">Smart Phones & Tablets</router-link>
                </li>
                <li>
                  <router-link class="text-gray" to="/">Video Games & Consoles</router-link>
                </li>
                <li>
                  <router-link class="text-gray" to="/">TV & Audio</router-link>
                </li>
                <li>
                  <router-link class="text-gray" to="/">Gadgets</router-link>
                </li>
              </ul>
            </v-col>
            <v-col cols='6' md='6' sm='12'>
              <ul>

                <li>
                  <router-link class="text-gray" to="/">Car Electronic & GPS</router-link>
                </li>
                <li>
                  <router-link class="text-gray" to="/">Software</router-link>
                </li>
                <li>
                  <router-link class="text-gray" to="/">Office Supplies</router-link>
                </li>
                <li>
                  <router-link class="text-gray" to="/">Accesories</router-link>
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3">
          <div class="titleHolder">

            <h2>Customer Care</h2>
          </div>
          <ul>
            <li>
              <router-link class="text-gray" to="/">Customer Care</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/">My Account</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/">Order Tracking</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/">Wish List</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/">Customer Service</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/">Returns / Exchange</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/faq">FAQs</router-link>
            </li>
            <!-- <li>
                <router-link class="text-gray" to="/">Product Support</router-link>
            </li> -->
            <li>
              <router-link class="text-gray" to="/privacyPolicy">Privacy Policy</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/terms">Terms & Conditions</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/contact">Contact Us</router-link>
            </li>
          </ul>
        </v-col>
      </v-row>
      <div class="text-center pt-3">
        <hr />
        <p class="text-gray pt-3">© 2023 Copyrights by E-Gate. All Rights Reserved. Designed by fabrica dev</p>
      </div>
    </v-container>
  </footer>
</template>

<script>
import TopFooter from "./TopFooter";
export default {
  components: {
    TopFooter,
  },
};
</script>

<style lang="scss" scoped>
footer {
  background: $header-back;
  color: #fff;
}

.titleHolder {
  padding: 20px 0
}

a {
  line-height: 40px
}

.text-gray,
.text-gray-dark {
  color: #fff !important;
}

.gray-only {
  color: $gray !important;
}
</style>
