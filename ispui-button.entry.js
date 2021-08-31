import { r as registerInstance, h, g as getElement } from './index-5b6825d9.js';

/** Button themes */
const themeNames = ['accent', 'primary', 'secondary', 'third', 'fourth', 'fifth', 'sixth'];
/** Button types */
const buttonTypes = ['button', 'submit', 'reset'];

const ispuiButtonCss = "ispui-button.ispui-button__host{-webkit-appearance:none}.ispui-button{box-sizing:border-box;width:var(--ispui-button__width, auto);min-width:var(--ispui-button__min-width, auto);max-width:var(--ispui-button__max-width, none);padding-top:0;padding-right:var(--ispui-button__padding-right, 14px);padding-bottom:0;padding-left:var(--ispui-button__padding-left, 14px);cursor:pointer;transition-duration:0.25s;transition-property:background-color, color, fill, stroke;text-align:center;vertical-align:var(--ispui-button__vertical-align, middle);white-space:nowrap;border-width:1px;border-style:solid;border-radius:3px;box-shadow:0 1px 2px 0 rgba(64, 61, 4, 0.44);font:var(--ispui-button__font, 14px Ubuntu, sans-serif);line-height:var(--ispui-button__line-height, 28px);stroke:var(--ispui-button__icon-stroke, #0279c0);fill:var(--ispui-button__icon-fill, transparent)}.ispui-button:hover{stroke:var(--ispui-button__icon-stroke_hover, #0991e2);fill:var(--ispui-button__icon-fill_hover, transparent);transition-duration:0.2s}.ispui-button:active{stroke:var(--ispui-button__icon-stroke_active, #035b90);fill:var(--ispui-button__icon-fill_active, transparent);transition-duration:0.1s}.ispui-button:disabled{cursor:not-allowed;color:var(--ispui-button__inactive_text_regular, #979797);border-color:transparent;background-color:var(--ispui-button__inactive_background_regular, #f4f4f4);box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.44);stroke:var(--ispui-button__inactive-icon-stroke, #979797);fill:var(--ispui-button__inactive-icon-fill, transparent)}.ispui-button:disabled:hover{color:var(--ispui-button__inactive_text_hover, #979797);border-color:transparent;background-color:var(--ispui-button__inactive_background_hover, #f4f4f4);stroke:var(--ispui-button__inactive-icon-stroke_hover, #979797);fill:var(--ispui-button__inactive-icon-fill_hover, transparent)}.ispui-button:disabled:active{color:var(--ispui-button__inactive_text_active, #979797);border-color:transparent;background-color:var(--ispui-button__inactive_background_active, #f4f4f4);stroke:var(--ispui-button__inactive-icon-stroke_active, #979797);fill:var(--ispui-button__inactive-icon-fill_active, transparent)}.ispui-button_theme_accent{color:var(--ispui-button__accent_text_regular, #344a5e);border-color:var(--ispui-button__accent_border_regular, transparent);background-color:var(--ispui-button__accent_background_regular, #f8e71c)}.ispui-button_theme_accent:hover{color:var(--ispui-button__accent_text_hover, #344a5e);border-color:var(--ispui-button__accent_border_hover, transparent);background-color:var(--ispui-button__accent_background_hover, #fff680)}.ispui-button_theme_accent:active{color:var(--ispui-button__accent_text_active, #344a5e);border-color:var(--ispui-button__accent_border_active, transparent);background-color:var(--ispui-button__accent_background_active, #ffd200)}.ispui-button_theme_primary{color:var(--ispui-button__primary_text_regular, #ffffff);border-color:var(--ispui-button__primary_border_regular, transparent);background-color:var(--ispui-button__primary_background_regular, #0279c0)}.ispui-button_theme_primary:hover{color:var(--ispui-button__primary_text_hover, #ffffff);border-color:var(--ispui-button__primary_border_hover, transparent);background-color:var(--ispui-button__primary_background_hover, #0891e2);box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.44)}.ispui-button_theme_primary:active{color:var(--ispui-button__primary_text_active, #ffffff);border-color:var(--ispui-button__primary_border_active, transparent);background-color:var(--ispui-button__primary_background_active, #025b90);box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.44)}.ispui-button_theme_secondary{color:var(--ispui-button__secondary_text_regular, #344a5e);border-color:var(--ispui-button__primary_border_regular, transparent);background-color:var(--ispui-button__secondary_background_regular, #c4e9ff);box-shadow:none}.ispui-button_theme_secondary:hover{color:var(--ispui-button__secondary_text_hover, #344a5e);border-color:var(--ispui-button__primary_border_hover, transparent);background-color:var(--ispui-button__secondary_background_hover, #eaf7ff)}.ispui-button_theme_secondary:active{color:var(--ispui-button__secondary_text_active, #344a5e);border-color:var(--ispui-button__primary_border_active, transparent);background-color:var(--ispui-button__secondary_background_active, #8ed5ff)}.ispui-button_theme_third{color:var(--ispui-button__third_text_regular, #ffffff);border-color:var(--ispui-button__third_border_regular, #ffffff);background-color:var(--ispui-button__third_background_regular, rgba(255, 255, 255, 0.4));box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.4)}.ispui-button_theme_third:hover{color:var(--ispui-button__third_text_hover, #ffffff);border-color:var(--ispui-button__third_border_hover, #ffffff);background-color:var(--ispui-button__third_background_hover, rgba(255, 255, 255, 0.5))}.ispui-button_theme_third:active{color:var(--ispui-button__third_text_active, #ffffff);border-color:var(--ispui-button__third_border_active, #ffffff);background-color:var(--ispui-button__third_background_active, rgba(255, 255, 255, 0.2))}.ispui-button_theme_fourth{color:var(--ispui-button__fourth_text_regular, #f4f4f4);border-color:var(--ispui-button__fourth_border_regular, transparent);background-color:var(--ispui-button__fourth_background_regular, transparent);box-shadow:none}.ispui-button_theme_fourth:hover{color:var(--ispui-button__fourth_text_hover, #f8e71c);border-color:var(--ispui-button__fourth_border_hover, transparent);background-color:var(--ispui-button__fourth_background_hover, transparent)}.ispui-button_theme_fourth:active{color:var(--ispui-button__fourth_text_active, #fffabb);border-color:var(--ispui-button__fourth_border_active, transparent);background-color:var(--ispui-button__fourth_background_active, transparent)}.ispui-button_theme_fourth:disabled{background-color:transparent;box-shadow:none}.ispui-button_theme_fifth{color:var(--ispui-button__fifth_text_regular, #282828);border-color:var(--ispui-button__fifth_border_regular, #282828);border-radius:4px;background-color:var(--ispui-button__fifth_background_regular, #ffffff);box-shadow:none;line-height:33px}.ispui-button_theme_fifth:hover{color:var(--ispui-button__fifth_text_hover, #ffffff);border-color:var(--ispui-button__fifth_border_hover, #282828);background-color:var(--ispui-button__fifth_background_hover, #282828)}.ispui-button_theme_fifth:active{color:var(--ispui-button__fifth_text_active, #d8d8d8);border-color:var(--ispui-button__fifth_border_active, #282828);background-color:var(--ispui-button__fifth_background_active, #3f3d3d)}.ispui-button_theme_fifth:focus{color:var(--ispui-button__fifth_text_focus, #ffffff);border-color:var(--ispui-button__fifth_border_focus, #282828);outline:0;background-color:var(--ispui-button__fifth_background_focus, #282828)}.ispui-button_theme_sixth{color:#0279c0;border:1px solid #0279c0;border-radius:3px;background-color:var(--ispui-button__sixth_background, transparent);box-shadow:none}.ispui-button_theme_sixth:hover{color:#0991e2;border-color:#0991e2;background-color:var(--ispui-button__sixth_background, transparent)}.ispui-button_theme_sixth:active{color:#035b90;border-color:#035b90;background-color:var(--ispui-button__sixth_background, transparent)}.ispui-button_theme_sixth:disabled{color:#979797;border-color:#d9d9d9;background-color:var(--ispui-button__sixth_background, transparent);box-shadow:none}.ispui-button_theme_sixth:disabled:hover{color:#979797;border-color:#d9d9d9;background-color:var(--ispui-button__sixth_background, transparent)}.ispui-button__disabled-wrapper{position:relative;display:inline-block}.ispui-button__disabled-wrapper::before{content:\"\";position:absolute;top:0;left:0;display:block;width:100%;height:100%;cursor:not-allowed}";

const Button = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** mousedown state */
    this._isMouseDown = false;
    /** property type for render */
    this.buttonType = 'button';
    /** property theme for render */
    this.buttonTheme = 'accent';
    /** disabled button */
    this.disabled = false;
    this.focusHandler = this.focusHandler.bind(this);
  }
  /**
   * Watch theme prop for validate it
   */
  validateTheme(newTheme) {
    if (!newTheme) {
      return;
    }
    if (themeNames.includes(newTheme)) {
      this.buttonTheme = newTheme;
    }
    else {
      console.warn(`Theme "${newTheme}" is not valid`);
    }
  }
  /**
   * Watch type prop for validate it
   */
  validateButtonType(newButtonType) {
    if (!newButtonType) {
      return;
    }
    if (buttonTypes.includes(newButtonType)) {
      this.buttonType = newButtonType;
    }
    else {
      console.warn(`Type "${newButtonType}" is not valid`);
    }
  }
  /**
   * Set mousedown state
   */
  mouseDownHandler() {
    this._isMouseDown = true;
  }
  /**
   * Unset mousedown state
   */
  mouseUpHandler() {
    this._isMouseDown = false;
  }
  /**
   * Call blur if mousedown, for not show focus state when click by button
   */
  focusHandler() {
    if (this._isMouseDown) {
      this._button.blur();
    }
  }
  /** Check and disable click if button is disabled */
  clickHandler(event) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
  /**
   * LYFECYCLE
   *
   * Validate props on willLoad hook
   */
  componentWillLoad() {
    this.validateTheme(this.theme);
    this.validateButtonType(this.type);
  }
  /**
   * LYFECYCLE
   *
   * Add event listener for button clicks
   */
  componentDidLoad() {
    this._addEventListenerForButton();
    this.hostEl.classList.add('ispui-button__host');
  }
  /**
   * LYFECYCLE
   *
   * Remove event listener for button clicks
   */
  disconnectedCallback() {
    this._removeEventListenerForButton();
  }
  /**
   * Add event listerner for button, for unset focus
   */
  _addEventListenerForButton() {
    if (this._button) {
      this._button.addEventListener('focus', this.focusHandler);
    }
  }
  /**
   * Remove event listener after unload component
   */
  _removeEventListenerForButton() {
    if (this._button) {
      this._button.removeEventListener('focus', this.focusHandler);
    }
  }
  render() {
    return (
    // Stencil doesn't allow conditional render with slots
    // So need to use simple `span` without classes when `disabled` equals to `false`
    // https://github.com/ionic-team/stencil/issues/399
    h("span", { class: { 'ispui-button__disabled-wrapper': this.disabled } }, h("button", { ref: (el) => (this._button = el), class: `ispui-button ispui-button_theme_${this.buttonTheme}`, type: this.buttonType, disabled: this.disabled }, h("slot", null))));
  }
  get hostEl() { return getElement(this); }
  static get watchers() { return {
    "theme": ["validateTheme"],
    "type": ["validateButtonType"]
  }; }
};
Button.style = ispuiButtonCss;

export { Button as ispui_button };
