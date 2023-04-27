import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: [
      // {
      //   marketName: '沃尔玛',
      //   marketId: '1',
      //   shopList: [
      //     {
      //       shopName: '番茄 250g / 份',
      //       shopId: '1',
      //       shopImgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
      //       shopOldPrice: 39.6,
      //       shopPrice: 33.6,
      //       shopSales: 10,
      //       count: 0,
      //       checked: false
      //     }
      //   ]
      // }
    ]
  },
  getters: {
  },
  mutations: {
    changeCartList (state, { marketName, marketId, shopName, shopId, shopImgUrl, shopOldPrice, shopPrice, shopSales, changeNum, checked }) {
      const market = state.cartList.find(i => i.marketId === marketId)
      if (!market) {
        state.cartList.push({
          marketName,
          marketId,
          shopList: [{ shopName, shopId, shopImgUrl, shopOldPrice, shopPrice, shopSales, count: 1, checked }]
        })
      } else {
        const shop = market.shopList.find(i => i.shopId === shopId)
        if (!shop) {
          market.shopList.push({ shopName, shopId, shopImgUrl, shopOldPrice, shopPrice, shopSales, count: 1, checked })
        } else {
          shop.count = Math.max(0, shop.count + changeNum)
          shop.checked = checked
        }
      }
    },
    toggleAllChecked (state, { marketId, checked }) {
      const market = state.cartList.find(i => i.marketId === marketId)
      market.shopList.forEach(shop => {
        shop.checked = checked
      })
    },
    clearShopList (state, marketId) {
      const market = state.cartList.find(i => i.marketId === marketId)
      market.shopList = []
    }
  },
  actions: {
  },
  modules: {
  }
})
