# Kotlin Koans 通关笔记-Introduction

### Functions & lambda - 函数和lambda表达式

#### 普通的函数

简单的函数：

```kotlin
fun start(): String = "OK"
```

直接使用表达式作为返回值，基本结构：

```kotlin
fun 函数名称(参数): 返回值类型 = 返回值表达式
```

使用 **Named arguments（命名参数）** ：

```Kotlin
fun reformat(str: String,
             normalizeCase: Boolean = true,
             upperCaseFirstLetter: Boolean = true,
             divideByCamelHumps: Boolean = false,
             wordSeparator: Char = ' ') {
...
}
```

调用以上函数有多种方法：

* 直接使用默认参数：

  ```Kotlin
  reformat(str)
  ```

* 如果不想使用默认参数： 

  ```kotlin
  reformat(str, true, true, false, '_')
  ```

* 使用命名参数： 

  ```Kotlin
  reformat(str,
      normalizeCase = true,
      upperCaseFirstLetter = true,
      divideByCamelHumps = false,
      wordSeparator = '_'
  )
  ```

* 也可以只选择几个参数： 

  ```kotlin
  reformat(str, wordSeparator = '_')
  ```

如果既有位置参数（positional arguments）又有命名参数，应该把位置参数放在开头。

[需要注意：Named Arguments 这道题有个坑，json字符串逗号后面有空格]

使用 **default arguments(默认参数)** ：

```Kotlin
fun foo(name: String, number: Int=42, toUpperCase: Boolean=false) =
        (if (toUpperCase) name.toUpperCase() else name) + number

fun useFoo() = listOf(
        foo("a"),
        foo("b", number = 1),
        foo("c", toUpperCase = true),
        foo(name = "d", number = 2, toUpperCase = true)
)
```

默认参数配合命名参数使用可以有效减少函数重载的数量。

#### 高阶函数和Lambda表达式

高阶函数就是函数可以接受函数作为参数或者把函数作为返回值。

举个栗子：

```kotlin
fun <T> lock(lock: Lock, body: () -> T): T {
    lock.lock()
    try {
        return body()
    }
    finally {
        lock.unlock()
    }
}
```

上面的函数有以下几点特性：

* 接受了一个函数作为参数
* 将一个函数作为返回值返回
* 函数指定了`<T>`类型（此处类比C++的模板函数）

如果想调用函数`lock`，有以下两种方法：

使用函数引用的方式（两个冒号）

```kotlin
fun toBeSynchronized() = sharedResource.operation()
val result = lock(lock, ::toBeSynchronized)
```

或使用lambda表达式

```kotlin
val result = lock(lock, { sharedResource.operation() })
```

Lambda表达式：

```Kotlin
{ a, b -> a.length < b.length }
```

基本格式是：大括号包围，`->` 前是参数列表，后面是表达式。

在kotlin中，如果函数最后的一个参数是函数，可以将函数放在括号的外部，类似于：

```kotlin
lock (lock) {
    sharedResource.operation()
}
```

kotlin内部对map函数的定义如下：

```Kotlin
fun <T, R> List<T>.map(transform: (T) -> R): List<R> {
    val result = arrayListOf<R>()
    for (item in this)
        result.add(transform(item))
    return result
}
```

所以调用的时候：

```kotlin
val doubled = ints.map { value -> value * 2 }
```

如果一个函数只接受一个函数作为参数，那么可以省略前面的括号。

如果表达式只接受一个参数，可以使用隐式名称`it`：

```Kotlin
ints.map { it * 2 }
strings.filter { it.length == 5 }.sortedBy { it }.map { it.toUpperCase() }
```

对于不使用的变量可以使用下划线接受：

```Kotlin
map.forEach { _, value -> println("$value!") }
```

**Closure** 

匿名函数和lambda表达式可以访问其作用域下的其他变量，例如：

```kotlin
var sum = 0
ints.filter { it > 0 }.forEach {
    sum += it
}
print(sum)
```

还有一些未知的高级用法：

```Kotlin
class HTML {
    fun body() { ... }
}

fun html(init: HTML.() -> Unit): HTML {
    val html = HTML()  // create the receiver object
    html.init()        // pass the receiver object to the lambda
    return html
}


html {       // lambda with receiver begins here
    body()   // calling a method on the receiver object
}
```

### 字符串

字符串的每个字符可以通过下标访问 `s[i]` ，或者被for循环迭代：

```kotlin
for (c in str) {
    println(c)
}
```

可以包含转义字符，使用三个双引号包围的字符不转义：

```kotlin
val text = """
    for (c in "foo")
        print(c)
"""
```

可以使用`trimMargin()` 优雅的转换字符串，例如：

```kotlin
val withoutMargin1 = """ABC
                |123
                |456""".trimMargin()
println(withoutMargin1) // ABC\n123\n456

val withoutMargin2 = """
    #XYZ
    #foo
    #bar
""".trimMargin("#")
println(withoutMargin2) // XYZ\nfoo\nbar
```

使用字符串模板：

```kotlin
val s = "abc"
val str = "$s.length is ${s.length}" // evaluates to "abc.length is 3"
```

### 类

#### 构造函数

kotlin中，类有两种构造函数，每个类可包含一个主要构造函数和一些次要构造函数，主要构造函数定义方法如下：

```kotlin
class Person constructor(firstName: String) {
}
```

如果构造函数不包含访问级别限制，那么可以省略 `constructor` 关键字：

```kotlin
class Person(firstName: String) {
}
```

构造函数本身不能包含逻辑，如果需要逻辑，可以在内部添加`init` 代码块：

```kotlin
class Customer(name: String) {
    init {
        logger.info("Customer initialized with value ${name}")
    }
}
```

主要构造器的参数可以直接用于初始化参数：

```kotlin
class Customer(name: String) {
    val customerKey = name.toUpperCase()
}
```

也可以直接在主要构造器里把对象初始化：

```kotlin
class Person(val firstName: String, val lastName: String, var age: Int) {
    // ...
}
```

kotlin里用var和val表示两种变量，其中val是不可变的

次要构造函数，使用constructor关键字标明：

```kotlin
class Person {
    constructor(parent: Person) {
        parent.children.add(this)
    }
}
```

如果有主要构造函数，则次要构造函数应该进行委托：

````Kotlin
class Person(val name: String) {
    constructor(name: String, parent: Person) : this(name) {
        parent.children.add(this)
    }
}
````

如果一个非抽象类没有声明任何构造函数，kotlin将会生成一个public的主要构造函数，如果不想要public构造函数，则应该用一个空的private构造函数代替：

```kotlin
class DontCreateMe private constructor () {
}
```

创建类的实例，注意，不需要new关键字：

```kotlin
val invoice = Invoice()
val customer = Customer("Joe Smith")
```

#### 继承

Kotlin所有的类都最终继承自Any。

如果要显式继承自某个类：

```kotlin
open class Base(p: Int)
class Derived(p: Int) : Base(p)
```

如果派生类有primary构造函数，则基类必须在此处被初始化。

如果派生类没有primary构造函数，则任何一个secondary构造函数都要显式调用基类的构造函数：

```kotlin
class MyView : View {
    constructor(ctx: Context) : super(ctx)
	constructor(ctx: Context, attrs: AttributeSet) : super(ctx, attrs)
}
```

调用时使用`super` 关键字。

只有被`open` 关键字标注的类可以被继承，被`final`关键字标注的不能继承。

重写方法的时候应使用`override` 关键字：

```kotlin
open class Base {
    open fun v() {}
    fun nv() {}
}
class Derived() : Base() {
    override fun v() {}
}
```

需要注意以下几点：

* override关键字是必须的，如果被override的方法在基类中不是open的，那么编译器会报错
* 如果一个类被标注了final，则其中不应该有open方法 
* 一个用override标记的方法默认是open的，其本身可以被后续派生类重写，如果要限制其被重写，请显式的标记final

**重写属性** 和重写方法有类似的规则：

```kotlin
open class Foo {
    open val x: Int get() { ... }
}

class Bar1 : Foo() {
    override val x: Int = ...
}
```

也可以使用一个var属性去重写一个val属性，也可以在主要构造器中重写方法：

```kotlin
interface Foo {
    val count: Int
}

class Bar1(override val count: Int) : Foo

class Bar2 : Foo {
    override var count: Int = 0
}
```

派生类调用基类的方法，使用super关键字：

```kotlin
open class Foo {
    open fun f() { println("Foo.f()") }
    open val x: Int get() = 1
}

class Bar : Foo() {
    override fun f() { 
        super.f()
        println("Bar.f()") 
    }
    
    override val x: Int get() = super.x + 1
}
```

内部类调用外部类的方法可以使用`super@Outer` :

```kotlin
class Bar : Foo() {
    override fun f() { /* ... */ }
    override val x: Int get() = 0
    
    inner class Baz {
        fun g() {
            super@Bar.f() // Calls Foo's implementation of f()
            println(super@Bar.x) // Uses Foo's implementation of x's getter
        }
    }
}
```

在kotlin中如果一个类继承自多个类（接口），并且这些类有相同的方法，那么这个方法必须被重写：

```kotlin
open class A {
    open fun f() { print("A") }
    fun a() { print("a") }
}

interface B {
    fun f() { print("B") } // interface members are 'open' by default
    fun b() { print("b") }
}

class C() : A(), B {
    // The compiler requires f() to be overridden:
    override fun f() {
        super<A>.f() // call to A.f()
        super<B>.f() // call to B.f()
    }
}
```

**抽象类**

一个类或者其中的方法可以被定义为抽象类、抽象方法，这些方法和类默认是open的：

```kotlin
open class Base {
    open fun f() {}
}

abstract class Derived : Base() {
    override abstract fun f()
}
```

### 类的属性

#### 声明属性

kotlin的类也可以包含属性，`var` 关键字声明可变的属性，`val` 关键字声明不可变的属性。

```Kotlin
class Address {
    var name: String = ...
    var street: String = ...
    var city: String = ...
    var state: String? = ...
    var zip: String = ...
}
```

如果使用一个属性：

```kotlin
fun copyAddress(address: Address): Address {
    val result = Address() // there's no 'new' keyword in Kotlin
    result.name = address.name // accessors are called
    result.street = address.street
    // ...
    return result
}
```

#### getter 和 setter

完整的声明属性的语法如下：

```kotlin
var <propertyName>[: <PropertyType>] [= <property_initializer>]
    [<getter>]
    [<setter>]
```

如果类型可以被initializer推测出来，则可忽略。

举个栗子：

```kotlin
var allByDefault: Int? // error: explicit initializer required, default getter and setter implied
var initialized = 1 // has type Int, default getter and setter
```

```kotlin
val simple: Int? // has type Int, default getter, must be initialized in constructor
val inferredType = 1 // has type Int and a default getter
```

自己修改的getter和setter：

```kotlin
var stringRepresentation: String
    get() = this.toString()
    set(value) {
        setDataFromString(value) // parses the string and assigns values to other properties
    }
```

类型可以从getter方法推测：

```Kotlin
val isEmpty get() = this.size == 0  // has type Boolean
```

如果要改变可见性：

```Kotlin
var setterVisibility: String = "abc"
    private set // the setter is private and has the default implementation

var setterWithAnnotation: Any? = null
    @Inject set // annotate the setter with Inject
```

#### 编译时常量

```Kotlin
const val SUBSYSTEM_DEPRECATED: String = "This subsystem is deprecated"

@Deprecated(SUBSYSTEM_DEPRECATED) fun foo() { ... }
```

必须是字符串或者其他原始类型。

#### Data Class

如果一个类只储存数据而不进行其他操作，可以建立数据类：

```kotlin
data class User(val name: String, val age: Int)
```

编译器自动根据primary构造器生成以下部件：

- `equals()`/`hashCode()` 
- `toString()` 按照格式 `"User(name=John, age=42)"`，
- [`componentN()` functions](https://kotlinlang.org/docs/reference/multi-declarations.html) 根据属性的顺序，
- `copy()` 负值函数。

为了确保数据类生成代码行为正确，数据类应该满足以下要求：

- 主要构造器至少包含一个参数
- 所有的主构造器函数应该包含`val`或者`var`
- 数据类不能是abstract, open, sealed或者inner;

生成的代码符合以下规则：

- 如果数据类内部显式的定义了 `equals()`, `hashCode()` 或 `toString()` ，或者在其基类中以 *final* 方式进行了实现，则这些内容不会自动生成并使用基类的实现
- 如果基类含有`componentN()` 但是不可以重写，则会报错
- 不允许自己实现`componentN()` 和 `copy()`

`copy()`方法是按照下面的方式实现的：

```kotlin
fun copy(name: String = this.name, age: Int = this.age) = User(name, age)
```

使用的栗子：

```kotlin
val jack = User(name = "Jack", age = 1)
val olderJack = jack.copy(age = 2)
```

数据类拆包：

```kotlin
val jane = User("Jane", 35) 
val (name, age) = jane
println("$name, $age years of age") // prints "Jane, 35 years of age"
```

### Null Safety 空安全

kotlin支持变量nullable：

```kotlin
var a: String = "abc"
a = null // compilation error
```

```kotlin
var b: String? = "abc"
b = null // ok
```

这时，访问变量`a` 是安全的：

```kotlin
val l = a.length
```

但是如果直接访问变量`b` 可能会带来一些问题，因为`b`有可能是null：

```kotlin
val l = b.length // error: variable 'b' can be null
```

那如果我想访问一个nullable的变量要怎么做呢？

首先，kotlin可以显式的检查一个变量是不是null：

```kotlin
val l = if (b != null) b.length else -1
```

这个语句还可以再高级一点：

```kotlin
if (b != null && b.length > 0) {
    print("String of length ${b.length}")
} else {
    print("Empty string")
}
```

第二种选项是使用 “Safe call operater”：`.?`

```kotlin
b?.length
```

这个表达式返回有效数值，如果b是null的话会返回null。返回的类型是`Int？`。

```kotlin
val listWithNulls: List<String?> = listOf("A", null)
for (item in listWithNulls) {
     item?.let { println(it) } // prints A and ignores null
}
```

也可以让表达式在变量是null的时候返回其他值，例如：

```kotlin
val l: Int = if (b != null) b.length else -1
```

当然上面的表达式还可以换个方式：

```Kotlin
val l = b?.length ?: -1
```

`?:`左侧的表达式是null时会计算并返回右侧的表达式，右侧表达式也可以用来抛出异常：

```kotlin
fun foo(node: Node): String? {
    val parent = node.getParent() ?: return null
    val name = node.getName() ?: throw IllegalArgumentException("name expected")
    // ...
}
```

如果一定要NPE：

```kotlin
val l = b!!.length
```

安全转换：

```Kotlin
val aInt: Int? = a as? Int
```

直接转换在cast的时候如果遇到null会产生异常。

让集合类可以包含null：

```kotlin
val nullableList: List<Int?> = listOf(1, 2, null, 4)
val intList: List<Int> = nullableList.filterNotNull()
```

### “智能”类型转换

#### is 和 !is

is和!is可以用来判断一个变量是不是属于某个类型：

```Kotlin
if (obj is String) {
    print(obj.length)
}

if (obj !is String) { // same as !(obj is String)
    print("Not a String")
}
else {
    print(obj.length)
}
```

在kotlin中很多时候不需要显式的进行类型转换，编译器会自动分析类型并进行转换：

```kotlin
fun demo(x: Any) {
    if (x is String) {
        print(x.length) // x is automatically cast to String
    }
}
```

如果if语句判断一个变量不符合类型并打算返回时，会进行安全的类型转换：

```kotlin
if (x !is String) return
print(x.length) // x is automatically cast to String
```

或者：

```kotlin
    // x is automatically cast to string on the right-hand side of `||`
    if (x !is String || x.length == 0) return

    // x is automatically cast to string on the right-hand side of `&&`
    if (x is String && x.length > 0) {
        print(x.length) // x is automatically cast to String
    }
```

智能转换不会发生如果编译器确认这个变量不能够在检查和使用之间进行转换。主要遵循以下规则：

- *val* local variables - always;
- *val* properties - if the property is private or internal or the check is performed in the same module where the property is declared. Smart casts aren't applicable to open properties or properties that have custom getters;
- *var* local variables - if the variable is not modified between the check and the usage and is not captured in a lambda that modifies it;
- *var* properties - never (because the variable can be modified at any time by other code).

#### "不安全的"类型转换操作符和“安全”的类型操作符：

使用as关键字进行类型转换，如果遇到不能转换的情况会抛出异常。

使用as？关键字进行类型转换，如果遇到不能转换的情况会返回null。

### 扩展函数

kotlin可以在不对一个类进行继承或者包装的情况下增加一个类的功能。就好像给一个类添加了新的成员函数，但是实际上并没有对原有的类进行修改，而只是让这个函数可以使用object.foo()的形式进行调用，在函数内部使用this关键字代表调用该方法的对象：

```Kotlin
fun MutableList<Int>.swap(index1: Int, index2: Int) {
    val tmp = this[index1] // 'this' corresponds to the list
    this[index1] = this[index2]
    this[index2] = tmp
}
val l = mutableListOf(1, 2, 3)
l.swap(0, 2) // 'this' inside 'swap()' will hold the value of 'l'
```

使用扩展函数应该注意以下几个坑：

调用函数的选用最终取决于调用对象的类型：

```kotlin
open class C

class D: C()

fun C.foo() = "c"

fun D.foo() = "d"

fun printFoo(c: C) {
    println(c.foo())
}

printFoo(D()) //输出c
```

因为上面最后使用该函数的地方对象的类型已经转换成了C，所以调用了属于C的扩展函数。

如果扩展函数和成员函数具有相同的名称，则成员函数具有更高的优先级。

和扩展函数类似，kotlin还可以扩展属性，不过必须显式的提供getter:

```kotlin
val <T> List<T>.lastIndex: Int
    get() = size - 1
```

### 对象表达式 Object Expression

有点像JavaScript中的对象，在很多时候只是需要对某个类进行轻微改变并获取其一个对象，可以使用Object表达式。

用法一：模拟匿名类

```Kotlin
window.addMouseListener(object : MouseAdapter() {
    override fun mouseClicked(e: MouseEvent) {
        // ...
    }

    override fun mouseEntered(e: MouseEvent) {
        // ...
    }
})
```

用法二：继承或者实现接口

```kotlin
open class A(x: Int) {
    public open val y: Int = x
}

interface B {...}

val ab: A = object : A(1), B {
    override val y = 15
}
```

用法三：单纯造一个对象

```Kotlin
fun foo() {
    val adHoc = object {
        var x: Int = 0
        var y: Int = 0
    }
    print(adHoc.x + adHoc.y)
}
```

object表达式只有在private或者local声明中才可以用作类型，如果用在一个public函数中，其返回类型会被作为Any或者继承的父类，例如：

```kotlin
class C {
    // Private function, so the return type is the anonymous object type
    private fun foo() = object {
        val x: String = "x"
    }

    // Public function, so the return type is Any
    fun publicFoo() = object {
        val x: String = "x"
    }

    fun bar() {
        val x1 = foo().x        // Works
        val x2 = publicFoo().x  // ERROR: Unresolved reference 'x'
    }
}
```

类似于Java的匿名内部类，object表达式中可以访问相同作用域下的其他变量，比如：

```Kotlin
fun countClicks(window: JComponent) {
    var clickCount = 0
    var enterCount = 0

    window.addMouseListener(object : MouseAdapter() {
        override fun mouseClicked(e: MouseEvent) {
            clickCount++
        }

        override fun mouseEntered(e: MouseEvent) {
            enterCount++
        }
    })
    // ...
}
```

#### “基友Object”

```Kotlin
class MyClass {
    companion object Factory {
        fun create(): MyClass = MyClass()
    }
}
```

在一个类内部声明的object可以被标注为companion，companion object中的方法可以直接通过包含它的类来调用；获取这个object可以使用`Companion` 关键字：

```kotlin
class MyClass {
    companion object {
    }
}

val x = MyClass.Companion
```







