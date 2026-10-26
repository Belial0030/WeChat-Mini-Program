// 保持原有内联样式的优先级；动态样式仍在模板中参与合并。
export default {
    "style1": {
        "margin": "0 30rpx",
        "box-shadow": "0 0px 0px 1rpx #a6a6a6"
    },
    "style2": {
        "font-weight": "bold",
        "font-size": "20upx",
        "margin": "0 30rpx 5rpx"
    },
    "style3": {
        "box-shadow": "0 0  0 1rpx #a6a6a6",
        "margin": "0 30rpx"
    }
};
