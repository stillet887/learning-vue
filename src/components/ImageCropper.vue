<template>
  <div class="cropper">
    <vue-croppie
      class="cropper__image"
      ref="croppieRef"
      :enableOrientation="true"
      :enableResize="false"
      :showZoomer="false"
      :viewport="viewport">
    </vue-croppie>

    <div class="cropper__buttons">
      <button class="cropper__button _rotate _right"
              type="button"
              @click="rotate(-90)">
      </button>

      <button class="cropper__button _submit"
              type="button"
              @click="crop()">
        Crop
      </button>

      <button class="cropper__button _rotate _left"
              type="button"
              @click="rotate(90)">
      </button>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ImageCropper',
    props: {
      picture: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        viewport: {
          width: 200,
          height: 200,
          type: 'square'
        }
      }
    },
    watch: {
      picture: 'updateCroppie'
    },
    methods: {
      updateCroppie() {
        this.$refs.croppieRef.bind({
          url: this.picture,
        });
      },
      updatePicture(newPicture) {
        this.$emit('pictureChanged', newPicture);
      },
      crop() {
        const options = {
          type: 'blob',
          format: 'jpeg',
          circle: false
        };
        this.$refs.croppieRef.result(options, this.updatePicture);
      },
      rotate(rotationAngle) {
        this.$refs.croppieRef.rotate(rotationAngle);
      }
    },
    mounted() {
      this.updateCroppie();
    }
  }
</script>

<style lang="less">
  .cropper {
    &__image {
      margin-top: 30px;
    }

    &__buttons {
      display: flex;
      width: 100%;
      margin-top: 30px;
    }

    &__button {
      cursor: pointer;
      padding: 5px 20px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(0, 0, 0, 0.5);
      outline: none;
      color: rgba(0, 0, 0, 0.7);
      letter-spacing: 5px;
      transition: color .2s, border .2s, background .2s;
      font-size: 20px;

      &._rotate {
        width: 50px;
        position: relative;
        border-right: none;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          background: url(../assets/rotate_icon.png) no-repeat;
          background-size: 25px;
          background-position: 10px;
          opacity: 0.6;
          transition: opacity .2s;
        }

        &:hover {
          &::before {
            opacity: 1;
          }
        }
      }

      &._left {
        transform: scale(-1, 1);
      }

      &._submit {
        flex-grow: 1;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 1);
        border-color: rgba(0, 0, 0, 0.7);
        color: black;
      }
    }
  }

  .cr-slider-wrap {
    display: none;
  }
</style>
