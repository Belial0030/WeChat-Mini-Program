const base = {
    get() {
        return {
            url : "http://localhost:8080/cybersecurityknowledge/",
            name: "cybersecurityknowledge",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/cybersecurityknowledge/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "网络安全知识培训系统"
        } 
    }
}
export default base
