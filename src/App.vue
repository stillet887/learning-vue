<template>
  <div id="app" :class="`${currentTheme}-theme`">
    <transition name="fade">
      <router-view>
      </router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    currentTheme: {
      get() {
        return this.$store.state.currentTheme;
      },
      set(theme) {
        this.$store.dispatch('changeTheme', theme)
      }
    }
  },
  methods: {
    autoChooseTheme() {
      const currentMonth = new Date().getMonth();
      switch (currentMonth) {
        case 11:
        case 0:
        case 1:
        {
          this.currentTheme = 'winter';
          break;
        }
        case 2:
        case 3:
        case 4: {
          this.currentTheme = 'spring';
          break;
        }
        case 5:
        case 6:
        case 7: {
          this.currentTheme = 'summer';
          break;
        }
        case 8:
        case 9:
        case 10: {
          this.currentTheme = 'autumn';
          break;
        }
      }
    }
  },
  created() {
    if(!this.currentTheme) {
      this.autoChooseTheme();
    }
  }
}
</script>

<style lang="less">
  @import "styles/media";
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web|Cinzel');

  #app {
    margin: 0;
    height: 100%;
    background: none;

    &::before {
      content: '';
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      filter: brightness(0.6);
      z-index: -1;
      background-position: 50%;
      transition: background .5s ease-out;

      .winter-theme& {
        background-image: url("./assets/winter/background.gif");
      }

      .autumn-theme& {
        background-image: url("assets/autumn/background.gif");
      }

      .spring-theme& {
        background-image: url("assets/spring/background.gif");
        background-color: rgba(255, 255, 255, .3);
        filter: saturate(0.7) brightness(0.8) contrast(0.8);
      }

      .summer-theme& {
        background-image: url("assets/summer/background.gif");
        background-position: left;
        filter: brightness(.9) contrast(.8) hue-rotate(-20deg);
      }
    }
  }

  #app {
    font-family: 'Titillium Web', sans-serif;
  }

  .header {
    font-size: 35px;
    text-transform: uppercase;
    letter-spacing: 3px;
    word-spacing: 15px;
    font-weight: bold;
    text-align: center;
    padding: 10px 0;
    color: white;
    background: rgba(255, 255, 255, 0.3);
    font-family: 'Cinzel', serif;

    .spring-theme & {
      background: rgba(255, 255, 255, 0.5);
    }

    @media @tablet {
      padding: 22px 0;
      font-size: 50px;
    }
  }

  .action-buttons {

    @media @tablet {
      display: flex;
      width: 100%;
      margin-top: 30px;
    }

    &__item {
      cursor: pointer;
      padding: 5px 20px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(0, 0, 0, 0.5);
      outline: none;
      color: rgba(0, 0, 0, 0.7);
      letter-spacing: 5px;
      transition: color .2s, border .2s, background .2s;
      font-size: 20px;
      text-transform: uppercase;
      font-weight: bold;

      width: 100%;
      margin-bottom: 15px;

      @media @tablet {
        flex-grow: 1;
      }

      &:first-child {
        margin-right: 15px;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 1);
        border-color: rgba(0, 0, 0, 0.7);
        color: black;
      }
    }
  }

  .fade-enter-active {
    max-height: 500px;
    transition: max-height .3s ease-out, opacity .3s .3s ease-in;
  }
  .fade-leave-active {
    max-height: 500px;
    transition: max-height .3s .3s ease-out, opacity .3s ease-in;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    max-height: 0;
  }
</style>
