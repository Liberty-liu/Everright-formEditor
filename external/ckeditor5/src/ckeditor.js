/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import DecoupledEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor'
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
// import CKBox from '@ckeditor/ckeditor5-ckbox/src/ckbox';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'
import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties'
// import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation'
// import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import DropdownButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/dropdownbuttonview'
import DropdownPanelView from '@ckeditor/ckeditor5-ui/src/dropdown/dropdownpanelview'
import DropdownView from '@ckeditor/ckeditor5-ui/src/dropdown/dropdownview'
import clickOutsideHandler from '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler'
import fontColorIcon from '@ckeditor/ckeditor5-font/theme/icons/font-color.svg'
import ToolbarView from '@ckeditor/ckeditor5-ui/src/toolbar/toolbarview'
class DecoupledEditor extends DecoupledEditorBase {}
function overrideDropdownPositionsToNorth (editor, toolbarView) {
  const {
    south, north, southEast, southWest, northEast, northWest,
    southMiddleEast, southMiddleWest, northMiddleEast, northMiddleWest
  } = DropdownView.defaultPanelPositions

  let panelPositions

  if (editor.locale.uiLanguageDirection !== 'rtl') {
    panelPositions = [
      northEast, northWest, northMiddleEast, northMiddleWest, north,
      southEast, southWest, southMiddleEast, southMiddleWest, south
    ]
  } else {
    panelPositions = [
      northWest, northEast, northMiddleWest, northMiddleEast, north,
      southWest, southEast, southMiddleWest, southMiddleEast, south
    ]
  }

  for (const item of toolbarView.items) {
    if (!(item instanceof DropdownView)) {
      continue
    }

    item.on('change:isOpen', () => {
      if (!item.isOpen) {
        return
      }

      item.panelView.position = DropdownView._getOptimalPosition({
        element: item.panelView.element,
        target: item.buttonView.element,
        fitInViewport: true,
        positions: panelPositions
      }).name
    })
  }
}
function overrideTooltipPositions (toolbarView) {
  for (const item of toolbarView.items) {
    if (item.buttonView) {
      item.buttonView.tooltipPosition = 'n'
    } else if (item.tooltipPosition) {
      item.tooltipPosition = 'n'
    }
  }
}
class FormattingOptions extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName () {
    return 'FormattingOptions'
  }

  /**
   * @inheritDoc
   */
  constructor (editor) {
    super(editor)

    editor.ui.componentFactory.add('formattingOptions', locale => {
      const t = locale.t
      const buttonView = new DropdownButtonView(locale)
      const panelView = new DropdownPanelView(locale)
      const dropdownView = new DropdownView(locale, buttonView, panelView)
      const toolbarView = this.toolbarView = dropdownView.toolbarView = new ToolbarView(locale)

      // Accessibility: Give the toolbar a human-readable ARIA label.
      toolbarView.set({
        ariaLabel: t('Formatting options toolbar')
      })

      // Accessibility: Give the dropdown a human-readable ARIA label.
      dropdownView.set({
        label: t('Formatting options')
      })

      // Toolbars in dropdowns need specific styling, hence the class.
      dropdownView.extendTemplate({
        attributes: {
          class: ['ck-toolbar-dropdown']
        }
      })

      // Accessibility: If the dropdown panel is already open, the arrow down key should focus the first child of the #panelView.
      dropdownView.keystrokes.set('arrowdown', (data, cancel) => {
        if (dropdownView.isOpen) {
          toolbarView.focus()
          cancel()
        }
      })

      // Accessibility: If the dropdown panel is already open, the arrow up key should focus the last child of the #panelView.
      dropdownView.keystrokes.set('arrowup', (data, cancel) => {
        if (dropdownView.isOpen) {
          toolbarView.focusLast()
          cancel()
        }
      })

      // The formatting options should not close when the user clicked:
      // * the dropdown or it contents,
      // * any editing root,
      // * any floating UI in the "body" collection
      // It should close, for instance, when another (main) toolbar button was pressed, though.
      dropdownView.on('render', () => {
        clickOutsideHandler({
          emitter: dropdownView,
          activator: () => dropdownView.isOpen,
          callback: () => { dropdownView.isOpen = false },
          contextElements: [
            dropdownView.element,
            ...[...editor.ui.getEditableElementsNames()].map(name => editor.ui.getEditableElement(name)),
            document.querySelector('.ck-body-wrapper')
          ]
        })
      })

      // The main button of the dropdown should be bound to the state of the dropdown.
      buttonView.bind('isOn').to(dropdownView, 'isOpen')
      buttonView.bind('isEnabled').to(dropdownView)

      // Using the font color icon to visually represent the formatting.
      buttonView.set({
        tooltip: t('Formatting options'),
        icon: fontColorIcon
      })

      dropdownView.panelView.children.add(toolbarView)

      toolbarView.fillFromConfig(
        editor.config.get('formattingOptions'),
        editor.ui.componentFactory
      )

      return dropdownView
    })
  }
}
const defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'fontfamily',
      'fontsize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'alignment',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'outdent',
      'indent',
      '|',
      'link',
      'blockquote',
      'uploadImage',
      'insertTable',
      '|',
      'undo',
      'redo'
    ]
  },
  image: {
    resizeUnit: 'px',
    toolbar: [
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'toggleImageCaption',
      'imageTextAlternative'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true
    }
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en'
}
const builtinPlugins = [
  Essentials,
  Alignment,
  FontSize,
  FontFamily,
  FontColor,
  FontBackgroundColor,
  UploadAdapter,
  Autoformat,
  Bold,
  Italic,
  Strikethrough,
  Underline,
  BlockQuote,
  // CKBox,
  // CKFinder,
  // CloudServices,
  // EasyImage,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Link,
  List,
  ListProperties,
  // MediaEmbed,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  Table,
  TableToolbar,
  TextTransformation
]

// ClassicEditor.builtinPlugins = builtinPlugins
// ClassicEditor.defaultConfig = defaultConfig
DecoupledEditor.builtinPlugins = builtinPlugins
DecoupledEditor.defaultConfig = defaultConfig
export default {
  // ClassicEditor,
  DecoupledEditor,
  plugins: {
    FormattingOptions
  },
  utils: {
    overrideDropdownPositionsToNorth,
    overrideTooltipPositions
  }
}
