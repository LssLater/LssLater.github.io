---
title: 栈和队列
author: Ms.Yu
category: 数据结构
tag:
  - 漫画算法
  - 栈和队列
star: 9
sticky: 9
---

### **1. 什么是栈**

栈（stack）是一种线性数据结构，栈中的元素只能先入后出。最早进入的元素存放的位置叫做栈底，最后进入的元素存放的位置叫做栈顶。

栈既可以用数组实现，也可以用链表实现。

数组实现：

 <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214162834558.png" alt="image-20221214162834558" style="zoom: 57%;" />

链表实现：

![image-20221214163206591](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214163206591.png)

#### 1.1 栈的基本操作

**1.入栈**

入栈操作（push）就是把新元素放入栈中，只允许从栈顶放入新元素，新元素的位置将会成为新的栈顶。

 <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214161923633.png" alt="image-20221214161923633" style="zoom:50%;" />

**2.出栈**

出栈（pop）操作就是把元素从栈中弹出，只有栈顶元素才允许出栈，出栈元素的前一个元素将会成为新的栈顶。

 <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214163937562.png" alt="image-20221214163937562" style="zoom: 50%;" />

### 2. 什么是队列

队列（queue）是一种线性数据结构，不同于栈的先入后出，队列中的元素只能先入先出。队列的出口端叫做队头（front），队列的入口端叫做队尾（rear）。

队列也是既可以用数组实现，也可用链表实现。

队列的数组实现：

   <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214170429050.png" alt="image-20221214170429050" style="zoom:50%;" />

队列的链表实现：

![image-20221214170505037](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214170505037.png)

#### 2.1 队列的基本操作

**1.入队**

入队（enqueue）就是把新元素放入队列中，只允许在队尾放入元素，新元素的下一个位置将会成为新的队尾。

   <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214170852938.png" alt="image-20221214170852938" style="zoom:50%;" />

**2.出队**

出队（dequeue）操作就是把元素移出队列，只可以从队头一侧移除元素，出队元素的后一个元素将会成为新的队头。

 <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214173504114.png" alt="image-20221214173504114" style="zoom:50%;" />

那么如果一直出队，队头左边的空间将失去作用，那么队列的容量岂不是越来越小了？

可以使用**循环队列**来解决这个问题。

假设一个队列经过反复的入队和出队操作，还剩下 2 个元素，在“物理”上分布于数组的末尾位置。这时又有一个新元素将要入队。在数组不做扩容的前提下，如何让新元素入队并确定新的队尾位置呢？我们可以利用已出队元素留下的空间，让队尾指针重新指回数组的首位。

![image-20221214175105127](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214175105127.png)

一直到（队尾下标+1）%数组长度=队头下标时，代表此队列真的已经满了。需要注意的是，队尾指针指向的位置永远空出 1 位，所以队列最大容量比数组长度小 1。

完整代码如下

```

```
