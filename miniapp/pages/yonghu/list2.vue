<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

	<view class="cu-bar bg-white search" :style="[{top:CustomBar + 'px'}]">
        <view class="search-form round">
				<input :style='{"padding":"0 24rpx","boxShadow":"0 10rpx 0px rgba(0,0,0,0)","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"40rpx","borderWidth":"2rpx 2rpx 10rpx 2rpx","fontSize":"26rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
						v-model="searchForm.yonghuName" type="text" placeholder="用户姓名"></input>
		</view>

        <view class="action">
			<button @tap="search"
				:style="{width:'auto',borderRadius:'40rpx',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}"
				class="cu-btn shadow-blur round">搜索</button>
            <button
                    :style="{'padding':'5rpx 24rpx 0','marginLeft':'10rpx',width:'auto',borderRadius:'40rpx',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}"
                    v-if="isAuth('yonghu','新增')" @click="onAddTap()" class="uniui-add">新增</button>
		</view>
	</view>
	<view :style="viewStyles.style1">
        <view :style="viewStyles.style2">
            <view class="list b-b" v-for="(item, index) in list" :key="index" :style="viewStyles.style3">
                <view
:style="viewStyles.style4">
                    <h4>{{ item.yonghuName }}</h4>
                    <view>
                        <uni-icons v-show="isAuth('yonghu','删除')" @tap="onDeleteTap(item.id)" type="closeempty"
                                   size="20"></uni-icons>
                    </view>
                </view>
                 <view v-show="item.yonghuPhone" :style="viewStyles.style5">
                     <text :style="viewStyles.style6">用户手机号</text>
                     <text :style="viewStyles.style7">{{item.yonghuPhone}}</text>
                 </view>
                 <view v-show="item.yonghuIdNumber" :style="viewStyles.style8">
                     <text :style="viewStyles.style9">用户身份证号</text>
                     <text :style="viewStyles.style10">{{item.yonghuIdNumber}}</text>
                 </view>
                 <view v-show="item.sexValue" :style="viewStyles.style11">
                     <text :style="viewStyles.style12">性别</text>
                     <text :style="viewStyles.style13">{{item.sexValue}}</text>
                 </view>
                 <view v-show="item.xuexiNumber" :style="viewStyles.style14">
                     <text :style="viewStyles.style15">学习时长</text>
                     <text :style="viewStyles.style16">{{item.xuexiNumber}}</text>
                 </view>
                 <view v-show="item.yonghuEmail" :style="viewStyles.style17">
                     <text :style="viewStyles.style18">电子邮箱</text>
                     <text :style="viewStyles.style19">{{item.yonghuEmail}}</text>
                 </view>
            <view :style="viewStyles.style20">
                <text v-show="item.createTime">{{item.createTime}}</text>
                <uni-icons v-show="isAuth('yonghu','修改')" @tap="onUpdateTap(item.id)" type="compose" size="20">
                </uni-icons>
            </view>
        </view>
    </view>
	</view>
	
	</mescroll-uni>
</template>

<script src="./list2.options.js"></script>

<style src="./list2.styles.css"></style>
