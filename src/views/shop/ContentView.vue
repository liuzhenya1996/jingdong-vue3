<template>
    <div class="content">
      <div class="category">
          <div
            v-for="(item, index) in categories" :key="index" @click="() => handleTabClick(item.tab)"
            :class="{ 'category_item': true, 'category_item-active': currentTab === item.tab ? true : false }"
          >
            {{ item.name }}
        </div>
      </div>
      <div class="product">
        <div v-for="item in contentList" :key="item._id" class="product_item">
          <img class="product_item_img" :src="item.imgUrl" />
          <div class="product_item_detail">
            <div class="product_item_title">{{ item.name }}</div>
            <p class="product_item_sales">月售{{ item.sales }}件</p>
            <p class="product_item_price">
              <span class="product_item_yen">&yen;</span>{{ item.price }}
              <span class="product_item_origin">&yen;{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="product_number">
            <span class="product_number_minus" @click="changeShopNum(item, -1)">-</span>
              {{ getItemCount(item) }}
            <span class="product_number_plus" @click="changeShopNum(item, 1)">+</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utiles/request'
import { useStore } from 'vuex'

// 得到侧边栏tab
const useTabEffect = () => {
  const categories = [{
    name: '全部商品',
    tab: 'all'
  }, {
    name: '秒杀',
    tab: 'seckill'
  }, {
    name: '新鲜水果',
    tab: 'fruit'
  }]
  return { categories }
}

// 监听侧边栏不同切换不同内容
const useGetContentEffect = (currentTab) => {
  const route = useRoute()
  const { shopId } = route.query
  const data = reactive({
    contentList: []
  })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result.errno === 0 && result.data.length) {
      data.contentList = result.data
    }
  }
  // 在这里，我们知道，getContentData 是依赖于 currentTab 的，但是使用 watchEffect 后，vue会智能的监听你所依赖的数据，很好用，不用指定依赖哪个数据
  watchEffect(() => {
    getContentData()
  })
  const { contentList } = toRefs(data)
  return { contentList, shopId }
}

// 侧边栏，选中的效果1：切取内容，2：背景变白
const useTabClickEffect = () => {
  const data = reactive({
    currentTab: 'all'
  })
  const handleTabClick = (tab) => {
    data.currentTab = tab
  }
  const { currentTab } = toRefs(data)
  return { handleTabClick, currentTab }
}

// 点击加减时，将数据直接同步至 vuex，并直接使用 vuex 中的数据
const useChangeItemEffect = (marketName) => {
  const store = useStore()
  const route = useRoute()
  const { shopId: marketId } = route.query
  const cartList = store.state.cartList
  const changeShopNum = (shopItem, changeNum) => {
    const {
      name: shopName,
      _id: shopId,
      imgUrl: shopImgUrl,
      oldPrice: shopOldPrice,
      price: shopPrice,
      sales: shopSales
    } = shopItem
    store.commit('changeCartList', { marketName, marketId, shopName, shopId, shopImgUrl, shopOldPrice, shopPrice, shopSales, changeNum })
  }
  const getItemCount = (shopItem) => {
    const market = store.state.cartList.find(i => i.marketId === marketId)
    if (!market) return 0
    else {
      const shop = market.shopList.find(i => i.shopId === shopItem._id)
      if (!shop) return 0
      else {
        return shop.count
      }
    }
  }
  return { cartList, changeShopNum, getItemCount }
}

export default {
  name: 'ContentView',
  props: ['marketName'],
  setup (props) {
    const { categories } = useTabEffect()
    const { currentTab, handleTabClick } = useTabClickEffect()
    const { contentList } = useGetContentEffect(currentTab)
    const { cartList, changeShopNum, getItemCount } = useChangeItemEffect(props.marketName)

    return {
      contentList,
      categories,
      handleTabClick,
      currentTab,
      cartList,
      changeShopNum,
      getItemCount
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  left: 0;
  top: 1.5rem;
  right: 0;
  bottom: .5rem;
}

.category {
  overflow-y: scroll;
  width: .76rem;
  background: $search-bg-color;
  height: 100%;
  display: flex;
  flex-direction: column;

  &_item {
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;
    color: $content-font-color;
    width: .76rem;
    display: block;

    &-active {
      background: #fff;
    }
  }
}

.product {
  overflow-y: scroll;
  flex: 1;
  &_item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: 1px solid #F1F1F1;

    &_img {
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }

    &_detail {
      overflow: hidden;
    }

    &_title {
      font-size: .14rem;
      color: $content-font-color;
      line-height: .2rem;
      @include ellipsis;
    }

    &_sales {
      margin: .08rem 0;
      font-size: .12rem;
      line-height: .16rem;
    }

    &_price {
      color: #E93B3B;
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
    }

    &_yen {
      font-size: .08rem;
    }

    &_origin {
      font-size: .1rem;
      color: #999999;
      line-height: .2rem;
      text-decoration: line-through;
      margin-left: .05rem;
    }

    .product_number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;

      &_minus,
      &_plus {
        display: inline-block;
        width: .2rem;
        height: .2rem;
        border-radius: 50%;
        text-align: center;
        line-height: .16rem;
        font-size: .2rem;
      }

      &_minus {
        border: .01rem solid #666;
        margin-right: .05rem;
      }

      &_plus {
        background: #0091FF;
        color: #fff;
        margin-left: .05rem;
      }
    }
  }
}
</style>
