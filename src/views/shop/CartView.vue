<template>
  <div>
    <div class="mask" v-show="showStatus" @click="toggleShowStatus"></div>
    <div class="cart">
      <div class="product" v-show="showStatus">
        <div class="product__header">
          <div class="product__header__all">
            <span class="product__header__icon iconfont" v-html="'&#xe667;'"></span>
            全选
          </div>
          <div class="product__header__clear">
            <span class="product__header__clear__btn">清空购物车</span>
          </div>
        </div>
        <template v-for="item in productList">
          <div class="product__item" v-if="item.count > 0" :key="item._id">
            <div class="product__item__checked iconfont" v-html="'&#xe667;'"></div>
            <img class="product__item__img" />
            <div class="product__item__detail">
              <h4 class="product__item__title">{{ '名称' }}</h4>
              <p class="product__item__price">
                <span class="product__item__yen">&yen;</span>{{ 0 }}
                <span class="product__item__origin">&yen;{{ 0 }}</span>
              </p>
            </div>
            <div class="product__number">
              <span class="product__number__minus">-</span>
              {{ 0 }}
              <span class="product__number__plus">+</span>
            </div>
          </div>
        </template>
      </div>
      <div class="check">
        <div class="check__icon" @click="toggleShowStatus">
          <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img" />
          <div class="check__icon__tag">0</div>
        </div>
        <div class="check__info" @click="toggleShowStatus">
          总计：<span class="check__info__price">&yen; 0</span>
        </div>
        <div class="check__btn">
          <router-link :to="{}">
            去结算
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
const useShowCartViewEffect = () => {
  const showStatus = ref(false)
  const toggleShowStatus = () => {
    showStatus.value = !showStatus.value
  }
  return { showStatus, toggleShowStatus }
}
export default {
  setup () {
    const { showStatus, toggleShowStatus } = useShowCartViewEffect()
    return {
      showStatus, toggleShowStatus
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 1;
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: $bgColor;
}

.product {
  overflow-y: scroll;
  flex: 1;
  background: $bgColor;

  &__header {
    display: flex;
    line-height: .52rem;
    border-bottom: 1px solid $content-bg-color;
    font-size: .14rem;
    color: $content-font-color;

    &__all {
      width: .64rem;
      margin-left: .18rem;
    }

    &__icon {
      display: inline-block;
      margin-right: .1rem;
      vertical-align: top;
      color: $btn-bgColor;
      font-size: .2rem;
    }

    &__clear {
      flex: 1;
      margin-right: .16rem;
      text-align: right;

      &__btn {
        display: inline-block;
      }
    }
  }

  &__item {
      position: relative;
      display: flex;
      padding: .12rem 0;
      margin: 0 .16rem;
      border-bottom: .01rem solid $content-bg-color;

      &__checked {
        line-height: .5rem;
        margin-right: .2rem;
        color: $btn-bgColor;
        font-size: .2rem;
      }

      &__detail {
        overflow: hidden;
      }

      &__img {
        width: .46rem;
        height: .46rem;
        margin-right: .16rem;
      }

      &__title {
        margin: 0;
        line-height: .2rem;
        font-size: .14rem;
        color: $content-font-color;
        @include ellipsis;
      }

      &__price {
        margin: .06rem 0 0 0;
        line-height: .2rem;
        font-size: .14rem;
        color: $hightlight-fontColor;
      }

      &__yen {
        font-size: .12rem;
      }

      &__origin {
        margin-left: .06rem;
        line-height: .2rem;
        font-size: .12rem;
        color: $light-fontColor;
        text-decoration: line-through;
      }

      .product__number {
        position: absolute;
        right: 0;
        bottom: .26rem;

        &__minus,
        &__plus {
          display: inline-block;
          width: .2rem;
          height: .2rem;
          line-height: .16rem;
          border-radius: 50%;
          font-size: .2rem;
          text-align: center;
        }

        &__minus {
          border: .01rem solid $medium-fontColor;
          color: $medium-fontColor;
          margin-right: .05rem;
        }

        &__plus {
          background: $btn-bgColor;
          color: $bgColor;
          margin-left: .05rem;
        }
      }
  }
}

.check {
  display: flex;
  height: .49rem;
  border-top: .01rem solid $content-bg-color;
  line-height: .49rem;

  &__icon {
    position: relative;
    width: .84rem;

    &__img {
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }

    &__tag {
      position: absolute;
      left: .46rem;
      top: .04rem;
      padding: 0 .04rem;
      min-width: .2rem;
      height: .2rem;
      line-height: .2rem;
      background-color: $hightlight-fontColor;
      border-radius: .1rem;
      font-size: .12rem;
      text-align: center;
      color: #fff;
      transform: scale(.5);
      transform-origin: left center;
    }
  }

  &__info {
    flex: 1;
    color: $content-font-color;
    font-size: .12rem;

    &__price {
      line-height: .49rem;
      color: $hightlight-fontColor;
      font-size: .18rem;
    }
  }

  &__btn {
    width: .98rem;
    background-color: #4FB0F9;
    text-align: center;
    font-size: .14rem;

    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>
