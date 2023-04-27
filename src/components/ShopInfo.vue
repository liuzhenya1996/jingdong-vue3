<template>
  <div class="shop">
    <img class="shop_img" :src="item.imgUrl">
    <div class="shop_content " :class="{ 'shop_content_bordered': hasBorder ? true : false }">
      <div class="shop_content_title">{{ item.name }}</div>
      <div class="shop_content_tags">
        <span class="shop_content_tag">月售¥{{ item.sales }}</span>
        <span class="shop_content_tag">起送¥{{ item.expressLimit }}</span>
        <span class="shop_content_tag">基础运费¥{{ item.expressPrice }}</span>
      </div>
      <p class="shop_content_highlight">
        {{ item.slogan }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hasBorder']
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';

.shop {

    display: flex;
    padding-top: .12rem;

    &_img {
        width: .56rem;
        height: .56rem;
        margin-right: .16rem;
    }

    &_content {
        flex: 1;

        &_bordered {
            border-bottom: 0.01rem solid $content-bg-color;
        }

        &_title {
            line-height: .22rem;
            font-size: .16rem;
            color: $content-font-color;
        }

        &_tags {
            line-height: .08rem;
            font-size: .13rem;
            color: $content-font-color;
            margin: .08rem 0;
        }

        &_tag {
            margin-right: .16rem;
        }

        &_highlight {
            color: #E93B3B;
            line-height: .08rem;
            font-size: .13rem;
        }

    }
}
</style>
