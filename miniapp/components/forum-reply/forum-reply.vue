<template>
<view>
	<view class="article-meta">
		<user-reply v-if="newData.childs" :digest="newData.childs"></user-reply>
		<view class="article-meta-box">
			<!-- <view class="article-header-image">
				<view class="article-header-title"><text class="article-header-title-text">{{ digestData.length + 1}}</text>
				</view>
			</view> -->
			<view :style="viewStyles.style1">
				<view class="article-header-content">
					<view class="article-header-title">
						用户:{{newData.username}}
					</view>
					<view class="article-header-info">{{newData.addtime||''}}</view>
				</view>
				<view class="uni-article__comment-centent">
					{{newData.content}}
					<text class="btn-replay" @tap="onReplyTap(newData.id)" >回复</text>
				</view>
			</view>
		</view>
	</view>
</view>
</template>

<script src="./forum-reply.options.js"></script>

<style scoped src="./forum-reply.styles.css"></style>
