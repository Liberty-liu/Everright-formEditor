export default {
  er: {
    panels: {
      config: '表单属性'
    },
    fields: {
      input: [
        '单行文本',
        '邮箱',
        '身份证号',
        '手机号',
        '网址'
      ],
      textarea: '多行文本',
      number: '数字',
      radio: '单选框',
      checkbox: '复选框',
      select: '下拉框',
      time: '时间',
      date: '日期',
      rate: '评分',
      switch: '开关',
      slider: '滑块',
      html: '富文本',
      cascader: '级联框',
      uploadfile: '上传文件',
      signature: '签名',
      region: '省市区',
      grid: '栅格布局',
      table: '表格布局',
      tabs: '标签页',
      collapse: '折叠面板',
      divider: '分割线'
    },
    blocks: {
      container: '容器',
      field: '基础字段',
      defaultField: '预设字段'
    },
    layout: {
      tabsCol: '标签面板',
      col: '栅格列',
      collapseCol: '折叠子面板',
      td: '单元格'
    },
    config: {
      globalConfig: {
        labelPosition: {
          label: '标签对齐方式',
          left: '左对齐',
          right: '右对齐',
          top: '顶部对齐'
        },
        sync: {
          label: '同步设置电脑和移动端',
          warning: '数据存在不一致，根据你的选择进行同步'
        },
        componentSize: {
          label: '字段大小',
          large: '大',
          default: '中',
          small: '小'
        }
      },
      tabsLayout: {
        style: {
          label: '风格类型',
          options: [
            '默认',
            '选项卡',
            '卡片化'
          ]
        },
        tabPosition: {
          label: '选项卡位置',
          options: [
            '顶部',
            '底部',
            '左侧',
            '右侧'
          ]
        }
      },
      borderComponent: {
        borderLine: '边框线',
        borderWidth: '边框宽度'
      },
      gridLayout: {
        justify: {
          label: '水平排列方式',
          options: [
            '左对齐',
            '右对齐',
            '居中',
            '两侧间隔相等',
            '两端对齐'
          ]
        }
      },
      dataComponent1: {
        defaultLabel: '默认',
        unique: '选项唯一标识',
        name: '选项名称',
        operate: '操作',
        add: '添加选项'
      },
      dataComponent2: {
        level: '级选项',
        add: '添加选项'
      },
      dataComponent3: {
        panel: '面板',
        add: '添加面板'
      },
      propsPanel: {
        title: '标题',
        titleWidth: '宽度',
        id: '字段标识',
        defaultContent: '默认内容',
        placeholder: '提示文字',
        brushColor: '画笔颜色',
        format: '显示格式',
        dateType: '日期类型',
        layout: {
          label: '布局方式',
          options: [
            '纵向',
            '横向'
          ]
        },
        contentPosition: {
          label: '文案位置',
          options: [
            '左侧',
            '居中',
            '右侧'
          ]
        },
        textareaHeight: '文本域高度',
        uploadfile: {
          fileType: '文件类型',
          accept: '',
          uploadLimit: '上传个数限制',
          fileSize: '文件大小'
        },
        prepend: '前缀',
        append: '后缀',
        step: '步长',
        precision: '精度',
        region: {
          label: '选择范围',
          options: [
            '省',
            '省/市',
            '省/市/县'
          ]
        },
        trim: '去除首尾空格',
        wordLimit: '限定字符',
        dateRange: '限定日期范围',
        accordion: '手风琴',
        showPassword: '作为密码',
        multiple: '多选',
        filterable: '搜索',
        numberControls: {
          label: '控制按钮',
          position: '按钮位置',
          options: [
            '左右',
            '上下'
          ]
        },
        allowHalf: '半选',
        alpha: '透明度',
        anyNode: '选择任意节点',
        clearable: '一键清除按钮',
        star: '星星数'
      }
    },
    public: {
      confirm: '确定',
      cancel: '取消',
      button: '按钮',
      text: '文字',
      color: '颜色',
      backgroundColor: '背景颜色',
      width: '宽度',
      radius: '圆角',
      style: '风格',
      background: '背景',
      image: '图片',
      remove: '移除',
      margin: '外边距',
      padding: '内边距',
      unit: '单位',
      min: '最小',
      max: '最大',
      clear: '清空',
      dataEntry: '录入数据',
      data: '数据',
      disabled: '禁用',
      back: '返回',
      save: '保存',
      reset: '重置'
    },
    validateMsg: {
      required: '必填',
      limitWord: `最少<%= min %>字符`,
      email: '请输入正确的邮箱地址',
      IdNumber: '请输入正确的身份证号',
      phone: '请输入正确的手机号',
      http: '请输入正确的网址',
      fileSize: '文件大小不能超过 <%= size %> MB',
      idUnique: '字段标识重复',
      placeholder1: '请输入',
      placeholder2: '请选择'
    },
    form: {
      selectDate: '选择日期',
      selectTime: '选择时间',
      notFilled: '未填写',
      filled: '已填写',
      addSignature: '添加签名',
      useSignature: '使用签名',
      uploading: '上传中...',
      uploadFailed: '上传失败'
    },
    sector: {
      insertLeft: '左插入列',
      insertRight: '右插入列',
      insertTop: '上插入行',
      insertBottom: '下插入行',
      mergeLeft: '向左合并',
      mergeRight: '向右合并',
      mergeRow: '合并整行',
      mergeTop: '向上合并',
      mergeBottom: '向下合并',
      mergeColumn: '合并整列',
      delRow: '删除整行',
      delColumn: '删除整列',
      splitColumn: '拆分成列',
      splitRow: '拆分成行'
    }
  }
}
