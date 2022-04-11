<template>
  <div class="category-card">
    <div>
      <b-img
        :src="image"
      ></b-img>
    </div>

    <div class="card-footer">
      <small>{{ card.type }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => {
        return {};
      },
    },
    image:{
      type:String
    }
  },
};
</script>

<style lang="scss" scoped>
.category-card {
  color: #fff;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  img {
    width: 100%;
    height: 43vh;
  }

  .card-footer {
    text-align: center;
    font-size: 19px;
    background: #ed2124;
  }
}
</style>