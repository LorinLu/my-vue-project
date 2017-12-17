<template>
  <div class="tmpl">
    <!-- 顶部导航设定 -->
    <div id="header" class="header">
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>vue2.0单页应用</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <router-link to="/login" v-if="!islogin">登录</router-link>
            <a href="/register.html" v-if="!islogin">注册</a>
            <strong>|</strong>
            <router-link to="/site/vipcenter" v-if="islogin">会员中心</router-link>
            <a v-if="islogin" @click="logout" href="javascript:void(0)">退出</a>
            <router-link to="/site/cart" id="layoutbuycar">
              <i class="iconfont icon-cart"></i>
              购物车(
              <span id="shoppingCartCount">{{this.$store.getters.getTotalCount}}</span>)
            </router-link>
            <!--  <a href="/cart.html"><i class="iconfont icon-cart"></i>
                            购物车(<span id="shoppingCartCount">{{buyTotalCount}}</span>)</a> -->
            <!--<a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a>
                                   <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount"><script type="text/javascript" src="/tools/submit_ajax.ashx?action=view_cart_count"></script></span>)</a>-->
          </div>
        </div>
      </div>
      <div class="head-nav">
        <div class="section">
          <!-- <div class="logo">
                                   <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                               </div>-->
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <a href="/index.html">
                  首页
                </a>
              </li>
              <li class="news">
                <a href="/news.html">
                  学员问题汇总
                </a>
              </li>
              <li class="photo">
                <a href="/photo.html">
                  重难点专区
                </a>
              </li>
              <!--<li class="goods"><a href="">就业阶段</a></li>-->
              <li class="video">
                <a href="/video.html">
                  前端常用功能
                </a>
              </li>
              <li class="down">
                <a href="/down.html">
                  资源下载
                </a>
              </li>
              <li>
                <a target="_blank" href="javascript:;">
                  <router-link to="/site/goodsinfo">
                    商品详情
                  </router-link>
                </a>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                placeholder="输入关健字" x-webkit-speech="">
            </div>
            <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 中间内容占位 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import { vm, EVEN } from "../kits/bus.js";
  import { setItem } from "../kits/localStoragehelper.js";

  export default {
    data() {
      return {
        buyTotalCount: 0, //购买总数
        islogin: false
      };
    },
    mounted() {
      // jquery的实现应该要能够找到dom对象
      $("#menu2 li a").wrapInner('<span class="out"></span>');
      $("#menu2 li a").each(function () {
        $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
      });

      $("#menu2 li a").hover(
        function () {
          $(".out", this)
            .stop()
            .animate({ top: "48px" }, 300); // move down - hide
          $(".over", this)
            .stop()
            .animate({ top: "0px" }, 300); // move down - show
        },
        function () {
          $(".out", this)
            .stop()
            .animate({ top: "0px" }, 300); // move up - show
          $(".over", this)
            .stop()
            .animate({ top: "-48px" }, 300); // move up - hide
        }
      );
      // 先获取一波总购买数，看看有没有
      var count1 = localStorage.getItem("buyTotalCount");
      // console.log(count1);
      if (count1 != null) {
        this.buyTotalCount = parseInt(count1);
      }

      vm.$on(EVEN, buycount => {
        this.buyTotalCount += buycount;
        localStorage.setItem("buyTotalCount", this.buyTotalCount);
      });
      vm.$on('clearcart',cartnum=>{
        this.buyTotalCount = parseInt(cartnum);
      })

      this.islogin = localStorage.getItem('logined');
    },
    methods: {
      logout() {
        this.$ajax.get('/site/account/logout').then(res => {
          if (res.data.status == 0) {
            localStorage.setItem("logined", "false");
            this.$router.push({ name: 'login' });
          } else {
            this.$message.error(res.data.message);
          }
        })
      }
    }
  };
</script>
<style scoped>
  /* 导入样式 */

  @import url("../../statics/jqplugins/jqhovernav/jqhoverNav.css");
</style>