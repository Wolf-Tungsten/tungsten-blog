# Kotlin Koans 通关笔记-Conventions

## 操作符重载

Kotlin中将操作符映射到一些指定名称的函数，以重载大于小于等比较操作符为例：

| 表达式    | 对应的函数               |
| ------ | ------------------- |
| a > b  | a.compareTo(b) > 0  |
| a < b  | a.compareTo(b) < 0  |
| a >= b | a.compareTo(b) >= 0 |
| a <= b | a.compareTo(b) <= 0 |

由上表可见，如果要重载操作符，只需要对改类型添加`compareTo(b:Int):Int` 方法即可。其他操作符重载的具体方法见[operator overloading](http://kotlinlang.org/docs/reference/operator-overloading.html)。

该题目正确解法：

```kotlin
data class MyDate(val year: Int, val month: Int, val dayOfMonth: Int) : Comparable<MyDate> {
    override fun compareTo(b:MyDate) = when{
        year != b.year -> year-b.year
        month != b.month -> month-b.month
        else -> dayOfMonth - b.dayOfMonth
    }
}
```

## 区间（Range）

区间的使用方法比较简单，直接看几个例子：

```kotlin
if (i in 1..10) { // equivalent of 1 <= i && i <= 10
    println(i)
}
```

```kotlin
for (i in 1..4) print(i) // prints "1234"

for (i in 4..1) print(i) // prints nothing
```

```kotlin
for (i in 4 downTo 1) print(i) // prints "4321"
```

```kotlin
for (i in 1..4 step 2) print(i) // prints "13"

for (i in 4 downTo 1 step 2) print(i) // prints "42"
```

```kotlin
for (i in 1 until 10) { // i in [1, 10), 10 is excluded
     println(i)
}
```

自己定义一个区间类，重点是实现contains方法：

```kotlin
class DateRange(val start: MyDate, val endInclusive: MyDate)
{
    operator fun contains(d:MyDate) :Boolean = start <= d && d <= endInclusive
}


fun checkInRange(date: MyDate, first: MyDate, last: MyDate): Boolean {
    return date in DateRange(first, last)
}
```

## For循环的新特性

如果一个类提供迭代器iterator，则可以被for循环迭代：

```kotlin
data class MyDate(val year: Int, val month: Int, val dayOfMonth: Int) : Comparable<MyDate> {
    override fun compareTo(other: MyDate) = when {
        year != other.year -> year - other.year
        month != other.month -> month - other.month
        else -> dayOfMonth - other.dayOfMonth
    }
}

operator fun MyDate.rangeTo(other: MyDate) = DateRange(this, other)

class DateRange(val start: MyDate, val end: MyDate): Iterable<MyDate>{
    override fun iterator(): Iterator<MyDate> = DateIterator(this)
}

class DateIterator(val dateRange:DateRange) : Iterator<MyDate> {
    var current: MyDate = dateRange.start
    override fun next(): MyDate {
        val result = current
        current = current.nextDay()
        return result
    }
    override fun hasNext(): Boolean = current <= dateRange.end
}

fun iterateOverDateRange(firstDate: MyDate, secondDate: MyDate, handler: (MyDate) -> Unit) {
    for (date in firstDate..secondDate) {
        handler(date)
    }
}
```

首先实现DateIterator继承`Iterator<MyDate>` ，必要的方法是`next()`和`hasNext()` ;

然后让 DateRange继承`Iterable<MyDate>` ，重写iterator方法；

就可以用了（好麻烦）。

## 拆包声明 Destructuring Declaration

先看一个例子：

```kotlin
val (name, age) = person 
```

实际上内部的实现方法是：

```kotlin
val name = person.component1()
val age = person.component2()
```

可以给一个类实现`componentN()` 方法，但是要记得加`operator ` 关键字。

可以用来让函数返回多个参数：

```kotlin
data class Result(val result: Int, val status: Status)
fun function(...): Result {
    // computations
    
    return Result(result, status)
}

// Now, to use this function:
val (result, status) = function(...)
```

也可以用于Lambda表达式。更多内容见[Destructuring Declarations](http://kotlinlang.org/docs/reference/multi-declarations.html)。

## Invoke方法

如果一个类实现了Invoke方法，它就可以像函数一样被调用：

```kotlin
class Invokable {
    var numberOfInvocations: Int = 0
        private set
    operator fun invoke(): Invokable {
        numberOfInvocations++
        return this
    }
}

fun invokeTwice(invokable: Invokable) = invokable()()
```

