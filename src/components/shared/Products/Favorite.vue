<template>
    <div class="new-wishlist-method d-flex w-100 justify-content-end">
        <div class="addProductToFav">
            <a class="button one active animate mobile button--secondary wishlist-btn" :title="`product in favourite`"
                v-if="product.product.is_saved == true">
                <div class="btn__effect">
                    <svg class="heart-stroke icon-svg icon-svg--size-4 icon-svg--color-silver" viewBox="20 18 29 28"
                        aria-hidden="true" focusable="false">
                        <path
                            d="M28.3 21.1a4.3 4.3 0 0 1 4.1 2.6 2.5 2.5 0 0 0 2.3 1.7c1 0 1.7-.6 2.2-1.7a3.7 3.7 0 0 1 3.7-2.6c2.7 0 5.2 2.7 5.3 5.8.2 4-5.4 11.2-9.3 15a2.8 2.8 0 0 1-2 1 3.4 3.4 0 0 1-2.2-1c-9.6-10-9.4-13.2-9.3-15 0-1 .6-5.8 5.2-5.8m0-3c-5.3 0-7.9 4.3-8.2 8.5-.2 3.2.4 7.2 10.2 17.4a6.3 6.3 0 0 0 4.3 1.9 5.7 5.7 0 0 0 4.1-1.9c1.1-1 10.6-10.7 10.3-17.3-.2-4.6-4-8.6-8.4-8.6a7.6 7.6 0 0 0-6 2.7 8.1 8.1 0 0 0-6.2-2.7z">
                        </path>
                    </svg>
                    <svg class="heart-full icon-svg icon-svg--size-4 icon-svg--color-blue" viewBox="0 0 19.2 18.5"
                        aria-hidden="true" focusable="false">
                        <path
                            d="M9.66 18.48a4.23 4.23 0 0 1-2.89-1.22C.29 10.44-.12 7.79.02 5.67.21 2.87 1.95.03 5.42.01c1.61-.07 3.16.57 4.25 1.76A5.07 5.07 0 0 1 13.6 0c2.88 0 5.43 2.66 5.59 5.74.2 4.37-6.09 10.79-6.8 11.5-.71.77-1.7 1.21-2.74 1.23z">
                        </path>
                    </svg>
                    <svg class="broken-heart" xmlns="http://www.w3.org/2000/svg" width="48" height="16"
                        viewBox="5.707 17 48 16">
                        <g fill="#dc3545">
                            <path class="broken-heart--left"
                                d="M29.865 32.735V18.703a4.562 4.562 0 0 0-3.567-1.476c-2.916.017-4.378 2.403-4.538 4.756-.118 1.781.227 4.006 5.672 9.737a3.544 3.544 0 0 0 2.428 1.025l-.008-.008.013-.002z" />
                            <path class="broken-heart--right"
                                d="M37.868 22.045c-.135-2.588-2.277-4.823-4.697-4.823a4.258 4.258 0 0 0-3.302 1.487l-.004-.003v14.035a3.215 3.215 0 0 0 2.289-1.033c.598-.596 5.882-5.99 5.714-9.663z" />
                        </g>
                        <path class="broken-heart--crack" fill="none" stroke="#FFF" stroke-miterlimit="10"
                            d="M29.865 18.205v14.573" />
                    </svg>
                    <div class="effect-group">
                        <span class="effect"></span>
                        <span class="effect"></span>
                        <span class="effect"></span>
                        <span class="effect"></span>
                        <span class="effect"></span>
                    </div>
                </div>
            </a>
            <!-- add product to favorite if not added to favorite  -->
            <a class="button one inactive mobile button--secondary wishlist-btn mx-1"
                @click="moveProductToWishList(product)" v-else>
                <div class="btn__effect">
                    <svg class="heart-stroke icon-svg icon-svg--size-4 icon-svg--color-silver" viewBox="20 18 29 28"
                        aria-hidden="true" focusable="false">
                        <path
                            d="M28.3 21.1a4.3 4.3 0 0 1 4.1 2.6 2.5 2.5 0 0 0 2.3 1.7c1 0 1.7-.6 2.2-1.7a3.7 3.7 0 0 1 3.7-2.6c2.7 0 5.2 2.7 5.3 5.8.2 4-5.4 11.2-9.3 15a2.8 2.8 0 0 1-2 1 3.4 3.4 0 0 1-2.2-1c-9.6-10-9.4-13.2-9.3-15 0-1 .6-5.8 5.2-5.8m0-3c-5.3 0-7.9 4.3-8.2 8.5-.2 3.2.4 7.2 10.2 17.4a6.3 6.3 0 0 0 4.3 1.9 5.7 5.7 0 0 0 4.1-1.9c1.1-1 10.6-10.7 10.3-17.3-.2-4.6-4-8.6-8.4-8.6a7.6 7.6 0 0 0-6 2.7 8.1 8.1 0 0 0-6.2-2.7z">
                        </path>
                    </svg>
                    <svg class="heart-full icon-svg icon-svg--size-4 icon-svg--color-blue" viewBox="0 0 19.2 18.5"
                        aria-hidden="true" focusable="false">
                        <path
                            d="M9.66 18.48a4.23 4.23 0 0 1-2.89-1.22C.29 10.44-.12 7.79.02 5.67.21 2.87 1.95.03 5.42.01c1.61-.07 3.16.57 4.25 1.76A5.07 5.07 0 0 1 13.6 0c2.88 0 5.43 2.66 5.59 5.74.2 4.37-6.09 10.79-6.8 11.5-.71.77-1.7 1.21-2.74 1.23z">
                        </path>
                    </svg>
                    <svg class="broken-heart" xmlns="http://www.w3.org/2000/svg" width="48" height="16"
                        viewBox="5.707 17 48 16">
                        <g fill="#dc3545">
                            <path class="broken-heart--left"
                                d="M29.865 32.735V18.703a4.562 4.562 0 0 0-3.567-1.476c-2.916.017-4.378 2.403-4.538 4.756-.118 1.781.227 4.006 5.672 9.737a3.544 3.544 0 0 0 2.428 1.025l-.008-.008.013-.002z" />
                            <path class="broken-heart--right"
                                d="M37.868 22.045c-.135-2.588-2.277-4.823-4.697-4.823a4.258 4.258 0 0 0-3.302 1.487l-.004-.003v14.035a3.215 3.215 0 0 0 2.289-1.033c.598-.596 5.882-5.99 5.714-9.663z" />
                        </g>
                        <path class="broken-heart--crack" fill="none" stroke="#FFF" stroke-miterlimit="10"
                            d="M29.865 18.205v14.573" />
                    </svg>
                    <div class="effect-group">
                        <span class="effect"></span>
                        <span class="effect"></span>
                        <span class="effect"></span>
                        <span class="effect"></span>
                        <span class="effect"></span>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['product'],
    methods: {
        addToWishlist() {
            this.$store.dispatch('wishlist/addProductToWishlist', this.product)
        },
        moveProductToWishList() {
            this.$store.dispatch('cart/moveProductToWishList', this.product)
        },
    }

}
</script>
<style lang="scss" scoped>
.new-wishlist-method {
    // VARIABLES
    // colours
    $red: #dc3545;
    $silver: #cccccc;
    // fireworks
    $fireworks--width: 3px;
    $fireworks--height: 3px;
    $fireworks--border: $fireworks--width/2;

    // button styles
    .button--secondary,
    .button--secondary:visited {
        border-radius: 3px;
        position: relative;
        left: 8px;
        cursor: pointer;
        display: inline-block;
        // min-width: 48px;
        font-family: inherit;
        font-size: inherit;
        line-height: 15px;
        outline: none;
        text-align: center;
        text-decoration: none;
        text-shadow: none;
        transition: background 0.1s linear;
        font-weight: 400;
        color: $red;
        background: #fff;

        box-shadow: none;
        font-size: 32px !important;
        // padding: 15px 15px;
        transition-property: border;
        transition-timing-function: ease-in-out;
        transition-duration: 0.15s;
    }

    .button--full-width {
        min-width: 385px;
    }

    .icon-with-text {
        display: inline-flex;
        align-items: flex-start;
    }

    .icon-with-text__icon {
        flex-shrink: 0;
        margin-right: 8px;
        margin-top: -2px;
    }

    .icon-svg--color-silver {
        fill: $silver;
        color: $silver;
    }

    .icon-svg--color-blue {
        fill: $red;
        color: $red;
    }

    .icon-svg {
        display: inline-block;
        vertical-align: middle;
        height: 16px;
        width: 16px;
    }

    // position the active state heart
    .heart-full {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }

    // firework effect styles
    .btn__effect {
        display: inline-block;
        position: relative;
    }

    .effect-group {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: rotate(25deg);

        .effect {
            display: block;
            position: absolute;
            top: 38%;
            left: 50%;
            width: 20px;
            transform-origin: 0px 2px;

            &:nth-child(2) {
                transform: rotate(72deg);
            }

            &:nth-child(3) {
                transform: rotate(72 * 2deg);
            }

            &:nth-child(4) {
                transform: rotate(72 * 3deg);
            }

            &:nth-child(5) {
                transform: rotate(72 * 4deg);
            }

            &:before {
                content: "";
                display: block;
                position: absolute;
                right: 0;
                border-radius: $fireworks--border;
                height: $fireworks--height;
                background: #dc3545;
            }

            &:after {
                content: "";
                display: block;
                position: absolute;
                top: 10px;
                right: 10%;
                border-radius: 50%;
                width: $fireworks--width;
                height: $fireworks--height;
                background: #ff6600;
                transform: scale(0, 0);
            }
        }
    }

    // TRIGGER ANIMATIONS
    // Generic
    .active {
        .heart-stroke {
            opacity: 0;
        }

        .heart-full {
            opacity: 1;
        }

        .icon-svg {
            animation: bounceIn 0.5s linear;
        }

        .effect:before {
            animation: fireworkLine 0.5s linear 0.1s;
        }

        .effect:after {
            animation: fireworkPoint 0.5s linear 0.1s;
        }
    }

    //cracking heart
    .broken-heart {
        position: absolute;
        left: -16px;
        top: 0;
        opacity: 0;

        &--left {
            transform: rotate(0deg);
            transform-origin: 60% 200%;
        }

        &--right {
            transform: rotate(0deg);
            transform-origin: 63% 200%;
        }

        &--crack {
            stroke-dasharray: 15;
            stroke-dashoffset: 15;
        }
    }

    .deactivate {
        .broken-heart {
            opacity: 1;
        }

        .broken-heart--left {
            animation: crackLeft 0.35s cubic-bezier(0.68, -0.55, 0.265, 2.85) 0.15s forwards,
                hide 0.25s ease-in 0.55s forwards;
        }

        .broken-heart--right {
            animation: crackRight 0.35s cubic-bezier(0.68, -0.55, 0.265, 2.85) 0.15s forwards,
                hide 0.25s ease-in 0.55s forwards;
        }

        .broken-heart--crack {
            animation: crack 0.2s ease-in forwards;
        }
    }

    // Variation One
    .button.one.desktop:not(.active):hover {
        .heart-stroke {
            animation: pulse 1s ease-out infinite;
        }
    }

    .button.one.inactive .heart-full {
        //animation: wiltT .5s ease-in forwards;
    }

    // Variation Two
    .button.two.desktop:not(.active):hover {
        .heart-stroke {
            animation: pulseBlue 1s ease-out infinite;
        }
    }

    // ANIMATIONS

    // subtle heart pulse on hover (grey)
    @keyframes pulse {
        0% {
            opacity: 1;
            transform-origin: center center;
            transform: scale(1);
        }

        50% {
            opacity: 0.6;
            transform: scale(1.15);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    // subtle heart pulse on hover (grey to blue)
    @keyframes pulseBlue {
        0% {
            transform-origin: center center;
            transform: scale(1);
            fill: $silver;
        }

        50% {
            transform: scale(1.15);
            fill: $red;
        }

        100% {
            transform: scale(1);
            fill: $silver;
        }
    }

    // fireworks animations
    @keyframes fireworkLine {
        0% {
            right: 20%;
            transform: scale(0, 0);
        }

        25% {
            right: 20%;
            width: 6px;
            transform: scale(1, 1);
        }

        35% {
            right: 0;
            width: 35%;
        }

        70% {
            right: 0;
            width: 4px;
            transform: scale(1, 1);
        }

        100% {
            right: 0;
            transform: scale(0, 0);
        }
    }

    @keyframes fireworkPoint {
        30% {
            transform: scale(0, 0);
        }

        60% {
            transform: scale(1, 1);
        }

        100% {
            transform: scale(0, 0);
        }
    }

    @keyframes bounceIn {
        0% {
            transform: scale(0);
        }

        30% {
            transform: scale(1.25);
        }

        50% {
            transform: scale(0.9);
        }

        70% {
            transform: scale(1.1);
        }

        80% {
            transform: scale(1);
        }
    }

    // WIP deactivate state
    @keyframes crackLeft {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(-45deg);
        }
    }

    @keyframes crackRight {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(45deg);
        }
    }

    @keyframes crack {
        0% {
            stroke-dasharray: 15;
            stroke-dashoffset: 15;
        }

        80% {
            stroke-dasharray: 15;
            stroke-dashoffset: 0;
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    @keyframes hide {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
}
</style>