const px2rem = require('postcss-px2rem')

const postcss = px2rem({
    remUnit: 192, //基准大小 baseSize，需要和rem.js中相同
})

module.exports = {
    publicPath: process.env.NODE_ENV === 'dev' ?
        '/' :
        '/prod',
    lintOnSave: false,
    outputDir: 'dashboardbusiness', // 打包名称
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production' ?
        './' : '/',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ],
                minPixelValue: 3

            }
        }
    }
}