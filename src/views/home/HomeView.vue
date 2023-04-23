<template>
  <div>
    <div class="wrapper">
      <StaticPart />
      <NearBy />
    </div>
    <DockerBar />
  </div>
</template>

<script>
import StaticPart from './StaticPart.vue'
import DockerBar from './Docker.vue'
import NearBy from './NearBy.vue'
export default {
  name: 'HomeView',
  components: {
    StaticPart,
    NearBy,
    DockerBar
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem .3rem .18rem;
  overflow-y: auto;
}
</style>
