!(function (e) {
  const t = {};function a(n) {
    if (t[n]) return t[n].exports;const o = t[n] = { i: n, l: !1, exports: {} };return e[n].call(o.exports, o, o.exports, a), o.l = !0, o.exports;
  }a.m = e, a.c = t, a.d = function (e, t, n) {
    a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
  }, a.r = function (e) {
    'undefined' !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(e, '__esModule', { value: !0 });
  }, a.t = function (e, t) {
    if (1 & t && (e = a(e)), 8 & t) return e;if (4 & t && 'object' === typeof e && e && e.__esModule) return e;const n = Object.create(null);if (a.r(n), Object.defineProperty(n, 'default', { enumerable: !0, value: e }), 2 & t && 'string' !== typeof e) for (const o in e)a.d(n, o, (t => e[t]).bind(null, o));return n;
  }, a.n = function (e) {
    const t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return a.d(t, 'a', t), t;
  }, a.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, a.p = '', a(a.s = 21);
}({ 21(e, t) {
  Component({ externalClasses: ['ext-class', 'input-class', 'textarea-class'], options: { addGlobalClass: !0 }, behaviors: ['wx://form-field'], properties: { name: { type: String, value: '' }, value: { type: String, value: '', observer(e) {
    this.updated(e);
  } }, type: { type: String, value: 'text' }, password: { type: Boolean, value: !1 }, placeholder: { type: String, value: '' }, placeholderStyle: { type: String, value: '' }, placeholderClass: { type: String, value: 'seal-field__placeholder' }, disabled: { type: Boolean, value: !1 }, readonly: { type: Boolean, value: !1 }, maxLength: { type: Number, value: -1 }, cursor: { type: Number, value: '-1' }, cursorSpacing: { type: Number, value: '0' }, focus: { type: Boolean, value: !1 }, autoFocus: { type: Boolean, value: !1 }, confirmType: { type: String, value: 'done' }, confirmHold: { type: Boolean, value: !1 }, autoHeight: { type: Boolean, value: !1 }, fixed: { type: Boolean, value: !1 }, showConfirmBar: { type: Boolean, value: !0 }, disableDefaultPadding: { type: Boolean, value: !0 }, hasCount: { type: Boolean, value: !1 }, border: { type: Boolean, value: !1 }, borderPosition: { type: String, value: 'surrounded' }, error: { type: Boolean, value: !1 }, selectionStart: { type: Number, value: '-1' }, selectionEnd: { type: Number, value: '-1' }, adjustPosition: { type: Boolean, value: !0 }, holdKeyboard: { type: Boolean, value: !1 } }, data: { focusFlag: !1 }, methods: { updated(e) {
    this.data.value !== e && this.setData({ value: e });
  }, handleInput(e) {
    const t = e.detail.value;this.updated(t), this.triggerEvent('input', e.detail);
  }, handleFocus(e) {
    this.setData({ focusFlag: !0 }), this.triggerEvent('focus', e.detail);
  }, handleBlur(e) {
    this.setData({ focusFlag: !1 }), this.triggerEvent('blur', e.detail);
  }, handleConfirm(e) {
    this.triggerEvent('confirm', e.detail);
  }, handleLineChange(e) {
    this.triggerEvent('linechange', e.detail);
  }, handleKeyboardHeightChange(e) {
    this.triggerEvent('keyboardheightchange', e.detail);
  } } });
} }));
