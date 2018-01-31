<template>
  <div class="edit-user">
    <back-link/>
    <div class="edit-user__title header">
      Edit User
    </div>
    <div class="edit-user__id">
      ID : {{ this.$route.params.id }}
    </div>
    <user-form class="edit-user__form"
               v-if="user"
               :user="user"/>
    <div class="edit-user__error"
         v-if="requestError">
      Sorry, user with this ID doesn't exist...
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import UserForm from './UserForm.vue'
  import BackLink from './BackLink.vue'

  export default {
    name: 'EditUser',
    components: {BackLink, UserForm},
    data() {
      return {
        user: null,
        userUrl: null,
        requestError: false
      }
    },
    created() {
      const userId = this.$route.params.id;
      this.userUrl = `http://localhost:3004/users/${userId}`;
      axios.get(this.userUrl).then(res => {
        this.user = res.data;
      }).catch(() => {
        this.requestError = true;
      })
    },
    comments: {
      UserForm,
      BackLink
    }
  }
</script>

<style lang="less">
  .edit-user{
    color: white;
    letter-spacing: 5px;

    &__id {
      font-size: 35px;
      max-width: 900px;
      margin: 30px auto;
      padding: 0 20px;
      box-sizing: border-box;
    }

    &__error {
      max-width: 900px;
      font-size: 25px;
      margin: 30px auto;
    }
  }
</style>
