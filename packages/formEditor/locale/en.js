export default {
  er: {
    panels: {
      config: 'Form Attribute'
    },
    fields: {
      input: [
        'Input',
        'Email',
        'ID number',
        'Cellphone',
        'URL'
      ],
      textarea: 'Textarea',
      number: 'Number',
      radio: 'Radio',
      checkbox: 'Checkbox',
      select: 'Select',
      time: 'Time',
      date: 'Date',
      rate: 'Rate',
      switch: 'Switch',
      slider: 'Slider',
      html: 'Html',
      cascader: 'Cascader',
      uploadfile: 'File',
      signature: 'Signature',
      region: 'Region',
      grid: 'Grid',
      table: 'Table',
      tabs: 'Tabs',
      collapse: 'Collapse',
      divider: 'Divider',
      container: 'Container',
      field: 'Basic field',
      defaultField: 'Default field',
      subform: 'Sub-form'
    },
    layout: {
      tabsCol: 'Tab panel',
      col: 'Col',
      collapseCol: 'Collapse panel',
      td: 'td'
    },
    config: {
      globalConfig: {
        labelPosition: {
          label: 'Label Position',
          left: 'Left',
          right: 'Right',
          top: 'Top'
        },
        sync: {
          label: 'Synchronize computer and mobile configurations',
          warning: 'Data inconsistency, according to your choice of configuration'
        },
        componentSize: {
          label: 'Size of Fields',
          large: 'Large',
          default: 'Default',
          small: 'Small'
        }
      },
      tabsLayout: {
        style: {
          label: 'Type',
          options: [
            'Default',
            'Tabs',
            'Border-Card'
          ]
        },
        tabPosition: {
          label: 'Tab position',
          options: [
            'Top',
            'Bottom',
            'Left',
            'Right'
          ]
        }
      },
      borderComponent: {
        borderLine: 'Border line',
        borderWidth: 'Border width'
      },
      gridLayout: {
        justify: {
          label: 'Horizontal arrangement',
          options: [
            'Start',
            'End',
            'Center',
            'Space around',
            'Space between'
          ]
        }
      },
      dataComponent1: {
        defaultLabel: 'Default value',
        unique: 'Unique id',
        name: 'Name',
        operate: 'Operate',
        add: 'Add',
        addOther: 'Add other'
      },
      dataComponent2: {
        level: 'Level',
        add: 'Add'
      },
      dataComponent3: {
        panel: 'Panel',
        add: 'Add'
      },
      propsPanel: {
        otherRequired: 'When selecting "Other", supplementary information is required',
        title: 'Title',
        titleWidth: 'Title width',
        id: 'Id',
        defaultContent: 'Default content',
        placeholder: 'Placeholder',
        otherPlaceholder: 'Guide text for supplementary information',
        brushColor: 'Brush color',
        format: 'Format',
        dateType: 'Date type',
        layout: {
          label: 'Layout',
          options: [
            'vertical',
            'horizontal'
          ]
        },
        contentPosition: {
          label: 'Text position',
          options: [
            'Left',
            'Center',
            'Right'
          ]
        },
        textareaHeight: 'Textarea height',
        uploadfile: {
          fileType: 'File type',
          accept: '',
          uploadLimit: 'Upload limit',
          fileSize: 'File size'
        },
        prepend: 'Prepend',
        append: 'Append',
        step: 'Step',
        precision: 'Precision',
        region: {
          label: 'Select range',
          options: [
            'Prov',
            'City/Prov',
            'County/City/Prov'
          ]
        },
        trim: 'Trim',
        wordLimit: 'Word limit',
        dateRange: 'Date range',
        accordion: 'Accordion',
        showPassword: 'Password',
        multiple: 'Multiple',
        filterable: 'Search',
        numberControls: {
          label: 'Control button',
          position: 'Button position',
          options: [
            'Horizontal',
            'Vertical'
          ]
        },
        allowHalf: 'Allow half',
        alpha: 'Alpha',
        anyNode: 'Select any node',
        clearable: 'clearable',
        star: 'Star',
        setDefaultContent: 'Set default content'
      }
    },
    public: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      button: 'Button',
      text: 'Text',
      color: 'Color',
      backgroundColor: 'Background-color',
      width: 'Width',
      radius: 'Radius',
      style: 'Style',
      background: 'Background',
      image: 'Image',
      remove: 'Remove',
      margin: 'Margin',
      padding: 'Padding',
      unit: 'Unit',
      min: 'Min',
      max: 'Max',
      clear: 'Clear',
      dataEntry: 'Data entry',
      data: 'Data',
      disabled: 'disabled',
      back: 'Back',
      save: 'Save',
      reset: 'Reset',
      add: 'Add'
    },
    validateMsg: {
      required: 'Required',
      limitWord: 'At least <%= min %> character',
      email: 'Please enter the valid email address',
      IdNumber: 'Please enter the valid ID number',
      phone: 'Please enter the valid Phone number',
      http: 'Please enter the valid Url',
      fileSize: 'File size cannot exceed <%= size %> MB',
      idUnique: 'ID must be unique',
      placeholder1: 'Please enter',
      placeholder2: 'Please select',
      placeholder3: 'Please enter additional information'
    },
    form: {
      selectDate: 'Select date',
      selectTime: 'Select time',
      notFilled: 'Not filled',
      filled: 'Filled',
      addSignature: 'Add signature',
      useSignature: 'Use signature',
      uploading: 'uploading...',
      uploadFailed: 'Fail to upload'
    },
    selection: {
      insertLeft: 'Insert column left',
      insertRight: 'Insert column right',
      insertTop: 'Insert row before',
      insertBottom: 'Insert row after',
      mergeLeft: 'Merge left',
      mergeRight: 'Merge right',
      mergeRow: 'Merge row',
      mergeTop: 'Merge on',
      mergeBottom: 'Merge down',
      mergeColumn: 'Merge column',
      delRow: 'Delete row',
      delColumn: 'Delete column',
      splitColumn: 'Split column',
      splitRow: 'Split row'
    },
    logic: {
      filter: {
        equal: 'Equal',
        not_equal: 'Not equal',
        contains: 'Contains',
        not_contain: 'Not contain',
        empty: 'Empty',
        not_empty: 'Not empty',
        greater_than: 'Greater than',
        greater_than_equal: 'Greater than or equal to',
        less_than: 'Less than',
        less_than_equal: 'Less than or equal to',
        between: 'Between',
        one_of: 'Equal to one of',
        not_one_of: 'Not equal to one of',
        belong_one_of: 'Belong to one of',
        not_belong_one_of: 'Not belong to one of',
        on: 'On',
        off: 'Off',
        show: 'Show',
        hide: 'Hide',
        field: 'Field',
        required: 'Required',
        not_required: 'Not required',
        readOnly: 'Readonly',
        editable: 'Editable'
      },
      filterLabel: {
        if: 'When the following conditions are met',
        then: 'Then execute'
      },
      tabs: {
        visible: 'Visible',
        required: 'Required',
        readOnly: 'Readonly'
      },
      button: 'Logic Control',
      logicSuggests: 'It is detected that the attributes of the current field have changed, and in order to ensure the accuracy of logic control, the corresponding logic rules have been automatically deleted.'
    }
  }
}
