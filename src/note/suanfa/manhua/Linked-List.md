---
title: 链表
author: Ms.Yu
category: 数据结构
tag:
  - 漫画算法
  - 链表
star: 9
sticky: 9
---

**链表**是一种在物理上非连续、非顺序的数据结构，由若干节点所组成。

**单向链表的结构**

![image-20221212203616318](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221212203616318.png)

**双向链表的结构**

![image-20221213181924558](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221213181924558.png)

### 链表的基本操作

**1. 查找节点**

在查找元素时，链表不像数组那样可以通过下标快速进行定位，只能从头开始向后一个一个节点逐一查找。

例如查找链表中的第三个节点

1. 将查找的指针定位到头节点
2. 根据头节点的 next 指针定位到第 2 个节点
3. 根据第 2 个节点的 next 指针定位到第 3 个节点，查询完毕

**2. 更新节点**

如果不考虑链表的查找过程，更新节点的过程就会像数组那样简单，直接把旧数据替换成新数据即可。

**3. 插入节点**

插入节点分为三种情况

- **头部插入**
  - 把新节点的 next 指针指向原来的头节点
  - 把新节点变成链表的头节点
- **中间插入**
  - 把新节点的 next 指针指向插入位置的节点
  - 把插入位置的前置节点的 next 指针指向新节点
- **尾部插入**：把最后一个节点的 next 指针指向新插入的节点即可

**4. 删除元素**

删除节点同样分为 3 种情况：

- **头部删除**：把链表的头节点设为原先头节点的 next 指针即可
- **中间删除**： 把要删除的节点的前置指针指向要删除节点的下一个节点即可
- **尾部删除**：把倒数第二个节点的 next 指针指向 NULL 即可

完整代码如下

```java
package com.yu.five.test;

/**
 * @Author: yy
 * @Date: 2022/12/13 21:41
 * @Version: 1.0.0
 */
public class MyLinkedList {

    //头节点
    private Node head;
    //尾节点
    private Node last;
    //链表实际长度
    private int size;

    /**
     * 链表节点
     */
    private static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
        }
    }

    /**
     * 输出链表
     */
    public void output() {
        Node temp = head;
        while (temp != null) {
            System.out.println(temp.data);
            temp = temp.next;
        }
    }

    /**
     * 链表查找元素
     *
     * @param index 查找的位置
     */
    public Node get(int index) throws Exception {
        if (index < 0 || index > size) {
            throw new Exception("超出链表节点范围");
        }
        Node temp = head;
        for (int i = 0; i < index; i++) {
            temp = temp.next;
        }
        return temp;
    }

    /**
     * 链表插入
     *
     * @param data  插入元素
     * @param index 插入位置
     * @throws Exception
     */
    public void insert(int data, int index) throws Exception {
        if (index < 0 || index > size) {
            throw new Exception("超出链表节点范围");
        }
        Node insertNode = new Node(data);
        if (size == 0) {
            //空链表
            head = insertNode;
            last = insertNode;
        } else if (index == 0) {
            //头部插入
            insertNode.next = head;
            head = insertNode;
        } else if (index == size) {
            //插入尾部
            last.next = insertNode;
            last = insertNode;
        } else {
            Node prevNode = get(index - 1);
            prevNode.next = insertNode;
            insertNode.next = prevNode.next;
        }
        size++;
    }

    /**
     * 删除链表节点
     *
     * @param index 删除位置
     */
    public Node remove(int index) throws Exception {
        if (index < 0 || index > size) {
            throw new Exception("超出链表节点范围");
        }
        Node removeNode = null;
        if (index == 0) {
            //删除头节点
            head = head.next;
            removeNode = head;
        } else if (index == size - 1) {
            //删除尾节点
            Node prevNode = get(index - 1);
            removeNode = prevNode.next;
            prevNode.next = null;
            last = prevNode;
        } else {
            //删除中间节点
            Node prevNode = get(index - 1);
            Node nextNode = prevNode.next.next;
            removeNode = prevNode.next;
            prevNode.next = nextNode;
        }
        return removeNode;
    }

    public static void main(String[] args) throws Exception {
        MyLinkedList myLinkedList = new MyLinkedList();
        myLinkedList.insert(3, 0);
        myLinkedList.insert(7, 1);
        myLinkedList.insert(9, 2);
        myLinkedList.insert(5, 3);
        myLinkedList.insert(6, 4);
        myLinkedList.remove(0);
        myLinkedList.output();
    }
}
```
