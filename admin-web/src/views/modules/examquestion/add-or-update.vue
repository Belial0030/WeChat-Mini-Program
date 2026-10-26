<template>
<div class="addEdit-block">
        <el-form class="detail-form-content" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px"
                 :style="{backgroundColor:addEditForm.addEditBoxColor}">
            <el-row>

                <input id="updateId" name="id" type="hidden">
                <input id="exampaperId" name="exampaperId" type="hidden">
                <el-col :span="24">
                    <el-form-item class="input" :style="viewStyles.style1" v-if="type!='info'" label="试题名称"
                                  prop="examquestionName">
                        <el-input type="textarea" min="1" :readonly="ro.examquestionName"
                                  v-model="ruleForm.examquestionName" placeholder="试题名称" clearable></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" :style="viewStyles.style2" label="试题名称" prop="examquestionName">
                            <el-input type="textarea" min="1" v-model="ruleForm.examquestionName" placeholder="试题名称"
                                      clearable readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="select" v-if="type!='info'" label="科目" prop="kemuTypes">
                        <el-select v-model="ruleForm.kemuTypes" :disabled="ro.kemuTypes" placeholder="请选择科目">
                            <el-option v-for="(item,index) in kemuTypesOptions" v-bind:key="item.codeIndex"
                                       :label="item.indexName" :value="item.codeIndex">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-else-if="type=='info'">
                        <el-form-item class="input" label="科目" prop="kemuValue">
                            <el-input v-model="ruleForm.kemuValue" placeholder="科目" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="select" v-if="type!='info'" label="试题类型" prop="examquestionTypes">
                        <el-select @change="typeChange" v-model="ruleForm.examquestionTypes"
                                   :readonly="ro.examquestionTypes" placeholder="请选择试题类型">
                            <el-option v-for="(item,index) in examquestionTypesOptions" v-bind:key="item.codeIndex"
                                       :label="item.indexName" :value="item.codeIndex">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="试题类型" prop="examquestionValue">
                            <el-input v-model="ruleForm.examquestionValue" placeholder="试题类型" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="24" v-if="ruleForm.examquestionTypes==1||ruleForm.examquestionTypes==2">
                    <el-form-item v-if="type!='info'" label="选项" prop="examquestionOptions">
                        <div class="options" v-for="(item,index) in options" v-bind:key="index">
                            <span>{{item.code}}.</span>{{item.text}}
                            <el-button v-if="ruleForm.examquestionTypes==1||ruleForm.examquestionTypes==2" size="mini"
                                       @click="deleteOptions(index)" type="warning" round>删除</el-button>
                        </div>
                        <el-button size="small"
                                   v-if="(ruleForm.examquestionTypes==1||ruleForm.examquestionTypes==2)&&this.options.length<4"
                                   @click="addOptionsDialog" type="primary" round>添加选项</el-button>
                    </el-form-item>
                    <el-form-item v-else label="选项" prop="examquestionOptions">
                        <div class="options" v-for="(item,index) in options" v-bind:key="index">
                            <span>{{item.code}}.</span>{{item.text}}
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div v-if="type!='info'">
                        <el-form-item v-if="ruleForm.examquestionTypes==1 && options.length>0" label="正确答案"
                                      prop="examquestionAnswer">
                            <el-select v-model="ruleForm.examquestionAnswer" :readonly="ro.examquestionAnswer">
                                <el-option :label="item.code" :value="item.code" v-for="(item,index) in options"
                                           v-bind:key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="ruleForm.examquestionTypes==2 && options.length>0" label="正确答案"
                                      prop="examquestionAnswer">
                            <el-select v-model="ruleForm.examquestionAnswer" :readonly="ro.examquestionAnswer" multiple>
                                <el-option :label="item.code" :value="item.code" v-for="(item,index) in options"
                                           v-bind:key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="ruleForm.examquestionTypes==3 && options.length>0" label="正确答案"
                                      prop="examquestionAnswer">
                            <el-select v-model="ruleForm.examquestionAnswer" :readonly="ro.examquestionAnswer">
                                <el-option :label="item.text" :value="item.code" v-for="(item,index) in options"
                                           v-bind:key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="ruleForm.examquestionTypes==4" label="正确答案" prop="examquestionAnswer">
                            <el-input v-model="ruleForm.examquestionAnswer" :readonly="ro.examquestionAnswer"
                                      placeholder="正确答案" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div v-else>
                        <el-form-item class="input" label="正确答案" prop="examquestionAnswer">
                            <el-input v-model="ruleForm.examquestionAnswer" placeholder="正确答案" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="input" v-if="type!='info'" label="答案解析" prop="examquestionAnalysis">
                        <el-input :style="viewStyles.style3" type="textarea" min="1" :readonly="ro.examquestionAnalysis"
                                  v-model="ruleForm.examquestionAnalysis" placeholder="答案解析" clearable></el-input>

                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="答案解析" prop="examquestionAnalysis">
                            <el-input :style="viewStyles.style4" type="textarea" min="1"
                                      v-model="ruleForm.examquestionAnalysis" placeholder="答案解析" clearable readonly>
                            </el-input>
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

        <!-- 选项单选多选添加选项 -->
        <el-dialog title="添加选项" :visible.sync="addOptionsDialogVisiable" width="50%">
            <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules" label-width="80px">
                <el-form-item label="选项" prop="code">
                    <el-select v-model="dialogForm.code" placeholder="选项">
                        <el-option label="A" value="A"></el-option>
                        <el-option label="B" value="B"></el-option>
                        <el-option label="C" value="C"></el-option>
                        <el-option label="D" value="D"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" prop="text">
                    <el-input type="textarea" min="1" v-model="dialogForm.text" placeholder="内容" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="addOptionsDialogVisiable = false">取 消</el-button>
				<el-button type="primary" @click="addOptions">确 定</el-button>
			</span>
        </el-dialog>

    </div>
</template>
<script src="./add-or-update.options.js"></script>
<style lang="scss" src="./add-or-update.styles.scss"></style>

