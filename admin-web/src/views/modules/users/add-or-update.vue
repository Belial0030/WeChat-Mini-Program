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
        <el-form-item class="input" v-if="type!='info'"  label="用户名" prop="username">
          <el-input v-model="ruleForm.username" 
              placeholder="用户名" clearable  :readonly="ro.username"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="用户名" prop="username">
              <el-input v-model="ruleForm.username" 
                placeholder="用户名" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form-item class="input" v-if="type!='info'"  label="密码" prop="password">
          <el-input v-model="ruleForm.password" 
              placeholder="密码" clearable  :readonly="ro.password"></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item class="input" label="密码" prop="password">
              <el-input v-model="ruleForm.password" 
                placeholder="密码" readonly></el-input>
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
