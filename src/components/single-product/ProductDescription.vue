<template>
    <div>
        <!-- product description  -->
        <p class="description" v-if="myProduct.description !== null" v-html="myProduct.description"></p>
    </div>
</template>

<script>
export default {
    /**
        *  pass product data as prop
     */
    props:['myProduct']
}
</script>
