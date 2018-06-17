<template>
  <router-link class="back-link" tag="div" :to="{name: 'Users'}">
    <span class="back-link__img"> &lt </span>
    <span class="back-link__text">Back to users list</span>
  </router-link>
</template>

<script>
  export default {
    name: 'BackLink'
  }
</script>

<style lang="less">
  .back-link {
    color: white;
    position: absolute;
    top: 40px;
    left: 20px;
    cursor: pointer;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    -webkit-user-select: none;

    &:hover {
      .back-link__text {
        font-size: 19px;
        text-shadow: 1px 1px 3px black;
      }

      .back-link__img {
        font-size: 31px;
        text-shadow: 1px 1px 3px black;
      }
    }

    &__text {
      font-size: 18px;
      letter-spacing: 3px;
      text-transform: uppercase;
      transition: font-size .2s, text-shadow .5s;
    }

    &__img {
      font-size: 30px;
      transition: font-size .2s, text-shadow .5s;
    }
  }
</style>
