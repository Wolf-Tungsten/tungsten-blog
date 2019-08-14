# Android 菜单

为了方便使用菜单，首先在res/values/string.xml文件中添加几个菜单所需要显示的字符串：

```xml
<resources>
    <string name="app_name">查询GitHub</string>
    <string name="search">搜索</string>
</resources>
```

然后在res目录下新建一个menu文件夹，并写一个菜单文件menu.xml：

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <item
        android:id="@+id/action_search"
        android:orderInCategory="1"
        app:showAsAction="never"
        android:title="@string/search"
        />
</menu>
```

比较重要的属性是`app:showAsAction` ,可选项是`ifRoom`，如果选择ifRoom则当标题栏有富余空间时，这个菜单项会变成标题栏上的一个按钮。

接下来需要再活动中添加菜单，首先重写`onCreateOptionsMenu` 方法：

```Kotlin
 override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.menu,menu)
        return super.onCreateOptionsMenu(menu)
 }
```

注意在kotlin中不需要使用getMenuInflater，menuInflater直接被当做一个成员使用。

添加菜单的回调方法：

```kotlin
override fun onOptionsItemSelected(item: MenuItem?): Boolean {
        if (item != null && item.itemId == R.id.action_search){
            toast("you have click me")
        }
        return super.onOptionsItemSelected(item)
}
```

