<template>
<div class="main-content">
    <!-- 列表页 -->
    <div v-if="showFlag">
        <el-form :inline="true" :model="searchForm" class="form-content">
            <el-row :gutter="20" class="slt" :style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">
                <el-form-item label="试卷状态">
                    <el-input prefix-icon="el-icon-search" v-model="searchForm.indexNameSearch" placeholder="试卷状态" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" type="success" @click="search()">查询</el-button>
                </el-form-item>
            </el-row>
            <el-row class="ad" :style="{justifyContent:contents.btnAdAllBoxPosition=='1'?'flex-start':contents.btnAdAllBoxPosition=='2'?'center':'flex-end'}">
                <el-form-item>
                    <el-button
                            v-if="isAuth('dictionaryExampaper','新增')"
                            type="success"
                            icon="el-icon-plus"
                            @click="addOrUpdateHandler()"
                    >新增</el-button>
                    <el-button
                            v-if="isAuth('dictionaryExampaper','删除')"
                            :disabled="dataListSelections.length <= 0"
                            type="danger"
                            icon="el-icon-delete"
                            @click="deleteHandler()"
                    >删除</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <div class="table-content">
            <el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader"
                      :border="contents.tableBorder"
                      :fit="contents.tableFit"
                      :stripe="contents.tableStripe"
                      :style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor}"
                      v-if="isAuth('dictionaryExampaper','查看')"
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
                                  prop="codeIndex"
                                  header-align="left"
                                  label="试卷状态编码">
                    <template slot-scope="scope">
                        {{scope.row.codeIndex}}
                    </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                  prop="indexName"
                                  header-align="left"
                                  label="试卷状态名称" min-width="180">
                    <template slot-scope="scope">
                        {{scope.row.indexName}}
                    </template>
                </el-table-column>
                <!--<el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                  prop="beizhu"
                                  header-align="left"
                                  label="备注">
                    <template slot-scope="scope">
                        {{scope.row.beizhu}}
                    </template>
                </el-table-column>-->
                <el-table-column width="300" :align="contents.tableAlign"
                                 header-align="left"
                                 label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="isAuth('dictionaryExampaper','查看')" type="success" icon="el-icon-tickets" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
                        <el-button v-if="isAuth('dictionaryExampaper','修改')" type="primary" icon="el-icon-edit" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
                        <el-button v-if="isAuth('dictionaryExampaper','删除')" type="danger" icon="el-icon-delete" size="mini" @click="deleteHandler(scope.row.id)">删除</el-button>
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



