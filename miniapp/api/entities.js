import http from './http';

export const page = (tableName, data) => {
    return http.request({
        url: `${tableName}/page`,
        method: 'GET',
        data,
    });
};

export const list = (tableName, data) => {
    return http.request({
        url: `${tableName}/list`,
        method: 'GET',
        data,
    });
};

export const add = (tableName, data) => {
    return http.request({
        url: `${tableName}/add`,
        method: 'POST',
        data,
    });
};

export const save = (tableName, data) => {
    return http.request({
        url: `${tableName}/save`,
        method: 'POST',
        data,
    });
};

export const update = (tableName, data) => {
    return http.request({
        url: `${tableName}/update`,
        method: 'POST',
        data,
    });
};

export const del = (tableName, data) => {
    return http.request({
        url: `${tableName}/delete`,
        method: 'POST',
        data,
    });
};

export const info = (tableName, id) => {
    return http.request({
        url: `${tableName}/info/${id}`,
        method: 'GET',
    });
};

export const detail = (tableName, id) => {
    return http.request({
        url: `${tableName}/detail/${id}`,
        method: 'GET',
    });
};

export const recommend = (tableName, page = 1, limit = 10) => {
    let data = {
        page: page,
        limit: limit,
    };
    return http.request({
        url: `${tableName}/autoSort?limit=5`,
        method: 'get',
        data,
    });
};
