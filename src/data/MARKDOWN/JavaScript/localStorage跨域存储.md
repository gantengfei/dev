
# 一、localStorage + iframe
使用`localStorage`和`iframe`结合的方法。

**B域名数据提供给A域名使用**

1.A域名创建中间接收页面 *http://127.0.0.177:8080/shareUser.html*

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <script type="text/javascript">
    window.onload = function () {
      const urlParams = new URLSearchParams(window.location.search);
      let params = Object.fromEntries(urlParams.entries());
      const { action, userName, userPassword } = params;

      if (action == 'login') {
        params['storageDate'] = new Date().getTime();

        localStorage.setItem('userInfo', JSON.stringify(params));

        if (localStorage.getItem('xxautoopen')) {
          window.close();
          localStorage.removeItem('xxautoopen');
        } else {
          window.open(window.location.href);
          localStorage.setItem('xxautoopen', new Date().getTime() + '');
          window.close();
        }
      } else if (action == 'logout') {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("xxautoopen");
      }
    }
  </script>
</body>
</html>
```
<span style="color:#e06c75">
因localStorage的同源策略问题，同源策略（same-origin policy）是浏览器执行的一种安全措施，目的是为了保证用户信息的安全，防止恶意的网站窃取数据。
</span>
<br>
<span style="color:#337ecc">
通过iframe向A域名提供数据，在A域名中同样无法获取来源第三方数据，使用弹出页面自动打开在关闭的形式向A域名中localStorage存储数据。
</span>

2、B域名提供数据页面 *http://127.0.0.188/b_page.html*

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>

  <iframe id="if_main" name="if_main" src="http://127.0.0.177:8080/shareUser.html?action=login&userName=admin&userPassword=123456" style="display:none;"></iframe>
</body>
</html>
```

# 二、window.postMessage + iframe + iframe

1.A域名创建中间接收页面 *http://127.0.0.177:8080/shareUser.html*
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <script type="text/javascript">
    window.onload = function () {
      const urlParams = new URLSearchParams(window.location.search);
      let params = Object.fromEntries(urlParams.entries());
      const { action, userName, userPassword } = params;

      if (action == 'login') {
        params['storageDate'] = new Date().getTime();

        localStorage.setItem('userInfo', JSON.stringify(params));
      } else if (action == 'logout') {
        localStorage.removeItem("userInfo");
      }

      // window.parent.parent.postMessage(JSON.stringify(params), '*');
      window.parent.parent.postMessage(JSON.stringify(params), 'http://127.0.0.177:8080');
    }
  </script>
</body>
</html>
```
**window.postMessage(message, targetOrigin)**

`message`: 将要发送到其他 window的数据，在传递参数时需要使用`JSON.stringify()`方法对参数序列化

`targetOrigin`：指定哪些窗口能接收到消息事件，其值可以是字符串"`*`"（表示无限制）或者一个URI。 \
在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配`targetOrigin`提供的值，那么消息就不会被发送； 只有三者完全匹配，消息才会被发送。这个机制用来控制消息可以发送到哪些窗口； \
例如，当用`postMessage`传送密码时，这个参数就显得尤为重要，必须保证它的值与这条包含密码的信息的预期接受者的origin属性完全一致，来防止密码被恶意的第三方截获。 \
如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有确切值的`targetOrigin`，而不是`*`。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点。

A域名页面接收数据

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <iframe id="if_main" name="if_main" src="http://127.0.0.188/b_page.html" style="display:none;"></iframe>

  <script type="text/javascript">
    // 主页面监听message事件,
    window.addEventListener('message', (e)=>{
      let data = e.data;
    }, false);
  </script>
</body>
</html>
```

2、B域名提供数据页面 *http://127.0.0.188/b_page.html*

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>

  <iframe id="if_main" name="if_main" src="http://127.0.0.177:8080/shareUser.html?action=login&userName=admin&userPassword=123456" style="display:none;"></iframe>
</body>
</html>
```

# 三、window.postMessage + iframe

1.A域名页面接收数据

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <iframe id="if_main" name="if_main" src="http://127.0.0.188/b_page.html" style="display:none;"></iframe>

  <script type="text/javascript">
    // 主页面监听message事件,
    window.addEventListener('message', (e)=>{
      let data = e.data;
    }, false);
  </script>
</body>
</html>
```

2、B域名提供数据页面 *http://127.0.0.188/b_page.html*

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>

  <script type="text/javascript">
    // 登录状态信息
    let userInfo = {
      userName: 'admin',
      userPassword: '123456'
    }

    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    window.parent.postMessage(userInfo, 'http://127.0.0.177:8080');
  </script>
</body>
</html>
```
