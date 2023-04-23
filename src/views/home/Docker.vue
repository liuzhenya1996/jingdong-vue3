<template>
  <div class="docker">
    <div v-for="(item, index) in dockerList " :key="index" class="docker_item" :class="{'docker_item-active': index === 0}">
      <div v-html="item.icon" class="iconfont"></div>
      <div class="docker_title">{{ item.text }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DockerBar',
  setup () {
    const dockerList = [
      { icon: '&#xe6b8;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe6af;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe613;', text: '订单', to: { name: 'Home' } },
      { icon: '&#xe78b;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>
<style lang="scss">
@import '../../style/viriables.scss';

.docker {
  position: absolute;
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  padding: 0 .18rem;
  height: 0.49rem;
  width: 100%;
  border-top: 1px solid $content-bg-color;
  display: flex;
  color: $content-font-color;

  &_item {
    flex: 1;
    text-align: center;

    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: .18rem;
    }

    .docker_title {
      font-size: 20px;
      transform: scale(0.5, 0.5);
      transform-origin: top;
    }

    &-active {
      color: #1FA4FC;
    }
  }
}
</style>
