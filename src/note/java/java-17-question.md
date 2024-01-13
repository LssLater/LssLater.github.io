## 为什么要求日期格式化时必须使用y表示年。而不能使用Y？

yyyy表示当天所在的年；而大写的YYYY表示week in which year（JDK7之后引入的概念），意思是当天所在的周属于的年份，一周从周日开始，周六结束，只要本周跨年，YYYY返回的就是下一年。

## 为什么使用三目运算符时必须要注意类型对齐？

三目运算符condition？表达式1：表达式2中，高度注意表达式1和2在类型对齐时，可能出现因自动拆箱导致的NPE异常。

说明：以下两种场景会触发类型对齐的拆箱操作

1）表达式1或者表达式2的值只要有一个是原始类型。

2）表达式1或者表达式2的值的类型不一致，会强制拆箱升级成表示范围更大的那个类型。

反例：

```sql
Integer a = 1;
Integer b = 2;
Integer c = NULL;
Boolean flag = false;
// a*b的结果是int类型，那么c会强制拆箱成int类型，抛出NPE异常
Integer result = (flag?a*b : c)
```

**三目运算符：**

 对于条件表达式 b?x:y，先计算条件 b，然后进行判断。如果 b 的值为 true， 计算 x 的值，运算结果为 x 的值；否则，计算 y 的值，运算结果为 y 的值。一个条件 表达式从不会既计算 x，又计算 y。条件运算符是右结合的，也就是说，从右向左分 组计算。例如，a?b:c?d:e 将按 a?b:（c?d:e）执行  。

 **自动装箱与自动拆箱：**

一般我们要创建一个类的对象实例的时候，我们会这样： Class a = new Class(parameters); 

当我们创建一个 Integer 对象时，却可以这样： Integer i = 100;( 注意： 和 int i = 100; 是有区别的 ) 

实际上，执行上面那句代码的时候，系统为我们执行了： Integer i = Integer.valueOf(100); 

这里暂且不讨论这个原理是怎么实现的（何时拆箱、何时装箱），也略过普通数据 类型和对象类型的区别。

我们可以理解为，当我们自己写的代码符合装（拆）箱规范的时候，编译器就会 自动帮我们拆（装）箱。 

那么，这种不被程序员控制的自动拆（装）箱会不会存在什么问题呢？  



看一下下面的代码存在的问题：

```sql
Map<String,Boolean> map = new HashMap<String, Boolean>();
Boolean b = (map!=null ? map.get("test") : false);
 Exception in thread "main" java.lang.NullPointerException  
```

 反编译后代码如下：  

```sql
HashMap hashmap = new HashMap();
Boolean boolean1 = Boolean.valueOf(hashmap == null ? false : ((Boolean)
hashmap.get("test")).booleanValue());
```

经过分析发现问题出现在` ((Boolean)hashmap.get("test")).booleanValue()  `

```sql
hashmap.get(“test”)->null;
(Boolean)null->null;
null.booleanValue()-> 报错
```

查看反编译之后的代码，得到结论： **NPE 的原因应该是三目运算符和自动拆箱导致了空指针异常**  

根据规定，三目运算的第二、 第三位操作数的返回值类型应该是一样的，这样 才能当把一个三目运算符的结果赋值给一个变量。  

 如：Person i = a>b : i1:i2; ，就要求 i1 和 i2 的类型都必须是 Person 才行。  

 当第二，第三位操作数分别为基本类型和对象时，其中的对象 就会拆箱为基本类型进行操作.

**结论：** 由于使用了三目运算符，并且第二、第三位操作数分别是基本 类型和对象。所以对对象进行拆箱操作，由于该对象为 null，所以在拆箱过程中调用 null.booleanValue() 的时候就报了 NPE。