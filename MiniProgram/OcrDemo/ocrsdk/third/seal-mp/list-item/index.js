!(function (e) {
  const t = {};function n(l) {
    if (t[l]) return t[l].exports;const r = t[l] = { i: l, l: !1, exports: {} };return e[l].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
  }n.m = e, n.c = t, n.d = function (e, t, l) {
    n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: l });
  }, n.r = function (e) {
    'undefined' !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(e, '__esModule', { value: !0 });
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;if (4 & t && 'object' === typeof e && e && e.__esModule) return e;const l = Object.create(null);if (n.r(l), Object.defineProperty(l, 'default', { enumerable: !0, value: e }), 2 & t && 'string' !== typeof e) for (const r in e)n.d(l, r, (t => e[t]).bind(null, r));return l;
  }, n.n = function (e) {
    const t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return n.d(t, 'a', t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = '', n(n.s = 28);
}({ 28(e, t) {
  Component({ externalClasses: ['ext-class', 'title-class', 'desc-class', 'value-class'], options: { multipleSlots: !0, addGlobalClass: !0 }, relations: { '../list/index': { type: 'ancestor' } }, properties: { icon: { type: String, value: '' }, iconColor: { type: String, value: '' }, iconSize: { type: [Number, String], value: '24px' }, title: { type: String, value: '' }, titleWidth: { type: [Number, String], value: '' }, desc: { type: String, value: '' }, value: { type: String, value: '' }, required: { type: Boolean, value: !1 }, clickable: { type: Boolean, value: !1 }, isLink: { type: Boolean, value: !1 }, linkType: { type: String, value: 'navigateTo' }, url: { type: String, value: '' }, detail: { type: Boolean, value: !1 }, thumb: { type: String, value: '' }, thumbPosition: { type: String, value: 'left' }, itemHeight: { type: String, value: 'small' }, valueAlignLeft: { type: Boolean, value: !1 }, border: { type: Boolean, value: !1 }, vertical: { type: Boolean, value: !1 } }, methods: { tapListItem(e) {
    this.triggerEvent('click', e.detail), this.data.isLink && this.data.url && wx[this.data.linkType]({ url: this.data.url });
  } } });
} }));
