!(function(a) {
    "function" == typeof define && define.amd
      ? define(["jquery", "modernizr"], a)
      : (window.Shuffle = a(window.jQuery, window.Modernizr))
  })(function(a, b, c) {
    "use strict"
    function d(a) {
      return a
        ? a
            .replace(/([A-Z])/g, function(a, b) {
              return "-" + b.toLowerCase()
            })
            .replace(/^ms-/, "-ms-")
        : ""
    }
    function e(b, c, d) {
      var e,
        f,
        g,
        h = null,
        i = 0
      d = d || {}
      var j = function() {
        ;(i = d.leading === !1 ? 0 : a.now()),
          (h = null),
          (g = b.apply(e, f)),
          (e = f = null)
      }
      return function() {
        var k = a.now()
        i || d.leading !== !1 || (i = k)
        var l = c - (k - i)
        return (
          (e = this),
          (f = arguments),
          0 >= l || l > c
            ? (clearTimeout(h),
              (h = null),
              (i = k),
              (g = b.apply(e, f)),
              (e = f = null))
            : h || d.trailing === !1 || (h = setTimeout(j, l)),
          g
        )
      }
    }
    function f(a, b, c) {
      for (var d = 0, e = a.length; e > d; d++)
        if (b.call(c, a[d], d, a) === {}) return
    }
    function g(b, c, d) {
      return setTimeout(a.proxy(b, c), d)
    }
    function h(a) {
      return Math.max.apply(Math, a)
    }
    function i(a) {
      return Math.min.apply(Math, a)
    }
    function j(b) {
      return a.isNumeric(b) ? b : 0
    }
    function k(a) {
      var b,
        c,
        d = a.length
      if (!d) return a
      for (; --d; )
        (c = Math.floor(Math.random() * (d + 1))),
          (b = a[c]),
          (a[c] = a[d]),
          (a[d] = b)
      return a
    }
    if ("object" != typeof b)
      throw new Error(
        "Shuffle.js requires Modernizr.\nhttp://vestride.github.io/Shuffle/#dependencies"
      )
    var l = b.prefixed("transition"),
      m = b.prefixed("transitionDelay"),
      n = b.prefixed("transitionDuration"),
      o = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
      }[l],
      p = b.prefixed("transform"),
      q = d(p),
      r = b.csstransforms && b.csstransitions,
      s = b.csstransforms3d,
      t = "shuffle",
      u = 0.3,
      v = "all",
      w = "groups",
      x = 1,
      y = 0.001,
      z = function(a, b) {
        ;(this.x = j(a)), (this.y = j(b))
      }
    z.equals = function(a, b) {
      return a.x === b.x && a.y === b.y
    }
    var A = 0,
      B = a(window),
      C = function(b, c) {
        ;(c = c || {}),
          a.extend(this, C.options, c, C.settings),
          (this.$el = a(b)),
          (this.element = b),
          (this.unique = "shuffle_" + A++),
          this._fire(C.EventType.LOADING),
          this._init(),
          g(
            function() {
              ;(this.initialized = !0), this._fire(C.EventType.DONE)
            },
            this,
            16
          )
      }
    return (
      (C.EventType = {
        LOADING: "loading",
        DONE: "done",
        LAYOUT: "layout",
        REMOVED: "removed"
      }),
      (C.ClassName = {
        BASE: t,
        SHUFFLE_ITEM: "shuffle-item",
        FILTERED: "filtered",
        CONCEALED: "concealed"
      }),
      (C.options = {
        group: v,
        speed: 250,
        easing: "ease-out",
        itemSelector: "",
        sizer: null,
        gutterWidth: 0,
        columnWidth: 0,
        delimeter: null,
        buffer: 0,
        initialSort: null,
        throttle: e,
        throttleTime: 300,
        sequentialFadeDelay: 150,
        supported: r
      }),
      (C.settings = {
        useSizer: !1,
        itemCss: { position: "absolute", top: 0, left: 0, visibility: "visible" },
        revealAppendedDelay: 300,
        lastSort: {},
        lastFilter: v,
        enabled: !0,
        destroyed: !1,
        initialized: !1,
        _animations: [],
        styleQueue: []
      }),
      (C.Point = z),
      (C._getItemTransformString = function(a, b) {
        return s
          ? "translate3d(" +
              a.x +
              "px, " +
              a.y +
              "px, 0) scale3d(" +
              b +
              ", " +
              b +
              ", 1)"
          : "translate(" + a.x + "px, " + a.y + "px) scale(" + b + ")"
      }),
      (C._getNumberStyle = function(b, c) {
        return C._getFloat(a(b).css(c))
      }),
      (C._getInt = function(a) {
        return j(parseInt(a, 10))
      }),
      (C._getFloat = function(a) {
        return j(parseFloat(a))
      }),
      (C._getOuterWidth = function(a, b) {
        var c = a.offsetWidth
        if (b) {
          var d = C._getNumberStyle(a, "marginLeft"),
            e = C._getNumberStyle(a, "marginRight")
          c += d + e
        }
        return c
      }),
      (C._getOuterHeight = function(a, b) {
        var c = a.offsetHeight
        if (b) {
          var d = C._getNumberStyle(a, "marginTop"),
            e = C._getNumberStyle(a, "marginBottom")
          c += d + e
        }
        return c
      }),
      (C._skipTransition = function(a, b, c) {
        var d = a.style[n]
        ;(a.style[n] = "0ms"), b.call(c)
        var e = a.offsetWidth
        ;(e = null), (a.style[n] = d)
      }),
      (C.prototype._init = function() {
        ;(this.$items = this._getItems()),
          (this.sizer = this._getElementOption(this.sizer)),
          this.sizer && (this.useSizer = !0),
          this.$el.addClass(C.ClassName.BASE),
          this._initItems(),
          B.on("resize." + t + "." + this.unique, this._getResizeFunction())
        var a = this.$el.css(["position", "overflow"]),
          b = C._getOuterWidth(this.element)
        this._validateStyles(a),
          this._setColumns(b),
          this.shuffle(this.group, this.initialSort),
          this.supported &&
            g(function() {
              this._setTransitions(),
                (this.element.style[l] =
                  "height " + this.speed + "ms " + this.easing)
            }, this)
      }),
      (C.prototype._getResizeFunction = function() {
        var b = a.proxy(this._onResize, this)
        return this.throttle ? this.throttle(b, this.throttleTime) : b
      }),
      (C.prototype._getElementOption = function(a) {
        return "string" == typeof a
          ? this.$el.find(a)[0] || null
          : a && a.nodeType && 1 === a.nodeType
          ? a
          : a && a.jquery
          ? a[0]
          : null
      }),
      (C.prototype._validateStyles = function(a) {
        "static" === a.position && (this.element.style.position = "relative"),
          "hidden" !== a.overflow && (this.element.style.overflow = "hidden")
      }),
      (C.prototype._filter = function(a, b) {
        ;(a = a || this.lastFilter), (b = b || this.$items)
        var c = this._getFilteredSets(a, b)
        return (
          this._toggleFilterClasses(c.filtered, c.concealed),
          (this.lastFilter = a),
          "string" == typeof a && (this.group = a),
          c.filtered
        )
      }),
      (C.prototype._getFilteredSets = function(b, c) {
        var d = a(),
          e = a()
        return (
          b === v
            ? (d = c)
            : f(
                c,
                function(c) {
                  var f = a(c)
                  this._doesPassFilter(b, f) ? (d = d.add(f)) : (e = e.add(f))
                },
                this
              ),
          { filtered: d, concealed: e }
        )
      }),
      (C.prototype._doesPassFilter = function(b, c) {
        if (a.isFunction(b)) return b.call(c[0], c, this)
        var d = c.data(w),
          e = this.delimeter && !a.isArray(d) ? d.split(this.delimeter) : d
        return a.inArray(b, e) > -1
      }),
      (C.prototype._toggleFilterClasses = function(a, b) {
        a.removeClass(C.ClassName.CONCEALED).addClass(C.ClassName.FILTERED),
          b.removeClass(C.ClassName.FILTERED).addClass(C.ClassName.CONCEALED)
      }),
      (C.prototype._initItems = function(a) {
        ;(a = a || this.$items),
          a.addClass([C.ClassName.SHUFFLE_ITEM, C.ClassName.FILTERED].join(" ")),
          a
            .css(this.itemCss)
            .data("point", new z())
            .data("scale", x)
      }),
      (C.prototype._updateItemCount = function() {
        this.visibleItems = this._getFilteredItems().length
      }),
      (C.prototype._setTransition = function(a) {
        a.style[l] =
          q +
          " " +
          this.speed +
          "ms " +
          this.easing +
          ", opacity " +
          this.speed +
          "ms " +
          this.easing
      }),
      (C.prototype._setTransitions = function(a) {
        ;(a = a || this.$items),
          f(
            a,
            function(a) {
              this._setTransition(a)
            },
            this
          )
      }),
      (C.prototype._setSequentialDelay = function(a) {
        this.supported &&
          f(
            a,
            function(a, b) {
              a.style[m] = "0ms," + (b + 1) * this.sequentialFadeDelay + "ms"
            },
            this
          )
      }),
      (C.prototype._getItems = function() {
        return this.$el.children(this.itemSelector)
      }),
      (C.prototype._getFilteredItems = function() {
        return this.$items.filter("." + C.ClassName.FILTERED)
      }),
      (C.prototype._getConcealedItems = function() {
        return this.$items.filter("." + C.ClassName.CONCEALED)
      }),
      (C.prototype._getColumnSize = function(b, c) {
        var d
        return (
          (d = a.isFunction(this.columnWidth)
            ? this.columnWidth(b)
            : this.useSizer
            ? C._getOuterWidth(this.sizer)
            : this.columnWidth
            ? this.columnWidth
            : this.$items.length > 0
            ? C._getOuterWidth(this.$items[0], !0)
            : b),
          0 === d && (d = b),
          d + c
        )
      }),
      (C.prototype._getGutterSize = function(b) {
        var c
        return (c = a.isFunction(this.gutterWidth)
          ? this.gutterWidth(b)
          : this.useSizer
          ? C._getNumberStyle(this.sizer, "marginLeft")
          : this.gutterWidth)
      }),
      (C.prototype._setColumns = function(a) {
        var b = a || C._getOuterWidth(this.element),
          c = this._getGutterSize(b),
          d = this._getColumnSize(b, c),
          e = (b + c) / d
        Math.abs(Math.round(e) - e) < u && (e = Math.round(e)),
          (this.cols = Math.max(Math.floor(e), 1)),
          (this.containerWidth = b),
          (this.colWidth = d)
      }),
      (C.prototype._setContainerSize = function() {
        this.$el.css("height", this._getContainerSize())
      }),
      (C.prototype._getContainerSize = function() {
        return h(this.positions)
      }),
      (C.prototype._fire = function(a, b) {
        this.$el.trigger(a + "." + t, b && b.length ? b : [this])
      }),
      (C.prototype._resetCols = function() {
        var a = this.cols
        for (this.positions = []; a--; ) this.positions.push(0)
      }),
      (C.prototype._layout = function(a, b) {
        f(
          a,
          function(a) {
            this._layoutItem(a, !!b)
          },
          this
        ),
          this._processStyleQueue(),
          this._setContainerSize()
      }),
      (C.prototype._layoutItem = function(b, c) {
        var d = a(b),
          e = d.data(),
          f = e.point,
          g = e.scale,
          h = {
            width: C._getOuterWidth(b, !0),
            height: C._getOuterHeight(b, !0)
          },
          i = this._getItemPosition(h)
        ;(z.equals(f, i) && g === x) ||
          ((e.point = i),
          (e.scale = x),
          this.styleQueue.push({
            $item: d,
            point: i,
            scale: x,
            opacity: c ? 0 : 1,
            skipTransition: c,
            callfront: function() {
              c || d.css("visibility", "visible")
            },
            callback: function() {
              c && d.css("visibility", "hidden")
            }
          }))
      }),
      (C.prototype._getItemPosition = function(a) {
        for (
          var b = this._getColumnSpan(a.width, this.colWidth, this.cols),
            c = this._getColumnSet(b, this.cols),
            d = this._getShortColumn(c, this.buffer),
            e = new z(Math.round(this.colWidth * d), Math.round(c[d])),
            f = c[d] + a.height,
            g = this.cols + 1 - c.length,
            h = 0;
          g > h;
          h++
        )
          this.positions[d + h] = f
        return e
      }),
      (C.prototype._getColumnSpan = function(a, b, c) {
        var d = a / b
        return (
          Math.abs(Math.round(d) - d) < u && (d = Math.round(d)),
          Math.min(Math.ceil(d), c)
        )
      }),
      (C.prototype._getColumnSet = function(a, b) {
        if (1 === a) return this.positions
        for (var c = b + 1 - a, d = [], e = 0; c > e; e++)
          d[e] = h(this.positions.slice(e, e + a))
        return d
      }),
      (C.prototype._getShortColumn = function(a, b) {
        for (var c = i(a), d = 0, e = a.length; e > d; d++)
          if (a[d] >= c - b && a[d] <= c + b) return d
        return 0
      }),
      (C.prototype._shrink = function(b) {
        var c = b || this._getConcealedItems()
        f(
          c,
          function(b) {
            var c = a(b),
              d = c.data()
            d.scale !== y &&
              ((d.scale = y),
              this.styleQueue.push({
                $item: c,
                point: d.point,
                scale: y,
                opacity: 0,
                callback: function() {
                  c.css("visibility", "hidden")
                }
              }))
          },
          this
        )
      }),
      (C.prototype._onResize = function() {
        if (this.enabled && !this.destroyed && !this.isTransitioning) {
          var a = C._getOuterWidth(this.element)
          a !== this.containerWidth && this.update()
        }
      }),
      (C.prototype._getStylesForTransition = function(a) {
        var b = { opacity: a.opacity }
        return (
          this.supported
            ? (b[p] = C._getItemTransformString(a.point, a.scale))
            : ((b.left = a.point.x), (b.top = a.point.y)),
          b
        )
      }),
      (C.prototype._transition = function(b) {
        var c = this._getStylesForTransition(b)
        this._startItemAnimation(
          b.$item,
          c,
          b.callfront || a.noop,
          b.callback || a.noop
        )
      }),
      (C.prototype._startItemAnimation = function(b, c, d, e) {
        function f(b) {
          b.target === b.currentTarget && (a(b.target).off(o, f), e())
        }
        if ((d(), !this.initialized)) return b.css(c), void e()
        if (this.supported) b.css(c), b.on(o, f)
        else {
          var g = b.stop(!0).animate(c, this.speed, "swing", e)
          this._animations.push(g.promise())
        }
      }),
      (C.prototype._processStyleQueue = function(b) {
        var c = a()
        f(
          this.styleQueue,
          function(a) {
            a.skipTransition
              ? this._styleImmediately(a)
              : ((c = c.add(a.$item)), this._transition(a))
          },
          this
        ),
          c.length > 0 && this.initialized
            ? ((this.isTransitioning = !0),
              this.supported
                ? this._whenCollectionDone(c, o, this._movementFinished)
                : this._whenAnimationsDone(this._movementFinished))
            : b || g(this._layoutEnd, this),
          (this.styleQueue.length = 0)
      }),
      (C.prototype._styleImmediately = function(a) {
        C._skipTransition(
          a.$item[0],
          function() {
            a.$item.css(this._getStylesForTransition(a))
          },
          this
        )
      }),
      (C.prototype._movementFinished = function() {
        ;(this.isTransitioning = !1), this._layoutEnd()
      }),
      (C.prototype._layoutEnd = function() {
        this._fire(C.EventType.LAYOUT)
      }),
      (C.prototype._addItems = function(a, b, c) {
        this._initItems(a),
          this._setTransitions(a),
          (this.$items = this._getItems()),
          this._shrink(a),
          f(this.styleQueue, function(a) {
            a.skipTransition = !0
          }),
          this._processStyleQueue(!0),
          b ? this._addItemsToEnd(a, c) : this.shuffle(this.lastFilter)
      }),
      (C.prototype._addItemsToEnd = function(a, b) {
        var c = this._filter(null, a),
          d = c.get()
        this._updateItemCount(),
          this._layout(d, !0),
          b && this.supported && this._setSequentialDelay(d),
          this._revealAppended(d)
      }),
      (C.prototype._revealAppended = function(b) {
        g(
          function() {
            f(
              b,
              function(b) {
                var c = a(b)
                this._transition({
                  $item: c,
                  opacity: 1,
                  point: c.data("point"),
                  scale: x
                })
              },
              this
            ),
              this._whenCollectionDone(a(b), o, function() {
                a(b).css(m, "0ms"), this._movementFinished()
              })
          },
          this,
          this.revealAppendedDelay
        )
      }),
      (C.prototype._whenCollectionDone = function(b, c, d) {
        function e(b) {
          b.target === b.currentTarget &&
            (a(b.target).off(c, e), f++, f === g && d.call(h))
        }
        var f = 0,
          g = b.length,
          h = this
        b.on(c, e)
      }),
      (C.prototype._whenAnimationsDone = function(b) {
        a.when.apply(null, this._animations).always(
          a.proxy(function() {
            ;(this._animations.length = 0), b.call(this)
          }, this)
        )
      }),
      (C.prototype.shuffle = function(a, b) {
        this.enabled &&
          !this.isTransitioning &&
          (a || (a = v),
          this._filter(a),
          this._updateItemCount(),
          this._shrink(),
          this.sort(b))
      }),
      (C.prototype.sort = function(a) {
        if (this.enabled && !this.isTransitioning) {
          this._resetCols()
          var b = a || this.lastSort,
            c = this._getFilteredItems().sorted(b)
          this._layout(c), (this.lastSort = b)
        }
      }),
      (C.prototype.update = function(a) {
        this.enabled &&
          !this.isTransitioning &&
          (a || this._setColumns(), this.sort())
      }),
      (C.prototype.layout = function() {
        this.update(!0)
      }),
      (C.prototype.appended = function(a, b, c) {
        this._addItems(a, b === !0, c !== !1)
      }),
      (C.prototype.disable = function() {
        this.enabled = !1
      }),
      (C.prototype.enable = function(a) {
        ;(this.enabled = !0), a !== !1 && this.update()
      }),
      (C.prototype.remove = function(b) {
        function c() {
          b.remove(),
            (this.$items = this._getItems()),
            this._updateItemCount(),
            this._fire(C.EventType.REMOVED, [b, this]),
            (b = null)
        }
        b.length &&
          b.jquery &&
          (this._toggleFilterClasses(a(), b),
          this._shrink(b),
          this.sort(),
          this.$el.one(C.EventType.LAYOUT + "." + t, a.proxy(c, this)))
      }),
      (C.prototype.destroy = function() {
        B.off("." + this.unique),
          this.$el
            .removeClass(t)
            .removeAttr("style")
            .removeData(t),
          this.$items
            .removeAttr("style")
            .removeData("point")
            .removeData("scale")
            .removeClass(
              [
                C.ClassName.CONCEALED,
                C.ClassName.FILTERED,
                C.ClassName.SHUFFLE_ITEM
              ].join(" ")
            ),
          (this.$items = null),
          (this.$el = null),
          (this.sizer = null),
          (this.element = null),
          (this.destroyed = !0)
      }),
      (a.fn.shuffle = function(b) {
        var c = Array.prototype.slice.call(arguments, 1)
        return this.each(function() {
          var d = a(this),
            e = d.data(t)
          e
            ? "string" == typeof b && e[b] && e[b].apply(e, c)
            : ((e = new C(this, b)), d.data(t, e))
        })
      }),
      (a.fn.sorted = function(b) {
        var d = a.extend({}, a.fn.sorted.defaults, b),
          e = this.get(),
          f = !1
        return e.length
          ? d.randomize
            ? k(e)
            : (a.isFunction(d.by) &&
                e.sort(function(b, e) {
                  if (f) return 0
                  var g = d.by(a(b)),
                    h = d.by(a(e))
                  return g === c && h === c
                    ? ((f = !0), 0)
                    : h > g || "sortFirst" === g || "sortLast" === h
                    ? -1
                    : g > h || "sortLast" === g || "sortFirst" === h
                    ? 1
                    : 0
                }),
              f ? this.get() : (d.reverse && e.reverse(), e))
          : []
      }),
      (a.fn.sorted.defaults = { reverse: !1, by: null, randomize: !1 }),
      C
    )
  })
  