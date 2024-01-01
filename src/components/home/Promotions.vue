<template>
  <div class="wrapper mb-5">
    <v-container fluid>
      <v-row v-if="promotions">
        <v-col v-for="(promotion,index) in promotions.slice(0,3)" :key="index" cols="12" sm="4" >
          <router-link :to="'/productPage/'+promotion.id">
              <img class="img-responsive promo-image" :src="promotion.image" />
          </router-link>
        </v-col>
      </v-row>
      <v-row v-else></v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },

  props:['promotions']

};
</script>

<style lang="scss" scped>
.promo-image{
  height: 50vh !important;
  object-fit: fill !important;
  border-radius: 10px !important;
  width: 100%;
}
</style>
