<template>
<div>
  <el-form
    class="detail-form-content"
    ref="ruleForm"
    :model="ruleForm"
    label-width="80px"
  >  
   <el-row>
                  <el-col :span="12">
         <el-form-item v-if="flag=='yonghu'"  label='用户姓名' prop="yonghuName">
             <el-input v-model="ruleForm.yonghuName"  placeholder='用户姓名' clearable></el-input>
         </el-form-item>
       </el-col>

       <el-col :span="12">
         <el-form-item v-if="flag=='yonghu'"  label='用户手机号' prop="yonghuPhone">
             <el-input v-model="ruleForm.yonghuPhone"  placeholder='用户手机号' clearable></el-input>
         </el-form-item>
       </el-col>

       <el-col :span="12">
         <el-form-item v-if="flag=='yonghu'"  label='用户身份证号' prop="yonghuIdNumber">
             <el-input v-model="ruleForm.yonghuIdNumber"  placeholder='用户身份证号' clearable></el-input>
         </el-form-item>
       </el-col>

       <el-col :span="12">
           <el-form-item v-if="flag=='yonghu'" label='用户头像' prop="yonghuPhoto">
               <file-upload
                       tip="点击上传照片"
                       action="file/upload"
                       :limit="3"
                       :multiple="true"
                       :fileUrls="ruleForm.yonghuPhoto?$base.url+ruleForm.yonghuPhoto:''"
                       @change="yonghuPhotoUploadChange"
               ></file-upload>
           </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item v-if="flag=='yonghu'"  label='学习时长' prop="xuexiNumber">
             <el-input v-model="ruleForm.xuexiNumber"  placeholder='学习时长' clearable></el-input>
         </el-form-item>
       </el-col>

       <el-col :span="12">
         <el-form-item v-if="flag=='yonghu'"  label='电子邮箱' prop="yonghuEmail">
             <el-input v-model="ruleForm.yonghuEmail"  placeholder='电子邮箱' clearable></el-input>
         </el-form-item>
       </el-col>

       <el-form-item v-if="flag=='users'" label="用户名" prop="username">
           <el-input v-model="ruleForm.username"
                     placeholder="用户名"></el-input>
       </el-form-item>
       <el-col :span="12">
           <el-form-item v-if="flag!='users'"  label="性别" prop="sexTypes">
               <el-select v-model="ruleForm.sexTypes" placeholder="请选择性别">
                   <el-option
                           v-for="(item,index) in sexTypesOptions"
                           v-bind:key="item.codeIndex"
                           :label="item.indexName"
                           :value="item.codeIndex">
                   </el-option>
               </el-select>
           </el-form-item>
       </el-col>
       <el-col :span="24">
           <el-form-item>
               <el-button type="primary" @click="onUpdateHandler">修 改</el-button>
           </el-form-item>
       </el-col>
   </el-row>
  </el-form>
</div>
</template>
<script src="./center.options.js"></script>
<style lang="scss" scoped>
</style>
