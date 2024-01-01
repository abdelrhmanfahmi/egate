<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12" v-if="largeCoversTwo.length > 0">
        <router-link :to="'/productPage/'+largeCoversTwo[0].id">
          <img :src="largeCoversTwo[0].image" alt="image" class="coverImage">
        </router-link>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['largeCoversTwo']
};
</script>

<style lang="scss" scoped>
.coverImage{
  height: 60vh;
  object-fit: fill !important;
  width: 100%;
  border-radius: 10px;
}
</style>
