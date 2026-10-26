<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback"
			  :bottom="100">
	<view class="container">
		<view>
			<swiper class="swiper" :indicator-dots='".swiper-pagination"==null?false:true'
					:autoplay='autoplaySwiper' :circular='true' indicator-active-color='#000000'
					indicator-color='rgba(0, 0, 0, .3)' :duration='1000' :interval='intervalSwiper'
					:vertical='"horizontal"=="horizontal"?false:true'>
				<swiper-item v-for="(swiper,index) in swiperList" :key="index">
					<image mode="aspectFit" :src="$assetUrl(swiper)"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 二维码模态框 -->
		<uni-popup ref="erweimaModal" type="center">
			<view :style="viewStyles.style1">
				<view :style="viewStyles.style2">
					二维码
				</view>
				<view :style="viewStyles.style3">
					<view :style="viewStyles.style4">
						<u-qrcode ref="qr" canvas-id="qr" :value="erweimaText" size="200"></u-qrcode>
					</view>
				</view>
				<view :style="viewStyles.style5">
					<view :style="viewStyles.style6" @tap="closeErweima">
						关闭
					</view>
					<view :style="viewStyles.style7" @tap="saveErweima">
						保存二维码
					</view>
				</view>
			</view>
		</uni-popup>

		<view class="">

					<!-- 商品内容 -->
			<view class="yinyuewai">
				<view class="yinyuenei"><!-- @tap="onErweima()" -->
						<!-- 商品名称 -->
						<view class="shangpinfei">
							{{detail.shipinName}}<!-- <uni-icons type="scan" size="30"></uni-icons> -->
						</view>
					<view class="xiangqing">
						<view class="shangpinxiangqing">
							<view class="box">
								视频类型：
							</view>
							<view class="app">
								{{detail.shipinValue}}
							</view>
						</view>
					</view>

			</view>
		</view>
				<!-- 视频 -->
				<view class="shipin-list">
					<view class="yinyuenei uni-padding-wrap uni-common-mt">
						<view>
							<video id="myVideo" :style="viewStyles.style8" muted
								   :src="$assetUrl(detail.shipinVideo)" controls></video>
						</view>
					</view>
				</view>
				<!-- 简介 -->
				<view class="yinyuewai">
					<view class="yinyuenei">
						<!-- 简介 -->
						<view class="jianjiexiangqing">
							简介/详情
						</view>
						<!-- 简介内容 -->
						<view class="" :style="viewStyles.style9">
							<rich-text :nodes="detail.shipinContent"></rich-text>
						</view>
					</view>
				</view>
            <!-- 留言 -->
			</view>
		</view>
				<!-- 商品导航栏 -->
				<view class="bottom-content cu-bar bg-white tabbar border shop">
					<view :style="viewStyles.style10">
                      <view @tap="fanhui" :style="viewStyles.style11">
                      	<view :style="[viewStyles.style12, [{backgroundImage:'linear-gradient(120deg,'+ btnColor[0] +','+ btnColor[1] +')'}]]" >
                      		结束学习
                      	</view>
                      </view>
				</view>
			</view>


			</mescroll-uni>


	</template>

	<script src="./detail.options.js"></script>

	<style lang="scss" src="./detail.styles.scss"></style>
