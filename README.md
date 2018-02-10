# 逛丢网第三方APP

## 项目简介
> 逛丢网是一家汇集各大电商站优惠商品信息的资讯站.
> 因为该站架构较为简单,数据文档全面,接口也十分稳定,
> 所以才使用React Native技术开发了该项目.
> 该项目为个人学习 react-native 的 Demo, 欢迎技术交流。

## 项目演示

[APP架构图](https://www.processon.com/mindmap/5a7e93dee4b0615ac0550a57)

## TodoList
### 第一阶段
- [x]  1.启动页
    - [x]  使用react-navigation中(TabNavigation+StackNavigator)实现页面导航功能
    - [x]  将页面navigation路由配置整理成单独的模块.
    - [x]  封装fetch为公共方法,将其追加为global的属性,方便调用    
    - [x]  根据接口文档将各接口地址整合到配置文件中.
    - [x]  将配置文件,封装的fetch类,常用Helper类等整合到自定义package中,便于各页面引用.
    - [x]  将Main.js作为项目入口文件,在其中引用需要优先初始化的fetch类等组件.
    - [x]  
    - [x]
- [x]  2.首页
    - [x]  重写Header组件,并将该Header封装为公共组件,在首页和海淘页共用
    - [x]  点击header左侧图标,实现跳转到30分钟最热排行页面.
    - [x]  点击header中间部分图标,使用Modal将商品分类模块展示
    - [x]  点击header右侧部分图标,跳转到商品搜索页.
    - [x]  支持按照优惠网站,商品分类来进行商品数据筛选.
    - [x]  将商品分类模块提取为公共模块,首页和海淘页共用.
    - [x]  使用FlatList进行优惠信息展示.
    - [x]  将数据项提取为公共组件,在首页,海淘页,搜索页等页面公用.
    - [x]  支持下拉刷新和上滑加载功能.
    - [x]  将优惠详情页提取为公共组件,各页面共用.
    - [x]  将FlatList为空时的效果提取为公共组件,各列表项共用.
    - [ ]  
- [x]  3.海淘页
    - [x]  和首页公用header组件,支持跳转到30分钟最热排行和搜索页.
    - [x]  支持按照商品类别和来源网站筛选.共用Item数据项
    - [x]  支持下拉刷新和上滑加载功能.
    - [x]  
- [x]  4.半小时热门商品排行页
    - [x]  根据传入props的不同分别展示国内/海淘优惠排行
    - [x]  使用FlatList进行排行,共用Item数据项
    - [x]  使用WebView来链接官网展示优惠详情.
    - [x]  
- [x]  5.小时排行榜
    - [x]  将时间切换组件提取为公共组件. 
    - [x]  用户可以自由切换想要查看的时间段.
    - [x]  使用FlatList进行排行,共用Item数据项
    - [x]  支持下拉刷新和上滑加载功能.
    - [x]  
- [x]  6.搜索页
    - [x]  将用户查询的结果使用FlatList进行展示.
    - [x]  支持下拉刷新和上滑加载功能.
    - [x]  数据为空时提醒用户查询结果为空.
    - [x]  



### 第二阶段(开发中)
- [ ]  在APP中加入九块九专区模块
- [ ]  使用Redux替换State进行状态管理
- [ ]  将asyncStorage替换为realm
- [ ]  使用react-element-ui框架库来规范项目中各组件.
- [ ]  


## 使用的第三方组件
* [react-navigation](https://github.com/react-navigation/react-navigation)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [prop-types](https://github.com/facebook/prop-types)
* [query-string](https://github.com/sindresorhus/query-string)
* []()()

## 运行方法

```bash
# git clone
git clone 

# use yarn or npm install the package
yarn install

# start the package server
react-native run-android

```



