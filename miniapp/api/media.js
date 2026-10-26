import base from './base';

/**
 * 自定义问号传参
 */

export const upload = (callback) => {
    uni.chooseImage({
        count: 4, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
            uni.uploadFile({
                url: `${base.url}file/upload`, //仅为示例，非真实的接口地址
                filePath: res.tempFilePaths[0],
                name: 'file',
                header: {
                    Token: uni.getStorageSync('token'),
                },
                success: (uploadFileRes) => {
                    // console.log(uploadFileRes)
                    let result = JSON.parse(uploadFileRes.data);
                    if (result.code == 0) {
                        callback(result);
                    } else {
                        uni.showToast({
                            title: result.msg,
                            icon: 'none',
                            duration: 2000,
                        });
                    }
                },
            });
        },
    });
};

export const uploadMedia = (callback) => {
    uni.chooseVideo({
        count: 1,
        sourceType: ['camera', 'album'],
        success: function (res) {
            console.log(res);
            uni.uploadFile({
                url: `${base.url}file/upload`, //仅为示例，非真实的接口地址
                filePath: res.tempFilePath,
                name: 'file',
                header: {
                    Token: uni.getStorageSync('token'),
                },
                success: (uploadFileRes) => {
                    // console.log(uploadFileRes)
                    let result = JSON.parse(uploadFileRes.data);
                    if (result.code == 0) {
                        callback(result);
                    } else {
                        uni.showToast({
                            title: result.msg,
                            icon: 'none',
                            duration: 2000,
                        });
                    }
                },
            });
        },
    });
};
