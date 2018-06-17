<template>
  <div class="edit-user">
    <back-link/>
    <div class="edit-user__title header">
      Edit User
    </div>
    <div class="edit-user__error"
         v-if="updateError">
      Update error
    </div>
    <div class="edit-user__id">
      ID : {{ this.userId }}
    </div>
    <user-form class="edit-user__form"
               v-if="user"
               v-model="user"
               @userDetailsEntered="editUser">
      <span slot="buttonName">
        Update
      </span>
    </user-form>
    <div class="edit-user__error"
         v-if="requestError">
      Sorry, user with this ID doesn't exist...
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'EditUser',
    components: {
      UserForm: () => import('@/components/UserForm.vue'),
      BackLink: () => import('@/components/BackLink.vue')
    },
    data() {
      return {
        user: null,
        requestError: false,
        updateError: false
      }
    },
    computed: {
      userId() {
        return this.$route.params.id;
      },
      userUrl() {
        return `/users/${this.userId}`;
      }
    },
    methods: {
      editUser() {
        axios.put(this.userUrl, this.user).then(() => {
          this.$router.push({name: 'Users'})
        }).catch(() => {
          this.updateError = true;
        })
      }
    },
    created() {
      axios.get(this.userUrl).then(res => {
        this.user = res.data;
      }).catch(() => {
        this.requestError = true;
      })
    }
  }
</script>

<style lang="less">
  @import (less) "../styles/media";

  .edit-user{
    color: white;
    letter-spacing: 5px;

    &__id {
      font-size: 35px;
      max-width: 900px;
      margin: 30px auto;
      padding: 0 20px;
      box-sizing: border-box;

      @media @phone-strict {
        word-break: break-all;
        font-size: 25px;
        margin: 10px auto;
        letter-spacing: .5px;
      }
    }

    &__error {
      max-width: 900px;
      font-size: 25px;
      margin: 30px auto;
      color: lightblue;
    }

    &__title {
      @media @phone-strict {
        padding-bottom: 30px;
      }
    }
  }
</style>
