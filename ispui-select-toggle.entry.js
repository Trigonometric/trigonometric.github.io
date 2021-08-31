import { r as registerInstance, e as createEvent, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-select-toggle{display:flex;font-family:\"Ubuntu\", sans-serif;font-size:var(--ispui-select-toggle__fs, 14px)}.ispui-select-toggle__checkbox{--ispui-checkbox__size:13px;--ispui-checkbox__pl:25px;--ispui-checkbox__margin-right:0;pointer-events:none}.ispui-select-toggle__plain-text{cursor:pointer}.ispui-select-toggle__plain-text_bold{font-weight:bold}.ispui-select-toggle__plain-text_disabled{pointer-events:none;opacity:0.5}";

const ToggleDefault = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.toggle = createEvent(this, "toggle", 7);
    /** text when not all options are selected */
    this.onText = 'Выбрать все';
    /** text when all options are selected */
    this.offText = 'Снять выбор';
    /** is disabled */
    this.disabled = false;
    /** is checked */
    this.checked = false;
    /** toggle type */
    this.type = 'checkbox';
  }
  render() {
    const checkbox = h("div", { class: "ispui-select-toggle__checkbox-wrapper", onClick: () => this.toggle.emit(!this.checked) }, h("ispui-checkbox", { class: "ispui-select-toggle__checkbox", block: true,
      // style={{ 'pointerEvents': 'none', '--ispui-checkbox__size': '13px', '--ispui-checkbox__pl': '15px', '--ispui-checkbox__margin-right': '0px' }}
      checked: this.checked, disabled: this.disabled }, this.checked ? this.offText : this.onText));
    const bold = h("span", { onClick: () => this.toggle.emit(!this.checked), class: { 'ispui-select-toggle__plain-text': true, 'ispui-select-toggle__plain-text_disabled': this.disabled, 'ispui-select-toggle__plain-text_bold': this.checked } }, this.checked ? this.offText : this.onText);
    const layouts = { checkbox, bold };
    return (h(Host, { class: "ispui-select-toggle" }, layouts[this.type]));
  }
};
ToggleDefault.style = css;

export { ToggleDefault as ispui_select_toggle };
