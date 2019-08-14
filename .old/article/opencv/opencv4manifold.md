# 在Manifold上配置CUDA/OpenCV

不得不说，好好的TK1被大疆改成Manifold真的是难受至极——各种不能更新。但是生活还是要继续，所以记录一下给Manifold安装CUDA支持以及OpenCV的过程。

**该过程只保证适配Ubuntu 14.04 R21.4系统（也就是妙算出厂预装的系统）**

操作之前请查看版本号：

```Bash
sudo -s
uname -m && cat /etc/*release
```

输出信息包含 `R21 (release), REVISION:4.0`则表示适用。

### 安装CUDA

[下载CUDA-Toolkit](http://pan.baidu.com/s/1slmCA7N,'下载CUDA安装包') [密码:krom ]，进入到安装包所在路径，依次执行以下命令：

```bash
dpkg -i cuda-repo-l4t-r21.3-6-5-local_6.5-50_armhf.deb
sudo apt-add-repository universe
sudo apt-get update
sudo apt-get install cuda-toolkit-6-5
```

添加用户组:

```bash
sudo usermod -a -G video $USER
```

添加环境变量：

```Bash
echo "export PATH=/usr/local/cuda/bin:$PATH" >> ~/.bashrc
echo "export LD_LIBRARY_PATH=/usr/local/cuda/lib:$LD_LIBRARY_PATH" >> ~/.bashrc
source ~/.bashrc
```

检查是否安装成功：

```Bash
nvcc -V
```

应出现nvcc的版本信息。



### 安装OpenCV

补全依赖库：

```Bash
基本的g++编译器和cmake
    sudo apt-get install build-essential make cmake cmake-curses-gui g++
输入输出库
    sudo apt-get install libavformat-dev libavutil-dev libswscale-dev
Video4Linux摄像头模块
    sudo apt-get install libv4l-dev
Eigen3模块
    sudo apt-get install libeigen3-dev
OpenGL开发模块（并不是OpenGL全体）
    sudo apt-get install libglew1.6-dev
GTK库函数
    sudo apt-get install libgtk2.0-dev
```

如果需要使用python则记得安装numpy

[下载OpenCV](http://pan.baidu.com/s/1dEHmZrr,"OpenCV" ) [密码:4pc0]

安装opencv4tegra：

```bash
sudo dpkg -i libopencv4tegra-repo_l4t-r21_2.4.10.1_armhf.deb
sudo apt-get update
sudo apt-get install libopencv4tegra libopencv4tegra-dev
```

在OpenCV官网下载源码包进行编译安装：

```Bash
$ cd  /YOUR_PATH_OPENCV/opencv-2.4.10/
$ mkdir build
$ cd build
$ cmake -DWITH_CUDA=ON -DCUDA_ARCH_BIN="3.2" -DCUDA_ARCH_PTX="" -DBUILD_TESTS=OFF -DBUILD_PERF_TESTS=OFF ..
$ sudo make -j4 install
```

配置环境变量：

```Bash
$ echo "# Use OpenCV and other custom-built libraries." >> ~/.bashrc
$ echo "export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib/" >> ~/.bashrc
$ source ~/.bashrc
```



### 升级CMake

在CMake官网下载源码包，解压后依次使用 `cmake .` 和 `make` 以及 `make install`即可。



