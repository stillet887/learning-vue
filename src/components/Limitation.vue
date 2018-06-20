<template>
  <div class="limitation">
    <div class="limitation__wrapper">
      <transition name="opacity">
        <div class="limitation__outer"
             @wheel.capture.stop>
          <input class="limitation__input"
                 type="text"
                 :value="currentLimit"
                 @keyup.enter="enterNewValue"
                 @blur="revertOldValue"
                 ref="limitInput">
        </div>
      </transition>
      <div class="limitation__title">Users per page</div>
    </div>
  </div>
</template>

<script>
  import knob from 'jquery-knob'
  import $ from 'jquery'

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
      count: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        limitInput: null
      }
    },
    computed: {
      knobConfig() {
        return {
          fgColor: '#ffffff',
          displayPrevious: true,
          width: 100,
          skin: 'tron',
          thickness: '.28',
          bgColor: 'rgba(0, 0, 0, 1)',
          angleArc: '270',
          angleOffset: '180',
          max: this.count,
          min: 1,
          change: val => {
            this.changeLimit(val);
          }
        }
      }
    },
    watch: {
      'count': 'changeMaxLimit'
    },
    methods: {
      changeMaxLimit() {
        this.limitInput.trigger('configure', this.knobConfig);
        if(this.count < this.currentLimit) {
          this.$emit('selectLimit', this.count);
        }
      },
      changeLimit(val) {
        this.$emit('selectLimit', Math.round(val));
      },
      enterNewValue(){
        this.changeLimit(+this.$refs.limitInput.value);
      },
      revertOldValue() {
        this.$refs.limitInput.value = this.currentLimit;
      }
    },
    mounted() {
      this.limitInput =  $(this.$refs.limitInput);
      this.limitInput.knob(this.knobConfig);
    }
  }
</script>

<style lang="less">
  .limitation {
    &__wrapper {
      position: relative;
    }

    &__outer {
      opacity: .8;
      transition: opacity .2s;

      &:hover {
        opacity: 1;
      }
    }

    &__input {
      outline: none;
    }

    &__title {
      width: 125px;
      position: absolute;
      top: 61px;
      left: 61px;
      font-size: 20px;
    }
  }

  canvas {
    cursor: pointer;
  }

  .opacity-enter-active {
    transition: opacity .3s ease-in;
  }

  .opacity-enter {
    opacity: 0;
  }
</style>
