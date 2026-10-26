<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

	<view class="cu-bar bg-white search" :style="[{top:CustomBar + 'px'}]">
        <view class="search-form round">
		</view>

        <view class="action">
			<button @tap="search"
				:style="{width:'auto',borderRadius:'40rpx',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}"
				class="cu-btn shadow-blur round">搜索</button>
            <button
                    :style="{'padding':'5rpx 24rpx 0','marginLeft':'10rpx',width:'auto',borderRadius:'40rpx',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}"
                    v-if="isAuth('exampapertopic','新增')" @click="onAddTap()" class="uniui-add">新增</button>
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

<script src="./list2.options.js"></script>

<style src="./list2.styles.css"></style>
