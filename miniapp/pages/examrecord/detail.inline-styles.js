// 保持原有内联样式的优先级；动态样式仍在模板中参与合并。
export default {
    "style1": {
        "height": "100rpx",
        "text-align": "center",
        "line-height": "90rpx",
        "font-size": "40rpx"
    },
    "style2": {
        "display": "flex",
        "justify-content": "space-between"
    },
    "style3": {
        "color": "green"
    },
    "style4": {
        "margin-top": "15rpx",
        "margin-bottom": "15rpx",
        "color": "red"
    }
};
