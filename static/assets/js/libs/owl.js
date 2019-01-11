"function" != typeof Object.create &&
  (Object.create = function(t) {
    function i() {}
    return (i.prototype = t), new i()
  }),
  (function(t, i, s) {
    var e = {
      init: function(i, s) {
        ;(this.$elem = t(s)),
          (this.options = t.extend(
            {},
            t.fn.owlCarousel.options,
            this.$elem.data(),
            i
          )),
          (this.userOptions = i),
          this.loadContent()
      },
      loadContent: function() {
        function i(t) {
          var i,
            s = ""
          if ("function" == typeof e.options.jsonSuccess)
            e.options.jsonSuccess.apply(this, [t])
          else {
            for (i in t.owl) t.owl.hasOwnProperty(i) && (s += t.owl[i].item)
            e.$elem.html(s)
          }
          e.logIn()
        }
        var s,
          e = this
        "function" == typeof e.options.beforeInit &&
          e.options.beforeInit.apply(this, [e.$elem]),
          "string" == typeof e.options.jsonPath
            ? ((s = e.options.jsonPath), t.getJSON(s, i))
            : e.logIn()
      },
      logIn: function() {
        this.$elem.data("owl-originalStyles", this.$elem.attr("style")),
          this.$elem.data("owl-originalClasses", this.$elem.attr("class")),
          this.$elem.css({ opacity: 0 }),
          (this.orignalItems = this.options.items),
          this.checkBrowser(),
          (this.wrapperWidth = 0),
          (this.checkVisible = null),
          this.setVars()
      },
      setVars: function() {
        return 0 === this.$elem.children().length
          ? !1
          : (this.baseClass(),
            this.eventTypes(),
            (this.$userItems = this.$elem.children()),
            (this.itemsAmount = this.$userItems.length),
            this.wrapItems(),
            (this.$owlItems = this.$elem.find(".owl-item")),
            (this.$owlWrapper = this.$elem.find(".owl-wrapper")),
            (this.playDirection = "next"),
            (this.prevItem = 0),
            (this.prevArr = [0]),
            (this.currentItem = 0),
            this.customEvents(),
            void this.onStartup())
      },
      onStartup: function() {
        this.updateItems(),
          this.calculateAll(),
          this.buildControls(),
          this.updateControls(),
          this.response(),
          this.moveEvents(),
          this.stopOnHover(),
          this.owlStatus(),
          !1 !== this.options.transitionStyle &&
            this.transitionTypes(this.options.transitionStyle),
          !0 === this.options.autoPlay && (this.options.autoPlay = 5e3),
          this.play(),
          this.$elem.find(".owl-wrapper").css("display", "block"),
          this.$elem.is(":visible")
            ? this.$elem.css("opacity", 1)
            : this.watchVisibility(),
          (this.onstartup = !1),
          this.eachMoveUpdate(),
          "function" == typeof this.options.afterInit &&
            this.options.afterInit.apply(this, [this.$elem])
      },
      eachMoveUpdate: function() {
        !0 === this.options.lazyLoad && this.lazyLoad(),
          !0 === this.options.autoHeight && this.autoHeight(),
          this.onVisibleItems(),
          "function" == typeof this.options.afterAction &&
            this.options.afterAction.apply(this, [this.$elem])
      },
      updateVars: function() {
        "function" == typeof this.options.beforeUpdate &&
          this.options.beforeUpdate.apply(this, [this.$elem]),
          this.watchVisibility(),
          this.updateItems(),
          this.calculateAll(),
          this.updatePosition(),
          this.updateControls(),
          this.eachMoveUpdate(),
          "function" == typeof this.options.afterUpdate &&
            this.options.afterUpdate.apply(this, [this.$elem])
      },
      reload: function() {
        var t = this
        i.setTimeout(function() {
          t.updateVars()
        }, 0)
      },
      watchVisibility: function() {
        var t = this
        return !1 !== t.$elem.is(":visible")
          ? !1
          : (t.$elem.css({ opacity: 0 }),
            i.clearInterval(t.autoPlayInterval),
            i.clearInterval(t.checkVisible),
            void (t.checkVisible = i.setInterval(function() {
              t.$elem.is(":visible") &&
                (t.reload(),
                t.$elem.animate({ opacity: 1 }, 200),
                i.clearInterval(t.checkVisible))
            }, 500)))
      },
      wrapItems: function() {
        this.$userItems
          .wrapAll('<div class="owl-wrapper">')
          .wrap('<div class="owl-item"></div>'),
          this.$elem
            .find(".owl-wrapper")
            .wrap('<div class="owl-wrapper-outer">'),
          (this.wrapperOuter = this.$elem.find(".owl-wrapper-outer")),
          this.$elem.css("display", "block")
      },
      baseClass: function() {
        var t = this.$elem.hasClass(this.options.baseClass),
          i = this.$elem.hasClass(this.options.theme)
        t || this.$elem.addClass(this.options.baseClass),
          i || this.$elem.addClass(this.options.theme)
      },
      updateItems: function() {
        var i, s
        if (!1 === this.options.responsive) return !1
        if (!0 === this.options.singleItem)
          return (
            (this.options.items = this.orignalItems = 1),
            (this.options.itemsCustom = !1),
            (this.options.itemsDesktop = !1),
            (this.options.itemsDesktopSmall = !1),
            (this.options.itemsTablet = !1),
            (this.options.itemsTabletSmall = !1),
            (this.options.itemsMobile = !1)
          )
        if (
          ((i = t(this.options.responsiveBaseWidth).width()),
          i > (this.options.itemsDesktop[0] || this.orignalItems) &&
            (this.options.items = this.orignalItems),
          !1 !== this.options.itemsCustom)
        )
          for (
            this.options.itemsCustom.sort(function(t, i) {
              return t[0] - i[0]
            }),
              s = 0;
            s < this.options.itemsCustom.length;
            s += 1
          )
            this.options.itemsCustom[s][0] <= i &&
              (this.options.items = this.options.itemsCustom[s][1])
        else
          i <= this.options.itemsDesktop[0] &&
            !1 !== this.options.itemsDesktop &&
            (this.options.items = this.options.itemsDesktop[1]),
            i <= this.options.itemsDesktopSmall[0] &&
              !1 !== this.options.itemsDesktopSmall &&
              (this.options.items = this.options.itemsDesktopSmall[1]),
            i <= this.options.itemsTablet[0] &&
              !1 !== this.options.itemsTablet &&
              (this.options.items = this.options.itemsTablet[1]),
            i <= this.options.itemsTabletSmall[0] &&
              !1 !== this.options.itemsTabletSmall &&
              (this.options.items = this.options.itemsTabletSmall[1]),
            i <= this.options.itemsMobile[0] &&
              !1 !== this.options.itemsMobile &&
              (this.options.items = this.options.itemsMobile[1])
        this.options.items > this.itemsAmount &&
          !0 === this.options.itemsScaleUp &&
          (this.options.items = this.itemsAmount)
      },
      response: function() {
        var s,
          e,
          o = this
        return !0 !== o.options.responsive
          ? !1
          : ((e = t(i).width()),
            (o.resizer = function() {
              t(i).width() !== e &&
                (!1 !== o.options.autoPlay &&
                  i.clearInterval(o.autoPlayInterval),
                i.clearTimeout(s),
                (s = i.setTimeout(function() {
                  ;(e = t(i).width()), o.updateVars()
                }, o.options.responsiveRefreshRate)))
            }),
            void t(i).resize(o.resizer))
      },
      updatePosition: function() {
        this.jumpTo(this.currentItem),
          !1 !== this.options.autoPlay && this.checkAp()
      },
      appendItemsSizes: function() {
        var i = this,
          s = 0,
          e = i.itemsAmount - i.options.items
        i.$owlItems.each(function(o) {
          var n = t(this)
          n.css({ width: i.itemWidth }).data("owl-item", Number(o)),
            (0 === o % i.options.items || o === e) && (o > e || (s += 1)),
            n.data("owl-roundPages", s)
        })
      },
      appendWrapperSizes: function() {
        this.$owlWrapper.css({
          width: this.$owlItems.length * this.itemWidth * 2,
          left: 0
        }),
          this.appendItemsSizes()
      },
      calculateAll: function() {
        this.calculateWidth(),
          this.appendWrapperSizes(),
          this.loops(),
          this.max()
      },
      calculateWidth: function() {
        this.itemWidth = Math.round(this.$elem.width() / this.options.items)
      },
      max: function() {
        var t =
          -1 *
          (this.itemsAmount * this.itemWidth -
            this.options.items * this.itemWidth)
        return (
          this.options.items > this.itemsAmount
            ? (this.maximumPixels = t = this.maximumItem = 0)
            : ((this.maximumItem = this.itemsAmount - this.options.items),
              (this.maximumPixels = t)),
          t
        )
      },
      min: function() {
        return 0
      },
      loops: function() {
        var i,
          s,
          e = 0,
          o = 0
        for (
          this.positionsInArray = [0], this.pagesInArray = [], i = 0;
          i < this.itemsAmount;
          i += 1
        )
          (o += this.itemWidth),
            this.positionsInArray.push(-o),
            !0 === this.options.scrollPerPage &&
              ((s = t(this.$owlItems[i])),
              (s = s.data("owl-roundPages")),
              s !== e &&
                ((this.pagesInArray[e] = this.positionsInArray[i]), (e = s)))
      },
      buildControls: function() {
        ;(!0 === this.options.navigation || !0 === this.options.pagination) &&
          (this.owlControls = t('<div class="owl-controls"/>')
            .toggleClass("clickable", !this.browser.isTouch)
            .appendTo(this.$elem)),
          !0 === this.options.pagination && this.buildPagination(),
          !0 === this.options.navigation && this.buildButtons()
      },
      buildButtons: function() {
        var i = this,
          s = t('<div class="owl-buttons"/>')
        i.owlControls.append(s),
          (i.buttonPrev = t("<div/>", {
            class: "owl-prev",
            html: i.options.navigationText[0] || ""
          })),
          (i.buttonNext = t("<div/>", {
            class: "owl-next",
            html: i.options.navigationText[1] || ""
          })),
          s.append(i.buttonPrev).append(i.buttonNext),
          s.on(
            "touchstart.owlControls mousedown.owlControls",
            'div[class^="owl"]',
            function(t) {
              t.preventDefault()
            }
          ),
          s.on(
            "touchend.owlControls mouseup.owlControls",
            'div[class^="owl"]',
            function(s) {
              s.preventDefault(),
                t(this).hasClass("owl-next") ? i.next() : i.prev()
            }
          )
      },
      buildPagination: function() {
        var i = this
        ;(i.paginationWrapper = t('<div class="owl-pagination"/>')),
          i.owlControls.append(i.paginationWrapper),
          i.paginationWrapper.on(
            "touchend.owlControls mouseup.owlControls",
            ".owl-page",
            function(s) {
              s.preventDefault(),
                Number(t(this).data("owl-page")) !== i.currentItem &&
                  i.goTo(Number(t(this).data("owl-page")), !0)
            }
          )
      },
      updatePagination: function() {
        var i, s, e, o, n, a
        if (!1 === this.options.pagination) return !1
        for (
          this.paginationWrapper.html(""),
            i = 0,
            s = this.itemsAmount - (this.itemsAmount % this.options.items),
            o = 0;
          o < this.itemsAmount;
          o += 1
        )
          0 === o % this.options.items &&
            ((i += 1),
            s === o && (e = this.itemsAmount - this.options.items),
            (n = t("<div/>", { class: "owl-page" })),
            (a = t("<span></span>", {
              text: !0 === this.options.paginationNumbers ? i : "",
              class: !0 === this.options.paginationNumbers ? "owl-numbers" : ""
            })),
            n.append(a),
            n.data("owl-page", s === o ? e : o),
            n.data("owl-roundPages", i),
            this.paginationWrapper.append(n))
        this.checkPagination()
      },
      checkPagination: function() {
        var i = this
        return !1 === i.options.pagination
          ? !1
          : void i.paginationWrapper.find(".owl-page").each(function() {
              t(this).data("owl-roundPages") ===
                t(i.$owlItems[i.currentItem]).data("owl-roundPages") &&
                (i.paginationWrapper.find(".owl-page").removeClass("active"),
                t(this).addClass("active"))
            })
      },
      checkNavigation: function() {
        return !1 === this.options.navigation
          ? !1
          : void (
              !1 === this.options.rewindNav &&
              (0 === this.currentItem && 0 === this.maximumItem
                ? (this.buttonPrev.addClass("disabled"),
                  this.buttonNext.addClass("disabled"))
                : 0 === this.currentItem && 0 !== this.maximumItem
                ? (this.buttonPrev.addClass("disabled"),
                  this.buttonNext.removeClass("disabled"))
                : this.currentItem === this.maximumItem
                ? (this.buttonPrev.removeClass("disabled"),
                  this.buttonNext.addClass("disabled"))
                : 0 !== this.currentItem &&
                  this.currentItem !== this.maximumItem &&
                  (this.buttonPrev.removeClass("disabled"),
                  this.buttonNext.removeClass("disabled")))
            )
      },
      updateControls: function() {
        this.updatePagination(),
          this.checkNavigation(),
          this.owlControls &&
            (this.options.items >= this.itemsAmount
              ? this.owlControls.hide()
              : this.owlControls.show())
      },
      destroyControls: function() {
        this.owlControls && this.owlControls.remove()
      },
      next: function(t) {
        if (this.isTransition) return !1
        if (
          ((this.currentItem +=
            !0 === this.options.scrollPerPage ? this.options.items : 1),
          this.currentItem >
            this.maximumItem +
              (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0))
        ) {
          if (!0 !== this.options.rewindNav)
            return (this.currentItem = this.maximumItem), !1
          ;(this.currentItem = 0), (t = "rewind")
        }
        this.goTo(this.currentItem, t)
      },
      prev: function(t) {
        if (this.isTransition) return !1
        if (
          ((this.currentItem =
            !0 === this.options.scrollPerPage &&
            0 < this.currentItem &&
            this.currentItem < this.options.items
              ? 0
              : this.currentItem -
                (!0 === this.options.scrollPerPage ? this.options.items : 1)),
          0 > this.currentItem)
        ) {
          if (!0 !== this.options.rewindNav) return (this.currentItem = 0), !1
          ;(this.currentItem = this.maximumItem), (t = "rewind")
        }
        this.goTo(this.currentItem, t)
      },
      goTo: function(t, s, e) {
        var o = this
        return o.isTransition
          ? !1
          : ("function" == typeof o.options.beforeMove &&
              o.options.beforeMove.apply(this, [o.$elem]),
            t >= o.maximumItem ? (t = o.maximumItem) : 0 >= t && (t = 0),
            (o.currentItem = o.owl.currentItem = t),
            !1 !== o.options.transitionStyle &&
            "drag" !== e &&
            1 === o.options.items &&
            !0 === o.browser.support3d
              ? (o.swapSpeed(0),
                !0 === o.browser.support3d
                  ? o.transition3d(o.positionsInArray[t])
                  : o.css2slide(o.positionsInArray[t], 1),
                o.afterGo(),
                o.singleItemTransition(),
                !1)
              : ((t = o.positionsInArray[t]),
                !0 === o.browser.support3d
                  ? ((o.isCss3Finish = !1),
                    !0 === s
                      ? (o.swapSpeed("paginationSpeed"),
                        i.setTimeout(function() {
                          o.isCss3Finish = !0
                        }, o.options.paginationSpeed))
                      : "rewind" === s
                      ? (o.swapSpeed(o.options.rewindSpeed),
                        i.setTimeout(function() {
                          o.isCss3Finish = !0
                        }, o.options.rewindSpeed))
                      : (o.swapSpeed("slideSpeed"),
                        i.setTimeout(function() {
                          o.isCss3Finish = !0
                        }, o.options.slideSpeed)),
                    o.transition3d(t))
                  : !0 === s
                  ? o.css2slide(t, o.options.paginationSpeed)
                  : "rewind" === s
                  ? o.css2slide(t, o.options.rewindSpeed)
                  : o.css2slide(t, o.options.slideSpeed),
                void o.afterGo()))
      },
      jumpTo: function(t) {
        "function" == typeof this.options.beforeMove &&
          this.options.beforeMove.apply(this, [this.$elem]),
          t >= this.maximumItem || -1 === t
            ? (t = this.maximumItem)
            : 0 >= t && (t = 0),
          this.swapSpeed(0),
          !0 === this.browser.support3d
            ? this.transition3d(this.positionsInArray[t])
            : this.css2slide(this.positionsInArray[t], 1),
          (this.currentItem = this.owl.currentItem = t),
          this.afterGo()
      },
      afterGo: function() {
        this.prevArr.push(this.currentItem),
          (this.prevItem = this.owl.prevItem = this.prevArr[
            this.prevArr.length - 2
          ]),
          this.prevArr.shift(0),
          this.prevItem !== this.currentItem &&
            (this.checkPagination(),
            this.checkNavigation(),
            this.eachMoveUpdate(),
            !1 !== this.options.autoPlay && this.checkAp()),
          "function" == typeof this.options.afterMove &&
            this.prevItem !== this.currentItem &&
            this.options.afterMove.apply(this, [this.$elem])
      },
      stop: function() {
        ;(this.apStatus = "stop"), i.clearInterval(this.autoPlayInterval)
      },
      checkAp: function() {
        "stop" !== this.apStatus && this.play()
      },
      play: function() {
        var t = this
        return (
          (t.apStatus = "play"),
          !1 === t.options.autoPlay
            ? !1
            : (i.clearInterval(t.autoPlayInterval),
              void (t.autoPlayInterval = i.setInterval(function() {
                t.next(!0)
              }, t.options.autoPlay)))
        )
      },
      swapSpeed: function(t) {
        "slideSpeed" === t
          ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed))
          : "paginationSpeed" === t
          ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed))
          : "string" != typeof t && this.$owlWrapper.css(this.addCssSpeed(t))
      },
      addCssSpeed: function(t) {
        return {
          "-webkit-transition": "all " + t + "ms ease",
          "-moz-transition": "all " + t + "ms ease",
          "-o-transition": "all " + t + "ms ease",
          transition: "all " + t + "ms ease"
        }
      },
      removeTransition: function() {
        return {
          "-webkit-transition": "",
          "-moz-transition": "",
          "-o-transition": "",
          transition: ""
        }
      },
      doTranslate: function(t) {
        return {
          "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)",
          "-moz-transform": "translate3d(" + t + "px, 0px, 0px)",
          "-o-transform": "translate3d(" + t + "px, 0px, 0px)",
          "-ms-transform": "translate3d(" + t + "px, 0px, 0px)",
          transform: "translate3d(" + t + "px, 0px,0px)"
        }
      },
      transition3d: function(t) {
        this.$owlWrapper.css(this.doTranslate(t))
      },
      css2move: function(t) {
        this.$owlWrapper.css({ left: t })
      },
      css2slide: function(t, i) {
        var s = this
        ;(s.isCssFinish = !1),
          s.$owlWrapper.stop(!0, !0).animate(
            { left: t },
            {
              duration: i || s.options.slideSpeed,
              complete: function() {
                s.isCssFinish = !0
              }
            }
          )
      },
      checkBrowser: function() {
        var t = s.createElement("div")
        ;(t.style.cssText =
          "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)"),
          (t = t.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g)),
          (this.browser = {
            support3d: null !== t && 1 === t.length,
            isTouch: "ontouchstart" in i || i.navigator.msMaxTouchPoints
          })
      },
      moveEvents: function() {
        ;(!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) &&
          (this.gestures(), this.disabledEvents())
      },
      eventTypes: function() {
        var t = ["s", "e", "x"]
        ;(this.ev_types = {}),
          !0 === this.options.mouseDrag && !0 === this.options.touchDrag
            ? (t = [
                "touchstart.owl mousedown.owl",
                "touchmove.owl mousemove.owl",
                "touchend.owl touchcancel.owl mouseup.owl"
              ])
            : !1 === this.options.mouseDrag && !0 === this.options.touchDrag
            ? (t = [
                "touchstart.owl",
                "touchmove.owl",
                "touchend.owl touchcancel.owl"
              ])
            : !0 === this.options.mouseDrag &&
              !1 === this.options.touchDrag &&
              (t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]),
          (this.ev_types.start = t[0]),
          (this.ev_types.move = t[1]),
          (this.ev_types.end = t[2])
      },
      disabledEvents: function() {
        this.$elem.on("dragstart.owl", function(t) {
          t.preventDefault()
        }),
          this.$elem.on("mousedown.disableTextSelect", function(i) {
            return t(i.target).is("input, textarea, select, option")
          })
      },
      gestures: function() {
        function e(t) {
          if (void 0 !== t.touches)
            return { x: t.touches[0].pageX, y: t.touches[0].pageY }
          if (void 0 === t.touches) {
            if (void 0 !== t.pageX) return { x: t.pageX, y: t.pageY }
            if (void 0 === t.pageX) return { x: t.clientX, y: t.clientY }
          }
        }
        function o(i) {
          "on" === i
            ? (t(s).on(r.ev_types.move, n), t(s).on(r.ev_types.end, a))
            : "off" === i &&
              (t(s).off(r.ev_types.move), t(s).off(r.ev_types.end))
        }
        function n(o) {
          ;(o = o.originalEvent || o || i.event),
            (r.newPosX = e(o).x - l.offsetX),
            (r.newPosY = e(o).y - l.offsetY),
            (r.newRelativeX = r.newPosX - l.relativePos),
            "function" == typeof r.options.startDragging &&
              !0 !== l.dragging &&
              0 !== r.newRelativeX &&
              ((l.dragging = !0), r.options.startDragging.apply(r, [r.$elem])),
            (8 < r.newRelativeX || -8 > r.newRelativeX) &&
              !0 === r.browser.isTouch &&
              (void 0 !== o.preventDefault
                ? o.preventDefault()
                : (o.returnValue = !1),
              (l.sliding = !0)),
            (10 < r.newPosY || -10 > r.newPosY) &&
              !1 === l.sliding &&
              t(s).off("touchmove.owl"),
            (r.newPosX = Math.max(
              Math.min(r.newPosX, r.newRelativeX / 5),
              r.maximumPixels + r.newRelativeX / 5
            )),
            !0 === r.browser.support3d
              ? r.transition3d(r.newPosX)
              : r.css2move(r.newPosX)
        }
        function a(s) {
          s = s.originalEvent || s || i.event
          var e
          ;(s.target = s.target || s.srcElement),
            (l.dragging = !1),
            !0 !== r.browser.isTouch && r.$owlWrapper.removeClass("grabbing"),
            (r.dragDirection = r.owl.dragDirection =
              0 > r.newRelativeX ? "left" : "right"),
            0 !== r.newRelativeX &&
              ((e = r.getNewPosition()),
              r.goTo(e, !1, "drag"),
              l.targetElement === s.target &&
                !0 !== r.browser.isTouch &&
                (t(s.target).on("click.disable", function(i) {
                  i.stopImmediatePropagation(),
                    i.stopPropagation(),
                    i.preventDefault(),
                    t(i.target).off("click.disable")
                }),
                (s = t._data(s.target, "events").click),
                (e = s.pop()),
                s.splice(0, 0, e))),
            o("off")
        }
        var r = this,
          l = {
            offsetX: 0,
            offsetY: 0,
            baseElWidth: 0,
            relativePos: 0,
            position: null,
            minSwipe: null,
            maxSwipe: null,
            sliding: null,
            dargging: null,
            targetElement: null
          }
        ;(r.isCssFinish = !0),
          r.$elem.on(r.ev_types.start, ".owl-wrapper", function(s) {
            s = s.originalEvent || s || i.event
            var n
            if (3 === s.which) return !1
            if (!(r.itemsAmount <= r.options.items)) {
              if (
                (!1 === r.isCssFinish && !r.options.dragBeforeAnimFinish) ||
                (!1 === r.isCss3Finish && !r.options.dragBeforeAnimFinish)
              )
                return !1
              !1 !== r.options.autoPlay && i.clearInterval(r.autoPlayInterval),
                !0 === r.browser.isTouch ||
                  r.$owlWrapper.hasClass("grabbing") ||
                  r.$owlWrapper.addClass("grabbing"),
                (r.newPosX = 0),
                (r.newRelativeX = 0),
                t(this).css(r.removeTransition()),
                (n = t(this).position()),
                (l.relativePos = n.left),
                (l.offsetX = e(s).x - n.left),
                (l.offsetY = e(s).y - n.top),
                o("on"),
                (l.sliding = !1),
                (l.targetElement = s.target || s.srcElement)
            }
          })
      },
      getNewPosition: function() {
        var t = this.closestItem()
        return (
          t > this.maximumItem
            ? (t = this.currentItem = this.maximumItem)
            : 0 <= this.newPosX && (this.currentItem = t = 0),
          t
        )
      },
      closestItem: function() {
        var i = this,
          s =
            !0 === i.options.scrollPerPage
              ? i.pagesInArray
              : i.positionsInArray,
          e = i.newPosX,
          o = null
        return (
          t.each(s, function(n, a) {
            e - i.itemWidth / 20 > s[n + 1] &&
            e - i.itemWidth / 20 < a &&
            "left" === i.moveDirection()
              ? ((o = a),
                (i.currentItem =
                  !0 === i.options.scrollPerPage
                    ? t.inArray(o, i.positionsInArray)
                    : n))
              : e + i.itemWidth / 20 < a &&
                e + i.itemWidth / 20 > (s[n + 1] || s[n] - i.itemWidth) &&
                "right" === i.moveDirection() &&
                (!0 === i.options.scrollPerPage
                  ? ((o = s[n + 1] || s[s.length - 1]),
                    (i.currentItem = t.inArray(o, i.positionsInArray)))
                  : ((o = s[n + 1]), (i.currentItem = n + 1)))
          }),
          i.currentItem
        )
      },
      moveDirection: function() {
        var t
        return (
          0 > this.newRelativeX
            ? ((t = "right"), (this.playDirection = "next"))
            : ((t = "left"), (this.playDirection = "prev")),
          t
        )
      },
      customEvents: function() {
        var t = this
        t.$elem.on("owl.next", function() {
          t.next()
        }),
          t.$elem.on("owl.prev", function() {
            t.prev()
          }),
          t.$elem.on("owl.play", function(i, s) {
            ;(t.options.autoPlay = s), t.play(), (t.hoverStatus = "play")
          }),
          t.$elem.on("owl.stop", function() {
            t.stop(), (t.hoverStatus = "stop")
          }),
          t.$elem.on("owl.goTo", function(i, s) {
            t.goTo(s)
          }),
          t.$elem.on("owl.jumpTo", function(i, s) {
            t.jumpTo(s)
          })
      },
      stopOnHover: function() {
        var t = this
        !0 === t.options.stopOnHover &&
          !0 !== t.browser.isTouch &&
          !1 !== t.options.autoPlay &&
          (t.$elem.on("mouseover", function() {
            t.stop()
          }),
          t.$elem.on("mouseout", function() {
            "stop" !== t.hoverStatus && t.play()
          }))
      },
      lazyLoad: function() {
        var i, s, e, o, n
        if (!1 === this.options.lazyLoad) return !1
        for (i = 0; i < this.itemsAmount; i += 1)
          (s = t(this.$owlItems[i])),
            "loaded" !== s.data("owl-loaded") &&
              ((e = s.data("owl-item")),
              (o = s.find(".lazyOwl")),
              "string" != typeof o.data("src")
                ? s.data("owl-loaded", "loaded")
                : (void 0 === s.data("owl-loaded") &&
                    (o.hide(),
                    s.addClass("loading").data("owl-loaded", "checked")),
                  (n =
                    !0 === this.options.lazyFollow
                      ? e >= this.currentItem
                      : !0) &&
                    e < this.currentItem + this.options.items &&
                    o.length &&
                    this.lazyPreload(s, o)))
      },
      lazyPreload: function(t, s) {
        function e() {
          t.data("owl-loaded", "loaded").removeClass("loading"),
            s.removeAttr("data-src"),
            "fade" === a.options.lazyEffect ? s.fadeIn(400) : s.show(),
            "function" == typeof a.options.afterLazyLoad &&
              a.options.afterLazyLoad.apply(this, [a.$elem])
        }
        function o() {
          ;(r += 1),
            a.completeImg(s.get(0)) || !0 === n
              ? e()
              : 100 >= r
              ? i.setTimeout(o, 100)
              : e()
        }
        var n,
          a = this,
          r = 0
        "DIV" === s.prop("tagName")
          ? (s.css("background-image", "url(" + s.data("src") + ")"), (n = !0))
          : (s[0].src = s.data("src")),
          o()
      },
      autoHeight: function() {
        function s() {
          var s = t(n.$owlItems[n.currentItem]).height()
          n.wrapperOuter.css("height", s + "px"),
            n.wrapperOuter.hasClass("autoHeight") ||
              i.setTimeout(function() {
                n.wrapperOuter.addClass("autoHeight")
              }, 0)
        }
        function e() {
          ;(o += 1),
            n.completeImg(a.get(0))
              ? s()
              : 100 >= o
              ? i.setTimeout(e, 100)
              : n.wrapperOuter.css("height", "")
        }
        var o,
          n = this,
          a = t(n.$owlItems[n.currentItem]).find("img")
        void 0 !== a.get(0) ? ((o = 0), e()) : s()
      },
      completeImg: function(t) {
        return !t.complete ||
          ("undefined" != typeof t.naturalWidth && 0 === t.naturalWidth)
          ? !1
          : !0
      },
      onVisibleItems: function() {
        var i
        for (
          !0 === this.options.addClassActive &&
            this.$owlItems.removeClass("active"),
            this.visibleItems = [],
            i = this.currentItem;
          i < this.currentItem + this.options.items;
          i += 1
        )
          this.visibleItems.push(i),
            !0 === this.options.addClassActive &&
              t(this.$owlItems[i]).addClass("active")
        this.owl.visibleItems = this.visibleItems
      },
      transitionTypes: function(t) {
        ;(this.outClass = "owl-" + t + "-out"),
          (this.inClass = "owl-" + t + "-in")
      },
      singleItemTransition: function() {
        var t = this,
          i = t.outClass,
          s = t.inClass,
          e = t.$owlItems.eq(t.currentItem),
          o = t.$owlItems.eq(t.prevItem),
          n =
            Math.abs(t.positionsInArray[t.currentItem]) +
            t.positionsInArray[t.prevItem],
          a = Math.abs(t.positionsInArray[t.currentItem]) + t.itemWidth / 2
        ;(t.isTransition = !0),
          t.$owlWrapper
            .addClass("owl-origin")
            .css({
              "-webkit-transform-origin": a + "px",
              "-moz-perspective-origin": a + "px",
              "perspective-origin": a + "px"
            }),
          o
            .css({ position: "relative", left: n + "px" })
            .addClass(i)
            .on(
              "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",
              function() {
                ;(t.endPrev = !0),
                  o.off(
                    "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"
                  ),
                  t.clearTransStyle(o, i)
              }
            ),
          e
            .addClass(s)
            .on(
              "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",
              function() {
                ;(t.endCurrent = !0),
                  e.off(
                    "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"
                  ),
                  t.clearTransStyle(e, s)
              }
            )
      },
      clearTransStyle: function(t, i) {
        t.css({ position: "", left: "" }).removeClass(i),
          this.endPrev &&
            this.endCurrent &&
            (this.$owlWrapper.removeClass("owl-origin"),
            (this.isTransition = this.endCurrent = this.endPrev = !1))
      },
      owlStatus: function() {
        this.owl = {
          userOptions: this.userOptions,
          baseElement: this.$elem,
          userItems: this.$userItems,
          owlItems: this.$owlItems,
          currentItem: this.currentItem,
          prevItem: this.prevItem,
          visibleItems: this.visibleItems,
          isTouch: this.browser.isTouch,
          browser: this.browser,
          dragDirection: this.dragDirection
        }
      },
      clearEvents: function() {
        this.$elem.off(".owl owl mousedown.disableTextSelect"),
          t(s).off(".owl owl"),
          t(i).off("resize", this.resizer)
      },
      unWrap: function() {
        0 !== this.$elem.children().length &&
          (this.$owlWrapper.unwrap(),
          this.$userItems.unwrap().unwrap(),
          this.owlControls && this.owlControls.remove()),
          this.clearEvents(),
          this.$elem
            .attr("style", this.$elem.data("owl-originalStyles") || "")
            .attr("class", this.$elem.data("owl-originalClasses"))
      },
      destroy: function() {
        this.stop(),
          i.clearInterval(this.checkVisible),
          this.unWrap(),
          this.$elem.removeData()
      },
      reinit: function(i) {
        ;(i = t.extend({}, this.userOptions, i)),
          this.unWrap(),
          this.init(i, this.$elem)
      },
      addItem: function(t, i) {
        var s
        return t
          ? 0 === this.$elem.children().length
            ? (this.$elem.append(t), this.setVars(), !1)
            : (this.unWrap(),
              (s = void 0 === i || -1 === i ? -1 : i),
              s >= this.$userItems.length || -1 === s
                ? this.$userItems.eq(-1).after(t)
                : this.$userItems.eq(s).before(t),
              void this.setVars())
          : !1
      },
      removeItem: function(t) {
        return 0 === this.$elem.children().length
          ? !1
          : ((t = void 0 === t || -1 === t ? -1 : t),
            this.unWrap(),
            this.$userItems.eq(t).remove(),
            void this.setVars())
      }
    }
    ;(t.fn.owlCarousel = function(i) {
      return this.each(function() {
        if (!0 === t(this).data("owl-init")) return !1
        t(this).data("owl-init", !0)
        var s = Object.create(e)
        s.init(i, this), t.data(this, "owlCarousel", s)
      })
    }),
      (t.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ["prev", "next"],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: i,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
      })
  })(jQuery, window, document)
