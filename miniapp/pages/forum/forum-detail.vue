<template>
<view>
		<view class="title">
			{{forum.forumName}}
		</view>
        <view class="username">
			<text v-if="forum.yonghuId != null">
				 发布人：{{forum.yonghuName}}（用户）
			</text>
            <text v-if="forum.usersId!= null">
                发布人：管理员
            </text>
        </view>
		<view class="content">
			<rich-text :nodes="forum.forumContent"></rich-text>
		</view>
		<view class="uni-article__comment">
			<view class="uni-article__comment-box" v-for="comment in commentData" :key="comment.id" >
				<view class="article-meta">
					<view class="article-header-image">
                        <image v-if="comment.yonghuId != null" class="image" :src="$assetUrl(comment.yonghuPhoto)" mode="widthFix"></image>
						<image v-if="comment.usersId != null" class="image" src="/static/center/face.jpeg" mode="widthFix"></image>

					</view>
					<view class="article-header-content">
						<view class="article-header-title">
							<text v-if="comment.yonghuId != null">{{comment.yonghuName}}</text>
							<text v-if="comment.usersId != null">管理员</text>
						</view>
						<view class="article-header-info"> {{comment.insertTime||''}}</view>
					</view>
				</view>
				<view class="uni-article__comment-centent">
					<user-reply :style="viewStyles.style1" v-if="commentData" :digest="commentData"></user-reply>
					{{comment.forumContent}}
				</view>
			</view>
			
			<view class="bottom-content">
				<button @tap="onChatTap" class="bg-red margin-tb-sm">评论</button>
			</view>
			
			<uni-popup class="popup-content" ref="popup" type="center">
				<form class="popup-form">
			
					<view class="uni-flex uni-column" :style="viewStyles.style2">
						<view class="flex-item flex-item-V" :style="viewStyles.style3">评论内容</view>
						<view class="flex-item flex-item-V">
							<textarea :style="viewStyles.style4" v-model="forumContent" placeholder="评论内容"></textarea>
						</view>
						<view class="flex-item flex-item-V" :style="viewStyles.style5">
							<button @tap="onCloseWinTap" :style="viewStyles.style6" class="cu-btn bg-cyan">取消</button>
							<button @tap="onFinishTap" :style="viewStyles.style7" class="cu-btn bg-red">确认</button>
						</view>
					</view>
				</form>
			</uni-popup>
			
			
		</view>
	</view>
</template>
<script src="./forum-detail.options.js"></script>

<style scoped src="./forum-detail.styles.css"></style>
