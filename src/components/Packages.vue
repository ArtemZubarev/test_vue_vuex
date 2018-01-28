<style lang="sass">
  .list-item
    position: relative
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0
    &__col
      list-style: none
      cursor: default
      &:nth-of-type(1)
        padding-left: 33px
        flex-basis: 15.8%
      &:nth-of-type(2)
        flex-basis: 23.7%
      &:nth-of-type(3)
        flex-basis: 14.6%
      &:nth-of-type(4)
        flex-basis: 11.8%
      &:nth-of-type(5)
        flex-basis: 15.4%
      &:nth-of-type(6)
        flex-basis: 18.7%

  .fa-arrow
    display: inline-block
    width: 9px
    height: 14px
    margin: 0 5px
    background: url("../assets/fa-angle-right.png")
  .packages
    &__list-titles
      margin: 0
      color: #9e9e9e
      font-size: 25px
      font-weight: 400
      border-bottom: 1px solid #9e9e9e
      height: 96px
    &__item
      height: 100px
  .package
    margin: 4px 0
    background: #fff
    border-radius: 4px
    transition: 0.1s
    &:hover
      z-index: 10
      box-shadow: 0 5px 10px rgba(19, 18, 18, 0.2)

    &__code
      color: #5e6265
      font-size: 21px
      font-weight: 700
      text-transform: uppercase
    &__direction
      span
        color: #5e6265
        font-size: 25px
        font-weight: 400
      .icon
        color: #5e6265
        font-size: 14px
        margin: 0 5px
    &__location
      span
        font-size: 21px
        font-weight: 700
        color: #5e6265
      .icon
        font-size: 14px
        color: #b7b7b7
    &__status
      span
        font-size: 21px
        color: #898c8e
        &.handed
          color: #2196f3
      .icon
        font-size: 14px
        color: #2196f3
    &__importance
      span
        font-size: 21px
        color: #898c8e
        &.tall
          color: #e8164c
      .icon
        font-size: 14px
        color: #e8164c
    &__sender
      color: #898c8e
      font-size: 21px
    &__check
      position: absolute
      width: 32px
      height: 32px
      right: 39px
      top: 34px
      label
        position: relative
        display: inline-block
        width: 32px
        height: 32px
        border: 2px solid #cecece
        border-radius: 18px
        cursor: pointer
        &:after
          display: block
          position: absolute
          content: ''
          top: 8px
          right: 8px
          bottom: 8px
          left: 8px
          border-radius: 8px
          background-color: #acacac
          transition: 0.1s
      input
        position: absolute
        visibility: hidden
        &:checked
          & ~ label:after
            background: #2196f3
</style>

<template>
  <section class="packages">
    <div class="wrapper">
      <ul class="packages__list-titles list-item">
        <li class="list-item__col">Трек-код</li>
        <li class="list-item__col">Направление</li>
        <li class="list-item__col">Местоположение</li>
        <li class="list-item__col">Статус</li>
        <li class="list-item__col">Важность</li>
        <li class="list-item__col">Отправитель</li>
        <li class="list-item__col"></li>
      </ul>
      <div class="packages__list">
        <ul class="packages__item package list-item" v-for="parcel in parcels" :key="parcel.key">
          <li class="package__code list-item__col">{{parcel.code}}</li>
          <li class="package__direction list-item__col">
            <span>{{parcel.from}}</span>
            <svg class="icon icon-fa-angle-right"><use xlink:href="#icon-fa-angle-right"></use></svg>
            <span>{{parcel.to}}</span>
          </li>
          <li class="package__location list-item__col">
            <svg class="icon icon-fa-location-arrow"><use xlink:href="#icon-fa-location-arrow"></use></svg>
            <span>{{parcel.location}}</span>
          </li>
          <li class="package__status list-item__col">
            <svg v-if="parcel.status == 'handed'" class="icon icon-fa-check-circle-o"><use xlink:href="#icon-fa-check-circle-o"></use></svg>
            <span v-bind:class="{handed: parcel.status == 'handed'}">{{parcel.status == 'handed' ? 'Вручено' : 'В пути'}}</span>
          </li>
          <li class="package__importance list-item__col">
            <svg v-if="parcel.important == 'tall'" class="icon icon-fa-warning"><use xlink:href="#icon-fa-warning"></use></svg>
            <span v-bind:class="{tall: parcel.important == 'tall'}">{{parcel.important == 'tall' ? 'Срочная доставка' : 'Стандартная'}}</span>
          </li>
          <li class="package__sender list-item__col">
            <span>{{parcel.sender}}</span>
            <span class="package__check">
              <input :id="'package_check_' + parcel.key" type="checkbox" v-model="parcel.props.checked">
              <label :for="'package_check_' + parcel.key"></label>
            </span>
          </li>

        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Packages',
  computed: {
    parcels () {
      if (this.$store.getters.searchPhrase) {
        return this.$store.getters.filteredList
      } else {
        return this.$store.getters.parcelsList
      }
    }
  },
  mounted: function () {
    this.$store.commit('CLEAR_PARCELS_LIST')
    this.$store.dispatch('getParcels')
  }
}
</script>
