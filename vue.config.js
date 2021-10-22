var URL = 'http://localhost:3030'
// var URL = 'http://zlc.zhulif.com:3030'

module.exports = {
    devServer: {
        // open: true,
        // port: 8002,
        // https: false,
        // hotOnly: false,
        // http 代理配置
        proxy: {
            '/api': {
                target: URL,
                changeOrigin: true,
                // pathRewrite: {          
                //   '^/api': '/api'
                // }
            },
            "/upload/ueditor": { // 富文本图片访问
                target: "http://localhost:3030", 
                changeOrigin: true,
                secure: false
            },
            "/uploads": { // 富文本图片访问
                target: "http://localhost:3030", 
                changeOrigin: true,
                secure: false
            }
        },
        before: (app) => {}
    },
    publicPath: '/' //  ./ 或 /
}
