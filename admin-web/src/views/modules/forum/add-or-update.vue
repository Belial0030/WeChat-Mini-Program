<template>
<div class="addEdit-block">
    <el-form
            class="detail-form-content"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="auto"
            :style="{backgroundColor:addEditForm.addEditBoxColor}">
        <el-row>
            <input id="updateId" name="id" type="hidden">
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="帖子标题" prop="forumName">
                    <el-input v-model="ruleForm.forumName"
                              placeholder="帖子标题" clearable  :readonly="ro.forumName"></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="帖子标题" prop="forumName">
                        <el-input v-model="ruleForm.forumName"
                                  placeholder="帖子标题" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="24">
                <el-form-item v-if="type!='info'"  label="发布内容" prop="forumContent">
                    <el-input type="textarea" v-model="ruleForm.forumContent"
                              placeholder="发布内容" clearable  :readonly="ro.forumName"></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item v-if="ruleForm.forumContent" label="发布内容" prop="forumContent">
                        <span v-html="ruleForm.forumContent"></span>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
        <el-form-item class="btn">
            <el-button v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
            <el-button v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
            <el-button v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script src="./add-or-update.options.js"></script>
<style lang="scss" src="./add-or-update.styles.scss"></style>

