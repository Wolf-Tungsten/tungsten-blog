# Android活动

## 活动的基本用法

### 手动创建活动、布局、在活动中加载布局

### 使用Toast

### 使用Menu

首先在res目录下新建一个叫做main的menu文件，在main.xml文件中添加 `<item>` 标签，每个item代表菜单的一项。

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/add_item"
        android:title="Add" />
    <item
        android:id="@+id/remove_item"
        android:title="Remove"/>
</menu>
```

`android:id` 给每个菜单项唯一的标识符， `android:title` 给菜单项指定显示的名称。

接着回到FirstActivity中重写 `onCreateOptionsMenu()` 方法，AS中重写方法可以按control+O键来快速实现，编写如下代码：

```java
@Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
```

通过 `getMenuInflater()` 得到一个MenuInflater对象，再调用 `inflate()` 。方法返回true则菜单可以被显示出来，否则菜单不显示。

为了让菜单项目点击后会有反应，应该重写 `onOptionsItemSelected()` 方法：

```Java
@Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch(item.getItemId()) {
            case R.id.add_item:
                Toast.makeText(this, "You clicked Add", 										Toast.LENGTH_SHORT).show();
                break;
            case R.id.remove_item:
                Toast.makeText(this, "You clicked 											remove",Toast.LENGTH_LONG).show();
                break;
            default:

        }
        return true;
    }
```

### 销毁一个活动

在需要的地方调用finish()方法

## 使用Intent在活动之间穿梭

### 显式Intent

先构造出一个Intent对象，在调用类的 `startActivity()` 方法即可实现启动下一个活动。

```java
Intent intent = new Intent(FirstActivity.this,         									   SecondActivity.class);
startActivity(intent);
```

### 隐式Intent

可以通过设定活动的action和category，然后依据这些信息来启动活动。

首先修改AndroidManifest.xml中对于活动的设置

```xml
<activity android:name=".SecondActivity">
            <intent-filter>
                <action android:name="riku"/>
                <category 						        android:name="android.intent.category.DEFAULT"/>
            </intent-filter>
</activity>
```

然后修改Intent

```Java
 Intent intent = new Intent("riku");
 startActivity(intent);
```

由于 `android.intent.category.DEFAULT`是默认的category名称，所以此时不用指定category也能正确启动活动。只是传入了action中设定的字符串。

如果category的名称不是默认的，就需要指定category了

```xml
<activity android:name=".SecondActivity">
     <intent-filter>
          <action android:name="riku"/>
          <category android:name="android.intent.category.DEFAULT"/>
          <category android:name="miaomiaomiao"/>
     </intent-filter>
</activity>
```

添加了一个category，使用Intent的 `addCategory()` 方法

```java
Intent intent = new Intent("riku");
intent.addCategory("miaomiaomiao");
startActivity(intent);
```

就启动了对应的活动。

### More about 隐式Intent

使用隐式Intent还可以启动别的APP的活动，先来两个栗子：

- 访问浏览器

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
intent.setData(Uri.parse("https://wolf.myseu.cn"));
startActivity(intent);
```

`setData()` 方法接受一个Uri对象，可以通过给 `<intent-filter>` 标签设置 `<data>` 标签来确定活动能响应什么样的数据

| 配置内容             | 含义                          |
| ---------------- | --------------------------- |
| android:scheme   | 指定数据的协议，例如刚才的https          |
| android:host     | 指定主机名的部分，例如刚才的wolf.myseu.cn |
| android:port     | 端口号                         |
| android:path     | 位于主机名和端口号后面的部分              |
| android:mimeType | 用于指定可以处理的数据                 |

只有在data内容完全匹配时才能启动活动，但是一般的情况下不会指定过多的data，例如启动浏览器只要明确协议名称是https就可以了。

- 调起拨号应用

```Java
Intent intent = new Intent(Intent.ACTION_DIAL);
intent.setData(Uri.parse("tel:10010"));
startActivity(intent);
```

然后自定义一个活动来响应刚才浏览器的请求

```Xml
<activity android:name=".ThirdActivity">
  <intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <data android:scheme="http"/>
  </intent-filter>
</activity>
```

### 向下一个活动传递数据

基本思路是：把要传递的数据放在intent里，再下一个活动中读取intent中的数据。数据采用键值对的方式进行传递，例如，要从FirstActivity中向SecondActivity中传递数据（此处是一个字符串），然后在SecondActivity中用Toast显示出来

```java
String data = "Hello Activity！";
Intent intent =new Intent(FirstActivity.this,
SecondActivity.class);
intent.putExtra("data", data);
startActivity(intent);
```

在SecondActivity中读取时要使用对应数据类型的方法，这些方法包括 `getStringExtra()` `getBooleanExtra()` `getIntExtra()`

```java
Intent intent = getIntent();
String data = intent.getStringExtra("data");
```

### 返回数据给上一个活动

使用 `startActivityForResult()` 方法来启动活动，可以从下一个活动中获取数据

```Java
String data = "Hello Activity！";
Intent intent =new Intent(FirstActivity.this, SecondActivity.class);
startActivityForResult(intent, 1);
```

`startActivityForResult()` 方法的第二个参数是请求码，只要保证是个常量就可以。

在第二个活动中实现返回数据的逻辑

```Java
Intent intent = new Intent();
intent.putExtra("Data return", "Hello FirstActivity");
setResult(RESULT_OK, intent);
finish();
```

`setResult()` 方法接受一个整数和一个Intent，第一个整数用来向上一个活动传递完成的情况，一般只用到 `RESULT_OK` 和 `RESULT_CANCELED` 。

接下来要重写FirstActivity的onActivityResult方法

```Java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode){
            case 1:
                if(resultCode == RESULT_OK)
                {
                    String returnData = data.getStringExtra("Data return");
                    Log.d("FirstActivity",returnData);
                }
        }
}
```

## 活动的生命周期

### 活动状态

1. 运行状态：活动处于返回栈的栈顶，就是处于运行状态。此时活动用户可见，回收优先级最低
2. 暂停状态：活动不处于栈顶，但是仍然可见（例如前面出现了一个对话框）。系统也不愿意回收这种活动
3. 停止状态：活动完全不可见，就进入了停止状态。会保留其局部变量和状态，但是不完全可靠。当系统内存较低时会回收这些活动
4. 销毁状态：活动彻底被从返回栈中移除时，就变成了销毁状态。当内存不足时会优先回收这样的活动

### 活动的生存期

| 方法            | 说明                                       | 是否能事后终止？                                 | 后接                          |
| ------------- | ---------------------------------------- | ---------------------------------------- | --------------------------- |
| `onCreate()`  | 首次创建 Activity 时调用。 您应该在此方法中执行所有正常的静态设置 — 创建视图、将数据绑定到列表等等。 系统向此方法传递一个 Bundle 对象，其中包含 Activity 的上一状态，不过前提是捕获了该状态（请参阅后文的[保存 Activity 状态](https://developer.android.com/guide/components/activities.html#actstate)）。始终后接 `onStart()`。 | 否                                        | `onStart()`                 |
| `onRestart()` | 在 Activity 已停止并即将再次启动前调用。始终后接 `onStart()` | 否                                        | `onStart()`                 |
| `onStart()`   | 在 Activity 即将对用户可见之前调用。如果 Activity 转入前台，则后接 `onResume()`，如果 Activity 转入隐藏状态，则后接 `onStop()`。 | 否                                        | `onResume()` 或`onStop()`    |
|               | `onResume()`                             | 在 Activity 即将开始与用户进行交互之前调用。 此时，Activity 处于 Activity 堆栈的顶层，并具有用户输入焦点。始终后接 `onPause()`。 | 否                           |
| `onPause()`   | 当系统即将开始继续另一个 Activity 时调用。 此方法通常用于确认对持久性数据的未保存更改、停止动画以及其他可能消耗 CPU 的内容，诸如此类。 它应该非常迅速地执行所需操作，因为它返回后，下一个 Activity 才能继续执行。如果 Activity 返回前台，则后接 `onResume()`，如果 Activity 转入对用户不可见状态，则后接 `onStop()`。 | **是**                                    | `onResume()` 或`onStop()`    |
| `onStop()`    | 在 Activity 对用户不再可见时调用。如果 Activity 被销毁，或另一个 Activity（一个现有 Activity 或新 Activity）继续执行并将其覆盖，就可能发生这种情况。如果 Activity 恢复与用户的交互，则后接 `onRestart()`，如果 Activity 被销毁，则后接 `onDestroy()`。 | **是**                                    | `onRestart()`或`onDestroy()` |
| `onDestroy()` | 在 Activity 被销毁前调用。这是 Activity 将收到的最后调用。 当 Activity 结束（有人对 Activity 调用了 `finish()`），或系统为节省空间而暂时销毁该 Activity 实例时，可能会调用它。 您可以通过 `isFinishing()` 方法区分这两种情形。 | **是**                                    | *无*                         |

来自安卓官方的说明示意图：

![img](https://developer.android.com/images/activity_lifecycle.png)

### 解决活动被回收的问题

当系统内存不足的时候，部分活动会被回收。这样活动中存在的局部变量就会消失掉，很影响用户体验，Android提供了 `onSaveInstanceState()` 方法，可以以键值对的形式将一些关键的数据存储到一个Bundle对象中，这个Bundle对象就是 `onCreate()` 方法中的传入的参数。

```Java
@Override
protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putString("state_data","This data will be saved");
}
```

Bundle对象有一系列方法，例如， `putString()` 可以在Bundle中存储字符串，以此类推还有 `putInt()` 等等。

然后只要在 `onCreate()` 方法中读取Bundle中的内容就可以恢复数据了：

```java
String data = savedInstanceState.getString("state_data");
```

与此同时，Bundle对象还可以使用Intent的`putExtra()` 方法作为附加数据放置到intent中，并在下一个活动中通过 `intent.getBundleExtra()` 来读取。
## 活动的启动模式

活动启动有四种模式 **standard、singleTop、singleTask、singleInstance**，可以在AndroidManifest.xml中通过给活动指定标签 `android:launchMode` 来选择启动模式。

**standard模式** ，是默认的活动启动模式，每次都会在当前的返回栈上增添一个新的活动。

**singleTop模式**，如果要启动的活动是当前在栈顶的活动，则不会产生新的活动进栈。

**singleTask模式**，如果新的活动已经在返回栈中存在实例，则将该活动之上的所有活动出栈并销毁。

**singleInstance模式**，在活动启动时产生一个新的返回栈，这样即使有多个应用也可以共享一个任务实例。

## 关于活动的一些技巧

### 知晓当前是在哪一个活动

**基本思路** 实现一个继承自AppCompatActivity的类，让其他的类都将其作为父类，然后在这个基类的 `onCreate()` 方法中输出一个Log，就可得知究竟是哪个活动启动了。

```java
public class BaseActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("BaseActivity",getClass().getSimpleName());
    }
}
```

修改继承关系：

```java
public class NormalActivity extends BaseActivity {
	...
}
```

**运行结果**

```
07-12 19:22:16.597 14545-14545/? D/BaseActivity: MainActivity
```

### 随时随地退出程序

通过建立一个ActivityCollector类作为管理器：

```Java
public class ActivityCollector {
    public static List<Activity> activities = new ArrayList<>();

    public static void addActivity(Activity activity){
        activities.add(activity);
    }

    public static void removeActivity(Activity activity){
        activities.remove(activity);
    }

    public static void finishAll(){
        for (Activity activity:activities){
            if(!activity.isFinishing()){
                activity.finish();
            }
        }
    }
}
```

在活动的 `onCreate()` 方法中添加：

```Java
ActivityCollector.addActivity(this);
```

在活动的 `onDestroy()` 方法中添加：

```Java
ActivityCollector.removeActivity(this);
```

在需要结束整个程序的地方直接调用 `ActivityCollector.finishAll()` 就可以一键结束所有活动了。

### 给活动编写启动方法

建议给每一个活动都添加启动方法:

```Java
public static void activityStart(Context context, String data1, String data2,...){
        Intent intent = new Intent(context, NormalActivity.class);
        intent.putExtra("param1", data1);
        intent.putExtra("param2", data2);
  		...
        context.startActivity(intent);
    }
```

这样，在启动新活动的时候，只需要

```Java
NormalActivity.activityStart(FirstActivity.this,data1,data2,...);
```

就可以就启动活动了，这样可以有效提高团队的开发效率。