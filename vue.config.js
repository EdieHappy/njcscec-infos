module.exports = {
    publicPath: '/wap/njcscec/',
    assetsDir: 'static', // 打包生成的静态资源的位置
    productionSourceMap: false,
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
            data: `@import "@/assets/scss/mixin.scss";`,
            },
        },
    },
    devServer: {
        port:8080,
        disableHostCheck: true, // 解决vue项目中的“Invalid Host header”
    }
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
}