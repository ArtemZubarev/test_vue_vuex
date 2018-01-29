<style lang="sass">
  .header
    background: #1194f6
    box-shadow: 0 0 20px rgba(19, 18, 18, 0.3)
    z-index: 1
    transition: 0.2s
    &__container
      padding-top: 43px
    &__perform
      display: flex
      justify-content: space-between
      align-content: stretch
      align-items: center
    &__logo
      flex: 1
      list-style-type: none
    &__account
      flex: 1
      list-style-type: none
      text-align: right
    &__search
      position: relative
      max-width: 1120px
      flex-grow: 3
      input
        box-sizing: border-box
        width: 100%
        height: 73px
        padding-left: 28px
        border: none
        border-radius: 3px
        background-color: #42a5f5
        color: #fff
        font-size: 21px
        transition: 0.3s
        &::placeholder
          color: #d6e9f9
        &:hover
          box-shadow: 0 5px 10px rgba(19, 18, 18, 0.2)
      &-btn
        position: absolute
        width: 73px
        height: 73px
        top: 0
        right: 0
        border: none
        background: url("../assets/fa-search.png") no-repeat
        background-position: center center
    &__nav
      display: flex
      justify-content: space-between
      align-items: center
    &__check-all
      label
        position: relative
        margin-right: 18px
        color: #d6e9f9
        cursor: pointer
        &:before
          position: absolute
          content: ''
          display: block
          width: 19px
          height: 19px
          top: 0
          left: -31px
          border-radius: 3px
          background-color: #a2d3f9
      input
        visibility: hidden
        &:checked
          & ~ label
            &:after
              position: absolute;
              display: block
              content: '\2713'
              width: 20px
              height: 20px
              top: -8px
              left: -31px
              font-size: 28px
              color: rgba(0,0,0,0.7)
  .nav
    display: flex
    padding: 0
    margin: 0
    &__item
      list-style: none
      display: block
      padding: 28px
      font-size: 28px
      color: #d6e9f9
      border-bottom: 6px solid rgba(255,255,255,0)
      cursor: pointer
      transition: 0.1s
      &.nav-active
        border-bottom: 6px solid #f5f5f5
      &:first-of-type
        padding: 28px 22px 28px 8px
      &:last-of-type
        padding: 28px 8px 28px 22px
  .account
    &__avatar
      display: inline-block
      width: 71px
      height: 71px
      border-radius: 36px
      overflow: hidden

</style>

<template>
  <header class="header">
    <div class="wrapper">
      <div class="header__container">
        <div class="header__perform">
          <div class="header__logo">
            <img src="../assets/logo.png" alt="">
          </div>
          <div class="header__search">
            <input type="text" placeholder="Поиск посылок" v-model="searchPhrase">
            <span class="header__search-btn"></span>
          </div>
          <div class="header__account account">
            <div class="account__avatar">
              <img :src="user.avatar" alt="">
            </div>
          </div>
        </div>
        <nav class="header__nav">
          <ul class="nav">
            <router-link class="nav__item" to="/" tag="li" exact>Главная</router-link>
            <router-link class="nav__item" to="/packages" tag="li">Посылки</router-link>
          </ul>
          <div class="header__check-all check-all" v-if="$route.path == '/packages'">
            <input type="checkbox" id="check-all" v-model="selectAll">
            <label for="check-all">Выбрать все</label>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {}
  },
  computed: {
    user: function () {
      return this.$store.getters.user
    },
    searchPhrase: {
      get: function () {
        return this.$store.state.searchPhrase
      },
      set: function (value) {
        this.$store.commit('FILTER_PARCELS_BY', value)
      }
    },
    selectAll: {
      get: function () {
        return this.$store.state.selectAll
      },
      set: function () {
        return this.$store.commit('SELECT_ALL_PARCELS')
      }
    }
  },
  methods: {
    selectAllParcels: function () {
      this.$store.commit('SELECT_ALL_PARCELS')
    }
  },
  mounted: function () {
    this.$store.dispatch('getUser')
  }
}
</script>
