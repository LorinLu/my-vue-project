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
                <li>
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
          <!--商品列表-->
          <!-- {{values}} -->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <!-- <a>全选</a> -->
                    <button id="allbtn" @click="changeSelectState">{{allSelectText}}</button>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-if="goodslist.length <= 0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- 购物清单 -->
                <tr v-for="(item,index) in goodslist" :key="item.id">
                  <td width="48" align="center">
                    <!-- 全选 el-switch -->
                    <el-switch v-model="values[index]">

                    </el-switch>
                  </td>
                  <td align="left" colspan="2">
                    <!-- 放商品的图和标题 -->
                    <img height="50" width="50" :src="item.img_url" :alt="item.title"> {{item.title}}
                  </td>
                  <td width="84" align="left">{{item.sell_price}}</td>
                  <td width="104" align="center">
                    <!-- <el-input-number @click="id(item.id)" v-model="buycount" @change="handleChange" :min="1" :max="100" label="描述文字">
                    </el-input-number> -->
                    <buynum v-bind:obj="{gid:item.id,count:item.buycount}" @msg="getbuyNUm"></buynum>
                  </td>
                  <td width="104" align="left">
                    {{ item.buycount * item.sell_price}}
                  </td>
                  <td width="54" align="center">
                    <button @click="delitem(item.id)">{{item.id}}删除</button>
                  </td>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{selectcount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{getAmount}}</b>元
                  </th>
                </tr>
                <!-- 购物清单 -->
              </tbody>
            </table>
          </div>
          <!--/商品列表-->



          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button">继续购物</button>
              <button class="submit" @click="paymoney">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getItem, setItemReplace, delItem,setItem } from "../../kits/localStoragehelper.js";
  // 引入购买数量的子组件
  import buynum from "../../components/goods/buynum.vue";
  export default {
    data() {
      return {
        isAllSelected: true, //是否全选的
        goodslist: [],//所用商品
        values: [], //所有的的单选框的值
        allSelectText: "全选",
        buycount: 0, //购买的数量
        selectcount: 0, //已选择的数量
        trychang: 0
      };
    },
    methods: {
      // 获取购物清单
      geiItemList() {
        // 先获取所有被买的id
        var buygoods = getItem();
        var ids = [];
        for (var key in buygoods) {
          ids.push(key);
        }
        var url = "/site/validate/order/getgoodslist/" + ids.join(",");
        // 当有id时才发送请求
        if (ids.length > 0) {
          this.$ajax.get(url).then(res => {
            // for (var key, value in buygoods) {
            //   ids.push(key);
            // }
            res.data.message.forEach((element, index) => {
              // 把本地存储的数量覆盖数据里的
              element.buycount = buygoods[element.id];
              // 给所有开关默认 不选中
              this.values[index] = false;
            });
            this.goodslist = res.data.message;
            console.log(this.goodslist);
          });
        }
      },
      changeSelectState() {
        this.isAllSelected = !this.isAllSelected;
        if (this.isAllSelected) {
          this.allSelectText = "反选";
        } else {
          this.allSelectText = "全选";
        }
        console.log(this.isAllSelected);
        this.values.forEach((item, index) => {
          this.values[index] = this.isAllSelected;
        });
        // 很关键很关键，不然视图不刷新
        this.values.push(false);
        this.values.pop();
      },
      // 购买数量函数
      // 接收子组件中传回来值
      // obj的格式：{gid:商品id,count:修改以后的值}
      getbuyNUm(obj) {
        // console.log('getbuyNUm');
        // setItemReplace(obj);
        // 只需要将goodslist中的当前商品对应的buycount值更新即可
        console.log(obj);
        var index = this.goodslist.findIndex(function (item) { return item.id == obj.gid });
        console.log(index);
        //  根据索引修改这个对象中的buycount值即可
        this.goodslist[index].buycount = obj.count;
      },
      paymoney() {
        var ids = [];
        this.values.forEach((item, index) => {
          if (item) {
            ids.push(this.goodslist[index].id);
          }
        });
        if (ids.length <= 0) {
          this.$message({
            showClose: true,
            message: "请至少选择一件商品",
            type: "error",
            duration: 1300
          });
          return;
        }
        this.$router.push({ name: "shopping", params: { ids: ids.join(",") } });
        // console.log(1110);
      },
      delitem(id) {
        // console.log('delitem');

        console.log(this.goodslist);
        // 从本地存储中删除对应的商品
        delItem(id);
        // 删除内存中的
        this.goodslist.forEach((item, index) => {
          if (item.id == id) {
            this.goodslist.splice(index, 1);
          }
        })
      }
    },
    mounted() {
      this.geiItemList();
      // this.getAmount();
    },
    // 注册子组件
    components: {
      buynum
    },
    computed: {
      // 计算总价格
      getAmount() {
        // console.log('computed');
        // console.log(this.values);
        // 返回item是true的值
        var trueArr = this.values.filter(item => item);
        // this.values.push(false);
        // this.values.pop();
        // trueArr.length = trueArr.length + 1;
        this.selectcount = trueArr.length;
        
        //总金额
        var totalPrice = 0;
        this.values.forEach((item, index) => {
          // 从而得出已选商品的总金额
          if (item) {
            totalPrice +=
              this.goodslist[index].buycount * this.goodslist[index].sell_price;
          }
        });
        return totalPrice;
      }
    }
  };
</script>
<style scoped>
  #allbtn {
    display: inline-block;
    margin: 0 0 0 5px;
    padding: 8px 25px;
    width: auto;
    height: auto;
    line-height: 20px;
    color: #fff;
    font-size: 12px;
    border: 0;
    background: #1e7bb3;
    border-radius: 3px;
    cursor: pointer;
  }
</style>