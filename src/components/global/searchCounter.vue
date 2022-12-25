<template>
    <div class="product-counter">
        <!-- search component  -->
        <div class="actions d-flex">
            <button class="product-counter-btn" @click="decrementQuantity">
                <b-icon-dash />
            </button>

            <div class="value">
                <main>
                    <!-- @slot Use this slot header -->
                    <slot name="main">
                        <span class="product-counter-number"> {{ countValue }}</span>
                    </slot>
                </main>
            </div>
            <button class="product-counter-btn" @click="incrementQuantity">
                <b-icon-plus />
            </button>
        </div>
    </div>
</template>
<script>
import { BIconPlus, BIconDash } from "bootstrap-vue";

export default {
    components: {
        BIconPlus,
        BIconDash,
    },
    data() {
        return {
            countValue: 1,
        };
    },
    /**
      * props
    */
    props: {
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        product: {
            type: Object,
        },
        minimum: {
            type: Number,
            required: true,
            default: 1,
        }
    },
    mounted() {
        /**
            * set this.countValue = this.minimum ? this.minimum : this.quantity
        */  
        this.countValue = this.minimum ? this.minimum : this.quantity;
    },
    methods: {
        incrementQuantity() {
            this.countValue += 1;

            setTimeout(() => {
                this.$emit('changeTitle', this.countValue)
            }, 500);

        },
        decrementQuantity() {
            this.countValue > this.minimum ? this.countValue-- : null;
            setTimeout(() => {
                this.$emit('changeTitle', this.countValue)
            }, 500);

        },
    },
};
</script>
  
<style lang="scss" scoped>
/**
    * component style 
  */
.product-counter {
    display: flex;
    align-items: center;
    justify-content: left;

    .actions {
        color: #606266;

        .product-counter-btn {
            width: 2rem;
            height: 1.75rem;
            border-radius: 0;
            border: none;
            // border: 1px solid transparent;
            color: #606266;
            background: transparent;
            // background: #eef1f2;
            display: flex;
            justify-content: center;
            align-items: center;

            // &:first-child {
            //     border-bottom: 1px solid #dcdcdc;
            // }
        }
    }

    .value {
        border-radius: 0;
        border: 1px solid #f0f0f0;
        color: #544842;
        font-weight: 500;
        width: 3rem;
        // height: 3.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 5px;
    }

    button {
        font-size: 20px;
    }
}
</style>
  