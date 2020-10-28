!(function (t) {
  const e = {};function n(r) {
    if (e[r]) return e[r].exports;const c = e[r] = { i: r, l: !1, exports: {} };return t[r].call(c.exports, c, c.exports, n), c.l = !0, c.exports;
  }n.m = t, n.c = e, n.d = function (t, e, r) {
    n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
  }, n.r = function (t) {
    'undefined' !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(t, '__esModule', { value: !0 });
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;if (4 & e && 'object' === typeof t && t && t.__esModule) return t;const r = Object.create(null);if (n.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: t }), 2 & e && 'string' !== typeof t) for (const c in t)n.d(r, c, (e => t[e]).bind(null, c));return r;
  }, n.n = function (t) {
    const e = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };return n.d(e, 'a', e), e;
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = '', n(n.s = 0);
}([function (t, e, n) {
  'use strict';function r(t) {
    return (function (t) {
      if (Array.isArray(t)) {
        for (var e = 0, n = new Array(t.length);e < t.length;e++)n[e] = t[e];return n;
      }
    }(t)) || (function (t) {
      if (Symbol.iterator in Object(t) || '[object Arguments]' === Object.prototype.toString.call(t)) return Array.from(t);
    }(t)) || (function () {
      throw new TypeError('Invalid attempt to spread non-iterable instance');
    }());
  } function c(t, e) {
    let n = Object.keys(t);return Object.getOwnPropertySymbols && n.push.apply(n, Object.getOwnPropertySymbols(t)), e && (n = n.filter(e => Object.getOwnPropertyDescriptor(t, e).enumerable)), n;
  } function o(t) {
    for (let e = 1;e < arguments.length;e++) {
      var n = null != arguments[e] ? arguments[e] : {};e % 2 ? c(n, !0).forEach((e) => {
        a(t, e, n[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : c(n).forEach((e) => {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
      });
    } return t;
  } function a(t, e, n) {
    return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
  } function u(t, e) {
    return (function (t) {
      if (Array.isArray(t)) return t;
    }(t)) || (function (t, e) {
      const n = []; let r = !0; let c = !1; let o = void 0;try {
        for (var a, u = t[Symbol.iterator]();!(r = (a = u.next()).done) && (n.push(a.value), !e || n.length !== e);r = !0);
      } catch (t) {
        c = !0, o = t;
      } finally {
        try {
          r || null == u.return || u.return();
        } finally {
          if (c) throw o;
        }
      } return n;
    }(t, e)) || (function () {
      throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }());
  }n.r(e);e.default = { arrayIsEmpty(t) {
    return !(!t || 0 !== t.length);
  }, timestampToTime(t, e) {
    const n = new Date(t); const r = n.getFullYear().toString(); const c = n.getMonth() + 1 < 10 ? '0'.concat(n.getMonth() + 1) : ''.concat(n.getMonth() + 1); const o = n.getDate() < 10 ? '0'.concat(n.getDate()) : ''.concat(n.getDate()); const a = n.getHours() < 10 ? '0'.concat(n.getHours()) : ''.concat(n.getHours()); const u = n.getMinutes() < 10 ? '0'.concat(n.getMinutes()) : ''.concat(n.getMinutes()); const i = n.getSeconds() < 10 ? '0'.concat(n.getSeconds()) : ''.concat(n.getSeconds()); let s = { value: { Y: r, M: c, D: o, h: a, m: u, s: i }, str: ''.concat(r, '-').concat(c, '-')
      .concat(o, ' ')
      .concat(a, ':')
      .concat(u, ':')
      .concat(i) };switch (e) {
      case 'YYYYMMDDHHMM':s = { value: { Y: r, M: c, D: o, h: a, m: u }, str: ''.concat(r, '-').concat(c, '-')
        .concat(o, ' ')
        .concat(a, ':')
        .concat(u) };break;case 'YYYYMMDD':s = { value: { Y: r, M: c, D: o }, str: ''.concat(r, '-').concat(c, '-')
        .concat(o) };break;case 'YYYYMM':s = { value: { Y: r, M: c }, str: ''.concat(r, '-').concat(c) };break;case 'HHMMSS':s = { value: { h: a, m: u, s: i }, str: ''.concat(a, ':').concat(u, ':')
        .concat(i) };break;case 'HHMM':s = { value: { h: a, m: u }, str: ''.concat(a, ':').concat(u) };
    } return s;
  }, timeToTimestamp(t) {
    return new Date(t.replace(/-/g, '/')).valueOf();
  }, pickerConfirmData(t, e) {
    const n = [];console.log(e);const r = 'number' === typeof e ? [e] : e;return t && t.map((t, e) => {
      n.push(t[r[e]]);
    }), console.log(n), { value: 1 === n.length ? n[0] : n, index: 1 === r.length ? r[0] : r };
  }, getCurrentMonthDay(t, e) {
    return new Date(t, e, 0).getDate();
  }, generateIntervalData(t, e) {
    for (var n = [], c = Number(t), o = Number(e), a = c;a <= o;a++) {
      const u = a < 10 ? '0'.concat(a) : ''.concat(a);n = [].concat(r(n), [u]);
    } return n;
  }, datePickerConfirmData(t, e) {
    let n = ''; let r = void 0; let c = void 0; let o = void 0; let a = void 0; let i = void 0; let s = void 0;switch (e) {
      case 'YYYYMMDDHHMM':var l = u(t, 5);r = l[0], c = l[1], o = l[2], a = l[3], i = l[4], n = ''.concat(r, '-').concat(c, '-')
        .concat(o, ' ')
        .concat(a, ':')
        .concat(i);break;case 'YYYYMMDD':var f = u(t, 3);r = f[0], c = f[1], o = f[2], n = ''.concat(r, '-').concat(c, '-')
        .concat(o);break;case 'YYYYMM':var d = u(t, 2);r = d[0], c = d[1], n = ''.concat(r, '-').concat(c);break;case 'HHMMSS':var M = u(t, 3);a = M[0], i = M[1], s = M[2], n = ''.concat(a, ':').concat(i, ':')
        .concat(s);break;case 'HHMM':var v = u(t, 2);a = v[0], i = v[1], n = ''.concat(a, ':').concat(i);break;default:var b = u(t, 6);r = b[0], c = b[1], o = b[2], a = b[3], i = b[4], s = b[5], n = ''.concat(r, '-').concat(c, '-')
        .concat(o, ' ')
        .concat(a, ':')
        .concat(i, ':')
        .concat(s);
    } return n;
  }, timeAbbreviationFormat(t) {
    return /^[\d]{4}[\/-]{1}[\d]{1,2}[\/-]{1}[\d]{1,2}\s[\d]{1,2}[:][\d]{1,2}[:][\d]{1,2}$/.test(t) ? 'YYYYMMDDHHMMSS' : /^[\d]{4}[\/-]{1}[\d]{1,2}[\/-]{1}[\d]{1,2}\s[\d]{1,2}[:][\d]{1,2}$/.test(t) ? 'YYYYMMDDHHMM' : /^[\d]{4}[\/-]{1}[\d]{1,2}[\/-]{1}[\d]{1,2}$/.test(t) ? 'YYYYMMDD' : /^(\d{4})-(\d{2})$/.test(t) ? 'YYYYMM' : /^[\d]{1,2}[:][\d]{1,2}[:][\d]{1,2}$/.test(t) ? 'HHMMSS' : /^[\d]{1,2}[:][\d]{1,2}$/.test(t) ? 'HHMM' : '';
  }, timeToFormatTimestamp(t) {
    const e = u(t.split(':'), 3); const n = e[0]; const c = e[1]; const a = e[2]; let i = {}; let s = [];return void 0 !== n && (i = o({}, i, { h: n }), s = [].concat(r(s), [n])), void 0 !== c && (i = o({}, i, { m: c }), s = [].concat(r(s), [c])), void 0 !== a && (i = o({}, i, { s: a }), s = [].concat(r(s), [a])), { value: i, str: s.join(':') };
  } };
}]));
