<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
        <view class="box">
            <!-- 答题试卷区域 -->
            <view class="datilist">
                <view class="" :style="viewStyles.style1">
                    {{headDate.exampaperName}}
                </view>
                <view class="exam">
                    <view class="datilist-List">
                        <!-- <uni-icons type="notification" size='30'></uni-icons>
                            <text> 00:00 :05</text> -->
                        总分数：{{headDate.exampaperMyscore}}
                    </view>
                    <view class="datilist-text">
                        {{headDate.totalScore}}分
                    </view>
                </view>
            </view>
            <!-- 答题区域 -->
            <view class="datidata" v-for="(item,index) in list" v-bind:key="index">
                <view class="swiper">
                    <view>
                        <view class="swiper-item">
                            <view class="swiper-text">
                                <view class="" :style="viewStyles.style2">

                                    <text>{{item.examquestionValue}}</text>
                                    <view class="datilist-text">
                                        <text>{{index+1}}</text>/
                                        <text>{{list.length}}</text>
                                    </view>
                                </view>
                                <view class="timu">
                                    <text>{{index+1}}、</text>
                                    <text>{{item.examquestionName}}</text>
                                </view>

                            </view>
                            <view class="swiper-list ">
                                <view class="swiper-list" v-if="item.examquestionTypes != 4">
                                    <!--  class="options" -->
                                    <view v-for="(io) in JSON.parse(item.examquestionOptions)" v-bind:key="io.code">
                                        {{io.code}}、{{io.text}}
                                    </view>
                                </view>
                            </view>
                            <view class="analysis">
                                <text :style="viewStyles.style3">回答：{{item.examredetailsMyanswer}}</text>
                                <text :style="viewStyles.style4">正确答案：{{item.examquestionAnswer}}</text>
                                <view class="analysis-text">解析：{{item.examquestionAnalysis}}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

    </mescroll-uni>
</template>

<script src="./detail.options.js"></script>

<style src="./detail.styles.css"></style>

