<template>
  <div class="categories-page">
    <div class="filterText d-none d-lg-block">
      <v-icon icon="mdi-filter-outline"></v-icon> Filters
    </div>
    <div class="sidebar-shop"
      :class="{
        'sidebar-filter': isSidebar == false,
        sidebar: isSidebar == true,
      }"
    >
      <div :class="{ 'sidebar-filter-wrapper': isSidebar }">
        <v-expansion-panels multiple>

          <v-expansion-panel v-for="(category,idx) in categories" :key="idx">
            <v-expansion-panel-title
              :class="{ collapsed: !toggleStates[category.id] }"
              @click.prevent="toggleSlide(category.id)"
              >{{ category.name_en }}</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <div :open="toggleStates[category.id]" class="show" :duration="200">
                <div class="widget-body pt-0">
                  <div class="filter-items filter-items-count">
                    <div
                      class="filter-item"
                      v-for="(subCategory, index) in category.childrens"
                      :key="index"
                    >
                      <a href="javascript:void(0)" @click.prevent="getProductSubCategories($event)" :data-id="subCategory.id">{{ subCategory.name_en }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>

        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
import globalAxios from "@/services/global-axios";
import home from "@/services/home";
import { shopData } from "@/utilities/data";

export default {
  mounted(){
    this.getCategoriesData();
  },
  data: function () {
    return {
      loaded: true,
      priceValues: [0, 1000],
      priceSliderConfig: {
        connect: true,
        step: 50,
        margin: 100,
        range: {
          min: 0,
          max: 1000,
        },
      },
      toggleStates: [true, true, true, true],
      filterData: shopData,
      isSidebar: true,
      categories:[],
      productsSubCategory:[]
    };
  },
  computed: {
    priceRangeText: function () {
      return (
        "$" +
        parseInt(this.priceValues[0]) +
        " — $" +
        parseInt(this.priceValues[1])
      );
    },
    priceFilterRoute: function () {
      let query = {};
      if (this.$route.query.page) {
        for (let key in this.$route.query) {
          if (key !== "page") {
            query[key] = this.$route.query[key];
          }
        }
      } else {
        query = { ...this.$route.query };
      }

      return {
        path: this.$route.path,
        query: {
          ...query,
          minPrice: this.priceValues[0],
          maxPrice: this.priceValues[1],
        },
      };
    },
  },
  created: function () {
    document.querySelector("body").classList.remove("sidebar-filter-active");
    if (this.$route.query.minPrice && this.$route.query.maxPrice) {
      this.loaded = false;
      this.priceValues = [
        this.$route.query.minPrice,
        this.$route.query.maxPrice,
      ];
      this.$nextTick(function () {
        this.loaded = true;
      });
    } else {
      this.loaded = false;
      this.$nextTick(function () {
        this.loaded = true;
      });
    }
  },
  methods: {
    async getCategoriesData(){
      const response = await home.getCategories().then(res => {
        this.categories = res.data.items.data;
      }).catch(err => {
        console.log(err)
      })
    },
    async getProductSubCategories(event){
      let subCategory = event.target.getAttribute('data-id');
      let page = 1;
      let obj = {
        subCategory:subCategory,
        page:page
      };
      this.$emit('updateProducts', obj);
    },
    cleanAll: function () {
      this.loaded = false;
      this.priceValues = [0, 1000];
      this.$nextTick(function () {
        this.orderBy = "default";
        this.loaded = true;
        this.$router.push(this.$route.path);
      });
    },
    toggleSlide: function (index) {
      this.toggleStates = this.toggleStates.reduce((acc, cur, id) => {
        if (id == index) return [...acc, !cur];
        else return [...acc, cur];
      }, []);
      let page = 1;
      let obj = {
        subCategory:index,
        page:page
      };
      this.$emit('updateProducts', obj);
    },
    sizeChecked: function (item) {
      return (
        this.$route.query.size &&
        this.$route.query.size.split(",").includes(item.slug)
      );
    },
    brandChecked: function (item) {
      return (
        this.$route.query.brand &&
        this.$route.query.brand.split(",").includes(item.slug)
      );
    },
    categorySelected: function (item) {
      return (
        this.$route.query.category && this.$route.query.category == item.slug
      );
    },
    colorSelected: function (item) {
      return (
        this.$route.query.color &&
        this.$route.query.color.split(",").includes(item.color_name)
      );
    },
    setSizeFilter: function (item) {
      let query = {};
      if (this.$route.query.page) {
        for (let key in this.$route.query) {
          if (key !== "page") {
            query[key] = this.$route.query[key];
          }
        }
      } else {
        query = { ...this.$route.query };
      }

      if (!this.$route.query.size) {
        query = {
          ...query,
          size: item.slug,
        };
      } else if (this.$route.query.size.split(",").includes(item.slug)) {
        query = {
          ...query,
          size: query.size
            .split(",")
            .filter((slug) => slug !== item.slug)
            .join(","),
        };
      } else {
        query = {
          ...query,
          size: [...query.size.split(","), item.slug].join(","),
        };
      }

      this.$router.push({
        path: this.$route.path,
        query: query,
      });
    },
    setBrandFilter: function (item) {
      let query = {};
      if (this.$route.query.page) {
        for (let key in this.$route.query) {
          if (key !== "page") {
            query[key] = this.$route.query[key];
          }
        }
      } else {
        query = { ...this.$route.query };
      }

      if (!this.$route.query.brand) {
        query = {
          ...query,
          brand: item.slug,
        };
      } else if (this.$route.query.brand.split(",").includes(item.slug)) {
        query = {
          ...query,
          brand: query.brand
            .split(",")
            .filter((slug) => slug !== item.slug)
            .join(","),
        };
      } else {
        query = {
          ...query,
          brand: [...query.brand.split(","), item.slug].join(","),
        };
      }

      this.$router.push({
        path: this.$route.path,
        query: query,
      });
    },
    getColorUrl: function (item) {
      let query = {};

      if (!this.$route.query.color) {
        query = {
          ...this.$route.query,
          color: item.color_name,
        };
      } else if (this.$route.query.color.split(",").includes(item.color_name)) {
        query = {
          ...this.$route.query,
          color: this.$route.query.color
            .split(",")
            .filter((slug) => slug !== item.color_name)
            .join(","),
        };
      } else {
        query = {
          ...this.$route.query,
          color: [...this.$route.query.color.split(","), item.color_name].join(
            ","
          ),
        };
      }

      let temp = {};
      if (query.page) {
        for (let key in query) {
          if (key !== "page") {
            temp[key] = query[key];
          }
        }
      } else {
        temp = { ...query };
      }

      return {
        path: this.$route.path,
        query: temp,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("@/assets/scss/_filtersStyle.scss");
.categories-page {
  width: 92%;
  height: 100%;
  margin: 0 0;
  .filter-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
    .item-count {
      background: $main-color;
      color: #fff;
      padding: 3px;
      border-radius: 3px;
    }
  }
  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  .filterText {
    color: #a3a3a1;
    position: absolute;
    right: -3%;
    top: 50%;
    transform: rotate(90deg) translate(-3%, -50%);
  }
}
.v-expansion-panel{
  padding-top:24px;
}

.sidebar-filter-wrapper{
  width: 115%;
  height: 570px;
  overflow: auto;
  background-color: #fff;
  padding: 20px 20px 10px 10px;
}
</style>
