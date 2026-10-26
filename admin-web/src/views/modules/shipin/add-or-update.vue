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
               <el-form-item class="input" v-if="type!='info'"  label="视频标题" prop="shipinName">
                   <el-input v-model="ruleForm.shipinName"
                             placeholder="视频标题" clearable  :readonly="ro.shipinName"></el-input>
               </el-form-item>
               <div v-else-if="type=='info'">
                   <el-form-item class="input" label="视频标题" prop="shipinName">
                       <el-input v-model="ruleForm.shipinName"
                                 placeholder="视频标题" readonly></el-input>
                   </el-form-item>
               </div>
           </el-col>
            <el-col :span="12">
                <el-form-item class="upload" v-if="type!='info' && !ro.shipinPhoto" label="视频照片" prop="shipinPhoto">
                    <file-upload
                        tip="点击上传视频照片"
                        action="file/upload"
                        :limit="3"
                        :multiple="true"
                        :fileUrls="ruleForm.shipinPhoto?$base.url+ruleForm.shipinPhoto:''"
                        @change="shipinPhotoUploadChange"
                    ></file-upload>
                </el-form-item>
                <div v-else>
                    <el-form-item v-if="ruleForm.shipinPhoto" label="视频照片" prop="shipinPhoto">
                        <img :style="viewStyles.style1" v-bind:key="index" v-for="(item,index) in (ruleForm.shipinPhoto || '').split(',')" :src="$base.url+item" width="100" height="100">
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="upload" v-if="type!='info' && !ro.shipinVideo" label="视频" prop="shipinVideo">
                    <file-upload
                        tip="点击上传视频"
                        action="file/upload"
                        :limit="3"
                        :multiple="true"
                        :fileUrls="ruleForm.shipinVideo?$base.url+ruleForm.shipinVideo:''"
                        @change="shipinVideoUploadChange"
                    ></file-upload>
                </el-form-item>
                <div v-else>
                    <el-form-item v-if="ruleForm.shipinVideo" label="视频" prop="shipinVideo">
                        <video :src="$base.url+ruleForm.shipinVideo" width="100" height="100" controls="controls">
                        </video>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="select" v-if="type!='info'"  label="视频类型" prop="shipinTypes">
                    <el-select v-model="ruleForm.shipinTypes" :disabled="ro.shipinTypes" placeholder="请选择视频类型">
                        <el-option
                            v-for="(item,index) in shipinTypesOptions"
                            v-bind:key="item.codeIndex"
                            :label="item.indexName"
                            :value="item.codeIndex">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="视频类型" prop="shipinValue">
                    <el-input v-model="ruleForm.shipinValue"
                        placeholder="视频类型" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="24">
                <el-form-item v-if="type!='info'"  label="视频详情" prop="shipinContent">
                    <editor :style="viewStyles.style2"
                            v-model="ruleForm.shipinContent"
                            class="editor"
                            action="file/upload">
                    </editor>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item v-if="ruleForm.shipinContent" label="视频详情" prop="shipinContent">
                        <span v-html="ruleForm.shipinContent"></span>
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
