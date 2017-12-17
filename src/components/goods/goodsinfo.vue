<template>
  <div class="tmpl">
    <!-- 导航栏 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        <a href="/goods/42/1.html">商品详情</a>

      </div>
    </div>

    <!-- 商品详情 -->
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <!--页面左边-->
          <div class="left-925">
            <div class="goods-box clearfix">
              <!--商品图片-->
              <div class="pic-box">



              </div>
              <!--/商品图片-->

              <!--商品信息-->
              <div class="goods-spec" v-if="aboutgoods.goodsinfo">
                <h1 v-text="aboutgoods.goodsinfo.title"></h1>
                <p class="subtitle">{{aboutgoods.goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{aboutgoods.goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">${{aboutgoods.goodsinfo.market_price}}.00</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em class="price" id="commoditySellPrice">${{aboutgoods.goodsinfo.sell_price}}.00</em>
                    </dd>
                  </dl>
                </div>

                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number size="small" v-model="buyNum" :min="1" :max="aboutgoods.goodsinfo.stock_quantity" @change="buyCountChange"></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{aboutgoods.goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div class="btn-buy" id="buyButton">
                        <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                        <button class="add" @click="addCart" ref="btnaddcar">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>

              </div>
              <!--/商品信息-->
            </div>

            <div id="goodsTabs" class="goods-tab bg-wrap">
              <!--选项卡-->
              <Affix>
                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                  <ul>
                    <li>
                      <a :class="tabshow==true?'selected':''" href="javascript:;" @click="tabshow = true">商品介绍</a>
                    </li>
                    <li>
                      <a :class="tabshow!=true?'selected':''" href="javascript:;" class="" @click="tabshow = false">商品评论</a>
                    </li>
                  </ul>
                </div>
              </Affix>
              <!--/选项卡-->

              <!--选项内容-->
              <div v-if="aboutgoods.goodsinfo">
                <div v-if="tabshow" class="tab-content entry" style="display:block;" v-html="aboutgoods.goodsinfo.content">
                </div>
              </div>

              <div v-if="!tabshow" class="tab-content" style="display: block;">
                <!--网友评论-->
                <div class="comment-box">
                  <!--取得评论总数-->
                  <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea v-model="commenttxt" @keydown.13="commitTalk" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000"
                          nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input id="btnSubmit" name="submit" value="提交评论" class="submit" @click="commitTalk">
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </form>
                  <ul id="commentList" class="list-box">
                    <p v-if="totalcomment<=0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                    <li v-for="(comm,index) in talklist" :key="index">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{comm.user_name}}</span>
                          <span>{{comm.reply_time | datefmt}}</span>
                        </div>
                        <p>{{comm.content}}</p>
                      </div>
                    </li>

                  </ul>
                  <!--放置页码-->
                  <div class="page-box" style="margin:5px 0 0 62px">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 5, 10]"
                      :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcomment">
                    </el-pagination>
                  </div>
                  <!--/放置页码-->
                </div>

                <!--/网友评论-->
              </div>

            </div>

          </div>
          <!--/页面左边-->

          <!--页面右边-->
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">

                  <li v-for="item in aboutgoods.hotgoodslist" :key="item.id">
                    <div class="img-box">
                      <router-link :to="'/site/goodsinfo/'+item.id">
                        <img :src="item.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <router-link :to="'/site/goodsinfo/'+item.id">{{item.title}}</router-link>
                      <!-- <a v-bind="{href:'/site/goodsinfo/'+(item.id)}">{{item.title}}</a> -->
                      <span>{{item.add_time | datefmt(true)}}</span>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <!--/页面右边-->
        </div>
      </div>
    </div>
    <transition @before-enter="benter" @enter="enter" @after-enter="aenter">

      <div v-if="aboutgoods.imglist" class="img" ref="img" v-show="isshow">
        <img width="50" height="50" :src="aboutgoods.imglist[0].thumb_path" alt="">
      </div>
    </transition>
  </div>
</template>


<script>
  // 放大镜插件
  import "../../../statics/jQueryMagnifier/js/magnifier.js";

  // 全局总栈
  import { vm, EVEN } from "../../kits/bus.js";
  import { setItem } from "../../kits/localStoragehelper.js";

  export default {
    data() {
      return {
        offsetObj: {},
        lbcOffSet: {},
        isshow: false,//飞入购物车图片的显示
        tabshow: true, //true时显示商品介绍，隐藏商品评论
        buyNum: 0, //要买的数量
        goodsid: this.$route.params.goodsid, //商品的id
        aboutgoods: {}, //商品详情信息
        talklist: [], //评论列表
        commenttxt: "", //评论内容
        currentPage: 1, //当前页面
        totalcomment: 0, //评论总条数
        pageSize: 1, //每页显示的条数
        buyCount: 1 //购买的数量
      };
    },
    mounted() {
      this.getgoodsinfo();
      // 放大镜插件初始化
      // $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
      // this.$refs['magnifier1'].imgzoon({ magnifier: '#magnifier1' });
      this.getTalk();
      setTimeout(() => {
        // 获取当前页面上的加入购物车按钮的位置
        var offsetObj = $(this.$refs.btnaddcar).offset();
        this.offsetObj = offsetObj;
        // console.log(offsetObj);
        // 将加入购物车按钮的位置赋值给图片div
        $(this.$refs.img).css("left", offsetObj.left).css("top", offsetObj.top);
        // 获取layout.vue组件中的id=layoutbuycar 这个dom对象
        var lbcOffSet = $("#layoutbuycar").offset();
        this.lbcOffSet = lbcOffSet;
      }, 200);
    },
    watch: {
      // "this.$route.params": function () {
      //   console.log(111);
      //   this.getgoodsinfo();
      // }
      $route: function () {
        // console.log(1);
        this.goodsid = this.$route.params.goodsid;
        this.getgoodsinfo();
      }
    },
    methods: {
      // 得到商品详情信息
      getgoodsinfo() {
        var url = "/site/goods/getgoodsinfo/" + this.goodsid;
        this.$ajax.get(url).then(res => {
          // console.log(res.data);
          // console.log(222);
          this.aboutgoods = res.data.message;
          if (!this.aboutgoods.goodsinfo) {
            this.$message.error("唯愿在剩余光线面前");
          }
        });
      },
      // 得到当前商品评论
      getTalk() {
        var url = `/site/comment/getbypage/goods/${this.goodsid}?pageIndex=${this
          .currentPage}&pageSize=${this.pageSize}`;
        // console.log(url);
        this.$ajax.get(url).then(res => {
          // console.log(res.data);
          this.totalcomment = res.data.totalcount;
          this.talklist = res.data.message;
        });
      },
      //提交评论
      commitTalk() {
        var url = "/site/validate/comment/post/goods/" + this.goodsid;
        // console.log(this.commenttxt);
        this.$ajax.post(url, { commenttxt: this.commenttxt }).then(res => {
          console.log(res.data);
          if (res.data.status == 0) {
            // 评论成功
            // 清空评论内容
            this.commenttxt = "";
            this.getTalk();
          } else {
            alert("评论出错");
          }
        });
      },
      // pageSize发生改变
      handleSizeChange(size) {
        // console.log(size);
        this.pageSize = size;
        this.getTalk();
      },
      // 当前页面发生改变
      handleCurrentChange(currentPage) {
        // console.log(currentPage);
        this.currentPage = currentPage;
        this.getTalk();
      },
      // 加入购物车
      addCart() {
        // 利用vm.$emit() 触发事件,把购买的数量传过去
        // vm.$emit(EVEN, this.buyCount);
        // 用vuex实现,全局事件总线已经out啦
        //创建一个对象传到后台去，
        var goodObj = { gid: this.goodsid, count: this.buyCount };
        // 调用方法保存到localStorage中
        setItem(goodObj);
        this.$store.dispatch('changeCount', goodObj);

        // 显示图片
        this.isshow = true;
      },
      // 购买的数量发生改变
      buyCountChange(val) {
        // console.log(val);
        this.buyCount = val;
      },
      // 动画的函数
      benter(el) {
        // 设定动画的开始位置
        el.style.left = this.offsetObj.left + 'px';
        el.style.top = this.offsetObj.top + 'px';
      },
      enter(el, done) {
        // 设定动画的结束位置，同时要调用 el.offsetWidth 来达到刷新的目的
        // 调用done来触发aenter的执行
        el.offsetWidth;
        el.style.left = this.lbcOffSet.left + 'px';
        el.style.top = this.lbcOffSet.top + 'px';

        done();
      },
      aenter(el) {
        // 隐藏div
        this.isshow = false;
      },
    }
  };
</script>

<style>
  @import url("../../../statics/jQueryMagnifier/css/magnifier.css");
  /* .magnifier {
      margin: 0;
    } */

  .img {
    border: 1px solid red;
    width: 50px;
    height: 50px;
    position: absolute;
    transition: all 0.5s;
  }
</style>