<template>
  <div class="wrapper">
    <div class="search">
      <div @click="handleBackClick" class="search_back iconfont">&#xe679;
      </div>
      <div class="search_content">
        <span class="search_content_icon iconfont">&#xe600;</span>
        <input class="search_content_input" placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <ShopInfo :item='data.item' v-show='data.item.imgUrl' />
    <ContentView :marketName='data.item.name' />
    <CartView :marketName='data.item.name' />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from '../../utiles/request'
import ShopInfo from '../../components/ShopInfo.vue'
import ContentView from './ContentView.vue'
import CartView from './CartView.vue'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.query.marketId}`)
    if (result.errno === 0 && result.data) {
      data.item = result.data
    }
  }
  return { data, getItemData }
}
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
export default {
  name: 'ShopView',
  components: { ShopInfo, ContentView, CartView },
  setup () {
    const { data, getItemData } = useShopInfoEffect()
    getItemData()
    const { handleBackClick } = useBackRouterEffect()
    return { data, handleBackClick }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';

.wrapper {
  padding: 0 .18rem;
}

.search {
  margin: .16rem 0 .04rem 0;
  height: .32rem;
  display: flex;
  line-height: .32rem;

  &_back {
    width: .3rem;
    color: #B6B6B6;
    font-size: .24rem;
  }

  &_content {
    flex: 1;
    background: $search-bg-color;
    border-radius: .16rem;
    display: flex;

    &_icon {
      width: .44rem;
      color: $search-font-color;
      font-size: .18rem;
      text-align: center;
    }

    &_input {
      flex: 1;
      border: none;
      outline: none;
      background: none;
      font-size: .14rem;
      padding-right: .2rem;
      color: $content-font-color;
    }
  }
}
</style>
