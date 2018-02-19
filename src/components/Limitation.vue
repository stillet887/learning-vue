<template>
  <div class="limitation">
    <transition name="opacity">
      <div class="limitation__wrapper"
           @wheel.capture.stop
           v-show="readyToShow">
        <input class="limitation__input"
               type="text"
               v-model="currentLimit"
               id="limit_input">
      </div>
    </transition>
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
    data() {
      return {
        limitInput: null,
        readyToShow: false
      }
    },
    methods: {
      changeLimit(val) {
        this.$emit('selectLimit', Math.round(val));
      }
    },
    mounted() {
      this.limitInput =  $('#limit_input');

      setTimeout(() => {
        this.limitInput.knob({
          fgColor: '#ffffff',
          displayPrevious: true,
          width: 100,
          skin: 'tron',
          thickness: '.38',
          bgColor: 'rgba(0, 0, 0, .5)',
          angleArc: '270',
          angleOffset: '90',
          max: this.count,
          min: 1,
          change: function (val) {
            this.changeLimit(val);
          }.bind(this)
        });

        this.readyToShow = true;
      }, 1000)
    }
  }
</script>

<style lang="less">
  .limitation {
    &__wrapper {
      opacity: .6;
      transition: opacity .2s;

      &:hover {
        opacity: 1;
      }
    }

    &__input {
      outline: none;
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
