<template>
    <div class="wrapper">
        <div class="container">
            <div class="data-holder">
                <div class="branding">
                    <img :src="logoEnv" v-if="logoEnv" class="img-fluid" alt="logo" @click="goToHome()">
                    <img src="@/assets/images/logo.png" v-else class="img-fluid" alt="logo" @click="goToHome()" />
                </div>
                <h5 class="my-3" >
                    {{ $t('home.registerThank') }}
                </h5>
                <b-button variant="outline-success" to="/">
                    {{ $t('home.home') }}
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        goToHome(){
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    min-height: 100vh;
    display: flex;
        justify-content: center;
        align-items: center;
    .data-holder{

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
    
        img {
            width: 150px !important;
            margin: 5% 0;
        }
    }
}
</style>