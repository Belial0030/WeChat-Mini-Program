export default {
    setContent(value) {
        this.content = value;
    },

    onEditorBlur() {
        //失去焦点事件
    },

    onEditorFocus() {
        //获得焦点事件
    },

    onEditorChange() {
        // console.log(this.content);
        // 内容改变事件
        this.$emit('input', this.content);
    },

    beforeUpload() {
        // 显示loading动画
        this.quillUpdateImg = true;
    },

    uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill;
        // 如果上传成功
        if (res.code === 0) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片  res.url为服务器返回的图片地址
            quill.insertEmbed(length, 'image', this.$base.url + 'upload/' + res.file);
            // 调整光标到最后
            quill.setSelection(length + 1);
        } else {
            this.$message.error('图片插入失败');
        }
        // loading动画消失
        this.quillUpdateImg = false;
    },

    uploadError() {
        // loading动画消失
        this.quillUpdateImg = false;
        this.$message.error('图片插入失败');
    },
};
