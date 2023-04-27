<template>
  <div class="wrapper">
    <img class="wrapper_img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
    <div class="wrapper_input">
      <input class="wrapper_input_content" placeholder="请输入手机号">
    </div>
    <div class="wrapper_input">
      <input v-model="username" class="wrapper_input_content" placeholder='请输入密码' type="password">
    </div>
    <div class="wrapper_input">
      <input v-model="password" class="wrapper_input_content" placeholder='确认密码' type="password">
    </div>
    <div class="wrapper_register-button" @click='handleRegister'> 注册</div>
    <div class="wrapper_register-link" @click='handleToLogin'>
      已有账号去登陆
    </div>
    <ToastView v-show='showToast' :message='ToastMessage' />
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utiles/request'
import ToastView, { useToastEffect } from '../../components/ToastView.vue'

// 填写账号密码注册的逻辑
const useRegisterEffect = (changeToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    checkpassword: ''
  })
  const handleRegister = async () => {
    try {
      if (data.username === '' || data.password === '') {
        changeToast('账号密码不能为空')
      } else {
        const result = await post('/api/user/register', {
          username: data.username,
          password: data.password
        })
        // console.log(result)
        if (result && result.errno === 0) {
          changeToast('注册成功，请登录')
          setTimeout(() => { router.push({ name: 'login' }) },
            2500)
        } else {
          changeToast('注册失败')
        }
      }
    } catch (e) {
      // alert('请求失败')
      changeToast('请求失败')
    }
  }
  const { username, password, checkpassword } = toRefs(data)
  return { username, password, checkpassword, handleRegister }
}

// “立即注册”“ 已有账号去登陆”跳转登录页面
const useToLoginrEffect = () => {
  const router = useRouter()
  const handleToLogin = () => {
    router.push({ name: 'login' })
  }
  return { handleToLogin }
}
export default {
  name: 'RegisterView',
  components: { ToastView },
  setup () {
    const { changeToast, showToast, ToastMessage } = useToastEffect()
    const { username, password, checkpassword, handleRegister } = useRegisterEffect(changeToast)
    const { handleToLogin } = useToLoginrEffect()

    return {
      changeToast,
      showToast,
      ToastMessage,
      username,
      password,
      checkpassword,
      handleRegister,
      handleToLogin
    }
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
    border-radius: 0.06trm;

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

  &_register-button {
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

  &_register-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-color;
  }
}
</style>
