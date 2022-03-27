---
title: 每日一题
author: Ms.Yu
category: 算法
tag:
  - leetcode
  - 每日一题
star: 9
sticky: 9
---

------
## 704、二分查找

### 题目描述

给定一个 `n` 个元素有序的（升序）整型数组 `nums` 和一个目标值 `target`  ，写一个函数搜索 `nums` 中的 `target`，如果目标值存在返回下标，否则返回 `-1`。


示例 1:

> 输入: nums = [-1,0,3,5,9,12], target = 9
> 输出: 4
> 解释: 9 出现在 nums 中并且下标为 4
>

示例 2:

> 输入: nums = [-1,0,3,5,9,12], target = 2
> 输出: -1
> 解释: 2 不存在 nums 中因此返回 -1


提示：

你可以假设 `nums` 中的所有元素是不重复的。
`n` 将在 `[1, 10000]`之间。
`nums` 的每个元素都将在 `[-9999, 9999]`之间。

### 题解

#### 解题思路

- 标签：二分查找
- 过程：
    -  设定左右指针
    - 找出中间位置，并判断该位置值是否等于 target
    - nums[mid] == target 则返回该位置下标
    - nums[mid] > target 则右侧指针移到中间
    - nums[mid] < target 则左侧指针移到中间

- 时间复杂度：O(logN)O(logN)

#### 代码

```java
class Solution {
    public int search(int[] nums, int target) {
        int first = 0;
        int last = nums.length-1;

        while (first <= last){
            int mid = (last-first)/2+first;

            if (nums[mid] == target){
                return mid;
            }
            else if (nums[mid] > target){
                last = mid-1;

            }
            else {
                first = mid+1;
            }
        }
        return -1;
    }
}
```

## 278、第一个错误的版本

### 题目描述

你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。

假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。

你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。

### 题解

#### 解题思路

#### 代码

```java
public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        int left = 1, right = n;
        while (left < right) { // 循环直至区间左右端点相同
            int mid = left + (right - left) / 2; // 防止计算时溢出
            if (isBadVersion(mid)) {
                right = mid; // 答案在区间 [left, mid] 中
            } else {
                left = mid + 1; // 答案在区间 [mid+1, right] 中
            }
        }
        // 此时有 left == right，区间缩为一个点，即为答案
        return left;
    }
}
```

## 35、搜索插入的位置

### 题目描述

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 O(log n) 的算法。

 

示例 1:

> 输入: nums = [1,3,5,6], target = 5
> 输出: 2

示例 2:

> 输入: nums = [1,3,5,6], target = 2
> 输出: 1

示例 3:

> 输入: nums = [1,3,5,6], target = 7
> 输出: 4

示例 4:

> 输入: nums = [1,3,5,6], target = 0
> 输出: 0

示例 5:

> 输入: nums = [1], target = 0
> 输出: 0


提示:

> 1 <= nums.length <= 104
> -104 <= nums[i] <= 104
> nums 为无重复元素的升序排列数组
> -104 <= target <= 104

### 题解

#### 解题思路

假设题意是叫你在排序数组中寻找是否存在一个目标值，那么训练有素的读者肯定立马就能想到利用二分法在 `O(log n)`的时间内找到是否存在目标值。但这题还多了个额外的条件，即如果不存在数组中的时候需要返回按顺序插入的位置，那我们还能用二分法么？答案是可以的，我们只需要稍作修改即可。

考虑这个插入的位置 `pos`，它成立的条件为：

`nums[pos-1]<arget≤nums[pos]`

其中 `nums` 代表排序数组。由于如果存在这个目标值，我们返回的索引也是 `pos`，因此我们可以将两个条件合并得出最后的目标：「在一个有序数组中找第一个大于等于 `target` 的下标」。

问题转化到这里，直接套用二分法即可，即不断用二分法逼近查找第一个大于等于 `target` 的下标 。下文给出的代码是笔者习惯的二分写法，`ans` 初值设置为数组长度可以省略边界条件的判断，因为存在一种情况是 `target` 大于数组中的所有数，此时需要插入到数组长度的位置。

#### 代码

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        int n = nums.length;
        int left = 0, right = n - 1, ans = n;
        while (left <= right) {
            int mid = ((right - left) >> 1) + left;
            if (target <= nums[mid]) {
                ans = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return ans;

    }
}
```

## 977、有序数组的平方

### 题目描述

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例 1：

> 输入：nums = [-4,-1,0,3,10]
> 输出：[0,1,9,16,100]
> 解释：平方后，数组变为 [16,1,0,9,100]
> 排序后，数组变为 [0,1,9,16,100]

示例 2：

> 输入：nums = [-7,-3,2,3,11]
> 输出：[4,9,9,49,121]


提示：

> 1 <= nums.length <= 104
> -104 <= nums[i] <= 104
> nums 已按 非递减顺序 排序


进阶：

请你设计时间复杂度为 `O(n)` 的算法解决本问题

### 题解

#### 解题思路1

#### 代码1

```java
class Solution {
     public int[] sortedSquares(int[] nums) {
        int[] ans = new int[nums.length];
        for(int i = 0;i<nums.length;i++){
            ans[i] = nums[i]*nums[i];
        }
        Arrays.sort(ans);
        return ans;
    }
}
```

#### 解题思路2

我们可以使用两个指针分别指向位置 0 和 n−1，每次比较两个指针对应的数，选择较大的那个逆序放入答案并移动指针。这种方法无需处理某一指针移动至边界的情况，读者可以仔细思考其精髓所在。

#### 代码2

```java
class Solution {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];
        for (int i = 0, j = n - 1, pos = n - 1; i <= j;) {
            if (nums[i] * nums[i] > nums[j] * nums[j]) {
                ans[pos] = nums[i] * nums[i];
                ++i;
            } else {
                ans[pos] = nums[j] * nums[j];
                --j;
            }
            --pos;
        }
        return ans;
    }
}
```

复杂度分析

- 时间复杂度：`O(n)`，其中 `n` 是数组 `nums` 的长度。

- 空间复杂度：`O(1)`。除了存储答案的数组以外，我们只需要维护常量空间。


## 189、轮转数组

### 题目描述

给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

示例 1:

> 输入: nums = [1,2,3,4,5,6,7], k = 3
> 输出: [5,6,7,1,2,3,4]
> 解释:
> 向右轮转 1 步: [7,1,2,3,4,5,6]
> 向右轮转 2 步: [6,7,1,2,3,4,5]
> 向右轮转 3 步: [5,6,7,1,2,3,4]

示例 2:

> 输入：nums = [-1,-100,3,99], k = 2
> 输出：[3,99,-1,-100]
> 解释: 
> 向右轮转 1 步: [99,-1,-100,3]
> 向右轮转 2 步: [3,99,-1,-100]


提示：

- 1 <= nums.length <= 105
- -231 <= nums[i] <= 231 - 1
- 0 <= k <= 105

### 题解

#### 解题思路1

我们可以使用额外的数组来将每个元素放至正确的位置。用 n 表示数组的长度，我们遍历原数组，将原数组下标为 i 的元素放至新数组下标为 (i+k)mod n 的位置，最后将新数组拷贝至原数组即可。

#### 代码1

```java
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        int[] newArr = new int[n];
        for (int i = 0; i < n; ++i) {
            newArr[(i + k) % n] = nums[i];
        }
        System.arraycopy(newArr, 0, nums, 0, n);
    }
}
```

**复杂度分析**

- 时间复杂度： O(n)*O*(*n*)，其中 n*n* 为数组的长度。
- 空间复杂度： O(n)*O*(*n*)。

#### 解题思路2

该方法基于如下的事实：当我们将数组的元素向右移动 k 次后，尾部 k mod n 个元素会移动至数组头部，其余元素向后移动 k mod n 个位置。

该方法为数组的翻转：我们可以先将所有元素翻转，这样尾部的 k mod n 个元素就被移至数组头部，然后我们再翻转 [0,kmodn−1] 区间的元素和[k mod n,n−1] 区间的元素即能得到最后的答案。

我们以 n=7，k=3 为例进行如下展示：

| 操作                              | 结果          |
| --------------------------------- | ------------- |
| 原始数组                          | 1 2 3 4 5 6 7 |
| 翻转所有元素                      | 7 6 5 4 3 2 1 |
| 翻转 [0,*k*mod*n*−1] 区间的元素   | 5 6 7 4 3 2 1 |
| 翻转 [*k*mod*n*,*n*−1] 区间的元素 | 5 6 7 1 2 3 4 |

#### 代码2

```java
class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }

    public void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start += 1;
            end -= 1;
        }
    }
}
```

复杂度分析

- 时间复杂度：O(n)，其中 n 为数组的长度。每个元素被翻转两次，一共 n 个元素，因此总时间复杂度为 O(2n)=O(n)。

- 空间复杂度：O(1)。



## 283、移动零

### 题目描述

![image-20220208223029106](https://gitee.com/thirtyyy/img/raw/master/img//image-20220208223029106.png)

### 题解

#### 解题思路

这里参考了快速排序的思想，快速排序首先要确定一个待分割的元素做中间点x，然后把所有小于等于x的元素放到x的左边，大于x的元素放到其右边。
这里我们可以用0当做这个中间点，把不等于0(注意题目没说不能有负数)的放到中间点的左边，等于0的放到其右边。
这的中间点就是0本身，所以实现起来比快速排序简单很多，我们使用两个指针i和j，只要nums[i]!=0，我们就交换nums[i]和nums[j]



**个人思路：**i不断向右移动，当 i 指向非零元素且j指向零时，将 j 指向元素与当前元素进行交换，若 i 指向0不进行任何操作,i+1,j不变。

#### 代码

```
 public static void moveZeroes(int[] nums) {
        if(nums.length==0){
            return;
        }
        int j=0;
        for(int i=0;i<nums.length;i++){
            //      -1,0,0,3,5
            //      -1 3 0 0 5
            //      -1 3 5 0 0
            //i不断向右移动，当 i 指向非零元素且j指向零时，将 j 指向元素与当前元素进行交换，
            // 若 i 指向0不进行任何操作,i+1,j不变。
            if(nums[i]!=0){
                if(nums[j]==0){
                    int temp = nums[i];
                    nums[i] = nums[j];
                    nums[j] = temp;
                }
                j++;
            }
        }
    }
```

## [167. 两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)

### 题目描述

![image-20220209001240442](https://gitee.com/thirtyyy/img/raw/master/img//image-20220209001240442.png)

### 题解

#### 解题思路

初始时两个指针分别指向第一个元素位置和最后一个元素的位置。每次计算两个指针指向的两个元素之和，并和目标值比较。如果两个元素之和等于目标值，则发现了唯一解。如果两个元素之和小于目标值，则将左侧指针右移一位。如果两个元素之和大于目标值，则将右侧指针左移一位。移动指针之后，重复上述操作，直到找到答案。

初始时两个指针分别指向下标 0和下标 numbers.length−1，左指针指向的下标小于或等于 i，右指针指向的下标大于或等于 j。除非初始时左指针和右指针已经位于下标 i 和 j，否则一定是左指针先到达下标 i 的位置或者右指针先到达下标 j 的位置。

如果左指针先到达下标 i 的位置，此时右指针还在下标 jj 的右侧，sum>target，因此一定是右指针左移，左指针不可能移到 i 的右侧。

如果右指针先到达下标 j 的位置，此时左指针还在下标 i 的左侧，sum<target，因此一定是左指针右移，右指针不可能移到 j 的左侧。

由此可见，在整个移动过程中，左指针不可能移到 i 的右侧，右指针不可能移到 j 的左侧，因此不会把可能的解过滤掉。由于题目确保有唯一的答案，因此使用双指针一定可以找到答案。

#### 代码

```java
class Solution {
   public int[] twoSum(int[] numbers, int target) {
        int low = 0, high = numbers.length - 1;
        while (low < high) {
            int sum = numbers[low] + numbers[high];
            if (sum == target) {
                return new int[]{low + 1, high + 1};
            } else if (sum < target) {
                ++low;
            } else {
                --high;
            }
        }
        return new int[]{-1, -1};
    }
}
```



## 344、反转字符串

### 题目描述

![image-20220210130930319](https://gitee.com/thirtyyy/img/raw/master/img//image-20220210130930319.png)

### 题解

#### 解题思路

- start指向字符数组首元素，end指向字符数组尾元素
- 当start<end时
    - s[start]与s[end]交换
    - start指针右移：start++；end指针左移：end--
- 当start>=end时，反转结束，返回字符数组即可。

#### 代码

```java
class Solution {
    public void reverseString(char[] s) {
       int start = 0;
       int end = s.length-1;
       while(start < end){
           char ans = s[start];
           s[start] = s[end];
           s[end] = ans;
           start++;
           end--;
       }
    }
}
```

## 557、反转字符串中的单词 III

### 题目描述

![image-20220210190640876](https://gitee.com/thirtyyy/img/raw/master/img//image-20220210190640876.png)

### 题解

#### 解题思路1

- 通过split(" ")分割字符串得到单词数组
- 将单词数组依次添加到StringBuilder（ssb）
- 使用reverse函数反转ssb，将反转后的ssb添加sb
- 返回反转后的单词数组，并使用trim()函数去掉首尾之后的空格

#### 代码1

```
class Solution {
    public String reverseWords(String s) {
        String[] ss = s.split(" ");
        StringBuilder sb = new StringBuilder();
        for(int i = 0;i<ss.length;i++){
            StringBuilder ssb = new StringBuilder();
            ssb.append(ss[i]);
            sb.append(ssb.reverse().append(" "));
        }
        return sb.toString().trim();
    }
}
```

#### 代码2

```
class Solution {
    public String reverseWords(String s) {
        //因为字符串不可变，所以必须定义一个可变的字符串来存储新的字符
        StringBuilder ans = new StringBuilder();
        //遍历原字符串，取出单个单词，以空格分开
        for(String str: s.trim().split(" ")){
            //将取出的单词，转化为字符数组的形式
            char[] chars = str.toCharArray();
            //反转单词
            reverseString(chars);
            //将反转后的单词，追加到新的可变字符串中，并加上空格
            ans.append(chars).append(" ");
        }
        //将字符数组转为字符串形式输出，并删除头尾的空格
        //因为在追加最后一个字符的时候，末尾会有一个空格
        return ans.toString().trim();
    }
    public void reverseString(char[] chars){
        //左指针，指向头部
        int left = 0; 
        //右指针，指向尾部
        int right= chars.length-1;
        //只要左指针小于右指针，就交换两个字符
        while(left < right){
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            //两个指针同时移动
            left++;
            right--;
        }
    }
}
```

## 876、链表的中间结点

### 题目描述

![image-20220211181600888](https://gitee.com/thirtyyy/img/raw/master/img//image-20220211181600888.png)

### 题解

#### 解题思路

用两个指针 `slow` 与 `fast` 一起遍历链表。`slow` 一次走一步，`fast` 一次走两步。那么当 `fast` 到达链表的末尾时，`slow` 必然位于中间。

#### 代码

```java
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode low = head;
        ListNode fast = head;
        while(fast!=null && fast.next!=null){
            low = low.next;
            fast = fast.next.next;
        }
        return low;
    }
}
```

