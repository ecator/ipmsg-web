

class Addr {

    /**
     * 创建一个地址
     * @param {string} value ip:port这样的地址
     * @param {boolean} selected 是否选中
     * @memberof Addr
     */
    constructor(value, selected) {
        this.value = value
        this.selected = selected
    }
}

export default Addr