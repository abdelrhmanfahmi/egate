<template>
  <div class="profile-categories">
    <div>
      <!-- when data loading  -->
      <div v-if="loading">
        <b-row class="holder">
          <b-col lg="2" sm="6" v-for="x in 10" :key="x">
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
      <div class="items" v-else>
        <div class="item" v-for="category in categories" :key="category.id">
          <router-link :to="`/categories/${category.id}`">
            <CategoryCard
              :card="{ type: category.title }"
              :image="category.image_path"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// home categories component
import CategoryCard from "@/components/global/CategoryCard.vue";
import categories from "@/services/categories";
export default {
  components: {
    CategoryCard,
  },
  methods: {
    /**
     * @vuese
     *  get all categories function
     */
    async getCategories() {
      await categories
        .getCategories("lists/categories")
        .then((resp) => {
          this.categories = resp.data.items;
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
/**
  *  component style  
*/
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
    margin: 0 5px;
    img {
      opacity: 0.5;
    }
  }
}

.card {
  border: none !important;
}
.card-body {
  padding: 1.25rem 0 !important;
}
.holder {
  overflow: hidden;
}

.items {
  justify-content: space-between;
  display: grid;
  // grid-template-columns: repeat(auto-fit, 400px);

  grid-template-rows: repeat(auto-fit, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));

  // margin: 0 1rem;
  @media (min-width: 767px) and (max-width: 991.98px) {
    grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));
    justify-content: space-evenly;
  }
  @media (max-width: 766.98px) {
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
  }
}

// .item {
// margin: 1rem 0;
// width: 400px;
// height: auto;
// display: flex;
// justify-content: center;
// align-items: center;
// @media(max-width:992px){
//   width: 200px;
// }
// }
</style>
