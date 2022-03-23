<template>
  <div class="subCategory">
    <div class="cover text-center">
      <div

        :style="{backgroundImage:'url(https://vuejs.org/images/logo.png)'}"
        class="cover-data p-5 d-flex justify-content-center align-items-center flex-column"
      >
        <b-container>
          <div class="cover-title">
            <h2>cover title</h2>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/">
                    {{ $t("Home") }}
                  </router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/liberary">
                    {{ $t("Library") }}
                  </router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{ $t("Data") }}
                </li>
              </ol>
            </nav>
          </div>
        </b-container>
      </div>
    </div>
    <div class="data-holder py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-9 col-sm-12 mb-3">
            <div class="container" id="people">
              <div class="row">
                <div class="col-sm-4">
                  <!-- <b-form-select
                    v-model="category"
                    class="mb-3"
                    title="Please select an option"
                  >
                    <b-form-select-option-group label="Please select an option">
                      <b-form-select-option value="Accessories"
                        >AccessoriesA</b-form-select-option
                      >
                      <b-form-select-option value="Laptop"
                        >Laptop</b-form-select-option
                      >
                      <b-form-select-option value="Stationary"
                        >Stationary</b-form-select-option
                      >
                    </b-form-select-option-group>
                  </b-form-select> -->
                </div>
                <!-- <select name="" id="" v-model="category" labeel="select"> -->
                <select name="" id="" labeel="select">
                  <option value="AccessoriesA">AccessoriesA</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Stationary">Stationary</option>
                </select>
              </div>
              <!-- <ul>
                <li
                  v-for="product in filterProductsByCategory"
                  :key="product.id"
                >
                  Product Name : {{ product.name }} - Price :
                  {{ product.price }} ({{ product.category }})
                </li>
              </ul> -->
            </div>
          </div>
          <div class="col-md-3 col-sm-12 mb-3">
            <form class="xt-blog-form" role="search">
              <div class="input-group add-on">
                <input
                  class="form-control"
                  name="srch-term"
                  id="srch-term"
                  type="text"
                />
                <div class="input-group-btn">
                  <button class="btn btn-default" type="submit">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="tabs-holder">
          <div class="tabs-content">
            <b-tabs>
              <b-tab :title="$t('All')">
                <b-row v-if="loading">
                  <b-col class="mb-2" lg="3" sm="6" v-for="x in 10" :key="x">
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
                  <b-col
                    :title="category.title"
                    v-for="category in allChildrenData"
                    :key="category.id"
                    lg="3"
                    sm="6"
                    class="custum-padding mb-2"
                  >
                    <router-link
                      :to="`/categories/${category.id}/variants`"
                      v-if="category.id"
                    >
                      <CategoryCard
                        v-if="category"
                        :card="{ type: category.title }"
                        :image="category.image_path"
                      />
                    </router-link>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab
                :title="category.title"
                v-for="category in subCategories"
                :key="category.id"
              >
                <b-row v-if="category.all_children.length > 0">
                  <b-col
                    lg="3"
                    sm="6"
                    class="custum-padding mb-2"
                    v-for="cat in category.all_children"
                    :key="cat.id"
                  >
                    <router-link :to="`/categories/${cat.id}/variants`">
                      <CategoryCard
                        :card="{ type: cat.title }"
                        :image="cat.image_path"
                      />
                    </router-link>
                  </b-col>
                </b-row>
                <div class="" v-else>
                  <h3 class="my-2">
                    {{ $t("home.noData") }} {{ category.title }}
                    {{ $t("home.tilNow") }}
                  </h3>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCard from "@/components/global/CategoryCard.vue";
import categories from "@/services/categories";
export default {
  data() {
    return {
      id: this.$route.params.slug,
      category: "",
      products: [
        { name: "Keyboard", price: 44, category: "Accessories" },
        { name: "Mouse", price: 20, category: "Accessories" },
        { name: "Monitor", price: 399, category: "Accessories" },
        { name: "Dell XPS", price: 599, category: "Laptop" },
        { name: "MacBook Pro", price: 899, category: "Laptop" },
        { name: "Pencil Box", price: 6, category: "Stationary" },
        { name: "Pen", price: 2, category: "Stationary" },
        { name: "USB Cable", price: 7, category: "Accessories" },
        { name: "Eraser", price: 2, category: "Stationary" },
        { name: "Highlighter", price: 5, category: "Stationary" },
      ],
      loading: true,
      subCategories: null,
      allChildren: null,
      allChildrenData: null,
    };
  },
  computed: {
    filterProductsByCategory: function () {
      return this.products.filter(
        (product) => !product.category.iOf(this.category)
      );
    },
  },
  components: {
    CategoryCard,
  },
  methods: {
    filterAllChildren() {},
    async getSubCategories() {
      await categories
        .getSubCategories(this.id)
        .then((resp) => {
          this.subCategories = resp.data.items;
          for (let i = 0; i < this.subCategories.length; i++) {
            // const element = array[i];
            this.allChildrenData = this.subCategories[i].all_children;
          }
          console.log("subCategories", resp);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.getSubCategories();
  },
};
</script>

<style lang="scss" scoped>
.cover-data {
  background-repeat: no-repeat;
  background-position: center;
}
select {
  border: none;
  outline: none;
  box-shadow: none;
}
form {
  .xt-blog-form {
    margin-top: 50px;
  }
  .input-group-btn {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #ccc;
    }
  }
}
input {
  &:hover,
  &:focus {
    box-shadow: none;
  }
}
</style>
