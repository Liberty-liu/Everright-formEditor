import _ from 'lodash-es'
import utils from '@ER/utils'
let prevEl = ''
let prevSortable = ''
let inserRowIndex = ''
// let prevRows = ''
let inserColIndex = ''
function getWindowScrollingElement () {
  const scrollingElement = document.scrollingElement

  if (scrollingElement) {
    return scrollingElement
  } else {
    return document.documentElement
  }
}
function getParentAutoScrollElement (el, includeSelf) {
  // skip to window
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement()

  let elem = el
  let gotSelf = false
  do {
    // we don't need to get elem css if it isn't even overflowing in the first place (performance)
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      const elemCSS = css(elem)
      if (
        elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX === 'auto' || elemCSS.overflowX === 'scroll') ||
        elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY === 'auto' || elemCSS.overflowY === 'scroll')
      ) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement()

        if (gotSelf || includeSelf) return elem
        gotSelf = true
      }
    }
    /* jshint boss:true */
    // eslint-disable-next-line
  } while (elem = elem.parentNode)

  return getWindowScrollingElement()
}
const getOffset = (el, key) => {
  let offset = 0
  let parent = el

  while (parent) {
    offset += parent[key]
    parent = parent.offsetParent
  }

  return offset
}
function matches (/** HTMLElement */el, /** String */selector) {
  if (!selector) return

  selector[0] === '>' && (selector = selector.substring(1))

  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector)
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector)
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector)
      }
    } catch (_) {
      return false
    }
  }

  return false
}
function css (el, prop, val) {
  const style = el && el.style

  if (style) {
    // eslint-disable-next-line
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '')
      } else if (el.currentStyle) {
        val = el.currentStyle
      }
      // eslint-disable-next-line
      return prop === void 0 ? val : val[prop]
    } else {
      if (!(prop in style) && prop.indexOf('webkit') === -1) {
        prop = '-webkit-' + prop
      }

      style[prop] = val + (typeof val === 'string' ? '' : 'px')
    }
  }
}
function lastChild (el, selector) {
  let last = el.lastElementChild
  // eslint-disable-next-line
  while (last && (css(last, 'display') === 'none' || selector && !matches(last, selector))) {
    last = last.previousElementSibling
  }

  return last || null
}
const getDirection = (target, originalEvent) => {
  let direction = ''
  const X = getOffset(target, 'offsetLeft')
  const Y = getOffset(target, 'offsetTop')
  const scrollEl = getParentAutoScrollElement(target, true)
  const clientX = originalEvent.clientX
  const clientY = originalEvent.clientY + scrollEl.scrollTop
  const w = target.offsetWidth
  const h = target.offsetHeight
  const x1 = X
  const y1 = -Y
  const x2 = x1 + w
  const y2 = y1 - h
  const x0 = (x1 + x2) / 2
  const y0 = (y1 + y2) / 2
  const k = (y2 - y1) / (x2 - x1)
  const x = clientX
  const y = -clientY
  const K = (y - y0) / (x - x0)
  if (k < K && K < -k) {
    if (x > x0) {
      direction = 2
    } else {
      direction = 4
    }
  } else {
    if (y > y0) {
      direction = 1
    } else {
      direction = 3
    }
  }
  return direction
}
const clearBorder = (el) => {
  const classNames = ['top', 'bottom', 'left', 'right']
  classNames.forEach(e => {
    el.classList.remove(`drag-line-${e}`)
  })
}
const setBorder = (el, className) => {
  clearBorder(el)
  el.classList.add(className)
}
const getDragElement = (node) => {
  return node.__draggable_context.element
}

const setStates = (type, newTarget, ev) => {
  const {
    activeSortable: {
      constructor: {
        utils
      },
      options: {
        dataSource
      },
      el: {
        __draggable_component__: {
          list
        }
      }
    },
    activeSortable,
    target,
    originalEvent,
    dragEl,
    sortable: {
      el,
      el: {
        __draggable_component__: {
          list: targetList
        }
      }
    },
    sortable
  } = ev
  const targetContainer = el.parentNode
  const direction = getDirection(newTarget, originalEvent)
  const cols = newTarget.parentNode.children
  const colIndex = utils.index(newTarget)
  // console.log(!el.contains(dragEl))
  // console.log(utils)
  if (/^(2|4)$/.test(direction)) {
    if (targetList.length === 4 && !el.contains(dragEl)) {
      // console.log(123123)
      return false
    }
  }
  switch (direction) {
    case 1:
      // console.log(sortable.options.parent)
      prevSortable = sortable
      prevEl = targetContainer
      inserRowIndex = utils.index(prevEl)
      setBorder(prevEl, 'drag-line-top')
      break
    case 2:
      if (cols[utils.index(target) + 1] !== dragEl) {
        if (colIndex === targetList.length - 1) {
          prevEl = newTarget
          prevSortable = sortable
          inserColIndex = utils.index(prevEl) + 1
          setBorder(prevEl, 'drag-line-right')
        } else {
          prevSortable = sortable
          prevEl = cols[colIndex + 1]
          inserColIndex = utils.index(prevEl)
          setBorder(prevEl, 'drag-line-left')
        }
      }
      break
    case 3:
      const rows = targetContainer.parentNode.children
      const rowIndex = utils.index(targetContainer)
      const el = ''
      prevSortable = sortable
      if (rowIndex === rows.length - 1) {
        prevEl = targetContainer
        setBorder(prevEl, 'drag-line-bottom')
      } else {
        prevEl = rows[rowIndex + 1]
        setBorder(prevEl, 'drag-line-top')
      }
      inserRowIndex = utils.index(targetContainer) + 1
      break
    case 4:
      if (cols[utils.index(target) - 1] !== dragEl) {
        prevEl = newTarget
        prevSortable = sortable
        inserColIndex = utils.index(prevEl)
        setBorder(prevEl, 'drag-line-left')
      }
      break
  }
}
const getNodes = (node) => {
  const nodes = node.columns || node.list || node.rows || []
  return Array.isArray(node) ? node : nodes
}
const resetStates = () => {
  if (prevEl) {
    clearBorder(prevEl)
  }
  prevEl = prevSortable = inserColIndex = inserRowIndex = ''
}
function ControlInsertionPlugin (ER) {
  function ControlInsertion (sortable) {
  }
  ControlInsertion.prototype = {
    drop (e) {
      if (!prevEl || !e.activeSortable) {
        return false
      }
      const isBlock = _.get(e, 'activeSortable.options.dataSource', false) === 'block'
      const {
        dragEl,
        target
      } = e
      const oldEl = getDragElement(dragEl)
      const newElement = ER.wrapElement(_.cloneDeep(oldEl), inserRowIndex !== '', true, isBlock)
      if (inserRowIndex !== '') {
        const store = getNodes(prevSortable.options.parent)
        store.splice(inserRowIndex, 0, newElement)
        utils.addContext(store[inserRowIndex], prevSortable.options.parent)
      }
      if (inserColIndex !== '') {
        const {
          el: {
            __draggable_component__: {
              list
            }
          },
          el,
          constructor: {
            utils: sortableUtils
          }
        } = prevSortable
        list.splice(inserColIndex, 0, newElement)
        utils.addContext(list[inserColIndex], ER.state.store[sortableUtils.index(prevSortable.el.parentNode)])
      }
      resetStates()
      if (!isBlock) {
        oldEl.context && oldEl.context.delete()
      }
    },
    dragOver (e) {
      // e.originalEvent && e.originalEvent.stopPropagation()
      e.cancel()
      resetStates()
      const {
        activeSortable: {
          constructor: {
            utils
          },
          options: {
            dataSource
          },
          el: {
            __draggable_component__: {
              list
            }
          }
        },
        activeSortable,
        target,
        originalEvent,
        dragEl,
        sortable: {
          el,
          el: {
            __draggable_component__: {
              list: targetList
            }
          }
        },
        sortable
      } = e
      if (sortable.options.dataSource === 'block') {
        return false
      }
      if (target.dataset.layoutType === 'grid') {
        return false
      }
      originalEvent.stopPropagation && originalEvent.stopPropagation()
      const direction = ''
      const targetContainer = el.parentNode
      const targetOnlyOne = targetList.length === 1
      let newTarget = utils.closest(target, this.options.draggable, sortable.el)
      if (/^(grid-col|tabs-col|td|collapse-col|root|inline)$/.test(target.dataset.layoutType)) {
        newTarget = target
        const state = (newTarget.__draggable_component__ || newTarget.children[0].__draggable_component__)
        const {
          list
        } = state
        if (!list.length) {
          prevEl = target.dataset.layoutType === 'root' ? target : newTarget.__draggable_component__ ? newTarget.children[0] : newTarget.parentNode
          prevSortable = state._sortable
          inserRowIndex = 0
          setBorder(prevEl, 'drag-line-top')
        } else {
          if (target.dataset.layoutType === 'root') {
            const rows = el.children
            prevEl = lastChild(el)
            setBorder(prevEl, 'drag-line-bottom')
            inserRowIndex = rows.length
            prevSortable = state._sortable
          }
          if (target.dataset.layoutType === 'inline') {
            const cols = el.children
            prevEl = lastChild(el)
            inserColIndex = cols.length
            prevSortable = state._sortable
            setBorder(prevEl, 'drag-line-right')
          }
        }
      } else {
        setStates(1, newTarget, e)
      }
    }
  }
  return Object.assign(ControlInsertion, {
    pluginName: 'ControlInsertion',
    initializeByDefault: true
  })
}
export default ControlInsertionPlugin
