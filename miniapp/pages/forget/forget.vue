<template>
<view class="content">
    <view class="box"
          :style='{"padding":"48rpx 48rpx 140rpx","boxShadow":"0px 6rpx 12rpx rgba(0, 0, 0, 0.16)","margin":"0 5%","backgroundColor":"rgba(255, 255, 255, 0)","borderColor":"#ccc","borderRadius":"0 0 240rpx 240rpx","borderWidth":"2rpx","width":"90%","borderStyle":"solid","height":"auto"}'>
        <view class="forget-input forget-margin-b">
            <input v-model="username"
                   :style='{"padding":"0 24rpx","boxShadow":"0 10rpx 0px rgba(0,0,0,0)","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"40rpx","borderWidth":"2rpx 2rpx 10rpx 2rpx","fontSize":"26rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                   type="text" placeholder="请输入您的账号" />
        </view>
        <view class="login-input login-margin-b">
            <picker :style="viewStyles.style1"
                    @change="optionsChange" :value="index" :range="options">
                <view class="uni-input"
                      :style='{"padding":"0 24rpx","boxShadow":"0 10rpx 0px rgba(0,0,0,0)","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"40rpx","borderWidth":"2rpx 2rpx 10rpx 2rpx","fontSize":"26rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'>
                    {{options[index]}}
                </view>
            </picker>
        </view>
        <button class="landing"
                :style='{"padding":"0","boxShadow":"0 2rpx 12rpx var(--publicSubColor)","margin":"0","borderColor":"var(--publicSubColor)","backgroundColor":"var(--publicMainColor)","borderRadius":"40rpx","color":"rgba(255, 255, 255, 1)","borderWidth":"2rpx","width":"100%","fontSize":"32rpx","borderStyle":"solid","height":"88rpx"}'
                @tap="onResetPass" type="primary">重置密码</button>
    </view>
</view>
</template>

<script src="./forget.options.js"></script>
<style src="./forget.styles.css"></style>
