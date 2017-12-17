<template>
  <div class="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li class="active">
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <form id="orderForm" name="orderForm" url="/tools/submit_ajax.ashx?action=order_save&amp;site_id=1">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="收货人姓名" prop="accept_name">
                  <el-row>
                    <el-col :span="12">
                      <el-input v-model="ruleForm.accept_name"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="所属地区" prop="area">
                  <el-row>
                    <el-col :span="20">
                      <!-- <v-distpicker province="广东省" city="广州市" area="海珠区"></v-distpicker> -->
                      <v-distpicker @selected="onSelect"></v-distpicker>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                  <el-row>
                    <el-col :span="12">
                      <el-input v-model="ruleForm.address"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                  <el-row>
                    <el-col :span="12">
                      <el-input v-model="ruleForm.mobile"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                  <el-row>
                    <el-col :span="12"> 
                      <el-input v-model="ruleForm.email"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="邮政编码" prop="post_code">
                  <el-row>
                    <el-col :span="4">
                      <el-input v-model="ruleForm.post_code"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
              <h2 class="slide-tit">
                <span>2、支付方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <label>
                    <el-radio-group v-model="ruleForm.payment_id">
                      <el-radio :label="6">在线支付</el-radio>
                    </el-radio-group>
                    <em>手续费：0.00元</em>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>3、配送方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <el-radio-group v-model="ruleForm.express_id" @change="expresschange">
                    <el-radio :label="1">顺丰(￥20)</el-radio>
                    <el-radio :label="2">圆通(￥15)</el-radio>
                    <el-radio :label="3">韵达(￥10)</el-radio>
                  </el-radio-group>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>4、商品清单</span>
              </h2>
              <div class="line15"></div>
              <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                <tbody>
                  <tr>
                    <th colspan="2" align="left">商品信息</th>
                    <th width="84" align="left">单价</th>
                    <th width="84" align="center">购买数量</th>
                    <th width="104" align="left">金额(元)</th>
                  </tr>
                  <tr v-for="(item,index) in orderitemlist" :key="index">
                    <td width="68">
                      <a target="_blank" href="/goods/show-89.html">
                        <img :src="item.img_url" class="img">
                      </a>
                    </td>
                    <td>
                      <a target="_blank" href="/goods/show-89.html" v-text="item.title"></a>
                    </td>
                    <td>
                      <span class="red">
                        ￥{{item.sell_price}}
                      </span>
                    </td>
                    <td align="center">{{item.buycount}}</td>
                    <td>
                      <span class="red">
                        ￥{{item.totalamount}}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="line15"></div>
              <h2 class="slide-tit">
                <span>5、结算信息</span>
              </h2>
              <div class="buy-foot clearfix">
                <div class="left-box">
                  <dl>
                    <dt>订单备注(100字符以内)</dt>
                    <dd>
                      <textarea name="message" v-model="ruleForm.message" class="input" style="height:35px;"></textarea>
                    </dd>
                  </dl>
                </div>
                <div class="right-box">
                  <p>
                    商品
                    <label class="price">{{itemcount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                    <label id="goodsAmount" class="price">{{this.ruleForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    运费：￥
                    <label id="expressFee" class="price">{{this.ruleForm.expressMoment}}</label> 元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label id="totalAmount" class="price">{{this.ruleForm.expressMoment+this.ruleForm.goodsAmount}}</label>
                  </p>
                  <p class="btn-box">
                    <a class="btn button" href="/cart.html">返回购物车</a>
                    <input id="btnSubmit" name="btnSubmit" @click="postOredr" type="button" value="确认提交" class="btn submit">
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import { getItem } from "../../kits/localStoragehelper";
export default {
  data() {
    return {
      itemcount: 0,
      orderitemlist: [], //根据商品id获取的商品信息数组
      ids: this.$route.params.ids, //商品的id
      ruleForm: {
        goodsAmount: 0,
        expressMoment: 20,
        accept_name: "帅涛",
        area: {
          province: { code: "140000", value: "山西省" },
          city: { code: "140100", value: "太原市" },
          area: { code: "140106", value: "迎泽区" }
        },
        address: "城区",
        mobile: "18667654355",
        email: "ivanyb@qq.com",
        post_code: "516000",
        payment_id: 6,
        express_id: 1,
        message: "茫茫人海中取暖度过，最冷一天",
        goodsids: "", //当前订单的商品id
        cargoodsobj: {} //当前订单的商品id与购买数量的键值对
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //提交订单按钮触发
    postOredr() {
      console.log(this.ruleForm);
      this.$ajax
        .post("/site/validate/order/setorder", this.ruleForm)
        .then(res => {
          // console.log(res.data);
          if (res.data.status == 0) {
            
            console.log(res.data);
            // 提交成功
            this.$router.push({
              name: "payorder",
              params: { orderid: res.data.message.orderid }
            });
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "error",
              duration: 1300
            });
          }
        });
    },
    // 设置部分传输的参数
    initSendData() {
      this.ruleForm.goodsids = this.ids;
      this.ruleForm.cargoodsobj = getItem();
    },
    // 选择地址触发的方法
    onSelect(address) {
      // console.log(address);
      this.ruleForm.area.province = address.province;
      this.ruleForm.area.city = address.city;
      this.ruleForm.area.area = address.area;
    },
    // 根据订单号获取商品信息
    getOrdergoods() {
      // console.log(this.ids);
      var url = "/site/validate/order/getgoodslist/" + this.ids;
      this.$ajax.get(url).then(res => {
        // console.log(res.data);
        // 商品信息详情
        this.orderitemlist = res.data.message;
        // 得到商品件数
        this.itemcount = res.data.message.length;
        //计算总金额
        var totalgoodsmoney = 0;
        res.data.message.forEach(el => {
          totalgoodsmoney += el.buycount * el.sell_price;
        });
        this.ruleForm.goodsAmount = totalgoodsmoney;
      });
    },
    // 选择快递
    expresschange(express_id) {
      // console.log(express_id);
      // 给快递的id赋值
      this.ruleForm.express_id = express_id;
      // 快递价钱判断
      if (express_id == 1) {
        this.ruleForm.expressMoment = 20;
      } else if (express_id == 2) {
        this.ruleForm.expressMoment = 15;
      } else if (express_id == 3) {
        this.ruleForm.expressMoment = 10;
      }
    }
  },
  mounted() {
    this.getOrdergoods();
    this.initSendData();
  },
  // 注册选省市区的子组件
  components: {
    VDistpicker
  }
};
</script>
<style scoped>
.el-form {
  padding-top: 20px;
}
.cart-box .cart-table td a {
  display: inline-block;
}
.cart-box .cart-table td .img {
  position: static;
}
</style>