<template>
  <div class="pages-container">
    <ul class="pages">
      <li class="page"
          :class="{'_current': page === currentPage }"
          v-for="page in pagesCount"
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
    methods: {
      selectPage(page) {
        this.$emit('selectPage', page)
      }
    },
    computed: {
      pagesCount() {
        return Math.ceil(this.count / this.limit);
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
    overflow: scroll;
    white-space: nowrap;
    padding: 0 20px;
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
