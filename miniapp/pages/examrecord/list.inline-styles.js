// 保持原有内联样式的优先级；动态样式仍在模板中参与合并。
export default {
    "style1": {
        "width": "690rpx",
        "height": "auto",
        "border-radius": "15rpx",
        "margin": "0 auto",
        "margin-top": "15rpx",
        "box-shadow": "0rpx 0rpx 10rpx 0rpx #8799A3"
    },
    "style2": {
        "left": "20rpx"
    },
    "style3": {
        "overflow": "hidden",
        "display": "-webkit-box",
        "-webkit-line-clamp": "1",
        "line-clamp": "2",
        "-webkit-box-orient": "vertical"
    },
    "style4": {
        "width": "auto"
    }
};
