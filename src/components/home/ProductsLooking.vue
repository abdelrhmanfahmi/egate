<template>
  <div class="wrapper">
    <v-container fluid>
      <section class="pt-5 pb-5" v-if="categoryFeatured">
        <v-row>
          <v-col cols="12" md="3" v-for="(category, idx) in categoryFeatured" :key="idx">
            <h6 class="title mb-5">{{ category.name_en }}</h6>
            <v-row>
              <v-col cols="6" sm="6" class="px-1 py-1" v-for="(subCategory, index) in category.childrens.slice(0, 4)" :key="index">
                <div class="img-holder">
                  <img :src="subCategory.cover" width="100" height="100" />
                </div>
              </v-col>
            </v-row>
            <div class="btn my-3">
              <v-btn variant="tonal" @click.prevent="goToCategory(category.id)"> {{ $i18n.locale == "en" ? 'See More' :
                'رؤية المزيد' }} </v-btn>
            </div>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>

export default {
  props: ['categoryFeatured'],
  methods: {
    goToCategory(id) {
      this.$router.push({ path: '/categoryPage/' + id });
    }
  }
};
</script>

<style lang="scss" scoped>
.img-holder {
  margin: auto;

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 10px !important;
  }
}

.v-row {
  margin: 0px;
  padding: 0;
}
</style>
