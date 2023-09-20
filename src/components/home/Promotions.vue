<template>
  <div class="wrapper">
    <v-container fluid>
      <v-row>
        <v-col v-for="(promotion,index) in promotions" :key="index" cols="12" sm="4" >
          <img class="img-responsive promo-image" :src="promotion.image" />
        </v-col>
      </v-row>
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
  object-fit: cover !important;
  border-radius: 10px !important;
  width: 100%;
}
</style>
