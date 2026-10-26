<template>
<div>
    <div class="container">
        <div class="login-form">
            <h1 class="h1" :style="viewStyles.style1">网络安全知识培训系统注册</h1>
            <el-form class="rgs-form">
                <el-form-item label="账号" class="input">
                    <el-input v-model="ruleForm.username" autocomplete="off" placeholder="账号"  />
                </el-form-item>
                <el-form-item label="密码" class="input">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password/>
                </el-form-item>
                <el-form-item label="重复密码" class="input">
                    <el-input type="passwo   rd" v-model="ruleForm.repetitionPassword" autocomplete="off" show-password/>
                </el-form-item>
                    <el-form-item label="用户姓名" class="input" v-if="tableName=='yonghu'">
                        <el-input v-model="ruleForm.yonghuName" autocomplete="off" placeholder="用户姓名"  />
                    </el-form-item>
                    <el-form-item label="用户手机号" class="input" v-if="tableName=='yonghu'">
                        <el-input v-model="ruleForm.yonghuPhone" autocomplete="off" placeholder="用户手机号"  />
                    </el-form-item>
                    <el-form-item label="用户身份证号" class="input" v-if="tableName=='yonghu'">
                        <el-input v-model="ruleForm.yonghuIdNumber" autocomplete="off" placeholder="用户身份证号"  />
                    </el-form-item>
                    <el-form-item label="电子邮箱" class="input" v-if="tableName=='yonghu'">
                        <el-input v-model="ruleForm.yonghuEmail" autocomplete="off" placeholder="电子邮箱"  />
                    </el-form-item>
                <div :style="viewStyles.style2">
                    <el-button class="btn" type="primary" @click="login()">注册</el-button>
                    <el-button class="btn close" type="primary" @click="close()">取消</el-button>
                </div>
            </el-form>
        </div>
    </div>
</div>
</template>
<script src="./register.options.js"></script>
<style lang="scss" scoped src="./register.styles.scss"></style>


