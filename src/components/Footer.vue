<style lang="sass">
  .footer
    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05)
    z-index: 1
    &__container
      display: flex
      justify-content: space-between
      align-items: center
      height: 100px
    &__counts-checked
      display: block
      padding-left: 33px
      color: #6e7274
    &__something
      display: block
      width: 193px
      height: 48px
      border-radius: 3px
      background-color: #f5f5f5
</style>

<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer__container">
        <span class="footer__counts-checked">Выбран {{checkedCount}} элемент</span>
        <span class="footer__something"></span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'main-footer',
  computed: {
    checkedCount () {
      return this.$store.getters.checkedCount
    }
  }
}
</script>
