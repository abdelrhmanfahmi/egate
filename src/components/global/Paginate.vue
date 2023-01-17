<template>
  <ul class="pagination">
    <!-- pagination component   -->
    <li class="pagination-item">
      <a href="#" @click.prevent="onClickFirstPage" :class="isInFirstPage ? 'disabled' : ''"
        :disabled="isInFirstPage"><font-awesome-icon icon="fas fa-angle-double-left   " /></a>
    </li>
    <li class="pagination-item">
      <a href="#" @click.prevent="onClickPreviousPage" :class="isInFirstPage ? 'disabled' : ''"
        :disabled="isInFirstPage"><font-awesome-icon icon="fas fa-chevron-left" /></a>
    </li>
    <li :key="page.id" v-for="page in pages" class="pagination-item" :class="{ active: isPageActive(page.name) }">
      <a href="#" @click.prevent="onClickPage(page.name)" :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }">{{ page.name }}</a>
    </li>
    <li class="pagination-item">
      <a href="#" @click.prevent="onClickNextPage" :class="isInLastPage ? 'disabled' : ''"
        :disabled="isInLastPage"><font-awesome-icon icon="fas fa-chevron-right" /></a>
    </li>
    <li class="pagination-item">
      <a href="#" @click.prevent="onClickLastPage" :class="isInLastPage ? 'disabled' : ''"
        :disabled="isInLastPage"><font-awesome-icon icon="fas fa-angle-double-right" /></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "pagination",
  /**
   * props
   */
  props: {
    // maxVisibleButtons prop
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      // totalPages prop
      type: Number,
      required: true,
    },
    perPage: {
      // perPage prop
      type: Number,
      required: true,
    },
    currentPage: {
      // currentPage prop
      type: Number,
      required: true,
    },
  },
  computed: {
    /**
     * @vuese
     * check if page is first
     */
    isInFirstPage() {
      return this.currentPage === 1;
    },
    /**
    * @vuese
    * check if page is  last
    */
    isInLastPage() {
      if (this.totalPages === 0) {
        return true;
      }
      return this.currentPage === this.totalPages;
    },
    /**
     * @vuese
     * startPage function
     */
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.totalPages < this.maxVisibleButtons) {
        return 1;
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      // When in between
      return this.currentPage - 1;
    },
    /**
     * @vuese
     * endPage function
     */
    endPage() {
      if (this.totalPages === 0) {
        return 1;
      }
      if (this.totalPages < this.maxVisibleButtons) {
        return this.totalPages;
      }
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    /**
     * @vuese
     * check pages function
     */
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i++) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
  },
  methods: {
    /**
     * @vuese
     * on Click First Page function
     */
    onClickFirstPage() {
      if (this.isInFirstPage) {
        return false;
      }
      this.$emit("pagechanged", 1);
    },
    /**
    * @vuese
    * on Click Previous Page function
    */
    onClickPreviousPage() {
      if (this.isInFirstPage) {
        return false;
      }
      this.$emit("pagechanged", this.currentPage - 1);
    },
    /**
     * @vuese
     * on Click Page function
     */
    onClickPage(page) {
      // change page , call api again
      this.$emit("pagechanged", page);
    },
    /**
     * @vuese
     * on Click Next Page function
     */
    onClickNextPage() {
      if (this.isInLastPage) {
        return false;
      }
      this.$emit("pagechanged", this.currentPage + 1);
    },
    /**
     * @vuese
     * on Click last Page function
     */
    onClickLastPage() {
      console.log("onClickLastPage");
      if (this.isInLastPage) {
        return false;
      }
      //get total pages again
      this.$emit("pagechanged", this.totalPages);
    },
    /**
     * @vuese
     * check is Page Active function
     */
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>
<style lang="scss" scoped>
/**
    * component style 
  */
.pagination {
  list-style-type: none;
  float: right;
  margin: 10px 0;
  font-size: 20px;

  .pagination-item {

    a {
      text-decoration: none;
      margin: 10px;
      color: #2c3e50;

      display: inline-block;
      color: #ddd;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border-radius: 50%;
      background: #4f4f4f6e;
      text-align: center;
      margin: 0 9px;

      &.active {
        background-color: tomato;
        color: #ffffff !important;
        font-weight: bold;

        // padding: 3px 8px;
        a {
          color: #fff;
        }
      }
    }

    a.disabled {
      color: #ccc;
      cursor: no-drop !important;
    }


  }
}

button[disabled],
html input[disabled] {
  cursor: no-drop !important;
  color: lightgray;
}
</style>
