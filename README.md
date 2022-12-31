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
server {
  listen 80;
  server_name ipmsg-web;
  index index.html;

  location / {
    proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
    proxy_set_header x-forwarded-port $remote_port;
    proxy_pass http://127.0.0.1:1251;
  }
  location /ws {
    proxy_http_version 1.1;
    proxy_set_header upgrade $http_upgrade;
    proxy_set_header connection "upgrade";
    proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
    proxy_set_header x-forwarded-port $remote_port;
    proxy_pass http://127.0.0.1:1251;
  }
}
```

其中`http://127.0.0.1:1251`是容器启动的地址。


