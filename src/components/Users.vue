<template>
  <div class="users">
    <div class="users__header header">
      <limitation class="limitation"
                  :current-limit="limit"
                  :count="usersCount"
                  :step="3"
                  items-name="Users"
                  @selectLimit="selectLimit"/>
      <div class="users__title">
        Users List
      </div>
      <div class="users__count">
        Total : {{ usersCount }}
      </div>
      <router-link class="new-user-link" :to="{name: 'NewUser'}" tag="div">
        New User
      </router-link>
    </div>

    <pagination
      :count="usersCount"
      :current-page="page"
      :limit="limit"
      @selectPage="selectPage"/>

    <users-list
      :users="users"
      @deleteUser="deleteUser"/>
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
      deleteUser($event) {
        const url = `http://localhost:3004/users/${$event}`;
        axios.delete(url).then(res => {
          this.loadUsers();
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
    &__header {
    }

    &__title {
      position: relative;
      top: -20px;
    }

    &__count {
      font-size: 20px;
      line-height: 10px;
    }
  }

  .limitation {
    position: absolute;
    z-index: 2;
    left: 20px;
    line-height: 20px;
    word-spacing: 5px;
  }

  .new-user-link {
    word-spacing: 5px;
    font-size: 20px;
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
    text-shadow: none;
    transition: font-size .2s, text-shadow .3s;

    &:hover {
      font-size: 21px;
      text-shadow: 1px 1px 3px black;
    }

    &::before {
      content: '+';
      font-size: 35px;
      position: relative;
      top: 2px;
    }
  }
</style>
