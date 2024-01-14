import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as s,e as p}from"./app-9Gb0doIl.js";const e={},t=p(`<h2 id="为什么要求日期格式化时必须使用y表示年。而不能使用y" tabindex="-1"><a class="header-anchor" href="#为什么要求日期格式化时必须使用y表示年。而不能使用y" aria-hidden="true">#</a> 为什么要求日期格式化时必须使用y表示年。而不能使用Y？</h2><p>yyyy表示当天所在的年；而大写的YYYY表示week in which year（JDK7之后引入的概念），意思是当天所在的周属于的年份，一周从周日开始，周六结束，只要本周跨年，YYYY返回的就是下一年。</p><h2 id="为什么使用三目运算符时必须要注意类型对齐" tabindex="-1"><a class="header-anchor" href="#为什么使用三目运算符时必须要注意类型对齐" aria-hidden="true">#</a> 为什么使用三目运算符时必须要注意类型对齐？</h2><p>三目运算符condition？表达式1：表达式2中，高度注意表达式1和2在类型对齐时，可能出现因自动拆箱导致的NPE异常。</p><p>说明：以下两种场景会触发类型对齐的拆箱操作</p><p>1）表达式1或者表达式2的值只要有一个是原始类型。</p><p>2）表达式1或者表达式2的值的类型不一致，会强制拆箱升级成表示范围更大的那个类型。</p><p>反例：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">Integer</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">Integer</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">Integer</span> c <span class="token operator">=</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>
<span class="token keyword">Boolean</span> flag <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token comment">// a*b的结果是int类型，那么c会强制拆箱成int类型，抛出NPE异常</span>
<span class="token keyword">Integer</span> result <span class="token operator">=</span> <span class="token punctuation">(</span>flag?a<span class="token operator">*</span>b : c<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>三目运算符：</strong></p><p>对于条件表达式 b?x:y，先计算条件 b，然后进行判断。如果 b 的值为 true， 计算 x 的值，运算结果为 x 的值；否则，计算 y 的值，运算结果为 y 的值。一个条件 表达式从不会既计算 x，又计算 y。条件运算符是右结合的，也就是说，从右向左分 组计算。例如，a?b:c?d:e 将按 a?b:（c?d:e）执行 。</p><p><strong>自动装箱与自动拆箱：</strong></p><p>一般我们要创建一个类的对象实例的时候，我们会这样： Class a = new Class(parameters);</p><p>当我们创建一个 Integer 对象时，却可以这样： Integer i = 100;( 注意： 和 int i = 100; 是有区别的 )</p><p>实际上，执行上面那句代码的时候，系统为我们执行了： Integer i = Integer.valueOf(100);</p><p>这里暂且不讨论这个原理是怎么实现的（何时拆箱、何时装箱），也略过普通数据 类型和对象类型的区别。</p><p>我们可以理解为，当我们自己写的代码符合装（拆）箱规范的时候，编译器就会 自动帮我们拆（装）箱。</p><p>那么，这种不被程序员控制的自动拆（装）箱会不会存在什么问题呢？</p><p>看一下下面的代码存在的问题：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>Map<span class="token operator">&lt;</span>String<span class="token punctuation">,</span><span class="token keyword">Boolean</span><span class="token operator">&gt;</span> map <span class="token operator">=</span> new HashMap<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> <span class="token keyword">Boolean</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">Boolean</span> b <span class="token operator">=</span> <span class="token punctuation">(</span>map<span class="token operator">!=</span><span class="token boolean">null</span> ? map<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span> : <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 Exception <span class="token operator">in</span> thread <span class="token string">&quot;main&quot;</span> java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>NullPointerException  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>反编译后代码如下：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>HashMap hashmap <span class="token operator">=</span> new HashMap<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">Boolean</span> boolean1 <span class="token operator">=</span> <span class="token keyword">Boolean</span><span class="token punctuation">.</span>valueOf<span class="token punctuation">(</span>hashmap <span class="token operator">=</span><span class="token operator">=</span> <span class="token boolean">null</span> ? <span class="token boolean">false</span> : <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">Boolean</span><span class="token punctuation">)</span>
hashmap<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>booleanValue<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过分析发现问题出现在<code>((Boolean)hashmap.get(&quot;test&quot;)).booleanValue() </code></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>hashmap<span class="token punctuation">.</span>get<span class="token punctuation">(</span>“test”<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span><span class="token boolean">null</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">Boolean</span><span class="token punctuation">)</span><span class="token boolean">null</span><span class="token operator">-</span><span class="token operator">&gt;</span><span class="token boolean">null</span><span class="token punctuation">;</span>
<span class="token boolean">null</span><span class="token punctuation">.</span>booleanValue<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span> 报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看反编译之后的代码，得到结论： <strong>NPE 的原因应该是三目运算符和自动拆箱导致了空指针异常</strong></p><p>根据规定，三目运算的第二、 第三位操作数的返回值类型应该是一样的，这样 才能当把一个三目运算符的结果赋值给一个变量。</p><p>如：Person i = a&gt;b : i1:i2; ，就要求 i1 和 i2 的类型都必须是 Person 才行。</p><p>当第二，第三位操作数分别为基本类型和对象时，其中的对象 就会拆箱为基本类型进行操作.</p><p><strong>结论：</strong> 由于使用了三目运算符，并且第二、第三位操作数分别是基本 类型和对象。所以对对象进行拆箱操作，由于该对象为 null，所以在拆箱过程中调用 null.booleanValue() 的时候就报了 NPE。</p>`,29),o=[t];function l(c,i){return a(),s("div",null,o)}const k=n(e,[["render",l],["__file","java-17-question.html.vue"]]);export{k as default};