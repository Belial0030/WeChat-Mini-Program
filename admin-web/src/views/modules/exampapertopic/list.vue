<template>
<div class="main-content">

	<!-- 条件查询 -->
	<div v-if="showFlag">
		<el-form :inline="true" :model="searchForm" class="form-content">
			<el-row :gutter="20" class="slt"
				:style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">
				<el-form-item>
					<el-input prefix-icon="el-icon-search" v-model="searchForm.exampaperName" placeholder="试卷名称"
						clearable></el-input>
				</el-form-item>

				<el-form-item :label="contents.inputTitle == 1 ? '试题名称' : ''">
					<el-input prefix-icon="el-icon-search" v-model="searchForm.examquestionName" placeholder="试题名称"
						clearable></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="success" @click="search()">查询<i class="el-icon-search el-icon--right" />
					</el-button>
				</el-form-item>
			</el-row>
			<el-row class="ad"
				:style="{justifyContent:contents.btnAdAllBoxPosition=='1'?'flex-start':contents.btnAdAllBoxPosition=='2'?'center':'flex-end'}">
				<label  :span="20" v-if="zujuanTypes==1" :style="viewStyles.style1">
					<div :style="viewStyles.style2">
						<el-input :style="viewStyles.style3" type="number" min="0" :max="danXisting" placeholder="数量"
							v-model="danNum">
							<template slot="prepend">单选题数量:</template>
							<template slot="append">现:<span :style="viewStyles.style4">{{danXisting}}</span>题；分数:</template>
						</el-input>
						<el-input :style="viewStyles.style5" placeholder="分数" type="number" min="0" max="100" v-model="danFen">
						</el-input>
						<el-input :style="viewStyles.style6" type="number" min="0" :max="duoXisting" placeholder="数量"
							v-model="duoNum">
							<template slot="prepend">多选题数量:</template>
							<template slot="append">现:<span :style="viewStyles.style7">{{duoXisting}}</span>题；分数:</template>
						</el-input>
						<el-input :style="viewStyles.style8" placeholder="分数" type="number" min="0" max="100" v-model="duoFen">
						</el-input>
					</div>
					<div>
						<el-input :style="viewStyles.style9" type="number" min="0" :max="panXisting" placeholder="数量"
							v-model="panNum">
							<template slot="prepend">判选题数量:</template>
							<template slot="append">现:<span :style="viewStyles.style10">{{panXisting}}</span>题；分数:</template>
						</el-input>
						<el-input :style="viewStyles.style11" placeholder="分数" type="number" min="0" max="100" v-model="panFen">
						</el-input>
						<el-input :style="viewStyles.style12" type="number" min="0" :max="tianXisting" placeholder="数量"
							v-model="tianNum">
							<template slot="prepend">填空题数量:</template>
							<template slot="append">现:<span :style="viewStyles.style13">{{tianXisting}}</span>题；分数:</template>
						</el-input>
						<el-input :style="viewStyles.style14" placeholder="分数" type="number" min="0" max="100" v-model="tianFen">
						</el-input>
					</div>
				</label>
				<el-col :span="zujuanTypes==1?6:24" :style="viewStyles.style15">
					<el-button type="success" icon="el-icon-plus" @click="addshiti()">
						{{zujuanTypes==1?"开始组卷":"添加考题"}}
					</el-button>
					<el-tag :style="viewStyles.style16" size="small">试卷总分:<span :style="viewStyles.style17">{{exampapertopicNumber}}</span></el-tag>
				</el-col>
			</el-row>
		</el-form>
		<div class="table-content">
			<el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader"
				:border="contents.tableBorder" :fit="contents.tableFit" :stripe="contents.tableStripe"
				:style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor}"
				:data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandler">
				<el-table-column label="索引" v-if="contents.tableIndex" type="index" width="50" />
				<el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign"
					prop="exampaperName" header-align="left" label="试卷名称" min-width="180">
					<template slot-scope="scope">
						<span v-if="scope.row.exampaperName.length>20">
							{{scope.row.exampaperName.substring(0, 20)}}...
						</span>
						<span v-else>
							{{scope.row.exampaperName}}
						</span>
					</template>
				</el-table-column>
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
				<el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign"
					prop="examquestionTypes" header-align="left" label="试题类型" min-width="110">
					<template slot-scope="scope">
						{{scope.row.examquestionValue}}
					</template>
				</el-table-column>
				<el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign"
					prop="exampapertopicNumber" header-align="left" label="试题分数">
					<template slot-scope="scope">
						{{scope.row.exampapertopicNumber}}
					</template>
				</el-table-column>
				<el-table-column width="300" :align="contents.tableAlign" header-align="left" label="操作">
					<template slot-scope="scope">
						<el-button v-if="isAuth('exampaper','查看')" type="success" icon="el-icon-tickets" size="mini"
							@click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
						<el-button v-if="isAuth('exampaper','添加考题')" type="success" icon="el-icon-tickets"
							size="mini" @click="addOrUpdateHandler(scope.row.id)">修改分数</el-button>

						<el-button v-if="isAuth('exampaper','删除')" type="danger" icon="el-icon-delete" size="mini"
							@click="deleteHandler(scope.row.id)">删除</el-button>

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

	<!-- 统计报表 -->
	

	<!-- 添加试题 -->
	<el-dialog title="添加试题" :visible.sync="questionsTableVisible" width="80%">
		<el-form :inline="true" :model="questionsSearchForm" class="form-content">
			<el-row :gutter="20" class="slt"
				:style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">
				<el-form-item :label="contents.inputTitle == 1 ? '试题名称' : ''">
					<el-input prefix-icon="el-icon-search" v-model="questionsSearchForm.examquestionName"
						placeholder="试题名称" clearable></el-input>
				</el-form-item>
				<el-form-item :label="contents.inputTitle == 1 ? '试题类型' : ''">
					<el-select v-model="questionsSearchForm.examquestionTypes" placeholder="请选择试题类型">
						<el-option label="=-请选择-=" value=""></el-option>
						<el-option v-for="(item,index) in examquestionTypesSelectSearch" v-bind:key="index"
							:label="item.indexName" :value="item.codeIndex">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="questionsSearch()">查询<i
							class="el-icon-search el-icon--right" /></el-button>
				</el-form-item>
			</el-row>
		</el-form>
		<el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader" :border="contents.tableBorder"
			:fit="contents.tableFit" :stripe="contents.tableStripe"
			:style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor}"
			:data="questionsList">
			<el-table-column label="索引" v-if="contents.tableIndex" type="index" width="50" />
			<el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign" prop="examquestionName"
				header-align="left" label="试题名称" min-width="180">
				<template slot-scope="scope">
					<span v-if="scope.row.examquestionName.length>20">
						{{scope.row.examquestionName.substring(0, 20)}}...
					</span>
					<span v-else>
						{{scope.row.examquestionName}}
					</span>
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
			<el-table-column width="150" :align="contents.tableAlign" header-align="left" label="操作">
				<template slot-scope="scope">
					<el-button type="success" icon="el-icon-tickets" size="mini"
						@click="addQuestions(scope.row.id,'info')">添加</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination clsss="pages" :layout="layouts" @size-change="questionsSizeChangeHandle"
			@current-change="questionsCurrentChangeHandle" :current-page="questionsPageIndex"
			:page-sizes="[10, 20, 50]" :page-size="Number(contents.pageEachNum)" :total="questionsPageTotalPage"
			:small="contents.pageStyle" class="pagination-content" :background="contents.pageBtnBG"
			:style="{textAlign:contents.pagePosition==1?'left':contents.pagePosition==2?'center':'right'}">
		</el-pagination>
	</el-dialog>

</div>
</template>
<script src="./list.options.js"></script>



