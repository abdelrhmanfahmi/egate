<template>
  <div class="wrapper" :class="$i18n.locale">
    <div class="text-center pt-5">
      <h1 class="mb-0">{{ $t("home.newSearchText") }}</h1>
    </div>
    <div class="container d-flex align-items-center my-4">
      <div class="new-search-design w-100">
        <div class="search-local">
          <div class="iconn bottom-nav-holder">
            <div class="wrapper select-wrapper">
              <div
                class="data-wrapper d-flex justify0content-center align-items-center"
              >
                <div class="grid-icon">
                  <font-awesome-icon
                    icon="fa-solid fa-table-cells-large"
                    size="xl"
                    class="text-dark"
                  />
                </div>
                <select
                  name="categories"
                  id="categories"
                  @change="selectCategory($event)"
                >
                  <option value="" selected disabled>
                    {{ $t("home.All") }}
                  </option>
                  <option
                    :value="category.id"
                    v-for="(category, index) in categories"
                    :key="index"
                  >
                    <router-link :to="`/categories/${category.id}`">
                      {{ category.title }}
                    </router-link>
                  </option>
                </select>

                <div class="down-angle">
                  <font-awesome-icon icon="fa-solid fa-angle-down" size="xl" />
                </div>
              </div>
            </div>
          </div>

          <div class="form-holder w-100 m-0 p-0">
            <b-form
              @submit.prevent="search"
              @keyup="lazySearch()"
              class="w-100 m-0 p-0"
            >
              <b-form-input
                :placeholder="$t('cart.search')"
                class="search-input w-100 m-0 p-0"
                v-model="keyword"
                ref="searchIcon"
              ></b-form-input>
              <!-- <div class="floating-btn" @click="searchBtn" v-if="suggestionsExist == false && keyword.length">
                                <button>
                                    <font-awesome-icon icon="fa-solid fa-arrow-right" />
                                </button>
                            </div> -->
            </b-form>
            <ul class="search-suggestions" v-if="suggestionsExist">
              
              <span class="meaning-span">{{ $t("home.didMean") }}</span>
              <li
                v-for="(suggest, index) in suggestions"
                :key="index"
                role="button"
                @click="searchSuggestion(suggest)"
              >
                {{ suggest }}
              </li>
            </ul>
            <div
              v-else-if="
                !suggestionsExist &&
                searchSubmitted == true &&
                keyword.length &&
                ProductsExist
              "
            >
              <!-- <ul class="search-suggestions noDataReturned">
                <li>
                  <div class="text-center">
                    <h3>
                      <div v-if="!loading">
                        <span>{{ $t("profile.searchNoResult") }}</span>
                        <div class="mt-3">
                          <button
                            class="border-main br-5"
                            @click="searchSubmitted = false"
                          >
                            {{ $t("home.ok") }}
                          </button>
                        </div>
                      </div>
                      <div v-else>
                        <div class="text-center">
                          <b-spinner
                            variant="danger"
                            label="Spinning"
                          ></b-spinner>
                        </div>
                      </div>
                    </h3>
                  </div>
                </li>
              </ul> -->

              <ul class="search-suggestions" v-if="ProductsExist">
                <span class="meaning-span">{{ $t("home.didMean") }}</span>
                <div v-if="loading">
                  <div class="text-center">
                    <b-spinner variant="danger" label="Spinning"></b-spinner>
                  </div>
                </div>
                <li
                  v-for="(product, index) in searchProducts"
                  :key="index"
                  role="button"
                  @click="searchSuggestion(product.product.title)"
                >
                  {{ product.product.title }}
                </li>
              </ul>
            </div>
          </div>

          <b-button class="icon-search" size="md" @click="searchBtn">
            {{ $t("cart.search") }}
          </b-button>
        </div>

        <!-- icons -->
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
    selectCategory(event) {
      // this.$router.push(
      //   {
      //     path: `/categories/${event.target.value}`,
      //   },
      //   () => {
      //     this.$router.go(0);
      //   }
      // );
      this.CatId = event.target.value;
      console.log("this", this.CatId);
    },
    /**
     * @vuese
     * search function
     */
    search() {
      // this.$router.push({
      //   path: "/SearchResults",
      //   query: { keyword: this.keyword },
      // });
      // setTimeout(() => {
      //   location.reload()
      // }, 1200);
      this.loading = true;
      let data = {
        keyword: this.keyword,
        category_id: this.CatId,
      };
      categories
        .searchResult(data)
        .then((resp) => {
          if (
            resp.data.items.suggestions &&
            resp.data.items.suggestions.length
          ) {
            this.suggestionsExist = true;
            this.suggestions = resp.data.items.suggestions;
          } else {
            this.suggestionsExist = false;
          }
          if (
            !resp.data.items.suggestions &&
            resp.data.items.products &&
            resp.data.items.products.length
          ) {
            this.suggestionsExist = false;
            this.ProductsExist = true;
            this.searchProducts = resp.data.items.products;
          }
          if(!resp.data.items.products || !resp.data.items.products.length){
            this.ProductsExist = false;
          
          }
          if(!resp.data.items.suggestions &&
            !resp.data.items.products ){
            this.searchSubmitted = false
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });

      // let r = this.$router.resolve({
      //   name: "SearchResults", // put your route information in
      //   query: { keyword: this.keyword }, // put your route information in
      // });
      // window.location.assign(r.href);
    },
    lazySearch() {
      this.loading = true
      setTimeout(() => {
        this.search();
        this.searchSubmitted = true;
      }, 800);
      setTimeout(() => {
        this.loading = false
      }, 820);
    },
    searchSuggestion(word) {
      let r = this.$router.resolve({
        name: "SearchResults", // put your route information in
        query: { keyword: word, catId: this.CatId }, // put your route information in
      });
      window.location.assign(r.href);
    },
    searchBtn() {
      if (this.keyword.length > 1) {
        let r = this.$router.resolve({
          name: "SearchResults", // put your route information in
          query: { keyword: this.keyword, catId: this.CatId }, // put your route information in
        });
        window.location.assign(r.href);
      }
    },
    /**
     * @vuese
     * close search function
     */
    closeSearch() {
      this.searchClicked = false;
      this.keyword = "";
    },
  },
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      categories: null,

      keyword: "",
      searchClicked: false,
      suggestionsExist: false,
      searchSubmitted: false,
      loading: false,
      CatId: null,
      ProductsExist: false,
      searchProducts:null
    };
  },
};
</script>

<style lang="scss" scoped>
/* SEARCH BAR CONTAINER */
.search-local {
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  column-gap: 2rem;
  // padding-left: 2rem;
  background: #fff;
  border-radius: 5px;
  min-height: 4rem;
  height: auto;
  border: 0.1rem solid $gray;
  // border-right: none;
}

/* ICON */
.icon {
  color: $main-color;
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon:hover {
  animation: funny-icon 0.4s ease-in-out;
}

@keyframes funny-icon {
  0% {
    scale: 1;
  }

  50% {
    scale: 0.8;
    transform-origin: bottom;
    transform: rotate(-15deg);
  }

  100% {
    scale: 1;
  }
}

/* INPUT */
.search-local input {
  height: 100%;
  width: 100%;
  flex: 1 1 25rem;
  background: #fff;
  display: flex;
  outline: none;
  border: none;
  color: #000;
  font-size: 1rem;
  @media (max-width: 992px) {
    height: 40px;
  }
}

input::placeholder {
  color: #000;
  font-size: 20px;
}

/* BUTTON */
.search-local button {
  background: $main-color;
  border: none;
  border-radius: 0 5px 5px 0;
  font-weight: 500;
  font-size: 1rem;
  height: 4rem;
  width: 10rem;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  color: #fff;
}

button a {
  color: #fff;
}

.search-local button .search-icon {
  display: none;
}

// .search-local button:hover {
//     letter-spacing: 0.5rem;
// }

/* MEDIAS */
@media (max-width: 575px) {
  .search-local {
    padding-left: 0;
    column-gap: 0.25rem;
  }

  .search-local button {
    width: 10rem;
  }

  button a {
    display: none;
  }

  .search-local button .search-icon {
    display: block;
    margin-inline: auto;
    color: #fff;
    font-size: 3rem;
  }

  input[type="text"]::placeholder {
    font-size: 1.4rem;
  }
}

// other design

.bottom-nav-holder {
  background: transparent;
  color: #000;
  border-radius: 20px;
  //@media (max-width: 992px) {
  //display: none;
  //}

  .wrapper {
    background-color: transparent;
    color: #000;
    display: inline-block;
    padding: 5px 15px;
    // border-radius: 20px;
  }

  select {
    padding: 0.7em 2rem;
    border-radius: 0.2em;
    border: none;
    color: #000;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    background: none;
    font-size: 16px;
  }
}

.en {
  .select-wrapper {
    border-right: 1.5px solid $gray;
  }
}

.ar {
  .select-wrapper {
    border-left: 1.5px solid $gray;
  }
}

// input:focus,
// input:active {
//     .search-local {
//         border-color: $main-color !important;
//         border-width: 2px !important;
//     }
// }
@media (max-width: 992px) {
  .search-local input {
    flex: 1 1 6rem;
    text-align: center;
    border-bottom: 1px solid $gray;
    margin: 20px 0;
    height: 50px;
  }

  .search-local {
    flex-direction: column;
  }

  .select-wrapper {
    border: none !important;
  }

  .search-local button {
    border-radius: 0;
  }
}

.form-holder {
  position: relative;

  .search-suggestions {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 300px;
    overflow: scroll;
    background: #fff;
    box-shadow: 0px 12px 24px 0px rgb(120 120 120 / 30%);
    padding: 15px;
    z-index: 99;
    top: 30px;

    li {
      border-bottom: 1px solid #ccc;
    }
  }

  .meaning-span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
  }
}

input:focus,
input:active {
  box-shadow: none;
  outline: none;
  border: none;
}

.noDataReturned {
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    border: none;
    border-bottom: none !important;
  }
}
</style>
