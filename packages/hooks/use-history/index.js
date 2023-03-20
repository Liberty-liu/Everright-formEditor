import { ref, markRaw, computed, nextTick, watch } from 'vue'
import utils from '@ER/utils'
import _ from 'lodash-es'
export const useHistory = (source) => {
  const onOff = ref(true)
  const createRecord = () => {
    return markRaw({
      snapshot: JSON.stringify(source.store),
      timestamp: Date.now()
    })
  }
  const last = ref(createRecord())
  const undoStack = ref([])
  const redoStack = ref([])
  const canUndo = computed(() => undoStack.value.length > 0)
  const canRedo = computed(() => redoStack.value.length > 0)
  const setSource = (state) => {
    last.value = state
    stop()
    source.store = []
    nextTick(() => {
      source.store = JSON.parse(state.snapshot)
      source.store.forEach((e) => {
        utils.addContext(e, source.store, false, (node) => {
          if (source.sector && source.sector.id === node.id) {
            source.sector = node
          }
        })
      })
      nextTick(() => {
        run()
      })
    })
  }
  const undo = () => {
    const state = undoStack.value.shift()
    if (state) {
      redoStack.value.unshift(last.value)
      setSource(state)
    }
  }
  const redo = () => {
    const state = redoStack.value.shift()
    if (state) {
      undoStack.value.unshift(last.value)
      setSource(state)
    }
  }
  const commit = () => {
    // undoStack.value.unshift(last.value)
    // last.value = createRecord()
    // if (undoStack.value.length > 15) {
    //   undoStack.value.splice(15)
    // }
    // if (redoStack.value.length) {
    //   redoStack.value.splice(0, redoStack.value.length)
    // }
  }
  const fn = _.debounce(commit, 400)
  watch(() => source.store, (newValue) => {
    if (onOff.value) {
      fn()
    }
  }, {
    flush: 'post',
    deep: true
  })
  const stop = () => { onOff.value = false }
  const run = () => { onOff.value = true }
  const restart = () => {
    run()
    last.value = createRecord()
  }
  return {
    canUndo,
    canRedo,
    undo,
    redo,
    undoStack,
    redoStack,
    last,
    stop,
    restart
  }
}
