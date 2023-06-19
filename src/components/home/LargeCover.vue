<template>
  <div class="wrapper">
    <v-container>
        <v-img :src="imageSrc" alt="image" class="coverImage"></v-img>
    </v-container>
  </div>
</template>

<script>
export default {
  props:{
    imageSrc:{
      type:String
    }
  }
}
</script>

<style lang="scss" scoped>

.coverImage{
  min-height: 50vh;
}

</style>