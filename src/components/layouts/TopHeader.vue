<template>
  <header class="main-header">
    <div class="top-nav">
      <b-container>
        <b-dropdown>
          <template #button-content> العمله</template>
          <b-dropdown-item
            v-for="(currency, index) in currencies"
            :key="index"
            >{{ currency }}</b-dropdown-item
          >
        </b-dropdown>

        <button @click="switchLang()" v-if="lang == 'ar'">english</button>
        <button @click="switchLang()" v-if="lang == 'en'">arabic</button>
      </b-container>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      currencies: [
        "الدينار الكويتي",
        "الدينار الكويتي",
        "الدينار الكويتي",
        "الدينار الكويتي",
        "الدينار الكويتي",
      ],
      lang: localStorage.getItem("lang") || "en",
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
  },
};
</script>

<style lang="scss" scoped>
.main-header {
  .top-nav {
    padding: 8px 0px;
    background: #202026;
  }
}
</style>
