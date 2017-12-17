<template>
  <div class="subtmpl">
    <ul>
      <li @click="subduction">-</li>
      <li>{{count}}</li>
      <li @click="add">+</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["obj"],
  data() {
    return {
      // 随便给个初始值，反正mounted会修改它
      count: 1
    };
  },
  methods: {
    // 点击加按钮
    add() {
      this.count++;
      this.calcu();
    },
    // 点击减按钮
    subduction() {
      // console.log(this.obj);
      this.count--;
      if (this.count <= 1) {
        this.count = 1;
      }
      this.calcu();
    },
    calcu() {
      console.log(this.obj);
      // id为原来的id,数量为修改后的数量
      var obj = { gid: this.obj.gid, count: this.count };
      this.$emit("msg", obj);
    }
  },
  mounted() {
    // console.log(this.obj);
    // 把传过来的值复制到初始值上
    this.count = this.obj.count;
  }
};
</script>
<style scoped>
.subtmpl ul {
  width: 120px;
}

.subtmpl li {
  list-style: none;
  display: inline-block;
  width: 30px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  padding: 2px;
  cursor: pointer;
}
</style>