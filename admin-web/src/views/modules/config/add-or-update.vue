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
        <el-form-item class="input" v-if="type!='info'"  label="名称" prop="name">
          <el-input v-model="ruleForm.name" 
              placeholder="名称" clearable  :readonly="ro.name"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="名称" prop="name">
              <el-input v-model="ruleForm.name" 
                placeholder="名称" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="24">  
        <el-form-item class="upload" v-if="type!='info' && !ro.value" label="值" prop="value">
          <file-upload
          tip="点击上传值"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.value?$base.url+ruleForm.value:''"
          @change="valueUploadChange"
          ></file-upload>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.value" label="值" prop="value">
            <img :style="viewStyles.style1" v-bind:key="index" v-for="(item,index) in ruleForm.value.split(',')" :src="$base.url+item" width="100" height="100">
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
