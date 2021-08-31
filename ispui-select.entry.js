import { r as registerInstance, e as createEvent, h } from './index-5b6825d9.js';

/** Global select events */
var SelectEvents;
(function (SelectEvents) {
  SelectEvents["STATE_UPDATE"] = "ISPUISelect-stateUpdate";
  SelectEvents["FOCUS"] = "ISPUISelect-focus";
  SelectEvents["BLUR"] = "ISPUISelect-blur";
})(SelectEvents || (SelectEvents = {}));

const AddExtender = class {
  constructor(state, params, selectEventBus) {
    this.state = state;
    this.params = params;
    this.selectEventBus = selectEventBus;
    this.options = Object.assign({ text: 'Добавить', theme: 'default', style: {} }, this.params);
    this.tree = this.createTree();
  }
  createTree() {
    return {
      tag: 'ispui-select-add',
      params: {
        text: this.options.text,
        theme: this.options.theme,
        style: this.options.style,
        onAddClick: () => this.selectEventBus.emit('ISPUISelect-add-add'),
      },
    };
  }
};

const ApplyExtender = class {
  constructor(state, params, selectEventBus) {
    this.state = state;
    this.params = params;
    this.selectEventBus = selectEventBus;
    this.options = Object.assign({ reset: true, applyText: 'Применить', resetText: 'Сбросить', style: {} }, this.params);
    this.tree = this.createTree();
  }
  createTree() {
    return {
      tag: 'ispui-select-apply',
      params: {
        style: this.options.style,
        withReset: this.options.reset,
        applyText: this.options.applyText,
        resetText: this.options.resetText,
        onApply: () => this.selectEventBus.emit('ISPUISelect-apply-apply'),
        onReset: () => this.selectEventBus.emit('ISPUISelect-apply-reset'),
      },
    };
  }
};

const DEFAULT_ID = 123456789;
const BaseDropdownExtender = class {
  constructor(state, params, selectEventBus, children = []) {
    this.state = state;
    this.params = params;
    this.selectEventBus = selectEventBus;
    this.children = children;
    // preOptions is needed for setting default options that depend on other options, so "options" property is final default options
    this.options = Object.assign(Object.assign({ id: DEFAULT_ID, width: 280, maxWidth: 280, dropdownPadding: '10px 0px', disabled: false }, this.params), { popupStyle: Object.assign({ '--ispui-dropdown-max-width': '500px', '--ispui-dropdown-min-width': '280px', '--ispui-dropdown-min-height': '10px', '--ispui-dropdown-popup__container_min-height': '10px', '--ispui-dropdown-content-min-height': '10px', '--ispui-dropdown-content-padding': '10px', '--ispui-dropdown-content-pr': '0px', '--ispui-dropdown-content-display': 'block' }, this.params.popupStyle), anchorStyle: Object.assign({ width: '0', position: 'absolute' }, this.params.anchorStyle), dropdownParams: Object.assign({ borderOffset: 0, hasPointer: false, alignment: 'start', isClose: false, offset: 10, type: 'click', disabled: false }, this.params.dropdownParams) });
    this.dropdownPopupClass = `ispui-select-base-dropdown-extender-dropdown-popup-${this.options.id}`;
    if (!this.options.id || this.options.id === DEFAULT_ID) {
      console.error('ISPUISelect: extender BaseDropdown has not received parameter "id". That may be a reason why every ispui-select on the page is not working.');
    }
    this.tree = this.createTree();
    this.appendDropdownPopupStyles();
  }
  /**
   * Append specific for this dropdown styles to the document
   */
  appendDropdownPopupStyles(update = false) {
    const styleId = `ispui-select-base-dropdown-extender-dropdown-popup-syle-${this.options.id}`;
    const currentSyles = document.getElementById(styleId);
    if (!currentSyles || update) {
      if (update) {
        currentSyles === null || currentSyles === void 0 ? void 0 : currentSyles.remove();
      }
      let popupStyle = '';
      for (let styleName in this.options.popupStyle) {
        popupStyle += `${styleName}: ${this.options.popupStyle[styleName]};\n`;
      }
      document.head.insertAdjacentHTML('beforeend', `<style id='${styleId}'>
          .${this.dropdownPopupClass} {
            ${popupStyle}
          }
        </style>`);
    }
  }
  updateDropdownPopupPadding(newPadding) {
    this.options.popupStyle['--ispui-dropdown-content-padding'] = newPadding;
    this.appendDropdownPopupStyles(true);
  }
  createTree() {
    if (this.children.length < 2) {
      console.error('ISPUISelect: BaseDropdown extender requires at least 2 children but got less or none');
    }
    const buttonNode = this.children[0];
    const contentNodes = this.children.slice(1);
    return Object.assign(Object.assign({}, buttonNode), { params: Object.assign(Object.assign({}, buttonNode.params), { onClick: (e) => {
          e.stopPropagation();
          this.dropdown.click();
        } }), children: [{
          tag: 'ispui-dropdown',
          params: Object.assign(Object.assign({}, this.options.dropdownParams), { ref: el => (this.dropdown = el), popupClass: this.dropdownPopupClass, onOpen: () => this.selectEventBus.emit('ISPUISelect-baseDropdown-open'), onClose: () => this.selectEventBus.emit('ISPUISelect-baseDropdown-close'), onClosingStart: () => this.selectEventBus.emit('ISPUISelect-baseDropdown-closingStart') }),
          children: [
            {
              tag: 'div',
              params: {
                slot: 'anchor',
                style: this.options.anchorStyle,
              },
            },
            {
              tag: 'ispui-dropdown-content',
              children: contentNodes,
            },
          ],
        }] });
  }
};

const defaultButtonTextFunc = (state, placeholder) => {
  var _a;
  if (state.multiple) {
    let currentValue = state.value;
    if (typeof currentValue === 'string') {
      currentValue = [currentValue];
    }
    return (state.options
      .filter(o => currentValue.includes(o.value))
      .map(o => o.text)
      .join(', ') || placeholder);
  }
  else {
    return ((_a = state.options.find(o => o.value === state.value)) === null || _a === void 0 ? void 0 : _a.text) || placeholder;
  }
};
const ButtonExtender = class {
  constructor(state, params, selectEventBus) {
    this.state = state;
    this.params = params;
    this.selectEventBus = selectEventBus;
    this.preOptions = Object.assign({ width: 280, type: 'default', placeholder: '', legend: '', focusVisible: true, style: {}, buttonTextFunc: defaultButtonTextFunc }, this.params);
    this.options = Object.assign(Object.assign({}, this.preOptions), { type: this.preOptions.legend ? 'legend' : this.preOptions.type });
    this.tree = this.createTree();
  }
  createTree() {
    return {
      tag: `ispui-select-button${this.options.type === 'default' ? '' : '-' + this.options.type}`,
      params: {
        text: this.options.buttonTextFunc(this.state, this.options.placeholder),
        open: false,
        disabled: this.state.disabled,
        legend: this.options.legend,
        focusVisible: this.options.focusVisible,
        onSearch: (event) => this.selectEventBus.emit('ISPUISelect-button-search', event.detail),
        onFocus: () => this.selectEventBus.emit('ISPUISelect-button-focus'),
        onBlur: () => this.selectEventBus.emit('ISPUISelect-button-blur'),
        onKeypress: (e) => {
          if (e.key === 'Enter') {
            this.selectEventBus.emit('ISPUISelect-button-enter');
          }
        },
        ref: el => (this.button = el),
        style: Object.assign({ '--ispui-select-button__width': `${this.options.width}px`, [`--ispui-select-button-${this.options.type}__width`]: `${this.options.width}px` }, this.options.style),
      },
    };
  }
  updateButton() {
    if (this.button) {
      this.button.disabled = this.state.disabled;
      this.button.text = this.options.buttonTextFunc(this.state, this.options.placeholder);
    }
  }
};

const ListExtender = class {
  constructor(state, params, selectEventBus) {
    this.state = state;
    this.params = params;
    this.selectEventBus = selectEventBus;
    this.options = Object.assign({ checkbox: false, listName: undefined, itemArea: 'full', selectedHighlight: false, hoverHighlight: true, selectedBold: true, style: {} }, this.params);
    this.tree = this.createTree();
  }
  getOptionsForList() {
    const listName = this.options.listName;
    const res = this.state.options.map(opt => (Object.assign(Object.assign({}, opt), { selected: Array.isArray(this.state.value) ? this.state.value.includes(opt.value) : this.state.value === opt.value, hide: false, textHtml: opt.text })));
    return listName ? res.filter(o => o.list === listName) : res.filter(o => !o.list);
  }
  createTree() {
    const optionsUI = this.getOptionsForList();
    return {
      tag: 'ispui-select-list',
      params: {
        ref: el => (this.list = el),
        onOptionClick: (event) => this.selectEventBus.emit('ISPUISelect-list-optionClick', event.detail),
        onOptionHoverOn: (event) => this.selectEventBus.emit('ISPUISelect-list-optionHoverOn', event.detail),
        onOptionHoverOff: (event) => this.selectEventBus.emit('ISPUISelect-list-optionHoverOff', event.detail),
        onOptionNavigateOn: (event) => this.selectEventBus.emit('ISPUISelect-list-optionNavigationOn', event.detail),
        onOptionNavigateOff: (event) => this.selectEventBus.emit('ISPUISelect-list-optionNavigationOff', event.detail),
        selectedHighlight: this.options.selectedHighlight,
        hoverHighlight: this.options.hoverHighlight,
        selectedBold: this.options.selectedBold,
        list: optionsUI,
        itemArea: this.options.itemArea,
        checkbox: this.options.checkbox,
        style: this.options.style,
      },
    };
  }
};

const SearchExtender = class {
  constructor(state, params, selectEventBus) {
    this.state = state;
    this.params = params;
    this.selectEventBus = selectEventBus;
    this.options = Object.assign({ style: {}, searchCount: 0 }, this.params);
    this.tree = this.createTree();
  }
  createTree() {
    return {
      tag: 'ispui-select-search',
      params: {
        value: '',
        ref: el => (this.search = el),
        hidden: this.options.searchCount === 0 || this.state.options.length < this.options.searchCount,
        onSearch: (event) => this.selectEventBus.emit('ISPUISelect-search-search', event.detail),
        style: this.options.style,
      },
    };
  }
};

const TextExtender = class {
  constructor(state, params, selectEventBus) {
    this.state = state;
    this.params = params;
    this.selectEventBus = selectEventBus;
    this.options = Object.assign({ text: '', hidden: true, style: {} }, this.params);
    this.tree = this.createTree();
  }
  createTree() {
    return {
      tag: 'ispui-select-text',
      params: {
        text: this.options.text,
        ref: el => (this.text = el),
        style: this.options.style,
        hidden: this.options.hidden,
      },
    };
  }
};

const ToggleExtender = class {
  constructor(state, params, selectEventBus) {
    this.state = state;
    this.params = params;
    this.selectEventBus = selectEventBus;
    this.options = Object.assign({ onText: 'Выбрать все', offText: 'Снять выбор', type: 'checkbox', style: {} }, this.params);
    this.tree = this.createTree();
  }
  isChecked() {
    if (!this.state.multiple) {
      return false;
    }
    return this.state.options.every(op => this.state.value.includes(op.value));
  }
  createTree() {
    return {
      tag: 'ispui-select-toggle',
      params: {
        onText: this.options.onText,
        offText: this.options.offText,
        checked: this.isChecked(),
        type: this.options.type,
        style: this.options.style,
        hidden: !this.state.multiple,
        onToggle: (e) => this.selectEventBus.emit('ISPUISelect-toggle-toggle', e.detail),
        ref: el => (this.toggle = el),
      },
    };
  }
};

function basicPresetBuilder(params, state) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j;
  // preOptions are needed for setting default options that depend on other options, so "options" variable is final default options
  const preOptions = Object.assign({ legend: '', button: params.legend ? 'legend' : 'default', searchCount: 0, hasPointer: undefined, animateButton: true, focusVisible: true, padding: undefined, bRadius: '5px', apply: false, reset: true, applyText: 'Применить', resetText: 'Сбросить', text: '', itemArea: 'full', notFoundText: 'Не найдено', extraLists: [], hideOnSelect: true, toggle: params.toggleUnderList || params.toggleType || params.toggleOnText || params.toggleOffText || false, toggleType: 'checkbox', toggleUnderList: false, toggleOnText: 'Выбрать все', toggleOffText: 'Снять выбор', add: params.addText || params.addTheme ? true : false, selectedHighlight: false, hoverHighlight: true, selectedBold: true, addText: 'Добавить', addTheme: 'default', id: Date.now(), checkbox: false, width: 280, maxWidth: params.width || 280, buttonTextFunc: defaultButtonTextFunc, placeholder: '' }, params);
  // TODO: remove this when Toggle will support working with Apply
  if (preOptions.apply && preOptions.toggle) {
    console.error('ISPUI-select: the builder currently does not suppurt using Toggle and Apply simultaniously. Toggle directly changes value');
  }
  const getDropdownPadding = () => {
    if (preOptions.padding) {
      return preOptions.padding;
    }
    const isSearchVisible = preOptions.searchCount && state.options.filter(o => !o.list).length >= preOptions.searchCount;
    return `${preOptions.apply || preOptions.add || isSearchVisible ? '20px' : '10px'} 0px`;
  };
  const chipOrLine = ['chip', 'line'].includes(preOptions.button);
  const options = Object.assign(Object.assign({}, preOptions), { 
    // extenders parameters
    $dropdown: Object.assign(Object.assign({ id: preOptions.id }, params.$dropdown), { popupStyle: Object.assign({ '--ispui-dropdown-max-width': `${preOptions.maxWidth}px`, '--ispui-dropdown-min-width': `${preOptions.width}px`, '--ispui-dropdown-content-padding': getDropdownPadding(), '--ispui-dropdown-border-radius': preOptions.bRadius, '--ispui-dropdown-content-pr': '0px' }, (_a = params.$dropdown) === null || _a === void 0 ? void 0 : _a.popupStyle), 
      // with search field, dropdown seems to need additional horizontal padding
      anchorStyle: Object.assign({ left: chipOrLine ? undefined : '0px', right: chipOrLine ? ({ chip: '12px', line: '7px' }[preOptions.button]) : undefined, bottom: chipOrLine ? '-10px' : '0px' }, (_b = params.$dropdown) === null || _b === void 0 ? void 0 : _b.anchorStyle), dropdownParams: Object.assign({ hasPointer: typeof preOptions.hasPointer === 'boolean' ? preOptions.hasPointer : chipOrLine, alignment: chipOrLine ? 'auto' : 'start', disabled: state.disabled }, (_c = params.$dropdown) === null || _c === void 0 ? void 0 : _c.dropdownParams) }), $button: Object.assign({ type: preOptions.button, legend: preOptions.legend, width: preOptions.width, buttonTextFunc: preOptions.buttonTextFunc, placeholder: preOptions.placeholder, focusVisible: preOptions.focusVisible }, params.$button), $list: Object.assign(Object.assign({ checkbox: preOptions.checkbox, itemArea: preOptions.itemArea, selectedHighlight: preOptions.selectedHighlight, hoverHighlight: preOptions.hoverHighlight, selectedBold: preOptions.selectedBold }, params.$list), { style: Object.assign({ marginRight: '20px', marginLeft: '10px' }, (_d = params.$list) === null || _d === void 0 ? void 0 : _d.style) }), $text: Object.assign(Object.assign({ text: preOptions.text, hidden: preOptions.text === '' }, params.$text), { style: Object.assign({ padding: '10px 20px' }, (_e = params.$text) === null || _e === void 0 ? void 0 : _e.style) }), $search: Object.assign(Object.assign({ searchCount: preOptions.searchCount }, params.$search), { style: Object.assign({ marginLeft: '20px', marginRight: '20px', marginBottom: '10px' }, (_f = params.$search) === null || _f === void 0 ? void 0 : _f.style) }), $apply: Object.assign(Object.assign({ reset: preOptions.reset, applyText: preOptions.applyText, resetText: preOptions.resetText }, params.$apply), { style: Object.assign({ marginTop: '15px', marginLeft: '20px', marginRight: '20px' }, (_g = params.$apply) === null || _g === void 0 ? void 0 : _g.style) }), $toggle: Object.assign(Object.assign({ onText: preOptions.toggleOnText, offText: preOptions.toggleOffText, type: preOptions.toggleType }, params.$toggle), { style: Object.assign(Object.assign({ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '10px', borderBottom: '1px solid #D9D9D9' }, (preOptions.toggleUnderList ? { borderBottom: 'none', borderTop: '1px solid #D9D9D9', paddingTop: '20px' } : null)), (_h = params.$toggle) === null || _h === void 0 ? void 0 : _h.style) }), $add: Object.assign(Object.assign({ text: preOptions.addText, theme: preOptions.addTheme }, params.$add), { style: Object.assign({ marginLeft: '20px', marginRight: '20px', marginTop: '10px' }, (_j = params.$add) === null || _j === void 0 ? void 0 : _j.style) }) });
  let searchTextBuffer = '';
  let dropdownOpenBuffer = false;
  let applySignleBuffer = '';
  let applyMultipleBuffer = [];
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  function updateList(listExtenderInstance, listName) {
    const list = listExtenderInstance.getOptionsForList();
    if (searchTextBuffer && !listName) {
      list.forEach((option) => {
        const reNeedle = new RegExp(escapeRegExp(searchTextBuffer), 'i');
        if (reNeedle.test(option.textHtml)) {
          option.textHtml = option.textHtml.replace(reNeedle, '<span class="ispui-select-list__item-search-match">$&</span>');
        }
        else {
          option.hide = true;
        }
      });
    }
    if (options.apply) {
      const inVal = (v) => state.value.includes(v);
      const inBuf = (v) => applyMultipleBuffer.includes(v);
      const visualMultipleValue = list.map(o => o.value).filter(v => (inVal(v) && !inBuf(v)) || (!inVal(v) && inBuf(v)));
      const visualSingleValue = applySignleBuffer || state.value;
      list.forEach((opt) => {
        opt.selected = state.multiple ? visualMultipleValue.includes(opt.value) : visualSingleValue === opt.value;
      });
    }
    if (listExtenderInstance.list) {
      listExtenderInstance.list.list = list;
    }
  }
  const dropdownNode = {
    class: BaseDropdownExtender,
    params: options.$dropdown,
    hooks: {
      'ISPUISelect-list-optionClick': instance => {
        if (options.hideOnSelect && !state.multiple) {
          instance.dropdown.closeDropdown();
        }
      },
      [SelectEvents.STATE_UPDATE]: instance => {
        var _a;
        setTimeout(() => { var _a; return (_a = instance.dropdown) === null || _a === void 0 ? void 0 : _a.setupDropdown(); }, 100);
        instance.updateDropdownPopupPadding(getDropdownPadding());
        if (instance.dropdown) {
          instance.dropdown.disabled = state.disabled;
        }
        if (state.disabled) {
          (_a = instance.dropdown) === null || _a === void 0 ? void 0 : _a.closeDropdown();
        }
      },
      'ISPUISelect-search-search': instance => {
        setTimeout(() => instance.dropdown.setupDropdown(), 100);
      },
      'ISPUISelect-button-search': instance => {
        setTimeout(() => instance.dropdown.setupDropdown(), 100);
      },
      'ISPUISelect-baseDropdown-open': () => (dropdownOpenBuffer = true),
      'ISPUISelect-baseDropdown-close': () => (dropdownOpenBuffer = false),
      'ISPUISelect-button-enter': instance => {
        if (!dropdownOpenBuffer) {
          instance.dropdown.showDropdown();
        }
      },
      'ISPUISelect-apply-apply': instance => instance.dropdown.closeDropdown(),
    },
  };
  const buttonNode = {
    class: ButtonExtender,
    params: options.$button,
    hooks: {
      'ISPUISelect-baseDropdown-open': instance => options.animateButton && (instance.button.open = true),
      'ISPUISelect-baseDropdown-closingStart': instance => (instance.button.open = false),
      [SelectEvents.STATE_UPDATE]: instance => instance.updateButton(),
      'ISPUISelect-baseDropdown-close': instance => (instance.button.value = ''),
      'ISPUISelect-button-focus': instance => instance.selectEventBus.emit(SelectEvents.FOCUS),
      'ISPUISelect-button-blur': instance => instance.selectEventBus.emit(SelectEvents.BLUR),
    },
  };
  const listExtenderSearchHandler = (instance, text) => {
    searchTextBuffer = text;
    updateList(instance);
  };
  const listExtenderOptionClickHandler = (_, option, updateValue) => {
    if (option.disabled || options.apply) {
      // leave handling to the apply extender if it is used
      return;
    }
    let currentValue = state.value;
    if (state.multiple && typeof state.value === 'string') {
      currentValue = [state.value];
    }
    let newValue;
    if (state.multiple) {
      if (currentValue.includes(option.value)) {
        newValue = currentValue.filter(v => v !== option.value);
      }
      else {
        newValue = [...currentValue, option.value];
      }
    }
    else {
      newValue = option.value;
    }
    updateValue(newValue);
  };
  const listNode = {
    class: ListExtender,
    params: options.$list,
    hooks: {
      'ISPUISelect-list-optionClick': listExtenderOptionClickHandler,
      [SelectEvents.STATE_UPDATE]: instance => updateList(instance),
      'ISPUISelect-search-search': listExtenderSearchHandler,
      'ISPUISelect-button-search': listExtenderSearchHandler,
    },
  };
  const extraListNodes = options.extraLists.map(listName => {
    var _a, _b;
    return ({
      class: ListExtender,
      params: Object.assign(Object.assign(Object.assign({}, options.$list), options[`$list-${listName}`]), { listName, style: Object.assign(Object.assign({}, (_a = options.$list) === null || _a === void 0 ? void 0 : _a.style), (_b = options[`$list-${listName}`]) === null || _b === void 0 ? void 0 : _b.style) }),
      hooks: {
        'ISPUISelect-list-optionClick': listExtenderOptionClickHandler,
        [SelectEvents.STATE_UPDATE]: instance => updateList(instance, listName),
      },
    });
  });
  const textExtenderSearchHandler = (instance, needle) => {
    const matches = state.options.filter((option) => new RegExp(escapeRegExp(needle), 'i').test(option.text));
    if (matches.length === 0 && state.options.length !== 0) {
      instance.text.text = options.notFoundText;
      instance.text.hidden = false;
    }
    else {
      instance.text.text = options.text;
      instance.text.hidden = options.text === '';
    }
  };
  const textNode = {
    class: TextExtender,
    params: options.$text,
    hooks: {
      'ISPUISelect-search-search': textExtenderSearchHandler,
      'ISPUISelect-button-search': textExtenderSearchHandler,
    },
  };
  const searchNode = {
    class: SearchExtender,
    params: options.$search,
    hooks: {
      'ISPUISelect-baseDropdown-close': instance => {
        instance.search.value = '';
      },
      [SelectEvents.STATE_UPDATE]: instance => {
        if (instance.search) {
          instance.search.hidden = state.options.filter(o => !o.list).length < options.searchCount;
        }
      },
    },
  };
  const applyNode = {
    class: ApplyExtender,
    params: options.$apply,
    hooks: {
      'ISPUISelect-list-optionClick': (_, option, updateValue) => {
        if (option.disabled) {
          return;
        }
        if (state.multiple) {
          if (applyMultipleBuffer.includes(option.value)) {
            applyMultipleBuffer = applyMultipleBuffer.filter(v => v !== option.value);
          }
          else {
            applyMultipleBuffer.push(option.value);
          }
        }
        else {
          applySignleBuffer = option.value;
        }
        updateValue(state.value); // hack for updating list in ListExtender, because it subscribed on stateUpdate
      },
      'ISPUISelect-apply-apply': (_, __, updateValue) => {
        let currentValue = state.value;
        if (state.multiple && typeof state.value === 'string') {
          currentValue = [state.value];
        }
        let newValue;
        if (state.multiple) {
          const vSet = new Set(currentValue);
          applyMultipleBuffer.forEach(v => (vSet.has(v) ? vSet.delete(v) : vSet.add(v)));
          newValue = Array.from(vSet);
          applyMultipleBuffer = [];
        }
        else {
          newValue = applySignleBuffer || currentValue;
          applySignleBuffer = '';
        }
        updateValue(newValue);
      },
      'ISPUISelect-apply-reset': (_, __, updateValue) => {
        applySignleBuffer = '';
        applyMultipleBuffer = [];
        updateValue(state.value); // hack for updating list in ListExtender, because it subscribed on stateUpdate
      },
    },
  };
  const toggleNode = {
    class: ToggleExtender,
    params: options.$toggle,
    hooks: {
      'ISPUISelect-toggle-toggle': (_, isSelect, updateValue) => {
        let currentValue = state.value;
        if (typeof currentValue === 'string') {
          currentValue = [currentValue];
        }
        const selectedValue = state.options.filter(o => !o.disabled || currentValue.includes(o.value)).map(o => o.value);
        const deselectedValue = state.options.filter(o => o.disabled && currentValue.includes(o.value)).map(o => o.value);
        updateValue(isSelect ? selectedValue : deselectedValue);
      },
      [SelectEvents.STATE_UPDATE]: instance => {
        if (!instance.toggle) {
          return;
        }
        instance.toggle.hidden = !state.multiple;
        let currentValue = state.value;
        if (typeof currentValue === 'string') {
          currentValue = [currentValue];
        }
        instance.toggle.checked = state.options.filter(o => !o.disabled).every(o => currentValue.includes(o.value));
      },
    },
  };
  const addNode = {
    class: AddExtender,
    params: options.$add,
  };
  const contentNodes = [];
  if (options.searchCount) {
    contentNodes.push(searchNode);
  }
  if (options.toggle && !options.toggleUnderList) {
    contentNodes.push(toggleNode);
  }
  contentNodes.push(listNode, textNode);
  contentNodes.push(...extraListNodes);
  if (options.toggle && options.toggleUnderList) {
    contentNodes.push(toggleNode);
  }
  if (options.add) {
    contentNodes.push(addNode);
  }
  if (options.apply) {
    contentNodes.push(applyNode);
  }
  return Object.assign(Object.assign({}, dropdownNode), { children: [buttonNode, ...contentNodes] });
}

const Select = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.change = createEvent(this, "change", 7);
    this.internalAction = createEvent(this, "internalAction", 7);
    this.focus = createEvent(this, "focus", 7);
    this.blur = createEvent(this, "blur", 7);
    /** function to generate a preset for select render */
    this.builder = basicPresetBuilder;
    /** params for builder */
    this.builderParams = {};
    /** options */
    this.options = [];
    /** value */
    this.value = '';
    /** disabled */
    this.disabled = false;
    /** multiple */
    this.multiple = false;
    this.state = {
      options: this.options,
      value: this.value,
      disabled: this.disabled,
      multiple: this.multiple,
    };
    this.hooks = {};
    this.bus = {
      emit: (name, data) => {
        let isEmit = true;
        switch (name) {
          case SelectEvents.FOCUS:
            this.focus.emit();
            isEmit = false;
            break;
          case SelectEvents.BLUR:
            this.blur.emit();
            isEmit = false;
            break;
        }
        if (isEmit) {
          this.internalAction.emit({ name, data });
        }
        if (this.hooks[name]) {
          this.hooks[name].forEach(hook => hook(data));
        }
      },
    };
  }
  callStateUpdateHooks() {
    var _a;
    (_a = this.hooks[SelectEvents.STATE_UPDATE]) === null || _a === void 0 ? void 0 : _a.forEach(h => h());
  }
  updateOptions(newVal) {
    this.state.options = newVal;
    this.callStateUpdateHooks();
  }
  updateValue(newVal) {
    this.state.value = newVal;
    this.change.emit({ value: this.value });
    this.callStateUpdateHooks();
  }
  updateDisabled(newVal) {
    this.state.disabled = newVal;
    this.callStateUpdateHooks();
  }
  updateMultiple(newVal) {
    this.state.multiple = newVal;
    this.callStateUpdateHooks();
  }
  recreateTree() {
    this.hooks = {};
    const builder = this.builder || basicPresetBuilder;
    const preset = builder(this.builderParams, this.state);
    // if we just reset tree with a new tree, idpui-dropdown somehow breaks down, so we should explicitly swipe all potential cache in DOM before recreating new tree
    this.tree = null;
    setTimeout(() => {
      this.tree = this.createTree.call(this, preset);
      this.callStateUpdateHooks();
    });
  }
  componentWillLoad() {
    this.recreateTree();
  }
  updateValueParameter(value) {
    // if we get current value, @Watch() for value will not work, so we call callStateUpdateHooks() manualy
    if (value === this.value) {
      this.callStateUpdateHooks();
    }
    this.value = value;
  }
  createTree(preset) {
    const instance = new preset.class(this.state, preset.params, this.bus, preset.children ? preset.children.map(preset => this.createTree.call(this, preset)) : []);
    for (const eventName in preset.hooks) {
      const hook = preset.hooks[eventName];
      const handler = (data) => hook(instance, data, this.updateValueParameter.bind(this));
      if (this.hooks[eventName]) {
        this.hooks[eventName].push(handler);
      }
      else {
        this.hooks[eventName] = [handler];
      }
    }
    return instance.tree;
  }
  render() {
    const subrender = (node) => {
      var _a;
      if (!node) {
        return null;
      }
      return h(node.tag, Object.assign({}, node.params), (_a = node.children) === null || _a === void 0 ? void 0 : _a.map(subrender));
    };
    return subrender(this.tree);
  }
  static get watchers() { return {
    "options": ["updateOptions"],
    "value": ["updateValue"],
    "disabled": ["updateDisabled"],
    "multiple": ["updateMultiple"],
    "builder": ["recreateTree"],
    "builderParams": ["recreateTree"]
  }; }
};

export { Select as ispui_select };
