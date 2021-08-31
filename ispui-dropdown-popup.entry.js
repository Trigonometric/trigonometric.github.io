import { r as registerInstance, e as createEvent, h, f as Host } from './index-5b6825d9.js';

const css = ".ispui-dropdown-popup{position:absolute;display:inline-block;min-width:var(--ispui-dropdown-min-width, 200px);max-width:var(--ispui-dropdown-max-width, 640px);min-height:var(--ispui-dropdown-min-height, 60px);max-height:var(--ispui-dropdown-max-height, calc(100vh - 40px));animation:fade-in var(--ispui-dropdown-animation-duration, 0.4s) ease 1 forwards;opacity:0}.ispui-dropdown-popup.ispui-dropdown_closing{animation:fade-out var(--ispui-dropdown-animation-duration, 0.4s) ease 1 forwards}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}@keyframes fade-out{0%{opacity:1}100%{opacity:0}}.ispui-dropdown__close-btn{position:absolute;top:var(--ispui-dropdown-close-top, 15px);right:var(--ispui-dropdown-close-right, 15px)}.ispui-dropdown-popup__container{position:relative;display:flex;flex-direction:column;min-height:var(--ispui-dropdown-popup__container_min-height, 100%);max-height:var(--ispui-dropdown-popup__container_max-height, 100%);border:var(--ispui-dropdown-border, none);border-radius:var(--ispui-dropdown-border-radius, 5px);background-color:var(--ispui-dropdown-bg-color, #ffffff);box-shadow:var(--ispui-dropdown-popup__container_box-shadow, -1px 2px 7px rgba(52, 74, 94, 0.56))}.ispui-dropdown__pointer{position:absolute;top:1px;left:var(--ispui-dropdown__pointer-left, 50%);overflow:hidden;width:var(--ispui-dropdown__pointer-wrapper-width, 34px);height:var(--ispui-dropdown__pointer-wrapper-height, 22px);transform:translateY(-100%)}.ispui-dropdown__pointer::before{content:\"\";position:absolute;bottom:0;left:50%;width:var(--ispui-dropdown__pointer-width, 18px);height:var(--ispui-dropdown__pointer-height, 18px);transform:translate(-50%, 50%) rotate(45deg) skew(8deg, 8deg) scale(1.3);border:var(--ispui-dropdown__pointer-border, none);background-color:var(--ispui-dropdown-bg-color, #ffffff);box-shadow:0 0 3px rgba(52, 74, 94, 0.35)}.ispui-dropdown-popup_direction_left .ispui-dropdown__pointer{top:var(--ispui-dropdown__pointer-top, 50%);left:100%;transform:translate(-18%, 25%) rotateZ(90deg);transform-origin:center}.ispui-dropdown-popup_direction_right .ispui-dropdown__pointer{top:var(--ispui-dropdown__pointer-top, 50%);left:0;transform:translate(-81%, 25%) rotateZ(-90deg);transform-origin:center}.ispui-dropdown-popup_direction_top .ispui-dropdown__pointer{top:calc(100% - 1px);transform:rotate(180deg)}.ispui-dropdown-popup_direction_top .ispui-dropdown__pointer::before{box-shadow:1px 0 6px rgba(52, 74, 94, 0.56)}";

const ISPUIDropdownPopup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.closeClicked = createEvent(this, "closeClicked", 7);
    /** Flag for handle close button existence */
    this.isClose = true;
    /** Flag for handle pointer existence */
    this.hasPointer = true;
    /** Dropdown direction */
    this.direction = 'bottom';
    /** Dropdown z-index */
    this.zIndex = 100;
  }
  /**
   * Emit event when close button clicked
   */
  handleCloseClick() {
    this.closeClicked.emit(null);
  }
  render() {
    const hostClasses = ['ispui-dropdown-popup'];
    this.isClose && hostClasses.push('ispui-dropdown-popup_has-cross');
    this.hasPointer && hostClasses.push('ispui-dropdown-popup_has-pointer');
    this.direction && hostClasses.push(`ispui-dropdown-popup_direction_${this.direction}`);
    return (h(Host, { class: hostClasses.join(' '), style: { zIndex: String(this.zIndex) } }, h("div", { class: "ispui-dropdown-popup__container" }, this.hasPointer && h("div", { class: "ispui-dropdown__pointer" }), this.isClose && (h("ispui-close", { class: "ispui-dropdown__close-btn", onClick: () => this.handleCloseClick(), theme: "gray" })))));
  }
};
ISPUIDropdownPopup.style = css;

export { ISPUIDropdownPopup as ispui_dropdown_popup };
