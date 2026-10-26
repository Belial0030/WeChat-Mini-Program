import pageActions from './Editor.actions.js';

// 工具栏配置
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
    ['blockquote', 'code-block'], // 引用  代码块
    [{ header: 1 }, { header: 2 }], // 1、2 级标题
    [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
    [{ script: 'sub' }, { script: 'super' }], // 上标/下标
    [{ indent: '-1' }, { indent: '+1' }], // 缩进
    // [{'direction': 'rtl'}],                         // 文本方向
    [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
    [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
    [{ font: [] }], // 字体种类
    [{ align: [] }], // 对齐方式
    ['clean'], // 清除文本格式
    ['image'], // 图片
];

import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    props: {
        /*编辑器的内容*/
        value: {
            type: String,
        },
        action: {
            type: String,
        },
        /*图片大小*/
        maxSize: {
            type: Number,
            default: 4000, //kb
        },
    },

    components: {
        quillEditor,
    },

    data() {
        return {
            content: '',
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            editorOption: {
                placeholder: '',
                theme: 'snow', // or 'bubble'
                modules: {
                    toolbar: {
                        container: toolbarOptions,
                        // container: "#toolbar",
                        handlers: {
                            image: function (value) {
                                if (value) {
                                    // 触发input框选择图片文件
                                    document.querySelector('.avatar-uploader input').click();
                                } else {
                                    this.quill.format('image', false);
                                }
                            },
                            // link: function(value) {
                            //   if (value) {
                            //     var href = prompt('请输入url');
                            //     this.quill.format("link", href);
                            //   } else {
                            //     this.quill.format("link", false);
                            //   }
                            // },
                        },
                    },
                },
            },
            // serverUrl: `${base.url}sys/storage/uploadSwiper?token=${storage.get('token')}`, // 这里写你要上传的图片服务器地址
            header: {
                // token: sessionStorage.token
                Token: this.$storage.get('Token'),
            }, // 有的图片服务器要求请求头需要有token
        };
    },
    computed: {
        // 计算属性的 getter
        getActionUrl: function () {
            // return this.$base.url + this.action + "?token=" + this.$storage.get("token");
            this.setContent(this.value);
            return `/${this.$base.name}/` + this.action;
        },
    },
    methods: {
        setContent: pageActions.setContent,
        onEditorBlur: pageActions.onEditorBlur,
        onEditorFocus: pageActions.onEditorFocus,
        onEditorChange: pageActions.onEditorChange,
        beforeUpload: pageActions.beforeUpload,
        uploadSuccess: pageActions.uploadSuccess,
        uploadError: pageActions.uploadError,
    },
};
