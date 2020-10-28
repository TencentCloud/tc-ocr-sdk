!(function (e) {
  const t = {};function n(r) {
    if (t[r]) return t[r].exports;const o = t[r] = { i: r, l: !1, exports: {} };return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }n.m = e, n.c = t, n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
  }, n.r = function (e) {
    'undefined' !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(e, '__esModule', { value: !0 });
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;if (4 & t && 'object' === typeof e && e && e.__esModule) return e;const r = Object.create(null);if (n.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & t && 'string' !== typeof e) for (const o in e)n.d(r, o, (t => e[t]).bind(null, o));return r;
  }, n.n = function (e) {
    const t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return n.d(t, 'a', t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = '', n(n.s = 29);
}({ 29(e, t) {
  Component({ externalClasses: ['ext-class'], options: { addGlobalClass: !0 }, relations: { '../list-item/index': { type: 'descendant' }, '../form/index': { type: 'descendant' } }, properties: { title: { type: String, value: '' }, border: { type: Boolean, value: !1 }, borderPosition: { type: String, value: 'horizontal' } } });
} }));
