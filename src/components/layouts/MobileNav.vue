<template>
  <div>
    <ul class="drop-down">
      <li v-for="(link, index) in links" :key="index">
        <router-link class="link" :to="link.to">{{ link.name }}</router-link>
      </li>
    </ul>
    <a v-b-toggle.login >
      login
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: this.$t("home.home"), to: "/" },
        { name: this.$t("home.suppliers"), to: "/suppliers" },
        { name: this.$t("home.about"), to: "/about" },
        { name: this.$t("home.corporat"), to: "/corporat" },
        { name: this.$t("home.contactUs"), to: "/contact-us" },
      ],
    };
  },
};
</script>