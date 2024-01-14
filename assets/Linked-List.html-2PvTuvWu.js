import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e as p}from"./app-9Gb0doIl.js";const e={},t=p(`<p><strong>链表</strong>是一种在物理上非连续、非顺序的数据结构，由若干节点所组成。</p><p><strong>单向链表的结构</strong></p><p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221212203616318.png" alt="image-20221212203616318"></p><p><strong>双向链表的结构</strong></p><p><img src="https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/image-20221213181924558.png" alt="image-20221213181924558"></p><h3 id="链表的基本操作" tabindex="-1"><a class="header-anchor" href="#链表的基本操作" aria-hidden="true">#</a> 链表的基本操作</h3><p><strong>1. 查找节点</strong></p><p>在查找元素时，链表不像数组那样可以通过下标快速进行定位，只能从头开始向后一个一个节点逐一查找。</p><p>例如查找链表中的第三个节点</p><ol><li>将查找的指针定位到头节点</li><li>根据头节点的 next 指针定位到第 2 个节点</li><li>根据第 2 个节点的 next 指针定位到第 3 个节点，查询完毕</li></ol><p><strong>2. 更新节点</strong></p><p>如果不考虑链表的查找过程，更新节点的过程就会像数组那样简单，直接把旧数据替换成新数据即可。</p><p><strong>3. 插入节点</strong></p><p>插入节点分为三种情况</p><ul><li><strong>头部插入</strong><ul><li>把新节点的 next 指针指向原来的头节点</li><li>把新节点变成链表的头节点</li></ul></li><li><strong>中间插入</strong><ul><li>把新节点的 next 指针指向插入位置的节点</li><li>把插入位置的前置节点的 next 指针指向新节点</li></ul></li><li><strong>尾部插入</strong>：把最后一个节点的 next 指针指向新插入的节点即可</li></ul><p><strong>4. 删除元素</strong></p><p>删除节点同样分为 3 种情况：</p><ul><li><strong>头部删除</strong>：把链表的头节点设为原先头节点的 next 指针即可</li><li><strong>中间删除</strong>： 把要删除的节点的前置指针指向要删除节点的下一个节点即可</li><li><strong>尾部删除</strong>：把倒数第二个节点的 next 指针指向 NULL 即可</li></ul><p>完整代码如下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>yu<span class="token punctuation">.</span>five<span class="token punctuation">.</span>test</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @Author: yy
 * @Date: 2022/12/13 21:41
 * @Version: 1.0.0
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyLinkedList</span> <span class="token punctuation">{</span>

    <span class="token comment">//头节点</span>
    <span class="token keyword">private</span> <span class="token class-name">Node</span> head<span class="token punctuation">;</span>
    <span class="token comment">//尾节点</span>
    <span class="token keyword">private</span> <span class="token class-name">Node</span> last<span class="token punctuation">;</span>
    <span class="token comment">//链表实际长度</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 链表节点
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> data<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> next<span class="token punctuation">;</span>

        <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token keyword">int</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 输出链表
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">output</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> temp <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>temp <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>temp<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
            temp <span class="token operator">=</span> temp<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 链表查找元素
     *
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> 查找的位置
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Node</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">&gt;</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;超出链表节点范围&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Node</span> temp <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> index<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            temp <span class="token operator">=</span> temp<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> temp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 链表插入
     *
     * <span class="token keyword">@param</span> <span class="token parameter">data</span>  插入元素
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> 插入位置
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">int</span> data<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">&gt;</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;超出链表节点范围&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Node</span> insertNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>size <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//空链表</span>
            head <span class="token operator">=</span> insertNode<span class="token punctuation">;</span>
            last <span class="token operator">=</span> insertNode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//头部插入</span>
            insertNode<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
            head <span class="token operator">=</span> insertNode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//插入尾部</span>
            last<span class="token punctuation">.</span>next <span class="token operator">=</span> insertNode<span class="token punctuation">;</span>
            last <span class="token operator">=</span> insertNode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> prevNode <span class="token operator">=</span> <span class="token function">get</span><span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            prevNode<span class="token punctuation">.</span>next <span class="token operator">=</span> insertNode<span class="token punctuation">;</span>
            insertNode<span class="token punctuation">.</span>next <span class="token operator">=</span> prevNode<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        size<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 删除链表节点
     *
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> 删除位置
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Node</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">&gt;</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;超出链表节点范围&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Node</span> removeNode <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//删除头节点</span>
            head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            removeNode <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//删除尾节点</span>
            <span class="token class-name">Node</span> prevNode <span class="token operator">=</span> <span class="token function">get</span><span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            removeNode <span class="token operator">=</span> prevNode<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            prevNode<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            last <span class="token operator">=</span> prevNode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">//删除中间节点</span>
            <span class="token class-name">Node</span> prevNode <span class="token operator">=</span> <span class="token function">get</span><span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Node</span> nextNode <span class="token operator">=</span> prevNode<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            removeNode <span class="token operator">=</span> prevNode<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            prevNode<span class="token punctuation">.</span>next <span class="token operator">=</span> nextNode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> removeNode<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">MyLinkedList</span> myLinkedList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyLinkedList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myLinkedList<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myLinkedList<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myLinkedList<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myLinkedList<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myLinkedList<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myLinkedList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myLinkedList<span class="token punctuation">.</span><span class="token function">output</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),o=[t];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","Linked-List.html.vue"]]);export{d as default};
