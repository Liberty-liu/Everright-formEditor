import { ref, getCurrentInstance, watch } from 'vue'
import _ from 'lodash-es'
import jss from 'jss'
import preset from 'jss-preset-default'
jss.setup({
  ...preset(),
  insertionPoint: document.getElementById('insertion-point')
})
const sheet = jss.createStyleSheet({
  // "button" is a rule name; a class gets generated.
  // button: {
  //   width: 100,
  //   height: 100
  // }
}, {
  classNamePrefix: 'ER-'
}).attach()
const renderTable = (style) => {
  let result = {
    width: style.width
  }
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
  result.background = style.background
  if (style.background && style.background.image) {
    style.background.image = `url(${style.background.image})`
  }
  return result
}
const renderStyleSheets = (node, uid, platform) => {
  let style = {}
  switch (node.type) {
    case 'table':
      style = renderTable(_.cloneDeep(node.style))
      break
    default:
      style = _.cloneDeep(node.style)
      if (_.isObject(node.style.width)) {
        delete style.width
        style.width = node.style.width[platform]
      }
      if (style.background && style.background.image) {
        style.background.image = `url(${style.background.image})`
      }
      // css = `#${id}{${Object.entries(fn(node.style)).map(([k, v]) => `${k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${v}`).join(';')}`
      // stylesheets.insertRule(css)
  }
  return sheet.replaceRule(uid, style).id
}
export const useCss = (node, platform) => {
  const id = ref('')
  // const id = `ER${node.id}`
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
