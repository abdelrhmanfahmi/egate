<template>
  <ul class="pagination">
    <!-- pagination component   -->
    <li class="pagination-item first-page">
      <a
        @click.prevent="onClickFirstPage"
        :class="isInFirstPage ? 'disabled' : ''"
        :disabled="isInFirstPage"
        ><font-awesome-icon icon="fas fa-angle-double-left   "
      /></a>
    </li>
    <li class="pagination-item next-step">
      <a
        @click.prevent="onClickPreviousPage"
        :class="isInFirstPage ? 'disabled' : ''"
        :disabled="isInFirstPage"
        ><font-awesome-icon icon="fas fa-chevron-left"
      /></a>
    </li>
    <li
      :key="page.id"
      v-for="page in pages"
      class="pagination-item"
      :class="{ active: isPageActive(page.name) }"
    >
      <a
        @click.prevent="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        >{{ page.name }}</a
      >
    </li>
    <li class="pagination-item next-step">
      <a
        @click.prevent="onClickNextPage"
        :class="isInLastPage ? 'disabled' : ''"
        :disabled="isInLastPage"
        ><font-awesome-icon icon="fas fa-chevron-right"
      /></a>
    </li>
    <li class="pagination-item last-page">
      <a
        @click.prevent="onClickLastPage"
        :class="isInLastPage ? 'disabled' : ''"
        :disabled="isInLastPage"
        ><font-awesome-icon icon="fas fa-angle-double-right"
      /></a>
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
      this.$emit("pageChanged", 1);
    },
    /**
     * @vuese
     * on Click Previous Page function
     */
    onClickPreviousPage() {
      if (this.isInFirstPage) {
        return false;
      }
      this.$emit("pageChanged", this.currentPage - 1);
      // this.goUp()
    },
    /**
     * @vuese
     * on Click Page function
     */
    onClickPage(page) {
      // change page , call api again
      this.$emit("pageChanged", page);
      // this.goUp()
    },
    /**
     * @vuese
     * on Click Next Page function
     */
    onClickNextPage() {
      if (this.isInLastPage) {
        return false;
      }
      this.$emit("pageChanged", this.currentPage + 1);
      // this.goUp()
    },
    /**
     * @vuese
     * on Click last Page function
     */
    onClickLastPage() {
      if (this.isInLastPage) {
        return false;
      }
      //get total pages again
      this.$emit("pageChanged", this.totalPages);
      // this.goUp()
    },
    /**
     * @vuese
     * check is Page Active function
     */
    isPageActive(page) {
      return this.currentPage === page;
    },
    goUp() {
      window.scrollTo({
        left: 0,
        top: 200,
        behavior: "smooth",
      });
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
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      background: #f5f5f5;
      text-align: center;
      margin: 0 5px;

      &.active {
        background-color: #fff;
        border: 2px solid $main-color;
        color: $main-color !important;
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
.first-page a,
.last-page a {
  background-color: #4c4c4c !important;
  border-radius: inherit;
  color: #fff !important;
}
.next-step a {
  background-color: #d1d1d1 !important;
}
</style>
