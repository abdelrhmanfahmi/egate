<template>
  <!-- sub category page  -->
  <div class="subCategory" :class="$i18n.locale">
    <!-- <div
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
              </ol>
            </nav>
          </div>
        </b-container>
      </div>
    </div> -->
    <div class="navigation d-none d-lg-flex justify-content-start align-items-center">
      <!-- navigation -->
      <nav aria-label="breadcrumb ">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">
              {{ $t("items.home") }}
            </router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="`/categories/${categoryId}`"> {{ categoryTitle }} </router-link>
          </li>
          <!-- <li class="breadcrumb-item">
            <a  class="main-color"> {{ $t('items.subCategory') }} </a>
          </li> -->
        </ol>
      </nav>
    </div>
    <!-- <newCover /> -->
    <NewHomeSlider />
    <div class="data-holder">
      <div class="container">
        <div class="row">
          <div class="col-md-9 col-sm-12 mb-3">
            <div class="container" id="people">
              <div class="row">
                <div class="col-sm-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container">
        <div class="tabs-holder">
          <!-- <VueSlickCarousel :arrows="true" v-bind="settings" v-if="5 > 2">
            <div class="tabs-holder">
              <div class="tabs-content">test</div>
            </div>
          </VueSlickCarousel> -->
          <div class="tabs-content">
            <b-tabs>
              <!-- first tab that contain all sub-categories  -->
              <b-tab
                :title="$t('home.All')"
                @click="selectDefaultTab"
                id="All"
                v-bind="{
                  active: !$route.query.brand || $route.query.brand == 'All',
                }"
              >
                <template #title>
                  <div
                    class="d-flex justify-content-center align-items-center flex-column"
                    v-b-tooltip.hover
                    :title="$t('home.All')"
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-table-cells-large"
                      size="xl"
                      class="text-white"
                    />
                    <strong>{{ $t("home.All") }}</strong>
                  </div>
                </template>
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
              <!-- second tab that contain classified sub-categories  -->
              <b-tab
                :title="category.title"
                v-for="(category, index) in subCategories"
                :key="index"
                @click="selectTab(category)"
                :id="`category-${index}`"
                v-bind="{
                  active: $route.query.brand == category.title.replace(/\s/g, ''),
                }"
              >
                <template #title>
                  <div
                    class="d-flex justify-content-between align-items-center flex-column"
                    v-b-tooltip.hover
                    :title="category.title"
                  >
                    <!-- section icon  -->
                    <img :src="category.icon_image_path" alt="category_image" class="categoryImage">
                    <strong>{{ category.title.slice(0, 5) + "..." }}</strong>
                  </div>
                </template>
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
// import newCover from "@/components/pages/categories/categoriesCover.vue";

// import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import NewHomeSlider from "@/components/pages/home/NewHomeSlider.vue"

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
      settings: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        arrows: true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      categoryTitle:null,
      categoryId:null
    };
  },
  computed: {
    /**
     * @vuese
     * filterProductsByCategory function
     */
    filterProductsByCategory: function () {
      return this.products.filter((product) => !product.category.iOf(this.category));
    },
  },
  components: {
    OtherCategoryCard,
    // VueSlickCarousel,
    // newCover,
    NewHomeSlider
  },
  methods: {
    /**
     * @vuese
     * get SubCategories function
     */
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
    /**
     * @vuese
     * get All SubCategories function
     */
    async getAllSubCategories() {
      await categories
        .getAllSubCategories(this.id)
        .then((resp) => {
          
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
    /**
     * @vuese
     * get page Cover function
     */
    getCover() {
      categories.getSingleProductDetails(this.id).then((res) => {
        this.categoryTitle = res.data.items.title
        this.categoryId = res.data.items.id
        this.pageCover = res.data.items.image_path;
        this.pageTitle = res.data.items.title;
        sessionStorage.setItem('parentTitle' ,res.data.items.title )
      });
    },
    /**
     * @vuese
     * search function to get sub-categories
     */
    search() {
      this.getSubCategories();
    },
    /**
     * @vueses
     * selectTab function
     */
    selectTab(item) {
      var tabsHeight = document.querySelector(".nav-item").offsetTop - 320;
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
        this.$route.query.brand.split(",").includes(item.title.replace(/\s/g, ""))
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

      setTimeout(() => {
        window.scrollTo({
          top: tabsHeight,
          left: 0,
          behavior: "smooth",
        });
      }, 1500);
    },

    /**
     * @vuese
     * set default tab  function
     */
    selectDefaultTab() {
      var tabsHeight = document.querySelector(".nav-item").offsetTop - 320;
      let query = {};
      if (this.$route.query.page) {
        for (let key in this.$route.query) {
          if (key !== "page") {
            query[key] = this.$route.query[key];
          }
        }
      } else {
        query = {
          brand: "All",
        };
      }

      if (!this.$route.query.brand) {
        query = {
          brand: "All",
        };
        console.log("third");
      } else if (this.$route.query.brand.split(",").includes(this.$route.query.brand)) {
        query = {
          brand: query.brand,
        };
      } else {
        query = {
          brand: "All",
        };
      }

      this.$router.push({
        path: this.$route.path,
        query: query,
      });

      setTimeout(() => {
        window.scrollTo({
          top: tabsHeight,
          left: 0,
          behavior: "smooth",
        });
      }, 1500);
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
.navigation {
  background-color: #f3f4f6;
}

.categoryImage{
  width: 40px;
  height: 40px;
}
</style>
