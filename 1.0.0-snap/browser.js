function xe() {
    return (
        [
            "iPad Simulator",
            "iPhone Simulator",
            "iPod Simulator",
            "iPad",
            "iPhone",
            "iPod",
        ].includes(navigator.platform) ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    )
}
function Ze(r) {
    let e
    function n() {
        r(), window.removeEventListener("scroll", a, !1)
    }
    function a() {
        window.clearTimeout(e), (e = window.setTimeout(n, 66))
    }
    window.addEventListener("scroll", a, !1)
}
function Qe() {
    function r() {
        console.log("checkSwipe"),
            window.innerHeight ===
            (window.innerHeight > window.innerWidth
                ? window.screen.height
                : window.screen.width)
                ? (console.log("checkSwipe::disableSwipe"), n())
                : (console.log("checkSwipe::enableSwipe"), e())
    }
    function e() {
        window.scrollTo(0, 0),
            document.documentElement.classList.add("swipe"),
            document.body.classList.add("swipe"),
            Ze(n)
    }
    function n() {
        window.scrollTo(0, 0),
            console.log("disableSwipe"),
            window.innerHeight ===
            (window.innerHeight > window.innerWidth
                ? window.screen.height
                : window.screen.width)
                ? (document.documentElement.classList.remove("swipe"),
                  document.body.classList.remove("swipe"))
                : requestAnimationFrame(() => Ze(n))
    }
    r(), window.addEventListener("resize", r)
}
document.addEventListener("gesturestart", (r) => r.preventDefault(), !1)
function $r(r, e, n) {
    return (n.a = r), (n.f = e), n
}
function v(r) {
    return $r(2, r, function (e) {
        return function (n) {
            return r(e, n)
        }
    })
}
function m(r) {
    return $r(3, r, function (e) {
        return function (n) {
            return function (a) {
                return r(e, n, a)
            }
        }
    })
}
function P(r) {
    return $r(4, r, function (e) {
        return function (n) {
            return function (a) {
                return function (t) {
                    return r(e, n, a, t)
                }
            }
        }
    })
}
function Y(r) {
    return $r(5, r, function (e) {
        return function (n) {
            return function (a) {
                return function (t) {
                    return function (o) {
                        return r(e, n, a, t, o)
                    }
                }
            }
        }
    })
}
function tr(r) {
    return $r(6, r, function (e) {
        return function (n) {
            return function (a) {
                return function (t) {
                    return function (o) {
                        return function (u) {
                            return r(e, n, a, t, o, u)
                        }
                    }
                }
            }
        }
    })
}
function zr(r) {
    return $r(7, r, function (e) {
        return function (n) {
            return function (a) {
                return function (t) {
                    return function (o) {
                        return function (u) {
                            return function (i) {
                                return r(e, n, a, t, o, u, i)
                            }
                        }
                    }
                }
            }
        }
    })
}
function Ke(r) {
    return $r(8, r, function (e) {
        return function (n) {
            return function (a) {
                return function (t) {
                    return function (o) {
                        return function (u) {
                            return function (i) {
                                return function (c) {
                                    return r(e, n, a, t, o, u, i, c)
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}
function Ne(r) {
    return $r(9, r, function (e) {
        return function (n) {
            return function (a) {
                return function (t) {
                    return function (o) {
                        return function (u) {
                            return function (i) {
                                return function (c) {
                                    return function ($) {
                                        return r(e, n, a, t, o, u, i, c, $)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}
function f(r, e, n) {
    return r.a === 2 ? r.f(e, n) : r(e)(n)
}
function g(r, e, n, a) {
    return r.a === 3 ? r.f(e, n, a) : r(e)(n)(a)
}
function U(r, e, n, a, t) {
    return r.a === 4 ? r.f(e, n, a, t) : r(e)(n)(a)(t)
}
function A(r, e, n, a, t, o) {
    return r.a === 5 ? r.f(e, n, a, t, o) : r(e)(n)(a)(t)(o)
}
function sr(r, e, n, a, t, o, u) {
    return r.a === 6 ? r.f(e, n, a, t, o, u) : r(e)(n)(a)(t)(o)(u)
}
function be(r, e, n, a, t, o, u, i) {
    return r.a === 7 ? r.f(e, n, a, t, o, u, i) : r(e)(n)(a)(t)(o)(u)(i)
}
function Ga(r, e, n, a, t, o, u, i, c) {
    return r.a === 8 ? r.f(e, n, a, t, o, u, i, c) : r(e)(n)(a)(t)(o)(u)(i)(c)
}
function de(r, e) {
    for (
        var n, a = [], t = pe(r, e, 0, a);
        t && (n = a.pop());
        t = pe(n.a, n.b, 0, a)
    );
    return t
}
function pe(r, e, n, a) {
    if (r === e) return !0
    if (typeof r != "object" || r === null || e === null)
        return typeof r == "function" && mr(5), !1
    if (n > 100) return a.push(C(r, e)), !0
    r.$ < 0 && ((r = rn(r)), (e = rn(e)))
    for (var t in r) if (!pe(r[t], e[t], n + 1, a)) return !1
    return !0
}
var nv = v(de),
    av = v(function (r, e) {
        return !de(r, e)
    })
function H(r, e, n) {
    if (typeof r != "object") return r === e ? 0 : r < e ? -1 : 1
    if (typeof r.$ == "undefined")
        return (n = H(r.a, e.a)) || (n = H(r.b, e.b)) ? n : H(r.c, e.c)
    for (; r.b && e.b && !(n = H(r.a, e.a)); r = r.b, e = e.b);
    return n || (r.b ? 1 : e.b ? -1 : 0)
}
var tv = v(function (r, e) {
        return H(r, e) < 0
    }),
    ov = v(function (r, e) {
        return H(r, e) < 1
    }),
    uv = v(function (r, e) {
        return H(r, e) > 0
    }),
    iv = v(function (r, e) {
        return H(r, e) >= 0
    }),
    ka = v(function (r, e) {
        var n = H(r, e)
        return n < 0 ? nn : n ? Va : en
    }),
    Fr = 0
function C(r, e) {
    return { a: r, b: e }
}
function or(r) {
    return r
}
function wr(r, e) {
    var n = {}
    for (var a in r) n[a] = r[a]
    for (var a in e) n[a] = e[a]
    return n
}
var cv = v(Ia)
function Ia(r, e) {
    if (typeof r == "string") return r + e
    if (!r.b) return e
    var n = er(r.a, e)
    r = r.b
    for (var a = n; r.b; r = r.b) a = a.b = er(r.a, e)
    return n
}
var M = { $: 0 }
function er(r, e) {
    return { $: 1, a: r, b: e }
}
var Ha = v(er)
function R(r) {
    for (var e = M, n = r.length; n--; ) e = er(r[n], e)
    return e
}
function he(r) {
    for (var e = []; r.b; r = r.b) e.push(r.a)
    return e
}
var za = m(function (r, e, n) {
        for (var a = []; e.b && n.b; e = e.b, n = n.b) a.push(f(r, e.a, n.a))
        return R(a)
    }),
    vv = P(function (r, e, n, a) {
        for (var t = []; e.b && n.b && a.b; e = e.b, n = n.b, a = a.b)
            t.push(g(r, e.a, n.a, a.a))
        return R(t)
    }),
    fv = Y(function (r, e, n, a, t) {
        for (
            var o = [];
            e.b && n.b && a.b && t.b;
            e = e.b, n = n.b, a = a.b, t = t.b
        )
            o.push(U(r, e.a, n.a, a.a, t.a))
        return R(o)
    }),
    lv = tr(function (r, e, n, a, t, o) {
        for (
            var u = [];
            e.b && n.b && a.b && t.b && o.b;
            e = e.b, n = n.b, a = a.b, t = t.b, o = o.b
        )
            u.push(A(r, e.a, n.a, a.a, t.a, o.a))
        return R(u)
    }),
    $v = v(function (r, e) {
        return R(
            he(e).sort(function (n, a) {
                return H(r(n), r(a))
            })
        )
    }),
    sv = v(function (r, e) {
        return R(
            he(e).sort(function (n, a) {
                var t = f(r, n, a)
                return t === en ? 0 : t === nn ? -1 : 1
            })
        )
    }),
    qa = []
function Xa(r) {
    return r.length
}
var Ya = m(function (r, e, n) {
        for (var a = new Array(r), t = 0; t < r; t++) a[t] = n(e + t)
        return a
    }),
    xa = v(function (r, e) {
        for (var n = new Array(r), a = 0; a < r && e.b; a++)
            (n[a] = e.a), (e = e.b)
        return (n.length = a), C(n, e)
    }),
    _v = v(function (r, e) {
        return e[r]
    }),
    bv = m(function (r, e, n) {
        for (var a = n.length, t = new Array(a), o = 0; o < a; o++) t[o] = n[o]
        return (t[r] = e), t
    }),
    pv = v(function (r, e) {
        for (var n = e.length, a = new Array(n + 1), t = 0; t < n; t++)
            a[t] = e[t]
        return (a[n] = r), a
    }),
    dv = m(function (r, e, n) {
        for (var a = n.length, t = 0; t < a; t++) e = f(r, n[t], e)
        return e
    }),
    Za = m(function (r, e, n) {
        for (var a = n.length - 1; a >= 0; a--) e = f(r, n[a], e)
        return e
    }),
    hv = v(function (r, e) {
        for (var n = e.length, a = new Array(n), t = 0; t < n; t++)
            a[t] = r(e[t])
        return a
    }),
    wv = m(function (r, e, n) {
        for (var a = n.length, t = new Array(a), o = 0; o < a; o++)
            t[o] = f(r, e + o, n[o])
        return t
    }),
    Sv = m(function (r, e, n) {
        return n.slice(r, e)
    }),
    gv = m(function (r, e, n) {
        var a = e.length,
            t = r - a
        t > n.length && (t = n.length)
        for (var o = a + t, u = new Array(o), i = 0; i < a; i++) u[i] = e[i]
        for (var i = 0; i < t; i++) u[i + a] = n[i]
        return u
    }),
    Av = v(function (r, e) {
        return e
    }),
    mv = v(function (r, e) {
        return console.log(r + ": " + Qa(e)), e
    })
function Qa(r) {
    return "<internals>"
}
function mr(r) {
    throw new Error("https://github.com/elm/core/blob/1.0.0/hints/" + r + ".md")
}
var Tv = v(function (r, e) {
        return r + e
    }),
    Ev = v(function (r, e) {
        return r - e
    }),
    Dv = v(function (r, e) {
        return r * e
    }),
    Lv = v(function (r, e) {
        return r / e
    }),
    Fv = v(function (r, e) {
        return (r / e) | 0
    }),
    Mv = v(Math.pow),
    Jv = v(function (r, e) {
        return e % r
    }),
    Bv = v(function (r, e) {
        var n = e % r
        return r === 0
            ? mr(11)
            : (n > 0 && r < 0) || (n < 0 && r > 0)
            ? n + r
            : n
    }),
    Ka = Math.cos,
    Na = Math.sin,
    Cv = v(Math.atan2),
    rt = Math.ceil,
    et = Math.floor,
    nt = Math.round,
    an = Math.log,
    jv = isNaN,
    Wv = v(function (r, e) {
        return r && e
    }),
    Pv = v(function (r, e) {
        return r || e
    }),
    Uv = v(function (r, e) {
        return r !== e
    }),
    Rv = v(function (r, e) {
        return r + e
    })
function at(r) {
    var e = r.charCodeAt(0)
    return isNaN(e)
        ? W
        : B(
              55296 <= e && e <= 56319
                  ? C(or(r[0] + r[1]), r.slice(2))
                  : C(or(r[0]), r.slice(1))
          )
}
var yv = v(function (r, e) {
    return r + e
})
function tt(r) {
    return r.length
}
var Ov = v(function (r, e) {
        for (var n = e.length, a = new Array(n), t = 0; t < n; ) {
            var o = e.charCodeAt(t)
            if (55296 <= o && o <= 56319) {
                ;(a[t] = r(or(e[t] + e[t + 1]))), (t += 2)
                continue
            }
            ;(a[t] = r(or(e[t]))), t++
        }
        return a.join("")
    }),
    Gv = v(function (r, e) {
        for (var n = [], a = e.length, t = 0; t < a; ) {
            var o = e[t],
                u = e.charCodeAt(t)
            t++,
                55296 <= u && u <= 56319 && ((o += e[t]), t++),
                r(or(o)) && n.push(o)
        }
        return n.join("")
    }),
    Vv = m(function (r, e, n) {
        for (var a = n.length, t = 0; t < a; ) {
            var o = n[t],
                u = n.charCodeAt(t)
            t++,
                55296 <= u && u <= 56319 && ((o += n[t]), t++),
                (e = f(r, or(o), e))
        }
        return e
    }),
    ot = m(function (r, e, n) {
        for (var a = n.length; a--; ) {
            var t = n[a],
                o = n.charCodeAt(a)
            56320 <= o && o <= 57343 && (a--, (t = n[a] + t)),
                (e = f(r, or(t), e))
        }
        return e
    }),
    ut = v(function (r, e) {
        return e.split(r)
    }),
    it = v(function (r, e) {
        return e.join(r)
    }),
    ct = m(function (r, e, n) {
        return n.slice(r, e)
    }),
    kv = v(function (r, e) {
        for (var n = e.length; n--; ) {
            var a = e[n],
                t = e.charCodeAt(n)
            if ((56320 <= t && t <= 57343 && (n--, (a = e[n] + a)), r(or(a))))
                return !0
        }
        return !1
    }),
    vt = v(function (r, e) {
        for (var n = e.length; n--; ) {
            var a = e[n],
                t = e.charCodeAt(n)
            if ((56320 <= t && t <= 57343 && (n--, (a = e[n] + a)), !r(or(a))))
                return !1
        }
        return !0
    }),
    ft = v(function (r, e) {
        return e.indexOf(r) > -1
    }),
    lt = v(function (r, e) {
        return e.indexOf(r) === 0
    }),
    Iv = v(function (r, e) {
        return e.length >= r.length && e.lastIndexOf(r) === e.length - r.length
    }),
    $t = v(function (r, e) {
        var n = r.length
        if (n < 1) return M
        for (var a = 0, t = []; (a = e.indexOf(r, a)) > -1; )
            t.push(a), (a = a + n)
        return R(t)
    })
function st(r) {
    return r + ""
}
function _t(r) {
    for (
        var e = 0, n = r.charCodeAt(0), a = n == 43 || n == 45 ? 1 : 0, t = a;
        t < r.length;
        ++t
    ) {
        var o = r.charCodeAt(t)
        if (o < 48 || 57 < o) return W
        e = 10 * e + o - 48
    }
    return t == a ? W : B(n == 45 ? -e : e)
}
function bt(r) {
    var e = r.charCodeAt(0)
    return 55296 <= e && e <= 56319
        ? (e - 55296) * 1024 + r.charCodeAt(1) - 56320 + 65536
        : e
}
function pt(r) {
    return { $: 0, a: r }
}
function dt(r) {
    return { $: 1, a: r }
}
function Mr(r) {
    return { $: 2, b: r }
}
var ht = Mr(function (r) {
        return typeof r != "number"
            ? q("an INT", r)
            : (-2147483647 < r && r < 2147483647 && (r | 0) === r) ||
              (isFinite(r) && !(r % 1))
            ? z(r)
            : q("an INT", r)
    }),
    wt = Mr(function (r) {
        return typeof r == "boolean" ? z(r) : q("a BOOL", r)
    }),
    St = Mr(function (r) {
        return typeof r == "number" ? z(r) : q("a FLOAT", r)
    }),
    gt = Mr(function (r) {
        return z(Sr(r))
    }),
    At = Mr(function (r) {
        return typeof r == "string"
            ? z(r)
            : r instanceof String
            ? z(r + "")
            : q("a STRING", r)
    })
function mt(r) {
    return { $: 3, b: r }
}
var Tt = v(function (r, e) {
        return { $: 6, d: r, b: e }
    }),
    Et = v(function (r, e) {
        return { $: 7, e: r, b: e }
    })
function _r(r, e) {
    return { $: 9, f: r, g: e }
}
var Dt = v(function (r, e) {
        return { $: 10, b: e, h: r }
    }),
    Lt = v(function (r, e) {
        return _r(r, [e])
    }),
    Ft = m(function (r, e, n) {
        return _r(r, [e, n])
    }),
    Hv = P(function (r, e, n, a) {
        return _r(r, [e, n, a])
    }),
    zv = Y(function (r, e, n, a, t) {
        return _r(r, [e, n, a, t])
    }),
    qv = tr(function (r, e, n, a, t, o) {
        return _r(r, [e, n, a, t, o])
    }),
    Xv = zr(function (r, e, n, a, t, o, u) {
        return _r(r, [e, n, a, t, o, u])
    }),
    Yv = Ke(function (r, e, n, a, t, o, u, i) {
        return _r(r, [e, n, a, t, o, u, i])
    }),
    xv = Ne(function (r, e, n, a, t, o, u, i, c) {
        return _r(r, [e, n, a, t, o, u, i, c])
    }),
    Zv = v(function (r, e) {
        try {
            var n = JSON.parse(e)
            return X(r, n)
        } catch (a) {
            return ur(f(we, "This is not valid JSON! " + a.message, Sr(e)))
        }
    }),
    Se = v(function (r, e) {
        return X(r, Jr(e))
    })
function X(r, e) {
    switch (r.$) {
        case 2:
            return r.b(e)
        case 5:
            return e === null ? z(r.c) : q("null", e)
        case 3:
            return qr(e) ? tn(r.b, e, R) : q("a LIST", e)
        case 4:
            return qr(e) ? tn(r.b, e, Mt) : q("an ARRAY", e)
        case 6:
            var n = r.d
            if (typeof e != "object" || e === null || !(n in e))
                return q("an OBJECT with a field named `" + n + "`", e)
            var a = X(r.b, e[n])
            return x(a) ? a : ur(f(on, n, a.a))
        case 7:
            var t = r.e
            if (!qr(e)) return q("an ARRAY", e)
            if (t >= e.length)
                return q(
                    "a LONGER array. Need index " +
                        t +
                        " but only see " +
                        e.length +
                        " entries",
                    e
                )
            var a = X(r.b, e[t])
            return x(a) ? a : ur(f(un, t, a.a))
        case 8:
            if (typeof e != "object" || e === null || qr(e))
                return q("an OBJECT", e)
            var o = M
            for (var u in e)
                if (e.hasOwnProperty(u)) {
                    var a = X(r.b, e[u])
                    if (!x(a)) return ur(f(on, u, a.a))
                    o = er(C(u, a.a), o)
                }
            return z(br(o))
        case 9:
            for (var i = r.f, c = r.g, $ = 0; $ < c.length; $++) {
                var a = X(c[$], e)
                if (!x(a)) return a
                i = i(a.a)
            }
            return z(i)
        case 10:
            var a = X(r.b, e)
            return x(a) ? X(r.h(a.a), e) : a
        case 11:
            for (var l = M, s = r.g; s.b; s = s.b) {
                var a = X(s.a, e)
                if (x(a)) return a
                l = er(a.a, l)
            }
            return ur(Jt(br(l)))
        case 1:
            return ur(f(we, r.a, Sr(e)))
        case 0:
            return z(r.a)
    }
}
function tn(r, e, n) {
    for (var a = e.length, t = new Array(a), o = 0; o < a; o++) {
        var u = X(r, e[o])
        if (!x(u)) return ur(f(un, o, u.a))
        t[o] = u.a
    }
    return z(n(t))
}
function qr(r) {
    return (
        Array.isArray(r) ||
        (typeof FileList != "undefined" && r instanceof FileList)
    )
}
function Mt(r) {
    return f(Bt, r.length, function (e) {
        return r[e]
    })
}
function q(r, e) {
    return ur(f(we, "Expecting " + r, Sr(e)))
}
function Tr(r, e) {
    if (r === e) return !0
    if (r.$ !== e.$) return !1
    switch (r.$) {
        case 0:
        case 1:
            return r.a === e.a
        case 2:
            return r.b === e.b
        case 5:
            return r.c === e.c
        case 3:
        case 4:
        case 8:
            return Tr(r.b, e.b)
        case 6:
            return r.d === e.d && Tr(r.b, e.b)
        case 7:
            return r.e === e.e && Tr(r.b, e.b)
        case 9:
            return r.f === e.f && cn(r.g, e.g)
        case 10:
            return r.h === e.h && Tr(r.b, e.b)
        case 11:
            return cn(r.g, e.g)
    }
}
function cn(r, e) {
    var n = r.length
    if (n !== e.length) return !1
    for (var a = 0; a < n; a++) if (!Tr(r[a], e[a])) return !1
    return !0
}
var Ct = v(function (r, e) {
    return JSON.stringify(Jr(e), null, r) + ""
})
function Sr(r) {
    return r
}
function Jr(r) {
    return r
}
var Qv = m(function (r, e, n) {
        return (n[r] = Jr(e)), n
    }),
    Kv = Sr(null)
function pr(r) {
    return { $: 0, a: r }
}
function ge(r) {
    return { $: 1, a: r }
}
function nr(r) {
    return { $: 2, b: r, c: null }
}
var Ae = v(function (r, e) {
        return { $: 3, b: r, d: e }
    }),
    jt = v(function (r, e) {
        return { $: 4, b: r, d: e }
    })
function Wt(r) {
    return { $: 5, b: r }
}
var Pt = 0
function Te(r) {
    var e = { $: 0, e: Pt++, f: r, g: null, h: [] }
    return me(e), e
}
function vn(r) {
    return nr(function (e) {
        e(pr(Te(r)))
    })
}
function fn(r, e) {
    r.h.push(e), me(r)
}
var Ut = v(function (r, e) {
        return nr(function (n) {
            fn(r, e), n(pr(Fr))
        })
    }),
    Ee = !1,
    ln = []
function me(r) {
    if ((ln.push(r), Ee)) return
    for (Ee = !0; (r = ln.shift()); ) Rt(r)
    Ee = !1
}
function Rt(r) {
    for (; r.f; ) {
        var e = r.f.$
        if (e === 0 || e === 1) {
            for (; r.g && r.g.$ !== e; ) r.g = r.g.i
            if (!r.g) return
            ;(r.f = r.g.b(r.f.a)), (r.g = r.g.i)
        } else if (e === 2) {
            r.f.c = r.f.b(function (n) {
                ;(r.f = n), me(r)
            })
            return
        } else if (e === 5) {
            if (r.h.length === 0) return
            r.f = r.f.b(r.h.shift())
        } else (r.g = { $: e === 3 ? 0 : 1, b: r.f.b, i: r.g }), (r.f = r.f.d)
    }
}
var Nv = P(function (r, e, n, a) {
    return De(e, a, r.cd, r.cU, r.cH, function () {
        return function () {}
    })
})
function De(r, e, n, a, t, o) {
    var u = f(Se, r, Sr(e ? e.flags : void 0))
    x(u) || mr(2)
    var i = {},
        c = n(u.a),
        $ = c.a,
        l = o(b, $),
        s = yt(i, b)
    function b(_, d) {
        var h = f(a, _, $)
        l(($ = h.a), d), $n(i, h.b, t($))
    }
    return $n(i, c.b, t($)), s ? { ports: s } : {}
}
var ar = {}
function yt(r, e) {
    var n
    for (var a in ar) {
        var t = ar[a]
        t.a && ((n = n || {}), (n[a] = t.a(a, e))), (r[a] = Ot(t, e))
    }
    return n
}
function Gt(r, e, n, a, t) {
    return { b: r, c: e, d: n, e: a, f: t }
}
function Ot(r, e) {
    var n = { g: e, h: void 0 },
        a = r.c,
        t = r.d,
        o = r.e,
        u = r.f
    function i(c) {
        return f(
            Ae,
            i,
            Wt(function ($) {
                var l = $.a
                return $.$ === 0
                    ? g(t, n, l, c)
                    : o && u
                    ? U(a, n, l.i, l.j, c)
                    : g(a, n, o ? l.i : l.j, c)
            })
        )
    }
    return (n.h = Te(f(Ae, i, r.b)))
}
var Vt = v(function (r, e) {
        return nr(function (n) {
            r.g(e), n(pr(Fr))
        })
    }),
    rf = v(function (r, e) {
        return f(Ut, r.h, { $: 0, a: e })
    })
function sn(r) {
    return function (e) {
        return { $: 1, k: r, l: e }
    }
}
function _n(r) {
    return { $: 2, m: r }
}
var ef = v(function (r, e) {
        return { $: 3, n: r, o: e }
    }),
    bn = [],
    Le = !1
function $n(r, e, n) {
    if ((bn.push({ p: r, q: e, r: n }), Le)) return
    Le = !0
    for (var a; (a = bn.shift()); ) kt(a.p, a.q, a.r)
    Le = !1
}
function kt(r, e, n) {
    var a = {}
    Xr(!0, e, a, null), Xr(!1, n, a, null)
    for (var t in r) fn(r[t], { $: "fx", a: a[t] || { i: M, j: M } })
}
function Xr(r, e, n, a) {
    switch (e.$) {
        case 1:
            var t = e.k,
                o = It(r, t, a, e.l)
            n[t] = Ht(r, o, n[t])
            return
        case 2:
            for (var u = e.m; u.b; u = u.b) Xr(r, u.a, n, a)
            return
        case 3:
            Xr(r, e.o, n, { s: e.n, t: a })
            return
    }
}
function It(r, e, n, a) {
    function t(u) {
        for (var i = n; i; i = i.t) u = i.s(u)
        return u
    }
    var o = r ? ar[e].e : ar[e].f
    return f(o, t, a)
}
function Ht(r, e, n) {
    return (
        (n = n || { i: M, j: M }),
        r ? (n.i = er(e, n.i)) : (n.j = er(e, n.j)),
        n
    )
}
function zt(r) {
    ar[r] && mr(3, r)
}
var nf = v(function (r, e) {
    return e
})
function Br(r, e) {
    return zt(r), (ar[r] = { f: qt, u: e, a: Xt }), sn(r)
}
var qt = v(function (r, e) {
    return function (n) {
        return r(e(n))
    }
})
function Xt(r, e) {
    var n = M,
        a = ar[r].u,
        t = pr(null)
    ;(ar[r].b = t),
        (ar[r].c = m(function (u, i, c) {
            return (n = i), t
        }))
    function o(u) {
        var i = f(Se, a, Sr(u))
        x(i) || mr(4, r, i.a)
        for (var c = i.a, $ = n; $.b; $ = $.b) e($.a(c))
    }
    return { send: o }
}
var Yr,
    ir = typeof document != "undefined" ? document : {}
function Fe(r, e) {
    r.appendChild(e)
}
var af = P(function (r, e, n, a) {
    var t = a.node
    return (
        t.parentNode.replaceChild(
            dr(r, function () {}),
            t
        ),
        {}
    )
})
function pn(r) {
    return { $: 0, a: r }
}
var Yt = v(function (r, e) {
        return v(function (n, a) {
            for (var t = [], o = 0; a.b; a = a.b) {
                var u = a.a
                ;(o += u.b || 0), t.push(u)
            }
            return (o += t.length), { $: 1, c: e, d: Me(n), e: t, f: r, b: o }
        })
    }),
    dn = Yt(void 0),
    xt = v(function (r, e) {
        return v(function (n, a) {
            for (var t = [], o = 0; a.b; a = a.b) {
                var u = a.a
                ;(o += u.b.b || 0), t.push(u)
            }
            return (o += t.length), { $: 2, c: e, d: Me(n), e: t, f: r, b: o }
        })
    }),
    tf = xt(void 0)
function Zt(r, e, n, a) {
    return { $: 3, d: Me(r), g: e, h: n, i: a }
}
var of = v(function (r, e) {
    return { $: 4, j: r, k: e, b: 1 + (e.b || 0) }
})
function hr(r, e) {
    return { $: 5, l: r, m: e, k: void 0 }
}
var uf = v(function (r, e) {
        return hr([r, e], function () {
            return r(e)
        })
    }),
    cf = m(function (r, e, n) {
        return hr([r, e, n], function () {
            return f(r, e, n)
        })
    }),
    Qt = P(function (r, e, n, a) {
        return hr([r, e, n, a], function () {
            return g(r, e, n, a)
        })
    }),
    vf = Y(function (r, e, n, a, t) {
        return hr([r, e, n, a, t], function () {
            return U(r, e, n, a, t)
        })
    }),
    ff = tr(function (r, e, n, a, t, o) {
        return hr([r, e, n, a, t, o], function () {
            return A(r, e, n, a, t, o)
        })
    }),
    lf = zr(function (r, e, n, a, t, o, u) {
        return hr([r, e, n, a, t, o, u], function () {
            return sr(r, e, n, a, t, o, u)
        })
    }),
    $f = Ke(function (r, e, n, a, t, o, u, i) {
        return hr([r, e, n, a, t, o, u, i], function () {
            return be(r, e, n, a, t, o, u, i)
        })
    }),
    sf = Ne(function (r, e, n, a, t, o, u, i, c) {
        return hr([r, e, n, a, t, o, u, i, c], function () {
            return Ga(r, e, n, a, t, o, u, i, c)
        })
    }),
    Kt = v(function (r, e) {
        return { $: "a0", n: r, o: e }
    }),
    _f = v(function (r, e) {
        return { $: "a1", n: r, o: e }
    }),
    bf = v(function (r, e) {
        return { $: "a2", n: r, o: e }
    }),
    Je = v(function (r, e) {
        return { $: "a3", n: r, o: e }
    }),
    pf = m(function (r, e, n) {
        return { $: "a4", n: e, o: { f: r, o: n } }
    }),
    df = v(function (r, e) {
        return e.$ === "a0" ? f(Kt, e.n, Nt(r, e.o)) : e
    })
function Nt(r, e) {
    var n = Be(e)
    return { $: e.$, a: n ? g(Zr, n < 3 ? ro : eo, no(r), e.a) : f(xr, r, e.a) }
}
var ro = v(function (r, e) {
        return C(r(e.a), e.b)
    }),
    eo = v(function (r, e) {
        return { ch: r(e.ch), cG: e.cG, cz: e.cz }
    })
function Me(r) {
    for (var e = {}; r.b; r = r.b) {
        var n = r.a,
            a = n.$,
            t = n.n,
            o = n.o
        if (a === "a2") {
            t === "className" ? hn(e, t, Jr(o)) : (e[t] = Jr(o))
            continue
        }
        var u = e[a] || (e[a] = {})
        a === "a3" && t === "class" ? hn(u, t, o) : (u[t] = o)
    }
    return e
}
function hn(r, e, n) {
    var a = r[e]
    r[e] = a ? a + " " + n : n
}
function dr(r, e) {
    var n = r.$
    if (n === 5) return dr(r.k || (r.k = r.m()), e)
    if (n === 0) return ir.createTextNode(r.a)
    if (n === 4) {
        for (var a = r.k, t = r.j; a.$ === 4; )
            typeof t != "object" ? (t = [t, a.j]) : t.push(a.j), (a = a.k)
        var o = { j: t, p: e },
            u = dr(a, o)
        return (u.elm_event_node_ref = o), u
    }
    if (n === 3) {
        var u = r.h(r.g)
        return Ce(u, e, r.d), u
    }
    var u = r.f ? ir.createElementNS(r.f, r.c) : ir.createElement(r.c)
    Yr && r.c == "a" && u.addEventListener("click", Yr(u)), Ce(u, e, r.d)
    for (var i = r.e, c = 0; c < i.length; c++)
        Fe(u, dr(n === 1 ? i[c] : i[c].b, e))
    return u
}
function Ce(r, e, n) {
    for (var a in n) {
        var t = n[a]
        a === "a1"
            ? ao(r, t)
            : a === "a0"
            ? uo(r, e, t)
            : a === "a3"
            ? to(r, t)
            : a === "a4"
            ? oo(r, t)
            : ((a !== "value" && a !== "checked") || r[a] !== t) && (r[a] = t)
    }
}
function ao(r, e) {
    var n = r.style
    for (var a in e) n[a] = e[a]
}
function to(r, e) {
    for (var n in e) {
        var a = e[n]
        typeof a != "undefined" ? r.setAttribute(n, a) : r.removeAttribute(n)
    }
}
function oo(r, e) {
    for (var n in e) {
        var a = e[n],
            t = a.f,
            o = a.o
        typeof o != "undefined"
            ? r.setAttributeNS(t, n, o)
            : r.removeAttributeNS(t, n)
    }
}
function uo(r, e, n) {
    var a = r.elmFs || (r.elmFs = {})
    for (var t in n) {
        var o = n[t],
            u = a[t]
        if (!o) {
            r.removeEventListener(t, u), (a[t] = void 0)
            continue
        }
        if (u) {
            var i = u.q
            if (i.$ === o.$) {
                u.q = o
                continue
            }
            r.removeEventListener(t, u)
        }
        ;(u = io(e, o)),
            r.addEventListener(t, u, je && { passive: Be(o) < 2 }),
            (a[t] = u)
    }
}
var je
try {
    window.addEventListener(
        "t",
        null,
        Object.defineProperty({}, "passive", {
            get: function () {
                je = !0
            },
        })
    )
} catch (r) {}
function io(r, e) {
    function n(a) {
        var t = n.q,
            o = X(t.a, a)
        if (!x(o)) return
        for (
            var u = Be(t),
                i = o.a,
                c = u ? (u < 3 ? i.a : i.ch) : i,
                $ = u == 1 ? i.b : u == 3 && i.cG,
                l =
                    ($ && a.stopPropagation(),
                    (u == 2 ? i.b : u == 3 && i.cz) && a.preventDefault(),
                    r),
                s,
                b;
            (s = l.j);

        ) {
            if (typeof s == "function") c = s(c)
            else for (var b = s.length; b--; ) c = s[b](c)
            l = l.p
        }
        l(c, $)
    }
    return (n.q = e), n
}
function co(r, e) {
    return r.$ == e.$ && Tr(r.a, e.a)
}
function wn(r, e) {
    var n = []
    return Z(r, e, n, 0), n
}
function V(r, e, n, a) {
    var t = { $: e, r: n, s: a, t: void 0, u: void 0 }
    return r.push(t), t
}
function Z(r, e, n, a) {
    if (r === e) return
    var t = r.$,
        o = e.$
    if (t !== o)
        if (t === 1 && o === 2) (e = $o(e)), (o = 1)
        else {
            V(n, 0, a, e)
            return
        }
    switch (o) {
        case 5:
            for (
                var u = r.l, i = e.l, c = u.length, $ = c === i.length;
                $ && c--;

            )
                $ = u[c] === i[c]
            if ($) {
                e.k = r.k
                return
            }
            e.k = e.m()
            var l = []
            Z(r.k, e.k, l, 0), l.length > 0 && V(n, 1, a, l)
            return
        case 4:
            for (var s = r.j, b = e.j, _ = !1, d = r.k; d.$ === 4; )
                (_ = !0),
                    typeof s != "object" ? (s = [s, d.j]) : s.push(d.j),
                    (d = d.k)
            for (var h = e.k; h.$ === 4; )
                (_ = !0),
                    typeof b != "object" ? (b = [b, h.j]) : b.push(h.j),
                    (h = h.k)
            if (_ && s.length !== b.length) {
                V(n, 0, a, e)
                return
            }
            ;(_ ? !vo(s, b) : s !== b) && V(n, 2, a, b), Z(d, h, n, a + 1)
            return
        case 0:
            r.a !== e.a && V(n, 3, a, e.a)
            return
        case 1:
            Sn(r, e, n, a, fo)
            return
        case 2:
            Sn(r, e, n, a, lo)
            return
        case 3:
            if (r.h !== e.h) {
                V(n, 0, a, e)
                return
            }
            var w = We(r.d, e.d)
            w && V(n, 4, a, w)
            var S = e.i(r.g, e.g)
            S && V(n, 5, a, S)
            return
    }
}
function vo(r, e) {
    for (var n = 0; n < r.length; n++) if (r[n] !== e[n]) return !1
    return !0
}
function Sn(r, e, n, a, t) {
    if (r.c !== e.c || r.f !== e.f) {
        V(n, 0, a, e)
        return
    }
    var o = We(r.d, e.d)
    o && V(n, 4, a, o), t(r, e, n, a)
}
function We(r, e, n) {
    var a
    for (var t in r) {
        if (t === "a1" || t === "a0" || t === "a3" || t === "a4") {
            var o = We(r[t], e[t] || {}, t)
            o && ((a = a || {}), (a[t] = o))
            continue
        }
        if (!(t in e)) {
            ;(a = a || {}),
                (a[t] = n
                    ? n === "a1"
                        ? ""
                        : n === "a0" || n === "a3"
                        ? void 0
                        : { f: r[t].f, o: void 0 }
                    : typeof r[t] == "string"
                    ? ""
                    : null)
            continue
        }
        var u = r[t],
            i = e[t]
        if (
            (u === i && t !== "value" && t !== "checked") ||
            (n === "a0" && co(u, i))
        )
            continue
        ;(a = a || {}), (a[t] = i)
    }
    for (var c in e) c in r || ((a = a || {}), (a[c] = e[c]))
    return a
}
function fo(r, e, n, a) {
    var t = r.e,
        o = e.e,
        u = t.length,
        i = o.length
    u > i ? V(n, 6, a, { v: i, i: u - i }) : u < i && V(n, 7, a, { v: u, e: o })
    for (var c = u < i ? u : i, $ = 0; $ < c; $++) {
        var l = t[$]
        Z(l, o[$], n, ++a), (a += l.b || 0)
    }
}
function lo(r, e, n, a) {
    for (
        var t = [],
            o = {},
            u = [],
            i = r.e,
            c = e.e,
            $ = i.length,
            l = c.length,
            s = 0,
            b = 0,
            _ = a;
        s < $ && b < l;

    ) {
        var d = i[s],
            h = c[b],
            w = d.a,
            S = h.a,
            p = d.b,
            T = h.b,
            D = void 0,
            L = void 0
        if (w === S) {
            _++, Z(p, T, t, _), (_ += p.b || 0), s++, b++
            continue
        }
        var F = i[s + 1],
            J = c[b + 1]
        if (F) {
            var y = F.a,
                j = F.b
            L = S === y
        }
        if (J) {
            var O = J.a,
                k = J.b
            D = w === O
        }
        if (D && L) {
            _++,
                Z(p, k, t, _),
                Cr(o, t, w, T, b, u),
                (_ += p.b || 0),
                _++,
                jr(o, t, w, j, _),
                (_ += j.b || 0),
                (s += 2),
                (b += 2)
            continue
        }
        if (D) {
            _++,
                Cr(o, t, S, T, b, u),
                Z(p, k, t, _),
                (_ += p.b || 0),
                (s += 1),
                (b += 2)
            continue
        }
        if (L) {
            _++,
                jr(o, t, w, p, _),
                (_ += p.b || 0),
                _++,
                Z(j, T, t, _),
                (_ += j.b || 0),
                (s += 2),
                (b += 1)
            continue
        }
        if (F && y === O) {
            _++,
                jr(o, t, w, p, _),
                Cr(o, t, S, T, b, u),
                (_ += p.b || 0),
                _++,
                Z(j, k, t, _),
                (_ += j.b || 0),
                (s += 2),
                (b += 2)
            continue
        }
        break
    }
    for (; s < $; ) {
        _++
        var d = i[s],
            p = d.b
        jr(o, t, d.a, p, _), (_ += p.b || 0), s++
    }
    for (; b < l; ) {
        var G = G || [],
            h = c[b]
        Cr(o, t, h.a, h.b, void 0, G), b++
    }
    ;(t.length > 0 || u.length > 0 || G) && V(n, 8, a, { w: t, x: u, y: G })
}
var gn = "_elmW6BL"
function Cr(r, e, n, a, t, o) {
    var u = r[n]
    if (!u) {
        ;(u = { c: 0, z: a, r: t, s: void 0 }),
            o.push({ r: t, A: u }),
            (r[n] = u)
        return
    }
    if (u.c === 1) {
        o.push({ r: t, A: u }), (u.c = 2)
        var i = []
        Z(u.z, a, i, u.r), (u.r = t), (u.s.s = { w: i, A: u })
        return
    }
    Cr(r, e, n + gn, a, t, o)
}
function jr(r, e, n, a, t) {
    var o = r[n]
    if (!o) {
        var u = V(e, 9, t, void 0)
        r[n] = { c: 1, z: a, r: t, s: u }
        return
    }
    if (o.c === 0) {
        o.c = 2
        var i = []
        Z(a, o.z, i, t), V(e, 9, t, { w: i, A: o })
        return
    }
    jr(r, e, n + gn, a, t)
}
function An(r, e, n, a) {
    Wr(r, e, n, 0, 0, e.b, a)
}
function Wr(r, e, n, a, t, o, u) {
    for (var i = n[a], c = i.r; c === t; ) {
        var $ = i.$
        if ($ === 1) An(r, e.k, i.s, u)
        else if ($ === 8) {
            ;(i.t = r), (i.u = u)
            var l = i.s.w
            l.length > 0 && Wr(r, e, l, 0, t, o, u)
        } else if ($ === 9) {
            ;(i.t = r), (i.u = u)
            var s = i.s
            if (s) {
                s.A.s = r
                var l = s.w
                l.length > 0 && Wr(r, e, l, 0, t, o, u)
            }
        } else (i.t = r), (i.u = u)
        if ((a++, !(i = n[a]) || (c = i.r) > o)) return a
    }
    var b = e.$
    if (b === 4) {
        for (var _ = e.k; _.$ === 4; ) _ = _.k
        return Wr(r, _, n, a, t + 1, o, r.elm_event_node_ref)
    }
    for (var d = e.e, h = r.childNodes, w = 0; w < d.length; w++) {
        t++
        var S = b === 1 ? d[w] : d[w].b,
            p = t + (S.b || 0)
        if (
            t <= c &&
            c <= p &&
            ((a = Wr(h[w], S, n, a, t, p, u)), !(i = n[a]) || (c = i.r) > o)
        )
            return a
        t = p
    }
    return a
}
function mn(r, e, n, a) {
    return n.length === 0 ? r : (An(r, e, n, a), Qr(r, n))
}
function Qr(r, e) {
    for (var n = 0; n < e.length; n++) {
        var a = e[n],
            t = a.t,
            o = so(t, a)
        t === r && (r = o)
    }
    return r
}
function so(r, e) {
    switch (e.$) {
        case 0:
            return _o(r, e.s, e.u)
        case 4:
            return Ce(r, e.u, e.s), r
        case 3:
            return r.replaceData(0, r.length, e.s), r
        case 1:
            return Qr(r, e.s)
        case 2:
            return (
                r.elm_event_node_ref
                    ? (r.elm_event_node_ref.j = e.s)
                    : (r.elm_event_node_ref = { j: e.s, p: e.u }),
                r
            )
        case 6:
            for (var n = e.s, t = 0; t < n.i; t++)
                r.removeChild(r.childNodes[n.v])
            return r
        case 7:
            for (
                var n = e.s, a = n.e, t = n.v, o = r.childNodes[t];
                t < a.length;
                t++
            )
                r.insertBefore(dr(a[t], e.u), o)
            return r
        case 9:
            var n = e.s
            if (!n) return r.parentNode.removeChild(r), r
            var u = n.A
            return (
                typeof u.r != "undefined" && r.parentNode.removeChild(r),
                (u.s = Qr(r, n.w)),
                r
            )
        case 8:
            return bo(r, e)
        case 5:
            return e.s(r)
        default:
            mr(10)
    }
}
function _o(r, e, n) {
    var a = r.parentNode,
        t = dr(e, n)
    return (
        t.elm_event_node_ref || (t.elm_event_node_ref = r.elm_event_node_ref),
        a && t !== r && a.replaceChild(t, r),
        t
    )
}
function bo(r, e) {
    var n = e.s,
        a = po(n.y, e)
    r = Qr(r, n.w)
    for (var t = n.x, o = 0; o < t.length; o++) {
        var u = t[o],
            i = u.A,
            c = i.c === 2 ? i.s : dr(i.z, e.u)
        r.insertBefore(c, r.childNodes[u.r])
    }
    return a && Fe(r, a), r
}
function po(r, e) {
    if (!r) return
    for (var n = ir.createDocumentFragment(), a = 0; a < r.length; a++) {
        var t = r[a],
            o = t.A
        Fe(n, o.c === 2 ? o.s : dr(o.z, e.u))
    }
    return n
}
function Pe(r) {
    if (r.nodeType === 3) return pn(r.textContent)
    if (r.nodeType !== 1) return pn("")
    for (var e = M, n = r.attributes, a = n.length; a--; ) {
        var t = n[a],
            o = t.name,
            u = t.value
        e = er(f(Je, o, u), e)
    }
    for (
        var i = r.tagName.toLowerCase(), c = M, $ = r.childNodes, a = $.length;
        a--;

    )
        c = er(Pe($[a]), c)
    return g(dn, i, e, c)
}
function $o(r) {
    for (var e = r.e, n = e.length, a = new Array(n), t = 0; t < n; t++)
        a[t] = e[t].b
    return { $: 1, c: r.c, d: r.d, e: a, f: r.f, b: r.b }
}
var ho,
    hf =
        ho ||
        P(function (r, e, n, a) {
            return De(e, a, r.cd, r.cU, r.cH, function (t, o) {
                var u = r.cZ,
                    i = a.node,
                    c = Pe(i)
                return Tn(o, function ($) {
                    var l = u($),
                        s = wn(c, l)
                    ;(i = mn(i, c, s, t)), (c = l)
                })
            })
        }),
    wo,
    So =
        wo ||
        P(function (r, e, n, a) {
            return De(e, a, r.cd, r.cU, r.cH, function (t, o) {
                var u = r.aD && r.aD(t),
                    i = r.cZ,
                    c = ir.title,
                    $ = ir.body,
                    l = Pe($)
                return Tn(o, function (s) {
                    Yr = u
                    var b = i(s),
                        _ = dn("body")(M)(b.bS),
                        d = wn(l, _)
                    ;($ = mn($, l, d, t)),
                        (l = _),
                        (Yr = 0),
                        c !== b.cK && (ir.title = c = b.cK)
                })
            })
        }),
    wf =
        typeof cancelAnimationFrame != "undefined"
            ? cancelAnimationFrame
            : function (r) {
                  clearTimeout(r)
              },
    Kr =
        typeof requestAnimationFrame != "undefined"
            ? requestAnimationFrame
            : function (r) {
                  return setTimeout(r, 1e3 / 60)
              }
function Tn(r, e) {
    e(r)
    var n = 0
    function a() {
        n = n === 1 ? 0 : (Kr(a), e(r), 1)
    }
    return function (t, o) {
        ;(r = t), o ? (e(r), n === 2 && (n = 1)) : (n === 0 && Kr(a), (n = 2))
    }
}
var Sf = v(function (r, e) {
        return f(
            Re,
            Ue,
            nr(function () {
                e && history.go(e), r()
            })
        )
    }),
    gf = v(function (r, e) {
        return f(
            Re,
            Ue,
            nr(function () {
                history.pushState({}, "", e), r()
            })
        )
    }),
    Af = v(function (r, e) {
        return f(
            Re,
            Ue,
            nr(function () {
                history.replaceState({}, "", e), r()
            })
        )
    }),
    En = {
        addEventListener: function () {},
        removeEventListener: function () {},
    },
    mf = typeof document != "undefined" ? document : En,
    go = typeof window != "undefined" ? window : En,
    Tf = m(function (r, e, n) {
        return vn(
            nr(function (a) {
                function t(o) {
                    Te(n(o))
                }
                return (
                    r.addEventListener(e, t, je && { passive: !0 }),
                    function () {
                        r.removeEventListener(e, t)
                    }
                )
            })
        )
    }),
    Ef = v(function (r, e) {
        var n = X(r, e)
        return x(n) ? B(n.a) : W
    })
function Dn(r, e) {
    return nr(function (n) {
        Kr(function () {
            var a = document.getElementById(r)
            n(a ? pr(e(a)) : ge(Ao(r)))
        })
    })
}
function mo(r) {
    return nr(function (e) {
        Kr(function () {
            e(pr(r()))
        })
    })
}
var Df = v(function (r, e) {
        return Dn(e, function (n) {
            return n[r](), Fr
        })
    }),
    Lf = v(function (r, e) {
        return mo(function () {
            return go.scroll(r, e), Fr
        })
    }),
    Ff = m(function (r, e, n) {
        return Dn(r, function (a) {
            return (a.scrollLeft = e), (a.scrollTop = n), Fr
        })
    }),
    Do = tr(function (r, e, n, a, t, o) {
        var u = e !== 9728 && e !== 9729
        return nr(function (i) {
            var c = new Image()
            function $(l) {
                var s = l.createTexture()
                return (
                    l.bindTexture(l.TEXTURE_2D, s),
                    l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL, t),
                    l.texImage2D(
                        l.TEXTURE_2D,
                        0,
                        l.RGBA,
                        l.RGBA,
                        l.UNSIGNED_BYTE,
                        c
                    ),
                    l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, r),
                    l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, e),
                    l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, n),
                    l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, a),
                    u && l.generateMipmap(l.TEXTURE_2D),
                    l.bindTexture(l.TEXTURE_2D, null),
                    s
                )
            }
            ;(c.onload = function () {
                var l = c.width,
                    s = c.height,
                    b = (l & (l - 1)) === 0,
                    _ = (s & (s - 1)) === 0,
                    d = (b && _) || (!u && n === 33071 && a === 33071)
                i(d ? pr({ $: 0, bZ: $, a: l, b: s }) : ge(f(Eo, l, s)))
            }),
                (c.onerror = function () {
                    i(ge(To))
                }),
                o.slice(0, 5) !== "data:" && (c.crossOrigin = "Anonymous"),
                (c.src = o)
        })
    }),
    Lo = v(function (r, e) {
        return new Float64Array([r, e])
    }),
    Mf = v(function (r, e) {
        return new Float64Array([r, e[1]])
    }),
    Jf = v(function (r, e) {
        return new Float64Array([e[0], r])
    }),
    Fo = function (r) {
        return new Float64Array([r.c0, r.c3])
    },
    Bf = v(function (r, e) {
        var n = new Float64Array(2)
        return (n[0] = r[0] + e[0]), (n[1] = r[1] + e[1]), n
    }),
    Cf = v(function (r, e) {
        var n = new Float64Array(2)
        return (n[0] = r[0] - e[0]), (n[1] = r[1] - e[1]), n
    }),
    jf = v(function (r, e) {
        var n = new Float64Array(2)
        ;(n[0] = r[0] - e[0]), (n[1] = r[1] - e[1])
        var a = 1 / Mo(n)
        return (n[0] = n[0] * a), (n[1] = n[1] * a), n
    })
function Mo(r) {
    return Math.sqrt(r[0] * r[0] + r[1] * r[1])
}
var Wf = v(function (r, e) {
        var n = r[0] - e[0],
            a = r[1] - e[1]
        return Math.sqrt(n * n + a * a)
    }),
    Pf = v(function (r, e) {
        var n = r[0] - e[0],
            a = r[1] - e[1]
        return n * n + a * a
    }),
    Uf = v(function (r, e) {
        var n = new Float64Array(2)
        return (n[0] = e[0] * r), (n[1] = e[1] * r), n
    }),
    Rf = v(function (r, e) {
        return r[0] * e[0] + r[1] * e[1]
    }),
    ye = new Float64Array(3),
    Ln = new Float64Array(3),
    Fn = new Float64Array(3),
    Jo = m(function (r, e, n) {
        return new Float64Array([r, e, n])
    }),
    yf = v(function (r, e) {
        return new Float64Array([r, e[1], e[2]])
    }),
    Of = v(function (r, e) {
        return new Float64Array([e[0], r, e[2]])
    }),
    Gf = v(function (r, e) {
        return new Float64Array([e[0], e[1], r])
    }),
    Bo = function (r) {
        return { c0: r[0], c3: r[1], at: r[2] }
    },
    Vf = v(function (r, e) {
        var n = new Float64Array(3)
        return (
            (n[0] = r[0] + e[0]), (n[1] = r[1] + e[1]), (n[2] = r[2] + e[2]), n
        )
    })
function Mn(r, e, n) {
    return (
        n === void 0 && (n = new Float64Array(3)),
        (n[0] = r[0] - e[0]),
        (n[1] = r[1] - e[1]),
        (n[2] = r[2] - e[2]),
        n
    )
}
var kf = v(Mn)
function Jn(r, e, n) {
    return n === void 0 && (n = new Float64Array(3)), Nr(Mn(r, e, n), n)
}
var If = v(Jn)
function Bn(r) {
    return Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2])
}
var Hf = v(function (r, e) {
        var n = r[0] - e[0],
            a = r[1] - e[1],
            t = r[2] - e[2]
        return Math.sqrt(n * n + a * a + t * t)
    }),
    zf = v(function (r, e) {
        var n = r[0] - e[0],
            a = r[1] - e[1],
            t = r[2] - e[2]
        return n * n + a * a + t * t
    })
function Nr(r, e) {
    e === void 0 && (e = new Float64Array(3))
    var n = 1 / Bn(r)
    return (e[0] = r[0] * n), (e[1] = r[1] * n), (e[2] = r[2] * n), e
}
var qf = v(function (r, e) {
        return new Float64Array([e[0] * r, e[1] * r, e[2] * r])
    }),
    Pr = function (r, e) {
        return r[0] * e[0] + r[1] * e[1] + r[2] * e[2]
    },
    Xf = v(Pr)
function Oe(r, e, n) {
    return (
        n === void 0 && (n = new Float64Array(3)),
        (n[0] = r[1] * e[2] - r[2] * e[1]),
        (n[1] = r[2] * e[0] - r[0] * e[2]),
        (n[2] = r[0] * e[1] - r[1] * e[0]),
        n
    )
}
var Yf = v(Oe),
    xf = v(function (r, e) {
        var n,
            a = ye,
            t = new Float64Array(3)
        return (
            (a[0] = r[3]),
            (a[1] = r[7]),
            (a[2] = r[11]),
            (n = Pr(e, a) + r[15]),
            (a[0] = r[0]),
            (a[1] = r[4]),
            (a[2] = r[8]),
            (t[0] = (Pr(e, a) + r[12]) / n),
            (a[0] = r[1]),
            (a[1] = r[5]),
            (a[2] = r[9]),
            (t[1] = (Pr(e, a) + r[13]) / n),
            (a[0] = r[2]),
            (a[1] = r[6]),
            (a[2] = r[10]),
            (t[2] = (Pr(e, a) + r[14]) / n),
            t
        )
    }),
    Co = P(function (r, e, n, a) {
        return new Float64Array([r, e, n, a])
    }),
    Zf = v(function (r, e) {
        return new Float64Array([r, e[1], e[2], e[3]])
    }),
    Qf = v(function (r, e) {
        return new Float64Array([e[0], r, e[2], e[3]])
    }),
    Kf = v(function (r, e) {
        return new Float64Array([e[0], e[1], r, e[3]])
    }),
    Nf = v(function (r, e) {
        return new Float64Array([e[0], e[1], e[2], r])
    }),
    jo = function (r) {
        return new Float64Array([r.c0, r.c3, r.at, r.bM])
    },
    rl = v(function (r, e) {
        var n = new Float64Array(4)
        return (
            (n[0] = r[0] + e[0]),
            (n[1] = r[1] + e[1]),
            (n[2] = r[2] + e[2]),
            (n[3] = r[3] + e[3]),
            n
        )
    }),
    el = v(function (r, e) {
        var n = new Float64Array(4)
        return (
            (n[0] = r[0] - e[0]),
            (n[1] = r[1] - e[1]),
            (n[2] = r[2] - e[2]),
            (n[3] = r[3] - e[3]),
            n
        )
    }),
    nl = v(function (r, e) {
        var n = new Float64Array(4)
        ;(n[0] = r[0] - e[0]),
            (n[1] = r[1] - e[1]),
            (n[2] = r[2] - e[2]),
            (n[3] = r[3] - e[3])
        var a = 1 / Wo(n)
        return (
            (n[0] = n[0] * a),
            (n[1] = n[1] * a),
            (n[2] = n[2] * a),
            (n[3] = n[3] * a),
            n
        )
    })
function Wo(r) {
    return Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2] + r[3] * r[3])
}
var al = v(function (r, e) {
        var n = r[0] - e[0],
            a = r[1] - e[1],
            t = r[2] - e[2],
            o = r[3] - e[3]
        return Math.sqrt(n * n + a * a + t * t + o * o)
    }),
    tl = v(function (r, e) {
        var n = r[0] - e[0],
            a = r[1] - e[1],
            t = r[2] - e[2],
            o = r[3] - e[3]
        return n * n + a * a + t * t + o * o
    }),
    ol = v(function (r, e) {
        var n = new Float64Array(4)
        return (
            (n[0] = e[0] * r),
            (n[1] = e[1] * r),
            (n[2] = e[2] * r),
            (n[3] = e[3] * r),
            n
        )
    }),
    ul = v(function (r, e) {
        return r[0] * e[0] + r[1] * e[1] + r[2] * e[2] + r[3] * e[3]
    }),
    Po = new Float64Array(16),
    Uo = new Float64Array(16),
    il = new Float64Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
function Cn(r, e, n, a, t, o) {
    var u = new Float64Array(16)
    return (
        (u[0] = (2 * t) / (e - r)),
        (u[1] = 0),
        (u[2] = 0),
        (u[3] = 0),
        (u[4] = 0),
        (u[5] = (2 * t) / (a - n)),
        (u[6] = 0),
        (u[7] = 0),
        (u[8] = (e + r) / (e - r)),
        (u[9] = (a + n) / (a - n)),
        (u[10] = -(o + t) / (o - t)),
        (u[11] = -1),
        (u[12] = 0),
        (u[13] = 0),
        (u[14] = (-2 * o * t) / (o - t)),
        (u[15] = 0),
        u
    )
}
var cl = tr(Cn),
    vl = P(function (r, e, n, a) {
        var t = n * Math.tan((r * Math.PI) / 360),
            o = -t,
            u = o * e,
            i = t * e
        return Cn(u, i, o, t, n, a)
    })
function jn(r, e, n, a, t, o) {
    var u = new Float64Array(16)
    return (
        (u[0] = 2 / (e - r)),
        (u[1] = 0),
        (u[2] = 0),
        (u[3] = 0),
        (u[4] = 0),
        (u[5] = 2 / (a - n)),
        (u[6] = 0),
        (u[7] = 0),
        (u[8] = 0),
        (u[9] = 0),
        (u[10] = -2 / (o - t)),
        (u[11] = 0),
        (u[12] = -(e + r) / (e - r)),
        (u[13] = -(a + n) / (a - n)),
        (u[14] = -(o + t) / (o - t)),
        (u[15] = 1),
        u
    )
}
var fl = tr(jn),
    ll = P(function (r, e, n, a) {
        return jn(r, e, n, a, -1, 1)
    })
function Wn(r, e) {
    var n = new Float64Array(16),
        a = r[0],
        t = r[1],
        o = r[2],
        u = r[3],
        i = r[4],
        c = r[5],
        $ = r[6],
        l = r[7],
        s = r[8],
        b = r[9],
        _ = r[10],
        d = r[11],
        h = r[12],
        w = r[13],
        S = r[14],
        p = r[15],
        T = e[0],
        D = e[1],
        L = e[2],
        F = e[3],
        J = e[4],
        y = e[5],
        j = e[6],
        O = e[7],
        k = e[8],
        G = e[9],
        K = e[10],
        N = e[11],
        rr = e[12],
        vr = e[13],
        fr = e[14],
        lr = e[15]
    return (
        (n[0] = a * T + i * D + s * L + h * F),
        (n[1] = t * T + c * D + b * L + w * F),
        (n[2] = o * T + $ * D + _ * L + S * F),
        (n[3] = u * T + l * D + d * L + p * F),
        (n[4] = a * J + i * y + s * j + h * O),
        (n[5] = t * J + c * y + b * j + w * O),
        (n[6] = o * J + $ * y + _ * j + S * O),
        (n[7] = u * J + l * y + d * j + p * O),
        (n[8] = a * k + i * G + s * K + h * N),
        (n[9] = t * k + c * G + b * K + w * N),
        (n[10] = o * k + $ * G + _ * K + S * N),
        (n[11] = u * k + l * G + d * K + p * N),
        (n[12] = a * rr + i * vr + s * fr + h * lr),
        (n[13] = t * rr + c * vr + b * fr + w * lr),
        (n[14] = o * rr + $ * vr + _ * fr + S * lr),
        (n[15] = u * rr + l * vr + d * fr + p * lr),
        n
    )
}
var $l = v(Wn),
    sl = v(function (r, e) {
        var n = new Float64Array(16),
            a = r[0],
            t = r[1],
            o = r[2],
            u = r[4],
            i = r[5],
            c = r[6],
            $ = r[8],
            l = r[9],
            s = r[10],
            b = r[12],
            _ = r[13],
            d = r[14],
            h = e[0],
            w = e[1],
            S = e[2],
            p = e[4],
            T = e[5],
            D = e[6],
            L = e[8],
            F = e[9],
            J = e[10],
            y = e[12],
            j = e[13],
            O = e[14]
        return (
            (n[0] = a * h + u * w + $ * S),
            (n[1] = t * h + i * w + l * S),
            (n[2] = o * h + c * w + s * S),
            (n[3] = 0),
            (n[4] = a * p + u * T + $ * D),
            (n[5] = t * p + i * T + l * D),
            (n[6] = o * p + c * T + s * D),
            (n[7] = 0),
            (n[8] = a * L + u * F + $ * J),
            (n[9] = t * L + i * F + l * J),
            (n[10] = o * L + c * F + s * J),
            (n[11] = 0),
            (n[12] = a * y + u * j + $ * O + b),
            (n[13] = t * y + i * j + l * O + _),
            (n[14] = o * y + c * j + s * O + d),
            (n[15] = 1),
            n
        )
    }),
    _l = v(function (r, e) {
        var n = new Float64Array(16)
        e = Nr(e, ye)
        var a = e[0],
            t = e[1],
            o = e[2],
            u = Math.cos(r),
            i = 1 - u,
            c = Math.sin(r)
        return (
            (n[0] = a * a * i + u),
            (n[1] = t * a * i + o * c),
            (n[2] = o * a * i - t * c),
            (n[3] = 0),
            (n[4] = a * t * i - o * c),
            (n[5] = t * t * i + u),
            (n[6] = t * o * i + a * c),
            (n[7] = 0),
            (n[8] = a * o * i + t * c),
            (n[9] = t * o * i - a * c),
            (n[10] = o * o * i + u),
            (n[11] = 0),
            (n[12] = 0),
            (n[13] = 0),
            (n[14] = 0),
            (n[15] = 1),
            n
        )
    }),
    bl = m(function (r, e, n) {
        var a = new Float64Array(16),
            t = 1 / Bn(e),
            o = e[0] * t,
            u = e[1] * t,
            i = e[2] * t,
            c = Math.cos(r),
            $ = 1 - c,
            l = Math.sin(r),
            s = o * l,
            b = u * l,
            _ = i * l,
            d = o * u * $,
            h = o * i * $,
            w = u * i * $,
            S = o * o * $ + c,
            p = d + _,
            T = h - b,
            D = d - _,
            L = u * u * $ + c,
            F = w + s,
            J = h + b,
            y = w - s,
            j = i * i * $ + c,
            O = n[0],
            k = n[1],
            G = n[2],
            K = n[3],
            N = n[4],
            rr = n[5],
            vr = n[6],
            fr = n[7],
            lr = n[8],
            $e = n[9],
            se = n[10],
            _e = n[11],
            Ua = n[12],
            Ra = n[13],
            ya = n[14],
            Oa = n[15]
        return (
            (a[0] = O * S + N * p + lr * T),
            (a[1] = k * S + rr * p + $e * T),
            (a[2] = G * S + vr * p + se * T),
            (a[3] = K * S + fr * p + _e * T),
            (a[4] = O * D + N * L + lr * F),
            (a[5] = k * D + rr * L + $e * F),
            (a[6] = G * D + vr * L + se * F),
            (a[7] = K * D + fr * L + _e * F),
            (a[8] = O * J + N * y + lr * j),
            (a[9] = k * J + rr * y + $e * j),
            (a[10] = G * J + vr * y + se * j),
            (a[11] = K * J + fr * y + _e * j),
            (a[12] = Ua),
            (a[13] = Ra),
            (a[14] = ya),
            (a[15] = Oa),
            a
        )
    })
function Ro(r, e, n) {
    var a = new Float64Array(16)
    return (
        (a[0] = r),
        (a[1] = 0),
        (a[2] = 0),
        (a[3] = 0),
        (a[4] = 0),
        (a[5] = e),
        (a[6] = 0),
        (a[7] = 0),
        (a[8] = 0),
        (a[9] = 0),
        (a[10] = n),
        (a[11] = 0),
        (a[12] = 0),
        (a[13] = 0),
        (a[14] = 0),
        (a[15] = 1),
        a
    )
}
var pl = m(Ro),
    dl = P(function (r, e, n, a) {
        var t = new Float64Array(16)
        return (
            (t[0] = a[0] * r),
            (t[1] = a[1] * r),
            (t[2] = a[2] * r),
            (t[3] = a[3] * r),
            (t[4] = a[4] * e),
            (t[5] = a[5] * e),
            (t[6] = a[6] * e),
            (t[7] = a[7] * e),
            (t[8] = a[8] * n),
            (t[9] = a[9] * n),
            (t[10] = a[10] * n),
            (t[11] = a[11] * n),
            (t[12] = a[12]),
            (t[13] = a[13]),
            (t[14] = a[14]),
            (t[15] = a[15]),
            t
        )
    }),
    hl = v(function (r, e) {
        var n = new Float64Array(16),
            a = r[0],
            t = r[1],
            o = r[2]
        return (
            (n[0] = e[0] * a),
            (n[1] = e[1] * a),
            (n[2] = e[2] * a),
            (n[3] = e[3] * a),
            (n[4] = e[4] * t),
            (n[5] = e[5] * t),
            (n[6] = e[6] * t),
            (n[7] = e[7] * t),
            (n[8] = e[8] * o),
            (n[9] = e[9] * o),
            (n[10] = e[10] * o),
            (n[11] = e[11] * o),
            (n[12] = e[12]),
            (n[13] = e[13]),
            (n[14] = e[14]),
            (n[15] = e[15]),
            n
        )
    })
function yo(r, e, n) {
    var a = new Float64Array(16)
    return (
        (a[0] = 1),
        (a[1] = 0),
        (a[2] = 0),
        (a[3] = 0),
        (a[4] = 0),
        (a[5] = 1),
        (a[6] = 0),
        (a[7] = 0),
        (a[8] = 0),
        (a[9] = 0),
        (a[10] = 1),
        (a[11] = 0),
        (a[12] = r),
        (a[13] = e),
        (a[14] = n),
        (a[15] = 1),
        a
    )
}
var wl = m(yo),
    Sl = P(function (r, e, n, a) {
        var t = new Float64Array(16),
            o = a[0],
            u = a[1],
            i = a[2],
            c = a[3],
            $ = a[4],
            l = a[5],
            s = a[6],
            b = a[7],
            _ = a[8],
            d = a[9],
            h = a[10],
            w = a[11]
        return (
            (t[0] = o),
            (t[1] = u),
            (t[2] = i),
            (t[3] = c),
            (t[4] = $),
            (t[5] = l),
            (t[6] = s),
            (t[7] = b),
            (t[8] = _),
            (t[9] = d),
            (t[10] = h),
            (t[11] = w),
            (t[12] = o * r + $ * e + _ * n + a[12]),
            (t[13] = u * r + l * e + d * n + a[13]),
            (t[14] = i * r + s * e + h * n + a[14]),
            (t[15] = c * r + b * e + w * n + a[15]),
            t
        )
    }),
    gl = v(function (r, e) {
        var n = new Float64Array(16),
            a = r[0],
            t = r[1],
            o = r[2],
            u = e[0],
            i = e[1],
            c = e[2],
            $ = e[3],
            l = e[4],
            s = e[5],
            b = e[6],
            _ = e[7],
            d = e[8],
            h = e[9],
            w = e[10],
            S = e[11]
        return (
            (n[0] = u),
            (n[1] = i),
            (n[2] = c),
            (n[3] = $),
            (n[4] = l),
            (n[5] = s),
            (n[6] = b),
            (n[7] = _),
            (n[8] = d),
            (n[9] = h),
            (n[10] = w),
            (n[11] = S),
            (n[12] = u * a + l * t + d * o + e[12]),
            (n[13] = i * a + s * t + h * o + e[13]),
            (n[14] = c * a + b * t + w * o + e[14]),
            (n[15] = $ * a + _ * t + S * o + e[15]),
            n
        )
    }),
    Al = m(function (r, e, n) {
        var a = Jn(r, e, ye),
            t = Nr(Oe(n, a, Ln), Ln),
            o = Nr(Oe(a, t, Fn), Fn),
            u = Po,
            i = Uo
        return (
            (u[0] = t[0]),
            (u[1] = o[0]),
            (u[2] = a[0]),
            (u[3] = 0),
            (u[4] = t[1]),
            (u[5] = o[1]),
            (u[6] = a[1]),
            (u[7] = 0),
            (u[8] = t[2]),
            (u[9] = o[2]),
            (u[10] = a[2]),
            (u[11] = 0),
            (u[12] = 0),
            (u[13] = 0),
            (u[14] = 0),
            (u[15] = 1),
            (i[0] = 1),
            (i[1] = 0),
            (i[2] = 0),
            (i[3] = 0),
            (i[4] = 0),
            (i[5] = 1),
            (i[6] = 0),
            (i[7] = 0),
            (i[8] = 0),
            (i[9] = 0),
            (i[10] = 1),
            (i[11] = 0),
            (i[12] = -r[0]),
            (i[13] = -r[1]),
            (i[14] = -r[2]),
            (i[15] = 1),
            Wn(u, i)
        )
    }),
    ml = m(function (r, e, n) {
        var a = new Float64Array(16)
        return (
            (a[0] = r[0]),
            (a[1] = r[1]),
            (a[2] = r[2]),
            (a[3] = 0),
            (a[4] = e[0]),
            (a[5] = e[1]),
            (a[6] = e[2]),
            (a[7] = 0),
            (a[8] = n[0]),
            (a[9] = n[1]),
            (a[10] = n[2]),
            (a[11] = 0),
            (a[12] = 0),
            (a[13] = 0),
            (a[14] = 0),
            (a[15] = 1),
            a
        )
    }),
    Pn = 0
function Ur(r, e) {
    for (; e.b; e = e.b) r(e.a)
}
function Ge(r) {
    for (var e = 0; r.b; r = r.b) e++
    return e
}
var Oo =
        typeof requestAnimationFrame != "undefined"
            ? requestAnimationFrame
            : function (r) {
                  setTimeout(r, 1e3 / 60)
              },
    Go = Y(function (r, e, n, a, t) {
        return { $: 0, a: r, b: e, c: n, d: a, e: t }
    }),
    Vo = v(function (r, e) {
        var n = r.blend
        ;(n.toggle = r.toggle),
            n.enabled || (r.gl.enable(r.gl.BLEND), (n.enabled = !0)),
            (n.a !== e.a || n.d !== e.d) &&
                (r.gl.blendEquationSeparate(e.a, e.d),
                (n.a = e.a),
                (n.d = e.d)),
            (n.b !== e.b || n.c !== e.c || n.e !== e.e || n.f !== e.f) &&
                (r.gl.blendFuncSeparate(e.b, e.c, e.e, e.f),
                (n.b = e.b),
                (n.c = e.c),
                (n.e = e.e),
                (n.f = e.f)),
            (n.g !== e.g || n.h !== e.h || n.i !== e.i || n.j !== e.j) &&
                (r.gl.blendColor(e.g, e.h, e.i, e.j),
                (n.g = e.g),
                (n.h = e.h),
                (n.i = e.i),
                (n.j = e.j))
    }),
    ko = v(function (r, e) {
        var n = r.depthTest
        ;(n.toggle = r.toggle),
            n.enabled || (r.gl.enable(r.gl.DEPTH_TEST), (n.enabled = !0)),
            n.a !== e.a && (r.gl.depthFunc(e.a), (n.a = e.a)),
            n.b !== e.b && (r.gl.depthMask(e.b), (n.b = e.b)),
            (n.c !== e.c || n.d !== e.d) &&
                (r.gl.depthRange(e.c, e.d), (n.c = e.c), (n.d = e.d))
    }),
    Io = v(function (r, e) {
        var n = r.stencilTest
        ;(n.toggle = r.toggle),
            n.enabled || (r.gl.enable(r.gl.STENCIL_TEST), (n.enabled = !0)),
            (n.d !== e.d || n.a !== e.a || n.b !== e.b) &&
                (r.gl.stencilFuncSeparate(r.gl.FRONT, e.d, e.a, e.b),
                (n.d = e.d)),
            (n.e !== e.e || n.f !== e.f || n.g !== e.g) &&
                (r.gl.stencilOpSeparate(r.gl.FRONT, e.e, e.f, e.g),
                (n.e = e.e),
                (n.f = e.f),
                (n.g = e.g)),
            n.c !== e.c && (r.gl.stencilMask(e.c), (n.c = e.c)),
            (n.h !== e.h || n.a !== e.a || n.b !== e.b) &&
                (r.gl.stencilFuncSeparate(r.gl.BACK, e.h, e.a, e.b),
                (n.h = e.h),
                (n.a = e.a),
                (n.b = e.b)),
            (n.i !== e.i || n.j !== e.j || n.k !== e.k) &&
                (r.gl.stencilOpSeparate(r.gl.BACK, e.i, e.j, e.k),
                (n.i = e.i),
                (n.j = e.j),
                (n.k = e.k))
    }),
    Ho = v(function (r, e) {
        var n = r.scissor
        ;(n.toggle = r.toggle),
            n.enabled || (r.gl.enable(r.gl.SCISSOR_TEST), (n.enabled = !0)),
            (n.a !== e.a || n.b !== e.b || n.c !== e.c || n.d !== e.d) &&
                (r.gl.scissor(e.a, e.b, e.c, e.d),
                (n.a = e.a),
                (n.b = e.b),
                (n.c = e.c),
                (n.d = e.d))
    }),
    zo = v(function (r, e) {
        var n = r.colorMask
        ;(n.toggle = r.toggle),
            (n.enabled = !0),
            (n.a !== e.a || n.b !== e.b || n.c !== e.c || n.d !== e.d) &&
                (r.gl.colorMask(e.a, e.b, e.c, e.d),
                (n.a = e.a),
                (n.b = e.b),
                (n.c = e.c),
                (n.d = e.d))
    }),
    qo = v(function (r, e) {
        var n = r.cullFace
        ;(n.toggle = r.toggle),
            n.enabled || (r.gl.enable(r.gl.CULL_FACE), (n.enabled = !0)),
            n.a !== e.a && (r.gl.cullFace(e.a), (n.a = e.a))
    }),
    Xo = v(function (r, e) {
        var n = r.polygonOffset
        ;(n.toggle = r.toggle),
            n.enabled ||
                (r.gl.enable(r.gl.POLYGON_OFFSET_FILL), (n.enabled = !0)),
            (n.a !== e.a || n.b !== e.b) &&
                (r.gl.polygonOffset(e.a, e.b), (n.a = e.a), (n.b = e.b))
    }),
    Yo = v(function (r, e) {
        var n = r.sampleCoverage
        ;(n.toggle = r.toggle),
            n.enabled || (r.gl.enable(r.gl.SAMPLE_COVERAGE), (n.enabled = !0)),
            (n.a !== e.a || n.b !== e.b) &&
                (r.gl.sampleCoverage(e.a, e.b), (n.a = e.a), (n.b = e.b))
    }),
    xo = function (r) {
        var e = r.sampleAlphaToCoverage
        ;(e.toggle = r.toggle),
            e.enabled ||
                (r.gl.enable(r.gl.SAMPLE_ALPHA_TO_COVERAGE), (e.enabled = !0))
    },
    Zo = function (r) {
        r.blend.enabled && (r.gl.disable(r.gl.BLEND), (r.blend.enabled = !1))
    },
    Qo = function (r) {
        r.depthTest.enabled &&
            (r.gl.disable(r.gl.DEPTH_TEST), (r.depthTest.enabled = !1))
    },
    Ko = function (r) {
        r.stencilTest.enabled &&
            (r.gl.disable(r.gl.STENCIL_TEST), (r.stencilTest.enabled = !1))
    },
    Un = function (r) {
        r.scissor.enabled &&
            (r.gl.disable(r.gl.SCISSOR_TEST), (r.scissor.enabled = !1))
    },
    Rn = function (r) {
        var e = r.colorMask
        ;(!e.a || !e.b || !e.c || !e.d) &&
            (r.gl.colorMask(!0, !0, !0, !0),
            (e.a = !0),
            (e.b = !0),
            (e.c = !0),
            (e.d = !0))
    },
    No = function (r) {
        r.gl.disable(r.gl.CULL_FACE)
    },
    ru = function (r) {
        r.gl.disable(r.gl.POLYGON_OFFSET_FILL)
    },
    eu = function (r) {
        r.gl.disable(r.gl.SAMPLE_COVERAGE)
    },
    nu = function (r) {
        r.gl.disable(r.gl.SAMPLE_ALPHA_TO_COVERAGE)
    },
    yn = [
        "blend",
        "depthTest",
        "stencilTest",
        "scissor",
        "colorMask",
        "cullFace",
        "polygonOffset",
        "sampleCoverage",
        "sampleAlphaToCoverage",
    ],
    au = [Zo, Qo, Ko, Un, Rn, No, ru, eu, nu]
function On(r, e, n) {
    var a = r.createShader(n)
    return (
        r.shaderSource(
            a,
            `#extension GL_OES_standard_derivatives : enable
` + e
        ),
        r.compileShader(a),
        a
    )
}
function tu(r, e, n) {
    var a = r.createProgram()
    if (
        (r.attachShader(a, e),
        r.attachShader(a, n),
        r.linkProgram(a),
        !r.getProgramParameter(a, r.LINK_STATUS))
    )
        throw (
            "Link failed: " +
            r.getProgramInfoLog(a) +
            `
vs info-log: ` +
            r.getShaderInfoLog(e) +
            `
fs info-log: ` +
            r.getShaderInfoLog(n)
        )
    return a
}
function Gn(r, e) {
    switch (e) {
        case r.FLOAT:
            return {
                size: 1,
                arraySize: 1,
                type: Float32Array,
                baseType: r.FLOAT,
            }
        case r.FLOAT_VEC2:
            return {
                size: 2,
                arraySize: 1,
                type: Float32Array,
                baseType: r.FLOAT,
            }
        case r.FLOAT_VEC3:
            return {
                size: 3,
                arraySize: 1,
                type: Float32Array,
                baseType: r.FLOAT,
            }
        case r.FLOAT_VEC4:
            return {
                size: 4,
                arraySize: 1,
                type: Float32Array,
                baseType: r.FLOAT,
            }
        case r.FLOAT_MAT4:
            return {
                size: 4,
                arraySize: 4,
                type: Float32Array,
                baseType: r.FLOAT,
            }
        case r.INT:
            return { size: 1, arraySize: 1, type: Int32Array, baseType: r.INT }
    }
}
function ou(r, e, n, a) {
    for (var t = n.a.aQ, o = [], u = 0; u < t; u++)
        o.push(String.fromCharCode(97 + u))
    function i(_, d, h, w, S) {
        var p
        if (t === 1) for (p = 0; p < d; p++) _[h++] = d === 1 ? w[S] : w[S][p]
        else
            o.forEach(function (T) {
                for (p = 0; p < d; p++) _[h++] = d === 1 ? w[T][S] : w[T][S][p]
            })
    }
    var c = Gn(r, e.type)
    if (c === void 0) throw new Error("No info available for: " + e.type)
    var $ = 0,
        l = c.size * c.arraySize * t,
        s = new c.type(Ge(n.b) * l)
    Ur(function (_) {
        i(s, c.size * c.arraySize, $, _, a[e.name] || e.name), ($ += l)
    }, n.b)
    var b = r.createBuffer()
    return (
        r.bindBuffer(r.ARRAY_BUFFER, b),
        r.bufferData(r.ARRAY_BUFFER, s, r.STATIC_DRAW),
        b
    )
}
function iu(r, e) {
    if (e.a.aZ > 0) {
        var n = r.createBuffer(),
            a = uu(e.c, e.a.aZ)
        return (
            r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, n),
            r.bufferData(r.ELEMENT_ARRAY_BUFFER, a, r.STATIC_DRAW),
            { numIndices: a.length, indexBuffer: n, buffers: {} }
        )
    } else
        return { numIndices: e.a.aQ * Ge(e.b), indexBuffer: null, buffers: {} }
}
function uu(r, e) {
    var n = new Uint16Array(Ge(r) * e),
        a = 0,
        t
    return (
        Ur(function (o) {
            if (e === 1) n[a++] = o
            else for (t = 0; t < e; t++) n[a++] = o[String.fromCharCode(97 + t)]
        }, r),
        n
    )
}
function Vn(r, e) {
    return r + "#" + e
}
var kn = v(function (r, e) {
    var n = r.f,
        a = n.gl
    if (!a) return e
    a.viewport(0, 0, a.drawingBufferWidth, a.drawingBufferHeight),
        n.depthTest.b || (a.depthMask(!0), (n.depthTest.b = !0)),
        n.stencilTest.c !== n.STENCIL_WRITEMASK &&
            (a.stencilMask(n.STENCIL_WRITEMASK),
            (n.stencilTest.c = n.STENCIL_WRITEMASK)),
        Un(n),
        Rn(n),
        a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT | a.STENCIL_BUFFER_BIT)
    function t(o) {
        if (!o.d.b.b) return
        var u, i, c
        if (
            (o.b.id &&
                o.c.id &&
                ((u = Vn(o.b.id, o.c.id)), (i = n.programs[u])),
            !i)
        ) {
            var $
            o.b.id ? ($ = n.shaders[o.b.id]) : (o.b.id = Pn++),
                $ ||
                    (($ = On(a, o.b.src, a.VERTEX_SHADER)),
                    (n.shaders[o.b.id] = $))
            var l
            o.c.id ? (l = n.shaders[o.c.id]) : (o.c.id = Pn++),
                l ||
                    ((l = On(a, o.c.src, a.FRAGMENT_SHADER)),
                    (n.shaders[o.c.id] = l))
            var s = tu(a, $, l)
            ;(i = {
                glProgram: s,
                attributes: Object.assign({}, o.b.attributes, o.c.attributes),
                currentUniforms: {},
                activeAttributes: [],
                activeAttributeLocations: [],
            }),
                (i.uniformSetters = cu(
                    a,
                    r,
                    i,
                    Object.assign({}, o.b.uniforms, o.c.uniforms)
                ))
            var b = a.getProgramParameter(s, a.ACTIVE_ATTRIBUTES)
            for (c = 0; c < b; c++) {
                var _ = a.getActiveAttrib(s, c),
                    d = a.getAttribLocation(s, _.name)
                i.activeAttributes.push(_), i.activeAttributeLocations.push(d)
            }
            ;(u = Vn(o.b.id, o.c.id)), (n.programs[u] = i)
        }
        n.lastProgId !== u && (a.useProgram(i.glProgram), (n.lastProgId = u)),
            vu(i.uniformSetters, o.e)
        var h = n.buffers.get(o.d)
        for (
            h || ((h = iu(a, o.d)), n.buffers.set(o.d, h)), c = 0;
            c < i.activeAttributes.length;
            c++
        ) {
            ;(_ = i.activeAttributes[c]),
                (d = i.activeAttributeLocations[c]),
                h.buffers[_.name] === void 0 &&
                    (h.buffers[_.name] = ou(a, _, o.d, i.attributes)),
                a.bindBuffer(a.ARRAY_BUFFER, h.buffers[_.name])
            var w = Gn(a, _.type)
            if (w.arraySize === 1)
                a.enableVertexAttribArray(d),
                    a.vertexAttribPointer(d, w.size, w.baseType, !1, 0, 0)
            else
                for (
                    var S = w.size * 4, p = S * w.arraySize, T = 0;
                    T < w.arraySize;
                    T++
                )
                    a.enableVertexAttribArray(d + T),
                        a.vertexAttribPointer(
                            d + T,
                            w.size,
                            w.baseType,
                            !1,
                            p,
                            S * T
                        )
        }
        for (n.toggle = !n.toggle, Ur(fu(n), o.a), c = 0; c < yn.length; c++) {
            var D = n[yn[c]]
            D.toggle !== n.toggle &&
                D.enabled &&
                (au[c](n), (D.enabled = !1), (D.toggle = n.toggle))
        }
        h.indexBuffer
            ? (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, h.indexBuffer),
              a.drawElements(o.d.a.bj, h.numIndices, a.UNSIGNED_SHORT, 0))
            : a.drawArrays(o.d.a.bj, 0, h.numIndices)
    }
    return Ur(t, r.g), e
})
function cu(r, e, n, a) {
    var t = n.glProgram,
        o = n.currentUniforms,
        u = 0,
        i = e.f
    function c(_, d) {
        var h = d.name,
            w = r.getUniformLocation(_, h)
        switch (d.type) {
            case r.INT:
                return function (p) {
                    o[h] !== p && (r.uniform1i(w, p), (o[h] = p))
                }
            case r.FLOAT:
                return function (p) {
                    o[h] !== p && (r.uniform1f(w, p), (o[h] = p))
                }
            case r.FLOAT_VEC2:
                return function (p) {
                    o[h] !== p && (r.uniform2f(w, p[0], p[1]), (o[h] = p))
                }
            case r.FLOAT_VEC3:
                return function (p) {
                    o[h] !== p && (r.uniform3f(w, p[0], p[1], p[2]), (o[h] = p))
                }
            case r.FLOAT_VEC4:
                return function (p) {
                    o[h] !== p &&
                        (r.uniform4f(w, p[0], p[1], p[2], p[3]), (o[h] = p))
                }
            case r.FLOAT_MAT4:
                return function (p) {
                    o[h] !== p &&
                        (r.uniformMatrix4fv(w, !1, new Float32Array(p)),
                        (o[h] = p))
                }
            case r.SAMPLER_2D:
                var S = u++
                return function (p) {
                    r.activeTexture(r.TEXTURE0 + S)
                    var T = i.textures.get(p)
                    T || ((T = p.bZ(r)), i.textures.set(p, T)),
                        r.bindTexture(r.TEXTURE_2D, T),
                        o[h] !== p && (r.uniform1i(w, S), (o[h] = p))
                }
            case r.BOOL:
                return function (p) {
                    o[h] !== p && (r.uniform1i(w, p), (o[h] = p))
                }
            default:
                return function () {}
        }
    }
    for (
        var $ = {}, l = r.getProgramParameter(t, r.ACTIVE_UNIFORMS), s = 0;
        s < l;
        s++
    ) {
        var b = r.getActiveUniform(t, s)
        $[a[b.name] || b.name] = c(t, b)
    }
    return $
}
function vu(r, e) {
    Object.keys(e).forEach(function (n) {
        var a = r[n]
        a && a(e[n])
    })
}
var su = m(function (r, e, n) {
        return Zt(e, { g: n, f: {}, h: r }, lu, $u)
    }),
    _u = v(function (r, e) {
        ;(r.contextAttributes.alpha = !0),
            (r.contextAttributes.premultipliedAlpha = e.a)
    }),
    bu = v(function (r, e) {
        ;(r.contextAttributes.depth = !0),
            r.sceneSettings.push(function (n) {
                n.clearDepth(e.a)
            })
    }),
    pu = v(function (r, e) {
        ;(r.contextAttributes.stencil = !0),
            r.sceneSettings.push(function (n) {
                n.clearStencil(e.a)
            })
    }),
    du = v(function (r, e) {
        r.contextAttributes.antialias = !0
    }),
    hu = v(function (r, e) {
        r.sceneSettings.push(function (n) {
            n.clearColor(e.a, e.b, e.c, e.d)
        })
    }),
    wu = v(function (r, e) {
        r.contextAttributes.preserveDrawingBuffer = !0
    })
function lu(r) {
    var e = {
        contextAttributes: {
            alpha: !1,
            depth: !1,
            stencil: !1,
            antialias: !1,
            premultipliedAlpha: !1,
            preserveDrawingBuffer: !1,
        },
        sceneSettings: [],
    }
    Ur(function (t) {
        return f(Su, e, t)
    }, r.h)
    var n = ir.createElement("canvas"),
        a =
            n.getContext &&
            (n.getContext("webgl", e.contextAttributes) ||
                n.getContext("experimental-webgl", e.contextAttributes))
    return (
        a && typeof WeakMap != "undefined"
            ? (e.sceneSettings.forEach(function (t) {
                  t(a)
              }),
              a.getExtension("OES_standard_derivatives"),
              (r.f.gl = a),
              (r.f.toggle = !1),
              (r.f.blend = { enabled: !1, toggle: !1 }),
              (r.f.depthTest = { enabled: !1, toggle: !1 }),
              (r.f.stencilTest = { enabled: !1, toggle: !1 }),
              (r.f.scissor = { enabled: !1, toggle: !1 }),
              (r.f.colorMask = { enabled: !1, toggle: !1 }),
              (r.f.cullFace = { enabled: !1, toggle: !1 }),
              (r.f.polygonOffset = { enabled: !1, toggle: !1 }),
              (r.f.sampleCoverage = { enabled: !1, toggle: !1 }),
              (r.f.sampleAlphaToCoverage = { enabled: !1, toggle: !1 }),
              (r.f.shaders = []),
              (r.f.programs = {}),
              (r.f.lastProgId = null),
              (r.f.buffers = new WeakMap()),
              (r.f.textures = new WeakMap()),
              (r.f.STENCIL_WRITEMASK = a.getParameter(a.STENCIL_WRITEMASK)),
              Oo(function () {
                  return f(kn, r, n)
              }))
            : ((n = ir.createElement("div")),
              (n.innerHTML =
                  '<a href="https://get.webgl.org/">Enable WebGL</a> to see this content!')),
        n
    )
}
function $u(r, e) {
    return (e.f = r.f), kn(e)
}
var en = 1,
    Va = 2,
    nn = 0,
    I = Ha,
    In = m(function (r, e, n) {
        r: for (;;) {
            if (n.$ === -2) return e
            var a = n.b,
                t = n.c,
                o = n.d,
                u = n.e,
                i = r,
                c = g(r, a, t, g(In, r, e, u)),
                $ = o
            ;(r = i), (e = c), (n = $)
            continue r
        }
    }),
    rn = function (r) {
        return g(
            In,
            m(function (e, n, a) {
                return f(I, C(e, n), a)
            }),
            M,
            r
        )
    },
    re = Za,
    Tl = m(function (r, e, n) {
        var a = n.c,
            t = n.d,
            o = v(function (u, i) {
                if (u.$) {
                    var $ = u.a
                    return g(re, r, i, $)
                } else {
                    var c = u.a
                    return g(re, o, i, c)
                }
            })
        return g(re, o, g(re, r, e, t), a)
    }),
    ur = function (r) {
        return { $: 1, a: r }
    },
    we = v(function (r, e) {
        return { $: 3, a: r, b: e }
    }),
    on = v(function (r, e) {
        return { $: 0, a: r, b: e }
    }),
    un = v(function (r, e) {
        return { $: 1, a: r, b: e }
    }),
    z = function (r) {
        return { $: 0, a: r }
    },
    Jt = function (r) {
        return { $: 2, a: r }
    },
    B = function (r) {
        return { $: 0, a: r }
    },
    W = { $: 1 },
    gu = vt,
    Au = Ct,
    Rr = st,
    yr = v(function (r, e) {
        return f(it, r, he(e))
    }),
    mu = v(function (r, e) {
        return R(f(ut, r, e))
    }),
    Hn = function (r) {
        return f(
            yr,
            `
    `,
            f(
                mu,
                `
`,
                r
            )
        )
    },
    ee = m(function (r, e, n) {
        r: for (;;)
            if (n.b) {
                var a = n.a,
                    t = n.b,
                    o = r,
                    u = f(r, a, e),
                    i = t
                ;(r = o), (e = u), (n = i)
                continue r
            } else return e
    }),
    zn = function (r) {
        return g(
            ee,
            v(function (e, n) {
                return n + 1
            }),
            0,
            r
        )
    },
    Tu = za,
    Eu = m(function (r, e, n) {
        r: for (;;)
            if (H(r, e) < 1) {
                var a = r,
                    t = e - 1,
                    o = f(I, e, n)
                ;(r = a), (e = t), (n = o)
                continue r
            } else return n
    }),
    Du = v(function (r, e) {
        return g(Eu, r, e, M)
    }),
    Lu = v(function (r, e) {
        return g(Tu, r, f(Du, 0, zn(e) - 1), e)
    }),
    Ve = bt,
    qn = function (r) {
        var e = Ve(r)
        return 97 <= e && e <= 122
    },
    Xn = function (r) {
        var e = Ve(r)
        return e <= 90 && 65 <= e
    },
    Fu = function (r) {
        return qn(r) || Xn(r)
    },
    Mu = function (r) {
        var e = Ve(r)
        return e <= 57 && 48 <= e
    },
    Ju = function (r) {
        return qn(r) || Xn(r) || Mu(r)
    },
    br = function (r) {
        return g(ee, I, M, r)
    },
    Bu = at,
    ju = v(function (r, e) {
        return (
            `

(` +
            (Rr(r + 1) + (") " + Hn(Cu(e))))
        )
    }),
    Cu = function (r) {
        return f(Wu, r, M)
    },
    Wu = v(function (r, e) {
        r: for (;;)
            switch (r.$) {
                case 0:
                    var n = r.a,
                        a = r.b,
                        t = (function () {
                            var h = Bu(n)
                            if (h.$ === 1) return !1
                            var w = h.a,
                                S = w.a,
                                p = w.b
                            return Fu(S) && f(gu, Ju, p)
                        })(),
                        o = t ? "." + n : "['" + (n + "']"),
                        u = a,
                        i = f(I, o, e)
                    ;(r = u), (e = i)
                    continue r
                case 1:
                    var c = r.a,
                        a = r.b,
                        $ = "[" + (Rr(c) + "]"),
                        u = a,
                        i = f(I, $, e)
                    ;(r = u), (e = i)
                    continue r
                case 2:
                    var l = r.a
                    if (l.b)
                        if (l.b.b) {
                            var s = (function () {
                                    return e.b
                                        ? "The Json.Decode.oneOf at json" +
                                              f(yr, "", br(e))
                                        : "Json.Decode.oneOf"
                                })(),
                                d =
                                    s +
                                    (" failed in the following " +
                                        (Rr(zn(l)) + " ways:"))
                            return f(
                                yr,
                                `

`,
                                f(I, d, f(Lu, ju, l))
                            )
                        } else {
                            var a = l.a,
                                u = a,
                                i = e
                            ;(r = u), (e = i)
                            continue r
                        }
                    else
                        return (
                            "Ran into a Json.Decode.oneOf with no possibilities" +
                            (function () {
                                return e.b ? " at json" + f(yr, "", br(e)) : "!"
                            })()
                        )
                default:
                    var b = r.a,
                        _ = r.b,
                        d = (function () {
                            return e.b
                                ? "Problem with the value at json" +
                                      (f(yr, "", br(e)) +
                                          `:

    `)
                                : `Problem with the given value:

`
                        })()
                    return (
                        d +
                        (Hn(f(Au, 4, _)) +
                            (`

` +
                                b))
                    )
            }
    }),
    Q = 32,
    ke = P(function (r, e, n, a) {
        return { $: 0, a: r, b: e, c: n, d: a }
    }),
    Ie = qa,
    Yn = rt,
    xn = v(function (r, e) {
        return an(e) / an(r)
    }),
    He = Yn(f(xn, 2, Q)),
    Pu = U(ke, 0, He, Ie, Ie),
    Zn = Ya,
    Uu = function (r) {
        return { $: 1, a: r }
    },
    El = v(function (r, e) {
        return r(e)
    }),
    Dl = v(function (r, e) {
        return e(r)
    }),
    Ru = et,
    Qn = Xa,
    yu = v(function (r, e) {
        return H(r, e) > 0 ? r : e
    }),
    Ou = function (r) {
        return { $: 0, a: r }
    },
    Kn = xa,
    Gu = v(function (r, e) {
        r: for (;;) {
            var n = f(Kn, Q, r),
                a = n.a,
                t = n.b,
                o = f(I, Ou(a), e)
            if (t.b) {
                var u = t,
                    i = o
                ;(r = u), (e = i)
                continue r
            } else return br(o)
        }
    }),
    Vu = v(function (r, e) {
        r: for (;;) {
            var n = Yn(e / Q)
            if (n === 1) return f(Kn, Q, r).a
            var a = f(Gu, r, M),
                t = n
            ;(r = a), (e = t)
            continue r
        }
    }),
    ku = v(function (r, e) {
        if (e.f) {
            var n = e.f * Q,
                a = Ru(f(xn, Q, n - 1)),
                t = r ? br(e.i) : e.i,
                o = f(Vu, t, e.f)
            return U(ke, Qn(e.h) + n, f(yu, 5, a * He), o, e.h)
        } else return U(ke, Qn(e.h), He, Ie, e.h)
    }),
    Iu = Y(function (r, e, n, a, t) {
        r: for (;;) {
            if (e < 0) return f(ku, !1, { i: a, f: (n / Q) | 0, h: t })
            var o = Uu(g(Zn, Q, e, r)),
                u = r,
                i = e - Q,
                c = n,
                $ = f(I, o, a),
                l = t
            ;(r = u), (e = i), (n = c), (a = $), (t = l)
            continue r
        }
    }),
    Bt = v(function (r, e) {
        if (r <= 0) return Pu
        var n = r % Q,
            a = g(Zn, n, r - n, e),
            t = r - n - Q
        return A(Iu, e, t, r, M, a)
    }),
    x = function (r) {
        return !r.$
    },
    xr = Lt,
    Zr = Ft,
    no = pt,
    Be = function (r) {
        switch (r.$) {
            case 0:
                return 0
            case 1:
                return 1
            case 2:
                return 2
            default:
                return 3
        }
    },
    Hu = function (r) {
        return r
    },
    Ao = Hu,
    Nn = tr(function (r, e, n, a, t, o) {
        return { aU: o, aX: e, bo: a, bq: n, bt: r, bu: t }
    }),
    zu = ft,
    qu = tt,
    ra = ct,
    Or = v(function (r, e) {
        return r < 1 ? e : g(ra, r, qu(e), e)
    }),
    ne = $t,
    ae = function (r) {
        return r === ""
    },
    te = v(function (r, e) {
        return r < 1 ? "" : g(ra, 0, r, e)
    }),
    Xu = _t,
    ea = Y(function (r, e, n, a, t) {
        if (ae(t) || f(zu, "@", t)) return W
        var o = f(ne, ":", t)
        if (o.b) {
            if (o.b.b) return W
            var u = o.a,
                i = Xu(f(Or, u + 1, t))
            if (i.$ === 1) return W
            var c = i
            return B(sr(Nn, r, f(te, u, t), c, e, n, a))
        } else return B(sr(Nn, r, t, W, e, n, a))
    }),
    na = P(function (r, e, n, a) {
        if (ae(a)) return W
        var t = f(ne, "/", a)
        if (t.b) {
            var o = t.a
            return A(ea, r, f(Or, o, a), e, n, f(te, o, a))
        } else return A(ea, r, "/", e, n, a)
    }),
    aa = m(function (r, e, n) {
        if (ae(n)) return W
        var a = f(ne, "?", n)
        if (a.b) {
            var t = a.a
            return U(na, r, B(f(Or, t + 1, n)), e, f(te, t, n))
        } else return U(na, r, W, e, n)
    }),
    Ll = v(function (r, e) {
        if (ae(e)) return W
        var n = f(ne, "#", e)
        if (n.b) {
            var a = n.a
            return g(aa, r, B(f(Or, a + 1, e)), f(te, a, e))
        } else return g(aa, r, W, e)
    }),
    Yu = lt,
    Ue = function (r) {
        r: for (;;) {
            var e = r,
                n = e
            r = n
            continue r
        }
    },
    gr = pr,
    xu = gr(0),
    ta = P(function (r, e, n, a) {
        if (a.b) {
            var t = a.a,
                o = a.b
            if (o.b) {
                var u = o.a,
                    i = o.b
                if (i.b) {
                    var c = i.a,
                        $ = i.b
                    if ($.b) {
                        var l = $.a,
                            s = $.b,
                            b =
                                n > 500
                                    ? g(ee, r, e, br(s))
                                    : U(ta, r, e, n + 1, s)
                        return f(r, t, f(r, u, f(r, c, f(r, l, b))))
                    } else return f(r, t, f(r, u, f(r, c, e)))
                } else return f(r, t, f(r, u, e))
            } else return f(r, t, e)
        } else return e
    }),
    Gr = m(function (r, e, n) {
        return U(ta, r, e, 0, n)
    }),
    Zu = v(function (r, e) {
        return g(
            Gr,
            v(function (n, a) {
                return f(I, r(n), a)
            }),
            M,
            e
        )
    }),
    Vr = Ae,
    ze = v(function (r, e) {
        return f(
            Vr,
            function (n) {
                return gr(r(n))
            },
            e
        )
    }),
    Qu = m(function (r, e, n) {
        return f(
            Vr,
            function (a) {
                return f(
                    Vr,
                    function (t) {
                        return gr(f(r, a, t))
                    },
                    n
                )
            },
            e
        )
    }),
    Ku = function (r) {
        return g(Gr, Qu(I), gr(M), r)
    },
    Nu = Vt,
    ri = v(function (r, e) {
        var n = e
        return vn(f(Vr, Nu(r), n))
    }),
    ei = m(function (r, e, n) {
        return f(
            ze,
            function (a) {
                return 0
            },
            Ku(f(Zu, ri(r), e))
        )
    }),
    ni = m(function (r, e, n) {
        return gr(0)
    }),
    ai = v(function (r, e) {
        var n = e
        return f(ze, r, n)
    })
ar.Task = Gt(xu, ei, ni, ai)
var oa = sn("Task"),
    Re = v(function (r, e) {
        return oa(f(ze, r, e))
    }),
    ti = So,
    ua = v(function (r, e) {
        return { $: 0, a: r, b: e }
    }),
    ia = function (r) {
        return { $: 1, a: r }
    },
    oi = Tt,
    ca = v(function (r, e) {
        return g(Gr, oi, e, r)
    }),
    oe = _n,
    va = Se,
    cr = { $: -2 },
    fa = cr,
    la = fa,
    ue = v(function (r, e) {
        return {
            bT: -e * 0.5,
            b9: e,
            cf: -r * 0.5,
            cC: r * 0.5,
            cL: e * 0.5,
            c_: r,
        }
    }),
    ui = {},
    ii = { aS: M, bA: f(ue, 2, 2), bH: { aP: fa, a2: la }, bI: 0, bN: ui },
    kr = St,
    ie = m(function (r, e, n) {
        return r(e(n))
    }),
    ci = jt,
    vi = v(function (r, e) {
        return oa(
            f(ci, f(ie, f(ie, gr, r), ur), f(Vr, f(ie, f(ie, gr, r), z), e))
        )
    }),
    To = { $: 0 },
    Eo = v(function (r, e) {
        return { $: 1, a: r, b: e }
    }),
    fi = v(function (r, e) {
        var n = r.cg,
            a = r.ci,
            t = r.cb,
            o = r.cY,
            u = r.b7,
            i = P(function (c, $, l, s) {
                var b = c,
                    _ = $,
                    d = l,
                    h = s
                return sr(Do, b, _, d, h, u, e)
            })
        return U(i, n, a, t, o)
    }),
    $a = 33071,
    sa = 9729,
    li = { b7: !0, cb: $a, cg: sa, ci: sa, cY: $a },
    _a = P(function (r, e, n, a) {
        return f(
            vi,
            function (t) {
                if (t.$) {
                    var u = t.a
                    return e(u)
                } else {
                    var o = t.a
                    return f(r, n, o)
                }
            },
            f(fi, li, a)
        )
    }),
    $i = v(function (r, e) {
        if (e.$) return r
        var n = e.a
        return n
    }),
    si = function (r) {
        var e = U(
                _a,
                ua,
                ia,
                "magic",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            ),
            n = g(
                Zr,
                ue,
                f(ca, R(["screen", "width"]), kr),
                f(ca, R(["screen", "height"]), kr)
            ),
            a = f($i, f(ue, 100, 100), f(va, n, r)),
            t = ii
        return C(wr(t, { bA: a }), oe(R([e])))
    },
    _i = function (r) {
        return { $: 5, a: r }
    },
    bi = function (r) {
        return { $: 6, a: r }
    },
    pi = { $: 3 },
    di = { $: 4 },
    hi = function (r) {
        return { $: 2, a: r }
    },
    wi = _n,
    ba = At,
    Si = Br("error", ba),
    ce = gt,
    gi = Br("input", ce),
    Ai = Br("join", ce),
    mi = Br("leave", ce),
    Ti = Br("receive", ba),
    Ei = function (r) {
        return wi(
            R([
                Ti(hi),
                Ai(function (e) {
                    return pi
                }),
                mi(function (e) {
                    return di
                }),
                Si(_i),
                gi(bi),
            ])
        )
    },
    E = Y(function (r, e, n, a, t) {
        return { $: -1, a: r, b: e, c: n, d: a, e: t }
    }),
    Er = Y(function (r, e, n, a, t) {
        if (t.$ === -1 && !t.a) {
            var o = t.a,
                u = t.b,
                i = t.c,
                c = t.d,
                $ = t.e
            if (a.$ === -1 && !a.a) {
                var l = a.a,
                    s = a.b,
                    b = a.c,
                    _ = a.d,
                    d = a.e
                return A(E, 0, e, n, A(E, 1, s, b, _, d), A(E, 1, u, i, c, $))
            } else return A(E, r, u, i, A(E, 0, e, n, a, c), $)
        } else if (a.$ === -1 && !a.a && a.d.$ === -1 && !a.d.a) {
            var h = a.a,
                s = a.b,
                b = a.c,
                w = a.d,
                S = w.a,
                p = w.b,
                T = w.c,
                D = w.d,
                L = w.e,
                d = a.e
            return A(E, 0, s, b, A(E, 1, p, T, D, L), A(E, 1, e, n, d, t))
        } else return A(E, r, e, n, a, t)
    }),
    pa = ka,
    qe = m(function (r, e, n) {
        if (n.$ === -2) return A(E, 0, r, e, cr, cr)
        var a = n.a,
            t = n.b,
            o = n.c,
            u = n.d,
            i = n.e,
            c = f(pa, r, t)
        switch (c) {
            case 0:
                return A(Er, a, t, o, g(qe, r, e, u), i)
            case 1:
                return A(E, a, t, e, u, i)
            default:
                return A(Er, a, t, o, u, g(qe, r, e, i))
        }
    }),
    Xe = m(function (r, e, n) {
        var a = g(qe, r, e, n)
        if (a.$ === -1 && !a.a) {
            var t = a.a,
                o = a.b,
                u = a.c,
                i = a.d,
                c = a.e
            return A(E, 1, o, u, i, c)
        } else {
            var $ = a
            return $
        }
    }),
    da = v(function (r, e) {
        var n = e.a,
            a = e.b
        return C(n, r(a))
    }),
    Ar = oe(M),
    Di = v(function (r, e) {
        return { $: 2, a: r, b: e }
    }),
    Li = function (r) {
        return { $: 0, a: r }
    },
    Fi = function (r) {
        return { $: 1, a: r }
    },
    Mi = Dt,
    Ji = wt,
    Bi = dt,
    Ci = function (r) {
        switch (r) {
            case 1:
                return 0
            case 2:
                return 1
            case 3:
                return 2
            case 4:
                return 3
            case 5:
                return 4
            case 6:
                return 5
            case 7:
                return 6
            case 8:
                return 7
            default:
                return 8
        }
    },
    Dr = Et,
    ha = ht,
    ji = f(
        Mi,
        function (r) {
            switch (r) {
                case 0:
                    return f(xr, Li, f(Dr, 1, kr))
                case 1:
                    return f(xr, Fi, g(Zr, ue, f(Dr, 1, kr), f(Dr, 2, kr)))
                case 2:
                    return g(Zr, Di, f(Dr, 1, Ji), f(xr, Ci, f(Dr, 2, ha)))
                default:
                    return Bi("unknown message type")
            }
        },
        f(Dr, 0, ha)
    ),
    Wi = mt,
    Pi = va(Wi(ji)),
    Ui = function (r) {
        r: for (;;)
            if (r.$ === -1 && r.d.$ === -1) {
                var e = r.d,
                    n = e
                r = n
                continue r
            } else return r
    },
    wa = function (r) {
        if (r.$ === -1 && r.d.$ === -1 && r.e.$ === -1)
            if (r.e.d.$ === -1 && !r.e.d.a) {
                var e = r.a,
                    n = r.b,
                    a = r.c,
                    t = r.d,
                    o = t.a,
                    u = t.b,
                    i = t.c,
                    c = t.d,
                    $ = t.e,
                    l = r.e,
                    s = l.a,
                    b = l.b,
                    _ = l.c,
                    d = l.d,
                    h = d.a,
                    w = d.b,
                    S = d.c,
                    p = d.d,
                    T = d.e,
                    D = l.e
                return A(
                    E,
                    0,
                    w,
                    S,
                    A(E, 1, n, a, A(E, 0, u, i, c, $), p),
                    A(E, 1, b, _, T, D)
                )
            } else {
                var e = r.a,
                    n = r.b,
                    a = r.c,
                    L = r.d,
                    o = L.a,
                    u = L.b,
                    i = L.c,
                    c = L.d,
                    $ = L.e,
                    F = r.e,
                    s = F.a,
                    b = F.b,
                    _ = F.c,
                    d = F.d,
                    D = F.e
                return (
                    e === 1,
                    A(E, 1, n, a, A(E, 0, u, i, c, $), A(E, 0, b, _, d, D))
                )
            }
        else return r
    },
    Sa = function (r) {
        if (r.$ === -1 && r.d.$ === -1 && r.e.$ === -1)
            if (r.d.d.$ === -1 && !r.d.d.a) {
                var e = r.a,
                    n = r.b,
                    a = r.c,
                    t = r.d,
                    o = t.a,
                    u = t.b,
                    i = t.c,
                    c = t.d,
                    $ = c.a,
                    l = c.b,
                    s = c.c,
                    b = c.d,
                    _ = c.e,
                    d = t.e,
                    h = r.e,
                    w = h.a,
                    S = h.b,
                    p = h.c,
                    T = h.d,
                    D = h.e
                return A(
                    E,
                    0,
                    u,
                    i,
                    A(E, 1, l, s, b, _),
                    A(E, 1, n, a, d, A(E, 0, S, p, T, D))
                )
            } else {
                var e = r.a,
                    n = r.b,
                    a = r.c,
                    L = r.d,
                    o = L.a,
                    u = L.b,
                    i = L.c,
                    F = L.d,
                    d = L.e,
                    J = r.e,
                    w = J.a,
                    S = J.b,
                    p = J.c,
                    T = J.d,
                    D = J.e
                return (
                    e === 1,
                    A(E, 1, n, a, A(E, 0, u, i, F, d), A(E, 0, S, p, T, D))
                )
            }
        else return r
    },
    Ri = zr(function (r, e, n, a, t, o, u) {
        if (o.$ === -1 && !o.a) {
            var i = o.a,
                c = o.b,
                $ = o.c,
                l = o.d,
                s = o.e
            return A(E, n, c, $, l, A(E, 0, a, t, s, u))
        } else {
            r: for (;;)
                if (u.$ === -1 && u.a === 1)
                    if (u.d.$ === -1)
                        if (u.d.a === 1) {
                            var b = u.a,
                                _ = u.d,
                                d = _.a
                            return Sa(e)
                        } else break r
                    else {
                        var h = u.a,
                            w = u.d
                        return Sa(e)
                    }
                else break r
            return e
        }
    }),
    ve = function (r) {
        if (r.$ === -1 && r.d.$ === -1) {
            var e = r.a,
                n = r.b,
                a = r.c,
                t = r.d,
                o = t.a,
                u = t.d,
                i = r.e
            if (o === 1)
                if (u.$ === -1 && !u.a) {
                    var c = u.a
                    return A(E, e, n, a, ve(t), i)
                } else {
                    var $ = wa(r)
                    if ($.$ === -1) {
                        var l = $.a,
                            s = $.b,
                            b = $.c,
                            _ = $.d,
                            d = $.e
                        return A(Er, l, s, b, ve(_), d)
                    } else return cr
                }
            else return A(E, e, n, a, ve(t), i)
        } else return cr
    },
    Ir = v(function (r, e) {
        if (e.$ === -2) return cr
        var n = e.a,
            a = e.b,
            t = e.c,
            o = e.d,
            u = e.e
        if (H(r, a) < 0)
            if (o.$ === -1 && o.a === 1) {
                var i = o.a,
                    c = o.d
                if (c.$ === -1 && !c.a) {
                    var $ = c.a
                    return A(E, n, a, t, f(Ir, r, o), u)
                } else {
                    var l = wa(e)
                    if (l.$ === -1) {
                        var s = l.a,
                            b = l.b,
                            _ = l.c,
                            d = l.d,
                            h = l.e
                        return A(Er, s, b, _, f(Ir, r, d), h)
                    } else return cr
                }
            } else return A(E, n, a, t, f(Ir, r, o), u)
        else return f(yi, r, be(Ri, r, e, n, a, t, o, u))
    }),
    yi = v(function (r, e) {
        if (e.$ === -1) {
            var n = e.a,
                a = e.b,
                t = e.c,
                o = e.d,
                u = e.e
            if (de(r, a)) {
                var i = Ui(u)
                if (i.$ === -1) {
                    var c = i.b,
                        $ = i.c
                    return A(Er, n, c, $, o, ve(u))
                } else return cr
            } else return A(Er, n, a, t, o, f(Ir, r, u))
        } else return cr
    }),
    ga = v(function (r, e) {
        var n = f(Ir, r, e)
        if (n.$ === -1 && !n.a) {
            var a = n.a,
                t = n.b,
                o = n.c,
                u = n.d,
                i = n.e
            return A(E, 1, t, o, u, i)
        } else {
            var c = n
            return c
        }
    }),
    Oi = v(function (r, e) {
        var n = e
        return f(ga, r, n)
    }),
    Lr = function (r) {
        switch (r) {
            case "0":
                return B(0)
            case "1":
                return B(1)
            case "2":
                return B(2)
            case "3":
                return B(3)
            case "4":
                return B(4)
            case "5":
                return B(5)
            case "6":
                return B(6)
            case "7":
                return B(7)
            case "8":
                return B(8)
            case "9":
                return B(9)
            case "a":
                return B(10)
            case "b":
                return B(11)
            case "c":
                return B(12)
            case "d":
                return B(13)
            case "e":
                return B(14)
            case "f":
                return B(15)
            default:
                return W
        }
    },
    Gi = zr(function (r, e, n, a, t, o, u) {
        if (e.$ === 1) return W
        var i = e.a
        if (n.$ === 1) return W
        var c = n.a
        if (a.$ === 1) return W
        var $ = a.a
        if (t.$ === 1) return W
        var l = t.a
        if (o.$ === 1) return W
        var s = o.a
        if (u.$ === 1) return W
        var b = u.a
        return B(sr(r, i, c, $, l, s, b))
    }),
    Vi = ot,
    ki = function (r) {
        return g(Vi, I, M, r)
    },
    Aa = Jo,
    Ii = function (r) {
        var e = f(Yu, "#", r) ? f(Or, 1, r) : r,
            n = ki(e)
        if (
            n.b &&
            n.b.b &&
            n.b.b.b &&
            n.b.b.b.b &&
            n.b.b.b.b.b &&
            n.b.b.b.b.b.b &&
            !n.b.b.b.b.b.b.b
        ) {
            var a = n.a,
                t = n.b,
                o = t.a,
                u = t.b,
                i = u.a,
                c = u.b,
                $ = c.a,
                l = c.b,
                s = l.a,
                b = l.b,
                _ = b.a
            return be(
                Gi,
                tr(function (d, h, w, S, p, T) {
                    return g(
                        Aa,
                        (d * 16 + h) / 255,
                        (w * 16 + S) / 255,
                        (p * 16 + T) / 255
                    )
                }),
                Lr(a),
                Lr(o),
                Lr(i),
                Lr($),
                Lr(s),
                Lr(_)
            )
        } else return W
    },
    Hi = v(function (r, e) {
        if (e.$) return r
        var n = e.a
        return n
    }),
    zi = f(Hi, g(Aa, 0, 0, 0), Ii("#3465a4")),
    qi = m(function (r, e, n) {
        return { $: 0, a: r, b: e, c: n }
    }),
    Xi = function (r) {
        return function (e) {
            return function (n) {
                return function (a) {
                    return function (t) {
                        return function (o) {
                            return function (u) {
                                return function (i) {
                                    return function (c) {
                                        return function ($) {
                                            return {
                                                $: 0,
                                                a: r,
                                                b: e,
                                                c: n,
                                                d: a,
                                                e: t,
                                                f: o,
                                                g: u,
                                                h: i,
                                                i: c,
                                                j: $,
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    Yi = function (r) {
        var e = r.aq,
            n = r.an,
            a = r.al,
            t = r.ai,
            o = r.am,
            u = r.ak,
            i = v(function (c, $) {
                var l = c.a,
                    s = c.b,
                    b = c.c,
                    _ = $.a,
                    d = $.b,
                    h = $.c
                return Xi(l)(s)(b)(_)(d)(h)(e)(n)(a)(t)
            })
        return f(i, o, u)
    },
    xi = m(function (r, e, n) {
        return { $: 0, a: r, b: e, c: n }
    }),
    ma = v(function (r, e) {
        var n = r,
            a = e
        return g(xi, 32774, n, a)
    }),
    Zi = v(function (r, e) {
        return Yi({
            ai: 0,
            ak: f(ma, r, e),
            al: 0,
            am: f(ma, r, e),
            an: 0,
            aq: 0,
        })
    }),
    Qi = P(function (r, e, n, a) {
        return { $: 4, a: r, b: e, c: n, d: a }
    }),
    Ki = Qi,
    Ni = P(function (r, e, n, a) {
        return { $: 1, a: r, b: e, c: n, d: a }
    }),
    rc = function (r) {
        var e = r.E,
            n = r.B,
            a = r.A
        return U(Ni, 515, e, n, a)
    },
    ec = 771,
    nc = 770,
    ac = R([f(Zi, nc, ec), U(Ki, !0, !0, !0, !1), rc({ A: 1, B: 0, E: !0 })]),
    Su = v(function (r, e) {
        switch (e.$) {
            case 0:
                return f(_u, r, e)
            case 1:
                return f(bu, r, e)
            case 2:
                return f(pu, r, e)
            case 3:
                return f(du, r, e)
            case 4:
                return f(hu, r, e)
            default:
                return f(wu, r, e)
        }
    }),
    fu = v(function (r, e) {
        switch (e.$) {
            case 0:
                return f(Vo, r, e)
            case 1:
                return f(ko, r, e)
            case 2:
                return f(Io, r, e)
            case 3:
                return f(Ho, r, e)
            case 4:
                return f(zo, r, e)
            case 5:
                return f(qo, r, e)
            case 6:
                return f(Xo, r, e)
            case 7:
                return f(Yo, r, e)
            default:
                return xo(r)
        }
    }),
    tc = Go,
    oc = {
        src: `
        precision mediump float;
        uniform vec4 color;
        varying vec2 uv;
        void main () {
            gl_FragColor = color;
            gl_FragColor.a *= smoothstep(0.01,0.04,1.-length(uv));
            if(gl_FragColor.a <= 0.025) discard;
        }
    `,
        attributes: {},
        uniforms: { color: "am" },
    },
    uc = v(function (r, e) {
        return { $: 0, a: r, b: e }
    }),
    ic = uc({ aQ: 1, aZ: 0, bj: 5 }),
    fe = Lo,
    cc = ic(
        R([
            { aj: f(fe, -1, -1) },
            { aj: f(fe, -1, 1) },
            { aj: f(fe, 1, -1) },
            { aj: f(fe, 1, 1) },
        ])
    ),
    Ta = m(function (r, e, n) {
        return e(r(n))
    }),
    vc = Bo,
    fc = Co,
    lc = f(Ta, vc, function (r) {
        return g(fc, r.c0, r.c3, r.at)
    }),
    $c = {
        src: `
            precision mediump float;
            attribute vec2 aP;
            uniform vec4 uT;
            uniform vec2 uP;
            uniform float z;
            varying vec2 uv;
            vec2 edgeFix = vec2(0.0000001, -0.0000001);
            void main () {
                uv = aP + edgeFix;
                gl_Position = vec4(aP * mat2(uT) + uP, z  * -1.19209304e-7, 1.0);
            }
        `,
        attributes: { aP: "aj" },
        uniforms: { uP: "cR", uT: "cS", z: "at" },
    },
    sc = Y(function (r, e, n, a, t) {
        return A(tc, ac, $c, oc, cc, { am: f(lc, r, t), cR: e, cS: n, at: a })
    }),
    _c = v(function (r, e) {
        return {
            ai: 0,
            e: g(qi, e * 2, e * 2, sc(r)),
            d: 1,
            a: 1,
            b: 1,
            c0: 0,
            c3: 0,
            at: 0,
        }
    }),
    le = m(function (r, e, n) {
        r: for (;;) {
            if (n.$ === -2) return e
            var a = n.b,
                t = n.c,
                o = n.d,
                u = n.e,
                i = r,
                c = g(r, a, t, g(le, r, e, o)),
                $ = u
            ;(r = i), (e = c), (n = $)
            continue r
        }
    }),
    bc = v(function (r, e) {
        return g(
            le,
            m(function (n, a, t) {
                return f(ga, n, t)
            }),
            r,
            e
        )
    }),
    pc = v(function (r, e) {
        var n = r,
            a = e
        return f(bc, n, a)
    }),
    dc = m(function (r, e, n) {
        var a = n
        return g(
            le,
            m(function (t, o, u) {
                return f(r, t, u)
            }),
            e,
            a
        )
    }),
    hc = function (r) {
        return U(_a, ua, ia, r, r)
    },
    wc = { o: 1, p: 0, y: 0, q: 0, r: 1, z: 0 },
    Sc = v(function (r, e) {
        return {
            o: r.o * e.o + r.p * e.q,
            p: r.o * e.p + r.p * e.r,
            y: r.o * e.y + r.p * e.z + r.y,
            q: r.q * e.o + r.r * e.q,
            r: r.q * e.p + r.r * e.r,
            z: r.q * e.y + r.r * e.z + r.z,
        }
    }),
    Ea = Ka,
    Da = Na,
    gc = Y(function (r, e, n, a, t) {
        return {
            o: Ea(t) * n,
            p: Da(t) * -a,
            y: r,
            q: Da(t) * n,
            r: Ea(t) * a,
            z: e,
        }
    }),
    Ye = tr(function (r, e, n, a, t, o) {
        return f(Sc, o, A(gc, r, e, n, a, t))
    }),
    La = v(function (r, e) {
        r: for (;;) {
            if (e.$ === -2) return W
            var n = e.b,
                a = e.c,
                t = e.d,
                o = e.e,
                u = f(pa, r, n)
            switch (u) {
                case 0:
                    var i = r,
                        c = t
                    ;(r = i), (e = c)
                    continue r
                case 1:
                    return B(a)
                default:
                    var i = r,
                        c = o
                    ;(r = i), (e = c)
                    continue r
            }
        }
    }),
    Ac = v(function (r, e) {
        var n = e
        return g(Xe, r, 0, n)
    }),
    mc = v(function (r, e) {
        var n = f(La, r, e)
        return !n.$
    }),
    Tc = v(function (r, e) {
        var n = e
        return f(mc, r, n)
    }),
    Ec = m(function (r, e, n) {
        return {
            o: r * n.o,
            p: r * n.p,
            y: r * n.y,
            q: e * n.q,
            r: e * n.r,
            z: e * n.z,
        }
    }),
    Fa = m(function (r, e, n) {
        var a = n
        return wr(a, { d: r * a.d, at: e + a.at })
    }),
    Dc = Fo,
    Lc = jo,
    Fc = function (r) {
        var e = r.o,
            n = r.p,
            a = r.y,
            t = r.q,
            o = r.r,
            u = r.z
        return C(Lc({ bM: o, c0: e, c3: n, at: t }), Dc({ c0: a, c3: u }))
    },
    Ma = Y(function (r, e, n, a, t) {
        r: for (;;) {
            var o = a.c0,
                u = a.c3,
                i = a.at,
                c = a.ai,
                $ = a.a,
                l = a.b,
                s = a.d,
                b = a.e,
                _ = t.a,
                d = t.b
            switch (b.$) {
                case 0:
                    var h = b.a,
                        w = b.b,
                        S = b.c,
                        p = Fc(
                            g(
                                Ec,
                                1 / r.c_,
                                1 / r.b9,
                                sr(Ye, o * 2, u * 2, h * $, w * l, c, n)
                            )
                        ),
                        T = p.a,
                        D = p.b
                    return C(f(I, U(S, D, T, i, s), _), d)
                case 1:
                    var L = b.a,
                        S = b.b,
                        F = f(La, L, e)
                    if (F.$) return f(Tc, L, d) ? t : C(_, f(Ac, L, d))
                    var J = F.a,
                        y = S(J),
                        j = r,
                        O = e,
                        k = sr(Ye, o * 2, u * 2, $, l, c, n),
                        G = g(Fa, s, i, y),
                        K = t
                    ;(r = j), (e = O), (n = k), (a = G), (t = K)
                    continue r
                default:
                    var N = b.a,
                        S = function (rr) {
                            return U(
                                Ma,
                                r,
                                e,
                                sr(Ye, o * 2, u * 2, $, l, c, n),
                                g(Fa, s, i, rr)
                            )
                        }
                    return g(Gr, S, t, N)
            }
        }
    }),
    Mc = m(function (r, e, n) {
        return g(Gr, g(Ma, e, r, wc), C(M, la), n)
    }),
    Jc = v(function (r, e) {
        return g(le, Xe, e, r)
    }),
    Bc = v(function (r, e) {
        var n = r,
            a = e
        return f(Jc, n, a)
    }),
    Cc = v(function (r, e) {
        var n = e.bH,
            a = e.bA,
            t = e.bN,
            o = g(Mc, n.aP, a, R([f(_c, zi, 20)])),
            u = o.a,
            i = o.b
        return C(
            wr(e, { aS: u, bH: wr(n, { a2: f(Bc, i, n.a2) }), bI: r, bN: t }),
            oe(g(dc, f(Ta, hc, I), M, f(pc, i, n.a2)))
        )
    }),
    jc = v(function (r, e) {
        var n = e.bH
        switch (r.$) {
            case 6:
                var a = r.a,
                    t = Pi(a)
                if (t.$) {
                    var i = t.a
                    return C(e, Ar)
                } else {
                    var o = t.a
                    return f(
                        da,
                        oe,
                        g(
                            ee,
                            v(function (l, s) {
                                var b = s.a,
                                    _ = s.b
                                switch (l.$) {
                                    case 0:
                                        var d = l.a
                                        return f(
                                            da,
                                            function (p) {
                                                return f(I, p, _)
                                            },
                                            f(Cc, d, b)
                                        )
                                    case 1:
                                        var h = l.a
                                        return C(wr(b, { bA: h }), _)
                                    default:
                                        var w = l.a,
                                            S = l.b
                                        return C(b, _)
                                }
                            }),
                            C(e, M),
                            o
                        )
                    )
                }
            case 2:
                var u = r.a
                return C(e, Ar)
            case 3:
                return C(e, Ar)
            case 4:
                return C(e, Ar)
            case 5:
                var i = r.a
                return C(e, Ar)
            case 0:
                var c = r.a,
                    $ = r.b
                return C(
                    wr(e, {
                        bH: wr(n, {
                            aP: g(Xe, c, $, n.aP),
                            a2: f(Oi, c, n.a2),
                        }),
                    }),
                    Ar
                )
            default:
                return C(e, Ar)
        }
    }),
    Wc = function (r) {
        return f(Je, "height", Rr(r))
    },
    Ja = nt,
    Pc = function (r) {
        return f(Je, "width", Rr(r))
    },
    Uc = Qt,
    Rc = Uc,
    yc = m(function (r, e, n) {
        return g(su, r, e, n)
    }),
    Oc = function (r) {
        return { $: 0, a: r }
    },
    Gc = Oc,
    Vc = P(function (r, e, n, a) {
        return { $: 4, a: r, b: e, c: n, d: a }
    }),
    kc = Vc,
    Ic = function (r) {
        return { $: 1, a: r }
    },
    Hc = Ic,
    zc = R([Gc(!0), Hc(1), U(kc, 1, 1, 1, 1)]),
    qc = v(function (r, e) {
        return U(Rc, yc, zc, r, e)
    }),
    Xc = function (r) {
        var e = r.bA,
            n = r.aS,
            a = r.bN
        return f(qc, R([Pc(Ja(e.c_)), Wc(Ja(e.b9))]), n)
    },
    Yc = function (r) {
        return { bS: R([Xc(r)]), cK: "ClientTouch" }
    },
    xc = ti({ cd: si, cH: Ei, cU: jc, cZ: Yc }),
    Zc = { ClientTouch: { init: xc(ce)(0) } },
    Ba = Zc
function Ca(r = Kc) {
    let { rAF: e, screen: n } = r,
        a = Ba.ClientTouch.init({ flags: { screen: n } })
    return e(Qc(a, r)), a
}
var Qc = (r, { rAF: e, resize: n, keyBind: a }) => {
        let t = []
        n((u, i) => t.push([Hr.resize, u, i])),
            a((u, i) => t.push([Hr.inputKey, u, i]))
        let o = () => {
            t.push([Hr.rAF, performance.now()]),
                r.ports.input.send(t),
                (t.length = 0),
                e(o)
        }
        return o
    },
    Hr
;(function (r) {
    ;(r[(r.rAF = 0)] = "rAF"),
        (r[(r.resize = 1)] = "resize"),
        (r[(r.inputKey = 2)] = "inputKey")
})(Hr || (Hr = {}))
var ja
;(function (r) {
    ;(r[(r.North = 1)] = "North"),
        (r[(r.NorthEast = 2)] = "NorthEast"),
        (r[(r.East = 3)] = "East"),
        (r[(r.SouthEast = 4)] = "SouthEast"),
        (r[(r.South = 5)] = "South"),
        (r[(r.SouthWest = 6)] = "SouthWest"),
        (r[(r.West = 7)] = "West"),
        (r[(r.NorthWest = 8)] = "NorthWest")
})(ja || (ja = {}))
var Kc = {
        screen: { width: window.innerWidth, height: window.innerHeight },
        rAF: window.requestAnimationFrame,
        resize: (r) => {
            window.addEventListener("resize", (e) => {
                r(window.innerWidth, window.innerHeight)
            })
        },
        keyBind: (r) => {
            window.addEventListener("keydown", (e) => {
                e.preventDefault()
                let n = Wa[e.code]
                !e.repeat && n && r(!0, n)
            }),
                window.addEventListener("keyup", (e) => {
                    e.preventDefault()
                    let n = Wa[e.code]
                    n && r(!1, n)
                })
        },
    },
    Wa = { KeyD: 3, KeyS: 5, KeyA: 7, KeyW: 1 }
function Pa() {
    "serviceWorker" in navigator &&
        window.addEventListener("load", async () => {
            try {
                let r = await navigator.serviceWorker.register(
                    "/service-worker.js"
                )
                console.log(
                    "ServiceWorker registration successful with scope: ",
                    r.scope
                )
            } catch (r) {
                console.log("ServiceWorker registration failed: ", r)
            }
        })
}
Pa()
xe() && Qe()
var Pl = Ca(),
    Ul = new Worker("/1.0.0-snap/worker/server.js", {
        name: "server-web-worker",
        type: "module",
    })
