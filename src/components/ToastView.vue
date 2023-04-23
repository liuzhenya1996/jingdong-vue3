<template>
    <div class="toast"> {{ message }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    ToastMessage: ''
  })
  const changeToast = (message) => {
    toastData.showToast = true
    toastData.ToastMessage = message
    setTimeout(() => {
      toastData.showToast = false
      toastData.ToastMessage = ''
    }, 2000)
  }
  const { showToast, ToastMessage } = toRefs(toastData)
  return { showToast, ToastMessage, changeToast }
}
export default {
  props: ['message'],
  name: 'ToastView'

}
</script>
<style lang="scss">
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: .1rem .15rem;
  border-radius: .06rem;
  color: #fff;
  background: rgba($color: #000000, $alpha: .35);
}
</style>
