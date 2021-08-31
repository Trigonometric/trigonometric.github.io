import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-5b6825d9.js';

const css = ".ispui-select-list{display:block;overflow-y:auto;max-height:var(--ispui-select-list__max-height, 210px);scrollbar-color:var(--ispui-select-list__scroll-bar-color, #344a5e) var(--ispui-select-list__scroll-track-color, #ececec);scrollbar-width:thin;}.ispui-select-list::-webkit-scrollbar,.ispui-select-list::-webkit-scrollbar-track,.ispui-select-list::-webkit-scrollbar-thumb{width:3px;border-radius:10px}.ispui-select-list::-webkit-scrollbar{background:var(--ispui-select-list__scroll-track-color, #ececec)}.ispui-select-list::-webkit-scrollbar-thumb{background:var(--ispui-select-list__scroll-bar-color, #344a5e)}.ispui-select-list::-webkit-scrollbar-button{display:none}.ispui-select-list__item{display:flex;align-items:center;box-sizing:border-box;height:var(--ispui-select-list__item-height, 30px);padding-top:var(--ispui-select-list__item-pt, 10px);padding-right:var(--ispui-select-list__item-pr, 10px);padding-bottom:var(--ispui-select-list__item-pb, 10px);padding-left:var(--ispui-select-list__item-pl, 10px);color:var(--ispui-select-list__item-color, #344a5e);font-family:\"Ubuntu\", sans-serif;font-size:var(--ispui-select-list__item-fs, 14px);font-weight:var(--ispui-select-list__item-fw, 400)}.ispui-select-list__item_highlight,.ispui-select-list__item_hover-highlight:hover{background:var(--ispui-select-list__item-highlight-color, #fffabb)}.ispui-select-list__item_bold{--ispui-checkbox__font-weight:var(--ispui-select-list__item-bold-fw, bold);font-weight:var(--ispui-select-list__item-bold-fw, bold)}.ispui-select-list__item_disabled{color:var(--ispui-select-list__disabled-item-color, #d9d9d9)}.ispui-select-list__item-text{overflow:hidden;cursor:var(--ispui-select-list__item-text-cursor, default);white-space:nowrap;text-overflow:ellipsis}.ispui-select-list__item-search-match{background:var(--ispui-select-list__item-search-match-bg, yellow)}.ispui-select-list__checkbox{--ispui-checkbox__size:13px;--ispui-checkbox__pl:25px;max-width:100%;pointer-events:none}";

const ListDefault = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.optionClick = createEvent(this, "optionClick", 7);
    this.optionHoverOn = createEvent(this, "optionHoverOn", 7);
    this.optionHoverOff = createEvent(this, "optionHoverOff", 7);
    this.optionNavigateOn = createEvent(this, "optionNavigateOn", 7);
    this.optionNavigateOff = createEvent(this, "optionNavigateOff", 7);
    this.OPTION_EL_DEFAULT_HEIGHT = 30;
    /** how to select item */
    this.itemArea = 'full';
    /** list of options */
    this.list = [];
    /** wether to show options with checkboxes */
    this.checkbox = false;
    /** wether to highlight selected options */
    this.selectedHighlight = false;
    /** wether to highlight hovered options */
    this.hoverHighlight = true;
    /** wether to make selected option's text bold */
    this.selectedBold = true;
    /** wehter to emit event when hover on options */
    this.emitHoverOn = false;
    /** wehter to emit event when hover off from options */
    this.emitHoverOff = false;
    /** wether to use arrow navigation */
    this.arrowNavigation = true;
    /** wether to emit events on arrow navigation on */
    this.emitNavigateOn = false;
    /** wether to emit events on arrow navigation off */
    this.emitNavigateOff = false;
    this.rerenderTrigger = 1;
  }
  renavigate() {
    if (!this.navigatedOptionValue) {
      return;
    }
    const navigatedOption = this.list.find(o => o.value === this.navigatedOptionValue);
    if (navigatedOption) {
      navigatedOption.navigated = true;
      this.navigatedOptionValue = undefined;
    }
  }
  get navigatableList() {
    return this.list.filter(o => !o.disabled && !o.hide);
  }
  handleKeyDown(ev) {
    if (!this.arrowNavigation || !this.navigatableList.length) {
      return;
    }
    if (['ArrowUp', 'Up'].includes(ev.key)) {
      ev.preventDefault();
      this.navigate();
    }
    if (['ArrowDown', 'Down'].includes(ev.key)) {
      ev.preventDefault();
      this.navigate(false);
    }
    if (ev.key === 'Enter') {
      const navigatedOption = this.list.find(o => o.navigated);
      if (navigatedOption) {
        this.navigatedOptionValue = navigatedOption.value;
        this.optionClick.emit(navigatedOption);
      }
    }
  }
  navigate(isUp = true) {
    const list = this.navigatableList;
    let newNavigatedIndex;
    const lastIndex = list.length - 1;
    const currentNavigatedIndex = list.findIndex(o => o.navigated);
    if (isUp) {
      newNavigatedIndex = currentNavigatedIndex < 1 ? lastIndex : currentNavigatedIndex - 1;
    }
    else {
      newNavigatedIndex = currentNavigatedIndex === lastIndex ? 0 : currentNavigatedIndex + 1;
    }
    if (currentNavigatedIndex > -1) {
      const currentNavigatedOption = list[currentNavigatedIndex];
      currentNavigatedOption.navigated = false;
      if (this.emitNavigateOff) {
        this.optionHoverOff.emit(currentNavigatedOption);
      }
    }
    const newNavigatedOption = list[newNavigatedIndex];
    newNavigatedOption.navigated = true;
    if (this.emitNavigateOn) {
      this.optionHoverOn.emit(newNavigatedOption);
    }
    this.rerenderTrigger++;
    const visualNavigatedIndex = this.list.filter(o => !o.hide).findIndex(o => o === newNavigatedOption);
    this.scrollToNavigated(visualNavigatedIndex);
  }
  scrollToNavigated(optionIndex) {
    var _a;
    const optionHeight = ((_a = this.host.querySelector('.ispui-select-list__item')) === null || _a === void 0 ? void 0 : _a.clientHeight) || this.OPTION_EL_DEFAULT_HEIGHT;
    const optionOffset = optionIndex * optionHeight;
    const viewTop = this.host.scrollTop;
    const viewBottom = viewTop + this.host.clientHeight;
    if (optionOffset < viewTop) {
      this.host.scrollTop = optionOffset;
    }
    if (optionOffset >= viewBottom) {
      this.host.scrollTop = optionOffset - this.host.clientHeight + optionHeight;
    }
  }
  isOptionHighlit(o) {
    return o.navigated || (this.selectedHighlight && o.selected && !o.disabled);
  }
  getWrappedOptionHTML(option) {
    const color = option.color ? `style="color: ${option.color}"` : '';
    return `<span class="ispui-select-list__item-text" ${color}>${option.textHtml}</span>`;
  }
  renderCheckbox(option) {
    return (h("ispui-checkbox", { class: "ispui-select-list__checkbox", block: true, bold: this.selectedBold && option.selected, checked: option.selected, disabled: option.disabled, innerHTML: this.getWrappedOptionHTML(option) }));
  }
  handleItemClick(e, option) {
    const textClicked = e.target.closest('.ispui-select-list__item-text, .ispui-select-list__custom-item-text');
    if (textClicked || this.itemArea === 'full') {
      this.optionClick.emit(option);
    }
  }
  getItemActionHandlers(option) {
    return {
      onClick: (e) => this.handleItemClick(e, option),
      onMouseEnter: this.emitHoverOn ? () => this.optionHoverOn.emit(option) : undefined,
      onMouseLeave: this.emitHoverOff ? () => this.optionHoverOff.emit(option) : undefined,
    };
  }
  renderCustomItem(option) {
    const stateClasses = ['navigated', 'disabled', 'selected'].filter(state => option[state]).map(state => `ispui-select-option_${state}`);
    return h("div", Object.assign({}, this.getItemActionHandlers(option), { innerHTML: option.html(option.textHtml, stateClasses) }));
  }
  renderDefaultItem(option) {
    return (h("div", Object.assign({}, this.getItemActionHandlers(option), { class: {
        'ispui-select-list__item': true,
        'ispui-select-list__item_hover-highlight': this.hoverHighlight && !option.disabled,
        'ispui-select-list__item_highlight': this.isOptionHighlit(option),
        'ispui-select-list__item_bold': this.selectedBold && option.selected,
        'ispui-select-list__item_disabled': Boolean(option.disabled),
      } }, (this.checkbox ? null : { innerHTML: this.getWrappedOptionHTML(option) })), this.checkbox ? this.renderCheckbox(option) : null));
  }
  render() {
    return h(Host, { class: "ispui-select-list" }, this.list.map(option => (option.hide ? null : option.html ? this.renderCustomItem(option) : this.renderDefaultItem(option))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "list": ["renavigate"]
  }; }
};
ListDefault.style = css;

export { ListDefault as ispui_select_list };
