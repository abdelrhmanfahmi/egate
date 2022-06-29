<template>
  <div class="category-card">
    <div>

      <b-img-lazy
        v-bind="mainProps"
        :src="image"
        
        fluid
      ></b-img-lazy>
    </div>

    <div class="card-footer">
      <span class="font-weight-bold">{{ card.type }}</span>
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
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.category-card {
  color: #fff;
  border-radius: 0.25rem;
  margin: 0 10px;
  // border: 1px solid rgba(0, 0, 0, 0.125);
  img {
    min-width: 200px;
    height: 200px;
    -o-object-fit: cover;
    object-fit: cover;
    background-size: cover;
    width: 100%;
    opacity: 1;
    transition: all .3s ease-in-out;
    &:hover{
      opacity: .5;
    }
  }

  .card-footer {
    text-align: center;
    font-size: 19px;
    background: transparent;
    color: #000;
    border: none;
  }
}
</style>
