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
  import UserForm from './UserForm.vue'
  import BackLink from './BackLink.vue'

  export default {
    name: 'NewUser',
    data() {
      return {
        sendError: false
      }
    },
    methods: {
      createUser($event) {
        const url = 'http://localhost:3004/users';
        axios.post(url, $event).then(() => {
          this.$router.push({name: 'Users'})
        }).catch(() => {
          this.sendError = true;
        })
      }
    },
    components: {
      UserForm,
      BackLink
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
