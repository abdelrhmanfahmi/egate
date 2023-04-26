<template>
  <div>
    <div class="cover-wrapper">
        <!-- <img :src="coverData" alt="cover-img" :srcset="imageURL" class="img-fluid w-100" v-if="imageURL"> -->
        <img src="@/assets/images/categories/subCategoryCover.jpg" class="img-fluid w-100" alt="cover-img" >
    </div>
  </div>
</template>

<script>
export default {
    // props:{
    //     coverData:{
    //         type:Object,
    //         required:true,
    //     }
    // }
}
</script>

<style lang="scss" scoped>
.cover-wrapper{
    //min-height: 500px;
    height: auto;
    background-size: cover;
    img{
        height: 100%;
        object-fit: cover;
        width: 100% !important;
    }
}
</style>