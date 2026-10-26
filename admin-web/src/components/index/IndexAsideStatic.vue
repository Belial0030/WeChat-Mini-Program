<template>
  <el-aside class="index-aside" width="224px">
    <div class="sidebar-heading">工作空间<span>WORKSPACE</span></div>
    <el-menu
      :default-active="$route.path === '/index/' ? '/' : $route.path"
      :unique-opened="true"
      class="workspace-menu"
    >
      <el-menu-item index="/" @click="menuHandler('')"
        ><i class="el-icon-s-home"></i><span>工作台</span></el-menu-item
      >
      <template v-for="group in visibleMenus">
        <el-menu-item
          v-if="group.child.length === 1"
          :key="group.menu"
          :index="'/' + group.child[0].tableName"
          @click="menuHandler(group.child[0].tableName)"
          ><i :class="menuIcon(group.child[0].tableName)"></i
          ><span>{{ group.child[0].menu }}</span></el-menu-item
        >
        <el-submenu v-else :key="group.menu" :index="group.menu"
          ><template slot="title"
            ><i :class="menuIcon(group.child[0].tableName)"></i
            ><span>{{ group.menu }}</span></template
          ><el-menu-item
            v-for="child in group.child"
            :key="child.tableName"
            :index="'/' + child.tableName"
            @click="menuHandler(child.tableName)"
            >{{ child.menu }}</el-menu-item
          ></el-submenu
        >
      </template>
      <el-submenu index="personal"
        ><template slot="title"><i class="el-icon-user"></i><span>个人中心</span></template
        ><el-menu-item index="/center" @click="menuHandler('center')">个人信息</el-menu-item
        ><el-menu-item index="/updatePassword" @click="menuHandler('updatePassword')"
          >修改密码</el-menu-item
        ></el-submenu
      >
    </el-menu>
    <div class="sidebar-footer"><i class="el-icon-lock"></i> 网络安全知识培训</div>
  </el-aside>
</template>
<script src="./IndexAsideStatic.options.js"></script>
<style lang="scss" scoped src="./IndexAsideStatic.styles.scss"></style>
