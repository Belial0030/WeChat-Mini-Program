<template>
<div>
  <!-- 图片上传组件辅助-->
  <el-upload
    class="avatar-uploader"
    :action="getActionUrl"
    name="file"
    :headers="header"
    :show-file-list="false"
    :on-success="uploadSuccess"
    :on-error="uploadError"
    :before-upload="beforeUpload"
  ></el-upload>

  <quill-editor
    class="editor"
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @change="onEditorChange($event)"
  ></quill-editor>
</div>
</template>
<script src="./Editor.options.js"></script> 

<style src="./Editor.styles.css"></style>