<template>
  <div>
    <!-- buyer register page  -->
    <!-- buyer form component page  -->
    <B2bForm />
  </div>
</template>
<script>
import B2bForm from "@/components/pages/B2bForm.vue";
export default {
  components: {
    B2bForm,
  },
  mounted(){
    if(!this.b2b_buyer_registration){
      this.$router.push('/')
    }
  }
};
</script>
