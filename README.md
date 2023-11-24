# 功能介绍

1. 框选整个浏览器窗口截图，并支持一系列操作
2. 选择DOM元素截图
   1. 可以选择指定DOM
   2. 可以截长图
3. 可以输出内容到文件、剪切板
4. 支持对视频进行录制
## 键位

`ALT + Z`: start to capture
`Ctrl + Z`: undo
`Ctrl + Shift + Z / Ctrl + Y`: redo
`Ctrl + 1`: 切换选择模式
`Ctrl + 2`: cir
`Ctrl + 0`: back to default

`left click`: select a start point
`right click`: select a end point and close the shape

> 先实现MVP版本
> 该版本只实现tab页面内部截图
# catching

1. 只有None阶段可以触发此阶段
2. SW首先发送phase消息，同时进行截图（异步），然后传递给CS
3. CS创建canvas组件，同时异步接收截图数据并缓存（得有对应的状态转换）
4. 用户选择完区域后，开启Editing
5. 通过canvas合并数据
6. 输出

# 个人期望，希望实现phase的跨进程同步

为什么：希望实现无缝切换，这样在俩个进程中开发不需要考虑数据
阻碍：
- 状态、功能抽象难度大。
- messaging time
  - 个人主观推断，对于对象的传递只是序列化的时间，所以不会存在大的延迟，这里不需要考虑
  - 对于phase state的订阅中不要等待异步任务，应该不会产生大的延迟

如果数据很大，实际上无法实现无缝，而且状态和功能的高度抽象不利于初始阶段的开发。因为很多功能点没有摆上台面，不利于整理（抽象本质）