<template>
  <div class="limitation">
    <div class="limitation__items-name">
      {{ itemsName }} on page:
    </div>
    <span class="limitation__step"
          :class="{'_disabled': !decreaseAvailable}"
          @click="decreaseLimit">
      -{{ step }}
    </span>
    <span class="limitation__current">
      {{ currentLimit }}
    </span>
    <span class="limitation__step"
          :class="{'_disabled': !increaseAvailable}"
          @click="increaseLimit">
      +{{ step }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'Limitation',
    model: {
      prop: 'currentLimit',
      event: 'selectLimit'
    },
    props: {
      currentLimit: {
        type: Number,
        required: true
      },
      step: {
        type: Number,
        default: 5
      },
      count: {
        type: Number,
        required: true
      },
      itemsName: {
        type: String,
        default: 'Items'
      }
    },
    computed: {
      increaseAvailable() {
        return this.currentLimit < this.count;
      },
      decreaseAvailable() {
        return this.currentLimit - this.step > 0;
      }
    },
    methods: {
      increaseLimit() {
        if (this.increaseAvailable){
          const newLimit = this.currentLimit + this.step;
          this.$emit('selectLimit', newLimit)
        }
      },
      decreaseLimit() {
        if (this.decreaseAvailable){
          const newLimit = this.currentLimit - this.step;
          this.$emit('selectLimit', newLimit)
        }
      }
    }
  }
</script>

<style lang="less">
  .limitation {
    text-align: center;

    &__items-name {
      font-size: 14px;
    }

    &__step {
      font-size: 25px;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.5);
      transition: color .2s;

      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }

      &._disabled {
        color: rgba(0, 0, 0, 0.2);
        cursor: not-allowed;
      }
    }

    &__current {
      font-size: 35px;
    }
  }
</style>
