<template>
  <view class="box">
    <!-- 答题试卷区域 -->
    <view class="datilist">
      <view class="" :style="viewStyles.style1">
        {{ exampaperName }}
      </view>
      <view class="exam">
        <view class="datilist-List">
          <uni-icons type="notification" size="30"></uni-icons>
          <text>{{ SecondToDate }}</text>
        </view>
        <view class="datilist-List">
          <text v-if="count > 0">考试中</text>
          <text v-else>考试结束</text>
        </view>
      </view>
    </view>
    <!-- 答题区域 -->
    <view class="datidata">
      <swiper class="swiper" :interval="3000" :duration="200">
        <swiper-item v-for="(item, index) in dataList" :key="item.examquestionId || index">
          <scroll-view class="swiper-item" scroll-y="true">
            <view class="swiper-text">
              <view class="" :style="viewStyles.style2">
                <text>{{ item.examquestionValue }}/{{ item.exampapertopicNumber }}分</text>
                <view class="datilist-List">
                  <text :style="viewStyles.style3"
                    ><text :style="viewStyles.style4">{{ index + 1 }}</text
                    >/</text
                  >{{ dataList.length }}
                </view>
              </view>
              <view class="topic">
                <text>{{ index + 1 }}、</text>
                <text>{{ item.examquestionName }}</text>
              </view>
            </view>
            <view class="swiper-list">
              <checkbox-group class="swiper-list" v-if="item.examquestionTypes == 2">
                <label
                  @tap="selectQuestions(item.examquestionId, io.code)"
                  v-for="io in item.examquestionOptions"
                  v-bind:key="io.code"
                  :style="viewStyles.style5"
                >
                  <checkbox :value="io.code" />{{ io.code }}、
                  <view>{{ io.text }}</view>
                </label>
              </checkbox-group>
              <!-- 、单选框	 -->
              <radio-group
                class="swiper-list"
                v-else-if="item.examquestionTypes == 1 || item.examquestionTypes == 3"
              >
                <label
                  @tap="selectQuestions(item.examquestionId, io.code)"
                  v-for="io in item.examquestionOptions"
                  v-bind:key="io.code"
                  :style="viewStyles.style6"
                >
                  <radio :value="io.code" />{{ io.code }}、
                  <view>{{ io.text }}</view>
                </label>
              </radio-group>
              <!-- 填空题 -->
              <textarea
                v-else
                maxlength="-1"
                v-model="answerList[index].answer"
                :style="viewStyles.style7"
              />
            </view>
            <view class="" v-show="index === 0" :style="viewStyles.style8">
              <image src="../../static/kaosi/tips.jpg" mode="aspectFit"></image>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <view class="submit">
      <button class="submit-item" @tap="submitQuestions"> 提交试卷 </button>
    </view>
  </view>
</template>

<script src="./exam.options.js"></script>

<style src="./exam.styles.css"></style>
