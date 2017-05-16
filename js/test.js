(function(g, c) {
  g.createComponentClass("base.results.Rail", {
    options: {
      pinnable: !0,
      sticky: !1,
      debug: !1,
      debounceDelay: 5,
      handleHorizontalScroll: !0,
      repositionTimeout: 200
    },
    prevScroll: 0,
    upScroll: !1,
    stickTop: !1,
    stickBottom: !1,
    originalNode: null,
    staticPosition: 0,
    pinnedContentHeight: 0,
    enabled: !0,
    init: function() {
      this.options.pinnable && c(document).ready(this.setWidth.bind(this))
    },
    addEventHandlers: function() {},
    inlineComponentsReady: function() {
      var a = this;
      a.originalNode = a.element.get(0);
      this.bindWindowEvents();
      this.options.pinnable && this.subscribe("resultspage.streaming.done moreFilters.toggle filterTab.changed filter.overflow.toggle displayad.loaded textad.loaded pinnedContent.heightChanged".split(" "), function() {
        a.onScroll()
      });
      this.subscribe("resultspage.view.setvisible", function(b) {
        b && a.setWidth()
      });
      this.subscribe("pinnedContent.enable", function(b) {
        a.enabled = b
      });
      this.subscribe("pinnedContent.reset", function() {
        a.resetPosition()
      })
    },
    setWidth: function() {
      var a = this;
      setTimeout(function() {
        a.element.css("width", a.element.parent().width())
      }, 0)
    },
    onScroll: function() {
      !1 !== this.enabled && (this.isRailAttached() ? this.handleScroll() : this.unbindWindowEvents())
    },
    handleScroll: function() {
      this.setPinnedContentHeight();
      var a = this.getWindowScroll()
        , b = this.getParentScroll();
      this.upScroll = this.prevScroll > a;
      this.prevScroll = a;
      (a = this.getPositionCSS(a, b, this.isElementTallerThanScreen())) && this.element.css(a)
    },
    unbindWindowEvents: function() {
      c(window).off("scroll.pinrails-" + this.id());
      c(window).off("resize.pinrails-" + this.id())
    },
    bindWindowEvents: function() {
      var a;
      this.options.pinnable && (0 < this.options.repositionTimeout && this.element.css("transition", "transform %sms ease-in-out".format(this.options.repositionTimeout)),
        a = 0 < this.options.debounceDelay ? g.Common.Utils.debounce(this.onScroll.bind(this), this.options.debounceDelay) : this.onScroll.bind(this),
        c(window).on("scroll.pinrails-" + this.id(), a),
        c(window).on("resize.pinrails-" + this.id(), a))
    },
    testBottom: function(a, b) {
      return b ? a < this.getParentHeight() - this.getWindowHeight() : a + this.getElementHeight() < this.getParentHeight()
    },
    testTop: function(a, b) {
      return a > this.getParentTop() - this.pinnedContentHeight
    },
    isElementTallerThanScreen: function() {
      return this.getElementHeight() > this.getWindowHeight()
    },
    calculateScrollPosition: function(a, b) {
      if (!b)
        return {
          position: "top"
        };
      this.upScroll && a <= this.getElementTop() - this.getParentTop() ? (this.stickTop = !0,
          this.stickBottom = !1) : !this.upScroll && a + this.getWindowHeight() >= this.getElementBottom() - this.getParentTop() ? (this.stickTop = !1,
            this.stickBottom = !0) : this.stickBottom = this.stickTop = !1;
      return this.stickBottom ? {
          position: "bottom"
        } : this.stickTop ? {
            position: "top"
          } : {
            translate: this.staticPosition
          }
    },
    resetPosition: function() {
      var a = c.extend(!0, {}, {
        position: "relative",
        top: "auto",
        bottom: "auto"
      }, this.makeTransformCSS("translate(0,0)"));
      this.element.css(a)
    },
    getPositionCSS: function(a, b, e) {
      if (!this.isRailSticky()) {
        var f = 0
          , d = {
          position: "relative",
          top: "auto",
          bottom: "auto"
        };
        a = this.testTop(a, e);
        var g = this.testBottom(b, e);
        this.staticPosition = this.getElementTop() - this.getParentTop();
        a && g ? (b = this.calculateScrollPosition(b, e),
          b.translate && (f = b.translate),
            b.position ? "top" == b.position ? (d = {
                  position: "fixed",
                  top: 0,
                  bottom: "auto"
                },
                  f = this.pinnedContentHeight) : (d = {
                  position: "fixed",
                  bottom: 0,
                  top: "auto"
                },
                  f = 0) : d = c.extend({}, d)) : (f = a ? this.getParentHeight() - this.getElementHeight() : 0,
            d = c.extend({}, d));
        b = "translateY(%spx)".format(f);
        this.options.handleHorizontalScroll && "fixed" === d.position && (e = this.getLeftScroll(),
        0 < e && (b = "translate(-%spx, %spx)".format(e, f)));
        return c.extend({}, d, this.makeTransformCSS(b))
      }
    },
    makeTransformCSS: function(a) {
      return {
        msTransform: a,
        transform: a
      }
    },
    destroy: function() {
      this.unbindWindowEvents();
      this.base()
    },
    isRailAttached: function() {
      return this.element && c.contains(window.document, this.originalNode)
    },
    isRailSticky: function() {
      var a = this.element.css("position");
      return "sticky" === a || "-webkit-sticky" === a
    },
    getElementHeight: function() {
      return Math.round(this.element.outerHeight())
    },
    getElementBottom: function() {
      return this.getElementTop() + this.getElementHeight()
    },
    getElementTop: function() {
      return Math.round(this.element.offset().top)
    },
    getWindowHeight: function() {
      return Math.round(c(window).outerHeight())
    },
    getWindowScroll: function() {
      return Math.round(c(window).scrollTop())
    },
    getParentHeight: function() {
      return Math.round(this.element.parent().outerHeight())
    },
    getParentTop: function() {
      return Math.round(this.element.parent().offset().top)
    },
    getLeftScroll: function() {
      return Math.round(c(window).scrollLeft())
    },
    getParentBottom: function() {
      return this.getParentTop() + this.getParentHeight()
    },
    getParentScroll: function() {
      return this.getWindowScroll() - this.getParentTop()
    },
    setPinnedContentHeight: function() {
      var a = g.question.ask("pinnedContent.height");
      null !== a ? this.pinnedContentHeight = a : 0 !== this.pinnedContentHeight && (this.pinnedContentHeight = 0)
    }
  })
})(R9, jQuery);