import { r as registerInstance, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-select-text{display:block;color:var(--ispui-select-text__color, #344a5e);font-family:\"Ubuntu\", sans-serif;font-size:var(--ispui-select-text__fs, 14px)}.ispui-select-text[hidden]{display:none}";

const Text = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h(Host, { class: "ispui-select-text" }, this.text);
  }
};
Text.style = css;

export { Text as ispui_select_text };
