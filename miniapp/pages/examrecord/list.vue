<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

        <view @tap="onDetailTap(item)" :style="viewStyles.style1" class="cu-list menu-avatar" v-for="(item,index) in list" v-bind:key="index">
            <view class="cu-item">
                <view class="content" :style="viewStyles.style2">
                    <text class="text-bold">{{ item.examrecordUuidNumber }}</text>
                    <view class="text-grey" :style="viewStyles.style3">试卷名称：{{item.exampaperName}}</view>
                </view>
                <view class="action" :style="viewStyles.style4">
                    <view class="cu-tag round bg-red sm">总分:{{item.totalScore}}</view>
                </view>
            </view>
        </view>

    </mescroll-uni>


</template>

<script src="./list.options.js"></script>

<style>

</style>
