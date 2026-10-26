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
                <el-form-item class="input" v-if="type!='info'"  label="试卷编号" prop="examredetailsUuidNumber">
                    <el-input v-model="ruleForm.examredetailsUuidNumber"
                              placeholder="试卷编号" clearable  :readonly="ro.examredetailsUuidNumber"></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="试卷编号" prop="examredetailsUuidNumber">
                        <el-input v-model="ruleForm.examredetailsUuidNumber"
                                  placeholder="试卷编号" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="select" v-if="type!='info'"  label="试题表" prop="examquestionId">
                    <el-select v-model="ruleForm.examquestionId" placeholder="请选择试题表" @change="examquestionChange">
                        <el-option
                                v-for="(item,index) in examquestionOptions"
                                v-bind:key="item.id"
                                :label="item.examquestionName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="试题名称" prop="examquestionName">
                    <el-input v-model="examquestionForm.examquestionName"
                              placeholder="试题名称" clearable  :readonly="ro.examquestionName" readonly></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="试题名称" prop="examquestionName">
                        <el-input
                                type="textarea"
                                min="1"
                                v-model="ruleForm.examquestionName"
                                placeholder="试题名称"
                                clearable
                                readonly
                        ></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="24">
                <el-form-item  v-if="type=='info'&&(ruleForm.examquestionTypes==1||ruleForm.examquestionTypes==2||ruleForm.examquestionTypes==3)" label="选项" prop="examquestionOptions">
                    <div class="options" v-for="(item,index) in options" v-bind:key="index">
                        {{item.code}}. {{item.text}}
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="正确答案" prop="examquestionAnswer">
                    <el-input v-model="examquestionForm.examquestionAnswer"
                              placeholder="正确答案" clearable  :readonly="ro.examquestionAnswer" readonly></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="正确答案" prop="examquestionAnswer">
                        <el-input v-model="ruleForm.examquestionAnswer"
                                  placeholder="正确答案" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="答案解析" prop="examquestionAnalysis">
                    <el-input v-model="examquestionForm.examquestionAnalysis"
                              placeholder="答案解析" clearable  :readonly="ro.examquestionAnalysis" readonly></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="答案解析" prop="examquestionAnalysis">
                        <el-input
                                type="textarea"
                                min="1"
                                v-model="ruleForm.examquestionAnalysis"
                                placeholder="答案解析"
                                clearable
                                readonly
                        ></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="试题排序" prop="examquestionSequence">
                    <el-input v-model="examquestionForm.examquestionSequence"
                              placeholder="试题排序，值越大排越前面" clearable  :readonly="ro.examquestionSequence" readonly></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="试题排序" prop="examquestionSequence">
                        <el-input v-model="ruleForm.examquestionSequence"
                                  placeholder="试题排序，" readonly></el-input>
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
            <input id="updateId" name="id" type="hidden">

            <input id="yonghuId" name="yonghuId" type="hidden">
            <input id="examquestionId" name="examquestionId" type="hidden">
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="考生答案" prop="examredetailsMyanswer">
                    <el-input v-model="ruleForm.examredetailsMyanswer"
                              placeholder="考生答案" clearable  :readonly="ro.examredetailsMyanswer"></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="考生答案" prop="examredetailsMyanswer">
                        <el-input v-model="ruleForm.examredetailsMyanswer"
                                  placeholder="考生答案" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item class="input" v-if="type!='info'"  label="试题得分" prop="examredetailsMyscore">
                    <el-input v-model="ruleForm.examredetailsMyscore"
                              placeholder="试题得分" clearable  :readonly="ro.examredetailsMyscore"></el-input>
                </el-form-item>
                <div v-else>
                    <el-form-item class="input" label="试题得分" prop="examredetailsMyscore">
                        <el-input v-model="ruleForm.examredetailsMyscore"
                                  placeholder="试题得分" readonly></el-input>
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
<script src="./add-or-update.options.js"></script><style lang="scss" src="./add-or-update.styles.scss"></style>

