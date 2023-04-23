<template>
  <div>
    <div class="position">
      <span class="iconfont position_icon">&#xe64c;</span>
        北京理工大学国防科技园2号楼10层国防科技园2号楼10层
      <span class="iconfont position_notice">&#xe60d;</span>
    </div>
    <div class="search">
      <span class="iconfont ">&#xe600;</span>
      <span class="search_text">山姆会员商店优惠商品</span>
    </div>
    <div class="banner">
      <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
    </div>
    <div class="icons">
      <div v-for="(item, index) in iconList" :key='index' class="icons__item">
        <img class="icons__item__img" :src="`http://www.dell-lee.com/imgs/vue3/${item.imgUrl}.png`" />
        <p class="icons__item__desc">{{ item.text }}</p>
      </div>
    </div>
    <div class="gap"></div>
  </div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      { imgUrl: '超市', text: '超市便利' },
      { imgUrl: '菜市场', text: '菜市场' },
      { imgUrl: '水果店', text: '水果店' },
      { imgUrl: '鲜花', text: '鲜花绿植' },
      { imgUrl: '医药健康', text: '医药健康' },
      { imgUrl: '家居', text: '家居时尚' },
      { imgUrl: '蛋糕', text: '烘培蛋糕' },
      { imgUrl: '签到', text: '签到' },
      { imgUrl: '大牌免运', text: '大牌免运' },
      { imgUrl: '红包', text: '红包套餐' }
    ]
    return { iconList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.position {
  position: relative;
  padding: .16rem .3rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  color: $content-font-color;
  @include ellipsis;

  &_icon {
    position: relative;
    top: .02rem;
    font-size: .2rem;
    margin-right: .08rem;
  }

  &_notice {
    position: absolute;
    top: .2rem;
    right: 0;
    font-size: .22rem;
  }
}

.search {
  height: .32rem;
  line-height: .32rem;
  background-color: #fff;
  color: $search-font-color;
  background: $search-bg-color;
  border-radius: .16rem;
  font-size: .14rem;
  vertical-align: middle;
  display: flex;
  margin-bottom: .12rem;

  .iconfont {
    font-size: .16rem;
    padding: 0 .08rem 0 .16rem;
  }

  &_text {
    justify-content: center;
    align-items: center;
  }
}

.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;

  img {
    width: 100%;
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;
  color: $content-font-color;

  &__item {
    width: 20%;

    &__img {
      width: .4rem;
      height: .4rem;
      display: block;
      margin: 0 auto;
    }

    &__desc {
      text-align: center;
      margin: .06rem 0 .16rem 0;
    }
  }
}

.gap {
  margin: 0 -.18rem;
  height: .1rem;
  background: $content-bg-color
}
</style>
