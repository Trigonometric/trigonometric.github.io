import { r as registerInstance, e as createEvent, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-select-apply{display:block}.ispui-select-apply__button{margin-right:var(--ispui-select-apply__button-mr, 20px)}";

const Apply = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.apply = createEvent(this, "apply", 7);
    this.reset = createEvent(this, "reset", 7);
    /** apply button text */
    this.applyText = 'Применить';
    /** reset button text */
    this.resetText = 'Сбросить';
    /** wether to show reset button */
    this.withReset = true;
  }
  render() {
    return (h(Host, { class: "ispui-select-apply" }, h("ispui-button", { class: "ispui-select-apply__button", onClick: () => this.apply.emit(), theme: "primary" }, this.applyText), this.withReset && (h("ispui-link", { onClick: () => this.reset.emit(), type: "default-hover" }, this.resetText))));
  }
};
Apply.style = css;

export { Apply as ispui_select_apply };
