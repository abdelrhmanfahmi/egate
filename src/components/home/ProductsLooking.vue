<template>
  <div class="wrapper">
    <v-container fluid>
      <section class="pt-5 pb-5" v-if="categoryFeatured">
        <v-row>
          <v-col cols="12" md="3" v-for="(category , idx) in categoryFeatured" :key="idx">
            <h3 class="title mb-5">{{ category.name_en }}</h3>
            <v-row>
              <v-col cols="6" sm="6" class="px-1 py-1">
                <div class="img-holder">
                  <img
                    :src="category.cover"
                  />
                </div>
              </v-col>
            </v-row>
            <div class="btn my-3">
              <v-btn variant="tonal"> See More </v-btn>
            </div>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>

export default {
  props:['categoryFeatured']
};
</script>

<style lang="scss" scoped>
.img-holder {
  margin: auto;
  img {
    width: 100%;
    border-radius: 10px !important;
  }
}
.v-row {
  margin: 0px;
  padding: 0;
}
</style>
