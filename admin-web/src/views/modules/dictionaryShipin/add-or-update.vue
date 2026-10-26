<template>
<div class="addEdit-block">
    <el-form
            class="detail-form-content"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="80px"
            :style="{backgroundColor:addEditForm.addEditBoxColor}"
    >
        <el-row>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="视频分类编码" prop="codeIndex">
                    <el-input v-model="ruleForm.codeIndex"
                              placeholder="视频分类编码" clearable  :readonly="ro.codeIndex"></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="视频分类编码" prop="codeIndex">
                        <el-input v-model="ruleForm.codeIndex"
                                  placeholder="视频分类编码" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="视频分类" prop="indexName">
                    <el-input v-model="ruleForm.indexName"
                              placeholder="视频分类" clearable  :readonly="ro.indexName"></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="视频分类" prop="indexName">
                        <el-input v-model="ruleForm.indexName"
                                  placeholder="视频分类" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <!--<el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="备注" prop="beizhu">
                    <el-input v-model="ruleForm.beizhu"
                              placeholder="备注" clearable  :readonly="ro.beizhu"></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="备注" prop="beizhu">
                        <el-input v-model="ruleForm.beizhu"
                                  placeholder="备注" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>-->
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
