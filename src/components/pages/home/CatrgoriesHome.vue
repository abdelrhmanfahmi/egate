<template>
  <div class="profile-categories">
    <b-container>
      <span class="categories-info">
        <h4 class="top-header">{{ $t("profile.categories") }}</h4>
      </span>
      <b-row>
        <b-col
          v-for="(x, index) in 12"
          :key="index"
          lg="3"
          sm="6"
          class="custum-padding"
        >
          <CategoryCard :card="{ type: 'لحوم' }" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CategoryCard from "@/components/global/CategoryCard.vue";
export default {
  components: {
    CategoryCard,
  },
};
</script>

<style lang="scss" scoped>
.profile-categories {
  text-align: center;
  padding-bottom: 30px;
  .categories-info {
    padding-bottom: 30px;
    small {
      color: $main-color;
      font-size: 12px;
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