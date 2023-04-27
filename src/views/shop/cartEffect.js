import { useStore } from 'vuex'
import { useRouteEffect } from './routeEffect'
// 点击加减时，将数据直接同步至 vuex，并直接使用 vuex 中的数据
export const useCartEffect = (marketName) => {
  const store = useStore()
  const { getQueryValue } = useRouteEffect()
  const marketId = getQueryValue('marketId')
  const cartList = store.state.cartList
  // 获取当前商家的购物车list
  const getShopList = () => {
    const market = store.state.cartList.find(i => i.marketId === marketId)
    if (!market) return []
    else return market.shopList.filter(shop => shop.count > 0)
  }
  // 计算当前商家购物车内的数量/价格
  const calcShopList = (type) => {
    const market = store.state.cartList.find(i => i.marketId === marketId)
    if (!market) return 0
    else {
      let res = 0
      market.shopList.filter(shop => shop.checked).forEach(shop => {
        type === 'price' ? res += shop.count * shop.shopPrice : res += shop.count
      })
      return type === 'price' ? res.toFixed(2) : res
    }
  }
  // 数量
  const getShopListCount = () => calcShopList('count')
  // 价格
  const getShopListPrice = () => calcShopList('price')
  // 获取单个商品的信息 by ID
  const getShopItemById = (shopId) => {
    const market = store.state.cartList.find(i => i.marketId === marketId)
    if (!market) return null
    else {
      const shop = market.shopList.find(i => i.shopId === shopId)
      if (!shop) return null
      else {
        return shop
      }
    }
  }
  // 获取单个商品的选中状态
  const getShopChecked = (shopId) => {
    const shopItem = getShopItemById(shopId)
    if (!shopItem) return false
    else return shopItem.checked
  }
  // 获取单个商品的数量
  const getShopCount = (shopId) => {
    const shopItem = getShopItemById(shopId)
    if (!shopItem) return 0
    else return shopItem.count
  }
  // 获取全部商品的全选状态
  const getAllCheced = () => {
    const shopList = getShopList()
    return shopList.every(shop => shop.checked)
  }
  // 改变单个商品的选中状态
  const changeShopChecked = (shopItem, checked) => {
    store.commit('changeCartList', { marketId: marketId, marketName: marketName.value, ...shopItem, changeNum: 0, checked })
  }
  // 改变单个商品的数量
  const changeShopNum = (shopItem, changeNum) => {
    store.commit('changeCartList', { marketId: marketId, marketName: marketName.value, ...shopItem, changeNum, checked: true })
  }
  // 切换全部商品的全选状态
  const toggleAllChecked = () => {
    const allCheckedStatus = getAllCheced()
    store.commit('toggleAllChecked', { marketId, checked: !allCheckedStatus })
  }
  // 清除当前商家的购物车
  const clearShopList = () => {
    store.commit('clearShopList', marketId)
  }
  return { cartList, changeShopChecked, changeShopNum, toggleAllChecked, getShopCount, getShopList, getShopListCount, getShopListPrice, getShopChecked, getAllCheced, clearShopList }
}
