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
                <li v-for="(category, index) in mainCategories" :key="index">
                  <router-link :to="'/categoryPage/'+category.id" class="text-gray" >
                   {{ $i18n.locale == "en" ? category.name_en : category.name_ar }}
                  </router-link>
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
              <router-link class="text-gray" to="/profile/account">My Account</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/profile/orders">Order Tracking</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/profile/wishlist">Wish List</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/profile/returns">Returns / Exchange</router-link>
            </li>
            <li>
              <router-link class="text-gray" to="/faq">FAQs</router-link>
            </li>
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
        <p class="text-gray pt-3">© 2024 Copyrights by E-Gate. All Rights Reserved. Designed by fabrica dev</p>
      </div>
    </v-container>
  </footer>
</template>

<script>
import home from '@/services/home';
import TopFooter from "./TopFooter";
export default {
  mounted(){
    this.getMainCategories();
    this.getMainSettings();
  },
  data(){
    return{
      mainCategories:[],
      settings:[]
    }
  },
  components: {
    TopFooter,
  },
  methods:{
    async getMainCategories(){
      const res = await home.getCategories();
      this.mainCategories = res.data.items.data;
    },
    async getMainSettings(){
      const res = await home.getSettings();
      this.settings = res.data.items.data;
    }
  }
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
