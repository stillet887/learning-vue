<template>
  <ul class="users-list">
    <li class="user"
        :class="{'_active': user === selectedUser }"
        v-for="user in users">

        <div class="user__title">
          <img class="user__picture" :src="user.picture">
          <div class="user__name" @click="selectUser(user)">
            {{ user.name }}
          </div>
        </div>

        <transition name="fade">
          <div class="user__description" v-if="user === selectedUser">
            <div class="user__edit">
            </div>
            <ul class="user__info user-info">
              <li class="user-info__group" v-for="field in ['id', 'email', 'phone', 'address', 'about']">
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
        selectedUser: null
      }
    },
    props: {
      users: {
        type: Array,
        default: null
      }
    },
    methods: {
      selectUser(user) {
        this.selectedUser = this.selectedUser === user ? null : user;
      }
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
        top: 30px;
      }
    }

    &__title {
      margin: 10px 0;
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
    }

    &__description {
      display: flex;
      margin: 20px 0 70px;
    }

    &__info {
      flex-basis: 100%;
      background: rgba(0, 0, 0, 0.7);
    }

    &__edit {
      width: 100px;
      flex-shrink: 0;
      background: rgba(255, 255, 255, 0.3);
      margin-right: 20px;
      position: relative;
      .hover-vertical();

      &::before {
        content: 'edit';
        display: block;
        width: 100px;
        text-align: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%) rotate(270deg);
        text-transform: uppercase;
        font-weight: bold;
        font-size: 18px;
        letter-spacing: 15px;
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
