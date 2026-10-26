<template>
  <header class="navbar">
    <div class="header-brand"
      ><button
        class="navigation-toggle"
        type="button"
        aria-label="切换导航菜单"
        :aria-expanded="navigationOpen"
        @click="$emit('toggle-navigation')"
        ><i class="el-icon-s-fold" aria-hidden="true"></i></button
      ><span class="brand-mark"><i class="el-icon-lock" aria-hidden="true"></i></span
      ><div
        ><div class="title-name">{{ $project.projectName }}</div
        ><span class="header-subtitle">SECURITY LEARNING · 管理平台</span></div
      ></div
    >
    <div class="right-menu"
      ><span class="user-avatar"><i class="el-icon-user" aria-hidden="true"></i></span
      ><div class="user-info"
        ><strong>{{ $storage.get('adminName') }}</strong
        ><span>{{ $storage.get('role') }}</span></div
      ><button class="logout" type="button" aria-label="退出登录" @click="onLogout"
        ><i class="el-icon-switch-button" aria-hidden="true"></i><span>退出登录</span></button
      ></div
    >
  </header>
</template>
<script src="./IndexHeader.options.js"></script>
<style lang="scss" scoped src="./IndexHeader.styles.scss"></style>
