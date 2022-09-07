<template>
    <div>
        <p class="description" v-if="myProduct.description !== null" v-html="myProduct.description"></p>
    </div>
</template>

<script>
export default {
    props:['myProduct']
}
</script>

<style>
</style>