<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web');

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
      background-image: url(./assets/app_background.jpg);
      background-size: cover;
      filter: brightness(0.3);
      z-index: -1;
    }
  }

  #app {
    font-family: 'Titillium Web', sans-serif;
  }

  .header {
    font-size: 50px;
    text-transform: uppercase;
    letter-spacing: 3px;
    word-spacing: 15px;
    font-weight: bold;
    text-align: center;
    padding: 20px 0;
    color: white;
    background: rgba(255, 255, 255, 0.3);
  }

  .spinner {
    padding: 40px 0 20px;
    text-align: center;

    &__icon {
      display: inline-block;
      filter: grayscale(1);
      width: 100px;
    }
  }


  .fade-enter-active {
    max-height: 500px;
    transition: max-height .3s ease-out, opacity .2s .3s ease-in;
  }
  .fade-leave-active {
    max-height: 500px;
    transition: max-height .2s .3s ease-out, opacity .3s ease-in;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    max-height: 0;
  }
</style>
