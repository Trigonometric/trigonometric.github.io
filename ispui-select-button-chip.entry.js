import { r as registerInstance, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-select-button-chip{position:relative;display:inline-flex;align-items:center;box-sizing:border-box;height:var(--ispui-select-button-chip__height, 30px);padding-right:var(--ispui-select-button-chip__pr, 20px);padding-left:var(--ispui-select-button-chip__pl, 10px);cursor:pointer;color:var(--ispui-select-button-chip__color, #1a76e2);border:var(--ispui-select-button-chipt__border, 1px solid #1a76e2);border-radius:100px;outline:none;font-family:\"Ubuntu\", sans-serif;font-size:var(--ispui-select-button-chip__fs, 14px);font-weight:var(--ispui-select-button-chip__fw, 400)}.ispui-select-button-chip::after{content:\"\";position:absolute;right:var(--ispui-select-button-chip__arrow-right, 10px);width:var(--ispui-select-button-chip__arrow-size, 3px);height:var(--ispui-select-button-chip__arrow-size, 3px);margin-left:auto;transition:0.2s transform;transform:rotateZ(-45deg);transform-origin:40% 60% 0;border:var(--ispui-select-button-chip__arrow-border, 1px solid #1a76e2);border-top:none;border-right:none}.ispui-select-button-chip .ispui-select-button-chip__text{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ispui-select-button-chip_focusable:focus{padding-left:var(--ispui-select-button-chip__pl-focus, 9px);border:var(--ispui-select-button-chipt__border-focus, 2px solid #145bac)}.ispui-select-button-chip.ispui-select-button-chip_open::after{transition:0.2s transform;transform:rotateZ(135deg)}.ispui-select-button-chip_disabled{pointer-events:none;opacity:0.5}";

const ButtonChip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** show focus state in UI */
    this.focusVisible = true;
  }
  render() {
    return (h(Host, { tabindex: "0", class: {
        'ispui-select-button-chip': true,
        'ispui-select-button-chip_open': this.open,
        'ispui-select-button-chip_disabled': this.disabled,
        'ispui-select-button-chip_focusable': this.focusVisible,
      } }, h("span", { class: "ispui-select-button-chip__text" }, this.text), h("slot", null), " "));
  }
};
ButtonChip.style = css;

export { ButtonChip as ispui_select_button_chip };
