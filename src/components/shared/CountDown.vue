<template>
  <!-- <div class="d-flex justify-space-around">
        <p>{{ years }}</p>
        <p>{{ days % 365 }}</p>
        <p>{{ hours % 24 }}</p>
        <p>{{ minutes % 60 }}</p>
        <p>{{ seconds % 60 }}</p>
    </div> -->

  <div class="d-flex justify-space-around pt-5 countDown-wrapper">
    <div
      class="opacitybg mx-auto"
      
      weight="120px"
      href="https://www.yusufonaran.me"
      target="_blank"
      v-if="years > 0"
    >
      <div>
        <p class="text-h6 text-center font-weight-regular numberHolder">
          {{ years }}
        </p>
      </div>
      <div>
        <div class="text-gray"> YEARS </div>
      </div>
    </div>
    <!-- ---------------- -->
    <div
      class="opacitybg mx-auto"
      
      weight="120px"
      href="https://www.yusufonaran.me"
      target="_blank"
      
    >
      <div>
        <p class="text-h6 text-center font-weight-regular numberHolder">
          {{ days % 365 }}
        </p>
      </div>
      <div>
        <div class="text-gray"> DAYS </div>
      </div>
    </div>
    <!-- ---------------- -->
    <div
      class="opacitybg mx-auto"
      
      weight="120px"
      href="https://www.yusufonaran.me"
      target="_blank"
    >
      <div>
        <p class="text-h6 text-center font-weight-regular numberHolder">
          {{ hours % 24 }}
        </p>
      </div>
      <div>
        <div class="text-gray"> HOURS </div>
      </div>
    </div>
    <!-- ---------------- -->
    <div
      class="opacitybg mx-auto"
      
      weight="120px"
      href="https://www.yusufonaran.me"
      target="_blank"
    >
      <div>
        <p class="text-h6 text-center font-weight-regular numberHolder">
          {{ minutes % 60 }}
        </p>
      </div>
      <div>
        <div class="text-gray"> MINUTES </div>
      </div>
    </div>
    <!-- ---------------- -->
    <div
      class="opacitybg mx-auto"
      
      weight="120px"
      href="https://www.yusufonaran.me"
      target="_blank"
    >
      <div>
        <p class="text-h6 text-center font-weight-regular numberHolder">
          {{ seconds % 60 }}
        </p>
      </div>
      <div>
        <div class="text-gray"> SECONDS </div>
      </div>
    </div>
  </div>
</template>

<script>
import home from "@/services/home";
export default {
  name: "CounterCards",
  data(){
    return {
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      specialOffer:{}
    }
  },
  async mounted(){
    const response = await home.getProductsSpecial();
    this.specialOffer = response.data.items.data[0];
    const lunchDate = new Date(this.specialOffer.end_at);
    setInterval(() => {

      const currentDate = new Date(this.specialOffer.start_at);
      const lunchTime = lunchDate - currentDate;
      this.seconds = parseInt(lunchTime / 1000);
      this.minutes = parseInt(this.seconds / 60);
      this.hours = parseInt(this.minutes / 60);
      this.days = parseInt(this.hours / 24);
      this.years = parseInt(this.days / 365);
    }, 1000);
  },
  setup() {
    
  },

  methods:{
    changeTimeZone(date, timeZone) {
        if (typeof date === 'string') {
          return new Date(
            new Date(date).toLocaleString('en-US', {
              timeZone,
            }),
          );
        }

        return new Date(
          date.toLocaleString('en-US', {
            timeZone,
          }),
        );
    }
  }
};
</script>

<style>
/*.opacitybg {
  background: rgba(255, 255, 255, 0.7);
} */
</style>
