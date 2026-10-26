<template>
<div class="addEdit-block">
	<el-form class="detail-form-content" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="auto"
		:style="{backgroundColor:addEditForm.addEditBoxColor}">
		<el-row>
			<el-col :span="12" v-if="sessionTable !='exampaper' ">
				<el-form-item class="input" v-if="type!='info'" label="试卷名称" prop="exampaperName">
					<el-input v-model="exampaperForm.exampaperName" placeholder="试卷名称" clearable readonly>
					</el-input>
				</el-form-item>
				<div v-else-if="type=='info'">
					<el-form-item class="input" label="试卷名称" prop="exampaperName">
						<el-input v-model="ruleForm.exampaperName" placeholder="试卷名称" readonly></el-input>
					</el-form-item>
				</div>
			</el-col>
			<el-col :span="12" v-if="sessionTable !='exampaper' ">
				<el-form-item class="input" v-if="type!='info'" label="考试时长(分钟)" prop="exampaperDate">
					<el-input v-model="exampaperForm.exampaperDate" placeholder="考试时长(分钟)" clearable readonly>
					</el-input>
				</el-form-item>
				<div v-else-if="type=='info'">
					<el-form-item class="input" label="考试时长(分钟)" prop="exampaperDate">
						<el-input v-model="ruleForm.exampaperDate" placeholder="考试时长(分钟)" readonly></el-input>
					</el-form-item>
				</div>
			</el-col>
			<el-col :span="12" v-if="sessionTable !='exampaper' ">
				<el-form-item class="input" v-if="type!='info'" label="试卷总分数" prop="exampaperMyscore">
					<el-input v-model="exampaperForm.exampaperMyscore" placeholder="试卷总分数" clearable readonly>
					</el-input>
				</el-form-item>
				<div v-else-if="type=='info'">
					<el-form-item class="input" label="试卷总分数" prop="exampaperMyscore">
						<el-input v-model="ruleForm.exampaperMyscore" placeholder="试卷总分数" readonly></el-input>
					</el-form-item>
				</div>
			</el-col>
			<el-col :span="12" v-if="sessionTable !='examquestion' ">
				<el-form-item class="input" v-if="type!='info'" label="试题名称" prop="examquestionName">
					<el-input v-model="examquestionForm.examquestionName" placeholder="试题名称" clearable readonly>
					</el-input>
				</el-form-item>
				<div v-else-if="type=='info'">
					<el-form-item class="input" label="试题名称" prop="examquestionName">
						<el-input v-model="ruleForm.examquestionName" placeholder="试题名称" readonly></el-input>
					</el-form-item>
				</div>
			</el-col>
			
			<el-col :span="24" v-if="ruleForm.examquestionTypes==1||ruleForm.examquestionTypes==2">
				<el-form-item label="选项" prop="examquestionOptions">
					<div class="options" v-for="(item,index) in options" v-bind:key="index">
						<span>{{item.code}}.</span>{{item.text}}
					</div>
				</el-form-item>
			</el-col>
			<el-col :span="12" v-if="sessionTable !='examquestion' ">
				<el-form-item class="input" v-if="type!='info'" label="正确答案" prop="examquestionAnswer">
					<el-input v-model="examquestionForm.examquestionAnswer" placeholder="正确答案" clearable readonly>
					</el-input>
				</el-form-item>
				<div v-else-if="type=='info'">
					<el-form-item class="input" label="正确答案" prop="examquestionAnswer">
						<el-input v-model="ruleForm.examquestionAnswer" placeholder="正确答案" readonly></el-input>
					</el-form-item>
				</div>
			</el-col>
			<el-col :span="12" v-if="sessionTable !='examquestion' ">
				<el-form-item class="input" v-if="type!='info'" label="答案解析" prop="examquestionAnalysis">
					<el-input v-model="examquestionForm.examquestionAnalysis" placeholder="答案解析" clearable readonly>
					</el-input>
				</el-form-item>
				<div v-else-if="type=='info'">
					<el-form-item class="input" label="答案解析" prop="examquestionAnalysis">
						<el-input v-model="ruleForm.examquestionAnalysis" placeholder="答案解析" readonly></el-input>
					</el-form-item>
				</div>
			</el-col>
			<el-col :span="12" v-if="sessionTable !='examquestion' ">
				<el-form-item class="input" v-if="type!='info'" label="试题类型" prop="examquestionValue">
					<el-input v-model="examquestionForm.examquestionValue" placeholder="试题类型" clearable readonly>
					</el-input>
				</el-form-item>
				<div v-else-if="type=='info'">
					<el-form-item class="input" label="试题类型" prop="examquestionValue">
						<el-input v-model="ruleForm.examquestionValue" placeholder="试题类型" readonly></el-input>
					</el-form-item>
				</div>
			</el-col>
			<input id="updateId" name="id" type="hidden">
			<input id="exampaperId" name="exampaperId" type="hidden">
			<input id="examquestionId" name="examquestionId" type="hidden">
			<el-col :span="12">
				<el-form-item class="input" v-if="type!='info'" label="试题分数" prop="exampapertopicNumber">
					<el-input v-model="ruleForm.exampapertopicNumber" placeholder="试题分数" clearable
						:readonly="ro.exampapertopicNumber"></el-input>
				</el-form-item>
				<div v-else-if="type=='info'">
					<el-form-item class="input" label="试题分数" prop="exampapertopicNumber">
						<el-input v-model="ruleForm.exampapertopicNumber" placeholder="试题分数" readonly></el-input>
					</el-form-item>
				</div>
			</el-col>
		</el-row>
		<el-form-item class="btn">
			<el-button v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
			<el-button v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
			<el-button v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
		</el-form-item>
	</el-form>
</div>
</template>
<script src="./add-or-update.options.js"></script><style lang="scss" src="./add-or-update.styles.scss"></style>

