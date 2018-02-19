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

    <transition name="fade">
      <users-list
        v-if="usersIsLoaded"
        :users="users"
        @deleteUser="deleteUser"/>
    </transition>


    <transition name="fade">
      <div class="spinner" v-if="loading">
        <img class="spinner__icon" src="../assets/loading_icon.gif"/>
      </div>
    </transition>
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
        users: [],
        usersCount: 0,
        errorConnection: false,
        loading: false
      }
    },
    computed: {
      usersIsLoaded(){
        return this.users.length && !this.loading;
      },
      url() {
        return `/users?_page=${this.page}&_limit=${this.limit}`;
      },
      page: {
        get() {
          return this.$store.state.currentPage;
        },
        set(page) {
          this.$store.dispatch('changePage', page)
        }
      },
      limit: {
        get() {
          return this.$store.state.currentLimit;
        },
        set(limit) {
          this.$store.dispatch('changeLimit', limit)
        }
      }
    },
    watch: {
      limit: 'loadUsers',
      page: 'loadUsers'
    },
    methods: {
      loadUsers(){
        this.loading = true;

        axios.get(this.url).then(res => {
          this.users = res.data;
          this.usersCount = Number(res.headers['x-total-count']);
          this.errorConnection = false;
          this.loading = false;
        }).catch(() => {
          this.errorConnection = true;
          this.loading = false;
          this.users = [];
        })
      },
      deleteUser(id) {
        const url = `/users/${id}`;
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

    .spinner {
      &__icon {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -100%);
      }
    }
  }

  .limitation {
    position: absolute;
    z-index: 2;
    left: 20px;
    top: 15px;
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

  .pages-container {
    z-index: 10;
  }
</style>
