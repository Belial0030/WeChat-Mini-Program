// 统一兼容入口：保留全部具名导出及原有默认对象。
import {
    requestCondition,
    requestConditionDataGet,
    requestConditionDataPost,
    requestMap,
} from './requests';
export { requestCondition, requestConditionDataGet, requestConditionDataPost, requestMap };
import { queryScore } from './statistics';
export { queryScore };
import { auth, login, register, resetPass, session } from './authentication';
export { auth, login, register, resetPass, session };
import { page, list, add, save, update, del, info, detail, recommend } from './entities';
export { page, list, add, save, update, del, info, detail, recommend };
import { upload, uploadMedia } from './media';
export { upload, uploadMedia };

export default {
    requestCondition, //自定义条件查
    requestConditionDataPost, //自定义条件查和集合
    requestConditionDataGet, //自定义条件查和集合
    requestMap, //自定义条件为map
    login, // 登陆
    register, //注册
    resetPass, // 重置
    auth, // 校验
    session, // 个人信息
    list, // 查询
    page, // 查询 page
    add, // 添加
    update, // 修改
    del, // 删除
    info, // 单条信息查询,
    recommend, // 智能推荐
    save, // 保存
    upload, // 上传
    queryScore, //评分查询
};
