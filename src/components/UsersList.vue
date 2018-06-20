<template>
  <div class="users-list-wrapper">
    <modal-window v-if="userForDeletion" @close="closeModalWindow">
      <span slot="header">
        Delete User
      </span>
      <div class="user-deletion">
        <h2>
          Are you sure you want to delete the user {{ userForDeletion.name }}?
        </h2>
        <div class="action-buttons">
          <button class="action-buttons__item"
                  type="button"
                  @click="closeModalWindow">
            Cancel
          </button>
          <button class="action-buttons__item"
                  type="button"
                  @click="confirmDeletion">
            Confirm
          </button>
        </div>

      </div>
    </modal-window>

    <ul class="users-list">
      <li class="user"
          :class="{'_active': userIsSelected(user) }"
          v-for="user in users"
          :key="user.id">

        <div class="user__title">
          <img class="user__picture" :src="user.picture || defaultPicture">
          <div class="user__name" @click="selectUser(user)">
            <span class="user__name-inner">
              {{ user.name }}
            </span>
          </div>
        </div>

        <transition name="fade" appear>
          <div class="user__description" v-if="userIsSelected(user)">
            <div class="user__actions">
              <router-link class="user__action _edit" :to="{name: 'EditUser', params: {id: user.id}}">
              </router-link>

              <button class="user__action _delete"
                      type="button"
                      @click="deleteUser(user)">
              </button>
            </div>


            <ul class="user__info user-info">
              <li class="user-info__group"
                  :class="{'_long-value': field === 'id' || field === 'email'}"
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
  </div>

</template>

<script>
  export default {
    name: 'UsersList',
    components: {
      ModalWindow: () => import('@/components/ModalWindow.vue')
    },
    props: {
      users: {
        type: Array,
        required: true
      },
      displayedFields: {
        type: Array,
        default() {
          return ['id', 'email', 'phone', 'address', 'about'];
        }
      }
    },
    data() {
      return {
        selectedUser: null,
        defaultPicture: 'https://pbs.twimg.com/profile_images/587929311736266752/TpnGN4LZ_400x400.png',
        userForDeletion: null
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
        if(this.users && this.users.length === 1) {
          this.selectUser(this.users[0]);
        }
      },
      deleteUser(user) {
        this.userForDeletion = user;
      },
      confirmDeletion() {
        this.$emit('deleteUser', this.userForDeletion.id);
        this.limit--;
      },
      closeModalWindow() {
        this.userForDeletion = null;
      }
    },
    mounted() {
      this.selectFirst();
    }
  }
</script>

<style lang="less">
  @import (less) '../styles/media.less';
  @import (less) '../styles/hover-effects.less';

  .users-list {
    color: white;
    list-style-type: none;
    padding: 0;
    margin: 50px auto;
    max-width: 90%;

    @media @tablet {
      max-width: 80%;
    }

    @media @desktop {
      max-width: 900px;
    }
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
      height: 70px;
      background: rgba(255, 255, 255, 0.3);
      position: relative;

      .spring-theme & {
        background: rgba(255, 255, 255, 0.5);
      }

      @media @tablet {
        height: 100px;
      }

      @media @desktop {
        .hover-horizontal();
      }
    }

    &__name-inner {
      line-height: 1.2;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &__picture {
      margin-right: 20px;
      width: 70px;
      height: 70px;
      flex-shrink: 0;

      @media @tablet {
        width: 100px;
        height: 100px;
      }
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
      width: 70px;
      flex-shrink: 0;
      margin-right: 20px;
      .hover-vertical();

      @media @tablet {
        width: 100px;
      }
    }

    &__action {
      position: relative;
      flex-basis: 100%;
      background: rgba(255, 255, 255, 0.3);

      .spring-theme & {
        background: rgba(255, 255, 255, 0.5);
      }

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
      &._long-value {
        word-break: break-all;
      }

      @media @phone-strict {
        margin-bottom: 10px;
        &:not(:last-child) {
          border-bottom: 1px solid;
        }
      }

      @media @tablet {
        display: flex;
        align-items: center;
      }
    }

    &__title {
      text-transform: uppercase;
      font-weight: bold;
      padding-right: 10px;

      @media @tablet {
        flex-basis: 72px;
        flex-shrink: 0;
        text-align: right;
      }
    }

    &__value {
      padding: 10px;
      -moz-user-select: all;
      -ms-user-select: all;
      -o-user-select: all;
      -webkit-user-select: all;
    }
  }
</style>
