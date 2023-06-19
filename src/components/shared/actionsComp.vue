<template>
    <div class="loading-screen-wrapper">
        <div id="pulse-wrapper">
            <div id="pulse">
                <span></span> <!-- Wave 1 -->
                <span></span> <!-- Wave 2 -->
            </div>
        </div>
        <!-- <div class="logo">
            <v-img width="250" src="@/assets/images/logo.png"></v-img>
        </div> -->
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.logo{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
}
.loading-screen-wrapper {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 999;

    @keyframes pulse_animation {
        0% {
            box-shadow: 0 0 0 0 rgba(254, 206, 104, 0.8)
        }

        100% {
            box-shadow: 0 0 0 200px rgba(254, 206, 104, 0)
        }
    }

    #pulse-wrapper {
        display: flex;
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    #pulse-wrapper #pulse {
        margin: auto;
    }

    #pulse-wrapper #pulse span {
        position: absolute;
        margin-top: -25px;
        /* = height / 2 */
        margin-left: -25px;
        /* = width / 2 */
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #fece68;
        animation: pulse_animation 1.3s infinite;
    }

    #pulse-wrapper #pulse span:nth-child(2) {
        animation-delay: 0.3s;
        /* Start the second wave with some delay */
    }
}
</style>