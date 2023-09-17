<template>
  <div class="wrapper">
    <v-container>
        <img src="https://cdn.vox-cdn.com/thumbor/vabx-KeOe5GULF4lqyITVmXMU6I=/0x0:1600x800/1400x788/filters:focal(800x400:801x401)/cdn0.vox-cdn.com/uploads/chorus_asset/file/8853589/google_ai_photography_street_view_2.jpg" alt="image" class="coverImage" />
        <!-- <v-img :src="imageSrc" alt="image" class="coverImage"></v-img> -->
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
  height: 60vh;
  object-fit: cover !important;
  width: 100%;
  border-radius: 10px;
}

</style>