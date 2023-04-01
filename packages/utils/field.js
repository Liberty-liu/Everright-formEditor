import _ from 'lodash-es'
import { nanoid } from './nanoid'
const fieldsRe = /^(input|textarea|number|radio|checkbox|select|time|date|rate|switch|slider|html|cascader|uploadfile|signature|region)$/
const deepTraversal = (node, fn) => {
  fn(node)
  const nodes = node.list || node.rows || node.columns || node.children || []
  nodes.forEach(e => {
    deepTraversal(e, fn)
  })
}
const wrapElement = (element, fn) => {
  const result = element
  deepTraversal(result, (node) => {
    if (!node.style) {
      node.style = {}
    }
    if (!node.id) {
      node.id = nanoid()
    }
    if (!node.key) {
      node.key = `${node.type}_${node.id}`
    }
    if (/^(grid|tabs|collapse|table|divider)$/.test(node.type)) {
      node.style = {
        width: '100%'
      }
    }
    if (checkIsField(node)) {
      node.style = {
        width: {
          pc: '100%',
          mobile: '100%'
        }
      }
    }
    if (/^(tabs)$/.test(node.type)) {
      node.columns = new Array(3).fill('').map((e, index) => {
        const data = renderFieldData('tabsCol')
        data.label = `Tab ${index + 1}`
        data.options = {}
        return data
      })
    }
    if (/^(collapse)$/.test(node.type)) {
      node.columns = new Array(3).fill('').map((e, index) => {
        const data = renderFieldData('collapseCol')
        data.label = `Tab ${index + 1}`
        data.options = {}
        return data
      })
    }
    fn && fn(node)
  })
  return result
}
const renderFieldData = (type) => {
  const result = {
    id: nanoid(),
    type,
    label: '',
    list: [],
    style: {}
  }
  return result
}
const excludes = ['grid', 'col', 'table', 'tr', 'td', 'tabs', 'tabsCol', 'collapse', 'collapseCol', 'divider', 'inline']
const flatNodes = (nodes, excludes, fn, excludesFn) => {
  return nodes.reduce((res, node, currentIndex) => {
    if (excludes.indexOf(node.type) === -1) {
      res.push(node)
      fn && fn(nodes, node, currentIndex)
    } else {
      excludesFn && excludesFn(nodes, node, currentIndex)
    }
    const children = node.list || node.rows || node.columns || node.children || []
    res = res.concat(flatNodes(children, excludes, fn, excludesFn))
    return res
  }, [])
}
const getAllFields = (store) => flatNodes(store, excludes)
const pickfields = (list) => {
  return flatNodes(list, excludes)
}
const disassemblyData1 = (data) => {
  const result = {
    list: data.list,
    config: data.config,
    fields: flatNodes(data.list, excludes, (nodes, node, currentIndex) => {
      nodes[currentIndex] = node.id
    }),
    data: data.data
  }
  return result
}
const combinationData1 = (data) => {
  const result = {
    list: data.list,
    config: data.config,
    data: data.data,
    fields: data.fields
  }
  flatNodes(data.list, excludes, (nodes, node, currentIndex) => {
    const cur = _.find(data.fields, { id: node })
    if (!_.isEmpty(cur)) {
      nodes[currentIndex] = cur
    }
  })
  return result
}
const combinationData2 = (list, fields) => {
  flatNodes(list, excludes, (nodes, node, currentIndex) => {
    const cur = _.find(fields, { id: node })
    if (!_.isEmpty(cur)) {
      nodes[currentIndex] = cur
    }
  })
}
const repairLayout = (layout, fields) => {
  flatNodes(layout, excludes, (nodes, node, currentIndex) => {
    if (_.isString(node)) {
      if (!_.isEmpty(_.find(fields, { id: node }))) {
        nodes.splice(currentIndex, 1)
      }
    }
  })
  const temporary = []
  flatNodes(layout, excludes, null, (nodes, node, currentIndex) => {
    if (node.type === 'inline') {
      if (!node.columns.length) {
        temporary.unshift({
          nodes,
          currentIndex
        })
      }
    }
  })
  temporary.forEach(e => {
    e.nodes.splice(e.currentIndex, 1)
  })
}
const disassemblyData2 = (list) => {
  flatNodes(list, excludes, (nodes, node, currentIndex) => {
    nodes[currentIndex] = node.id && node.id
  })
}
const checkIslineChildren = (node) => node.context.parent.type === 'inline'
const checkIsField = (node) => fieldsRe.test(node.type)
const calculateAverage = (count, total = 100) => {
  const base = Number((total / count).toFixed(2))
  const result = []
  for (let i = 0; i < count; i++) {
    // result.push(base + (i < rest ? 1 : 0))
    result.push(base)
  }
  return result
}
const syncWidthByPlatform = (node, platform, syncFullplatform = false, value) => {
  // debugger
  const isArray = _.isArray(node)
  if (!isArray) {
    if (_.isObject(node.style.width)) {
      if (syncFullplatform) {
        node.style.width.pc = node.style.width.mobile = value + '%'
      } else {
        node.style.width[platform] = value + '%'
      }
    } else {
      node.style.width = value + '%'
    }
  }
  const otherNodes = isArray ? node : node.context.parent.columns.filter(e => e !== node)
  const averageWidths = calculateAverage(otherNodes.length, isArray ? 100 : 100 - value)
  otherNodes.forEach((node, index) => {
    const isFieldWidth = _.isObject(node.style.width)
    if (isFieldWidth) {
      if (syncFullplatform) {
        node.style.width.pc = node.style.width.mobile = averageWidths[index] + '%'
      } else {
        node.style.width[platform] = averageWidths[index] + '%'
      }
    } else {
      node.style.width = averageWidths[index] + '%'
    }
  })
}
const transferLabelPath = (node) => `er.fields.${node.type === 'input' ? `${node.type}.${node.options.renderType - 1}` : `${node.type}`}`
const fieldLabel = (t, node) => t(transferLabelPath(node))
const transferData = (lang, path, locale, options = {}) => {
  let result = ''
  if (_.isEmpty(options)) {
    result = _.get(locale[lang], path, '')
  } else {
    result = _.template(_.get(locale[lang], path, ''))(options)
  }
  return result
}
const isNull = (e) => e === '' || e === null || e === undefined
export {
  syncWidthByPlatform,
  wrapElement,
  deepTraversal,
  renderFieldData,
  getAllFields,
  disassemblyData1,
  combinationData1,
  disassemblyData2,
  combinationData2,
  checkIslineChildren,
  checkIsField,
  pickfields,
  fieldLabel,
  transferData,
  transferLabelPath,
  isNull,
  repairLayout
}
