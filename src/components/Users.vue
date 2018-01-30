<template>
  <div class="users">
    <div class="users__title">
      <limitation class="limitation"
                  :current-limit="limit"
                  :count="usersCount"
                  :step="3"
                  items-name="Users"
                  @selectLimit="selectLimit"/>
      Users List
    </div>
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
  import Limitation from './Limitation.vue'

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
    computed: {
      lastPage() {
        return Math.ceil(this.usersCount/this.limit);
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
      },
      selectLimit($event) {
        this.limit = $event;
        if(this.page > this.lastPage) {
          this.page = this.lastPage;
        }
        this.loadUsers();
      }
    },
    created() {
      this.loadUsers();
    },
    components: {
      UsersList,
      Pagination,
      Limitation
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

  .limitation {
    position: absolute;
    left: 20px;
  }
</style>
