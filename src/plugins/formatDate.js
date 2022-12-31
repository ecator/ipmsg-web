

/**
 * 把时间戳格式化为 yyyy/MM/dd HH:mm:SS 形式
 *
 * @param {number} timestamp 需要格式化的时间戳
 * @return {string} 格式化后的字符串
 */
function formatDate(timestamp) {

    let date = new Date(timestamp)
    let year = date.getFullYear()
    let month = ('0' + (date.getMonth() + 1)).substring(-2)
    month = month.substring(month.length - 2)
    let day = ('0' + date.getDay())
    day = day.substring(day.length - 2)
    let hour = ('0' + date.getHours())
    hour = hour.substring(hour.length - 2)
    let min = ('0' + date.getMinutes())
    min = min.substring(min.length - 2)
    let sec = ('0' + date.getSeconds())
    sec = sec.substring(sec.length - 2)
    return `${year}/${month}/${day} ${hour}:${min}:${sec}`

}

export default {
    install(app, option) {
        app.config.globalProperties.$formatDate = formatDate
    }
}