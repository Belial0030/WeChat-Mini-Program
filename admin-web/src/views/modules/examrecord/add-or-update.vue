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
                <el-form-item class="select" v-if="type!='info'"  label="试卷表" prop="exampaperId">
                    <el-select v-model="ruleForm.exampaperId" placeholder="请选择试卷表" @change="exampaperChange">
                        <el-option
                                v-for="(item,index) in exampaperOptions"
                                v-bind:key="item.id"
                                :label="item.exampaperName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="试卷名称" prop="exampaperName">
                    <el-input v-model="exampaperForm.exampaperName"
                              placeholder="试卷名称" clearable  :readonly="ro.exampaperName" readonly></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="试卷名称" prop="exampaperName">
                        <el-input v-model="ruleForm.exampaperName"
                                  placeholder="试卷名称" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="考试时长(分钟)" prop="exampaperDate">
                    <el-input v-model="exampaperForm.exampaperDate"
                              placeholder="考试时长(分钟)" clearable  :readonly="ro.exampaperDate" readonly></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="考试时长(分钟)" prop="exampaperDate">
                        <el-input v-model="ruleForm.exampaperDate"
                                  placeholder="考试时长(分钟)" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="试卷总分数" prop="exampaperMyscore">
                    <el-input v-model="exampaperForm.exampaperMyscore"
                              placeholder="试卷总分数" clearable  :readonly="ro.exampaperMyscore" readonly></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="试卷总分数" prop="exampaperMyscore">
                        <el-input v-model="ruleForm.exampaperMyscore"
                                  placeholder="试卷总分数" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>

            <el-col :span="12">
                <el-form-item class="select" v-if="type!='info'"  label="用户" prop="yonghuId">
                    <el-select v-model="ruleForm.yonghuId" placeholder="请选择用户" @change="yonghuChange">
                        <el-option
                                v-for="(item,index) in yonghuOptions"
                                v-bind:key="item.id"
                                :label="item.yonghuName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="用户姓名" prop="yonghuName">
                    <el-input v-model="yonghuForm.yonghuName"
                              placeholder="用户姓名" clearable  :readonly="ro.yonghuName" readonly></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="用户姓名" prop="yonghuName">
                        <el-input v-model="ruleForm.yonghuName"
                                  placeholder="用户姓名" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="身份证号" prop="yonghuIdNumber">
                    <el-input v-model="yonghuForm.yonghuIdNumber"
                              placeholder="身份证号" clearable  :readonly="ro.yonghuIdNumber" readonly></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="身份证号" prop="yonghuIdNumber">
                        <el-input v-model="ruleForm.yonghuIdNumber"
                                  placeholder="身份证号" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="手机号" prop="yonghuPhone">
                    <el-input v-model="yonghuForm.yonghuPhone"
                              placeholder="手机号" clearable  :readonly="ro.yonghuPhone" readonly></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="手机号" prop="yonghuPhone">
                        <el-input v-model="ruleForm.yonghuPhone"
                                  placeholder="手机号" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="邮箱" prop="yonghuEmail">
                    <el-input v-model="yonghuForm.yonghuEmail"
                              placeholder="邮箱" clearable  :readonly="ro.yonghuEmail" readonly></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="邮箱" prop="yonghuEmail">
                        <el-input v-model="ruleForm.yonghuEmail"
                                  placeholder="邮箱" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="24">
                <el-form-item class="upload" v-if="type!='info' && !ro.yonghuPhoto" label="照片" prop="yonghuPhoto">
                    <img :style="viewStyles.style1" v-bind:key="index" v-for="(item,index) in (yonghuForm.yonghuPhoto || '').split(',')" :src="item" width="100" height="100">
                </el-form-item>
                <div v-else>
                    <el-form-item v-if="ruleForm.yonghuPhoto" label="照片" prop="yonghuPhoto">
                        <img :style="viewStyles.style2" v-bind:key="index" v-for="(item,index) in (ruleForm.yonghuPhoto || '').split(',')" :src="item" width="100" height="100">
                    </el-form-item>
                </div>
            </el-col>
            <input id="updateId" name="id" type="hidden">
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="考试编号" prop="examrecordUuidNumber">
                    <el-input v-model="ruleForm.examrecordUuidNumber"
                              placeholder="考试编号" clearable  :readonly="ro.examrecordUuidNumber"></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="考试编号" prop="examrecordUuidNumber">
                        <el-input v-model="ruleForm.examrecordUuidNumber"
                                  placeholder="考试编号" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <input id="yonghuId" name="yonghuId" type="hidden">
            <input id="exampaperId" name="exampaperId" type="hidden">
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="所得总分" prop="totalScore">
                    <el-input v-model="ruleForm.totalScore"
                              placeholder="所得总分" clearable  :readonly="ro.totalScore"></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="所得总分" prop="totalScore">
                        <el-input v-model="ruleForm.totalScore"
                                  placeholder="所得总分" readonly></el-input>
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

