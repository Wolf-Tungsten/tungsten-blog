# Android基础-用户界面

* 安卓描述元素大小使用dp作为单位（density-independent pixels)

* 经常使用 `wrap_content` 使得元素节省空间

* ```XML
  <TextView
  	android:text="显示的文本"
  	android:background="#9C27B0"
  	android:textColor="#DCE775"
  	android:layout_width="wrap_content"
  	android:layout_height="wrap_content"
  	android:textSize="45sp"/>
  ```

* ```XML
  <ImageView
      android:src="@drawable/cake"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:scaleType="centerCrop"/>
  ```

  scaleType确定缩放方式

  center单纯居中，不改变图片大小

  centerCrop会压缩和拉伸

* LinearLayout

  * 使用android:orientation="horizontal|vertical"来确定布局

  * `xmlns:android="http://schemas.android.com/apk/res/android"`

    Xml name space命名空间 

  * 布局权重

    * 不声明布局权重时默认为0
    * 权重大的优先占据控件

* RelativeLayout  

  * 相对于父元素对齐时使用 `android:layout_alignParentBottom="true"` ， `android:layout_alignParentTop="true"` ， `android:layout_alignParentLeft="true"` ，

     `android:layout_alignParentRight="true"` ，

    `android:layout_centerHorizontal="true"`  

  * 使用相对兄弟元素对齐，首先要设置id： 

    `android:id="@+id/ben_text_view"` 

    然后就可以愉快的使用：

    `android:layout_toLeftOf="@id/ben_text_view"`

  * 内补外补 

    * `android:layout_marginXXXX=""`

    * `android:paddingXXXX=""`

      ​

    ​

