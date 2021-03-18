const docsPlugin = require('@yzfe-private/vuepress-plugin-yzfe-build-docs').default
const path = require('path')
const pkgName = process.env.npm_package_name.replace('@', '')
const pkgVersion = process.env.npm_package_version || '1.0.0'
const docsType = 'nodejs'
const basePath = `/docs/${docsType}/${pkgName}/`
const cdnBase = `https://yz-cdn.meimeifa.com${basePath}`
const nodeEnv = process.env.NODE_ENV
const ciToken = process.env.CI_TOKEN || ''
const distPath = path.resolve(path.join(__dirname, 'dist'))

const baseConfig = {
    title: process.env.npm_package_title || process.env.npm_package_name,
    description: process.env.npm_package_description,
    themeConfig: {
        search: false,
        sidebar: 'auto',
        nav: [{ text: 'Home', link: '/' }],
        logo: 'https://yz-cdn.meimeifa.com/yzt/fe/logo/Node.js.png'
    }
}

const config = {
    ...baseConfig,
    base: nodeEnv === 'production' ? basePath : '/',
    plugins: [
        'vuepress-plugin-typescript',
        docsPlugin({
            type: docsType,
            name: pkgName,
            version: pkgVersion,
            title: baseConfig.title,
            desc: baseConfig.description,
            logo: baseConfig.themeConfig.logo,
            ciToken,
            distPath,
            basePath
        })
    ],
    configureWebpack: () => {
        if (nodeEnv === 'production') {
            return {
                output: {
                    publicPath: cdnBase
                }
            }
        }
        return {}
    }
}

module.exports = config
