<template>
  <!-- <div class="d-flex justify-space-around">
        <p>{{ years }}</p>
        <p>{{ days % 365 }}</p>
        <p>{{ hours % 24 }}</p>
        <p>{{ minutes % 60 }}</p>
        <p>{{ seconds % 60 }}</p>
    </div> -->

  <div class="d-flex justify-space-around pt-5 countDown-wrapper">
    <div class="opacitybg mx-auto" weight="120px" href="https://www.yusufonaran.me" target="_blank" v-if="years > 0">
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
    <div class="opacitybg mx-auto" weight="120px" href="https://www.yusufonaran.me" target="_blank">
      <div>
        <p class="text-h6 text-center font-weight-regular numberHolder">
          {{ days % 365 }}
        </p>
      </div>
      <div>
        <div class="text-gray" style="font-size: 13px;"> Days </div>
      </div>
    </div>
    <!-- ---------------- -->
    <div class="opacitybg mx-auto" weight="120px" href="https://www.yusufonaran.me" target="_blank">
      <div>
        <p class="text-h6 text-center font-weight-regular numberHolder">
          {{ hours % 24 }}
        </p>
      </div>
      <div>
        <div class="text-gray" style="font-size: 13px;"> Hours </div>
      </div>
    </div>
    <!-- ---------------- -->
    <div class="opacitybg mx-auto" weight="120px" href="https://www.yusufonaran.me" target="_blank">
      <div>
        <p class="text-h6 text-center font-weight-regular numberHolder">
          {{ minutes % 60 }}
        </p>
      </div>
      <div>
        <div class="text-gray" style="font-size: 13px;"> Minutes </div>
      </div>
    </div>
    <!-- ---------------- -->
    <div class="opacitybg mx-auto" weight="120px" href="https://www.yusufonaran.me" target="_blank">
      <div>
        <p class="text-h6 text-center font-weight-regular numberHolder">
          {{ seconds % 60 }}
        </p>
      </div>
      <div>
        <div class="text-gray" style="font-size: 13px;"> Seconds </div>
      </div>
    </div>
  </div>
</template>

<script>
import home from "@/services/home";
export default {
  name: "CounterCards",
  props: ['specialOffer'],
  data() {
    return {
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },
  async mounted() {
    setTimeout(() => {
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
    }, 2000)
  },
  setup() {

  },

  methods: {
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
