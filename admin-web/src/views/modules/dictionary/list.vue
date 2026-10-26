<template>
<div class="main-content">

        <!-- 条件查询 -->
        <div v-if="showFlag">
            <el-form :inline="true" :model="searchForm" class="form-content">
                <el-row :gutter="20" class="slt" :style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">

                     <el-form-item :label="contents.inputTitle == 1 ? '编码名字' : ''">
                         <el-input prefix-icon="el-icon-search" v-model="searchForm.indexName" placeholder="编码名字" clearable></el-input>
                     </el-form-item>



                    <el-form-item>
                        <el-button type="success" @click="search()">查询<i class="el-icon-search el-icon--right"/></el-button>
                    </el-form-item>
                </el-row>
                <el-row class="ad" :style="{justifyContent:contents.btnAdAllBoxPosition=='1'?'flex-start':contents.btnAdAllBoxPosition=='2'?'center':'flex-end'}">
                    <el-form-item>
                        <el-button
                                v-if="isAuth('dictionary','新增')"
                                type="success"
                                icon="el-icon-plus"
                                @click="addOrUpdateHandler()"
                        >新增</el-button>
                        &nbsp;
                        <el-button
                                v-if="isAuth('dictionary','删除')"
                                :disabled="dataListSelections.length <= 0"
                                type="danger"
                                icon="el-icon-delete"
                                @click="deleteHandler()"
                        >删除</el-button>
                        &nbsp;
                        
                        &nbsp;
                        <a :style="viewStyles.style1" class="el-button el-button--success"
                           v-if="isAuth('dictionary','导入导出')"
                           icon="el-icon-download"
                           href="http://localhost:8080/cybersecurityknowledge/upload/dictionaryMuBan.xls"
                        >批量导入字典数据模板</a>
                        &nbsp;
                        <el-upload
                                v-if="isAuth('dictionary','导入导出')"
:style="viewStyles.style2"
                                :action="getActionUrl"
                                :on-success="dictionaryUploadSuccess"
                                :on-error="dictionaryUploadError"
                                :show-file-list = false>
                            <el-button
                                    v-if="isAuth('dictionary','导入导出')"
                                    type="success"
                                    icon="el-icon-upload2"
                            >批量导入字典数据</el-button>
                        </el-upload>
                        &nbsp;
                        <!-- 导出excel -->
                        <download-excel v-if="isAuth('dictionary','导入导出')" :style="viewStyles.style3" class = "export-excel-wrapper" :data = "dataList" :fields = "json_fields" name = "dictionary.xls">
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
                          v-if="isAuth('dictionary','查看')"
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
                                   prop="dicCode"
                                   header-align="left"
                                   label="字段">
                        <template slot-scope="scope">
                            {{scope.row.dicCode}}
                        </template>
                    </el-table-column>

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                   prop="dicName"
                                   header-align="left"
                                   label="字段名" min-width="180">
                        <template slot-scope="scope">
                            {{scope.row.dicName}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="codeIndex"
                                      header-align="left"
                                      label="编码">
                        <template slot-scope="scope">
                            {{scope.row.codeIndex}}
                        </template>
                    </el-table-column>

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                   prop="indexName"
                                   header-align="left"
                                   label="编码名字" min-width="180">
                        <template slot-scope="scope">
                            {{scope.row.indexName}}
                        </template>
                    </el-table-column>

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                   prop="beizhu"
                                   header-align="left"
                                   label="备注">
                        <template slot-scope="scope">
                            {{scope.row.beizhu}}
                        </template>
                    </el-table-column>

                    <el-table-column width="300" :align="contents.tableAlign"
                                     header-align="left"
                                     label="操作">
                        <template slot-scope="scope">
                            <el-button v-if="isAuth('dictionary','查看')" type="success" icon="el-icon-tickets" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
                            <el-button v-if="isAuth('dictionary','修改')" type="primary" icon="el-icon-edit" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
                            <el-button v-if="isAuth('dictionary','删除')" type="danger" icon="el-icon-delete" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>

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



