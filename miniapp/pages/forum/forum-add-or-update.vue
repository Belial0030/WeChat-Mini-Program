<template>
<view class="container my-publish-pv">
        <form>
            <view class="cu-form-group margin-top">
                <input
                        :style='{"boxShadow":"0 0 0px rgba(0,0,0,.6) inset","backgroundColor":"rgba(255, 255, 255, 0)","borderColor":"var(--publicMainColor)","borderRadius":"0px","color":"rgba(14, 183, 34, 1)","textAlign":"left","borderWidth":"0 0 6rpx","fontSize":"24rpx","borderStyle":"solid","height":"88rpx"}'
                        v-model="forum.forumName" placeholder="标题"></input>
            </view>

            <view class="cu-form-group margin-top">
				<textarea
:style="[viewStyles.style1, {&quot;boxShadow&quot;:&quot;0 0 0px rgba(0,0,0,.6) inset&quot;,&quot;backgroundColor&quot;:&quot;rgba(255, 255, 255, 0)&quot;,&quot;borderColor&quot;:&quot;rgba(227, 227, 227, 1)&quot;,&quot;borderRadius&quot;:&quot;8rpx&quot;,&quot;color&quot;:&quot;#333&quot;,&quot;borderWidth&quot;:&quot;6rpx&quot;,&quot;fontSize&quot;:&quot;28rpx&quot;,&quot;borderStyle&quot;:&quot;solid&quot;,&quot;height&quot;:&quot;300rpx&quot;}]"
 v-model="forum.forumContent" placeholder="内容"></textarea>
            </view>
            <view class="cu-form-group margin-top" :style="viewStyles.style2">
                <button
                        :style='{"boxShadow":"0 0 0px rgba(0,0,0,0) inset","backgroundColor":"var(--publicMainColor)","borderColor":"rgba(255, 255, 255, 1)","borderRadius":"8rpx","color":"#fff","borderWidth":"1","width":"100%","fontSize":"28rpx","borderStyle":"solid","height":"80rpx"}'
                        @tap="onSubmitTap" class="bg-red margin-tb-sm">确认提交</button>
            </view>
        </form>
    </view>
</template>

<script src="./forum-add-or-update.options.js"></script>

<style src="./forum-add-or-update.styles.css"></style>
