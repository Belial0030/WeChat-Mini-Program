<template>
  <el-container class="admin-shell">
    <index-header
      :navigation-open="navigationOpen"
      @toggle-navigation="navigationOpen = !navigationOpen"
    ></index-header>
    <el-container class="admin-body">
      <index-aside :class="{ 'is-open': navigationOpen }"></index-aside>
      <button
        v-if="navigationOpen"
        class="navigation-scrim"
        aria-label="关闭导航"
        @click="navigationOpen = false"
      ></button>
      <index-main></index-main>
    </el-container>
  </el-container>
</template>
<script src="./index.options.js"></script>
<style lang="scss" scoped src="./index.styles.scss"></style>
