<template>
  <div class="uploader">
    <input class="service-element"
           type="file"
           ref="picture"
           @change="initImage"/>
    <button class="uploader__button"
            type="button"
            @click="chooseFile">
      Choose Picture
    </button>

    <transition name="fade">
      <div v-if="pictureIsReady">
        <image-cropper :picture="pictureObject.link"
                       @pictureChanged="updateImage"/>
      </div>

      <loader v-else-if="loading"/>

    </transition>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'ImageUploader',
    components: {
      ImageCropper: () => import('@/components/ImageCropper.vue'),
      Loader: () => import('@/components/Loader.vue')
    },
    model: {
      prop: 'picture',
      event: 'changePicture'
    },
    props: {
      picture: {
        validator: (value) => {
          return typeof value === String ||  value === null;
        },
        required: true
      }
    },
    data() {
      return {
        url: 'https://api.imgur.com/3/image',
        pictureObject: null,
        loading: false
      }
    },
    computed: {
      pictureIsReady() {
        return this.pictureObject && !this.loading;
      }
    },
    methods: {
      chooseFile() {
        this.$refs.picture.click();
      },
      initImage() {
        const file = this.$refs.picture.files[0];

        this.sendImage(file)
          .then(res => {
            this.pictureObject = res;
            const picture = this.pictureObject.link;
            this.imageUploadError = false;
          })
      },
      updateImage(file) {
        this.pictureObject = null;

        this.sendImage(file)
          .then(res => {
            const picture = res.link;
            this.$emit('changePicture', picture);
          })
      },
      sendImage(file) {
        const data = new FormData();
        data.append('image', file);

        this.loading = true;

        return axios.post(this.url, data)
          .then(res => {
            this.imageUploadError = false;
            this.loading = false;
            return res.data.data;
          })
          .catch(err => {
            this.imageUploadError = true;
            this.loading = false;
          })
      }
    }
  }
</script>

<style lang="less">
  .uploader {
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
      width: 100%;

        &:hover {
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(0, 0, 0, 0.7);
        color: black;
      }
    }
  }

  .service-element {
    display: none;
  }
</style>
