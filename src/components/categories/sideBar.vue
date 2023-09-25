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

    toggleSlide: function (index) {
      this.toggleStates = this.toggleStates.reduce((acc, cur, id) => {
        if (id == index) return [...acc, !cur];
        else return [...acc, cur];
      }, []);
    }

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
