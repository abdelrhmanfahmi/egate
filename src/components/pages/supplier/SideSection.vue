<template>
  <div class="side-sections" v-if="supplier">
    <p class="title">{{ $t("supplier.about") }}</p>
    <div class="company-info">
      <img
        :src="supplier.image_path"
        alt="Company Name"
        v-if="supplier.image_path"
      />
      <h4 class="name" v-if="supplier.company_name">
        {{ supplier.company_name }}
      </h4>
      <!-- <ul class="social-accounts d-flex flex-wrap">
        <li class="account">
          <a href="#"><b-icon-twitter></b-icon-twitter></a>
        </li>
        <li class="account">
          <a href="#"><b-icon-twitter></b-icon-twitter></a>
        </li>
        <li class="account">
          <a href="#"><b-icon-twitter></b-icon-twitter></a>
        </li>
        <li class="account">
          <a href="#"><b-icon-twitter></b-icon-twitter></a>
        </li>
        <li class="account">
          <a href="#"><b-icon-twitter></b-icon-twitter></a>
        </li>
        <li class="account">
          <a href="#"><b-icon-twitter></b-icon-twitter></a>
        </li>
      </ul> -->
    </div>
    <div class="other-sections">
      <p class="title">{{ $t("supplier.sections") }}</p>
      <ul class="sections">
        <li class="section" v-for="item in supplier.categories" :key="item.id">
          <router-link :to="`${supplier.id}`">
            {{ item.category.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import { BIconTwitter } from "bootstrap-vue";
export default {
  components: {
    // BIconTwitter,
  },
  data() {
    return { count: 0 };
  },
  props: ["supplier"],
};
</script>
<style lang="scss" scoped>
.side-sections {
  .title {
    font-weight: bold;
    &::before {
      content: "";
      display: inline-block;
      width: 1rem;
      height: 3px;
      background-color: #ed2124;
      vertical-align: middle;
      margin-inline-end: 0.3rem;
    }
  }
  .company-info {
    margin: 2rem 0;
    img {
      margin-bottom: 1.5rem;
    }
    .name {
      color: #312620;
    }
    .social-accounts {
      color: #878686;
      .account {
        a {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-inline-end: 0.3rem;
          color: #878686;
          &:hover {
            color: #ed2124;
          }
        }
      }
    }
  }
  .other-sections {
    color: #ed2124;
    .sections {
      color: #ed2124;
      .section {
        display: flex;
        align-items: center;
        border: 1px dashed #dadada;
        border-width: 0 0 1px 0;
        &::before {
          content: "";
          width: 0.4rem;
          height: 1px;
          background-color: #878686;
          display: inline-block;
          margin-inline-end: 1rem;
        }
        a {
          color: #878686;
          display: block;
          width: 100%;
          padding: 1rem 0;
          &:hover {
            color: #ed2124;
          }
        }
      }
    }
  }
}
</style>
