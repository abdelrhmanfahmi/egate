<template>
  <div>
    <section >
      <OffersComponent :sectionTitle="'More About Category'" />
    </section>
    <section>
      <OffersComponent :sectionTitle="'More About The Same Brand'" />
    </section>
  </div>
</template>

<script>
import OffersComponent from "@/components/home/OffersComponent.vue";
export default {
  components: {
    OffersComponent,
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
section{
    margin:5% 0
}
</style>
