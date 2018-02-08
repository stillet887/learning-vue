<template>
  <div>
    <input class="service-element" type="file" ref="picture" @change="initImage"/>
    <button class="user-form__button _file" @click.prevent="chooseFile">Choose Picture</button>

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

<style>
  .service-element {
    display: none;
  }
</style>
