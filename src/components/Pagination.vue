<template>
  <div class="pages-container">
    <ul class="pages">
      <li class="page"
          :class="{'_current': page === currentPage }"
          v-for="page in pagesCount"
          :key="page"
          @click="selectPage(page)">
        <div class="page__number">
          {{ page }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    model: {
      prop: 'currentPage',
      event: 'selectPage'
    },
    props: {
      count: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      },
      limit: {
        type: Number,
        required: true
      }
    },
    computed: {
      pagesCount() {
        return Math.ceil(this.count / this.limit);
      }
    },
    watch: {
      pagesCount() {
        if(this.currentPage > this.pagesCount) {
          this.selectPage(this.pagesCount);
        }
      }
    },
    methods: {
      selectPage(page) {
        this.$emit('selectPage', page)
      }
    }
  }
</script>

<style lang="less">
  .pages-container {
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    display: inline-block;
    height: 75px;
    overflow: hidden;
    max-width: 100%;
  }

  .pages {
    color: white;
    list-style-type: none;
    height: 75px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 0 20px 100px;
  }

  .page {
    display: inline-block;
    border: 1px solid white;
    padding: 5px 10px;
    margin: 5px;
    background: rgba(255, 255, 255, 0);
    cursor: pointer;
    transition: background .3s, padding .3s, color .3s;

    &._current {
      background: rgba(255, 255, 255, 0.7);
      color: black;
      font-weight: bold;
      font-size: 20px;
      padding: 7px 15px;
    }

    &:not(._current){
      &:hover {
         background: rgba(255, 255, 255, 0.3);
         padding: 6px 12px;
       }
    }
  }
</style>
