import createState from './exam.state.js';
import pageActions from './exam.actions.js';
import viewStyles from './exam.inline-styles.js';

export default {
    data: createState,
    computed: {
        viewStyles() {
            return viewStyles;
        },
        SecondToDate: function () {
            var time = this.count;
            if (null != time && '' != time) {
                if (time > 60 && time < 60 * 60) {
                    time =
                        parseInt(time / 60.0) +
                        '分钟' +
                        parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) +
                        '秒';
                } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                    time =
                        parseInt(time / 3600.0) +
                        '小时' +
                        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
                        '分钟' +
                        parseInt(
                            (parseFloat(
                                (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60,
                            ) -
                                parseInt(
                                    (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60,
                                )) *
                                60,
                        ) +
                        '秒';
                } else if (time >= 60 * 60 * 24) {
                    time =
                        parseInt(time / 3600.0 / 24) +
                        '天' +
                        parseInt(
                            (parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) * 24,
                        ) +
                        '小时' +
                        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
                        '分钟' +
                        parseInt(
                            (parseFloat(
                                (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60,
                            ) -
                                parseInt(
                                    (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60,
                                )) *
                                60,
                        ) +
                        '秒';
                } else {
                    time = parseInt(time) + '秒';
                }
            }
            return time;
        },
    },
    async onLoad(data) {
        let _this = this;
        _this.exampaperId = data.exampaperId;
        _this.table = uni.getStorageSync('nowTable');
        //查询登录用户信息
        let userData = await _this.$api.session(_this.table);
        _this.user = userData.data;
        //获取选题表试题信息
        let record = [
            {
                key: 'exampaperId',
                val: data.exampaperId,
            },
        ];
        let dataA = await _this.$api.requestCondition(
            `exampapertopic`,
            'questionAcquisition',
            record,
        );
        _this.dataList = dataA.data;
        _this.exampaperName = _this.dataList[0].exampaperName;
        _this.exampaperMyscore = _this.dataList[0].exampaperMyscore;
        //定时
        _this.count = _this.dataList[0].exampaperDate * 60;
        if (_this.count > 0) {
            _this.inter = setInterval(function () {
                _this.count = _this.count - 1;
                if (_this.count < 0) {
                    //时间结束结束考试
                    _this.submitQuestions();
                }
            }, 1000);
        }

        //转换 单多选 判断题的选项
        _this.dataList.forEach(function (item, index) {
            if (item.examquestionTypes != 4) {
                item.examquestionOptions = JSON.parse(item.examquestionOptions);
            }
            let examquestionId = item.examquestionId;
            let examquestionTypes = item.examquestionTypes;
            _this.answerList.push({
                examquestionId: examquestionId,
                examquestionTypes: examquestionTypes,
                answer: '',
            });
        });
    },
    destroyed: function () {
        clearInterval(this.inter);
    },
    methods: {
        goTo: pageActions.goTo,
        selectQuestions: pageActions.selectQuestions,
        submitQuestions: pageActions.submitQuestions,
    },
};
