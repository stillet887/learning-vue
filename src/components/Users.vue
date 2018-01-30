<template>
  <div class="users">
    <div class="users__title">Users List</div>
    <users-list :users="users"></users-list>
  </div>
</template>

<script>
  import axios from 'axios'
  import UsersList from './UsersList.vue'

  export default {
    name: 'Users',
    data(){
      return {
        page: 1,
        limit: 10,
        users: null
      }
    },
    methods: {
      loadUsers(){
        const url = `http://localhost:3004/users?_page=${this.page}&_limit=${this.limit}`;
        axios.get(url).then(res => {
          this.users = res.data;
        })
      }
    },
    created() {
      this.loadUsers();
    },
    components: {
      UsersList
    }
  }
</script>

<style lang="less">
  .users {
    &__title {
      font-size: 50px;
      text-transform: uppercase;
      letter-spacing: 3px;
      word-spacing: 15px;
      font-weight: bold;
      text-align: center;
      padding: 20px 0;
      color: white;
      background: rgba(255, 255, 255, 0.3);
    }
  }
</style>
