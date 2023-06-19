<template>
  <div>
    <section >
      <OffersComponent :sectionTitle="'More About Air Conditioner'" />
    </section>
    <section>
      <OffersComponent :sectionTitle="'More About Fresh'" />
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
