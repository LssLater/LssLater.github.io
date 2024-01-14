const e=JSON.parse('{"key":"v-fa48f88a","path":"/java/jvm/jvm-intro.html","title":"大白话带你认识JVM","lang":"zh-CN","frontmatter":{"category":"Java","tag":["JVM"],"description":"来自掘金用户：说出你的愿望吧丷 (https://juejin.im/user/5c2400afe51d45451758aa96)投稿，原文地址：https://juejin.im/post/5e1505d0f265da5d5d744050#heading-28 前言 如果在文中用词或者理解方面出现问题，欢迎指出。此文旨在提及而不深究，但会尽量效率地把...","head":[["meta",{"property":"og:url","content":"https://afterward.top/java/jvm/jvm-intro.html"}],["meta",{"property":"og:site_name","content":"AfterWard"}],["meta",{"property":"og:title","content":"大白话带你认识JVM"}],["meta",{"property":"og:description","content":"来自掘金用户：说出你的愿望吧丷 (https://juejin.im/user/5c2400afe51d45451758aa96)投稿，原文地址：https://juejin.im/post/5e1505d0f265da5d5d744050#heading-28 前言 如果在文中用词或者理解方面出现问题，欢迎指出。此文旨在提及而不深究，但会尽量效率地把..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-13T13:12:53.000Z"}],["meta",{"property":"article:author","content":"Mr.Lss"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:modified_time","content":"2024-01-13T13:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"大白话带你认识JVM\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-01-13T13:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Lss\\",\\"url\\":\\"https://afterward.top\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"一、JVM的基本介绍","slug":"一、jvm的基本介绍","link":"#一、jvm的基本介绍","children":[{"level":3,"title":"1.1 Java文件是如何被运行的","slug":"_1-1-java文件是如何被运行的","link":"#_1-1-java文件是如何被运行的","children":[]},{"level":3,"title":"1.2 简单的代码例子","slug":"_1-2-简单的代码例子","link":"#_1-2-简单的代码例子","children":[]}]},{"level":2,"title":"二、类加载器的介绍","slug":"二、类加载器的介绍","link":"#二、类加载器的介绍","children":[{"level":3,"title":"2.1 类加载器的流程","slug":"_2-1-类加载器的流程","link":"#_2-1-类加载器的流程","children":[]},{"level":3,"title":"2.2 类加载器的加载顺序","slug":"_2-2-类加载器的加载顺序","link":"#_2-2-类加载器的加载顺序","children":[]},{"level":3,"title":"2.3 双亲委派机制","slug":"_2-3-双亲委派机制","link":"#_2-3-双亲委派机制","children":[]}]},{"level":2,"title":"三、运行时数据区","slug":"三、运行时数据区","link":"#三、运行时数据区","children":[{"level":3,"title":"3.1 本地方法栈和程序计数器","slug":"_3-1-本地方法栈和程序计数器","link":"#_3-1-本地方法栈和程序计数器","children":[]},{"level":3,"title":"3.2 方法区","slug":"_3-2-方法区","link":"#_3-2-方法区","children":[]},{"level":3,"title":"3.3 虚拟机栈和虚拟机堆","slug":"_3-3-虚拟机栈和虚拟机堆","link":"#_3-3-虚拟机栈和虚拟机堆","children":[]},{"level":3,"title":"3.4 垃圾回收算法","slug":"_3-4-垃圾回收算法","link":"#_3-4-垃圾回收算法","children":[]},{"level":3,"title":"3.5 （了解）各种各样的垃圾回收器","slug":"_3-5-了解-各种各样的垃圾回收器","link":"#_3-5-了解-各种各样的垃圾回收器","children":[]},{"level":3,"title":"3.6 （了解）JVM的常用参数","slug":"_3-6-了解-jvm的常用参数","link":"#_3-6-了解-jvm的常用参数","children":[]}]},{"level":2,"title":"四、关于JVM调优的一些方面","slug":"四、关于jvm调优的一些方面","link":"#四、关于jvm调优的一些方面","children":[{"level":3,"title":"4.1 调整最大堆内存和最小堆内存","slug":"_4-1-调整最大堆内存和最小堆内存","link":"#_4-1-调整最大堆内存和最小堆内存","children":[]},{"level":3,"title":"4.2 调整新生代和老年代的比值","slug":"_4-2-调整新生代和老年代的比值","link":"#_4-2-调整新生代和老年代的比值","children":[]},{"level":3,"title":"4.3 调整Survivor区和Eden区的比值","slug":"_4-3-调整survivor区和eden区的比值","link":"#_4-3-调整survivor区和eden区的比值","children":[]},{"level":3,"title":"4.4 设置年轻代和老年代的大小","slug":"_4-4-设置年轻代和老年代的大小","link":"#_4-4-设置年轻代和老年代的大小","children":[]},{"level":3,"title":"4.5 小总结","slug":"_4-5-小总结","link":"#_4-5-小总结","children":[]},{"level":3,"title":"4.6 永久区的设置","slug":"_4-6-永久区的设置","link":"#_4-6-永久区的设置","children":[]},{"level":3,"title":"4.7 JVM的栈参数调优","slug":"_4-7-jvm的栈参数调优","link":"#_4-7-jvm的栈参数调优","children":[]},{"level":3,"title":"4.8 (可以直接跳过了)JVM其他参数介绍","slug":"_4-8-可以直接跳过了-jvm其他参数介绍","link":"#_4-8-可以直接跳过了-jvm其他参数介绍","children":[]}]},{"level":2,"title":"finally","slug":"finally","link":"#finally","children":[]}],"git":{"createdTime":1705151573000,"updatedTime":1705151573000,"contributors":[{"name":"lss","email":"528952805@qq.com","commits":1}]},"readingTime":{"minutes":31.52,"words":9457},"filePathRelative":"java/jvm/jvm-intro.md","localizedDate":"2024年1月13日","excerpt":"","autoDesc":true}');export{e as data};
