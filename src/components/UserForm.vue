<template>
  <form class="user-form">
    <div class="user-picture">
      <img :src="user.picture || defaultPicture" class="user-picture__img"/>
      <div class="user-picture__group">
        <label class="user-form__label"
               for="picture">
          Picrure IRL:
        </label>
        <textarea class="user-form__input _textarea"
               id="picture"
               v-model="user.picture"/>
      </div>
    </div>

    <div class="user-form__group _first">
      <label class="user-form__label"
             for="name">
        Name:
      </label>
      <input class="user-form__input"
             id="name"
             v-model="user.name"/>
    </div>

    <div class="user-form__group">
      <label class="user-form__label"
             for="age">
        Age:
      </label>
      <input class="user-form__input"
             id="age"
             v-model="user.age"/>
    </div>

    <div class="user-form__group">
      <label class="user-form__label"
             for="email">
        Email:
      </label>
      <input class="user-form__input"
             id="email"
             v-model="user.email"/>
    </div>

    <div class="user-form__group">
      <label class="user-form__label"
             for="phone">
        Phone:
      </label>
      <input class="user-form__input"
             id="phone"
             v-model="user.phone"/>
    </div>

    <div class="user-form__group">
      <label class="user-form__label"
             for="address">
        Address:
      </label>
      <input class="user-form__input"
             id="address"
             v-model="user.address"/>
    </div>

    <div class="user-form__group">
      <label class="user-form__label"
             for="about">
        About:
      </label>
      <textarea class="user-form__input _textarea"
             id="about"
             v-model="user.about"/>
    </div>

    <button class="user-form__submit" @click.prevent="submit">
      <slot name="buttonName">
        Submit
      </slot>
    </button>
  </form>
</template>

<script>
  export default {
    name: 'UserForm',
    props: {
      user: {
        type: Object,
        default() {
          return {
            picture: null,
            name: null,
            age: null,
            email: null,
            phone: null,
            address: null,
            about: null
          }
        }
      }
    },
    data() {
      return {
        defaultPicture: 'https://pbs.twimg.com/profile_images/587929311736266752/TpnGN4LZ_400x400.png'
      }
    },
    methods: {
      submit() {
        this.$emit('userDetailsEntered', this.user)
      }
    }
  }
</script>

<style lang="less">
  .user-form {
    color: white;
    max-width: 900px;
    margin: 20px auto;

    &__group {
      margin: 20px;
      display: flex;

      &._first {
        margin-top: 10px;
      }
    }

    &__label {
      font-size: 25px;
      display: inline-block;
      letter-spacing: 5px;
      width: 150px;
    }

    &__input {
      width: calc(~'100% - 160px');
      padding: 10px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.3);
      border: 2px solid rgba(255, 255, 255, 0.6);
      outline: none;
      color: white;
      font-size: 16px;
      letter-spacing: 6px;

      &._textarea {
        resize: none;
        height: 100px;
      }

      &:focus {
        border: 2px solid white;
        box-shadow: inset 0 0 40px rgba(255, 255, 255, 0.7);
      }
    }

    &__submit {
      cursor: pointer;
      margin: 30px;
      float: right;
      padding: 5px 20px;
      font-size: 25px;
      background: rgba(255, 255, 255, 0.3);
      border: 2px solid rgba(255, 255, 255, 0.6);
      color: white;
      letter-spacing: 5px;
      text-transform: uppercase;
      transition: color .2s, border .2s, background .2s;

      &:hover {
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid rgba(255, 255, 255, 1);
        color: black;

      }
    }
  }

  .user-picture {
    display: flex;

    &__img {
      width: 120px;
      height: 120px;
      margin-left: 20px;
      flex-shrink: 0;
    }

    &__group {
      flex-basis: 100%;
      margin: 0 30px;
    }

    .user-form__label {
      width: 200px;
    }

    .user-form__input {
      width: 100%;

      &._textarea {
        height: 83px !important;
      }
    }
  }
</style>
