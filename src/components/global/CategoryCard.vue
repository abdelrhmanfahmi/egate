<template>
  <div class="category-card">
    <div>
      <b-img
        src="https://humhum.work/user-interface/public/assets/img/slider/ni1111.png"
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
  },
};
</script>

<style lang="scss" scoped>
.category-card {
  color: #fff;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);

  .card-footer {
    text-align: center;
    font-size: 19px;
    background: #ed2124;
  }
}
</style>