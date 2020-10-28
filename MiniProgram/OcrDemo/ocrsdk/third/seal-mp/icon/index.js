!(function (t) {
  const e = {};function n(r) {
    if (e[r]) return e[r].exports;const o = e[r] = { i: r, l: !1, exports: {} };return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }n.m = t, n.c = e, n.d = function (t, e, r) {
    n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
  }, n.r = function (t) {
    'undefined' !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(t, '__esModule', { value: !0 });
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;if (4 & e && 'object' === typeof t && t && t.__esModule) return t;const r = Object.create(null);if (n.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: t }), 2 & e && 'string' !== typeof t) for (const o in t)n.d(r, o, (e => t[e]).bind(null, o));return r;
  }, n.n = function (t) {
    const e = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };return n.d(e, 'a', e), e;
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = '', n(n.s = 25);
}({ 25(t, e) {
  Component({ externalClasses: ['ext-class'], options: { addGlobalClass: !0 }, properties: { name: { type: String, value: '' }, color: { type: String, value: '' }, size: { type: [Number, String], value: '24px' }, src: { type: String, value: '' } }, data: { styles: '' }, ready() {
    this._addUnit(this.data.size), this._addColor(this.data.color);
  }, methods: { _addUnit(t) {
    const e = function (t) {
      return +t ? ''.concat(t, 'px') : t;
    };if (this.data.src) {
      const n = e(t);this.setData({ styles: this.data.styles + 'width: '.concat(n, ';') + 'height: '.concat(n, ';') });
    } else {
      const r = e(t);this.setData({ styles: this.data.styles + 'font-size: '.concat(r, ';') });
    }
  }, _addColor(t) {
    this.setData({ styles: this.data.styles + (this.data.color ? 'color: '.concat(this.data.color, ';') : '') });
  } } });
} }));
