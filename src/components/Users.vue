<template>
  <div class="users">
    <div class="users__title">Users List</div>
    <pagination
      :count="usersCount"
      :current-page="page"
      :limit="limit"
      @selectPage="selectPage"/>
    <users-list :users="users"></users-list>
  </div>
</template>

<script>
  import axios from 'axios'
  import UsersList from './UsersList.vue'
  import Pagination from './Pagination.vue'

  export default {
    name: 'Users',
    data(){
      return {
        page: 1,
        limit: 1,
        users: null,
        usersCount: 0
      }
    },
    methods: {
      loadUsers(){
        const url = `http://localhost:3004/users?_page=${this.page}&_limit=${this.limit}`;
        axios.get(url).then(res => {
          this.users = res.data;
          this.usersCount = Number(res.headers['x-total-count']);
        })
      },
      selectPage($event) {
        this.page = $event;
        this.loadUsers();
      }
    },
    created() {
      this.loadUsers();
    },
    components: {
      UsersList,
      Pagination
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
