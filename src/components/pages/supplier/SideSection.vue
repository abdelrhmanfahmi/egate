<template>
  <div class="side-sections" v-if="supplier">
    <p class="title" v-if="supplier.image_path">
      {{ $t("supplier.about") }}
      <span class="supplier-name">{{ supplier.company_name }}</span>
    </p>
    <div class="company-info">
      <img
        class="supplier-logo"
        :src="supplier.image_path"
        alt="Company Name"
        v-if="supplier.image_path"
      />
      <!-- <h4 class="name" v-if="supplier.company_name">
        {{ supplier.company_name }}
      </h4> -->
      <ul class="social-accounts d-flex flex-wrap" v-if="supplierMSite">
        <li class="account" v-if="supplierMSite.facebook_page">
          <a :href="supplierMSite.facebook_page"><b-icon-facebook font-scale="1.5"></b-icon-facebook></a>
        </li>
        <li class="account" v-if="supplierMSite.twitter_page">
          <a :href="supplierMSite.twitter_page"><b-icon-twitter font-scale="1.5"></b-icon-twitter></a>
        </li>
        <li class="account" v-if="supplierMSite.instagram_page">
          <a :href="supplierMSite.instagram_page"><b-icon-instagram font-scale="1.5"></b-icon-instagram></a>
        </li>
        <li class="account" v-if="supplierMSite.google_page">
          <a :href="supplierMSite.google_page"><b-icon-google font-scale="1.5"></b-icon-google></a>
        </li>
      </ul>
    </div>
    <div class="other-sections" v-if="supplier.categories">
      <h5 class="title">{{ $t("supplier.sections") }}</h5>
      <ul class="sections">
        <li class="section" v-for="item in supplier.categories" :key="item.id">
          <router-link
            :to="{
              path: '/supplier-products',
              query: { supId: `${supplier.id}`, catId: `${item.category_id}` },
            }"
          >
            {{ item.category.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { BIconTwitter , BIconFacebook , BIconInstagram , BIconGoogle } from "bootstrap-vue";
export default {
  components: {
    BIconTwitter,
    BIconFacebook,
    BIconInstagram,
    BIconGoogle
  },
  data() {
    return { count: 0 };
  },
  props: ["supplier" , "supplierMSite"],
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
    max-height: 500px;
    overflow-y: scroll;
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
.supplier-name {
  font-size: 20px;
  font-weight: bold;
  margin: 0 8px;
}
.company-info {
  .supplier-logo {
    width: 300px;
    object-fit: cover;
  }
}
</style>
