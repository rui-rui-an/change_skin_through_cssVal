前言
在网上找了很多的换肤方案，其中我认为写的最好的也是有demo 的无疑是这篇https://juejin.cn/post/6844904122643120141#heading-0，但是同时也发现了一些问题，就是没有做持久化处理，并且没有把图片切换的代码放在一起。我这边的需求是需要换背景，同时也是需要切换图片的,为了大家便于理解，于是我根据他的demo改写了一下，做了持久化和图片的切换。
这篇文章写的换肤的方案有很多种，但是根据多方的调查以及搜索，最终我这边确定的是通过  CSS变量兼容性实现-2 这个方案来做的，最大的原因是便于维护，且不会对现有项目做很大的变更。这个方案也是一个比较成熟且很多人都在用的一种换肤方案。
实现过程
1.首先需要建一个存放公共css变量的js文件，将需要定义的css变量存放到该js文件，例如（variable.js）
// 字体变量
const baseSize = {
  "--font-size-large-x": "22px",
  "--font-size-large": "18px",
  "--font-size-medium": "14px",
  "--font-size-medium-x": "16px",
  "--font-size-small-s": "10px",
  "--font-size-small": "12px",
};

//浅色
export const lightTheme = {
  "--left-bg": "rgb(182, 23, 23)",
  "--right-bg": "rgb(63, 9, 9)",
  "--top-bg": "rgb(6, 36, 65)",
  "--bottom-bg": "rgb(55, 214, 10)",
  ...baseSize,
};

// 深色
export const darkTheme = {
  "--left-bg": "#0094ff",
  "--right-bg": "blue",
  "--top-bg": "red",
  "--bottom-bg": "pink",
  ...baseSize,
};
2.页面中使用css变量，例如：

<style lang="less">
  .left {
      background-color: var(--left-bg);
      height: 500px;
      flex: 1;
    }
</style>
3.安装css-vars-ponyfill 插件
npm i css-vars-ponyfill
❝
「css-vars-ponyfill」 官方概念：在传统浏览器和现代浏览器中为CSS自定义属性(又名“CSS变量”)提供客户端支持的ponyfill。 （具体用法与概念请查阅官方网站：「css-vars-ponyfill」）
❞

4.封装切换主题的js，在main.js做初始化调用
// theme.js
import { lightTheme, darkTheme } from "../src/assets/js/variable";
import cssVars from "css-vars-ponyfill";
export const initTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme ? "light" : "dark");
  cssVars({
    watch: true, // 当添加，删除或修改其<link>或<style>元素的禁用或href属性时，ponyfill将自行调用
    variables: theme ? lightTheme : darkTheme, // variables 自定义属性名/值对的集合
    onlyLegacy: false, // false  默认将css变量编译为浏览器识别的css样式  true 当浏览器不支持css变量的时候将css变量编译为识别的css
  });
};

5.main.js做调用
import { initTheme } from './theme'
let theme = localStorage.getItem('theme') === 'light' ? false : true
initTheme(theme)

6.home.vue切换主题(需要有图片，我这边在文件夹是有图片的)
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
7.vuex持久化
import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  },
  mutations: {
    setTheme (state, data) {
      state.theme = data
    }
  },
  actions: {},
  modules: {},
  // plugins: [
  //   createPersistedState({
  //     storage: window.localStorage,
  //     reducer (val) {
  //       // console.log(val);
  //       return val
  //     }
  //   })]
});

到此所有的颜色切换和图片切换都已经完成，说一下图片切换的思路：图片的路径主要使用computed来获取，这样子我们在更改主题的时候，vuex保存的主题值就会发生变化，而computed会监视该变化从而达到更换图片路径的效果
