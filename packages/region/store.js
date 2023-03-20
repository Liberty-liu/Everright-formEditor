import { capitalize, isFunction } from '@vue/shared'
import _ from 'lodash-es'
const isUndefined = (val) => val === undefined
const calculatePathNodes = (node) => {
  const nodes = [node]
  let { parent } = node
  while (parent) {
    nodes.unshift(parent)
    parent = parent.parent
  }

  return nodes
}
const flatNodes = (nodes, leafOnly = false) => {
  return nodes.reduce((res, node) => {
    if (node.isLeaf) {
      res.push(node)
    } else {
      !leafOnly && res.push(node)
      res = res.concat(flatNodes(node.children, leafOnly))
    }
    return res
  }, [])
}
class Node {
  checked = false
  disabled = false
  constructor (data, config, parent, root) {
    const { value: valueKey, label: labelKey, children: childrenKey } = config
    this.data = data
    this.config = config
    const childrenData = data[childrenKey]
    this.parent = parent
    const pathNodes = calculatePathNodes(this)
    this.level = root ? 0 : parent ? parent.level + 1 : 1
    this.value = data[valueKey]
    this.label = data[labelKey]
    this.pathNodes = pathNodes
    this.pathValues = pathNodes.map((node) => node.value)
    this.pathLabels = pathNodes.map((node) => node.label)
    this.childrenData = childrenData || []
    this.children = (childrenData || []).map(
      (child) => new Node(child, config, this)
    )
  }

  calcText (separator) {
    const text = this.pathLabels.join(separator)
    this.text = text
    return this.pathLabels.join(separator)
  }

  get isDisabled () {
    const { data, parent, config } = this
    const { disabled, checkStrictly, multiple } = config
    const isDisabled = !!data[disabled]
    // let result = false
    // if (multiple) {
    //   result = isDisabled || parent && (parent.isDisabled || parent.checked)
    // }
    return isDisabled || parent && (parent.isDisabled || parent.checked)
    // return isDisabled || (parent && parent.isDisabled)
  }

  get isLeaf () {
    const { childrenData } = this
    return !childrenData.length
  }

  broadcast (event, ...args) {
    const handlerName = `onParent${capitalize(event)}`
    this.children.forEach((child) => {
      if (child) {
        // bottom up
        child.broadcast(event, ...args)
        child[handlerName] && child[handlerName](...args)
      }
    })
  }

  emit (event, ...args) {
    const { parent } = this
    const handlerName = `onChild${capitalize(event)}`
    if (parent) {
      parent[handlerName] && parent[handlerName](...args)
      parent.emit(event, ...args)
    }
  }

  onParentCheck (checked) {
    if (!this.isDisabled) {
      this.setCheckState(checked)
    }
  }

  onChildCheck () {
    const { children } = this
    const validChildren = children.filter((child) => !child.isDisabled)
    const checked = validChildren.length
      ? validChildren.every((child) => child.checked)
      : false

    this.setCheckState(checked)
  }

  doCheck (checked) {
    if (this.checked === checked) return

    const { multiple } = this.config

    if (!multiple) {
      this.checked = checked
    } else {
      // this.broadcast('check', checked)
      this.setCheckState(checked)
      if (checked) {
        flatNodes(this.children).filter(e => e.checked).forEach(e => {
          e.doCheck(false)
        })
      }
      // this.emit('check')
    }
  }

  setCheckState (checked) {
    this.checked = checked
  }
}
export default class Store {
  constructor (data, config) {
    const nodes = (data).map((nodeData) => new Node(nodeData, config))
    this.nodes = nodes
    this.allNodes = flatNodes(nodes, false)
    this.leafNodes = flatNodes(nodes, true)
  }

  getNodes () {
    return this.nodes
  }

  getFlattedNodes (leafOnly) {
    return leafOnly ? this.leafNodes : this.allNodes
  }

  getNodeByValue (
    value,
    leafOnly = false
  ) {
    if (!value && value !== 0) return null

    const node = this.getFlattedNodes(leafOnly).find(
      (node) => _.isEqual(node.value, value) || _.isEqual(node.pathValues, value)
    )

    return node || null
  }
}
