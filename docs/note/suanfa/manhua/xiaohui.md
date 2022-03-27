---
title: 面试中的算法
author: Ms.Yu
category: 算法
tag:
  - 漫画算法
  - 链表
star: 9
sticky: 9
---

------

## 1、如何判断链表有环

> 题目：有一个单向链表，链表中有可能出现环，就像下图这样，那么，如何用程序来判断该链表是否为有环链表呢？

![image-20220126214140061](https://gitee.com/thirtyyy/img/raw/master/img//image-20220126214140061.png)

### 1.1 双重遍历

首先从头结点开始，依次遍历单链表中的每一个节点，每遍历一个新节点，就从头检查新节点之前的所有节点，如果发现新节点和之前的某个节点相同，则说明该节点被遍历过两次，链表有环。

```java
public class IsCycle {
 
    private static class Node {
        int data;
        Node next;
 
        public Node(int data) {
            this.data = data;
        }
    }
 
    public static boolean isCycle(Node node) {
        Node node1 = node.next;
        int i = 1;
        while (node1 != null) {
            Node node2 = node;
            int j = 0;
            while (node2 != null && j < i) {
                if (node2 == node1) {
                    return true;
                }
                j++;
                node2 = node2.next;
            }
            i++;
            node1 = node1.next;
        }
        return false;
    }
 
    public static void main(String[] args) {
        Node node1 = new Node(5);
        Node node2 = new Node(3);
        node1.next = node2;
        Node node3 = new Node(7);
        node2.next = node3;
        Node node4 = new Node(2);
        node3.next = node4;
        Node node5 = new Node(6);
        node4.next = node5;
        Node node6 = new Node(8);
        node5.next = node6;
        Node node7 = new Node(1);
        node6.next = node7;
        node7.next = node4;
 
        System.out.println(isCycle(node1));
    }
}
```

假设链表的节点数量为n，则方法1的时间复杂度为：O(n^2)，空间复杂度为O(1)。

### 1.2 哈希表

首先创建一个HashSet用来存储曾经遍历过的节点，每遍历一个节点，都用新节点同HashSet中存储的节点进行比较，如果相同，则说明链表有环。

```java
public class IsCycle {
 
    private static class Node {
        int data;
        Node next;
 
        public Node(int data) {
            this.data = data;
        }
    }
 
    public static boolean isCycle1(Node node) {
        HashSet<Node> set = new HashSet<>();
        Node node1 = node;
        while (node1 != null) {
            if (set.contains(node1)) {
                return true;
            }
            set.add(node1);
            node1 = node1.next;
        }
        return false;
    }
 
    public static void main(String[] args) {
        Node node1 = new Node(5);
        Node node2 = new Node(3);
        node1.next = node2;
        Node node3 = new Node(7);
        node2.next = node3;
        Node node4 = new Node(2);
        node3.next = node4;
        Node node5 = new Node(6);
        node4.next = node5;
        Node node6 = new Node(8);
        node5.next = node6;
        Node node7 = new Node(1);
        node6.next = node7;
        node7.next = node4;
 
        System.out.println(isCycle1(node1));
    }
}
```

### 1.3 快慢指针

首先创建两个对象引用，让它们同时指向这个链表的头节点，然后开始一个大循环，让引用1每次向后移动1个节点，引用2每次向后移动2个节点，然后比较两个引用指向的节点是否相同，如果相同，则说明链表有环。类似于数学上的追及问题，因为是环形的，如果一个比另一个的速度快，那么它们肯定会相遇。

```java
public class IsCycle {
 
    private static class Node {
        int data;
        Node next;
 
        public Node(int data) {
            this.data = data;
        }
    }
 
    public static boolean isCycle2(Node node) {
        Node node1 = node;
        Node node2 = node;
        while (node2 != null && node2.next != null) {
            node1 = node1.next;
            node2 = node2.next.next;
            if (node1 == node2) {
                return true;
            }
        }
        return false;
    }
 
    public static void main(String[] args) {
        Node node1 = new Node(5);
        Node node2 = new Node(3);
        node1.next = node2;
        Node node3 = new Node(7);
        node2.next = node3;
        Node node4 = new Node(2);
        node3.next = node4;
        Node node5 = new Node(6);
        node4.next = node5;
        Node node6 = new Node(8);
        node5.next = node6;
        Node node7 = new Node(1);
        node6.next = node7;
        node7.next = node4;
 
        System.out.println(isCycle2(node1));
    }
}
```

假设链表的节点数量为n，则方法1的时间复杂度为：O(n)，空间复杂度为O(1)。

### 1.4 如果链表有环，如何求出环的长度

当两个引用首次相遇，证明链表有环的时候，让两个引用从相遇点继续前进，并统计前进的次数，直到两个引用第二次相遇，此时这个前进次数就是环的长度。

```Java
public static int getCycleLength(Node node) {
    Node node1 = node;
    Node node2 = node;
    boolean firstMeet = false;
    int length = 0;
    while (node2 != null && node2.next != null) {
        node1 = node1.next;
        node2 = node2.next.next;
        if (node1 == node2) {
            if (!firstMeet) {
                //第一次相遇
                firstMeet = true;
            } else {
                //第二次相遇
                return length;
            }
        }
        if (firstMeet) {
            length++;
        }
    }
    return -1;
}
```

### 1.5 如果链表有环，如何求出入环节点？

只需要记住：从链表头节点到入环点的距离，等于从首次相遇点回到入环点的距离。

所以，当两个引用首次相遇，让一个引用回到头节点继续前进，一个节点从相遇点继续前进，都每次只前进一个节点，直到两个引用第二次相遇，第二次相遇点就是入环点。

```Java
public static Node getInCycleNode(Node node) {
    Node node1 = node;
    Node node2 = node;
    while (node2 != null && node2.next != null) {
        node1 = node1.next;
        node2 = node2.next.next;
        if (node1 == node2) {
            //第一次相遇
            node1 = node;
            break;
        }
    }
 
    while (node1 != null && node2 != null) {
        if (node1 == node2) {
            //第二次相遇
            return node1;
        }
        node1 = node1.next;
        node2 = node2.next;
    }
    return null;
}
```

