//导入vue.js
import Vue from 'vue';
import axios from 'axios';

//导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件
// iview组件库引入图钉
import { Affix } from 'iview';
Vue.component('Affix', Affix);

//导入vue-router这个路由模块进行整个系统的路由控制
//导入vue-router这个包
import VueRouter from 'vue-router';

//将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);

//导入组件对象
import layout from './components/layout.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import cart from './components/goods/cart.vue';
import login from './components/account/login.vue';
import shopping from './components/goods/shopping.vue';
import pay from './components/goods/pay.vue';
import paysuccess from './components/goods/paysuccess.vue';
import payorder from './components/goods/payorder.vue';
import vipcenter from './components/account/vipcenter.vue';
import myorder from './components/account/myorder.vue';
import myorderinfo from './components/account/myorderinfo.vue';

//实例化对象并且定义路由规则
var router = new VueRouter({
  routes: [
    // 默认跳转的路由规则
    { name: 'default', path: '/', redirect: '/site/goodslist' },
    // 登录页面
    { name: 'login', path: '/login', component: login, meta: { nosave: true } },
    // 布局
    {
      name: 'layout', path: '/site', component: layout,
      children: [
        // 商品列表
        { name: 'goodslist', path: 'goodslist', component: goodslist },
        { name: 'goodsinfo', path: 'goodsinfo/:goodsid', component: goodsinfo },
        { name: 'cart', path: 'cart', component: cart, meta: { needlogin: true } },
        { name: 'shopping', path: 'shopping/:ids', component: shopping, meta: { needlogin: true } },
        { name: 'pay', path: 'pay/:orderid', component: pay, meta: { needlogin: true } },
        { name: 'paysuccess', path: 'paysuccess', component: paysuccess, meta: { needlogin: true } },
        { name: 'payorder', path: 'payorder/:orderid', component: payorder, meta: { needlogin: true } },
        { name: 'vipcenter', path: 'vipcenter', component: vipcenter, meta: { needlogin: true } },
        { name: 'myorder', path: 'myorder', component: myorder, meta: { needlogin: true } },
        { name: 'myorderinfo', path: 'myorderinfo/:orderid', component: myorderinfo, meta: { needlogin: true } },
      ]
    },
  ]
});

//导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  if (!to.meta.nosave) {
    localStorage.setItem('callbackpage', to.path);
  }
  if (to.meta.needlogin) {
    // 需要登录的网页
    axios.get('/site/account/islogin').then(res => {
      // console.log(res.data);
      if (res.data.code == "nologin") {
        router.push({ name: 'login' });
      }
    })
  }
  next();
})


//导入vue的一个组件库:element-ui
import elementUI from 'element-ui';
// 导入默认样式(由于咱们自己修改了样式所以要替换默认样式)
import '../statics/elementuiCss/index.css';

// 导入自己编写的全局样式
import '../statics/site/css/style.css';

// 绑定到vue中
Vue.use(elementUI);



axios.defaults.baseURL = 'http://127.0.0.1:8899';

// 配置axios在请求数据服务接口的时候，允许带cookie(凭证)
axios.defaults.withCredentials = true;

// 将axios对象绑定到Vue的原型属性 $ajax上，将来在任何组件中均可以通过this.$ajax中的get(),post() 就可以发出ajax请求了
Vue.prototype.$ajax = axios;


// 日期格式化过滤器
Vue.filter('datefmt', (input, showTime) => {
  var date = new Date(input);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  if (!showTime) {
    return y + '/' + m + '/' + d;
  } else {
    return y + '/' + m + '/' + d + '  ' + h + ':' + m + ':' + s;
  }
});

import { getItem } from './kits/localStoragehelper';

// 使用vuex
import vuex from 'vuex';
import { setItem } from '../../../vue-tea/src/kits/localStoragehelper';
Vue.use(vuex);

var state = {
  buyCount: 0 //购物车的购买数量
}

// 这个对象定义的方法通过actions中的方法触发
var mutations = {
  // 第一个参数：代表上面定义的state对象
  // 第二个参数：
  changeCount(state, goodsobj) {
    // var obj = getItem();
    // console.log(obj);
    // // 总数
    // var totalCount = 0;
    // for (var key in obj) {
    //   totalCount += obj[key];
    // }
    // state.buyCount = totalCount;
    // state.buyCount = goodsobj
    state.buyCount += goodsobj.count;
    setItem(goodsobj)

  }
  // return 
}

// //actions在外部可以通过编写：this.$store.dispatch('actions定义好的方法名称',传入参数) 
var actions = {
  changeCount({ commit }, goodsobj) {
    commit('changeCount', goodsobj);
  }
}

var getters = {
  getTotalCount(state) {
    if (state.buyCount > 0) {
      return state.buyCount;
    } else {
      var obj = getItem();
      // console.log(obj);
      // 总数
      var totalCount = 0;
      for (var key in obj) {
        totalCount += obj[key];
      }
      return totalCount;
    }
  }

}

var store = new vuex.Store({
  state, mutations, actions, getters
})

//实例化vue对象
new Vue({
  el: '#app',
  store,
  router,  //绑定路由对象使它生效
  // render:function(create){create(App)}
  // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
  render: create => create(App)
});
