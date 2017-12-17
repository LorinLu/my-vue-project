<template>
  <div class="tmpl">
    <div class="center">
      <div class="el-row">
        <div class="el-col el-col-24">
          <div class="comp">
            <div class="tmpl routeanimate">
              <div class="section">
                <div class="location">
                  <span>当前位置：</span>
                  <a href="/index.html">首页</a> &gt;
                  <a href="#/site/member/center" class="">会员中心</a>&gt;
                  <a href="#/site/member/orderlist" class="router-link-exact-active ">我的订单</a>
                </div>
              </div>
              <div class="section clearfix">
                <div class="left-260">
                  <div class="bg-wrap">
                    <div class="avatar-box">
                      <a href="/user/center/avatar.html" class="img-box">
                        <i class="iconfont icon-user-full"></i>
                      </a>
                      <h3>

                        ivanyb

                      </h3>
                      <p>
                        <b>注册会员</b>
                      </p>
                    </div>
                    <div class="center-nav">
                      <ul>
                        <li>
                          <h2>
                            <i class="iconfont icon-order"></i>
                            <span>订单管理</span>
                          </h2>
                          <div class="list">
                            <p>
                              <a href="#/site/member/q" class="router-link-exact-active ">
                                <i class="iconfont icon-arrow-right"></i>交易订单</a>
                            </p>
                          </div>
                        </li>
                        <li>
                          <h2>
                            <i class="iconfont icon-user"></i>
                            <span>账户管理</span>
                          </h2>
                          <div class="list">
                            <p>
                              <a href="#/site/member/center" class="">
                                <i class="iconfont icon-arrow-right"></i>账户资料</a>
                            </p>
                            <p>
                              <a href="#/site/member/center" class="">
                                <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                            </p>
                            <p>
                              <a href="#/site/member/center" class="">
                                <i class="iconfont icon-arrow-right"></i>修改密码</a>
                            </p>
                            <p>
                              <a href="javascript:void(0)">
                                <i class="iconfont icon-arrow-right"></i>退出登录</a>
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="right-auto">
                  <div class="bg-wrap" style="min-height: 765px;">
                    <div class="sub-tit">
                      <ul>
                        <li class="selected">
                          <a href="/user/order-list.html">交易订单</a>
                        </li>
                      </ul>
                    </div>
                    <div class="table-wrap">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                        <tbody>
                          <tr>
                            <th width="16%" align="left">订单号</th>
                            <th width="10%">姓名</th>
                            <th width="12%">订单金额</th>
                            <th width="11%">下单时间</th>
                            <th width="10%">状态</th>
                            <th width="12%">操作</th>
                          </tr>
                          <tr v-for="(item,index) in orderlist" :key="index">
                            <td>{{item.order_no}}</td>
                            <td align="left">{{item.accept_name}}</td>
                            <td align="left">
                              <strong style="color: red;">￥{{item.order_amount}}</strong>
                              <br> {{item.paymentTitle}}
                            </td>
                            <td align="left">{{item.express_time  | datefmt(true)}}</td>
                            <td align="left">
                              {{item.statusName}}
                            </td>
                            <td align="left">
                              <!-- <a href="#/site/member/orderinfo/12" class="">查看订单</a> -->
                              <router-link :to="'/site/myorderinfo/'+ item.id">查看订单</router-link>
                              <br>
                              <!-- <a href="#/site/goods/payment/12" class="">|去付款</a> -->
                              <router-link v-if="item.status==1" :to="'/site/pay/'+item.id">去付款</router-link>
                              <br>
                              <a href="javascript:void(0)" @click="cancelOrder(item.id)" v-if="item.status!=5">|取消</a>
                              <br>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="page-foot">
                        <div class="flickr right">
                          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 5, 10]"
                            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalorder">
                          </el-pagination>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 5, //每页显示条数
      totalorder: 0, //订单总条数
      currentPage: 1, //当前页数
      orderlist: [] //订单数组
    };
  },
  methods: {
    getmyorder() {
      var url = `/site/validate/order/userorderlist?pageIndex=${this
        .currentPage}&pageSize=${this.pageSize}`;
      this.$ajax.get(url).then(res => {
        // console.log(res.data);
        this.orderlist = res.data.message;
        // 给总数赋值
        this.totalorder = res.data.totalcount;
      });
    },
    // pageSize发生改变
    handleSizeChange(size) {
      // console.log(size);
      this.pageSize = size;
      this.getmyorder();
    },
    // 当前页面发生改变
    handleCurrentChange(currentPage) {
      // console.log(currentPage);
      this.currentPage = currentPage;
      this.getmyorder();
    },
    cancelOrder(orderid) {
      var url = `/site/validate/order/cancelorder/${orderid}`;
      this.$ajax.get(url).then(res => {
        // console.log(res.data);
        if (res.data.status == 0) {
          this.getmyorder();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  },
  mounted() {
    this.getmyorder();
  }
};
</script>
<style scoped>

</style>