<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
        <view>
            <view class="mistakes" v-for="(item,index) in this.list">
                <view class="head">
                    {{index+1}}、（{{item.examquestionValue}}）
                    <view class="timu">
                        {{item.examquestionName}}
                    </view>

                </view>
                <view class="option">
                    <view v-for="(io) in JSON.parse(item.examquestionOptions)" v-bind:key="io.code">
                        {{io.code}}、{{io.text}}
                    </view>
                </view>
                <view class="analysis">
                    <text :style="viewStyles.style1">回答：{{item.examredetailsMyanswer}}</text>
                    <text :style="viewStyles.style2">正确答案：{{item.examquestionAnswer}}</text>
                    <view class="analysis-text">解析：{{item.examquestionAnalysis}}</view>
                </view>
            </view>
        </view>
    </mescroll-uni>
</template>

<script src="./list.options.js"></script>

<style src="./list.styles.css"></style>

