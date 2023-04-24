<p align="center"><a href="https://everright.site/en/module/formEditor/introduction.html" target="_blank"><img height="200px" src="https://user-images.githubusercontent.com/21301475/229654952-6cc89842-9db7-421d-87be-e7cee1e26199.png"></a></p>
<h1 align="center">Everright-formEditor</h1>

[简体中文](./README.zh-cn.md) | English

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

**[中文官网](https://everright.site/zh-cn/module/formEditor/introduction.html)** | **[ENGLISH HOMEPAGE](https://everright.site/en/module/formEditor/introduction.html)**

Everright-formEditor is a free and open source javascript visual low-code editor. It can create forms with simple operations through the GUI interface. It has a flexible interaction. The PC depends on element-plus while the mobile depends on vant. There is a set of adapters to convert parameters into ones that can be recognized by both element-plus and vant.

<img width="100%" src="https://user-images.githubusercontent.com/21301475/230697059-baf94040-297e-43fc-acf2-7fa90ecaf3fb.gif">

## Features

* 1.Support Chinese and English
* 2.Support Pc and Mobile
* 3.Rich fields and layout containers
* 4.Flexible interaction
* 5.Fields and layout separated
* 6.Fields and layout not separated
* 7.The editor, previewer, and configuration panel can all be used separately

## Docs

+ [Get Started](https://everright.site/en/module/formEditor/started.html)
+ [Docs](https://everright.site/en/module/formEditor/doc.html)

## Examples

+ [Editor](https://everright.site/demo/editor.html?layoutType=1&isEdit=1&lang=en) `layoutType1: Fields and layout not separated`
+ [Editor](https://everright.site/demo/editor.html?layoutType=2&isEdit=1&lang=en) `layoutType2: Fields and layout separated`
+ [Preview](https://everright.site/demo/preview.html?layoutType=1&lang=en) `layoutType1: Fields and layout not separated`
+ [Preview](https://everright.site/demo/preview.html?layoutType=2&lang=en) `layoutType2: Fields and layout separated`
+ [Config panel](https://everright.site/demo/formEditorConfig.html?lang=en) `Various properties for displaying and editing form fields are provided, including basic information, types, layouts, and so on`

## Sample screenshot

### Editor
![image](https://user-images.githubusercontent.com/21301475/231447451-4266854c-88a8-464c-8971-31444f246243.png)

### Previewer on PC
![image](https://user-images.githubusercontent.com/21301475/231448036-3ecee0b8-f6ca-4eb6-b363-059abaaa5cd1.png)

### Previewer on mobile
![IMG_0570](https://user-images.githubusercontent.com/21301475/231448538-c1996918-1ab0-4afa-936e-3cd41db8f5f6.PNG)

### Config panel

![image](https://user-images.githubusercontent.com/21301475/231448710-564533a9-62df-4233-a937-41a50ae24056.png)

## Fields adaptation

| Type  | Pc | Mobile |
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



## Containers adaptation

| Type  | Pc | Mobile |
| ------------- | ------------- | ------------- |
| Grid  | :white_check_mark:  | :white_check_mark:  |
| Table  | :white_check_mark: | :x:  |
| Tabs  |  :white_check_mark: | :white_check_mark:  |
| Collapse  | :white_check_mark:  | :white_check_mark:  |
| Divider  | :white_check_mark:  | :white_check_mark:  |
