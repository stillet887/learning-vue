<template>
  <div class="loader">
    <div class="loader__icon"></div>
  </div>

</template>

<style lang="less">
  .loader {
    padding: 40px 0 20px;
    text-align: center;

    &__icon {
      display: inline-block;
      width: 100px;
      height: 100px;
      background: url("../assets/loading_icon.gif");

      /*background: url("http://www.playcast.ru/uploads/2017/09/05/23365430.gif");*/
      /*background: url("http://www.playcast.ru/uploads/2015/08/21/14765696.gif");*/

      background-size: 100%;
    }
  }
</style>
