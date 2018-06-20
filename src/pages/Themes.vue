<template>
  <div class="themes">
    <div class="themes__title header">Themes</div>
    <back-link/>

    <modal-window v-if="changingDialogOpened" @close="cancelChanging">
      <span slot="header">
        Change Theme
      </span>
      <div class="changing-dialog">
        <h2>
          Are you sure you want change theme to {{ currentTheme }}?
        </h2>

        <div class="action-buttons">
          <button class="action-buttons__item"
                  type="button"
                  @click="cancelChanging">
            Cancel
          </button>
          <button class="action-buttons__item"
                  type="button"
                  @click="confirmChanging">
            Confirm
          </button>
        </div>

        <input class="dont-ask-again__checkbox"
               type="checkbox"
               v-model="changeWithoutConfirmation"
               id="changeWithoutConfirmation"/>
        <label class="dont-ask-again__label"
               :class="{'_active': changeWithoutConfirmation}"
               for="changeWithoutConfirmation">
          Don't ask again
        </label>
      </div>
    </modal-window>

    <ul class="themes__list">
      <li class="theme"
          :class="{'_active' : theme === currentTheme}"
          v-for="theme in availableThemes"
          @click="changeTheme(theme)"
          :key="theme">
        <div class="theme__background" :class="`_${theme}`">
          <span class="theme__name">
            {{ theme }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Themes',
    components: {
      BackLink: () => import('@/components/BackLink.vue'),
      ModalWindow: () => import('@/components/ModalWindow.vue')
    },
    data() {
      return {
        availableThemes: [
          'winter',
          'spring',
          'summer',
          'autumn'
        ],
        changeWithoutConfirmation: false,
        changingDialogOpened: false
      }
    },
    computed: {
      currentTheme: {
        get() {
          return this.$store.state.currentTheme;
        },
        set(theme) {
          this.$store.dispatch('changeTheme', theme)
        }
      },
    },
    methods: {
      changeTheme(theme) {
        this.previousTheme = this.currentTheme;
        this.currentTheme = theme;
        this.openModalWindow();
      },
      confirmChanging() {
        this.closeModalWindow();
      },
      cancelChanging() {
        this.currentTheme = this.previousTheme;
        this.closeModalWindow();
      },
      openModalWindow() {
        if (!this.changeWithoutConfirmation) {
          this.changingDialogOpened = true;
        }
      },
      closeModalWindow() {
        this.changingDialogOpened = false;
      }
    }
  }
</script>

<style lang="less">
  @import (less) "../styles/media";

  .themes {
    &__title {
      @media @phone-strict {
        padding-bottom: 30px;
      }
    }

    &__list {
      list-style: none;
      width: 90%;
      margin: 35px auto;
      padding: 0;

      @media @desktop {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }

  .theme {
    @media @desktop {
      width: 40%;
    }

    &._active {
      .theme__background {
        filter: none;
      }

      .theme__name {
        font-size: 30px;
        margin-left: 15px;

        &::before {
          content: '';
          display: block;
          width: 45px;
          height: 45px;
          background: url("../assets/check_icon.png");
          background-size: cover;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(-120%, -50%);
        }
      }
    }

    &__background {
      width: 90%;
      height: calc(~'(100vh - 300px)/4');
      margin: 20px auto;
      background-size: cover;
      border: 3px solid white;
      position: relative;
      filter: contrast(.7) brightness(.8);

      @media screen and (min-device-aspect-ratio: 10/9) {
        min-height: 150px;
      }

      @media @desktop {
        cursor: pointer;
        min-height: 0;
        height: calc(~'(100vh - 300px)/2');
        transition: filter .5s ease-out;

        &:hover {
          filter: none;
        }
      }

      &._winter {
        background-image: url("../assets/winter/background.gif") ;
      }
      &._spring {
        background-image: url("../assets/spring/background.gif") ;
      }
      &._summer {
        background-image: url("../assets/summer/background.gif") ;
        background-position: bottom;
      }
      &._autumn {
        background-image: url("../assets/autumn/background.gif") ;
      }
    }

    &__name {
      color: white;
      font-size: 25px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 15px;
      padding: 5px 5px 5px 12px;
      background: rgba(0, 0, 0, .6);
      line-height: 1.2;
    }
  }

  .dont-ask-again {
    &__label {
      font-size: 16px;
      font-weight: bold;
      position: relative;

      @media @tablet {
        width: 100%;
      }

      &::before {
        position: absolute;
        content: '';
        display: block;
        width: 16px;
        height: 16px;
        background-color: rgba(0, 0, 0, .6);
        top: 4px;
        left: -22px;
        cursor: pointer;
        border-radius: 50%;
        transition: background .5s ease;
      }

      &._active {
        &::before {
          background-color: white;
          background-image: url("../assets/check_icon.png");
          background-size: 100%;
        }
      }
    }

    &__checkbox {
      opacity: 0;
    }
  }
</style>
