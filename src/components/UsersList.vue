<template>
  <ul class="users-list">
    <li class="user"
        :class="{'_active': userIsSelected(user) }"
        v-for="user in users"
        :key="user.id">

        <div class="user__title">
          <img class="user__picture" :src="user.picture || defaultPicture">
          <div class="user__name" @click="selectUser(user)">
            {{ user.name }}
          </div>
        </div>

        <transition name="fade" appear>
          <div class="user__description" v-if="userIsSelected(user)">
            <div class="user__actions">
              <router-link class="user__action _edit" :to="{name: 'EditUser', params: {id: user.id}}">
              </router-link>

              <button class="user__action _delete" @click="deleteUser(user)">
              </button>
            </div>


            <ul class="user__info user-info">
              <li class="user-info__group"
                  v-for="field in displayedFields"
                  :key="field">
                <div class="user-info__title">
                  {{ field }}
                </div>
                <div class="user-info__value">
                  {{ user[field] }}
                </div>
              </li>
            </ul>
          </div>
        </transition>

    </li>
  </ul>
</template>

<script>
  export default {
    name: 'UsersList',
    data() {
      return {
        selectedUser: null,
        defaultPicture: 'https://pbs.twimg.com/profile_images/587929311736266752/TpnGN4LZ_400x400.png'
      }
    },
    props: {
      users: {
        type: Array,
        default: null
      },
      displayedFields: {
        type: Array,
        default() {
          return ['id', 'email', 'phone', 'address', 'about'];
        }
      }
    },
    watch: {
      users() {
        this.selectFirst();
      }
    },
    methods: {
      userIsSelected(user){
        return user === this.selectedUser;
      },
      selectUser(user) {
        this.selectedUser = this.selectedUser === user ? null : user;
      },
      selectFirst() {
        if(this.users.length === 1) {
          this.selectUser(this.users[0]);
        }
      },
      deleteUser(user) {
        this.$emit('deleteUser', user.id);
      }
    },
    mounted() {
      this.selectFirst();
    }
  }
</script>

<style lang="less">
  @import (less) '../styles/hover-effects.less';

  .users-list {
    color: white;
    list-style-type: none;
    padding: 0;
    max-width: 900px;
    margin: 50px auto;
  }

  .user {
    transition: top .2s;
    position: relative;
    top: 0;

    &._active {
      &:not(:first-child) {
        top: 20px;
      }
    }

    &:first-child {
      .user__description {
        margin: 20px 0 40px;
      }
    }

    &__title {
      margin: 20px 0;
      display: flex;
      align-items: center;
    }

    &__name {
      font-size: 22px;
      font-weight: bold;
      letter-spacing: 4.5px;
      word-spacing: 7px;
      flex-basis: 100%;
      padding-left: 20px;
      height: 100px;
      line-height: 100px;
      background: rgba(255, 255, 255, 0.3);
      .hover-horizontal();
    }

    &__picture {
      margin-right: 20px;
      width: 100px;
      height: 100px;
      flex-shrink: 0;
    }

    &__description {
      display: flex;
      margin: 20px 0 70px;
    }

    &__info {
      flex-basis: 100%;
      min-height: 300px;
      background: rgba(0, 0, 0, 0.7);
    }

    &__actions {
      display: flex;
      flex-direction: column;
      width: 100px;
      flex-shrink: 0;
      margin-right: 20px;
      .hover-vertical();
    }

    &__action {
      position: relative;
      flex-basis: 100%;
      background: rgba(255, 255, 255, 0.3);

      &._edit {
        flex-grow: 2;
        margin-bottom: 3px;
        .hover-convex();

        &::before {
          content: 'edit';
        }
      }

      &._delete{
        cursor: pointer;
        border: none;
        outline: none;
        flex-grow: 3;
        .hover-convex();

        &::before {
          content: 'delete';
        }
      }

      &::before {
        display: block;
        width: 130px;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(270deg);
        text-transform: uppercase;
        font-size: 18px;
        letter-spacing: 13px;
      }
    }
  }

  .user-info {
    list-style-type: none;
    padding: 20px;

    &__group {
      display: flex;
      align-items: center;
    }

    &__title {
      flex-basis: 72px;
      flex-shrink: 0;
      text-align: right;
      text-transform: uppercase;
      font-weight: bold;
      padding-right: 10px;

    }

    &__value {
      padding: 10px;
    }
  }


  .fade-enter-active {
    max-height: 500px;
    transition: max-height .3s ease-out, opacity .2s .3s ease-in;
  }
  .fade-leave-active {
    max-height: 500px;
    transition: max-height .2s .3s ease-out, opacity .3s ease-in;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    max-height: 0;
  }
</style>
