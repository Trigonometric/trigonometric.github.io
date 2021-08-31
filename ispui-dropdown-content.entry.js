import { r as registerInstance, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-dropdown-content{display:var(--ispui-dropdown-content-display, flex);overflow:var(--ispui-dropdown-content-overflow, hidden);min-height:var(--ispui-dropdown-content-min-height, 50px);max-height:var(--ispui-dropdown-content-max-height, inherit);padding:var(--ispui-dropdown-content-padding, 20px)}.ispui-dropdown-popup_has-cross .ispui-dropdown-content{padding:var(--ispui-dropdown-content-padding, 20px 50px 20px 20px)}.ispui-dropdown-popup_has-cross ispui-dropdown-header+.ispui-dropdown-content{padding:var(--ispui-dropdown-content-padding, 20px 20px 20px 20px)}.ispui-dropdown-content__wrapper{overflow-y:auto;max-height:inherit;padding-right:var(--ispui-dropdown-content-pr, 20px);scrollbar-color:var(--ispui-dropdown-scroll-indicator-color, #344a5e) var(--ispui-dropdown-scroll-background-color, #ececec);scrollbar-width:thin;}.ispui-dropdown-content__wrapper::-webkit-scrollbar,.ispui-dropdown-content__wrapper::-webkit-scrollbar-track,.ispui-dropdown-content__wrapper::-webkit-scrollbar-thumb{width:7px;height:7px;border-radius:var(--ispui-dropdown-scrollborder-radius, 10px)}.ispui-dropdown-content__wrapper::-webkit-scrollbar{background:var(--ispui-dropdown-scroll-background-color, #ececec)}.ispui-dropdown-content__wrapper::-webkit-scrollbar-thumb{background:var(--ispui-dropdown-scroll-indicator-color, #344a5e)}.ispui-dropdown-content__wrapper::-webkit-scrollbar-button{display:none}";

const ISPUIDropdownContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { class: "ispui-dropdown-content" }, h("div", { class: "ispui-dropdown-content__wrapper" }, h("slot", null))));
  }
};
ISPUIDropdownContent.style = css;

export { ISPUIDropdownContent as ispui_dropdown_content };
