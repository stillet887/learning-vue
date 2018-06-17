<template>
  <div class="limitation">
    <div class="limitation__wrapper">
      <transition name="opacity">
        <div class="limitation__outer"
             @wheel.capture.stop
             v-show="readyToShow">
          <input class="limitation__input"
                 type="text"
                 v-model="currentLimit"
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
        readyToShow: false,
        knobIsInitialized: false
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
      'count': 'knobChange'
    },
    methods: {
      knobChange() {
        if(this.limitInput && this.count) {
          if(!this.knobIsInitialized) {
            this.limitInput.knob(this.knobConfig);
            this.readyToShow = true;
            this.knobIsInitialized = true;
          } else {
            this.limitInput.trigger('configure', this.knobConfig);
            if(this.count < this.currentLimit) {
              this.$emit('selectLimit', this.count);
              this.limitInput.val(this.count);
            }
          }
        } else {
          if(this.$refs.limitInput && this.count) {
            this.limitInput =  $(this.$refs.limitInput);
            this.knobChange();
          } else {
            setTimeout(this.knobChange, 200);
          }

        }
      },

      changeLimit(val) {
        this.$emit('selectLimit', Math.round(val));
      }
    },
    mounted() {
      if (!this.knobIsInitialized) {
        console.log('@@@')
        this.knobChange();
      }
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
