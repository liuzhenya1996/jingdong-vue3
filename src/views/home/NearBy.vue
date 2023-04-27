<template>
  <div class="nearby">
    <div>
      <h3 class="nearby_title">附近店铺</h3>
    </div>
    <ShopInfo v-for="item in nearbyList" :key="item._id" :item="item" :hasBorder="true" @click="linkToContent(item._id)" />
  </div>
</template>

<script>
import ShopInfo from '../../components/ShopInfo.vue'
import { get } from '../../utiles/request'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    try {
      const res = await get('/api/shop/hot-list')
      nearbyList.value = res.data
    } catch (error) {
      console.warn(error)
    }
  }
  return { nearbyList, getNearbyList }
}

const useLinkToContentEffect = () => {
  const router = useRouter()
  const linkToContent = (marketId) => {
    router.push({ name: 'shop', query: { marketId } })
  }
  return linkToContent
}

export default {
  name: 'NearBy',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = userNearbyListEffect()
    getNearbyList()
    const linkToContent = useLinkToContentEffect()
    return { nearbyList, linkToContent }
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
