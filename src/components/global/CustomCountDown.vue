<template>
    <!-- <div class="d-flex justify-space-around">
          <p>{{ years }}</p>
          <p>{{ days % 365 }}</p>
          <p>{{ hours % 24 }}</p>
          <p>{{ minutes % 60 }}</p>
          <p>{{ seconds % 60 }}</p>
      </div> -->

    <div class="d-flex justify-space-around countDown-wrapper laign-items-center text-center">
        <div class="opacitybg mx-auto" weight="120px" href="https://www.yusufonaran.me" target="_blank" v-if="years > 0">
            <div>
                <span class="text-h6 text-center font-weight-regular numberHolder">
                    {{ years }}
                </span>
            </div>
            <div>
                <span class="text-gray"> Y </span>
            </div>
        </div>
        <!-- ---------------- -->
        <div class="opacitybg mx-auto" weight="120px" href="https://www.yusufonaran.me" target="_blank"
            v-if="days % 365 > 350">
            <div>
                <span class="text-h6 text-center font-weight-regular numberHolder">
                    {{ days % 365 }}
                </span>
            </div>
            <div>
                <span class="text-gray" v-if="$i18n.locale == 'en'"> D </span>
                <span class="text-gray" v-else> ي </span>
            </div>
        </div>
        <!-- ---------------- -->
        <div class="opacitybg mx-auto" weight="120px" href="https://www.yusufonaran.me" target="_blank">
            <div>
                <span class="text-h6 text-center font-weight-regular numberHolder">
                    {{ hours % 24 }}
                </span>
            </div>
            <div>
                <span class="text-gray" v-if="$i18n.locale == 'en'"> H </span>
                <span class="text-gray" v-else> س </span>
            </div>
        </div>
        <!-- ---------------- -->
        <div class="opacitybg mx-auto" weight="120px" href="https://www.yusufonaran.me" target="_blank">
            <div>
                <span class="text-h6 text-center font-weight-regular numberHolder">
                    {{ minutes % 60 }}
                </span>
            </div>
            <div>
                <span class="text-gray" v-if="$i18n.locale == 'en'"> M </span>
                <span class="text-gray" v-else> د </span>
            </div>
        </div>
        <!-- ---------------- -->
        <div class="opacitybg mx-auto" weight="120px" href="https://www.yusufonaran.me" target="_blank">
            <div>
                <span class="text-h6 text-center font-weight-regular numberHolder">
                    {{ seconds % 60 }}
                </span>
            </div>
            <div>
                <span class="text-gray" v-if="$i18n.locale == 'en'"> S </span>
                <span class="text-gray" v-else> ث </span>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "CounterCards",
    mounted() {

        setInterval(() => {
            let currentDate = new Date();
            let lunchTime = this.lunchDate - currentDate;
            this.seconds = parseInt(lunchTime / 1000);
            this.minutes = parseInt(this.seconds / 60);
            this.hours = parseInt(this.minutes / 60);
            this.days = parseInt(this.hours / 24);
            this.years = parseInt(this.days / 365);
        }, 1000);
    },
    props: ['until'],
    data() {
        return {
            years: "",
            days: "",
            hours: "",
            minutes: "",
            seconds: "",
            lunchDate: new Date(this.until),
        }
    }
};
</script>
  
<style>

</style>
  