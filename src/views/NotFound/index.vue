<template>
  <div class="notfound-page">
    <div class="box">
      <span class="iconfont lost">&#xe655;</span>
      <p class="tip">糟糕，页面丢失了~</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.notfound-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @font-face {
    font-family: 'iconfont';
    src: url('@/assets/font/iconfont.woff2?t=1710902828078') format('woff2'),
      url('@/assets/font/iconfont.woff?t=1710902828078') format('woff'),
      url('@/assets/font/iconfont.ttf?t=1710902828078') format('truetype');
  }
  .iconfont {
    font-family: 'iconfont' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .box {
    text-align: center;
    .lost {
      font-size: 300px;
    }
    .tip {
      font-size: 30px;
    }
  }
}
</style>
