# CSS3 @font-face

想在页面中使用奇奇怪怪字体的解决方案(虽然我是想用思源黑体)

直接来个🌰：

```css
@font-face {
  font-family: NotoSansHans-Black;
  src:url('./font/NotoSansHans-Black.otf')format('otf')
}
@font-face {
  font-family: NotoSansHans-Bold;
  src:url('./font/NotoSansHans-Bold.otf')format('otf')
}
@font-face {
  font-family: NotoSansHans-Medium;
  src:url('./font/NotoSansHans-Medium.otf')format('otf')
}
```

在css所在相同目录下新建了一个font文件夹并储存了相关字体。

之后只要在需要的地方使用需要的字体就可以了。

```Css
#loginTitle{
  font-family: NotoSansHans-Black;
  ...
  }
```

