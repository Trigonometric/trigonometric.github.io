import { r as registerInstance, h, f as Host } from './index-5b6825d9.js';

const ButtonIcon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** default styles */
    this._styles = {
      position: 'relative',
      display: 'inline-block',
      'line-height': '0',
    };
    /** SVG icon top offset (default 5)*/
    this.top = 5;
    /** SVG icon right offset (default 20)*/
    this.right = 20;
  }
  /**
   * Convert number values to px and set icon top offset
   */
  convertTopOffset(top) {
    if (!top) {
      return;
    }
    if (typeof top !== 'number') {
      console.warn('Parameter "top" must be number value');
    }
    else {
      this.topOffset = `${top}px`;
    }
  }
  /**
   * Convert number values to px and set icon right padding
   */
  convertLeftPadding(left) {
    if (!left) {
      return;
    }
    if (typeof left !== 'number') {
      console.warn('Parameter "left" must be number value');
    }
    else {
      this.leftPadding = `${left}px`;
    }
  }
  /**
   * Convert number values to px and set icon left padding
   */
  convertRightPadding(right) {
    if (!right) {
      return;
    }
    if (typeof right !== 'number') {
      console.warn('Parameter "right" must be number value');
    }
    else {
      this.rightPadding = `${right}px`;
    }
  }
  /**
   * Get props values when component initially loads
   */
  componentWillLoad() {
    this.convertLeftPadding(this.left);
    this.convertRightPadding(this.right);
    this.convertTopOffset(this.top);
  }
  /**
   * render function
   */
  render() {
    const styles = Object.assign(Object.assign({}, this._styles), { top: this.topOffset, paddingRight: this.rightPadding, paddingLeft: this.leftPadding });
    return (h(Host, { style: styles }, h("slot", null)));
  }
  static get watchers() { return {
    "top": ["convertTopOffset"],
    "left": ["convertLeftPadding"],
    "right": ["convertRightPadding"]
  }; }
};

export { ButtonIcon as ispui_button_icon };
