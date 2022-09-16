<template>
  <div class="about">
    <div class="box_about">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
    <img :src="avatar" alt="" />
  </div>
</template>

<script>
// import BUS from '@/utils/bus'
export default {
  data () {
    return {
    }
  },
  computed: {
    avatar () {
      let theme = localStorage.getItem('theme') === 'false' ? 'light' : 'dark'
      return require(`@/assets/images/logo-${theme}.png`)
    }
  },
  created () {
    // this.avatar = require(`@/assets/images/logo-light.png`);
    // this.$bus.$on("changeTheme", theme => {
    //   console.log(theme);
    //   theme = theme ? "light" : "dark";
    //   console.log(theme);
    //   this.avatar = require(`@/assets/images/logo-${theme}.png`);
    //   console.log(this.avatar);
    // });
  },
  mounted () {
    // console.log(this.avatar);
  },
  methods: {
    // changeTheme () {
    //   console.log(1111);
    // }
  }
}
</script>

<style lang="less" scoped>
.about {
  .box_about {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .top {
      background-color: var(--top-bg);
      // flex: 1;
      width: 500px;
      height: 200px;
    }
    .bottom {
      background-color: var(--bottom-bg);
      // flex: 1;
      width: 500px;
      height: 300px;
    }
  }
}
</style>