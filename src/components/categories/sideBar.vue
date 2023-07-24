<template>
  <div class="categories-page">
    <div class="filterText d-none d-lg-block">
      <v-icon icon="mdi-filter-outline"></v-icon> Filters
    </div>
    <div
      class="sidebar-shop"
      :class="{
        'sidebar-filter': isSidebar == false,
        sidebar: isSidebar == true,
      }"
    >
      <div :class="{ 'sidebar-filter-wrapper': isSidebar }">
        <!-- clear all  -->
        <!-- <div class="widget widget-clean">
          <label>Filters:</label>
          <a href="#" class="sidebar-filter-clear" @click.prevent="cleanAll"
            >Clean All</a
          >
        </div> -->

        <!-- categories  -->
        <v-expansion-panels multiple>
          <v-expansion-panel>
            <v-expansion-panel-title
              :class="{ collapsed: !toggleStates[0] }"
              @click.prevent="toggleSlide(0)"
              >categories</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <div :open="toggleStates[0]" class="show" :duration="200">
                <div class="widget-body pt-0">
                  <div class="filter-items filter-items-count">
                    <div
                      class="filter-item"
                      v-for="(category, index) in filterData.categories"
                      :key="index"
                    >
                      <router-link
                        :to="{
                          path: $route.path,
                          query: { category: category.slug },
                        }"
                        :class="{ active: categorySelected(category) }"
                        >{{ category.name }}</router-link
                      >
                      <span class="item-count">{{ category.count }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <!-- size -->
          <v-expansion-panel>
            <v-expansion-panel-title
              :class="{ collapsed: !toggleStates[1] }"
              @click.prevent="toggleSlide(1)"
              >size</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <div :open="toggleStates[1]" class="show" :duration="200">
                <div class="widget-body pt-0">
                  <div class="filter-items">
                    <div
                      class="filter-item"
                      v-for="(item, index) in filterData.sizes"
                      :key="index"
                    >
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          :id="'size-' + index"
                          @click="setSizeFilter(item)"
                          :checked="sizeChecked(item) == true"
                        />
                        <label
                          class="custom-control-label"
                          :for="'size-' + index"
                          >{{ item.slug }}</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <!-- color -->
          <v-expansion-panel>
            <v-expansion-panel-title
              :class="{ collapsed: !toggleStates[2] }"
              @click.prevent="toggleSlide(2)"
              >color</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <div :open="toggleStates[2]" class="show" :duration="200">
                <div class="widget-body pt-0">
                  <div class="filter-colors">
                    <router-link
                      :to="getColorUrl(item)"
                      :style="{ 'background-color': item.color }"
                      v-for="(item, index) in filterData.colors"
                      :key="index"
                      :class="{ selected: colorSelected(item) }"
                    >
                      <span class="sr-only">{{ item.color_name }}</span>
                    </router-link>
                  </div>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <!-- brand  -->
          <v-expansion-panel>
            <v-expansion-panel-title
              :class="{ collapsed: !toggleStates[3] }"
              @click.prevent="toggleSlide(3)"
              >brand</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <div :open="toggleStates[3]" class="show" :duration="200">
                <div class="widget-body pt-0">
                  <div class="filter-items">
                    <div
                      class="filter-item"
                      v-for="(item, index) in filterData.brands"
                      :key="index"
                    >
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          :id="'brand-' + index"
                          @click="setBrandFilter(item)"
                          :checked="brandChecked(item) == true"
                        />
                        <label
                          class="custom-control-label"
                          :for="'brand-' + index"
                          >{{ item.brand }}</label
                        >
                      </div>
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
import { shopData } from "@/utilities/data";

export default {
  // props: {
  //   isSidebar: {
  //     type: Boolean,
  //     default: true,
  //   },
  // },
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
  // position: relative;
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
  //padding: 14px 0;
  //overflow-y: scroll;
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
    // position: absolute;
    // right: -34%;
    // top: 50%;
    // transform: translate(-34%, -50%) rotate(90deg);

    // color: #9C9A8A;
    color: #a3a3a1;
    position: absolute;
    right: -3%;
    top: 50%;
    transform: rotate(90deg) translate(-3%, -50%);
  }
}
</style>
