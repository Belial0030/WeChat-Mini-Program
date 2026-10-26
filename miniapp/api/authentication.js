import http from './http';

export const auth = () => {
    let token = uni.getStorageSync('token');
    if (!uni.getStorageSync('token')) {
        uni.navigateTo({
            url: '../login/login',
        });
        return;
    }
};

export const login = (tableName = 'defaultuser', data) => {
    return http.request({
        url: `${tableName}/login`,
        method: 'GET',
        data,
    });
};

export const register = (tableName = 'defaultuser', data) => {
    return http.request({
        url: `${tableName}/register`,
        method: 'POST',
        data,
    });
};

export const resetPass = (tableName = 'defaultuser', username) => {
    let data = {
        username: username,
    };
    return http.request({
        url: `${tableName}/resetPass`,
        method: 'GET',
        data,
    });
};

export const session = (tableName = 'defaultuser') => {
    return http.request({
        url: `${tableName}/session`,
        method: 'GET',
    });
};
