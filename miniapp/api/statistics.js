import http from './http';

export const queryScore = (data) => {
    return http.request({
        url: `queryScore`,
        method: 'GET',
        data,
    });
};
