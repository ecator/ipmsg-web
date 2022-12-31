
import marked from 'marked'

/**
 * 把markdown字符串转换成html字符串
 *
 * @param {string} str 需要转换的markdown字符串
 * @return {string} 转换过后的html字符串
 */
function md2html(str) {

    return marked(str, { breaks: true })

}

export default {
    install(app, option) {
        app.config.globalProperties.$md2html = md2html
    }
}