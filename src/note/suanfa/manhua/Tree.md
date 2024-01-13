---
title: 树
author: Ms.Yu
category: 数据结构
tag:
  - 漫画算法
  - 树
star: 9
sticky: 9

---

### 1.基础概念

树（tree）是n（n≥0）个节点的有限集。当n=0时，称为空树。在任意一个非空树中，有如下特点。

**1.有且仅有一个特定的称为根的节点。**

**2.当n＞1时，其余节点可分为m（m＞0）个互不相交的有限集，每一个集合本身又是一个树，并称为根的子树。**
下面这张图，就是一个标准的树结构。

<img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214222403400.png" alt="image-20221214222403400" style="zoom: 67%;" />

#### 1.1 **什么是二叉树？**

二叉树（binary tree）是树的一种特殊形式。二叉，顾名思义，这种树的每个节点最多有2个孩子节点。注意，这里是最多有2个，也可能只有1个，或者没有孩子节点。

二叉树的结构如图：

<img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214222846093.png" alt="image-20221214222846093" style="zoom:67%;" />

二叉树还有两种特殊形式，一个叫作满二叉树，另一个叫作完全二叉树。

一个二叉树的所有非叶子节点都存在左右孩子，并且所有叶子节点都在同一层级上，那么这个树就是**满二叉树**。

对一个有n个节点的二叉树，按层级顺序编号，则所有节点的编号为从1到n。如果这个树所有节点和同样深度的满二叉树的编号为从1到n的节点位置相同，则这个二叉树为**完全二叉树**。

**二叉树可以用哪些物理存储结构来表达呢？**

- **1.链式存储结构。**
- **2.数组。**

链式存储结构图如下：

<img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214225944939.png" alt="image-20221214225944939" style="zoom:67%;" />

使用数组存储时，会按照层级顺序把二叉树的节点放到数组中对应的位置上。如果某一个节点的左孩子或右孩子空缺，则数组的相应位置也空出来。
为什么这样设计呢？因为这样可以更方便地在数组中定位二叉树的孩子节点和父节点。
假设一个父节点的下标是parent，那么它的左孩子节点下标就是**2×parent+1**；右孩子节点下标就是**2×parent+2**。
反过来，假设一个左孩子节点的下标是leftChild，那么它的父节点下标就是**（leftChild-1）/2**。

<img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221214231539736.png" alt="image-20221214231539736" style="zoom:67%;" />

### 2.二叉树的遍历

从节点的位置关系来看，二叉树的遍历分为4种。

1. 前序遍历
2. 中序遍历
3. 后序遍历
4. 层序遍历

从更宏观的角度来看，二叉树的遍历归结为两大类。

1. 深度优先遍历（前、中、后序遍历）
2. 广度优先遍历（层序遍历）

#### 2.1 深度优先遍历

**前序遍历**

二叉树的前序遍历输出顺序是：根节点、左子树、右子树。前序遍历图如下

 <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221215203732678.png" alt="image-20221215203732678" style="zoom:67%;" />

**中序遍历**

二叉树的中序遍历的输出顺序是：左子树、根节点、右子树。中序遍历二叉树图如下

 <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221215203859580.png" alt="image-20221215203859580" style="zoom: 50%;" />

**后序遍历**

二叉树的后序遍历的输出顺序是：左子树、右子树、根节点。后序遍历二叉树图如下

 <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221215204711921.png" alt="image-20221215204711921" style="zoom: 58%;" />

使用递归方式实现的前序遍历、中序遍历、后序遍历代码实现如下：

```java
package com.yu.five.test;

import java.util.Arrays;
import java.util.LinkedList;

/**
 * @Author: yy
 * @Date: 2022/12/15 20:51
 * @Version: 1.0.0
 */
public class MyBinaryTree {


    /**
     * 前序遍历
     * @param node 二叉树节点
     */
    public static void preOrderTraveral(TreeNode node){
        if (node == null){
            return;
        }
        System.out.println(node.data);
        preOrderTraveral(node.leftChild);
        preOrderTraveral(node.rightChild);
    }

    /**
     * 中序遍历
     * @param node 二叉树节点
     */
    public static void inOrderTraveral(TreeNode node){
        if (node == null){
            return;
        }
        preOrderTraveral(node.leftChild);
        System.out.println(node.data);
        preOrderTraveral(node.rightChild);
    }

    /**
     * 后序遍历
     * @param node 二叉树节点
     */
    public static void postOrderTraveral(TreeNode node){
        if (node == null){
            return;
        }
        preOrderTraveral(node.leftChild);
        preOrderTraveral(node.rightChild);
        System.out.println(node.data);

    }

    /**
     * 构建二叉树
     */
    public static TreeNode createBinaryTree(LinkedList<Integer> inputList){
        TreeNode node = null;
        if (inputList == null || inputList.isEmpty()){
            return null;
        }
        Integer data = inputList.removeFirst();
        //如果元素是空，则不再进一步递归
        if (data != null){
            node = new TreeNode(data);
            node.leftChild = createBinaryTree(inputList);
            node.rightChild = createBinaryTree(inputList);
        }
        return node;
    }

    /**
     * 二叉树节点
     */
    private static class TreeNode{
        int data;
        TreeNode leftChild;
        TreeNode rightChild;
        TreeNode(int data){
            this.data = data;
        }
    }

    public static void main(String[] args) {
        LinkedList<Integer> inputList = new LinkedList<>(Arrays.asList(
                3, 2, 9, null, null, 10, null, null, 8, null, 4));
        TreeNode treeNode = createBinaryTree(inputList);
        System.out.println("前序遍历：");
        preOrderTraveral(treeNode);
        System.out.println("中序遍历：");
        inOrderTraveral(treeNode);
        System.out.println("后序遍历：");
        postOrderTraveral(treeNode);
//        前序遍历：3 2 9 10 8 4
//        中序遍历：2 9 10 3 8 4
//        后序遍历：2 9 10 8 4 3

    }
}

```

注意：

二叉树的构建方法有很多，这里把一个线性的链表转化成非线性的二叉树，链表节点的顺序恰恰是二叉树前序遍历的顺序。链表中的空值，代表二叉树节点的左孩子或右孩子为空的情况。
在代码的main函数中，通过{3，2，9，null，null，10，null，null，8，null，4}这样一个线性序列，构建成的二叉树如下。

 <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221215213652541.png" alt="image-20221215213652541" style="zoom:50%;" />

**非递归方式实现遍历**

1. 首先遍历二叉树的根节点1，放入栈中。
2. 遍历根节点1的左孩子节点2，放入栈中。
3. 遍历节点2的左孩子节点4，放入栈中。
4. 节点4既没有左孩子，也没有右孩子，我们需要回溯到上一个节点2。可是现在并不是做递归操作，怎么回溯呢？别担心，栈已经存储了刚才遍历的路径。让旧的栈顶元素4出栈，就可以重新访问节点2，得到节点2的右孩子节点5。此时节点2已经没有利用价值（已经访问过左孩子和右孩子），节点2出栈，节点5入栈。
5. 节点5既没有左孩子，也没有右孩子，我们需要再次回溯，一直回溯到节点1。所以让节点5出栈。
    根节点1的右孩子是节点3，节点1出栈，节点3入栈。
6. 节点3的右孩子是节点6，节点3出栈，节点6入栈。
7. 节点6既没有左孩子，也没有右孩子，所以节点6出栈。此时栈为空，遍历结束。

代码实现：

```
package com.yu.five.test;

import javax.swing.tree.TreeNode;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Stack;

/**
 * @Author: yy
 * @Date: 2022/12/15 20:51
 * @Version: 1.0.0
 */
public class MyBinaryTree {

    /**
     * 非递归前序遍历
     *
     * @param root
     */
    public static void preOrderTraveralWithStack(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode treeNode = root;
        while (treeNode != null || !stack.isEmpty()) {
            //迭代访问节点的左孩子，并入栈
            while (treeNode != null) {
                System.out.println(treeNode.data);
                stack.push(treeNode);
                treeNode = treeNode.leftChild;
            }
            //如果节点没有左孩子，则弹出栈顶节点，访问节点右孩子
            if (!stack.isEmpty()) {
                treeNode = stack.pop();
                treeNode = treeNode.rightChild;
            }
        }
    }

    /**
     * 非递归中序遍历
     *
     * @param root
     */
    public static void inOrderTraveralWithStack(TreeNode root) {
        if (root == null) {
            return;
        }
        Stack<TreeNode> stack = new Stack<>();
        TreeNode treeNode = root;
        while (treeNode != null || !stack.isEmpty()) {
            //迭代访问节点的左孩子，并入栈
            while (treeNode != null) {
                stack.push(treeNode);
                treeNode = treeNode.leftChild;
            }
            //如果节点没有左孩子，则弹出栈顶节点，访问节点右孩子
            if (!stack.isEmpty()) {
                treeNode = stack.pop();
                System.out.println(treeNode.data);
                treeNode = treeNode.rightChild;
            }
        }
    }

    /**
     * 非递归后序遍历
     * 若 node  的右节点 node.right 为 null，说明已经是最底层节点，直接输出。
     * 如：输出节点【8】的场景，node.right == null；
     * 节点输出以后，把 lastNode 节点设置成当前节点，将当前游标节点node设置为空，下一轮就可以访问栈顶元素。
     * 如：输出节点【8】以后，lastNode 设置成8，node == null，程序进入下一次while循环，直接走到“node = treeNodeStack.peek();”上，查看栈顶元素，此时 node 被赋值 【6】；
     * 若 lastNode 等于当前考查节点的右子树，表示该节点的左右子树都已经遍历完成，则可以输出当前节点。
     * 如：输出节点【6】的场景，node.right == lastNode  == 8 。
     * @param root
     */
    public static void postOrderTraveralWithStack(TreeNode root) {
        if (root == null) {
            return;
        }
        Stack<TreeNode> treeNodeStack = new Stack<TreeNode>();
        TreeNode treeNode = root;
        TreeNode lastNode = root;
        while (treeNode != null || !treeNodeStack.isEmpty()) {
            while (treeNode != null) {
                treeNodeStack.push(treeNode);
                treeNode = treeNode.leftChild;
            }
            // 查看当前栈顶元素
            treeNode = treeNodeStack.peek();
            // 如果其右子树也为空，或者右子树已经访问过，则可以直接输出当前节点的值
            if (treeNode.rightChild == null || treeNode.rightChild == lastNode) {
                System.out.println(treeNode.data);
                treeNodeStack.pop();
                // 把输出的节点赋值给lastNode游标，作为下次比对的依据
                lastNode = treeNode;
                treeNode = null;
            }
            // 否则，继续遍历右子树
            else {
                treeNode = treeNode.rightChild;
            }
        }
    }


    /**
     * 构建二叉树
     */
    public static TreeNode createBinaryTree(LinkedList<Integer> inputList) {
        TreeNode node = null;
        if (inputList == null || inputList.isEmpty()) {
            return null;
        }
        Integer data = inputList.removeFirst();
        //如果元素是空，则不再进一步递归
        if (data != null) {
            node = new TreeNode(data);
            node.leftChild = createBinaryTree(inputList);
            node.rightChild = createBinaryTree(inputList);
        }
        return node;
    }

    /**
     * 二叉树节点
     */
    private static class TreeNode {
        int data;
        TreeNode leftChild;
        TreeNode rightChild;

        TreeNode(int data) {
            this.data = data;
        }
    }

    public static void main(String[] args) {
        LinkedList<Integer> inputList = new LinkedList<>(Arrays.asList(
                3, 2, 9, null, null, 10, null, null, 8, null, 4));
        TreeNode treeNode = createBinaryTree(inputList);
        System.out.println("前序遍历：");
        preOrderTraveral(treeNode);
        System.out.println("中序遍历：");
        inOrderTraveral(treeNode);
        System.out.println("后序遍历：");
        postOrderTraveral(treeNode);
        System.out.println("非递归前序遍历");
        preOrderTraveralWithStack(treeNode);
        System.out.println("非递归中序遍历");
        inOrderTraveralWithStack(treeNode);
        System.out.println("非递归后序遍历");
        postOrderTraveralWithStack(treeNode);
//        前序遍历：3 2 9 10 8 4
//        中序遍历：9 2 10 3 8 4
//        后序遍历：9 10 2 4 8 3

    }
}

```

后序遍历：

因为后序遍历在决定是否可以输出当前节点的值的时候，需要考虑其左右子树是否都已经遍历完成。显然一个游标已经不够用了，所以需要再设置一个游标 - **lastNode**，用来保存当前输出的节点，用来做为下次对比的依据。 

 <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221216150702662.png" alt="image-20221216150702662" style="zoom:50%;" />

#### 2.2 广度优先遍历

层序遍历：

二叉树同一层次的节点之间是没有直接关联的，如何实现这种层序遍历呢？
这里同样需要借助一个数据结构来辅助工作，这个数据结构就是**队列**。
详细遍历步骤如下：

 <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221216151256608.png" alt="image-20221216151256608" style="zoom: 67%;" />

1. 根节点1进入队列
2. 节点1出队，输出节点1，并得到节点1的左孩子节点2、右孩子节点3。让节点2和节点3入队。
3. 节点2出队，输出节点2，并得到节点2的左孩子节点4、右孩子节点5。让节点4和节点5入队。
4. 节点3出队，输出节点3，并得到节点3的右孩子节点6。让节点6入队。
5. 节点4出队，输出节点4，由于节点4没有孩子节点，所以没有新节点入队。
6. 节点5出队，输出节点5，由于节点5同样没有孩子节点，所以没有新节点入队。
7. 节点6出队，输出节点6，节点6没有孩子节点，没有新节点入队。

代码实现：

```
 /**
     * 二叉树层序遍历
     * @param root   二叉树根节点
     */
    public static void levelOrderTraversal(TreeNode root){
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.offer(root);
        while(!queue.isEmpty()){
            TreeNode node = queue.poll();
            System.out.println(node.data);
            if(node.leftChild != null){
                queue.offer(node.leftChild);
            }
            if(node.rightChild != null){
                queue.offer(node.rightChild);
            }
        }
    }
```

### 3.二叉堆

#### 3.1 什么是二叉堆

二叉堆本质上是一种完全二叉树，它分为两个类型。

1. 最大堆。
2. 最小堆。

**什么是最大堆呢？**

最大堆的任何一个父节点的值，都大于或等于它左、右孩子节点的值。

**什么是最小堆呢？**

最小堆的任何一个父节点的值，都小于或等于它左、右孩子节点的值。

二叉堆的根节点叫作**堆顶**。

#### 3.2 二叉堆的代码实现

 <img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221216194635354.png" alt="image-20221216194635354" style="zoom:60%;" />

假设父节点的下标是parent，那么它的左孩子下标就是 2×parent+1；右孩子下标就是2×parent+2。
例如上面的例子中，节点6包含9和10两个孩子节点，节点6在数组中的下标是3，节点9在数组中的下标是7，节点10在数组中的下标是8。

```
public class HeapOperator {

    /**
     * 上浮调整
     * @param array     待调整的堆
     */
    public static void upAdjust(int[] array) {
        int childIndex = array.length-1;
        int parentIndex = (childIndex-1)/2;
        // temp保存插入的叶子节点值，用于最后的赋值
        int temp = array[childIndex];
        while (childIndex > 0 && temp < array[parentIndex])
        {
            //无需真正交换，单向赋值即可
            array[childIndex] = array[parentIndex];
            childIndex = parentIndex;
            parentIndex = (parentIndex-1) / 2;
        }
        array[childIndex] = temp;
    }

    /**
     * 下沉调整
     * @param array     待调整的堆
     * @param parentIndex    要下沉的父节点
     * @param length    堆的有效大小
     */
    public static void downAdjust(int[] array, int parentIndex, int length) {
        // temp保存父节点值，用于最后的赋值
        int temp = array[parentIndex];
        int childIndex = 2 * parentIndex + 1;
        while (childIndex < length) {
            // 如果有右孩子，且右孩子小于左孩子的值，则定位到右孩子
            if (childIndex + 1 < length && array[childIndex + 1] < array[childIndex]) {
                childIndex++;
            }
            // 如果父节点小于任何一个孩子的值，直接跳出
            if (temp <= array[childIndex])
                break;
            //无需真正交换，单向赋值即可
            array[parentIndex] = array[childIndex];
            parentIndex = childIndex;
            childIndex = 2 * childIndex + 1;
        }
        array[parentIndex] = temp;
    }

    /**
     * 构建堆
     * @param array     待调整的堆
     */
    public static void buildHeap(int[] array) {
        // 从最后一个非叶子节点开始，依次下沉调整
        for (int i = (array.length-2)/2; i >= 0; i--) {
            downAdjust(array, i, array.length);
        }
    }

    public static void main(String[] args) {
        int[] array = new int[] {1,3,2,6,5,7,8,9,10,0};
        upAdjust(array);
        System.out.println(Arrays.toString(array));

        array = new int[] {7,1,3,10,5,2,8,9,6};
        buildHeap(array);
        System.out.println(Arrays.toString(array));
    }
}
```

### 4.优先队列

优先队列不再遵循先入先出的原则，而是分为两种情况。

- **最大优先队列，无论入队顺序如何，都是当前最大的元素优先出队**
- **最小优先队列，无论入队顺序如何，都是当前最小的元素优先出队**

#### 4.1 优先队列的实现

通过上面我们学的**最大堆**，可以用最大堆实现最大优先队列，每一次入队操作就是堆的插入操作，每一次出队操作就是删除堆顶节点。

入队操作具体步骤：

1. 插入新节点5。
2. 新节点5“上浮”到合适位置。

出队操作具体步骤：

1. 让原堆顶节点10出队。
2. 把最后一个节点1替换到堆顶位置。
3. 节点1“下沉”，节点9成为新堆顶。

二叉堆节点“上浮”和“下沉”的时间复杂度都是O（logn），所以优先队列入队和出队的时间复杂度也是O（logn）

```
public class PriorityQueue {

    private int[] array;
    private int size;

    public PriorityQueue(){
        //队列初始长度32
        array = new int[32];
    }

    /**
     * 入队
     * @param key  入队元素
     */
    public void enQueue(int key) {
        //队列长度超出范围，扩容
        if(size >= array.length){
            resize();
        }
        array[size++] = key;
        upAdjust();
    }

    /**
     * 出队
     */
    public int deQueue() throws Exception {
        if(size <= 0){
            throw new Exception("the queue is empty !");
        }
        //获取堆顶元素
        int head = array[0];
        //最后一个元素移动到堆顶
        array[0] = array[--size];
        downAdjust();
        return head;
    }

    /**
     * 上浮调整
     */
    private void upAdjust() {
        int childIndex = size-1;
        int parentIndex = (childIndex-1)/2;
        // temp保存插入的叶子节点值，用于最后的赋值
        int temp = array[childIndex];
        while (childIndex > 0 && temp > array[parentIndex])
        {
            //无需真正交换，单向赋值即可
            array[childIndex] = array[parentIndex];
            childIndex = parentIndex;
            parentIndex = (parentIndex-1) / 2;
        }
        array[childIndex] = temp;
    }

    /**
     * 下沉调整
     */
    private void downAdjust() {
        // temp保存父节点值，用于最后的赋值
        int parentIndex = 0;
        int temp = array[parentIndex];
        int childIndex = 1;
        while (childIndex < size) {
            // 如果有右孩子，且右孩子大于左孩子的值，则定位到右孩子
            if (childIndex + 1 < size && array[childIndex + 1] > array[childIndex]) {
                childIndex++;
            }
            // 如果父节点大于任何一个孩子的值，直接跳出
            if (temp >= array[childIndex])
                break;
            //无需真正交换，单向赋值即可
            array[parentIndex] = array[childIndex];
            parentIndex = childIndex;
            childIndex = 2 * childIndex + 1;
        }
        array[parentIndex] = temp;
    }

    /**
     * 队列扩容
     */
    private void resize() {
        //队列容量翻倍
        int newSize = this.size * 2;
        this.array = Arrays.copyOf(this.array, newSize);
    }

    public static void main(String[] args) throws Exception {
        PriorityQueue priorityQueue = new PriorityQueue();
        priorityQueue.enQueue(3);
        priorityQueue.enQueue(5);
        priorityQueue.enQueue(10);
        priorityQueue.enQueue(2);
        priorityQueue.enQueue(7);
        System.out.println("出队元素：" + priorityQueue.deQueue());
        System.out.println("出队元素：" + priorityQueue.deQueue());
    }
}
```

### 5. 小结

 **什么是树**

树是n个节点的有限集，有且仅有一个特定的称为根的节点。当n＞1时，其余节点可分为m个互不相交的有限集，每一个集合本身又是一个树，并称为根的子树。

**什么是二叉树**

二叉树是树的一种特殊形式，每一个节点最多有两个孩子节点。二叉树包含完全二叉树和满二叉树两种特殊形式。

**二叉树的遍历方式有几种**

根据遍历节点之间的关系，可以分为前序遍历、中序遍历、后序遍历、层序遍历这4种方式；从更宏观的角度划分，可以划分为深度优先遍历和广度优先遍历两大类。

**什么是二叉堆**

二叉堆是一种特殊的完全二叉树，分为最大堆和最小堆。

在最大堆中，任何一个父节点的值，都大于或等于它左、右孩子节点的值。

在最小堆中，任何一个父节点的值，都小于或等于它左、右孩子节点的值。

**什么是优先队列**

优先队列分为最大优先队列和最小优先队列。

在最大优先队列中，无论入队顺序如何，当前最大的元素都会优先出队，这是基于最大堆实现的。

在最小优先队列中，无论入队顺序如何，当前最小的元素都会优先出队，这是基于最小堆实现的。
