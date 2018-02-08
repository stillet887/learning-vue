<template>
  <div>
    <input class="service-element" type="file" ref="picture" @change="processFile($event)"/>
    <button class="user-form__button _file" @click.prevent="chooseFile">Choice Picture</button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'ImageUploader',
    model: {
      prop: 'picture',
      event: 'changePicture'
    },
    props: {
      picture: String
    },
    methods: {
      chooseFile() {
        this.$refs.picture.click();
      },
      processFile() {
        const config = {
          headers: {
            'Authorization': 'Client-ID e166be57661b6b8'
          }
        };

        const file = this.$refs.picture.files[0];
        const data = new FormData();
        data.append('image', file);

        const url = 'https://api.imgur.com/3/image';

        axios.post(url, data, config)
          .then(res => {
            const picture = res.data.data.link;
            this.$emit('changePicture', picture);
            this.imageUploadError = false;
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
