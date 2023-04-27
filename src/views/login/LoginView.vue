<template>
  <div class="wrapper">
    <img class="wrapper_img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
    <div class="wrapper_input">
      <input v-model="username" class="wrapper_input_content" placeholder="请输入手机号">
    </div>
    <div class="wrapper_input">
      <input v-model="password" class="wrapper_input_content" placeholder='请输入密码' type="password">
    </div>
    <div class="wrapper_login-button" @click='handleLogin'>登录</div>
    <div class="wrapper_login-link" @click='handleToRegister'>
      立即注册
    </div>
    <ToastView v-show='showToast' :message='ToastMessage' />
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utiles/request'
import ToastView, { useToastEffect } from '../../components/ToastView.vue'

// 填写账号密码登录的逻辑
const useLoginEffect = (changeToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result && result.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'home' })
      } else {
        changeToast('登录失败')
      }
    } catch (e) {
      changeToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

// “立即注册”跳转注册页面
const useToRegisterEffect = () => {
  const router = useRouter()
  const handleToRegister = () => {
    router.push({ name: 'register' })
  }
  return { handleToRegister }
}
export default {
  name: 'LoginView',
  components: { ToastView },
  setup () {
    // const toastData = useToastEffect.toastData
    const { changeToast, showToast, ToastMessage } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(changeToast)

    const { handleToRegister } = useToRegisterEffect()

    return { handleLogin, handleToRegister, username, password, showToast, ToastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translate(0, -50%);

  &_img {
    width: 0.66rem;
    height: 0.66rem;
    display: block;
    margin: 0 auto .4rem auto;
  }

  &_input {
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    background-color: #F9F9F9;
    border: 0.01rem solid rgba($color: #000000, $alpha: 0.1);
    border-radius: 0.06rem;

    &_content {
      box-sizing: border-box;
      width: 100%;
      line-height: .48rem;
      background: none;
      border: none;
      padding: 0 .16rem;
      font-size: 0.16rem;
      color: $content-notice-color;
    }
  }

  &_login-button {
    height: .48rem;
    margin: .32rem .4rem .16rem .4rem;
    background: #0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    color: #fff;
    font-size: .16rem;
    text-align: center;
    line-height: .48rem;
  }

  &_login-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-color;
  }
}
</style>
