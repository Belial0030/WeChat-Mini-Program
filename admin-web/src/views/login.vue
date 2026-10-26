<template>
  <main class="login-page">
    <section class="login-brand" aria-label="网络安全知识培训">
      <div class="brand-sign"
        ><i class="el-icon-lock" aria-hidden="true"></i><span>网络安全 · 知识培训</span></div
      >
      <div class="brand-message"
        ><span class="eyebrow">SECURITY LEARNING</span><h1>让安全意识<br />成为每一天的习惯。</h1
        ><p>连接知识与实践，让每一次学习都更有价值。</p></div
      >
      <div class="security-visual" aria-hidden="true"
        ><div class="security-orbit"></div
        ><div class="security-shield"><i class="el-icon-lock"></i></div
        ><span class="visual-caption">知识学习 / 在线考试 / 学习记录</span></div
      >
      <p class="brand-footer">网络安全知识培训系统 · 管理平台</p>
    </section>
    <section class="login-panel">
      <div class="login-card">
        <span class="login-kicker">管理平台</span><h2>欢迎回来</h2
        ><p class="login-description">登录后，继续管理课程与培训工作。</p>
        <el-form label-position="top" class="login-form" @submit.native.prevent="login">
          <el-form-item label="账号" for="login-username"
            ><el-input
              id="login-username"
              v-model="rulesForm.username"
              placeholder="请输入用户名"
              name="username"
              autocomplete="username"
              prefix-icon="el-icon-user"
            ></el-input
          ></el-form-item>
          <el-form-item label="密码" for="login-password"
            ><el-input
              id="login-password"
              v-model="rulesForm.password"
              placeholder="请输入密码"
              name="password"
              type="password"
              autocomplete="current-password"
              show-password
              prefix-icon="el-icon-lock"
            ></el-input
          ></el-form-item>
          <el-form-item v-if="roleOptions.length > 1" label="登录身份"
            ><el-radio-group v-model="rulesForm.role"
              ><el-radio v-for="item in roleOptions" :key="item.value" :label="item.value">{{
                item.key
              }}</el-radio></el-radio-group
            ></el-form-item
          >
          <el-button
            class="login-submit"
            type="primary"
            native-type="submit"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            >{{ isSubmitting ? '正在登录' : '登录管理平台'
            }}<i v-if="!isSubmitting" class="el-icon-right"></i
          ></el-button>
        </el-form>
        <div class="login-links"
          ><span>还没有学习账号？</span
          ><button type="button" @click="register('yonghu')"
            >注册学习账号<i class="el-icon-arrow-right"></i></button
        ></div>
      </div>
      <p class="login-footer">专注学习，守护数字安全</p>
    </section>
  </main>
</template>
<script src="./login.options.js"></script>
<style lang="scss" scoped src="./login.styles.scss"></style>
