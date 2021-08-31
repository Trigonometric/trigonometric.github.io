import { r as registerInstance, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-dropdown-footer{display:block;box-sizing:border-box;width:100%;padding:var(--ispui-dropdown-footer-padding, 0 20px 25px 20px);border-top:1px solid var(--ispui-dropdown-footer-border-color, transparent)}";

const ISPUIDropdownFooter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h(Host, { class: "ispui-dropdown-footer" });
  }
};
ISPUIDropdownFooter.style = css;

export { ISPUIDropdownFooter as ispui_dropdown_footer };
