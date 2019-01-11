/*Hammer*/
;(function(e, t, n, r) {
    "use strict"
    function l(e, t, n) {
      return setTimeout(m(e, n), t)
    }
    function c(e, t, n) {
      if (Array.isArray(e)) {
        h(e, n[t], n)
        return true
      }
      return false
    }
    function h(e, t, n) {
      var i
      if (!e) {
        return
      }
      if (e.forEach) {
        e.forEach(t, n)
      } else if (e.length !== r) {
        i = 0
        while (i < e.length) {
          t.call(n, e[i], i, e)
          i++
        }
      } else {
        for (i in e) {
          e.hasOwnProperty(i) && t.call(n, e[i], i, e)
        }
      }
    }
    function p(e, t, n) {
      var i = Object.keys(t)
      var s = 0
      while (s < i.length) {
        if (!n || (n && e[i[s]] === r)) {
          e[i[s]] = t[i[s]]
        }
        s++
      }
      return e
    }
    function d(e, t) {
      return p(e, t, true)
    }
    function v(e, t, n) {
      var r = t.prototype,
        i
      i = e.prototype = Object.create(r)
      i.constructor = e
      i._super = r
      if (n) {
        p(i, n)
      }
    }
    function m(e, t) {
      return function() {
        return e.apply(t, arguments)
      }
    }
    function g(e, t) {
      if (typeof e == o) {
        return e.apply(t ? t[0] || r : r, t)
      }
      return e
    }
    function y(e, t) {
      return e === r ? t : e
    }
    function b(e, t, n) {
      h(x(t), function(t) {
        e.addEventListener(t, n, false)
      })
    }
    function w(e, t, n) {
      h(x(t), function(t) {
        e.removeEventListener(t, n, false)
      })
    }
    function E(e, t) {
      while (e) {
        if (e == t) {
          return true
        }
        e = e.parentNode
      }
      return false
    }
    function S(e, t) {
      return e.indexOf(t) > -1
    }
    function x(e) {
      return e.trim().split(/\s+/g)
    }
    function T(e, t, n) {
      if (e.indexOf && !n) {
        return e.indexOf(t)
      } else {
        var r = 0
        while (r < e.length) {
          if ((n && e[r][n] == t) || (!n && e[r] === t)) {
            return r
          }
          r++
        }
        return -1
      }
    }
    function N(e) {
      return Array.prototype.slice.call(e, 0)
    }
    function C(e, t, n) {
      var r = []
      var i = []
      var s = 0
      while (s < e.length) {
        var o = t ? e[s][t] : e[s]
        if (T(i, o) < 0) {
          r.push(e[s])
        }
        i[s] = o
        s++
      }
      if (n) {
        if (!t) {
          r = r.sort()
        } else {
          r = r.sort(function(n, r) {
            return n[t] > r[t]
          })
        }
      }
      return r
    }
    function k(e, t) {
      var n, s
      var o = t[0].toUpperCase() + t.slice(1)
      var u = 0
      while (u < i.length) {
        n = i[u]
        s = n ? n + o : t
        if (s in e) {
          return s
        }
        u++
      }
      return r
    }
    function A() {
      return L++
    }
    function O(e) {
      var t = e.ownerDocument
      return t.defaultView || t.parentWindow
    }
    function et(e, t) {
      var n = this
      this.manager = e
      this.callback = t
      this.element = e.element
      this.target = e.options.inputTarget
      this.domHandler = function(t) {
        if (g(e.options.enable, [e])) {
          n.handler(t)
        }
      }
      this.init()
    }
    function tt(e) {
      var t
      var n = e.options.inputClass
      if (n) {
        t = n
      } else if (D) {
        t = St
      } else if (P) {
        t = Ot
      } else if (!_) {
        t = gt
      } else {
        t = _t
      }
      return new t(e, nt)
    }
    function nt(e, t, n) {
      var r = n.pointers.length
      var i = n.changedPointers.length
      var s = t & q && r - i === 0
      var o = t & (U | z) && r - i === 0
      n.isFirst = !!s
      n.isFinal = !!o
      if (s) {
        e.session = {}
      }
      n.eventType = t
      rt(e, n)
      e.emit("hammer.input", n)
      e.recognize(n)
      e.session.prevInput = n
    }
    function rt(e, t) {
      var n = e.session
      var r = t.pointers
      var i = r.length
      if (!n.firstInput) {
        n.firstInput = ot(t)
      }
      if (i > 1 && !n.firstMultiple) {
        n.firstMultiple = ot(t)
      } else if (i === 1) {
        n.firstMultiple = false
      }
      var s = n.firstInput
      var o = n.firstMultiple
      var u = o ? o.center : s.center
      var a = (t.center = ut(r))
      t.timeStamp = f()
      t.deltaTime = t.timeStamp - s.timeStamp
      t.angle = ct(u, a)
      t.distance = lt(u, a)
      it(n, t)
      t.offsetDirection = ft(t.deltaX, t.deltaY)
      t.scale = o ? pt(o.pointers, r) : 1
      t.rotation = o ? ht(o.pointers, r) : 0
      st(n, t)
      var l = e.element
      if (E(t.srcEvent.target, l)) {
        l = t.srcEvent.target
      }
      t.target = l
    }
    function it(e, t) {
      var n = t.center
      var r = e.offsetDelta || {}
      var i = e.prevDelta || {}
      var s = e.prevInput || {}
      if (t.eventType === q || s.eventType === U) {
        i = e.prevDelta = { x: s.deltaX || 0, y: s.deltaY || 0 }
        r = e.offsetDelta = { x: n.x, y: n.y }
      }
      t.deltaX = i.x + (n.x - r.x)
      t.deltaY = i.y + (n.y - r.y)
    }
    function st(e, t) {
      var n = e.lastInterval || t,
        i = t.timeStamp - n.timeStamp,
        s,
        o,
        u,
        f
      if (t.eventType != z && (i > I || n.velocity === r)) {
        var l = n.deltaX - t.deltaX
        var c = n.deltaY - t.deltaY
        var h = at(i, l, c)
        o = h.x
        u = h.y
        s = a(h.x) > a(h.y) ? h.x : h.y
        f = ft(l, c)
        e.lastInterval = t
      } else {
        s = n.velocity
        o = n.velocityX
        u = n.velocityY
        f = n.direction
      }
      t.velocity = s
      t.velocityX = o
      t.velocityY = u
      t.direction = f
    }
    function ot(e) {
      var t = []
      var n = 0
      while (n < e.pointers.length) {
        t[n] = {
          clientX: u(e.pointers[n].clientX),
          clientY: u(e.pointers[n].clientY)
        }
        n++
      }
      return {
        timeStamp: f(),
        pointers: t,
        center: ut(t),
        deltaX: e.deltaX,
        deltaY: e.deltaY
      }
    }
    function ut(e) {
      var t = e.length
      if (t === 1) {
        return { x: u(e[0].clientX), y: u(e[0].clientY) }
      }
      var n = 0,
        r = 0,
        i = 0
      while (i < t) {
        n += e[i].clientX
        r += e[i].clientY
        i++
      }
      return { x: u(n / t), y: u(r / t) }
    }
    function at(e, t, n) {
      return { x: t / e || 0, y: n / e || 0 }
    }
    function ft(e, t) {
      if (e === t) {
        return W
      }
      if (a(e) >= a(t)) {
        return e > 0 ? X : V
      }
      return t > 0 ? $ : J
    }
    function lt(e, t, n) {
      if (!n) {
        n = Y
      }
      var r = t[n[0]] - e[n[0]],
        i = t[n[1]] - e[n[1]]
      return Math.sqrt(r * r + i * i)
    }
    function ct(e, t, n) {
      if (!n) {
        n = Y
      }
      var r = t[n[0]] - e[n[0]],
        i = t[n[1]] - e[n[1]]
      return (Math.atan2(i, r) * 180) / Math.PI
    }
    function ht(e, t) {
      return ct(t[1], t[0], Z) - ct(e[1], e[0], Z)
    }
    function pt(e, t) {
      return lt(t[0], t[1], Z) / lt(e[0], e[1], Z)
    }
    function gt() {
      this.evEl = vt
      this.evWin = mt
      this.allow = true
      this.pressed = false
      et.apply(this, arguments)
    }
    function St() {
      this.evEl = wt
      this.evWin = Et
      et.apply(this, arguments)
      this.store = this.manager.session.pointerEvents = []
    }
    function Ct() {
      this.evTarget = Tt
      this.evWin = Nt
      this.started = false
      et.apply(this, arguments)
    }
    function kt(e, t) {
      var n = N(e.touches)
      var r = N(e.changedTouches)
      if (t & (U | z)) {
        n = C(n.concat(r), "identifier", true)
      }
      return [n, r]
    }
    function Ot() {
      this.evTarget = At
      this.targetIds = {}
      et.apply(this, arguments)
    }
    function Mt(e, t) {
      var n = N(e.touches)
      var r = this.targetIds
      if (t & (q | R) && n.length === 1) {
        r[n[0].identifier] = true
        return [n, n]
      }
      var i,
        s,
        o = N(e.changedTouches),
        u = [],
        a = this.target
      s = n.filter(function(e) {
        return E(e.target, a)
      })
      if (t === q) {
        i = 0
        while (i < s.length) {
          r[s[i].identifier] = true
          i++
        }
      }
      i = 0
      while (i < o.length) {
        if (r[o[i].identifier]) {
          u.push(o[i])
        }
        if (t & (U | z)) {
          delete r[o[i].identifier]
        }
        i++
      }
      if (!u.length) {
        return
      }
      return [C(s.concat(u), "identifier", true), u]
    }
    function _t() {
      et.apply(this, arguments)
      var e = m(this.handler, this)
      this.touch = new Ot(this.manager, e)
      this.mouse = new gt(this.manager, e)
    }
    function Rt(e, t) {
      this.manager = e
      this.set(t)
    }
    function Ut(e) {
      if (S(e, Ft)) {
        return Ft
      }
      var t = S(e, It)
      var n = S(e, qt)
      if (t && n) {
        return It + " " + qt
      }
      if (t || n) {
        return t ? It : qt
      }
      if (S(e, jt)) {
        return jt
      }
      return Bt
    }
    function Qt(e) {
      this.id = A()
      this.manager = null
      this.options = d(e || {}, this.defaults)
      this.options.enable = y(this.options.enable, true)
      this.state = zt
      this.simultaneous = {}
      this.requireFail = []
    }
    function Gt(e) {
      if (e & Jt) {
        return "cancel"
      } else if (e & Vt) {
        return "end"
      } else if (e & Xt) {
        return "move"
      } else if (e & Wt) {
        return "start"
      }
      return ""
    }
    function Yt(e) {
      if (e == J) {
        return "down"
      } else if (e == $) {
        return "up"
      } else if (e == X) {
        return "left"
      } else if (e == V) {
        return "right"
      }
      return ""
    }
    function Zt(e, t) {
      var n = t.manager
      if (n) {
        return n.get(e)
      }
      return e
    }
    function en() {
      Qt.apply(this, arguments)
    }
    function tn() {
      en.apply(this, arguments)
      this.pX = null
      this.pY = null
    }
    function nn() {
      en.apply(this, arguments)
    }
    function rn() {
      Qt.apply(this, arguments)
      this._timer = null
      this._input = null
    }
    function sn() {
      en.apply(this, arguments)
    }
    function on() {
      en.apply(this, arguments)
    }
    function un() {
      Qt.apply(this, arguments)
      this.pTime = false
      this.pCenter = false
      this._timer = null
      this._input = null
      this.count = 0
    }
    function an(e, t) {
      t = t || {}
      t.recognizers = y(t.recognizers, an.defaults.preset)
      return new cn(e, t)
    }
    function cn(e, t) {
      t = t || {}
      this.options = d(t, an.defaults)
      this.options.inputTarget = this.options.inputTarget || e
      this.handlers = {}
      this.session = {}
      this.recognizers = []
      this.element = e
      this.input = tt(this)
      this.touchAction = new Rt(this, this.options.touchAction)
      hn(this, true)
      h(
        t.recognizers,
        function(e) {
          var t = this.add(new e[0](e[1]))
          e[2] && t.recognizeWith(e[2])
          e[3] && t.requireFailure(e[3])
        },
        this
      )
    }
    function hn(e, t) {
      var n = e.element
      h(e.options.cssProps, function(e, r) {
        n.style[k(n.style, r)] = t ? e : ""
      })
    }
    function pn(e, n) {
      var r = t.createEvent("Event")
      r.initEvent(e, true, true)
      r.gesture = n
      n.target.dispatchEvent(r)
    }
    var i = ["", "webkit", "moz", "MS", "ms", "o"]
    var s = t.createElement("div")
    var o = "function"
    var u = Math.round
    var a = Math.abs
    var f = Date.now
    var L = 1
    var M = /mobile|tablet|ip(ad|hone|od)|android/i
    var _ = "ontouchstart" in e
    var D = k(e, "PointerEvent") !== r
    var P = _ && M.test(navigator.userAgent)
    var H = "touch"
    var B = "pen"
    var j = "mouse"
    var F = "kinect"
    var I = 25
    var q = 1
    var R = 2
    var U = 4
    var z = 8
    var W = 1
    var X = 2
    var V = 4
    var $ = 8
    var J = 16
    var K = X | V
    var Q = $ | J
    var G = K | Q
    var Y = ["x", "y"]
    var Z = ["clientX", "clientY"]
    et.prototype = {
      handler: function() {},
      init: function() {
        this.evEl && b(this.element, this.evEl, this.domHandler)
        this.evTarget && b(this.target, this.evTarget, this.domHandler)
        this.evWin && b(O(this.element), this.evWin, this.domHandler)
      },
      destroy: function() {
        this.evEl && w(this.element, this.evEl, this.domHandler)
        this.evTarget && w(this.target, this.evTarget, this.domHandler)
        this.evWin && w(O(this.element), this.evWin, this.domHandler)
      }
    }
    var dt = { mousedown: q, mousemove: R, mouseup: U }
    var vt = "mousedown"
    var mt = "mousemove mouseup"
    v(gt, et, {
      handler: function(t) {
        var n = dt[t.type]
        if (n & q && t.button === 0) {
          this.pressed = true
        }
        if (n & R && t.which !== 1) {
          n = U
        }
        if (!this.pressed || !this.allow) {
          return
        }
        if (n & U) {
          this.pressed = false
        }
        this.callback(this.manager, n, {
          pointers: [t],
          changedPointers: [t],
          pointerType: j,
          srcEvent: t
        })
      }
    })
    var yt = {
      pointerdown: q,
      pointermove: R,
      pointerup: U,
      pointercancel: z,
      pointerout: z
    }
    var bt = { 2: H, 3: B, 4: j, 5: F }
    var wt = "pointerdown"
    var Et = "pointermove pointerup pointercancel"
    if (e.MSPointerEvent) {
      wt = "MSPointerDown"
      Et = "MSPointerMove MSPointerUp MSPointerCancel"
    }
    v(St, et, {
      handler: function(t) {
        var n = this.store
        var r = false
        var i = t.type.toLowerCase().replace("ms", "")
        var s = yt[i]
        var o = bt[t.pointerType] || t.pointerType
        var u = o == H
        var a = T(n, t.pointerId, "pointerId")
        if (s & q && (t.button === 0 || u)) {
          if (a < 0) {
            n.push(t)
            a = n.length - 1
          }
        } else if (s & (U | z)) {
          r = true
        }
        if (a < 0) {
          return
        }
        n[a] = t
        this.callback(this.manager, s, {
          pointers: n,
          changedPointers: [t],
          pointerType: o,
          srcEvent: t
        })
        if (r) {
          n.splice(a, 1)
        }
      }
    })
    var xt = { touchstart: q, touchmove: R, touchend: U, touchcancel: z }
    var Tt = "touchstart"
    var Nt = "touchstart touchmove touchend touchcancel"
    v(Ct, et, {
      handler: function(t) {
        var n = xt[t.type]
        if (n === q) {
          this.started = true
        }
        if (!this.started) {
          return
        }
        var r = kt.call(this, t, n)
        if (n & (U | z) && r[0].length - r[1].length === 0) {
          this.started = false
        }
        this.callback(this.manager, n, {
          pointers: r[0],
          changedPointers: r[1],
          pointerType: H,
          srcEvent: t
        })
      }
    })
    var Lt = { touchstart: q, touchmove: R, touchend: U, touchcancel: z }
    var At = "touchstart touchmove touchend touchcancel"
    v(Ot, et, {
      handler: function(t) {
        var n = Lt[t.type]
        var r = Mt.call(this, t, n)
        if (!r) {
          return
        }
        this.callback(this.manager, n, {
          pointers: r[0],
          changedPointers: r[1],
          pointerType: H,
          srcEvent: t
        })
      }
    })
    v(_t, et, {
      handler: function(t, n, r) {
        var i = r.pointerType == H,
          s = r.pointerType == j
        if (i) {
          this.mouse.allow = false
        } else if (s && !this.mouse.allow) {
          return
        }
        if (n & (U | z)) {
          this.mouse.allow = true
        }
        this.callback(t, n, r)
      },
      destroy: function() {
        this.touch.destroy()
        this.mouse.destroy()
      }
    })
    var Dt = k(s.style, "touchAction")
    var Pt = Dt !== r
    var Ht = "compute"
    var Bt = "auto"
    var jt = "manipulation"
    var Ft = "none"
    var It = "pan-x"
    var qt = "pan-y"
    Rt.prototype = {
      set: function(e) {
        if (e == Ht) {
          e = this.compute()
        }
        if (Pt) {
          this.manager.element.style[Dt] = e
        }
        this.actions = e.toLowerCase().trim()
      },
      update: function() {
        this.set(this.manager.options.touchAction)
      },
      compute: function() {
        var e = []
        h(this.manager.recognizers, function(t) {
          if (g(t.options.enable, [t])) {
            e = e.concat(t.getTouchAction())
          }
        })
        return Ut(e.join(" "))
      },
      preventDefaults: function(e) {
        if (Pt) {
          return
        }
        var t = e.srcEvent
        var n = e.offsetDirection
        if (this.manager.session.prevented) {
          t.preventDefault()
          return
        }
        var r = this.actions
        var i = S(r, Ft)
        var s = S(r, qt)
        var o = S(r, It)
        if (i || (s && n & K) || (o && n & Q)) {
          return this.preventSrc(t)
        }
      },
      preventSrc: function(e) {
        this.manager.session.prevented = true
        e.preventDefault()
      }
    }
    var zt = 1
    var Wt = 2
    var Xt = 4
    var Vt = 8
    var $t = Vt
    var Jt = 16
    var Kt = 32
    Qt.prototype = {
      defaults: {},
      set: function(e) {
        p(this.options, e)
        this.manager && this.manager.touchAction.update()
        return this
      },
      recognizeWith: function(e) {
        if (c(e, "recognizeWith", this)) {
          return this
        }
        var t = this.simultaneous
        e = Zt(e, this)
        if (!t[e.id]) {
          t[e.id] = e
          e.recognizeWith(this)
        }
        return this
      },
      dropRecognizeWith: function(e) {
        if (c(e, "dropRecognizeWith", this)) {
          return this
        }
        e = Zt(e, this)
        delete this.simultaneous[e.id]
        return this
      },
      requireFailure: function(e) {
        if (c(e, "requireFailure", this)) {
          return this
        }
        var t = this.requireFail
        e = Zt(e, this)
        if (T(t, e) === -1) {
          t.push(e)
          e.requireFailure(this)
        }
        return this
      },
      dropRequireFailure: function(e) {
        if (c(e, "dropRequireFailure", this)) {
          return this
        }
        e = Zt(e, this)
        var t = T(this.requireFail, e)
        if (t > -1) {
          this.requireFail.splice(t, 1)
        }
        return this
      },
      hasRequireFailures: function() {
        return this.requireFail.length > 0
      },
      canRecognizeWith: function(e) {
        return !!this.simultaneous[e.id]
      },
      emit: function(e) {
        function r(r) {
          t.manager.emit(t.options.event + (r ? Gt(n) : ""), e)
        }
        var t = this
        var n = this.state
        if (n < Vt) {
          r(true)
        }
        r()
        if (n >= Vt) {
          r(true)
        }
      },
      tryEmit: function(e) {
        if (this.canEmit()) {
          return this.emit(e)
        }
        this.state = Kt
      },
      canEmit: function() {
        var e = 0
        while (e < this.requireFail.length) {
          if (!(this.requireFail[e].state & (Kt | zt))) {
            return false
          }
          e++
        }
        return true
      },
      recognize: function(e) {
        var t = p({}, e)
        if (!g(this.options.enable, [this, t])) {
          this.reset()
          this.state = Kt
          return
        }
        if (this.state & ($t | Jt | Kt)) {
          this.state = zt
        }
        this.state = this.process(t)
        if (this.state & (Wt | Xt | Vt | Jt)) {
          this.tryEmit(t)
        }
      },
      process: function(e) {},
      getTouchAction: function() {},
      reset: function() {}
    }
    v(en, Qt, {
      defaults: { pointers: 1 },
      attrTest: function(e) {
        var t = this.options.pointers
        return t === 0 || e.pointers.length === t
      },
      process: function(e) {
        var t = this.state
        var n = e.eventType
        var r = t & (Wt | Xt)
        var i = this.attrTest(e)
        if (r && (n & z || !i)) {
          return t | Jt
        } else if (r || i) {
          if (n & U) {
            return t | Vt
          } else if (!(t & Wt)) {
            return Wt
          }
          return t | Xt
        }
        return Kt
      }
    })
    v(tn, en, {
      defaults: { event: "pan", threshold: 10, pointers: 1, direction: G },
      getTouchAction: function() {
        var e = this.options.direction
        var t = []
        if (e & K) {
          t.push(qt)
        }
        if (e & Q) {
          t.push(It)
        }
        return t
      },
      directionTest: function(e) {
        var t = this.options
        var n = true
        var r = e.distance
        var i = e.direction
        var s = e.deltaX
        var o = e.deltaY
        if (!(i & t.direction)) {
          if (t.direction & K) {
            i = s === 0 ? W : s < 0 ? X : V
            n = s != this.pX
            r = Math.abs(e.deltaX)
          } else {
            i = o === 0 ? W : o < 0 ? $ : J
            n = o != this.pY
            r = Math.abs(e.deltaY)
          }
        }
        e.direction = i
        return n && r > t.threshold && i & t.direction
      },
      attrTest: function(e) {
        return (
          en.prototype.attrTest.call(this, e) &&
          (this.state & Wt || (!(this.state & Wt) && this.directionTest(e)))
        )
      },
      emit: function(e) {
        this.pX = e.deltaX
        this.pY = e.deltaY
        var t = Yt(e.direction)
        if (t) {
          this.manager.emit(this.options.event + t, e)
        }
        this._super.emit.call(this, e)
      }
    })
    v(nn, en, {
      defaults: { event: "pinch", threshold: 0, pointers: 2 },
      getTouchAction: function() {
        return [Ft]
      },
      attrTest: function(e) {
        return (
          this._super.attrTest.call(this, e) &&
          (Math.abs(e.scale - 1) > this.options.threshold || this.state & Wt)
        )
      },
      emit: function(e) {
        this._super.emit.call(this, e)
        if (e.scale !== 1) {
          var t = e.scale < 1 ? "in" : "out"
          this.manager.emit(this.options.event + t, e)
        }
      }
    })
    v(rn, Qt, {
      defaults: { event: "press", pointers: 1, time: 500, threshold: 5 },
      getTouchAction: function() {
        return [Bt]
      },
      process: function(e) {
        var t = this.options
        var n = e.pointers.length === t.pointers
        var r = e.distance < t.threshold
        var i = e.deltaTime > t.time
        this._input = e
        if (!r || !n || (e.eventType & (U | z) && !i)) {
          this.reset()
        } else if (e.eventType & q) {
          this.reset()
          this._timer = l(
            function() {
              this.state = $t
              this.tryEmit()
            },
            t.time,
            this
          )
        } else if (e.eventType & U) {
          return $t
        }
        return Kt
      },
      reset: function() {
        clearTimeout(this._timer)
      },
      emit: function(e) {
        if (this.state !== $t) {
          return
        }
        if (e && e.eventType & U) {
          this.manager.emit(this.options.event + "up", e)
        } else {
          this._input.timeStamp = f()
          this.manager.emit(this.options.event, this._input)
        }
      }
    })
    v(sn, en, {
      defaults: { event: "rotate", threshold: 0, pointers: 2 },
      getTouchAction: function() {
        return [Ft]
      },
      attrTest: function(e) {
        return (
          this._super.attrTest.call(this, e) &&
          (Math.abs(e.rotation) > this.options.threshold || this.state & Wt)
        )
      }
    })
    v(on, en, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.65,
        direction: K | Q,
        pointers: 1
      },
      getTouchAction: function() {
        return tn.prototype.getTouchAction.call(this)
      },
      attrTest: function(e) {
        var t = this.options.direction
        var n
        if (t & (K | Q)) {
          n = e.velocity
        } else if (t & K) {
          n = e.velocityX
        } else if (t & Q) {
          n = e.velocityY
        }
        return (
          this._super.attrTest.call(this, e) &&
          t & e.direction &&
          e.distance > this.options.threshold &&
          a(n) > this.options.velocity &&
          e.eventType & U
        )
      },
      emit: function(e) {
        var t = Yt(e.direction)
        if (t) {
          this.manager.emit(this.options.event + t, e)
        }
        this.manager.emit(this.options.event, e)
      }
    })
    v(un, Qt, {
      defaults: {
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        time: 250,
        threshold: 2,
        posThreshold: 10
      },
      getTouchAction: function() {
        return [jt]
      },
      process: function(e) {
        var t = this.options
        var n = e.pointers.length === t.pointers
        var r = e.distance < t.threshold
        var i = e.deltaTime < t.time
        this.reset()
        if (e.eventType & q && this.count === 0) {
          return this.failTimeout()
        }
        if (r && i && n) {
          if (e.eventType != U) {
            return this.failTimeout()
          }
          var s = this.pTime ? e.timeStamp - this.pTime < t.interval : true
          var o = !this.pCenter || lt(this.pCenter, e.center) < t.posThreshold
          this.pTime = e.timeStamp
          this.pCenter = e.center
          if (!o || !s) {
            this.count = 1
          } else {
            this.count += 1
          }
          this._input = e
          var u = this.count % t.taps
          if (u === 0) {
            if (!this.hasRequireFailures()) {
              return $t
            } else {
              this._timer = l(
                function() {
                  this.state = $t
                  this.tryEmit()
                },
                t.interval,
                this
              )
              return Wt
            }
          }
        }
        return Kt
      },
      failTimeout: function() {
        this._timer = l(
          function() {
            this.state = Kt
          },
          this.options.interval,
          this
        )
        return Kt
      },
      reset: function() {
        clearTimeout(this._timer)
      },
      emit: function() {
        if (this.state == $t) {
          this._input.tapCount = this.count
          this.manager.emit(this.options.event, this._input)
        }
      }
    })
    an.VERSION = "2.0.4"
    an.defaults = {
      domEvents: false,
      touchAction: Ht,
      enable: true,
      inputTarget: null,
      inputClass: null,
      preset: [
        [sn, { enable: false }],
        [nn, { enable: false }, ["rotate"]],
        [on, { direction: K }],
        [tn, { direction: K }, ["swipe"]],
        [un],
        [un, { event: "doubletap", taps: 2 }, ["tap"]],
        [rn]
      ],
      cssProps: {
        userSelect: "none",
        touchSelect: "none",
        touchCallout: "none",
        contentZooming: "none",
        userDrag: "none",
        tapHighlightColor: "rgba(0,0,0,0)"
      }
    }
    var fn = 1
    var ln = 2
    cn.prototype = {
      set: function(e) {
        p(this.options, e)
        if (e.touchAction) {
          this.touchAction.update()
        }
        if (e.inputTarget) {
          this.input.destroy()
          this.input.target = e.inputTarget
          this.input.init()
        }
        return this
      },
      stop: function(e) {
        this.session.stopped = e ? ln : fn
      },
      recognize: function(e) {
        var t = this.session
        if (t.stopped) {
          return
        }
        this.touchAction.preventDefaults(e)
        var n
        var r = this.recognizers
        var i = t.curRecognizer
        if (!i || (i && i.state & $t)) {
          i = t.curRecognizer = null
        }
        var s = 0
        while (s < r.length) {
          n = r[s]
          if (t.stopped !== ln && (!i || n == i || n.canRecognizeWith(i))) {
            n.recognize(e)
          } else {
            n.reset()
          }
          if (!i && n.state & (Wt | Xt | Vt)) {
            i = t.curRecognizer = n
          }
          s++
        }
      },
      get: function(e) {
        if (e instanceof Qt) {
          return e
        }
        var t = this.recognizers
        for (var n = 0; n < t.length; n++) {
          if (t[n].options.event == e) {
            return t[n]
          }
        }
        return null
      },
      add: function(e) {
        if (c(e, "add", this)) {
          return this
        }
        var t = this.get(e.options.event)
        if (t) {
          this.remove(t)
        }
        this.recognizers.push(e)
        e.manager = this
        this.touchAction.update()
        return e
      },
      remove: function(e) {
        if (c(e, "remove", this)) {
          return this
        }
        var t = this.recognizers
        e = this.get(e)
        t.splice(T(t, e), 1)
        this.touchAction.update()
        return this
      },
      on: function(e, t) {
        var n = this.handlers
        h(x(e), function(e) {
          n[e] = n[e] || []
          n[e].push(t)
        })
        return this
      },
      off: function(e, t) {
        var n = this.handlers
        h(x(e), function(e) {
          if (!t) {
            delete n[e]
          } else {
            n[e].splice(T(n[e], t), 1)
          }
        })
        return this
      },
      emit: function(e, t) {
        if (this.options.domEvents) {
          pn(e, t)
        }
        var n = this.handlers[e] && this.handlers[e].slice()
        if (!n || !n.length) {
          return
        }
        t.type = e
        t.preventDefault = function() {
          t.srcEvent.preventDefault()
        }
        var r = 0
        while (r < n.length) {
          n[r](t)
          r++
        }
      },
      destroy: function() {
        this.element && hn(this, false)
        this.handlers = {}
        this.session = {}
        this.input.destroy()
        this.element = null
      }
    }
    p(an, {
      INPUT_START: q,
      INPUT_MOVE: R,
      INPUT_END: U,
      INPUT_CANCEL: z,
      STATE_POSSIBLE: zt,
      STATE_BEGAN: Wt,
      STATE_CHANGED: Xt,
      STATE_ENDED: Vt,
      STATE_RECOGNIZED: $t,
      STATE_CANCELLED: Jt,
      STATE_FAILED: Kt,
      DIRECTION_NONE: W,
      DIRECTION_LEFT: X,
      DIRECTION_RIGHT: V,
      DIRECTION_UP: $,
      DIRECTION_DOWN: J,
      DIRECTION_HORIZONTAL: K,
      DIRECTION_VERTICAL: Q,
      DIRECTION_ALL: G,
      Manager: cn,
      Input: et,
      TouchAction: Rt,
      TouchInput: Ot,
      MouseInput: gt,
      PointerEventInput: St,
      TouchMouseInput: _t,
      SingleTouchInput: Ct,
      Recognizer: Qt,
      AttrRecognizer: en,
      Tap: un,
      Pan: tn,
      Swipe: on,
      Pinch: nn,
      Rotate: sn,
      Press: rn,
      on: b,
      off: w,
      each: h,
      merge: d,
      extend: p,
      inherit: v,
      bindFn: m,
      prefixed: k
    })
    if (typeof define == o && define.amd) {
      define(function() {
        return an
      })
    } else if (typeof module != "undefined" && module.exports) {
      module.exports = an
    } else {
      e[n] = an
    }
  })(window, document, "Hammer")
  