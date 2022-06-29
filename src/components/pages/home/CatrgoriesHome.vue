<template>
  <div class="profile-categories">
    <b-container>
      <span class="categories-info">
        <h5 class="top-header">{{ $t("profile.categories") }}</h5>
      </span>
      <div v-if="loading">
        <b-row class="holder">
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
      </div>
      <b-row v-else>
        <b-col
          v-for="category in categories"
          :key="category.id"
          lg="3"
          sm="6"
          class="homecategories custum-padding"
        >
          <router-link :to="`/categories/${category.id}`">
            <CategoryCard
              :card="{ type: category.title }"
              :image="category.image_path"
            />
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CategoryCard from "@/components/global/CategoryCard.vue";
import categories from "@/services/categories";
// import VueSkeletonLoader from "skeleton-loader-vue";
export default {
  components: {
    CategoryCard,
    // VueSkeletonLoader,
  },
  methods: {
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
      msg: "First Message",
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
    padding-right: 0px;
    padding-left: 0px;
    padding-bottom: 0px;
    img{
      opacity: .5;
    }
  }
}

.card {
  border: none !important;
}
.card-body {
  padding: 1.25rem 0 !important;
}
.holder{
  overflow: hidden;
}
</style>
