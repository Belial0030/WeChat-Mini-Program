// 数字，邮件，手机，url，身份证校验
import {
    isNumber,
    isIntNumer,
    isEmail,
    isPhone,
    isMobile,
    isURL,
    checkIdCard,
} from '@/utils/validate';

export default function data() {
    let self = this;
    var validateIdCard = (rule, value, callback) => {
        if (!value) {
            callback();
        } else if (!checkIdCard(value)) {
            callback(new Error('请输入正确的身份证号码'));
        } else {
            callback();
        }
    };
    var validateUrl = (rule, value, callback) => {
        if (!value) {
            callback();
        } else if (!isURL(value)) {
            callback(new Error('请输入正确的URL地址'));
        } else {
            callback();
        }
    };
    var validateMobile = (rule, value, callback) => {
        if (!value) {
            callback();
        } else if (!isMobile(value)) {
            callback(new Error('请输入正确的手机号码'));
        } else {
            callback();
        }
    };
    var validatePhone = (rule, value, callback) => {
        if (!value) {
            callback();
        } else if (!isPhone(value)) {
            callback(new Error('请输入正确的电话号码'));
        } else {
            callback();
        }
    };
    var validateEmail = (rule, value, callback) => {
        if (!value) {
            callback();
        } else if (!isEmail(value)) {
            callback(new Error('请输入正确的邮箱地址'));
        } else {
            callback();
        }
    };
    var validateNumber = (rule, value, callback) => {
        if (!value) {
            callback();
        } else if (!isNumber(value)) {
            callback(new Error('请输入数字'));
        } else {
            callback();
        }
    };
    var validateIntNumber = (rule, value, callback) => {
        if (!value) {
            callback();
        } else if (!isIntNumer(value)) {
            callback(new Error('请输入整数'));
        } else {
            callback();
        }
    };
    return {
        addEditForm: null,
        id: '',
        type: '',
        exampaperForm: {},
        yonghuForm: {},
        ro: {
            examrecordUuidNumber: false,
            yonghuId: false,
            exampaperId: false,
            totalScore: false,
            insertTime: false,
        },
        ruleForm: {
            examrecordUuidNumber: '',
            yonghuId: '',
            exampaperId: '',
            totalScore: '',
            insertTime: '',
        },
        exampaperOptions: [],
        yonghuOptions: [],
        rules: {
            examrecordUuidNumber: [
                { required: true, message: '考试编号不能为空', trigger: 'blur' },
            ],
            yonghuId: [{ required: true, message: '考试用户不能为空', trigger: 'blur' }],
            exampaperId: [
                { required: true, message: '所属试卷id（外键）不能为空', trigger: 'blur' },
            ],
            totalScore: [{ required: true, message: '所得总分不能为空', trigger: 'blur' }],
            insertTime: [{ required: true, message: '考试时间不能为空', trigger: 'blur' }],
        },
    };
}
