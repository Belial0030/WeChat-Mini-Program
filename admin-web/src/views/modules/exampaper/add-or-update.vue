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
                <el-form-item class="input" v-if="type!='info'" label="试卷名称" prop="exampaperName">
                    <el-input v-model="ruleForm.exampaperName"
                              placeholder="试卷名称" clearable :readonly="ro.exampaperName"></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="试卷名称" prop="exampaperName">
                        <el-input v-model="ruleForm.exampaperName"
                                  placeholder="试卷名称" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'" label="考试时长(分钟)" prop="exampaperDate">
                    <el-input v-model="ruleForm.exampaperDate"
                              placeholder="考试时长(分钟)" clearable :readonly="ro.exampaperDate"></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="考试时长(分钟)" prop="exampaperDate">
                        <el-input v-model="ruleForm.exampaperDate"
                                  placeholder="考试时长(分钟)" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'" label="试卷总分数" prop="exampaperMyscore">
                    <el-input v-model="ruleForm.exampaperMyscore"
                              placeholder="试卷总分数" clearable :readonly="ro.exampaperMyscore"></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="试卷总分数" prop="exampaperMyscore">
                        <el-input v-model="ruleForm.exampaperMyscore"
                                  placeholder="试卷总分数" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="select" v-if="type!='info'" label="科目" prop="kemuTypes">
                    <el-select v-model="ruleForm.kemuTypes" :disabled="ro.kemuTypes" placeholder="请选择科目">
                        <el-option
                                v-for="(item,index) in kemuTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="科目" prop="kemuValue">
                        <el-input v-model="ruleForm.kemuValue"
                                  placeholder="科目" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="select" v-if="type!='info'" label="组卷方式" prop="zujuanTypes">
                    <el-select v-model="ruleForm.zujuanTypes" :disabled="ro.zujuanTypes" placeholder="请选择组卷方式">
                        <el-option
                                v-for="(item,index) in zujuanTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="组卷方式" prop="zujuanValue">
                        <el-input v-model="ruleForm.zujuanValue"
                                  placeholder="组卷方式" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="select" v-if="type!='info'" label="试卷状态" prop="exampaperTypes">
                    <el-select v-model="ruleForm.exampaperTypes" :disabled="ro.exampaperTypes"
                               placeholder="请选择试卷状态">
                        <el-option
                                v-for="(item,index) in exampaperTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="试卷状态" prop="exampaperValue">
                        <el-input v-model="ruleForm.exampaperValue"
                                  placeholder="试卷状态" readonly></el-input>
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

