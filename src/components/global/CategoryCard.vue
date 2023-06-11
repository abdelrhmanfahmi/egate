<template>
  <div class="category-card">
    <!-- category card  -->
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
  /**
   * props
   */
  props: {
    //card prop
    card: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    // image prop
    image: {
      type: String,
      required: true,
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
/**
    * page style 
  */
.category-card {
  color: #fff;
  border-radius: 5px;
  transition: all 0.3s ease-out;
  margin: 5px 10px;

  &:hover {
    img{
      transform: translateY(-5px);
      border: 4px solid $main-color;
    }
  }

  img {
    width: 100% !important;
    height: 270px;
    -o-object-fit: cover;
    object-fit: cover;
    background-size: cover;
    width: 100%;
    opacity: 1;
    transition: all 0.3s ease-in-out;
    border-radius: 5px;

    &:hover {
      opacity: 1;
    }
  }

  .card-footer {
    text-align: center;
    font-size: 19px;
    background: transparent;
    color: #000;
    border-top: none;

    @media (min-width: 767px) and (max-width: 1450px) {
      font-size: 14px;
    }
  }
}
</style>
