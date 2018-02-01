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
               :user="user"
               @userDetailsEntered="editUser"/>
    <div class="edit-user__error"
         v-if="requestError">
      Sorry, user with this ID doesn't exist...
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import UserForm from '@/components/UserForm.vue'
  import BackLink from '@/components/BackLink.vue'

  export default {
    name: 'EditUser',
    components: {
      UserForm,
      BackLink
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
        return `http://localhost:3004/users/${this.userId}`;
      }
    },
    methods: {
      editUser(user) {
        axios.put(this.userUrl, user).then(() => {
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
      color: lightblue;
    }
  }
</style>
