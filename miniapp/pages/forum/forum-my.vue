<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
		<!--header end-->
		<view class="list">
			<view v-for="(item,index) in list " v-bind:key="index" class="listm flex flex-between">
				<image src="/static/exam-index/paper.png" mode="widthFix" class="listmpic mt10"></image>
				<view class="listmr">
					<view class="col3 f30 elip mb15">{{item.forumName}}</view>
                    <view class="colb f24">{{item.forumValue}}</view>
					<view class="colb f24 lh35">{{item.forumContent.length>50?item.forumContent.substring(0,50)+'... ...':item.forumContent}}</view>
					<view v-if="item.insertTime" class="colb f24 lh35">发布时间{{item.insertTime}}</view>
					<view class="flex flex-align-center mt20">
						<view class="colb f25">
							<button @tap="onDetailTap(item.id)" class="cu-btn bg-green shadow">查看</button>
							<button :style="viewStyles.style1" @tap="onUpdateTap(item.id)" class="cu-btn bg-blue shadow">修改</button>
							<button :style="viewStyles.style2" @tap="onDeleteTap(item.id)" class="cu-btn bg-red shadow">删除</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--list end-->
		<button class="add-btn" @click="onUpdateTap()">新增</button>
	</mescroll-uni>
</template>

<script src="./forum-my.options.js"></script>

<style src="./forum-my.styles.css"></style>
