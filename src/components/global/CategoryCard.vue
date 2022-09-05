<template>
  <div class="category-card">
    <div>
      <b-img-lazy v-bind="mainProps" :src="image" fluid></b-img-lazy>
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
        blankColor: "#eee",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.category-card {
  color: #fff;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  transition: all 0.3s ease-out;

  &:hover {
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    transform: translateY(-5px);
    border: 1px solid #cccccc;
    background-color: white;
  }

  img {
    //min-width: 350px;
    width: 100% !important;
    height: 150px;
    -o-object-fit: cover;
    object-fit: cover;
    background-size: cover;
    width: 100%;
    opacity: 1;
    transition: all .3s ease-in-out;

    &:hover {
      opacity: .5;
    }
  }

  .card-footer {
    text-align: center;
    font-size: 19px;
    background: #ed2124;

    @media(min-width:767px) and (max-width:1340px) {
      font-size: 14px;
    }
  }
}
</style>
