<template>
<view :style="viewStyles.style1">
				<view class="title">
					{{detail.newsName}}
				</view>
				<view  :style="[viewStyles.style2, (detail.newsValue == null || detail.insertTime == null)?'text-align: center;':'']">
					<text v-if="detail.newsValue">
						{{detail.newsValue}}
					</text>
					<text :style="detail.newsValue?'float: right':''">
						{{detail.insertTime}}<!-- .split(' ')[0] -->
					</text>
				</view>
				<view :style="viewStyles.style3"></view>
                <viwe>
					<image :src="$assetUrl(detail.newsPhoto)"></image>
                </viwe>
				<view class="content">
					<rich-text :nodes="detail.newsContent"></rich-text>
				</view>
			</view>



	</template>

	<script src="./detail.options.js"></script>

	<style lang="scss" src="./detail.styles.scss"></style>
