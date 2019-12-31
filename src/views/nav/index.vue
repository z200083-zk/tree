<template>
  <div id="nav">
    <div class="el-ment">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#000000"
        text-color="#CCCCCC"
        active-text-color="#ffb102"
        :collapse="isCollapse"
        :unique-opened="true"
        :router="true"
      >
        <el-menu-item class="logo">
          <template slot="title">
            <i class="el-icon-star-on"></i>
            <span>共享</span>
          </template>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/xuan1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" @click="isCollapse=!isCollapse">
          <i :class="isCollapse ? 'el-icon-caret-right' : 'el-icon-caret-left'"></i>
          <span slot="title">{{isCollapse ? "展开" : "收起"}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="el-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
#nav {
  width: 100%;
  height: 100%;
  display: flex;
  .el-ment {
    width: 215px;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 215px;
      height: 100%;
    }
    .el-menu--collapse {
      width: 64px;
      height: 100%;
    }
    .logo {
      font-size: 25px;
      color: #fff;
    }
  }
  .el-view {
    flex: 1;
  }
}
</style>