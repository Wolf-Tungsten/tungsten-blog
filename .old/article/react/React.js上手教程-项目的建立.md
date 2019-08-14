# React.js上手教程（一）项目的建立

建立项目使用了create-react-app这个工具，安装方法（前提是你安装好了node.js和npm）：

```Bash
npm install -g create-react-app
```

接下来新建一个叫my-app的项目（命名是有要求的，比如不能包含大写字母）：

```Bash
create-react-app my-app
```

然后会获得一个这样的目录结构：

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

因为需要编译，一个项目中必须包含以下文件：

- `public/index.html` 是入口页面模板文件
- `src/index.js`是JavaScript程序入口

其他的文件可以“随心所欲不逾矩”。

让项目跑起来：

```Bash
npm start
```

此时在浏览器中访问localhost:3000就可以看到应用了。

构建项目以用于部署：

```Bash
npm build
```

到目前为止，已经走完了一个项目的必经之路，更多关于React和create-react-app的内容可以访问他们的[教程](https://facebook.github.io/react/docs/installation.html)或者[github页面](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents)。

