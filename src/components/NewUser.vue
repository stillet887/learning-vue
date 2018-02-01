<template>
  <div class="new-user">
    <div class="new-user__title header">New User</div>
    <back-link/>
    <div v-if="sendError" class="new-user__error">
      Create error
    </div>
    <user-form @userDetailsEntered="createUser">
      <span slot="buttonName">
        Create
      </span>
    </user-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import UserForm from '@/components/UserForm.vue'
  import BackLink from '@/components/BackLink.vue'

  export default {
    name: 'NewUser',
    components: {
      UserForm,
      BackLink
    },
    data() {
      return {
        sendError: false
      }
    },
    methods: {
      createUser(user) {
        const url = 'http://localhost:3004/users';
        axios.post(url, user).then(() => {
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
