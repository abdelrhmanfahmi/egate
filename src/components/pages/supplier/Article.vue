<template>
  <div class="article" v-if="supplier && supplierMSite">
    <!-- <div class="" v-if="supplierMSite">
      <img
        :src="supplierMSite.banner_path"
        alt="Article Image"
        v-if="supplierMSite.banner_path"
      />
    </div> -->
    <p v-html="supplierMSite.short_description_en"
      v-if="supplierMSite.short_description_en && $i18n.locale == 'en'"
      class="my-5 "
    >
      
    </p>
    <p v-html="supplierMSite.short_description_ar"
      v-if="supplierMSite.short_description_ar && $i18n.locale == 'ar'"
      class="mt-2"
    >
    </p>

    <div
      class="retunPolicy "
      v-if="supplierMSite.return_policy_ar && supplierMSite.return_policy_en"
    >
      <h3>
        {{ $t("supplier.return_policy") }}
      </h3>
      <p v-html="supplierMSite.return_policy_en" v-if="supplierMSite.return_policy_en && $i18n.locale == 'en'">
        
      </p>
      <p v-html="supplierMSite.return_policy_ar" v-if="supplierMSite.return_policy_ar && $i18n.locale == 'ar'">
        
      </p>
    </div>
    <div
      class="shipping_and_payment_terms my-5 py-5"
      v-if="supplierMSite.shipping_and_payment_terms_ar && supplierMSite.shipping_and_payment_terms_en"
    >
      <h3>
        {{ $t("supplier.shipping_and_payment_terms") }}
      </h3>
      <p v-if="supplierMSite.shipping_and_payment_terms_en && $i18n.locale == 'en'">
        {{ supplierMSite.shipping_and_payment_terms_en }}
      </p>
      <p v-if="supplierMSite.shipping_and_payment_terms_ar && $i18n.locale == 'ar'">
        {{ supplierMSite.shipping_and_payment_terms_ar }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { count: 0 };
  },
  props: ["supplier", "supplierMSite"],
};
</script>
<style lang="scss" scoped>
.article {
  img {
    height: 300px;
    width: 100%;
    object-fit: contain;
  }
}
</style>
