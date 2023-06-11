<template>
  <div>
    <div class="cover-wrapper">
        <img src="@/assets/images/categories/subCategoryCover.jpg" class="img-fluid w-100" alt="cover-img" >
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.cover-wrapper{
    height: auto;
    background-size: cover;
    img{
        height: 100%;
        object-fit: cover;
        width: 100% !important;
    }
}
</style>