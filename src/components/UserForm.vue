<template>
  <form class="user-form">
    <div class="user-picture">
      <img :src="user.picture || defaultPicture" class="user-picture__img"/>
      <div class="user-picture__group">
        <div class="user-form__label">
          Picture:
        </div>

        <button class="user-form__button _file"
                type="button"
                @click="changingPicture = true">
          Change Picture
        </button>

        <modal-window v-if="changingPicture" @close="closeModalWindow">
          <span slot="header">
            Change Picture
          </span>
          <image-uploader v-model="user.picture"/>
        </modal-window>

        <transition name="validation-errors">
          <div class="validation _file" v-if="imageUploadError">
            <div class="validation__error">
              Image upload error. The default image will be used.
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="user-form__group _first">
      <label class="user-form__label"
             for="name">
        Name*:
      </label>
      <input class="user-form__input"
             id="name"
             v-model="user.name"
             @blur="$v.user.name.$touch()"/>
    </div>

    <transition name="validation-errors">
      <div class="validation" v-show="$v.user.name.$error">
        <transition name="validation-errors">
          <div class="validation__error" v-if="!$v.user.name.required">
            This field is required
          </div>
        </transition>

        <transition name="validation-errors">
          <div class="validation__error" v-if="!$v.user.name.isName && $v.user.name.required">
            This field must beginning and ending with alphabet character and contain only alphabet characters, spaces
            and
            dashes
          </div>
        </transition>

        <transition name="validation-errors">
          <div class="validation__error" v-if="!$v.user.name.minLength">
            This fiels must contain minimum {{ $v.user.name.$params.minLength.min }} characters
          </div>
        </transition>
      </div>
    </transition>


    <div class="user-form__group">
      <label class="user-form__label"
             for="age">
        Age*:
      </label>
      <input class="user-form__input"
             id="age"
             v-model="user.age"
             @blur="$v.user.age.$touch()"/>
    </div>

    <transition name="validation-errors">
      <div class="validation" v-if="$v.user.age.$error">
        <transition name="validation-errors">
          <div class="validation__error" v-if="!$v.user.age.required">
            This field is required
          </div>
        </transition>

        <transition name="validation-errors">
          <div class="validation__error" v-if="!$v.user.age.minLength && $v.user.age.required">
            This fiels can contain only numbers
          </div>
        </transition>
      </div>
    </transition>


    <div class="user-form__group">
      <label class="user-form__label"
             for="email">
        Email*:
      </label>
      <input class="user-form__input"
             id="email"
             v-model="user.email"
             @blur="$v.user.email.$touch()"/>
    </div>

    <transition name="validation-errors">
      <div class="validation" v-if="$v.user.email.$error">
        <transition name="validation-errors">
          <div class="validation__error" v-if="!$v.user.email.required">
            This field is required
          </div>
        </transition>

        <transition name="validation-errors">
          <div class="validation__error" v-if="!$v.user.email.email && $v.user.email.required">
            Fiels must contain correct email address
          </div>
        </transition>
      </div>
    </transition>


    <div class="user-form__group">
      <label class="user-form__label"
             for="phone">
        Phone*:
      </label>
      <input class="user-form__input"
             id="phone"
             v-model="user.phone"
             @blur="$v.user.phone.$touch()"/>
    </div>

    <transition name="validation-errors">
      <div class="validation" v-if="$v.user.phone.$error">
        <transition name="validation-errors">
          <div class="validation__error" v-if="!$v.user.phone.required">
            This field is required
          </div>
        </transition>

        <transition name="validation-errors">
          <div class="validation__error" v-if="!$v.user.phone.isPhone && $v.user.email.required">
            Fiels must contain correct phone number
          </div>
        </transition>
      </div>
    </transition>

    <div class="user-form__group">
      <label class="user-form__label"
             for="address">
        Address*:
      </label>
      <input class="user-form__input"
             id="address"
             v-model="user.address"/>
    </div>

    <transition name="validation-errors">
      <div class="validation" v-if="$v.user.address.$error">
        <transition name="validation-errors">
          <div class="validation__error" v-if="!$v.user.address.required">
            This field is required
          </div>
        </transition>

        <transition name="validation-errors">
          <div class="validation__error" v-if="!$v.user.address.minLength">
            This fiels must contain minimum {{ $v.user.address.$params.minLength.min }} characters
          </div>
        </transition>
      </div>
    </transition>

    <div class="user-form__group">
      <label class="user-form__label"
             for="about">
        About:
      </label>
      <textarea class="user-form__input _textarea"
             id="about"
             v-model="user.about"/>
    </div>

    <button class="user-form__button _submit"
            type="button"
            @click="submit">
      <slot name="buttonName">
        Submit
      </slot>
    </button>
  </form>
</template>

<script>
  import { required, minLength, email, numeric } from 'vuelidate/lib/validators'
  import { isName, isPhone } from '@/customValidators'

  export default {
    name: 'UserForm',
    components: {
      ImageUploader: () => import('@/components/ImageUploader.vue'),
      ModalWindow: () => import('@/components/ModalWindow.vue')
    },
    model: {
      prop: 'user'
    },
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        defaultPicture: 'https://pbs.twimg.com/profile_images/587929311736266752/TpnGN4LZ_400x400.png',
        imageUploadError: false,
        changingPicture: false
      }
    },
    validations: {
      user: {
        name: {
          required,
          isName,
          minLength: minLength(4)
        },
        age: {
          required,
          numeric
        },
        email: {
          required,
          email
        },
        phone: {
          required,
          isPhone
        },
        address: {
          required,
          minLength: minLength(10)
        }
      }
    },
    watch: {
      'user.picture': 'closeModalWindow'
    },
    methods: {
      submit() {
        this.$v.user.name.$touch();
        this.$v.user.age.$touch();
        this.$v.user.email.$touch();
        this.$v.user.phone.$touch();
        this.$v.user.address.$touch();

        if (!this.$v.$invalid) {
          this.$emit('userDetailsEntered', this.user)
        }
      },
      closeModalWindow() {
        this.changingPicture = false;
      }
    }
  }
</script>

<style lang="less">
  .user-form {
    color: white;
    max-width: 900px;
    margin: 60px auto;

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
      letter-spacing: 4px;
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

    &__button {
      cursor: pointer;
      padding: 5px 20px;
      background: rgba(255, 255, 255, 0.3);
      border: 2px solid rgba(255, 255, 255, 0.6);
      outline: none;
      color: white;
      letter-spacing: 5px;
      transition: color .2s, border .2s, background .2s;

      &:hover {
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid rgba(255, 255, 255, 1);
        color: black;
      }

      &._file {
        display: block;
        font-size: 20px;
        margin-top: 20px;
      }

      &._submit {
        margin: 30px;
        float: right;
        font-size: 25px;
        text-transform: uppercase;
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

  .validation {
    margin-left: 170px;
    color: lightblue;
    letter-spacing: 3px;
    font-size: 18px;
    padding-bottom: 20px;

    &._file {
      margin: 10px 0 0;
    }

    &__error{
      position: relative;
      padding-bottom: 10px;

      &::before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(http://www.hey.fr/fun/emoji/android/en/icon/android/111-emoji_android_heavy_exclamation_mark_symbol.png) no-repeat;
        background-size: cover;
      }
    }
  }

  .validation-errors-enter-active {
    transform: translateY(0);
    max-height: 100px;
    transition: max-height .5s ease-in, opacity .2s .2s ease-in, transform .3s .2s ease-out;
  }
  .validation-errors-leave-active {
    transform: translateY(0);
    max-height: 100px;
    transition: opacity .5s ease-in, max-height .2s .4s ease-in, transform .3s .2s ease-out;
  }
  .validation-errors-enter, .validation-errors-leave-to {
    max-height: 0 !important;
    transform: translateY(10px);
  }
</style>
