<template>
<view v-if="shouldShow">
    <view 
        v-if="showFloatBtn" 
        class="ai-float-btn" 
        @tap="openChat"
    >
        <text class="ai-icon">AI</text>
    </view>
    
    <view 
        v-if="showChat" 
        class="ai-chat-mask" 
        @tap="closeChat"
    >
        <view class="ai-chat-window" @tap.stop>
            <view class="ai-chat-header">
                <text class="ai-chat-title">网络安全学习助手</text>
                <text class="ai-chat-close" @tap="closeChat">×</text>
            </view>
            <scroll-view 
                class="ai-chat-content" 
                scroll-y 
                :scroll-top="scrollTop"
            >
                <view 
                    v-for="(msg, index) in messages" 
                    :key="index" 
                    :class="['ai-msg', msg.role === 'user' ? 'ai-msg-user' : 'ai-msg-ai']"
                >
                    <view class="ai-msg-text">{{ msg.content }}</view>
                </view>
                <view v-if="loading" class="ai-msg ai-msg-ai">
                    <view class="ai-msg-text">正在思考中...</view>
                </view>
            </scroll-view>
            <view class="ai-chat-input">
                <input 
                    v-model="inputMessage" 
                    class="ai-input" 
                    placeholder="例如：如何识别钓鱼短信？"
                    @confirm="sendMessage"
                />
                <button class="ai-send-btn" :disabled="loading || !inputMessage.trim()" @tap="sendMessage">发送</button>
            </view>
        </view>
    </view>
</view>
</template>

<script src="./ai-assistant.options.js"></script>

<style scoped src="./ai-assistant.styles.css"></style>
