<template>
  <view class="learning-home">
    <view class="learning-hero"
      ><text class="hero-eyebrow">SECURITY LEARNING</text
      ><view class="hero-title">学一点安全，多一份守护。</view
      ><view class="hero-description">保护账号，识别钓鱼，守护个人信息。</view
      ><view class="hero-symbol cuIcon-lock" aria-hidden="true"></view
    ></view>
    <view v-if="swiperList.length" class="banner-wrap"
      ><swiper
        class="learning-banner"
        :indicator-dots="true"
        :autoplay="autoplaySwiper"
        :circular="true"
        indicator-color="rgba(255,255,255,.5)"
        indicator-active-color="#fff"
        :duration="500"
        :interval="intervalSwiper"
        ><swiper-item v-for="(banner, index) in swiperList" :key="index" @tap="onSwiperTap(banner)"
          ><image mode="aspectFill" :src="$assetUrl(banner.img)"></image><view class="banner-caption"><text>网络安全微课堂</text><view>{{ banner.title }}</view></view></swiper-item></swiper
    ></view>
    <view class="learning-menu"
      ><block v-for="item in menuList" :key="item.roleName"
        ><block v-for="(group, index) in item.backMenu" :key="index"
          ><block
            v-if="(role === item.roleName || table === item.tableName) && index <= 4 && index > 0"
            ><block v-for="child in group.child" :key="child.tableName"
              ><view
                v-if="child.buttons.indexOf('查看') !== -1"
                class="learning-menu-item"
                @tap="onPageTap2('../' + child.tableName + '/list')"
                ><view class="menu-symbol" :class="child.appFrontIcon"></view
                ><text>{{ child.menu.split('列表')[0] }}</text></view
              ></block
            ></block
          ></block
        ></block
      ></view
    >
    <view class="learning-section"
      ><view class="section-title"
        ><view><text class="section-kicker">NOTICE</text><view>学习公告</view></view
        ><button class="text-link" @tap="onPageTap('news')"
          >查看全部<text class="cuIcon-right"></text></button></view
      ><view v-if="!newsList.length" class="learning-empty">暂无公告，稍后再来看看</view
      ><view
        v-for="item in newsList"
        :key="item.id"
        class="notice-card"
        @tap="onDetailTap('news', item.id)"
        ><view class="notice-topline"
          ><text class="notice-tag">公告</text
          ><text class="notice-date">{{ (item.insertTime || '').split(' ')[0] }}</text></view
        ><view class="notice-title">{{ item.newsName }}</view
        ><view class="notice-summary">{{ plainSummary(item.newsContent) }}</view></view
      ></view
    >
    <view class="learning-section"
      ><view class="section-title"
        ><view><text class="section-kicker">KEEP LEARNING</text><view>网络安全微课</view></view
        ><button class="text-link" @tap="onPageTap('shipin')"
          >查看全部<text class="cuIcon-right"></text></button></view
      ><view v-if="!shipinList.length" class="learning-empty">课程正在准备中</view
      ><view class="course-grid"
        ><view
          v-for="product in shipinList"
          :key="product.id"
          class="course-card"
          @tap="onDetailTap('shipin', product.id)"
          ><view class="course-cover"
            ><image
              v-if="product.shipinPhoto"
              mode="aspectFill"
              :src="$assetUrl(product.shipinPhoto.split(',')[0])"
            ></image
            ><view v-else class="cover-placeholder cuIcon-video"></view
            ><text class="course-play cuIcon-playfill"></text></view
          ><view class="course-copy"
            ><text class="course-category">{{ product.shipinValue || '安全知识' }}</text
            ><view class="course-title">{{ product.shipinName }}</view></view
          ></view
        ></view
      ></view
    >
    <ai-assistant />
  </view>
</template>
<script src="./index.options.js"></script>
<style src="./index.styles.css"></style>
