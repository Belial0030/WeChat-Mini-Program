// 数字，邮件，手机，url，身份证校验
import { isEmail, isMobile } from '@/utils/validate';

export default {

    yonghuPhotoUploadChange(fileUrls) {
        this.ruleForm.yonghuPhoto = fileUrls;
    },

    onUpdateHandler() {
        if (!this.ruleForm.yonghuName && 'yonghu' == this.flag) {
            this.$message.error('用户姓名不能为空');
            return;
        }

        if (
            'yonghu' == this.flag &&
            this.ruleForm.yonghuPhone &&
            !isMobile(this.ruleForm.yonghuPhone)
        ) {
            this.$message.error(`手机应输入手机格式`);
            return;
        }
        if (!this.ruleForm.yonghuIdNumber && 'yonghu' == this.flag) {
            this.$message.error('用户身份证号不能为空');
            return;
        }

        if (!this.ruleForm.yonghuPhoto && 'yonghu' == this.flag) {
            this.$message.error('用户头像不能为空');
            return;
        }

        if (!this.ruleForm.xuexiNumber && 'yonghu' == this.flag) {
            this.$message.error('学习时长不能为空');
            return;
        }

        if (
            'yonghu' == this.flag &&
            this.ruleForm.yonghuEmail &&
            !isEmail(this.ruleForm.yonghuEmail)
        ) {
            this.$message.error(`邮箱应输入邮箱格式`);
            return;
        }
        if (!this.ruleForm.sexTypes && this.flag != 'users') {
            this.$message.error('性别不能为空');
            return;
        }
        if ('users' == this.flag && this.ruleForm.username.trim().length < 1) {
            this.$message.error(`用户名不能为空`);
            return;
        }
        this.$http({
            url: `${this.$storage.get('sessionTable')}/update`,
            method: 'post',
            data: this.ruleForm,
        }).then(({ data }) => {
            if (data && data.code === 0) {
                this.$message({
                    message: '修改信息成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {},
                });
            } else {
                this.$message.error(data.msg);
            }
        });
    },
};
