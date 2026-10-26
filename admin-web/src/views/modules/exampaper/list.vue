<template>
<div class="main-content">

        <!-- 条件查询 -->
        <div v-if="showFlag">
            <el-form :inline="true" :model="searchForm" class="form-content">
                <el-row :gutter="20" class="slt" :style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">

                    <el-form-item :label="contents.inputTitle == 1 ? '试卷名称' : ''">
                        <el-input prefix-icon="el-icon-search" v-model="searchForm.exampaperName" placeholder="试卷名称" clearable></el-input>
                    </el-form-item>

                    <el-form-item :label="contents.inputTitle == 1 ? '科目' : ''">
                        <el-select v-model="searchForm.kemuTypes" placeholder="请选择科目">
                            <el-option label="=-请选择-=" value=""></el-option>
                            <el-option
                                    v-for="(item,index) in kemuTypesSelectSearch"
                                    v-bind:key="index"
                                    :label="item.indexName"
                                    :value="item.codeIndex">
                                <!--lable是要展示的名称-->
                                <!--value是值-->
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item :label="contents.inputTitle == 1 ? '试卷状态' : ''">
                        <el-select v-model="searchForm.exampaperTypes" placeholder="请选择试卷状态">
                            <el-option label="=-请选择-=" value=""></el-option>
                            <el-option
                                    v-for="(item,index) in exampaperTypesSelectSearch"
                                    v-bind:key="index"
                                    :label="item.indexName"
                                    :value="item.codeIndex">
                                <!--lable是要展示的名称-->
                                <!--value是值-->
                            </el-option>
                        </el-select>
                    </el-form-item>




                    <el-form-item>
                        <el-button type="success" @click="search()">查询<i class="el-icon-search el-icon--right"/></el-button>
                    </el-form-item>
                </el-row>
                <el-row class="ad" :style="{justifyContent:contents.btnAdAllBoxPosition=='1'?'flex-start':contents.btnAdAllBoxPosition=='2'?'center':'flex-end'}">
                    <el-form-item>
                        <el-button
                                v-if="isAuth('exampaper','新增')"
                                type="success"
                                icon="el-icon-plus"
                                @click="addOrUpdateHandler()"
                        >新增</el-button>
                        &nbsp;
                        <el-button
                                v-if="isAuth('exampaper','删除')"
                                :disabled="dataListSelections.length <= 0"
                                type="danger"
                                icon="el-icon-delete"
                                @click="deleteHandler()"
                        >删除</el-button>
                        &nbsp;
                        
                        &nbsp;
                        <a :style="viewStyles.style1" class="el-button el-button--success"
                           v-if="isAuth('exampaper','导入导出')"
                           icon="el-icon-download"
                           href="http://localhost:8080/cybersecurityknowledge/upload/exampaperMuBan.xls"
                        >批量导入试卷表数据模板</a>
                        &nbsp;
                        <el-upload
                                v-if="isAuth('exampaper','导入导出')"
:style="viewStyles.style2"
                                :action="getActionUrl"
                                :on-success="exampaperUploadSuccess"
                                :on-error="exampaperUploadError"
                                :show-file-list = false>
                            <el-button
                                    v-if="isAuth('exampaper','导入导出')"
                                    type="success"
                                    icon="el-icon-upload2"
                            >批量导入试卷表数据</el-button>
                        </el-upload>
                        &nbsp;
                        <!-- 导出excel -->
                        <download-excel v-if="isAuth('exampaper','导入导出')" :style="viewStyles.style3" class = "export-excel-wrapper" :data = "dataList" :fields = "json_fields" name = "exampaper.xls">
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
                          v-if="isAuth('exampaper','查看')"
                          :data="dataList"
                          v-loading="dataListLoading"
                          @selection-change="selectionChangeHandler">
                    <el-table-column  v-if="contents.tableSelection"
                                      type="selection"
                                      header-align="left"
                                      align="center"
                                      width="50">
                    </el-table-column>
                    <el-table-column label="索引" v-if="contents.tableIndex" type="index" width="50" />

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="exampaperName"
                                      header-align="left"
                                      label="试卷名称" min-width="180">
                        <template slot-scope="scope">
                            {{scope.row.exampaperName}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="exampaperDate"
                                      header-align="left"
                                      label="考试时长(分钟)">
                        <template slot-scope="scope">
                            {{scope.row.exampaperDate}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="exampaperMyscore"
                                      header-align="left"
                                      label="试卷总分数">
                        <template slot-scope="scope">
                            {{scope.row.exampaperMyscore}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="kemuTypes"
                                      header-align="left"
                                      label="科目" min-width="110">
                        <template slot-scope="scope">
                            {{scope.row.kemuValue}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="zujuanTypes"
                                      header-align="left"
                                      label="组卷方式" min-width="110">
                        <template slot-scope="scope">
                            {{scope.row.zujuanValue}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="exampaperTypes"
                                      header-align="left"
                                      label="试卷状态" min-width="110">
                        <template slot-scope="scope">
                            {{scope.row.exampaperValue}}
                        </template>
                    </el-table-column>

                    <el-table-column width="300" :align="contents.tableAlign"
                                     header-align="left"
                                     label="操作">
                        <template slot-scope="scope">
                            <el-button v-if="isAuth('exampaper','查看')" type="success" icon="el-icon-tickets" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
<!--                            <el-button v-if="isAuth('exampaper','考试') && scope.row.exampaperTypes==1" type="primary" icon="el-icon-edit" size="mini" @click="saveExamrecord(scope.row.id)">{{ contents.tableBtnFont == 1?'考试':'' }}</el-button>-->
                            <el-button v-if="isAuth('exampaper','修改') && scope.row.exampaperMyscore <= 0" type="primary" icon="el-icon-edit" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
                            <el-button v-if="isAuth('exampaper','添加考题')" type="primary" icon="el-icon-edit" size="mini" @click="addKaoti(scope.row)">设置考题</el-button>

                            <el-button v-if="isAuth('exampaper','删除')" type="danger" icon="el-icon-delete" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>

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


