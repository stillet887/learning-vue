<template>
  <div>
    <vue-croppie
      ref=croppieRef
      :enableOrientation="true"
      :enableResize="false"
      :viewport="{width: 100, height: 100, type: 'square'}">
    </vue-croppie>

    <button @click="rotate(-90)">Rotate Left</button>
    <button @click="rotate(90)">Rotate Right</button>
    <button @click="crop()">Crop</button>
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
        cropped: null
      }
    },
    watch: {
      picture(){
        this.bind();
      }
    },
    methods: {
      bind() {
        this.$refs.croppieRef.bind({
          url: this.picture,
        });
      },
      crop() {
        const options = {
          type: 'blob',
          format: 'jpeg',
          circle: false
        };
        this.$refs.croppieRef.result(options, (output) => {
          this.$emit('pictureChanged', output);
        });
      },
      rotate(rotationAngle) {
        this.$refs.croppieRef.rotate(rotationAngle);
      }
    },
    mounted() {
      this.bind();
    }
  }
</script>
