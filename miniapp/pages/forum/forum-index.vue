<template>
  <view class="learning-community">
    <mescroll-uni
      @init="mescrollInit"
      :up="upOption"
      :down="downOption"
      @down="downCallback"
      @up="upCallback"
    >
      <view class="community-heading"
        ><view>交流与分享</view><text>记录学习心得，一起提升安全意识。</text></view
      >
      <view class="community-search"
        ><view class="community-search-field"
          ><text class="cuIcon-search"></text
          ><input
            v-model="searchForm.forumName"
            type="text"
            placeholder="搜索帖子标题"
            confirm-type="search"
            @confirm="search" /></view
        ><button @tap="search">搜索</button></view
      >
      <view class="community-posts"
        ><view
          v-for="item in list"
          :key="item.id"
          class="community-post"
          @tap="onDetailTap(item.id)"
        >
          <view class="community-post-heading"
            ><text class="community-post-symbol cuIcon-message"></text
            ><view class="community-post-title">{{ item.forumName }}</view></view
          >
          <view class="community-post-summary">{{
            (item.forumContent || '').length > 50
              ? item.forumContent.substring(0, 50) + '... ...'
              : item.forumContent
          }}</view>
          <view class="community-post-author"
            ><text v-if="item.yonghuId != null">发布人：{{ item.yonghuName }}（用户）</text
            ><text v-if="item.usersId != null">发布人：管理员</text
            ><view class="community-role"
              ><text v-if="item.yonghuId != null">用户</text
              ><text v-if="item.usersId != null">管理员</text></view
            ></view
          >
          <view class="community-post-time">发布时间：{{ item.insertTime }}</view>
        </view></view
      >
    </mescroll-uni>
    <ai-assistant />
  </view>
</template>
<script src="./forum-index.options.js"></script>
<style src="./forum-index.styles.css"></style>
