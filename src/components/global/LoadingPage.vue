<template>
    <div id="app">
        <!-- loading component to know when  page loaded  -->
        <div v-if="loadingPercent < 100">
            <div class="progress-bar">
                <div class="fill" :style="{ width: loaded }"> {{ loaded }}</div>

            </div>
        </div>
        <div v-else>
            Page Loaded
        </div>
    </div>
</template>

<script>
export default {
    created() {
        let perfData = window.performance.timing;
        let estimatedTime = Math.abs(perfData.loadEventEnd - perfData.navigationStart);
        this.loadTime = parseInt((estimatedTime / 1000) % 60) * 100;
        this.doProgress();
    },
    methods: {
        doProgress() {
            let step = this.loadTime / 100;
            this.interval = setInterval(() => {
                this.loadingPercent++
            }, step);
        }
    },
    computed: {
        loaded() {
            return this.loadingPercent + '%'
        }
    },
    watch: {
        loadingPercent(val) {
            if (val >= 100) {
                clearInterval(this.interval)
            }
        }
    },
    data() {
        return {
            loadingPercent: 0,
            loadTime: 0,
            interval: null
        }
    }
}
</script>