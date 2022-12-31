




/**
 * 历史消息
 *
 * @class HistoryMsg
 */
class HistoryMsg {


    /**
     * 构造历史消息
     * @param {number} timestamp 消息时间戳
     * @param {string} direction 消息的方向，From或者To
     * @param {string} target 消息对象
     * @param {string} content 消息内容
     * @memberof HistoryMsg
     */
    constructor(timestamp, direction, target, content) {
        this.timestamp = timestamp
        this.direction = direction
        this.target = target
        this.content = content
    }
}


export default HistoryMsg