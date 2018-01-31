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
    background-image: url(https://thehungryjpeg.com/img/products/0227f84faa13c1e9a0a23fccd6ed50bc4b416126.jpg);
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
</style>
