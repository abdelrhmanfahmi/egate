<template>
  <div class="page-wrapper headerCategories sideHomeCategories">
    <nav class="menuCategories" v-if="categories.length && categories">
      <h5 class="text-gray-dark mb-2">Categories</h5>
      <ul class="menu-main">
        <li class="menu-item-has-children" v-for="(category, index) in categories" :key="index">
          <div class="hold-link d-flex justify-space-between align-center">
            <router-link to="/">
              <span title="Men"> {{ $i18n.locale == "en" ? category.name_en : category.name_ar }} </span>
            </router-link>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </div>
          <div
            class="sub-menu mega-menu mega-menu-column-4" v-if="category.childrens && category.childrens.length" >
            <div class="list-item">
              <h4 class="title"> {{ $i18n.locale == "en" ? category.name_en : category.name_ar }} </h4>
              <ul>
                <li v-for="(chid, index) in category.childrens" :key="index">
                  <p> {{ $i18n.locale == "en" ? chid.name_en : chid.name_ar }} </p>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </nav>
    <nav v-else>
      <h5 class="text-gray-dark mb-2">No Categories</h5>
    </nav>
  </div>
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  props: ['categories'],
};
</script>

<style></style>
