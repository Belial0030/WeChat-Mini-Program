<template>
<div>
  <!-- 上传文件组件 -->
  <el-upload
    ref="upload"
    :action="getActionUrl"
    list-type="picture-card"
    :multiple="multiple"
    :limit="limit"
    :headers="myHeaders"
    :file-list="fileList"
    :on-exceed="handleExceed"
    :on-preview="handleUploadPreview"
    :on-remove="handleRemove"
    :on-success="handleUploadSuccess"
    :on-error="handleUploadErr"
    :before-upload="handleBeforeUpload"
  >
    <i class="el-icon-plus"></i>
    <div slot="tip" class="el-upload__tip" :style="viewStyles.style1">{{tip}}</div>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible" size="tiny" append-to-body>
    <img width="100%" :src="dialogImageUrl" alt>
  </el-dialog>
</div>
</template>
<script src="./FileUpload.options.js"></script>
<style lang="scss" scoped>
</style>
