<template>
  <div class="profile-categories">
    <b-row>
      <b-col v-for="(x, index) in 5" :key="index" lg="4" class="over">
        <CategoryCard :card="{ type: 'لحوم' }" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import profileApi from "@/services/profile";
import CategoryCard from "@/components/global/CategoryCard.vue";
export default {
  components: {
    CategoryCard,
  },
  mounted() {
    this.getCategories()
  },  
  methods: {
    getCategories() {
      profileApi.getCategories().then((res) => {
        console.log(res)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.profile-categories {
  .over {
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
  }
}
</style>