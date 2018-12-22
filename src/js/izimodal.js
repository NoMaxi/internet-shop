/*
* iziModal | v1.6.0
* http://izimodal.marcelodolce.com
* by Marcelo Dolce.
*/
!function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = function (e, i) {
        return void 0 === i && (i = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), t(i), i
    } : t(jQuery)
}(function (t) {
    function e() {
        var t, e = document.createElement("fakeelement"), i = {
            animation: "animationend",
            OAnimation: "oAnimationEnd",
            MozAnimation: "animationend",
            WebkitAnimation: "webkitAnimationEnd"
        };
        for (t in i) if (void 0 !== e.style[t]) return i[t]
    }

    function i(t) {
        return 9 === t ? navigator.appVersion.indexOf("MSIE 9.") !== -1 : (userAgent = navigator.userAgent, userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1)
    }

    function n(t) {
        var e = /%|px|em|cm|vh|vw/;
        return parseInt(String(t).split(e)[0])
    }

    function o(e) {
        var i = e.replace(/^.*#/, ""), n = t(e);
        n.attr("id", i + "-tmp"), window.location.hash = e, n.attr("id", i)
    }

    var s = t(window), a = t(document), r = "iziModal", l = {
        CLOSING: "closing",
        CLOSED: "closed",
        OPENING: "opening",
        OPENED: "opened",
        DESTROYED: "destroyed"
    }, d = e(), h = !!/Mobi/.test(navigator.userAgent);
    window.$iziModal = {}, window.$iziModal.autoOpen = 0, window.$iziModal.history = !1;
    var c = function (t, e) {
        this.init(t, e)
    };
    return c.prototype = {
        constructor: c, init: function (e, i) {
            var n = this;
            this.$element = t(e), void 0 !== this.$element[0].id && "" !== this.$element[0].id ? this.id = this.$element[0].id : (this.id = r + Math.floor(1e7 * Math.random() + 1), this.$element.attr("id", this.id)), this.classes = void 0 !== this.$element.attr("class") ? this.$element.attr("class") : "", this.content = this.$element.html(), this.state = l.CLOSED, this.options = i, this.width = 0, this.timer = null, this.timerTimeout = null, this.progressBar = null, this.isPaused = !1, this.isFullscreen = !1, this.headerHeight = 0, this.modalHeight = 0, this.$overlay = t('<div class="' + r + '-overlay" style="background-color:' + i.overlayColor + '"></div>'), this.$navigate = t('<div class="' + r + '-navigate"><div class="' + r + '-navigate-caption">Use</div><button class="' + r + '-navigate-prev"></button><button class="' + r + '-navigate-next"></button></div>'), this.group = {
                name: this.$element.attr("data-" + r + "-group"),
                index: null,
                ids: []
            }, this.$element.attr("aria-hidden", "true"), this.$element.attr("aria-labelledby", this.id), this.$element.attr("role", "dialog"), this.$element.hasClass("iziModal") || this.$element.addClass("iziModal"), void 0 === this.group.name && "" !== i.group && (this.group.name = i.group, this.$element.attr("data-" + r + "-group", i.group)), this.options.loop === !0 && this.$element.attr("data-" + r + "-loop", !0), t.each(this.options, function (t, e) {
                var o = n.$element.attr("data-" + r + "-" + t);
                try {
                    "undefined" != typeof o && ("" === o || "true" == o ? i[t] = !0 : "false" == o ? i[t] = !1 : "function" == typeof e ? i[t] = new Function(o) : i[t] = o)
                } catch (s) {
                }
            }), i.appendTo !== !1 && this.$element.appendTo(i.appendTo), i.iframe === !0 ? (this.$element.html('<div class="' + r + '-wrap"><div class="' + r + '-content"><iframe class="' + r + '-iframe"></iframe>' + this.content + "</div></div>"), null !== i.iframeHeight && this.$element.find("." + r + "-iframe").css("height", i.iframeHeight)) : this.$element.html('<div class="' + r + '-wrap"><div class="' + r + '-content">' + this.content + "</div></div>"), null !== this.options.background && this.$element.css("background", this.options.background), this.$wrap = this.$element.find("." + r + "-wrap"), null === i.zindex || isNaN(parseInt(i.zindex)) || (this.$element.css("z-index", i.zindex), this.$navigate.css("z-index", i.zindex - 1), this.$overlay.css("z-index", i.zindex - 2)), "" !== i.radius && this.$element.css("border-radius", i.radius), "" !== i.padding && this.$element.find("." + r + "-content").css("padding", i.padding), "" !== i.theme && ("light" === i.theme ? this.$element.addClass(r + "-light") : this.$element.addClass(i.theme)), i.rtl === !0 && this.$element.addClass(r + "-rtl"), i.openFullscreen === !0 && (this.isFullscreen = !0, this.$element.addClass("isFullscreen")), this.createHeader(), this.recalcWidth(), this.recalcVerticalPos(), !n.options.afterRender || "function" != typeof n.options.afterRender && "object" != typeof n.options.afterRender || n.options.afterRender(n)
        }, createHeader: function () {
            this.$header = t('<div class="' + r + '-header"><h2 class="' + r + '-header-title">' + this.options.title + '</h2><p class="' + r + '-header-subtitle">' + this.options.subtitle + '</p><div class="' + r + '-header-buttons"></div></div>'), this.options.closeButton === !0 && this.$header.find("." + r + "-header-buttons").append('<a href="javascript:void(0)" class="' + r + "-button " + r + '-button-close" data-' + r + "-close></a>"), this.options.fullscreen === !0 && this.$header.find("." + r + "-header-buttons").append('<a href="javascript:void(0)" class="' + r + "-button " + r + '-button-fullscreen" data-' + r + "-fullscreen></a>"), this.options.timeoutProgressbar === !0 && this.$header.prepend('<div class="' + r + '-progressbar"><div style="background-color:' + this.options.timeoutProgressbarColor + '"></div></div>'), "" === this.options.subtitle && this.$header.addClass(r + "-noSubtitle"), "" !== this.options.title && (null !== this.options.headerColor && (this.options.borderBottom === !0 && this.$element.css("border-bottom", "3px solid " + this.options.headerColor), this.$header.css("background", this.options.headerColor)), null === this.options.icon && null === this.options.iconText || (this.$header.prepend('<i class="' + r + '-header-icon"></i>'), null !== this.options.icon && this.$header.find("." + r + "-header-icon").addClass(this.options.icon).css("color", this.options.iconColor), null !== this.options.iconText && this.$header.find("." + r + "-header-icon").html(this.options.iconText)), this.$element.css("overflow", "hidden").prepend(this.$header))
        }, setGroup: function (e) {
            var i = this, n = this.group.name || e;
            if (this.group.ids = [], void 0 !== e && e !== this.group.name && (n = e, this.group.name = n, this.$element.attr("data-" + r + "-group", n)), void 0 !== n && "" !== n) {
                var o = 0;
                t.each(t("." + r + "[data-" + r + "-group=" + n + "]"), function (e, n) {
                    i.group.ids.push(t(this)[0].id), i.id == t(this)[0].id && (i.group.index = o), o++
                })
            }
        }, toggle: function () {
            this.state == l.OPENED && this.close(), this.state == l.CLOSED && this.open()
        }, startProgress: function (t) {
            var e = this;
            this.isPaused = !1, clearTimeout(this.timerTimeout), this.options.timeoutProgressbar === !0 ? (this.progressBar = {
                hideEta: null,
                maxHideTime: null,
                currentTime: (new Date).getTime(),
                el: this.$element.find("." + r + "-progressbar > div"),
                updateProgress: function () {
                    if (!e.isPaused) {
                        e.progressBar.currentTime = e.progressBar.currentTime + 10;
                        var t = (e.progressBar.hideEta - e.progressBar.currentTime) / e.progressBar.maxHideTime * 100;
                        e.progressBar.el.width(t + "%"), t < 0 && e.close()
                    }
                }
            }, t > 0 && (this.progressBar.maxHideTime = parseFloat(t), this.progressBar.hideEta = (new Date).getTime() + this.progressBar.maxHideTime, this.timerTimeout = setInterval(this.progressBar.updateProgress, 10))) : this.timerTimeout = setTimeout(function () {
                e.close()
            }, e.options.timeout)
        }, pauseProgress: function () {
            this.isPaused = !0
        }, resumeProgress: function () {
            this.isPaused = !1
        }, resetProgress: function (t) {
            clearTimeout(this.timerTimeout), this.progressBar = {}, this.$element.find("." + r + "-progressbar > div").width("100%")
        }, open: function (e) {
            function i() {
                s.state = l.OPENED, s.$element.trigger(l.OPENED), !s.options.onOpened || "function" != typeof s.options.onOpened && "object" != typeof s.options.onOpened || s.options.onOpened(s)
            }

            function n() {
                s.$element.off("click", "[data-" + r + "-close]").on("click", "[data-" + r + "-close]", function (e) {
                    e.preventDefault();
                    var i = t(e.currentTarget).attr("data-" + r + "-transitionOut");
                    void 0 !== i ? s.close({transition: i}) : s.close()
                }), s.$element.off("click", "[data-" + r + "-fullscreen]").on("click", "[data-" + r + "-fullscreen]", function (t) {
                    t.preventDefault(), s.isFullscreen === !0 ? (s.isFullscreen = !1, s.$element.removeClass("isFullscreen")) : (s.isFullscreen = !0, s.$element.addClass("isFullscreen")), s.options.onFullscreen && "function" == typeof s.options.onFullscreen && s.options.onFullscreen(s), s.$element.trigger("fullscreen", s)
                }), s.$navigate.off("click", "." + r + "-navigate-next").on("click", "." + r + "-navigate-next", function (t) {
                    s.next(t)
                }), s.$element.off("click", "[data-" + r + "-next]").on("click", "[data-" + r + "-next]", function (t) {
                    s.next(t)
                }), s.$navigate.off("click", "." + r + "-navigate-prev").on("click", "." + r + "-navigate-prev", function (t) {
                    s.prev(t)
                }), s.$element.off("click", "[data-" + r + "-prev]").on("click", "[data-" + r + "-prev]", function (t) {
                    s.prev(t)
                })
            }

            var s = this;
            try {
                void 0 !== e && e.preventClose === !1 && t.each(t("." + r), function (e, i) {
                    if (void 0 !== t(i).data().iziModal) {
                        var n = t(i).iziModal("getState");
                        "opened" != n && "opening" != n || t(i).iziModal("close")
                    }
                })
            } catch (c) {
            }
            if (function () {
                if (s.options.history) {
                    var t = document.title;
                    document.title = t + " - " + s.options.title, o("#" + s.id), document.title = t, window.$iziModal.history = !0
                } else window.$iziModal.history = !1
            }(), this.state == l.CLOSED) {
                if (n(), this.setGroup(), this.state = l.OPENING, this.$element.trigger(l.OPENING), this.$element.attr("aria-hidden", "false"), this.options.timeoutProgressbar === !0 && this.$element.find("." + r + "-progressbar > div").width("100%"), this.options.iframe === !0) {
                    this.$element.find("." + r + "-content").addClass(r + "-content-loader"), this.$element.find("." + r + "-iframe").on("load", function () {
                        t(this).parent().removeClass(r + "-content-loader")
                    });
                    var u = null;
                    try {
                        u = "" !== t(e.currentTarget).attr("href") ? t(e.currentTarget).attr("href") : null
                    } catch (c) {
                    }
                    if (null === this.options.iframeURL || null !== u && void 0 !== u || (u = this.options.iframeURL), null === u || void 0 === u) throw new Error("Failed to find iframe URL");
                    this.$element.find("." + r + "-iframe").attr("src", u)
                }
                (this.options.bodyOverflow || h) && (t("html").addClass(r + "-isOverflow"), h && t("body").css("overflow", "hidden")), this.options.onOpening && "function" == typeof this.options.onOpening && this.options.onOpening(this), function () {
                    if (s.group.ids.length > 1) {
                        s.$navigate.appendTo("body"), s.$navigate.addClass("fadeIn"), s.options.navigateCaption === !0 && s.$navigate.find("." + r + "-navigate-caption").show();
                        var n = s.$element.outerWidth();
                        s.options.navigateArrows !== !1 ? "closeScreenEdge" === s.options.navigateArrows ? (s.$navigate.find("." + r + "-navigate-prev").css("left", 0).show(), s.$navigate.find("." + r + "-navigate-next").css("right", 0).show()) : (s.$navigate.find("." + r + "-navigate-prev").css("margin-left", -(n / 2 + 84)).show(), s.$navigate.find("." + r + "-navigate-next").css("margin-right", -(n / 2 + 84)).show()) : (s.$navigate.find("." + r + "-navigate-prev").hide(), s.$navigate.find("." + r + "-navigate-next").hide());
                        var o;
                        0 === s.group.index && (o = t("." + r + "[data-" + r + '-group="' + s.group.name + '"][data-' + r + "-loop]").length, 0 === o && s.options.loop === !1 && s.$navigate.find("." + r + "-navigate-prev").hide()), s.group.index + 1 === s.group.ids.length && (o = t("." + r + "[data-" + r + '-group="' + s.group.name + '"][data-' + r + "-loop]").length, 0 === o && s.options.loop === !1 && s.$navigate.find("." + r + "-navigate-next").hide())
                    }
                    s.options.overlay === !0 && (s.options.appendToOverlay === !1 ? s.$overlay.appendTo("body") : s.$overlay.appendTo(s.options.appendToOverlay)), s.options.transitionInOverlay && s.$overlay.addClass(s.options.transitionInOverlay);
                    var a = s.options.transitionIn;
                    "object" == typeof e && (void 0 === e.transition && void 0 === e.transitionIn || (a = e.transition || e.transitionIn), void 0 !== e.zindex && s.setZindex(e.zindex)), "" !== a && void 0 !== d ? (s.$element.addClass("transitionIn " + a).show(), s.$wrap.one(d, function () {
                        s.$element.removeClass(a + " transitionIn"), s.$overlay.removeClass(s.options.transitionInOverlay), s.$navigate.removeClass("fadeIn"), i()
                    })) : (s.$element.show(), i()), s.options.pauseOnHover !== !0 || s.options.pauseOnHover !== !0 || s.options.timeout === !1 || isNaN(parseInt(s.options.timeout)) || s.options.timeout === !1 || 0 === s.options.timeout || (s.$element.off("mouseenter").on("mouseenter", function (t) {
                        t.preventDefault(), s.isPaused = !0
                    }), s.$element.off("mouseleave").on("mouseleave", function (t) {
                        t.preventDefault(), s.isPaused = !1
                    }))
                }(), this.options.timeout === !1 || isNaN(parseInt(this.options.timeout)) || this.options.timeout === !1 || 0 === this.options.timeout || s.startProgress(this.options.timeout), this.options.overlayClose && !this.$element.hasClass(this.options.transitionOut) && this.$overlay.click(function () {
                    s.close()
                }), this.options.focusInput && this.$element.find(":input:not(button):enabled:visible:first").focus(), function p() {
                    s.recalcLayout(), s.timer = setTimeout(p, 300)
                }(), a.on("keydown." + r, function (t) {
                    s.options.closeOnEscape && 27 === t.keyCode && s.close()
                })
            }
        }, close: function (e) {
            function i() {
                n.state = l.CLOSED, n.$element.trigger(l.CLOSED), n.options.iframe === !0 && n.$element.find("." + r + "-iframe").attr("src", ""), (n.options.bodyOverflow || h) && (t("html").removeClass(r + "-isOverflow"), h && t("body").css("overflow", "auto")), n.options.onClosed && "function" == typeof n.options.onClosed && n.options.onClosed(n), n.options.restoreDefaultContent === !0 && n.$element.find("." + r + "-content").html(n.content), 0 === t("." + r + ":visible").length && t("html").removeClass(r + "-isAttached")
            }

            var n = this;
            if (this.state == l.OPENED || this.state == l.OPENING) {
                a.off("keydown." + r), this.state = l.CLOSING, this.$element.trigger(l.CLOSING), this.$element.attr("aria-hidden", "true"), clearTimeout(this.timer), clearTimeout(this.timerTimeout), n.options.onClosing && "function" == typeof n.options.onClosing && n.options.onClosing(this);
                var o = this.options.transitionOut;
                "object" == typeof e && (void 0 === e.transition && void 0 === e.transitionOut || (o = e.transition || e.transitionOut)), o === !1 || "" === o || void 0 === d ? (this.$element.hide(), this.$overlay.remove(), this.$navigate.remove(), i()) : (this.$element.attr("class", [this.classes, r, o, "light" == this.options.theme ? r + "-light" : this.options.theme, this.isFullscreen === !0 ? "isFullscreen" : "", this.options.rtl ? r + "-rtl" : ""].join(" ")), this.$overlay.attr("class", r + "-overlay " + this.options.transitionOutOverlay), n.options.navigateArrows === !1 || h || this.$navigate.attr("class", r + "-navigate fadeOut"), this.$element.one(d, function () {
                    n.$element.hasClass(o) && n.$element.removeClass(o + " transitionOut").hide(), n.$overlay.removeClass(n.options.transitionOutOverlay).remove(), n.$navigate.removeClass("fadeOut").remove(), i()
                }))
            }
        }, next: function (e) {
            var i = this, n = "fadeInRight", o = "fadeOutLeft",
                s = t("." + r + ":visible"), a = {};
            a.out = this, void 0 !== e && "object" != typeof e ? (e.preventDefault(), s = t(e.currentTarget), n = s.attr("data-" + r + "-transitionIn"), o = s.attr("data-" + r + "-transitionOut")) : void 0 !== e && (void 0 !== e.transitionIn && (n = e.transitionIn), void 0 !== e.transitionOut && (o = e.transitionOut)), this.close({transition: o}), setTimeout(function () {
                for (var e = t("." + r + "[data-" + r + '-group="' + i.group.name + '"][data-' + r + "-loop]").length, o = i.group.index + 1; o <= i.group.ids.length; o++) {
                    try {
                        a["in"] = t("#" + i.group.ids[o]).data().iziModal
                    } catch (s) {
                    }
                    if ("undefined" != typeof a["in"]) {
                        t("#" + i.group.ids[o]).iziModal("open", {transition: n});
                        break
                    }
                    if (o == i.group.ids.length && e > 0 || i.options.loop === !0) for (var l = 0; l <= i.group.ids.length; l++) if (a["in"] = t("#" + i.group.ids[l]).data().iziModal, "undefined" != typeof a["in"]) {
                        t("#" + i.group.ids[l]).iziModal("open", {transition: n});
                        break
                    }
                }
            }, 200), t(document).trigger(r + "-group-change", a)
        }, prev: function (e) {
            var i = this, n = "fadeInLeft", o = "fadeOutRight",
                s = t("." + r + ":visible"), a = {};
            a.out = this, void 0 !== e && "object" != typeof e ? (e.preventDefault(), s = t(e.currentTarget), n = s.attr("data-" + r + "-transitionIn"), o = s.attr("data-" + r + "-transitionOut")) : void 0 !== e && (void 0 !== e.transitionIn && (n = e.transitionIn), void 0 !== e.transitionOut && (o = e.transitionOut)), this.close({transition: o}), setTimeout(function () {
                for (var e = t("." + r + "[data-" + r + '-group="' + i.group.name + '"][data-' + r + "-loop]").length, o = i.group.index; o >= 0; o--) {
                    try {
                        a["in"] = t("#" + i.group.ids[o - 1]).data().iziModal
                    } catch (s) {
                    }
                    if ("undefined" != typeof a["in"]) {
                        t("#" + i.group.ids[o - 1]).iziModal("open", {transition: n});
                        break
                    }
                    if (0 === o && e > 0 || i.options.loop === !0) for (var l = i.group.ids.length - 1; l >= 0; l--) if (a["in"] = t("#" + i.group.ids[l]).data().iziModal, "undefined" != typeof a["in"]) {
                        t("#" + i.group.ids[l]).iziModal("open", {transition: n});
                        break
                    }
                }
            }, 200), t(document).trigger(r + "-group-change", a)
        }, destroy: function () {
            var e = t.Event("destroy");
            this.$element.trigger(e), a.off("keydown." + r), clearTimeout(this.timer), clearTimeout(this.timerTimeout), this.options.iframe === !0 && this.$element.find("." + r + "-iframe").remove(), this.$element.html(this.$element.find("." + r + "-content").html()), this.$element.off("click", "[data-" + r + "-close]"), this.$element.off("click", "[data-" + r + "-fullscreen]"), this.$element.off("." + r).removeData(r).attr("style", ""), this.$overlay.remove(), this.$navigate.remove(), this.$element.trigger(l.DESTROYED), this.$element = null
        }, getState: function () {
            return this.state
        }, getGroup: function () {
            return this.group
        }, setWidth: function (t) {
            this.options.width = t, this.recalcWidth();
            var e = this.$element.outerWidth();
            this.options.navigateArrows !== !0 && "closeToModal" != this.options.navigateArrows || (this.$navigate.find("." + r + "-navigate-prev").css("margin-left", -(e / 2 + 84)).show(), this.$navigate.find("." + r + "-navigate-next").css("margin-right", -(e / 2 + 84)).show())
        }, setTop: function (t) {
            this.options.top = t, this.recalcVerticalPos(!1)
        }, setBottom: function (t) {
            this.options.bottom = t, this.recalcVerticalPos(!1)
        }, setHeader: function (t) {
            t ? this.$element.find("." + r + "-header").show() : (this.headerHeight = 0, this.$element.find("." + r + "-header").hide())
        }, setTitle: function (t) {
            this.options.title = t, 0 === this.headerHeight && this.createHeader(), 0 === this.$header.find("." + r + "-header-title").length && this.$header.append('<h2 class="' + r + '-header-title"></h2>'), this.$header.find("." + r + "-header-title").html(t)
        }, setSubtitle: function (t) {
            "" === t ? (this.$header.find("." + r + "-header-subtitle").remove(), this.$header.addClass(r + "-noSubtitle")) : (0 === this.$header.find("." + r + "-header-subtitle").length && this.$header.append('<p class="' + r + '-header-subtitle"></p>'), this.$header.removeClass(r + "-noSubtitle")), this.$header.find("." + r + "-header-subtitle").html(t), this.options.subtitle = t
        }, setIcon: function (t) {
            0 === this.$header.find("." + r + "-header-icon").length && this.$header.prepend('<i class="' + r + '-header-icon"></i>'), this.$header.find("." + r + "-header-icon").attr("class", r + "-header-icon " + t), this.options.icon = t
        }, setIconText: function (t) {
            this.$header.find("." + r + "-header-icon").html(t), this.options.iconText = t
        }, setHeaderColor: function (t) {
            this.options.borderBottom === !0 && this.$element.css("border-bottom", "3px solid " + t), this.$header.css("background", t), this.options.headerColor = t
        }, setBackground: function (t) {
            t === !1 ? (this.options.background = null, this.$element.css("background", "")) : (this.$element.css("background", t), this.options.background = t)
        }, setZindex: function (t) {
            isNaN(parseInt(this.options.zindex)) || (this.options.zindex = t, this.$element.css("z-index", t), this.$navigate.css("z-index", t - 1), this.$overlay.css("z-index", t - 2))
        }, setFullscreen: function (t) {
            t ? (this.isFullscreen = !0, this.$element.addClass("isFullscreen")) : (this.isFullscreen = !1, this.$element.removeClass("isFullscreen"))
        }, setContent: function (t) {
            if ("object" == typeof t) {
                var e = t["default"] || !1;
                e === !0 && (this.content = t.content), t = t.content
            }
            this.options.iframe === !1 && this.$element.find("." + r + "-content").html(t)
        }, setTransitionIn: function (t) {
            this.options.transitionIn = t
        }, setTransitionOut: function (t) {
            this.options.transitionOut = t
        }, setTimeout: function (t) {
            this.options.timeout = t
        }, resetContent: function () {
            this.$element.find("." + r + "-content").html(this.content)
        }, startLoading: function () {
            this.$element.find("." + r + "-loader").length || this.$element.append('<div class="' + r + '-loader fadeIn"></div>'), this.$element.find("." + r + "-loader").css({
                top: this.headerHeight,
                borderRadius: this.options.radius
            })
        }, stopLoading: function () {
            var t = this.$element.find("." + r + "-loader");
            t.length || (this.$element.prepend('<div class="' + r + '-loader fadeIn"></div>'), t = this.$element.find("." + r + "-loader").css("border-radius", this.options.radius)), t.removeClass("fadeIn").addClass("fadeOut"), setTimeout(function () {
                t.remove()
            }, 600)
        }, recalcWidth: function () {
            var t = this;
            if (this.$element.css("max-width", this.options.width), i()) {
                var e = t.options.width;
                e.toString().split("%").length > 1 && (e = t.$element.outerWidth()), t.$element.css({
                    left: "50%",
                    marginLeft: -(e / 2)
                })
            }
        }, recalcVerticalPos: function (t) {
            null !== this.options.top && this.options.top !== !1 ? (this.$element.css("margin-top", this.options.top), 0 === this.options.top && this.$element.css({
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0
            })) : t === !1 && this.$element.css({
                marginTop: "",
                borderRadius: this.options.radius
            }), null !== this.options.bottom && this.options.bottom !== !1 ? (this.$element.css("margin-bottom", this.options.bottom), 0 === this.options.bottom && this.$element.css({
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0
            })) : t === !1 && this.$element.css({
                marginBottom: "",
                borderRadius: this.options.radius
            })
        }, recalcLayout: function () {
            var e = this, o = s.height(), a = this.$element.outerHeight(),
                d = this.$element.outerWidth(),
                h = this.$element.find("." + r + "-content")[0].scrollHeight,
                c = h + this.headerHeight,
                u = this.$element.innerHeight() - this.headerHeight,
                p = (parseInt(-((this.$element.innerHeight() + 1) / 2)) + "px", this.$wrap.scrollTop()),
                f = 0;
            i() && (d >= s.width() || this.isFullscreen === !0 ? this.$element.css({
                left: "0",
                marginLeft: ""
            }) : this.$element.css({
                left: "50%",
                marginLeft: -(d / 2)
            })), this.options.borderBottom === !0 && "" !== this.options.title && (f = 3), this.$element.find("." + r + "-header").length && this.$element.find("." + r + "-header").is(":visible") ? (this.headerHeight = parseInt(this.$element.find("." + r + "-header").innerHeight()), this.$element.css("overflow", "hidden")) : (this.headerHeight = 0, this.$element.css("overflow", "")), this.$element.find("." + r + "-loader").length && this.$element.find("." + r + "-loader").css("top", this.headerHeight), a !== this.modalHeight && (this.modalHeight = a, this.options.onResize && "function" == typeof this.options.onResize && this.options.onResize(this)), this.state != l.OPENED && this.state != l.OPENING || (this.options.iframe === !0 && (o < this.options.iframeHeight + this.headerHeight + f || this.isFullscreen === !0 ? this.$element.find("." + r + "-iframe").css("height", o - (this.headerHeight + f)) : this.$element.find("." + r + "-iframe").css("height", this.options.iframeHeight)), a == o ? this.$element.addClass("isAttached") : this.$element.removeClass("isAttached"), this.isFullscreen === !1 && this.$element.width() >= s.width() ? this.$element.find("." + r + "-button-fullscreen").hide() : this.$element.find("." + r + "-button-fullscreen").show(), this.recalcButtons(), this.isFullscreen === !1 && (o = o - (n(this.options.top) || 0) - (n(this.options.bottom) || 0)), c > o ? (this.options.top > 0 && null === this.options.bottom && h < s.height() && this.$element.addClass("isAttachedBottom"), this.options.bottom > 0 && null === this.options.top && h < s.height() && this.$element.addClass("isAttachedTop"), 1 === t("." + r + ":visible").length && t("html").addClass(r + "-isAttached"), this.$element.css("height", o)) : (this.$element.css("height", h + (this.headerHeight + f)), this.$element.removeClass("isAttachedTop isAttachedBottom"), 1 === t("." + r + ":visible").length && t("html").removeClass(r + "-isAttached")), function () {
                h > u && c > o ? (e.$element.addClass("hasScroll"), e.$wrap.css("height", a - (e.headerHeight + f))) : (e.$element.removeClass("hasScroll"), e.$wrap.css("height", "auto"))
            }(), function () {
                u + p < h - 30 ? e.$element.addClass("hasShadow") : e.$element.removeClass("hasShadow")
            }())
        }, recalcButtons: function () {
            var t = this.$header.find("." + r + "-header-buttons").innerWidth() + 10;
            this.options.rtl === !0 ? this.$header.css("padding-left", t) : this.$header.css("padding-right", t)
        }
    }, s.off("load." + r).on("load." + r, function (e) {
        var i = document.location.hash;
        if (0 === window.$iziModal.autoOpen && !t("." + r).is(":visible")) try {
            var n = t(i).data();
            "undefined" != typeof n && n.iziModal.options.autoOpen !== !1 && t(i).iziModal("open")
        } catch (o) {
        }
    }), s.off("hashchange." + r).on("hashchange." + r, function (e) {
        var i = document.location.hash;
        if ("" !== i) try {
            var n = t(i).data();
            "undefined" != typeof n && "opening" !== t(i).iziModal("getState") && setTimeout(function () {
                t(i).iziModal("open", {preventClose: !1})
            }, 200)
        } catch (o) {
        } else window.$iziModal.history && t.each(t("." + r), function (e, i) {
            if (void 0 !== t(i).data().iziModal) {
                var n = t(i).iziModal("getState");
                "opened" != n && "opening" != n || t(i).iziModal("close")
            }
        })
    }), a.off("click", "[data-" + r + "-open]").on("click", "[data-" + r + "-open]", function (e) {
        e.preventDefault();
        var i = t("." + r + ":visible"),
            n = t(e.currentTarget).attr("data-" + r + "-open"),
            o = t(e.currentTarget).attr("data-" + r + "-preventClose"),
            s = t(e.currentTarget).attr("data-" + r + "-transitionIn"),
            a = t(e.currentTarget).attr("data-" + r + "-transitionOut"),
            l = t(e.currentTarget).attr("data-" + r + "-zindex");
        void 0 !== l && t(n).iziModal("setZindex", l), void 0 === o && (void 0 !== a ? i.iziModal("close", {transition: a}) : i.iziModal("close")), setTimeout(function () {
            void 0 !== s ? t(n).iziModal("open", {transition: s}) : t(n).iziModal("open")
        }, 200)
    }), a.off("keyup." + r).on("keyup." + r, function (e) {
        if (t("." + r + ":visible").length) {
            var i = t("." + r + ":visible")[0].id,
                n = t("#" + i).data().iziModal.options.arrowKeys,
                o = t("#" + i).iziModal("getGroup"), s = e || window.event,
                a = s.target || s.srcElement;
            void 0 === i || !n || void 0 === o.name || s.ctrlKey || s.metaKey || s.altKey || "INPUT" === a.tagName.toUpperCase() || "TEXTAREA" == a.tagName.toUpperCase() || (37 === s.keyCode ? t("#" + i).iziModal("prev", s) : 39 === s.keyCode && t("#" + i).iziModal("next", s))
        }
    }), t.fn[r] = function (e, i) {
        if (!t(this).length && "object" == typeof e) {
            var n = {
                $el: document.createElement("div"),
                id: this.selector.split("#"),
                "class": this.selector.split(".")
            };
            if (n.id.length > 1) {
                try {
                    n.$el = document.createElement(id[0])
                } catch (o) {
                }
                n.$el.id = this.selector.split("#")[1].trim()
            } else if (n["class"].length > 1) {
                try {
                    n.$el = document.createElement(n["class"][0])
                } catch (o) {
                }
                for (var s = 1; s < n["class"].length; s++) n.$el.classList.add(n["class"][s].trim())
            }
            document.body.appendChild(n.$el), this.push(t(this.selector))
        }
        for (var a = this, l = 0; l < a.length; l++) {
            var d = t(a[l]), h = d.data(r),
                u = t.extend({}, t.fn[r].defaults, d.data(), "object" == typeof e && e);
            if (h || e && "object" != typeof e) {
                if ("string" == typeof e && "undefined" != typeof h) return h[e].apply(h, [].concat(i))
            } else d.data(r, h = new c(d, u));
            u.autoOpen && (isNaN(parseInt(u.autoOpen)) ? u.autoOpen === !0 && h.open() : setTimeout(function () {
                h.open()
            }, u.autoOpen), window.$iziModal.autoOpen++)
        }
        return this
    }, t.fn[r].defaults = {
        title: "",
        subtitle: "",
        headerColor: "#88A0B9",
        background: null,
        theme: "",
        icon: null,
        iconText: null,
        iconColor: "",
        rtl: !1,
        width: 600,
        top: null,
        bottom: null,
        borderBottom: !0,
        padding: 0,
        radius: 3,
        zindex: 999,
        iframe: !1,
        iframeHeight: 400,
        iframeURL: null,
        focusInput: !0,
        group: "",
        loop: !1,
        arrowKeys: !0,
        navigateCaption: !0,
        navigateArrows: !0,
        history: !1,
        restoreDefaultContent: !1,
        autoOpen: 0,
        bodyOverflow: !1,
        fullscreen: !1,
        openFullscreen: !1,
        closeOnEscape: !0,
        closeButton: !0,
        appendTo: "body",
        appendToOverlay: "body",
        overlay: !0,
        overlayClose: !0,
        overlayColor: "rgba(0, 0, 0, 0.4)",
        timeout: !1,
        timeoutProgressbar: !1,
        pauseOnHover: !1,
        timeoutProgressbarColor: "rgba(255,255,255,0.5)",
        transitionIn: "comingIn",
        transitionOut: "comingOut",
        transitionInOverlay: "fadeIn",
        transitionOutOverlay: "fadeOut",
        onFullscreen: function () {
        },
        onResize: function () {
        },
        onOpening: function () {
        },
        onOpened: function () {
        },
        onClosing: function () {
        },
        onClosed: function () {
        },
        afterRender: function () {
        }
    }, t.fn[r].Constructor = c, t.fn.iziModal
});