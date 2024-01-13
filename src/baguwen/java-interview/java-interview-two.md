---
title: Java知识点问题汇总-上
category: Java
icon: et-performance
tag:
  - Java基础
---

## 3 Java 并发

### 3.1 并发基础

#### 多线程的出现是要解决什么问题的? 本质什么?

CPU、内存、I/O 设备的速度是有极大差异的，为了合理利用 CPU 的高性能，平衡这三者的速度差异，计算机体系结构、操作系统、编译程序都做出了贡献，主要体现为:

- CPU 增加了缓存，以均衡与内存的速度差异；// 导致可见性问题
- 操作系统增加了进程、线程，以分时复用 CPU，进而均衡 CPU 与 I/O 设备的速度差异；// 导致原子性问题
- 编译程序优化指令执行次序，使得缓存能够得到更加合理地利用。// 导致有序性问题

#### Java 是怎么解决并发问题的?

Java 内存模型是个很复杂的规范，具体看[Java 内存模型详解]()。

**理解的第一个维度：核心知识点**

JMM 本质上可以理解为，Java 内存模型规范了 JVM 如何提供按需禁用缓存和编译优化的方法。具体来说，这些方法包括：

- volatile、synchronized 和 final 三个关键字
- Happens-Before 规则

**理解的第二个维度：可见性，有序性，原子性**

- **原子性**

在 Java 中，对基本数据类型的变量的读取和赋值操作是原子性操作，即这些操作是不可被中断的，要么执行，要么不执行。 请分析以下哪些操作是原子性操作：

```java
x = 10;        //语句1: 直接将数值10赋值给x，也就是说线程执行这个语句的会直接将数值10写入到工作内存中
y = x;         //语句2: 包含2个操作，它先要去读取x的值，再将x的值写入工作内存，虽然读取x的值以及 将x的值写入工作内存 这2个操作都是原子性操作，但是合起来就不是原子性操作了。
x++;           //语句3： x++包括3个操作：读取x的值，进行加1操作，写入新的值。
x = x + 1;     //语句4： 同语句3

```

上面 4 个语句只有语句 1 的操作具备原子性。

也就是说，只有简单的读取、赋值（而且必须是将数字赋值给某个变量，变量之间的相互赋值不是原子操作）才是原子操作。

> 从上面可以看出，Java 内存模型只保证了基本读取和赋值是原子性操作，如果要实现更大范围操作的原子性，可以通过 synchronized 和 Lock 来实现。由于 synchronized 和 Lock 能够保证任一时刻只有一个线程执行该代码块，那么自然就不存在原子性问题了，从而保证了原子性。

- **可见性**

Java 提供了 volatile 关键字来保证可见性。

当一个共享变量被 volatile 修饰时，它会保证修改的值会立即被更新到主存，当有其他线程需要读取时，它会去内存中读取新值。

而普通的共享变量不能保证可见性，因为普通共享变量被修改之后，什么时候被写入主存是不确定的，当其他线程去读取时，此时内存中可能还是原来的旧值，因此无法保证可见性。

> 另外，通过 synchronized 和 Lock 也能够保证可见性，synchronized 和 Lock 能保证同一时刻只有一个线程获取锁然后执行同步代码，并且在释放锁之前会将对变量的修改刷新到主存当中。因此可以保证可见性。

- **有序性**

在 Java 里面，可以通过 volatile 关键字来保证一定的“有序性”。另外可以通过 synchronized 和 Lock 来保证有序性，很显然，synchronized 和 Lock 保证每个时刻是有一个线程执行同步代码，相当于是让线程顺序执行同步代码，自然就保证了有序性。当然 JMM 是通过 Happens-Before 规则来保证有序性的。

#### 线程安全有哪些实现思路?

1. **互斥同步**

synchronized 和 ReentrantLock。

1. **非阻塞同步**

互斥同步最主要的问题就是线程阻塞和唤醒所带来的性能问题，因此这种同步也称为阻塞同步。

互斥同步属于一种悲观的并发策略，总是认为只要不去做正确的同步措施，那就肯定会出现问题。无论共享数据是否真的会出现竞争，它都要进行加锁(这里讨论的是概念模型，实际上虚拟机会优化掉很大一部分不必要的加锁)、用户态核心态转换、维护锁计数器和检查是否有被阻塞的线程需要唤醒等操作。

- CAS

随着硬件指令集的发展，我们可以使用基于冲突检测的乐观并发策略: 先进行操作，如果没有其它线程争用共享数据，那操作就成功了，否则采取补偿措施(不断地重试，直到成功为止)。这种乐观的并发策略的许多实现都不需要将线程阻塞，因此这种同步操作称为非阻塞同步。

乐观锁需要操作和冲突检测这两个步骤具备原子性，这里就不能再使用互斥同步来保证了，只能靠硬件来完成。硬件支持的原子性操作最典型的是: 比较并交换(Compare-and-Swap，CAS)。CAS 指令需要有 3 个操作数，分别是内存地址 V、旧的预期值 A 和新值 B。当执行操作时，只有当 V 的值等于 A，才将 V 的值更新为 B。

- AtomicInteger

J.U.C 包里面的整数原子类 AtomicInteger，其中的 compareAndSet() 和 getAndIncrement() 等方法都使用了 Unsafe 类的 CAS 操作。

1. **无同步方案**

要保证线程安全，并不是一定就要进行同步。如果一个方法本来就不涉及共享数据，那它自然就无须任何同步措施去保证正确性。

- 栈封闭

多个线程访问同一个方法的局部变量时，不会出现线程安全问题，因为局部变量存储在虚拟机栈中，属于线程私有的。

- 线程本地存储(Thread Local Storage)

如果一段代码中所需要的数据必须与其他代码共享，那就看看这些共享数据的代码是否能保证在同一个线程中执行。如果能保证，我们就可以把共享数据的可见范围限制在同一个线程之内，这样，无须同步也能保证线程之间不出现数据争用的问题。

#### 如何理解并发和并行的区别?

并发是指一个处理器同时处理多个任务。

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403135131.png)

并行是指多个处理器或者是多核的处理器同时处理多个不同的任务。

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403135245.png)

#### 线程有哪几种状态? 分别说明从一种状态到另一种状态转变有哪些方式?

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403135313.png)

- 新建(New)

创建后尚未启动。

- 可运行(Runnable)

可能正在运行，也可能正在等待 CPU 时间片。

包含了操作系统线程状态中的 Running 和 Ready。

- 阻塞(Blocking)

等待获取一个排它锁，如果其线程释放了锁就会结束此状态。

- 无限期等待(Waiting)

等待其它线程显式地唤醒，否则不会被分配 CPU 时间片。

| 进入方法                                   | 退出方法                             |
| ------------------------------------------ | ------------------------------------ |
| 没有设置 Timeout 参数的 Object.wait() 方法 | Object.notify() / Object.notifyAll() |
| 没有设置 Timeout 参数的 Thread.join() 方法 | 被调用的线程执行完毕                 |
| LockSupport.park() 方法                    | -                                    |

- 限期等待(Timed Waiting)

无需等待其它线程显式地唤醒，在一定时间之后会被系统自动唤醒。

调用 Thread.sleep() 方法使线程进入限期等待状态时，常常用“使一个线程睡眠”进行描述。

调用 Object.wait() 方法使线程进入限期等待或者无限期等待时，常常用“挂起一个线程”进行描述。

睡眠和挂起是用来描述行为，而阻塞和等待用来描述状态。

阻塞和等待的区别在于，阻塞是被动的，它是在等待获取一个排它锁。而等待是主动的，通过调用 Thread.sleep() 和 Object.wait() 等方法进入。

| 进入方法                                 | 退出方法                                        |
| ---------------------------------------- | ----------------------------------------------- |
| Thread.sleep() 方法                      | 时间结束                                        |
| 设置了 Timeout 参数的 Object.wait() 方法 | 时间结束 / Object.notify() / Object.notifyAll() |
| 设置了 Timeout 参数的 Thread.join() 方法 | 时间结束 / 被调用的线程执行完毕                 |
| LockSupport.parkNanos() 方法             | -                                               |
| LockSupport.parkUntil() 方法             | -                                               |

- 死亡(Terminated)

可以是线程结束任务之后自己结束，或者产生了异常而结束。

#### 通常线程有哪几种使用方式?

有三种使用线程的方法:

- 实现 Runnable 接口；
- 实现 Callable 接口；
- 继承 Thread 类。

实现 Runnable 和 Callable 接口的类只能当做一个可以在线程中运行的任务，不是真正意义上的线程，因此最后还需要通过 Thread 来调用。可以说任务是通过线程驱动从而执行的。

#### 基础线程机制有哪些?

- **Executor**

Executor 管理多个异步任务的执行，而无需程序员显式地管理线程的生命周期。这里的异步是指多个任务的执行互不干扰，不需要进行同步操作。

主要有三种 Executor:

1. CachedThreadPool: 一个任务创建一个线程；
2. FixedThreadPool: 所有任务只能使用固定大小的线程；
3. SingleThreadExecutor: 相当于大小为 1 的 FixedThreadPool。

- **Daemon**

守护线程是程序运行时在后台提供服务的线程，不属于程序中不可或缺的部分。

当所有非守护线程结束时，程序也就终止，同时会杀死所有守护线程。

main() 属于非守护线程。使用 setDaemon() 方法将一个线程设置为守护线程。

- **sleep()**

Thread.sleep(millisec) 方法会休眠当前正在执行的线程，millisec 单位为毫秒。

sleep() 可能会抛出 InterruptedException，因为异常不能跨线程传播回 main() 中，因此必须在本地进行处理。线程中抛出的其它异常也同样需要在本地进行处理。

- **yield()**

对静态方法 Thread.yield() 的调用声明了当前线程已经完成了生命周期中最重要的部分，可以切换给其它线程来执行。该方法只是对线程调度器的一个建议，而且也只是建议具有相同优先级的其它线程可以运行。

#### 线程的中断方式有哪些?

一个线程执行完毕之后会自动结束，如果在运行过程中发生异常也会提前结束。

- **InterruptedException**

通过调用一个线程的 interrupt() 来中断该线程，如果该线程处于阻塞、限期等待或者无限期等待状态，那么就会抛出 InterruptedException，从而提前结束该线程。但是不能中断 I/O 阻塞和 synchronized 锁阻塞。

对于以下代码，在 main() 中启动一个线程之后再中断它，由于线程中调用了 Thread.sleep() 方法，因此会抛出一个 InterruptedException，从而提前结束线程，不执行之后的语句。

```java
public class InterruptExample {

    private static class MyThread1 extends Thread {
        @Override
        public void run() {
            try {
                Thread.sleep(2000);
                System.out.println("Thread run");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new MyThread1();
        thread1.start();
        thread1.interrupt();
        System.out.println("Main run");
    }
}
```

```html
Main run java.lang.InterruptedException: sleep interrupted at
java.lang.Thread.sleep(Native Method) at
InterruptExample.lambda$main$0(InterruptExample.java:5) at
InterruptExample$$Lambda$1/713338599.run(Unknown Source) at
java.lang.Thread.run(Thread.java:745)
```

- nterrupted()\*\*

如果一个线程的 run() 方法执行一个无限循环，并且没有执行 sleep() 等会抛出 InterruptedException 的操作，那么调用线程的 interrupt() 方法就无法使线程提前结束。

但是调用 interrupt() 方法会设置线程的中断标记，此时调用 interrupted() 方法会返回 true。因此可以在循环体中使用 interrupted() 方法来判断线程是否处于中断状态，从而提前结束线程。

- **Executor 的中断操作**

调用 Executor 的 shutdown() 方法会等待线程都执行完毕之后再关闭，但是如果调用的是 shutdownNow() 方法，则相当于调用每个线程的 interrupt() 方法。

#### 线程的互斥同步方式有哪些? 如何比较和选择?

Java 提供了两种锁机制来控制多个线程对共享资源的互斥访问，第一个是 JVM 实现的 synchronized，而另一个是 JDK 实现的 ReentrantLock。

**1. 锁的实现**

synchronized 是 JVM 实现的，而 ReentrantLock 是 JDK 实现的。

**2. 性能**

新版本 Java 对 synchronized 进行了很多优化，例如自旋锁等，synchronized 与 ReentrantLock 大致相同。

**3. 等待可中断**

当持有锁的线程长期不释放锁的时候，正在等待的线程可以选择放弃等待，改为处理其他事情。

ReentrantLock 可中断，而 synchronized 不行。

**4. 公平锁**

公平锁是指多个线程在等待同一个锁时，必须按照申请锁的时间顺序来依次获得锁。

synchronized 中的锁是非公平的，ReentrantLock 默认情况下也是非公平的，但是也可以是公平的。

**5. 锁绑定多个条件**

一个 ReentrantLock 可以同时绑定多个 Condition 对象。

#### 线程之间有哪些协作方式?

当多个线程可以一起工作去解决某个问题时，如果某些部分必须在其它部分之前完成，那么就需要对线程进行协调。

- **join()**

在线程中调用另一个线程的 join() 方法，会将当前线程挂起，而不是忙等待，直到目标线程结束。

对于以下代码，虽然 b 线程先启动，但是因为在 b 线程中调用了 a 线程的 join() 方法，b 线程会等待 a 线程结束才继续执行，因此最后能够保证 a 线程的输出先于 b 线程的输出。

```java
public class JoinExample {

    private class A extends Thread {
        @Override
        public void run() {
            System.out.println("A");
        }
    }

    private class B extends Thread {

        private A a;

        B(A a) {
            this.a = a;
        }

        @Override
        public void run() {
            try {
                a.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("B");
        }
    }

    public void test() {
        A a = new A();
        B b = new B(a);
        b.start();
        a.start();
    }
}

```

```java
public static void main(String[] args) {
    JoinExample example = new JoinExample();
    example.test();
}
```

```text
A
B

```

- **wait() notify() notifyAll()**

调用 wait() 使得线程等待某个条件满足，线程在等待时会被挂起，当其他线程的运行使得这个条件满足时，其它线程会调用 notify() 或者 notifyAll() 来唤醒挂起的线程。

它们都属于 Object 的一部分，而不属于 Thread。

只能用在同步方法或者同步控制块中使用，否则会在运行时抛出 IllegalMonitorStateExeception。

使用 wait() 挂起期间，线程会释放锁。这是因为，如果没有释放锁，那么其它线程就无法进入对象的同步方法或者同步控制块中，那么就无法执行 notify() 或者 notifyAll() 来唤醒挂起的线程，造成死锁。

**wait() 和 sleep() 的区别**

- wait() 是 Object 的方法，而 sleep() 是 Thread 的静态方法；
- wait() 会释放锁，sleep() 不会。

- **await() signal() signalAll()**

java.util.concurrent 类库中提供了 Condition 类来实现线程之间的协调，可以在 Condition 上调用 await() 方法使线程等待，其它线程调用 signal() 或 signalAll() 方法唤醒等待的线程。相比于 wait() 这种等待方式，await() 可以指定等待的条件，因此更加灵活。

### 3.2 并发关键字

- [关键字: synchronized 详解]()
- [关键字: volatile 详解]()
- [关键字: final 详解]()

#### Synchronized 可以作用在哪里?

- 对象锁
- 方法锁
- 类锁

#### Synchronized 本质上是通过什么保证线程安全的?

- **加锁和释放锁的原理**

深入 JVM 看字节码，创建如下的代码：

```java
public class SynchronizedDemo2 {
    Object object = new Object();
    public void method1() {
        synchronized (object) {

        }
    }
}
```

使用 javac 命令进行编译生成.class 文件

```bash
>javac SynchronizedDemo2.java
```

使用 javap 命令反编译查看.class 文件的信息

```bash
>javap -verbose SynchronizedDemo2.class
```

得到如下的信息：

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403135605.png)

关注红色方框里的`monitorenter`和`monitorexit`即可。

`Monitorenter`和`Monitorexit`指令，会让对象在执行，使其锁计数器加 1 或者减 1。每一个对象在同一时间只与一个 monitor(锁)相关联，而一个 monitor 在同一时间只能被一个线程获得，一个对象在尝试获得与这个对象相关联的 Monitor 锁的所有权的时候，monitorenter 指令会发生如下 3 中情况之一：

- monitor 计数器为 0，意味着目前还没有被获得，那这个线程就会立刻获得然后把锁计数器+1，一旦+1，别的线程再想获取，就需要等待
- 如果这个 monitor 已经拿到了这个锁的所有权，又重入了这把锁，那锁计数器就会累加，变成 2，并且随着重入的次数，会一直累加
- 这把锁已经被别的线程获取了，等待锁释放

`monitorexit指令`：释放对于 monitor 的所有权，释放过程很简单，就是讲 monitor 的计数器减 1，如果减完以后，计数器不是 0，则代表刚才是重入进来的，当前线程还继续持有这把锁的所有权，如果计数器变成 0，则代表当前线程不再拥有该 monitor 的所有权，即释放锁。

下图表现了对象，对象监视器，同步队列以及执行线程状态之间的关系：

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403135637.png)

该图可以看出，任意线程对 Object 的访问，首先要获得 Object 的监视器，如果获取失败，该线程就进入同步状态，线程状态变为 BLOCKED，当 Object 的监视器占有者释放后，在同步队列中得线程就会有机会重新获取该监视器。

- **可重入原理：加锁次数计数器**

上面的 demo 中在执行完同步代码块之后紧接着再会去执行一个静态同步方法，而这个方法锁的对象依然就这个类对象，那么这个正在执行的线程还需要获取该锁吗? 答案是不必的，从上图中就可以看出来，执行静态同步方法的时候就只有一条 monitorexit 指令，并没有 monitorenter 获取锁的指令。这就是锁的重入性，即在同一锁程中，线程不需要再次获取同一把锁。

Synchronized 先天具有重入性。每个对象拥有一个计数器，当线程获取该对象锁后，计数器就会加一，释放锁后就会将计数器减一。

- **保证可见性的原理：内存模型和 happens-before 规则**

Synchronized 的 happens-before 规则，即监视器锁规则：对同一个监视器的解锁，happens-before 于对该监视器的加锁。继续来看代码：

```java
public class MonitorDemo {
    private int a = 0;

    public synchronized void writer() {     // 1
        a++;                                // 2
    }                                       // 3

    public synchronized void reader() {    // 4
        int i = a;                         // 5
    }                                      // 6
}
```

该代码的 happens-before 关系如图所示：

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403140607.png)

在图中每一个箭头连接的两个节点就代表之间的 happens-before 关系，黑色的是通过程序顺序规则推导出来，红色的为监视器锁规则推导而出：线程 A 释放锁 happens-before 线程 B 加锁，蓝色的则是通过程序顺序规则和监视器锁规则推测出来 happens-befor 关系，通过传递性规则进一步推导的 happens-before 关系。现在我们来重点关注 2 happens-before 5，通过这个关系我们可以得出什么?

根据 happens-before 的定义中的一条:如果 A happens-before B，则 A 的执行结果对 B 可见，并且 A 的执行顺序先于 B。线程 A 先对共享变量 A 进行加一，由 2 happens-before 5 关系可知线程 A 的执行结果对线程 B 可见即线程 B 所读取到的 a 的值为 1。

#### Synchronized 使得同时只有一个线程可以执行，性能比较差，有什么提升的方法?

简单来说在 JVM 中 monitorenter 和 monitorexit 字节码依赖于底层的操作系统的 Mutex Lock 来实现的，但是由于使用 Mutex Lock 需要将当前线程挂起并从用户态切换到内核态来执行，这种切换的代价是非常昂贵的；然而在现实中的大部分情况下，同步方法是运行在单线程环境(无锁竞争环境)如果每次都调用 Mutex Lock 那么将严重的影响程序的性能。**不过在 jdk1.6 中对锁的实现引入了大量的优化，如锁粗化(Lock Coarsening)、锁消除(Lock Elimination)、轻量级锁(Lightweight Locking)、偏向锁(Biased Locking)、适应性自旋(Adaptive Spinning)等技术来减少锁操作的开销**。

- **锁粗化(Lock Coarsening)**：也就是减少不必要的紧连在一起的 unlock，lock 操作，将多个连续的锁扩展成一个范围更大的锁。
- **锁消除(Lock Elimination)**：通过运行时 JIT 编译器的逃逸分析来消除一些没有在当前同步块以外被其他线程共享的数据的锁保护，通过逃逸分析也可以在线程本地 Stack 上进行对象空间的分配(同时还可以减少 Heap 上的垃圾收集开销)。
- **轻量级锁(Lightweight Locking)**：这种锁实现的背后基于这样一种假设，即在真实的情况下我们程序中的大部分同步代码一般都处于无锁竞争状态(即单线程执行环境)，在无锁竞争的情况下完全可以避免调用操作系统层面的重量级互斥锁，取而代之的是在 monitorenter 和 monitorexit 中只需要依靠一条 CAS 原子指令就可以完成锁的获取及释放。当存在锁竞争的情况下，执行 CAS 指令失败的线程将调用操作系统互斥锁进入到阻塞状态，当锁被释放的时候被唤醒。
- **偏向锁(Biased Locking)**：是为了在无锁竞争的情况下避免在锁获取过程中执行不必要的 CAS 原子指令，因为 CAS 原子指令虽然相对于重量级锁来说开销比较小但还是存在非常可观的本地延迟。
- **适应性自旋(Adaptive Spinning)**：当线程在获取轻量级锁的过程中执行 CAS 操作失败时，在进入与 monitor 相关联的操作系统重量级锁(mutex semaphore)前会进入忙等待(Spinning)然后再次尝试，当尝试一定的次数后如果仍然没有成功则调用与该 monitor 关联的 semaphore(即互斥锁)进入到阻塞状态。

#### Synchronized 由什么样的缺陷? Java Lock 是怎么弥补这些缺陷的?

- **synchronized 的缺陷**

1. **效率低**：锁的释放情况少，只有代码执行完毕或者异常结束才会释放锁；试图获取锁的时候不能设定超时，不能中断一个正在使用锁的线程，相对而言，Lock 可以中断和设置超时
2. **不够灵活**：加锁和释放的时机单一，每个锁仅有一个单一的条件(某个对象)，相对而言，读写锁更加灵活
3. **无法知道是否成功获得锁**，相对而言，Lock 可以拿到状态

- **Lock 解决相应问题**

Lock 类这里不做过多解释，主要看里面的 4 个方法:

1. `lock()`: 加锁
2. `unlock()`: 解锁
3. `tryLock()`: 尝试获取锁，返回一个 boolean 值
4. `tryLock(long,TimeUtil)`: 尝试获取锁，可以设置超时

Synchronized 只有锁只与一个条件(是否获取锁)相关联，不灵活，后来**Condition 与 Lock 的结合**解决了这个问题。

多线程竞争一个锁时，其余未得到锁的线程只能不停的尝试获得锁，而不能中断。高并发的情况下会导致性能下降。ReentrantLock 的 lockInterruptibly()方法可以优先考虑响应中断。 一个线程等待时间过长，它可以中断自己，然后 ReentrantLock 响应这个中断，不再让这个线程继续等待。有了这个机制，使用 ReentrantLock 时就不会像 synchronized 那样产生死锁了。

#### Synchronized 和 Lock 的对比，和选择?

- **存在层次上**

synchronized: Java 的关键字，在 jvm 层面上

Lock: 是一个接口

- **锁的释放**

synchronized: 1、以获取锁的线程执行完同步代码，释放锁 2、线程执行发生异常，jvm 会让线程释放锁

Lock: 在 finally 中必须释放锁，不然容易造成线程死锁

- **锁的获取**

synchronized: 假设 A 线程获得锁，B 线程等待。如果 A 线程阻塞，B 线程会一直等待

Lock: 分情况而定，Lock 有多个锁获取的方式，大致就是可以尝试获得锁，线程可以不用一直等待(可以通过 tryLock 判断有没有锁)

- **锁的释放（死锁产生）**

synchronized: 在发生异常时候会自动释放占有的锁，因此不会出现死锁

Lock: 发生异常时候，不会主动释放占有的锁，必须手动 unlock 来释放锁，可能引起死锁的发生

- **锁的状态**

synchronized: 无法判断

Lock: 可以判断

- **锁的类型**

synchronized: 可重入 不可中断 非公平

Lock: 可重入 可判断 可公平（两者皆可）

- **性能**

synchronized: 少量同步

Lock: 大量同步

Lock 可以提高多个线程进行读操作的效率。（可以通过 readwritelock 实现读写分离） 在资源竞争不是很激烈的情况下，Synchronized 的性能要优于 ReetrantLock，但是在资源竞争很激烈的情况下，Synchronized 的性能会下降几十倍，但是 ReetrantLock 的性能能维持常态；

ReentrantLock 提供了多样化的同步，比如有时间限制的同步，可以被 Interrupt 的同步（synchronized 的同步是不能 Interrupt 的）等。在资源竞争不激烈的情形下，性能稍微比 synchronized 差点点。但是当同步非常激烈的时候，synchronized 的性能一下子能下降好几十倍。而 ReentrantLock 确还能维持常态。

- **调度**

synchronized: 使用 Object 对象本身的 wait 、notify、notifyAll 调度机制

Lock: 可以使用 Condition 进行线程之间的调度

- **用法**

synchronized: 在需要同步的对象中加入此控制，synchronized 可以加在方法上，也可以加在特定代码块中，括号中表示需要锁的对象。

Lock: 一般使用 ReentrantLock 类做为锁。在加锁和解锁处需要通过 lock()和 unlock()显示指出。所以一般会在 finally 块中写 unlock()以防死锁。

- **底层实现**

synchronized: 底层使用指令码方式来控制锁的，映射成字节码指令就是增加来两个指令：monitorenter 和 monitorexit。当线程执行遇到 monitorenter 指令时会尝试获取内置锁，如果获取锁则锁计数器+1，如果没有获取锁则阻塞；当遇到 monitorexit 指令时锁计数器-1，如果计数器为 0 则释放锁。

Lock: 底层是 CAS 乐观锁，依赖 AbstractQueuedSynchronizer 类，把所有的请求线程构成一个 CLH 队列。而对该队列的操作均通过 Lock-Free（CAS）操作。

#### Synchronized 在使用时有何注意事项?

- 锁对象不能为空，因为锁的信息都保存在对象头里
- 作用域不宜过大，影响程序执行的速度，控制范围过大，编写代码也容易出错
- 避免死锁
- 在能选择的情况下，既不要用 Lock 也不要用 synchronized 关键字，用 java.util.concurrent 包中的各种各样的类，如果不用该包下的类，在满足业务的情况下，可以使用 synchronized 关键，因为代码量少，避免出错

#### Synchronized 修饰的方法在抛出异常时,会释放锁吗?

会

#### 多个线程等待同一个 snchronized 锁的时候，JVM 如何选择下一个获取锁的线程?

非公平锁，即抢占式。

#### synchronized 是公平锁吗？

synchronized 实际上是非公平的，新来的线程有可能立即获得监视器，而在等待区中等候已久的线程可能再次等待，这样有利于提高性能，但是也可能会导致饥饿现象。

#### volatile 关键字的作用是什么?

- **防重排序** 我们从一个最经典的例子来分析重排序问题。大家应该都很熟悉单例模式的实现，而在并发环境下的单例实现方式，我们通常可以采用双重检查加锁(DCL)的方式来实现。其源码如下：

```java
public class Singleton {
    public static volatile Singleton singleton;
    /**
     * 构造函数私有，禁止外部实例化
     */
    private Singleton() {};
    public static Singleton getInstance() {
        if (singleton == null) {
            synchronized (singleton.class) {
                if (singleton == null) {
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }
}
```

现在我们分析一下为什么要在变量 singleton 之间加上 volatile 关键字。要理解这个问题，先要了解对象的构造过程，实例化一个对象其实可以分为三个步骤：

1. 分配内存空间。
2. 初始化对象。
3. 将内存空间的地址赋值给对应的引用。

但是由于操作系统可以**对指令进行重排序**，所以上面的过程也可能会变成如下过程：

1. 分配内存空间。
2. 将内存空间的地址赋值给对应的引用。
3. 初始化对象

如果是这个流程，多线程环境下就可能将一个未初始化的对象引用暴露出来，从而导致不可预料的结果。因此，为了防止这个过程的重排序，我们需要将变量设置为 volatile 类型的变量。

- **实现可见性**

可见性问题主要指一个线程修改了共享变量值，而另一个线程却看不到。引起可见性问题的主要原因是每个线程拥有自己的一个高速缓存区——线程工作内存。volatile 关键字能有效的解决这个问题，我们看下下面的例子，就可以知道其作用：

```java
public class VolatileTest {
    int a = 1;
    int b = 2;

    public void change(){
        a = 3;
        b = a;
    }

    public void print(){
        System.out.println("b="+b+";a="+a);
    }

    public static void main(String[] args) {
        while (true){
            final VolatileTest test = new VolatileTest();
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep(10);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    test.change();
                }
            }).start();
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep(10);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    test.print();
                }
            }).start();
        }
    }
}
```

直观上说，这段代码的结果只可能有两种：b=3;a=3 或 b=2;a=1。不过运行上面的代码(可能时间上要长一点)，你会发现除了上两种结果之外，还出现了第三种结果：

```java
......
b=2;a=1
b=2;a=1
b=3;a=3
b=3;a=3
b=3;a=1 // 这里
b=3;a=3
b=2;a=1
b=3;a=3
b=3;a=3
......
```

为什么会出现 b=3;a=1 这种结果呢? 正常情况下，如果先执行 change 方法，再执行 print 方法，输出结果应该为 b=3;a=3。相反，如果先执行的 print 方法，再执行 change 方法，结果应该是 b=2;a=1。那 b=3;a=1 的结果是怎么出来的? 原因就是第一个线程将值 a=3 修改后，但是对第二个线程是不可见的，所以才出现这一结果。如果将 a 和 b 都改成 volatile 类型的变量再执行，则再也不会出现 b=3;a=1 的结果了。

- **保证原子性:单次读/写**

volatile 不能保证完全的原子性，只能保证单次的读/写操作具有原子性。

#### volatile 能保证原子性吗?

不能完全保证，只能保证单次的读/写操作具有原子性。

#### 32 位机器上共享的 long 和 double 变量的为什么要用 volatile?

因为 long 和 double 两种数据类型的操作可分为高 32 位和低 32 位两部分，因此普通的 long 或 double 类型读/写可能不是原子的。因此，鼓励大家将共享的 long 和 double 变量设置为 volatile 类型，这样能保证任何情况下对 long 和 double 的单次读/写操作都具有原子性。

如下是 JLS 中的解释：

> 17.7 Non-Atomic Treatment of double and long

- For the purposes of the Java programming language memory model, a single write to a non-volatile long or double value is treated as two separate writes: one to each 32-bit half. This can result in a situation where a thread sees the first 32 bits of a 64-bit value from one write, and the second 32 bits from another write.
- Writes and reads of volatile long and double values are always atomic.
- Writes to and reads of references are always atomic, regardless of whether they are implemented as 32-bit or 64-bit values.
- Some implementations may find it convenient to divide a single write action on a 64-bit long or double value into two write actions on adjacent 32-bit values. For efficiency’s sake, this behavior is implementation-specific; an implementation of the Java Virtual Machine is free to perform writes to long and double values atomically or in two parts.
- Implementations of the Java Virtual Machine are encouraged to avoid splitting 64-bit values where possible. Programmers are encouraged to declare shared 64-bit values as volatile or synchronize their programs correctly to avoid possible complications.

目前各种平台下的商用虚拟机都选择把 64 位数据的读写操作作为原子操作来对待，因此我们在编写代码时一般不把 long 和 double 变量专门声明为 volatile 多数情况下也是不会错的。

#### volatile 是如何实现可见性的?

内存屏障。

#### volatile 是如何实现有序性的?

happens-before 等

#### 说下 volatile 的应用场景?

使用 volatile 必须具备的条件

1. 对变量的写操作不依赖于当前值。
2. 该变量没有包含在具有其他变量的不变式中。
3. 只有在状态真正独立于程序内其他内容时才能使用 volatile。

- **例子 1： 单例模式**

单例模式的一种实现方式，但很多人会忽略 volatile 关键字，因为没有该关键字，程序也可以很好的运行，只不过代码的稳定性总不是 100%，说不定在未来的某个时刻，隐藏的 bug 就出来了。

```java
class Singleton {
    private volatile static Singleton instance;
    private Singleton() {
    }
    public static Singleton getInstance() {
        if (instance == null) {
            syschronized(Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

- **例子 2： volatile bean**

在 volatile bean 模式中，JavaBean 的所有数据成员都是 volatile 类型的，并且 getter 和 setter 方法必须非常普通 —— 除了获取或设置相应的属性外，不能包含任何逻辑。此外，对于对象引用的数据成员，引用的对象必须是有效不可变的。(这将禁止具有数组值的属性，因为当数组引用被声明为 volatile 时，只有引用而不是数组本身具有 volatile 语义)。对于任何 volatile 变量，不变式或约束都不能包含 JavaBean 属性。

```java
@ThreadSafe
public class Person {
    private volatile String firstName;
    private volatile String lastName;
    private volatile int age;

    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public int getAge() { return age; }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

#### [¶](#所有的final修饰的字段都是编译期常量吗) 所有的 final 修饰的字段都是编译期常量吗?

不是

#### [¶](#如何理解private所修饰的方法是隐式的final) 如何理解 private 所修饰的方法是隐式的 final?

类中所有 private 方法都隐式地指定为 final 的，由于无法取用 private 方法，所以也就不能覆盖它。可以对 private 方法增添 final 关键字，但这样做并没有什么好处。看下下面的例子：

```java
public class Base {
    private void test() {
    }
}

public class Son extends Base{
    public void test() {
    }
    public static void main(String[] args) {
        Son son = new Son();
        Base father = son;
        //father.test();
    }
}
```

Base 和 Son 都有方法 test(),但是这并不是一种覆盖，因为 private 所修饰的方法是隐式的 final，也就是无法被继承，所以更不用说是覆盖了，在 Son 中的 test()方法不过是属于 Son 的新成员罢了，Son 进行向上转型得到 father，但是 father.test()是不可执行的，因为 Base 中的 test 方法是 private 的，无法被访问到。

#### 说说 final 类型的类如何拓展?

比如 String 是 final 类型，我们想写个 MyString 复用所有 String 中方法，同时增加一个新的 toMyString()的方法，应该如何做?

外观模式：

```java
/**
* @pdai
*/
class MyString{

    private String innerString;

    // ...init & other methods

    // 支持老的方法
    public int length(){
        return innerString.length(); // 通过innerString调用老的方法
    }

    // 添加新方法
    public String toMyString(){
        //...
    }
}
```

#### final 方法可以被重载吗?

我们知道父类的 final 方法是不能够被子类重写的，那么 final 方法可以被重载吗? 答案是可以的，下面代码是正确的。

```java
public class FinalExampleParent {
    public final void test() {
    }

    public final void test(String str) {
    }
}
```

#### 父类的 final 方法能不能够被子类重写?

不可以

#### 说说基本类型的 final 域重排序规则?

先看一段示例性的代码：

```java
public class FinalDemo {
    private int a;  //普通域
    private final int b; //final域
    private static FinalDemo finalDemo;

    public FinalDemo() {
        a = 1; // 1. 写普通域
        b = 2; // 2. 写final域
    }

    public static void writer() {
        finalDemo = new FinalDemo();
    }

    public static void reader() {
        FinalDemo demo = finalDemo; // 3.读对象引用
        int a = demo.a;    //4.读普通域
        int b = demo.b;    //5.读final域
    }
}
```

假设线程 A 在执行 writer()方法，线程 B 执行 reader()方法。

- **写 final 域重排序规则**

写 final 域的重排序规则禁止对 final 域的写重排序到构造函数之外，这个规则的实现主要包含了两个方面：

- JMM 禁止编译器把 final 域的写重排序到构造函数之外；
- 编译器会在 final 域写之后，构造函数 return 之前，插入一个 storestore 屏障。这个屏障可以禁止处理器把 final 域的写重排序到构造函数之外。

我们再来分析 writer 方法，虽然只有一行代码，但实际上做了两件事情：

- 构造了一个 FinalDemo 对象；
- 把这个对象赋值给成员变量 finalDemo。

我们来画下存在的一种可能执行时序图，如下：

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403143643.png)

由于 a,b 之间没有数据依赖性，普通域(普通变量)a 可能会被重排序到构造函数之外，线程 B 就有可能读到的是普通变量 a 初始化之前的值(零值)，这样就可能出现错误。而 final 域变量 b，根据重排序规则，会禁止 final 修饰的变量 b 重排序到构造函数之外，从而 b 能够正确赋值，线程 B 就能够读到 final 变量初始化后的值。

因此，写 final 域的重排序规则可以确保：在对象引用为任意线程可见之前，对象的 final 域已经被正确初始化过了，而普通域就不具有这个保障。比如在上例，线程 B 有可能就是一个未正确初始化的对象 finalDemo。

- **读 final 域重排序规则**

读 final 域重排序规则为：在一个线程中，初次读对象引用和初次读该对象包含的 final 域，JMM 会禁止这两个操作的重排序。(注意，这个规则仅仅是针对处理器)，处理器会在读 final 域操作的前面插入一个 LoadLoad 屏障。实际上，读对象的引用和读该对象的 final 域存在间接依赖性，一般处理器不会重排序这两个操作。但是有一些处理器会重排序，因此，这条禁止重排序规则就是针对这些处理器而设定的。

read()方法主要包含了三个操作：

- 初次读引用变量 finalDemo;
- 初次读引用变量 finalDemo 的普通域 a;
- 初次读引用变量 finalDemo 的 final 与 b;

假设线程 A 写过程没有重排序，那么线程 A 和线程 B 有一种的可能执行时序为下图：

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403143050.png)

读对象的普通域被重排序到了读对象引用的前面就会出现线程 B 还未读到对象引用就在读取该对象的普通域变量，这显然是错误的操作。而 final 域的读操作就“限定”了在读 final 域变量前已经读到了该对象的引用，从而就可以避免这种情况。

读 final 域的重排序规则可以确保：在读一个对象的 final 域之前，一定会先读这个包含这个 final 域的对象的引用。

#### [¶](#说说final的原理) 说说 final 的原理?

- 写 final 域会要求编译器在 final 域写之后，构造函数返回前插入一个 StoreStore 屏障。
- 读 final 域的重排序规则会要求编译器在读 final 域的操作前插入一个 LoadLoad 屏障。

PS:很有意思的是，如果以 X86 处理为例，X86 不会对写-写重排序，所以 StoreStore 屏障可以省略。由于不会对有间接依赖性的操作重排序，所以在 X86 处理器中，读 final 域需要的 LoadLoad 屏障也会被省略掉。也就是说，以 X86 为例的话，对 final 域的读/写的内存屏障都会被省略！具体是否插入还是得看是什么处理器。

### [¶](#33-juc全局观) 3.3 JUC 全局观

- [JUC - 类汇总和学习指南]()

#### [¶](#juc框架包含几个部分) JUC 框架包含几个部分?

五个部分：

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403141209.png)

主要包含: (注意: 上图是网上找的图，无法表述一些继承关系，同时少了部分类；但是主体上可以看出其分类关系也够了)

- Lock 框架和 Tools 类(把图中这两个放到一起理解)
- Collections: 并发集合
- Atomic: 原子类
- Executors: 线程池

#### [¶](#lock框架和tools哪些核心的类) Lock 框架和 Tools 哪些核心的类?

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403141142.png)

- **接口: Condition**， Condition 为接口类型，它将 Object 监视器方法(wait、notify 和 notifyAll)分解成截然不同的对象，以便通过将这些对象与任意 Lock 实现组合使用，为每个对象提供多个等待 set (wait-set)。其中，Lock 替代了 synchronized 方法和语句的使用，Condition 替代了 Object 监视器方法的使用。可以通过 await(),signal()来休眠/唤醒线程。
- **接口: Lock**，Lock 为接口类型，Lock 实现提供了比使用 synchronized 方法和语句可获得的更广泛的锁定操作。此实现允许更灵活的结构，可以具有差别很大的属性，可以支持多个相关的 Condition 对象。
- **接口 ReadWriteLock** ReadWriteLock 为接口类型， 维护了一对相关的锁，一个用于只读操作，另一个用于写入操作。只要没有 writer，读取锁可以由多个 reader 线程同时保持。写入锁是独占的。
- **抽象类: AbstractOwnableSynchonizer** AbstractOwnableSynchonizer 为抽象类，可以由线程以独占方式拥有的同步器。此类为创建锁和相关同步器(伴随着所有权的概念)提供了基础。AbstractOwnableSynchronizer 类本身不管理或使用此信息。但是，子类和工具可以使用适当维护的值帮助控制和监视访问以及提供诊断。
- **抽象类(long): AbstractQueuedLongSynchronizer** AbstractQueuedLongSynchronizer 为抽象类，以 long 形式维护同步状态的一个 AbstractQueuedSynchronizer 版本。此类具有的结构、属性和方法与 AbstractQueuedSynchronizer 完全相同，但所有与状态相关的参数和结果都定义为 long 而不是 int。当创建需要 64 位状态的多级别锁和屏障等同步器时，此类很有用。
- **核心抽象类(int): AbstractQueuedSynchonizer** AbstractQueuedSynchonizer 为抽象类，其为实现依赖于先进先出 (FIFO) 等待队列的阻塞锁和相关同步器(信号量、事件，等等)提供一个框架。此类的设计目标是成为依靠单个原子 int 值来表示状态的大多数同步器的一个有用基础。
- **锁常用类: LockSupport** LockSupport 为常用类，用来创建锁和其他同步类的基本线程阻塞原语。LockSupport 的功能和"Thread 中的 Thread.suspend()和 Thread.resume()有点类似"，LockSupport 中的 park() 和 unpark() 的作用分别是阻塞线程和解除阻塞线程。但是 park()和 unpark()不会遇到“Thread.suspend 和 Thread.resume 所可能引发的死锁”问题。
- **锁常用类: ReentrantLock** ReentrantLock 为常用类，它是一个可重入的互斥锁 Lock，它具有与使用 synchronized 方法和语句所访问的隐式监视器锁相同的一些基本行为和语义，但功能更强大。
- **锁常用类: ReentrantReadWriteLock** ReentrantReadWriteLock 是读写锁接口 ReadWriteLock 的实现类，它包括 Lock 子类 ReadLock 和 WriteLock。ReadLock 是共享锁，WriteLock 是独占锁。
- **锁常用类: StampedLock** 它是 java8 在 java.util.concurrent.locks 新增的一个 API。StampedLock 控制锁有三种模式(写，读，乐观读)，一个 StampedLock 状态是由版本和模式两个部分组成，锁获取方法返回一个数字作为票据 stamp，它用相应的锁状态表示并控制访问，数字 0 表示没有写锁被授权访问。在读锁上分为悲观锁和乐观锁。
- **工具常用类: CountDownLatch** CountDownLatch 为常用类，它是一个同步辅助类，在完成一组正在其他线程中执行的操作之前，它允许一个或多个线程一直等待。
- **工具常用类: CyclicBarrier** CyclicBarrier 为常用类，其是一个同步辅助类，它允许一组线程互相等待，直到到达某个公共屏障点 (common barrier point)。在涉及一组固定大小的线程的程序中，这些线程必须不时地互相等待，此时 CyclicBarrier 很有用。因为该 barrier 在释放等待线程后可以重用，所以称它为循环 的 barrier。
- **工具常用类: Phaser** Phaser 是 JDK 7 新增的一个同步辅助类，它可以实现 CyclicBarrier 和 CountDownLatch 类似的功能，而且它支持对任务的动态调整，并支持分层结构来达到更高的吞吐量。
- **工具常用类: Semaphore** Semaphore 为常用类，其是一个计数信号量，从概念上讲，信号量维护了一个许可集。如有必要，在许可可用前会阻塞每一个 acquire()，然后再获取该许可。每个 release() 添加一个许可，从而可能释放一个正在阻塞的获取者。但是，不使用实际的许可对象，Semaphore 只对可用许可的号码进行计数，并采取相应的行动。通常用于限制可以访问某些资源(物理或逻辑的)的线程数目。
- **工具常用类: Exchanger** Exchanger 是用于线程协作的工具类, 主要用于两个线程之间的数据交换。它提供一个同步点，在这个同步点，两个线程可以交换彼此的数据。这两个线程通过 exchange()方法交换数据，当一个线程先执行 exchange()方法后，它会一直等待第二个线程也执行 exchange()方法，当这两个线程到达同步点时，这两个线程就可以交换数据了。

#### JUC 并发集合哪些核心的类?

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403141059.png)

- **Queue: ArrayBlockingQueue** 一个由数组支持的有界阻塞队列。此队列按 FIFO(先进先出)原则对元素进行排序。队列的头部 是在队列中存在时间最长的元素。队列的尾部 是在队列中存在时间最短的元素。新元素插入到队列的尾部，队列获取操作则是从队列头部开始获得元素。
- **Queue: LinkedBlockingQueue** 一个基于已链接节点的、范围任意的 blocking queue。此队列按 FIFO(先进先出)排序元素。队列的头部 是在队列中时间最长的元素。队列的尾部 是在队列中时间最短的元素。新元素插入到队列的尾部，并且队列获取操作会获得位于队列头部的元素。链接队列的吞吐量通常要高于基于数组的队列，但是在大多数并发应用程序中，其可预知的性能要低。
- **Queue: LinkedBlockingDeque** 一个基于已链接节点的、任选范围的阻塞双端队列。
- **Queue: ConcurrentLinkedQueue** 一个基于链接节点的无界线程安全队列。此队列按照 FIFO(先进先出)原则对元素进行排序。队列的头部 是队列中时间最长的元素。队列的尾部 是队列中时间最短的元素。新的元素插入到队列的尾部，队列获取操作从队列头部获得元素。当多个线程共享访问一个公共 collection 时，ConcurrentLinkedQueue 是一个恰当的选择。此队列不允许使用 null 元素。
- **Queue: ConcurrentLinkedDeque** 是双向链表实现的无界队列，该队列同时支持 FIFO 和 FILO 两种操作方式。
- **Queue: DelayQueue** 延时无界阻塞队列，使用 Lock 机制实现并发访问。队列里只允许放可以“延期”的元素，队列中的 head 是最先“到期”的元素。如果队里中没有元素到“到期”，那么就算队列中有元素也不能获取到。
- **Queue: PriorityBlockingQueue** 无界优先级阻塞队列，使用 Lock 机制实现并发访问。priorityQueue 的线程安全版，不允许存放 null 值，依赖于 comparable 的排序，不允许存放不可比较的对象类型。
- **Queue: SynchronousQueue** 没有容量的同步队列，通过 CAS 实现并发访问，支持 FIFO 和 FILO。
- **Queue: LinkedTransferQueue** JDK 7 新增，单向链表实现的无界阻塞队列，通过 CAS 实现并发访问，队列元素使用 FIFO(先进先出)方式。LinkedTransferQueue 可以说是 ConcurrentLinkedQueue、SynchronousQueue(公平模式)和 LinkedBlockingQueue 的超集, 它不仅仅综合了这几个类的功能，同时也提供了更高效的实现。
- **List: CopyOnWriteArrayList** ArrayList 的一个线程安全的变体，其中所有可变操作(add、set 等等)都是通过对底层数组进行一次新的复制来实现的。这一般需要很大的开销，但是当遍历操作的数量大大超过可变操作的数量时，这种方法可能比其他替代方法更 有效。在不能或不想进行同步遍历，但又需要从并发线程中排除冲突时，它也很有用。
- **Set: CopyOnWriteArraySet** 对其所有操作使用内部 CopyOnWriteArrayList 的 Set。即将所有操作转发至 CopyOnWriteArayList 来进行操作，能够保证线程安全。在 add 时，会调用 addIfAbsent，由于每次 add 时都要进行数组遍历，因此性能会略低于 CopyOnWriteArrayList。
- **Set: ConcurrentSkipListSet** 一个基于 ConcurrentSkipListMap 的可缩放并发 NavigableSet 实现。set 的元素可以根据它们的自然顺序进行排序，也可以根据创建 set 时所提供的 Comparator 进行排序，具体取决于使用的构造方法。
- **Map: ConcurrentHashMap** 是线程安全 HashMap 的。ConcurrentHashMap 在 JDK 7 之前是通过 Lock 和 segment(分段锁)实现，JDK 8 之后改为 CAS+synchronized 来保证并发安全。
- **Map: ConcurrentSkipListMap** 线程安全的有序的哈希表(相当于线程安全的 TreeMap);映射可以根据键的自然顺序进行排序，也可以根据创建映射时所提供的 Comparator 进行排序，具体取决于使用的构造方法。

#### [¶](#juc原子类哪些核心的类) JUC 原子类哪些核心的类?

其基本的特性就是在多线程环境下，当有多个线程同时执行这些类的实例包含的方法时，具有排他性，即当某个线程进入方法，执行其中的指令时，不会被其他线程打断，而别的线程就像自旋锁一样，一直等到该方法执行完成，才由 JVM 从等待队列中选择一个另一个线程进入，这只是一种逻辑上的理解。实际上是借助硬件的相关指令来实现的，不会阻塞线程(或者说只是在硬件级别上阻塞了)。

- 原子更新基本类型
  - AtomicBoolean: 原子更新布尔类型。
  - AtomicInteger: 原子更新整型。
  - AtomicLong: 原子更新长整型。
- 原子更新数组
  - AtomicIntegerArray: 原子更新整型数组里的元素。
  - AtomicLongArray: 原子更新长整型数组里的元素。
  - AtomicReferenceArray: 原子更新引用类型数组里的元素。
- 原子更新引用类型
  - AtomicIntegerFieldUpdater: 原子更新整型的字段的更新器。
  - AtomicLongFieldUpdater: 原子更新长整型字段的更新器。
  - AtomicStampedFieldUpdater: 原子更新带有版本号的引用类型。
  - AtomicReferenceFieldUpdater: 上面已经说过此处不在赘述
- 原子更新字段类
  - AtomicReference: 原子更新引用类型。
  - AtomicStampedReference: 原子更新引用类型, 内部使用 Pair 来存储元素值及其版本号。
  - AtomicMarkableReferce: 原子更新带有标记位的引用类型。

#### [¶](#juc线程池哪些核心的类) JUC 线程池哪些核心的类?

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403143737.png)

- **接口: Executor** Executor 接口提供一种将任务提交与每个任务将如何运行的机制(包括线程使用的细节、调度等)分离开来的方法。通常使用 Executor 而不是显式地创建线程。
- **ExecutorService** ExecutorService 继承自 Executor 接口，ExecutorService 提供了管理终止的方法，以及可为跟踪一个或多个异步任务执行状况而生成 Future 的方法。 可以关闭 ExecutorService，这将导致其停止接受新任务。关闭后，执行程序将最后终止，这时没有任务在执行，也没有任务在等待执行，并且无法提交新任务。
- **ScheduledExecutorService** ScheduledExecutorService 继承自 ExecutorService 接口，可安排在给定的延迟后运行或定期执行的命令。
- **AbstractExecutorService** AbstractExecutorService 继承自 ExecutorService 接口，其提供 ExecutorService 执行方法的默认实现。此类使用 newTaskFor 返回的 RunnableFuture 实现 submit、invokeAny 和 invokeAll 方法，默认情况下，RunnableFuture 是此包中提供的 FutureTask 类。
- **FutureTask** FutureTask 为 Future 提供了基础实现，如获取任务执行结果(get)和取消任务(cancel)等。如果任务尚未完成，获取任务执行结果时将会阻塞。一旦执行结束，任务就不能被重启或取消(除非使用 runAndReset 执行计算)。FutureTask 常用来封装 Callable 和 Runnable，也可以作为一个任务提交到线程池中执行。除了作为一个独立的类之外，此类也提供了一些功能性函数供我们创建自定义 task 类使用。FutureTask 的线程安全由 CAS 来保证。
- **核心: ThreadPoolExecutor** ThreadPoolExecutor 实现了 AbstractExecutorService 接口，也是一个 ExecutorService，它使用可能的几个池线程之一执行每个提交的任务，通常使用 Executors 工厂方法配置。 线程池可以解决两个不同问题: 由于减少了每个任务调用的开销，它们通常可以在执行大量异步任务时提供增强的性能，并且还可以提供绑定和管理资源(包括执行任务集时使用的线程)的方法。每个 ThreadPoolExecutor 还维护着一些基本的统计数据，如完成的任务数。
- **核心: ScheduledThreadExecutor** ScheduledThreadPoolExecutor 实现 ScheduledExecutorService 接口，可安排在给定的延迟后运行命令，或者定期执行命令。需要多个辅助线程时，或者要求 ThreadPoolExecutor 具有额外的灵活性或功能时，此类要优于 Timer。
- **核心: Fork/Join 框架** ForkJoinPool 是 JDK 7 加入的一个线程池类。Fork/Join 技术是分治算法(Divide-and-Conquer)的并行实现，它是一项可以获得良好的并行性能的简单且高效的设计技术。目的是为了帮助我们更好地利用多处理器带来的好处，使用所有可用的运算能力来提升应用的性能。
- **工具类: Executors** Executors 是一个工具类，用其可以创建 ExecutorService、ScheduledExecutorService、ThreadFactory、Callable 等对象。它的使用融入到了 ThreadPoolExecutor, ScheduledThreadExecutor 和 ForkJoinPool 中。

### 3.4 JUC 原子类

- [JUC 原子类: CAS, Unsafe 和原子类详解]()

#### 线程安全的实现方法有哪些?

线程安全的实现方法包含:

- 互斥同步: synchronized 和 ReentrantLock
- 非阻塞同步: CAS, AtomicXXXX
- 无同步方案: 栈封闭，Thread Local，可重入代码

#### 什么是 CAS?

CAS 的全称为 Compare-And-Swap，直译就是对比交换。是一条 CPU 的原子指令，其作用是让 CPU 先进行比较两个值是否相等，然后原子地更新某个位置的值，经过调查发现，其实现方式是基于硬件平台的汇编指令，就是说 CAS 是靠硬件实现的，JVM 只是封装了汇编调用，那些 AtomicInteger 类便是使用了这些封装后的接口。 简单解释：CAS 操作需要输入两个数值，一个旧值(期望操作前的值)和一个新值，在操作期间先比较下在旧值有没有发生变化，如果没有发生变化，才交换成新值，发生了变化则不交换。

CAS 操作是原子性的，所以多线程并发使用 CAS 更新数据时，可以不使用锁。JDK 中大量使用了 CAS 来更新数据而防止加锁(synchronized 重量级锁)来保持原子更新。

相信 sql 大家都熟悉，类似 sql 中的条件更新一样：update set id=3 from table where id=2。因为单条 sql 执行具有原子性，如果有多个线程同时执行此 sql 语句，只有一条能更新成功。

#### CAS 使用示例，结合 AtomicInteger 给出示例?

如果不使用 CAS，在高并发下，多线程同时修改一个变量的值我们需要 synchronized 加锁(可能有人说可以用 Lock 加锁，Lock 底层的 AQS 也是基于 CAS 进行获取锁的)。

```java
public class Test {
    private int i=0;
    public synchronized int add(){
        return i++;
    }
}
```

java 中为我们提供了 AtomicInteger 原子类(底层基于 CAS 进行更新数据的)，不需要加锁就在多线程并发场景下实现数据的一致性。

```java
public class Test {
    private  AtomicInteger i = new AtomicInteger(0);
    public int add(){
        return i.addAndGet(1);
    }
}
```

#### CAS 会有哪些问题?

CAS 方式为乐观锁，synchronized 为悲观锁。因此使用 CAS 解决并发问题通常情况下性能更优。

但使用 CAS 方式也会有几个问题：

- ABA 问题

因为 CAS 需要在操作值的时候，检查值有没有发生变化，比如没有发生变化则更新，但是如果一个值原来是 A，变成了 B，又变成了 A，那么使用 CAS 进行检查时则会发现它的值没有发生变化，但是实际上却变化了。

ABA 问题的解决思路就是使用版本号。在变量前面追加上版本号，每次变量更新的时候把版本号加 1，那么 A->B->A 就会变成 1A->2B->3A。

从 Java 1.5 开始，JDK 的 Atomic 包里提供了一个类 AtomicStampedReference 来解决 ABA 问题。这个类的 compareAndSet 方法的作用是首先检查当前引用是否等于预期引用，并且检查当前标志是否等于预期标志，如果全部相等，则以原子方式将该引用和该标志的值设置为给定的更新值。

- 循环时间长开销大

自旋 CAS 如果长时间不成功，会给 CPU 带来非常大的执行开销。如果 JVM 能支持处理器提供的 pause 指令，那么效率会有一定的提升。pause 指令有两个作用：第一，它可以延迟流水线执行命令(de-pipeline)，使 CPU 不会消耗过多的执行资源，延迟的时间取决于具体实现的版本，在一些处理器上延迟时间是零；第二，它可以避免在退出循环的时候因内存顺序冲突(Memory Order Violation)而引起 CPU 流水线被清空(CPU Pipeline Flush)，从而提高 CPU 的执行效率。

- 只能保证一个共享变量的原子操作

当对一个共享变量执行操作时，我们可以使用循环 CAS 的方式来保证原子操作，但是对多个共享变量操作时，循环 CAS 就无法保证操作的原子性，这个时候就可以用锁。

还有一个取巧的办法，就是把多个共享变量合并成一个共享变量来操作。比如，有两个共享变量 i = 2，j = a，合并一下 ij = 2a，然后用 CAS 来操作 ij。

从 Java 1.5 开始，JDK 提供了 AtomicReference 类来保证引用对象之间的原子性，就可以把多个变量放在一个对象里来进行 CAS 操作。

#### AtomicInteger 底层实现?

- CAS+volatile
- volatile 保证线程的可见性，多线程并发时，一个线程修改数据，可以保证其它线程立马看到修改后的值 CAS 保证数据更新的原子性。

#### 请阐述你对 Unsafe 类的理解?

UnSafe 类总体功能：

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403143859.png)

如上图所示，Unsafe 提供的 API 大致可分为内存操作、CAS、Class 相关、对象操作、线程调度、系统信息获取、内存屏障、数组操作等几类，下面将对其相关方法和应用场景进行详细介绍。

#### 说说你对 Java 原子类的理解?

包含 13 个，4 组分类，说说作用和使用场景。

- 原子更新基本类型
  - AtomicBoolean: 原子更新布尔类型。
  - AtomicInteger: 原子更新整型。
  - AtomicLong: 原子更新长整型。
- 原子更新数组
  - AtomicIntegerArray: 原子更新整型数组里的元素。
  - AtomicLongArray: 原子更新长整型数组里的元素。
  - AtomicReferenceArray: 原子更新引用类型数组里的元素。
- 原子更新引用类型
  - AtomicIntegerFieldUpdater: 原子更新整型的字段的更新器。
  - AtomicLongFieldUpdater: 原子更新长整型字段的更新器。
  - AtomicStampedFieldUpdater: 原子更新带有版本号的引用类型。
  - AtomicReferenceFieldUpdater: 上面已经说过此处不在赘述
- 原子更新字段类
  - AtomicReference: 原子更新引用类型。
  - AtomicStampedReference: 原子更新引用类型, 内部使用 Pair 来存储元素值及其版本号。
  - AtomicMarkableReferce: 原子更新带有标记位的引用类型。

#### AtomicStampedReference 是怎么解决 ABA 的?

AtomicStampedReference 主要维护包含一个对象引用以及一个可以自动更新的整数"stamp"的 pair 对象来解决 ABA 问题。

### 3.5 JUC 锁

- [JUC 锁: LockSupport 详解]()
- [JUC 锁: 锁核心类 AQS 详解]()
- [JUC 锁: ReentrantReadWriteLock 详解]()

#### 为什么 LockSupport 也是核心基础类?

AQS 框架借助于两个类：Unsafe(提供 CAS 操作)和 LockSupport(提供 park/unpark 操作)

#### 通过 wait/notify 实现同步?

```java
class MyThread extends Thread {

    public void run() {
        synchronized (this) {
            System.out.println("before notify");
            notify();
            System.out.println("after notify");
        }
    }
}

public class WaitAndNotifyDemo {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        synchronized (myThread) {
            try {
                myThread.start();
                // 主线程睡眠3s
                Thread.sleep(3000);
                System.out.println("before wait");
                // 阻塞主线程
                myThread.wait();
                System.out.println("after wait");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

运行结果

```html
before wait before notify after notify after wait
```

说明: 具体的流程图如下

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403144116.png)

使用 wait/notify 实现同步时，必须先调用 wait，后调用 notify，如果先调用 notify，再调用 wait，将起不了作用。具体代码如下

```java
class MyThread extends Thread {
    public void run() {
        synchronized (this) {
            System.out.println("before notify");
            notify();
            System.out.println("after notify");
        }
    }
}

public class WaitAndNotifyDemo {
    public static void main(String[] args) throws InterruptedException {
        MyThread myThread = new MyThread();
        myThread.start();
        // 主线程睡眠3s
        Thread.sleep(3000);
        synchronized (myThread) {
            try {
                System.out.println("before wait");
                // 阻塞主线程
                myThread.wait();
                System.out.println("after wait");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

运行结果:

```html
before notify after notify before wait
```

说明: 由于先调用了 notify，再调用的 wait，此时主线程还是会一直阻塞。

#### 通过 LockSupport 的 park/unpark 实现同步？

```java
import java.util.concurrent.locks.LockSupport;

class MyThread extends Thread {
    private Object object;

    public MyThread(Object object) {
        this.object = object;
    }

    public void run() {
        System.out.println("before unpark");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        // 获取blocker
        System.out.println("Blocker info " + LockSupport.getBlocker((Thread) object));
        // 释放许可
        LockSupport.unpark((Thread) object);
        // 休眠500ms，保证先执行park中的setBlocker(t, null);
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        // 再次获取blocker
        System.out.println("Blocker info " + LockSupport.getBlocker((Thread) object));

        System.out.println("after unpark");
    }
}

public class test {
    public static void main(String[] args) {
        MyThread myThread = new MyThread(Thread.currentThread());
        myThread.start();
        System.out.println("before park");
        // 获取许可
        LockSupport.park("ParkAndUnparkDemo");
        System.out.println("after park");
    }
}
```

运行结果:

```html
before park before unpark Blocker info ParkAndUnparkDemo after park Blocker info
null after unpark
```

说明: 本程序先执行 park，然后在执行 unpark，进行同步，并且在 unpark 的前后都调用了 getBlocker，可以看到两次的结果不一样，并且第二次调用的结果为 null，这是因为在调用 unpark 之后，执行了 Lock.park(Object blocker)函数中的 setBlocker(t, null)函数，所以第二次调用 getBlocker 时为 null。

上例是先调用 park，然后调用 unpark，现在修改程序，先调用 unpark，然后调用 park，看能不能正确同步。具体代码如下

```java
import java.util.concurrent.locks.LockSupport;

class MyThread extends Thread {
    private Object object;

    public MyThread(Object object) {
        this.object = object;
    }

    public void run() {
        System.out.println("before unpark");
        // 释放许可
        LockSupport.unpark((Thread) object);
        System.out.println("after unpark");
    }
}

public class ParkAndUnparkDemo {
    public static void main(String[] args) {
        MyThread myThread = new MyThread(Thread.currentThread());
        myThread.start();
        try {
            // 主线程睡眠3s
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("before park");
        // 获取许可
        LockSupport.park("ParkAndUnparkDemo");
        System.out.println("after park");
    }
}
```

运行结果:

```html
before unpark after unpark before park after park
```

说明: 可以看到，在先调用 unpark，再调用 park 时，仍能够正确实现同步，不会造成由 wait/notify 调用顺序不当所引起的阻塞。因此 park/unpark 相比 wait/notify 更加的灵活。

#### Thread.sleep()、Object.wait()、Condition.await()、LockSupport.park()的区别? 重点

- **Thread.sleep()和 Object.wait()的区别**

首先，我们先来看看 Thread.sleep()和 Object.wait()的区别，这是一个烂大街的题目了，大家应该都能说上来两点。

1. Thread.sleep()不会释放占有的锁，Object.wait()会释放占有的锁；
2. Thread.sleep()必须传入时间，Object.wait()可传可不传，不传表示一直阻塞下去；
3. Thread.sleep()到时间了会自动唤醒，然后继续执行；
4. Object.wait()不带时间的，需要另一个线程使用 Object.notify()唤醒；
5. Object.wait()带时间的，假如没有被 notify，到时间了会自动唤醒，这时又分好两种情况，一是立即获取到了锁，线程自然会继续执行；二是没有立即获取锁，线程进入同步队列等待获取锁；

其实，他们俩最大的区别就是 Thread.sleep()不会释放锁资源，Object.wait()会释放锁资源。

- **Object.wait()和 Condition.await()的区别**

Object.wait()和 Condition.await()的原理是基本一致的，不同的是 Condition.await()底层是调用 LockSupport.park()来实现阻塞当前线程的。

实际上，它在阻塞当前线程之前还干了两件事，一是把当前线程添加到条件队列中，二是“完全”释放锁，也就是让 state 状态变量变为 0，然后才是调用 LockSupport.park()阻塞当前线程。

- **Thread.sleep()和 LockSupport.park()的区别** LockSupport.park()还有几个兄弟方法——parkNanos()、parkUtil()等，我们这里说的 park()方法统称这一类方法。

1. 从功能上来说，Thread.sleep()和 LockSupport.park()方法类似，都是阻塞当前线程的执行，且都不会释放当前线程占有的锁资源；
2. Thread.sleep()没法从外部唤醒，只能自己醒过来；
3. LockSupport.park()方法可以被另一个线程调用 LockSupport.unpark()方法唤醒；
4. Thread.sleep()方法声明上抛出了 InterruptedException 中断异常，所以调用者需要捕获这个异常或者再抛出；
5. LockSupport.park()方法不需要捕获中断异常；
6. Thread.sleep()本身就是一个 native 方法；
7. LockSupport.park()底层是调用的 Unsafe 的 native 方法；

- **Object.wait()和 LockSupport.park()的区别**

二者都会阻塞当前线程的运行，他们有什么区别呢? 经过上面的分析相信你一定很清楚了，真的吗? 往下看！

1. Object.wait()方法需要在 synchronized 块中执行；
2. LockSupport.park()可以在任意地方执行；
3. Object.wait()方法声明抛出了中断异常，调用者需要捕获或者再抛出；
4. LockSupport.park()不需要捕获中断异常；
5. Object.wait()不带超时的，需要另一个线程执行 notify()来唤醒，但不一定继续执行后续内容；
6. LockSupport.park()不带超时的，需要另一个线程执行 unpark()来唤醒，一定会继续执行后续内容；
7. 如果在 wait()之前执行了 notify()会怎样? 抛出 IllegalMonitorStateException 异常；
8. 如果在 park()之前执行了 unpark()会怎样? 线程不会被阻塞，直接跳过 park()，继续执行后续内容；

park()/unpark()底层的原理是“二元信号量”，你可以把它相像成只有一个许可证的 Semaphore，只不过这个信号量在重复执行 unpark()的时候也不会再增加许可证，最多只有一个许可证。

#### LockSupport.park()会释放锁资源吗? 那么 Condition.await()呢?

#### 如果在 wait()之前执行了 notify()会怎样?

抛出 IllegalMonitorStateException 异常

#### 如果在 park()之前执行了 unpark()会怎样?

线程不会被阻塞，直接跳过 park()，继续执行后续内容

#### 什么是 AQS? 为什么它是核心?

AQS 是一个用来构建锁和同步器的框架，使用 AQS 能简单且高效地构造出应用广泛的大量的同步器，比如我们提到的 ReentrantLock，Semaphore，其他的诸如 ReentrantReadWriteLock，SynchronousQueue，FutureTask 等等皆是基于 AQS 的。

AQS 核心思想是，如果被请求的共享资源空闲，则将当前请求资源的线程设置为有效的工作线程，并且将共享资源设置为锁定状态。如果被请求的共享资源被占用，那么就需要一套线程阻塞等待以及被唤醒时锁分配的机制，这个机制 AQS 是用 CLH 队列锁实现的，即将暂时获取不到锁的线程加入到队列中。

AbstractQueuedSynchronizer 类底层的数据结构是使用**CLH(Craig,Landin,and Hagersten)队列**是一个虚拟的双向队列(虚拟的双向队列即不存在队列实例，仅存在结点之间的关联关系)。AQS 是将每条请求共享资源的线程封装成一个 CLH 锁队列的一个结点(Node)来实现锁的分配。其中 Sync queue，即同步队列，是双向链表，包括 head 结点和 tail 结点，head 结点主要用作后续的调度。而 Condition queue 不是必须的，其是一个单向链表，只有当使用 Condition 时，才会存在此单向链表。并且可能会有多个 Condition queue。

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403152758.png)

#### AQS 的核心思想是什么?

底层数据结构: AQS 核心思想是，如果被请求的共享资源空闲，则将当前请求资源的线程设置为有效的工作线程，并且将共享资源设置为锁定状态。如果被请求的共享资源被占用，那么就需要一套线程阻塞等待以及被唤醒时锁分配的机制，这个机制 AQS 是用 CLH 队列锁实现的，即将暂时获取不到锁的线程加入到队列中。

#### AQS 有哪些核心的方法?

```java
isHeldExclusively()//该线程是否正在独占资源。只有用到condition才需要去实现它。
tryAcquire(int)//独占方式。尝试获取资源，成功则返回true，失败则返回false。
tryRelease(int)//独占方式。尝试释放资源，成功则返回true，失败则返回false。
tryAcquireShared(int)//共享方式。尝试获取资源。负数表示失败；0表示成功，但没有剩余可用资源；正数表示成功，且有剩余资源。
tryReleaseShared(int)//共享方式。尝试释放资源，成功则返回true，失败则返回false。
```

#### AQS 定义什么样的资源获取方式?

AQS 定义了两种资源获取方式：

- **独占**(只有一个线程能访问执行，又根据是否按队列的顺序分为**公平锁**和**非公平锁**，如`ReentrantLock`)
- **共享**(多个线程可同时访问执行，如`Semaphore`、`CountDownLatch`、 `CyclicBarrier` )。`ReentrantReadWriteLock`可以看成是组合式，允许多个线程同时对某一资源进行读。

#### AQS 底层使用了什么样的设计模式?

模板， 共享锁和独占锁在一个接口类中。

- [JUC 锁: ReentrantLock 详解]()

#### 什么是可重入，什么是可重入锁? 它用来解决什么问题?

#### ReentrantLock 的核心是 AQS，那么它怎么来实现的，继承吗?

ReentrantLock 总共有三个内部类，并且三个内部类是紧密相关的，下面先看三个类的关系。

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403152842.png)

说明: ReentrantLock 类内部总共存在 Sync、NonfairSync、FairSync 三个类，NonfairSync 与 FairSync 类继承自 Sync 类，Sync 类继承自 AbstractQueuedSynchronizer 抽象类。下面逐个进行分析。

#### ReentrantLock 是如何实现公平锁的?

FairSync

#### ReentrantLock 是如何实现非公平锁的?

UnFairSync

#### ReentrantLock 默认实现的是公平还是非公平锁?

非公平锁

#### 为了有了 ReentrantLock 还需要 ReentrantReadWriteLock?

读锁和写锁分离：ReentrantReadWriteLock 表示可重入读写锁，ReentrantReadWriteLock 中包含了两种锁，读锁 ReadLock 和写锁 WriteLock，可以通过这两种锁实现线程间的同步。

#### ReentrantReadWriteLock 底层实现原理?

ReentrantReadWriteLock 有五个内部类，五个内部类之间也是相互关联的。内部类的关系如下图所示。

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154240.png)

说明: 如上图所示，Sync 继承自 AQS、NonfairSync 继承自 Sync 类、FairSync 继承自 Sync 类；ReadLock 实现了 Lock 接口、WriteLock 也实现了 Lock 接口。

#### ReentrantReadWriteLock 底层读写状态如何设计的?

高 16 位为读锁，低 16 位为写锁

#### 读锁和写锁的最大数量是多少?

2 的 16 次方-1

#### 本地线程计数器 ThreadLocalHoldCounter 是用来做什么的?

本地线程计数器，与对象绑定（线程-》线程重入的次数）

#### 写锁的获取与释放是怎么实现的?

tryAcquire/tryRelease

#### 读锁的获取与释放是怎么实现的?

tryAcquireShared/tryReleaseShared

#### 什么是锁的升降级?

RentrantReadWriteLock 为什么不支持锁升级? RentrantReadWriteLock 不支持锁升级(把持读锁、获取写锁，最后释放读锁的过程)。目的也是保证数据可见性，如果读锁已被多个线程获取，其中任意线程成功获取了写锁并更新了数据，则其更新对其他获取到读锁的线程是不可见的。

### 3.6 JUC 集合类

- [JUC 集合: ConcurrentHashMap 详解]()
- [JUC 集合: CopyOnWriteArrayList 详解]()
- [JUC 集合: ConcurrentLinkedQueue 详解]()
- [JUC 集合: BlockingQueue 详解]()

#### 为什么 HashTable 慢? 它的并发度是什么? 那么 ConcurrentHashMap 并发度是什么?

Hashtable 之所以效率低下主要是因为其实现使用了 synchronized 关键字对 put 等操作进行加锁，而 synchronized 关键字加锁是对整个对象进行加锁，也就是说在进行 put 等修改 Hash 表的操作时，锁住了整个 Hash 表，从而使得其表现的效率低下。

#### ConcurrentHashMap 在 JDK1.7 和 JDK1.8 中实现有什么差别? JDK1.8 解決了 JDK1.7 中什么问题

- `HashTable` : 使用了 synchronized 关键字对 put 等操作进行加锁;
- `ConcurrentHashMap JDK1.7`: 使用分段锁机制实现;
- `ConcurrentHashMap JDK1.8`: 则使用数组+链表+红黑树数据结构和 CAS 原子操作实现;

#### ConcurrentHashMap JDK1.7 实现的原理是什么?

在 JDK1.5~1.7 版本，Java 使用了分段锁机制实现 ConcurrentHashMap.

简而言之，ConcurrentHashMap 在对象中保存了一个 Segment 数组，即将整个 Hash 表划分为多个分段；而每个 Segment 元素，它通过继承 ReentrantLock 来进行加锁，所以每次需要加锁的操作锁住的是一个 segment，这样只要保证每个 Segment 是线程安全的，也就实现了全局的线程安全；这样，在执行 put 操作时首先根据 hash 算法定位到元素属于哪个 Segment，然后对该 Segment 加锁即可。因此，ConcurrentHashMap 在多线程并发编程中可是实现多线程 put 操作。

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154312.png)

`concurrencyLevel`: Segment 数（并行级别、并发数）。默认是 16，也就是说 ConcurrentHashMap 有 16 个 Segments，所以理论上，这个时候，最多可以同时支持 16 个线程并发写，只要它们的操作分别分布在不同的 Segment 上。这个值可以在初始化的时候设置为其他值，但是一旦初始化以后，它是不可以扩容的。

#### ConcurrentHashMap JDK1.7 中 Segment 数(concurrencyLevel)默认值是多少? 为何一旦初始化就不可再扩容?

默认是 16

#### ConcurrentHashMap JDK1.7 说说其 put 的机制?

整体流程还是比较简单的，由于有独占锁的保护，所以 segment 内部的操作并不复杂

1. 计算 key 的 hash 值
2. 根据 hash 值找到 Segment 数组中的位置 j； ensureSegment(j) 对 segment[j] 进行初始化（Segment 内部是由 **数组+链表** 组成的）
3. 插入新值到 槽 s 中

#### ConcurrentHashMap JDK1.7 是如何扩容的?

rehash(注：segment 数组不能扩容，扩容是 segment 数组某个位置内部的数组 HashEntry<K,V>[] 进行扩容)

#### ConcurrentHashMap JDK1.8 实现的原理是什么?

在 JDK1.7 之前，ConcurrentHashMap 是通过分段锁机制来实现的，所以其最大并发度受 Segment 的个数限制。因此，在 JDK1.8 中，ConcurrentHashMap 的实现原理摒弃了这种设计，而是选择了与 HashMap 类似的数组+链表+红黑树的方式实现，而加锁则采用 CAS 和 synchronized 实现。

简而言之：数组+链表+红黑树，CAS

#### ConcurrentHashMap JDK1.8 是如何扩容的?

tryPresize, 扩容也是做翻倍扩容的，扩容后数组容量为原来的 2 倍

#### ConcurrentHashMap JDK1.8 链表转红黑树的时机是什么? 临界值为什么是 8?

size = 8, log(N)

#### ConcurrentHashMap JDK1.8 是如何进行数据迁移的?

transfer, 将原来的 tab 数组的元素迁移到新的 nextTab 数组中

#### 先说说非并发集合中 Fail-fast 机制?

快速失败

#### CopyOnWriteArrayList 的实现原理?

COW 基于拷贝

```java
  // 将toCopyIn转化为Object[]类型数组，然后设置当前数组
  setArray(Arrays.copyOf(toCopyIn, toCopyIn.length, Object[].class));
```

属性中有一个可重入锁，用来保证线程安全访问，还有一个 Object 类型的数组，用来存放具体的元素。当然，也使用到了反射机制和 CAS 来保证原子性的修改 lock 域。

```java
// 可重入锁
final transient ReentrantLock lock = new ReentrantLock();
// 对象数组，用于存放元素
private transient volatile Object[] array;
// 反射机制
private static final sun.misc.Unsafe UNSAFE;
// lock域的内存偏移量
private static final long lockOffset;
```

#### 弱一致性的迭代器原理是怎么样的?

```
COWIterator<E>
```

COWIterator 表示迭代器，其也有一个 Object 类型的数组作为 CopyOnWriteArrayList 数组的快照，这种快照风格的迭代器方法在创建迭代器时使用了对当时数组状态的引用。此数组在迭代器的生存期内不会更改，因此不可能发生冲突，并且迭代器保证不会抛出 ConcurrentModificationException。创建迭代器以后，迭代器就不会反映列表的添加、移除或者更改。在迭代器上进行的元素更改操作(remove、set 和 add)不受支持。这些方法将抛出 UnsupportedOperationException。

#### CopyOnWriteArrayList 为什么并发安全且性能比 Vector 好?

Vector 对单独的 add，remove 等方法都是在方法上加了 synchronized; 并且如果一个线程 A 调用 size 时，另一个线程 B 执行了 remove，然后 size 的值就不是最新的，然后线程 A 调用 remove 就会越界(这时就需要再加一个 Synchronized)。这样就导致有了双重锁，效率大大降低，何必呢。于是 vector 废弃了，要用就用 CopyOnWriteArrayList 吧。

#### CopyOnWriteArrayList 有何缺陷，说说其应用场景?

CopyOnWriteArrayList 有几个缺点：

- 由于写操作的时候，需要拷贝数组，会消耗内存，如果原数组的内容比较多的情况下，可能导致 young gc 或者 full gc
- 不能用于实时读的场景，像拷贝数组、新增元素都需要时间，所以调用一个 set 操作后，读取到数据可能还是旧的,虽然 CopyOnWriteArrayList 能做到最终一致性,但是还是没法满足实时性要求；

**CopyOnWriteArrayList 合适读多写少的场景，不过这类慎用**

因为谁也没法保证 CopyOnWriteArrayList 到底要放置多少数据，万一数据稍微有点多，每次 add/set 都要重新复制数组，这个代价实在太高昂了。在高性能的互联网应用中，这种操作分分钟引起故障。

#### 要想用线程安全的队列有哪些选择?

Vector，`Collections.synchronizedList( List<T> list)`, ConcurrentLinkedQueue 等

#### ConcurrentLinkedQueue 实现的数据结构?

ConcurrentLinkedQueue 的数据结构与 LinkedBlockingQueue 的数据结构相同，都是使用的链表结构。ConcurrentLinkedQueue 的数据结构如下:

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154343.png)

说明: ConcurrentLinkedQueue 采用的链表结构，并且包含有一个头节点和一个尾结点。

#### ConcurrentLinkedQueue 底层原理?

```java
// 反射机制
private static final sun.misc.Unsafe UNSAFE;
// head域的偏移量
private static final long headOffset;
// tail域的偏移量
private static final long tailOffset;
```

说明: 属性中包含了 head 域和 tail 域，表示链表的头节点和尾结点，同时，ConcurrentLinkedQueue 也使用了反射机制和 CAS 机制来更新头节点和尾结点，保证原子性。

#### ConcurrentLinkedQueue 的核心方法有哪些?

offer()，poll()，peek()，isEmpty()等队列常用方法

#### 说说 ConcurrentLinkedQueue 的 HOPS(延迟更新的策略)的设计?

通过上面对 offer 和 poll 方法的分析，我们发现 tail 和 head 是延迟更新的，两者更新触发时机为：

- **tail 更新触发时机**：当 tail 指向的节点的下一个节点不为 null 的时候，会执行定位队列真正的队尾节点的操作，找到队尾节点后完成插入之后才会通过 casTail 进行 tail 更新；当 tail 指向的节点的下一个节点为 null 的时候，只插入节点不更新 tail。
- **head 更新触发时机**：当 head 指向的节点的 item 域为 null 的时候，会执行定位队列真正的队头节点的操作，找到队头节点后完成删除之后才会通过 updateHead 进行 head 更新；当 head 指向的节点的 item 域不为 null 的时候，只删除节点不更新 head。

并且在更新操作时，源码中会有注释为：`hop two nodes at a time`。所以这种延迟更新的策略就被叫做 HOPS 的大概原因是这个(猜的 😃)，从上面更新时的状态图可以看出，head 和 tail 的更新是“跳着的”即中间总是间隔了一个。那么这样设计的意图是什么呢?

如果让 tail 永远作为队列的队尾节点，实现的代码量会更少，而且逻辑更易懂。但是，这样做有一个缺点，如果大量的入队操作，每次都要执行 CAS 进行 tail 的更新，汇总起来对性能也会是大大的损耗。如果能减少 CAS 更新的操作，无疑可以大大提升入队的操作效率，所以 doug lea 大师每间隔 1 次(tail 和队尾节点的距离为 1)进行才利用 CAS 更新 tail。对 head 的更新也是同样的道理，虽然，这样设计会多出在循环中定位队尾节点，但总体来说读的操作效率要远远高于写的性能，因此，多出来的在循环中定位尾节点的操作的性能损耗相对而言是很小的。

#### ConcurrentLinkedQueue 适合什么样的使用场景?

ConcurrentLinkedQueue 通过无锁来做到了更高的并发量，是个高性能的队列，但是使用场景相对不如阻塞队列常见，毕竟取数据也要不停的去循环，不如阻塞的逻辑好设计，但是在并发量特别大的情况下，是个不错的选择，性能上好很多，而且这个队列的设计也是特别费力，尤其的使用的改良算法和对哨兵的处理。整体的思路都是比较严谨的，这个也是使用了无锁造成的，我们自己使用无锁的条件的话，这个队列是个不错的参考。

#### 什么是 BlockingDeque? 适合用在什么样的场景?

BlockingQueue 通常用于一个线程生产对象，而另外一个线程消费这些对象的场景。下图是对这个原理的阐述:

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154421.png)

一个线程往里边放，另外一个线程从里边取的一个 BlockingQueue。

一个线程将会持续生产新对象并将其插入到队列之中，直到队列达到它所能容纳的临界点。也就是说，它是有限的。如果该阻塞队列到达了其临界点，负责生产的线程将会在往里边插入新对象时发生阻塞。它会一直处于阻塞之中，直到负责消费的线程从队列中拿走一个对象。 负责消费的线程将会一直从该阻塞队列中拿出对象。如果消费线程尝试去从一个空的队列中提取对象的话，这个消费线程将会处于阻塞之中，直到一个生产线程把一个对象丢进队列。

#### BlockingQueue 大家族有哪些?

ArrayBlockingQueue, DelayQueue, LinkedBlockingQueue, SynchronousQueue...

#### BlockingQueue 常用的方法?

BlockingQueue 具有 4 组不同的方法用于插入、移除以及对队列中的元素进行检查。如果请求的操作不能得到立即执行的话，每个方法的表现也不同。这些方法如下:

|      | 抛异常     | 特定值   | 阻塞    | 超时                        |
| ---- | ---------- | -------- | ------- | --------------------------- |
| 插入 | add(o)     | offer(o) | put(o)  | offer(o, timeout, timeunit) |
| 移除 | remove(o)  | poll(o)  | take(o) | poll(timeout, timeunit)     |
| 检查 | element(o) | peek(o)  |         |                             |

四组不同的行为方式解释:

- 抛异常: 如果试图的操作无法立即执行，抛一个异常。
- 特定值: 如果试图的操作无法立即执行，返回一个特定的值(常常是 true / false)。
- 阻塞: 如果试图的操作无法立即执行，该方法调用将会发生阻塞，直到能够执行。
- 超时: 如果试图的操作无法立即执行，该方法调用将会发生阻塞，直到能够执行，但等待时间不会超过给定值。返回一个特定值以告知该操作是否成功(典型的是 true / false)。

#### BlockingQueue 实现例子?

这里是一个 Java 中使用 BlockingQueue 的示例。本示例使用的是 BlockingQueue 接口的 ArrayBlockingQueue 实现。 首先，BlockingQueueExample 类分别在两个独立的线程中启动了一个 Producer 和 一个 Consumer。Producer 向一个共享的 BlockingQueue 中注入字符串，而 Consumer 则会从中把它们拿出来。

```java
public class BlockingQueueExample {

    public static void main(String[] args) throws Exception {

        BlockingQueue queue = new ArrayBlockingQueue(1024);

        Producer producer = new Producer(queue);
        Consumer consumer = new Consumer(queue);

        new Thread(producer).start();
        new Thread(consumer).start();

        Thread.sleep(4000);
    }
}
```

以下是 Producer 类。注意它在每次 put() 调用时是如何休眠一秒钟的。这将导致 Consumer 在等待队列中对象的时候发生阻塞。

```java
public class Producer implements Runnable{

    protected BlockingQueue queue = null;

    public Producer(BlockingQueue queue) {
        this.queue = queue;
    }

    public void run() {
        try {
            queue.put("1");
            Thread.sleep(1000);
            queue.put("2");
            Thread.sleep(1000);
            queue.put("3");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

以下是 Consumer 类。它只是把对象从队列中抽取出来，然后将它们打印到 System.out。

```java
public class Consumer implements Runnable{

    protected BlockingQueue queue = null;

    public Consumer(BlockingQueue queue) {
        this.queue = queue;
    }

    public void run() {
        try {
            System.out.println(queue.take());
            System.out.println(queue.take());
            System.out.println(queue.take());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

#### 什么是 BlockingDeque? 适合用在什么样的场景?

java.util.concurrent 包里的 BlockingDeque 接口表示一个线程安放入和提取实例的双端队列。

BlockingDeque 类是一个双端队列，在不能够插入元素时，它将阻塞住试图插入元素的线程；在不能够抽取元素时，它将阻塞住试图抽取的线程。 deque(双端队列) 是 "Double Ended Queue" 的缩写。因此，双端队列是一个你可以从任意一端插入或者抽取元素的队列。

在线程既是一个队列的生产者又是这个队列的消费者的时候可以使用到 BlockingDeque。如果生产者线程需要在队列的两端都可以插入数据，消费者线程需要在队列的两端都可以移除数据，这个时候也可以使用 BlockingDeque。BlockingDeque 图解:

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154456.png)

#### BlockingDeque 与 BlockingQueue 有何关系，请对比下它们的方法?

BlockingDeque 接口继承自 BlockingQueue 接口。这就意味着你可以像使用一个 BlockingQueue 那样使用 BlockingDeque。如果你这么干的话，各种插入方法将会把新元素添加到双端队列的尾端，而移除方法将会把双端队列的首端的元素移除。正如 BlockingQueue 接口的插入和移除方法一样。

以下是 BlockingDeque 对 BlockingQueue 接口的方法的具体内部实现:

| BlockingQueue | BlockingDeque   |
| ------------- | --------------- |
| add()         | addLast()       |
| offer() x 2   | offerLast() x 2 |
| put()         | putLast()       |
| remove()      | removeFirst()   |
| poll() x 2    | pollFirst()     |
| take()        | takeFirst()     |
| element()     | getFirst()      |
| peek()        | peekFirst()     |

#### BlockingDeque 大家族有哪些?

LinkedBlockingDeque 是一个双端队列，在它为空的时候，一个试图从中抽取数据的线程将会阻塞，无论该线程是试图从哪一端抽取数据。

#### BlockingDeque 实现例子?

既然 BlockingDeque 是一个接口，那么你想要使用它的话就得使用它的众多的实现类的其中一个。java.util.concurrent 包提供了以下 BlockingDeque 接口的实现类: LinkedBlockingDeque。

以下是如何使用 BlockingDeque 方法的一个简短代码示例:

```java
BlockingDeque<String> deque = new LinkedBlockingDeque<String>();
deque.addFirst("1");
deque.addLast("2");

String two = deque.takeLast();
String one = deque.takeFirst();
```

### 3.7 JUC 线程池

- [JUC 线程池: FutureTask 详解]()
- [JUC 线程池: ThreadPoolExecutor 详解]()
- [JUC 线程池: ScheduledThreadPool 详解]()
- [JUC 线程池: Fork/Join 框架详解]()

#### FutureTask 用来解决什么问题的? 为什么会出现?

FutureTask 为 Future 提供了基础实现，如获取任务执行结果(get)和取消任务(cancel)等。如果任务尚未完成，获取任务执行结果时将会阻塞。一旦执行结束，任务就不能被重启或取消(除非使用 runAndReset 执行计算)。FutureTask 常用来封装 Callable 和 Runnable，也可以作为一个任务提交到线程池中执行。除了作为一个独立的类之外，此类也提供了一些功能性函数供我们创建自定义 task 类使用。FutureTask 的线程安全由 CAS 来保证。

#### FutureTask 类结构关系怎么样的?

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154544.png)

可以看到,FutureTask 实现了 RunnableFuture 接口，则 RunnableFuture 接口继承了 Runnable 接口和 Future 接口，所以 FutureTask 既能当做一个 Runnable 直接被 Thread 执行，也能作为 Future 用来得到 Callable 的计算结果。

#### FutureTask 的线程安全是由什么保证的?

FutureTask 的线程安全由 CAS 来保证。

#### FutureTask 通常会怎么用? 举例说明。

```java
import java.util.concurrent.*;

public class CallDemo {

    public static void main(String[] args) throws ExecutionException, InterruptedException {

        /**
         * 第一种方式:Future + ExecutorService
         * Task task = new Task();
         * ExecutorService service = Executors.newCachedThreadPool();
         * Future<Integer> future = service.submit(task1);
         * service.shutdown();
         */


        /**
         * 第二种方式: FutureTask + ExecutorService
         * ExecutorService executor = Executors.newCachedThreadPool();
         * Task task = new Task();
         * FutureTask<Integer> futureTask = new FutureTask<Integer>(task);
         * executor.submit(futureTask);
         * executor.shutdown();
         */

        /**
         * 第三种方式:FutureTask + Thread
         */

        // 2. 新建FutureTask,需要一个实现了Callable接口的类的实例作为构造函数参数
        FutureTask<Integer> futureTask = new FutureTask<Integer>(new Task());
        // 3. 新建Thread对象并启动
        Thread thread = new Thread(futureTask);
        thread.setName("Task thread");
        thread.start();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Thread [" + Thread.currentThread().getName() + "] is running");

        // 4. 调用isDone()判断任务是否结束
        if(!futureTask.isDone()) {
            System.out.println("Task is not done");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        int result = 0;
        try {
            // 5. 调用get()方法获取任务结果,如果任务没有执行完成则阻塞等待
            result = futureTask.get();
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("result is " + result);

    }

    // 1. 继承Callable接口,实现call()方法,泛型参数为要返回的类型
    static class Task  implements Callable<Integer> {

        @Override
        public Integer call() throws Exception {
            System.out.println("Thread [" + Thread.currentThread().getName() + "] is running");
            int result = 0;
            for(int i = 0; i < 100;++i) {
                result += i;
            }

            Thread.sleep(3000);
            return result;
        }
    }
}
```

#### 为什么要有线程池?

线程池能够对线程进行统一分配，调优和监控:

- 降低资源消耗(线程无限制地创建，然后使用完毕后销毁)
- 提高响应速度(无须创建线程)
- 提高线程的可管理性

#### Java 是实现和管理线程池有哪些方式? 请简单举例如何使用。

从 JDK 5 开始，把工作单元与执行机制分离开来，工作单元包括 Runnable 和 Callable，而执行机制由 Executor 框架提供。

- WorkerThread

```java
public class WorkerThread implements Runnable {

    private String command;

    public WorkerThread(String s){
        this.command=s;
    }

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName()+" Start. Command = "+command);
        processCommand();
        System.out.println(Thread.currentThread().getName()+" End.");
    }

    private void processCommand() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String toString(){
        return this.command;
    }
}
```

- SimpleThreadPool

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SimpleThreadPool {

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(5);
        for (int i = 0; i < 10; i++) {
            Runnable worker = new WorkerThread("" + i);
            executor.execute(worker);
          }
        executor.shutdown(); // This will make the executor accept no new threads and finish all existing threads in the queue
        while (!executor.isTerminated()) { // Wait until all threads are finish,and also you can use "executor.awaitTermination();" to wait
        }
        System.out.println("Finished all threads");
    }

}
```

程序中我们创建了固定大小为五个工作线程的线程池。然后分配给线程池十个工作，因为线程池大小为五，它将启动五个工作线程先处理五个工作，其他的工作则处于等待状态，一旦有工作完成，空闲下来工作线程就会捡取等待队列里的其他工作进行执行。

这里是以上程序的输出。

```html
pool-1-thread-2 Start. Command = 1 pool-1-thread-4 Start. Command = 3
pool-1-thread-1 Start. Command = 0 pool-1-thread-3 Start. Command = 2
pool-1-thread-5 Start. Command = 4 pool-1-thread-4 End. pool-1-thread-5 End.
pool-1-thread-1 End. pool-1-thread-3 End. pool-1-thread-3 Start. Command = 8
pool-1-thread-2 End. pool-1-thread-2 Start. Command = 9 pool-1-thread-1 Start.
Command = 7 pool-1-thread-5 Start. Command = 6 pool-1-thread-4 Start. Command =
5 pool-1-thread-2 End. pool-1-thread-4 End. pool-1-thread-3 End. pool-1-thread-5
End. pool-1-thread-1 End. Finished all threads
```

输出表明线程池中至始至终只有五个名为 "pool-1-thread-1" 到 "pool-1-thread-5" 的五个线程，这五个线程不随着工作的完成而消亡，会一直存在，并负责执行分配给线程池的任务，直到线程池消亡。

Executors 类提供了使用了 ThreadPoolExecutor 的简单的 ExecutorService 实现，但是 ThreadPoolExecutor 提供的功能远不止于此。我们可以在创建 ThreadPoolExecutor 实例时指定活动线程的数量，我们也可以限制线程池的大小并且创建我们自己的 RejectedExecutionHandler 实现来处理不能适应工作队列的工作。

这里是我们自定义的 RejectedExecutionHandler 接口的实现。

- RejectedExecutionHandlerImpl.java

```java
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadPoolExecutor;

public class RejectedExecutionHandlerImpl implements RejectedExecutionHandler {

    @Override
    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
        System.out.println(r.toString() + " is rejected");
    }

}
```

ThreadPoolExecutor 提供了一些方法，我们可以使用这些方法来查询 executor 的当前状态，线程池大小，活动线程数量以及任务数量。因此我是用来一个监控线程在特定的时间间隔内打印 executor 信息。

- MyMonitorThread.java

```java
import java.util.concurrent.ThreadPoolExecutor;

public class MyMonitorThread implements Runnable
{
    private ThreadPoolExecutor executor;

    private int seconds;

    private boolean run=true;

    public MyMonitorThread(ThreadPoolExecutor executor, int delay)
    {
        this.executor = executor;
        this.seconds=delay;
    }

    public void shutdown(){
        this.run=false;
    }

    @Override
    public void run()
    {
        while(run){
                System.out.println(
                    String.format("[monitor] [%d/%d] Active: %d, Completed: %d, Task: %d, isShutdown: %s, isTerminated: %s",
                        this.executor.getPoolSize(),
                        this.executor.getCorePoolSize(),
                        this.executor.getActiveCount(),
                        this.executor.getCompletedTaskCount(),
                        this.executor.getTaskCount(),
                        this.executor.isShutdown(),
                        this.executor.isTerminated()));
                try {
                    Thread.sleep(seconds*1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
        }

    }
}
```

这里是使用 ThreadPoolExecutor 的线程池实现例子。

- WorkerPool.java

```java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class WorkerPool {

    public static void main(String args[]) throws InterruptedException{
        //RejectedExecutionHandler implementation
        RejectedExecutionHandlerImpl rejectionHandler = new RejectedExecutionHandlerImpl();
        //Get the ThreadFactory implementation to use
        ThreadFactory threadFactory = Executors.defaultThreadFactory();
        //creating the ThreadPoolExecutor
        ThreadPoolExecutor executorPool = new ThreadPoolExecutor(2, 4, 10, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(2), threadFactory, rejectionHandler);
        //start the monitoring thread
        MyMonitorThread monitor = new MyMonitorThread(executorPool, 3);
        Thread monitorThread = new Thread(monitor);
        monitorThread.start();
        //submit work to the thread pool
        for(int i=0; i<10; i++){
            executorPool.execute(new WorkerThread("cmd"+i));
        }

        Thread.sleep(30000);
        //shut down the pool
        executorPool.shutdown();
        //shut down the monitor thread
        Thread.sleep(5000);
        monitor.shutdown();

    }
}
```

注意在初始化 ThreadPoolExecutor 时，我们保持初始池大小为 2，最大池大小为 4 而工作队列大小为 2。因此如果已经有四个正在执行的任务而此时分配来更多任务的话，工作队列将仅仅保留他们(新任务)中的两个，其他的将会被 RejectedExecutionHandlerImpl 处理。

上面程序的输出可以证实以上观点。

```html
pool-1-thread-1 Start. Command = cmd0 pool-1-thread-4 Start. Command = cmd5 cmd6
is rejected pool-1-thread-3 Start. Command = cmd4 pool-1-thread-2 Start. Command
= cmd1 cmd7 is rejected cmd8 is rejected cmd9 is rejected [monitor] [0/2]
Active: 4, Completed: 0, Task: 6, isShutdown: false, isTerminated: false
[monitor] [4/2] Active: 4, Completed: 0, Task: 6, isShutdown: false,
isTerminated: false pool-1-thread-4 End. pool-1-thread-1 End. pool-1-thread-2
End. pool-1-thread-3 End. pool-1-thread-1 Start. Command = cmd3 pool-1-thread-4
Start. Command = cmd2 [monitor] [4/2] Active: 2, Completed: 4, Task: 6,
isShutdown: false, isTerminated: false [monitor] [4/2] Active: 2, Completed: 4,
Task: 6, isShutdown: false, isTerminated: false pool-1-thread-1 End.
pool-1-thread-4 End. [monitor] [4/2] Active: 0, Completed: 6, Task: 6,
isShutdown: false, isTerminated: false [monitor] [2/2] Active: 0, Completed: 6,
Task: 6, isShutdown: false, isTerminated: false [monitor] [2/2] Active: 0,
Completed: 6, Task: 6, isShutdown: false, isTerminated: false [monitor] [2/2]
Active: 0, Completed: 6, Task: 6, isShutdown: false, isTerminated: false
[monitor] [2/2] Active: 0, Completed: 6, Task: 6, isShutdown: false,
isTerminated: false [monitor] [2/2] Active: 0, Completed: 6, Task: 6,
isShutdown: false, isTerminated: false [monitor] [0/2] Active: 0, Completed: 6,
Task: 6, isShutdown: true, isTerminated: true [monitor] [0/2] Active: 0,
Completed: 6, Task: 6, isShutdown: true, isTerminated: true
```

注意 executor 的活动任务、完成任务以及所有完成任务，这些数量上的变化。我们可以调用 shutdown() 方法来结束所有提交的任务并终止线程池。

#### ThreadPoolExecutor 的原理?

其实 java 线程池的实现原理很简单，说白了就是一个线程集合 workerSet 和一个阻塞队列 workQueue。当用户向线程池提交一个任务(也就是线程)时，线程池会先将任务放入 workQueue 中。workerSet 中的线程会不断的从 workQueue 中获取线程然后执行。当 workQueue 中没有任务的时候，worker 就会阻塞，直到队列中有任务了就取出来继续执行。

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154618.png)

当一个任务提交至线程池之后:

1. 线程池首先当前运行的线程数量是否少于 corePoolSize。如果是，则创建一个新的工作线程来执行任务。如果都在执行任务，则进入 2.
2. 判断 BlockingQueue 是否已经满了，倘若还没有满，则将线程放入 BlockingQueue。否则进入 3.
3. 如果创建一个新的工作线程将使当前运行的线程数量超过 maximumPoolSize，则交给 RejectedExecutionHandler 来处理任务。

当 ThreadPoolExecutor 创建新线程时，通过 CAS 来更新线程池的状态 ctl.

#### ThreadPoolExecutor 有哪些核心的配置参数? 请简要说明

```java
public ThreadPoolExecutor(int corePoolSize,
                              int maximumPoolSize,
                              long keepAliveTime,
                              TimeUnit unit,
                              BlockingQueue<Runnable> workQueue,
                              RejectedExecutionHandler handler)
```

- `corePoolSize` 线程池中的核心线程数，当提交一个任务时，线程池创建一个新线程执行任务，直到当前线程数等于 corePoolSize, 即使有其他空闲线程能够执行新来的任务, 也会继续创建线程；如果当前线程数为 corePoolSize，继续提交的任务被保存到阻塞队列中，等待被执行；如果执行了线程池的 prestartAllCoreThreads()方法，线程池会提前创建并启动所有核心线程。
- `workQueue` 用来保存等待被执行的任务的阻塞队列. 在 JDK 中提供了如下阻塞队列: 具体可以参考[JUC 集合: BlockQueue 详解]()
  - `ArrayBlockingQueue`: 基于数组结构的有界阻塞队列，按 FIFO 排序任务；
  - `LinkedBlockingQuene`: 基于链表结构的阻塞队列，按 FIFO 排序任务，吞吐量通常要高于 ArrayBlockingQuene；
  - `SynchronousQuene`: 一个不存储元素的阻塞队列，每个插入操作必须等到另一个线程调用移除操作，否则插入操作一直处于阻塞状态，吞吐量通常要高于 LinkedBlockingQuene；
  - `PriorityBlockingQuene`: 具有优先级的无界阻塞队列；

`LinkedBlockingQueue`比`ArrayBlockingQueue`在插入删除节点性能方面更优，但是二者在`put()`, `take()`任务的时均需要加锁，`SynchronousQueue`使用无锁算法，根据节点的状态判断执行，而不需要用到锁，其核心是`Transfer.transfer()`.

- `maximumPoolSize` 线程池中允许的最大线程数。如果当前阻塞队列满了，且继续提交任务，则创建新的线程执行任务，前提是当前线程数小于 maximumPoolSize；当阻塞队列是无界队列, 则 maximumPoolSize 则不起作用, 因为无法提交至核心线程池的线程会一直持续地放入 workQueue.
- `keepAliveTime` 线程空闲时的存活时间，即当线程没有任务执行时，该线程继续存活的时间；默认情况下，该参数只在线程数大于 corePoolSize 时才有用, 超过这个时间的空闲线程将被终止；
- `unit` keepAliveTime 的单位
- `threadFactory` 创建线程的工厂，通过自定义的线程工厂可以给每个新建的线程设置一个具有识别度的线程名。默认为 DefaultThreadFactory
- `handler` 线程池的饱和策略，当阻塞队列满了，且没有空闲的工作线程，如果继续提交任务，必须采取一种策略处理该任务，线程池提供了 4 种策略:
  - `AbortPolicy`: 直接抛出异常，默认策略；
  - `CallerRunsPolicy`: 用调用者所在的线程来执行任务；
  - `DiscardOldestPolicy`: 丢弃阻塞队列中靠最前的任务，并执行当前任务；
  - `DiscardPolicy`: 直接丢弃任务；

当然也可以根据应用场景实现 RejectedExecutionHandler 接口，自定义饱和策略，如记录日志或持久化存储不能处理的任务。

#### ThreadPoolExecutor 可以创建哪是哪三种线程池呢?

- newFixedThreadPool

```java
public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>());
}
```

线程池的线程数量达 corePoolSize 后，即使线程池没有可执行任务时，也不会释放线程。

FixedThreadPool 的工作队列为无界队列 LinkedBlockingQueue(队列容量为 Integer.MAX_VALUE), 这会导致以下问题:

- 线程池里的线程数量不超过 corePoolSize,这导致了 maximumPoolSize 和 keepAliveTime 将会是个无用参数
- 由于使用了无界队列, 所以 FixedThreadPool 永远不会拒绝, 即饱和策略失效

- newSingleThreadExecutor

```java
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>()));
}
```

初始化的线程池中只有一个线程，如果该线程异常结束，会重新创建一个新的线程继续执行任务，唯一的线程可以保证所提交任务的顺序执行.

由于使用了无界队列, 所以 SingleThreadPool 永远不会拒绝, 即饱和策略失效

- newCachedThreadPool

```java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                    60L, TimeUnit.SECONDS,
                                    new SynchronousQueue<Runnable>());
}
```

线程池的线程数可达到 Integer.MAX_VALUE，即 2147483647，内部使用 SynchronousQueue 作为阻塞队列； 和 newFixedThreadPool 创建的线程池不同，newCachedThreadPool 在没有任务执行时，当线程的空闲时间超过 keepAliveTime，会自动释放线程资源，当提交新任务时，如果没有空闲线程，则创建新线程执行任务，会导致一定的系统开销； 执行过程与前两种稍微不同:

- 主线程调用 SynchronousQueue 的 offer()方法放入 task, 倘若此时线程池中有空闲的线程尝试读取 SynchronousQueue 的 task, 即调用了 SynchronousQueue 的 poll(), 那么主线程将该 task 交给空闲线程. 否则执行(2)
- 当线程池为空或者没有空闲的线程, 则创建新的线程执行任务.
- 执行完任务的线程倘若在 60s 内仍空闲, 则会被终止. 因此长时间空闲的 CachedThreadPool 不会持有任何线程资源.

#### 当队列满了并且 worker 的数量达到 maxSize 的时候，会怎么样?

当队列满了并且 worker 的数量达到 maxSize 的时候,执行具体的拒绝策略

```java
private volatile RejectedExecutionHandler handler;
```

#### 说说 ThreadPoolExecutor 有哪些 RejectedExecutionHandler 策略? 默认是什么策略?

- AbortPolicy, 默认

该策略是线程池的默认策略。使用该策略时，如果线程池队列满了丢掉这个任务并且抛出 RejectedExecutionException 异常。 源码如下：

```java
public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
  //不做任何处理，直接抛出异常
  throw new RejectedExecutionException("xxx");
}
```

- DiscardPolicy

这个策略和 AbortPolicy 的 slient 版本，如果线程池队列满了，会直接丢掉这个任务并且不会有任何异常。 源码如下：

```java
public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
    //就是一个空的方法
}
```

- DiscardOldestPolicy

这个策略从字面上也很好理解，丢弃最老的。也就是说如果队列满了，会将最早进入队列的任务删掉腾出空间，再尝试加入队列。 因为队列是队尾进，队头出，所以队头元素是最老的，因此每次都是移除对头元素后再尝试入队。 源码如下：

```java
public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
    if (!e.isShutdown()) {
        //移除队头元素
        e.getQueue().poll();
        //再尝试入队
        e.execute(r);
    }
}
```

- CallerRunsPolicy

使用此策略，如果添加到线程池失败，那么主线程会自己去执行该任务，不会等待线程池中的线程去执行。就像是个急脾气的人，我等不到别人来做这件事就干脆自己干。 源码如下：

```java
public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
    if (!e.isShutdown()) {
        //直接执行run方法
        r.run();
    }
}
```

#### 简要说下线程池的任务执行机制?

execute –> addWorker –>runworker (getTask)

1. 线程池的工作线程通过 Woker 类实现，在 ReentrantLock 锁的保证下，把 Woker 实例插入到 HashSet 后，并启动 Woker 中的线程。
2. 从 Woker 类的构造方法实现可以发现: 线程工厂在创建线程 thread 时，将 Woker 实例本身 this 作为参数传入，当执行 start 方法启动线程 thread 时，本质是执行了 Worker 的 runWorker 方法。
3. firstTask 执行完成之后，通过 getTask 方法从阻塞队列中获取等待的任务，如果队列中没有任务，getTask 方法会被阻塞并挂起，不会占用 cpu 资源；

#### 线程池中任务是如何提交的?

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154700.png)

1. submit 任务，等待线程池 execute
2. 执行 FutureTask 类的 get 方法时，会把主线程封装成 WaitNode 节点并保存在 waiters 链表中， 并阻塞等待运行结果；
3. FutureTask 任务执行完成后，通过 UNSAFE 设置 waiters 相应的 waitNode 为 null，并通过 LockSupport 类 unpark 方法唤醒主线程；

```java
public class Test{
    public static void main(String[] args) {

        ExecutorService es = Executors.newCachedThreadPool();
        Future<String> future = es.submit(new Callable<String>() {
            @Override
            public String call() throws Exception {
                try {
                    TimeUnit.SECONDS.sleep(2);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                return "future result";
            }
        });
        try {
            String result = future.get();
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

在实际业务场景中，Future 和 Callable 基本是成对出现的，Callable 负责产生结果，Future 负责获取结果。

1. Callable 接口类似于 Runnable，只是 Runnable 没有返回值。
2. Callable 任务除了返回正常结果之外，如果发生异常，该异常也会被返回，即 Future 可以拿到异步执行任务各种结果；
3. Future.get 方法会导致主线程阻塞，直到 Callable 任务执行完成；

#### 线程池中任务是如何关闭的?

- shutdown

将线程池里的线程状态设置成 SHUTDOWN 状态, 然后中断所有没有正在执行任务的线程.

- shutdownNow

将线程池里的线程状态设置成 STOP 状态, 然后停止所有正在执行或暂停任务的线程. 只要调用这两个关闭方法中的任意一个, isShutDown() 返回 true. 当所有任务都成功关闭了, isTerminated()返回 true.

#### 在配置线程池的时候需要考虑哪些配置因素?

从任务的优先级，任务的执行时间长短，任务的性质(CPU 密集/ IO 密集)，任务的依赖关系这四个角度来分析。并且近可能地使用有界的工作队列。

性质不同的任务可用使用不同规模的线程池分开处理:

- CPU 密集型: 尽可能少的线程，Ncpu+1
- IO 密集型: 尽可能多的线程, Ncpu\*2，比如数据库连接池
- 混合型: CPU 密集型的任务与 IO 密集型任务的执行时间差别较小，拆分为两个线程池；否则没有必要拆分。

#### 如何监控线程池的状态?

可以使用 ThreadPoolExecutor 以下方法:

- `getTaskCount()` Returns the approximate total number of tasks that have ever been scheduled for execution.
- `getCompletedTaskCount()` Returns the approximate total number of tasks that have completed execution. 返回结果少于 getTaskCount()。
- `getLargestPoolSize()` Returns the largest number of threads that have ever simultaneously been in the pool. 返回结果小于等于 maximumPoolSize
- `getPoolSize()` Returns the current number of threads in the pool.
- `getActiveCount()` Returns the approximate number of threads that are actively executing tasks.

#### 为什么很多公司不允许使用 Executors 去创建线程池? 那么推荐怎么使用呢?

线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，这样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险。 说明：Executors 各个方法的弊端：

- newFixedThreadPool 和 newSingleThreadExecutor:   主要问题是堆积的请求处理队列可能会耗费非常大的内存，甚至 OOM。
- newCachedThreadPool 和 newScheduledThreadPool:   主要问题是线程数最大数是 Integer.MAX_VALUE，可能会创建数量非常多的线程，甚至 OOM。
- 推荐方式 1 首先引入：commons-lang3 包

```java
ScheduledExecutorService executorService = new ScheduledThreadPoolExecutor(1,
        new BasicThreadFactory.Builder().namingPattern("example-schedule-pool-%d").daemon(true).build());
```

- 推荐方式 2 首先引入：com.google.guava 包

```java
ThreadFactory namedThreadFactory = new ThreadFactoryBuilder().setNameFormat("demo-pool-%d").build();

//Common Thread Pool
ExecutorService pool = new ThreadPoolExecutor(5, 200, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>(1024), namedThreadFactory, new ThreadPoolExecutor.AbortPolicy());

// excute
pool.execute(()-> System.out.println(Thread.currentThread().getName()));

 //gracefully shutdown
pool.shutdown();
```

- 推荐方式 3 spring 配置线程池方式：自定义线程工厂 bean 需要实现 ThreadFactory，可参考该接口的其它默认实现类，使用方式直接注入 bean 调用 execute(Runnable task)方法即可

```xml
    <bean id="userThreadPool" class="org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor">
        <property name="corePoolSize" value="10" />
        <property name="maxPoolSize" value="100" />
        <property name="queueCapacity" value="2000" />

    <property name="threadFactory" value= threadFactory />
        <property name="rejectedExecutionHandler">
            <ref local="rejectedExecutionHandler" />
        </property>
    </bean>

    //in code
    userThreadPool.execute(thread);
```

#### ScheduledThreadPoolExecutor 要解决什么样的问题?

在很多业务场景中，我们可能需要周期性的运行某项任务来获取结果，比如周期数据统计，定时发送数据等。在并发包出现之前，Java 早在 1.3 就提供了 Timer 类(只需要了解，目前已渐渐被 ScheduledThreadPoolExecutor 代替)来适应这些业务场景。随着业务量的不断增大，我们可能需要多个工作线程运行任务来尽可能的增加产品性能，或者是需要更高的灵活性来控制和监控这些周期业务。这些都是 ScheduledThreadPoolExecutor 诞生的必然性。

#### ScheduledThreadPoolExecutor 相比 ThreadPoolExecutor 有哪些特性?

ScheduledThreadPoolExecutor 继承自 ThreadPoolExecutor，为任务提供延迟或周期执行，属于线程池的一种。和 ThreadPoolExecutor 相比，它还具有以下几种特性:

- 使用专门的任务类型—ScheduledFutureTask 来执行周期任务，也可以接收不需要时间调度的任务(这些任务通过 ExecutorService 来执行)。
- 使用专门的存储队列—DelayedWorkQueue 来存储任务，DelayedWorkQueue 是无界延迟队列 DelayQueue 的一种。相比 ThreadPoolExecutor 也简化了执行机制(delayedExecute 方法，后面单独分析)。
- 支持可选的 run-after-shutdown 参数，在池被关闭(shutdown)之后支持可选的逻辑来决定是否继续运行周期或延迟任务。并且当任务(重新)提交操作与 shutdown 操作重叠时，复查逻辑也不相同。

#### ScheduledThreadPoolExecutor 有什么样的数据结构，核心内部类和抽象类?

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154733.png)

ScheduledThreadPoolExecutor 继承自 `ThreadPoolExecutor`:

- 详情请参考: [JUC 线程池: ThreadPoolExecutor 详解]()

ScheduledThreadPoolExecutor 内部构造了两个内部类 `ScheduledFutureTask` 和 `DelayedWorkQueue`:

- `ScheduledFutureTask`: 继承了 FutureTask，说明是一个异步运算任务；最上层分别实现了 Runnable、Future、Delayed 接口，说明它是一个可以延迟执行的异步运算任务。
- `DelayedWorkQueue`: 这是 ScheduledThreadPoolExecutor 为存储周期或延迟任务专门定义的一个延迟队列，继承了 AbstractQueue，为了契合 ThreadPoolExecutor 也实现了 BlockingQueue 接口。它内部只允许存储 RunnableScheduledFuture 类型的任务。与 DelayQueue 的不同之处就是它只允许存放 RunnableScheduledFuture 对象，并且自己实现了二叉堆(DelayQueue 是利用了 PriorityQueue 的二叉堆结构)。

#### ScheduledThreadPoolExecutor 有哪两个关闭策略? 区别是什么?

**shutdown**: 在 shutdown 方法中调用的关闭钩子 onShutdown 方法，它的主要作用是在关闭线程池后取消并清除由于关闭策略不应该运行的所有任务，这里主要是根据 run-after-shutdown 参数(continueExistingPeriodicTasksAfterShutdown 和 executeExistingDelayedTasksAfterShutdown)来决定线程池关闭后是否关闭已经存在的任务。

**showDownNow**: 立即关闭

#### ScheduledThreadPoolExecutor 中 scheduleAtFixedRate 和 scheduleWithFixedDelay 区别是什么?

**注意 scheduleAtFixedRate 和 scheduleWithFixedDelay 的区别**: 乍一看两个方法一模一样，其实，在 unit.toNanos 这一行代码中还是有区别的。没错，scheduleAtFixedRate 传的是正值，而 scheduleWithFixedDelay 传的则是负值，这个值就是 ScheduledFutureTask 的 period 属性。

#### 为什么 ThreadPoolExecutor 的调整策略却不适用于 ScheduledThreadPoolExecutor?

例如: 由于 ScheduledThreadPoolExecutor 是一个固定核心线程数大小的线程池，并且使用了一个无界队列，所以调整 maximumPoolSize 对其没有任何影响(所以 ScheduledThreadPoolExecutor 没有提供可以调整最大线程数的构造函数，默认最大线程数固定为 Integer.MAX_VALUE)。此外，设置 corePoolSize 为 0 或者设置核心线程空闲后清除(allowCoreThreadTimeOut)同样也不是一个好的策略，因为一旦周期任务到达某一次运行周期时，可能导致线程池内没有线程去处理这些任务。

#### Executors 提供了几种方法来构造 ScheduledThreadPoolExecutor?

- newScheduledThreadPool: 可指定核心线程数的线程池。
- newSingleThreadScheduledExecutor: 只有一个工作线程的线程池。如果内部工作线程由于执行周期任务异常而被终止，则会新建一个线程替代它的位置。

#### Fork/Join 主要用来解决什么样的问题?

ForkJoinPool 是 JDK 7 加入的一个线程池类。Fork/Join 技术是分治算法(Divide-and-Conquer)的并行实现，它是一项可以获得良好的并行性能的简单且高效的设计技术。目的是为了帮助我们更好地利用多处理器带来的好处，使用所有可用的运算能力来提升应用的性能。

#### Fork/Join 框架是在哪个 JDK 版本中引入的?

JDK 7

#### Fork/Join 框架主要包含哪三个模块? 模块之间的关系是怎么样的?

Fork/Join 框架主要包含三个模块:

- 任务对象: `ForkJoinTask` (包括`RecursiveTask`、`RecursiveAction` 和 `CountedCompleter`)
- 执行 Fork/Join 任务的线程: `ForkJoinWorkerThread`
- 线程池: `ForkJoinPool`

这三者的关系是: ForkJoinPool 可以通过池中的 ForkJoinWorkerThread 来处理 ForkJoinTask 任务。

#### ForkJoinPool 类继承关系?

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154810.png)

内部类介绍:

- ForkJoinWorkerThreadFactory: 内部线程工厂接口，用于创建工作线程 ForkJoinWorkerThread
- DefaultForkJoinWorkerThreadFactory: ForkJoinWorkerThreadFactory 的默认实现类
- InnocuousForkJoinWorkerThreadFactory: 实现了 ForkJoinWorkerThreadFactory，无许可线程工厂，当系统变量中有系统安全管理相关属性时，默认使用这个工厂创建工作线程。
- EmptyTask: 内部占位类，用于替换队列中 join 的任务。
- ManagedBlocker: 为 ForkJoinPool 中的任务提供扩展管理并行数的接口，一般用在可能会阻塞的任务(如在 Phaser 中用于等待 phase 到下一个 generation)。
- WorkQueue: ForkJoinPool 的核心数据结构，本质上是 work-stealing 模式的双端任务队列，内部存放 ForkJoinTask 对象任务，使用 @Contented 注解修饰防止伪共享。
  - 工作线程在运行中产生新的任务(通常是因为调用了 fork())时，此时可以把 WorkQueue 的数据结构视为一个栈，新的任务会放入栈顶(top 位)；工作线程在处理自己工作队列的任务时，按照 LIFO 的顺序。
  - 工作线程在处理自己的工作队列同时，会尝试窃取一个任务(可能是来自于刚刚提交到 pool 的任务，或是来自于其他工作线程的队列任务)，此时可以把 WorkQueue 的数据结构视为一个 FIFO 的队列，窃取的任务位于其他线程的工作队列的队首(base 位)。
- 伪共享状态: 缓存系统中是以缓存行(cache line)为单位存储的。缓存行是 2 的整数幂个连续字节，一般为 32-256 个字节。最常见的缓存行大小是 64 个字节。当多线程修改互相独立的变量时，如果这些变量共享同一个缓存行，就会无意中影响彼此的性能，这就是伪共享。

#### ForkJoinTask 抽象类继承关系?

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154840.png)

ForkJoinTask 实现了 Future 接口，说明它也是一个可取消的异步运算任务，实际上 ForkJoinTask 是 Future 的轻量级实现，主要用在纯粹是计算的函数式任务或者操作完全独立的对象计算任务。fork 是主运行方法，用于异步执行；而 join 方法在任务结果计算完毕之后才会运行，用来合并或返回计算结果。 其内部类都比较简单，ExceptionNode 是用于存储任务执行期间的异常信息的单向链表；其余四个类是为 Runnable/Callable 任务提供的适配器类，用于把 Runnable/Callable 转化为 ForkJoinTask 类型的任务(因为 ForkJoinPool 只可以运行 ForkJoinTask 类型的任务)。

#### 整个 Fork/Join 框架的执行流程/运行机制是怎么样的?

- 首先介绍任务的提交流程 - 外部任务(external/submissions task)提交
- 然后介绍任务的提交流程 - 子任务(Worker task)提交
- 再分析任务的执行过程(ForkJoinWorkerThread.run()到 ForkJoinTask.doExec()这一部分)；
- 最后介绍任务的结果获取(ForkJoinTask.join()和 ForkJoinTask.invoke())

#### 具体阐述 Fork/Join 的分治思想和 work-stealing 实现方式?

- 分治算法(Divide-and-Conquer)

分治算法(Divide-and-Conquer)把任务递归的拆分为各个子任务，这样可以更好的利用系统资源，尽可能的使用所有可用的计算能力来提升应用性能。首先看一下 Fork/Join 框架的任务运行机制:

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154916.png)

- work-stealing(工作窃取)算法

work-stealing(工作窃取)算法: 线程池内的所有工作线程都尝试找到并执行已经提交的任务，或者是被其他活动任务创建的子任务(如果不存在就阻塞等待)。这种特性使得 ForkJoinPool 在运行多个可以产生子任务的任务，或者是提交的许多小任务时效率更高。尤其是构建异步模型的 ForkJoinPool 时，对不需要合并(join)的事件类型任务也非常适用。

在 ForkJoinPool 中，线程池中每个工作线程(ForkJoinWorkerThread)都对应一个任务队列(WorkQueue)，工作线程优先处理来自自身队列的任务(LIFO 或 FIFO 顺序，参数 mode 决定)，然后以 FIFO 的顺序随机窃取其他队列中的任务。

具体思路如下:

- 每个线程都有自己的一个 WorkQueue，该工作队列是一个双端队列。
- 队列支持三个功能 push、pop、poll
- push/pop 只能被队列的所有者线程调用，而 poll 可以被其他线程调用。
- 划分的子任务调用 fork 时，都会被 push 到自己的队列中。
- 默认情况下，工作线程从自己的双端队列获出任务并执行。
- 当自己的队列为空时，线程随机从另一个线程的队列末尾调用 poll 方法窃取任务。

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403154951.png)

#### 有哪些 JDK 源码中使用了 Fork/Join 思想?

我们常用的数组工具类 Arrays 在 JDK 8 之后新增的并行排序方法(parallelSort)就运用了 ForkJoinPool 的特性，还有 ConcurrentHashMap 在 JDK 8 之后添加的函数式方法(如 forEach 等)也有运用。

#### 如何使用 Executors 工具类创建 ForkJoinPool?

Java8 在 Executors 工具类中新增了两个工厂方法:

```java
// parallelism定义并行级别
public static ExecutorService newWorkStealingPool(int parallelism);
// 默认并行级别为JVM可用的处理器个数
// Runtime.getRuntime().availableProcessors()
public static ExecutorService newWorkStealingPool();
```

#### 写一个例子: 用 ForkJoin 方式实现 1+2+3+...+100000?

```java
public class Test {
	static final class SumTask extends RecursiveTask<Integer> {
		private static final long serialVersionUID = 1L;

		final int start; //开始计算的数
		final int end; //最后计算的数

		SumTask(int start, int end) {
			this.start = start;
			this.end = end;
		}

		@Override
		protected Integer compute() {
			//如果计算量小于1000，那么分配一个线程执行if中的代码块，并返回执行结果
			if(end - start < 1000) {
				System.out.println(Thread.currentThread().getName() + " 开始执行: " + start + "-" + end);
				int sum = 0;
				for(int i = start; i <= end; i++)
					sum += i;
				return sum;
			}
			//如果计算量大于1000，那么拆分为两个任务
			SumTask task1 = new SumTask(start, (start + end) / 2);
			SumTask task2 = new SumTask((start + end) / 2 + 1, end);
			//执行任务
			task1.fork();
			task2.fork();
			//获取任务执行的结果
			return task1.join() + task2.join();
		}
	}

	public static void main(String[] args) throws InterruptedException, ExecutionException {
		ForkJoinPool pool = new ForkJoinPool();
		ForkJoinTask<Integer> task = new SumTask(1, 10000);
		pool.submit(task);
		System.out.println(task.get());
	}
}
```

- 执行结果

```java
ForkJoinPool-1-worker-1 开始执行: 1-625
ForkJoinPool-1-worker-7 开始执行: 6251-6875
ForkJoinPool-1-worker-6 开始执行: 5626-6250
ForkJoinPool-1-worker-10 开始执行: 3751-4375
ForkJoinPool-1-worker-13 开始执行: 2501-3125
ForkJoinPool-1-worker-8 开始执行: 626-1250
ForkJoinPool-1-worker-11 开始执行: 5001-5625
ForkJoinPool-1-worker-3 开始执行: 7501-8125
ForkJoinPool-1-worker-14 开始执行: 1251-1875
ForkJoinPool-1-worker-4 开始执行: 9376-10000
ForkJoinPool-1-worker-8 开始执行: 8126-8750
ForkJoinPool-1-worker-0 开始执行: 1876-2500
ForkJoinPool-1-worker-12 开始执行: 4376-5000
ForkJoinPool-1-worker-5 开始执行: 8751-9375
ForkJoinPool-1-worker-7 开始执行: 6876-7500
ForkJoinPool-1-worker-1 开始执行: 3126-3750
50005000
```

#### Fork/Join 在使用时有哪些注意事项? 结合 JDK 中的斐波那契数列实例具体说明。

斐波那契数列: 1、1、2、3、5、8、13、21、34、…… 公式 : F(1)=1，F(2)=1, F(n)=F(n-1)+F(n-2)(n>=3，n∈N\*)

```java
public static void main(String[] args) {
    ForkJoinPool forkJoinPool = new ForkJoinPool(4); // 最大并发数4
    Fibonacci fibonacci = new Fibonacci(20);
    long startTime = System.currentTimeMillis();
    Integer result = forkJoinPool.invoke(fibonacci);
    long endTime = System.currentTimeMillis();
    System.out.println("Fork/join sum: " + result + " in " + (endTime - startTime) + " ms.");
}
//以下为官方API文档示例
static  class Fibonacci extends RecursiveTask<Integer> {
    final int n;
    Fibonacci(int n) {
        this.n = n;
    }
    @Override
    protected Integer compute() {
        if (n <= 1) {
            return n;
        }
        Fibonacci f1 = new Fibonacci(n - 1);
        f1.fork();
        Fibonacci f2 = new Fibonacci(n - 2);
        return f2.compute() + f1.join();
    }
}
```

当然你也可以两个任务都 fork，要注意的是两个任务都 fork 的情况，必须按照 f1.fork()，f2.fork()， f2.join()，f1.join()这样的顺序，不然有性能问题，详见上面注意事项中的说明。

官方 API 文档是这样写到的，所以平日用 invokeAll 就好了。invokeAll 会把传入的任务的第一个交给当前线程来执行，其他的任务都 fork 加入工作队列，这样等于利用当前线程也执行任务了。

```java
{
    // ...
    Fibonacci f1 = new Fibonacci(n - 1);
    Fibonacci f2 = new Fibonacci(n - 2);
    invokeAll(f1,f2);
    return f2.join() + f1.join();
}

public static void invokeAll(ForkJoinTask<?>... tasks) {
    Throwable ex = null;
    int last = tasks.length - 1;
    for (int i = last; i >= 0; --i) {
        ForkJoinTask<?> t = tasks[i];
        if (t == null) {
            if (ex == null)
                ex = new NullPointerException();
        }
        else if (i != 0)   //除了第一个都fork
            t.fork();
        else if (t.doInvoke() < NORMAL && ex == null)  //留一个自己执行
            ex = t.getException();
    }
    for (int i = 1; i <= last; ++i) {
        ForkJoinTask<?> t = tasks[i];
        if (t != null) {
            if (ex != null)
                t.cancel(false);
            else if (t.doJoin() < NORMAL)
                ex = t.getException();
        }
    }
    if (ex != null)
        rethrow(ex);
}
```

### 3.8 JUC 工具类

- [JUC 工具类: CountDownLatch 详解]()
- [JUC 工具类: CyclicBarrier 详解]()
- [JUC 工具类: Semaphore 详解]()
- [JUC 工具类: Phaser 详解]()
- [JUC 工具类: Exchanger 详解]()
- [Java 并发 - ThreadLocal 详解]()

#### 什么是 CountDownLatch?

CountDownLatch 底层也是由 AQS，用来同步一个或多个任务的常用并发工具类，强制它们等待由其他任务执行的一组操作完成。

#### CountDownLatch 底层实现原理?

其底层是由 AQS 提供支持，所以其数据结构可以参考 AQS 的数据结构，而 AQS 的数据结构核心就是两个虚拟队列: 同步队列 sync queue 和条件队列 condition queue，不同的条件会有不同的条件队列。CountDownLatch 典型的用法是将一个程序分为 n 个互相独立的可解决任务，并创建值为 n 的 CountDownLatch。当每一个任务完成时，都会在这个锁存器上调用 countDown，等待问题被解决的任务调用这个锁存器的 await，将他们自己拦住，直至锁存器计数结束。

#### CountDownLatch 一次可以唤醒几个任务?

多个

#### CountDownLatch 有哪些主要方法?

await(), 此函数将会使当前线程在锁存器倒计数至零之前一直等待，除非线程被中断。

countDown(), 此函数将递减锁存器的计数，如果计数到达零，则释放所有等待的线程

#### 写道题：实现一个容器，提供两个方法，add，size 写两个线程，线程 1 添加 10 个元素到容器中，线程 2 实现监控元素的个数，当个数到 5 个时，线程 2 给出提示并结束?

说出使用 CountDownLatch 代替 wait notify 好处?

```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * 使用CountDownLatch 代替wait notify 好处是通讯方式简单，不涉及锁定  Count 值为0时当前线程继续执行，
 */
public class T3 {

   volatile List list = new ArrayList();

    public void add(int i){
        list.add(i);
    }

    public int getSize(){
        return list.size();
    }


    public static void main(String[] args) {
        T3 t = new T3();
        CountDownLatch countDownLatch = new CountDownLatch(1);

        new Thread(() -> {
            System.out.println("t2 start");
           if(t.getSize() != 5){
               try {
                   countDownLatch.await();
                   System.out.println("t2 end");
               } catch (InterruptedException e) {
                   e.printStackTrace();
               }
           }
        },"t2").start();

        new Thread(()->{
            System.out.println("t1 start");
           for (int i = 0;i<9;i++){
               t.add(i);
               System.out.println("add"+ i);
               if(t.getSize() == 5){
                   System.out.println("countdown is open");
                   countDownLatch.countDown();
               }
           }
            System.out.println("t1 end");
        },"t1").start();
    }

}
```

#### 什么是 CyclicBarrier?

- 对于 CountDownLatch，其他线程为游戏玩家，比如英雄联盟，主线程为控制游戏开始的线程。在所有的玩家都准备好之前，主线程是处于等待状态的，也就是游戏不能开始。当所有的玩家准备好之后，下一步的动作实施者为主线程，即开始游戏。
- 对于 CyclicBarrier，假设有一家公司要全体员工进行团建活动，活动内容为翻越三个障碍物，每一个人翻越障碍物所用的时间是不一样的。但是公司要求所有人在翻越当前障碍物之后再开始翻越下一个障碍物，也就是所有人翻越第一个障碍物之后，才开始翻越第二个，以此类推。类比地，每一个员工都是一个“其他线程”。当所有人都翻越的所有的障碍物之后，程序才结束。而主线程可能早就结束了，这里我们不用管主线程。

#### CountDownLatch 和 CyclicBarrier 对比?

- CountDownLatch 减计数，CyclicBarrier 加计数。
- CountDownLatch 是一次性的，CyclicBarrier 可以重用。
- CountDownLatch 和 CyclicBarrier 都有让多个线程等待同步然后再开始下一步动作的意思，但是 CountDownLatch 的下一步的动作实施者是主线程，具有不可重复性；而 CyclicBarrier 的下一步动作实施者还是“其他线程”本身，具有往复多次实施动作的特点。

#### 什么是 Semaphore?

Semaphore 底层是基于 AbstractQueuedSynchronizer 来实现的。Semaphore 称为计数信号量，它允许 n 个任务同时访问某个资源，可以将信号量看做是在向外分发使用资源的许可证，只有成功获取许可证，才能使用资源

#### Semaphore 内部原理?

Semaphore 总共有三个内部类，并且三个内部类是紧密相关的，下面先看三个类的关系。

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403155038.png)

说明: Semaphore 与 ReentrantLock 的内部类的结构相同，类内部总共存在 Sync、NonfairSync、FairSync 三个类，NonfairSync 与 FairSync 类继承自 Sync 类，Sync 类继承自 AbstractQueuedSynchronizer 抽象类。下面逐个进行分析。

#### Semaphore 常用方法有哪些? 如何实现线程同步和互斥的?

#### 单独使用 Semaphore 是不会使用到 AQS 的条件队列?

不同于 CyclicBarrier 和 ReentrantLock，单独使用 Semaphore 是不会使用到 AQS 的条件队列的，其实，只有进行 await 操作才会进入条件队列，其他的都是在同步队列中，只是当前线程会被 park。

#### Semaphore 初始化有 10 个令牌，11 个线程同时各调用 1 次 acquire 方法，会发生什么?

拿不到令牌的线程阻塞，不会继续往下运行。

#### Semaphore 初始化有 10 个令牌，一个线程重复调用 11 次 acquire 方法，会发生什么?

线程阻塞，不会继续往下运行。可能你会考虑类似于锁的重入的问题，很好，但是，令牌没有重入的概念。你只要调用一次 acquire 方法，就需要有一个令牌才能继续运行。

#### Semaphore 初始化有 1 个令牌，1 个线程调用一次 acquire 方法，然后调用两次 release 方法，之后另外一个线程调用 acquire(2)方法，此线程能够获取到足够的令牌并继续运行吗?

能，原因是 release 方法会添加令牌，并不会以初始化的大小为准。

#### Semaphore 初始化有 2 个令牌，一个线程调用 1 次 release 方法，然后一次性获取 3 个令牌，会获取到吗?

能，原因是 release 会添加令牌，并不会以初始化的大小为准。Semaphore 中 release 方法的调用并没有限制要在 acquire 后调用。

具体示例如下，如果不相信的话，可以运行一下下面的 demo，在做实验之前，笔者也认为应该是不允许的。。

```java
public class TestSemaphore2 {
    public static void main(String[] args) {
        int permitsNum = 2;
        final Semaphore semaphore = new Semaphore(permitsNum);
        try {
            System.out.println("availablePermits:"+semaphore.availablePermits()+",semaphore.tryAcquire(3,1, TimeUnit.SECONDS):"+semaphore.tryAcquire(3,1, TimeUnit.SECONDS));
            semaphore.release();
            System.out.println("availablePermits:"+semaphore.availablePermits()+",semaphore.tryAcquire(3,1, TimeUnit.SECONDS):"+semaphore.tryAcquire(3,1, TimeUnit.SECONDS));
        }catch (Exception e) {

        }
    }
}
```

#### Phaser 主要用来解决什么问题?

Phaser 是 JDK 7 新增的一个同步辅助类，它可以实现 CyclicBarrier 和 CountDownLatch 类似的功能，而且它支持对任务的动态调整，并支持分层结构来达到更高的吞吐量。

#### Phaser 与 CyclicBarrier 和 CountDownLatch 的区别是什么?

Phaser 和 CountDownLatch、CyclicBarrier 都有很相似的地方。

Phaser 顾名思义，就是可以分阶段的进行线程同步。

- CountDownLatch 只能在创建实例时，通过构造方法指定同步数量；
- Phaser 支持线程动态地向它注册。

利用这个动态注册的特性，可以达到分阶段同步控制的目的：

注册一批操作，等待它们执行结束；再注册一批操作，等它们结束...

#### Phaser 运行机制是什么样的?

![](https://exchange-imgs2021.oss-cn-beijing.aliyuncs.com/img/20220403155115.png)

- **Registration(注册)**

跟其他 barrier 不同，在 phaser 上注册的 parties 会随着时间的变化而变化。任务可以随时注册(使用方法 register,bulkRegister 注册，或者由构造器确定初始 parties)，并且在任何抵达点可以随意地撤销注册(方法 arriveAndDeregister)。就像大多数基本的同步结构一样，注册和撤销只影响内部 count；不会创建更深的内部记录，所以任务不能查询他们是否已经注册。(不过，可以通过继承来实现类似的记录)

- **Synchronization(同步机制)**

和 CyclicBarrier 一样，Phaser 也可以重复 await。方法 arriveAndAwaitAdvance 的效果类似 CyclicBarrier.await。phaser 的每一代都有一个相关的 phase number，初始值为 0，当所有注册的任务都到达 phaser 时 phase+1，到达最大值(Integer.MAX_VALUE)之后清零。使用 phase number 可以独立控制 到达 phaser 和 等待其他线程 的动作，通过下面两种类型的方法:

> - **Arrival(到达机制)** arrive 和 arriveAndDeregister 方法记录到达状态。这些方法不会阻塞，但是会返回一个相关的 arrival phase number；也就是说，phase number 用来确定到达状态。当所有任务都到达给定 phase 时，可以执行一个可选的函数，这个函数通过重写 onAdvance 方法实现，通常可以用来控制终止状态。重写此方法类似于为 CyclicBarrier 提供一个 barrierAction，但比它更灵活。
> - **Waiting(等待机制)** awaitAdvance 方法需要一个表示 arrival phase number 的参数，并且在 phaser 前进到与给定 phase 不同的 phase 时返回。和 CyclicBarrier 不同，即使等待线程已经被中断，awaitAdvance 方法也会一直等待。中断状态和超时时间同样可用，但是当任务等待中断或超时后未改变 phaser 的状态时会遭遇异常。如果有必要，在方法 forceTermination 之后可以执行这些异常的相关的 handler 进行恢复操作，Phaser 也可能被 ForkJoinPool 中的任务使用，这样在其他任务阻塞等待一个 phase 时可以保证足够的并行度来执行任务。

- **Termination(终止机制)** :

可以用 isTerminated 方法检查 phaser 的终止状态。在终止时，所有同步方法立刻返回一个负值。在终止时尝试注册也没有效果。当调用 onAdvance 返回 true 时 Termination 被触发。当 deregistration 操作使已注册的 parties 变为 0 时，onAdvance 的默认实现就会返回 true。也可以重写 onAdvance 方法来定义终止动作。forceTermination 方法也可以释放等待线程并且允许它们终止。

- **Tiering(分层结构)** :

Phaser 支持分层结构(树状构造)来减少竞争。注册了大量 parties 的 Phaser 可能会因为同步竞争消耗很高的成本， 因此可以设置一些子 Phaser 来共享一个通用的 parent。这样的话即使每个操作消耗了更多的开销，但是会提高整体吞吐量。 在一个分层结构的 phaser 里，子节点 phaser 的注册和取消注册都通过父节点管理。子节点 phaser 通过构造或方法 register、bulkRegister 进行首次注册时，在其父节点上注册。子节点 phaser 通过调用 arriveAndDeregister 进行最后一次取消注册时，也在其父节点上取消注册。

- **Monitoring(状态监控)** :

由于同步方法可能只被已注册的 parties 调用，所以 phaser 的当前状态也可能被任何调用者监控。在任何时候，可以通过 getRegisteredParties 获取 parties 数，其中 getArrivedParties 方法返回已经到达当前 phase 的 parties 数。当剩余的 parties(通过方法 getUnarrivedParties 获取)到达时，phase 进入下一代。这些方法返回的值可能只表示短暂的状态，所以一般来说在同步结构里并没有啥卵用。

#### 给一个 Phaser 使用的示例?

模拟了 100 米赛跑，10 名选手，只等裁判一声令下。当所有人都到达终点时，比赛结束。

```java
public class Match {

    // 模拟了100米赛跑，10名选手，只等裁判一声令下。当所有人都到达终点时，比赛结束。
    public static void main(String[] args) throws InterruptedException {

        final Phaser phaser=new Phaser(1) ;
        // 十名选手
        for (int index = 0; index < 10; index++) {
            phaser.register();
            new Thread(new player(phaser),"player"+index).start();
        }
        System.out.println("Game Start");
        //注销当前线程,比赛开始
        phaser.arriveAndDeregister();
        //是否非终止态一直等待
        while(!phaser.isTerminated()){
        }
        System.out.println("Game Over");
    }
}
class player implements Runnable{

    private  final Phaser phaser ;

    player(Phaser phaser){
        this.phaser=phaser;
    }
    @Override
    public void run() {
        try {
            // 第一阶段——等待创建好所有线程再开始
            phaser.arriveAndAwaitAdvance();

            // 第二阶段——等待所有选手准备好再开始
            Thread.sleep((long) (Math.random() * 10000));
            System.out.println(Thread.currentThread().getName() + " ready");
            phaser.arriveAndAwaitAdvance();

            // 第三阶段——等待所有选手准备好到达，到达后，该线程从phaser中注销，不在进行下面的阶段。
            Thread.sleep((long) (Math.random() * 10000));
            System.out.println(Thread.currentThread().getName() + " arrived");
            phaser.arriveAndDeregister();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

#### Exchanger 主要解决什么问题?

Exchanger 用于进行两个线程之间的数据交换。它提供一个同步点，在这个同步点，两个线程可以交换彼此的数据。这两个线程通过 exchange()方法交换数据，当一个线程先执行 exchange()方法后，它会一直等待第二个线程也执行 exchange()方法，当这两个线程到达同步点时，这两个线程就可以交换数据了。

#### 对比 SynchronousQueue，为什么说 Exchanger 可被视为 SynchronousQueue 的双向形式?

Exchanger 是一种线程间安全交换数据的机制。可以和之前分析过的 SynchronousQueue 对比一下：线程 A 通过 SynchronousQueue 将数据 a 交给线程 B；线程 A 通过 Exchanger 和线程 B 交换数据，线程 A 把数据 a 交给线程 B，同时线程 B 把数据 b 交给线程 A。可见，SynchronousQueue 是交给一个数据，Exchanger 是交换两个数据。

#### Exchanger 在不同的 JDK 版本中实现有什么差别?

- 在 JDK5 中 Exchanger 被设计成一个容量为 1 的容器，存放一个等待线程，直到有另外线程到来就会发生数据交换，然后清空容器，等到下一个到来的线程。
- 从 JDK6 开始，Exchanger 用了类似 ConcurrentMap 的分段思想，提供了多个 slot，增加了并发执行时的吞吐量。

#### Exchanger 实现举例

来一个非常经典的并发问题：你有相同的数据 buffer，一个或多个数据生产者，和一个或多个数据消费者。只是 Exchange 类只能同步 2 个线程，所以你只能在你的生产者和消费者问题中只有一个生产者和一个消费者时使用这个类。

```java
public class Test {
    static class Producer extends Thread {
        private Exchanger<Integer> exchanger;
        private static int data = 0;
        Producer(String name, Exchanger<Integer> exchanger) {
            super("Producer-" + name);
            this.exchanger = exchanger;
        }

        @Override
        public void run() {
            for (int i=1; i<5; i++) {
                try {
                    TimeUnit.SECONDS.sleep(1);
                    data = i;
                    System.out.println(getName()+" 交换前:" + data);
                    data = exchanger.exchange(data);
                    System.out.println(getName()+" 交换后:" + data);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    static class Consumer extends Thread {
        private Exchanger<Integer> exchanger;
        private static int data = 0;
        Consumer(String name, Exchanger<Integer> exchanger) {
            super("Consumer-" + name);
            this.exchanger = exchanger;
        }

        @Override
        public void run() {
            while (true) {
                data = 0;
                System.out.println(getName()+" 交换前:" + data);
                try {
                    TimeUnit.SECONDS.sleep(1);
                    data = exchanger.exchange(data);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println(getName()+" 交换后:" + data);
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Exchanger<Integer> exchanger = new Exchanger<Integer>();
        new Producer("", exchanger).start();
        new Consumer("", exchanger).start();
        TimeUnit.SECONDS.sleep(7);
        System.exit(-1);
    }
}
```

可以看到，其结果可能如下：

```html
Consumer- 交换前:0 Producer- 交换前:1 Consumer- 交换后:1 Consumer- 交换前:0
Producer- 交换后:0 Producer- 交换前:2 Producer- 交换后:0 Consumer- 交换后:2
Consumer- 交换前:0 Producer- 交换前:3 Producer- 交换后:0 Consumer- 交换后:3
Consumer- 交换前:0 Producer- 交换前:4 Producer- 交换后:0 Consumer- 交换后:4
Consumer- 交换前:0
```

#### 什么是 ThreadLocal? 用来解决什么问题的?

我们在[Java 并发 - 并发理论基础]()总结过线程安全(是指广义上的共享资源访问安全性，因为线程隔离是通过副本保证本线程访问资源安全性，它不保证线程之间还存在共享关系的狭义上的安全性)的解决思路：

- 互斥同步: synchronized 和 ReentrantLock
- 非阻塞同步: CAS, AtomicXXXX
- 无同步方案: 栈封闭，本地存储(Thread Local)，可重入代码

ThreadLocal 是通过线程隔离的方式防止任务在共享资源上产生冲突, 线程本地存储是一种自动化机制，可以为使用相同变量的每个不同线程都创建不同的存储。

ThreadLocal 是一个将在多线程中为每一个线程创建单独的变量副本的类; 当使用 ThreadLocal 来维护变量时, ThreadLocal 会为每个线程创建单独的变量副本, 避免因多线程操作共享变量而导致的数据不一致的情况。

#### 说说你对 ThreadLocal 的理解

提到 ThreadLocal 被提到应用最多的是 session 管理和数据库链接管理，这里以数据访问为例帮助你理解 ThreadLocal：

- 如下数据库管理类在单线程使用是没有任何问题的

```java
class ConnectionManager {
    private static Connection connect = null;

    public static Connection openConnection() {
        if (connect == null) {
            connect = DriverManager.getConnection();
        }
        return connect;
    }

    public static void closeConnection() {
        if (connect != null)
            connect.close();
    }
}
```

很显然，在多线程中使用会存在线程安全问题：第一，这里面的 2 个方法都没有进行同步，很可能在 openConnection 方法中会多次创建 connect；第二，由于 connect 是共享变量，那么必然在调用 connect 的地方需要使用到同步来保障线程安全，因为很可能一个线程在使用 connect 进行数据库操作，而另外一个线程调用 closeConnection 关闭链接。

- 为了解决上述线程安全的问题，第一考虑：互斥同步

你可能会说，将这段代码的两个方法进行同步处理，并且在调用 connect 的地方需要进行同步处理，比如用 Synchronized 或者 ReentrantLock 互斥锁。

- 这里再抛出一个问题：这地方到底需不需要将 connect 变量进行共享?

事实上，是不需要的。假如每个线程中都有一个 connect 变量，各个线程之间对 connect 变量的访问实际上是没有依赖关系的，即一个线程不需要关心其他线程是否对这个 connect 进行了修改的。即改后的代码可以这样：

```java
class ConnectionManager {
    private Connection connect = null;

    public Connection openConnection() {
        if (connect == null) {
            connect = DriverManager.getConnection();
        }
        return connect;
    }

    public void closeConnection() {
        if (connect != null)
            connect.close();
    }
}

class Dao {
    public void insert() {
        ConnectionManager connectionManager = new ConnectionManager();
        Connection connection = connectionManager.openConnection();

        // 使用connection进行操作

        connectionManager.closeConnection();
    }
}
```

这样处理确实也没有任何问题，由于每次都是在方法内部创建的连接，那么线程之间自然不存在线程安全问题。但是这样会有一个致命的影响：导致服务器压力非常大，并且严重影响程序执行性能。由于在方法中需要频繁地开启和关闭数据库连接，这样不仅严重影响程序执行效率，还可能导致服务器压力巨大。

- 这时候 ThreadLocal 登场了

那么这种情况下使用 ThreadLocal 是再适合不过的了，因为 ThreadLocal 在每个线程中对该变量会创建一个副本，即每个线程内部都会有一个该变量，且在线程内部任何地方都可以使用，线程之间互不影响，这样一来就不存在线程安全问题，也不会严重影响程序执行性能。下面就是网上出现最多的例子：

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionManager {

    private static final ThreadLocal<Connection> dbConnectionLocal = new ThreadLocal<Connection>() {
        @Override
        protected Connection initialValue() {
            try {
                return DriverManager.getConnection("", "", "");
            } catch (SQLException e) {
                e.printStackTrace();
            }
            return null;
        }
    };

    public Connection getConnection() {
        return dbConnectionLocal.get();
    }
}
```

#### ThreadLocal 是如何实现线程隔离的?

ThreadLocalMap

#### 为什么 ThreadLocal 会造成内存泄露? 如何解决

网上有这样一个例子：

```java
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ThreadLocalDemo {
    static class LocalVariable {
        private Long[] a = new Long[1024 * 1024];
    }

    // (1)
    final static ThreadPoolExecutor poolExecutor = new ThreadPoolExecutor(5, 5, 1, TimeUnit.MINUTES,
            new LinkedBlockingQueue<>());
    // (2)
    final static ThreadLocal<LocalVariable> localVariable = new ThreadLocal<LocalVariable>();

    public static void main(String[] args) throws InterruptedException {
        // (3)
        Thread.sleep(5000 * 4);
        for (int i = 0; i < 50; ++i) {
            poolExecutor.execute(new Runnable() {
                public void run() {
                    // (4)
                    localVariable.set(new LocalVariable());
                    // (5)
                    System.out.println("use local varaible" + localVariable.get());
                    localVariable.remove();
                }
            });
        }
        // (6)
        System.out.println("pool execute over");
    }
}
```

如果用线程池来操作 ThreadLocal 对象确实会造成内存泄露, 因为对于线程池里面不会销毁的线程, 里面总会存在着`<ThreadLocal, LocalVariable>`的强引用, 因为 final static 修饰的 ThreadLocal 并不会释放, 而 ThreadLocalMap 对于 Key 虽然是弱引用, 但是强引用不会释放, 弱引用当然也会一直有值, 同时创建的 LocalVariable 对象也不会释放, 就造成了内存泄露; 如果 LocalVariable 对象不是一个大对象的话, 其实泄露的并不严重, `泄露的内存 = 核心线程数 * LocalVariable`对象的大小;

所以, 为了避免出现内存泄露的情况, ThreadLocal 提供了一个清除线程中对象的方法, 即 remove, 其实内部实现就是调用 ThreadLocalMap 的 remove 方法:

```java
private void remove(ThreadLocal<?> key) {
    Entry[] tab = table;
    int len = tab.length;
    int i = key.threadLocalHashCode & (len-1);
    for (Entry e = tab[i];
         e != null;
         e = tab[i = nextIndex(i, len)]) {
        if (e.get() == key) {
            e.clear();
            expungeStaleEntry(i);
            return;
        }
    }
}
```

找到 Key 对应的 Entry, 并且清除 Entry 的 Key(ThreadLocal)置空, 随后清除过期的 Entry 即可避免内存泄露。

#### 还有哪些使用 ThreadLocal 的应用场景?

- 每个线程维护了一个“序列号”

````java
public class SerialNum {
    // The next serial number to be assigned
    private static int nextSerialNum = 0;

    private static ThreadLocal serialNum = new ThreadLocal() {
        protected synchronized Object initialValue() {
            return new Integer(nextSerialNum++);
        }
    };

    public static int get() {
        return ((Integer) (serialNum.get())).intValue();
    }
}

+ 经典的另外一个例子：

​```java
private static final ThreadLocal threadSession = new ThreadLocal();

public static Session getSession() throws InfrastructureException {
    Session s = (Session) threadSession.get();
    try {
        if (s == null) {
            s = getSessionFactory().openSession();
            threadSession.set(s);
        }
    } catch (HibernateException ex) {
        throw new InfrastructureException(ex);
    }
    return s;
}
````

- 看看阿里巴巴 java 开发手册中推荐的 ThreadLocal 的用法:

```java
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class DateUtils {
    public static final ThreadLocal<DateFormat> threadLocal = new ThreadLocal<DateFormat>(){
        @Override
        protected DateFormat initialValue() {
            return new SimpleDateFormat("yyyy-MM-dd");
        }
    };
}
```

然后我们再要用到 DateFormat 对象的地方，这样调用：

```java
DateUtils.df.get().format(new Date());

```
