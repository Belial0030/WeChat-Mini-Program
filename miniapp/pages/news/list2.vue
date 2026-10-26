<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

	<view class="cu-bar bg-white search" :style="[{top:CustomBar + 'px'}]">
        <view class="search-form round">
				<input :style='{"padding":"0 24rpx","boxShadow":"0 10rpx 0px rgba(0,0,0,0)","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"40rpx","borderWidth":"2rpx 2rpx 10rpx 2rpx","fontSize":"26rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
						v-model="searchForm.newsName" type="text" placeholder="公告信息标题"></input>
		</view>

        <view class="action">
			<button @tap="search"
				:style="{width:'auto',borderRadius:'40rpx',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}"
				class="cu-btn shadow-blur round">搜索</button>
            <button
                    :style="{'padding':'5rpx 24rpx 0','marginLeft':'10rpx',width:'auto',borderRadius:'40rpx',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}"
                    v-if="isAuth('news','新增')" @click="onAddTap()" class="uniui-add">新增</button>
		</view>
	</view>
	<view :style="viewStyles.style1">
            <scroll-view scroll-y="true" class="tabView" :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"rgba(0,0,0,1)","borderRadius":"0","borderWidth":"0","width":"150rpx","borderStyle":"solid","height":"auto"}'>
                <view :style="viewStyles.style2">
                    <view :style='categoryName===item.codeIndex?sactiveItem:sitem' class="tab" v-for="(item,index) in categoryList"
                          :key="index" :class="categoryName===item.codeIndex?'tabActive':''" @tap="categoryClick(item.codeIndex)">{{item.indexName}}</view>
                </view>
            </scroll-view>
<view class="news-box5"
      :style='{"padding":"20rpx","boxShadow":"0 0 12rpx rgba(0,0,0,0)","margin":"0 0 20rpx","borderColor":"red","backgroundColor":"rgba(255, 255, 255, 1)","borderRadius":"0","borderWidth":"0","width":"100%","borderStyle":"solid","height":"auto"}'
      >
    <view @tap="onDetailTap(item)" v-for="(item,index) in list" :key="index" class="list-item"
:style="[viewStyles.style3, {&quot;padding&quot;:&quot;20rpx 12rpx&quot;,&quot;boxShadow&quot;:&quot;0 10rpx 0px 4rpx var(--publicMainColor)&quot;,&quot;margin&quot;:&quot;20rpx auto&quot;,&quot;borderColor&quot;:&quot;var(--publicSubColor)&quot;,&quot;backgroundColor&quot;:&quot;rgba(255,255,255,1)&quot;,&quot;borderRadius&quot;:&quot;0 0 40rpx 40rpx&quot;,&quot;borderWidth&quot;:&quot;2rpx&quot;,&quot;width&quot;:&quot;100%&quot;,&quot;borderStyle&quot;:&quot;solid&quot;,&quot;height&quot;:&quot;auto&quot;}]"
>
        <view
                :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"36rpx","fontSize":"28rpx","borderStyle":"solid"}'
                class="title hide1">{{item.newsName}}
        </view>
        <view
                :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"16rpx 0 0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(126, 126, 126, 1)","textAlign":"left","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"36rpx","fontSize":"24rpx","borderStyle":"solid"}'
                class="category hide2" v-html="item.newsContent">
        </view>
        <view
                :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"16rpx 0 0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(126, 126, 126, 1)","textAlign":"right","borderRadius":"0","borderWidth":"0","width":"25%","lineHeight":"36rpx","fontSize":"24rpx","borderStyle":"solid"}'
                class="time hide1">{{item.insertTime.split(" ")[0]}}
        </view>
    </view>
</view>	</view>
	
	</mescroll-uni>
</template>

<script src="./list2.options.js"></script>

<style src="./list2.styles.css"></style>
