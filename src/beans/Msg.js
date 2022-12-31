

class Msg {
    constructor(type, data) {
        this.type = type
        this.data = data
    }
}

class ExchangeData {

    /**
     * 构造用于和服务端交换数据的消息数据(实际传送的消息)
     * @param {number} timestamp 时间戳
     * @param {string} to 收信人地址(IP:PORT)
     * @param {string} from 发信人地址(IP:PORT)
     * @param {string} content 消息内容
     * @memberof ExchangeData
     */
    constructor(timestamp, to, from, content) {
        this.timestamp = timestamp
        this.to = to
        this.from = from
        this.content = content
    }
}

class PingData {
    constructor(data) {
        this.data = data
    }
}

class PongData {

    /**
     * 构造pong消息
     * @param {string} addr IP:PORT这样的地址
     * @memberof PongData
     */
    constructor(addr) {
        this.addr = addr
    }
}

class AddrData {

    /**
     * 构造addr消息
     * @param {string} addr IP:PORT这样的地址
     * @memberof AddrData
     */
    constructor(addr) {
        this.addr = addr
    }
}


const MsgType = {
    PING: "PING",
    PONG: "PONG",
    MSG: "MSG",
    ADDR_ADD: "ADDR_ADD",
    ADDR_REMOVE: "ADDR_REMOVE"
}

/**
 * 构造定时发送给服务端的ping消息
 *
 * @return {string} 
 */
function CreatePingDataMsg() {
    let msg = new Msg(MsgType.PING, new PingData("hello"))
    return JSON.stringify(msg)
}


/**
 * 构造回应客户端的pong消息，实际上会带上客户端的地址
 *
 * @param {string} addr IP:PORT这样的地址
 * @return {string} 
 */
function CreatePongDataMsg(addr) {
    let msg = new Msg(MsgType.PONG, new PongData(addr))
    return JSON.stringify(msg)
}


/**
 * 构造用于和服务端交换数据的消息数据(实际传送的消息)
 *
 * @param {number} timestamp 时间戳
 * @param {string} to 收信人地址(IP:PORT)
 * @param {string} from 发信人地址(IP:PORT)
 * @param {string} content 消息内容
 * @return {string} 
 */
function CreateExchangeDataMsg(timestamp, to, from, content) {
    let msg = new Msg(MsgType.MSG, new ExchangeData(timestamp, to, from, content))
    return JSON.stringify(msg)
}


/**
 * 构造addr增加的消息
 *
 * @param {string} addr IP:PORT这样的地址
 * @return {string} 
 */
function CreateAddrAddDataMsg(addr) {
    let msg = new Msg(MsgType.ADDR_ADD, new AddrData(addr))
    return JSON.stringify(msg)
}

/**
 * 构造addr删除的消息
 *
 * @param {string} addr IP:PORT这样的地址
 * @return {string} 
 */
function CreateAddrRemoveDataMsg(addr) {
    let msg = new Msg(MsgType.ADDR_REMOVE, new AddrData(addr))
    return JSON.stringify(msg)
}

export default {
    MsgType,
    CreatePingDataMsg,
    CreatePongDataMsg,
    CreateExchangeDataMsg,
    CreateAddrAddDataMsg,
    CreateAddrRemoveDataMsg
}