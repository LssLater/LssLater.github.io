const e=JSON.parse('{"key":"v-b1da5660","path":"/java/jvm/classloader.html","title":"类加载器详解","lang":"zh-CN","frontmatter":{"category":"Java","tag":["JVM"],"description":"回顾一下类加载过程 类加载过程：加载->连接->初始化。连接过程又可分为三步：验证->准备->解析。 类加载过程 一个非数组类的加载阶段（加载阶段获取类的二进制字节流的动作）是可控性最强的阶段，这一步我们可以去自定义类加载器去控制字节流的获取方式（重写一个类加载器的 loadClass() 方法）。数组类型不通过类加载器创建，它由 Java 虚拟机直接...","head":[["meta",{"property":"og:url","content":"https://afterward.top/java/jvm/classloader.html"}],["meta",{"property":"og:site_name","content":"AfterWard"}],["meta",{"property":"og:title","content":"类加载器详解"}],["meta",{"property":"og:description","content":"回顾一下类加载过程 类加载过程：加载->连接->初始化。连接过程又可分为三步：验证->准备->解析。 类加载过程 一个非数组类的加载阶段（加载阶段获取类的二进制字节流的动作）是可控性最强的阶段，这一步我们可以去自定义类加载器去控制字节流的获取方式（重写一个类加载器的 loadClass() 方法）。数组类型不通过类加载器创建，它由 Java 虚拟机直接..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-13T13:12:53.000Z"}],["meta",{"property":"article:author","content":"Mr.Lss"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:modified_time","content":"2024-01-13T13:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"类加载器详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-01-13T13:12:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Lss\\",\\"url\\":\\"https://afterward.top\\"}]}"]]},"headers":[{"level":2,"title":"回顾一下类加载过程","slug":"回顾一下类加载过程","link":"#回顾一下类加载过程","children":[]},{"level":2,"title":"类加载器总结","slug":"类加载器总结","link":"#类加载器总结","children":[]},{"level":2,"title":"双亲委派模型","slug":"双亲委派模型","link":"#双亲委派模型","children":[{"level":3,"title":"双亲委派模型介绍","slug":"双亲委派模型介绍","link":"#双亲委派模型介绍","children":[]},{"level":3,"title":"双亲委派模型实现源码分析","slug":"双亲委派模型实现源码分析","link":"#双亲委派模型实现源码分析","children":[]},{"level":3,"title":"双亲委派模型的好处","slug":"双亲委派模型的好处","link":"#双亲委派模型的好处","children":[]},{"level":3,"title":"如果我们不想用双亲委派模型怎么办？","slug":"如果我们不想用双亲委派模型怎么办","link":"#如果我们不想用双亲委派模型怎么办","children":[]}]},{"level":2,"title":"自定义类加载器","slug":"自定义类加载器","link":"#自定义类加载器","children":[]},{"level":2,"title":"推荐阅读","slug":"推荐阅读","link":"#推荐阅读","children":[]}],"git":{"createdTime":1705151573000,"updatedTime":1705151573000,"contributors":[{"name":"lss","email":"528952805@qq.com","commits":1}]},"readingTime":{"minutes":4.7,"words":1410},"filePathRelative":"java/jvm/classloader.md","localizedDate":"2024年1月13日","excerpt":"","autoDesc":true}');export{e as data};