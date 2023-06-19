<template>
  <div :class="$i18n.locale">
    <div class="searchBar-holder">
      <div id="search-box">
        <div class="wrapper">
          <v-form class="search">
            <v-text-field
              single-line
              hide-details
              label="Search By Product Name"
              density="compact"
              prepend-inner-icon="mdi-magnify"
              type="text"
              class="searchText"
              placeholder="Search By Product Name"
            ></v-text-field>

            <select
              class="selectData form-select"
              aria-label="Default select example"
            >
              <option :value="null">
                All Categories
                <span>
                  <v-icon icon="mdi-chevron-down"></v-icon>
                </span>
              </option>
              <option
                :value="category.name"
                v-for="(category, index) in categories"
                :key="index"
              >
                {{ category.name }}
              </option>
            </select>
            <!-- <div class="icon-holder">
              <v-icon icon="mdi-chevron-down"></v-icon>
            </div> -->
            <button class="searchButton">
              <v-icon icon="mdi-magnify"></v-icon>
            </button>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
};
</script>

<style lang="scss" scoped>
.searchBar-holder {
  .selectData {
    cursor: pointer;
    text-transform: capitalize;
    //text-align: center;
    //width: 30%;
    color: $header-back;
    &:hover,
    &:active,
    &:focus,
    &:focus-visible {
      background: transparent !important;
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
    //position: relative;
    padding: 0 5px;

    @media (max-width: 767px) {
      margin: 20px 0;
    }
  }
  .icon-holder {
    position: absolute;
    right: 8%;
    bottom: 0;
    top: 0;
    color: #000;
    /* background: red; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search {
    border: 2px solid $second-color;
    border-radius: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    color: $header-back;
    @media (max-width: 767px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  input {
    padding: 0px;
    font-size: 18px;
    background: white;
    // border-right: 2px solid $second-color;
    padding: 10px;
  }

  .searchText {
    text-indent: 5px;
    border-radius: 5px 0 0 5px;
    width: 70%;
    @media(max-width:499.98px){
      width: 100%;
    }
    @media (min-width:500px) and (max-width:766.98px){
      width: 60%;
    }
    @media (min-width:767px) and (max-width:992px){
      width: 50%;
    }
  }

  .searchButton {
    color: white;
    background-color: $second-color;
    cursor: pointer;
    width: 8%;
    padding: 8px 0px;
    @media (max-width: 767px) {
      width: auto;
      padding: 8px;
      width: 100%;
      margin: auto;
    }
  }
}
</style>
