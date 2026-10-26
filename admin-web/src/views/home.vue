<template>
  <div class="workbench">
    <section class="welcome-panel"
      ><div
        ><span class="welcome-eyebrow">TRAINING WORKSPACE</span
        ><h1>欢迎回来，{{ $storage.get('adminName') }}</h1
        ><p>把知识传递出去，让安全意识持续生长。</p></div
      ><div class="welcome-emblem" aria-hidden="true"><i class="el-icon-lock"></i></div
      ><div class="welcome-meta"
        ><span class="status-dot"></span>网络安全知识培训 · 管理工作台</div
      ></section
    >
    <div class="section-heading"
      ><div><h2>常用工作入口</h2><p>课程、考试与学习反馈，清晰有序。</p></div
      ><span>WORKSPACE</span></div
    >
    <section class="shortcut-grid"
      ><router-link
        v-for="item in shortcuts"
        :key="item.tableName"
        :to="'/' + item.tableName"
        class="shortcut-card"
        ><span class="shortcut-icon"><i :class="item.icon" aria-hidden="true"></i></span
        ><h3>{{ item.menu }}</h3
        ><p>{{ item.description }}</p
        ><span class="shortcut-arrow"
          ><i class="el-icon-top-right" aria-hidden="true"></i></span></router-link
    ></section>
    <section class="workspace-note"
      ><i class="el-icon-reading" aria-hidden="true"></i
      ><div
        ><strong>每一次学习，都是多一份守护。</strong
        ><p>持续完善培训内容，关注学习过程与考试反馈。</p></div
      ></section
    >
  </div>
</template>
<script src="./home.options.js"></script>
<style lang="scss" scoped src="./home.styles.scss"></style>
