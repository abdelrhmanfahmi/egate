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
      v-if="days % 365 > 350"
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
import { ref } from "@vue/reactivity";
export default {
  name: "CounterCards",
  setup() {
    const years = ref(0);
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const lunchDate = new Date("30 December 2023");
    setInterval(() => {
      const currentDate = new Date();
      const lunchTime = lunchDate - currentDate;
      seconds.value = parseInt(lunchTime / 1000);
      minutes.value = parseInt(seconds.value / 60);
      hours.value = parseInt(minutes.value / 60);
      days.value = parseInt(hours.value / 24);
      years.value = parseInt(days.value / 365);
    }, 1000);
    return { years, days, hours, minutes, seconds };
  },
};
</script>

<style>
.opacitybg {
  background: rgba(255, 255, 255, 0.7);
}
</style>
