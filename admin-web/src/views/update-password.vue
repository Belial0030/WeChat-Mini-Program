<template>
<div>
  <el-form
    class="detail-form-content"
    ref="ruleForm"
    :rules="rules"
    :model="ruleForm"
    label-width="80px"
  >
    <el-form-item label="原密码" prop="password">
      <el-input v-model="ruleForm.password" show-password></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newpassword">
      <el-input type="password" v-model="ruleForm.newpassword" show-password></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="repassword">
      <el-input type="password" v-model="ruleForm.repassword" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onUpdateHandler">确 定</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script src="./update-password.options.js"></script>
<style lang="scss" scoped>
</style>
