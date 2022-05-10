<template>
  <header class="main-header">
    <b-container>
      <div class="top-nav">
        <div class="lang">
          <button @click="switchLang()" v-if="lang == 'ar'">English</button>
          <button @click="switchLang()" v-if="lang == 'en'">
            اللغة العربية
          </button>
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
        <!-- <ul class="list-unstyled d-flex m-0">
          <li
            v-for="(currency, index) in currencies"
            :key="index"
            class="list-unstyled d-flex"
          >
            <ul class="list-unstyled d-flex">
              <li
                v-for="(curr, index) in currency.currencies"
                :key="index"
                class="d-flex"
              >
                <button
                  @click="handleCurrency(curr.code)"
                  class="bg-transparent border-0 outline-0 text-white mr-2"
                >
                  {{ curr.code }}
                </button>
              </li>
            </ul>
          </li>
        </ul> -->
        <b-dropdown
          :text="$t('payment.chooseCurrency')"
          class="bg-transparent border-0 text-white"
        >
          <b-dropdown-item
            v-for="(currency, index) in myCurrencies"
            :key="index"
            class="list-unstyled d-flex bg-transparent border-0"
          >
            <ul class="list-unstyled d-flex">
              <li class="d-flex">
                <button
                  @click="handleCurrency(currency.code)"
                  class="bg-transparent border-0 bg-transparent border-0"
                >
                  {{ currency.code }}
                </button>
              </li>
            </ul>
          </b-dropdown-item>
        </b-dropdown>
        <!-- <div class="select-currency" @change="handleCurrency($event)">
          <b-form-select
            v-model="currencyValue"
            :options="currencies"
            sm
          >
          </b-form-select>
        </div> -->
      </div>
    </b-container>
  </header>
</template>

<script>
import auth from "@/services/auth";
export default {
  data() {
    return {
      currencyValue: null,
      currencies: [],
      countries: [],
      myCurrencies: null,
      lang: localStorage.getItem("lang") || "en",

      countryImg: JSON.parse(localStorage.getItem("country"))
        ? JSON.parse(localStorage.getItem("country")).flag
        : "https://humhum.work/user-interface/public/assets/flags/KW.png",

      countryName: JSON.parse(localStorage.getItem("country"))
        ? JSON.parse(localStorage.getItem("country")).title
        : this.$t("home.kuwait"),
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
          if (localStorage.getItem("country")) {
            let current_stored_country = JSON.parse(
              localStorage.getItem("country")
            );
            this.countries.forEach((country) => {
              if (country.id == current_stored_country.id) {
                window.localStorage.setItem("country", JSON.stringify(country));
                if (localStorage.getItem("currency") === null) {
                  localStorage.setItem("currency", country.currencies[0].code);
                }
                this.myCurrencies = country.currencies;
              }
            });
          }
          if (localStorage.getItem("is_default") === null) {
            localStorage.setItem("is_default", res.data.items[0].is_default);
          }
          // if (localStorage.getItem("currency") === null) {
          //   localStorage.setItem("currency", res.data.items[0].currencies[0].code);

          // }

          this.currencies = this.countries;
          // console.log(this.currencies);
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
      localStorage.removeItem("currency");
      window.location.reload();
    },
    onHandelCountry(data) {
      // localStorage.setItem("country_id", );
      // console.log(data);
      localStorage.removeItem("currency");
      localStorage.setItem("country", JSON.stringify(data));
      this.countryImg = data.flag;
      this.countryName = data.title;
      localStorage.setItem("country", JSON.stringify(data));
      if (data) {
        if (localStorage.getItem("is_default")) {
          localStorage.setItem("is_default", data.currencies[0].id);
        } else {
          localStorage.setItem("is_default", data.currencies[0].is_default);
        }
      }
      // localStorage.setItem("currency", data.currencies[0].code);

      setTimeout(() => {
        location.reload();
      }, 100);
    },
    handleCurrency(event) {
      localStorage.setItem("currency", event);
      location.reload();
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
.btn-secondary {
  background: transparent !important;
  border: none !important;
}
</style>
