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
            <el-col :span="12"  v-if="sessionTable !='shipin'">
                <el-form-item class="select" v-if="type!='info'"  label="视频信息" prop="shipinId">
                    <el-select v-model="ruleForm.shipinId" :disabled="ro.shipinId" filterable placeholder="请选择视频信息" @change="shipinChange">
                        <el-option
                                v-for="(item,index) in shipinOptions"
                                v-bind:key="item.id"
                                :label="item.shipinName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12"  v-if="sessionTable !='shipin' ">
                <el-form-item class="input" v-if="type!='info'"  label="视频标题" prop="shipinName">
                    <el-input v-model="shipinForm.shipinName"
                              placeholder="视频标题" clearable readonly></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="视频标题" prop="shipinName">
                        <el-input v-model="ruleForm.shipinName"
                                  placeholder="视频标题" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12" v-if="sessionTable !='shipin' ">
                <el-form-item class="upload" v-if="type!='info' && !ro.shipinPhoto" label="视频照片" prop="shipinPhoto">
                    <img :style="viewStyles.style1" v-bind:key="index" v-for="(item,index) in (shipinForm.shipinPhoto || '').split(',')" :src="$base.url+item" width="100" height="100">
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item v-if="ruleForm.shipinPhoto" label="视频照片" prop="shipinPhoto">
                        <img :style="viewStyles.style2" v-bind:key="index" v-for="(item,index) in (ruleForm.shipinPhoto || '').split(',')" :src="$base.url+item" width="100" height="100">
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12"  v-if="sessionTable !='shipin' ">
                <el-form-item class="input" v-if="type!='info'"  label="视频类型" prop="shipinValue">
                    <el-input v-model="shipinForm.shipinValue"
                              placeholder="视频类型" clearable readonly></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="视频类型" prop="shipinValue">
                        <el-input v-model="ruleForm.shipinValue"
                                  placeholder="视频类型" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12"  v-if="sessionTable !='yonghu'">
                <el-form-item class="select" v-if="type!='info'"  label="用户" prop="yonghuId">
                    <el-select v-model="ruleForm.yonghuId" :disabled="ro.yonghuId" filterable placeholder="请选择用户" @change="yonghuChange">
                        <el-option
                                v-for="(item,index) in yonghuOptions"
                                v-bind:key="item.id"
                                :label="item.yonghuName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="12"  v-if="sessionTable !='yonghu' ">
                <el-form-item class="input" v-if="type!='info'"  label="用户姓名" prop="yonghuName">
                    <el-input v-model="yonghuForm.yonghuName"
                              placeholder="用户姓名" clearable readonly></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="用户姓名" prop="yonghuName">
                        <el-input v-model="ruleForm.yonghuName"
                                  placeholder="用户姓名" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12"  v-if="sessionTable !='yonghu' ">
                <el-form-item class="input" v-if="type!='info'"  label="用户手机号" prop="yonghuPhone">
                    <el-input v-model="yonghuForm.yonghuPhone"
                              placeholder="用户手机号" clearable readonly></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="用户手机号" prop="yonghuPhone">
                        <el-input v-model="ruleForm.yonghuPhone"
                                  placeholder="用户手机号" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12"  v-if="sessionTable !='yonghu' ">
                <el-form-item class="input" v-if="type!='info'"  label="用户身份证号" prop="yonghuIdNumber">
                    <el-input v-model="yonghuForm.yonghuIdNumber"
                              placeholder="用户身份证号" clearable readonly></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="用户身份证号" prop="yonghuIdNumber">
                        <el-input v-model="ruleForm.yonghuIdNumber"
                                  placeholder="用户身份证号" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12" v-if="sessionTable !='yonghu' ">
                <el-form-item class="upload" v-if="type!='info' && !ro.yonghuPhoto" label="用户头像" prop="yonghuPhoto">
                    <img :style="viewStyles.style3" v-bind:key="index" v-for="(item,index) in (yonghuForm.yonghuPhoto || '').split(',')" :src="$base.url+item" width="100" height="100">
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item v-if="ruleForm.yonghuPhoto" label="用户头像" prop="yonghuPhoto">
                        <img :style="viewStyles.style4" v-bind:key="index" v-for="(item,index) in (ruleForm.yonghuPhoto || '').split(',')" :src="$base.url+item" width="100" height="100">
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12"  v-if="sessionTable !='yonghu' ">
                <el-form-item class="input" v-if="type!='info'"  label="学习时长" prop="xuexiNumber">
                    <el-input v-model="yonghuForm.xuexiNumber"
                              placeholder="学习时长" clearable readonly></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="学习时长" prop="xuexiNumber">
                        <el-input v-model="ruleForm.xuexiNumber"
                                  placeholder="学习时长" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="12"  v-if="sessionTable !='yonghu' ">
                <el-form-item class="input" v-if="type!='info'"  label="电子邮箱" prop="yonghuEmail">
                    <el-input v-model="yonghuForm.yonghuEmail"
                              placeholder="电子邮箱" clearable readonly></el-input>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="电子邮箱" prop="yonghuEmail">
                        <el-input v-model="ruleForm.yonghuEmail"
                                  placeholder="电子邮箱" readonly></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <input id="updateId" name="id" type="hidden">
        <input id="shipinId" name="shipinId" type="hidden">
        <input id="yonghuId" name="yonghuId" type="hidden">
            <el-col :span="12">
                <el-form-item v-if="type!='info'"  class="input" label="开始时间" prop="xuexizujiTime">
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="ruleForm.xuexizujiTime"
                            type="datetime"
                            placeholder="开始时间"
                            :disabled="ro.xuexizujiTime">
                    </el-date-picker>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item v-if="ruleForm.xuexizujiTime" label="开始时间" prop="xuexizujiTime">
                        <span v-html="ruleForm.xuexizujiTime"></span>
                    </el-form-item>
                </div>
            </el-col>

            <el-col :span="12">
                <el-form-item class="select" v-if="type!='info'"  label="学习状态" prop="xuexizujiTypes">
                    <el-select v-model="ruleForm.xuexizujiTypes" :disabled="ro.xuexizujiTypes" placeholder="请选择学习状态">
                        <el-option
                            v-for="(item,index) in xuexizujiTypesOptions"
                            v-bind:key="item.codeIndex"
                            :label="item.indexName"
                            :value="item.codeIndex">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-else-if="type=='info'">
                    <el-form-item class="input" label="学习状态" prop="xuexizujiValue">
                    <el-input v-model="ruleForm.xuexizujiValue"
                        placeholder="学习状态" readonly></el-input>
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

