import http from './http';

export const requestCondition = (tableName, functionName, value) => {
    var params = null;
    if (value != null && value.length > 0) {
        value.forEach(function (item, index) {
            if (index == 0) {
                params = '?' + item.key + '=' + item.val;
            } else {
                params += '&' + item.key + '=' + item.val;
            }
        });
    }
    if (params == null || params == '') {
        return http.request({
            url: `${tableName}/${functionName}`,
            method: 'GET',
        });
    } else {
        return http.request({
            url: `${tableName}/${functionName}${params}`,
            method: 'GET',
        });
    }
};

export const requestConditionDataGet = (tableName, functionName, value, data) => {
    var params = null;
    if (value != null && value.length > 0) {
        value.forEach(function (item, index) {
            if (index == 0) {
                params = '?' + item.key + '=' + item.val;
            } else {
                params += '&' + item.key + '=' + item.val;
            }
        });
    }
    if (params == null || params == '') {
        return http.request({
            url: `${tableName}/${functionName}`,
            method: 'GET',
            data,
        });
    } else {
        return http.request({
            url: `${tableName}/${functionName}${params}`,
            method: 'GET',
            data,
        });
    }
};

export const requestConditionDataPost = (tableName, functionName, value, data) => {
    var params = null;
    if (value != null && value.length > 0) {
        value.forEach(function (item, index) {
            if (index == 0) {
                params = '?' + item.key + '=' + item.val;
            } else {
                params += '&' + item.key + '=' + item.val;
            }
        });
    }
    if (params == null || params == '') {
        return http.request({
            url: `${tableName}/${functionName}`,
            method: 'POST',
            data,
        });
    } else {
        return http.request({
            url: `${tableName}/${functionName}${params}`,
            method: 'POST',
            data,
        });
    }
};

export const requestMap = (tableName, functionName, data) => {
    return http.request({
        url: `${tableName}/${functionName}`,
        method: 'GET',
        data,
    });
};
