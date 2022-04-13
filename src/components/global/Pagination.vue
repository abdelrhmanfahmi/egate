<template>
  <div class="">
    <nav aria-label="Page navigation" v-if="shouldRender">
      <!-- <nav aria-label="Page navigation"> -->
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage < 2 }">
          <router-link
            class="page-link page-link-prev"
            :to="getPageUrl(currentPage - 1)"
          >
            <span aria-hidden="true">
              <i class="icon-long-arrow-left"></i> </span
            >Prev
          </router-link>
        </li>

        <template v-if="pagesToBeShown.length">
          <li
            class="page-item"
            @click="clearScroll"
            v-for="page in pagesToBeShown"
            :key="`page-${page}`"
          >
            <router-link
              class="page-link"
              exact-active-class="active"
              :to="getPageUrl(page)"
              >{{ page }}</router-link
            >
          </li>
        </template>

        <li class="page-item-total pl-3" v-if="lastPage > 3">
          of {{ lastPage }}
        </li>

        <li class="page-item" :class="{ disabled: currentPage === lastPage }">
          <router-link
            class="page-link page-link-next"
            :to="getPageUrl(currentPage + 1)"
          >
            Next
            <span aria-hidden="true">
              <i class="icon-long-arrow-right"></i>
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  props: {
    perPage: Number,
    total: Number,
  },
  computed: {
    shouldRender: function () {
      return this.total > this.perPage;
    },
    currentPage: function () {
      return parseInt(this.$route.query.page ? this.$route.query.page : 1);
    },
    lastPage: function () {
      return (
        parseInt(this.total / this.perPage) +
        (this.total % this.perPage ? 1 : 0)
      );
    },
    startIndex: function () {
      if (!this.currentPage % this.perPage) {
        return this.currentPage;
      }
      return this.perPage * parseInt(this.currentPage / this.perPage);
    },
    pagesToBeShown: function () {
      let pageNumbers = [];
      this.pageCount =
        Math.floor(this.total / this.perPage) +
        (0 < this.total % this.perPage ? 1 : 0);

      for (let i = -1; i < 2 && this.pageCount >= 3; i++) {
        if (1 < this.currentPage && this.currentPage < this.pageCount)
          pageNumbers.push(this.currentPage + i);
        if (1 === this.currentPage) pageNumbers.push(this.currentPage + i + 1);
        if (this.currentPage === this.pageCount)
          pageNumbers.push(this.currentPage + i - 1);
      }

      for (let i = 0; i < this.pageCount && this.pageCount < 3; i++) {
        pageNumbers.push(i + 1);
      }
      return pageNumbers;
    },
  },
  methods: {
    getPageUrl: function (page) {
      let originQuery = {};
      for (let key in this.$route.query) {
        if (key !== "page") {
          originQuery[key] = this.$route.query[key];
        }
      }
      if (page > 1) {
        originQuery.page = page;
      }

      return {
        path: this.$route.path,
        query: originQuery,
      };
    },
    backMe() {
      window.history.back();
    },
    clearScroll() {
      localStorage.setItem("scrollpos", 0);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
<style lang="scss">
/* Pagination */
$primary-color: #ffb63e;
.pagination {
  border-radius: 0;
  align-items: center;
  margin: 2rem 0;

}

.page-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3rem;
  height: 4rem;
  font-weight: 400;
  font-size: 1.4rem;
  padding: 0 0.3rem;
  line-height: 1;
  color: #706f6c;
  border-radius: 0.3rem;
  background-color: transparent;
  border: 0.1rem solid transparent;

  i {
    font-size: 1.5rem;
  }

  &.page-link-prev {
    margin-right: 1.7rem;
    i {
      margin-left: 0;
      margin-right: 1rem;
    }
  }

  &.page-link-next {
    margin-left: 1.8rem;

    i {
      margin-left: 1rem;
      margin-right: 0;
    }
  }

  &.page-link-prev,
  &.page-link-next {
    padding-left: 1rem;
    padding-right: 1rem;
    min-width: 70px;
  }

  &:hover {
    box-shadow: none;
    color: inherit;
    border-color: #ebebeb;
    text-decoration: none;
    background-color: transparent;
    outline: none !important;
  }
  &:focus {
    outline: none !important;
    color: inherit;
    box-shadow: none;
  }

  &.active {
    color: $primary-color;
    background-color: transparent;
    border-color: #ebebeb;
  }
}

.page-item-total {
  color: #cccccc;
  font-size: 1.4rem;
  font-weight: 400;
  margin-left: 1.2rem;
  white-space: nowrap;
  margin-bottom: 15px;
}

.page-item {
  & + .page-item {
    margin-left: 0.4rem;
  }

  &:first-child .page-link {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
  }

  &:last-child .page-link {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }

  &.disabled .page-link {
    border-color: transparent;
    color: #eaeaea;
  }
}

</style>