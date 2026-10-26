<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

	<view class="cu-bar bg-white search" :style="[{top:CustomBar + 'px'}]">
        <view class="action">
            <view :style="{width:'40rpx',borderRadius:'40rpx 0 0 40rpx',height:'80rpx',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
            </view>
            <view @click="showDrawer()"
                  :style="{padding:'0 10rpx',lineHeight:'80rpx',width:'auto',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
                类型
            </view>
            <view :style="{width:'40rpx',borderRadius:'0 40rpx 40rpx 0',height:'80rpx',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
            </view>
        </view>
	</view>
	<view :style="viewStyles.style1">
            <uni-drawer ref="showRight" mode="left" :maskClick="true" :width="100" :mask-click="true">
                <scroll-view scroll-y="true" class="tabView" :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"10rpx 0 0 ","borderColor":"rgba(0,0,0,1)","borderRadius":"0","borderWidth":"0","width":"150rpx","borderStyle":"solid","height":"auto"}'>
                    <view :style="viewStyles.style2">
                        <view :style='xuexizujiTypes===item.codeIndex?sactiveItem:sitem' class="tab"
                              v-for="(item,index) in xuexizujiTypesList" :key="index"
                              :class="xuexizujiTypes===item.codeIndex?'tabActive':''"
                              @tap="xuexizujiTypesCategoryClick(item.codeIndex)">{{item.indexName}}</view>
                    </view>
                </scroll-view>
            </uni-drawer>
        <view :style="viewStyles.style3">
            <view class="list b-b" v-for="(item, index) in list" :key="index" :style="viewStyles.style4">
                <view
:style="viewStyles.style5">
                    <h4>{{ item.shipinName }}</h4>
                    <view>
                        <uni-icons v-show="isAuth('xuexizuji','删除')" @tap="onDeleteTap(item.id)" type="closeempty"
                                   size="20"></uni-icons>
                    </view>
                </view>
                 <view v-show="item.xuexizujiTime" :style="viewStyles.style6">
                     <text :style="viewStyles.style7">开始时间</text>
                     <text :style="viewStyles.style8">{{item.xuexizujiTime}}</text>
                 </view>
                 <view v-show="item.xuexizujiValue" :style="viewStyles.style9">
                     <text :style="viewStyles.style10">学习状态</text>
                     <text :style="viewStyles.style11">{{item.xuexizujiValue}}</text>
                 </view>
            <view :style="viewStyles.style12">
                <text v-show="item.createTime">{{item.createTime}}</text>
                <uni-icons v-show="isAuth('xuexizuji','修改')" @tap="onUpdateTap(item.id)" type="compose" size="20">
                </uni-icons>
            </view>
        </view>
    </view>
	</view>

	</mescroll-uni>
</template>

<script src="./list.options.js"></script>

<style src="./list.styles.css"></style>
