<template>
  <!-- component for language and countries  -->

  <header class="main-header" :class="$i18n.locale">
    <div>
      <div class="top-nav">
        
        <div class="block-div bg-white d-flex justify-content-center align-items-center">
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
          <div class="select-country">
            <b-dropdown id="dropdown-1" variant="link" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <span class="title" id="myCurrency-code">{{
                  currentCurrency
                }}</span>
              </template>
              <b-dropdown-item v-for="(currency, index) in myCurrencies" :key="index" @click="handleCurrency(currency)">
                <span>{{ currency.code }}</span>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <div class="lang" v-if="arabicAvailable !== 'no' && arabicAvilability == true">
          <button @click="switchLang()" v-if="lang == 'ar'" id="enLang" ref="enLang">English</button>
          <button @click="switchLang()" v-if="lang == 'en'" id="arLang" ref="arLang">
            عربى
          </button>
           <!-- اللغة العربية -->
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// component for language and countries 
import auth from "@/services/auth";
import axios from "axios";
export default {
  data() {
    return {
      currencyValue: null,
      currencies: [],
      countries: [],
      myCurrencies: JSON.parse(localStorage.getItem("country"))
        ? JSON.parse(localStorage.getItem("country")).currencies
        : null,
      lang: localStorage.getItem("lang") || "en",

      countryImg: JSON.parse(localStorage.getItem("country"))
        ? JSON.parse(localStorage.getItem("country")).flag
        : "https://humhum.work/user-interface/public/assets/flags/KW.png",

      countryName: JSON.parse(localStorage.getItem("country"))
        ? JSON.parse(localStorage.getItem("country")).title
        : this.$t("home.kuwait"),
      defaultCountry: null,
      defaultCurrency: null,
      loadingPercent: 0,
      loadTime: 0,
      interval: null,
      arabicAvilability: false
      // currentCurrency : localStorage.getItem('currency')
    };
  },
  mounted() {
    this.getAllCountires();
    // this.reloadPage();

    this.handleLangeFromQuery();

    this.checkLang()
    setTimeout(() => {
      let currencyTrim = document.querySelector('#myCurrency-code').innerText.trim()
      if (currencyTrim == '') {
        let currency = document.querySelector('#myCurrency-code')
        currency.innerText = localStorage.getItem('currency')

      }
    }, 5000);


  },
  created() {
    let perfData = window.performance.timing;
    // let estimatedTime = Math.abs(perfData.loadEventEnd - perfData.loadEventStart);
    let estimatedTime = Math.abs(perfData.loadEventEnd - perfData.navigationStart);
    this.loadTime = parseInt((estimatedTime / 1000) % 60) * 100;
    this.doProgress();
  },
  methods: {
    doProgress() {
      let step = this.loadTime / 100;
      this.interval = setInterval(() => {
        this.loadingPercent++;
        if (this.loadingPercent >= 100) {
          this.checkLang()
        }
      }, step);
    },
    /**
     * @vuese
     * get countries and setting language and curreny and country
     */
    getAllCountires() {
      auth
        .getAllCountires()
        .then((res) => {
          this.countries = res.data.items;
          localStorage.setItem("countries", JSON.stringify(res.data.items));
          if (localStorage.getItem("country")) {
            let current_stored_country = JSON.parse(
              localStorage.getItem("country")
            );
            this.countries.forEach((country) => {
              if (country.id == current_stored_country.id) {
                window.localStorage.setItem("country", JSON.stringify(country));
                if (localStorage.getItem("currency") === null) {
                  localStorage.setItem("currency", country.currencies[0].code);
                  localStorage.setItem("currencyId", country.currencies[0].id);
                }
                this.myCurrencies = country.currencies;
              }
            });
          } else {
            this.getDefaultCountry();
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
          if (this.loadingPercent >= 100) {
            if (myCurrency == "") {
              setTimeout(() => {

                if (this.countryByIP && !this.selectedCountry) {

                  localStorage.setItem("currency", this.countryByIP.currencies[0].code);
                  localStorage.setItem("currencyId", this.countryByIP.currencies[0].id);
                } else if (!this.countryByIP && this.selectedCountry || this.countryByIP && this.selectedCountry) {
                  localStorage.setItem("currency", this.selectedCountry.currencies[0].code);
                  localStorage.setItem("currencyId", this.selectedCountry.currencies[0].id);
                }
                else if (!this.countryByIP && !this.selectedCountry) {
                  location.reload();
                }
              }, 800);
            }

          }
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
    checkLang() {

      if (localStorage.getItem('arabic')) {
        if (this.arabicAvailable) {
          if (this.arabicAvailable == 'no') {
            this.arabicAvilability = false
          } else {
            this.arabicAvilability = true
          }
        }
      }

    },
    /**
     * @vuese
     * switch language
     */
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
    /**
     * @vuese
     * handle country
     */
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
      this.getAllCountires()
      setTimeout(() => {
        let currencyTrim = document.querySelector('#myCurrency-code').innerText.trim()
        if (currencyTrim == '') {
          let currency = document.querySelector('#myCurrency-code')
          currency.innerText = data.currencies[0].code

        }
      }, 100);
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    /**
     * @vuese
     * handle currency from localstorage
     */
    handleCurrency(event) {

      localStorage.setItem("currency", event.code);
      localStorage.setItem("currencyId", event.id);
      location.reload();
    },
    /**
     * @vuese
     * get default country according to ip address
     */
    getDefaultCountry() {

      axios
        .get(`${this.mainAppApiLink}site-settings/default/country`)
        .then((res) => {
          this.defaultCountry = JSON.stringify(res.data.items);
          window.localStorage.setItem(
            "country",
            JSON.stringify(res.data.items)
          );
          window.localStorage.setItem('countryByIP', JSON.stringify(res.data.items))
          if (localStorage.getItem("currency") === null) {
            localStorage.setItem("currency", res.data.items.currencies[0].code);
            localStorage.setItem("currencyId", res.data.items.currencies[0].id);
          }
          this.defaultCurrency = res.data.items.currencies[0].code;



          this.countryName = res.data.items.title
          this.countryImg = res.data.items.flag
          this.myCurrencies = res.data.items.currencies;
          setTimeout(() => {
            let currencyTrim = document.querySelector('#myCurrency-code').innerText.trim()
            if (currencyTrim == '') {
              let currency = document.querySelector('#myCurrency-code')
              currency.innerText = res.data.items.currencies[0].code

            }

          }, 100);



          // alert('5')
          // location.reload();

        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
    /**
     * @vuese
     * handle Language From Query
     */

    handleLangeFromQuery() {
      let enLang = document.querySelector('#enLang')
      let arLang = document.querySelector('#arLang')

      var query = document.location.href.substring(document.location.href.indexOf("lang") + 1);
      var langValue = query.split("&" || "?")[0].split("=")[1];

      if (langValue == 'en') {
        if (enLang) {

          const searchURL = new URL(window.location);
          searchURL.searchParams.delete('lang');

          window.history.pushState({}, '', searchURL);
          localStorage.removeItem('currency')

          enLang.click();
        }
      }
      if (langValue == 'ar') {
        if (arLang) {

          const searchURL = new URL(window.location);
          searchURL.searchParams.delete('lang');

          window.history.pushState({}, '', searchURL);
          localStorage.removeItem('currency')

          arLang.click()
        }
      }
    }
  },
  computed: {
    currentCurrency() {
      return localStorage.getItem("currency");
    },
    loaded() {
      return this.loadingPercent + '%'
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.handleLangeFromQuery()
    },
    loadingPercent(val) {
      if (val >= 100) {
        clearInterval(this.interval)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/**
    * component style
*/
.main-header {
  // background: #202026;
  background: inherit;

  .top-nav {
    padding: 8px 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .lang {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 40px;
      margin: 0 10px;

      button {
        background: transparent;
        // color: #fff;
        color: inherit;
        border: none;
        text-transform: capitalize;
        font-size: 16px;
        color:#000
      }
    }
  }
}

.btn-secondary {
  background: transparent !important;
  border: none !important;
}

.Allcountries {
  border-radius: 0;
  padding: 0 15px 0 0;
}

.en {
  .Allcountries {
    border-right: 1px solid #ccc;
  }
}

.ar {
  .Allcountries {
    border-left: 1px solid #ccc;
  }
}


</style>
