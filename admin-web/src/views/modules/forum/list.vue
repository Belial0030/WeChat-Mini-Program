<template>
<div class="main-content">
        <el-dialog title="帖子回复详情" :visible.sync="forumReplyDialogVisible">
            <el-dialog
                    width="30%"
                    :title="forumReplyInfoContent"
                    :visible.sync="forumReplyInfoDialogVisible"
                    append-to-body>
            </el-dialog>
            <div class="demo-input-suffix">
                <span :style="viewStyles.style1">帖子标题：</span><el-input v-model="forumTitle" :disabled="true" placeholder="帖子标题" :style="viewStyles.style2"></el-input>
            </div>
            <div class="demo-input-suffix">
                <span :style="viewStyles.style3">帖子内容：</span><el-input v-model="forumContent" :disabled="true" placeholder="帖子内容" :style="viewStyles.style4" type="textarea"></el-input>
            </div>
            <el-table :data="forumData" height="250">
                <!--<el-table-column label="id" width="40"></el-table-column>-->
                <el-table-column label="身份">
                    <template slot-scope="scope">
                        <span v-if="scope.row.yonghuId">
                            用户
                        </span>
                        <span v-if="scope.row.usersId">
                            管理员
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="姓名">
                        <template slot-scope="scope">
                        <span v-if="scope.row.yonghuId">
                            {{scope.row.yonghuName}}
                        </span>
                        <span v-if="scope.row.usersId">
                            管理员
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="手机号">
                    <template slot-scope="scope">
                        <span v-if="scope.row.yonghuId">
                            {{scope.row.yonghuPhone}}
                        </span>
                        <span v-if="scope.row.usersId">
                            管理员
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="回复内容">
                    <template slot-scope="scope">
                        {{scope.row.forumContent.length>20?(scope.row.forumContent.substring(0,20)+'...'):scope.row.forumContent}}
                    </template>
                </el-table-column>
                <el-table-column property="insertTime" label="回帖时间"></el-table-column>
                <el-table-column property="caozuo" label="操作">
                    <template slot-scope="scope">
                        <el-button type="info"                          @click="seeForumContent(scope.row.forumContent)">回帖详情</el-button>
                            <el-button v-if="true &&( false|| (sessionTable == 'yonghu' && scope.row.yonghuId ==userId)
|| sessionTable == 'users')" type="danger" icon="el-icon-delete" size="mini" @click="deleteHandler(scope.row.id)">删除帖子</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="demo-input-suffix">
                <span>回帖内容：</span>
                <el-input v-model="forumReplyContent" placeholder="回帖内容" type="textarea"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="forumReplyDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="forumReply">回 帖</el-button>
            </div>
        </el-dialog>
        <!-- 条件查询 -->
        <div v-if="showFlag">
            <el-form :inline="true" :model="searchForm" class="form-content">
                <el-row :gutter="20" class="slt" :style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">

                     <el-form-item :label="contents.inputTitle == 1 ? '帖子标题' : ''">
                         <el-input prefix-icon="el-icon-search" v-model="searchForm.forumName" placeholder="帖子标题" clearable></el-input>
                     </el-form-item>


                    <el-form-item :label="contents.inputTitle == 1 ? '用户姓名' : ''">
                        <el-input prefix-icon="el-icon-search" v-model="searchForm.yonghuName" placeholder="用户姓名" clearable></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="success" @click="search()">查询<i class="el-icon-search el-icon--right"/></el-button>
                    </el-form-item>
                </el-row>
                <el-row class="ad" :style="{justifyContent:contents.btnAdAllBoxPosition=='1'?'flex-start':contents.btnAdAllBoxPosition=='2'?'center':'flex-end'}">
                    <el-form-item>
                        <el-button
                                v-if="isAuth('forum','新增')"
                                type="success"
                                icon="el-icon-plus"
                                @click="addOrUpdateHandler()"
                        >新增</el-button>
                        &nbsp;
                        
                        &nbsp;
                        <a :style="viewStyles.style5" class="el-button el-button--success"
                           v-if="isAuth('forum','导入导出')"
                           icon="el-icon-download"
                           href="http://localhost:8080/cybersecurityknowledge/upload/forumMuBan.xls"
                        >批量导入论坛数据模板</a>
                        &nbsp;
                        <el-upload
                                v-if="isAuth('forum','导入导出')"
:style="viewStyles.style6"
                                :action="getActionUrl"
                                :on-success="forumUploadSuccess"
                                :on-error="forumUploadError"
                                :show-file-list = false>
                            <el-button
                                    v-if="isAuth('forum','导入导出')"
                                    type="success"
                                    icon="el-icon-upload2"
                            >批量导入论坛数据</el-button>
                        </el-upload>
                        &nbsp;
                        <!-- 导出excel -->
                        <download-excel v-if="isAuth('forum','导入导出')" :style="viewStyles.style7" class = "export-excel-wrapper" :data = "dataList" :fields = "json_fields" name = "forum.xls">
                            <!-- 导出excel -->
                            <el-button
                                    type="success"
                                    icon="el-icon-download"
                            >导出</el-button>
                        </download-excel>
                        &nbsp;
                    </el-form-item>
                </el-row>
            </el-form>
            <div class="table-content">
                <el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader"
                          :border="contents.tableBorder"
                          :fit="contents.tableFit"
                          :stripe="contents.tableStripe"
                          :style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor}"
                          v-if="isAuth('forum','查看')"
                          :data="dataList"
                          v-loading="dataListLoading"
                          @selection-change="selectionChangeHandler">
                    <el-table-column label="索引" v-if="contents.tableIndex" type="index" width="50" />
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      header-align="left"
                                      label="身份">
                        <template slot-scope="scope">
                            <span v-if="scope.row.yonghuId">
                                用户
                            </span>
                            <span v-if="scope.row.usersId">
                                管理员
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      header-align="left"
                                      label="姓名">
                        <template slot-scope="scope">
                            <span v-if="scope.row.yonghuId">
                                {{scope.row.yonghuName}}
                            </span>
                            <span v-if="scope.row.usersId">
                                管理员
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      header-align="left"
                                      label="手机号">
                        <template slot-scope="scope">
                            <span v-if="scope.row.yonghuId">
                                {{scope.row.yonghuPhone}}
                            </span>
                            <span v-if="scope.row.usersId">
                                管理员
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      header-align="left"
                                      label="头像">
                        <template slot-scope="scope">
                            <span v-if="scope.row.yonghuId">
                                <div v-if="scope.row.yonghuPhoto">
                                    <img :src="$base.url+scope.row.yonghuPhoto" width="100" height="100">
                                </div>
                                <div v-else>无图片</div>
                            </span>
                            <span v-if="scope.row.usersId">
                                管理员
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="forumName"
                                      header-align="left"
                                      label="帖子标题" min-width="180">
                        <template slot-scope="scope">
                            {{scope.row.forumName}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="forumContent"
                                      header-align="left"
                                      label="帖子内容">
                        <template slot-scope="scope">
                            {{scope.row.forumContent.length>20?(scope.row.forumContent.substring(0,20)+'...'):scope.row.forumContent}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                      prop="insertTime"
                      header-align="left"
                      label="发帖时间" min-width="175">
                        <template slot-scope="scope">
                            {{scope.row.insertTime}}
                        </template>
                    </el-table-column>

                    <el-table-column width="300" :align="contents.tableAlign"
                                     header-align="left"
                                     label="操作">
                        <template slot-scope="scope">
                            <el-button v-if="isAuth('forum','查看')" type="success" icon="el-icon-tickets" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
                            <el-button v-if="isAuth('forum','查看')" type="primary" icon="el-icon-edit" size="mini" @click="openReplyForum(scope.row.id,scope.row.forumName,scope.row.forumContent)">查看论坛回复</el-button>
                            <el-button v-if="isAuth('forum','修改')" type="primary" icon="el-icon-edit" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>

                            <el-button v-if="true &&( false|| (sessionTable == 'yonghu' && scope.row.yonghuId ==userId)
|| sessionTable == 'users')" type="danger" icon="el-icon-delete" size="mini" @click="deleteHandler(scope.row.id)">删除帖子</el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        
                        :layout="layouts"
                        @size-change="sizeChangeHandle"
                        @current-change="currentChangeHandle"
                        :current-page="pageIndex"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="Number(contents.pageEachNum)"
                        :total="totalPage"
                        :small="contents.pageStyle"
                        class="pagination-content"
                        :background="contents.pageBtnBG"
                        :style="{textAlign:contents.pagePosition==1?'left':contents.pagePosition==2?'center':'right'}"
                ></el-pagination>
            </div>
        </div>
        <!-- 添加/修改页面  将父组件的search方法传递给子组件-->
        <add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>



        

    </div>
</template>
<script src="./list.options.js"></script>



