<template>
  <div class="wrapper">
    <!-- divide home to two sections  -->
    <div class="hold-all-data">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="12" md="3" lg="3" xl="3">
            <HomeTopCategories :categories="categories" />
          </v-col>
          <v-col cols="12" sm="12" md="9" lg="9" xl="9">
            <HomeMainSlider :banners="banners"/>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import HomeMainSlider from "@/components/home/HomeMainSlider.vue";
import HomeTopCategories from "@/components/home/HomeTopCategories.vue";
import home from "@/services/home";
export default {

  mounted(){
    this.getCategories();
  },

  props:['banners'],

  data(){
    return {
      categories:[]
    }
  },
  methods:{
    async getCategories(){
      await home.getCategories().then(res => {
        this.categories = res.data.items.data;
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    HomeMainSlider,
    HomeTopCategories
},

};
</script>

<style></style>
