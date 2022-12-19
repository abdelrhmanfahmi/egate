<template>
    <header class="main-header">
      <!-- component for language and countries  -->
      <b-container>
        <div class="top-nav">
          <div class="lang">
            <button @click="switchLang()" v-if="lang == 'ar'">English</button>
            <button @click="switchLang()" v-if="lang == 'en'">
              اللغة العربية
            </button>
          </div>
          <div class="select-country">
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
      this.getDefaultCaounrt()
    },
    methods: {
      getAllCountires() {
        auth
          .getAllCountires()
          .then((res) => {
            console.log(`countries`, res.data.items)
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
            } else {
              window.localStorage.setItem("country", this.defaultCountry);
              console.log("this.defaultCountry", this.defaultCountry);
              this.countries.forEach((country) => {
                // if (country.is_default == 1) {
                // window.localStorage.setItem("country", JSON.stringify(country));
                if (localStorage.getItem("currency") === null) {
                  // localStorage.setItem("currency", country.currencies[0].code);
                  localStorage.setItem("currency", this.defaultCurrency);
                }
                this.myCurrencies = country.currencies;
              });
              setTimeout(() => {
                location.reload();
              }, 500);
            }
            if (localStorage.getItem("is_default") === null) {
              localStorage.setItem("is_default", res.data.items[0].is_default);
            }
            this.currencies = this.countries;
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
      getDefaultCaounrt() {
        axios.get('https://api.dev.humhum.work/api/v1/site-settings/default/country').then(res => {
          console.log("getDefaultCaounrt", res);
          this.defaultCountry = JSON.stringify(res.data.items)
          this.defaultCurrency = JSON.stringify(res.data.items.currencies ? res.data.items.currencies[0].code : res.data.items.iso)
        })
          .then(() => {
            this.getAllCountires()
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
  /**
    * component style
*/
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
  