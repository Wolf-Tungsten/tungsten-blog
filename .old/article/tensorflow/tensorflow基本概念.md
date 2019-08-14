# TensorFlow基本概念

### TensorFlow计算模型：计算图

TensorFlow通过计算图来表示计算，每个计算都是计算图上的一个节点，利用节点之间的连线来表示计算的依赖关系。TensorFlow程序一般分为两个阶段：第一个阶段定义所有的计算，第二个阶段为执行计算。

**一般会采用 `import tensorflow as tf` 的方式来简化代码**

系统会维护一个默认的计算图，可以通过 `tf.get_default_graph()` 来获取默认计算图，每一个张量都有所属的计算图，可以通过它的graph来获取其所属的计算图。除了使用默认的计算图，还可以通过 `tf.Graph()` 来获得一个新的计算图， **不同计算图上的张量和运算都不会共享**。

计算图可以通过 `tf.Graph.device()` 函数来指定运算的设备。计算图内部可以使用集合来管理资源，可以使用 `tf.add_to_collection` 函数将资源添加到集合中，然后通过 `tf.get_collection` 获取一个集合中的所有资源。同时TensorFlow还管理了一些常用集合（此处有一张表P42）

### TensorFlow数据模型：张量

TensorFlow程序中所有的数据都通过张量(tensor)的形式来表示，张量可以被理解为多维数组，零阶张量就是一个标量。但是实际上TensorFlow中的张量中并不实际保存数组，而是对运算结果的引用。

```python
import tensorflow as tf

a = tf.constant([1.0, 2.0], name='a')
b = tf.constant([2.0, 3.0], name='b')
result = tf.add(a, b, name="my_add")
print(result)
```

以上代码运行后输出：

> Tensor("my_add:0", shape=(2,), dtype=float32)

可以看出每个张量中保存三个属性：name、shape、dtype。

- name：张量的唯一标识符，同时描述了张量是如何计算出来的。计算图上每个节点代表了一个计算，计算的结果就保存在张量中，张量和计算节点的结果是对应的，一般采用`node:src_output`的格式，`my_add:0`表示 `my_add` 节点的第一个输出。
- shape：描述了张量的维度信息。 `shape(2,)` 表示这个张量是一个长度为2的一维数组。
- type：每个张量会有唯一的类型，TensorFlow会检查运算的类型，如果类型不符则会报错。 `a = tf.constant([1,2], name='a', dtype=tf.float32)` 明确将 `a` 定义成32位浮点数。TensorFlow支持14种不同类型，包括实数（ `tf.float32` `tf.float64` ）、整数（int8、int16、int32、int64、uint8）、布尔型（bool）、复数（complex64、complex128）。

张量的主要用途是：对中间计算结果的引用、计算图构建完成后获得计算结果。

### TensorFlow运行模型：会话

使用会话有两种模式，第一种模式需要明确生成和结束会话

```Python
#创建会话
sess = tf.Session()
#获取关心的结果
sess.run(...)
#结束会话
sess.close()
```

第二种方式是使用Python的上下文管理器来管理会话

```python
with tf.Session as sess:
	sess.run(...)
```

第二种方法可以自动回收会话，防止意外的资源泄露

可以指定默认会话，在会话中使用tf.Tensor.eval函数来计算一个张量的取值。

可以使用ConfigProto配置需要的会话：

```python
config = tf.ConfigProto(allow_soft_placement=True,
						log_device_placement=True)
sess2 = tf.Session(config=config)
```

通过设置 `allow_soft_placement` 可以自动调度不能再GPU上进行的计算到CPU上进行，而不是报错。 `log_device_placement` 在置为True的情况下会记录所有计算的节点信息，生产环境下可以将其置为False来减少日志量。

