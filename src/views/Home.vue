<template>
  <div class="home">
    <div>
      <el-switch
        v-model="theme"
        @change="changeSkin"
        active-text="黑色背景"
        inactive-text="白色背景"
      >
      </el-switch>
    </div>
    <div class="box">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="less_box add">
      <img :src="avatar" alt="" />
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>

<script>
import { initTheme } from '@/theme'
import { mapState, mapMutations } from 'vuex'
// import BUS from '@/utils/bus'
export default {
  data () {
    return {
      theme: true,
      input: ''
    }
  },
  computed: {
    ...mapState({ sysTheme: 'theme' }),
    avatar () {
      // let theme = this.sysTheme === false ? 'light' : 'dark'
      return require(`@/assets/images/logo-${this.sysTheme}.png`)
    }
  },
  watch: {
  },
  mounted () {
    console.log(this.sysTheme);
    this.theme = this.sysTheme === 'dark' ? true : false
    // document.body.style.setProperty('--bottom-bg', '#0094ff');
    // initTheme(this.theme)
    // console.log(1111);
  },
  methods: {
    ...mapMutations({
      setTheme: 'setTheme'
    }),
    changeSkin () {
      localStorage.setItem('theme', this.theme ? 'dark' : 'light')
      this.setTheme(this.theme ? 'dark' : 'light')
      initTheme(this.theme)
    },
    // setThemeValue (theme) {
    //   theme = theme ? "light" : "dark";
    //   this.avatar = require(`@/assets/images/logo-${theme}.png`);
    // }
  }
}
</script>
<style lang="less" scoped>
.home {
  .box {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      background-color: var(--left-bg);
      height: 500px;
      flex: 1;
    }
    .right {
      background-color: var(--right-bg);
      height: 500px;
      flex: 1;
    }
  }
  .less_box {
    height: 200px;
    width: 1500px;
    display: flex;
  }
}
</style>