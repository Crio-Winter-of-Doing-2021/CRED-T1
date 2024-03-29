"use strict";
var Layout = function () {
        function n(e) {
            $(".sidenav-toggler").addClass("active"), $(".sidenav-toggler").data("action", "sidenav-unpin"), $("body").addClass("sidenav-pinned ready"), $("body").find(".main-content").append('<div class="sidenav-mask mask-body d-xl-none" data-action="sidenav-unpin" data-target=' + e.data("target") + " />"), $(e.data("target")).addClass("show"), localStorage.setItem("sidenav-state", "pinned")
        }

        function i(e) {
            $(".sidenav-toggler").removeClass("active"), $(".sidenav-toggler").data("action", "sidenav-pin"), $("body").removeClass("sidenav-pinned"), $("body").addClass("ready"), $("body").find(".sidenav-mask").remove(), $(e.data("target")).removeClass("show"), localStorage.setItem("sidenav-state", "unpinned")
        }
        var e = localStorage.getItem("sidenav-state") ? localStorage.getItem("sidenav-state") : "pinned";
        if ($(window).on({
                "load resize": function () {
                    $(".sidenav-toggler").length ? $(window).width() < 1200 ? i($(".sidenav-toggler")) : "pinned" == e ? n($(".sidenav-toggler")) : "unpinned" == e && i($(".sidenav-toggler")) : $("body").addClass("ready")
                }
            }), $("body").on("click", "[data-action]", function (e) {
                e.preventDefault();
                var t = $(this),
                    a = t.data("action"),
                    o = t.data("target");
                switch (a) {
                    case "offcanvas-open":
                        o = t.data("target"), $(o).addClass("open"), $("body").append('<div class="body-backdrop" data-action="offcanvas-close" data-target=' + o + " />");
                        break;
                    case "offcanvas-close":
                        o = t.data("target"), $(o).removeClass("open"), $("body").find(".body-backdrop").remove();
                        break;
                    case "aside-open":
                        o = t.data("target"), t.addClass("active"), $(o).addClass("show"), $("body").append('<div class="mask-body mask-body-light" data-action="aside-close" data-target=' + o + " />");
                        break;
                    case "aside-close":
                        o = t.data("target"), t.removeClass("active"), $(o).removeClass("show"), $("body").find(".body-backdrop").remove();
                        break;
                    case "omnisearch-open":
                        o = t.data("target"), t.addClass("active"), $(o).addClass("show"), $(o).find(".form-control").focus(), $("body").addClass("omnisearch-open").append('<div class="mask-body mask-body-dark" data-action="omnisearch-close" data-target="' + o + '" />');
                        break;
                    case "omnisearch-close":
                        o = t.data("target"), $('[data-action="search-open"]').removeClass("active"), $(o).removeClass("show"), $("body").removeClass("omnisearch-open").find(".mask-body").remove();
                        break;
                    case "search-open":
                        o = t.data("target"), t.addClass("active"), $(o).addClass("show"), $(o).find(".form-control").focus();
                        break;
                    case "search-close":
                        o = t.data("target"), $('[data-action="search-open"]').removeClass("active"), $(o).removeClass("show");
                        break;
                    case "sidenav-pin":
                        n(t);
                        break;
                    case "sidenav-unpin":
                        i(t)
                }
            }), $("[data-offset-top]").length) {
            var t = $("[data-offset-top]"),
                a = $(t.data("offset-top")).height();
            t.css({
                "padding-top": a + "px"
            })
        }
    }(),
    Popover = function () {
        var e = $('[data-toggle="popover"]');
        e.length && e.each(function () {
            ! function (e) {
                var t = "";
                e.data("color") && (t = " popover-" + e.data("color"));
                var a = {
                    trigger: "focus",
                    template: '<div class="popover' + t + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                };
                e.popover(a)
            }($(this))
        })
    }(),
    PurposeStyle = function () {
        var e = getComputedStyle(document.body);
        return {
            colors: {
                gray: {
                    100: "#f6f9fc",
                    200: "#e9ecef",
                    300: "#dee2e6",
                    400: "#ced4da",
                    500: "#adb5bd",
                    600: "#8898aa",
                    700: "#525f7f",
                    800: "#32325d",
                    900: "#212529"
                },
                theme: {
                    primary: e.getPropertyValue("--primary") ? e.getPropertyValue("--primary").replace(" ", "") : "#008aff",
                    info: e.getPropertyValue("--info") ? e.getPropertyValue("--info").replace(" ", "") : "#50b5ff",
                    success: e.getPropertyValue("--success") ? e.getPropertyValue("--success").replace(" ", "") : "#5cc9a7",
                    danger: e.getPropertyValue("--danger") ? e.getPropertyValue("--danger").replace(" ", "") : "#f25767",
                    warning: e.getPropertyValue("--warning") ? e.getPropertyValue("--warning").replace(" ", "") : "#FFBE3D",
                    dark: e.getPropertyValue("--dark") ? e.getPropertyValue("--dark").replace(" ", "") : "#171347"
                },
                transparent: "transparent"
            },
            fonts: {
                base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
            }
        }
    }(),
    SvgInjector = function () {
        var e = document.querySelectorAll("img.svg-inject"),
            t = !1;
        return e.length && SVGInjector(e, {}, function () {
            t = !0
        }), {
            status: t
        }
    }(),
    Tooltip = function () {
        var e = $('[data-toggle="tooltip"]');
        e.length && e.tooltip()
    }(),
    Cookies = function () {
        var e, t = $("#modal-cookies");
        t.length && (e = t, localStorage.getItem("modal_cookies") || e.modal("show"), t.on("hidden.bs.modal", function () {
            localStorage.setItem("modal_cookies", 1)
        }))
    }(),
    CopyType = function () {
        var e, t = ".btn-type-clipboard",
            a = $(t);
        a.length && ((e = a).tooltip().on("mouseleave", function () {
            e.tooltip("hide")
        }), new ClipboardJS(t).on("success", function (e) {
            $(e.trigger).attr("title", "Copied!").tooltip("_fixTitle").tooltip("show").attr("title", "Copy to clipboard").tooltip("_fixTitle"), e.clearSelection()
        }))
    }(),
    DarkMode = function () {
        var i = document.getElementById("btnSwitchMode"),
            s = document.getElementById("stylesheet"),
            e = {
                mode: localStorage.getItem("mode") ? localStorage.getItem("mode") : null
            };

        function t(e, t) {
            if (e) {
                var a, o = s.getAttribute("href").split("/"),
                    n = o[o.length - 1];
                a = "dark" == e ? "quick-website-dark.css" : "quick-website.css", a = s.getAttribute("href").replace(n, a), s.setAttribute("href", a), localStorage.setItem("mode", e), "dark" == e ? (i.classList.add("text-warning"), i.setAttribute("data-mode", "light")) : (i.classList.remove("text-warning"), i.setAttribute("data-mode", "dark")), document.getElementById("header-main") && function (e) {
                    var t, a = document.getElementById("header-main"),
                        o = document.getElementById("navbar-main"),
                        n = document.getElementById("navbar-logo"),
                        i = n.getAttribute("src").split("/"),
                        s = i[i.length - 1];
                    a.classList.contains("header-transparent") || (t = "dark" == e ? (o.classList.remove("navbar-light", "bg-white"), o.classList.add("navbar-dark", "bg-dark"), n.getAttribute("src").replace(s, "light.svg")) : (o.classList.remove("navbar-dark", "bg-dark"), o.classList.add("navbar-light", "bg-white"), n.getAttribute("src").replace(s, "dark.svg")), n.setAttribute("src", t))
                }(e), t && t()
            }
        }
        i && s && (window.addEventListener("load", function () {
            t(e.mode, function () {
                document.body.style.opacity = "1"
            })
        }), i.addEventListener("click", function () {
            var e = i.dataset.mode;
            document.body.style.opacity = "0", t(e, function () {
                document.body.style.opacity = "1"
            })
        }))
    }(),
    Demo = void $('[data-toggle="sweet-alert"]').on("click", function () {
        switch ($(this).data("sweet-alert")) {
            case "basic":
                Swal.fire({
                    title: "Here's a message!",
                    text: "A few words about this sweet alert ...",
                    buttonsStyling: !1,
                    confirmButtonClass: "btn btn-primary"
                });
                break;
            case "info":
            case "info":
                Swal.fire({
                    title: "Info",
                    text: "A few words about this sweet alert ...",
                    type: "info",
                    buttonsStyling: !1,
                    confirmButtonClass: "btn btn-info"
                });
                break;
            case "success":
                Swal.fire({
                    title: "Success",
                    text: "A few words about this sweet alert ...",
                    type: "success",
                    buttonsStyling: !1,
                    confirmButtonClass: "btn btn-success"
                });
                break;
            case "warning":
                Swal.fire({
                    title: "Warning",
                    text: "A few words about this sweet alert ...",
                    type: "warning",
                    buttonsStyling: !1,
                    confirmButtonClass: "btn btn-warning"
                });
                break;
            case "question":
                Swal.fire({
                    title: "Are you sure?",
                    text: "A few words about this sweet alert ...",
                    type: "question",
                    buttonsStyling: !1,
                    confirmButtonClass: "btn btn-dark"
                });
                break;
            case "confirm":
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    type: "warning",
                    showCancelButton: !0,
                    buttonsStyling: !1,
                    confirmButtonClass: "btn btn-danger",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonClass: "btn btn-secondary"
                }).then(function (e) {
                    e.value && Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        type: "success",
                        buttonsStyling: !1,
                        confirmButtonClass: "btn btn-primary"
                    })
                });
                break;
            case "image":
                Swal.fire({
                    title: "Sweet",
                    text: "Modal with a custom image ...",
                    imageUrl: "../../assets/img/prv/splash.png",
                    buttonsStyling: !1,
                    confirmButtonClass: "btn btn-primary",
                    confirmButtonText: "Super!"
                });
                break;
            case "timer":
                Swal.fire({
                    title: "Auto close alert!",
                    text: "I will close in 2 seconds.",
                    timer: 2e3,
                    showConfirmButton: !1
                })
        }
    }),
    Dropdown = function () {
        var e = $(".dropdown-animate"),
            t = $('.dropdown-submenu [data-toggle="dropdown"]');
        e.length && e.on({
            "hide.bs.dropdown": function (e) {
                ! function (e) {
                    var t = e.find(".dropdown-menu");
                    t.addClass("hide"), setTimeout(function () {
                        t.removeClass("hide")
                    }, 300)
                }($(this))
            }
        }), t.length && t.on("click", function () {
            return function (e) {
                e.next().hasClass("show") || e.parents(".dropdown-menu").first().find(".show").removeClass("show");
                var t = e.next(".dropdown-menu");
                t.toggleClass("show"), t.parent().toggleClass("show"), e.parents(".nav-item.dropdown.show").on("hidden.bs.dropdown", function () {
                    $(".dropdown-submenu .show").removeClass("show")
                })
            }($(this)), !1
        })
    }(),
    FormControl = function () {
        var e = $(".form-control"),
            t = $('[data-toggle="indeterminate"]');
        e.length && e.on("focus blur", function (e) {
            $(this).parents(".form-group").toggleClass("focused", "focus" === e.type)
        }).trigger("blur"), t.length && t.each(function () {
            $(this).prop("indeterminate", !0)
        })
    }(),
    CustomInputFile = function () {
        var e = $(".custom-input-file");
        e.length && e.each(function () {
            var t = $(this);
            t.on("change", function (e) {
                ! function (e, t, a) {
                    var o, n = e.next("label"),
                        i = n.html();
                    t && 1 < t.files.length ? o = (t.getAttribute("data-multiple-caption") || "").replace("{count}", t.files.length) : a.target.value && (o = a.target.value.split("\\").pop()), o ? n.find("span").html(o) : n.html(i)
                }(t, this, e)
            }), t.on("focus", function () {
                ! function (e) {
                    e.addClass("has-focus")
                }(t)
            }).on("blur", function () {
                ! function (e) {
                    e.removeClass("has-focus")
                }(t)
            })
        })
    }(),
    NavbarSticky = function () {
        var e = $(".navbar-sticky"),
            o = 0,
            t = !1;
        e.length && (o = e.offset().top, $(window).on({
            scroll: function () {
                t = !0, setInterval(function () {
                    t && (t = !1, function (e) {
                        var t = $(window).scrollTop(),
                            a = e.outerHeight();
                        o + 200 < t ? (e.addClass("sticky"), $("body").css("padding-top", a + "px")) : (e.removeClass("sticky"), $("body").css("padding-top", "0"))
                    }(e))
                }, 250)
            }
        }))
    }(),
    PasswordText = function () {
        var e = $('[data-toggle="password-text"]');
        e.length && e.on("click", function () {
            ! function (e) {
                var t = $(e.data("target"));
                "password" == t.attr("type") ? t.attr("type", "text") : t.attr("type", "password")
            }($(this))
        })
    }(),
    Pricing = function () {
        var e = $(".pricing-container"),
            t = $(".pricing-container button[data-pricing]");
        e.length && t.on({
            click: function () {
                ! function (e) {
                    e.data("pricing");
                    var t = e.parents(".pricing-container"),
                        a = $("." + t.attr("class") + " [data-pricing-value]");
                    e.hasClass("active") || ($("." + t.attr("class") + " button[data-pricing]").removeClass("active"), e.addClass("active"), a.each(function () {
                        var e = $(this).data("pricing-value"),
                            t = $(this).find("span.price").text();
                        $(this).find("span.price").text(e), $(this).data("pricing-value", t)
                    }))
                }($(this))
            }
        })
    }(),
    ScrollTo = function () {
        var e = $(".scroll-me, [data-scroll-to], .toc-entry a"),
            t = window.location.hash;
        e.length && e.on("click", function () {
            ! function (e) {
                var t = e.attr("href"),
                    a = e.data("scroll-to-offset") ? e.data("scroll-to-offset") : 0,
                    o = {
                        scrollTop: $(t).offset().top - a
                    };
                $("html, body").stop(!0, !0).animate(o, 300), event.preventDefault()
            }($(this))
        }), $(window).on("load", function () {
            t && "#!" != t && $(t).length && function (e) {
                $("html, body").animate({
                    scrollTop: $(e).offset().top
                }, "slow")
            }(t)
        })
    }(),
    GoogleMapCustom = function () {
        var i, s, r, l, e = document.getElementById("map-custom");
        void 0 !== e && null != e && google.maps.event.addDomListener(window, "load", function (e) {
            i = e.getAttribute("data-lat"), s = e.getAttribute("data-lng"), r = e.getAttribute("data-color"), l = e.getAttribute("data-zoom") ? parseInt(e.getAttribute("data-zoom")) : 12;
            var t = new google.maps.LatLng(i, s),
                a = {
                    zoom: l,
                    scrollwheel: !1,
                    center: t,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles: [{
                        featureType: "administrative",
                        elementType: "labels.text.fill",
                        stylers: [{
                            color: "#444444"
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "all",
                        stylers: [{
                            color: "#f2f2f2"
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "all",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "road",
                        elementType: "all",
                        stylers: [{
                            saturation: -100
                        }, {
                            lightness: 45
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "all",
                        stylers: [{
                            visibility: "simplified"
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit",
                        elementType: "all",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "water",
                        elementType: "all",
                        stylers: [{
                            color: r
                        }, {
                            visibility: "on"
                        }]
                    }]
                };
            e = new google.maps.Map(e, a);
            var o = new google.maps.Marker({
                    position: t,
                    map: e,
                    animation: google.maps.Animation.DROP,
                    title: "Hello World!"
                }),
                n = new google.maps.InfoWindow({
                    content: '<div class="info-window-content"><h5>Company Name</h5><p>Description comes here...</p></div>'
                });
            google.maps.event.addListener(o, "click", function () {
                n.open(e, o)
            })
        }(e))
    }(),
    GoogleMap = function () {
        var i, s, r, e = document.getElementById("map-default");
        void 0 !== e && null != e && google.maps.event.addDomListener(window, "load", function (e) {
            i = e.getAttribute("data-lat"), s = e.getAttribute("data-lng"), r = e.getAttribute("data-zoom") ? parseInt(e.getAttribute("data-zoom")) : 12;
            var t = new google.maps.LatLng(i, s),
                a = {
                    zoom: r,
                    scrollwheel: !1,
                    center: t,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
            e = new google.maps.Map(e, a);
            var o = new google.maps.Marker({
                    position: t,
                    map: e,
                    animation: google.maps.Animation.DROP,
                    title: "Hello World!"
                }),
                n = new google.maps.InfoWindow({
                    content: '<div class="info-window-content"><h2>{{ site.product.name }} {{ site.product.name_long }}</h2><p>{{ site.product.description }}</p></div>'
                });
            google.maps.event.addListener(o, "click", function () {
                n.open(e, o)
            })
        }(e))
    }(),
    TextareaAutosize = function () {
        var e = $('[data-toggle="autosize"]');
        e.length && autosize(e)
    }(),
    Countdown = function () {
        var e = $(".countdown");
        e.length && e.each(function () {
            ! function (e) {
                var t = e.data("countdown-date");
                e.countdown(t).on("update.countdown", function (e) {
                    $(this).html(e.strftime('<div class="countdown-item"><span class="countdown-digit">%-D</span><span class="countdown-label countdown-days">day%!D</span></div><div class="countdown-item"><span class="countdown-digit">%H</span><span class="countdown-separator">:</span><span class="countdown-label">hours</span></div><div class="countdown-item"><span class="countdown-digit">%M</span><span class="countdown-separator">:</span><span class="countdown-label">minutes</span></div><div class="countdown-item"><span class="countdown-digit">%S</span><span class="countdown-label">seconds</span></div>'))
                })
            }($(this))
        })
    }();
! function (c) {
    c.fn.countTo = function (d) {
        return d = d || {}, c(this).each(function () {
            var a = c.extend({}, c.fn.countTo.defaults, {
                    from: c(this).data("from"),
                    to: c(this).data("to"),
                    speed: c(this).data("speed"),
                    refreshInterval: c(this).data("refresh-interval"),
                    decimals: c(this).data("decimals")
                }, d),
                e = Math.ceil(a.speed / a.refreshInterval),
                t = (a.to - a.from) / e,
                o = this,
                n = c(this),
                i = 0,
                s = a.from,
                r = n.data("countTo") || {};

            function l(e) {
                var t = a.formatter.call(o, e, a);
                n.text(t)
            }
            n.data("countTo", r), r.interval && clearInterval(r.interval), r.interval = setInterval(function () {
                i++, l(s += t), "function" == typeof a.onUpdate && a.onUpdate.call(o, s), e <= i && (n.removeData("countTo"), clearInterval(r.interval), s = a.to, "function" == typeof a.onComplete && a.onComplete.call(o, s))
            }, a.refreshInterval), l(s)
        })
    }, c.fn.countTo.defaults = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: function (e, t) {
            return e.toFixed(t.decimals)
        },
        onUpdate: null,
        onComplete: null
    }
}(jQuery);
var Counter = function () {
        var e, t = ".counter",
            a = $(t);
        a.length && (e = a, inView(t).on("enter", function () {
            e.hasClass("counting-finished") || e.countTo({
                formatter: function (e, t) {
                    return e.toFixed(t.decimals)
                },
                onUpdate: function (e) {},
                onComplete: function (e) {
                    $(this).addClass("counting-finished")
                }
            })
        }))
    }(),
    Datepicker = function () {
        var e = $('[data-toggle="date"]'),
            t = $('[data-toggle="datetime"]'),
            a = $('[data-toggle="time"]');
        e.length && e.each(function () {
            ! function (e) {
                e.flatpickr({
                    enableTime: !1,
                    allowInput: !0
                })
            }($(this))
        }), t.length && t.each(function () {
            ! function (e) {
                e.flatpickr({
                    enableTime: !0,
                    allowInput: !0
                })
            }($(this))
        }), a.length && a.each(function () {
            ! function (e) {
                e.flatpickr({
                    noCalendar: !0,
                    enableTime: !0,
                    allowInput: !0
                })
            }($(this))
        })
    }(),
    Highlight = void $(".highlight").each(function (e, t) {
        ! function (e, t) {
            $(t).before('<button class="action-item btn-clipboard" title="Copy to clipboard"><i data-feather="copy"></i></button>'), $(".btn-clipboard").tooltip().on("mouseleave", function () {
                $(this).tooltip("hide")
            });
            var a = new ClipboardJS(".btn-clipboard", {
                target: function (e) {
                    return e.nextElementSibling
                }
            });
            a.on("success", function (e) {
                $(e.trigger).attr("title", "Copied!").tooltip("_fixTitle").tooltip("show").attr("title", "Copy to clipboard").tooltip("_fixTitle"), e.clearSelection()
            }), a.on("error", function (e) {
                var t = "Press " + (/Mac/i.test(navigator.userAgent) ? "⌘" : "Ctrl-") + "C to copy";
                $(e.trigger).attr("title", t).tooltip("_fixTitle").tooltip("show").attr("title", "Copy to clipboard").tooltip("_fixTitle")
            }), hljs.highlightBlock(t)
        }(0, t)
    }),
    Masonry = function () {
        var e = $(".masonry-container");
        e.length && e.each(function () {
            ! function (e) {
                var t = e.find(".masonry"),
                    o = e.find(".masonry-filter-menu"),
                    a = o.find(".active"),
                    n = a.data("filter"),
                    i = t.imagesLoaded(function () {
                        null != n && "" != n && ("*" != n && (n = "." + n), a.addClass("active"));
                        var e = {
                            itemSelector: ".masonry-item",
                            filter: n
                        };
                        i.isotope(e)
                    });
                o.on("click", "a", function (e) {
                    e.preventDefault();
                    var t = $(this),
                        a = $(this).attr("data-filter");
                    a = "*" == a ? "" : "." + a, i.isotope({
                        filter: a
                    }).on("arrangeComplete", function () {
                        o.find("[data-filter]").removeClass("active"), t.addClass("active")
                    })
                })
            }($(this))
        })
    }(),
    Notify = function () {
        var e = $('[data-toggle="notify"]');
        e.length && e.on("click", function (e) {
            e.preventDefault(),
                function (e, t, a, o, n, i) {
                    $.notify({
                        icon: a,
                        title: " Bootstrap Notify",
                        message: "Turning standard Bootstrap alerts into awesome notifications",
                        url: ""
                    }, {
                        element: "body",
                        type: o,
                        allow_dismiss: !0,
                        placement: {
                            from: e,
                            align: t
                        },
                        offset: {
                            x: 15,
                            y: 15
                        },
                        spacing: 10,
                        z_index: 1080,
                        delay: 2500,
                        timer: 25e3,
                        url_target: "_blank",
                        mouse_over: !1,
                        animate: {
                            enter: n,
                            exit: i
                        },
                        template: '<div class="alert alert-{0} alert-icon alert-group alert-notify" data-notify="container" role="alert"><div class="alert-group-prepend align-self-start"><span class="alert-group-icon"><i data-notify="icon"></i></span></div><div class="alert-content"><strong data-notify="title">{1}</strong><div data-notify="message">{2}</div></div><button type="button" class="close" data-notify="dismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
                    })
                }($(this).attr("data-placement"), $(this).attr("data-align"), $(this).attr("data-icon"), $(this).attr("data-type"), $(this).attr("data-animation-in"), $(this).attr("data-animation-out"))
        })
    }(),
    ProgressCircle = function () {
        var e = $(".progress-circle");
        e.length && e.each(function () {
            ! function (e) {
                var t = e.data().progress,
                    a = e.data().text ? e.data().text : "",
                    o = e.data().textclass ? e.data().textclass : "progressbar-text",
                    n = e.data().color ? e.data().color : "primary",
                    i = e.data().trailwidth ? e.data().trailwidth : 2,
                    s = e.data().shape ? e.data().shape : "circle",
                    r = {
                        color: PurposeStyle.colors.theme[n],
                        strokeWidth: 7,
                        trailWidth: i,
                        text: {
                            value: a,
                            className: o
                        },
                        svgStyle: {
                            display: "block"
                        },
                        duration: 1500,
                        easing: "easeInOut"
                    };
                if ("circle" == s) var l = new ProgressBar.Circle(e[0], r);
                else if ("semi-circle" == s) l = new ProgressBar.SemiCircle(e[0], r);
                l.animate(t / 100)
            }($(this))
        })
    }(),
    Select = function () {
        var e = $('[data-toggle="select"]');
        e.length && e.each(function () {
            ! function (e) {
                e.select2({})
            }($(this))
        })
    }(),
    Sticky = function () {
        var e = $('[data-toggle="sticky"]');
        $(window).on("load resize", function () {
            e.length && e.each(function () {
                ! function (e) {
                    var t = {
                        offset_top: e.data("sticky-offset") ? e.data("sticky-offset") : 0
                    };
                    1e3 < $(window).width() ? e.stick_in_parent(t) : e.trigger("sticky_kit:detach")
                }($(this))
            })
        })
    }(),
    WpxSwiper = function () {
        var e = $(".swiper-js-container");
        $(document).ready(function () {
            e.length && e.each(function (e, t) {
                ! function (e) {
                    var t = e.find(".swiper-container"),
                        a = e.find(".swiper-pagination"),
                        o = e.find(".swiper-button-next"),
                        n = e.find(".swiper-button-prev"),
                        i = t.data("swiper-effect") ? t.data("swiper-effect") : "slide",
                        s = t.data("swiper-direction") ? t.data("swiper-direction") : "horizontal",
                        r = t.data("swiper-initial-slide") ? t.data("swiper-initial-slide") : 0,
                        l = !!t.data("swiper-autoheight") && t.data("swiper-autoheight"),
                        d = !!t.data("swiper-autoplay") && t.data("swiper-autoplay"),
                        c = !!t.data("swiper-centered-slides") && t.data("swiper-centered-slides"),
                        p = t.data("swiper-pagination-type") ? t.data("swiper-pagination-type") : "bullets",
                        u = t.data("swiper-items"),
                        f = t.data("swiper-sm-items"),
                        g = t.data("swiper-md-items"),
                        m = t.data("swiper-lg-items"),
                        h = t.data("swiper-xl-items"),
                        y = t.data("swiper-space-between"),
                        v = t.data("swiper-sm-space-between"),
                        b = t.data("swiper-md-space-between"),
                        w = t.data("swiper-lg-space-between"),
                        $ = t.data("swiper-xl-space-between");
                    u = u || 1, f = f || u, g = g || f, m = m || g, h = h || m, y = y || 0, v = v || y, b = b || v, w = w || b, $ = $ || w, new Swiper(t, {
                        pagination: {
                            el: a,
                            clickable: !0,
                            type: p
                        },
                        navigation: {
                            nextEl: o,
                            prevEl: n
                        },
                        slidesPerView: u,
                        spaceBetween: y,
                        initialSlide: r,
                        autoHeight: l,
                        centeredSlides: c,
                        mousewheel: !1,
                        keyboard: {
                            enabled: !0,
                            onlyInViewport: !1
                        },
                        grabCursor: !0,
                        autoplay: d,
                        effect: i,
                        coverflowEffect: {
                            rotate: 0,
                            stretch: 0,
                            depth: 50,
                            modifier: 3,
                            slideShadows: !1
                        },
                        speed: 800,
                        direction: s,
                        preventClicks: !0,
                        preventClicksPropagation: !0,
                        observer: !0,
                        observeParents: !0,
                        breakpointsInverse: !0,
                        breakpoints: {
                            575: {
                                slidesPerView: f,
                                spaceBetween: v
                            },
                            767: {
                                slidesPerView: g,
                                spaceBetween: b
                            },
                            991: {
                                slidesPerView: m,
                                spaceBetween: w
                            },
                            1199: {
                                slidesPerView: h,
                                spaceBetween: $
                            }
                        }
                    })
                }($(t))
            })
        })
    }(),
    Tags = function () {
        var e = $('[data-toggle="tags"]');
        e.length && e.each(function () {
            ! function (e) {
                e.tagsinput({
                    tagClass: "badge badge-primary"
                })
            }($(this))
        })
    }(),
    Typed = function () {
        var e = $(".typed");
        e.length && e.each(function () {
            ! function (e) {
                var t = "#" + e.attr("id"),
                    a = (a = e.data("type-this")).split(","),
                    o = new Typed(t, {
                        strings: a,
                        typeSpeed: 100,
                        backSpeed: 70,
                        loop: !0
                    });
                inView(t).on("enter", function () {
                    o.start()
                }).on("exit", function () {
                    o.stop()
                })
            }($(this))
        })
    }(),
    ApexOrdersChart = function () {
        var a, e, t, o = document.querySelector("#apex-orders"),
            n = ($(".legend input"), [PurposeStyle.colors.theme.primary, PurposeStyle.colors.theme.warning]);
        if (o) return e = {
            chart: {
                type: "bar",
                stacked: !1,
                zoom: {
                    enabled: !1
                },
                toolbar: {
                    show: !1
                },
                shadow: {
                    enabled: !1
                },
                animations: {
                    enabled: !0,
                    easing: "easeinout",
                    speed: 800,
                    animateGradually: {
                        enabled: !0,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: !0,
                        speed: 350
                    }
                }
            },
            colors: n,
            plotOptions: {
                bar: {
                    columnWidth: "20%",
                    endingShape: "rounded"
                }
            },
            stroke: {
                width: 0,
                curve: "smooth"
            },
            series: [{
                name: "Delivered",
                type: "bar",
                data: [50, 30, 40, 60, 80, 100, 90, 90, 70, 90, 100]
            }, {
                name: "Rejected",
                type: "bar",
                data: [15, 20, 20, 15, 15, 30, 20, 15, 30, 20, 30]
            }],
            markers: {
                size: 0
            },
            xaxis: {
                axisBorder: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                },
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                labels: {
                    style: {
                        colors: PurposeStyle.colors.gray[500],
                        fontSize: "13px",
                        fontFamily: PurposeStyle.fonts.base,
                        cssClass: "apexcharts-xaxis-label"
                    }
                }
            },
            yaxis: {
                axisBorder: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                },
                labels: {
                    style: {
                        color: PurposeStyle.colors.gray[500],
                        fontSize: "13px",
                        fontFamily: PurposeStyle.fonts.base,
                        cssClass: "apexcharts-xaxis-label"
                    }
                }
            },
            legend: {
                show: !1
            },
            grid: {
                borderColor: PurposeStyle.colors.gray[200],
                strokeDashArray: 3
            },
            dataLabels: {
                enabled: !1
            },
            tooltip: {
                shared: !0,
                intersect: !1,
                y: {
                    formatter: function (e) {
                        return void 0 !== e ? e.toFixed(0) + " orders" : e
                    }
                }
            }
        }, t = o.dataset.height, e.colors = n, e.chart.height = t || 350, a = new ApexCharts(o, e), setTimeout(function () {
            a.render(),
                function () {
                    for (var e = document.querySelectorAll(".legend input[type='checkbox']"), t = 0; t < e.length; t++) e[t].checked || a.toggleSeries(e[t].value)
                }()
        }, 300), {
            toggleSeries: function (e) {
                a.toggleSeries(e.value)
            }
        }
    }(),
    ApexTasksChart = function () {
        var e, t, a, o = document.querySelector("#apex-tasks"),
            n = ($(".legend input"), [PurposeStyle.colors.theme.primary, PurposeStyle.colors.theme.warning]);
        o && (t = {
            chart: {
                type: "bar",
                stacked: !0,
                zoom: {
                    enabled: !1
                },
                toolbar: {
                    show: !1
                },
                shadow: {
                    enabled: !1
                },
                animations: {
                    enabled: !0,
                    easing: "easeinout",
                    speed: 800,
                    animateGradually: {
                        enabled: !0,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: !0,
                        speed: 350
                    }
                }
            },
            colors: n,
            plotOptions: {
                bar: {
                    columnWidth: "20%",
                    endingShape: "rounded"
                }
            },
            stroke: {
                width: 0,
                curve: "smooth"
            },
            series: [{
                name: "Finished",
                type: "bar",
                data: [50, 30, 40, 60, 80, 100, 90, 90, 70, 90, 100]
            }, {
                name: "Unfinished",
                type: "bar",
                data: [15, 20, 20, 15, 15, 30, 20, 15, 30, 20, 30]
            }],
            markers: {
                size: 0
            },
            xaxis: {
                axisBorder: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                },
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                labels: {
                    style: {
                        colors: PurposeStyle.colors.gray[500],
                        fontSize: "13px",
                        fontFamily: PurposeStyle.fonts.base,
                        cssClass: "apexcharts-xaxis-label"
                    }
                }
            },
            yaxis: {
                axisBorder: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                },
                labels: {
                    style: {
                        color: PurposeStyle.colors.gray[500],
                        fontSize: "13px",
                        fontFamily: PurposeStyle.fonts.base,
                        cssClass: "apexcharts-xaxis-label"
                    }
                }
            },
            legend: {
                show: !1
            },
            grid: {
                borderColor: PurposeStyle.colors.gray[200],
                strokeDashArray: 3
            },
            dataLabels: {
                enabled: !1
            },
            tooltip: {
                shared: !0,
                intersect: !1,
                y: {
                    formatter: function (e) {
                        return void 0 !== e ? e.toFixed(0) + " tasks" : e
                    }
                }
            }
        }, a = o.dataset.height, t.colors = n, t.chart.height = a || 350, e = new ApexCharts(o, t), setTimeout(function () {
            e.render()
        }, 300))
    }();
//# sourceMappingURL=quick-website.js.map