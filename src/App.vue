<template>
  <div id="app">
    <transition name="route">
      <router-view>
      </router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @import "styles/media";
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web|Cinzel');

  body {
    margin: 0;
    height: 100%;
    background: #1d1d1d;

    &::before {
      content: '';
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /*background-image: url(./assets/app_background.jpg);*/
      /*background-image: url(https://78.media.tumblr.com/5163091ed0007012a89940d67caf3d09/tumblr_npvwsyMZ2Z1saq3w2o1_500.gif);*/
      /*background-image: url(http://www.playcast.ru/uploads/2017/12/22/24196917.gif);*/
      /*background-image: url(http://www.nat-geo.ru/upload/iblock/67b/67b1348acdf288ccbb2bf9c02b435f69.jpg);*/
      background-image: url(http://s11.favim.ru/orig/160616/novyj-god-sneg-zima-elka-Favim.ru-4417566.gif);
      background-size: cover;
      filter: brightness(0.6);
      z-index: -1;
      background-position: 50%;
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

    @media @tablet {
      padding: 22px 0;
      font-size: 50px;
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


  .route-enter-active, .route-leave-active {
    transition-property: all;
    transition-duration: 1s;
    transform: scale(1);
  }

  .route-enter, .route-leave-to {
    opacity: 0;
  }

  .route-leave-to {
    transform: scale(.1);
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .route-enter {
    transform: scale(2);
  }
</style>
