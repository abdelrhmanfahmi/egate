<template>
  <header class="main-header">
      <b-container>
    <div class="top-nav">
           <div class="lang">
            <button @click="switchLang()" v-if="lang == 'ar'">  English</button>
            <button @click="switchLang()" v-if="lang == 'en'">العربية</button>
      </div>
          <div class="select-country">
                  <b-dropdown id="dropdown-1"  variant="link" toggle-class="text-decoration-none" no-caret>
                      <template #button-content>
                        <span class="title">{{countryName}}</span>
                       <img :src="countryImg" :alt="countryName">
                      </template>
                    <b-dropdown-item v-for="country in countries" :key="country.value"  @click="onHandelCountry(country)" >
                       <span>{{country.text}}</span>
                       <img :src="country.image" :alt="country.value">
                    </b-dropdown-item>
                  </b-dropdown>
         </div>
         <div class="select-currency">
            <b-form-select v-model="currencyValue" :options="currencies" sm></b-form-select>
         </div>
         
 
    </div>
      </b-container>
  </header>
</template>

<script>
export default {
  data() {
    return {
      currencyValue:"الدينار الكويتي",
      currencies: [
           { value: 'الدينار الكويتي', text: 'الدينار الكويتي' },
           { value: 'جنية مصري', text: 'جنية مصري' },
      ],
      countries: [
        { value: 'EG', text: 'جمهوريه مصر العربيه' , image:"https://humhum.work/user-interface/public/assets/flags/EG.png" },
        { value: 'KW', text: 'الكويت' , image:"https://humhum.work/user-interface/public/assets/flags/KW.png" },
      ],
      lang: localStorage.getItem("lang") || "en",
      countryImg:"https://humhum.work/user-interface/public/assets/flags/EG.png",
      countryName:"جمهوريه مصر العربيه"
    };
  },
  methods: {
    switchLang() {
      if (this.lang === "en") {
        this.lang = "ar";
      } else {
        this.lang = "en";
      }
      localStorage.setItem("lang", this.lang);
      window.location.reload();
    },
    onHandelCountry(data){
      this.countryImg = data.image
      this.countryName = data.text
    }
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

    .lang{
      button{
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
