<template>
<div class="main-content">

        <!-- 条件查询 -->
        <div v-if="showFlag">
            <el-form :inline="true" :model="searchForm" class="form-content">
                <el-row :gutter="20" class="slt"
                        :style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">

                    <el-form-item :label="contents.inputTitle == 1 ? '试题名称' : ''">
                        <el-input prefix-icon="el-icon-search" v-model="searchForm.examquestionName" placeholder="试题名称"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item :label="contents.inputTitle == 1 ? '科目' : ''">
                        <el-select v-model="searchForm.kemuTypes" placeholder="请选择科目">
                            <el-option label="=-请选择-=" value=""></el-option>
                            <el-option v-for="(item,index) in kemuTypesSelectSearch" v-bind:key="index"
                                       :label="item.indexName" :value="item.codeIndex">
                                <!--lable是要展示的名称-->
                                <!--value是值-->
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="contents.inputTitle == 1 ? '试题类型' : ''">
                        <el-select v-model="searchForm.examquestionTypes" placeholder="请选择试题类型">
                            <el-option label="=-请选择-=" value=""></el-option>
                            <el-option v-for="(item,index) in examquestionTypesSelectSearch" v-bind:key="index"
                                       :label="item.indexName" :value="item.codeIndex">
                                <!--lable是要展示的名称-->
                                <!--value是值-->
                            </el-option>
                        </el-select>
                    </el-form-item>



                    <el-form-item>
                        <el-button type="success" @click="search()">查询<i class="el-icon-search el-icon--right" />
                        </el-button>
                    </el-form-item>
                </el-row>
                <el-row class="ad"
                        :style="{justifyContent:contents.btnAdAllBoxPosition=='1'?'flex-start':contents.btnAdAllBoxPosition=='2'?'center':'flex-end'}">
                    <el-form-item>
                        <el-button v-if="isAuth('examquestion','新增')" type="success" icon="el-icon-plus"
                                   @click="addOrUpdateHandler()">新增</el-button>
                        &nbsp;
                        <el-button v-if="isAuth('examquestion','删除')" :disabled="dataListSelections.length <= 0"
                                   type="danger" icon="el-icon-delete" @click="deleteHandler()">删除</el-button>
                        &nbsp;
                        
                        &nbsp;
                        <a :style="viewStyles.style1" class="el-button el-button--success"
                           v-if="isAuth('examquestion','导入导出')" icon="el-icon-download"
                           href="http://localhost:8080/cybersecurityknowledge/upload/examquestionMuBan.xls">批量导入试题表数据模板</a>
                        &nbsp;
                        <el-upload v-if="isAuth('examquestion','导入导出')" :style="viewStyles.style2"
                                   :action="getActionUrl" :on-success="examquestionUploadSuccess"
                                   :on-error="examquestionUploadError" :show-file-list=false>
                            <el-button v-if="isAuth('examquestion','导入导出')" type="success" icon="el-icon-upload2">
                                批量导入试题表数据</el-button>
                        </el-upload>
                        &nbsp;
                        <!-- 导出excel -->
                        <download-excel v-if="isAuth('examquestion','导入导出')" :style="viewStyles.style3"
                                        class="export-excel-wrapper" :data="dataList" :fields="json_fields" name="examquestion.xls">
                            <!-- 导出excel -->
                            <el-button type="success" icon="el-icon-download">导出</el-button>
                        </download-excel>
                        &nbsp;
                    </el-form-item>
                </el-row>
            </el-form>
            <div class="table-content">
                <el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader"
                          :border="contents.tableBorder" :fit="contents.tableFit" :stripe="contents.tableStripe"
                          :style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor}"
                          v-if="isAuth('examquestion','查看')" :data="dataList" v-loading="dataListLoading"
                          @selection-change="selectionChangeHandler">
                    <el-table-column v-if="contents.tableSelection" type="selection" header-align="left"
                                     align="center" width="50">
                    </el-table-column>
                    <el-table-column label="索引" v-if="contents.tableIndex" type="index" width="50" />

                    <el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign"
                                     prop="examquestionName" header-align="left" label="试题名称" min-width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.examquestionName.length>20">
                                {{scope.row.examquestionName.substring(0, 20)}}...
                            </span>
                            <span v-else>
                                {{scope.row.examquestionName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign" prop="kemuTypes"
                                     header-align="left" label="科目" min-width="110">
                        <template slot-scope="scope">
                            {{scope.row.kemuValue}}
                        </template>
                    </el-table-column>
                    <el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign"
                                     prop="examquestionAnswer" header-align="left" label="正确答案">
                        <template slot-scope="scope">
                            <span v-if="scope.row.examquestionAnswer.length>10">
                                {{scope.row.examquestionAnswer.substring(0, 10)}}...
                            </span>
                            <span v-else>
                                {{scope.row.examquestionAnswer}}
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign"
                                     prop="examquestionAnalysis" header-align="left" label="答案解析">
                        <template slot-scope="scope">
                            <span v-if="scope.row.examquestionAnalysis.length>10">
                                {{scope.row.examquestionAnalysis.substring(0, 10)}}...
                            </span>
                            <span v-else>
                                {{scope.row.examquestionAnalysis}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign"
                                     prop="examquestionTypes" header-align="left" label="试题类型" min-width="110">
                        <template slot-scope="scope">
                            {{scope.row.examquestionValue}}
                        </template>
                    </el-table-column>
                    <el-table-column width="300" :align="contents.tableAlign" header-align="left" label="操作">
                        <template slot-scope="scope">
                            <el-button v-if="isAuth('examquestion','查看')" type="success" icon="el-icon-tickets"
                                       size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
                            <el-button v-if="isAuth('examquestion','修改')" type="primary" icon="el-icon-edit" size="mini"
                                       @click="addOrUpdateHandler(scope.row.id)">修改</el-button>

                            <el-button v-if="isAuth('examquestion','删除')" type="danger" icon="el-icon-delete"
                                       size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination  :layout="layouts" @size-change="sizeChangeHandle"
                               @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]"
                               :page-size="Number(contents.pageEachNum)" :total="totalPage" :small="contents.pageStyle"
                               class="pagination-content" :background="contents.pageBtnBG"
                               :style="{textAlign:contents.pagePosition==1?'left':contents.pagePosition==2?'center':'right'}">
                </el-pagination>
            </div>
        </div>
        <!-- 添加/修改页面  将父组件的search方法传递给子组件-->
        <add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>



        

    </div>
</template>
<script src="./list.options.js"></script>



