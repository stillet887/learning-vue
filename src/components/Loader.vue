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

      background-size: 100%;

      .winter-theme & {
        background-image: url("../assets/winter/loading.gif");
      }

      .autumn-theme & {
        background-image: url("../assets/autumn/loading.gif");
        background-size: 125%;
      }

      .spring-theme & {
        background-image: url("../assets/spring/loader.png");
        background-size: 100%;
        background-repeat: no-repeat;
        animation: rotate;
        animation-duration: 10s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }

      .summer-theme & {
        background-image: url("../assets/summer/loader.png");
        background-repeat: no-repeat;
        animation: rotate;
        animation-duration: 10s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
