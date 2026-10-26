<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

	<view class="cu-bar bg-white search" :style="[{top:CustomBar + 'px'}]">
        <view class="search-form round">
		</view>

        <view class="action">
            <view :style="{width:'40rpx',borderRadius:'40rpx 0 0 40rpx',height:'80rpx',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
            </view>
            <view @tap="search" :style="{padding:'0 10rpx',lineHeight:'80rpx',width:'auto',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
                搜索
            </view>
            <view v-if="isAuth('exampapertopic','新增')" @click="onAddTap()"
                  :style="{padding:'0 10rpx',lineHeight:'80rpx',width:'auto',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
                新增
            </view>
            <view :style="{width:'40rpx',borderRadius:'0 40rpx 40rpx 0',height:'80rpx',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
            </view>
        </view>
	</view>
	<view :style="viewStyles.style1">
        <view :style="viewStyles.style2">
            <view class="list b-b" v-for="(item, index) in list" :key="index" :style="viewStyles.style3">
                <view
:style="viewStyles.style4">
                    <h4>{{ item.exampapertopicName }}</h4>
                    <view>
                        <uni-icons v-show="isAuth('exampapertopic','删除')" @tap="onDeleteTap(item.id)" type="closeempty"
                                   size="20"></uni-icons>
                    </view>
                </view>
                 <view v-show="item.exampapertopicNumber" :style="viewStyles.style5">
                     <text :style="viewStyles.style6">试题分数</text>
                     <text :style="viewStyles.style7">{{item.exampapertopicNumber}}</text>
                 </view>
            <view :style="viewStyles.style8">
                <text v-show="item.createTime">{{item.createTime}}</text>
                <uni-icons v-show="isAuth('exampapertopic','修改')" @tap="onUpdateTap(item.id)" type="compose" size="20">
                </uni-icons>
            </view>
        </view>
    </view>
	</view>

	</mescroll-uni>
</template>

<script src="./list.options.js"></script>

<style src="./list.styles.css"></style>
