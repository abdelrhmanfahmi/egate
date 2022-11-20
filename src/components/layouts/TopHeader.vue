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
        <div class="select-country Allcountries">
          <b-dropdown id="dropdown-1" variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <span class="title">{{ countryName }}</span>
              <img :src="countryImg" :alt="countryName" />
            </template>
            <b-dropdown-item v-for="country in countries" :key="country.id" @click="onHandelCountry(country)">
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
        <!-- <b-dropdown
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
        </b-dropdown> -->
        <div class="select-country">
          <b-dropdown id="dropdown-1" variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <span class="title" id="myCurrency-code">{{
                  currentCurrency
              }}</span>
            </template>
            <b-dropdown-item v-for="(currency, index) in myCurrencies" :key="index"
              @click="handleCurrency(currency.code)">
              <span>{{ currency.code }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
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
import axios from "axios"
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
      defaultCountry: null,
      defaultCurrency: null
      // currentCurrency : localStorage.getItem('currency')
    };
  },
  mounted() {
    this.getAllCountires();
    this.reloadPage();
  },
  // created(){
  //   // console.log("this.countries" ,  this.countries);
  // },
  methods: {
    getAllCountires() {
      auth
        .getAllCountires()
        .then((res) => {
          this.countries = res.data.items;
          localStorage.setItem('countries' ,JSON.stringify(res.data.items) )
          // console.log("res" , res);
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
          } else {
            // console.log("res.data.items" , res.data.items);

            // this.countries.forEach((country) => {
            //   if (country.is_default == 1) {
            //     window.localStorage.setItem("country", JSON.stringify(country));
            //     if (localStorage.getItem("currency") === null) {
            //       localStorage.setItem("currency", country.currencies[0].code);
            //     }
            //     this.myCurrencies = country.currencies;
            //   }
            // });
            this.getDefaultCountry()

            // localStorage.setItem("country", JSON.stringify(res.data.items[0]));
            // localStorage.setItem(
            //   "currency",
            //   res.data.items[0].currencies[0].code
            // );
            // setTimeout(() => {
            //   location.reload();
            // }, 500);
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
        .then(() => {
          let myCurrency = document
            .querySelector("#myCurrency-code")
            .innerText.trim();
          if (myCurrency == "") {
            setTimeout(() => {
              location.reload();
            }, 800);
          }
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
    reloadPage() {
      // if (localStorage.getItem("reloadedCurrency")) {
      //   // The page was just reloaded. Clear the value from local storage
      //   // so that it will reload the next time this page is visited.
      //   localStorage.removeItem("reloadedCurrency");
      // } else {
      //   // Set a flag so that we know not to reload the page twice.
      //   localStorage.setItem("reloadedCurrency", "1");
      //   setTimeout(() => {
      //     location.reload();
      //   }, 700);
      // }
      // this.getAllCountires();
    },
    getDefaultCountry() {
      axios.get('https://api.dev.humhum.work/api/v1/site-settings/default/country').then(res => {
        console.log("getDefaultCountry", res);
        this.defaultCountry = JSON.stringify(res.data.items);
        window.localStorage.setItem("country", JSON.stringify(res.data.items));
        if (localStorage.getItem("currency") === null) {
          localStorage.setItem("currency", res.data.items.currencies[0].code);
        }
        this.defaultCurrency = res.data.items.currencies[0].code
      })
        .catch(err => {
          console.log(err);
        })
    }
  },
  computed: {
    currentCurrency() {
      return localStorage.getItem("currency");
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
