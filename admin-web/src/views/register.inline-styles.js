// 保持原有内联样式的优先级；动态样式仍在模板中参与合并。
export default {
    "style1": {
        "color": "#000",
        "fontSize": "28px"
    },
    "style2": {
        "display": "flex",
        "flex-wrap": "wrap",
        "width": "100%",
        "justify-content": "center"
    }
};
