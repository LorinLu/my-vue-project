<template>
  <div class="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section" v-if="orderinfo">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-16">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderinfo.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderinfo.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderinfo.area}}
                      </dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>详细地址：</dt>
                      <dd>{{orderinfo.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderinfo.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="message">
                  <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <span>{{orderinfo.message}}</span>
                </div>
              </div>
              <div class="el-col el-col-8">
                <div id="container">
                  二维码图片
                  <canvas width="300" height="300"></canvas>
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
import "../../../statics/qrCode/qrcode.js";
import "../../../statics/qrCode/qart.min.js";
import "../../../statics/qrCode/tea-qrcode";
import { KEY, setItem } from "../../kits/localStoragehelper.js";
import {vm} from "../../kits/bus";

export default {
  data() {
    return {
      orderid: this.$route.params.orderid,
      orderinfo: {}
    };
  },
  methods: {
    getOrderInfo() {
      var url = "/site/validate/order/getorder/" + this.orderid;
      // console.log(url);
      this.$ajax.get(url).then(res => {
        this.orderinfo = res.data.message[0];
        console.log(this.orderinfo);
      });
    }
  },
  mounted() {
    this.getOrderInfo();

    setItem({});
    // 清空购物车  以及localStorage中的所有数据
    localStorage.setItem("buygoods", "{}");
    localStorage.setItem("buyTotalCount", 0);
    // 触发layout组件中的购物车
    vm.$emit('clearcart',0);

    // 生成二维码的方法
    $("#container").erweima({
      label: "雨后有车驶来",
      text: "" //改成支付的页面
    });

    // 使用定时器监听订单的状态，为2的时候就跳转到支付成功页面
    this.payStatusInterval = setInterval(() => {
      var url = "/site/validate/order/getorder/" + this.orderid;
      this.$ajax.get(url).then(res => {
        // 当支付状态为2的时候说明支付成功
        if (res.data.message[0].status == 2) {
          if (this.payStatusInterval) {
            clearInterval(this.payStatusInterval);
          }
          this.$router.push({ name: "paysuccess" });
        }
      });
    }, 2000);
  },
  beforeDestroy() {
    // 防止客户调皮没支付就跳转到其他页面
    clearInterval(this.payStatusInterval);
  }
};
</script>
<style scoped>

</style>