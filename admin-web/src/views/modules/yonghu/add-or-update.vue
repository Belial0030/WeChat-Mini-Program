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
               <el-form-item class="input" v-if="type!='info'"  label="账户" prop="username">
                   <el-input v-model="ruleForm.username"
                             placeholder="账户" clearable  :readonly="ro.username"></el-input>
               </el-form-item>
               <div v-else-if="type=='info'">
                   <el-form-item class="input" label="账户" prop="username">
                       <el-input v-model="ruleForm.username"
                                 placeholder="账户" readonly></el-input>
                   </el-form-item>
               </div>
           </el-col>
           <el-col :span="12">
               <el-form-item class="input" v-if="type!='info'"  label="用户姓名" prop="yonghuName">
                   <el-input v-model="ruleForm.yonghuName"
                             placeholder="用户姓名" clearable  :readonly="ro.yonghuName"></el-input>
               </el-form-item>
               <div v-else-if="type=='info'">
                   <el-form-item class="input" label="用户姓名" prop="yonghuName">
                       <el-input v-model="ruleForm.yonghuName"
                                 placeholder="用户姓名" readonly></el-input>
                   </el-form-item>
               </div>
           </el-col>
           <el-col :span="12">
               <el-form-item class="input" v-if="type!='info'"  label="用户手机号" prop="yonghuPhone">
                   <el-input v-model="ruleForm.yonghuPhone"
                             placeholder="用户手机号" clearable  :readonly="ro.yonghuPhone"></el-input>
               </el-form-item>
               <div v-else-if="type=='info'">
                   <el-form-item class="input" label="用户手机号" prop="yonghuPhone">
                       <el-input v-model="ruleForm.yonghuPhone"
                                 placeholder="用户手机号" readonly></el-input>
                   </el-form-item>
               </div>
           </el-col>
           <el-col :span="12">
               <el-form-item class="input" v-if="type!='info'"  label="用户身份证号" prop="yonghuIdNumber">
                   <el-input v-model="ruleForm.yonghuIdNumber"
                             placeholder="用户身份证号" clearable  :readonly="ro.yonghuIdNumber"></el-input>
               </el-form-item>
               <div v-else-if="type=='info'">
                   <el-form-item class="input" label="用户身份证号" prop="yonghuIdNumber">
                       <el-input v-model="ruleForm.yonghuIdNumber"
                                 placeholder="用户身份证号" readonly></el-input>
                   </el-form-item>
               </div>
           </el-col>
            <el-col :span="12">
                <el-form-item class="upload" v-if="type!='info' && !ro.yonghuPhoto" label="用户头像" prop="yonghuPhoto">
                    <file-upload
                        tip="点击上传用户头像"
                        action="file/upload"
                        :limit="3"
                        :multiple="true"
                        :fileUrls="ruleForm.yonghuPhoto?$base.url+ruleForm.yonghuPhoto:''"
                        @change="yonghuPhotoUploadChange"
                    ></file-upload>
                </el-form-item>
                <div v-else>
                    <el-form-item v-if="ruleForm.yonghuPhoto" label="用户头像" prop="yonghuPhoto">
                        <img :style="viewStyles.style1" v-bind:key="index" v-for="(item,index) in (ruleForm.yonghuPhoto || '').split(',')" :src="$base.url+item" width="100" height="100">
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="select" v-if="type!='info'"  label="性别" prop="sexTypes">
                    <el-select v-model="ruleForm.sexTypes" :disabled="ro.sexTypes" placeholder="请选择性别">
                        <el-option
                            v-for="(item,index) in sexTypesOptions"
                            v-bind:key="item.codeIndex"
                            :label="item.indexName"
                            :value="item.codeIndex">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="性别" prop="sexValue">
                    <el-input v-model="ruleForm.sexValue"
                        placeholder="性别" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
           <el-col :span="12">
               <el-form-item class="input" v-if="type!='info'"  label="学习时长" prop="xuexiNumber">
                   <el-input v-model="ruleForm.xuexiNumber"
                             placeholder="学习时长" clearable  :readonly="ro.xuexiNumber"></el-input>
               </el-form-item>
               <div v-else-if="type=='info'">
                   <el-form-item class="input" label="学习时长" prop="xuexiNumber">
                       <el-input v-model="ruleForm.xuexiNumber"
                                 placeholder="学习时长" readonly></el-input>
                   </el-form-item>
               </div>
           </el-col>
           <el-col :span="12">
               <el-form-item class="input" v-if="type!='info'"  label="电子邮箱" prop="yonghuEmail">
                   <el-input v-model="ruleForm.yonghuEmail"
                             placeholder="电子邮箱" clearable  :readonly="ro.yonghuEmail"></el-input>
               </el-form-item>
               <div v-else-if="type=='info'">
                   <el-form-item class="input" label="电子邮箱" prop="yonghuEmail">
                       <el-input v-model="ruleForm.yonghuEmail"
                                 placeholder="电子邮箱" readonly></el-input>
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

