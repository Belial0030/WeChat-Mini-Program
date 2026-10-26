<!--注册页面-->
<template>
<view class="content">
    <view class="box"
          :style='{"padding":"48rpx 60rpx 150rpx","boxShadow":"0px 6rpx 12rpx rgba(0, 0, 0, 0.16)","margin":"0 5%","borderColor":"#ccc","backgroundColor":"rgba(255, 255, 255, 0)","borderRadius":"0 0 300rpx 300rpx","borderWidth":"0","width":"90%","borderStyle":"solid","height":"auto"}'>
        <view class="logo">
            <!-- 				:style='{"padding":"0","boxShadow":"0 2rpx 12rpx rgba(0,0,0,0)","margin":"0 0 24rpx","borderColor":"#ccc","backgroundColor":"rgba(255, 255, 255, 0)","borderRadius":"0","borderWidth":"0","width":"100%","borderStyle":"solid","height":"auto"}'>
             -->				<image
                :style='{"padding":"0","boxShadow":"0 0 0px var(--publicMainColor)","margin":"0 auto","borderColor":"#ccc","borderRadius":"40rpx","borderWidth":"2rpx","width":"160rpx","borderStyle":"solid","isShow":true,"height":"160rpx"}'
                src='/static/security/mark.png' mode="aspectFill">
        </image>
        </view>
        <view v-if="tableName=='yonghu'" class="uni-form-item uni-column">
            <input
                    :style='{"padding":"0 24rpx","boxShadow":"0 10rpx 0px rgba(0,0,0,0)","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"40rpx","borderWidth":"2rpx 2rpx 10rpx 2rpx","fontSize":"26rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                    v-model="ruleForm.username" type="text" class="uni-input" name="" placeholder="账号" />
        </view>
        <view v-if="tableName=='yonghu'" class="uni-form-item uni-column">
            <input
                    :style='{"padding":"0 24rpx","boxShadow":"0 10rpx 0px rgba(0,0,0,0)","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"40rpx","borderWidth":"2rpx 2rpx 10rpx 2rpx","fontSize":"26rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                    v-model="ruleForm.yonghuName" type="text" class="uni-input" name="" placeholder="姓名" />
        </view>
        <view v-if="tableName=='yonghu'" class="uni-form-item uni-column">
            <input
                    :style='{"padding":"0 24rpx","boxShadow":"0 10rpx 0px rgba(0,0,0,0)","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"40rpx","borderWidth":"2rpx 2rpx 10rpx 2rpx","fontSize":"26rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                    v-model="ruleForm.password" type="password" class="uni-input" name="" placeholder="密码" />
        </view>
        <view v-if="tableName=='yonghu'" class="uni-form-item uni-column">
            <input
                    :style='{"padding":"0 24rpx","boxShadow":"0 10rpx 0px rgba(0,0,0,0)","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"40rpx","borderWidth":"2rpx 2rpx 10rpx 2rpx","fontSize":"26rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                    v-model="ruleForm.yonghuPhone" type="text" class="uni-input" name="" placeholder="手机" />
        </view>
        <view v-if="tableName=='yonghu'" class="uni-form-item uni-column">
            <input
                    :style='{"padding":"0 24rpx","boxShadow":"0 10rpx 0px rgba(0,0,0,0)","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"40rpx","borderWidth":"2rpx 2rpx 10rpx 2rpx","fontSize":"26rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                    v-model="ruleForm.yonghuIdNumber" type="text" class="uni-input" name="" placeholder="身份证" />
        </view>
        <view v-if="tableName=='yonghu'" class="uni-form-item uni-column">
            <picker @change="yonghusexTypesChange" :value="yonghusexTypesIndex" :range="yonghusexTypesOptions"
                    range-key="indexName">
                <view
                        :style='{"padding":"0 24rpx","boxShadow":"0 10rpx 0px rgba(0,0,0,0)","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"40rpx","borderWidth":"2rpx 2rpx 10rpx 2rpx","fontSize":"26rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                        class="uni-input">{{ruleForm.sexValue?ruleForm.sexValue:"请选择性别"}}</view>
            </picker>
        </view>
        <view>
            <button @tap="register" type="primary"
                    :style='{"padding":"0","boxShadow":"0 2rpx 12rpx var(--publicSubColor)","margin":"0","borderColor":"var(--publicSubColor)","backgroundColor":"var(--publicMainColor)","borderRadius":"40rpx","color":"rgba(255, 255, 255, 1)","borderWidth":"2rpx","width":"100%","fontSize":"32rpx","borderStyle":"solid","height":"88rpx"}'>注册</button>
        </view>
    </view>
</view>
</template>

<script src="./register.options.js"></script>
<style lang="scss" scoped src="./register.styles.scss"></style>
