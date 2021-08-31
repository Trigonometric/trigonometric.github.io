import { r as registerInstance, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-select-button{position:relative;display:inline-flex;align-items:center;box-sizing:border-box;width:var(--ispui-select-button__width, 200px);height:var(--ispui-select-button__height, 30px);padding-right:var(--ispui-select-button__pr, 20px);padding-left:var(--ispui-select-button__pl, 10px);cursor:pointer;color:var(--ispui-select-button__color, #344a5e);border:var(--ispui-select-button__border, 1px solid #d9d9d9);border-radius:var(--ispui-select-button__br, 3px);outline:none;font-family:\"Ubuntu\", sans-serif;font-size:var(--ispui-select-button__fs, 14px);font-weight:var(--ispui-select-button__fw, 400)}.ispui-select-button::after{content:\"\";position:absolute;right:var(--ispui-select-button__arrow-right, 9px);bottom:var(--ispui-select-button__arrow-bottom, 12px);width:var(--ispui-select-button__arrow-size, 4px);height:var(--ispui-select-button__arrow-size, 4px);margin-left:auto;transition:0.2s transform;transform:rotateZ(-45deg);transform-origin:40% 60% 0;border:var(--ispui-select-button__arrow-border, 1px solid #344a5e);border-top:none;border-right:none}.ispui-select-button .ispui-select-button__text{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ispui-select-button_focusable:focus{border:var(--ispui-select-button__border-focus, 1px solid #0279c0)}.ispui-select-button_open::after{transition:0.2s transform;transform:rotateZ(135deg)}.ispui-select-button_disabled{pointer-events:none;opacity:0.5}";

const ButtonDefault = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** show focus state in UI */
    this.focusVisible = true;
  }
  render() {
    return (h(Host, { tabindex: "0", class: {
        'ispui-select-button': true,
        'ispui-select-button_open': this.open,
        'ispui-select-button_disabled': this.disabled,
        'ispui-select-button_focusable': this.focusVisible,
      } }, h("span", { class: "ispui-select-button__text" }, this.text), h("slot", null), " "));
  }
};
ButtonDefault.style = css;

export { ButtonDefault as ispui_select_button };
