<template>
  <header class="main-header">
    <div class="top-nav">
      <b-container>
        <b-dropdown>
          <template  #button-content> العمله</template>
          <b-dropdown-item
            v-for="(currency, index) in currencies"
            :key="index"
            >{{ currency }}</b-dropdown-item
          >
        </b-dropdown>
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
    };
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