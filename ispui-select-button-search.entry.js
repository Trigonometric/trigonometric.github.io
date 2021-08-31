import { r as registerInstance, e as createEvent, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-select-button-search{position:relative;display:inline-flex;align-items:center;box-sizing:border-box;width:var(--ispui-select-button-search__width, 200px);height:var(--ispui-select-button-search__height, 30px);padding-right:var(--ispui-select-button-search__pr, 20px);padding-left:var(--ispui-select-button-search__pl, 5px);cursor:pointer;color:var(--ispui-select-button-search__color, #344a5e);border:var(--ispui-select-button-search__border, 1px solid #d9d9d9);border-radius:var(--ispui-select-button-search__br, 3px);font-family:\"Ubuntu\", sans-serif;font-size:var(--ispui-select-button-search__fs, 14px);font-weight:var(--ispui-select-button-search__fw, 400)}.ispui-select-button-search::after{content:\"\";position:absolute;right:var(--ispui-select-button-search__arrow-right, 9px);bottom:var(--ispui-select-button-search__arrow-bottom, 12px);width:var(--ispui-select-button-search__arrow-size, 4px);height:var(--ispui-select-button-search__arrow-size, 4px);margin-left:auto;transition:0.2s transform;transform:rotateZ(-45deg);transform-origin:40% 60% 0;border:var(--ispui-select-button-search__arrow-border, 1px solid #344a5e);border-top:none;border-right:none}.ispui-select-button-search_active{border:var(--ispui-select-button-search__border-focus, 1px solid #0279c0)}.ispui-select-button-search_open::after{transition:0.2s transform;transform:rotateZ(135deg)}.ispui-select-button-search_disabled{pointer-events:none;opacity:0.5}.ispui-select-button-search__input{width:100%;height:20px;border:none;outline:none}";

const ButtonSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.search = createEvent(this, "search", 7);
    this.active = false;
  }
  render() {
    return (h(Host, { class: {
        'ispui-select-button-search': true,
        'ispui-select-button-search_active': this.active,
        'ispui-select-button-search_open': this.open,
        'ispui-select-button-search_disabled': this.disabled,
      } }, h("input", { class: "ispui-select-button-search__input", onFocus: () => (this.active = true), onBlur: () => (this.active = false), type: "text", value: this.text, onInput: (e) => this.search.emit(e.target.value) }), h("slot", null), " "));
  }
};
ButtonSearch.style = css;

export { ButtonSearch as ispui_select_button_search };
