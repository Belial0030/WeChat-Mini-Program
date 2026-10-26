<template>
  <view class="video-learning-page">
    <mescroll-uni
      @init="mescrollInit"
      :up="upOption"
      :down="downOption"
      @down="downCallback"
      @up="upCallback"
    >
      <view class="video-page-heading"
        ><view>视频学习</view><text>五个主题，学会保护账号与数据。</text></view
      >
      <view class="course-search"
        ><view class="course-search-input"
          ><text class="cuIcon-search"></text
          ><input
            v-model="searchForm.shipinName"
            placeholder="搜索感兴趣的安全知识"
            confirm-type="search"
            @confirm="search" /></view
        ><button class="course-search-button" @tap="search">搜索</button></view
      >
      <view class="course-toolbar"
        ><button class="category-button" @tap="showDrawer()"
          ><text class="cuIcon-sort"></text>课程分类</button
        ><button v-if="isAuth('shipin', '新增')" class="course-add" @tap="onAddTap()"
          >新增视频</button
        ></view
      >
      <view class="video-course-list"
        ><view
          v-for="product in list"
          :key="product.id"
          class="video-course-card"
          @tap="onDetailTap(product)"
          ><view class="video-course-cover"
            ><image
              v-if="product.shipinPhoto"
              mode="aspectFill"
              :src="$assetUrl(product.shipinPhoto.split(',')[0])"
            ></image
            ><view v-else class="video-cover-placeholder cuIcon-video"></view
            ><text class="video-play cuIcon-playfill"></text></view
          ><view class="video-course-copy"
            ><text class="video-category">{{ product.shipinValue || '安全知识' }}</text
            ><view class="video-course-name">{{ product.shipinName }}</view
            ><view class="video-course-bottom"
              ><text class="video-watch">查看课程<text class="cuIcon-right"></text></text
              ><view class="video-actions"
                ><button v-if="isAuth('shipin', '修改')" @tap.stop="onUpdateTap(product.id)"
                  >修改</button
                ><button
                  v-if="isAuth('shipin', '删除')"
                  class="video-delete"
                  @tap.stop="onDeleteTap(product.id)"
                  >删除</button
                ></view
              ></view
            ></view
          ></view
        ></view
      >
    </mescroll-uni>
    <uni-drawer ref="showRight" mode="left" :mask-click="true" :width="240"
      ><view class="category-header"
        ><view class="category-title">课程分类</view
        ><button class="category-close" aria-label="关闭课程分类" @tap="closeDrawer()"
          >×</button
        ></view
      ><scroll-view scroll-y class="category-scroll"
        ><view
          v-for="item in shipinTypesList"
          :key="item.codeIndex"
          class="category-option"
          :class="{ 'category-active': shipinTypes === item.codeIndex }"
          @tap="shipinTypesCategoryClick(item.codeIndex)"
          >{{ item.indexName }}</view
        ></scroll-view
      ></uni-drawer
    >
    <ai-assistant />
  </view>
</template>
<script src="./list.options.js"></script>
<style src="./list.styles.css"></style>
