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
               <el-form-item class="input" v-if="type!='info'"  label="公告信息标题" prop="newsName">
                   <el-input v-model="ruleForm.newsName"
                             placeholder="公告信息标题" clearable  :readonly="ro.newsName"></el-input>
               </el-form-item>
               <div v-else-if="type=='info'">
                   <el-form-item class="input" label="公告信息标题" prop="newsName">
                       <el-input v-model="ruleForm.newsName"
                                 placeholder="公告信息标题" readonly></el-input>
                   </el-form-item>
               </div>
           </el-col>
            <el-col :span="12">
                <el-form-item class="select" v-if="type!='info'"  label="公告类型" prop="newsTypes">
                    <el-select v-model="ruleForm.newsTypes" :disabled="ro.newsTypes" placeholder="请选择公告类型">
                        <el-option
                            v-for="(item,index) in newsTypesOptions"
                            v-bind:key="item.codeIndex"
                            :label="item.indexName"
                            :value="item.codeIndex">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="公告类型" prop="newsValue">
                    <el-input v-model="ruleForm.newsValue"
                        placeholder="公告类型" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="upload" v-if="type!='info' && !ro.newsPhoto" label="公告信息图片" prop="newsPhoto">
                    <file-upload
                        tip="点击上传公告信息图片"
                        action="file/upload"
                        :limit="3"
                        :multiple="true"
                        :fileUrls="ruleForm.newsPhoto?$base.url+ruleForm.newsPhoto:''"
                        @change="newsPhotoUploadChange"
                    ></file-upload>
                </el-form-item>
                <div v-else>
                    <el-form-item v-if="ruleForm.newsPhoto" label="公告信息图片" prop="newsPhoto">
                        <img :style="viewStyles.style1" v-bind:key="index" v-for="(item,index) in (ruleForm.newsPhoto || '').split(',')" :src="$base.url+item" width="100" height="100">
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="24">
                <el-form-item v-if="type!='info'"  label="公告信息详情" prop="newsContent">
                    <editor :style="viewStyles.style2"
                            v-model="ruleForm.newsContent"
                            class="editor"
                            action="file/upload">
                    </editor>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item v-if="ruleForm.newsContent" label="公告信息详情" prop="newsContent">
                        <span v-html="ruleForm.newsContent"></span>
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

