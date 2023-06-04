<p align="center"><img height="200px" src="https://github.com/Liberty-liu/Liberty-liu/assets/21301475/9922bb46-b7a4-48e8-a087-a93ea48b3e32"></p>
<h1 align="center">Everright-formEditor</h1>

[English](./README.md) | 简体中文

[![vue](https://img.shields.io/badge/vue-%3E%3D%203-green.svg)](https://vuejs.org/)
[![element-plus](https://img.shields.io/badge/element--plus-%3E%3D%202.3.1-green.svg)](https://element-plus.gitee.io/)
[![vant](https://img.shields.io/badge/vant-%3E%3D%204.1.1-green.svg)](https://vant-ui.github.io/)
[![sortablejs](https://img.shields.io/badge/sortablejs-1.14.0-green.svg)](https://github.com/SortableJS/Sortable)
[![jss](https://img.shields.io/badge/jss-%3E%3D%2010.10.0-green.svg)](https://github.com/cssinjs/jss)
[![lodash](https://img.shields.io/badge/lodash--es-%3E%3D%204.17.21-green.svg)](https://lodash.com/custom-builds)
[![nanoid](https://img.shields.io/badge/nanoid-%3E%3D%204.0.1-green.svg)](https://github.com/ai/nanoid)
[![async](https://img.shields.io/badge/async-%3E%3D%203.2.4-green.svg)](https://caolan.github.io/async/)
[![@vuelidate/core](https://img.shields.io/badge/@vuelidate/core-%3E%3D%202.0.0-green.svg)](https://github.com/vuelidate/vuelidate)
[![axios](https://img.shields.io/badge/axios-%3E%3D%201.3.4-green.svg)](https://github.com/axios/axios)
[![signature_pad](https://img.shields.io/badge/signature_pad-%3E%3D%204.1.5-green.svg)](https://github.com/szimek/signature_pad)

**[中文主页](https://everright.site/formEditor/introduction.html)** | **[ENGLISH HOMEPAGE](https://everright.site/en/formEditor/introduction.html)**

Everright-formEditor是一个免费开源的javascript可视化低代码编辑器，通过gui的界面只需简单的操作即可创建出表单，拥有灵活的交互界面，pc端依赖element-plus，mobile依赖vant,内部有一套适配器，适配element和vant的组件

<img width="100%" src="https://user-images.githubusercontent.com/21301475/230697059-baf94040-297e-43fc-acf2-7fa90ecaf3fb.gif">

## 特点

* 1.支持中文和英文
* 2.多终端适配
* 3.丰富的字段和布局容器
* 4.灵活的交互方式
* 5.字段与布局分离
* 6.字段与布局不分离
* 7.编辑器、预览器和配置面板都可以单独使用
* 8.逻辑控制器(显隐、必填、只读)

## 文档

+ [Get Started](https://everright.site/formEditor/started.html)
+ [Docs](https://everright.site/formEditor/doc.html)

## Examples

+ [Editor](https://everright.site/demo/editor.html?layoutType=1&isEdit=1&lang=zh-cn) `layoutType1: 字段与布局不分离`
+ [Editor](https://everright.site/demo/editor.html?layoutType=2&isEdit=1&lang=zh-cn) `layoutType2: 字段与布局分离`
+ [Preview](https://everright.site/demo/preview.html?layoutType=1&lang=zh-cn) `layoutType1: 字段与布局不分离`
+ [Preview](https://everright.site/demo/preview.html?layoutType=2&lang=zh-cn) `layoutType2: 字段与布局分离`
+ [Config panel](https://everright.site/demo/formEditorConfig.html?lang=zh-cn) `用于展示和编辑表单字段的各种属性，包括基础信息、类型、布局等等`

## 截图

![yourDesign](https://github.com/Liberty-liu/Everright-formEditor/assets/21301475/02ff87c2-0418-4587-b55a-9fd2a0d049f1)

### 逻辑控制器

![Logical controlle](https://github.com/Liberty-liu/Everright-formEditor/assets/21301475/0c7ab28d-c57f-47fa-aedc-a48e5939d6af)


## 字段适配

| Field  | Pc | Mobile |
| ------------- | ------------- | ------------- |
| Input  | :white_check_mark:  | :white_check_mark:  |
| Email  | :white_check_mark: | :white_check_mark:  |
| ID  |  :white_check_mark: | :white_check_mark:  |
| Cellphone  | :white_check_mark:  | :white_check_mark:  |
| URL  | :white_check_mark:  | :white_check_mark:  |
| Textarea  | :white_check_mark:  | :white_check_mark:  |
| Number  | :white_check_mark:  | :white_check_mark:  |
| Radio  | :white_check_mark:  | :white_check_mark:  |
| Checkbox  | :white_check_mark:  | :white_check_mark:  |
| Select  | :white_check_mark:  | :white_check_mark:  |
| Time  |  :white_check_mark: | :white_check_mark:  |
| Date  | :white_check_mark:  | :white_check_mark:  |
| Rate  |  :white_check_mark: | :white_check_mark:  |
| Switch  | :white_check_mark:  | :white_check_mark:  |
| Slider  | :white_check_mark: | :white_check_mark:  |
| Html  | :white_check_mark:  | :white_check_mark:  |
| Cascader  | :white_check_mark:  | :white_check_mark:  |
| File  |  :white_check_mark: | :white_check_mark:  |
| Signature  | :white_check_mark: | :white_check_mark:  |
| Region  |  :white_check_mark: | :white_check_mark:  |



## 容器适配

| Field  | Pc | Mobile |
| ------------- | ------------- | ------------- |
| Grid  | :white_check_mark:  | :white_check_mark:  |
| Table  | :white_check_mark: | :x:  |
| Tabs  |  :white_check_mark: | :white_check_mark:  |
| Collapse  | :white_check_mark:  | :white_check_mark:  |
| Divider  | :white_check_mark:  | :white_check_mark:  |


## 逻辑控制器操作符

| Field  | 等于 | 不等于 | 包含 | 不包含 | 大于 | 大于等于 | 小于 | 小于等于 | 区间 | 等于其中之一 | 不等于其中之一 | 属于其中之一 | 不属于其中之一| 为空 | 不为空 |
| :-------------:| :-------------: |:-------------: | :-------------: | :-------------: | :-------------: | :-------------: | :-------------: |:-------------:| :-------------:| :-------------: | :-------------: | :-------------: | :-------------: | :-------------: | :-------------: |
| Input  |  :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| Email |  :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| ID number|  :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| Cellphone  |  :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| URL |  :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| Textarea |  :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| Number  |  :white_check_mark: | :white_check_mark: | | | :white_check_mark:| :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | :white_check_mark:| :white_check_mark: |
| Radio |  :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| Checkbox |  :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| Select |  :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| Time  |  :white_check_mark: | :white_check_mark: | | | :white_check_mark:| :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | :white_check_mark:| :white_check_mark: |
| Date (date) |  :white_check_mark: | :white_check_mark: | | | :white_check_mark:| :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | :white_check_mark:| :white_check_mark: |
| Date (datetime) |  :white_check_mark: | :white_check_mark: | | | :white_check_mark:| :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | :white_check_mark:| :white_check_mark: |
| Date (dates) |  :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| Date (daterange) |  :white_check_mark: | :white_check_mark: |  |  | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| Rate  |  :white_check_mark: | :white_check_mark: | | | :white_check_mark:| :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | :white_check_mark:| :white_check_mark: |
| Switch  |  :white_check_mark:  |  :white_check_mark:  | | | | | | | | | | | | | |
| Slider |  :white_check_mark: | :white_check_mark: | | | :white_check_mark:| :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | |
| Html  |  :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| Cascader  | :white_check_mark: | :white_check_mark:| | | | | | | | | | | | :white_check_mark: | :white_check_mark: |
| File  |  | | | | | | | | | | | | |:white_check_mark: |:white_check_mark: |
| Signature  |  | | | | | | | | | | | | |:white_check_mark: |:white_check_mark: |
| Region  |  | | | | | | | | |:white_check_mark: | :white_check_mark:| :white_check_mark:| :white_check_mark:| :white_check_mark:| :white_check_mark:| 

