import { r as registerInstance, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-select-button-line{position:relative;display:inline-block;padding:var(--ispui-select-button-line__padding, 0 5px);cursor:pointer;color:var(--ispui-select-button-line__color, #344a5e);border-radius:var(--ispui-select-button-line__br, 3px);outline:none;font-family:\"Ubuntu\", sans-serif;font-size:var(--ispui-select-button-line__fs, 14px);font-weight:var(--ispui-select-button-line__fw, bold)}.ispui-select-button-line::after{content:\"\";position:relative;bottom:var(--ispui-select-button-line__arrow-bottom, 2px);display:inline-block;width:var(--ispui-select-button-line__arrow-size, 3px);height:var(--ispui-select-button-line__arrow-size, 3px);margin-left:var(--ispui-select-button-line__arrow-ml, 5px);transition:0.2s transform;transform:rotateZ(-45deg);transform-origin:40% 60% 0;border:var(--ispui-select-button-line__arrow-border, 1px solid #344a5e);border-top:none;border-right:none}.ispui-select-button-line_focusable:focus{box-shadow:inset 1px 1px 1px 1px var(--ispui-select-button-line__focus-color, #0279c0), inset -1px -1px 1px 1px var(--ispui-select-button-line__focus-color, #0279c0)}.ispui-select-button-line_open::after{transition:0.2s transform;transform:rotateZ(135deg)}.ispui-select-button-line_disabled{pointer-events:none;opacity:0.5}";

const ButtonDefault = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** show focus state in UI */
    this.focusVisible = true;
  }
  render() {
    return (h(Host, { tabindex: "0", class: {
        'ispui-select-button-line': true,
        'ispui-select-button-line_open': this.open,
        'ispui-select-button-line_disabled': this.disabled,
        'ispui-select-button-line_focusable': this.focusVisible,
      } }, this.text, h("slot", null)));
  }
};
ButtonDefault.style = css;

export { ButtonDefault as ispui_select_button_line };
