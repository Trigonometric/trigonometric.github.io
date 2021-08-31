import { r as registerInstance, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-select-button-legend{position:relative;display:inline-flex;align-items:center;box-sizing:border-box;width:var(--ispui-select-button-legend__width, 200px);height:var(--ispui-select-button-legend__height, 30px);padding-right:var(--ispui-select-button-legend__pr, 20px);padding-left:var(--ispui-select-button-legend__pl, 10px);cursor:pointer;color:var(--ispui-select-button-legend__color, #344a5e);outline:none;font-family:\"Ubuntu\", sans-serif;font-size:var(--ispui-select-button-legend__fs, 14px);font-weight:var(--ispui-select-button-legend__fw, 400)}.ispui-select-button-legend::after{content:\"\";position:absolute;right:var(--ispui-select-button-legend__arrow-right, 10px);bottom:var(--ispui-select-button-legend__arrow-bottom, 13px);width:var(--ispui-select-button-legend__arrow-size, 4px);height:var(--ispui-select-button-legend__arrow-size, 4px);margin-left:auto;transition:0.2s transform;transform:rotateZ(-45deg);transform-origin:40% 60% 0;border:var(--ispui-select-button-legend__arrow-border, 1px solid #344a5e);border-top:none;border-right:none}.ispui-select-button-legend .ispui-select-button-legend__text{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ispui-select-button-legend_open::after{transition:0.2s transform;transform:rotateZ(135deg)}.ispui-select-button-legend_disabled{pointer-events:none;opacity:0.5}.ispui-select-button-legend__fieldset{position:absolute;top:0;right:0;bottom:0;left:0;margin:0;padding:0;pointer-events:none;border:var(--ispui-select-button-legend__border, 1px solid #d8d8d8);border-radius:var(--ispui-select-button-legend__br, 5px)}.ispui-select-button-legend_focusable:focus .ispui-select-button-legend__fieldset{border-color:var(--ispui-select-button-legend__border-color-focus, #0279c0)}.ispui-select-button-legend__legend{margin-left:10px;padding:0 5px;transform:translateY(-1px);color:var(--ispui-select-button-legend__legend-color, #b5b9c6);font-size:12px;line-height:0}.ispui-select-button-legend_focusable:focus .ispui-select-button-legend__legend{color:var(--ispui-select-button-legend__legend-color-focus, #0279c0)}";

const ButtonLegend = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** show focus state in UI */
    this.focusVisible = true;
  }
  render() {
    return (h(Host, { tabindex: "0", class: {
        'ispui-select-button-legend': true,
        'ispui-select-button-legend_open': this.open,
        'ispui-select-button-legend_disabled': this.disabled,
        'ispui-select-button-legend_focusable': this.focusVisible,
      } }, h("fieldset", { class: "ispui-select-button-legend__fieldset" }, h("legend", { class: "ispui-select-button-legend__legend" }, this.legend)), h("span", { class: "ispui-select-button-legend__text" }, this.text), h("slot", null), " "));
  }
};
ButtonLegend.style = css;

export { ButtonLegend as ispui_select_button_legend };
