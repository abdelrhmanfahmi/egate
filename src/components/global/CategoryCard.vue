<template>
  <div class="category-card">
    <div>
      <b-img-lazy :src="image" class="img-fluid"></b-img-lazy>
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
    image: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.category-card {
  color: #fff;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  img {
    min-width: 350px;
    height: 210px;
    -o-object-fit: cover;
    object-fit: cover;
    background-size: cover;
    width: 100%;
  }

  .card-footer {
    text-align: center;
    font-size: 19px;
    background: #ed2124;
  }
}

</style>
