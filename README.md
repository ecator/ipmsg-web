# 概览

主要解决没有安装任何通信软件的情况下发送一些临时消息的需求。靠`IP+PORT`来识别唯一客户端。

# 使用

直接使用docker运行下面命令即可：

```
docker run -d -p 1251:1251 ecat/ipmsg-web
```

然后打开`http://server-ip:1251`即可。


如果用nginx代理，那么为了能正常获取到客户端IP和端口需要做如下配置：

```nginx
upstream ipmsg-web {
  server 127.0.0.1:1251;
}
server {
  listen 80;
  server_name ipmsg-web;
  index index.html;

  location / {
    proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
    proxy_set_header x-forwarded-port $remote_port;
    proxy_pass http://ipmsg-web;
  }
  location /ws {
    proxy_http_version 1.1;
    proxy_set_header upgrade $http_upgrade;
    proxy_set_header connection "upgrade";
    proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
    proxy_set_header x-forwarded-port $remote_port;
    proxy_pass http://ipmsg-web;
  }
}
```

其中`upstream ipmsg-web`里面的`http://127.0.0.1:1251`是容器启动的地址。

# 开发

确保本机是node16的环境或者直接使用[Docker Dev Environment](https://open.docker.com/dashboard/dev-envs?url=https://github.com/ecator/ipmsg-web)，然后安装依赖：

```
npm i
```

如果需要编译直接运行下面命令：

```
npm run build
```

启动服务器：

```
# 直接默认参数启动
node server.js

# 查看服务器启动参数，可以指定监听地址和端口等
node server.js --help
```

# 参考

- [Vue.js](https://cn.vuejs.org/guide/quick-start.html)
- [Vite](https://cn.vitejs.dev/guide/)
- [Element Plus](https://element-plus.org/zh-CN/)





