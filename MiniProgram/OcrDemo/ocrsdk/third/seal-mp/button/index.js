!(function (e) {
  const t = {};function n(r) {
    if (t[r]) return t[r].exports;const i = t[r] = { i: r, l: !1, exports: {} };return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
  }n.m = e, n.c = t, n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
  }, n.r = function (e) {
    'undefined' !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(e, '__esModule', { value: !0 });
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;if (4 & t && 'object' === typeof e && e && e.__esModule) return e;const r = Object.create(null);if (n.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & t && 'string' !== typeof e) for (const i in e)n.d(r, i, (t => e[t]).bind(null, i));return r;
  }, n.n = function (e) {
    const t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return n.d(t, 'a', t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = '', n(n.s = 11);
}({ 11(e, t) {
  Component({ externalClasses: ['ext-class'], options: { multipleSlots: !0, addGlobalClass: !0 }, properties: { size: { type: String, value: 'large' }, color: { type: String, value: 'default' }, fill: { type: String, value: 'solid' }, minWidth: { type: [Number, String], value: '', observer(e) {
    this.setStyle('min-width', e);
  } }, disabled: { type: Boolean, value: !1 }, loading: { type: Boolean, value: !1 }, loadingType: { type: String, value: 'spinner' }, loadingSize: { type: Number, value: '20' }, loadingText: { type: String, value: '' }, hoverClass: { type: String, value: 'seal-button--hover' }, formType: { type: String, value: '' }, openType: { type: String, value: '' }, lang: { type: String, value: 'en' }, appParameter: { type: String, value: '' }, sessionFrom: { type: String, value: '' }, sendMessageTitle: { type: String, value: '当前标题' }, sendMessagePath: { type: String, value: '当前分享路径' }, sendMessageImg: { type: String, value: '截图' }, showMessageCard: { type: Boolean, value: !1 } }, data: { _styles: '' }, methods: { handleClick(e) {
    if (this.data.disabled || this.data.loading) return !1;this.triggerEvent('click', e);
  }, handleGetUserInfo(e) {
    this.triggerEvent('getuserinfo', e.detail);
  }, handleContact(e) {
    this.triggerEvent('contact', e.detail);
  }, handleGetPhoneNumber(e) {
    this.triggerEvent('getphonenumber', e.detail);
  }, handleError(e) {
    this.triggerEvent('error', e.detail);
  }, handleOpenSetting(e) {
    this.triggerEvent('opensetting', e.detail);
  }, handleLaunchApp(e) {
    this.triggerEvent('launchapp', e.detail);
  }, setStyle(e, t) {
    this.setData({ _styles: this.data._styles + ''.concat(e, ':') + (isNaN(t) ? ''.concat(t, ';') : ''.concat(t, 'px;')) });
  } } });
} }));
