<template>
  <div class="tmpl">
    <div class="paybox">
      <input type="text" v-model="amount">
      <br>
      <br>
      <el-button type="success" size="small" @click="paymoney">支付</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderid: this.$route.params.orderid,
        amount: 0
      };
    },
    mounted() {
      this.getorderInfo();
    },
    methods: {
      // 根据订单id获取订单金额
      getorderInfo() {
        console.log(this.$route.params.orderid);
        this.$ajax
          .get("/site/validate/order/getorderdetial/" + this.orderid)
          .then(res => {
            // console.log(res.data.message.orderinfo.order_amount);
            this.amount = res.data.message.orderinfo.order_amount;
          });
      },
      // 支付
      paymoney() {
        // 通过本接口订单的支付，支付成功会修改订单的支付状态（status）为2（已支付）
        var url = "/site/validate/order/pay/" + this.orderid;
        this.$ajax.get(url).then(res => {
          if (res.data.status == 1) {
            this.$message.error(res.data.message);
            return;
          }

          // 支付成功跳转到成功页面提示用户(在手机浏览器中信息展示)
          this.$router.push({ name: "paysuccess" });
        });
      }
    }
  };
</script>
<style scoped>
  .paybox {
    width: 200px;
    height: 200px;
    text-align: center;
    margin: 100px auto;
  }

  .paybox input {
    height: 20px;
    width: 80px;
    border-radius: 5px;
  }
</style>