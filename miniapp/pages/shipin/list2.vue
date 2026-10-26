<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

	<view class="cu-bar bg-white search" :style="[{top:CustomBar + 'px'}]">
        <view class="search-form round">
				<input :style='{"padding":"0 24rpx","boxShadow":"0 10rpx 0px rgba(0,0,0,0)","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"40rpx","borderWidth":"2rpx 2rpx 10rpx 2rpx","fontSize":"26rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
						v-model="searchForm.shipinName" type="text" placeholder="视频标题"></input>
		</view>

        <view class="action">
			<button @tap="search"
				:style="{width:'auto',borderRadius:'40rpx',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}"
				class="cu-btn shadow-blur round">搜索</button>
            <button
                    :style="{'padding':'5rpx 24rpx 0','marginLeft':'10rpx',width:'auto',borderRadius:'40rpx',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}"
                    v-if="isAuth('shipin','新增')" @click="onAddTap()" class="uniui-add">新增</button>
		</view>
	</view>
	<view :style="viewStyles.style1">
            <scroll-view scroll-y="true" class="tabView" :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"rgba(0,0,0,1)","borderRadius":"0","borderWidth":"0","width":"150rpx","borderStyle":"solid","height":"auto"}'>
                <view :style="viewStyles.style2">
                    <view :style='categoryName===item.codeIndex?sactiveItem:sitem' class="tab" v-for="(item,index) in categoryList"
                          :key="index" :class="categoryName===item.codeIndex?'tabActive':''" @tap="categoryClick(item.codeIndex)">{{item.indexName}}</view>
                </view>
            </scroll-view>
<view class="list-box5"
:style="[viewStyles.style3, {&quot;padding&quot;:&quot;24rpx&quot;,&quot;boxShadow&quot;:&quot;0 0 12rpx rgba(255,0,0,0)&quot;,&quot;margin&quot;:&quot;0&quot;,&quot;borderColor&quot;:&quot;red&quot;,&quot;backgroundColor&quot;:&quot;rgba(228, 228, 228, 1)&quot;,&quot;borderRadius&quot;:&quot;0&quot;,&quot;borderWidth&quot;:&quot;0&quot;,&quot;width&quot;:&quot;100%&quot;,&quot;borderStyle&quot;:&quot;solid&quot;,&quot;height&quot;:&quot;auto&quot;}]"
>
    <block v-for="(product,index) in list" :key="index">
        <view @tap="onDetailTap(product)" v-if="index%6==0" class="list-item"
:style="[viewStyles.style4, {&quot;padding&quot;:&quot;0&quot;,&quot;boxShadow&quot;:&quot;0 0 12rpx rgba(255,0,0,0)&quot;,&quot;margin&quot;:&quot;0 0 12rpx&quot;,&quot;borderColor&quot;:&quot;rgba(206, 34, 27, 1)&quot;,&quot;backgroundColor&quot;:&quot;rgba(255, 255, 255, 1)&quot;,&quot;borderRadius&quot;:&quot;20rpx&quot;,&quot;borderWidth&quot;:&quot;0&quot;,&quot;width&quot;:&quot;100%&quot;,&quot;borderStyle&quot;:&quot;solid&quot;,&quot;height&quot;:&quot;auto&quot;}]"
>
            <image
                    :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"rgba(206, 34, 27, 1)","backgroundColor":"rgba(255,0,0,0)","borderRadius":"20rpx","borderWidth":"0","width":"280rpx","borderStyle":"solid","height":"180rpx"}'
                    mode="aspectFill" :src="product.shipinPhoto?$assetUrl(product.shipinPhoto.split(',')[0]):''">
            </image>
            <view class="list-item-body" :style="viewStyles.style5">
                <view
                        :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                        class="title hide1">{{product.shipinName}}
                </view>
                <view v-if="product.shipinNewMoney"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"red","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"34rpx","borderStyle":"solid"}'
                      class="title hide1">￥{{product.shipinNewMoney}}
                </view>
                <view v-else-if="product.shipinValue"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                      class="title hide1">{{product.shipinValue}}
                </view>
                <view :style="viewStyles.style6">
                    <text v-if="isAuth('shipin','修改')" class="cuIcon-edit"
                          @click.stop="onUpdateTap(product.id)">修改
                    </text>
                    <text v-if="isAuth('shipin','删除')" class="cuIcon-delete"
                          @click.stop="onDeleteTap(product.id)">删除
                    </text>
                </view>
            </view>

        </view>
        <view @tap="onDetailTap(product)" v-if="index%6==1" class="list-item"
:style="[viewStyles.style7, {&quot;padding&quot;:&quot;0&quot;,&quot;boxShadow&quot;:&quot;0 0 12rpx rgba(255,0,0,0)&quot;,&quot;margin&quot;:&quot;0 0 12rpx&quot;,&quot;borderColor&quot;:&quot;rgba(206, 34, 27, 1)&quot;,&quot;backgroundColor&quot;:&quot;rgba(255, 255, 255, 1)&quot;,&quot;borderRadius&quot;:&quot;20rpx&quot;,&quot;borderWidth&quot;:&quot;0&quot;,&quot;width&quot;:&quot;100%&quot;,&quot;borderStyle&quot;:&quot;solid&quot;,&quot;height&quot;:&quot;auto&quot;}]"
>
            <view class="list-item-body" :style="viewStyles.style8">
                <view
                        :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                        class="title hide1">{{product.shipinName}}
                </view>
                <view v-if="product.shipinNewMoney"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"red","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"34rpx","borderStyle":"solid"}'
                      class="title hide1">￥{{product.shipinNewMoney}}
                </view>
                <view v-else-if="product.shipinValue"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                      class="title hide1">{{product.shipinValue}}
                </view>
                <view :style="viewStyles.style9">
                    <text v-if="isAuth('shipin','修改')" class="cuIcon-edit"
                          @click.stop="onUpdateTap(product.id)">修改
                    </text>
                    <text v-if="isAuth('shipin','删除')" class="cuIcon-delete"
                          @click.stop="onDeleteTap(product.id)">删除
                    </text>
                </view>
            </view>
            <image
                    :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"rgba(206, 34, 27, 1)","backgroundColor":"rgba(255,0,0,0)","borderRadius":"20rpx","borderWidth":"0","width":"280rpx","borderStyle":"solid","height":"180rpx"}'
                    mode="aspectFill" :src="product.shipinPhoto?$assetUrl(product.shipinPhoto.split(',')[0]):''">
            </image>

        </view>
        <view @tap="onDetailTap(product)" v-if="index%6==2" class="list-item"
:style="[viewStyles.style10, {&quot;padding&quot;:&quot;0&quot;,&quot;boxShadow&quot;:&quot;0 0 12rpx rgba(255,0,0,0)&quot;,&quot;margin&quot;:&quot;0 0 12rpx&quot;,&quot;borderColor&quot;:&quot;rgba(206, 34, 27, 1)&quot;,&quot;backgroundColor&quot;:&quot;rgba(255, 255, 255, 1)&quot;,&quot;borderRadius&quot;:&quot;20rpx&quot;,&quot;borderWidth&quot;:&quot;0&quot;,&quot;width&quot;:&quot;100%&quot;,&quot;borderStyle&quot;:&quot;solid&quot;,&quot;height&quot;:&quot;auto&quot;}]"
>
            <image
                    :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"rgba(206, 34, 27, 1)","backgroundColor":"rgba(255,0,0,0)","borderRadius":"20rpx","borderWidth":"0","width":"280rpx","borderStyle":"solid","height":"180rpx"}'
                    mode="aspectFill" :src="product.shipinPhoto?$assetUrl(product.shipinPhoto.split(',')[0]):''">
            </image>
            <view class="list-item-body" :style="viewStyles.style11">
                <view
                        :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                        class="title hide1">{{product.shipinName}}
                </view>
                <view v-if="product.shipinNewMoney"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"red","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"34rpx","borderStyle":"solid"}'
                      class="title hide1">￥{{product.shipinNewMoney}}
                </view>
                <view v-else-if="product.shipinValue"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                      class="title hide1">{{product.shipinValue}}
                </view>
                <view :style="viewStyles.style12">
                    <text v-if="isAuth('shipin','修改')" class="cuIcon-edit"
                          @click.stop="onUpdateTap(product.id)">修改
                    </text>
                    <text v-if="isAuth('shipin','删除')" class="cuIcon-delete"
                          @click.stop="onDeleteTap(product.id)">删除
                    </text>
                </view>
            </view>

        </view>
        <view @tap="onDetailTap(product)" v-if="index%6==3" class="list-item"
:style="[viewStyles.style13, {&quot;padding&quot;:&quot;0&quot;,&quot;boxShadow&quot;:&quot;0 0 12rpx rgba(255,0,0,0)&quot;,&quot;margin&quot;:&quot;0 0 12rpx&quot;,&quot;borderColor&quot;:&quot;rgba(206, 34, 27, 1)&quot;,&quot;backgroundColor&quot;:&quot;rgba(255, 255, 255, 1)&quot;,&quot;borderRadius&quot;:&quot;20rpx&quot;,&quot;borderWidth&quot;:&quot;0&quot;,&quot;width&quot;:&quot;100%&quot;,&quot;borderStyle&quot;:&quot;solid&quot;,&quot;height&quot;:&quot;auto&quot;}]"
>
            <view class="list-item-body" :style="viewStyles.style14">
                <view
                        :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                        class="title hide1">{{product.shipinName}}
                </view>
                <view v-if="product.shipinNewMoney"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"red","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"34rpx","borderStyle":"solid"}'
                      class="title hide1">￥{{product.shipinNewMoney}}
                </view>
                <view v-else-if="product.shipinValue"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                      class="title hide1">{{product.shipinValue}}
                </view>
                <view :style="viewStyles.style15">
                    <text v-if="isAuth('shipin','修改')" class="cuIcon-edit"
                          @click.stop="onUpdateTap(product.id)">修改
                    </text>
                    <text v-if="isAuth('shipin','删除')" class="cuIcon-delete"
                          @click.stop="onDeleteTap(product.id)">删除
                    </text>
                </view>
            </view>
            <image
                    :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"rgba(206, 34, 27, 1)","backgroundColor":"rgba(255,0,0,0)","borderRadius":"20rpx","borderWidth":"0","width":"280rpx","borderStyle":"solid","height":"180rpx"}'
                    mode="aspectFill" :src="product.shipinPhoto?$assetUrl(product.shipinPhoto.split(',')[0]):''">
            </image>

        </view>
        <view @tap="onDetailTap(product)" v-if="index%6==4" class="list-item"
:style="[viewStyles.style16, {&quot;padding&quot;:&quot;0&quot;,&quot;boxShadow&quot;:&quot;0 0 12rpx rgba(255,0,0,0)&quot;,&quot;margin&quot;:&quot;0 0 12rpx&quot;,&quot;borderColor&quot;:&quot;rgba(206, 34, 27, 1)&quot;,&quot;backgroundColor&quot;:&quot;rgba(255, 255, 255, 1)&quot;,&quot;borderRadius&quot;:&quot;20rpx&quot;,&quot;borderWidth&quot;:&quot;0&quot;,&quot;width&quot;:&quot;100%&quot;,&quot;borderStyle&quot;:&quot;solid&quot;,&quot;height&quot;:&quot;auto&quot;}]"
>
            <image
                    :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"rgba(206, 34, 27, 1)","backgroundColor":"rgba(255,0,0,0)","borderRadius":"20rpx","borderWidth":"0","width":"280rpx","borderStyle":"solid","height":"180rpx"}'
                    mode="aspectFill" :src="product.shipinPhoto?$assetUrl(product.shipinPhoto.split(',')[0]):''">
            </image>
            <view class="list-item-body" :style="viewStyles.style17">
                <view
                        :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                        class="title hide1">{{product.shipinName}}
                </view>
                <view v-if="product.shipinNewMoney"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"red","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"34rpx","borderStyle":"solid"}'
                      class="title hide1">￥{{product.shipinNewMoney}}
                </view>
                <view v-else-if="product.shipinValue"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                      class="title hide1">{{product.shipinValue}}
                </view>
                <view :style="viewStyles.style18">
                    <text v-if="isAuth('shipin','修改')" class="cuIcon-edit"
                          @click.stop="onUpdateTap(product.id)">修改
                    </text>
                    <text v-if="isAuth('shipin','删除')" class="cuIcon-delete"
                          @click.stop="onDeleteTap(product.id)">删除
                    </text>
                </view>
            </view>

        </view>
        <view @tap="onDetailTap(product)" v-if="index%6==5" class="list-item"
:style="[viewStyles.style19, {&quot;padding&quot;:&quot;0&quot;,&quot;boxShadow&quot;:&quot;0 0 12rpx rgba(255,0,0,0)&quot;,&quot;margin&quot;:&quot;0&quot;,&quot;borderColor&quot;:&quot;rgba(206, 34, 27, 1)&quot;,&quot;backgroundColor&quot;:&quot;rgba(255, 255, 255, 1)&quot;,&quot;borderRadius&quot;:&quot;20rpx&quot;,&quot;borderWidth&quot;:&quot;0&quot;,&quot;width&quot;:&quot;100%&quot;,&quot;borderStyle&quot;:&quot;solid&quot;,&quot;height&quot;:&quot;auto&quot;}]"
>
            <view class="list-item-body" :style="viewStyles.style20">
                <view
                        :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                        class="title hide1">{{product.shipinName}}
                </view>
                <view v-if="product.shipinNewMoney"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"red","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"34rpx","borderStyle":"solid"}'
                      class="title hide1">￥{{product.shipinNewMoney}}
                </view>
                <view v-else-if="product.shipinValue"
                      :style='{"padding":"10rpx","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"red","backgroundColor":"rgba(255,0,0,0)","color":"rgba(0, 0, 0, 1)","textAlign":"center","borderRadius":"0","borderWidth":"0","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","borderStyle":"solid"}'
                      class="title hide1">{{product.shipinValue}}
                </view>
                <view :style="viewStyles.style21">
                    <text v-if="isAuth('shipin','修改')" class="cuIcon-edit"
                          @click.stop="onUpdateTap(product.id)">修改
                    </text>
                    <text v-if="isAuth('shipin','删除')" class="cuIcon-delete"
                          @click.stop="onDeleteTap(product.id)">删除
                    </text>
                </view>
            </view>
            <image
                    :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"0","borderColor":"rgba(206, 34, 27, 1)","backgroundColor":"rgba(255,0,0,0)","borderRadius":"20rpx","borderWidth":"0","width":"280rpx","borderStyle":"solid","height":"180rpx"}'
                    mode="aspectFill" :src="product.shipinPhoto?$assetUrl(product.shipinPhoto.split(',')[0]):''">
            </image>
        </view>
    </block>
</view>	</view>
	
	</mescroll-uni>
</template>

<script src="./list2.options.js"></script>

<style src="./list2.styles.css"></style>
