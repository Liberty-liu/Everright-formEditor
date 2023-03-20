/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global window, console */
import { ElMessage } from 'element-plus'
import CKEDITOR from '/external/ckeditor5/build/ckeditor.js'
import { h, markRaw, defineComponent, onMounted, defineEmits, ref, onBeforeUnmount, watch } from 'vue'
import { debounce } from 'lodash-es'
import './style/index.js'
import hooks from '@ER/hooks'
const SAMPLE_READ_ONLY_LOCK_ID = 'Integration Sample'
const INPUT_EVENT_DEBOUNCE_WAIT = 300
const ns = hooks.useNamespace('Main', 'ckeditor')

class MyUploadAdapter {
  constructor (editor, loader) {
    this.loader = loader
    this.editor = editor
  }

  upload () {
    const editor = this.editor
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        // console.log(editor)
        const {
          action,
          maxSize
        } = editor.config.get('ER.params')
        if (file.size > maxSize) {
          ElMessage({
            message: `文件大小不能超过 ${maxSize / 1024 / 1024} MB`,
            type: 'warning'
          })
          reject()
        } else {
          this._initRequest(action)
          this._initListeners(resolve, reject, file)
          this._sendRequest(file)
        }
      }))
  }

  abort () {
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  _initRequest (action) {
    const xhr = this.xhr = new XMLHttpRequest()
    xhr.open('POST', action, true)
    xhr.responseType = 'json'
  }

  _initListeners (resolve, reject, file) {
    const xhr = this.xhr
    const loader = this.loader
    const genericErrorText = `Couldn't upload file: ${file.name}.`
    xhr.addEventListener('error', () => reject(genericErrorText))
    xhr.addEventListener('abort', () => reject())
    xhr.addEventListener('load', () => {
      const response = xhr.response
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText)
      }
      resolve({
        default: response.data[0].url
      })
    })
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total
          loader.uploaded = evt.loaded
        }
      })
    }
  }

  _sendRequest (file) {
    // Prepare the form data.
    const data = new FormData()

    data.append('file', file)
    this.xhr.send(data)
  }
}
function MyCustomUploadAdapterPlugin (editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(editor, loader)
  }
}
export default defineComponent({
  name: 'ckeditor',
  inheritAttrs: false,
  customOptions: {},
  props: {
    platform: {
      type: String,
      default: 'pc'
    },
    modelValue: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      required: true
    },
    maxSize: {
      type: [Number, String],
      required: true
    }
  },
  setup (props, { emit }) {
    const { CKEDITOR_VERSION } = window
    if (CKEDITOR_VERSION) {
      const [major] = CKEDITOR_VERSION.split('.').map(Number)

      if (major < 34) {
        console.warn('The <CKEditor> component requires using CKEditor 5 in version 34 or higher.')
      }
    } else {
      console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.')
    }
    let instance = null
    let lastEditorData = {
      type: String,
      default: ''
    }
    const element = ref('')
    const toolbar = ref('')
    const container = ref('')
    const setUpEditorEvents = () => {
      const editor = instance
      const emitDebouncedInputEvent = debounce(evt => {
        const data = lastEditorData = editor.getData()
        emit('update:modelValue', data, evt, editor)
        emit('input', data, evt, editor)
      }, INPUT_EVENT_DEBOUNCE_WAIT, { leading: true })
      editor.model.document.on('change:data', emitDebouncedInputEvent)
      editor.editing.view.document.on('focus', evt => {
        emit('focus', evt, editor)
      })
      editor.editing.view.document.on('blur', evt => {
        emit('blur', evt, editor)
      })
    }
    watch(() => props.modelValue, (value) => {
      if (instance && value !== lastEditorData) {
        instance.setData(value)
      }
    })
    watch(() => props.disabled, (readOnlyMode) => {
      if (readOnlyMode) {
        instance.enableReadOnlyMode(SAMPLE_READ_ONLY_LOCK_ID)
      } else {
        instance.disableReadOnlyMode(SAMPLE_READ_ONLY_LOCK_ID)
      }
    })
    watch(() => props.config.placeholder, (newVal) => {
      if (instance) {
        instance.sourceElement.querySelector('.ck-placeholder').dataset.placeholder = newVal
      }
    })
    onBeforeUnmount(() => {
      if (instance) {
        instance.destroy()
        instance = null
      }
      emit('destroy', instance)
    })
    onMounted(() => {
      const editorConfig = Object.assign({
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true
          }
        },
        ER: {
          params: {
            action: props.action,
            maxSize: props.maxSize
          }
        },
        extraPlugins: [MyCustomUploadAdapterPlugin]
      }, props.config)
      if (props.modelValue) {
        editorConfig.initialData = props.modelValue
      }
      if (props.platform === 'mobile') {
        // console.log(CKEDITOR)
        editorConfig.extraPlugins.push(CKEDITOR.plugins.FormattingOptions)
      }
      CKEDITOR.DecoupledEditor.create(element.value, editorConfig)
        .then(editor => {
          toolbar.value.appendChild(editor.ui.view.toolbar.element)
          container.value.appendChild(editor.ui.view.editable.element)
          instance = markRaw(editor)
          setUpEditorEvents()
          if (props.modelValue !== editorConfig.initialData) {
            editor.setData(props.modelValue)
          }
          if (props.disabled) {
            editor.enableReadOnlyMode(SAMPLE_READ_ONLY_LOCK_ID)
          }
          emit('ready', editor)
        })
        .catch(error => {
          console.error(error)
        })
    })
    return () => {
      return (
        <div class={[ns.b(), props.platform === 'mobile' && ns.e('mobile'), 'formatted']}>
          <div class={[ns.e('toolbar')]} ref={toolbar}></div>
          <div class={[ns.e('container')]} ref={container}></div>
          <div ref={element}></div>
        </div>
      )
    }
  }
})
