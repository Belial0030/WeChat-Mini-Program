// 保持原有内联样式的优先级；动态样式仍在模板中参与合并。
export default {
    "style1": {
        "display": "flex"
    },
    "style2": {
        "display": "flex",
        "flex-direction": "column"
    },
    "style3": {
        "display": "flex",
        "flex-wrap": "wrap"
    }
};
