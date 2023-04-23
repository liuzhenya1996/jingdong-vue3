<template>
  <div class="nearby">
    <div>
      <h3 class="nearby_title">附近店铺</h3>
    </div>
    <ShopInfo v-for="item in nearbyList" :key="item._id" :item="item" :hasBorder="true" />
  </div>
</template>

<script>
import ShopInfo from '../../components/ShopInfo.vue'

export default {
  name: 'NearBy',
  components: { ShopInfo },
  setup () {
    const nearbyList = [
      {
        _id: 1,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        sales: '1万+',
        expressLimit: '0',
        expressPrice: '5',
        slogan: 'VIP尊享满89元减4元运费券（每月3张）'
      },
      {
        _id: 2,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        sales: '1万+',
        expressLimit: '0',
        expressPrice: '5',
        slogan: 'VIP尊享满89元减4元运费券（每月3张）'
      },
      {
        _id: 3,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        sales: '1万+',
        expressLimit: '0',
        expressPrice: '5',
        slogan: 'VIP尊享满89元减4元运费券（每月3张）'
      }]
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.nearby {
  &_title {
    margin-top: .16rem;
    margin-bottom: .02rem;
    font-weight: normal;
    font-size: .18rem;
    color: $content-font-color;
  }

  a {
    text-decoration: none;
  }
}
</style>
