<template>
  <div class="new-user">
    <div class="new-user__title header">New User</div>
    <back-link/>
    <div v-if="sendError" class="new-user__error">
      Create error
    </div>
    <user-form v-model="user" @userDetailsEntered="createUser">
      <span slot="buttonName">
        Create
      </span>
    </user-form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'NewUser',
    components: {
      UserForm: () => import('@/components/UserForm.vue'),
      BackLink: () => import('@/components/BackLink.vue')
    },
    data() {
      return {
        sendError: false,
        user: {
          picture: null,
          name: null,
          age: null,
          email: null,
          phone: null,
          address: null,
          about: null
        }
      }
    },
    methods: {
      createUser() {
        const url = '/users';
        axios.post(url, this.user).then(() => {
          this.$router.push({name: 'Users'})
        }).catch(() => {
          this.sendError = true;
        })
      }
    }
  }
</script>

<style lang="less">
  .new-user {
    &__error {
      max-width: 900px;
      font-size: 25px;
      margin: 30px auto;
      color: lightblue;
      letter-spacing: 5px;
    }
  }
</style>
