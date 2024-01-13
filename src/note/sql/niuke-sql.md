---
title: sql必知必会
author: Ms.Yu
category: SQL
tag:
  - SQL
  - 数据库
star: 9
sticky: 9
---

### **1、SQL60 从 Customers 表中检索所有的 ID**

现有表 Customers 如下：

| cust_id |
| ------- |
| A       |
| B       |
| C       |

编写 SQL 语句，从 Customers 表中检索所有的 cust_id。

```sql
SELECT
cust_id
FROM
Customers;
```

### 2、SQL61 检索并列出已订购产品的清单

描述：表 OrderItems 含有非空的列 prod_id 代表商品 id，包含了所有已订购的商品（有些已被订购多次）。

| prod_id |
| ------- |
| a1      |
| a2      |
| a3      |
| a4      |
| a5      |
| a6      |
| a7      |

【问题】编写 SQL 语句，检索并列出所有已订购商品（prod_id）的去重后的清单。

```sql
SELECT
  DISTINCT prod_id
FROM
  OrderItems;
```

### 3、**SQL62 检索所有列**

现在有 Customers 表（表中含有列 cust_id 代表客户 id，cust_name 代表客户姓名）

| cust_id | cust_name |
| ------- | --------- |
| a1      | andy      |
| a2      | ben       |
| a3      | tony      |
| a4      | tom       |
| a5      | an        |
| a6      | lee       |
| a7      | hex       |

【示例结果】

返回所有列 cust_id 和 cust_name。

```sql
SELECT
  cust_id,
  cust_name
FROM
  Customers;
```

### 4、**SQL63 检索顾客名称并且排序**

有表 Customers，cust_id 代表客户 id，cust_name 代表客户姓名。

| cust_id | cust_name |
| ------- | --------- |
| a1      | andy      |
| a2      | ben       |
| a3      | tony      |
| a4      | tom       |
| a5      | an        |
| a6      | lee       |
| a7      | hex       |

从 Customers 中检索所有的顾客名称（cust_name），并按从 Z 到 A 的顺序显示结果。

```sql
SELECT
  cust_name
FROM
  Customers
ORDER BY
  cust_name DESC;
```

### 5、**SQL64 对顾客 ID 和日期排序**

有 Orders 表

| cust_id | order_num | order_date          |
| ------- | --------- | ------------------- |
| andy    | aaaa      | 2021-01-01 00:00:00 |
| andy    | bbbb      | 2021-01-01 12:00:00 |
| bob     | cccc      | 2021-01-10 12:00:00 |
| dick    | dddd      | 2021-01-11 00:00:00 |

【问题】编写 SQL 语句，从 Orders 表中检索顾客 ID（cust_id）和订单号（order_num），并先按顾客 ID 对结果进行排序，再按订单日期倒序排列。

```sql
SELECT
  cust_id,
  order_num
FROM
  Orders
ORDER BY
  cust_id,
  order_date DESC;
```

### 6、**SQL65 按照数量和价格排序**

假设有一个 OrderItems 表

| quantity | item_price |
| -------- | ---------- |
| 1        | 100        |
| 10       | 1003       |
| 2        | 500        |

【问题】

编写 SQL 语句，显示 OrderItems 表中的数量（quantity）和价格（item_price），并按数量由多到少、价格由高到低排序。

```sql
SELECT
  quantity,
  item_price
FROM
  OrderItems
ORDER BY
  quantity DESC,
  item_price DESC;
```

### 7、**SQL66 检查 SQL 语句**

有 Vendors 表

| vend_name |
| --------- |
| 海底捞    |
| 小龙坎    |
| 大龙燚    |

【问题】下面的 SQL 语句有问题吗？尝试将它改正确，使之能够正确运行，并且返回结果根据 vend_name 逆序排列

```
SELECT vend_name, FROM Vendors ORDER vend_name DESC;
```

【答案】有问题``

```plain
SELECT
  vend_name
FROM
  Vendors
ORDER BY
  vend_name DESC;
```

### 8、**SQL67 返回固定价格的产品**

有表 Products

| prod_id | prod_name      | prod_price |
| ------- | -------------- | ---------- |
| a0018   | sockets        | 9.49       |
| a0019   | iphone13       | 600        |
| b0018   | gucci t-shirts | 1000       |

【问题】从 Products 表中检索产品 ID（prod_id）和产品名称（prod_name），只返回价格为 9.49 美元的产品。

```sql
SELECT
  prod_id,
  prod_name
FROM
  Products WHERE prod_price = 9.49;
```

### 9、**SQL68 返回更高价格的产品**

Products 表

| prod_id | prod_name      | prod_price |
| ------- | -------------- | ---------- |
| a0018   | sockets        | 9.49       |
| a0019   | iphone13       | 600        |
| b0019   | gucci t-shirts | 1000       |

【问题】编写 SQL 语句，从 Products 表中检索产品 ID（prod_id）和产品名称（prod_name），只返回价格为 9 美元或更高的产品。

```sql
SELECT
  prod_id,
  prod_name
FROM
  Products WHERE prod_price >= 9;
```

### 10、**SQL69 返回产品并且按照价格排序**

有 Products 表

| prod_id | prod_name | prod_price |
| ------- | --------- | ---------- |
| a0011   | egg       | 3          |
| a0019   | sockets   | 4          |
| b0019   | coffee    | 15         |

【问题】编写 SQL 语句，返回 Products 表中所有价格在 3 美元到 6 美元之间的产品的名称（prod_name）和价格（prod_price），然后按价格对结果进行排序

```sql
SELECT
  prod_name,
  prod_price
FROM
  Products
WHERE
  prod_price BETWEEN 3 AND 6
ORDER BY
  prod_price;
```

### 11、**SQL70 返回更多的产品**

OrderItems 表含有：订单号 order_num，quantity 产品数量

| order_num | quantity |
| --------- | -------- |
| a1        | 105      |
| a2        | 1100     |
| a2        | 200      |
| a4        | 1121     |
| a5        | 10       |
| a2        | 19       |
| a7        | 5        |

【问题】从 OrderItems 表中检索出所有不同且不重复的订单号（order_num），其中每个订单都要包含 100 个或更多的产品。

```sql
SELECT
  DISTINCT order_num
FROM
  OrderItems
WHERE
  quantity >= 100;
```

### 12、**SQL71 检索供应商名称**

Vendors 表有字段供应商名称（vend_name）、供应商国家（vend_country）、供应商州（vend_state）

| vend_name | vend_country | vend_state |
| --------- | ------------ | ---------- |
| apple     | USA          | CA         |
| vivo      | CNA          | shenzhen   |
| huawei    | CNA          | xian       |

【问题】编写 SQL 语句，从 Vendors 表中检索供应商名称（vend_name），仅返回加利福尼亚州的供应商（这需要按国家[USA]和州[CA]进行过滤，没准其他国家也存在一个 CA）

```sql
SELECT
  vend_name
FROM
  Vendors
WHERE
  vend_country = 'USA'
  AND vend_state = 'CA';
```

### 13、**SQL72 检索并列出已订购产品的清单**

OrderItems 表包含了所有已订购的产品（有些已被订购多次）。

| prod_id | order_num | quantity |
| ------- | --------- | -------- |
| BR01    | a1        | 105      |
| BR02    | a2        | 1100     |
| BR02    | a2        | 200      |
| BR03    | a4        | 1121     |
| BR017   | a5        | 10       |
| BR02    | a2        | 19       |
| BR017   | a7        | 5        |

【问题】编写 SQL 语句，查找所有订购了数量至少 100 个的 BR01、BR02 或 BR03 的订单。你需要返回 OrderItems 表的订单号（order_num）、产品 ID（prod_id）和数量（quantity），并按产品 ID 和数量进行过滤。

```sql
SELECT
  order_num,
  prod_id,
  quantity
FROM
  OrderItems
WHERE
  prod_id In('BR01', 'BR02', 'BR03')
  AND quantity >= 100;
```

### 14、**SQL73 返回所有价格在 3 美元到 6 美元之间的产品的名称和价格**

有表 Products

| prod_id | prod_name | prod_price |
| ------- | --------- | ---------- |
| a0011   | egg       | 3          |
| a0019   | sockets   | 4          |
| b0019   | coffee    | 15         |

【问题】编写 SQL 语句，返回所有价格在 3 美元到 6 美元之间的产品的名称（prod_name）和价格（prod_price），使用 AND 操作符，然后按价格对结果进行升序排序

```sql
SELECT
  prod_name,
  prod_price
FROM
  Products
WHERE
  prod_price BETWEEN 3 AND 6
ORDER BY
  prod_price;
```

### 15、**SQL74 纠错 2**

供应商表 Vendors 有字段供应商名称 vend_name、供应商国家 vend_country、供应商省份 vend_state

| vend_name | vend_country | vend_state |
| --------- | ------------ | ---------- |
| apple     | USA          | CA         |
| vivo      | CNA          | shenzhen   |
| huawei    | CNA          | xian       |

【问题】修改正确下面 sql，使之正确返回

```
SELECT vend_name FROM Vendors ORDER BY vend_name WHERE vend_country = 'USA' AND vend_state = 'CA';
SELECT
  vend_name
FROM
  Vendors
WHERE
  vend_country = 'USA'
  AND vend_state = 'CA'
ORDER BY
  vend_name;
```

### 16、**SQL75 检索产品名称和描述（一）**

Products 表

| prod_name | prod_desc      |
| --------- | -------------- |
| a0011     | usb            |
| a0019     | iphone13       |
| b0019     | gucci t-shirts |
| c0019     | gucci toy      |
| d0019     | lego toy       |

【问题】编写 SQL 语句，从 Products 表中检索产品名称（prod_name）和描述（prod_desc），仅返回描述中包含 toy 一词的产品名称

```sql
SELECT
  prod_name,
  prod_desc
FROM
  Products
WHERE
  prod_desc LIKE '%toy%';
```

### 17、**SQL76 检索产品名称和描述（二）**

Products 表

| prod_name | prod_desc      |
| --------- | -------------- |
| a0011     | usb            |
| a0019     | iphone13       |
| b0019     | gucci t-shirts |
| c0019     | gucci toy      |
| d0019     | lego toy       |

【问题】编写 SQL 语句，从 Products 表中检索产品名称（prod_name）和描述（prod_desc），仅返回描述中未出现 toy 一词的产品，最后按”产品名称“对结果进行排序。

```sql
SELECT
  prod_name,
  prod_desc
FROM
  Products
WHERE
  prod_desc NOT LIKE '%toy%'
ORDER BY
  prod_name;
```

### 18、**SQL77 检索产品名称和描述（三）**

Products 表

| prod_name | prod_desc        |
| --------- | ---------------- |
| a0011     | usb              |
| a0019     | iphone13         |
| b0019     | gucci t-shirts   |
| c0019     | gucci toy        |
| d0019     | lego carrots toy |

【问题】编写 SQL 语句，从 Products 表中检索产品名称（prod_name）和描述（prod_desc），仅返回描述中同时出现 toy 和 carrots 的产品。有好几种方法可以执行此操作，但对于这个挑战题，请使用 AND 和两个 LIKE 比较。

```sql
SELECT
  prod_name,
  prod_desc
FROM
  Products
WHERE
  prod_desc LIKE '%toy%'
  AND prod_desc LIKE '%carrots%'
ORDER BY
  prod_name;
```

### 19、**SQL78 检索产品名称和描述（四）**

Products 表

| prod_name | prod_desc        |
| --------- | ---------------- |
| a0011     | usb              |
| a0019     | iphone13         |
| b0019     | gucci t-shirts   |
| c0019     | gucci toy        |
| d0019     | lego toy carrots |

【问题】编写 SQL 语句，从 Products 表中检索产品名称（prod_name）和描述（prod_desc），仅返回在描述中以先后顺序同时出现 toy 和 carrots 的产品。提示：只需要用带有三个 % 符号的 LIKE 即可。

```sql
SELECT
  prod_name,
  prod_desc
FROM
  Products
WHERE
  prod_desc LIKE '%toy%carrots%';
```

### 20、**SQL79 别名**

别名的常见用法是在检索出的结果中重命名表的列字段（为了符合特定的报表要求或客户需求）。有表 Vendors 代表供应商信息，vend_id 供应商 id、vend_name 供应商名称、vend_address 供应商地址、vend_city 供应商城市。

| **vend_id** | **vend_name** | **vend_address** | **vend_city** |
| ----------- | ------------- | ---------------- | ------------- |
| a001        | tencent cloud | address1         | shenzhen      |
| a002        | huawei cloud  | address2         | dongguan      |
| a003        | aliyun cloud  | address3         | hangzhou      |
| a003        | netease cloud | address4         | guangzhou     |

【问题】编写 SQL 语句，从 Vendors 表中检索 vend_id、vend_name、vend_address 和 vend_city，将 vend_name 重命名为 vname，将 vend_city 重命名为 vcity，将 vend_address 重命名为 vaddress，按供应商名称对结果进行升序排序。

```sql
SELECT
  vend_id,
  vend_name vname,
  vend_address vaddress,
  vend_city vcity
FROM
  Vendors
ORDER BY
  vend_name;
```

### 21、**SQL80 打折**

我们的示例商店正在进行打折促销，所有产品均降价 10%。Products 表包含 prod_id 产品 id、prod_price 产品价格

【问题】编写 SQL 语句，从 Products 表中返回 prod_id、prod_price 和 sale_price。sale_price 是一个包含促销价格的计算字段。提示：可以乘以 0.9，得到原价的 90%（即 10%的折扣）

【示例结果】

返回产品 id prod_id、产品价格 prod_price、销售价格 sale_price

| **prod_id** | **prod_price** | **sale_price** |
| ----------- | -------------- | -------------- |
| a0011       | 9.49           | 8.541          |
| a0019       | 600            | 540            |
| b0019       | 1000           | 900            |

```sql
SELECT
  prod_id,
  prod_price,
  prod_price * 0.9 sale_price
FROM
  Products;
```

### 22、**SQL81 顾客登录名**

我们的商店已经上线了，正在创建顾客账户。所有用户都需要登录名，默认登录名是其名称和所在城市的组合。

给出 Customers 表 如下：

| cust_id | cust_name | cust_contact | cust_city |
| ------- | --------- | ------------ | --------- |
| a1      | Andy Li   | Andy Li      | Oak Park  |
| a2      | Ben Liu   | Ben Liu      | Oak Park  |
| a3      | Tony Dai  | Tony Dai     | Oak Park  |
| a4      | Tom Chen  | Tom Chen     | Oak Park  |
| a5      | An Li     | An Li        | Oak Park  |
| a6      | Lee Chen  | Lee Chen     | Oak Park  |
| a7      | Hex Liu   | Hex Liu      | Oak Park  |

【问题】编写 SQL 语句，返回顾客 ID（cust_id）、顾客名称（cust_name）和登录名（user_login），其中登录名全部为大写字母，并由顾客联系人的前两个字符（cust_contact）和其所在城市的前三个字符（cust_city）组成。提示：需要使用函数、拼接和别名。

```sql
SELECT
  cust_id,
  cust_name,
  UPPER(
    CONCAT(
      SUBSTRING(cust_contact, 1, 2),
      SUBSTRING(cust_city, 1, 3)
    )
  ) user_login
FROM
  Customers;
```

### 23、**SQL82 返回 2020 年 1 月的所有订单的订单号和订单日期**

Orders 订单表

| order_num | order_date          |
| --------- | ------------------- |
| a0001     | 2020-01-01 00:00:00 |
| a0002     | 2020-01-02 00:00:00 |
| a0003     | 2020-01-01 12:00:00 |
| a0004     | 2020-02-01 00:00:00 |
| a0005     | 2020-03-01 00:00:00 |

【问题】编写 SQL 语句，返回 2020 年 1 月的所有订单的订单号（order_num）和订单日期（order_date），并按订单日期升序排序

```sql
SELECT
  order_num,
  order_date
FROM
  Orders
WHERE
  order_date LIKE '2020-01%'
ORDER BY
  order_date;
```

### 24、**SQL83 确定已售出产品的总数**

OrderItems 表代表售出的产品，quantity 代表售出商品数量。

| quantity |
| -------- |
| 10       |
| 100      |
| 1000     |
| 10001    |
| 2        |
| 15       |

【问题】编写 SQL 语句，确定已售出产品的总数。

```sql
SELECT SUM(quantity) items_ordered FROM OrderItems;
```

### 25、**SQL84 确定已售出产品项 BR01 的总数**

OrderItems 表代表售出的产品，quantity 代表售出商品数量，产品项为 prod_item。

| quantity | prod_id |
| -------- | ------- |
| 10       | AR01    |
| 100      | AR10    |
| 1000     | BR01    |
| 10001    | BR010   |

【问题】修改创建的语句，确定已售出产品项（prod_item）为"BR01"的总数。

```sql
SELECT
  SUM(quantity) AS items_ordered
FROM
  OrderItems
WHERE
  prod_id = "BR01";
```

### 26、**SQL85 确定 Products 表中价格不超过 10 美元的最贵产品的价格**

Products 表

| prod_price |
| ---------- |
| 9.49       |
| 600        |
| 1000       |

【问题】编写 SQL 语句，确定 Products 表中价格不超过 10 美元的最贵产品的价格（prod_price）。将计算所得的字段命名为 max_price。

```sql
SELECT MAX(prod_price) AS max_price
FROM
  Products
WHERE
  prod_price <= '10';
```

### 27、**SQL86 返回每个订单号各有多少行数**

OrderItems 表包含每个订单的每个产品

| order_num |
| --------- |
| a002      |
| a002      |
| a002      |
| a004      |
| a007      |

【问题】编写 SQL 语句，返回每个订单号（order_num）各有多少行数（order_lines），并按 order_lines 对结果进行升序排序。

```sql
SELECT
  order_num,
  COUNT(order_num) AS order_lines
FROM
  OrderItems
group by
  order_num
ORDER BY
  order_lines;
```

### 28、**SQL87 每个供应商成本最低的产品**

有 Products 表，含有字段 prod_price 代表产品价格，vend_id 代表供应商 id

| vend_id | prod_price |
| ------- | ---------- |
| a0011   | 100        |
| a0019   | 0.1        |
| b0019   | 1000       |
| b0019   | 6980       |
| b0019   | 20         |

【问题】编写 SQL 语句，返回名为 cheapest_item 的字段，该字段包含每个供应商成本最低的产品（使用 Products 表中的 prod_price），然后从最低成本到最高成本对结果进行升序排序。

```sql
SELECT
  vend_id,
  MIN(prod_price) AS cheapest_item
FROM
  Products
GROUP BY
  vend_id
ORDER BY
  cheapest_item;
```

### 29、**SQL88 返回订单数量总和不小于 100 的所有订单的订单号**

OrderItems 代表订单商品表，包括：订单号 order_num 和订单数量 quantity。

| order_num | quantity |
| --------- | -------- |
| a1        | 105      |
| a2        | 1100     |
| a2        | 200      |
| a4        | 1121     |
| a5        | 10       |
| a2        | 19       |
| a7        | 5        |

【问题】请编写 SQL 语句，返回订单数量总和不小于 100 的所有订单号，最后结果按照订单号升序排序。

```sql
SELECT order_num
FROM
  OrderItems
GROUP BY
  order_num
HAVING
  SUM(quantity) >= 100
ORDER BY
  order_num;
```

### 30、**SQL89 计算总和**

OrderItems 表代表订单信息，包括字段：订单号 order_num 和 item_price 商品售出价格、quantity 商品数量。

| order_num | item_price | quantity |
| --------- | ---------- | -------- |
| a1        | 10         | 105      |
| a2        | 1          | 1100     |
| a2        | 1          | 200      |
| a4        | 2          | 1121     |
| a5        | 5          | 10       |
| a2        | 1          | 19       |
| a7        | 7          | 5        |

【问题】编写 SQL 语句，根据订单号聚合，返回订单总价不小于 1000 的所有订单号，最后的结果按订单号进行升序排序。

提示：总价 = item_price 乘以 quantity

```sql
SELECT
  order_num,
  SUM(item_price * quantity) AS total_price
FROM
  OrderItems
GROUP BY
  order_num
HAVING
  total_price >= 1000
ORDER BY
  order_num
```

### 31、**SQL90 纠错 3**

OrderItems 表含有 order_num 订单号

| order_num |
| --------- |
| a002      |
| a002      |
| a002      |
| a004      |
| a007      |

【问题】将下面代码修改正确后执行

```
SELECT order_num, COUNT(*) AS items FROM OrderItems GROUP BY items HAVING COUNT(*) >= 3 ORDER BY items, order_num;
```

【示例结果】

返回订单号 order_num 和出现的次数 items

| order_num | items |
| --------- | ----- |
| a002      | 3     |

```sql
SELECT
  order_num,
  COUNT(*) AS items
FROM
  OrderItems
GROUP BY
  order_num
HAVING
  COUNT(*) >= 3
ORDER BY
  items,
  order_num;
```

### 32、**SQL91 返回购买价格为 10 美元或以上产品的顾客列表**

OrderItems 表示订单商品表，含有字段订单号：order_num、订单价格：item_price；Orders 表代表订单信息表，含有顾客 id：cust_id 和订单号：order_num

OrderItems 表

| order_num | item_price |
| --------- | ---------- |
| a1        | 10         |
| a2        | 1          |
| a2        | 1          |
| a4        | 2          |
| a5        | 5          |
| a2        | 1          |
| a7        | 7          |

Orders 表

| order_num | cust_id |
| --------- | ------- |
| a1        | cust10  |
| a2        | cust1   |
| a2        | cust1   |
| a4        | cust2   |
| a5        | cust5   |
| a2        | cust1   |
| a7        | cust7   |

【问题】使用子查询，返回购买价格为 10 美元或以上产品的顾客列表，结果无需排序。
注意：你需要使用 OrderItems 表查找匹配的订单号（order_num），然后使用 Order 表检索这些匹配订单的顾客 ID（cust_id）。

```sql
SELECT
  DISTINCT cust_id
FROM
  Orders
WHERE
  order_num IN (
    SELECT
      order_num
    FROM
      OrderItems
    WHERE
      item_price >= 10
  )
```

### 33、**SQL92 确定哪些订单购买了 prod_id 为 BR01 的产品（一）**

表 OrderItems 代表订单商品信息表，prod_id 为产品 id；Orders 表代表订单表有 cust_id 代表顾客 id 和订单日期 order_date

OrderItems 表

| prod_id | order_num |
| ------- | --------- |
| BR01    | a0001     |
| BR01    | a0002     |
| BR02    | a0003     |
| BR02    | a0013     |

Orders 表

| order_num | cust_id | order_date          |
| --------- | ------- | ------------------- |
| a0001     | cust10  | 2022-01-01 00:00:00 |
| a0002     | cust1   | 2022-01-01 00:01:00 |
| a0003     | cust1   | 2022-01-02 00:00:00 |
| a0013     | cust2   | 2022-01-01 00:20:00 |

【问题】

编写 SQL 语句，使用子查询来确定哪些订单（在 OrderItems 中）购买了 prod_id 为 "BR01" 的产品，然后从 Orders 表中返回每个产品对应的顾客 ID（cust_id）和订单日期（order_date），按订购日期对结果进行升序排序。

【示例结果】返回顾客 id cust_id 和定单日期 order_date。

| cust_id | order_date          |
| ------- | ------------------- |
| cust10  | 2022-01-01 00:00:00 |
| cust1   | 2022-01-01 00:01:00 |

```sql
SELECT
  cust_id,
  order_date
FROM
  Orders
WHERE
  order_num IN (
    SELECT
      order_num
    FROM
      OrderItems
    WHERE
      prod_id = 'BR01'
  )
ORDER BY
  order_date;
```

### 34、**SQL93 返回购买 prod_id 为 BR01 的产品的所有顾客的电子邮件（一）**

你想知道订购 BR01 产品的日期，有表 OrderItems 代表订单商品信息表，prod_id 为产品 id；Orders 表代表订单表有 cust_id 代表顾客 id 和订单日期 order_date；Customers 表含有 cust_email 顾客邮件和 cust_id 顾客 id

Customers 表代表顾客信息，cust_id 为顾客 id，cust_email 为顾客 email

OrderItems 表

| prod_id | order_num |
| ------- | --------- |
| BR01    | a0001     |
| BR01    | a0002     |
| BR02    | a0003     |
| BR02    | a0013     |

Orders 表

| order_num | cust_id | order_date          |
| --------- | ------- | ------------------- |
| a0001     | cust10  | 2022-01-01 00:00:00 |
| a0002     | cust1   | 2022-01-01 00:01:00 |
| a0003     | cust1   | 2022-01-02 00:00:00 |
| a0013     | cust2   | 2022-01-01 00:20:00 |

【问题】返回购买 prod_id 为 BR01 的产品的所有顾客的电子邮件（Customers 表中的 cust_email），结果无需排序。

提示：这涉及 SELECT 语句，最内层的从 OrderItems 表返回 order_num，中间的从 Customers 表返回 cust_id。

【示例结果】

返回顾客 email cust_email

| cust_email      |
| --------------- |
| cust10@cust.com |
| cust1@cust.com  |

```sql
SELECT
  cust_email
FROM
  Customers
WHERE
  cust_id IN(
    SELECT
      cust_id
    FROM
      Orders
    WHERE
      order_num IN(
        SELECT
          order_num
        FROM
          OrderItems
        WHERE
          prod_id = 'BR01'
      )
  )
```

### 35、**SQL94 返回每个顾客不同订单的总金额**

我们需要一个顾客 ID 列表，其中包含他们已订购的总金额。

OrderItems 表代表订单信息，OrderItems 表有订单号：order_num 和商品售出价格：item_price、商品数量：quantity。

| order_num | item_price | quantity |
| --------- | ---------- | -------- |
| a0001     | 10         | 105      |
| a0002     | 1          | 1100     |
| a0002     | 1          | 200      |
| a0013     | 2          | 1121     |
| a0003     | 5          | 10       |
| a0003     | 1          | 19       |
| a0003     | 7          | 5        |

Orders 表订单号：order_num、顾客 id：cust_id

| order_num | cust_id |
| --------- | ------- |
| a0001     | cust10  |
| a0002     | cust1   |
| a0003     | cust1   |
| a0013     | cust2   |

【问题】

编写 SQL 语句，返回顾客 ID（Orders 表中的 cust_id），并使用子查询返回 total_ordered 以便返回每个顾客的订单总数，将结果按金额从大到小排序。

提示：你之前已经使用 SUM()计算订单总数。

【示例结果】返回顾客 id cust_id 和 total_order 下单总额

| cust_id | total_ordered |
| ------- | ------------- |
| cust2   | 2242          |
| cust1   | 1300          |
| cust10  | 1050          |
| cust2   | 104           |

【示例解析】cust2 在 Orders 里面的订单 a0013，a0013 的售出价格是 2 售出数量是 1121，总额是 2242，最后返回 cust2 的支付总额是 2242。

```sql
SELECT
  cust_id,
  (
    SELECT
      SUM(item_price * quantity)
    FROM
      OrderItems
    WHERE
      Orders.order_num = OrderItems.order_num
  ) AS total_ordered
FROM
  Orders
ORDER BY
  total_ordered DESC;
```

### 36、**SQL95 从 Products 表中检索所有的产品名称以及对应的销售总数**

Products 表中检索所有的产品名称：prod_name、产品 id：prod_id

| prod_id | prod_name |
| ------- | --------- |
| a0001   | egg       |
| a0002   | sockets   |
| a0013   | coffee    |
| a0003   | cola      |

OrderItems 代表订单商品表，订单产品：prod_id、售出数量：quantity

| prod_id | quantity |
| ------- | -------- |
| a0001   | 105      |
| a0002   | 1100     |
| a0002   | 200      |
| a0013   | 1121     |
| a0003   | 10       |
| a0003   | 19       |
| a0003   | 5        |

【问题】

编写 SQL 语句，从 Products 表中检索所有的产品名称（prod_name），以及名为 quant_sold 的计算列，其中包含所售产品的总数（在 OrderItems 表上使用子查询和 SUM(quantity)检索）。

【示例结果】返回产品名称 prod_name 和产品售出数量总和

| prod_name | quant_sold |
| --------- | ---------- |
| egg       | 105        |
| sockets   | 1300       |
| coffee    | 1121       |
| cola      | 34         |

【示例解析】prod_name 是 cola 的 prod_id 为 a0003，quantity 总量为 34，返回结果无需排序。

```sql
SELECT
  prod_name,
  (
    SELECT
      SUM(quantity)
    FROM
      OrderItems
    WHERE
      OrderItems.prod_id = Products.prod_id
  ) AS quant_sold
FROM
  Products;
```

### 37、**SQL96 返回顾客名称和相关订单号**

Customers 表有字段顾客名称 cust_name、顾客 id cust_id

| cust_id  | cust_name |
| -------- | --------- |
| cust10   | andy      |
| cust1    | ben       |
| cust2    | tony      |
| cust22   | tom       |
| cust221  | an        |
| cust2217 | hex       |

Orders 订单信息表，含有字段 order_num 订单号、cust_id 顾客 id

| order_num | cust_id  |
| --------- | -------- |
| a1        | cust10   |
| a2        | cust1    |
| a3        | cust2    |
| a4        | cust22   |
| a5        | cust221  |
| a7        | cust2217 |

【问题】

编写 SQL 语句，返回 Customers 表中的顾客名称（cust_name）和 Orders 表中的相关订单号（order_num），并按顾客名称再按订单号对结果进行升序排序。你可以尝试用两个不同的写法，一个使用简单的等联结语法，另外一个使用 INNER JOIN。

【示例结果】cust_name 代表用户名称 cust_name 和订单号 order_num。

【示例解析】顾客名称为 an 的 cust_id 为 cust221，他的订单号为 a5。

| cust_name | order_num |
| --------- | --------- |
| an        | a5        |
| andy      | a1        |
| ben       | a2        |
| hex       | a7        |
| tom       | a4        |
| tony      | a3        |

```sql
#内连结
SELECT cust_name, order_num
FROM
  Customers
  INNER JOIN Orders ON Customers.cust_id = Orders.cust_id
ORDER BY
  cust_name, order_num;

#简单连结
SELECT
  cust_name,
  order_num
FROM
  Customers,
  Orders
WHERE
  Customers.cust_id = Orders.cust_id
ORDER BY
  cust_name,
  order_num;
```

### 38、**SQL97 返回顾客名称和相关订单号以及每个订单的总价**

Customers 表有字段，顾客名称：cust_name、顾客 id：cust_id

OrderItems 表有字段，商品订单号：order_num、商品数量：quantity、商品价格：item_price

| cust_id  | cust_name |
| -------- | --------- |
| cust10   | andy      |
| cust1    | ben       |
| cust2    | tony      |
| cust22   | tom       |
| cust221  | an        |
| cust2217 | hex       |

Orders 订单信息表，含有字段，订单号：order_num、顾客 id：cust_id

| order_num | cust_id  |
| --------- | -------- |
| a1        | cust10   |
| a2        | cust1    |
| a3        | cust2    |
| a4        | cust22   |
| a5        | cust221  |
| a7        | cust2217 |

| order_num | quantity | item_price |
| --------- | -------- | ---------- |
| a1        | 1000     | 10         |
| a2        | 200      | 10         |
| a3        | 10       | 15         |
| a4        | 25       | 50         |
| a5        | 15       | 25         |
| a7        | 7        | 7          |

【问题】

除了返回顾客名称和订单号，返回 Customers 表中的顾客名称（cust_name）和 Orders 表中的相关订单号（order_num），添加第三列 OrderTotal，其中包含每个订单的总价，并按顾客名称再按订单号对结果进行升序排序。

【示例结果】返回顾客名称 cust_name、订单号 order_num、订单总额 OrderTotal

| cust_name | order_num | OrderTotal |
| --------- | --------- | ---------- |
| an        | a5        | 375        |
| andy      | a1        | 10000      |
| ben       | a2        | 2000       |
| hex       | a7        | 49         |
| tom       | a4        | 1250       |
| tony      | a3        | 150        |

【示例解析】

例如顾客名称 cust_name 为 an 的顾客的订单 a5 的订单总额为 quantity*item_price = 15 * 25 = 375，最后以 cust_name 和 order_num 来进行升序排序。

```sql
select
  c.cust_name,
  o.order_num,
  sum(os.quantity * os.item_price) OrderTotal
from
  Orders o
  join Customers c on c.cust_id = o.cust_id
  join OrderItems os on os.order_num = o.order_num
group by
  c.cust_name,
  o.order_num
order by
  c.cust_name,
  o.order_num;
```

### 39、**SQL98 确定哪些订单购买了 prod_id 为 BR01 的产品（二）**

表 OrderItems 代表订单商品信息表，prod_id 为产品 id；Orders 表代表订单表有 cust_id 代表顾客 id 和订单日期 order_date

OrderItems 表

| prod_id | order_num |
| ------- | --------- |
| BR01    | a0001     |
| BR01    | a0002     |
| BR02    | a0003     |
| BR02    | a0013     |

Orders 表

| order_num | cust_id | order_date          |
| --------- | ------- | ------------------- |
| a0001     | cust10  | 2022-01-01 00:00:00 |
| a0002     | cust1   | 2022-01-01 00:01:00 |
| a0003     | cust1   | 2022-01-02 00:00:00 |
| a0013     | cust2   | 2022-01-01 00:20:00 |

【问题】

编写 SQL 语句，使用子查询来确定哪些订单（在 OrderItems 中）购买了 prod_id 为 "BR01" 的产品，然后从 Orders 表中返回每个产品对应的顾客 ID（cust_id）和订单日期（order_date），按订购日期对结果进行升序排序。

提示：这一次使用联结和简单的等联结语法。

【示例结果】

返回顾客 id cust_id 和定单日期 order_date

| cust_id | order_date          |
| ------- | ------------------- |
| cust10  | 2022-01-01 00:00:00 |
| cust1   | 2022-01-01 00:01:00 |

【示例解析】

产品 id 为 BR01 的订单 a0001 和 a002 的下单顾客 cust10 和 cust1 的下单时间分别为 2022-01-01 00:00:00 和 2022-01-01 00:01:00

```sql
SELECT
  cust_id,
  order_date
FROM
  Orders o
  JOIN OrderItems os ON os.order_num = o.order_num
  AND os.prod_id = 'BR01'
ORDER BY
  o.order_date;
```

### 40、**SQL99 返回购买 prod_id 为 BR01 的产品的所有顾客的电子邮件（二）**

有表 OrderItems 代表订单商品信息表，prod_id 为产品 id；Orders 表代表订单表有 cust_id 代表顾客 id 和订单日期 order_date；Customers 表含有 cust_email 顾客邮件和 cust_id 顾客 id

Customers 表代表顾客信息，cust_id 为顾客 id，cust_email 为顾客 email

OrderItems 表

| prod_id | order_num |
| ------- | --------- |
| BR01    | a0001     |
| BR01    | a0002     |
| BR02    | a0003     |
| BR02    | a0013     |

Orders 表

| order_num | cust_id | order_date          |
| --------- | ------- | ------------------- |
| a0001     | cust10  | 2022-01-01 00:00:00 |
| a0002     | cust1   | 2022-01-01 00:01:00 |
| a0003     | cust1   | 2022-01-02 00:00:00 |
| a0013     | cust2   | 2022-01-01 00:20:00 |

【问题】返回购买 prod_id 为 BR01 的产品的所有顾客的电子邮件（Customers 表中的 cust_email），结果无需排序。

提示：涉及到 SELECT 语句，最内层的从 OrderItems 表返回 order_num，中间的从 Customers 表返回 cust_id，但是必须使用 INNER JOIN 语法。

【示例结果】返回顾客 email cust_email

【示例解析】

| cust_email      |
| --------------- |
| cust10@cust.com |
| cust1@cust.com  |

产品 id 为 BR01 的订单 a0001 和 a002 的下单顾客 cust10 和 cust1 的顾客 email cust_email 分别是：cust10@cust.com 、cust1@cust.com

```sql
SELECT
  cust_email
FROM
  Customers c
  INNER JOIN Orders o ON o.cust_id = c.cust_id
  INNER JOIN OrderItems os ON os.order_num = o.order_num
WHERE
  os.prod_id = 'BR01';
```

### 41、**SQL100 确定最佳顾客的另一种方式（二）**

OrderItems 表代表订单信息，确定最佳顾客的另一种方式是看他们花了多少钱，OrderItems 表有订单号 order_num 和 item_price 商品售出价格、quantity 商品数量

| order_num | item_price | quantity |
| --------- | ---------- | -------- |
| a1        | 10         | 105      |
| a2        | 1          | 1100     |
| a2        | 1          | 200      |
| a4        | 2          | 1121     |
| a5        | 5          | 10       |
| a2        | 1          | 19       |
| a7        | 7          | 5        |

Orders 表含有字段 order_num 订单号、cust_id 顾客 id

| order_num | cust_id  |
| --------- | -------- |
| a1        | cust10   |
| a2        | cust1    |
| a3        | cust2    |
| a4        | cust22   |
| a5        | cust221  |
| a7        | cust2217 |

顾客表 Customers 有字段 cust_id 客户 id、cust_name 客户姓名

| cust_id  | cust_name |
| -------- | --------- |
| cust10   | andy      |
| cust1    | ben       |
| cust2    | tony      |
| cust22   | tom       |
| cust221  | an        |
| cust2217 | hex       |

【问题】编写 SQL 语句，返回订单总价不小于 1000 的客户名称和总额（OrderItems 表中的 order_num）。

提示：需要计算总和（item_price 乘以 quantity）。按总额对结果进行排序，请使用 INNER JOIN 语法。

【示例结果】

| cust_name | total_price |
| --------- | ----------- |
| andy      | 1050        |
| ben       | 1319        |
| tom       | 2242        |

【示例解析】

总额（item_price 乘以 quantity）大于等于 1000 的订单号，例如 a2 对应的顾客 id 为 cust1，cust1 的顾客名称 cust_name 是 ben，最后返回 ben 作为 order_num a2 的 quantity \* item_price 总和的结果 1319。

```sql
SELECT
  cust_name,
  SUM(item_price * quantity) AS total_price
FROM
  Orders o
  INNER JOIN Customers c ON c.cust_id = o.cust_id
  INNER JOIN OrderItems os ON os.order_num = o.order_num
GROUP BY
  cust_name
HAVING
  total_price >= 1000
ORDER BY
  total_price;
```

### 42、**SQL101 检索每个顾客的名称和所有的订单号（一）**

Customers 表代表顾客信息含有顾客 id cust_id 和 顾客名称 cust_name

| cust_id  | cust_name |
| -------- | --------- |
| cust10   | andy      |
| cust1    | ben       |
| cust2    | tony      |
| cust22   | tom       |
| cust221  | an        |
| cust2217 | hex       |

Orders 表代表订单信息含有订单号 order_num 和顾客 id cust_id

| order_num | cust_id  |
| --------- | -------- |
| a1        | cust10   |
| a2        | cust1    |
| a3        | cust2    |
| a4        | cust22   |
| a5        | cust221  |
| a7        | cust2217 |

【问题】使用 INNER JOIN 编写 SQL 语句，检索每个顾客的名称（Customers 表中的 cust_name）和所有的订单号（Orders 表中的 order_num），最后根据顾客姓名 cust_name 升序返回。

【示例结果】返回顾客名称 cust_name 和订单号 order_num

| cust_name | order_num |
| --------- | --------- |
| an        | a5        |
| andy      | a1        |
| ben       | a2        |
| hex       | a7        |
| tom       | a4        |
| tony      | a3        |

```sql
SELECT
  cust_name,
  order_num
FROM
  Customers c
  INNER JOIN Orders o ON o.cust_id = c.cust_id
ORDER BY
  cust_name;
```

### 43、**SQL102 检索每个顾客的名称和所有的订单号（二）**

Orders 表代表订单信息含有订单号 order_num 和顾客 id cust_id

| order_num | cust_id  |
| --------- | -------- |
| a1        | cust10   |
| a2        | cust1    |
| a3        | cust2    |
| a4        | cust22   |
| a5        | cust221  |
| a7        | cust2217 |

Customers 表代表顾客信息含有顾客 id cust_id 和 顾客名称 cust_name

| cust_id  | cust_name |
| -------- | --------- |
| cust10   | andy      |
| cust1    | ben       |
| cust2    | tony      |
| cust22   | tom       |
| cust221  | an        |
| cust2217 | hex       |
| cust40   | ace       |

【问题】检索每个顾客的名称（Customers 表中的 cust_name）和所有的订单号（Orders 表中的 order_num），列出所有的顾客，即使他们没有下过订单。最后根据顾客姓名 cust_name 升序返回。

【示例结果】

返回顾客名称 cust_name 和订单号 order_num

| cust_name | order_num |
| --------- | --------- |
| ace       | NULL      |
| an        | a5        |
| andy      | a1        |
| ben       | a2        |
| hex       | a7        |
| tom       | a4        |
| tony      | a3        |

【示例解析】

基于两张表，返回订单号 a1 的顾客名称 andy 等人，没有下单的顾客 ace 也统计了进来

```sql
SELECT
  cust_name,
  order_num
FROM
  Customers
  LEFT JOIN Orders USING(cust_id)
ORDER BY
  cust_name;
```

用法：

- 内联结：inner join。取两列的交集。
- 外联结：

- - left join。左连接，以左边表的列为主，取两列的交集，对于不在右边列存在的名称取 null。
    - right join。右连接，以右边表的列为主，取两列的交集，对于不在左边列存在的名称取 null。

### 44、**SQL103 返回产品名称和与之相关的订单号**

Products 表为产品信息表含有字段 prod_id 产品 id、prod_name 产品名称

| prod_id | prod_name |
| ------- | --------- |
| a0001   | egg       |
| a0002   | sockets   |
| a0013   | coffee    |
| a0003   | cola      |
| a0023   | soda      |

OrderItems 表为订单信息表含有字段 order_num 订单号和产品 id prod_id

| prod_id | order_num |
| ------- | --------- |
| a0001   | a105      |
| a0002   | a1100     |
| a0002   | a200      |
| a0013   | a1121     |
| a0003   | a10       |
| a0003   | a19       |
| a0003   | a5        |

【问题】

使用 OUTER JOIN 联结 Products 表和 OrderItems 表，返回产品名称（prod_name）和与之相关的订单号（order_num）的列表，并按照产品名称升序排序。

【示例结果】

返回产品名称 prod_name 和订单号 order_num

| prod_name | order_num |
| --------- | --------- |
| coffee    | a1121     |
| cola      | a5        |
| cola      | a19       |
| cola      | a10       |
| egg       | a105      |
| sockets   | a200      |
| sockets   | a1100     |
| soda      | NULL      |

【示例解析】

返回产品和对应实际支付订单的订单号，但是无实际订单的产品 soda 也返回，最后根据产品名称升序排序。

```sql
SELECT
  prod_name,
  order_num
FROM
  Products p
  LEFT JOIN OrderItems o USING(prod_id)
ORDER BY
  prod_name;
```

**外连接 (OUTER JOIN)分为三种**

1. **左外连接 (LEFT OUTER JOIN 或 LEFT JOIN）：**左表的记录将会全部表示出来，而右表只会显示符合搜索条件的记录，右表记录不足的地方均为 NULL
2. **右外连接 (RIGHT OUTER JOIN 或 RIGHT JOIN)：**与左(外)连接相反，右(外)连接，右表的记录将会全部表示出来，而左表只会显示符合搜索条件的记录，左表记录不足的地方均为 NULL
3. **全外连接 (FULL OUTER JOIN 或 FULL JOIN)：**左表和右表都不做限制，所有的记录都显示，两表不足的地方用 null 填充
   MySQL 中不支持全外连接，可以使用 UNION 来合并两个或多个 SELECT 语句的结果集

### 45、**SQL104 返回产品名称和每一项产品的总订单数**

Products 表为产品信息表含有字段 prod_id 产品 id、prod_name 产品名称

| prod_id | prod_name |
| ------- | --------- |
| a0001   | egg       |
| a0002   | sockets   |
| a0013   | coffee    |
| a0003   | cola      |
| a0023   | soda      |

OrderItems 表为订单信息表含有字段 order_num 订单号和产品 id prod_id

| prod_id | order_num |
| ------- | --------- |
| a0001   | a105      |
| a0002   | a1100     |
| a0002   | a200      |
| a0013   | a1121     |
| a0003   | a10       |
| a0003   | a19       |
| a0003   | a5        |

【问题】

使用 OUTER JOIN 联结 Products 表和 OrderItems 表，返回产品名称（prod_name）和每一项产品的总订单数（不是订单号），并按产品名称升序排序。

【示例结果】

返回产品名称 prod_name 和订单号订单数 orders

| prod_name | orders |
| --------- | ------ |
| coffee    | 1      |
| cola      | 3      |
| egg       | 1      |
| sockets   | 2      |
| soda      | 0      |

【示例解析】

返回产品和产品对应的实际支付的订单数，但是无实际订单的产品 soda 也返回，最后根据产品名称升序排序。

```sql
SELECT
  prod_name,
  COUNT(os.prod_id) AS orders
FROM
  Products p
  LEFT JOIN OrderItems os USING(prod_id)
GROUP BY prod_name
ORDER BY
  prod_name;
```

### 46、**SQL105 列出供应商及其可供产品的数量**

有 Vendors 表含有 vend_id 供应商 id.

| vend_id |
| ------- |
| a0002   |
| a0013   |
| a0003   |
| a0010   |

有 Products 表含有供应商 id 和供应产品 id

| vend_id | prod_id              |
| ------- | -------------------- |
| a0001   | egg                  |
| a0002   | prod_id_iphone       |
| a00113  | prod_id_tea          |
| a0003   | prod_id_vivo phone   |
| a0010   | prod_id_huawei phone |

【问题】

列出供应商（Vendors 表中的 vend_id）及其可供产品的数量，包括没有产品的供应商。你需要使用 OUTER JOIN 和 COUNT()聚合函数来计算 Products 表中每种产品的数量，最后根据 vend_id 升序排序。

【示例结果】

注意：vend_id 列会显示在多个表中，因此在每次引用它时都需要完全限定它。

返回供应商 id 和对应供应商供应的产品的个数

| vend_id | prod_id |
| ------- | ------- |
| a0002   | 1       |
| a0013   | 0       |
| a0003   | 1       |
| a0010   | 1       |

【示例解析】

供应商 a00013 供应的商品不在 Products 表中所以为 0，其他供应商供应的产品为 1 个。

```sql
SELECT
  vend_id,
  COUNT(prod_id)
FROM
  Vendors
  LEFT JOIN Products USING(vend_id)
GROUP BY
  vend_id
ORDER BY
  vend_id;
```

### 47、**SQL106 将两个 SELECT 语句结合起来（一）**

表 OrderItems 包含订单产品信息，字段 prod_id 代表产品 id、quantity 代表产品数量

| prod_id | quantity |
| ------- | -------- |
| a0001   | 105      |
| a0002   | 100      |
| a0002   | 200      |
| a0013   | 1121     |
| a0003   | 10       |
| a0003   | 19       |
| a0003   | 5        |
| BNBG    | 10002    |

【问题】

​ 将两个 SELECT 语句结合起来，以便从 OrderItems 表中检索产品 id（prod_id）和 quantity。其中，一个 SELECT 语句过滤数量为 100 的行，另一个 SELECT 语句过滤 id 以 BNBG 开头的产品，最后按产品 id 对结果进行升序排序。

【示例结果】

​ 返回产品 id prod_id 和产品数量 quantity

| prod_id | quantity |
| ------- | -------- |
| a0002   | 100      |
| BNBG    | 10002    |

【示例解析】

​ 产品 id a0002 因为数量等于 100 被选取返回；BNBG 因为是以 BNBG 开头的产品所以返回；最后以产品 id 进行排序返回。

```sql
SELECT
  prod_id,quantity
FROM
  OrderItems
WHERE
  prod_id LIKE 'BNBG%'
UNION
SELECT
  prod_id,quantity
FROM
  OrderItems
WHERE
  quantity = 100
ORDER BY
  prod_id
```

### 48、**SQL107 将两个 SELECT 语句结合起来（二）**

表 OrderItems 包含订单产品信息，字段 prod_id 代表产品 id、quantity 代表产品数量。

| prod_id | quantity |
| ------- | -------- |
| a0001   | 105      |
| a0002   | 100      |
| a0002   | 200      |
| a0013   | 1121     |
| a0003   | 10       |
| a0003   | 19       |
| a0003   | 5        |
| BNBG    | 10002    |

【问题】

将两个 SELECT 语句结合起来，以便从 OrderItems 表中检索产品 id（prod_id）和 quantity。其中，一个 SELECT 语句过滤数量为 100 的行，另一个 SELECT 语句过滤 id 以 BNBG 开头的产品，最后按产品 id 对结果进行升序排序。
注意：这次仅使用单个 SELECT 语句。

```sql
SELECT
  prod_id,
  quantity
FROM
  OrderItems
WHERE
  prod_id LIKE 'BNBG%'
  OR quantity = 100
ORDER BY
  prod_id
```

### 49、**SQL108 组合 Products 表中的产品名称和 Customers 表中的顾客名称**

Products 表含有字段 prod_name 代表产品名称

| prod_name |
| --------- |
| flower    |
| rice      |
| ring      |
| umbrella  |

Customers 表代表顾客信息，cust_name 代表顾客名称

| cust_name |
| --------- |
| andy      |
| ben       |
| tony      |
| tom       |
| an        |
| lee       |
| hex       |

【问题】

编写 SQL 语句，组合 Products 表中的产品名称（prod_name）和 Customers 表中的顾客名称（cust_name）并返回，然后按产品名称对结果进行升序排序。

【示例结果】

| prod_name |
| --------- |
| an        |
| andy      |
| ben       |
| flower    |
| hex       |
| lee       |
| rice      |
| ring      |
| tom       |
| tony      |
| umbrella  |

【示例解析】

拼接 cust_name 和 prod_name 并根据结果升序排序

```sql
select
  prod_name
from
  Products
union all
select
  cust_name
from
  Customers
order by
  prod_name
```

用法：

- union--连接表，对行操作。
- union--将两个表做行拼接，同时自动删除重复的行。
- union all---将两个表做行拼接，保留重复的行

### 50、**SQL109 纠错 4**

表 Customers 含有字段 cust_name 顾客名、cust_contact 顾客联系方式、cust_state 顾客州、cust_email 顾客 email

![img](https://cdn.nlark.com/yuque/0/2022/png/1729037/1669388401730-37403035-caba-4325-9fd4-f899af188f5d.png)

【问题】修正下面错误的 SQL

```sql
SELECT
  cust_name,
  cust_contact,
  cust_email
FROM
  Customers
WHERE
  cust_state = 'MI'
ORDER BY
  cust_name;

UNION
SELECT
  cust_name,
  cust_contact,
  cust_email
FROM
  Customers
WHERE
  cust_state = 'IL'
ORDER BY
  cust_name;
```

【示例结果】

返回顾客名称 cust_name、顾客联系方式 cust_contact、顾客 email cust_email

![img](https://cdn.nlark.com/yuque/0/2022/png/1729037/1669388401714-cf427b3f-2b24-4240-b1b9-17eb9aefa616.png)

【示例解析】

返回住在 IL 和 MI 的顾客信息，最后根据顾客名称排序

```sql
SELECT
  cust_name,
  cust_contact,
  cust_email
FROM
  Customers
WHERE
  cust_state = 'MI'
UNION
SELECT
  cust_name,
  cust_contact,
  cust_email
FROM
  Customers
WHERE
  cust_state = 'IL'
ORDER BY
  cust_name;
```

**分析**

使用 union 组合查询时，只能使用一条 order by 字句，他必须位于最后一条 select 语句之后，因为对于结果集不存在对于一部分数据进行排序，而另一部分用另一种排序规则的情况。
