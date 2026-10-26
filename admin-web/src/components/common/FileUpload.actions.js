import storage from '@/utils/storage';

export default {
    init() {
        //   console.log(this.fileUrls);
        if (this.fileUrls) {
            this.fileUrlList = this.fileUrls.split(',');
            let fileArray = [];
            this.fileUrlList.forEach(function (item, index) {
                var url = item;
                var name = index;
                var file = {
                    name: name,
                    url: url,
                };
                fileArray.push(file);
            });
            this.setFileList(fileArray);
        }
    },

    handleBeforeUpload(file) {},

    handleUploadSuccess(res, file, fileList) {
        if (res && res.code === 0) {
            fileList[fileList.length - 1]['url'] = '/upload/' + file.response.file;
            this.setFileList(fileList);
            this.$emit('change', this.fileUrlList.join(','));
        } else {
            this.$message.error(res.msg);
        }
    },

    handleUploadErr(err, file, fileList) {
        this.$message.error('文件上传失败');
    },

    handleRemove(file, fileList) {
        this.setFileList(fileList);
        this.$emit('change', this.fileUrlList.join(','));
    },

    handleUploadPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },

    handleExceed(files, fileList) {
        this.$message.warning(`最多上传${this.limit}张图片`);
    },

    setFileList(fileList) {
        var fileArray = [];
        var fileUrlArray = [];
        // 有些图片不是公开的，所以需要携带token信息做权限校验
        var token = storage.get('token');
        fileList.forEach(function (item, index) {
            var url = item.url.split('?')[0];
            var name = item.name;
            var file = {
                name: name,
                url: url + '?token=' + token,
            };
            fileArray.push(file);
            fileUrlArray.push(url);
        });
        this.fileList = fileArray;
        this.fileUrlList = fileUrlArray;
    },
};
