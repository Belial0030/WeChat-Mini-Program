<template>
  <view class="learner-login"
    ><view class="learner-brand"
      ><view class="learner-logo cuIcon-lock"></view
      ><text class="learner-kicker">SECURITY LEARNING</text
      ><view class="learner-title">网络安全知识培训</view
      ><view class="learner-description">学习安全知识，守护数字生活。</view></view
    ><view class="learner-login-card"
      ><view class="learner-welcome">欢迎回来</view
      ><view class="learner-field"
        ><text>账号</text
        ><input v-model="username" placeholder="请输入账号" type="text" confirm-type="next" /></view
      ><view class="learner-field"
        ><text>密码</text
        ><input
          v-model="password"
          placeholder="请输入密码"
          type="password"
          confirm-type="done"
          @confirm="onLoginTap" /></view
      ><view v-if="roleNum > 1" class="learner-field"
        ><text>登录身份</text
        ><picker @change="optionsChange" :value="index" :range="options"
          ><view class="learner-picker"
            >{{ options[index] }}<text class="cuIcon-unfold"></text></view></picker></view
      ><button type="primary" class="learner-submit" @tap="onLoginTap">登录，开始学习</button
      ><view class="learner-login-links"
        ><button @tap="onRegisterTap('yonghu')">注册学习账号</button
        ><button @tap="onForgetTap">忘记密码？</button></view
      ></view
    ><view class="learner-login-footer">每一次学习，都是多一份守护。</view></view
  >
</template>
<script src="./login.options.js"></script>
<style lang="scss" scoped src="./login.styles.scss"></style>
