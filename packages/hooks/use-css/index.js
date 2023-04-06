import { ref, getCurrentInstance, watch } from 'vue'
import _ from 'lodash-es'
import jss from 'jss'
import preset from 'jss-preset-default'
jss.setup({
  ...preset(),
  insertionPoint: document.getElementById('Everright-formEditor-point')
})
const sheet = jss.createStyleSheet({
}, {
  classNamePrefix: 'ER-'
}).attach()
const isShowKeys = [
  'padding',
  'margin',
  'border',
  'background'
]
const renderTableBorder = (style) => {
  let result = {}
  const value = {
    width: style.borderWidth,
    style: 'solid',
    color: style.borderColor
  }
  switch (style.borderType) {
    case 0:
      break
    case 1:
      result = {
        '&>table': {
          border: value,
          '& td': {
            border: value
          }
        }
      }
      break
    case 2:
      result = {
        '&>table': {
          border: value,
          '& td': {
            border: {
              style: 'none'
            }
          }
        }
      }
      break
    case 3:
      result = {
        '&>table': {
          border: {
            style: 'none'
          },
          '& td:not(`:last-child`)': {
            borderRight: value
          },
          '& tr:not(:last-child)': {
            '& td': {
              borderBottom: value
            }
          }
        }
      }
      break
    case 4:
      result = {
        '&>table': {
          border: {
            style: 'none'
          },
          borderLeft: value,
          '& td': {
            border: {
              style: 'none'
            }
          }
        }
      }
      break
    case 5:
      result = {
        '&>table': {
          border: {
            style: 'none'
          },
          borderRight: value,
          '& td': {
            border: {
              style: 'none'
            }
          }
        }
      }
      break
    case 6:
      result = {
        '&>table': {
          border: {
            style: 'none'
          },
          borderTop: value,
          '& td': {
            border: {
              style: 'none'
            }
          }
        }
      }
      break
    case 7:
      result = {
        '&>table': {
          border: {
            style: 'none'
          },
          borderBottom: value,
          '& td': {
            border: {
              style: 'none'
            }
          }
        }
      }
      break
  }
  return result
}
const renderStyleSheets = (node, uid, platform) => {
  const style = _.cloneDeep(node.style)
  isShowKeys.forEach((key) => {
    if (key === 'border' && node.type === 'table') {
      if (style[`isShow${_.upperFirst(key)}`]) {
        Object.assign(style, renderTableBorder(node.style))
      }
    } else {
      if (!(style[`isShow${_.upperFirst(key)}`])) {
        delete style[key]
        if (key === 'border') {
          delete style.borderRadius
        }
        delete style[`isShow${_.upperFirst(key)}`]
      }
    }
  })
  if (_.isObject(node.style.width)) {
    delete style.width
    style.width = node.style.width[platform]
  }
  if (style.background && style.background.image) {
    style.background.image = `url(${style.background.image})`
  }
  return sheet.addRule(uid.toString(), style).id
}
export const useCss = (node, platform) => {
  const id = ref('')
  const {
    uid
  } = getCurrentInstance()
  if (node.style) {
    watch(node.style, (newValue) => {
      if (!_.isEmpty(newValue)) {
        id.value = renderStyleSheets(node, uid, platform)
      }
    }, {
      immediate: true
    })
  }
  return id
}
