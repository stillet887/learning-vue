<template>
  <div class="uploader">
    <input class="service-element" type="file" ref="picture" @change="initImage"/>
    <button class="uploader__button" @click.prevent="chooseFile">Choose Picture</button>

    <div>
      <image-cropper v-if="pictureObject" :picture="pictureObject.link" @pictureChanged="updateImage"/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'ImageUploader',
    components: {
      ImageCropper: () => import('@/components/ImageCropper.vue')
    },
    model: {
      prop: 'picture',
      event: 'changePicture'
    },
    props: {
      picture: String
    },
    data() {
      return {
        config: {
          headers: {
            'Authorization': 'Client-ID e166be57661b6b8'
          }
        },
        url: 'https://api.imgur.com/3/image',
        pictureObject: null
      }
    },
    methods: {
      chooseFile() {
        this.$refs.picture.click();
      },
      initImage() {
        const file = this.$refs.picture.files[0];
        const data = new FormData();
        data.append('image', file);

        axios.post(this.url, data, this.config)
          .then(res => {
            const picture = res.data.data.link;
            this.pictureObject = res.data.data;
            this.imageUploadError = false;
          })
          .catch(err => {
            this.imageUploadError = true;
          })
      },
      updateImage(file) {
        const data = new FormData();
        data.append('image', file);

        axios.post(this.url, data, this.config)
          .then(res => {
            const picture = res.data.data.link;
            this.$emit('changePicture', picture);
          })
          .catch(err => {
            this.imageUploadError = true;
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
