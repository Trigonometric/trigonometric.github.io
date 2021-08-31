import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-5b6825d9.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v2.6.0 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find(s => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) || s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = "";
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return __sc_import_panel(/* webpackChunkName: "polyfills-dom" */ './dom-1b195079.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], { type: 'application/javascript' }));
                mod = new Promise(resolve => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["ispui-select-add",[[0,"ispui-select-add",{"text":[1],"theme":[1]}]]],["ispui-dropdown",[[4,"ispui-dropdown",{"borderOffset":[2,"border-offset"],"isClose":[4,"is-close"],"hasPointer":[4,"has-pointer"],"closeAfterClick":[4,"close-after-click"],"strictDirection":[4,"strict-direction"],"disabled":[4],"type":[1],"direction":[1],"hoverDebounce":[2,"hover-debounce"],"alignment":[1],"zIndex":[2,"z-index"],"offset":[2],"popupClass":[1,"popup-class"],"closeOnOuterClick":[4,"close-on-outer-click"],"currentDirection":[32],"showDropdown":[64],"closeDropdown":[64],"setPointerPositionCallback":[64],"setupDropdown":[64]}]]],["ispui-select-apply",[[0,"ispui-select-apply",{"applyText":[1,"apply-text"],"resetText":[1,"reset-text"],"withReset":[4,"with-reset"]}]]],["ispui-dropdown-content",[[4,"ispui-dropdown-content"]]],["ispui-dropdown-footer",[[0,"ispui-dropdown-footer"]]],["ispui-dropdown-header",[[0,"ispui-dropdown-header"]]],["ispui-panel-menu",[[4,"ispui-panel-menu",{"slim":[4],"preslim":[32]}]]],["ispui-select",[[0,"ispui-select",{"builder":[16],"builderParams":[8,"builder-params"],"options":[16],"value":[1025],"disabled":[4],"multiple":[4],"tree":[32]}]]],["ispui-select-button",[[4,"ispui-select-button",{"text":[1],"open":[4],"disabled":[4],"focusVisible":[4,"focus-visible"]}]]],["ispui-select-button-chip",[[4,"ispui-select-button-chip",{"text":[1],"open":[4],"disabled":[4],"focusVisible":[4,"focus-visible"]}]]],["ispui-select-button-legend",[[4,"ispui-select-button-legend",{"text":[1],"open":[4],"disabled":[4],"legend":[1],"focusVisible":[4,"focus-visible"]}]]],["ispui-select-button-line",[[4,"ispui-select-button-line",{"text":[1],"open":[4],"disabled":[4],"focusVisible":[4,"focus-visible"]}]]],["ispui-select-button-search",[[4,"ispui-select-button-search",{"text":[1],"open":[4],"disabled":[4],"active":[32]}]]],["ispui-select-list",[[0,"ispui-select-list",{"itemArea":[1,"item-area"],"list":[16],"checkbox":[4],"selectedHighlight":[4,"selected-highlight"],"hoverHighlight":[4,"hover-highlight"],"selectedBold":[4,"selected-bold"],"emitHoverOn":[4,"emit-hover-on"],"emitHoverOff":[4,"emit-hover-off"],"arrowNavigation":[4,"arrow-navigation"],"emitNavigateOn":[4,"emit-navigate-on"],"emitNavigateOff":[4,"emit-navigate-off"],"rerenderTrigger":[32]},[[8,"keydown","handleKeyDown"]]]]],["ispui-select-search",[[0,"ispui-select-search",{"value":[1025]}]]],["ispui-select-text",[[0,"ispui-select-text",{"text":[1]}]]],["ispui-select-toggle",[[0,"ispui-select-toggle",{"onText":[1,"on-text"],"offText":[1,"off-text"],"disabled":[4],"checked":[4],"type":[1]}]]],["ispui-button-icon",[[1,"ispui-button-icon",{"top":[2],"right":[2],"left":[2],"topOffset":[32],"rightPadding":[32],"leftPadding":[32]}]]],["ispui-dropdown-popup",[[0,"ispui-dropdown-popup",{"isClose":[4,"isclose"],"hasPointer":[4,"haspointer"],"direction":[1],"zIndex":[2,"z-index"]}]]],["ispui-button",[[4,"ispui-button",{"theme":[513],"type":[513],"disabled":[516],"buttonType":[32],"buttonTheme":[32]},[[1,"mousedown","mouseDownHandler"],[1,"mouseup","mouseUpHandler"],[0,"focus","focusHandler"],[2,"click","clickHandler"]]]]]], options);
});
