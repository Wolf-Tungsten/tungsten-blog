# 图像平滑处理

## 常见平滑滤波器

### 归一化块滤波器

最简单的滤波器， 输出像素值是核窗口内像素值的 *均值* ( 所有像素加权系数相等)

核如下:

![K = \dfrac{1}{K_{width} \cdot K_{height}} \begin{bmatrix}    1 & 1 & 1 & ... & 1 \\    1 & 1 & 1 & ... & 1 \\    . & . & . & ... & 1 \\    . & . & . & ... & 1 \\    1 & 1 & 1 & ... & 1   \end{bmatrix}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/827ef921aef26b9b84542f020a3b55c8b1976fc4.png)

### 高斯滤波器

 高斯滤波是将输入数组的每一个像素点与 *高斯内核* 卷积将卷积和当作输出像素值。

![../../../../_images/Smoothing_Tutorial_theory_gaussian_0.jpg](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Smoothing_Tutorial_theory_gaussian_0.jpg)

假设图像是1维的,那么观察上图，不难发现中间像素的加权系数是最大的， 周边像素的加权系数随着它们远离中间像素的距离增大而逐渐减小。

2维高斯函数可以表达为 :

![G_{0}(x, y) = A  e^{ \dfrac{ -(x - \mu_{x})^{2} }{ 2\sigma^{2}_{x} } +  \dfrac{ -(y - \mu_{y})^{2} }{ 2\sigma^{2}_{y} } }](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/5b09b2a4f4ddd1d97cbb00a3f32b218afdb84117.png)

其中 ![\mu](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/2d8c833ed800824727cd7bd2fb9de1a12ad7e674.png) 为均值 (峰值对应位置)， ![\sigma](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/fa35d9fc104207e09a712110ac81612c5b279a6c.png) 代表标准差 (变量 ![x](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/26eeb5258ca5099acf8fe96b2a1049c48c89a5e6.png) 和 变量 ![y](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/092e364e1d9d19ad5fffb0b46ef4cc7f2da02c1c.png) 各有一个均值，也各有一个标准差)。

### 中值滤波器 (Median Filter)

中值滤波将图像的每个像素用邻域 (以当前像素为中心的正方形区域)像素的 **中值** 代替 。

### 双边滤波 (Bilateral Filter)

目前我们了解的滤波器都是为了 *平滑* 图像，**问题是有些时候这些滤波器不仅仅削弱了噪声， 连带着把边缘也给磨掉了。 为避免这样的情形 (至少在一定程度上 ), 我们可以使用双边滤波。 **

类似于高斯滤波器，双边滤波器也给每一个邻域像素分配一个加权系数。 这些加权系数包含两个部分, 第一部分加权方式与高斯滤波一样，第二部分的权重则取决于该邻域像素与当前像素的灰度差值。

详细的解释可以查看 [链接](http://homepages.inf.ed.ac.uk/rbf/CVonline/LOCAL_COPIES/MANDUCHI1/Bilateral_Filtering.html)

## 代码实现

```C++
#include "opencv2/imgproc/imgproc.hpp"
```

**归一化块滤波器:**

OpenCV函数 [blur](http://opencv.willowgarage.com/documentation/cpp/image_filtering.html#cv-blur) 执行了归一化块平滑操作。

```C++
for ( int i = 1; i < MAX_KERNEL_LENGTH; i = i + 2 )
    { blur( src, dst, Size( i, i ), Point(-1,-1) );
     
```

我们输入4个实参 (详细的解释请参考 Reference):

- *src*: 输入图像
- *dst*: 输出图像
- *Size( w,h )*: 定义内核大小(  *w* 像素宽度， *h* 像素高度)
- *Point(-1, -1)*: 指定锚点位置(被平滑点)， 如果是负值，取核的中心为锚点。

**高斯滤波器:**

OpenCV函数 [GaussianBlur](http://opencv.willowgarage.com/documentation/cpp/image_filtering.html#cv-gaussianblur) 执行高斯平滑 :

```
for ( int i = 1; i < MAX_KERNEL_LENGTH; i = i + 2 )
    { GaussianBlur( src, dst, Size( i, i ), 0, 0 );
      if( display_dst( DELAY_BLUR ) != 0 ) { return 0; } }

```

> 我们输入4个实参 (详细的解释请参考 Reference):
>
> > - *src*: 输入图像
> > - *dst*: 输出图像
> > - *Size(w, h)*: 定义内核的大小(需要考虑的邻域范围)。  ![w](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/9ee4b825a2e36ae093ed7be5e4851ef453b34914.png) 和 ![h](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/8189a5b5a0917b8c93350827be4038af1839139d.png) 必须是正奇数，否则将使用 ![\sigma_{x}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/4197cbadaac3abce31a009bf2a2071d782c25582.png) 和 ![\sigma_{y}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/b127c87337cd5bebac3425548ce3b87508d62fdf.png) 参数来计算内核大小。
> > - ![\sigma_{x}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/4197cbadaac3abce31a009bf2a2071d782c25582.png): x 方向标准方差， 如果是 ![0](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/bc1f9d9bf8a1b606a4188b5ce9a2af1809e27a89.png) 则 ![\sigma_{x}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/4197cbadaac3abce31a009bf2a2071d782c25582.png) 使用内核大小计算得到。
> > - ![\sigma_{y}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/b127c87337cd5bebac3425548ce3b87508d62fdf.png): y 方向标准方差， 如果是 ![0](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/bc1f9d9bf8a1b606a4188b5ce9a2af1809e27a89.png) 则 ![\sigma_{y}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/b127c87337cd5bebac3425548ce3b87508d62fdf.png) 使用内核大小计算得到。.

**中值滤波器:**

OpenCV函数 [medianBlur](http://opencv.willowgarage.com/documentation/cpp/image_filtering.html#cv-medianblur) 执行中值滤波操作:

```
for ( int i = 1; i < MAX_KERNEL_LENGTH; i = i + 2 )
    { medianBlur ( src, dst, i );
      if( display_dst( DELAY_BLUR ) != 0 ) { return 0; } }

```

我们用了3个参数:

- *src*: 输入图像
- *dst*: 输出图像, 必须与 *src* 相同类型
- *i*: 内核大小 (只需一个值，因为我们使用正方形窗口)，必须为奇数。

**双边滤波器**

OpenCV函数 [bilateralFilter](http://opencv.willowgarage.com/documentation/cpp/image_filtering.html#cv-bilateralfilter) 执行双边滤波操作:

```
for ( int i = 1; i < MAX_KERNEL_LENGTH; i = i + 2 )
    { bilateralFilter ( src, dst, i, i*2, i/2 );
      if( display_dst( DELAY_BLUR ) != 0 ) { return 0; } }

```

我们使用了5个参数:

- *src*: 输入图像
- *dst*: 输出图像
- *d*: 像素的邻域直径
- ![\sigma_{Color}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/8baeea6cf3cdd750050548737f2c561c2845147f.png): 颜色空间的标准方差
- ![\sigma_{Space}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/a3e26b1e555177e1a2be6df1bd1dbfeaf45c4448.png): 坐标空间的标准方差(像素单位)

**************

# 腐蚀与膨胀

## 膨胀与腐蚀的原理

### 膨胀

将图像与任意形状的内核（通常为正方形或者圆形）进行卷积。

内核B内有一个可定义的锚点

进行膨胀操作时，内核B划过图像，将内核B划过图像，将内核b覆盖区域最大值作为锚点处像素的值。显然这个操作会让图像亮部扩展。所以膨胀实际是亮部膨胀。

### 腐蚀

腐蚀与膨胀相反，不过是取区域内最小值作为锚点的值。

## 代码实现

### 腐蚀

```C++
 erode( src, erosion_dst, element );
```

- `src` 代表原图像
- `erosion_dst`代表输出的图像
- `element` 代表腐蚀操作的内核。如果不指定，其默认是一个3*3的矩阵。

### 膨胀

```C++
dilation( src, erosion_dst, element );
```

- `src` 代表原图像
- `erosion_dst`代表输出的图像
- `element` 代表膨胀操作的内核。如果不指定，其默认是一个3*3的矩阵。

### 内核的设置

```c++
Mat element = getStructuringElement( erosion_type,
 					Size( 2*erosion_size + 1, 2*erosion_size+1 ),
					Point( erosion_size, erosion_size ) );
```

通过 `getStructuringElement` 来定义操作内核，

第一个参数有三个常量值：

- `MORPH_RECT` 内核为矩形
- `MORPH_CROSS` 内核为交叉形
- `MORPH_ELLIPSE` 内核为椭圆形

************************************

# 更多形态学操作

## 常见操作和原理

### 开运算

开运算是通过先腐蚀再膨胀实现的，能过排除小团块的物体。

![dst = open( src, element) = dilate( erode( src, element ) )](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/db7b4c512c715fd8c98c9eb7ef280243550770db.png)

![Opening](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Morphology_2_Tutorial_Theory_Opening.png)

### 闭运算

闭运算是通过先膨胀再腐蚀实现的，能排除小型黑洞。

![dst = close( src, element ) = erode( dilate( src, element ) )](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/79308d2c2365645f1ad5f2158a28f3b651b2bba4.png)

![Closing example](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Morphology_2_Tutorial_Theory_Closing.png)

### 形态梯度

膨胀图和腐蚀图之差

![dst = morph_{grad}( src, element ) = dilate( src, element ) - erode( src, element )](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/64532c62837e670a0fe7088ea5766d34c984915e.png)

![Gradient](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Morphology_2_Tutorial_Theory_Gradient.png)



### 顶帽

原图像与开运算结果图之差

![dst = tophat( src, element ) = src - open( src, element )](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/7017f33204d4d9a80e7c08e74732fb7425b9a3f4.png)

![Top Hat](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Morphology_2_Tutorial_Theory_TopHat.png)

### 黑帽

闭运算结果与原图之差

![dst = blackhat( src, element ) = close( src, element ) - src](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/e45f9b0c3379529b821fa16a98464195272de1cd.png)

![Black Hat](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Morphology_2_Tutorial_Theory_BlackHat.png)

## 代码操作

```C++
morphologyEx( src, dst, operation, element );
```

- `src` 原图像
- `dst` 输出图像
- `operation` 需要运行的形态学操作
  - 开运算： `MORPH_OPEN`
  - 闭运算： `MORPH_CLOSE`
  - 形态梯度： `MORPH_GRADIENT` 
  - 顶帽： `MORPH_TOPHAT`
  - 黑帽： `MORPH_BLACKHAT`
- `element` 内核

*******

# 高斯金字塔

![Pyramid figure](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Pyramids_Tutorial_Pyramid_Theory.png)

是进行图像缩放的一种方法。

### 向上采样

```
pyrUp( tmp, dst, Size( tmp.cols*2, tmp.rows*2 )

```

函数 [pyrUp](http://opencv.willowgarage.com/documentation/cpp/imgproc_image_filtering.html#cv-pyrup) 接受了3个参数:

- *tmp*: 当前图像， 初始化为原图像 *src* 。
- *dst*: 目的图像( 显示图像，为输入图像的两倍)
- *Size( tmp.cols\*2, tmp.rows*2 )* : 目的图像大小， 既然我们是向上采样， [pyrUp](http://opencv.willowgarage.com/documentation/cpp/imgproc_image_filtering.html#cv-pyrup) 期待一个两倍于输入图像( *tmp* )的大小。

### 向下采样

```
pyrDown( tmp, dst, Size( tmp.cols/2, tmp.rows/2 )

```

类似于 [pyrUp](http://opencv.willowgarage.com/documentation/cpp/imgproc_image_filtering.html#cv-pyrup), 函数 [pyrDown](http://opencv.willowgarage.com/documentation/cpp/imgproc_image_filtering.html#cv-pyrdown) 也接受了3个参数:

- *tmp*: 当前图像， 初始化为原图像 *src* 。
- *dst*: 目的图像( 显示图像，为输入图像的一半)
- *Size( tmp.cols/2, tmp.rows/2 )* :目的图像大小， 既然我们是向下采样， [pyrDown](http://opencv.willowgarage.com/documentation/cpp/imgproc_image_filtering.html#cv-pyrdown) 期待一个一半于输入图像( *tmp*)的大小。


- 注意输入图像的大小(在两个方向)必须是2的冥，否则，将会显示错误。

***********

# 基本阈值操作

![Threshold Binary](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Threshold_Tutorial_Theory_Base_Figure.png)

## 常见阈值化操作

### 二进制阈值化

![\texttt{dst} (x,y) =  \fork{\texttt{maxVal}}{if $\texttt{src}(x,y) > \texttt{thresh}$}{0}{otherwise}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/78fda905d5dd8210a01906247514a67d8763407c.png)

![Threshold Binary](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Threshold_Tutorial_Theory_Binary.png)

### 反二进制阈值化

![\texttt{dst} (x,y) =  \fork{0}{if $\texttt{src}(x,y) > \texttt{thresh}$}{\texttt{maxVal}}{otherwise}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/86b664329c208ff89854226e992d9e9f3f6a0697.png)

![Threshold Binary Inverted](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Threshold_Tutorial_Theory_Binary_Inverted.png)

### 截断阈值化

![\texttt{dst} (x,y) =  \fork{\texttt{threshold}}{if $\texttt{src}(x,y) > \texttt{thresh}$}{\texttt{src}(x,y)}{otherwise}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/0f3cd4f2207fe9992e698c2699d7953453934874.png)

![Threshold Truncate](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Threshold_Tutorial_Theory_Truncate.png)

### 反阈值化0

![\texttt{dst} (x,y) =  \fork{0}{if $\texttt{src}(x,y) > \texttt{thresh}$}{\texttt{src}(x,y)}{otherwise}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/2c112979b15dafc432c64bd20405ae2b3e64f149.png)

![Threshold Zero Inverted](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Threshold_Tutorial_Theory_Zero_Inverted.png)

```C++
/* 0: 二进制阈值
     1: 反二进制阈值
     2: 截断阈值
     3: 0阈值
     4: 反0阈值
   */threshold_type

threshold( src_gray, dst, threshold_value, max_BINARY_value,threshold_type );
//threshold_value表示阈值
//max_BINARY_value灰度图像超过阈值的像素设置为指定值
```

***************************

# 自定义线性滤波

例如使用归一块化滤波器

![K = \dfrac{1}{3 \cdot 3} \begin{bmatrix}1 & 1 & 1  \\1 & 1 & 1  \\1 & 1 & 1\end{bmatrix}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/230fd8edf0309eba70ed0dfa73c769564bae1f04.png)

首先定义用于滤波的核

```
kernel = Mat::ones( kernel_size, kernel_size, CV_32F )/ (float)(kernel_size*kernel_size);
```

调用滤波函数

```C++
filter2D(src, dst, ddepth , kernel, anchor, delta, BORDER_DEFAULT );
```

*src*: 源图像

*dst*: 目标图像

*ddepth*: *dst* 的深度。若为负值（如 ![-1](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/bae5aba07d37ff6ff813107e76260fb31ad5794e.png) ），则表示其深度与源图像相等。

*kernel*: 用来遍历图像的核

*anchor*: 核的锚点的相对位置，其中心点默认为 *(-1, -1)* 

*delta*: 在卷积过程中，该值会加到每个像素上。默认情况下，这个值为 ![0](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/bc1f9d9bf8a1b606a4188b5ce9a2af1809e27a89.png) 

*BORDER_DEFAULT*: 这里我们保持其默认值，更多细节将在其他教程中详解

************

# 为图像添加边界

```C++
copyMakeBorder( src, dst, top, bottom, left, right, borderType, value );
```

解释参数：

1. *src*: 原图像

2. *dst*: 目标图像

3. *top*, *bottom*, *left*, *right*: 各边界的宽度，此处定义为原图像尺寸的5%。

4. *borderType*: 边界类型，此处可以选择常数边界或者复制边界。

5. *value*: 如果 *borderType* 类型是 *BORDER_CONSTANT*, 该值用来填充边界像素。

   如果borderType类型是BORDER_REPLICATE，则复制图像边界。

******

# Sobel导数

http://www.opencv.org.cn/opencvdoc/2.3.2/html/doc/tutorials/imgproc/imgtrans/sobel_derivatives/sobel_derivatives.html

************

# Laplace算子

边缘部分求二阶导数可能为0

![Second derivative](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Laplace_Operator_Tutorial_Theory_ddIntensity.jpg)

当然非边缘处可能也会出现二阶导数为0的情况，要想办法排除。

一个使用laplace算子的例子：

- 载入图像，转化为灰度，高斯模糊降噪

  ```C++
  GaussianBlur( src, src, Size(3,3), 0, 0, BORDER_DEFAULT );
  cvtColor( src, src_gray, CV_RGB2GRAY );使用Laplace算子进行计算
  Laplacian( src_gray, dst, ddepth, kernel_size, scale, delta, BORDER_DEFAULT );
  src_gray: 输入图像。
  dst: 输出图像
  ddepth: 输出图像的深度。 因为输入图像的深度是 CV_8U ，这里我们必须定义 ddepth = CV_16S 以避免外溢。
  kernel_size: 内部调用的 Sobel算子的内核大小，此例中设置为3。
  scale, delta 和 BORDER_DEFAULT: 使用默认值。
  ```

- 使用laplace算子

- ```
  Laplacian( src_gray, dst, ddepth, kernel_size, scale, delta, BORDER_DEFAULT );
  ```

*************

# Canny算子

```C++
Canny( detected_edges, detected_edges, lowThreshold, lowThreshold*ratio, kernel_size );
```

- *detected_edges*: 原灰度图像
- *detected_edges*: 输出图像 (支持原地计算，可为输入图像)
- *lowThreshold*: 低阈值
- *highThreshold*: 设定为低阈值的3倍 (根据Canny算法的推荐)
- *kernel_size*: 设定为 3 (Sobel内核大小，内部使用)

************

# 霍夫变换检测直线

![Polar plot of the family of lines for three points](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Hough_Lines_Tutorial_Theory_2.jpg)

- 加载图片

- 用Canny算子检测边缘

- 执行标准霍夫线变换

  ```C++
  vector<Vec2f> lines;
  HoughLines(dst, lines, 1, CV_PI/180, 100, 0, 0 );
  ```

  - *dst*: 边缘检测的输出图像. 它应该是个灰度图 (但事实上是个二值化图)
  - *lines*: 储存着检测到的直线的参数对 ![(r,\theta)](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/f07080129914ac008f0eb45ed5f7efa28bb1e7c6.png) 的容器 * *rho* : 参数极径 ![r](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/b55ca7a0aa88ab7d58f4fc035317fdac39b17861.png) 以像素值为单位的分辨率. 我们使用 **1** 像素.
  - *theta*: 参数极角 ![\theta](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/52e8ed7a3ba22130ad3984eb2cd413406475a689.png) 以弧度为单位的分辨率. 我们使用 **1度** (即CV_PI/180)
  - *threshold*: 要”*检测*” 一条直线所需最少的的曲线交点
  - *srn* and *stn*: 参数默认为0. 查缺OpenCV参考文献来获取更多信息.

- ```C++
  for( size_t i = 0; i < lines.size(); i++ )
  {
    float rho = lines[i][0], theta = lines[i][1];
    Point pt1, pt2;
    double a = cos(theta), b = sin(theta);
    double x0 = a*rho, y0 = b*rho;
    pt1.x = cvRound(x0 + 1000*(-b));
    pt1.y = cvRound(y0 + 1000*(a));
    pt2.x = cvRound(x0 - 1000*(-b));
    pt2.y = cvRound(y0 - 1000*(a));
    line( cdst, pt1, pt2, Scalar(0,0,255), 3, CV_AA);
  }//从极坐标绘制直线的循环
  ```

  ### 统计概率霍夫线变换

  ```c++
  vector<Vec4i> lines;
  HoughLinesP(dst, lines, 1, CV_PI/180, 50, 50, 10 );
  ```

  - *dst*: 边缘检测的输出图像. 它应该是个灰度图 (但事实上是个二值化图) * *lines*: 储存着检测到的直线的参数对 ![(x_{start}, y_{start}, x_{end}, y_{end})](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/baee84de274f174bbcc7d67e86f0dea7b49a0af9.png) 的容器
  - *rho* : 参数极径 ![r](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/b55ca7a0aa88ab7d58f4fc035317fdac39b17861.png) 以像素值为单位的分辨率. 我们使用 **1** 像素.
  - *theta*: 参数极角 ![\theta](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/52e8ed7a3ba22130ad3984eb2cd413406475a689.png) 以弧度为单位的分辨率. 我们使用 **1度** (即CV_PI/180)
  - *threshold*: 要”*检测*” 一条直线所需最少的的曲线交点 * *minLinLength*: 能组成一条直线的最少点的数量. 点数量不足的直线将被抛弃.
  - *maxLineGap*: 能被认为在一条直线上的亮点的最大距离.

  ```C++
  for( size_t i = 0; i < lines.size(); i++ )
  {
    Vec4i l = lines[i];
    line( cdst, Point(l[0], l[1]), Point(l[2], l[3]), Scalar(0,0,255), 3, CV_AA);
  }
  ```

***********

# 直方图专题

### 什么是直方图

- 直方图是图像中像素强度分布的图形表达方式.

- 它统计了每一个强度值所具有的像素个数.

- 直方图是对数据集合的统计，并将统计结果分布在预定的bins中。

- 数据不仅仅是灰度值，也可以是任何能有效描述图像的特征

- ![../../../../../_images/Histogram_Calculation_Theory_Hist0.jpg](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Histogram_Calculation_Theory_Hist0.jpg)

- ![\begin{array}{l}[0, 255] = { [0, 15] \cup [16, 31] \cup ....\cup [240,255] } \\range = { bin_{1} \cup bin_{2} \cup ....\cup bin_{n = 15} }\end{array}](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/math/c73157b35da93244fa5489fc51b92217c199bea7.png)

- ![../../../../../_images/Histogram_Calculation_Theory_Hist1.jpg](http://www.opencv.org.cn/opencvdoc/2.3.2/html/_images/Histogram_Calculation_Theory_Hist1.jpg)

  - dims表示要统计的特征数目，比如灰度值、梯度等等
  - bins表示特征空间的子区段数目，上面的例子中bins =16
  - range表示每个特征空间的取值范围，上图range = 【0，255】
  - 如果统计两个特征，直方图就是三维的，x、y表示一个特征，z表示调入binx和biny的数量

- `split`函数用于拆分图像的通道

  ```C++
  vector<Mat> rgb_planes;
  split(src, rgb_planes);
  ```

  上面的操作吧src图像拆分成了 `rgb_planes[0]` `rgb_planes[1]` `rgb_planes[2] ` 三幅图像。

计算直方图