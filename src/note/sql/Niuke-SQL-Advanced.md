---
title: SQL进阶挑战
author: Ms.Yu
category: SQL
tag:
  - SQL
  - 数据库
star: 9
sticky: 9
---

### 1、**SQL110 插入记录（一）**

牛客后台会记录每个用户的试卷作答记录到 exam_record 表，现在有两个用户的作答记录详情如下：

- 用户 1001 在 2021 年 9 月 1 日晚上 10 点 11 分 12 秒开始作答试卷 9001，并在 50 分钟后提交，得了 90 分；
- 用户 1002 在 2021 年 9 月 4 日上午 7 点 1 分 2 秒开始作答试卷 9002，并在 10 分钟后退出了平台。

试卷作答记录表 exam_record 中，表已建好，其结构如下，请用一条语句将这两条记录插入表中。

| **Filed**   | **Type**   | **Null** | **Key** | **Extra**      | **Default** | **Comment** |
| ----------- | ---------- | -------- | ------- | -------------- | ----------- | ----------- |
| id          | int(11)    | NO       | PRI     | auto_increment | (NULL)      | 自增 ID     |
| uid         | int(11)    | NO       |         |                | (NULL)      | 用户 ID     |
| exam_id     | int(11)    | NO       |         |                | (NULL)      | 试卷 ID     |
| start_time  | datetime   | NO       |         |                | (NULL)      | 开始时间    |
| submit_time | datetime   | YES      |         |                | (NULL)      | 提交时间    |
| score       | tinyint(4) | YES      |         |                | (NULL)      | 得分        |

该题最后会通过执行 SELECT uid, exam_id, start_time, submit_time, score FROM exam_record;来对比结果

```sql
INSERT INTO
  exam_record
VALUES
  (
    NULL,
    1001,
    9001,
    '2021-09-01 22:11:12',
    '2021-09-01 23:01:12',
    90
  ),
  (NULL, 1002, 9002, '2021-09-04 07:01:02', NULL, NULL)
```

### 2、**SQL111 插入记录（二）**

现有一张试卷作答记录表 exam_record，结构如下表，其中包含多年来的用户作答试卷记录，由于数据越来越多，维护难度越来越大，需要对数据表内容做精简，历史数据做备份。

表 exam_record：

| **Filed**   | **Type**   | **Null** | **Key** | **Extra**      | **Default** | **Comment** |
| ----------- | ---------- | -------- | ------- | -------------- | ----------- | ----------- |
| id          | int(11)    | NO       | PRI     | auto_increment | (NULL)      | 自增 ID     |
| uid         | int(11)    | NO       |         |                | (NULL)      | 用户 ID     |
| exam_id     | int(11)    | NO       |         |                | (NULL)      | 试卷 ID     |
| start_time  | datetime   | NO       |         |                | (NULL)      | 开始时间    |
| submit_time | datetime   | YES      |         |                | (NULL)      | 提交时间    |
| score       | tinyint(4) | YES      |         |                | (NULL)      | 得分        |

我们已经创建了一张新表 exam_record_before_2021 用来备份 2021 年之前的试题作答记录，结构和 exam_record 表一致，请将 2021 年之前的已完成了的试题作答纪录导入到该表。

后台会通过执行"SELECT \* FROM exam_record_before_2021;"语句来对比结果

**明确考点：**

插入记录的方式汇总：

- 普通插入（全字段）：INSERT INTO table_name VALUES (value1, value2, ...)
- 普通插入（限定字段）：INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)
- 多条一次性插入：INSERT INTO table_name (column1, column2, ...) VALUES (value1_1, value1_2, ...), (value2_1, value2_2, ...), ...
- 从另一个表导入：INSERT INTO table_name SELECT \* FROM table_name2 [WHERE key=value]
- 带更新的插入：REPLACE INTO table_name VALUES (value1, value2, ...) （注意这种原理是检测到主键或唯一性索引键重复就删除原记录后重新插入）

**细节剖析：**

- 新表 exam_record_before_2021 已创建好；
- 第一列为自增主键列，不能直接复制过去；
- 只复制 2021 年之前的记录；
- 只复制已完成了的试题作答纪录；

```sql
INSERT INTO
  exam_record_before_2021(uid, exam_id, start_time, submit_time, score)
SELECT
  uid,
  exam_id,
  start_time,
  submit_time,
  score
FROM
  exam_record
WHERE
  YEAR(submit_time) < '2021';
```

### 3、**SQL112 插入记录（三）**

现在有一套 ID 为 9003 的高难度 SQL 试卷，时长为一个半小时，请你将 2021-01-01 00:00:00 作为发布时间插入到试题信息表 examination_info（其表结构如下图），不管该 ID 试卷是否存在，都要插入成功，请尝试插入它。

试题信息表 examination_info：

| **Filed**    | **Type**    | **Null** | **Key** | **Extra**      | **Default** | **Comment**  |
| ------------ | ----------- | -------- | ------- | -------------- | ----------- | ------------ |
| id           | int(11)     | NO       | PRI     | auto_increment | (NULL)      | 自增 ID      |
| exam_id      | int(11)     | NO       | UNI     |                | (NULL)      | 试卷 ID      |
| tag          | varchar(32) | YES      |         |                | (NULL)      | 类别标签     |
| difficulty   | varchar(8)  | YES      |         |                | (NULL)      | 难度         |
| duration     | int(11)     | NO       |         |                | (NULL)      | 时长(分钟数) |
| release_time | datetime    | YES      |         |                | (NULL)      | 发布时间     |

后台会通过执行 `**SELECT exam_id,tag,difficulty,duration,release_time FROM examination_info**` 语句来对比结果。

```sql
REPLACE INTO examination_info
VALUES
  (NULL, 9003, 'SQL', 'hard', 90, '2021-01-01 00:00:00')
```

### 4、**SQL113 更新记录（一）**

现有一张试卷信息表 examination_info，表结构如下图所示：

| **Filed**    | **Type** | **Null** | **Key** | **Extra**      | **Default** | **Comment** |
| ------------ | -------- | -------- | ------- | -------------- | ----------- | ----------- |
| id           | int(11)  | NO       | PRI     | auto_increment | (NULL)      | 自增 ID     |
| exam_id      | int(11)  | NO       | UNI     |                | (NULL)      | 试卷 ID     |
| tag          | char(32) | YES      |         |                | (NULL)      | 类别标签    |
| difficulty   | char(8)  | YES      |         |                | (NULL)      | 难度        |
| duration     | int(11)  | NO       |         |                | (NULL)      | 时长        |
| release_time | datetime | YES      |         |                | (NULL)      | 发布时间    |

请把 examination_info 表中 tag 为 PYTHON 的 tag 字段全部修改为 Python。

后台会通过执行'SELECT exam_id,tag,difficulty,duration,release_time FROM examination_info;'语句来对比结果。

**修改记录的方式汇总：**

- **设置为新值：**UPDATE table_name SET column_name=new_value [, column_name2=new_value2] [WHERE column_name3=value3]
- **根据已有值替换：**UPDATE table_name SET key1=replace(key1, '查找内容', '替换成内容') [WHERE column_name3=value3]

```sql
UPDATE examination_info SET tag = 'Python' WHERE tag = "PYTHON";
```

### 5、**SQL114 更新记录（二）**

现有一张试卷作答记录表 exam_record，其中包含多年来的用户作答试卷记录，结构如下表：

作答记录表 exam_record：

submit_time 为 完成时间

| **Filed**   | **Type**   | **Null** | **Key** | **Extra**      | **Default** | **Comment** |
| ----------- | ---------- | -------- | ------- | -------------- | ----------- | ----------- |
| id          | int(11)    | NO       | PRI     | auto_increment | (NULL)      | 自增 ID     |
| uid         | int(11)    | NO       |         |                | (NULL)      | 用户 ID     |
| exam_id     | int(11)    | NO       |         |                | (NULL)      | 试卷 ID     |
| start_time  | datetime   | NO       |         |                | (NULL)      | 开始时间    |
| submit_time | datetime   | YES      |         |                | (NULL)      | 提交时间    |
| score       | tinyint(4) | YES      |         |                | (NULL)      | 得分        |

请把 exam_record 表中 2021 年 9 月 1 日之前开始作答的未完成记录全部改为被动完成，即：将完成时间改为'2099-01-01 00:00:00'，分数改为 0。

```sql
UPDATE
  exam_record
SET
  submit_time = '2099-01-01 00:00:00',
  score = 0
WHERE
  start_time < '2021-09-01'
  AND submit_time IS NULL;
```

### 6、**SQL115 删除记录（一）**

现有一张试卷作答记录表 exam_record，其中包含多年来的用户作答试卷记录，结构如下表：

作答记录表 exam_record：

start_time 是试卷开始时间

submit_time 是交卷，即结束时间

| Filed       | Type       | Null | Key | Extra          | Default | Comment  |
| ----------- | ---------- | ---- | --- | -------------- | ------- | -------- |
| id          | int(11)    | NO   | PRI | auto_increment | (NULL)  | 自增 ID  |
| uid         | int(11)    | NO   |     |                | (NULL)  | 用户 ID  |
| exam_id     | int(11)    | NO   |     |                | (NULL)  | 试卷 ID  |
| start_time  | datetime   | NO   |     |                | (NULL)  | 开始时间 |
| submit_time | datetime   | YES  |     |                | (NULL)  | 提交时间 |
| score       | tinyint(4) | YES  |     |                | (NULL)  | 得分     |

请删除 exam_record 表中作答时间小于 5 分钟整且分数不及格（及格线为 60 分）的记录；

后台会执行您的 SQL，然后通过 SELECT \* FROM exam_record; 语句来筛选出剩下的数据，与正确数据进行对比。

```sql
DELETE FROM
  exam_record
WHERE
  timestampdiff(MINUTE, start_time, submit_time) < 5
  AND score < 60
```

### 7、**SQL116 删除记录（二）**

现有一张试卷作答记录表 exam_record，其中包含多年来的用户作答试卷记录，结构如下表：

**作答记录表 exam_record：**

start_time 是试卷开始时间

submit_time 是交卷时间，即结束时间，如果未完成的话，则为空

| **Filed**   | **Type**   | **Null** | **Key** | **Extra**      | **Default** | **Comment** |
| ----------- | ---------- | -------- | ------- | -------------- | ----------- | ----------- |
| id          | int(11)    | NO       | PRI     | auto_increment | (NULL)      | 自增 ID     |
| uid         | int(11)    | NO       |         |                | (NULL)      | 用户 ID     |
| exam_id     | int(11)    | NO       |         |                | (NULL)      | 试卷 ID     |
| start_time  | datetime   | NO       |         |                | (NULL)      | 开始时间    |
| submit_time | datetime   | YES      |         |                | (NULL)      | 提交时间    |
| score       | tinyint(4) | YES      |         |                | (NULL)      | 得分        |

请删除 exam_record 表中未完成作答或作答时间小于 5 分钟整的记录中，开始作答时间最早的 3 条记录。

```sql
DELETE FROM
  exam_record
WHERE
  timestampdiff(MINUTE, start_time, submit_time) < 5
  OR score IS NULL
  OR start_time IS NULL
  LIMIT 3
```

### 8、**SQL117 删除记录（三）**

现有一张试卷作答记录表 exam_record，其中包含多年来的用户作答试卷记录，结构如下表：

| **Filed**   | **Type**   | **Null** | **Key** | **Extra**      | **Default** | **Comment** |
| ----------- | ---------- | -------- | ------- | -------------- | ----------- | ----------- |
| id          | int(11)    | NO       | PRI     | auto_increment | (NULL)      | 自增 ID     |
| uid         | int(11)    | NO       |         |                | (NULL)      | 用户 ID     |
| exam_id     | int(11)    | NO       |         |                | (NULL)      | 试卷 ID     |
| start_time  | datetime   | NO       |         |                | (NULL)      | 开始时间    |
| submit_time | datetime   | YES      |         |                | (NULL)      | 提交时间    |
| score       | tinyint(4) | YES      |         |                | (NULL)      | 得分        |

请删除 exam_record 表中所有记录，并重置自增主键。

```sql
TRUNCATE TABLE exam_record
```

### 9、**SQL118 创建一张新表**

现有一张用户信息表，其中包含多年来在平台注册过的用户信息，随着牛客平台的不断壮大，用户量飞速增长，为了高效地为高活跃用户提供服务，现需要将部分用户拆分出一张新表。

原来的用户信息表：

| **Filed**     | **Type**    | **Null** | **Key** | **Default\*\*** \*\* | **Extra**      | **Comment** |
| ------------- | ----------- | -------- | ------- | -------------------- | -------------- | ----------- |
| id            | int(11)     | NO       | PRI     | (NULL)               | auto_increment | 自增 ID     |
| uid           | int(11)     | NO       | UNI     | (NULL)               |                | 用户 ID     |
| nick_name     | varchar(64) | YES      |         | (NULL)               |                | 昵称        |
| achievement   | int(11)     | YES      |         | 0                    |                | 成就值      |
| level         | int(11)     | YES      |         | (NULL)               |                | 用户等级    |
| job           | varchar(32) | YES      |         | (NULL)               |                | 职业方向    |
| register_time | datetime    | YES      |         | CURRENT_TIMESTAMP    |                | 注册时间    |

作为数据分析师，请**创建一张优质用户信息表 user_info_vip**，表结构和用户信息表一致。

你应该返回的输出如下表格所示，请写出建表语句将表格中所有限制和说明记录到表里。

| **Filed**     | **Type**    | **Null** | **Key** | **Default\*\*** \*\* | **Extra**      | **Comment** |
| ------------- | ----------- | -------- | ------- | -------------------- | -------------- | ----------- |
| id            | int(11)     | NO       | PRI     |                      | auto_increment | 自增 ID     |
| uid           | int(11)     | NO       | UNI     |                      |                | 用户 ID     |
| nick_name     | varchar(64) | YES      |         |                      |                | 昵称        |
| achievement   | int(11)     | YES      |         | 0                    |                | 成就值      |
| level         | int(11)     | YES      |         |                      |                | 用户等级    |
| job           | varchar(32) | YES      |         |                      |                | 职业方向    |
| register_time | datetime    | YES      |         | CURRENT_TIMESTAMP    |                | 注册时间    |

备注： 1.后台会通过 SHOW FULL FIELDS FROM user_info_vip 语句，来对比输出结果

2.如果该表已经被其他分析师创建过了，正常返回即可
