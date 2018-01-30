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
    background: darkgray;
  }

  #app {
    font-family: 'Titillium Web', sans-serif;
    background: url(https://thehungryjpeg.com/img/products/0227f84faa13c1e9a0a23fccd6ed50bc4b416126.jpg);
  }
</style>
