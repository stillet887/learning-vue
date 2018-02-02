<template>
  <div class="users">
    <div class="users__header header">
      <limitation class="limitation"
                  :current-limit="limit"
                  :count="usersCount"
                  :step="3"
                  items-name="Users"
                  v-model="limit"
                  />
      <div class="users__title">
        Users List
      </div>
      <div class="users__count">
        Total : {{ usersCount }}
      </div>
      <router-link class="new-user-link" :to="{name: 'NewUser'}">
        New User
      </router-link>
    </div>

    <pagination
      :count="usersCount"
      v-model="page"
      :limit="limit"
      />

    <div class="error" v-if="errorConnection">
      No connection to the server. Please try again later.
    </div>

    <users-list
      :users="users"
      @deleteUser="deleteUser"/>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Users',
    components: {
      UsersList: () => import('@/components/UsersList.vue'),
      Pagination: () => import('@/components/Pagination.vue'),
      Limitation: () => import('@/components/Limitation.vue')
    },
    data(){
      return {
        page: 1,
        limit: 1,
        users: null,
        usersCount: 0,
        errorConnection: false
      }
    },
    watch: {
      limit() {
        this.loadUsers();
      },
      page() {
        this.loadUsers();
      }
    },
    methods: {
      loadUsers(){
        const url = `http://localhost:3004/users?_page=${this.page}&_limit=${this.limit}`;
        axios.get(url).then(res => {
          this.users = res.data;
          this.usersCount = Number(res.headers['x-total-count']);
          this.errorConnection = false;
        }).catch(() => {
          this.errorConnection = true;
        })
      },
      deleteUser(id) {
        const url = `http://localhost:3004/users/${id}`;
        axios.delete(url).then(res => {
          this.loadUsers();
          this.errorConnection = false;
        }).catch(() => {
          this.errorConnection = true;
        })
      },
    },
    created() {
      this.loadUsers();
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
    color: white;
    text-decoration: none;
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

  .error {
    position: fixed;
    z-index: 3;
    bottom: 0;
    text-align: center;
    width: 100%;
    padding: 10px;
    background: darkgray;
    color: white;
  }
</style>
