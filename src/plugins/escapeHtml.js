
/**
 * 转义html实体字符
 *
 * @param {string} str 需要转换的字符串
 * @return {string} 转义过后的字符串
 */
function escapeHtml(str) {
    let entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
        '/': '&#x2F;',
        ' ': '&nbsp;'
    }
    str = String(str).replace(/[&<>"'\/ ]/g, (s) => entityMap[s])
    str = String(str).replace(new RegExp('\r?\n', 'g'), '<br />')
    str = String(str).replace(new RegExp('\t', 'g'), '&#9;')
    return str

}

export default {
    install(app, option) {
        app.config.globalProperties.$escapeHtml = escapeHtml
    }
}