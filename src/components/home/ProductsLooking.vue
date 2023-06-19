<template>
  <div class="wrapper">
    <v-container>
      <section class="pt-5 pb-5">
        <v-row>
          <v-col cols="12" md="3" v-for="i in 4" :key="i">
            <h3 class="title mb-5">Looking For Kitchen For Professionals</h3>
            <v-row>
              <v-col cols="6" sm="6" v-for="i in 4" :key="i" class="px-1 py-1">
                <div class="img-holder">
                  <v-img
                    src="@/assets/images/home/MaskGroup17.png"
                    lazy-src="@/assets/images/home/MaskGroup17.png"
                  ></v-img>
                </div>
              </v-col>
            </v-row>
            <div class="btn my-3">
              <v-btn variant="tonal"> See More </v-btn>
            </div>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.img-holder {
  /* UI Properties */
  background: transparent linear-gradient(180deg, #f4ccc0 0%, #f0e5b0 100%) 0%
    0% no-repeat padding-box;
  border-radius: 10px;

  margin: auto;
  img {
    width: 100%;
  }
}
.v-row {
  margin: 0px;
  padding: 0;
}
</style>
