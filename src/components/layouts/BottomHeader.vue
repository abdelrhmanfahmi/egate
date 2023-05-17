<template>
  <div class="bottom-nav-holder">
    <div class="container">
      <div class="categories-dropdown d-flex align-items-center">
        <div class="wrapper">
          <div class="data-wrapper d-flex justify0content-center align-items-center btn-group">
            <div class="grid-icon">
              <font-awesome-icon icon="fa-solid fa-table-cells-large" size="xl" class="text-white" />
            </div>
            <!-- <select name="categories" id="categories" @change="selectCategory($event)">
              <option value="" selected disabled>
                {{ $t("profile.categories") }}
              </option>
              <option :value="category.id" v-for="(category, index) in categories" :key="index">
                <router-link :to="`/categories/${category.id}`">
                  {{ category.title }}
                </router-link>
              </option>
            </select> -->
            <b-dropdown id="dropdown-1" variant="link" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <span class="title text-white">{{ $t("profile.categories") }}</span>
                <div class="down-angle">
              <font-awesome-icon icon="fa-solid fa-angle-down" size="xl" />
            </div>
              </template>
              <b-dropdown-item v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">
                <img :src="category.image_path" :alt="category.title" class="category-img" />
                <span class="mx-2">{{ category.title }}</span>
              </b-dropdown-item>
            </b-dropdown>

            
          </div>
        </div>
        <div class="other-catrgories" v-if="!mobile">
          <!-- <ul class="d-flex justify-content-center align-items-center m-0 p-0 mx-4">
            <li class="h5 mx-2 mb-0 text-dark offer-link">
              <router-link to="/" class="text-dark">
                Ramadan offers
              </router-link>
            </li>
            <li class="h5 mx-2 mb-0 text-dark offer-link">
              <router-link to="/" class="text-dark">
                Month Offers
              </router-link>
            </li>
            <li class="h5 mx-2 mb-0 text-dark offer-link">
              <router-link to="/" class="text-dark">
                Day Offers
              </router-link>

            </li>
          </ul> -->
          <div class="middle">
            <navLinks />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import categories from "@/services/categories";
import navLinks from "./navLinks.vue";
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
    selectCategory(category) {
      this.$router.push(
        {
          path: `/categories/${category.id}`,
        },
        () => {
          this.$router.go(0);
        }
      );
      // this.$router.push(
      //   {
      //     path: `/categories/${event.target.value}`,
      //   },
      //   () => {
      //     this.$router.go(0);
      //   }
      // );
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 767) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
  },
  mounted() {
    this.getCategories();
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  data() {
    return {
      categories: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  components: {
    navLinks,
  },
};
</script>

<style lang="scss" scoped>
.bottom-nav-holder {
  background: #e2e2e2;

  .wrapper {
    background-color: $main-color;
    color: #fff;
    display: inline-block;
    padding: 5px 15px;
  }

  select,
  #dropdown-1 {
    padding: 0.7em 2rem;
    border-radius: 0.2em;
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
    position: relative;
    .down-angle{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
    }


  }

  // #categories {
  //   background-color: $main-color;
  //   color: #fff;
  // }
}

.offer-link {
  transition: all 0.5s ease-in-out;

  &:hover {
    background-color: $main-color;
    color: #fff !important;
    padding: 15px;

    a {
      color: #fff !important;
    }
  }
}

.categories-dropdown {
  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.other-catrgories {
  @media (max-width: 992px) {
    margin: 10px;
  }
}

.category-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  // object-fit: contain;
  // margin: 0 10px;
}


</style>
