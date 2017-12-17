<template>
  <div class="tmpl">



    <!-- 面包屑导航 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
      </div>
    </div>

    <!-- 商品列表顶部数据,分类，轮播图，置顶数据 -->
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <!--类别菜单-->
          <div class="left-220" style="margin:0;">
            <div class="banner-nav">
              <ul>
                <!--此处声明下面可重复循环-->

                <!-- <li v-for="item in topcontent.catelist" :key="item.id">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span v-text="item.title"></span>
                    <p>
                      <span v-for="subitem in item.subcates" :key="subitem.id">
                        {{subitem.title}}
                      </span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>

                        <a href="/goods/43.html" v-for="sub">手机通讯</a>

                      </dd>
                    </dl>
                  </div>
                </li> -->
                <li v-for="item in topcontent.catelist" :key="item.id">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span v-text="item.title"></span>
                    <p>
                      <span v-for="subitem in item.subcates" :key="subitem.id">
                        {{subitem.title}}&nbsp;
                      </span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>

                        <a v-for="subitem1 in item.subcates" :key="subitem1.id" href="/goods/43.html">
                          {{subitem1.title}}
                        </a>

                      </dd>
                    </dl>
                  </div>
                </li>

              </ul>
            </div>
          </div>
          <!--/类别菜单-->

          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">
              <div id="focus-box" class="focus-box">
                <el-carousel :interval="1500" type="card">
                  <el-carousel-item v-for="item in topcontent.sliderlist" :key="item.id">
                    <img height="368" width="400" :src="item.img_url" alt="">
                    <h3>{{ item.title }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </div>

            </div>
          </div>
          <!--/幻灯片-->

          <!--推荐商品-->
          <div class="left-220">
            <ul class="side-img-list">

              <li v-for="(item,index) in topcontent.toplist" :key="index">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{item.title}}</a>
                  <span>{{item.add_time | datefmt}}</span>
                </div>
              </li>



            </ul>
          </div>
          <!--/推荐商品-->

        </div>
      </div>
    </div>


    <!-- 分类商品列表 -->
    <div v-for="(item,index) in grouplist" :key="index" class="section">

      <!--子类-->
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>

          <a href="/goods/43.html" v-for="(level2,index) in item.level2catelist" :key="index">{{level2.subcatetitle}}</a>

          <a href="/goods/40.html">更多
            <i>+</i>
          </a>
        </p>
      </div>
      <!--/子类-->
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">

            <li  v-for="artitem in item.datas" :key="artitem.artID">
              <!-- <a href="/goods/show-91.html"> -->
              <router-link v-bind="{to:'/site/goodsinfo/'+artitem.artID}">
                <div class="img-box">
                  <img :src="artitem.img_url">
                </div>
                <div class="info">
                  <h3>{{artitem.artTitle}}</h3>
                  <p class="price">
                    <b>¥{{artitem.sell_price}}.00</b>元</p>
                  <p>
                    <strong>库存{{artitem.stock_quantity}}</strong>
                    <span>市场价：
                      <s>{{artitem.market_price}}</s>
                    </span>
                  </p>
                </div>
              </router-link>
              <!-- </a> -->
            </li>

          </ul>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      // 头部主体的数据
      // {catelist: 分类数据数组,sliderlist: 轮播图数据数组 ,toplist:推荐商品数据数组 }
      topcontent: {},
      //用来存储页面底部的分类中的商品数据
      grouplist: []
    };
  },
  mounted() {
    this.gettoplist();
    this.getgoodgroup();
  },
  methods: {
    gettoplist() {
      var url = "/site/goods/gettopdata/goods";
      this.$ajax.get(url).then(res => {
        // console.log(res.data.message);
        this.topcontent = res.data.message;
      });
    },
    // 得到分类商品列表
    getgoodgroup() {
      var url = "/site/goods/getgoodsgroup";
      this.$ajax.get(url).then(res => {
        // console.log(res.data);
        this.grouplist = res.data.message;
      });
    }
  }
};
</script>
<style>
.el-carousel__container {
  height: 368px;
}

.el-carousel__item h3 {
  color: black !important;
  font-size: 18px;
  opacity: 0.75;
  line-height: 50px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* .wrap-box ul.img-list li {
    float: left;
  } */
</style>