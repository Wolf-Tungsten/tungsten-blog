- JSX中的属性必须是用变量形式表示，如果指定style要用一个map

```jsx
 <img style={{width:'20px'}} src={require('./img/Logo.png')} alt=""/>
```

如果加载项目的话可以用require，也可以import进来

- 如果要消除浏览器在input被选中时候产生的默认效果（比如Chrome的黄框）添加css：

```Css
outline:none;
```

- encodeURIComponent() 函数

  作用：可把字符串作为URI 组件进行编码。其返回值URIstring 的副本，其中的某些字符将被[十六进制](https://baike.baidu.com/item/%E5%8D%81%E5%85%AD%E8%BF%9B%E5%88%B6/4162457)的[转义序列](https://baike.baidu.com/item/%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97/2482443)进行替换。


- js对象转化为urlencode字符串

  ```javascript
  var urlEncode = function (param, key, encode) {
      if(param==null)
          return '';
      let paramStr = '';
      let t = typeof (param);
      if (t == 'string' || t == 'number' || t == 'boolean') {
          paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
      } else {
          for (var i in param) {
              var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
              paramStr += urlEncode(param[i], k, encode);
          }
      }
      return paramStr;
  };

  ```

  ​