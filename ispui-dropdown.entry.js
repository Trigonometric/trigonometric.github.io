import { r as registerInstance, e as createEvent, h, g as getElement } from './index-5b6825d9.js';

const ISPUIDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.close = createEvent(this, "close", 3);
    this.open = createEvent(this, "open", 3);
    this.closingStart = createEvent(this, "closingStart", 3);
    this.closeClick = createEvent(this, "closeClick", 3);
    /** Hover debounce time */
    this.hoverDebounceDefault = 300;
    /** Default offset between anchor element and dropdown */
    this.defaultDropdownOffset = 25;
    /** Pointer height (pixels) */
    this.pointerHeight = 20;
    /** Pointer width (pixels) */
    this.pointerWidth = 34;
    /** Pointer offset from dropdown border */
    this.pointerOffset = 20;
    /** Dropdown visibility status */
    this.isVisible = false;
    /** List of refs to the content elements */
    this.contentComponents = [];
    /** Minimal offset between dropdown and window border */
    this.borderOffset = 20;
    /** Flag for handle close button existence */
    this.isClose = true;
    /** Flag for handle pointer existence */
    this.hasPointer = true;
    /** Close dropdown on click */
    this.closeAfterClick = false;
    /** Flag for freeze fropdown direction */
    this.strictDirection = false;
    /** Flag for disable dropdown showing */
    this.disabled = false;
    /** Dropdown open type: click | hover */
    this.type = 'click';
    /** Dropdown direction */
    this.direction = 'bottom';
    /** Timeout debounce before show dropdown popup */
    this.hoverDebounce = this.hoverDebounceDefault;
    /** Dropdown alignment */
    this.alignment = 'auto';
    /** Offset between anchor element and dropdown */
    this.offset = this.defaultDropdownOffset;
    /** Close dropdown on outside click */
    this.closeOnOuterClick = true;
    /** ref to click handler method for adding and removing as event listener */
    this.clickHandler = this.toggleDropdown.bind(this);
    /** ref to mouseleave handler method for adding and removing as event listener */
    this.mouseLeaveHandler = this.handleMouseleave.bind(this);
    /** ref to mouseenter handler method for adding and removing as event listener */
    this.mouseEnterHandler = this.handleMouseenter.bind(this);
    /** ref to window scroll and resize handle method for adding and removing as event listener */
    this.windowScrollAndResizeHandler = this.resetDropdown.bind(this);
    /** ref to document click handle method for adding and removing as event listener */
    this.documentClickHandler = this.handleDocumentClick.bind(this);
  }
  /**
   * Validate value of hoverDebounce prop
   * @param newHoverDebounce - timeout debounce before show dropdown popup
   */
  validateHoverDebounce(newHoverDebounce) {
    if (isNaN(newHoverDebounce)) {
      return;
    }
    this.hoverDebounce = newHoverDebounce;
  }
  /**
   * Update event listeners on the anchor element
   * @param type - type of the action
   */
  updateToggleTriggerListeners(type) {
    const h = this.hostEl;
    if (!h) {
      return;
    }
    if (['click', 'hover'].includes(type) && this.disabled) {
      return;
    }
    switch (type) {
      case 'click':
        {
          h.removeEventListener('mouseleave', this.mouseLeaveHandler);
          h.removeEventListener('mouseenter', this.mouseEnterHandler);
          h.addEventListener('click', this.clickHandler);
        }
        break;
      case 'hover':
        {
          h.addEventListener('mouseleave', this.mouseLeaveHandler);
          h.addEventListener('mouseenter', this.mouseEnterHandler);
          h.removeEventListener('click', this.clickHandler);
        }
        break;
      case 'disabled':
        {
          h.removeEventListener('mouseenter', this.mouseEnterHandler);
          h.removeEventListener('click', this.clickHandler);
        }
        break;
      case 'clear': {
        h.removeEventListener('mouseleave', this.mouseLeaveHandler);
        h.removeEventListener('mouseenter', this.mouseEnterHandler);
        h.removeEventListener('click', this.clickHandler);
      }
    }
  }
  /**
   * Set event listeners according disabled state
   * @param disable - wether the acnhor is disabled now
   */
  setDisabledTriggers(disable) {
    this.updateToggleTriggerListeners(disable ? 'disabled' : this.type);
  }
  /**
   * Validate dropdown direction
   * @param newDirection - dropdown direction
   */
  validateDirection(newDirection) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (['bottom', 'right', 'left', 'top'].includes(newDirection)) {
      this.currentDirection = newDirection;
    }
  }
  /**
   * LIFECYCLE
   *
   * Validate props
   */
  componentWillLoad() {
    this.validateHoverDebounce(this.hoverDebounce);
    this.validateDirection(this.direction);
  }
  /**
   * LIFECYCLE
   *
   * Form dropdown content
   */
  componentDidLoad() {
    var _a, _b;
    (_a = this.instance) === null || _a === void 0 ? void 0 : _a.remove();
    for (const child of Array.from(this.hostEl.children)) {
      if (child.slot === 'anchor') {
        this.anchorEl = child;
      }
      else if (child === this.instance) {
        continue;
      }
      else {
        this.contentComponents.push(child);
        child.remove();
      }
    }
    (_b = this.instance) === null || _b === void 0 ? void 0 : _b.addEventListener('animationend', this.listenDropdownAnimation.bind(this));
  }
  /**
   * LIFECYCLE
   *
   * Add fresh event listeners for the anhor
   */
  connectedCallback() {
    this.updateToggleTriggerListeners(this.type);
  }
  /**
   * LIFECYCLE
   *
   * Clear event listeners
   */
  disconnectedCallback() {
    if (this.instance) {
      this.instance.removeEventListener('animationend', this.listenDropdownAnimation.bind(this));
      this.instance.remove();
    }
    if (this.hoverTimeout) {
      window.clearTimeout(this.hoverTimeout);
    }
    this.updateToggleTriggerListeners('clear');
  }
  /**
   * Handle mouse enter on anchor element
   */
  handleMouseenter() {
    if (this.hoverTimeout) {
      window.clearTimeout(this.hoverTimeout);
    }
    if (!this.isVisible) {
      this.hoverTimeout = window.setTimeout(() => this.showDropdown(), this.hoverDebounce);
    }
  }
  handleCloseClick() {
    this.closeClick.emit();
    this.closeDropdown();
  }
  /**
   * Handle mouse leave on anchor element
   * @param isOnPopup - is event fired on the popup instance (not on the anchor)
   */
  handleMouseleave(isOnPopup = false) {
    if (isOnPopup && this.type === 'click') {
      return;
    }
    if (this.hoverTimeout) {
      window.clearTimeout(this.hoverTimeout);
    }
    if (this.isVisible) {
      this.hoverTimeout = window.setTimeout(() => this.closeDropdown(), this.hoverDebounce);
    }
  }
  /**
   * Reset dropdown
   */
  resetDropdown() {
    if (this.resetTimeout) {
      window.clearTimeout(this.resetTimeout);
    }
    this.resetTimeout = window.setTimeout(() => {
      if (this.isVisible && this.instance && this.anchorEl) {
        this.setupDropdown();
      }
    }, 100);
  }
  /**
   * Handle document clicks
   * @param e - click event
   */
  handleDocumentClick(event) {
    var _a;
    if (!this.closeOnOuterClick) {
      return;
    }
    if (this.instance) {
      const target = event.target;
      const hasPopupInPath = (_a = event
        .composedPath()) === null || _a === void 0 ? void 0 : _a.some((element) => { var _a; return ((_a = element === null || element === void 0 ? void 0 : element.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'ispui-dropdown-popup'; });
      const canCloseAfterClick = this.closeAfterClick && this.instance.contains(target);
      const isClickedOutside = !this.instance.contains(target) && !this.hostEl.contains(target) && !hasPopupInPath;
      if (canCloseAfterClick || isClickedOutside) {
        this.closeDropdown();
      }
    }
  }
  /**
   * Show dropdown method
   */
  async showDropdown() {
    var _a;
    this.isVisible = true;
    (_a = this.instance) === null || _a === void 0 ? void 0 : _a.classList.remove('ispui-dropdown_closing');
    if (this.instance) {
      document.body.appendChild(this.instance);
      this.contentComponents.forEach((com) => { var _a, _b; return (_b = (_a = this.instance) === null || _a === void 0 ? void 0 : _a.querySelector('.ispui-dropdown-popup__container')) === null || _b === void 0 ? void 0 : _b.appendChild(com); });
      await this.setupDropdown();
      this.toggleDropdownDocumentListeners(true);
      this.open.emit();
    }
  }
  /**
   * Close dropdown method
   */
  async closeDropdown() {
    var _a;
    this.closingStart.emit();
    (_a = this.instance) === null || _a === void 0 ? void 0 : _a.classList.add('ispui-dropdown_closing');
  }
  /**
   * Set pointer position calc function
   * @param callback - callback for calculate pointer position
   */
  async setPointerPositionCallback(callback) {
    this.pointerPositionCallback = callback;
  }
  /**
   * Calculate height and position for dropdown instance
   */
  async setupDropdown() {
    if (!this.instance || !this.anchorEl) {
      return;
    }
    this.instance.style.height = '';
    this.instance.style.maxHeight = '';
    this.instance.style.maxWidth = '';
    const anchorRect = this.anchorEl.getBoundingClientRect();
    this.setMinHeight();
    this.setDropdownDirection(anchorRect);
    this.setHeight();
    this.setMaxWidth(anchorRect);
    this.setMaxHeight(anchorRect);
    this.setDropdownPosition(anchorRect);
    this.setPointerPosition(anchorRect);
  }
  /**
   * Toggle global document and window event listeners for adjusting dropdown position or hiding it
   * @param isAdd - add listeners, if not - remove them
   */
  toggleDropdownDocumentListeners(isAdd = false) {
    if (isAdd) {
      window.addEventListener('resize', this.windowScrollAndResizeHandler);
      window.addEventListener('scroll', this.windowScrollAndResizeHandler);
      document.addEventListener('click', this.documentClickHandler);
    }
    else {
      window.removeEventListener('resize', this.windowScrollAndResizeHandler);
      window.removeEventListener('scroll', this.windowScrollAndResizeHandler);
      document.removeEventListener('click', this.documentClickHandler);
    }
  }
  /**
   * Remove dropdown after fade animation out
   * @param e - animation event
   */
  listenDropdownAnimation(e) {
    if (!this.instance) {
      return;
    }
    if (e.type === 'animationend' && e.animationName === 'fade-out') {
      this.isVisible = false;
      this.contentComponents.forEach((com) => com.remove());
      this.instance.remove();
      this.close.emit();
      this.toggleDropdownDocumentListeners();
    }
  }
  /**
   * Toggle dropdown state
   */
  toggleDropdown() {
    if (!this.isVisible) {
      this.showDropdown();
    }
    else {
      this.closeDropdown();
    }
  }
  /**
   * Set dropdown direction
   * @param anchorRect - DOMrect of anchor element
   */
  setDropdownDirection(anchorRect) {
    if (!this.instance) {
      return;
    }
    if (this.strictDirection) {
      this.currentDirection = this.direction;
      return;
    }
    const offsets = this.offset + this.borderOffset;
    const popupAreaX = this.instance.clientWidth + offsets;
    const popupAreaY = this.instance.clientHeight + offsets;
    const space = {
      top: anchorRect.top,
      bottom: document.documentElement.clientHeight - anchorRect.bottom,
      left: anchorRect.left,
      right: document.documentElement.clientWidth - anchorRect.right,
    };
    const isSpaceEnough = (dir) => ({
      top: anchorRect.top >= popupAreaY,
      bottom: document.documentElement.clientHeight - anchorRect.bottom >= popupAreaY,
      left: anchorRect.left >= popupAreaX,
      right: document.documentElement.clientWidth - anchorRect.right >= popupAreaX,
    }[dir]);
    const altDirection = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }[this.direction];
    if (isSpaceEnough(this.direction) || space[this.direction] >= space[altDirection]) {
      this.currentDirection = this.direction;
    }
    else {
      this.currentDirection = altDirection;
    }
  }
  /**
   * Set dropdown position
   * @param anchorRect - DOMrect of anchor element
   */
  setDropdownPosition(anchorRect) {
    if (!this.instance) {
      return;
    }
    this.instance.style.transform = '';
    switch (this.currentDirection) {
      case 'top':
        this.instance.style.top = `${window.scrollY + anchorRect.top - this.offset}px`;
        this.instance.style.transform = 'translateY(-100%)';
        this.setHorizontalAlign(anchorRect);
        break;
      case 'bottom':
        this.instance.style.top = `${window.scrollY + anchorRect.bottom + this.offset}px`;
        this.setHorizontalAlign(anchorRect);
        break;
      case 'left':
        this.instance.style.left = `${window.scrollX + anchorRect.left - this.offset}px`;
        this.instance.style.transform = 'translateX(-100%)';
        this.setVerticalAlign(anchorRect);
        break;
      case 'right':
        this.instance.style.left = `${window.scrollX + anchorRect.right + this.offset}px`;
        this.setVerticalAlign(anchorRect);
        break;
    }
  }
  /**
   * Set dropdown height
   */
  setHeight() {
    if (this.instance) {
      this.instance.style.height = `${this.instance.getBoundingClientRect().height}px`;
    }
  }
  /**
   * Set dropdown max width
   * @param anchorRect - DOMrect of anchor element
   */
  setMaxWidth(anchorRect) {
    if (!this.instance) {
      return;
    }
    this.instance.style.maxWidth = '';
    const dropdownStyles = getComputedStyle(this.instance);
    const minWidth = parseInt(dropdownStyles.minWidth);
    let maxWidth = parseInt(dropdownStyles.maxWidth);
    const windowWidth = document.documentElement.clientWidth;
    if (this.currentDirection === 'left') {
      maxWidth = Math.min(maxWidth, anchorRect.left - this.borderOffset - this.offset);
    }
    else if (this.currentDirection === 'right') {
      maxWidth = Math.min(maxWidth, windowWidth - this.borderOffset - this.offset - anchorRect.right);
    }
    else {
      switch (this.alignment) {
        case 'start':
          maxWidth = Math.min(maxWidth, windowWidth - anchorRect.left - this.borderOffset);
          break;
        case 'middle':
          maxWidth = Math.min(maxWidth, (Math.min(anchorRect.left + anchorRect.width / 2, windowWidth - anchorRect.left - anchorRect.width / 2) - this.borderOffset) *
            2);
          break;
        case 'end':
          maxWidth = Math.min(maxWidth, anchorRect.right - this.borderOffset);
          break;
        case 'auto':
          maxWidth = Math.min(maxWidth, windowWidth - this.borderOffset * 2);
          break;
      }
    }
    this.instance.style.maxWidth = `${Math.max(maxWidth, minWidth)}px`;
  }
  /**
   * Set dropdown min height
   */
  setMinHeight() {
    if (!this.instance) {
      return;
    }
    const currentMinHeight = parseInt(getComputedStyle(this.instance).minHeight) || 0;
    let minHeight = 0;
    for (const child of Array.from(this.instance.children)) {
      const childStyle = getComputedStyle(child);
      if (parseInt(childStyle.minHeight)) {
        minHeight += parseInt(childStyle.minHeight);
      }
      else {
        minHeight += parseInt(childStyle.height);
      }
    }
    this.instance.style.minHeight = `${Math.max(currentMinHeight, minHeight)}px`;
  }
  /**
   * Set dropdown max height
   * @param anchorRect - DOMrect of anchor element
   */
  setMaxHeight(anchorRect) {
    if (!this.instance) {
      return;
    }
    this.instance.style.maxHeight = '';
    const dropdownStyles = getComputedStyle(this.instance);
    const minHeight = parseInt(dropdownStyles.minHeight);
    let maxHeight = parseInt(dropdownStyles.maxHeight);
    const windowHeight = document.documentElement.clientHeight;
    if (this.currentDirection === 'top') {
      maxHeight = Math.min(maxHeight, anchorRect.top - this.borderOffset - this.offset);
    }
    else if (this.currentDirection === 'bottom') {
      maxHeight = Math.min(maxHeight, windowHeight - anchorRect.bottom - this.borderOffset - this.offset);
    }
    else {
      switch (this.alignment) {
        case 'start':
          maxHeight = Math.min(maxHeight, windowHeight - anchorRect.top - this.borderOffset);
          break;
        case 'middle':
          maxHeight = Math.min(maxHeight, (Math.min(anchorRect.top + anchorRect.height / 2, windowHeight - anchorRect.top - anchorRect.height / 2) - this.borderOffset) *
            2);
          break;
        case 'end':
          maxHeight = Math.min(maxHeight, anchorRect.bottom - this.borderOffset);
          break;
        case 'auto':
          maxHeight = Math.min(maxHeight, windowHeight - this.borderOffset * 2);
          break;
      }
    }
    this.instance.style.maxHeight = `${Math.max(minHeight, maxHeight)}px`;
  }
  /**
   * Set dropdown horizontal position from alignment
   * @param anchorRect - DOMrect of anchor element
   */
  setHorizontalAlign(anchorRect) {
    if (!this.instance) {
      return;
    }
    const dropdownRect = this.instance.getBoundingClientRect();
    switch (this.alignment) {
      case 'start':
        this.instance.style.left = `${window.scrollX + anchorRect.left}px`;
        break;
      case 'auto':
      case 'middle':
        const anchorCenter = window.scrollX + anchorRect.left + anchorRect.width / 2;
        const rightBorder = anchorCenter + dropdownRect.width / 2;
        const leftBorder = anchorCenter - dropdownRect.width / 2;
        if (leftBorder < window.scrollX + this.borderOffset) {
          const minLeft = Math.min(window.scrollX + this.borderOffset, window.scrollX + anchorRect.right - (this.pointerWidth / 2 + this.pointerOffset));
          this.instance.style.left = `${minLeft}px`;
        }
        else if (rightBorder > window.scrollX + document.documentElement.clientWidth - this.borderOffset) {
          const minRight = Math.max(window.scrollX + document.documentElement.clientWidth - this.borderOffset, window.scrollX + anchorRect.left + this.pointerWidth / 2 + this.pointerOffset);
          this.instance.style.left = `${minRight - dropdownRect.width}px`;
        }
        else {
          this.instance.style.left = `${leftBorder}px`;
        }
        break;
      case 'end':
        this.instance.style.left = `${window.scrollX + anchorRect.right - dropdownRect.width}px`;
        break;
    }
  }
  /**
   * Set dropdown vertical position from alignment
   * @param anchorRect - DOMrect of anchor element
   */
  setVerticalAlign(anchorRect) {
    if (!this.instance) {
      return;
    }
    const dropdownRect = this.instance.getBoundingClientRect();
    switch (this.alignment) {
      case 'start':
        this.instance.style.top = `${window.scrollY + anchorRect.top}px`;
        break;
      case 'auto':
      case 'middle':
        const anchorCenter = window.scrollY + anchorRect.top + anchorRect.height / 2;
        const topBorder = anchorCenter - dropdownRect.height / 2;
        const bottomBorder = anchorCenter + dropdownRect.height / 2;
        if (topBorder < window.scrollY + this.borderOffset) {
          const minTop = Math.min(window.scrollY + this.borderOffset, window.scrollY + anchorRect.bottom - (this.pointerWidth / 2 + this.pointerOffset));
          this.instance.style.top = `${minTop}px`;
        }
        else if (bottomBorder > window.scrollY + document.documentElement.clientHeight - this.borderOffset) {
          const maxBottom = Math.max(window.scrollY + document.documentElement.clientHeight - this.borderOffset, window.scrollY + anchorRect.bottom + (this.pointerWidth / 2 + this.pointerOffset));
          this.instance.style.top = `${maxBottom - dropdownRect.height}px`;
        }
        else {
          this.instance.style.top = `${topBorder}px`;
        }
        break;
      case 'end':
        this.instance.style.top = `${window.scrollY + anchorRect.bottom - dropdownRect.height}px`;
        break;
    }
  }
  /**
   * Set pointer position
   * @param anchorRect - DOMrect of anchor element
   */
  setPointerPosition(anchorRect) {
    if (!this.instance) {
      return;
    }
    const dropdownRect = this.instance.getBoundingClientRect();
    /** Pointer offset from dropdown border */
    const POINTER_OFFSET = 20;
    if (this.pointerPositionCallback) {
      const pos = this.pointerPositionCallback(anchorRect, dropdownRect, this.pointerWidth);
      switch (this.currentDirection) {
        case 'top':
        case 'bottom':
          this.instance.style.setProperty('--ispui-dropdown__pointer-left', `${pos}px`);
          break;
        case 'left':
        case 'right':
          this.instance.style.setProperty('--ispui-dropdown__pointer-top', `${pos}px`);
          break;
      }
      return;
    }
    switch (this.currentDirection) {
      case 'top':
      case 'bottom':
        const anchorCenter = anchorRect.left + anchorRect.width / 2;
        let xPos = anchorCenter - dropdownRect.left - this.pointerWidth / 2;
        if (anchorCenter < dropdownRect.left + POINTER_OFFSET + this.pointerWidth / 2) {
          xPos = POINTER_OFFSET;
        }
        else if (anchorCenter > dropdownRect.right - POINTER_OFFSET - this.pointerWidth / 2) {
          xPos = dropdownRect.width - POINTER_OFFSET - this.pointerWidth;
        }
        this.instance.style.setProperty('--ispui-dropdown__pointer-left', `${xPos}px`);
        break;
      case 'left':
      case 'right':
        const anchorHeightCenter = anchorRect.top + anchorRect.height / 2;
        let yPos = anchorHeightCenter - dropdownRect.top - this.pointerWidth / 2;
        if (anchorHeightCenter < dropdownRect.top + POINTER_OFFSET + this.pointerWidth / 2) {
          yPos = POINTER_OFFSET;
        }
        else if (anchorHeightCenter > dropdownRect.bottom - POINTER_OFFSET - this.pointerWidth / 2) {
          yPos = dropdownRect.height - POINTER_OFFSET - this.pointerWidth;
        }
        this.instance.style.setProperty('--ispui-dropdown__pointer-top', `${yPos}px`);
        break;
    }
  }
  render() {
    return [
      h("slot", { name: "anchor" }),
      h("ispui-dropdown-popup", { class: this.popupClass || 'ispui-dropdown-popup-stub-class', isClose: this.isClose, hasPointer: this.hasPointer, direction: this.currentDirection, onCloseClicked: () => this.handleCloseClick(), onMouseEnter: () => this.handleMouseenter(), onMouseLeave: () => this.handleMouseleave(true), ref: (el) => (this.instance = el), zIndex: this.zIndex }),
    ];
  }
  get hostEl() { return getElement(this); }
  static get watchers() { return {
    "hoverDebounce": ["validateHoverDebounce"],
    "type": ["updateToggleTriggerListeners"],
    "disabled": ["setDisabledTriggers"],
    "direction": ["validateDirection"]
  }; }
};

export { ISPUIDropdown as ispui_dropdown };
