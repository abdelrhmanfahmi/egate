<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <img :src="largeCoversTwo[0].image" alt="image" class="coverImage">
      </div>
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
  object-fit: cover !important;
  width: 100%;
  border-radius: 10px;
}
</style>
