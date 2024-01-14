import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as l,a as n,b as a,d as t,e}from"./app-9Gb0doIl.js";const i={},u=n("p",null,[n("strong",null,"Java 10"),a(" 发布于 2018 年 3 月 20 日，最知名的特性应该是 "),n("code",null,"var"),a(" 关键字（局部变量类型推断）的引入了，其他还有垃圾收集器改善、GC 改进、性能提升、线程管控等一批新特性。")],-1),r=n("p",null,[n("strong",null,"概览（精选了一部分）"),a(" ：")],-1),k={href:"https://openjdk.java.net/jeps/286",target:"_blank",rel:"noopener noreferrer"},d={href:"https://openjdk.java.net/jeps/304",target:"_blank",rel:"noopener noreferrer"},v={href:"https://openjdk.java.net/jeps/307",target:"_blank",rel:"noopener noreferrer"},h={href:"https://openjdk.java.net/jeps/310",target:"_blank",rel:"noopener noreferrer"},m={href:"https://openjdk.java.net/jeps/317",target:"_blank",rel:"noopener noreferrer"},g=e(`<h2 id="局部变量类型推断-var" tabindex="-1"><a class="header-anchor" href="#局部变量类型推断-var" aria-hidden="true">#</a> 局部变量类型推断(var)</h2><p>由于太多 Java 开发者希望 Java 中引入局部变量推断，于是 Java 10 的时候它来了，也算是众望所归了！</p><p>Java 10 提供了 <code>var</code> 关键字声明局部变量。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">var</span> id <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> codefx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">&quot;https://mp.weixin.qq.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> list <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token class-name">Paths</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;src/test/java/Java9FeaturesTest.java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> numbers <span class="token operator">=</span> <span class="token class-name">List</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> n <span class="token operator">:</span> list<span class="token punctuation">)</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>n<span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>var 关键字只能用于带有构造器的局部变量和 for 循环中。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">var</span> count<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">//❌编译不通过，不能声明为 null</span>
<span class="token keyword">var</span> r <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//❌编译不通过,不能声明为 Lambda表达式</span>
<span class="token keyword">var</span> array <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">;</span><span class="token comment">//❌编译不通过,不能声明数组</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>var 并不会改变 Java 是一门静态类型语言的事实，编译器负责推断出类型。</p><p>另外，Scala 和 Kotlin 中已经有了 <code>val</code> 关键字 ( <code>final var</code> 组合关键字)。</p>`,8),f={href:"https://zhuanlan.zhihu.com/p/34911982",target:"_blank",rel:"noopener noreferrer"},b=e(`<h2 id="垃圾回收器接口" tabindex="-1"><a class="header-anchor" href="#垃圾回收器接口" aria-hidden="true">#</a> 垃圾回收器接口</h2><p>在早期的 JDK 结构中，组成垃圾收集器 (GC) 实现的组件分散在代码库的各个部分。 Java 10 通过引入一套纯净的垃圾收集器接口来将不同垃圾收集器的源代码分隔开。</p><h2 id="g1-并行-full-gc" tabindex="-1"><a class="header-anchor" href="#g1-并行-full-gc" aria-hidden="true">#</a> G1 并行 Full GC</h2><p>从 Java9 开始 G1 就了默认的垃圾回收器，G1 是以一种低延时的垃圾回收器来设计的，旨在避免进行 Full GC,但是 Java9 的 G1 的 FullGC 依然是使用单线程去完成标记清除算法,这可能会导致垃圾回收期在无法回收内存的时候触发 Full GC。</p><p>为了最大限度地减少 Full GC 造成的应用停顿的影响，从 Java10 开始，G1 的 FullGC 改为并行的标记清除算法，同时会使用与年轻代回收和混合回收相同的并行工作线程数量，从而减少了 Full GC 的发生，以带来更好的性能提升、更大的吞吐量。</p><h2 id="集合增强" tabindex="-1"><a class="header-anchor" href="#集合增强" aria-hidden="true">#</a> 集合增强</h2><p><code>List</code>，<code>Set</code>，<code>Map</code> 提供了静态方法<code>copyOf()</code>返回入参集合的一个不可变拷贝。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">copyOf</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> coll<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">ImmutableCollections</span><span class="token punctuation">.</span><span class="token function">listCopy</span><span class="token punctuation">(</span>coll<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>copyOf()</code> 创建的集合为不可变集合，不能进行添加、删除、替换、 排序等操作，不然会报 <code>java.lang.UnsupportedOperationException</code> 异常。 IDEA 也会有相应的提示。</p><p><img src="https://guide-blog-images.oss-cn-shenzhen.aliyuncs.com/java-guide-blog/image-20210816154125579.png" alt=""></p><p>并且，<code>java.util.stream.Collectors</code> 中新增了静态方法，用于将流中的元素收集为不可变的集合。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">var</span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toUnmodifiableList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toUnmodifiableSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="optional-增强" tabindex="-1"><a class="header-anchor" href="#optional-增强" aria-hidden="true">#</a> Optional 增强</h2><p><code>Optional</code> 新增了<code>orElseThrow()</code>方法来在没有值时抛出指定的异常。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">getIfPresent</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">orElseThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">PrestoException</span><span class="token punctuation">(</span><span class="token constant">NOT_FOUND</span><span class="token punctuation">,</span> <span class="token string">&quot;Missing entry found for key: &quot;</span> <span class="token operator">+</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="应用程序类数据共享-扩展-cds-功能" tabindex="-1"><a class="header-anchor" href="#应用程序类数据共享-扩展-cds-功能" aria-hidden="true">#</a> 应用程序类数据共享(扩展 CDS 功能)</h2><p>在 Java 5 中就已经引入了类数据共享机制 (Class Data Sharing，简称 CDS)，允许将一组类预处理为共享归档文件，以便在运行时能够进行内存映射以减少 Java 程序的启动时间，当多个 Java 虚拟机（JVM）共享相同的归档文件时，还可以减少动态内存的占用量，同时减少多个虚拟机在同一个物理或虚拟的机器上运行时的资源占用。CDS 在当时还是 Oracle JDK 的商业特性。</p><p>Java 10 在现有的 CDS 功能基础上再次拓展，以允许应用类放置在共享存档中。CDS 特性在原来的 bootstrap 类基础之上，扩展加入了应用类的 CDS 为 (Application Class-Data Sharing，AppCDS) 支持，大大加大了 CDS 的适用范围。其原理为：在启动时记录加载类的过程，写入到文本文件中，再次启动时直接读取此启动文本并加载。设想如果应用环境没有大的变化，启动速度就会得到提升。</p><h2 id="实验性的基于-java-的-jit-编译器" tabindex="-1"><a class="header-anchor" href="#实验性的基于-java-的-jit-编译器" aria-hidden="true">#</a> 实验性的基于 Java 的 JIT 编译器</h2><p>Graal 是一个基于 Java 语言编写的 JIT 编译器，是 JDK 9 中引入的实验性 Ahead-of-Time (AOT) 编译器的基础。</p><p>Oracle 的 HotSpot VM 便附带两个用 C++ 实现的 JIT compiler：C1 及 C2。在Java 10 (Linux/x64, macOS/x64) 中，默认情况下HotSpot 仍使用C2，但通过向java 命令添加 <code>-XX:+UnlockExperimentalVMOptions -XX:+UseJVMCICompiler</code> 参数便可将 C2 替换成 Graal。</p>`,21),_={href:"https://www.infoq.cn/article/java-10-jit-compiler-graal",target:"_blank",rel:"noopener noreferrer"},j=n("h2",{id:"其他",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#其他","aria-hidden":"true"},"#"),a(" 其他")],-1),J=n("ul",null,[n("li",null,[n("strong",null,"线程-局部管控"),a("：Java 10 中线程管控引入 JVM 安全点的概念，将允许在不运行全局 JVM 安全点的情况下实现线程回调，由线程本身或者 JVM 线程来执行，同时保持线程处于阻塞状态，这种方式使得停止单个线程变成可能，而不是只能启用或停止所有线程")]),n("li",null,[n("strong",null,"备用存储装置上的堆分配"),a("：Java 10 中将使得 JVM 能够使用适用于不同类型的存储机制的堆，在可选内存设备上进行堆内存分配")]),n("li",null,"......")],-1),w=n("h2",{id:"参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考","aria-hidden":"true"},"#"),a(" 参考")],-1),C=n("li",null,[n("p",null,"Java 10 Features and Enhancements : https://howtodoinjava.com/java10/java10-features/")],-1),y={href:"https://www.baeldung.com/java-10-overview",target:"_blank",rel:"noopener noreferrer"},x=n("li",null,[n("p",null,"4 Class Data Sharing : https://docs.oracle.com/javase/10/vm/class-data-sharing.htm#JSJVM-GUID-7EAA3411-8CF0-4D19-BD05-DF5E1780AA91")],-1);function S(D,G){const s=o("ExternalLinkIcon");return c(),l("div",null,[u,r,n("ul",null,[n("li",null,[n("a",k,[a("JEP 286：局部变量类型推断"),t(s)])]),n("li",null,[n("a",d,[a("JEP 304：垃圾回收器接口"),t(s)])]),n("li",null,[n("a",v,[a("JEP 307：G1 并行 Full GC"),t(s)])]),n("li",null,[n("a",h,[a("JEP 310：应用程序类数据共享(扩展 CDS 功能)"),t(s)])]),n("li",null,[n("a",m,[a("JEP 317：实验性的基于 Java 的 JIT 编译器"),t(s)])])]),g,n("p",null,[a("相关阅读："),n("a",f,[a("《Java 10 新特性之局部变量类型推断》"),t(s)]),a("。")]),b,n("p",null,[a("相关阅读："),n("a",_,[a("深入浅出 Java 10 的实验性 JIT 编译器 Graal - 郑雨迪"),t(s)])]),j,J,w,n("ul",null,[C,n("li",null,[n("p",null,[a("Guide to Java10 : "),n("a",y,[a("https://www.baeldung.com/java-10-overview"),t(s)])])]),x])])}const O=p(i,[["render",S],["__file","java10.html.vue"]]);export{O as default};
