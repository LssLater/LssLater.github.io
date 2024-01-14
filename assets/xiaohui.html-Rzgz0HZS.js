import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-9Gb0doIl.js";const p={},t=e(`<hr><h2 id="_1、如何判断链表有环" tabindex="-1"><a class="header-anchor" href="#_1、如何判断链表有环" aria-hidden="true">#</a> 1、如何判断链表有环</h2><blockquote><p>题目：有一个单向链表，链表中有可能出现环，就像下图这样，那么，如何用程序来判断该链表是否为有环链表呢？</p></blockquote><p><img src="https://gitee.com/thirtyyy/img/raw/master/img//image-20220126214140061.png" alt="image-20220126214140061"></p><h3 id="_1-1-双重遍历" tabindex="-1"><a class="header-anchor" href="#_1-1-双重遍历" aria-hidden="true">#</a> 1.1 双重遍历</h3><p>首先从头结点开始，依次遍历单链表中的每一个节点，每遍历一个新节点，就从头检查新节点之前的所有节点，如果发现新节点和之前的某个节点相同，则说明该节点被遍历过两次，链表有环。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IsCycle</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> data<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> next<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token keyword">int</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isCycle</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> node1 <span class="token operator">=</span> node<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>node1 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> node2 <span class="token operator">=</span> node<span class="token punctuation">;</span>
            <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>node2 <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> j <span class="token operator">&lt;</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>node2 <span class="token operator">==</span> node1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                j<span class="token operator">++</span><span class="token punctuation">;</span>
                node2 <span class="token operator">=</span> node2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            i<span class="token operator">++</span><span class="token punctuation">;</span>
            node1 <span class="token operator">=</span> node1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> node1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node1<span class="token punctuation">.</span>next <span class="token operator">=</span> node2<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node2<span class="token punctuation">.</span>next <span class="token operator">=</span> node3<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node3<span class="token punctuation">.</span>next <span class="token operator">=</span> node4<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node5 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node4<span class="token punctuation">.</span>next <span class="token operator">=</span> node5<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node6 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node5<span class="token punctuation">.</span>next <span class="token operator">=</span> node6<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node7 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node6<span class="token punctuation">.</span>next <span class="token operator">=</span> node7<span class="token punctuation">;</span>
        node7<span class="token punctuation">.</span>next <span class="token operator">=</span> node4<span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">isCycle</span><span class="token punctuation">(</span>node1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设链表的节点数量为 n，则方法 1 的时间复杂度为：O(n^2)，空间复杂度为 O(1)。</p><h3 id="_1-2-哈希表" tabindex="-1"><a class="header-anchor" href="#_1-2-哈希表" aria-hidden="true">#</a> 1.2 哈希表</h3><p>首先创建一个 HashSet 用来存储曾经遍历过的节点，每遍历一个节点，都用新节点同 HashSet 中存储的节点进行比较，如果相同，则说明链表有环。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IsCycle</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> data<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> next<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token keyword">int</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isCycle1</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">&gt;</span></span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node1 <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>node1 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>node1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node1<span class="token punctuation">)</span><span class="token punctuation">;</span>
            node1 <span class="token operator">=</span> node1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> node1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node1<span class="token punctuation">.</span>next <span class="token operator">=</span> node2<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node2<span class="token punctuation">.</span>next <span class="token operator">=</span> node3<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node3<span class="token punctuation">.</span>next <span class="token operator">=</span> node4<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node5 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node4<span class="token punctuation">.</span>next <span class="token operator">=</span> node5<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node6 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node5<span class="token punctuation">.</span>next <span class="token operator">=</span> node6<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node7 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node6<span class="token punctuation">.</span>next <span class="token operator">=</span> node7<span class="token punctuation">;</span>
        node7<span class="token punctuation">.</span>next <span class="token operator">=</span> node4<span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">isCycle1</span><span class="token punctuation">(</span>node1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-快慢指针" tabindex="-1"><a class="header-anchor" href="#_1-3-快慢指针" aria-hidden="true">#</a> 1.3 快慢指针</h3><p>首先创建两个对象引用，让它们同时指向这个链表的头节点，然后开始一个大循环，让引用 1 每次向后移动 1 个节点，引用 2 每次向后移动 2 个节点，然后比较两个引用指向的节点是否相同，如果相同，则说明链表有环。类似于数学上的追及问题，因为是环形的，如果一个比另一个的速度快，那么它们肯定会相遇。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IsCycle</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> data<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> next<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token keyword">int</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isCycle2</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> node1 <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node2 <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>node2 <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> node2<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            node1 <span class="token operator">=</span> node1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            node2 <span class="token operator">=</span> node2<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>node1 <span class="token operator">==</span> node2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> node1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node1<span class="token punctuation">.</span>next <span class="token operator">=</span> node2<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node2<span class="token punctuation">.</span>next <span class="token operator">=</span> node3<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node3<span class="token punctuation">.</span>next <span class="token operator">=</span> node4<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node5 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node4<span class="token punctuation">.</span>next <span class="token operator">=</span> node5<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node6 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node5<span class="token punctuation">.</span>next <span class="token operator">=</span> node6<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> node7 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node6<span class="token punctuation">.</span>next <span class="token operator">=</span> node7<span class="token punctuation">;</span>
        node7<span class="token punctuation">.</span>next <span class="token operator">=</span> node4<span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">isCycle2</span><span class="token punctuation">(</span>node1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设链表的节点数量为 n，则方法 1 的时间复杂度为：O(n)，空间复杂度为 O(1)。</p><h3 id="_1-4-如果链表有环-如何求出环的长度" tabindex="-1"><a class="header-anchor" href="#_1-4-如果链表有环-如何求出环的长度" aria-hidden="true">#</a> 1.4 如果链表有环，如何求出环的长度</h3><p>当两个引用首次相遇，证明链表有环的时候，让两个引用从相遇点继续前进，并统计前进的次数，直到两个引用第二次相遇，此时这个前进次数就是环的长度。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>public static int getCycleLength(Node node) {
    Node node1 = node;
    Node node2 = node;
    boolean firstMeet = false;
    int length = 0;
    while (node2 != null &amp;&amp; node2.next != null) {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-如果链表有环-如何求出入环节点" tabindex="-1"><a class="header-anchor" href="#_1-5-如果链表有环-如何求出入环节点" aria-hidden="true">#</a> 1.5 如果链表有环，如何求出入环节点？</h3><p>只需要记住：从链表头节点到入环点的距离，等于从首次相遇点回到入环点的距离。</p><p>所以，当两个引用首次相遇，让一个引用回到头节点继续前进，一个节点从相遇点继续前进，都每次只前进一个节点，直到两个引用第二次相遇，第二次相遇点就是入环点。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>public static Node getInCycleNode(Node node) {
    Node node1 = node;
    Node node2 = node;
    while (node2 != null &amp;&amp; node2.next != null) {
        node1 = node1.next;
        node2 = node2.next.next;
        if (node1 == node2) {
            //第一次相遇
            node1 = node;
            break;
        }
    }

    while (node1 != null &amp;&amp; node2 != null) {
        if (node1 == node2) {
            //第二次相遇
            return node1;
        }
        node1 = node1.next;
        node2 = node2.next;
    }
    return null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),o=[t];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","xiaohui.html.vue"]]);export{k as default};
