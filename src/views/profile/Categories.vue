<template>
  <!-- profile categories page  -->
  <div class="profile-categories">
    <div class="categories-info">
      <small>{{ $t("profile.welcomeAgain") }} </small>
      <h4 class="main-header">{{ $t("profile.categories") }}</h4>
    </div>

    <b-row v-if="loading">
      <b-col lg="3" sm="6" v-for="x in 10" :key="x">
        <b-skeleton-img></b-skeleton-img>
        <b-card>
          <b-skeleton
            animation="fade"
            width="60%"
            class="border-none"
          ></b-skeleton>
          <b-skeleton
            animation="fade"
            width="85%"
            class="border-none"
          ></b-skeleton>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col v-for="category in categories" :key="category.id" lg="3" sm="6" class=" custum-padding">
        <router-link :to="`/categories/${category.id}`">
          <CategoryCard
            :card="{ type: category.title }"
            :image="category.image_path"
            class="homecategories"
          />
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// profile categories page 
import CategoryCard from "@/components/global/CategoryCard.vue";
import categories from "@/services/categories";
export default {
  components: {
    CategoryCard,
  },
  methods: {
    /**
     * get Categories function
     * @vuese 
     */
    async getCategories() {
      await categories
        .getCategories("lists/categories")
        .then((resp) => {
          this.categories = resp.data.items;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  data() {
    return {
      loading: true,
      categories: null,
    };
  },
  mounted() {
    this.getCategories();
  },
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
    padding-right: 0px;
    padding-left: 0px;
    padding-bottom: 0px;
    img{
      opacity: .5;
    }
  }
}

</style>
