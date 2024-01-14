import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as e,f as t,e as n}from"./app-9Gb0doIl.js";const i={},p=n(`<blockquote><p>根据时间复杂度不同，主流的排序算法可以分为 3 大类</p><p><strong>1.时间复杂度为 O（n2）的排序算法</strong></p><ul><li>冒泡排序</li><li>选择排序</li><li>插入排序</li><li>希尔排序（希尔排序比较特殊，它的性能略优于 O（n2），但又比不上 O（nlogn），姑且把它归入本类）</li></ul><p><strong>2.时间复杂度为 O（nlogn）的排序算法</strong></p><ul><li>快速排序</li><li>归并排序</li><li>堆排序</li></ul><p><strong>3.时间复杂度为线性的排序算法</strong></p><ul><li>计数排序</li><li>桶排序</li><li>基数排序</li></ul></blockquote><h2 id="_1-冒泡排序" tabindex="-1"><a class="header-anchor" href="#_1-冒泡排序" aria-hidden="true">#</a> 1. 冒泡排序</h2><p>有 8 个数字组成一个无序数列{5，8，6，3，9，2，1，7}，希望按照从小到大的顺序对其进行排序。</p><p>按照冒泡排序的思想，我们要<strong>把相邻的元素两两比较，当一个元素大于右侧相邻元素时，交换它们的位置；当一个元素小于或等于右侧相邻元素时，位置不变</strong>。详细过程如下</p><p><strong>第一轮：</strong></p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221216202413913.png" alt="image-20221216202413913" style="zoom:50%;"><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221216202734126.png" alt="image-20221216202734126" style="zoom:33%;"><p>第一轮结束后，9 作为数列中的最大元素，移到了最右侧。</p><p><strong>第二轮：</strong></p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221216202829209.png" alt="image-20221216202829209" style="zoom:43%;"><p>第二轮结束后，8 移到了 9 前面。</p><p>如此反复，最终数列为<code>[1,2,3,4,5,6,7,8,9]</code></p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221216223244310.png" alt="image-20221216223244310" style="zoom:45%;"><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public static void sort1(int[] array){
        //控制排序的轮数
        for (int i = 0; i &lt; array.length-1; i++) {
            //控制每一轮里的每一个比较步骤
            for (int j = 0; j &lt; array.length-i-1; j++) {
                int tmp = 0;
                if (array[j]&gt;array[j+1]){
                    tmp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = tmp;
                }
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是还有许多优化点：</p><p>1.通过上面的图可以发现，6 轮过后整个数列已经有序，但还是要执行第 7 轮。在这种情况下，如果能判断出数列已经有序，并做出标记，那么剩下的几轮排序就不必执行了，可以提前结束工作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static void sort2(int[] array){
        //控制排序的轮数
        for (int i = 0; i &lt; array.length-1; i++) {
            //有序标记，每一轮的初始值都是true
            boolean isSorted = true;
            //控制每一轮里的每一个比较步骤
            for (int j = 0; j &lt; array.length-i-1; j++) {
                int tmp = 0;
                if (array[j]&gt;array[j+1]){
                    tmp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = tmp;
                    // 因为有元素进行交换，所以不是有序的，变为false
                    isSorted = false;
                }
            }
            if (isSorted){
                break;
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.<img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221216224752612.png" alt="image-20221216224752612" style="zoom:67%;">按照现有的逻辑，有序区的长度和排序的轮数是相等的。例如第 1 轮排序过后的有序区长度是 1，第 2 轮排序过后的有序区长度是 2…… 实际上，数列真正的有序区可能会大于这个长度，如上述例子中在第 2 轮排序时，后面的 5 个元素实际上都已经属于有序区了。因此后面的多次元素比较是没有意义的。 那么，该如何避免这种情况呢？我们可以在每一轮排序后，记录下来最后一次元素交换的位置，该位置即为无序数列的边界，再往后就是有序区了。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sort3</span><span class="token punctuation">(</span><span class="token keyword">int</span> array<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">int</span> tmp  <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token comment">//记录最后一次交换的位置</span>
        <span class="token keyword">int</span> lastExchangeIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token comment">//无序数列的边界，每次比较只需要比到这里为止</span>
        <span class="token keyword">int</span> sortBorder <span class="token operator">=</span> array<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//有序标记，每一轮的初始是true</span>
            <span class="token keyword">boolean</span> isSorted <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> sortBorder<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> array<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    tmp <span class="token operator">=</span> array<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    array<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> array<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    array<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> tmp<span class="token punctuation">;</span>
                    <span class="token comment">//有元素交换，所以不是有序，标记变为false</span>
                    isSorted <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    <span class="token comment">//把无序数列的边界更新为最后一次交换元素的位置</span>
                    lastExchangeIndex <span class="token operator">=</span> j<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            sortBorder <span class="token operator">=</span> lastExchangeIndex<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>isSorted<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-快速排序" tabindex="-1"><a class="header-anchor" href="#_2-快速排序" aria-hidden="true">#</a> 2.快速排序</h2><p>冒泡排序在每一轮中只把 1 个元素冒泡到数列的一端，而<strong>快速排序则在每一轮挑选一个基准元素，并让其他比它大的元素移动到数列一边，比它小的元素移动到数列的另一边，从而把数列拆解成两个部分</strong></p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221216232400652.png" alt="image-20221216232400652" style="zoom:50%;"><p>这种思路就叫做<strong>分治法</strong>：原数列在每一轮都被拆分成两部分，每一部分在下一轮又分别被拆分成两部分，直到不可再分为止。每一轮的比较和交换，需要把数组全部元素都遍历一遍，时间复杂度是 O（n）。这样的遍历一共需要多少呢？假如元素个数是 n，那么平均情况下需要 logn 轮，因此快速排序算法总体的平均时间复杂度是 O（nlogn）。</p><h3 id="_2-1-基准元素的选择" tabindex="-1"><a class="header-anchor" href="#_2-1-基准元素的选择" aria-hidden="true">#</a> 2.1 基准元素的选择</h3><p>在分治过程中，以基准元素为中心，把其他元素移动到它的左右两边。</p><p>那么怎么选择呢？</p><p>最简单的方式是选择数列的第 1 个元素，但是在数列完全逆序的情况下会出现问题，所以可以**随机选择一个元素作为基准元素，并且让基准元素和数列首元素交换位置。**这样即使数列逆序也一样可以有效地将数列分成两部分。</p><p>快速排序的平均时间复杂度是 <strong>O（nlogn）</strong>，但最坏情况下的时间复杂度是 O（n2）</p><h3 id="_2-2-元素的交换" tabindex="-1"><a class="header-anchor" href="#_2-2-元素的交换" aria-hidden="true">#</a> 2.2 元素的交换</h3><ol><li>双边循环法</li><li>单边循环法</li></ol><h4 id="_2-2-1-双边循环" tabindex="-1"><a class="header-anchor" href="#_2-2-1-双边循环" aria-hidden="true">#</a> 2.2.1 <strong>双边循环</strong></h4><p>首先，选定基准元素 pivot，并且设置两个指针 left 和 right，指向数列的最左和最右两个元素。</p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221217210113337.png" alt="image-20221217210113337" style="zoom:58%;"><p><strong>第一次循环</strong>：从 right 指针开始，让指针所指向的元素和基准元素做比较。如果大于或等于 pivot，则指针向左移动；如果小于 pivot，则 right 指针停止移动，切换到 left 指针。在当前数列中，1 ＜ 4，所以 right 直接停止移动，换到 left 指针，进行下一步行动。轮到 left 指针行动，让指针所指向的元素和基准元素做比较。如果小于或等 pivot，则指针向右移动；如果大于 pivot，则 left 指针停止移动。</p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221217210655942.png" alt="image-20221217210655942" style="zoom:53%;"><p>**第二次循环：**重新切换到 right 指针，向左移动。right 指针先移动到 8，8 ＞ 4，继续左移。由于 2 ＜ 4，停止在 2 的位置。 按照这个思路，后续步骤如图所示</p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221217211035531.png" alt="image-20221217211035531" style="zoom:80%;"><p>双边循环快排代码实现</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class QuickSort {

    public static void quickSort(int[] arr, int startIndex, int endIndex) {
        // 递归结束条件：startIndex大等于endIndex的时候
        if (startIndex &gt;= endIndex) {
            return;
        }
        // 得到基准元素位置
        int pivotIndex = partition(arr, startIndex, endIndex);
        // 根据基准元素，分成两部分递归排序
        quickSort(arr, startIndex, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, endIndex);
    }

    /**
     * 分治（双边循环法）
     * @param arr     待交换的数组
     * @param startIndex    起始下标
     * @param endIndex    结束下标
     */
    private static int partition(int[] arr, int startIndex, int endIndex) {
        // 取第一个位置的元素作为基准元素（也可以选择随机位置）
        int pivot = arr[startIndex];
        int left = startIndex;
        int right = endIndex;

        while( left != right) {
            //控制right指针比较并左移
            while(left&lt;right &amp;&amp; arr[right] &gt; pivot){
                right--;
            }
            //控制left指针比较并右移
            while( left&lt;right &amp;&amp; arr[left] &lt;= pivot) {
                left++;
            }
            //交换left和right指向的元素
            if(left&lt;right) {
                int p = arr[left];
                arr[left] = arr[right];
                arr[right] = p;
            }
        }

        //pivot和指针重合点交换
        arr[startIndex] = arr[left];
        arr[left] = pivot;

        return left;
    }

    public static void main(String[] args) {
        int[] arr = new int[] {4,4,6,5,3,2,8,1};
        quickSort(arr, 0, arr.length-1);
        System.out.println(Arrays.toString(arr));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-2-单边循环" tabindex="-1"><a class="header-anchor" href="#_2-2-2-单边循环" aria-hidden="true">#</a> 2.2.2 单边循环</h4><p>开始和双边循环法相似，首先选定基准元素 pivot。同时，设置一个 mark 指针指向数列起始位置，这个 mark 指针代表小于基准元素的区域边界。</p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221217215454913.png" alt="image-20221217215454913" style="zoom:50%;"><p>接下来，从基准元素的下一个位置开始遍历数组。 如果遍历到的元素大于基准元素，就继续往后遍历。 如果遍历到的元素小于基准元素，则需要做两件事：第一，把 mark 指针右移 1 位，因为小于 pivot 的区域边界增大了 1；第二，让最新遍历到的元素和 mark 指针所在位置的元素交换位置，因为最新遍历的元素归属于小于 pivot 的区域。</p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221217215938872.png" alt="image-20221217215938872" style="zoom:50%;"><p>接下来步骤如下：</p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221218113757971.png" alt="image-20221218113757971" style="zoom:80%;"><p>双边循环和单边循环的区别在于 partition 函数的实现，代码实现如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class QuickSort {

    public static void quickSort(int[] arr, int startIndex, int endIndex) {
        // 递归结束条件：startIndex大等于endIndex的时候
        if (startIndex &gt;= endIndex) {
            return;
        }
        // 得到基准元素位置
        int pivotIndex = partition(arr, startIndex, endIndex);
        // 根据基准元素，分成两部分递归排序
        quickSort(arr, startIndex, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, endIndex);
    }

    /**
     * 分治（单边循环法）
     * @param arr     待交换的数组
     * @param startIndex    起始下标
     * @param endIndex    结束下标
     */
    private static int partitionV2(int[] arr, int startIndex, int endIndex) {
        // 取第一个位置的元素作为基准元素（也可以选择随机位置）
        int pivot = arr[startIndex];
        int mark = startIndex;

        for(int i=startIndex+1; i&lt;=endIndex; i++){
            if(arr[i]&lt;pivot){
                mark ++;
                int p = arr[mark];
                arr[mark] = arr[i];
                arr[i] = p;
            }
        }

        arr[startIndex] = arr[mark];
        arr[mark] = pivot;
        return mark;
    }

    public static void main(String[] args) {
        int[] arr = new int[] {4,4,6,5,3,2,8,1};
        quickSort(arr, 0, arr.length-1);
        System.out.println(Arrays.toString(arr));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-3-非递归实现" tabindex="-1"><a class="header-anchor" href="#_2-2-3-非递归实现" aria-hidden="true">#</a> 2.2.3 非递归实现</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QuickSortWithStack</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">quickSort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> startIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 用一个集合栈来代替递归的函数栈</span>
        <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> quickSortStack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 整个数列的起止下标，以哈希的形式入栈</span>
        <span class="token class-name">Map</span> rootParam <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        rootParam<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;startIndex&quot;</span><span class="token punctuation">,</span> startIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
        rootParam<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;endIndex&quot;</span><span class="token punctuation">,</span> endIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
        quickSortStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>rootParam<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 循环结束条件：栈为空时结束</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>quickSortStack<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 栈顶元素出栈，得到起止下标</span>
            <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> param <span class="token operator">=</span> quickSortStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 得到基准元素位置</span>
            <span class="token keyword">int</span> pivotIndex <span class="token operator">=</span> <span class="token function">partition</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;startIndex&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;endIndex&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 根据基准元素分成两部分, 把每一部分的起止下标入栈</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;startIndex&quot;</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span>  pivotIndex <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> leftParam <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                leftParam<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;startIndex&quot;</span><span class="token punctuation">,</span>  param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;startIndex&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                leftParam<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;endIndex&quot;</span><span class="token punctuation">,</span> pivotIndex <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                quickSortStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>leftParam<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>pivotIndex <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;endIndex&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> rightParam <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                rightParam<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;startIndex&quot;</span><span class="token punctuation">,</span> pivotIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                rightParam<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;endIndex&quot;</span><span class="token punctuation">,</span> param<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;endIndex&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                quickSortStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>rightParam<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 分治（单边循环法）
     * <span class="token keyword">@param</span> <span class="token parameter">arr</span>     待交换的数组
     * <span class="token keyword">@param</span> <span class="token parameter">startIndex</span>    起始下标
     * <span class="token keyword">@param</span> <span class="token parameter">endIndex</span>    结束下标
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">partition</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> startIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 取第一个位置的元素作为基准元素（也可以选择随机位置）</span>
        <span class="token keyword">int</span> pivot <span class="token operator">=</span> arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> mark <span class="token operator">=</span> startIndex<span class="token punctuation">;</span>

        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span>startIndex<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span>endIndex<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">&lt;</span>pivot<span class="token punctuation">)</span><span class="token punctuation">{</span>
                mark <span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token keyword">int</span> p <span class="token operator">=</span> arr<span class="token punctuation">[</span>mark<span class="token punctuation">]</span><span class="token punctuation">;</span>
                arr<span class="token punctuation">[</span>mark<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> p<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        arr<span class="token punctuation">[</span>startIndex<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>mark<span class="token punctuation">]</span><span class="token punctuation">;</span>
        arr<span class="token punctuation">[</span>mark<span class="token punctuation">]</span> <span class="token operator">=</span> pivot<span class="token punctuation">;</span>
        <span class="token keyword">return</span> mark<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token function">quickSort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> arr<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和刚才的递归实现相比，非递归方式代码的变动只发生在 quickSort 方法中。该方法引入了一个存储 Map 类型元素的栈，用于存储每一次交换时的起始下标和结束下标。 每一次循环，都会让栈顶元素出栈，通过 partition 方法进行分治，并且按照基准元素的位置分成左右两部分，左右两部分再分别入栈。当栈为空时，说明排序已经完毕，退出循环。</p><h2 id="_3-堆排序" tabindex="-1"><a class="header-anchor" href="#_3-堆排序" aria-hidden="true">#</a> 3.堆排序</h2><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221218160014762.png" alt="image-20221218160014762" style="zoom:80%;"><p>以最大堆为例，如果删除一个最大堆的堆顶（并不是完全删除，而是跟末尾的节点交换位置），经过自我调整，第 2 大的元素就会被交换上来，成为最大堆的新堆顶。</p><p>正如上图所示，在删除值为 10 的堆顶节点后，经过调整，值为 9 的新节点就会顶替上来；在删除值为 9 的堆顶节点后，经过调整，值为 8 的新节点就会顶替上来…… 由于二叉堆的这个特性，每一次删除旧堆顶，调整后的新堆顶都是大小仅次于旧堆顶的节点。那么只要反复删除堆顶，反复调整二叉堆，所得到的集合就会成为一个有序集合，过程如下。</p><p>删除节点 9，节点 8 成为新堆顶。</p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20230118195913298.png" alt="image-20230118195913298" style="zoom:67%;"><p>删除节点 8，节点 7 成为新堆顶。</p>`,58),l=n(`<p>如此重复执行，原本的最大二叉堆就已经变成了一个从小到大的有序集合。之前说过，二叉堆实际存储在数组中，数组中的元素排列如下。</p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20230118200237369.png" alt="image-20230118200237369" style="zoom:80%;"><p>1.把无序数组构建成二叉堆。需要从小到大排序，则构建成最大堆；需要从大到小排序，则构建成最小堆。</p><p>2.循环删除堆顶元素，替换到二叉堆的末尾，调整堆产生新的堆顶。</p><h3 id="_3-1-代码实现" tabindex="-1"><a class="header-anchor" href="#_3-1-代码实现" aria-hidden="true">#</a> 3.1 代码实现</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class HeapSort {

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
        while (childIndex &lt; length) {
            // 如果有右孩子，且右孩子大于左孩子的值，则定位到右孩子
            if (childIndex + 1 &lt; length &amp;&amp; array[childIndex + 1] &gt; array[childIndex]) {
                childIndex++;
            }
            // 如果父节点大于等于任何一个孩子的值，直接跳出
            if (temp &gt;= array[childIndex])
                break;
            //无需真正交换，单向赋值即可
            array[parentIndex] = array[childIndex];
            parentIndex = childIndex;
            childIndex = 2 * childIndex + 1;
        }
        array[parentIndex] = temp;
    }

    /**
     * 堆排序(升序)
     * @param array     待调整的堆
     */
    public static void heapSort(int[] array) {
        // 1.把无序数组构建成最大堆。
        for (int i = (array.length-2)/2; i &gt;= 0; i--) {
            downAdjust(array, i, array.length);
        }
        System.out.println(Arrays.toString(array));
        // 2.循环交换集合尾部元素到堆顶，并调节堆产生新的堆顶。
        for (int i = array.length - 1; i &gt; 0; i--) {
            // 最后一个元素和第一元素进行交换
            int temp = array[i];
            array[i] = array[0];
            array[0] = temp;
            // 下沉调整最大堆
            downAdjust(array, 0, i);
        }
    }

    public static void main(String[] args) {
        int[] arr = new int[] {1,3,2,6,5,7,8,9,10,0};
        heapSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>空间复杂度 O（1），时间复杂度 O（log n）</p><h2 id="_4-计数排序" tabindex="-1"><a class="header-anchor" href="#_4-计数排序" aria-hidden="true">#</a> 4.计数排序</h2>`,8);function c(o,r){return a(),e("div",null,[p,t(`
 <img src="C:/Users/52895/AppData/Roaming/Typora/typora-user-images/image-20230118200048814.png" alt="image-20230118200048814" style="zoom: 67%;" /> `),l])}const v=s(i,[["render",c],["__file","Sorting-Algorithm.html.vue"]]);export{v as default};
