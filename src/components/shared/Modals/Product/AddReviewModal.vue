<template>
  <div class="wrapper">
    <div class="modal-wrapper">
      <div class="text-center">
        <v-dialog v-model="dialog" width="500" >
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
          </template>

          <v-card class="dialog-parent py-10 px-4 pb-5">
            <v-card-text class="text-center" >
              <h4 class="mb-5">Add A Review</h4>
              <div class="rating">
                <div class="text-center d-flex justify-center align-center">
                  <v-rating
                    v-model="rating"
                    bg-color="orange-lighten-1"
                    color="blue"
                    half-increments
                    size="x-large"
                  ></v-rating>
                  <h4 class="mx-3">
                    <sup>{{rating}}</sup>
                  </h4>
                </div>
              </div>
              <div class="write-review text-left mt-5">
                <p class="text-gray mb-3">Write a Review</p>
                <v-textarea label="Your Review" variant="outlined"></v-textarea>
              </div>
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn color="primary" block @click="dialog = false"
                >Close Dialog</v-btn
              > -->
              <v-btn color="primary" block class="bg-main br-20"
                >Done</v-btn
              >
            </v-card-actions>
            <div class="close-dialog" @click="dialog = false">
                <v-icon icon="mdi-close"></v-icon>
                
              </div>
          </v-card>
         
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      rating: 0
    };
  },
};
</script>

<style lang="scss" scoped>
.dialog-parent{
    position: relative;
    .close-dialog{
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
}
</style>
