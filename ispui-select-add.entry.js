import { r as registerInstance, e as createEvent, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-select-add{display:var(--ispui-select-add__display, inline-block);--ispui-button__fourth_text_regular:#0279c0;--ispui-button__fourth_text_hover:#0991e2;--ispui-button__fourth_text_active:#035b90;--ispui-button__padding-right:0;--ispui-button__padding-left:0}";

const Add = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.addClick = createEvent(this, "addClick", 7);
    /** text for button */
    this.text = 'Добавить';
    /** appearance */
    this.theme = 'default';
  }
  render() {
    const vmdci = h("ispui-button", { onClick: () => this.addClick.emit(), theme: "fourth" }, h("ispui-button-icon", { right: 10 }, h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "21", height: "21", viewBox: "0 0 21 21" }, h("g", { "fill-rule": "evenodd", transform: "translate(1 1)" }, h("circle", { cx: "9.5", cy: "9.5", r: "9.5" }), h("path", { "stroke-linecap": "round", "stroke-width": "1.5", d: "M9.5 6v8M5.5 10h8" })))), this.text);
    const layouts = {
      default: h("ispui-link", { onClick: () => this.addClick.emit(), type: "default-hover" }, this.text),
      vmdci,
    };
    return (h(Host, { class: "ispui-select-add" }, layouts[this.theme]));
  }
};
Add.style = css;

export { Add as ispui_select_add };
