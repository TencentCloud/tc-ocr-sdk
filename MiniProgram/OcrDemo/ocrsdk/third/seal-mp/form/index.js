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
  }, a.p = '', a(a.s = 22);
}({ 22(e, t) {
  function a(e, t) {
    let a = Object.keys(e);return Object.getOwnPropertySymbols && a.push.apply(a, Object.getOwnPropertySymbols(e)), t && (a = a.filter(t => Object.getOwnPropertyDescriptor(e, t).enumerable)), a;
  } function n(e, t, a) {
    return t in e ? Object.defineProperty(e, t, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = a, e;
  }Component({ externalClasses: ['ext-class'], options: { multipleSlots: !0, addGlobalClass: !0 }, relations: { '../list/index': { type: 'ancestor' } }, properties: { vertical: { type: Boolean, value: !1 }, icon: { type: String, value: '' }, iconColor: { type: String, value: '' }, iconSize: { type: [Number, String], value: '24px' }, label: { type: String, value: '' }, labelWidth: { type: [Number, String], value: '6em' }, required: { type: Boolean, value: !1 }, clickable: { type: Boolean, value: !1 }, detail: { type: Boolean, value: !1 }, border: { type: Boolean, value: !1 }, value: { type: String, observer(e) {
    this.updatedValue(e);
  } }, type: { type: String, value: 'text' }, password: { type: Boolean, value: !1 }, placeholder: { type: String, value: '' }, placeholderStyle: { type: String, value: '' }, placeholderClass: { type: String, value: 'seal-field__placeholder' }, disabled: { type: Boolean, value: !1 }, readonly: { type: Boolean, value: !1 }, maxLength: { type: Number, value: -1 }, cursor: { type: Number, value: '-1' }, cursorSpacing: { type: Number, value: '0' }, focus: { type: Boolean, value: !1 }, autoFocus: { type: Boolean, value: !1 }, confirmType: { type: String, value: 'done' }, confirmHold: { type: Boolean, value: !1 }, selectionStart: { type: Number, value: '-1' }, selectionEnd: { type: Number, value: '-1' }, adjustPosition: { type: Boolean, value: !0 }, holdKeyboard: { type: Boolean, value: !1 }, autoHeight: { type: Boolean, value: !1 }, fixed: { type: Boolean, value: !1 }, showConfirmBar: { type: Boolean, value: !0 }, textAlign: { type: String, value: 'left' }, hasCount: { type: Boolean, value: !1 }, error: { type: Boolean, value: !1 }, errorMsg: { type: String, value: '' }, helperMsg: { type: String, value: '' }, clock: { type: Number, value: -1 }, getCodeText: { type: String, value: '获取验证码' }, useSlot: { type: Boolean, value: !1 } }, data: { _length: 0, _getCodeDisable: !1, _getCodeText: '', _type: 'text' }, _timerID: null, attached() {
    'bankcard' === this.data.type && this.setData({ type: 'number', _type: this.data.type, maxLength: 19 });
  }, methods: { updatedValue(e) {
    this.data.value !== e && this.setData({ value: e });
  }, handleGetCode(e) {
    if (this.triggerEvent('getCode'), this.data._getCodeDisable) return !1;this.setData({ _getCodeDisable: !0, getCodeText: '('.concat(this.data.clock, ')重新获取'), _getCodeText: this.data.getCodeText }), this._countDown();
  }, _countDown() {
    const e = this;0 == this.data.clock ? (clearTimeout(this._timerID), this.setData({ _getCodeDisable: !1, getCodeText: this.data._getCodeText, clock: -1 })) : this._timerID = setTimeout(() => {
      const t = e.data.clock - 1;e.setData({ _getCodeDisable: !0, getCodeText: '('.concat(t, ')重新获取'), clock: t }), e._countDown();
    }, 1e3);
  }, _formatInput(e) {
    if ('bankcard' === this.data._type) return e.replace(new RegExp('(\\d{4})(?=\\d)'), '$1 ');
  }, handleClick(e) {
    'select' === this.data.type && this.triggerEvent('select');
  }, handleInput(e) {
    const t = (e = (function (e) {
      for (let t = 1;t < arguments.length;t++) {
        var o = null != arguments[t] ? arguments[t] : {};t % 2 ? a(o, !0).forEach((t) => {
          n(e, t, o[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : a(o).forEach((t) => {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t));
        });
      } return e;
    }({}, e, {}, e.detail))).detail.value;this.updatedValue(t), this.triggerEvent('input', t);const o = e.detail.value; const r = e.detail.keyCode || -1; const l = o.length; let i = '';'bankcard' === this.data._type && (i = l < this.data._length || 8 == r ? l % 5 == 4 ? o.substr(0, l - 1) : o : this._formatInput(o), this.setData({ value: i, _length: l }));
  }, handleFocus(e) {
    this.triggerEvent('focus', e.detail);
  }, handleBlur(e) {
    this.triggerEvent('blur', e.detail);
  }, handleConfirm(e) {
    const t = e.detail.value;this.triggerEvent('confirm', t);
  }, handleLineChange(e) {
    this.triggerEvent('linechange', e.detail);
  }, handleKeyboardHeightChange(e) {
    this.triggerEvent('keyboardheightchange', e.detail);
  } } });
} }));
