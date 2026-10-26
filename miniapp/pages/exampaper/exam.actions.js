export default {
    async goTo(id) {
        document.querySelector('#id' + id).scrollIntoView();
    },

    selectQuestions(examquestionId, code) {
        this.answerList.forEach(function (item, index) {
            if (item.examquestionId === examquestionId) {
                if (item.examquestionTypes == 2) {
                    if (item.answer == '') {
                        //空的
                        item.answer = code;
                    } else if (item.answer == code) {
                        //删除最后一个
                        item.answer = '';
                    } else {
                        let answerList = item.answer.split(','); //切割数组
                        if (answerList.indexOf(code) != -1) {
                            //存在
                            answerList.splice(answerList.indexOf(code), 1);
                            item.answer = answerList.join(',');
                        } else {
                            //不存在
                            answerList.push(code);
                            item.answer = answerList.join(',');
                        }
                    }
                } else {
                    item.answer = code;
                }
            }
        });
    },

    async submitQuestions() {
        let _this = this;
        let notDone = [];
        let params = {
            yonghuId: _this.user.id,
            answerList: JSON.stringify(_this.answerList),
            exampaperId: _this.exampaperId,
        };
        _this.dataList.forEach(function (item, index) {
            if (
                item.examquestionId == _this.answerList[index].examquestionId &&
                (_this.answerList[index].answer == null || _this.answerList[index].answer == '')
            ) {
                notDone.push(index + 1);
            }
        });
        if (_this.count > 0) {
            if (notDone.length > 0) {
                _this.$utils.msg(
                    '您有’' + notDone.length + '‘道题未作，分别为：' + notDone + ';请继续答题！',
                );
                return false;
            }
        } else {
            if (notDone.length > 0) {
                _this.$utils.msg(
                    '您有’' + notDone.length + '‘道题未作，分别为：' + notDone + ';未做题目为0分！',
                );
            } else {
                _this.$utils.msg('答题时间已到即将提交试卷！！！');
            }
        }
        await _this.$api.requestMap(`exampapertopic`, 'submitQuestions', params);
        uni.navigateBack({
            delta: 1,
        });
    },
};
