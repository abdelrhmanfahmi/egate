<template>
  <div class="wrapper">
    <!-- divide home to two sections  -->
    <div class="hold-all-data">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="3" lg="3" xl="3">
            <HomeTopCategories />
          </v-col>
          <v-col cols="12" sm="12" md="9" lg="9" xl="9">
            <!-- HomeMainSlider  -->
            <HomeMainSlider />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import HomeMainSlider from "@/components/home/HomeMainSlider.vue";
import HomeTopCategories from "@/components/home/HomeTopCategories.vue";
export default {
  components: {
    HomeMainSlider,
    HomeTopCategories,
  },
};
</script>

<style></style>
