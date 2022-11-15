<template>
  <div class="subCategory" :class="$i18n.locale">
    <div
      class="cover text-center"
      :style="{ backgroundImage: `url(${pageCover})` }"
    >
      <div
        class="cover-data p-5 d-flex justify-content-center align-items-center flex-column"
      >
        <b-container>
          <div class="cover-title text-white font-weight-bold">
            <h2 class="font-weight-bold">
              {{ pageTitle }}
            </h2>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item text-white">
                  <router-link to="/" class="text-white font-weight-bold">
                    {{ $t("items.home") }}
                  </router-link>
                </li>
                <!-- <li class="breadcrumb-item active">
                  {{ $t("Library") }}
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{ $t("Data") }}
                </li> -->
              </ol>
            </nav>
          </div>
        </b-container>
      </div>
    </div>
    <div class="data-holder">
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
                <!-- <select name="" id="" labeel="select">
                  <option value="AccessoriesA">AccessoriesA</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Stationary">Stationary</option>
                </select> -->
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
          <!-- <div class="col-md-3 col-sm-12 mb-3">
            <form class="xt-blog-form" role="search">
              <div class="input-group add-on">
                <form @submit.prevent="search">
                  <div class="form-group">
                    <input
                      class="form-control"
                      name="srch-term"
                      id="srch-term"
                      type="text"
                      v-model="searchWord"
                    />
                    <div class="input-group-btn">
                      <button
                        class="btn btn-default"
                        type="submit"
                        @clicks="search"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-magnifying-glass"
                        />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </form>
          </div> -->
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="tabs-holder">
          <div class="tabs-content">
            <b-tabs>
              <b-tab
                :title="$t('home.All')"
                @click="selectDefaultTab"
                id="All"
                v-bind="{
                  active: !$route.query.brand || $route.query.brand == 'All',
                }"
              >
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
                <b-row
                  align-h="center"
                  align-v="center"
                  v-else-if="!loading && allSubCategoriesLength > 0"
                >
                  <b-col
                    lg="3"
                    sm="6"
                    class="custum-padding mb-3 p-0"
                    :title="category.title"
                    v-for="category in allSubCategories"
                    :key="category.id"
                  >
                    <div class="mb-4">
                      <router-link
                        :to="`/categories/${category.id}/variants`"
                        v-if="category.id"
                      >
                        <OtherCategoryCard
                          v-if="category"
                          :card="{ type: category.title }"
                          :image="category.image_path"
                        />
                      </router-link>
                    </div>
                  </b-col>
                </b-row>
                <div class="" v-else-if="!loading && allChildrenLength <= 0">
                  <h3 class="my-2">
                    {{ $t("home.noDataTill") }}
                  </h3>
                </div>
              </b-tab>
              <b-tab
                :title="category.title"
                v-for="(category , index) in subCategories"
                :key="index"
                @click="selectTab(category)"
                :id="`category-${index}`"
                v-bind="{
                  active:
                    $route.query.brand == category.title.replace(/\s/g, ''),
                }"
              >
                <b-row
                  align-h="center"
                  align-v="center"
                  v-if="category.all_children.length > 0"
                >
                  <b-col
                    lg="3"
                    sm="6"
                    class="custum-padding mb-3 p-0"
                    v-for="cat in category.all_children"
                    :key="cat.id"
                  >
                    <router-link :to="`/categories/${cat.id}/variants`">
                      <OtherCategoryCard
                        :card="{ type: cat.title }"
                        :image="cat.image_path"
                        class="homecategories"
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
import OtherCategoryCard from "@/components/global/OtherCategoryCard.vue";
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
      allChildrenLength: null,
      pageCover: null,
      pageTitle: null,
      searchWord: null,
      allSubCategories: null,
      allSubCategoriesLength: null,
      myActiveAtt: "All",
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
    OtherCategoryCard,
  },
  methods: {
    filterAllChildren() {},
    async getSubCategories() {
      let data = {
        parent_id: this.id,
        keyword: this.searchWord,
      };
      await categories
        .getSubCategories(data)
        .then((resp) => {
          this.subCategories = resp.data.items;
          this.allChildrenLength = resp.data.items.length;
          for (let i = 0; i < this.subCategories.length; i++) {
            // const element = array[i];
            // this.allChildrenData = this.subCategories[i].all_children;

            for (
              let index = 0;
              index < this.subCategories[i].all_children.length;
              index++
            ) {
              this.allChildrenData = this.subCategories[i].all_children;

              // console.log("element", this.allChildrenData);

              // console.log(
              //   "inside index",
              //   // this.allChildrenData[index]
              //   this.allChildrenData
              // );
            }

            // console.log("outside index", resp.data.items[i].all_children);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async getAllSubCategories() {
      await categories
        .getAllSubCategories(this.id)
        .then((resp) => {
          console.log("all res", resp);
          this.allSubCategories = resp.data.items;
          this.allSubCategoriesLength = resp.data.items.length;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getCover() {
      categories.getSingleProductDetails(this.id).then((res) => {
        // this.pageCover = res.data.items.cover_image_path;
        this.pageCover = res.data.items.image_path;
        this.pageTitle = res.data.items.title;
      });
    },
    search() {
      this.getSubCategories();
    },
    selectTab(item) {
      let query = {};
      if (this.$route.query.brand) {
        for (let key in this.$route.query) {
          if (key !== "brand") {
            query[key] = this.$route.query[key];
          }
        }
      } else {
        query = {
          brand: item.title.trim().replace(/\s/g, ""),
        };
      }

      if (!this.$route.query.brand) {
        query = {
          brand: item.title.trim().replace(/\s/g, ""),
        };
        console.log("third");
      } else if (
        this.$route.query.brand
          .split(",")
          .includes(item.title.replace(/\s/g, ""))
      ) {
        query = {
          brand: query.brand,
        };
      } else {
        query = {
          brand: item.title.trim().replace(/\s/g, ""),
        };
      }

      this.$router.push({
        path: this.$route.path,
        query: query,
      });
    },
    selectDefaultTab() {
      let query = {};
      if (this.$route.query.page) {
        for (let key in this.$route.query) {
          if (key !== "page") {
            query[key] = this.$route.query[key];
          }
        }
      } else {
        query = {
          brand: 'All'
        };
      }

      if (!this.$route.query.brand) {
        query = {
          brand: 'All'
        };
        console.log("third");
      } else if (
        this.$route.query.brand
          .split(",")
          .includes(this.$route.query.brand)
      ) {
        query = {
          brand: query.brand,
        };
      } else {
        query = {
          brand: 'All'
        };
      }

      this.$router.push({
        path: this.$route.path,
        query: query,
      });
    },
  },
  created() {
    this.getAllSubCategories();
    this.getSubCategories();
    this.getCover();
    sessionStorage.setItem("catId", this.id);
  },
  mounted() {

    if (this.$route.query.brand) {
      this.myActiveAtt = this.$route.query.brand;
    } else {
      this.myActiveAtt = "All";
    }
  },
};
</script>

<style lang="scss" scoped>
.cover {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.cover-data {
  background: rgba(0, 0, 0, 0.35);
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

  .input-group {
    display: block !important;
  }

  .input-group-btn {
    position: absolute;
    right: 5%;
    top: -12%;
    bottom: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

input {
  &:hover,
  &:focus {
    box-shadow: none;
  }
}

div:empty {
  display: none !important;
  opacity: 0;
}

.custum-padding {
  .category-card {
    margin-right: 7px;
  }
}

.ar {
  form {
    .input-group-btn {
      left: 10px !important;
      right: auto;
      top: 0px;
    }
  }
}

.en {
  form {
    .input-group-btn {
      right: 10px !important;
      left: auto;
      top: 0px;
    }
  }
}
</style>
