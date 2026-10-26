<template>
  <view class="security-notices">
    <mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
      <view class="notices-heading"><view>安全公告与实践</view><text>读懂一个要点，完成一次安全行动。</text></view>
      <view class="notices-search">
        <view class="notices-search-input"><text class="cuIcon-search"></text><input v-model="searchForm.newsName" type="text" placeholder="搜索安全提醒或学习任务" confirm-type="search" @confirm="search" /></view>
        <button class="notices-search-button" @tap="search">搜索</button>
      </view>
      <view class="notices-tools">
        <button class="notice-type-button" @tap="showDrawer"><text class="cuIcon-sort"></text> 公告分类</button>
        <button v-if="isAuth('news','新增')" class="notice-type-button" @tap="onAddTap">新增公告</button>
      </view>
      <uni-drawer ref="showRight" mode="left" :width="252" :mask-click="true">
        <view class="notice-filter-heading"><text>公告分类</text><button class="notice-filter-close" aria-label="关闭公告分类" @tap="closeDrawer">×</button></view>
        <scroll-view scroll-y class="notice-filter-list"><view v-for="item in newsTypesList" :key="item.codeIndex" class="notice-filter-item" :class="{'notice-filter-active':newsTypes===item.codeIndex}" @tap="newsTypesCategoryClick(item.codeIndex)">{{ item.indexName }}</view></scroll-view>
      </uni-drawer>
      <view class="notices-list">
        <view v-if="!list.length" class="notices-empty">暂无匹配的公告，换个关键词试试。</view>
        <view v-for="item in list" :key="item.id" class="security-notice-card" @tap="onDetailTap(item)">
          <image v-if="item.newsPhoto" class="notice-card-cover" :src="$assetUrl(item.newsPhoto)" mode="aspectFill" />
          <view class="notice-card-copy">
            <view class="notice-card-meta"><text class="notice-card-type">{{ item.newsValue || '安全公告' }}</text><text>{{ (item.insertTime || '').split(' ')[0] }}</text></view>
            <view class="notice-card-title">{{ item.newsName }}</view>
            <view class="notice-card-summary">{{ plainSummary(item.newsContent) }}</view>
            <text class="notice-card-link">阅读要点 <text class="cuIcon-right"></text></text>
          </view>
        </view>
      </view>
    </mescroll-uni>
  </view>
</template>
<script src="./list.options.js"></script>
<style scoped src="./list.styles.css"></style>
