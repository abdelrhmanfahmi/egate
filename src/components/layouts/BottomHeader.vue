<template>
  <div class="bottom-nav-holder">
    <div class="container">
      <div class="categories-dropdown">
        <div class="wrapper">
          <div class="data-wrapper d-flex justify0content-center align-items-center">
            <div class="grid-icon">
              <font-awesome-icon icon="fa-solid fa-table-cells-large" size="xl" class="text-white" />
            </div>
            <select name="categories" id="categories">
              <option value="" selected disabled>Categories</option>
              <option :value="category.id" v-for="(category , index) in categories"
          :key="index">{{ category.title }}</option>
            </select>
            <div class="down-angle">
              <font-awesome-icon icon="fa-solid fa-angle-down" size="xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import categories from "@/services/categories";
export default {
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
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted(){
    this.getCategories()
  },
  data(){
    return {
      categories:null
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-nav-holder {
  background: #E2E2E2;

  .wrapper {
    background-color: $main-color;
    color: #fff;
    display: inline-block;
    padding: 5px 15px;
  }

  select {
    padding: 0.7em 2rem;
    border-radius: .2em;
    border: none;
    color: #fff;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;

    // background: url('https://cdn1.iconfinder.com/data/icons/arrows-vol-1-4/24/dropdown_arrow-512.png');
    // background-repeat: no-repeat;
    // background-size: 15px 15px;
    // background-position: 97% 50%;
    // background-origin: content-box;
    background: none;
    font-size: 16px;
  }

  // #categories {
  //   background-color: $main-color;
  //   color: #fff;
  // }

}
</style>