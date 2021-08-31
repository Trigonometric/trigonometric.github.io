import { r as registerInstance, e as createEvent, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-select-search{display:block}.ispui-select-search[hidden]{display:none}.ispui-select-search_input{box-sizing:border-box;width:100%;height:var(--ispui-select-search__height, 30px);padding:var(--ispui-select-search__padding, 0 8px);border:var(--ispui-select-search__border, 1px solid #d9d9d9);border-radius:var(--ispui-select-search__br, 3px);outline:none}";

const SearchDefault = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.search = createEvent(this, "search", 7);
    /** search value */
    this.value = '';
  }
  updateValue(newVal) {
    this.search.emit(newVal);
  }
  render() {
    return (h(Host, { class: { 'ispui-select-search': true } }, h("input", { value: this.value, class: "ispui-select-search_input", type: "text", onInput: (e) => (this.value = e.target.value) })));
  }
  static get watchers() { return {
    "value": ["updateValue"]
  }; }
};
SearchDefault.style = css;

export { SearchDefault as ispui_select_search };
