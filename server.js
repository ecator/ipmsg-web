import express from 'express'
import path from 'path'
import minimist from 'minimist'
import fs from 'fs'
import WebSocket, { WebSocketServer } from 'ws'
import http from 'http'
import Msg from './src/beans/Msg.js'

let args = minimist(process.argv.slice(2), { default: { addr: "0.0.0.0", port: "1251", dist: 'dist' } })
//console.log(args)

if (args.help) {
    console.log(`
    usage node server.js [--addr address --port port --dist dist]
        --addr  listen address default is 0.0.0.0
        --port  listen port default is 1251
        --dist  static(frontend web) directory default is dist
    `)
}

let dist = args.dist
if (!path.isAbsolute(args.dist)) {
    dist = path.resolve(dist)
}



if (!fs.existsSync(dist)) {
    dist = path.join(path.dirname(new URL(import.meta.url).pathname), 'dist')
}


const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })
// 使用 static 中间件处理静态文件
app.use(express.static('dist'))


/**
 * 获取客户的IP和端口号
 *
 * @param {IncomingMessage} req
 * @return {string} IP:PORT
 */
function getClientAddr(req) {
    let ip = req.socket.remoteAddress
    let port = req.socket.remotePort
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(',')[0].trim()
    }
    if (req.headers['x-forwarded-port']) {
        port = req.headers['x-forwarded-port'].split(',')[0].trim()
    }
    return `${ip}:${port}`
}

wss.on('connection', (ws, req) => {
    // connection is established
    ws.addr = getClientAddr(req)
    console.log(`connected from ${ws.addr}`);

    // listen for messages
    ws.on('message', (message) => {
        //console.log(`Received message: ${message} from ${ws.addr}`);
        try {
            let msg = JSON.parse(message)
            switch (msg.type) {
                case Msg.MsgType.PING:
                    ws.send(Msg.CreatePongDataMsg(ws.addr))
                    break
                case Msg.MsgType.MSG:
                    for (let client of wss.clients) {
                        if (client.readyState === WebSocket.OPEN && client.addr == msg.data.to) {
                            client.send(Msg.CreateExchangeDataMsg(msg.data.timestamp, msg.data.to, msg.data.from, msg.data.content))
                            break
                        }
                    }
                    break
                default:
                    console.log("msg.type error")
            }
        } catch (e) {
            console.log(e)
        }
    })


    // listen for disconnected
    ws.on('close', () => {
        console.log(`disconnected from ${ws.addr}`)
        // 通知所有客户端删除该地址
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(Msg.CreateAddrRemoveDataMsg(ws.addr))
            }
        })
    })

    // 第一次连接回传给客户端地址
    ws.send(Msg.CreatePongDataMsg(ws.addr))
    // 回传所有在线地址
    wss.clients.forEach((client) => {
        ws.send(Msg.CreateAddrAddDataMsg(client.addr))
        if (client.addr != ws.addr) {
            client.send(Msg.CreateAddrAddDataMsg(ws.addr))
        }
    })
});


server.listen(args.port, args.addr, () => {
    console.log(`listening on ${args.addr}:${args.port}`)
    console.log(`dist: ${dist}`)
})
