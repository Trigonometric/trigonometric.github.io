import { r as registerInstance, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-dropdown-header{display:block;box-sizing:border-box;width:100%;padding:var(--ispui-dropdown-header-padding, 20px 20px 0 20px)}.ispui-dropdown-popup_has-cross .ispui-dropdown-header{padding:var(--ispui-dropdown-header-padding, 20px 55px 0 20px)}";

const ISPUIDropdownHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h(Host, { class: "ispui-dropdown-header" });
  }
};
ISPUIDropdownHeader.style = css;

export { ISPUIDropdownHeader as ispui_dropdown_header };
