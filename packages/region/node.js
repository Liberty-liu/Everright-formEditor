import { isFunction } from '@vue/shared'
const uid = 0
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
class Node {
  constructor (data, config, parent, root) {
    const { value: valueKey, label: labelKey, children: childrenKey } = config
    const childrenData = data[childrenKey]
    const pathNodes = calculatePathNodes(this)
    this.level = root ? 0 : parent ? parent.level + 1 : 1
    this.value = data[valueKey]
    this.label = data[labelKey]
    this.pathNodes = pathNodes
    this.pathValues = pathNodes.map((node) => node.value)
    this.pathLabels = pathNodes.map((node) => node.label)
    this.childrenData = childrenData
    this.children = (childrenData || []).map(
      (child) => new Node(child, config, this)
    )
  }

  get isDisabled () {
    const { data, parent, config } = this
    const { disabled, checkStrictly } = config
    const isDisabled = isFunction(disabled)
      ? disabled(data, this)
      : !!data[disabled]
    return isDisabled || (!checkStrictly && parent?.isDisabled)
  }

  get isLeaf () {
    const { data, config, childrenData, loaded } = this
    const { lazy, leaf } = config
    const isLeaf = isFunction(leaf) ? leaf(data, this) : data[leaf]

    return isUndefined(isLeaf)
      ? lazy && !loaded
        ? false
        : !(Array.isArray(childrenData) && childrenData.length)
      : !!isLeaf
  }

  get valueByOption () {
    return this.config.emitPath ? this.pathValues : this.value
  }
}
export default Node
