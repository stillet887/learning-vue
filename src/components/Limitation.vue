<template>
  <div class="limitation">
    <div class="limitation__items-name">
      {{ itemsName }} on page:
    </div>
    <span class="limitation__step"
          :class="{'_disabled': currentLimit - step <= 0}"
          @click="decreaseLimit">
      -{{ step }}
    </span>
    <span class="limitation__current">
      {{ currentLimit }}
    </span>
    <span class="limitation__step"
          :class="{'_disabled': currentLimit > count}"
          @click="increaseLimit">
      +{{ step }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'Limitation',
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
    methods: {
      increaseLimit() {
        if (this.currentLimit < this.count){
          this.selectLimit('+')
        }
      },
      decreaseLimit() {
        if (this.currentLimit - this.step > 0){
          this.selectLimit('-')
        }
      },

      selectLimit(direction) {
        let newLimit = null;

        switch (direction) {
          case '+':
            newLimit = this.currentLimit + this.step;
            break;
          case '-':
            newLimit = this.currentLimit - this.step;
            break;
        }

        this.$emit('selectLimit', newLimit)
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
