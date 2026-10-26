<template>
  <view class="learning-profile">
    <view class="profile-card" @tap="onPageTap('../user-info/userinfo')">
      <view v-if="tableName == 'yonghu'" class="profile-person"
        ><image
          class="profile-avatar"
          mode="aspectFill"
          :src="user.yonghuPhoto ? $assetUrl(user.yonghuPhoto) : '/static/center/face.jpeg'"
        ></image
        ><view class="profile-person-copy"
          ><text class="profile-eyebrow">MY LEARNING</text
          ><view class="profile-name">{{ user.yonghuName }}</view
          ><view class="profile-study"
            ><text class="cuIcon-time"></text>学习时长 {{ user.xuexiNumber }} 分钟</view
          ></view
        ></view
      >
      <view class="profile-settings cuIcon-settings"></view>
    </view>
    <view class="profile-section-title">学习与账号</view>
    <view class="profile-links"
      ><block v-for="item in menuList" :key="item.roleName"
        ><block v-for="(menu, index) in item.backMenu" :key="index"
          ><block v-if="role == item.roleName"
            ><view
              v-for="(child, sort) in menu.child"
              :key="child.tableName + sort"
              class="profile-link"
              hover-class="profile-link-hover"
              @tap="onPageTap('../' + child.tableName + '/list?userId=' + user.id)"
              ><view class="profile-link-symbol" :class="child.appFrontIcon"></view
              ><view class="profile-link-label">{{ child.menu }}</view
              ><view class="profile-link-arrow cuIcon-right"></view></view></block></block
      ></block>
      <view
        class="profile-link"
        hover-class="profile-link-hover"
        @tap="onPageTap('../forum/forum-my')"
        ><view class="profile-link-symbol cuIcon-message"></view
        ><view class="profile-link-label">论坛信息</view
        ><view class="profile-link-arrow cuIcon-right"></view
      ></view>
    </view>
    <view class="profile-footer">持续学习，守护数字生活。</view>
    <ai-assistant />
  </view>
</template>
<script src="./center.options.js"></script>
<style lang="scss" src="./center.styles.scss"></style>
