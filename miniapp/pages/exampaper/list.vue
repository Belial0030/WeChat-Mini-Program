<template>
  <view class="exam-library">
    <mescroll-uni
      @init="mescrollInit"
      :up="upOption"
      :down="downOption"
      @down="downCallback"
      @up="upCallback"
    >
      <view class="exam-library-heading"
        ><text class="exam-library-eyebrow">CHECK YOUR KNOWLEDGE</text><view>在线考试</view
        ><text class="exam-library-description">用一次练习，检验一份掌握。</text></view
      >
      <view class="exam-library-list">
        <view
          v-for="item in list"
          :key="item.id"
          class="exam-paper-card"
          @tap="onDetailTap(item.id)"
        >
          <view class="exam-paper-top"
            ><view class="exam-paper-symbol cuIcon-form"></view
            ><view class="exam-paper-name">{{ item.exampaperName }}</view></view
          >
          <view class="exam-paper-meta"
            ><view
              ><text>试卷总分</text><view>{{ item.exampaperMyscore }}<text> 分</text></view></view
            ><view
              ><text>考试时长</text><view>{{ item.exampaperDate }}<text> 分钟</text></view></view
            ></view
          >
          <button class="exam-paper-start" @tap.stop="onDetailTap(item.id)"
            >点击考试<text class="cuIcon-right"></text
          ></button>
        </view>
      </view>
    </mescroll-uni>
    <ai-assistant />
  </view>
</template>
<script src="./list.options.js"></script>
<style src="./list.styles.css"></style>
