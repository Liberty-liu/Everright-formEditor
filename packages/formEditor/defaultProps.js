import { fieldsConfig, globalConfig } from './componentsConfig'
export default {
  fieldsConfig: {
    type: Array,
    default: () => fieldsConfig
  },
  globalConfig: {
    type: Object,
    default: () => globalConfig
  },
  lang: {
    type: String,
    default: 'zh-cn'
  },
  layoutType: {
    type: Number,
    default: 1
  },
  fileUploadURI: {
    type: String
  },
  configPanelWidth: {
    type: String,
    default: '320px'
  },
  isShowCompleteButton: {
    type: Boolean,
    default: true
  },
  checkPropsBySelected: {
    type: Function,
    default: () => {}
  },
  quickImages: {
    type: Array,
    default: () => []
  },
  quickImageLimit: {
    type: Number,
    default: 5
  },
  quickColors: {
    type: Array,
    default: () => [
      'rgba(255, 255, 255, 1)',
      'rgba(249, 249, 249, 1)',
      'rgba(233, 233, 233, 1)',
      'rgba(254, 249, 210, 1)',
      'rgba(253, 246, 236, 1)',
      'rgba(254, 241, 241, 1)',
      'rgba(236, 246, 255, 1)',
      'rgba(235, 242, 244, 1)',
      'rgba(240, 249, 236, 1)'
    ]
  }
}
