<template>
  <div class="users">
    <div class="users__header header">
      <div class="users__title">
        Users List
      </div>
      <div class="users__count">
        Total : {{ usersCount }}
      </div>
      <button class="mobile-menu-icon"
              :class="{'_clicked': mobileMenuOpened}"
              @click="openMobileMenu"/>
    </div>

    <div class="menu" :class="{'_opened': mobileMenuOpened}">
      <limitation class="limitation"
                  v-if="usersCount"
                  v-model="limit"
                  :current-limit="limit"
                  :count="usersCount"
      />
      <router-link class="users__link new-user-link" :to="{name: 'NewUser'}">
        New User
      </router-link>
      <router-link class="users__link change-theme-link" :to="{name: 'Themes'}">
        Change Theme
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
      <loader v-if="loading"/>
    </transition>

    <transition name="fade">
      <users-list
        v-if="usersIsLoaded"
        :users="users"
        @deleteUser="deleteUser"/>
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
      Limitation: () => import('@/components/Limitation.vue'),
      Loader: () => import('@/components/Loader.vue')
    },
    data(){
      return {
        users: [],
        usersCount: 0,
        errorConnection: false,
        loading: false,
        mobileMenuOpened: false
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
          this.$store.dispatch('changeLimit', limit);
        }
      },
      requestIsJustified() {
        const adequateParams = (this.limit * (this.page - 1)) < this.usersCount;
        return adequateParams || !this.usersCount;
      }
    },
    watch: {
      limit: 'loadUsers',
      page: 'loadUsers'
    },
    methods: {
      loadUsers(){
        this.loading = true;
        if (this.requestIsJustified) {
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
        }
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
      openMobileMenu() {
        this.mobileMenuOpened = !this.mobileMenuOpened;
      }
    },
    created() {
      this.loadUsers();
    }
  }
</script>

<style lang="less">
  @import (less) "../styles/media";

  .users {
    &__header {
    }

    &__title {
      margin-right: 80px;

      @media @tablet {
        margin-right: 0;
      }
    }

    &__count {
      font-size: 20px;
      line-height: 20px;
      margin-right: 80px;

      @media @tablet {
        margin-right: 0;
      }
    }

    &__link {
      color: white;
      text-decoration: none;
      word-spacing: 5px;
      font-size: 17px;
      position: absolute;
      cursor: pointer;
      text-shadow: none;
      transition: font-size .2s, text-shadow .3s;

      @media @phone-medium {
        font-size: 20px;
      }

      &:hover {
        font-size: 21px;
        text-shadow: 1px 1px 3px black;
      }
    }
  }

  .limitation {
    position: absolute;
    z-index: 2;
    left: 20px;
    top: 35px;
    line-height: 20px;
    word-spacing: 5px;

    @media @tablet {
      top: 22px;
    }
  }

  .new-user-link {
    right: 20px;
    top: 115px;

    @media @tablet {
      top: 10px
    }

    &::before {
      content: '+';
      font-size: 35px;
      position: relative;
      top: 2px;
    }
  }

  .change-theme-link {
    right: 20px;
    top: 0;

    @media @tablet {
      top: 80px;
    }

    &::before {
      content: '>';
      font-size: 35px;
      position: relative;
      top: 4px;
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
    left: 0;
  }

  .pages-container {
    z-index: 10;
  }

  .menu {
    font-family: 'Cinzel', serif;
    font-weight: bold;
    color: white;

    @media @phone-strict {
      padding-top: 35px;
      position: relative;
      max-height: 0;
      opacity: 0;
      transition: max-height .5s .5s ease, opacity .5s ease-out;
      height: 130px;
      background: rgba(255, 255, 255, 0.3);
      margin-top: 10px;

      &._opened {
        max-height: 300px;
        opacity: 1;
        transition: max-height .5s ease-out, opacity .5s .5s ease;
      }
    }
  }

  .mobile-menu-icon {
    height: 50px;
    width: 50px;
    background-color: transparent;
    background-image: url('../assets/menu.svg');
    background-size: cover;
    border: none;
    outline: none;
    display: block;
    transition: background 1s ease, transform 1s ease;
    position: absolute;
    top: 20px;
    right: 20px;

    @media @tablet {
      display: none;
    }

    &._clicked {
      background-image: url('../assets/menu_close.svg');
      transform: rotate(180deg);
    }
  }
</style>
