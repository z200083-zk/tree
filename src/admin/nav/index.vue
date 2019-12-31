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
        <el-menu-item index="/admin">
          <i class="el-icon-menu"></i>
          <span slot="title">统计</span>
        </el-menu-item>
        <el-submenu index="/admin">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>资源</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/video">视频</el-menu-item>
            <el-menu-item index="/admin/image">图片</el-menu-item>
            <el-menu-item index="/admin/text">文本</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item @click="isCollapse=!isCollapse">
          <i :class="isCollapse ? 'el-icon-caret-right' : 'el-icon-caret-left'"></i>
          <span slot="title">{{isCollapse ? "展开" : "收起"}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div :class="bgcolor ? 'el-box bgcolorday': 'el-box bgcolornight'">
      <div class="el-top">
        <el-dropdown @command="handleCommand">
          <div class="el-dropdown-link">
            <img src="https://pic3.zhimg.com/v2-6f835c85975112524a7b752008177801_is.jpg" alt />
            <span class="center">七星光</span>
            <i class="el-icon-arrow-down el-icon--right center"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">账户</el-dropdown-item>
            <el-dropdown-item command="b">未知</el-dropdown-item>
            <el-dropdown-item command="c">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="el-view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      bgcolor: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      this.$message("click on item " + command);
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
    // width: 215px;
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
  .el-box {
    flex: 1;
    display: flex;
    height: 100%;
    background-color: #fff;
    flex-direction: column;
    .el-top {
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      position: relative;
    }
    .el-view {
      flex: 1;
    }
  }

  .el-dropdown {
    position: absolute;
    right: 20px;
    top: 18px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    display: flex;
    align-content: center;
    justify-content: center;
    img {
      border-radius: 20px;
      height: 40px;
    }
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .bgcolorday {
    background-color: #fff;
  }
  .bgcolornight {
    background-color: #313131;
  }
}
</style>