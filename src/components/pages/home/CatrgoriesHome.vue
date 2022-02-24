<template>
  <div class="profile-categories">
    <div class="categories-info">
      <small>{{ $t("profile.welcomeAgain") }} </small>
      <h4 class="main-header">{{ $t("profile.categories") }}</h4>
    </div>
    <b-row>
      <b-col v-for="(x, index) in 12" :key="index" lg="3" class="custum-padding">
        <CategoryCard :card="{ type: 'لحوم' }" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CategoryCard from "@/components/global/CategoryCard.vue";
export default {
  components: {
    CategoryCard,
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.profile-categories {
  text-align: center;

  .categories-info {
    padding-bottom: 30px;
    small {
      color: $main-color;
      font-size: 12px;
      text-transform: uppercase;
    }
    .main-header {
      text-transform: uppercase;
    }
  }
  .custum-padding {
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
  }
}
</style>