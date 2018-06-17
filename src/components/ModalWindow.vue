<template>
  <transition name="modal">
  <div class="modal">
    <div class="modal__wrapper">
      <div class="modal__header">
        <div class="modal__title">
          <slot name="header" class="modal__header">
            Modal Window
          </slot>
        </div>

        <button class="modal__button close-button"
                type="button"
                @click="$emit('close')">
          <div class="close-button__icon"/>
        </button>
      </div>

      <div class="modal__body">
        <slot>
          Modal body
        </slot>
      </div>

    </div>
  </div>
  </transition>
</template>

<script>
  export default {
    name: 'ModalWindow'
  }
</script>

<style lang="less">
  @import (less) "../styles/media";

  @headerHeight: 70px;
  @horizontalPadding: 20px;
  @verticalPadding: 20px;

  .modal {
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.2);
    background-size: cover;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-size: cover;
      opacity: 0.4;

      .winter-theme & {
        background-image: url(../assets/winter/modal.gif);
        opacity: .5;
      }

      .autumn-theme & {
        background-image: url(../assets/autumn/modal.gif);
      }

      .spring-theme & {
        background-image: url("../assets/spring/modal.gif");
      }

      .summer-theme & {
        background-image: url("../assets/summer/modal.gif");
        opacity: 0.3;
        filter: hue-rotate(-40deg);
      }
    }


    &::after {
      .spring-theme & {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background-size: contain;
        background-image: url("../assets/spring/modal.gif");
        background-position: 30%;
        opacity: .8;
      }
    }

    &__wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 75vw;

      @media @phone-strict {
        min-width: 75vw;
      }
    }

    &__header {
      background: rgba(0, 0, 0, 0.8);
      box-shadow: inset 0 0 100px 0 rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.7);
      margin-bottom: 5px;
      position: relative;
      left: -30px;
      letter-spacing: 2px;
      word-spacing: 5px;
      color: white;
    }

    &__title {
      text-transform: uppercase;
      margin-bottom: 10px;
      padding: 0 10px;
      display: inline-block;
      font-size: 20px;
      margin-right: 100px;
      padding-top: calc(~'@{verticalPadding} - 10px');

      @media @tablet {
        font-size: 30px;
        padding: 0 @horizontalPadding;
      }
    }

    &__body {
      padding: 30px;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: inset 0 0 25px 10px rgba(0, 0, 0, 0.3);
    }

    &__button {
      position: absolute;
      top: -15px;
      right: -44px;

      @media @tablet {
        top: -35px;
        right: -55px;
      }
    }
  }

  .close-button {
    background: none;
    outline: none;
    width: 40px;
    height: 40px;
    padding: 0;
    cursor: pointer;
    overflow: hidden;
    transition: opacity .3s, max-height .1s;
    border: 1px solid rgba(255, 255, 255, 0.7);
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    box-shadow: inset 0 0 50px 2px rgba(255, 255, 255, 0.3);

    @media @tablet {
      width: 50px;
      height: 50px;
    }

    &__icon {
      background: url(../assets/close_icon.png);
      background-size: 50px;
      max-height: 23px;
      width: 40px;
      height: 40px;
      opacity: .7;
      background-position: -6px -5px;

      @media @tablet {
        max-height: 30px;
        width: 50px;
        height: 50px;
        transition: opacity .2s, max-height .3s;
        background-position: 0 0;
      }

      &:hover {
        max-height: 50px;
        opacity: 1;
      }
    }
  }


  .modal-parts-effect() {
    transition: opacity 1s, transform .5s;
  }

  .modal-enter-active {
    transition: opacity  1s ease-in;

    .modal__header,
    .modal__body,
    .close-button {
      .modal-parts-effect;
    }
  }

  .modal-leave-active {
    transition: opacity 1.5s ease-in;

    .modal__header,
    .modal__body,
    .close-button {
      .modal-parts-effect;
    }
  }

  .modal-enter, .modal-leave-to {
    opacity: 0;
    box-shadow: none;

    .modal__header {
      opacity: 0;
      transform: translate(-100px, -100px);
    }

    .close-button {
      opacity: 0;
      transform: translate(100px, -100px);
    }

    .modal__body {
      opacity: 0;
      transform: translate(100px, 100px);
    }
  }

</style>
