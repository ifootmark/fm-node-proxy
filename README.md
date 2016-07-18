# fm-node-proxy

## 安装

执行命令

`npm install --save-dev fm-node-proxy`

## 使用

```javascript
var proxy = require('fm-node-proxy');
proxy.start();
```

## 配置

创建 `fm.config.js` 文件，可以在配置文件 `fm.config.js` 中修改端口号。

```javascript
module.exports = {
	proxy_port: 5000,
    proxy_prefix: "api/",
    api_hostName: "127.0.0.1",
    api_port: 8080,
    api_prefix: 'proxy/'
};
```


## 示例
创建 `proxy.js` ,添加以下代码：
```javascript
var proxy = require('fm-node-proxy');
proxy.start();
```
运行：

`node proxy.js`

至此，看到 *Reverse Proxy listening at port 5000* ，说明反向代理已启动。


为了看到测试效果，我们启动一个本地服务，在 `proxy.js` 文件中增加一行

`proxy.server.start();`

再次运行：

`node proxy.js`

可以看到：*Server listening on port 8080*

访问：
http://127.0.0.1:5000/api/proxy/?name=footmark&email=ifootmark@163.com

运行结果：
```javascript
{
	name: "footmark",
	email: "ifootmark@163.com"
}
```

修改 `fm.config.js` 配置文件中的 `api_hostName` 和 `api_port` ，可以更改主机名和端口。



## License
[MIT](https://github.com/ifootmark/fm-node-proxy/blob/master/LICENSE)


© allmeet.net
