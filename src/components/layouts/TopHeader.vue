<template>
  <header class="main-header">
    <b-container>
      <div class="top-nav">
        <div class="lang">
          <button @click="switchLang()" v-if="lang == 'ar'">English</button>
          <button @click="switchLang()" v-if="lang == 'en'">العربية</button>
        </div>
        <div class="select-country">
          <b-dropdown
            id="dropdown-1"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content>
              <span class="title">{{ countryName }}</span>
              <img :src="countryImg" :alt="countryName" />
            </template>
            <b-dropdown-item
              v-for="country in countries"
              :key="country.id"
              @click="onHandelCountry(country)"
            >
              <span>{{ country.title }}</span>
              <img :src="country.flag" :alt="country.title" />
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="select-currency">
          <b-form-select
            v-model="currencyValue"
            :options="currencies"
            sm
          ></b-form-select>
        </div>
      </div>
    </b-container>
  </header>
</template>

<script>
import auth from "@/services/auth";
export default {
  data() {
    return {
      currencyValue: "الدينار الكويتي",
      currencies: [
        { value: "الدينار الكويتي", text: "الدينار الكويتي" },
        { value: "جنية مصري", text: "جنية مصري" },
      ],
      countries: [],
      lang: localStorage.getItem("lang") || "en",
      countryImg:
        "https://humhum.work/user-interface/public/assets/flags/KW.png",
      countryName:this.$t("home.kuwait"),
    };
  },
  mounted() {
    this.getAllCountires();
  },
  methods: {
    getAllCountires() {
      auth
        .getAllCountires()
        .then((res) => {
          this.countries = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    switchLang() {
      if (this.lang === "en") {
        this.lang = "ar";
      } else {
        this.lang = "en";
      }
      localStorage.setItem("lang", this.lang);
      window.location.reload();
    },
    onHandelCountry(data) {
      this.countryImg = data.flag;
      this.countryName = data.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-header {
  background: #202026;
  .top-nav {
    padding: 8px 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .lang {
      button {
        background: transparent;
        color: #fff;
        border: none;
        text-transform: capitalize;
        font-size: 16px;
      }
    }
  }
}
</style>
