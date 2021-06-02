// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/daisyui/dist/resets/general.js":[function(require,module,exports) {
module.exports = {"html":{"WebkitTapHighlightColor":"transparent"}};
},{}],"js/sockets/sockjs.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* sockjs-client v1.0.2 | http://sockjs.org | MIT license */
!function (t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var e;
    "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.SockJS = t();
  }
}(function () {
  var t;
  return function e(t, n, r) {
    function i(s, a) {
      if (!n[s]) {
        if (!t[s]) {
          var u = "function" == typeof require && require;
          if (!a && u) return u(s, !0);
          if (o) return o(s, !0);
          var l = new Error("Cannot find module '" + s + "'");
          throw l.code = "MODULE_NOT_FOUND", l;
        }

        var c = n[s] = {
          exports: {}
        };
        t[s][0].call(c.exports, function (e) {
          var n = t[s][1][e];
          return i(n ? n : e);
        }, c, c.exports, e, t, n, r);
      }

      return n[s].exports;
    }

    for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) {
      i(r[s]);
    }

    return i;
  }({
    1: [function (t, e) {
      (function (n) {
        "use strict";

        var r = t("./transport-list");
        e.exports = t("./main")(r), "_sockjs_onload" in n && setTimeout(n._sockjs_onload, 1);
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "./main": 14,
      "./transport-list": 16
    }],
    2: [function (t, e) {
      "use strict";

      function n() {
        i.call(this), this.initEvent("close", !1, !1), this.wasClean = !1, this.code = 0, this.reason = "";
      }

      var r = t("inherits"),
          i = t("./event");
      r(n, i), e.exports = n;
    }, {
      "./event": 4,
      inherits: 54
    }],
    3: [function (t, e) {
      "use strict";

      function n() {
        i.call(this);
      }

      var r = t("inherits"),
          i = t("./eventtarget");
      r(n, i), n.prototype.removeAllListeners = function (t) {
        t ? delete this._listeners[t] : this._listeners = {};
      }, n.prototype.once = function (t, e) {
        function n() {
          r.removeListener(t, n), i || (i = !0, e.apply(this, arguments));
        }

        var r = this,
            i = !1;
        this.on(t, n);
      }, n.prototype.emit = function (t) {
        var e = this._listeners[t];
        if (e) for (var n = Array.prototype.slice.call(arguments, 1), r = 0; r < e.length; r++) {
          e[r].apply(this, n);
        }
      }, n.prototype.on = n.prototype.addListener = i.prototype.addEventListener, n.prototype.removeListener = i.prototype.removeEventListener, e.exports.EventEmitter = n;
    }, {
      "./eventtarget": 5,
      inherits: 54
    }],
    4: [function (t, e) {
      "use strict";

      function n(t) {
        this.type = t;
      }

      n.prototype.initEvent = function (t, e, n) {
        return this.type = t, this.bubbles = e, this.cancelable = n, this.timeStamp = +new Date(), this;
      }, n.prototype.stopPropagation = function () {}, n.prototype.preventDefault = function () {}, n.CAPTURING_PHASE = 1, n.AT_TARGET = 2, n.BUBBLING_PHASE = 3, e.exports = n;
    }, {}],
    5: [function (t, e) {
      "use strict";

      function n() {
        this._listeners = {};
      }

      n.prototype.addEventListener = function (t, e) {
        t in this._listeners || (this._listeners[t] = []);
        var n = this._listeners[t];
        -1 === n.indexOf(e) && (n = n.concat([e])), this._listeners[t] = n;
      }, n.prototype.removeEventListener = function (t, e) {
        var n = this._listeners[t];

        if (n) {
          var r = n.indexOf(e);
          return -1 !== r ? void (n.length > 1 ? this._listeners[t] = n.slice(0, r).concat(n.slice(r + 1)) : delete this._listeners[t]) : void 0;
        }
      }, n.prototype.dispatchEvent = function (t) {
        var e = t.type,
            n = Array.prototype.slice.call(arguments, 0);
        if (this["on" + e] && this["on" + e].apply(this, n), e in this._listeners) for (var r = this._listeners[e], i = 0; i < r.length; i++) {
          r[i].apply(this, n);
        }
      }, e.exports = n;
    }, {}],
    6: [function (t, e) {
      "use strict";

      function n(t) {
        i.call(this), this.initEvent("message", !1, !1), this.data = t;
      }

      var r = t("inherits"),
          i = t("./event");
      r(n, i), e.exports = n;
    }, {
      "./event": 4,
      inherits: 54
    }],
    7: [function (t, e) {
      "use strict";

      function n(t) {
        this._transport = t, t.on("message", this._transportMessage.bind(this)), t.on("close", this._transportClose.bind(this));
      }

      var r = t("json3"),
          i = t("./utils/iframe");
      n.prototype._transportClose = function (t, e) {
        i.postMessage("c", r.stringify([t, e]));
      }, n.prototype._transportMessage = function (t) {
        i.postMessage("t", t);
      }, n.prototype._send = function (t) {
        this._transport.send(t);
      }, n.prototype._close = function () {
        this._transport.close(), this._transport.removeAllListeners();
      }, e.exports = n;
    }, {
      "./utils/iframe": 47,
      json3: 55
    }],
    8: [function (t, e) {
      "use strict";

      var n = t("./utils/url"),
          r = t("./utils/event"),
          i = t("json3"),
          o = t("./facade"),
          s = t("./info-iframe-receiver"),
          a = t("./utils/iframe"),
          u = t("./location");

      e.exports = function (t, e) {
        var l = {};
        e.forEach(function (t) {
          t.facadeTransport && (l[t.facadeTransport.transportName] = t.facadeTransport);
        }), l[s.transportName] = s;
        var c;

        t.bootstrap_iframe = function () {
          var e;
          a.currentWindowId = u.hash.slice(1);

          var s = function s(r) {
            if (r.source === parent && ("undefined" == typeof c && (c = r.origin), r.origin === c)) {
              var s;

              try {
                s = i.parse(r.data);
              } catch (f) {
                return;
              }

              if (s.windowId === a.currentWindowId) switch (s.type) {
                case "s":
                  var h;

                  try {
                    h = i.parse(s.data);
                  } catch (f) {
                    break;
                  }

                  var d = h[0],
                      p = h[1],
                      v = h[2],
                      m = h[3];
                  if (d !== t.version) throw new Error('Incompatibile SockJS! Main site uses: "' + d + '", the iframe: "' + t.version + '".');
                  if (!n.isOriginEqual(v, u.href) || !n.isOriginEqual(m, u.href)) throw new Error("Can't connect to different domain from within an iframe. (" + u.href + ", " + v + ", " + m + ")");
                  e = new o(new l[p](v, m));
                  break;

                case "m":
                  e._send(s.data);

                  break;

                case "c":
                  e && e._close(), e = null;
              }
            }
          };

          r.attachEvent("message", s), a.postMessage("s");
        };
      };
    }, {
      "./facade": 7,
      "./info-iframe-receiver": 10,
      "./location": 13,
      "./utils/event": 46,
      "./utils/iframe": 47,
      "./utils/url": 52,
      debug: void 0,
      json3: 55
    }],
    9: [function (t, e) {
      "use strict";

      function n(t, e) {
        r.call(this);
        var n = this,
            i = +new Date();
        this.xo = new e("GET", t), this.xo.once("finish", function (t, e) {
          var r, a;

          if (200 === t) {
            if (a = +new Date() - i, e) try {
              r = o.parse(e);
            } catch (u) {}
            s.isObject(r) || (r = {});
          }

          n.emit("finish", r, a), n.removeAllListeners();
        });
      }

      var r = t("events").EventEmitter,
          i = t("inherits"),
          o = t("json3"),
          s = t("./utils/object");
      i(n, r), n.prototype.close = function () {
        this.removeAllListeners(), this.xo.close();
      }, e.exports = n;
    }, {
      "./utils/object": 49,
      debug: void 0,
      events: 3,
      inherits: 54,
      json3: 55
    }],
    10: [function (t, e) {
      "use strict";

      function n(t) {
        var e = this;
        i.call(this), this.ir = new a(t, s), this.ir.once("finish", function (t, n) {
          e.ir = null, e.emit("message", o.stringify([t, n]));
        });
      }

      var r = t("inherits"),
          i = t("events").EventEmitter,
          o = t("json3"),
          s = t("./transport/sender/xhr-local"),
          a = t("./info-ajax");
      r(n, i), n.transportName = "iframe-info-receiver", n.prototype.close = function () {
        this.ir && (this.ir.close(), this.ir = null), this.removeAllListeners();
      }, e.exports = n;
    }, {
      "./info-ajax": 9,
      "./transport/sender/xhr-local": 37,
      events: 3,
      inherits: 54,
      json3: 55
    }],
    11: [function (t, e) {
      (function (n) {
        "use strict";

        function r(t, e) {
          var r = this;
          i.call(this);

          var o = function o() {
            var n = r.ifr = new u(l.transportName, e, t);
            n.once("message", function (t) {
              if (t) {
                var e;

                try {
                  e = s.parse(t);
                } catch (n) {
                  return r.emit("finish"), void r.close();
                }

                var i = e[0],
                    o = e[1];
                r.emit("finish", i, o);
              }

              r.close();
            }), n.once("close", function () {
              r.emit("finish"), r.close();
            });
          };

          n.document.body ? o() : a.attachEvent("load", o);
        }

        var i = t("events").EventEmitter,
            o = t("inherits"),
            s = t("json3"),
            a = t("./utils/event"),
            u = t("./transport/iframe"),
            l = t("./info-iframe-receiver");
        o(r, i), r.enabled = function () {
          return u.enabled();
        }, r.prototype.close = function () {
          this.ifr && this.ifr.close(), this.removeAllListeners(), this.ifr = null;
        }, e.exports = r;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "./info-iframe-receiver": 10,
      "./transport/iframe": 22,
      "./utils/event": 46,
      debug: void 0,
      events: 3,
      inherits: 54,
      json3: 55
    }],
    12: [function (t, e) {
      "use strict";

      function n(t, e) {
        var n = this;
        r.call(this), setTimeout(function () {
          n.doXhr(t, e);
        }, 0);
      }

      var r = t("events").EventEmitter,
          i = t("inherits"),
          o = t("./utils/url"),
          s = t("./transport/sender/xdr"),
          a = t("./transport/sender/xhr-cors"),
          u = t("./transport/sender/xhr-local"),
          l = t("./transport/sender/xhr-fake"),
          c = t("./info-iframe"),
          f = t("./info-ajax");
      i(n, r), n._getReceiver = function (t, e, n) {
        return n.sameOrigin ? new f(e, u) : a.enabled ? new f(e, a) : s.enabled && n.sameScheme ? new f(e, s) : c.enabled() ? new c(t, e) : new f(e, l);
      }, n.prototype.doXhr = function (t, e) {
        var r = this,
            i = o.addPath(t, "/info");
        this.xo = n._getReceiver(t, i, e), this.timeoutRef = setTimeout(function () {
          r._cleanup(!1), r.emit("finish");
        }, n.timeout), this.xo.once("finish", function (t, e) {
          r._cleanup(!0), r.emit("finish", t, e);
        });
      }, n.prototype._cleanup = function (t) {
        clearTimeout(this.timeoutRef), this.timeoutRef = null, !t && this.xo && this.xo.close(), this.xo = null;
      }, n.prototype.close = function () {
        this.removeAllListeners(), this._cleanup(!1);
      }, n.timeout = 8e3, e.exports = n;
    }, {
      "./info-ajax": 9,
      "./info-iframe": 11,
      "./transport/sender/xdr": 34,
      "./transport/sender/xhr-cors": 35,
      "./transport/sender/xhr-fake": 36,
      "./transport/sender/xhr-local": 37,
      "./utils/url": 52,
      debug: void 0,
      events: 3,
      inherits: 54
    }],
    13: [function (t, e) {
      (function (t) {
        "use strict";

        e.exports = t.location || {
          origin: "http://localhost:80",
          protocol: "http",
          host: "localhost",
          port: 80,
          href: "http://localhost/",
          hash: ""
        };
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    14: [function (t, e) {
      (function (n) {
        "use strict";

        function r(t, e, n) {
          if (!(this instanceof r)) return new r(t, e, n);
          if (arguments.length < 1) throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
          b.call(this), this.readyState = r.CONNECTING, this.extensions = "", this.protocol = "", n = n || {}, n.protocols_whitelist && m.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead."), this._transportsWhitelist = n.transports;
          var i = n.sessionId || 8;
          if ("function" == typeof i) this._generateSessionId = i;else {
            if ("number" != typeof i) throw new TypeError("If sessionId is used in the options, it needs to be a number or a function.");

            this._generateSessionId = function () {
              return l.string(i);
            };
          }
          this._server = n.server || l.numberString(1e3);
          var o = new s(t);
          if (!o.host || !o.protocol) throw new SyntaxError("The URL '" + t + "' is invalid");
          if (o.hash) throw new SyntaxError("The URL must not contain a fragment");
          if ("http:" !== o.protocol && "https:" !== o.protocol) throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + o.protocol + "' is not allowed.");
          var a = "https:" === o.protocol;
          if ("https" === g.protocol && !a) throw new Error("SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS");
          e ? Array.isArray(e) || (e = [e]) : e = [];
          var u = e.sort();
          u.forEach(function (t, e) {
            if (!t) throw new SyntaxError("The protocols entry '" + t + "' is invalid.");
            if (e < u.length - 1 && t === u[e + 1]) throw new SyntaxError("The protocols entry '" + t + "' is duplicated.");
          });
          var c = f.getOrigin(g.href);
          this._origin = c ? c.toLowerCase() : null, o.set("pathname", o.pathname.replace(/\/+$/, "")), this.url = o.href, this._urlInfo = {
            nullOrigin: !v.hasDomain(),
            sameOrigin: f.isOriginEqual(this.url, g.href),
            sameScheme: f.isSchemeEqual(this.url, g.href)
          }, this._ir = new _(this.url, this._urlInfo), this._ir.once("finish", this._receiveInfo.bind(this));
        }

        function i(t) {
          return 1e3 === t || t >= 3e3 && 4999 >= t;
        }

        t("./shims");

        var o,
            s = t("url-parse"),
            a = t("inherits"),
            u = t("json3"),
            l = t("./utils/random"),
            c = t("./utils/escape"),
            f = t("./utils/url"),
            h = t("./utils/event"),
            d = t("./utils/transport"),
            p = t("./utils/object"),
            v = t("./utils/browser"),
            m = t("./utils/log"),
            y = t("./event/event"),
            b = t("./event/eventtarget"),
            g = t("./location"),
            w = t("./event/close"),
            x = t("./event/trans-message"),
            _ = t("./info-receiver");

        a(r, b), r.prototype.close = function (t, e) {
          if (t && !i(t)) throw new Error("InvalidAccessError: Invalid code");
          if (e && e.length > 123) throw new SyntaxError("reason argument has an invalid length");

          if (this.readyState !== r.CLOSING && this.readyState !== r.CLOSED) {
            var n = !0;

            this._close(t || 1e3, e || "Normal closure", n);
          }
        }, r.prototype.send = function (t) {
          if ("string" != typeof t && (t = "" + t), this.readyState === r.CONNECTING) throw new Error("InvalidStateError: The connection has not been established yet");
          this.readyState === r.OPEN && this._transport.send(c.quote(t));
        }, r.version = t("./version"), r.CONNECTING = 0, r.OPEN = 1, r.CLOSING = 2, r.CLOSED = 3, r.prototype._receiveInfo = function (t, e) {
          if (this._ir = null, !t) return void this._close(1002, "Cannot connect to server");
          this._rto = this.countRTO(e), this._transUrl = t.base_url ? t.base_url : this.url, t = p.extend(t, this._urlInfo);
          var n = o.filterToEnabled(this._transportsWhitelist, t);
          this._transports = n.main, this._connect();
        }, r.prototype._connect = function () {
          for (var t = this._transports.shift(); t; t = this._transports.shift()) {
            if (t.needBody && (!n.document.body || "undefined" != typeof n.document.readyState && "complete" !== n.document.readyState && "interactive" !== n.document.readyState)) return this._transports.unshift(t), void h.attachEvent("load", this._connect.bind(this));
            var e = this._rto * t.roundTrips || 5e3;
            this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), e);
            var r = f.addPath(this._transUrl, "/" + this._server + "/" + this._generateSessionId()),
                i = new t(r, this._transUrl);
            return i.on("message", this._transportMessage.bind(this)), i.once("close", this._transportClose.bind(this)), i.transportName = t.transportName, void (this._transport = i);
          }

          this._close(2e3, "All transports failed", !1);
        }, r.prototype._transportTimeout = function () {
          this.readyState === r.CONNECTING && this._transportClose(2007, "Transport timed out");
        }, r.prototype._transportMessage = function (t) {
          var e,
              n = this,
              r = t.slice(0, 1),
              i = t.slice(1);

          switch (r) {
            case "o":
              return void this._open();

            case "h":
              return void this.dispatchEvent(new y("heartbeat"));
          }

          if (i) try {
            e = u.parse(i);
          } catch (o) {}
          if ("undefined" != typeof e) switch (r) {
            case "a":
              Array.isArray(e) && e.forEach(function (t) {
                n.dispatchEvent(new x(t));
              });
              break;

            case "m":
              this.dispatchEvent(new x(e));
              break;

            case "c":
              Array.isArray(e) && 2 === e.length && this._close(e[0], e[1], !0);
          }
        }, r.prototype._transportClose = function (t, e) {
          return this._transport && (this._transport.removeAllListeners(), this._transport = null, this.transport = null), i(t) || 2e3 === t || this.readyState !== r.CONNECTING ? void this._close(t, e) : void this._connect();
        }, r.prototype._open = function () {
          this.readyState === r.CONNECTING ? (this._transportTimeoutId && (clearTimeout(this._transportTimeoutId), this._transportTimeoutId = null), this.readyState = r.OPEN, this.transport = this._transport.transportName, this.dispatchEvent(new y("open"))) : this._close(1006, "Server lost session");
        }, r.prototype._close = function (t, e, n) {
          var i = !1;
          if (this._ir && (i = !0, this._ir.close(), this._ir = null), this._transport && (this._transport.close(), this._transport = null, this.transport = null), this.readyState === r.CLOSED) throw new Error("InvalidStateError: SockJS has already been closed");
          this.readyState = r.CLOSING, setTimeout(function () {
            this.readyState = r.CLOSED, i && this.dispatchEvent(new y("error"));
            var o = new w("close");
            o.wasClean = n || !1, o.code = t || 1e3, o.reason = e, this.dispatchEvent(o), this.onmessage = this.onclose = this.onerror = null;
          }.bind(this), 0);
        }, r.prototype.countRTO = function (t) {
          return t > 100 ? 4 * t : 300 + t;
        }, e.exports = function (e) {
          return o = d(e), t("./iframe-bootstrap")(r, e), r;
        };
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "./event/close": 2,
      "./event/event": 4,
      "./event/eventtarget": 5,
      "./event/trans-message": 6,
      "./iframe-bootstrap": 8,
      "./info-receiver": 12,
      "./location": 13,
      "./shims": 15,
      "./utils/browser": 44,
      "./utils/escape": 45,
      "./utils/event": 46,
      "./utils/log": 48,
      "./utils/object": 49,
      "./utils/random": 50,
      "./utils/transport": 51,
      "./utils/url": 52,
      "./version": 53,
      debug: void 0,
      inherits: 54,
      json3: 55,
      "url-parse": 56
    }],
    15: [function () {
      "use strict";

      function t(t) {
        var e = +t;
        return e !== e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -(1 / 0) && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e;
      }

      function e(t) {
        return t >>> 0;
      }

      function n() {}

      var r,
          i = Array.prototype,
          o = Object.prototype,
          s = Function.prototype,
          a = String.prototype,
          u = i.slice,
          l = o.toString,
          c = function c(t) {
        return "[object Function]" === o.toString.call(t);
      },
          f = function f(t) {
        return "[object Array]" === l.call(t);
      },
          h = function h(t) {
        return "[object String]" === l.call(t);
      },
          d = Object.defineProperty && function () {
        try {
          return Object.defineProperty({}, "x", {}), !0;
        } catch (t) {
          return !1;
        }
      }();

      r = d ? function (t, e, n, r) {
        !r && e in t || Object.defineProperty(t, e, {
          configurable: !0,
          enumerable: !1,
          writable: !0,
          value: n
        });
      } : function (t, e, n, r) {
        !r && e in t || (t[e] = n);
      };

      var p = function p(t, e, n) {
        for (var i in e) {
          o.hasOwnProperty.call(e, i) && r(t, i, e[i], n);
        }
      },
          v = function v(t) {
        if (null == t) throw new TypeError("can't convert " + t + " to object");
        return Object(t);
      };

      p(s, {
        bind: function bind(t) {
          var e = this;
          if (!c(e)) throw new TypeError("Function.prototype.bind called on incompatible " + e);

          for (var r = u.call(arguments, 1), i = function i() {
            if (this instanceof l) {
              var n = e.apply(this, r.concat(u.call(arguments)));
              return Object(n) === n ? n : this;
            }

            return e.apply(t, r.concat(u.call(arguments)));
          }, o = Math.max(0, e.length - r.length), s = [], a = 0; o > a; a++) {
            s.push("$" + a);
          }

          var l = Function("binder", "return function (" + s.join(",") + "){ return binder.apply(this, arguments); }")(i);
          return e.prototype && (n.prototype = e.prototype, l.prototype = new n(), n.prototype = null), l;
        }
      }), p(Array, {
        isArray: f
      });

      var m = Object("a"),
          y = "a" !== m[0] || !(0 in m),
          b = function b(t) {
        var e = !0,
            n = !0;
        return t && (t.call("foo", function (t, n, r) {
          "object" != _typeof(r) && (e = !1);
        }), t.call([1], function () {
          n = "string" == typeof this;
        }, "x")), !!t && e && n;
      };

      p(i, {
        forEach: function forEach(t) {
          var e = v(this),
              n = y && h(this) ? this.split("") : e,
              r = arguments[1],
              i = -1,
              o = n.length >>> 0;
          if (!c(t)) throw new TypeError();

          for (; ++i < o;) {
            i in n && t.call(r, n[i], i, e);
          }
        }
      }, !b(i.forEach));
      var g = Array.prototype.indexOf && -1 !== [0, 1].indexOf(1, 2);
      p(i, {
        indexOf: function indexOf(e) {
          var n = y && h(this) ? this.split("") : v(this),
              r = n.length >>> 0;
          if (!r) return -1;
          var i = 0;

          for (arguments.length > 1 && (i = t(arguments[1])), i = i >= 0 ? i : Math.max(0, r + i); r > i; i++) {
            if (i in n && n[i] === e) return i;
          }

          return -1;
        }
      }, g);
      var w = a.split;
      2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? !function () {
        var t = void 0 === /()??/.exec("")[1];

        a.split = function (n, r) {
          var o = this;
          if (void 0 === n && 0 === r) return [];
          if ("[object RegExp]" !== l.call(n)) return w.call(this, n, r);
          var s,
              a,
              u,
              c,
              f = [],
              h = (n.ignoreCase ? "i" : "") + (n.multiline ? "m" : "") + (n.extended ? "x" : "") + (n.sticky ? "y" : ""),
              d = 0;

          for (n = new RegExp(n.source, h + "g"), o += "", t || (s = new RegExp("^" + n.source + "$(?!\\s)", h)), r = void 0 === r ? -1 >>> 0 : e(r); (a = n.exec(o)) && (u = a.index + a[0].length, !(u > d && (f.push(o.slice(d, a.index)), !t && a.length > 1 && a[0].replace(s, function () {
            for (var t = 1; t < arguments.length - 2; t++) {
              void 0 === arguments[t] && (a[t] = void 0);
            }
          }), a.length > 1 && a.index < o.length && i.push.apply(f, a.slice(1)), c = a[0].length, d = u, f.length >= r)));) {
            n.lastIndex === a.index && n.lastIndex++;
          }

          return d === o.length ? (c || !n.test("")) && f.push("") : f.push(o.slice(d)), f.length > r ? f.slice(0, r) : f;
        };
      }() : "0".split(void 0, 0).length && (a.split = function (t, e) {
        return void 0 === t && 0 === e ? [] : w.call(this, t, e);
      });
      var x = "\t\n\x0B\f\r \xC2\xA0\xE1\u0161\u20AC\xE1\xA0\u017D\xE2\u20AC\u20AC\xE2\u20AC\x81\xE2\u20AC\u201A\xE2\u20AC\u0192\xE2\u20AC\u201E\xE2\u20AC\u2026\xE2\u20AC\u2020\xE2\u20AC\u2021\xE2\u20AC\u02C6\xE2\u20AC\u2030\xE2\u20AC\u0160\xE2\u20AC\xAF\xE2\x81\u0178\xE3\u20AC\u20AC\u2028\u2029\xEF\xBB\xBF",
          _ = "â€‹",
          E = "[" + x + "]",
          j = new RegExp("^" + E + E + "*"),
          T = new RegExp(E + E + "*$"),
          S = a.trim && (x.trim() || !_.trim());
      p(a, {
        trim: function trim() {
          if (void 0 === this || null === this) throw new TypeError("can't convert " + this + " to object");
          return String(this).replace(j, "").replace(T, "");
        }
      }, S);
      var O = a.substr,
          C = "".substr && "b" !== "0b".substr(-1);
      p(a, {
        substr: function substr(t, e) {
          return O.call(this, 0 > t && (t = this.length + t) < 0 ? 0 : t, e);
        }
      }, C);
    }, {}],
    16: [function (t, e) {
      "use strict";

      e.exports = [t("./transport/websocket"), t("./transport/xhr-streaming"), t("./transport/xdr-streaming"), t("./transport/eventsource"), t("./transport/lib/iframe-wrap")(t("./transport/eventsource")), t("./transport/htmlfile"), t("./transport/lib/iframe-wrap")(t("./transport/htmlfile")), t("./transport/xhr-polling"), t("./transport/xdr-polling"), t("./transport/lib/iframe-wrap")(t("./transport/xhr-polling")), t("./transport/jsonp-polling")];
    }, {
      "./transport/eventsource": 20,
      "./transport/htmlfile": 21,
      "./transport/jsonp-polling": 23,
      "./transport/lib/iframe-wrap": 26,
      "./transport/websocket": 38,
      "./transport/xdr-polling": 39,
      "./transport/xdr-streaming": 40,
      "./transport/xhr-polling": 41,
      "./transport/xhr-streaming": 42
    }],
    17: [function (t, e) {
      (function (n) {
        "use strict";

        function r(t, e, n, r) {
          var o = this;
          i.call(this), setTimeout(function () {
            o._start(t, e, n, r);
          }, 0);
        }

        var i = t("events").EventEmitter,
            o = t("inherits"),
            s = t("../../utils/event"),
            a = t("../../utils/url"),
            u = n.XMLHttpRequest;
        o(r, i), r.prototype._start = function (t, e, n, i) {
          var o = this;

          try {
            this.xhr = new u();
          } catch (l) {}

          if (!this.xhr) return this.emit("finish", 0, "no xhr support"), void this._cleanup();
          e = a.addQuery(e, "t=" + +new Date()), this.unloadRef = s.unloadAdd(function () {
            o._cleanup(!0);
          });

          try {
            this.xhr.open(t, e, !0), this.timeout && "timeout" in this.xhr && (this.xhr.timeout = this.timeout, this.xhr.ontimeout = function () {
              o.emit("finish", 0, ""), o._cleanup(!1);
            });
          } catch (c) {
            return this.emit("finish", 0, ""), void this._cleanup(!1);
          }

          if (i && i.noCredentials || !r.supportsCORS || (this.xhr.withCredentials = "true"), i && i.headers) for (var f in i.headers) {
            this.xhr.setRequestHeader(f, i.headers[f]);
          }

          this.xhr.onreadystatechange = function () {
            if (o.xhr) {
              var t,
                  e,
                  n = o.xhr;

              switch (n.readyState) {
                case 3:
                  try {
                    e = n.status, t = n.responseText;
                  } catch (r) {}

                  1223 === e && (e = 204), 200 === e && t && t.length > 0 && o.emit("chunk", e, t);
                  break;

                case 4:
                  e = n.status, 1223 === e && (e = 204), (12005 === e || 12029 === e) && (e = 0), o.emit("finish", e, n.responseText), o._cleanup(!1);
              }
            }
          };

          try {
            o.xhr.send(n);
          } catch (c) {
            o.emit("finish", 0, ""), o._cleanup(!1);
          }
        }, r.prototype._cleanup = function (t) {
          if (this.xhr) {
            if (this.removeAllListeners(), s.unloadDel(this.unloadRef), this.xhr.onreadystatechange = function () {}, this.xhr.ontimeout && (this.xhr.ontimeout = null), t) try {
              this.xhr.abort();
            } catch (e) {}
            this.unloadRef = this.xhr = null;
          }
        }, r.prototype.close = function () {
          this._cleanup(!0);
        }, r.enabled = !!u;
        var l = ["Active"].concat("Object").join("X");
        !r.enabled && l in n && (u = function u() {
          try {
            return new n[l]("Microsoft.XMLHTTP");
          } catch (t) {
            return null;
          }
        }, r.enabled = !!new u());
        var c = !1;

        try {
          c = "withCredentials" in new u();
        } catch (f) {}

        r.supportsCORS = c, e.exports = r;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "../../utils/event": 46,
      "../../utils/url": 52,
      debug: void 0,
      events: 3,
      inherits: 54
    }],
    18: [function (t, e) {
      (function (t) {
        e.exports = t.EventSource;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    19: [function (t, e) {
      (function (t) {
        e.exports = t.WebSocket || t.MozWebSocket;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    20: [function (t, e) {
      "use strict";

      function n(t) {
        if (!n.enabled()) throw new Error("Transport created when disabled");
        i.call(this, t, "/eventsource", o, s);
      }

      var r = t("inherits"),
          i = t("./lib/ajax-based"),
          o = t("./receiver/eventsource"),
          s = t("./sender/xhr-cors"),
          a = t("eventsource");
      r(n, i), n.enabled = function () {
        return !!a;
      }, n.transportName = "eventsource", n.roundTrips = 2, e.exports = n;
    }, {
      "./lib/ajax-based": 24,
      "./receiver/eventsource": 29,
      "./sender/xhr-cors": 35,
      eventsource: 18,
      inherits: 54
    }],
    21: [function (t, e) {
      "use strict";

      function n(t) {
        if (!i.enabled) throw new Error("Transport created when disabled");
        s.call(this, t, "/htmlfile", i, o);
      }

      var r = t("inherits"),
          i = t("./receiver/htmlfile"),
          o = t("./sender/xhr-local"),
          s = t("./lib/ajax-based");
      r(n, s), n.enabled = function (t) {
        return i.enabled && t.sameOrigin;
      }, n.transportName = "htmlfile", n.roundTrips = 2, e.exports = n;
    }, {
      "./lib/ajax-based": 24,
      "./receiver/htmlfile": 30,
      "./sender/xhr-local": 37,
      inherits: 54
    }],
    22: [function (t, e) {
      "use strict";

      function n(t, e, r) {
        if (!n.enabled()) throw new Error("Transport created when disabled");
        o.call(this);
        var i = this;
        this.origin = a.getOrigin(r), this.baseUrl = r, this.transUrl = e, this.transport = t, this.windowId = c.string(8);
        var s = a.addPath(r, "/iframe.html") + "#" + this.windowId;
        this.iframeObj = u.createIframe(s, function (t) {
          i.emit("close", 1006, "Unable to load an iframe (" + t + ")"), i.close();
        }), this.onmessageCallback = this._message.bind(this), l.attachEvent("message", this.onmessageCallback);
      }

      var r = t("inherits"),
          i = t("json3"),
          o = t("events").EventEmitter,
          s = t("../version"),
          a = t("../utils/url"),
          u = t("../utils/iframe"),
          l = t("../utils/event"),
          c = t("../utils/random");
      r(n, o), n.prototype.close = function () {
        if (this.removeAllListeners(), this.iframeObj) {
          l.detachEvent("message", this.onmessageCallback);

          try {
            this.postMessage("c");
          } catch (t) {}

          this.iframeObj.cleanup(), this.iframeObj = null, this.onmessageCallback = this.iframeObj = null;
        }
      }, n.prototype._message = function (t) {
        if (a.isOriginEqual(t.origin, this.origin)) {
          var e;

          try {
            e = i.parse(t.data);
          } catch (n) {
            return;
          }

          if (e.windowId === this.windowId) switch (e.type) {
            case "s":
              this.iframeObj.loaded(), this.postMessage("s", i.stringify([s, this.transport, this.transUrl, this.baseUrl]));
              break;

            case "t":
              this.emit("message", e.data);
              break;

            case "c":
              var r;

              try {
                r = i.parse(e.data);
              } catch (n) {
                return;
              }

              this.emit("close", r[0], r[1]), this.close();
          }
        }
      }, n.prototype.postMessage = function (t, e) {
        this.iframeObj.post(i.stringify({
          windowId: this.windowId,
          type: t,
          data: e || ""
        }), this.origin);
      }, n.prototype.send = function (t) {
        this.postMessage("m", t);
      }, n.enabled = function () {
        return u.iframeEnabled;
      }, n.transportName = "iframe", n.roundTrips = 2, e.exports = n;
    }, {
      "../utils/event": 46,
      "../utils/iframe": 47,
      "../utils/random": 50,
      "../utils/url": 52,
      "../version": 53,
      debug: void 0,
      events: 3,
      inherits: 54,
      json3: 55
    }],
    23: [function (t, e) {
      (function (n) {
        "use strict";

        function r(t) {
          if (!r.enabled()) throw new Error("Transport created when disabled");
          o.call(this, t, "/jsonp", a, s);
        }

        var i = t("inherits"),
            o = t("./lib/sender-receiver"),
            s = t("./receiver/jsonp"),
            a = t("./sender/jsonp");
        i(r, o), r.enabled = function () {
          return !!n.document;
        }, r.transportName = "jsonp-polling", r.roundTrips = 1, r.needBody = !0, e.exports = r;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "./lib/sender-receiver": 28,
      "./receiver/jsonp": 31,
      "./sender/jsonp": 33,
      inherits: 54
    }],
    24: [function (t, e) {
      "use strict";

      function n(t) {
        return function (e, n, r) {
          var i = {};
          "string" == typeof n && (i.headers = {
            "Content-type": "text/plain"
          });
          var s = o.addPath(e, "/xhr_send"),
              a = new t("POST", s, n, i);
          return a.once("finish", function (t) {
            return a = null, 200 !== t && 204 !== t ? r(new Error("http status " + t)) : void r();
          }), function () {
            a.close(), a = null;
            var t = new Error("Aborted");
            t.code = 1e3, r(t);
          };
        };
      }

      function r(t, e, r, i) {
        s.call(this, t, e, n(i), r, i);
      }

      var i = t("inherits"),
          o = t("../../utils/url"),
          s = t("./sender-receiver");
      i(r, s), e.exports = r;
    }, {
      "../../utils/url": 52,
      "./sender-receiver": 28,
      debug: void 0,
      inherits: 54
    }],
    25: [function (t, e) {
      "use strict";

      function n(t, e) {
        i.call(this), this.sendBuffer = [], this.sender = e, this.url = t;
      }

      var r = t("inherits"),
          i = t("events").EventEmitter;
      r(n, i), n.prototype.send = function (t) {
        this.sendBuffer.push(t), this.sendStop || this.sendSchedule();
      }, n.prototype.sendScheduleWait = function () {
        var t,
            e = this;
        this.sendStop = function () {
          e.sendStop = null, clearTimeout(t);
        }, t = setTimeout(function () {
          e.sendStop = null, e.sendSchedule();
        }, 25);
      }, n.prototype.sendSchedule = function () {
        var t = this;

        if (this.sendBuffer.length > 0) {
          var e = "[" + this.sendBuffer.join(",") + "]";
          this.sendStop = this.sender(this.url, e, function (e) {
            t.sendStop = null, e ? (t.emit("close", e.code || 1006, "Sending error: " + e), t._cleanup()) : t.sendScheduleWait();
          }), this.sendBuffer = [];
        }
      }, n.prototype._cleanup = function () {
        this.removeAllListeners();
      }, n.prototype.stop = function () {
        this._cleanup(), this.sendStop && (this.sendStop(), this.sendStop = null);
      }, e.exports = n;
    }, {
      debug: void 0,
      events: 3,
      inherits: 54
    }],
    26: [function (t, e) {
      (function (n) {
        "use strict";

        var r = t("inherits"),
            i = t("../iframe"),
            o = t("../../utils/object");

        e.exports = function (t) {
          function e(e, n) {
            i.call(this, t.transportName, e, n);
          }

          return r(e, i), e.enabled = function (e, r) {
            if (!n.document) return !1;
            var s = o.extend({}, r);
            return s.sameOrigin = !0, t.enabled(s) && i.enabled();
          }, e.transportName = "iframe-" + t.transportName, e.needBody = !0, e.roundTrips = i.roundTrips + t.roundTrips - 1, e.facadeTransport = t, e;
        };
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "../../utils/object": 49,
      "../iframe": 22,
      inherits: 54
    }],
    27: [function (t, e) {
      "use strict";

      function n(t, e, n) {
        i.call(this), this.Receiver = t, this.receiveUrl = e, this.AjaxObject = n, this._scheduleReceiver();
      }

      var r = t("inherits"),
          i = t("events").EventEmitter;
      r(n, i), n.prototype._scheduleReceiver = function () {
        var t = this,
            e = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
        e.on("message", function (e) {
          t.emit("message", e);
        }), e.once("close", function (n, r) {
          t.poll = e = null, t.pollIsClosing || ("network" === r ? t._scheduleReceiver() : (t.emit("close", n || 1006, r), t.removeAllListeners()));
        });
      }, n.prototype.abort = function () {
        this.removeAllListeners(), this.pollIsClosing = !0, this.poll && this.poll.abort();
      }, e.exports = n;
    }, {
      debug: void 0,
      events: 3,
      inherits: 54
    }],
    28: [function (t, e) {
      "use strict";

      function n(t, e, n, r, a) {
        var u = i.addPath(t, e),
            l = this;
        o.call(this, t, n), this.poll = new s(r, u, a), this.poll.on("message", function (t) {
          l.emit("message", t);
        }), this.poll.once("close", function (t, e) {
          l.poll = null, l.emit("close", t, e), l.close();
        });
      }

      var r = t("inherits"),
          i = t("../../utils/url"),
          o = t("./buffered-sender"),
          s = t("./polling");
      r(n, o), n.prototype.close = function () {
        this.removeAllListeners(), this.poll && (this.poll.abort(), this.poll = null), this.stop();
      }, e.exports = n;
    }, {
      "../../utils/url": 52,
      "./buffered-sender": 25,
      "./polling": 27,
      debug: void 0,
      inherits: 54
    }],
    29: [function (t, e) {
      "use strict";

      function n(t) {
        i.call(this);
        var e = this,
            n = this.es = new o(t);
        n.onmessage = function (t) {
          e.emit("message", decodeURI(t.data));
        }, n.onerror = function (t) {
          var r = 2 !== n.readyState ? "network" : "permanent";
          e._cleanup(), e._close(r);
        };
      }

      var r = t("inherits"),
          i = t("events").EventEmitter,
          o = t("eventsource");
      r(n, i), n.prototype.abort = function () {
        this._cleanup(), this._close("user");
      }, n.prototype._cleanup = function () {
        var t = this.es;
        t && (t.onmessage = t.onerror = null, t.close(), this.es = null);
      }, n.prototype._close = function (t) {
        var e = this;
        setTimeout(function () {
          e.emit("close", null, t), e.removeAllListeners();
        }, 200);
      }, e.exports = n;
    }, {
      debug: void 0,
      events: 3,
      eventsource: 18,
      inherits: 54
    }],
    30: [function (t, e) {
      (function (n) {
        "use strict";

        function r(t) {
          a.call(this);
          var e = this;
          o.polluteGlobalNamespace(), this.id = "a" + u.string(6), t = s.addQuery(t, "c=" + decodeURIComponent(o.WPrefix + "." + this.id));
          var i = r.htmlfileEnabled ? o.createHtmlfile : o.createIframe;
          n[o.WPrefix][this.id] = {
            start: function start() {
              e.iframeObj.loaded();
            },
            message: function message(t) {
              e.emit("message", t);
            },
            stop: function stop() {
              e._cleanup(), e._close("network");
            }
          }, this.iframeObj = i(t, function () {
            e._cleanup(), e._close("permanent");
          });
        }

        var i = t("inherits"),
            o = t("../../utils/iframe"),
            s = t("../../utils/url"),
            a = t("events").EventEmitter,
            u = t("../../utils/random");
        i(r, a), r.prototype.abort = function () {
          this._cleanup(), this._close("user");
        }, r.prototype._cleanup = function () {
          this.iframeObj && (this.iframeObj.cleanup(), this.iframeObj = null), delete n[o.WPrefix][this.id];
        }, r.prototype._close = function (t) {
          this.emit("close", null, t), this.removeAllListeners();
        }, r.htmlfileEnabled = !1;
        var l = ["Active"].concat("Object").join("X");
        if (l in n) try {
          r.htmlfileEnabled = !!new n[l]("htmlfile");
        } catch (c) {}
        r.enabled = r.htmlfileEnabled || o.iframeEnabled, e.exports = r;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "../../utils/iframe": 47,
      "../../utils/random": 50,
      "../../utils/url": 52,
      debug: void 0,
      events: 3,
      inherits: 54
    }],
    31: [function (t, e) {
      (function (n) {
        "use strict";

        function r(t) {
          var e = this;
          l.call(this), i.polluteGlobalNamespace(), this.id = "a" + o.string(6);
          var s = a.addQuery(t, "c=" + encodeURIComponent(i.WPrefix + "." + this.id));
          n[i.WPrefix][this.id] = this._callback.bind(this), this._createScript(s), this.timeoutId = setTimeout(function () {
            e._abort(new Error("JSONP script loaded abnormally (timeout)"));
          }, r.timeout);
        }

        var i = t("../../utils/iframe"),
            o = t("../../utils/random"),
            s = t("../../utils/browser"),
            a = t("../../utils/url"),
            u = t("inherits"),
            l = t("events").EventEmitter;
        u(r, l), r.prototype.abort = function () {
          if (n[i.WPrefix][this.id]) {
            var t = new Error("JSONP user aborted read");
            t.code = 1e3, this._abort(t);
          }
        }, r.timeout = 35e3, r.scriptErrorTimeout = 1e3, r.prototype._callback = function (t) {
          this._cleanup(), this.aborting || (t && this.emit("message", t), this.emit("close", null, "network"), this.removeAllListeners());
        }, r.prototype._abort = function (t) {
          this._cleanup(), this.aborting = !0, this.emit("close", t.code, t.message), this.removeAllListeners();
        }, r.prototype._cleanup = function () {
          if (clearTimeout(this.timeoutId), this.script2 && (this.script2.parentNode.removeChild(this.script2), this.script2 = null), this.script) {
            var t = this.script;
            t.parentNode.removeChild(t), t.onreadystatechange = t.onerror = t.onload = t.onclick = null, this.script = null;
          }

          delete n[i.WPrefix][this.id];
        }, r.prototype._scriptError = function () {
          var t = this;
          this.errorTimer || (this.errorTimer = setTimeout(function () {
            t.loadedOkay || t._abort(new Error("JSONP script loaded abnormally (onerror)"));
          }, r.scriptErrorTimeout));
        }, r.prototype._createScript = function (t) {
          var e,
              r = this,
              i = this.script = n.document.createElement("script");
          if (i.id = "a" + o.string(8), i.src = t, i.type = "text/javascript", i.charset = "UTF-8", i.onerror = this._scriptError.bind(this), i.onload = function () {
            r._abort(new Error("JSONP script loaded abnormally (onload)"));
          }, i.onreadystatechange = function () {
            if (/loaded|closed/.test(i.readyState)) {
              if (i && i.htmlFor && i.onclick) {
                r.loadedOkay = !0;

                try {
                  i.onclick();
                } catch (t) {}
              }

              i && r._abort(new Error("JSONP script loaded abnormally (onreadystatechange)"));
            }
          }, "undefined" == typeof i.async && n.document.attachEvent) if (s.isOpera()) e = this.script2 = n.document.createElement("script"), e.text = "try{var a = document.getElementById('" + i.id + "'); if(a)a.onerror();}catch(x){};", i.async = e.async = !1;else {
            try {
              i.htmlFor = i.id, i.event = "onclick";
            } catch (a) {}

            i.async = !0;
          }
          "undefined" != typeof i.async && (i.async = !0);
          var u = n.document.getElementsByTagName("head")[0];
          u.insertBefore(i, u.firstChild), e && u.insertBefore(e, u.firstChild);
        }, e.exports = r;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "../../utils/browser": 44,
      "../../utils/iframe": 47,
      "../../utils/random": 50,
      "../../utils/url": 52,
      debug: void 0,
      events: 3,
      inherits: 54
    }],
    32: [function (t, e) {
      "use strict";

      function n(t, e) {
        i.call(this);
        var n = this;
        this.bufferPosition = 0, this.xo = new e("POST", t, null), this.xo.on("chunk", this._chunkHandler.bind(this)), this.xo.once("finish", function (t, e) {
          n._chunkHandler(t, e), n.xo = null;
          var r = 200 === t ? "network" : "permanent";
          n.emit("close", null, r), n._cleanup();
        });
      }

      var r = t("inherits"),
          i = t("events").EventEmitter;
      r(n, i), n.prototype._chunkHandler = function (t, e) {
        if (200 === t && e) for (var n = -1;; this.bufferPosition += n + 1) {
          var r = e.slice(this.bufferPosition);
          if (n = r.indexOf("\n"), -1 === n) break;
          var i = r.slice(0, n);
          i && this.emit("message", i);
        }
      }, n.prototype._cleanup = function () {
        this.removeAllListeners();
      }, n.prototype.abort = function () {
        this.xo && (this.xo.close(), this.emit("close", null, "user"), this.xo = null), this._cleanup();
      }, e.exports = n;
    }, {
      debug: void 0,
      events: 3,
      inherits: 54
    }],
    33: [function (t, e) {
      (function (n) {
        "use strict";

        function r(t) {
          try {
            return n.document.createElement('<iframe name="' + t + '">');
          } catch (e) {
            var r = n.document.createElement("iframe");
            return r.name = t, r;
          }
        }

        function i() {
          o = n.document.createElement("form"), o.style.display = "none", o.style.position = "absolute", o.method = "POST", o.enctype = "application/x-www-form-urlencoded", o.acceptCharset = "UTF-8", s = n.document.createElement("textarea"), s.name = "d", o.appendChild(s), n.document.body.appendChild(o);
        }

        var o,
            s,
            a = t("../../utils/random"),
            u = t("../../utils/url");

        e.exports = function (t, e, n) {
          o || i();
          var l = "a" + a.string(8);
          o.target = l, o.action = u.addQuery(u.addPath(t, "/jsonp_send"), "i=" + l);
          var c = r(l);
          c.id = l, c.style.display = "none", o.appendChild(c);

          try {
            s.value = e;
          } catch (f) {}

          o.submit();

          var h = function h(t) {
            c.onerror && (c.onreadystatechange = c.onerror = c.onload = null, setTimeout(function () {
              c.parentNode.removeChild(c), c = null;
            }, 500), s.value = "", n(t));
          };

          return c.onerror = function () {
            h();
          }, c.onload = function () {
            h();
          }, c.onreadystatechange = function (t) {
            "complete" === c.readyState && h();
          }, function () {
            h(new Error("Aborted"));
          };
        };
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "../../utils/random": 50,
      "../../utils/url": 52,
      debug: void 0
    }],
    34: [function (t, e) {
      (function (n) {
        "use strict";

        function r(t, e, n) {
          var r = this;
          i.call(this), setTimeout(function () {
            r._start(t, e, n);
          }, 0);
        }

        var i = t("events").EventEmitter,
            o = t("inherits"),
            s = t("../../utils/event"),
            a = t("../../utils/browser"),
            u = t("../../utils/url");
        o(r, i), r.prototype._start = function (t, e, r) {
          var i = this,
              o = new n.XDomainRequest();
          e = u.addQuery(e, "t=" + +new Date()), o.onerror = function () {
            i._error();
          }, o.ontimeout = function () {
            i._error();
          }, o.onprogress = function () {
            i.emit("chunk", 200, o.responseText);
          }, o.onload = function () {
            i.emit("finish", 200, o.responseText), i._cleanup(!1);
          }, this.xdr = o, this.unloadRef = s.unloadAdd(function () {
            i._cleanup(!0);
          });

          try {
            this.xdr.open(t, e), this.timeout && (this.xdr.timeout = this.timeout), this.xdr.send(r);
          } catch (a) {
            this._error();
          }
        }, r.prototype._error = function () {
          this.emit("finish", 0, ""), this._cleanup(!1);
        }, r.prototype._cleanup = function (t) {
          if (this.xdr) {
            if (this.removeAllListeners(), s.unloadDel(this.unloadRef), this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null, t) try {
              this.xdr.abort();
            } catch (e) {}
            this.unloadRef = this.xdr = null;
          }
        }, r.prototype.close = function () {
          this._cleanup(!0);
        }, r.enabled = !(!n.XDomainRequest || !a.hasDomain()), e.exports = r;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "../../utils/browser": 44,
      "../../utils/event": 46,
      "../../utils/url": 52,
      debug: void 0,
      events: 3,
      inherits: 54
    }],
    35: [function (t, e) {
      "use strict";

      function n(t, e, n, r) {
        i.call(this, t, e, n, r);
      }

      var r = t("inherits"),
          i = t("../driver/xhr");
      r(n, i), n.enabled = i.enabled && i.supportsCORS, e.exports = n;
    }, {
      "../driver/xhr": 17,
      inherits: 54
    }],
    36: [function (t, e) {
      "use strict";

      function n() {
        var t = this;
        r.call(this), this.to = setTimeout(function () {
          t.emit("finish", 200, "{}");
        }, n.timeout);
      }

      var r = t("events").EventEmitter,
          i = t("inherits");
      i(n, r), n.prototype.close = function () {
        clearTimeout(this.to);
      }, n.timeout = 2e3, e.exports = n;
    }, {
      events: 3,
      inherits: 54
    }],
    37: [function (t, e) {
      "use strict";

      function n(t, e, n) {
        i.call(this, t, e, n, {
          noCredentials: !0
        });
      }

      var r = t("inherits"),
          i = t("../driver/xhr");
      r(n, i), n.enabled = i.enabled, e.exports = n;
    }, {
      "../driver/xhr": 17,
      inherits: 54
    }],
    38: [function (t, e) {
      "use strict";

      function n(t) {
        if (!n.enabled()) throw new Error("Transport created when disabled");
        s.call(this);
        var e = this,
            o = i.addPath(t, "/websocket");
        o = "https" === o.slice(0, 5) ? "wss" + o.slice(5) : "ws" + o.slice(4), this.url = o, this.ws = new a(this.url), this.ws.onmessage = function (t) {
          e.emit("message", t.data);
        }, this.unloadRef = r.unloadAdd(function () {
          e.ws.close();
        }), this.ws.onclose = function (t) {
          e.emit("close", t.code, t.reason), e._cleanup();
        }, this.ws.onerror = function (t) {
          e.emit("close", 1006, "WebSocket connection broken"), e._cleanup();
        };
      }

      var r = t("../utils/event"),
          i = t("../utils/url"),
          o = t("inherits"),
          s = t("events").EventEmitter,
          a = t("./driver/websocket");
      o(n, s), n.prototype.send = function (t) {
        var e = "[" + t + "]";
        this.ws.send(e);
      }, n.prototype.close = function () {
        this.ws && this.ws.close(), this._cleanup();
      }, n.prototype._cleanup = function () {
        var t = this.ws;
        t && (t.onmessage = t.onclose = t.onerror = null), r.unloadDel(this.unloadRef), this.unloadRef = this.ws = null, this.removeAllListeners();
      }, n.enabled = function () {
        return !!a;
      }, n.transportName = "websocket", n.roundTrips = 2, e.exports = n;
    }, {
      "../utils/event": 46,
      "../utils/url": 52,
      "./driver/websocket": 19,
      debug: void 0,
      events: 3,
      inherits: 54
    }],
    39: [function (t, e) {
      "use strict";

      function n(t) {
        if (!a.enabled) throw new Error("Transport created when disabled");
        i.call(this, t, "/xhr", s, a);
      }

      var r = t("inherits"),
          i = t("./lib/ajax-based"),
          o = t("./xdr-streaming"),
          s = t("./receiver/xhr"),
          a = t("./sender/xdr");
      r(n, i), n.enabled = o.enabled, n.transportName = "xdr-polling", n.roundTrips = 2, e.exports = n;
    }, {
      "./lib/ajax-based": 24,
      "./receiver/xhr": 32,
      "./sender/xdr": 34,
      "./xdr-streaming": 40,
      inherits: 54
    }],
    40: [function (t, e) {
      "use strict";

      function n(t) {
        if (!s.enabled) throw new Error("Transport created when disabled");
        i.call(this, t, "/xhr_streaming", o, s);
      }

      var r = t("inherits"),
          i = t("./lib/ajax-based"),
          o = t("./receiver/xhr"),
          s = t("./sender/xdr");
      r(n, i), n.enabled = function (t) {
        return t.cookie_needed || t.nullOrigin ? !1 : s.enabled && t.sameScheme;
      }, n.transportName = "xdr-streaming", n.roundTrips = 2, e.exports = n;
    }, {
      "./lib/ajax-based": 24,
      "./receiver/xhr": 32,
      "./sender/xdr": 34,
      inherits: 54
    }],
    41: [function (t, e) {
      "use strict";

      function n(t) {
        if (!a.enabled && !s.enabled) throw new Error("Transport created when disabled");
        i.call(this, t, "/xhr", o, s);
      }

      var r = t("inherits"),
          i = t("./lib/ajax-based"),
          o = t("./receiver/xhr"),
          s = t("./sender/xhr-cors"),
          a = t("./sender/xhr-local");
      r(n, i), n.enabled = function (t) {
        return t.nullOrigin ? !1 : a.enabled && t.sameOrigin ? !0 : s.enabled;
      }, n.transportName = "xhr-polling", n.roundTrips = 2, e.exports = n;
    }, {
      "./lib/ajax-based": 24,
      "./receiver/xhr": 32,
      "./sender/xhr-cors": 35,
      "./sender/xhr-local": 37,
      inherits: 54
    }],
    42: [function (t, e) {
      (function (n) {
        "use strict";

        function r(t) {
          if (!u.enabled && !a.enabled) throw new Error("Transport created when disabled");
          o.call(this, t, "/xhr_streaming", s, a);
        }

        var i = t("inherits"),
            o = t("./lib/ajax-based"),
            s = t("./receiver/xhr"),
            a = t("./sender/xhr-cors"),
            u = t("./sender/xhr-local"),
            l = t("../utils/browser");
        i(r, o), r.enabled = function (t) {
          return t.nullOrigin ? !1 : l.isOpera() ? !1 : a.enabled;
        }, r.transportName = "xhr-streaming", r.roundTrips = 2, r.needBody = !!n.document, e.exports = r;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "../utils/browser": 44,
      "./lib/ajax-based": 24,
      "./receiver/xhr": 32,
      "./sender/xhr-cors": 35,
      "./sender/xhr-local": 37,
      inherits: 54
    }],
    43: [function (t, e) {
      (function (t) {
        "use strict";

        e.exports.randomBytes = t.crypto && t.crypto.getRandomValues ? function (e) {
          var n = new Uint8Array(e);
          return t.crypto.getRandomValues(n), n;
        } : function (t) {
          for (var e = new Array(t), n = 0; t > n; n++) {
            e[n] = Math.floor(256 * Math.random());
          }

          return e;
        };
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    44: [function (t, e) {
      (function (t) {
        "use strict";

        e.exports = {
          isOpera: function isOpera() {
            return t.navigator && /opera/i.test(t.navigator.userAgent);
          },
          isKonqueror: function isKonqueror() {
            return t.navigator && /konqueror/i.test(t.navigator.userAgent);
          },
          hasDomain: function hasDomain() {
            if (!t.document) return !0;

            try {
              return !!t.document.domain;
            } catch (e) {
              return !1;
            }
          }
        };
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    45: [function (t, e) {
      "use strict";

      var n,
          r = t("json3"),
          i = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
          o = function o(t) {
        var e,
            n = {},
            r = [];

        for (e = 0; 65536 > e; e++) {
          r.push(String.fromCharCode(e));
        }

        return t.lastIndex = 0, r.join("").replace(t, function (t) {
          return n[t] = "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4), "";
        }), t.lastIndex = 0, n;
      };

      e.exports = {
        quote: function quote(t) {
          var e = r.stringify(t);
          return i.lastIndex = 0, i.test(e) ? (n || (n = o(i)), e.replace(i, function (t) {
            return n[t];
          })) : e;
        }
      };
    }, {
      json3: 55
    }],
    46: [function (t, e) {
      (function (n) {
        "use strict";

        var r = t("./random"),
            i = {},
            o = !1,
            s = n.chrome && n.chrome.app && n.chrome.app.runtime;
        e.exports = {
          attachEvent: function attachEvent(t, e) {
            "undefined" != typeof n.addEventListener ? n.addEventListener(t, e, !1) : n.document && n.attachEvent && (n.document.attachEvent("on" + t, e), n.attachEvent("on" + t, e));
          },
          detachEvent: function detachEvent(t, e) {
            "undefined" != typeof n.addEventListener ? n.removeEventListener(t, e, !1) : n.document && n.detachEvent && (n.document.detachEvent("on" + t, e), n.detachEvent("on" + t, e));
          },
          unloadAdd: function unloadAdd(t) {
            if (s) return null;
            var e = r.string(8);
            return i[e] = t, o && setTimeout(this.triggerUnloadCallbacks, 0), e;
          },
          unloadDel: function unloadDel(t) {
            t in i && delete i[t];
          },
          triggerUnloadCallbacks: function triggerUnloadCallbacks() {
            for (var t in i) {
              i[t](), delete i[t];
            }
          }
        };

        var a = function a() {
          o || (o = !0, e.exports.triggerUnloadCallbacks());
        };

        s || e.exports.attachEvent("unload", a);
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "./random": 50
    }],
    47: [function (t, e) {
      (function (n) {
        "use strict";

        var r = t("./event"),
            i = t("json3"),
            o = t("./browser");
        e.exports = {
          WPrefix: "_jp",
          currentWindowId: null,
          polluteGlobalNamespace: function polluteGlobalNamespace() {
            e.exports.WPrefix in n || (n[e.exports.WPrefix] = {});
          },
          postMessage: function postMessage(t, r) {
            n.parent !== n && n.parent.postMessage(i.stringify({
              windowId: e.exports.currentWindowId,
              type: t,
              data: r || ""
            }), "*");
          },
          createIframe: function createIframe(t, e) {
            var i,
                o,
                s = n.document.createElement("iframe"),
                a = function a() {
              clearTimeout(i);

              try {
                s.onload = null;
              } catch (t) {}

              s.onerror = null;
            },
                u = function u() {
              s && (a(), setTimeout(function () {
                s && s.parentNode.removeChild(s), s = null;
              }, 0), r.unloadDel(o));
            },
                l = function l(t) {
              s && (u(), e(t));
            },
                c = function c(t, e) {
              try {
                setTimeout(function () {
                  s && s.contentWindow && s.contentWindow.postMessage(t, e);
                }, 0);
              } catch (n) {}
            };

            return s.src = t, s.style.display = "none", s.style.position = "absolute", s.onerror = function () {
              l("onerror");
            }, s.onload = function () {
              clearTimeout(i), i = setTimeout(function () {
                l("onload timeout");
              }, 2e3);
            }, n.document.body.appendChild(s), i = setTimeout(function () {
              l("timeout");
            }, 15e3), o = r.unloadAdd(u), {
              post: c,
              cleanup: u,
              loaded: a
            };
          },
          createHtmlfile: function createHtmlfile(t, i) {
            var o,
                s,
                a,
                u = ["Active"].concat("Object").join("X"),
                l = new n[u]("htmlfile"),
                c = function c() {
              clearTimeout(o), a.onerror = null;
            },
                f = function f() {
              l && (c(), r.unloadDel(s), a.parentNode.removeChild(a), a = l = null, CollectGarbage());
            },
                h = function h(t) {
              l && (f(), i(t));
            },
                d = function d(t, e) {
              try {
                setTimeout(function () {
                  a && a.contentWindow && a.contentWindow.postMessage(t, e);
                }, 0);
              } catch (n) {}
            };

            l.open(), l.write('<html><script>document.domain="' + n.document.domain + '";</script></html>'), l.close(), l.parentWindow[e.exports.WPrefix] = n[e.exports.WPrefix];
            var p = l.createElement("div");
            return l.body.appendChild(p), a = l.createElement("iframe"), p.appendChild(a), a.src = t, a.onerror = function () {
              h("onerror");
            }, o = setTimeout(function () {
              h("timeout");
            }, 15e3), s = r.unloadAdd(f), {
              post: d,
              cleanup: f,
              loaded: c
            };
          }
        }, e.exports.iframeEnabled = !1, n.document && (e.exports.iframeEnabled = ("function" == typeof n.postMessage || "object" == _typeof(n.postMessage)) && !o.isKonqueror());
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "./browser": 44,
      "./event": 46,
      debug: void 0,
      json3: 55
    }],
    48: [function (t, e) {
      (function (t) {
        "use strict";

        var n = {};
        ["log", "debug", "warn"].forEach(function (e) {
          var r = t.console && t.console[e] && t.console[e].apply;
          n[e] = r ? function () {
            return t.console[e].apply(t.console, arguments);
          } : "log" === e ? function () {} : n.log;
        }), e.exports = n;
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    49: [function (t, e) {
      "use strict";

      e.exports = {
        isObject: function isObject(t) {
          var e = _typeof(t);

          return "function" === e || "object" === e && !!t;
        },
        extend: function extend(t) {
          if (!this.isObject(t)) return t;

          for (var e, n, r = 1, i = arguments.length; i > r; r++) {
            e = arguments[r];

            for (n in e) {
              Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            }
          }

          return t;
        }
      };
    }, {}],
    50: [function (t, e) {
      "use strict";

      var n = t("crypto"),
          r = "abcdefghijklmnopqrstuvwxyz012345";
      e.exports = {
        string: function string(t) {
          for (var e = r.length, i = n.randomBytes(t), o = [], s = 0; t > s; s++) {
            o.push(r.substr(i[s] % e, 1));
          }

          return o.join("");
        },
        number: function number(t) {
          return Math.floor(Math.random() * t);
        },
        numberString: function numberString(t) {
          var e = ("" + (t - 1)).length,
              n = new Array(e + 1).join("0");
          return (n + this.number(t)).slice(-e);
        }
      };
    }, {
      crypto: 43
    }],
    51: [function (t, e) {
      "use strict";

      e.exports = function (t) {
        return {
          filterToEnabled: function filterToEnabled(e, n) {
            var r = {
              main: [],
              facade: []
            };
            return e ? "string" == typeof e && (e = [e]) : e = [], t.forEach(function (t) {
              t && ("websocket" !== t.transportName || n.websocket !== !1) && (e.length && -1 === e.indexOf(t.transportName) || t.enabled(n) && (r.main.push(t), t.facadeTransport && r.facade.push(t.facadeTransport)));
            }), r;
          }
        };
      };
    }, {
      debug: void 0
    }],
    52: [function (t, e) {
      "use strict";

      var n = t("url-parse");
      e.exports = {
        getOrigin: function getOrigin(t) {
          if (!t) return null;
          var e = new n(t);
          if ("file:" === e.protocol) return null;
          var r = e.port;
          return r || (r = "https:" === e.protocol ? "443" : "80"), e.protocol + "//" + e.hostname + ":" + r;
        },
        isOriginEqual: function isOriginEqual(t, e) {
          var n = this.getOrigin(t) === this.getOrigin(e);
          return n;
        },
        isSchemeEqual: function isSchemeEqual(t, e) {
          return t.split(":")[0] === e.split(":")[0];
        },
        addPath: function addPath(t, e) {
          var n = t.split("?");
          return n[0] + e + (n[1] ? "?" + n[1] : "");
        },
        addQuery: function addQuery(t, e) {
          return t + (-1 === t.indexOf("?") ? "?" + e : "&" + e);
        }
      };
    }, {
      debug: void 0,
      "url-parse": 56
    }],
    53: [function (t, e) {
      e.exports = "1.0.2";
    }, {}],
    54: [function (t, e) {
      e.exports = "function" == typeof Object.create ? function (t, e) {
        t.super_ = e, t.prototype = Object.create(e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        });
      } : function (t, e) {
        t.super_ = e;

        var n = function n() {};

        n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
      };
    }, {}],
    55: [function (e, n, r) {
      (function (e) {
        (function () {
          function i(t, e) {
            function n(t) {
              if (n[t] !== m) return n[t];
              var i;
              if ("bug-string-char-index" == t) i = "a" != "a"[0];else if ("json" == t) i = n("json-stringify") && n("json-parse");else {
                var s,
                    a = "{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}";

                if ("json-stringify" == t) {
                  var u = e.stringify,
                      c = "function" == typeof u && g;

                  if (c) {
                    (s = function s() {
                      return 1;
                    }).toJSON = s;

                    try {
                      c = "0" === u(0) && "0" === u(new r()) && '""' == u(new o()) && u(b) === m && u(m) === m && u() === m && "1" === u(s) && "[1]" == u([s]) && "[null]" == u([m]) && "null" == u(null) && "[null,null,null]" == u([m, b, null]) && u({
                        a: [s, !0, !1, null, "\x00\b\n\f\r	"]
                      }) == a && "1" === u(null, s) && "[\n 1,\n 2\n]" == u([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == u(new l(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == u(new l(864e13)) && '"-000001-01-01T00:00:00.000Z"' == u(new l(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == u(new l(-1));
                    } catch (f) {
                      c = !1;
                    }
                  }

                  i = c;
                }

                if ("json-parse" == t) {
                  var h = e.parse;
                  if ("function" == typeof h) try {
                    if (0 === h("0") && !h(!1)) {
                      s = h(a);
                      var d = 5 == s.a.length && 1 === s.a[0];

                      if (d) {
                        try {
                          d = !h('"	"');
                        } catch (f) {}

                        if (d) try {
                          d = 1 !== h("01");
                        } catch (f) {}
                        if (d) try {
                          d = 1 !== h("1.");
                        } catch (f) {}
                      }
                    }
                  } catch (f) {
                    d = !1;
                  }
                  i = d;
                }
              }
              return n[t] = !!i;
            }

            t || (t = u.Object()), e || (e = u.Object());
            var r = t.Number || u.Number,
                o = t.String || u.String,
                a = t.Object || u.Object,
                l = t.Date || u.Date,
                c = t.SyntaxError || u.SyntaxError,
                f = t.TypeError || u.TypeError,
                h = t.Math || u.Math,
                d = t.JSON || u.JSON;
            "object" == _typeof(d) && d && (e.stringify = d.stringify, e.parse = d.parse);

            var _p,
                _v,
                m,
                y = a.prototype,
                b = y.toString,
                g = new l(-0xc782b5b800cec);

            try {
              g = -109252 == g.getUTCFullYear() && 0 === g.getUTCMonth() && 1 === g.getUTCDate() && 10 == g.getUTCHours() && 37 == g.getUTCMinutes() && 6 == g.getUTCSeconds() && 708 == g.getUTCMilliseconds();
            } catch (w) {}

            if (!n("json")) {
              var x = "[object Function]",
                  _ = "[object Date]",
                  E = "[object Number]",
                  j = "[object String]",
                  T = "[object Array]",
                  S = "[object Boolean]",
                  O = n("bug-string-char-index");
              if (!g) var C = h.floor,
                  A = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                  N = function N(t, e) {
                return A[e] + 365 * (t - 1970) + C((t - 1969 + (e = +(e > 1))) / 4) - C((t - 1901 + e) / 100) + C((t - 1601 + e) / 400);
              };

              if ((_p = y.hasOwnProperty) || (_p = function p(t) {
                var e,
                    n = {};
                return (n.__proto__ = null, n.__proto__ = {
                  toString: 1
                }, n).toString != b ? _p = function p(t) {
                  var e = this.__proto__,
                      n = (t in (this.__proto__ = null, this));
                  return this.__proto__ = e, n;
                } : (e = n.constructor, _p = function p(t) {
                  var n = (this.constructor || e).prototype;
                  return t in this && !(t in n && this[t] === n[t]);
                }), n = null, _p.call(this, t);
              }), _v = function v(t, e) {
                var n,
                    r,
                    i,
                    o = 0;
                (n = function n() {
                  this.valueOf = 0;
                }).prototype.valueOf = 0, r = new n();

                for (i in r) {
                  _p.call(r, i) && o++;
                }

                return n = r = null, o ? _v = 2 == o ? function (t, e) {
                  var n,
                      r = {},
                      i = b.call(t) == x;

                  for (n in t) {
                    i && "prototype" == n || _p.call(r, n) || !(r[n] = 1) || !_p.call(t, n) || e(n);
                  }
                } : function (t, e) {
                  var n,
                      r,
                      i = b.call(t) == x;

                  for (n in t) {
                    i && "prototype" == n || !_p.call(t, n) || (r = "constructor" === n) || e(n);
                  }

                  (r || _p.call(t, n = "constructor")) && e(n);
                } : (r = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], _v = function v(t, e) {
                  var n,
                      i,
                      o = b.call(t) == x,
                      a = !o && "function" != typeof t.constructor && s[_typeof(t.hasOwnProperty)] && t.hasOwnProperty || _p;

                  for (n in t) {
                    o && "prototype" == n || !a.call(t, n) || e(n);
                  }

                  for (i = r.length; n = r[--i]; a.call(t, n) && e(n)) {
                    ;
                  }
                }), _v(t, e);
              }, !n("json-stringify")) {
                var k = {
                  92: "\\\\",
                  34: '\\"',
                  8: "\\b",
                  12: "\\f",
                  10: "\\n",
                  13: "\\r",
                  9: "\\t"
                },
                    I = "000000",
                    P = function P(t, e) {
                  return (I + (e || 0)).slice(-t);
                },
                    L = "\\u00",
                    R = function R(t) {
                  for (var e = '"', n = 0, r = t.length, i = !O || r > 10, o = i && (O ? t.split("") : t); r > n; n++) {
                    var s = t.charCodeAt(n);

                    switch (s) {
                      case 8:
                      case 9:
                      case 10:
                      case 12:
                      case 13:
                      case 34:
                      case 92:
                        e += k[s];
                        break;

                      default:
                        if (32 > s) {
                          e += L + P(2, s.toString(16));
                          break;
                        }

                        e += i ? o[n] : t.charAt(n);
                    }
                  }

                  return e + '"';
                },
                    U = function U(t, e, n, r, i, o, s) {
                  var a, u, l, c, h, d, y, g, w, x, O, A, k, I, L, M;

                  try {
                    a = e[t];
                  } catch (q) {}

                  if ("object" == _typeof(a) && a) if (u = b.call(a), u != _ || _p.call(a, "toJSON")) "function" == typeof a.toJSON && (u != E && u != j && u != T || _p.call(a, "toJSON")) && (a = a.toJSON(t));else if (a > -1 / 0 && 1 / 0 > a) {
                    if (N) {
                      for (h = C(a / 864e5), l = C(h / 365.2425) + 1970 - 1; N(l + 1, 0) <= h; l++) {
                        ;
                      }

                      for (c = C((h - N(l, 0)) / 30.42); N(l, c + 1) <= h; c++) {
                        ;
                      }

                      h = 1 + h - N(l, c), d = (a % 864e5 + 864e5) % 864e5, y = C(d / 36e5) % 24, g = C(d / 6e4) % 60, w = C(d / 1e3) % 60, x = d % 1e3;
                    } else l = a.getUTCFullYear(), c = a.getUTCMonth(), h = a.getUTCDate(), y = a.getUTCHours(), g = a.getUTCMinutes(), w = a.getUTCSeconds(), x = a.getUTCMilliseconds();

                    a = (0 >= l || l >= 1e4 ? (0 > l ? "-" : "+") + P(6, 0 > l ? -l : l) : P(4, l)) + "-" + P(2, c + 1) + "-" + P(2, h) + "T" + P(2, y) + ":" + P(2, g) + ":" + P(2, w) + "." + P(3, x) + "Z";
                  } else a = null;
                  if (n && (a = n.call(e, t, a)), null === a) return "null";
                  if (u = b.call(a), u == S) return "" + a;
                  if (u == E) return a > -1 / 0 && 1 / 0 > a ? "" + a : "null";
                  if (u == j) return R("" + a);

                  if ("object" == _typeof(a)) {
                    for (I = s.length; I--;) {
                      if (s[I] === a) throw f();
                    }

                    if (s.push(a), O = [], L = o, o += i, u == T) {
                      for (k = 0, I = a.length; I > k; k++) {
                        A = U(k, a, n, r, i, o, s), O.push(A === m ? "null" : A);
                      }

                      M = O.length ? i ? "[\n" + o + O.join(",\n" + o) + "\n" + L + "]" : "[" + O.join(",") + "]" : "[]";
                    } else _v(r || a, function (t) {
                      var e = U(t, a, n, r, i, o, s);
                      e !== m && O.push(R(t) + ":" + (i ? " " : "") + e);
                    }), M = O.length ? i ? "{\n" + o + O.join(",\n" + o) + "\n" + L + "}" : "{" + O.join(",") + "}" : "{}";

                    return s.pop(), M;
                  }
                };

                e.stringify = function (t, e, n) {
                  var r, i, o, a;
                  if (s[_typeof(e)] && e) if ((a = b.call(e)) == x) i = e;else if (a == T) {
                    o = {};

                    for (var u, l = 0, c = e.length; c > l; u = e[l++], a = b.call(u), (a == j || a == E) && (o[u] = 1)) {
                      ;
                    }
                  }
                  if (n) if ((a = b.call(n)) == E) {
                    if ((n -= n % 1) > 0) for (r = "", n > 10 && (n = 10); r.length < n; r += " ") {
                      ;
                    }
                  } else a == j && (r = n.length <= 10 ? n : n.slice(0, 10));
                  return U("", (u = {}, u[""] = t, u), i, o, r, "", []);
                };
              }

              if (!n("json-parse")) {
                var M,
                    q,
                    D = o.fromCharCode,
                    W = {
                  92: "\\",
                  34: '"',
                  47: "/",
                  98: "\b",
                  116: "	",
                  110: "\n",
                  102: "\f",
                  114: "\r"
                },
                    J = function J() {
                  throw M = q = null, c();
                },
                    B = function B() {
                  for (var t, e, n, r, i, o = q, s = o.length; s > M;) {
                    switch (i = o.charCodeAt(M)) {
                      case 9:
                      case 10:
                      case 13:
                      case 32:
                        M++;
                        break;

                      case 123:
                      case 125:
                      case 91:
                      case 93:
                      case 58:
                      case 44:
                        return t = O ? o.charAt(M) : o[M], M++, t;

                      case 34:
                        for (t = "@", M++; s > M;) {
                          if (i = o.charCodeAt(M), 32 > i) J();else if (92 == i) switch (i = o.charCodeAt(++M)) {
                            case 92:
                            case 34:
                            case 47:
                            case 98:
                            case 116:
                            case 110:
                            case 102:
                            case 114:
                              t += W[i], M++;
                              break;

                            case 117:
                              for (e = ++M, n = M + 4; n > M; M++) {
                                i = o.charCodeAt(M), i >= 48 && 57 >= i || i >= 97 && 102 >= i || i >= 65 && 70 >= i || J();
                              }

                              t += D("0x" + o.slice(e, M));
                              break;

                            default:
                              J();
                          } else {
                            if (34 == i) break;

                            for (i = o.charCodeAt(M), e = M; i >= 32 && 92 != i && 34 != i;) {
                              i = o.charCodeAt(++M);
                            }

                            t += o.slice(e, M);
                          }
                        }

                        if (34 == o.charCodeAt(M)) return M++, t;
                        J();

                      default:
                        if (e = M, 45 == i && (r = !0, i = o.charCodeAt(++M)), i >= 48 && 57 >= i) {
                          for (48 == i && (i = o.charCodeAt(M + 1), i >= 48 && 57 >= i) && J(), r = !1; s > M && (i = o.charCodeAt(M), i >= 48 && 57 >= i); M++) {
                            ;
                          }

                          if (46 == o.charCodeAt(M)) {
                            for (n = ++M; s > n && (i = o.charCodeAt(n), i >= 48 && 57 >= i); n++) {
                              ;
                            }

                            n == M && J(), M = n;
                          }

                          if (i = o.charCodeAt(M), 101 == i || 69 == i) {
                            for (i = o.charCodeAt(++M), (43 == i || 45 == i) && M++, n = M; s > n && (i = o.charCodeAt(n), i >= 48 && 57 >= i); n++) {
                              ;
                            }

                            n == M && J(), M = n;
                          }

                          return +o.slice(e, M);
                        }

                        if (r && J(), "true" == o.slice(M, M + 4)) return M += 4, !0;
                        if ("false" == o.slice(M, M + 5)) return M += 5, !1;
                        if ("null" == o.slice(M, M + 4)) return M += 4, null;
                        J();
                    }
                  }

                  return "$";
                },
                    G = function G(t) {
                  var e, n;

                  if ("$" == t && J(), "string" == typeof t) {
                    if ("@" == (O ? t.charAt(0) : t[0])) return t.slice(1);

                    if ("[" == t) {
                      for (e = []; t = B(), "]" != t; n || (n = !0)) {
                        n && ("," == t ? (t = B(), "]" == t && J()) : J()), "," == t && J(), e.push(G(t));
                      }

                      return e;
                    }

                    if ("{" == t) {
                      for (e = {}; t = B(), "}" != t; n || (n = !0)) {
                        n && ("," == t ? (t = B(), "}" == t && J()) : J()), ("," == t || "string" != typeof t || "@" != (O ? t.charAt(0) : t[0]) || ":" != B()) && J(), e[t.slice(1)] = G(B());
                      }

                      return e;
                    }

                    J();
                  }

                  return t;
                },
                    F = function F(t, e, n) {
                  var r = H(t, e, n);
                  r === m ? delete t[e] : t[e] = r;
                },
                    H = function H(t, e, n) {
                  var r,
                      i = t[e];
                  if ("object" == _typeof(i) && i) if (b.call(i) == T) for (r = i.length; r--;) {
                    F(i, r, n);
                  } else _v(i, function (t) {
                    F(i, t, n);
                  });
                  return n.call(t, e, i);
                };

                e.parse = function (t, e) {
                  var n, r;
                  return M = 0, q = "" + t, n = G(B()), "$" != B() && J(), M = q = null, e && b.call(e) == x ? H((r = {}, r[""] = n, r), "", e) : n;
                };
              }
            }

            return e.runInContext = i, e;
          }

          var o = "function" == typeof t && t.amd,
              s = {
            "function": !0,
            object: !0
          },
              a = s[_typeof(r)] && r && !r.nodeType && r,
              u = s[typeof window === "undefined" ? "undefined" : _typeof(window)] && window || this,
              l = a && s[_typeof(n)] && n && !n.nodeType && "object" == _typeof(e) && e;
          if (!l || l.global !== l && l.window !== l && l.self !== l || (u = l), a && !o) i(u, a);else {
            var c = u.JSON,
                f = u.JSON3,
                h = !1,
                d = i(u, u.JSON3 = {
              noConflict: function noConflict() {
                return h || (h = !0, u.JSON = c, u.JSON3 = f, c = f = null), d;
              }
            });
            u.JSON = {
              parse: d.parse,
              stringify: d.stringify
            };
          }
          o && t(function () {
            return d;
          });
        }).call(this);
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    56: [function (t, e) {
      "use strict";

      function n(t, e, u) {
        if (!(this instanceof n)) return new n(t, e, u);

        var l,
            c,
            f,
            h,
            d = s.test(t),
            p = _typeof(e),
            v = this,
            m = 0;

        for ("object" !== p && "string" !== p && (u = e, e = null), u && "function" != typeof u && (u = o.parse), e = i(e); m < a.length; m++) {
          c = a[m], l = c[0], h = c[1], l !== l ? v[h] = t : "string" == typeof l ? ~(f = t.indexOf(l)) && ("number" == typeof c[2] ? (v[h] = t.slice(0, f), t = t.slice(f + c[2])) : (v[h] = t.slice(f), t = t.slice(0, f))) : (f = l.exec(t)) && (v[h] = f[1], t = t.slice(0, t.length - f[0].length)), v[h] = v[h] || (c[3] || "port" === h && d ? e[h] || "" : ""), c[4] && (v[h] = v[h].toLowerCase());
        }

        u && (v.query = u(v.query)), r(v.port, v.protocol) || (v.host = v.hostname, v.port = ""), v.username = v.password = "", v.auth && (c = v.auth.split(":"), v.username = c[0] || "", v.password = c[1] || ""), v.href = v.toString();
      }

      var r = t("requires-port"),
          i = t("./lolcation"),
          o = t("querystringify"),
          s = /^\/(?!\/)/,
          a = [["#", "hash"], ["?", "query"], ["//", "protocol", 2, 1, 1], ["/", "pathname"], ["@", "auth", 1], [0 / 0, "host", void 0, 1, 1], [/\:(\d+)$/, "port"], [0 / 0, "hostname", void 0, 1, 1]];
      n.prototype.set = function (t, e, n) {
        var i = this;
        return "query" === t ? ("string" == typeof e && (e = (n || o.parse)(e)), i[t] = e) : "port" === t ? (i[t] = e, r(e, i.protocol) ? e && (i.host = i.hostname + ":" + e) : (i.host = i.hostname, i[t] = "")) : "hostname" === t ? (i[t] = e, i.port && (e += ":" + i.port), i.host = e) : "host" === t ? (i[t] = e, /\:\d+/.test(e) && (e = e.split(":"), i.hostname = e[0], i.port = e[1])) : i[t] = e, i.href = i.toString(), i;
      }, n.prototype.toString = function (t) {
        t && "function" == typeof t || (t = o.stringify);
        var e,
            n = this,
            r = n.protocol + "//";
        return n.username && (r += n.username, n.password && (r += ":" + n.password), r += "@"), r += n.hostname, n.port && (r += ":" + n.port), r += n.pathname, n.query && (e = "object" == _typeof(n.query) ? t(n.query) : n.query, r += ("?" === e.charAt(0) ? "" : "?") + e), n.hash && (r += n.hash), r;
      }, n.qs = o, n.location = i, e.exports = n;
    }, {
      "./lolcation": 57,
      querystringify: 58,
      "requires-port": 59
    }],
    57: [function (t, e) {
      (function (n) {
        "use strict";

        var r,
            i = {
          hash: 1,
          query: 1
        };

        e.exports = function (e) {
          e = e || n.location || {}, r = r || t("./");

          var o,
              s = {},
              a = _typeof(e);

          if ("blob:" === e.protocol) s = new r(unescape(e.pathname), {});else if ("string" === a) {
            s = new r(e, {});

            for (o in i) {
              delete s[o];
            }
          } else if ("object" === a) for (o in e) {
            o in i || (s[o] = e[o]);
          }
          return s;
        };
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "./": 56
    }],
    58: [function (t, e, n) {
      "use strict";

      function r(t) {
        for (var e, n = /([^=?&]+)=([^&]*)/g, r = {}; e = n.exec(t); r[decodeURIComponent(e[1])] = decodeURIComponent(e[2])) {
          ;
        }

        return r;
      }

      function i(t, e) {
        e = e || "";
        var n = [];
        "string" != typeof e && (e = "?");

        for (var r in t) {
          o.call(t, r) && n.push(encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
        }

        return n.length ? e + n.join("&") : "";
      }

      var o = Object.prototype.hasOwnProperty;
      n.stringify = i, n.parse = r;
    }, {}],
    59: [function (t, e) {
      "use strict";

      e.exports = function (t, e) {
        if (e = e.split(":")[0], t = +t, !t) return !1;

        switch (e) {
          case "http":
          case "ws":
            return 80 !== t;

          case "https":
          case "wss":
            return 443 !== t;

          case "ftp":
            return 22 !== t;

          case "gopher":
            return 70 !== t;

          case "file":
            return !1;
        }

        return 0 !== t;
      };
    }, {}]
  }, {}, [1])(1);
});
},{}],"js/sockets/stomp.min.js":[function(require,module,exports) {
// Generated by CoffeeScript 1.7.1

/*
   Stomp Over WebSocket http://www.jmesnil.net/stomp-websocket/doc/ | Apache License V2.0

   Copyright (C) 2010-2013 [Jeff Mesnil](http://jmesnil.net/)
   Copyright (C) 2012 [FuseSource, Inc.](http://fusesource.com)
 */
(function () {
  var t,
      e,
      n,
      i,
      r = {}.hasOwnProperty,
      o = [].slice;
  t = {
    LF: "\n",
    NULL: "\x00"
  };

  n = function () {
    var e;

    function n(t, e, n) {
      this.command = t;
      this.headers = e != null ? e : {};
      this.body = n != null ? n : "";
    }

    n.prototype.toString = function () {
      var e, i, o, s, u;
      e = [this.command];
      o = this.headers["content-length"] === false ? true : false;

      if (o) {
        delete this.headers["content-length"];
      }

      u = this.headers;

      for (i in u) {
        if (!r.call(u, i)) continue;
        s = u[i];
        e.push("" + i + ":" + s);
      }

      if (this.body && !o) {
        e.push("content-length:" + n.sizeOfUTF8(this.body));
      }

      e.push(t.LF + this.body);
      return e.join(t.LF);
    };

    n.sizeOfUTF8 = function (t) {
      if (t) {
        return encodeURI(t).match(/%..|./g).length;
      } else {
        return 0;
      }
    };

    e = function e(_e) {
      var i, r, o, s, u, a, c, f, h, l, p, d, g, b, m, v, y;
      s = _e.search(RegExp("" + t.LF + t.LF));
      u = _e.substring(0, s).split(t.LF);
      o = u.shift();
      a = {};

      d = function d(t) {
        return t.replace(/^\s+|\s+$/g, "");
      };

      v = u.reverse();

      for (g = 0, m = v.length; g < m; g++) {
        l = v[g];
        f = l.indexOf(":");
        a[d(l.substring(0, f))] = d(l.substring(f + 1));
      }

      i = "";
      p = s + 2;

      if (a["content-length"]) {
        h = parseInt(a["content-length"]);
        i = ("" + _e).substring(p, p + h);
      } else {
        r = null;

        for (c = b = p, y = _e.length; p <= y ? b < y : b > y; c = p <= y ? ++b : --b) {
          r = _e.charAt(c);

          if (r === t.NULL) {
            break;
          }

          i += r;
        }
      }

      return new n(o, a, i);
    };

    n.unmarshall = function (n) {
      var i;
      return function () {
        var r, o, s, u;
        s = n.split(RegExp("" + t.NULL + t.LF + "*"));
        u = [];

        for (r = 0, o = s.length; r < o; r++) {
          i = s[r];

          if ((i != null ? i.length : void 0) > 0) {
            u.push(e(i));
          }
        }

        return u;
      }();
    };

    n.marshall = function (e, i, r) {
      var o;
      o = new n(e, i, r);
      return o.toString() + t.NULL;
    };

    return n;
  }();

  e = function () {
    var e;

    function r(t) {
      this.ws = t;
      this.ws.binaryType = "arraybuffer";
      this.counter = 0;
      this.connected = false;
      this.heartbeat = {
        outgoing: 1e4,
        incoming: 1e4
      };
      this.maxWebSocketFrameSize = 16 * 1024;
      this.subscriptions = {};
    }

    r.prototype.debug = function (t) {
      var e;
      return typeof window !== "undefined" && window !== null ? (e = window.console) != null ? e.log(t) : void 0 : void 0;
    };

    e = function e() {
      if (Date.now) {
        return Date.now();
      } else {
        return new Date().valueOf;
      }
    };

    r.prototype._transmit = function (t, e, i) {
      var r;
      r = n.marshall(t, e, i);

      if (typeof this.debug === "function") {
        this.debug(">>> " + r);
      }

      while (true) {
        if (r.length > this.maxWebSocketFrameSize) {
          this.ws.send(r.substring(0, this.maxWebSocketFrameSize));
          r = r.substring(this.maxWebSocketFrameSize);

          if (typeof this.debug === "function") {
            this.debug("remaining = " + r.length);
          }
        } else {
          return this.ws.send(r);
        }
      }
    };

    r.prototype._setupHeartbeat = function (n) {
      var r, o, s, u, a, c;

      if ((a = n.version) !== i.VERSIONS.V1_1 && a !== i.VERSIONS.V1_2) {
        return;
      }

      c = function () {
        var t, e, i, r;
        i = n["heart-beat"].split(",");
        r = [];

        for (t = 0, e = i.length; t < e; t++) {
          u = i[t];
          r.push(parseInt(u));
        }

        return r;
      }(), o = c[0], r = c[1];

      if (!(this.heartbeat.outgoing === 0 || r === 0)) {
        s = Math.max(this.heartbeat.outgoing, r);

        if (typeof this.debug === "function") {
          this.debug("send PING every " + s + "ms");
        }

        this.pinger = i.setInterval(s, function (e) {
          return function () {
            e.ws.send(t.LF);
            return typeof e.debug === "function" ? e.debug(">>> PING") : void 0;
          };
        }(this));
      }

      if (!(this.heartbeat.incoming === 0 || o === 0)) {
        s = Math.max(this.heartbeat.incoming, o);

        if (typeof this.debug === "function") {
          this.debug("check PONG every " + s + "ms");
        }

        return this.ponger = i.setInterval(s, function (t) {
          return function () {
            var n;
            n = e() - t.serverActivity;

            if (n > s * 2) {
              if (typeof t.debug === "function") {
                t.debug("did not receive server activity for the last " + n + "ms");
              }

              return t.ws.close();
            }
          };
        }(this));
      }
    };

    r.prototype._parseConnect = function () {
      var t, e, n, i;
      t = 1 <= arguments.length ? o.call(arguments, 0) : [];
      i = {};

      switch (t.length) {
        case 2:
          i = t[0], e = t[1];
          break;

        case 3:
          if (t[1] instanceof Function) {
            i = t[0], e = t[1], n = t[2];
          } else {
            i.login = t[0], i.passcode = t[1], e = t[2];
          }

          break;

        case 4:
          i.login = t[0], i.passcode = t[1], e = t[2], n = t[3];
          break;

        default:
          i.login = t[0], i.passcode = t[1], e = t[2], n = t[3], i.host = t[4];
      }

      return [i, e, n];
    };

    r.prototype.connect = function () {
      var r, s, u, a;
      r = 1 <= arguments.length ? o.call(arguments, 0) : [];
      a = this._parseConnect.apply(this, r);
      u = a[0], this.connectCallback = a[1], s = a[2];

      if (typeof this.debug === "function") {
        this.debug("Opening Web Socket...");
      }

      this.ws.onmessage = function (i) {
        return function (r) {
          var o, u, a, c, f, h, l, p, d, g, b, m;
          c = typeof ArrayBuffer !== "undefined" && r.data instanceof ArrayBuffer ? (o = new Uint8Array(r.data), typeof i.debug === "function" ? i.debug("--- got data length: " + o.length) : void 0, function () {
            var t, e, n;
            n = [];

            for (t = 0, e = o.length; t < e; t++) {
              u = o[t];
              n.push(String.fromCharCode(u));
            }

            return n;
          }().join("")) : r.data;
          i.serverActivity = e();

          if (c === t.LF) {
            if (typeof i.debug === "function") {
              i.debug("<<< PONG");
            }

            return;
          }

          if (typeof i.debug === "function") {
            i.debug("<<< " + c);
          }

          b = n.unmarshall(c);
          m = [];

          for (d = 0, g = b.length; d < g; d++) {
            f = b[d];

            switch (f.command) {
              case "CONNECTED":
                if (typeof i.debug === "function") {
                  i.debug("connected to server " + f.headers.server);
                }

                i.connected = true;

                i._setupHeartbeat(f.headers);

                m.push(typeof i.connectCallback === "function" ? i.connectCallback(f) : void 0);
                break;

              case "MESSAGE":
                p = f.headers.subscription;
                l = i.subscriptions[p] || i.onreceive;

                if (l) {
                  a = i;
                  h = f.headers["message-id"];

                  f.ack = function (t) {
                    if (t == null) {
                      t = {};
                    }

                    return a.ack(h, p, t);
                  };

                  f.nack = function (t) {
                    if (t == null) {
                      t = {};
                    }

                    return a.nack(h, p, t);
                  };

                  m.push(l(f));
                } else {
                  m.push(typeof i.debug === "function" ? i.debug("Unhandled received MESSAGE: " + f) : void 0);
                }

                break;

              case "RECEIPT":
                m.push(typeof i.onreceipt === "function" ? i.onreceipt(f) : void 0);
                break;

              case "ERROR":
                m.push(typeof s === "function" ? s(f) : void 0);
                break;

              default:
                m.push(typeof i.debug === "function" ? i.debug("Unhandled frame: " + f) : void 0);
            }
          }

          return m;
        };
      }(this);

      this.ws.onclose = function (t) {
        return function () {
          var e;
          e = "Whoops! Lost connection to " + t.ws.url;

          if (typeof t.debug === "function") {
            t.debug(e);
          }

          t._cleanUp();

          return typeof s === "function" ? s(e) : void 0;
        };
      }(this);

      return this.ws.onopen = function (t) {
        return function () {
          if (typeof t.debug === "function") {
            t.debug("Web Socket Opened...");
          }

          u["accept-version"] = i.VERSIONS.supportedVersions();
          u["heart-beat"] = [t.heartbeat.outgoing, t.heartbeat.incoming].join(",");
          return t._transmit("CONNECT", u);
        };
      }(this);
    };

    r.prototype.disconnect = function (t, e) {
      if (e == null) {
        e = {};
      }

      this._transmit("DISCONNECT", e);

      this.ws.onclose = null;
      this.ws.close();

      this._cleanUp();

      return typeof t === "function" ? t() : void 0;
    };

    r.prototype._cleanUp = function () {
      this.connected = false;

      if (this.pinger) {
        i.clearInterval(this.pinger);
      }

      if (this.ponger) {
        return i.clearInterval(this.ponger);
      }
    };

    r.prototype.send = function (t, e, n) {
      if (e == null) {
        e = {};
      }

      if (n == null) {
        n = "";
      }

      e.destination = t;
      return this._transmit("SEND", e, n);
    };

    r.prototype.subscribe = function (t, e, n) {
      var i;

      if (n == null) {
        n = {};
      }

      if (!n.id) {
        n.id = "sub-" + this.counter++;
      }

      n.destination = t;
      this.subscriptions[n.id] = e;

      this._transmit("SUBSCRIBE", n);

      i = this;
      return {
        id: n.id,
        unsubscribe: function unsubscribe() {
          return i.unsubscribe(n.id);
        }
      };
    };

    r.prototype.unsubscribe = function (t) {
      delete this.subscriptions[t];
      return this._transmit("UNSUBSCRIBE", {
        id: t
      });
    };

    r.prototype.begin = function (t) {
      var e, n;
      n = t || "tx-" + this.counter++;

      this._transmit("BEGIN", {
        transaction: n
      });

      e = this;
      return {
        id: n,
        commit: function commit() {
          return e.commit(n);
        },
        abort: function abort() {
          return e.abort(n);
        }
      };
    };

    r.prototype.commit = function (t) {
      return this._transmit("COMMIT", {
        transaction: t
      });
    };

    r.prototype.abort = function (t) {
      return this._transmit("ABORT", {
        transaction: t
      });
    };

    r.prototype.ack = function (t, e, n) {
      if (n == null) {
        n = {};
      }

      n["message-id"] = t;
      n.subscription = e;
      return this._transmit("ACK", n);
    };

    r.prototype.nack = function (t, e, n) {
      if (n == null) {
        n = {};
      }

      n["message-id"] = t;
      n.subscription = e;
      return this._transmit("NACK", n);
    };

    return r;
  }();

  i = {
    VERSIONS: {
      V1_0: "1.0",
      V1_1: "1.1",
      V1_2: "1.2",
      supportedVersions: function supportedVersions() {
        return "1.1,1.0";
      }
    },
    client: function client(t, n) {
      var r, o;

      if (n == null) {
        n = ["v10.stomp", "v11.stomp"];
      }

      r = i.WebSocketClass || WebSocket;
      o = new r(t, n);
      return new e(o);
    },
    over: function over(t) {
      return new e(t);
    },
    Frame: n
  };

  if (typeof exports !== "undefined" && exports !== null) {
    exports.Stomp = i;
  }

  if (typeof window !== "undefined" && window !== null) {
    i.setInterval = function (t, e) {
      return window.setInterval(e, t);
    };

    i.clearInterval = function (t) {
      return window.clearInterval(t);
    };

    window.Stomp = i;
  } else if (!exports) {
    self.Stomp = i;
  }
}).call(this);
},{}],"js/utils/StringUtils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_UUID = create_UUID;
exports.createElement = void 0;

function create_UUID() {
  var dt = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : r & 0x3 | 0x8).toString(16);
  });
}

var createElement = function createElement(template) {
  var newElement = document.createElement("div");
  newElement.innerHTML = template;
  return newElement.firstChild;
};

exports.createElement = createElement;
},{}],"../node_modules/core-js/internals/global.js":[function(require,module,exports) {
var global = arguments[3];
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

},{}],"../node_modules/core-js/internals/fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],"../node_modules/core-js/internals/descriptors.js":[function(require,module,exports) {
var fails = require('../internals/fails');

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/object-property-is-enumerable.js":[function(require,module,exports) {
'use strict';
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],"../node_modules/core-js/internals/create-property-descriptor.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js/internals/classof-raw.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js/internals/indexed-object.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

},{"../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js"}],"../node_modules/core-js/internals/require-object-coercible.js":[function(require,module,exports) {
// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],"../node_modules/core-js/internals/to-indexed-object.js":[function(require,module,exports) {
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":"../node_modules/core-js/internals/indexed-object.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js"}],"../node_modules/core-js/internals/is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/internals/to-primitive.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/internals/to-object.js":[function(require,module,exports) {
var requireObjectCoercible = require('../internals/require-object-coercible');

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js"}],"../node_modules/core-js/internals/has.js":[function(require,module,exports) {
var toObject = require('../internals/to-object');

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};

},{"../internals/to-object":"../node_modules/core-js/internals/to-object.js"}],"../node_modules/core-js/internals/document-create-element.js":[function(require,module,exports) {

var global = require('../internals/global');
var isObject = require('../internals/is-object');

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/internals/ie8-dom-define.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/document-create-element":"../node_modules/core-js/internals/document-create-element.js"}],"../node_modules/core-js/internals/object-get-own-property-descriptor.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var has = require('../internals/has');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-property-is-enumerable":"../node_modules/core-js/internals/object-property-is-enumerable.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js","../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/ie8-dom-define":"../node_modules/core-js/internals/ie8-dom-define.js"}],"../node_modules/core-js/internals/an-object.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/internals/object-define-property.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/ie8-dom-define":"../node_modules/core-js/internals/ie8-dom-define.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-primitive":"../node_modules/core-js/internals/to-primitive.js"}],"../node_modules/core-js/internals/create-non-enumerable-property.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js"}],"../node_modules/core-js/internals/set-global.js":[function(require,module,exports) {

var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js"}],"../node_modules/core-js/internals/shared-store.js":[function(require,module,exports) {

var global = require('../internals/global');
var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/set-global":"../node_modules/core-js/internals/set-global.js"}],"../node_modules/core-js/internals/inspect-source.js":[function(require,module,exports) {
var store = require('../internals/shared-store');

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/shared-store":"../node_modules/core-js/internals/shared-store.js"}],"../node_modules/core-js/internals/native-weak-map.js":[function(require,module,exports) {

var global = require('../internals/global');
var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/inspect-source":"../node_modules/core-js/internals/inspect-source.js"}],"../node_modules/core-js/internals/is-pure.js":[function(require,module,exports) {
module.exports = false;

},{}],"../node_modules/core-js/internals/shared.js":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.12.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/shared-store":"../node_modules/core-js/internals/shared-store.js"}],"../node_modules/core-js/internals/uid.js":[function(require,module,exports) {
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],"../node_modules/core-js/internals/shared-key.js":[function(require,module,exports) {
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":"../node_modules/core-js/internals/shared.js","../internals/uid":"../node_modules/core-js/internals/uid.js"}],"../node_modules/core-js/internals/hidden-keys.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/internals/internal-state.js":[function(require,module,exports) {

var NATIVE_WEAK_MAP = require('../internals/native-weak-map');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var objectHas = require('../internals/has');
var shared = require('../internals/shared-store');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

},{"../internals/native-weak-map":"../node_modules/core-js/internals/native-weak-map.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/shared-store":"../node_modules/core-js/internals/shared-store.js","../internals/shared-key":"../node_modules/core-js/internals/shared-key.js","../internals/hidden-keys":"../node_modules/core-js/internals/hidden-keys.js"}],"../node_modules/core-js/internals/redefine.js":[function(require,module,exports) {

var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var setGlobal = require('../internals/set-global');
var inspectSource = require('../internals/inspect-source');
var InternalStateModule = require('../internals/internal-state');

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/set-global":"../node_modules/core-js/internals/set-global.js","../internals/inspect-source":"../node_modules/core-js/internals/inspect-source.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js"}],"../node_modules/core-js/internals/path.js":[function(require,module,exports) {

var global = require('../internals/global');

module.exports = global;

},{"../internals/global":"../node_modules/core-js/internals/global.js"}],"../node_modules/core-js/internals/get-built-in.js":[function(require,module,exports) {

var path = require('../internals/path');
var global = require('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

},{"../internals/path":"../node_modules/core-js/internals/path.js","../internals/global":"../node_modules/core-js/internals/global.js"}],"../node_modules/core-js/internals/to-integer.js":[function(require,module,exports) {
var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],"../node_modules/core-js/internals/to-length.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":"../node_modules/core-js/internals/to-integer.js"}],"../node_modules/core-js/internals/to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer":"../node_modules/core-js/internals/to-integer.js"}],"../node_modules/core-js/internals/array-includes.js":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/to-absolute-index":"../node_modules/core-js/internals/to-absolute-index.js"}],"../node_modules/core-js/internals/object-keys-internal.js":[function(require,module,exports) {
var has = require('../internals/has');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

},{"../internals/has":"../node_modules/core-js/internals/has.js","../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/array-includes":"../node_modules/core-js/internals/array-includes.js","../internals/hidden-keys":"../node_modules/core-js/internals/hidden-keys.js"}],"../node_modules/core-js/internals/enum-bug-keys.js":[function(require,module,exports) {
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],"../node_modules/core-js/internals/object-get-own-property-names.js":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/object-keys-internal":"../node_modules/core-js/internals/object-keys-internal.js","../internals/enum-bug-keys":"../node_modules/core-js/internals/enum-bug-keys.js"}],"../node_modules/core-js/internals/object-get-own-property-symbols.js":[function(require,module,exports) {
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],"../node_modules/core-js/internals/own-keys.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

},{"../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js","../internals/object-get-own-property-names":"../node_modules/core-js/internals/object-get-own-property-names.js","../internals/object-get-own-property-symbols":"../node_modules/core-js/internals/object-get-own-property-symbols.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/internals/copy-constructor-properties.js":[function(require,module,exports) {
var has = require('../internals/has');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

},{"../internals/has":"../node_modules/core-js/internals/has.js","../internals/own-keys":"../node_modules/core-js/internals/own-keys.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js"}],"../node_modules/core-js/internals/is-forced.js":[function(require,module,exports) {
var fails = require('../internals/fails');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/export.js":[function(require,module,exports) {

var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var setGlobal = require('../internals/set-global');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var isForced = require('../internals/is-forced');

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/object-get-own-property-descriptor":"../node_modules/core-js/internals/object-get-own-property-descriptor.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/set-global":"../node_modules/core-js/internals/set-global.js","../internals/copy-constructor-properties":"../node_modules/core-js/internals/copy-constructor-properties.js","../internals/is-forced":"../node_modules/core-js/internals/is-forced.js"}],"../node_modules/core-js/internals/a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

},{}],"../node_modules/core-js/internals/function-bind-context.js":[function(require,module,exports) {
var aFunction = require('../internals/a-function');

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-function":"../node_modules/core-js/internals/a-function.js"}],"../node_modules/core-js/internals/is-array.js":[function(require,module,exports) {
var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

},{"../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js"}],"../node_modules/core-js/internals/engine-user-agent.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js"}],"../node_modules/core-js/internals/engine-v8-version.js":[function(require,module,exports) {


var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/engine-user-agent":"../node_modules/core-js/internals/engine-user-agent.js"}],"../node_modules/core-js/internals/native-symbol.js":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = require('../internals/engine-v8-version');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  return !String(Symbol()) ||
    // Chrome 38 Symbol has incorrect toString conversion
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"../internals/engine-v8-version":"../node_modules/core-js/internals/engine-v8-version.js","../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/use-symbol-as-uid.js":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = require('../internals/native-symbol');

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":"../node_modules/core-js/internals/native-symbol.js"}],"../node_modules/core-js/internals/well-known-symbol.js":[function(require,module,exports) {

var global = require('../internals/global');
var shared = require('../internals/shared');
var has = require('../internals/has');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/shared":"../node_modules/core-js/internals/shared.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/uid":"../node_modules/core-js/internals/uid.js","../internals/native-symbol":"../node_modules/core-js/internals/native-symbol.js","../internals/use-symbol-as-uid":"../node_modules/core-js/internals/use-symbol-as-uid.js"}],"../node_modules/core-js/internals/array-species-create.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/is-array":"../node_modules/core-js/internals/is-array.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/array-iteration.js":[function(require,module,exports) {
var bind = require('../internals/function-bind-context');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var arraySpeciesCreate = require('../internals/array-species-create');

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};

},{"../internals/function-bind-context":"../node_modules/core-js/internals/function-bind-context.js","../internals/indexed-object":"../node_modules/core-js/internals/indexed-object.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/array-species-create":"../node_modules/core-js/internals/array-species-create.js"}],"../node_modules/core-js/internals/array-method-is-strict.js":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/array-for-each.js":[function(require,module,exports) {
'use strict';
var $forEach = require('../internals/array-iteration').forEach;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

},{"../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/array-method-is-strict":"../node_modules/core-js/internals/array-method-is-strict.js"}],"../node_modules/core-js/modules/es.array.for-each.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var forEach = require('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-for-each":"../node_modules/core-js/internals/array-for-each.js"}],"../node_modules/core-js/internals/dom-iterables.js":[function(require,module,exports) {
// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

},{}],"../node_modules/core-js/modules/web.dom-collections.for-each.js":[function(require,module,exports) {

var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var forEach = require('../internals/array-for-each');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/dom-iterables":"../node_modules/core-js/internals/dom-iterables.js","../internals/array-for-each":"../node_modules/core-js/internals/array-for-each.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js"}],"../node_modules/can-use-dom/index.js":[function(require,module,exports) {
var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

module.exports = canUseDOM;
},{}],"../node_modules/core-js/internals/array-method-has-species-support.js":[function(require,module,exports) {
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

},{"../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/engine-v8-version":"../node_modules/core-js/internals/engine-v8-version.js"}],"../node_modules/core-js/modules/es.array.filter.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $filter = require('../internals/array-iteration').filter;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/array-method-has-species-support":"../node_modules/core-js/internals/array-method-has-species-support.js"}],"../node_modules/core-js/internals/object-keys.js":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/object-keys-internal":"../node_modules/core-js/internals/object-keys-internal.js","../internals/enum-bug-keys":"../node_modules/core-js/internals/enum-bug-keys.js"}],"../node_modules/core-js/internals/object-define-properties.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var objectKeys = require('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-keys":"../node_modules/core-js/internals/object-keys.js"}],"../node_modules/core-js/internals/html.js":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":"../node_modules/core-js/internals/get-built-in.js"}],"../node_modules/core-js/internals/object-create.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var defineProperties = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/object-define-properties":"../node_modules/core-js/internals/object-define-properties.js","../internals/enum-bug-keys":"../node_modules/core-js/internals/enum-bug-keys.js","../internals/hidden-keys":"../node_modules/core-js/internals/hidden-keys.js","../internals/html":"../node_modules/core-js/internals/html.js","../internals/document-create-element":"../node_modules/core-js/internals/document-create-element.js","../internals/shared-key":"../node_modules/core-js/internals/shared-key.js"}],"../node_modules/core-js/internals/add-to-unscopables.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var create = require('../internals/object-create');
var definePropertyModule = require('../internals/object-define-property');

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

},{"../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js"}],"../node_modules/core-js/internals/iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/internals/correct-prototype-getter.js":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/object-get-prototype-of.js":[function(require,module,exports) {
var has = require('../internals/has');
var toObject = require('../internals/to-object');
var sharedKey = require('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

},{"../internals/has":"../node_modules/core-js/internals/has.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/shared-key":"../node_modules/core-js/internals/shared-key.js","../internals/correct-prototype-getter":"../node_modules/core-js/internals/correct-prototype-getter.js"}],"../node_modules/core-js/internals/iterators-core.js":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js"}],"../node_modules/core-js/internals/set-to-string-tag.js":[function(require,module,exports) {
var defineProperty = require('../internals/object-define-property').f;
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

},{"../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/create-iterator-constructor.js":[function(require,module,exports) {
'use strict';
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

},{"../internals/iterators-core":"../node_modules/core-js/internals/iterators-core.js","../internals/object-create":"../node_modules/core-js/internals/object-create.js","../internals/create-property-descriptor":"../node_modules/core-js/internals/create-property-descriptor.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js","../internals/iterators":"../node_modules/core-js/internals/iterators.js"}],"../node_modules/core-js/internals/a-possible-prototype.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js"}],"../node_modules/core-js/internals/object-set-prototype-of.js":[function(require,module,exports) {
/* eslint-disable no-proto -- safe */
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/a-possible-prototype":"../node_modules/core-js/internals/a-possible-prototype.js"}],"../node_modules/core-js/internals/define-iterator.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');
var Iterators = require('../internals/iterators');
var IteratorsCore = require('../internals/iterators-core');

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/create-iterator-constructor":"../node_modules/core-js/internals/create-iterator-constructor.js","../internals/object-get-prototype-of":"../node_modules/core-js/internals/object-get-prototype-of.js","../internals/object-set-prototype-of":"../node_modules/core-js/internals/object-set-prototype-of.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/is-pure":"../node_modules/core-js/internals/is-pure.js","../internals/iterators":"../node_modules/core-js/internals/iterators.js","../internals/iterators-core":"../node_modules/core-js/internals/iterators-core.js"}],"../node_modules/core-js/modules/es.array.iterator.js":[function(require,module,exports) {
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var addToUnscopables = require('../internals/add-to-unscopables');
var Iterators = require('../internals/iterators');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"../internals/to-indexed-object":"../node_modules/core-js/internals/to-indexed-object.js","../internals/add-to-unscopables":"../node_modules/core-js/internals/add-to-unscopables.js","../internals/iterators":"../node_modules/core-js/internals/iterators.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/define-iterator":"../node_modules/core-js/internals/define-iterator.js"}],"../node_modules/core-js/internals/object-assign.js":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var objectKeys = require('../internals/object-keys');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/object-keys":"../node_modules/core-js/internals/object-keys.js","../internals/object-get-own-property-symbols":"../node_modules/core-js/internals/object-get-own-property-symbols.js","../internals/object-property-is-enumerable":"../node_modules/core-js/internals/object-property-is-enumerable.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/indexed-object":"../node_modules/core-js/internals/indexed-object.js"}],"../node_modules/core-js/modules/es.object.assign.js":[function(require,module,exports) {
var $ = require('../internals/export');
var assign = require('../internals/object-assign');

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/object-assign":"../node_modules/core-js/internals/object-assign.js"}],"../node_modules/core-js/internals/to-string-tag-support.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/classof.js":[function(require,module,exports) {
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classofRaw = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

},{"../internals/to-string-tag-support":"../node_modules/core-js/internals/to-string-tag-support.js","../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/object-to-string.js":[function(require,module,exports) {
'use strict';
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classof = require('../internals/classof');

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

},{"../internals/to-string-tag-support":"../node_modules/core-js/internals/to-string-tag-support.js","../internals/classof":"../node_modules/core-js/internals/classof.js"}],"../node_modules/core-js/modules/es.object.to-string.js":[function(require,module,exports) {
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var redefine = require('../internals/redefine');
var toString = require('../internals/object-to-string');

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}

},{"../internals/to-string-tag-support":"../node_modules/core-js/internals/to-string-tag-support.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/object-to-string":"../node_modules/core-js/internals/object-to-string.js"}],"../node_modules/core-js/internals/whitespaces.js":[function(require,module,exports) {
// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"../node_modules/core-js/internals/string-trim.js":[function(require,module,exports) {
var requireObjectCoercible = require('../internals/require-object-coercible');
var whitespaces = require('../internals/whitespaces');

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};

},{"../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/whitespaces":"../node_modules/core-js/internals/whitespaces.js"}],"../node_modules/core-js/internals/number-parse-int.js":[function(require,module,exports) {

var global = require('../internals/global');
var trim = require('../internals/string-trim').trim;
var whitespaces = require('../internals/whitespaces');

var $parseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/string-trim":"../node_modules/core-js/internals/string-trim.js","../internals/whitespaces":"../node_modules/core-js/internals/whitespaces.js"}],"../node_modules/core-js/modules/es.parse-int.js":[function(require,module,exports) {
var $ = require('../internals/export');
var parseIntImplementation = require('../internals/number-parse-int');

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/number-parse-int":"../node_modules/core-js/internals/number-parse-int.js"}],"../node_modules/core-js/internals/string-multibyte.js":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

},{"../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js"}],"../node_modules/core-js/modules/es.string.iterator.js":[function(require,module,exports) {
'use strict';
var charAt = require('../internals/string-multibyte').charAt;
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

},{"../internals/string-multibyte":"../node_modules/core-js/internals/string-multibyte.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/define-iterator":"../node_modules/core-js/internals/define-iterator.js"}],"../node_modules/core-js/internals/redefine-all.js":[function(require,module,exports) {
var redefine = require('../internals/redefine');

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

},{"../internals/redefine":"../node_modules/core-js/internals/redefine.js"}],"../node_modules/core-js/internals/freezing.js":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});

},{"../internals/fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/internal-metadata.js":[function(require,module,exports) {
var hiddenKeys = require('../internals/hidden-keys');
var isObject = require('../internals/is-object');
var has = require('../internals/has');
var defineProperty = require('../internals/object-define-property').f;
var uid = require('../internals/uid');
var FREEZING = require('../internals/freezing');

var METADATA = uid('meta');
var id = 0;

// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;

},{"../internals/hidden-keys":"../node_modules/core-js/internals/hidden-keys.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js","../internals/uid":"../node_modules/core-js/internals/uid.js","../internals/freezing":"../node_modules/core-js/internals/freezing.js"}],"../node_modules/core-js/internals/is-array-iterator-method.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/iterators":"../node_modules/core-js/internals/iterators.js"}],"../node_modules/core-js/internals/get-iterator-method.js":[function(require,module,exports) {
var classof = require('../internals/classof');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"../internals/classof":"../node_modules/core-js/internals/classof.js","../internals/iterators":"../node_modules/core-js/internals/iterators.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/iterator-close.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');

module.exports = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/internals/iterate.js":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var toLength = require('../internals/to-length');
var bind = require('../internals/function-bind-context');
var getIteratorMethod = require('../internals/get-iterator-method');
var iteratorClose = require('../internals/iterator-close');

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/is-array-iterator-method":"../node_modules/core-js/internals/is-array-iterator-method.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/function-bind-context":"../node_modules/core-js/internals/function-bind-context.js","../internals/get-iterator-method":"../node_modules/core-js/internals/get-iterator-method.js","../internals/iterator-close":"../node_modules/core-js/internals/iterator-close.js"}],"../node_modules/core-js/internals/an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

},{}],"../node_modules/core-js/internals/check-correctness-of-iteration.js":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

},{"../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/core-js/internals/inherit-if-required.js":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

},{"../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/object-set-prototype-of":"../node_modules/core-js/internals/object-set-prototype-of.js"}],"../node_modules/core-js/internals/collection.js":[function(require,module,exports) {

'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var isForced = require('../internals/is-forced');
var redefine = require('../internals/redefine');
var InternalMetadataModule = require('../internals/internal-metadata');
var iterate = require('../internals/iterate');
var anInstance = require('../internals/an-instance');
var isObject = require('../internals/is-object');
var fails = require('../internals/fails');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var setToStringTag = require('../internals/set-to-string-tag');
var inheritIfRequired = require('../internals/inherit-if-required');

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/global":"../node_modules/core-js/internals/global.js","../internals/is-forced":"../node_modules/core-js/internals/is-forced.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/internal-metadata":"../node_modules/core-js/internals/internal-metadata.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/check-correctness-of-iteration":"../node_modules/core-js/internals/check-correctness-of-iteration.js","../internals/set-to-string-tag":"../node_modules/core-js/internals/set-to-string-tag.js","../internals/inherit-if-required":"../node_modules/core-js/internals/inherit-if-required.js"}],"../node_modules/core-js/internals/collection-weak.js":[function(require,module,exports) {
var define;
'use strict';
var redefineAll = require('../internals/redefine-all');
var getWeakData = require('../internals/internal-metadata').getWeakData;
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var anInstance = require('../internals/an-instance');
var iterate = require('../internals/iterate');
var ArrayIterationModule = require('../internals/array-iteration');
var $has = require('../internals/has');
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};

},{"../internals/redefine-all":"../node_modules/core-js/internals/redefine-all.js","../internals/internal-metadata":"../node_modules/core-js/internals/internal-metadata.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/an-instance":"../node_modules/core-js/internals/an-instance.js","../internals/iterate":"../node_modules/core-js/internals/iterate.js","../internals/array-iteration":"../node_modules/core-js/internals/array-iteration.js","../internals/has":"../node_modules/core-js/internals/has.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js"}],"../node_modules/core-js/modules/es.weak-map.js":[function(require,module,exports) {

'use strict';
var global = require('../internals/global');
var redefineAll = require('../internals/redefine-all');
var InternalMetadataModule = require('../internals/internal-metadata');
var collection = require('../internals/collection');
var collectionWeak = require('../internals/collection-weak');
var isObject = require('../internals/is-object');
var enforceIternalState = require('../internals/internal-state').enforce;
var NATIVE_WEAK_MAP = require('../internals/native-weak-map');

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/redefine-all":"../node_modules/core-js/internals/redefine-all.js","../internals/internal-metadata":"../node_modules/core-js/internals/internal-metadata.js","../internals/collection":"../node_modules/core-js/internals/collection.js","../internals/collection-weak":"../node_modules/core-js/internals/collection-weak.js","../internals/is-object":"../node_modules/core-js/internals/is-object.js","../internals/internal-state":"../node_modules/core-js/internals/internal-state.js","../internals/native-weak-map":"../node_modules/core-js/internals/native-weak-map.js"}],"../node_modules/core-js/modules/web.dom-collections.iterator.js":[function(require,module,exports) {

var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var ArrayIteratorMethods = require('../modules/es.array.iterator');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}

},{"../internals/global":"../node_modules/core-js/internals/global.js","../internals/dom-iterables":"../node_modules/core-js/internals/dom-iterables.js","../modules/es.array.iterator":"../node_modules/core-js/modules/es.array.iterator.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js"}],"../node_modules/lodash.throttle/index.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = throttle;

},{}],"../node_modules/lodash.debounce/index.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

},{}],"../node_modules/lodash.memoize/index.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = memoize;

},{}],"../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */

/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = function () {
  if (typeof Map !== 'undefined') {
    return Map;
  }
  /**
   * Returns index in provided array that matches the specified key.
   *
   * @param {Array<Array>} arr
   * @param {*} key
   * @returns {number}
   */


  function getIndex(arr, key) {
    var result = -1;
    arr.some(function (entry, index) {
      if (entry[0] === key) {
        result = index;
        return true;
      }

      return false;
    });
    return result;
  }

  return (
    /** @class */
    function () {
      function class_1() {
        this.__entries__ = [];
      }

      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function () {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      /**
       * @param {*} key
       * @returns {*}
       */

      class_1.prototype.get = function (key) {
        var index = getIndex(this.__entries__, key);
        var entry = this.__entries__[index];
        return entry && entry[1];
      };
      /**
       * @param {*} key
       * @param {*} value
       * @returns {void}
       */


      class_1.prototype.set = function (key, value) {
        var index = getIndex(this.__entries__, key);

        if (~index) {
          this.__entries__[index][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */


      class_1.prototype.delete = function (key) {
        var entries = this.__entries__;
        var index = getIndex(entries, key);

        if (~index) {
          entries.splice(index, 1);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */


      class_1.prototype.has = function (key) {
        return !!~getIndex(this.__entries__, key);
      };
      /**
       * @returns {void}
       */


      class_1.prototype.clear = function () {
        this.__entries__.splice(0);
      };
      /**
       * @param {Function} callback
       * @param {*} [ctx=null]
       * @returns {void}
       */


      class_1.prototype.forEach = function (callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }

        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };

      return class_1;
    }()
  );
}();
/**
 * Detects whether window and document objects are available in current environment.
 */


var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document; // Returns global object of a current environment.

var global$1 = function () {
  if (typeof global !== 'undefined' && global.Math === Math) {
    return global;
  }

  if (typeof self !== 'undefined' && self.Math === Math) {
    return self;
  }

  if (typeof window !== 'undefined' && window.Math === Math) {
    return window;
  } // eslint-disable-next-line no-new-func


  return Function('return this')();
}();
/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */


var requestAnimationFrame$1 = function () {
  if (typeof requestAnimationFrame === 'function') {
    // It's required to use a bounded function because IE sometimes throws
    // an "Invalid calling object" error if rAF is invoked without the global
    // object on the left hand side.
    return requestAnimationFrame.bind(global$1);
  }

  return function (callback) {
    return setTimeout(function () {
      return callback(Date.now());
    }, 1000 / 60);
  };
}(); // Defines minimum timeout before adding a trailing call.


var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */

function throttle(callback, delay) {
  var leadingCall = false,
      trailingCall = false,
      lastCallTime = 0;
  /**
   * Invokes the original callback function and schedules new invocation if
   * the "proxy" was called during current request.
   *
   * @returns {void}
   */

  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }

    if (trailingCall) {
      proxy();
    }
  }
  /**
   * Callback invoked after the specified delay. It will further postpone
   * invocation of the original function delegating it to the
   * requestAnimationFrame.
   *
   * @returns {void}
   */


  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  /**
   * Schedules invocation of the original function.
   *
   * @returns {void}
   */


  function proxy() {
    var timeStamp = Date.now();

    if (leadingCall) {
      // Reject immediately following calls.
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      } // Schedule new call to be in invoked when the pending one is resolved.
      // This is important for "transitions" which never actually start
      // immediately so there is a chance that we might miss one if change
      // happens amids the pending invocation.


      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }

    lastCallTime = timeStamp;
  }

  return proxy;
} // Minimum delay before invoking the update of observers.


var REFRESH_DELAY = 20; // A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.

var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight']; // Check if MutationObserver is available.

var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */

var ResizeObserverController =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserverController.
   *
   * @private
   */
  function ResizeObserverController() {
    /**
     * Indicates whether DOM listeners have been added.
     *
     * @private {boolean}
     */
    this.connected_ = false;
    /**
     * Tells that controller has subscribed for Mutation Events.
     *
     * @private {boolean}
     */

    this.mutationEventsAdded_ = false;
    /**
     * Keeps reference to the instance of MutationObserver.
     *
     * @private {MutationObserver}
     */

    this.mutationsObserver_ = null;
    /**
     * A list of connected observers.
     *
     * @private {Array<ResizeObserverSPI>}
     */

    this.observers_ = [];
    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
  }
  /**
   * Adds observer to observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be added.
   * @returns {void}
   */


  ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
      this.observers_.push(observer);
    } // Add listeners if they haven't been added yet.


    if (!this.connected_) {
      this.connect_();
    }
  };
  /**
   * Removes observer from observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be removed.
   * @returns {void}
   */


  ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer); // Remove observer if it's present in registry.

    if (~index) {
      observers.splice(index, 1);
    } // Remove listeners if controller has no connected observers.


    if (!observers.length && this.connected_) {
      this.disconnect_();
    }
  };
  /**
   * Invokes the update of observers. It will continue running updates insofar
   * it detects changes.
   *
   * @returns {void}
   */


  ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_(); // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.

    if (changesDetected) {
      this.refresh();
    }
  };
  /**
   * Updates every observer from observers list and notifies them of queued
   * entries.
   *
   * @private
   * @returns {boolean} Returns "true" if any observer has detected changes in
   *      dimensions of it's elements.
   */


  ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
      return observer.gatherActive(), observer.hasActive();
    }); // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.

    activeObservers.forEach(function (observer) {
      return observer.broadcastActive();
    });
    return activeObservers.length > 0;
  };
  /**
   * Initializes DOM listeners.
   *
   * @private
   * @returns {void}
   */


  ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
      return;
    } // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.


    document.addEventListener('transitionend', this.onTransitionEnd_);
    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
      this.mutationsObserver_ = new MutationObserver(this.refresh);
      this.mutationsObserver_.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    } else {
      document.addEventListener('DOMSubtreeModified', this.refresh);
      this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
  };
  /**
   * Removes DOM listeners.
   *
   * @private
   * @returns {void}
   */


  ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
      return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
      this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
      document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
  };
  /**
   * "Transitionend" event handler.
   *
   * @private
   * @param {TransitionEvent} event
   * @returns {void}
   */


  ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
    var _b = _a.propertyName,
        propertyName = _b === void 0 ? '' : _b; // Detect whether transition may affect dimensions of an element.

    var isReflowProperty = transitionKeys.some(function (key) {
      return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
      this.refresh();
    }
  };
  /**
   * Returns instance of the ResizeObserverController.
   *
   * @returns {ResizeObserverController}
   */


  ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
      this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
  };
  /**
   * Holds reference to the controller's instance.
   *
   * @private {ResizeObserverController}
   */


  ResizeObserverController.instance_ = null;
  return ResizeObserverController;
}();
/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */


var defineConfigurable = function (target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }

  return target;
};
/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */


var getWindowOf = function (target) {
  // Assume that the element is an instance of Node, which means that it
  // has the "ownerDocument" property from which we can retrieve a
  // corresponding global object.
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView; // Return the local global object if it's not possible extract one from
  // provided element.

  return ownerGlobal || global$1;
}; // Placeholder of an empty content rectangle.


var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */

function toFloat(value) {
  return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */


function getBordersSize(styles) {
  var positions = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }

  return positions.reduce(function (size, position) {
    var value = styles['border-' + position + '-width'];
    return size + toFloat(value);
  }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */


function getPaddings(styles) {
  var positions = ['top', 'right', 'bottom', 'left'];
  var paddings = {};

  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles['padding-' + position];
    paddings[position] = toFloat(value);
  }

  return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */


function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */


function getHTMLElementContentRect(target) {
  // Client width & height properties can't be
  // used exclusively as they provide rounded values.
  var clientWidth = target.clientWidth,
      clientHeight = target.clientHeight; // By this condition we can catch all non-replaced inline, hidden and
  // detached elements. Though elements with width & height properties less
  // than 0.5 will be discarded as well.
  //
  // Without it we would need to implement separate methods for each of
  // those cases and it's not possible to perform a precise and performance
  // effective test for hidden elements. E.g. even jQuery's ':visible' filter
  // gives wrong results for elements with width & height less than 0.5.

  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }

  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom; // Computed styles of width & height are being used because they are the
  // only dimensions available to JS that contain non-rounded values. It could
  // be possible to utilize the getBoundingClientRect if only it's data wasn't
  // affected by CSS transformations let alone paddings, borders and scroll bars.

  var width = toFloat(styles.width),
      height = toFloat(styles.height); // Width & height include paddings and borders when the 'border-box' box
  // model is applied (except for IE).

  if (styles.boxSizing === 'border-box') {
    // Following conditions are required to handle Internet Explorer which
    // doesn't include paddings and borders to computed CSS dimensions.
    //
    // We can say that if CSS dimensions + paddings are equal to the "client"
    // properties then it's either IE, and thus we don't need to subtract
    // anything, or an element merely doesn't have paddings/borders styles.
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, 'left', 'right') + horizPad;
    }

    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
    }
  } // Following steps can't be applied to the document's root element as its
  // client[Width/Height] properties represent viewport area of the window.
  // Besides, it's as well not necessary as the <html> itself neither has
  // rendered scroll bars nor it can be clipped.


  if (!isDocumentElement(target)) {
    // In some browsers (only in Firefox, actually) CSS width & height
    // include scroll bars size which can be removed at this step as scroll
    // bars are the only difference between rounded dimensions + paddings
    // and "client" properties, though that is not always true in Chrome.
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight; // Chrome has a rather weird rounding of "client" properties.
    // E.g. for an element with content width of 314.2px it sometimes gives
    // the client width of 315px and for the width of 314.7px it may give
    // 314px. And it doesn't happen all the time. So just ignore this delta
    // as a non-relevant.

    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }

    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }

  return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */


var isSVGGraphicsElement = function () {
  // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
  // interface.
  if (typeof SVGGraphicsElement !== 'undefined') {
    return function (target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  } // If it's so, then check that element is at least an instance of the
  // SVGElement and that it has the "getBBox" method.
  // eslint-disable-next-line no-extra-parens


  return function (target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function';
  };
}();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */


function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */


function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }

  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }

  return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */


function createReadOnlyRect(_a) {
  var x = _a.x,
      y = _a.y,
      width = _a.width,
      height = _a.height; // If DOMRectReadOnly is available use it as a prototype for the rectangle.

  var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype); // Rectangle's properties are not writable and non-enumerable.

  defineConfigurable(rect, {
    x: x,
    y: y,
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });
  return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */


function createRectInit(x, y, width, height) {
  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}
/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */


var ResizeObservation =
/** @class */
function () {
  /**
   * Creates an instance of ResizeObservation.
   *
   * @param {Element} target - Element to be observed.
   */
  function ResizeObservation(target) {
    /**
     * Broadcasted width of content rectangle.
     *
     * @type {number}
     */
    this.broadcastWidth = 0;
    /**
     * Broadcasted height of content rectangle.
     *
     * @type {number}
     */

    this.broadcastHeight = 0;
    /**
     * Reference to the last observed content rectangle.
     *
     * @private {DOMRectInit}
     */

    this.contentRect_ = createRectInit(0, 0, 0, 0);
    this.target = target;
  }
  /**
   * Updates content rectangle and tells whether it's width or height properties
   * have changed since the last broadcast.
   *
   * @returns {boolean}
   */


  ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);
    this.contentRect_ = rect;
    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
  };
  /**
   * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
   * from the corresponding properties of the last observed content rectangle.
   *
   * @returns {DOMRectInit} Last observed content rectangle.
   */


  ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;
    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;
    return rect;
  };

  return ResizeObservation;
}();

var ResizeObserverEntry =
/** @class */
function () {
  /**
   * Creates an instance of ResizeObserverEntry.
   *
   * @param {Element} target - Element that is being observed.
   * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
   */
  function ResizeObserverEntry(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit); // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.

    defineConfigurable(this, {
      target: target,
      contentRect: contentRect
    });
  }

  return ResizeObserverEntry;
}();

var ResizeObserverSPI =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback function that is invoked
   *      when one of the observed elements changes it's content dimensions.
   * @param {ResizeObserverController} controller - Controller instance which
   *      is responsible for the updates of observer.
   * @param {ResizeObserver} callbackCtx - Reference to the public
   *      ResizeObserver instance which will be passed to callback function.
   */
  function ResizeObserverSPI(callback, controller, callbackCtx) {
    /**
     * Collection of resize observations that have detected changes in dimensions
     * of elements.
     *
     * @private {Array<ResizeObservation>}
     */
    this.activeObservations_ = [];
    /**
     * Registry of the ResizeObservation instances.
     *
     * @private {Map<Element, ResizeObservation>}
     */

    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
      throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
  }
  /**
   * Starts observing provided element.
   *
   * @param {Element} target - Element to be observed.
   * @returns {void}
   */


  ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    } // Do nothing if current environment doesn't have the Element interface.


    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_; // Do nothing if element is already being observed.

    if (observations.has(target)) {
      return;
    }

    observations.set(target, new ResizeObservation(target));
    this.controller_.addObserver(this); // Force the update of observations.

    this.controller_.refresh();
  };
  /**
   * Stops observing provided element.
   *
   * @param {Element} target - Element to stop observing.
   * @returns {void}
   */


  ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    } // Do nothing if current environment doesn't have the Element interface.


    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_; // Do nothing if element is not being observed.

    if (!observations.has(target)) {
      return;
    }

    observations.delete(target);

    if (!observations.size) {
      this.controller_.removeObserver(this);
    }
  };
  /**
   * Stops observing all elements.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
  };
  /**
   * Collects observation instances the associated element of which has changed
   * it's content rectangle.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.gatherActive = function () {
    var _this = this;

    this.clearActive();
    this.observations_.forEach(function (observation) {
      if (observation.isActive()) {
        _this.activeObservations_.push(observation);
      }
    });
  };
  /**
   * Invokes initial callback function with a list of ResizeObserverEntry
   * instances collected from active resize observations.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
      return;
    }

    var ctx = this.callbackCtx_; // Create ResizeObserverEntry instance for every active observation.

    var entries = this.activeObservations_.map(function (observation) {
      return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });
    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
  };
  /**
   * Clears the collection of active observations.
   *
   * @returns {void}
   */


  ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
  };
  /**
   * Tells whether observer has active observations.
   *
   * @returns {boolean}
   */


  ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
  };

  return ResizeObserverSPI;
}(); // Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.


var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */

var ResizeObserver =
/** @class */
function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback that is invoked when
   *      dimensions of the observed elements change.
   */
  function ResizeObserver(callback) {
    if (!(this instanceof ResizeObserver)) {
      throw new TypeError('Cannot call a class as a function.');
    }

    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);
    observers.set(this, observer);
  }

  return ResizeObserver;
}(); // Expose public methods of ResizeObserver.


['observe', 'unobserve', 'disconnect'].forEach(function (method) {
  ResizeObserver.prototype[method] = function () {
    var _a;

    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});

var index = function () {
  // Export existing implementation if available.
  if (typeof global$1.ResizeObserver !== 'undefined') {
    return global$1.ResizeObserver;
  }

  return ResizeObserver;
}();

var _default = index;
exports.default = _default;
},{}],"../node_modules/core-js/internals/array-reduce.js":[function(require,module,exports) {
var aFunction = require('../internals/a-function');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');
var toLength = require('../internals/to-length');

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

},{"../internals/a-function":"../node_modules/core-js/internals/a-function.js","../internals/to-object":"../node_modules/core-js/internals/to-object.js","../internals/indexed-object":"../node_modules/core-js/internals/indexed-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js"}],"../node_modules/core-js/internals/engine-is-node.js":[function(require,module,exports) {

var classof = require('../internals/classof-raw');
var global = require('../internals/global');

module.exports = classof(global.process) == 'process';

},{"../internals/classof-raw":"../node_modules/core-js/internals/classof-raw.js","../internals/global":"../node_modules/core-js/internals/global.js"}],"../node_modules/core-js/modules/es.array.reduce.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $reduce = require('../internals/array-reduce').left;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var CHROME_VERSION = require('../internals/engine-v8-version');
var IS_NODE = require('../internals/engine-is-node');

var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/array-reduce":"../node_modules/core-js/internals/array-reduce.js","../internals/array-method-is-strict":"../node_modules/core-js/internals/array-method-is-strict.js","../internals/engine-v8-version":"../node_modules/core-js/internals/engine-v8-version.js","../internals/engine-is-node":"../node_modules/core-js/internals/engine-is-node.js"}],"../node_modules/core-js/modules/es.function.name.js":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var defineProperty = require('../internals/object-define-property').f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

},{"../internals/descriptors":"../node_modules/core-js/internals/descriptors.js","../internals/object-define-property":"../node_modules/core-js/internals/object-define-property.js"}],"../node_modules/core-js/internals/regexp-flags.js":[function(require,module,exports) {
'use strict';
var anObject = require('../internals/an-object');

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"../internals/an-object":"../node_modules/core-js/internals/an-object.js"}],"../node_modules/core-js/internals/regexp-sticky-helpers.js":[function(require,module,exports) {
'use strict';

var fails = require('./fails');

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

},{"./fails":"../node_modules/core-js/internals/fails.js"}],"../node_modules/core-js/internals/regexp-exec.js":[function(require,module,exports) {
'use strict';
var regexpFlags = require('./regexp-flags');
var stickyHelpers = require('./regexp-sticky-helpers');
var shared = require('./shared');

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
// eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./regexp-flags":"../node_modules/core-js/internals/regexp-flags.js","./regexp-sticky-helpers":"../node_modules/core-js/internals/regexp-sticky-helpers.js","./shared":"../node_modules/core-js/internals/shared.js"}],"../node_modules/core-js/modules/es.regexp.exec.js":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var exec = require('../internals/regexp-exec');

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

},{"../internals/export":"../node_modules/core-js/internals/export.js","../internals/regexp-exec":"../node_modules/core-js/internals/regexp-exec.js"}],"../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":[function(require,module,exports) {
'use strict';
// TODO: Remove from `core-js@4` since it's moved to entry points
require('../modules/es.regexp.exec');
var redefine = require('../internals/redefine');
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === RegExp.prototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

},{"../modules/es.regexp.exec":"../node_modules/core-js/modules/es.regexp.exec.js","../internals/redefine":"../node_modules/core-js/internals/redefine.js","../internals/fails":"../node_modules/core-js/internals/fails.js","../internals/well-known-symbol":"../node_modules/core-js/internals/well-known-symbol.js","../internals/create-non-enumerable-property":"../node_modules/core-js/internals/create-non-enumerable-property.js"}],"../node_modules/core-js/internals/advance-string-index.js":[function(require,module,exports) {
'use strict';
var charAt = require('../internals/string-multibyte').charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

},{"../internals/string-multibyte":"../node_modules/core-js/internals/string-multibyte.js"}],"../node_modules/core-js/internals/regexp-exec-abstract.js":[function(require,module,exports) {
var classof = require('./classof-raw');
var regexpExec = require('./regexp-exec');

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};


},{"./classof-raw":"../node_modules/core-js/internals/classof-raw.js","./regexp-exec":"../node_modules/core-js/internals/regexp-exec.js"}],"../node_modules/core-js/modules/es.string.match.js":[function(require,module,exports) {
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toLength = require('../internals/to-length');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"../internals/fix-regexp-well-known-symbol-logic":"../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/advance-string-index":"../node_modules/core-js/internals/advance-string-index.js","../internals/regexp-exec-abstract":"../node_modules/core-js/internals/regexp-exec-abstract.js"}],"../node_modules/core-js/internals/get-substitution.js":[function(require,module,exports) {
var toObject = require('../internals/to-object');

var floor = Math.floor;
var replace = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace.call(replacement, symbols, function (match, ch) {
    var capture;
    switch (ch.charAt(0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return str.slice(0, position);
      case "'": return str.slice(tailPos);
      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

},{"../internals/to-object":"../node_modules/core-js/internals/to-object.js"}],"../node_modules/core-js/modules/es.string.replace.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toLength = require('../internals/to-length');
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var getSubstitution = require('../internals/get-substitution');
var regExpExec = require('../internals/regexp-exec-abstract');

var max = Math.max;
var min = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
});

},{"../internals/fix-regexp-well-known-symbol-logic":"../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js","../internals/an-object":"../node_modules/core-js/internals/an-object.js","../internals/to-length":"../node_modules/core-js/internals/to-length.js","../internals/to-integer":"../node_modules/core-js/internals/to-integer.js","../internals/require-object-coercible":"../node_modules/core-js/internals/require-object-coercible.js","../internals/advance-string-index":"../node_modules/core-js/internals/advance-string-index.js","../internals/get-substitution":"../node_modules/core-js/internals/get-substitution.js","../internals/regexp-exec-abstract":"../node_modules/core-js/internals/regexp-exec-abstract.js"}],"../node_modules/simplebar/dist/simplebar.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.for-each");

require("core-js/modules/web.dom-collections.for-each");

var _canUseDom = _interopRequireDefault(require("can-use-dom"));

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _lodash2 = _interopRequireDefault(require("lodash.debounce"));

var _lodash3 = _interopRequireDefault(require("lodash.memoize"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.function.name");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SimpleBar.js - v5.3.3
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */
// Helper function to retrieve options from element attributes
var getOptions = function getOptions(obj) {
  var options = Array.prototype.reduce.call(obj, function (acc, attribute) {
    var option = attribute.name.match(/data-simplebar-(.+)/);

    if (option) {
      var key = option[1].replace(/\W+(.)/g, function (x, chr) {
        return chr.toUpperCase();
      });

      switch (attribute.value) {
        case 'true':
          acc[key] = true;
          break;

        case 'false':
          acc[key] = false;
          break;

        case undefined:
          acc[key] = true;
          break;

        default:
          acc[key] = attribute.value;
      }
    }

    return acc;
  }, {});
  return options;
};

function getElementWindow(element) {
  if (!element || !element.ownerDocument || !element.ownerDocument.defaultView) {
    return window;
  }

  return element.ownerDocument.defaultView;
}

function getElementDocument(element) {
  if (!element || !element.ownerDocument) {
    return document;
  }

  return element.ownerDocument;
}

var cachedScrollbarWidth = null;
var cachedDevicePixelRatio = null;

if (_canUseDom.default) {
  window.addEventListener('resize', function () {
    if (cachedDevicePixelRatio !== window.devicePixelRatio) {
      cachedDevicePixelRatio = window.devicePixelRatio;
      cachedScrollbarWidth = null;
    }
  });
}

function scrollbarWidth(el) {
  if (cachedScrollbarWidth === null) {
    var document = getElementDocument(el);

    if (typeof document === 'undefined') {
      cachedScrollbarWidth = 0;
      return cachedScrollbarWidth;
    }

    var body = document.body;
    var box = document.createElement('div');
    box.classList.add('simplebar-hide-scrollbar');
    body.appendChild(box);
    var width = box.getBoundingClientRect().right;
    body.removeChild(box);
    cachedScrollbarWidth = width;
  }

  return cachedScrollbarWidth;
}

var SimpleBar = /*#__PURE__*/function () {
  function SimpleBar(element, options) {
    var _this = this;

    this.onScroll = function () {
      var elWindow = getElementWindow(_this.el);

      if (!_this.scrollXTicking) {
        elWindow.requestAnimationFrame(_this.scrollX);
        _this.scrollXTicking = true;
      }

      if (!_this.scrollYTicking) {
        elWindow.requestAnimationFrame(_this.scrollY);
        _this.scrollYTicking = true;
      }
    };

    this.scrollX = function () {
      if (_this.axis.x.isOverflowing) {
        _this.showScrollbar('x');

        _this.positionScrollbar('x');
      }

      _this.scrollXTicking = false;
    };

    this.scrollY = function () {
      if (_this.axis.y.isOverflowing) {
        _this.showScrollbar('y');

        _this.positionScrollbar('y');
      }

      _this.scrollYTicking = false;
    };

    this.onMouseEnter = function () {
      _this.showScrollbar('x');

      _this.showScrollbar('y');
    };

    this.onMouseMove = function (e) {
      _this.mouseX = e.clientX;
      _this.mouseY = e.clientY;

      if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
        _this.onMouseMoveForAxis('x');
      }

      if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
        _this.onMouseMoveForAxis('y');
      }
    };

    this.onMouseLeave = function () {
      _this.onMouseMove.cancel();

      if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
        _this.onMouseLeaveForAxis('x');
      }

      if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
        _this.onMouseLeaveForAxis('y');
      }

      _this.mouseX = -1;
      _this.mouseY = -1;
    };

    this.onWindowResize = function () {
      // Recalculate scrollbarWidth in case it's a zoom
      _this.scrollbarWidth = _this.getScrollbarWidth();

      _this.hideNativeScrollbar();
    };

    this.hideScrollbars = function () {
      _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
      _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();

      if (!_this.isWithinBounds(_this.axis.y.track.rect)) {
        _this.axis.y.scrollbar.el.classList.remove(_this.classNames.visible);

        _this.axis.y.isVisible = false;
      }

      if (!_this.isWithinBounds(_this.axis.x.track.rect)) {
        _this.axis.x.scrollbar.el.classList.remove(_this.classNames.visible);

        _this.axis.x.isVisible = false;
      }
    };

    this.onPointerEvent = function (e) {
      var isWithinTrackXBounds, isWithinTrackYBounds;
      _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
      _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();

      if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
        isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
      }

      if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
        isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
      } // If any pointer event is called on the scrollbar


      if (isWithinTrackXBounds || isWithinTrackYBounds) {
        // Preventing the event's default action stops text being
        // selectable during the drag.
        e.preventDefault(); // Prevent event leaking

        e.stopPropagation();

        if (e.type === 'mousedown') {
          if (isWithinTrackXBounds) {
            _this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect();

            if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) {
              _this.onDragStart(e, 'x');
            } else {
              _this.onTrackClick(e, 'x');
            }
          }

          if (isWithinTrackYBounds) {
            _this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect();

            if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) {
              _this.onDragStart(e, 'y');
            } else {
              _this.onTrackClick(e, 'y');
            }
          }
        }
      }
    };

    this.drag = function (e) {
      var eventOffset;
      var track = _this.axis[_this.draggedAxis].track;
      var trackSize = track.rect[_this.axis[_this.draggedAxis].sizeAttr];
      var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
      var contentSize = _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollSizeAttr];
      var hostSize = parseInt(_this.elStyles[_this.axis[_this.draggedAxis].sizeAttr], 10);
      e.preventDefault();
      e.stopPropagation();

      if (_this.draggedAxis === 'y') {
        eventOffset = e.pageY;
      } else {
        eventOffset = e.pageX;
      } // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).


      var dragPos = eventOffset - track.rect[_this.axis[_this.draggedAxis].offsetAttr] - _this.axis[_this.draggedAxis].dragOffset; // Convert the mouse position into a percentage of the scrollbar height/width.

      var dragPerc = dragPos / (trackSize - scrollbar.size); // Scroll the content by the same percentage.

      var scrollPos = dragPerc * (contentSize - hostSize); // Fix browsers inconsistency on RTL

      if (_this.draggedAxis === 'x') {
        scrollPos = _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted ? scrollPos - (trackSize + scrollbar.size) : scrollPos;
        scrollPos = _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted ? -scrollPos : scrollPos;
      }

      _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
    };

    this.onEndDrag = function (e) {
      var elDocument = getElementDocument(_this.el);
      var elWindow = getElementWindow(_this.el);
      e.preventDefault();
      e.stopPropagation();

      _this.el.classList.remove(_this.classNames.dragging);

      elDocument.removeEventListener('mousemove', _this.drag, true);
      elDocument.removeEventListener('mouseup', _this.onEndDrag, true);
      _this.removePreventClickId = elWindow.setTimeout(function () {
        // Remove these asynchronously so we still suppress click events
        // generated simultaneously with mouseup.
        elDocument.removeEventListener('click', _this.preventClick, true);
        elDocument.removeEventListener('dblclick', _this.preventClick, true);
        _this.removePreventClickId = null;
      });
    };

    this.preventClick = function (e) {
      e.preventDefault();
      e.stopPropagation();
    };

    this.el = element;
    this.minScrollbarWidth = 20;
    this.options = Object.assign({}, SimpleBar.defaultOptions, {}, options);
    this.classNames = Object.assign({}, SimpleBar.defaultOptions.classNames, {}, this.options.classNames);
    this.axis = {
      x: {
        scrollOffsetAttr: 'scrollLeft',
        sizeAttr: 'width',
        scrollSizeAttr: 'scrollWidth',
        offsetSizeAttr: 'offsetWidth',
        offsetAttr: 'left',
        overflowAttr: 'overflowX',
        dragOffset: 0,
        isOverflowing: true,
        isVisible: false,
        forceVisible: false,
        track: {},
        scrollbar: {}
      },
      y: {
        scrollOffsetAttr: 'scrollTop',
        sizeAttr: 'height',
        scrollSizeAttr: 'scrollHeight',
        offsetSizeAttr: 'offsetHeight',
        offsetAttr: 'top',
        overflowAttr: 'overflowY',
        dragOffset: 0,
        isOverflowing: true,
        isVisible: false,
        forceVisible: false,
        track: {},
        scrollbar: {}
      }
    };
    this.removePreventClickId = null; // Don't re-instantiate over an existing one

    if (SimpleBar.instances.has(this.el)) {
      return;
    }

    this.recalculate = (0, _lodash.default)(this.recalculate.bind(this), 64);
    this.onMouseMove = (0, _lodash.default)(this.onMouseMove.bind(this), 64);
    this.hideScrollbars = (0, _lodash2.default)(this.hideScrollbars.bind(this), this.options.timeout);
    this.onWindowResize = (0, _lodash2.default)(this.onWindowResize.bind(this), 64, {
      leading: true
    });
    SimpleBar.getRtlHelpers = (0, _lodash3.default)(SimpleBar.getRtlHelpers);
    this.init();
  }
  /**
   * Static properties
   */

  /**
   * Helper to fix browsers inconsistency on RTL:
   *  - Firefox inverts the scrollbar initial position
   *  - IE11 inverts both scrollbar position and scrolling offset
   * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
   */


  SimpleBar.getRtlHelpers = function getRtlHelpers() {
    var dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
    var scrollbarDummyEl = dummyDiv.firstElementChild;
    document.body.appendChild(scrollbarDummyEl);
    var dummyContainerChild = scrollbarDummyEl.firstElementChild;
    scrollbarDummyEl.scrollLeft = 0;
    var dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
    var dummyContainerChildOffset = SimpleBar.getOffset(dummyContainerChild);
    scrollbarDummyEl.scrollLeft = 999;
    var dummyContainerScrollOffsetAfterScroll = SimpleBar.getOffset(dummyContainerChild);
    return {
      // determines if the scrolling is responding with negative values
      isRtlScrollingInverted: dummyContainerOffset.left !== dummyContainerChildOffset.left && dummyContainerChildOffset.left - dummyContainerScrollOffsetAfterScroll.left !== 0,
      // determines if the origin scrollbar position is inverted or not (positioned on left or right)
      isRtlScrollbarInverted: dummyContainerOffset.left !== dummyContainerChildOffset.left
    };
  };

  SimpleBar.getOffset = function getOffset(el) {
    var rect = el.getBoundingClientRect();
    var elDocument = getElementDocument(el);
    var elWindow = getElementWindow(el);
    return {
      top: rect.top + (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
      left: rect.left + (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
    };
  };

  var _proto = SimpleBar.prototype;

  _proto.init = function init() {
    // Save a reference to the instance, so we know this DOM node has already been instancied
    SimpleBar.instances.set(this.el, this); // We stop here on server-side

    if (_canUseDom.default) {
      this.initDOM();
      this.scrollbarWidth = this.getScrollbarWidth();
      this.recalculate();
      this.initListeners();
    }
  };

  _proto.initDOM = function initDOM() {
    var _this2 = this; // make sure this element doesn't have the elements yet


    if (Array.prototype.filter.call(this.el.children, function (child) {
      return child.classList.contains(_this2.classNames.wrapper);
    }).length) {
      // assume that element has his DOM already initiated
      this.wrapperEl = this.el.querySelector("." + this.classNames.wrapper);
      this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector("." + this.classNames.contentWrapper);
      this.contentEl = this.options.contentNode || this.el.querySelector("." + this.classNames.contentEl);
      this.offsetEl = this.el.querySelector("." + this.classNames.offset);
      this.maskEl = this.el.querySelector("." + this.classNames.mask);
      this.placeholderEl = this.findChild(this.wrapperEl, "." + this.classNames.placeholder);
      this.heightAutoObserverWrapperEl = this.el.querySelector("." + this.classNames.heightAutoObserverWrapperEl);
      this.heightAutoObserverEl = this.el.querySelector("." + this.classNames.heightAutoObserverEl);
      this.axis.x.track.el = this.findChild(this.el, "." + this.classNames.track + "." + this.classNames.horizontal);
      this.axis.y.track.el = this.findChild(this.el, "." + this.classNames.track + "." + this.classNames.vertical);
    } else {
      // Prepare DOM
      this.wrapperEl = document.createElement('div');
      this.contentWrapperEl = document.createElement('div');
      this.offsetEl = document.createElement('div');
      this.maskEl = document.createElement('div');
      this.contentEl = document.createElement('div');
      this.placeholderEl = document.createElement('div');
      this.heightAutoObserverWrapperEl = document.createElement('div');
      this.heightAutoObserverEl = document.createElement('div');
      this.wrapperEl.classList.add(this.classNames.wrapper);
      this.contentWrapperEl.classList.add(this.classNames.contentWrapper);
      this.offsetEl.classList.add(this.classNames.offset);
      this.maskEl.classList.add(this.classNames.mask);
      this.contentEl.classList.add(this.classNames.contentEl);
      this.placeholderEl.classList.add(this.classNames.placeholder);
      this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl);
      this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);

      while (this.el.firstChild) {
        this.contentEl.appendChild(this.el.firstChild);
      }

      this.contentWrapperEl.appendChild(this.contentEl);
      this.offsetEl.appendChild(this.contentWrapperEl);
      this.maskEl.appendChild(this.offsetEl);
      this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
      this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
      this.wrapperEl.appendChild(this.maskEl);
      this.wrapperEl.appendChild(this.placeholderEl);
      this.el.appendChild(this.wrapperEl);
    }

    if (!this.axis.x.track.el || !this.axis.y.track.el) {
      var track = document.createElement('div');
      var scrollbar = document.createElement('div');
      track.classList.add(this.classNames.track);
      scrollbar.classList.add(this.classNames.scrollbar);
      track.appendChild(scrollbar);
      this.axis.x.track.el = track.cloneNode(true);
      this.axis.x.track.el.classList.add(this.classNames.horizontal);
      this.axis.y.track.el = track.cloneNode(true);
      this.axis.y.track.el.classList.add(this.classNames.vertical);
      this.el.appendChild(this.axis.x.track.el);
      this.el.appendChild(this.axis.y.track.el);
    }

    this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector("." + this.classNames.scrollbar);
    this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector("." + this.classNames.scrollbar);

    if (!this.options.autoHide) {
      this.axis.x.scrollbar.el.classList.add(this.classNames.visible);
      this.axis.y.scrollbar.el.classList.add(this.classNames.visible);
    }

    this.el.setAttribute('data-simplebar', 'init');
  };

  _proto.initListeners = function initListeners() {
    var _this3 = this;

    var elWindow = getElementWindow(this.el); // Event listeners

    if (this.options.autoHide) {
      this.el.addEventListener('mouseenter', this.onMouseEnter);
    }

    ['mousedown', 'click', 'dblclick'].forEach(function (e) {
      _this3.el.addEventListener(e, _this3.onPointerEvent, true);
    });
    ['touchstart', 'touchend', 'touchmove'].forEach(function (e) {
      _this3.el.addEventListener(e, _this3.onPointerEvent, {
        capture: true,
        passive: true
      });
    });
    this.el.addEventListener('mousemove', this.onMouseMove);
    this.el.addEventListener('mouseleave', this.onMouseLeave);
    this.contentWrapperEl.addEventListener('scroll', this.onScroll); // Browser zoom triggers a window resize

    elWindow.addEventListener('resize', this.onWindowResize); // Hack for https://github.com/WICG/ResizeObserver/issues/38

    var resizeObserverStarted = false;
    var resizeObserver = elWindow.ResizeObserver || _resizeObserverPolyfill.default;
    this.resizeObserver = new resizeObserver(function () {
      if (!resizeObserverStarted) return;

      _this3.recalculate();
    });
    this.resizeObserver.observe(this.el);
    this.resizeObserver.observe(this.contentEl);
    elWindow.requestAnimationFrame(function () {
      resizeObserverStarted = true;
    }); // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.

    this.mutationObserver = new elWindow.MutationObserver(this.recalculate);
    this.mutationObserver.observe(this.contentEl, {
      childList: true,
      subtree: true,
      characterData: true
    });
  };

  _proto.recalculate = function recalculate() {
    var elWindow = getElementWindow(this.el);
    this.elStyles = elWindow.getComputedStyle(this.el);
    this.isRtl = this.elStyles.direction === 'rtl';
    var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
    var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1;
    var contentElOffsetWidth = this.contentEl.offsetWidth;
    var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
    var elOverflowX = this.elStyles.overflowX;
    var elOverflowY = this.elStyles.overflowY;
    this.contentEl.style.padding = this.elStyles.paddingTop + " " + this.elStyles.paddingRight + " " + this.elStyles.paddingBottom + " " + this.elStyles.paddingLeft;
    this.wrapperEl.style.margin = "-" + this.elStyles.paddingTop + " -" + this.elStyles.paddingRight + " -" + this.elStyles.paddingBottom + " -" + this.elStyles.paddingLeft;
    var contentElScrollHeight = this.contentEl.scrollHeight;
    var contentElScrollWidth = this.contentEl.scrollWidth;
    this.contentWrapperEl.style.height = isHeightAuto ? 'auto' : '100%'; // Determine placeholder size

    this.placeholderEl.style.width = isWidthAuto ? contentElOffsetWidth + "px" : 'auto';
    this.placeholderEl.style.height = contentElScrollHeight + "px";
    var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
    this.axis.x.isOverflowing = contentElScrollWidth > contentElOffsetWidth;
    this.axis.y.isOverflowing = contentElScrollHeight > contentWrapperElOffsetHeight; // Set isOverflowing to false if user explicitely set hidden overflow

    this.axis.x.isOverflowing = elOverflowX === 'hidden' ? false : this.axis.x.isOverflowing;
    this.axis.y.isOverflowing = elOverflowY === 'hidden' ? false : this.axis.y.isOverflowing;
    this.axis.x.forceVisible = this.options.forceVisible === 'x' || this.options.forceVisible === true;
    this.axis.y.forceVisible = this.options.forceVisible === 'y' || this.options.forceVisible === true;
    this.hideNativeScrollbar(); // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)

    var offsetForXScrollbar = this.axis.x.isOverflowing ? this.scrollbarWidth : 0;
    var offsetForYScrollbar = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
    this.axis.x.isOverflowing = this.axis.x.isOverflowing && contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
    this.axis.y.isOverflowing = this.axis.y.isOverflowing && contentElScrollHeight > contentWrapperElOffsetHeight - offsetForXScrollbar;
    this.axis.x.scrollbar.size = this.getScrollbarSize('x');
    this.axis.y.scrollbar.size = this.getScrollbarSize('y');
    this.axis.x.scrollbar.el.style.width = this.axis.x.scrollbar.size + "px";
    this.axis.y.scrollbar.el.style.height = this.axis.y.scrollbar.size + "px";
    this.positionScrollbar('x');
    this.positionScrollbar('y');
    this.toggleTrackVisibility('x');
    this.toggleTrackVisibility('y');
  }
  /**
   * Calculate scrollbar size
   */
  ;

  _proto.getScrollbarSize = function getScrollbarSize(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    if (!this.axis[axis].isOverflowing) {
      return 0;
    }

    var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
    var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
    var scrollbarSize;
    var scrollbarRatio = trackSize / contentSize; // Calculate new height/position of drag handle.

    scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);

    if (this.options.scrollbarMaxSize) {
      scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
    }

    return scrollbarSize;
  };

  _proto.positionScrollbar = function positionScrollbar(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    if (!this.axis[axis].isOverflowing) {
      return;
    }

    var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
    var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
    var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
    var scrollbar = this.axis[axis].scrollbar;
    var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
    scrollOffset = axis === 'x' && this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted ? -scrollOffset : scrollOffset;
    var scrollPourcent = scrollOffset / (contentSize - hostSize);
    var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
    handleOffset = axis === 'x' && this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted ? handleOffset + (trackSize - scrollbar.size) : handleOffset;
    scrollbar.el.style.transform = axis === 'x' ? "translate3d(" + handleOffset + "px, 0, 0)" : "translate3d(0, " + handleOffset + "px, 0)";
  };

  _proto.toggleTrackVisibility = function toggleTrackVisibility(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    var track = this.axis[axis].track.el;
    var scrollbar = this.axis[axis].scrollbar.el;

    if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
      track.style.visibility = 'visible';
      this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'scroll';
    } else {
      track.style.visibility = 'hidden';
      this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'hidden';
    } // Even if forceVisible is enabled, scrollbar itself should be hidden


    if (this.axis[axis].isOverflowing) {
      scrollbar.style.display = 'block';
    } else {
      scrollbar.style.display = 'none';
    }
  };

  _proto.hideNativeScrollbar = function hideNativeScrollbar() {
    this.offsetEl.style[this.isRtl ? 'left' : 'right'] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-" + this.scrollbarWidth + "px" : 0;
    this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-" + this.scrollbarWidth + "px" : 0;
  }
  /**
   * On scroll event handling
   */
  ;

  _proto.onMouseMoveForAxis = function onMouseMoveForAxis(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    this.axis[axis].track.rect = this.axis[axis].track.el.getBoundingClientRect();
    this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
    var isWithinScrollbarBoundsX = this.isWithinBounds(this.axis[axis].scrollbar.rect);

    if (isWithinScrollbarBoundsX) {
      this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
    } else {
      this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
    }

    if (this.isWithinBounds(this.axis[axis].track.rect)) {
      this.showScrollbar(axis);
      this.axis[axis].track.el.classList.add(this.classNames.hover);
    } else {
      this.axis[axis].track.el.classList.remove(this.classNames.hover);
    }
  };

  _proto.onMouseLeaveForAxis = function onMouseLeaveForAxis(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    this.axis[axis].track.el.classList.remove(this.classNames.hover);
    this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
  };
  /**
   * Show scrollbar
   */


  _proto.showScrollbar = function showScrollbar(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    var scrollbar = this.axis[axis].scrollbar.el;

    if (!this.axis[axis].isVisible) {
      scrollbar.classList.add(this.classNames.visible);
      this.axis[axis].isVisible = true;
    }

    if (this.options.autoHide) {
      this.hideScrollbars();
    }
  }
  /**
   * Hide Scrollbar
   */
  ;
  /**
   * on scrollbar handle drag movement starts
   */


  _proto.onDragStart = function onDragStart(e, axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    var elDocument = getElementDocument(this.el);
    var elWindow = getElementWindow(this.el);
    var scrollbar = this.axis[axis].scrollbar; // Measure how far the user's mouse is from the top of the scrollbar drag handle.

    var eventOffset = axis === 'y' ? e.pageY : e.pageX;
    this.axis[axis].dragOffset = eventOffset - scrollbar.rect[this.axis[axis].offsetAttr];
    this.draggedAxis = axis;
    this.el.classList.add(this.classNames.dragging);
    elDocument.addEventListener('mousemove', this.drag, true);
    elDocument.addEventListener('mouseup', this.onEndDrag, true);

    if (this.removePreventClickId === null) {
      elDocument.addEventListener('click', this.preventClick, true);
      elDocument.addEventListener('dblclick', this.preventClick, true);
    } else {
      elWindow.clearTimeout(this.removePreventClickId);
      this.removePreventClickId = null;
    }
  }
  /**
   * Drag scrollbar handle
   */
  ;

  _proto.onTrackClick = function onTrackClick(e, axis) {
    var _this4 = this;

    if (axis === void 0) {
      axis = 'y';
    }

    if (!this.options.clickOnTrack) return;
    var elWindow = getElementWindow(this.el);
    this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
    var scrollbar = this.axis[axis].scrollbar;
    var scrollbarOffset = scrollbar.rect[this.axis[axis].offsetAttr];
    var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
    var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
    var t = axis === 'y' ? this.mouseY - scrollbarOffset : this.mouseX - scrollbarOffset;
    var dir = t < 0 ? -1 : 1;
    var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;

    var scrollTo = function scrollTo() {
      if (dir === -1) {
        if (scrolled > scrollSize) {
          var _this4$contentWrapper;

          scrolled -= _this4.options.clickOnTrackSpeed;

          _this4.contentWrapperEl.scrollTo((_this4$contentWrapper = {}, _this4$contentWrapper[_this4.axis[axis].offsetAttr] = scrolled, _this4$contentWrapper));

          elWindow.requestAnimationFrame(scrollTo);
        }
      } else {
        if (scrolled < scrollSize) {
          var _this4$contentWrapper2;

          scrolled += _this4.options.clickOnTrackSpeed;

          _this4.contentWrapperEl.scrollTo((_this4$contentWrapper2 = {}, _this4$contentWrapper2[_this4.axis[axis].offsetAttr] = scrolled, _this4$contentWrapper2));

          elWindow.requestAnimationFrame(scrollTo);
        }
      }
    };

    scrollTo();
  }
  /**
   * Getter for content element
   */
  ;

  _proto.getContentElement = function getContentElement() {
    return this.contentEl;
  }
  /**
   * Getter for original scrolling element
   */
  ;

  _proto.getScrollElement = function getScrollElement() {
    return this.contentWrapperEl;
  };

  _proto.getScrollbarWidth = function getScrollbarWidth() {
    // Try/catch for FF 56 throwing on undefined computedStyles
    try {
      // Detect browsers supporting CSS scrollbar styling and do not calculate
      if (getComputedStyle(this.contentWrapperEl, '::-webkit-scrollbar').display === 'none' || 'scrollbarWidth' in document.documentElement.style || '-ms-overflow-style' in document.documentElement.style) {
        return 0;
      } else {
        return scrollbarWidth(this.el);
      }
    } catch (e) {
      return scrollbarWidth(this.el);
    }
  };

  _proto.removeListeners = function removeListeners() {
    var _this5 = this;

    var elWindow = getElementWindow(this.el); // Event listeners

    if (this.options.autoHide) {
      this.el.removeEventListener('mouseenter', this.onMouseEnter);
    }

    ['mousedown', 'click', 'dblclick'].forEach(function (e) {
      _this5.el.removeEventListener(e, _this5.onPointerEvent, true);
    });
    ['touchstart', 'touchend', 'touchmove'].forEach(function (e) {
      _this5.el.removeEventListener(e, _this5.onPointerEvent, {
        capture: true,
        passive: true
      });
    });
    this.el.removeEventListener('mousemove', this.onMouseMove);
    this.el.removeEventListener('mouseleave', this.onMouseLeave);

    if (this.contentWrapperEl) {
      this.contentWrapperEl.removeEventListener('scroll', this.onScroll);
    }

    elWindow.removeEventListener('resize', this.onWindowResize);

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    } // Cancel all debounced functions


    this.recalculate.cancel();
    this.onMouseMove.cancel();
    this.hideScrollbars.cancel();
    this.onWindowResize.cancel();
  }
  /**
   * UnMount mutation observer and delete SimpleBar instance from DOM element
   */
  ;

  _proto.unMount = function unMount() {
    this.removeListeners();
    SimpleBar.instances.delete(this.el);
  }
  /**
   * Check if mouse is within bounds
   */
  ;

  _proto.isWithinBounds = function isWithinBounds(bbox) {
    return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
  }
  /**
   * Find element children matches query
   */
  ;

  _proto.findChild = function findChild(el, query) {
    var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    return Array.prototype.filter.call(el.children, function (child) {
      return matches.call(child, query);
    })[0];
  };

  return SimpleBar;
}();

SimpleBar.defaultOptions = {
  autoHide: true,
  forceVisible: false,
  clickOnTrack: true,
  clickOnTrackSpeed: 40,
  classNames: {
    contentEl: 'simplebar-content',
    contentWrapper: 'simplebar-content-wrapper',
    offset: 'simplebar-offset',
    mask: 'simplebar-mask',
    wrapper: 'simplebar-wrapper',
    placeholder: 'simplebar-placeholder',
    scrollbar: 'simplebar-scrollbar',
    track: 'simplebar-track',
    heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
    heightAutoObserverEl: 'simplebar-height-auto-observer',
    visible: 'simplebar-visible',
    horizontal: 'simplebar-horizontal',
    vertical: 'simplebar-vertical',
    hover: 'simplebar-hover',
    dragging: 'simplebar-dragging'
  },
  scrollbarMinSize: 25,
  scrollbarMaxSize: 0,
  timeout: 1000
};
SimpleBar.instances = new WeakMap();

SimpleBar.initDOMLoadedElements = function () {
  document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
  window.removeEventListener('load', this.initDOMLoadedElements);
  Array.prototype.forEach.call(document.querySelectorAll('[data-simplebar]'), function (el) {
    if (el.getAttribute('data-simplebar') !== 'init' && !SimpleBar.instances.has(el)) new SimpleBar(el, getOptions(el.attributes));
  });
};

SimpleBar.removeObserver = function () {
  this.globalObserver.disconnect();
};

SimpleBar.initHtmlApi = function () {
  this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this); // MutationObserver is IE11+

  if (typeof MutationObserver !== 'undefined') {
    // Mutation observer to observe dynamically added elements
    this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
    this.globalObserver.observe(document, {
      childList: true,
      subtree: true
    });
  } // Taken from jQuery `ready` function
  // Instantiate elements already present on the page


  if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
    // Handle it asynchronously to allow scripts the opportunity to delay init
    window.setTimeout(this.initDOMLoadedElements);
  } else {
    document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
    window.addEventListener('load', this.initDOMLoadedElements);
  }
};

SimpleBar.handleMutations = function (mutations) {
  mutations.forEach(function (mutation) {
    Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
      if (addedNode.nodeType === 1) {
        if (addedNode.hasAttribute('data-simplebar')) {
          !SimpleBar.instances.has(addedNode) && new SimpleBar(addedNode, getOptions(addedNode.attributes));
        } else {
          Array.prototype.forEach.call(addedNode.querySelectorAll('[data-simplebar]'), function (el) {
            if (el.getAttribute('data-simplebar') !== 'init' && !SimpleBar.instances.has(el)) new SimpleBar(el, getOptions(el.attributes));
          });
        }
      }
    });
    Array.prototype.forEach.call(mutation.removedNodes, function (removedNode) {
      if (removedNode.nodeType === 1) {
        if (removedNode.hasAttribute('[data-simplebar="init"]')) {
          SimpleBar.instances.has(removedNode) && SimpleBar.instances.get(removedNode).unMount();
        } else {
          Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), function (el) {
            SimpleBar.instances.has(el) && SimpleBar.instances.get(el).unMount();
          });
        }
      }
    });
  });
};

SimpleBar.getOptions = getOptions;
/**
 * HTML API
 * Called only in a browser env.
 */

if (_canUseDom.default) {
  SimpleBar.initHtmlApi();
}

var _default = SimpleBar;
exports.default = _default;
},{"core-js/modules/es.array.for-each":"../node_modules/core-js/modules/es.array.for-each.js","core-js/modules/web.dom-collections.for-each":"../node_modules/core-js/modules/web.dom-collections.for-each.js","can-use-dom":"../node_modules/can-use-dom/index.js","core-js/modules/es.array.filter":"../node_modules/core-js/modules/es.array.filter.js","core-js/modules/es.array.iterator":"../node_modules/core-js/modules/es.array.iterator.js","core-js/modules/es.object.assign":"../node_modules/core-js/modules/es.object.assign.js","core-js/modules/es.object.to-string":"../node_modules/core-js/modules/es.object.to-string.js","core-js/modules/es.parse-int":"../node_modules/core-js/modules/es.parse-int.js","core-js/modules/es.string.iterator":"../node_modules/core-js/modules/es.string.iterator.js","core-js/modules/es.weak-map":"../node_modules/core-js/modules/es.weak-map.js","core-js/modules/web.dom-collections.iterator":"../node_modules/core-js/modules/web.dom-collections.iterator.js","lodash.throttle":"../node_modules/lodash.throttle/index.js","lodash.debounce":"../node_modules/lodash.debounce/index.js","lodash.memoize":"../node_modules/lodash.memoize/index.js","resize-observer-polyfill":"../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js","core-js/modules/es.array.reduce":"../node_modules/core-js/modules/es.array.reduce.js","core-js/modules/es.function.name":"../node_modules/core-js/modules/es.function.name.js","core-js/modules/es.regexp.exec":"../node_modules/core-js/modules/es.regexp.exec.js","core-js/modules/es.string.match":"../node_modules/core-js/modules/es.string.match.js","core-js/modules/es.string.replace":"../node_modules/core-js/modules/es.string.replace.js"}],"js/modules/initForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initForm = void 0;

var _sockjs = _interopRequireDefault(require("../sockets/sockjs.min"));

var _stomp = require("../sockets/stomp.min");

var _StringUtils = require("../utils/StringUtils");

var _simplebar = _interopRequireDefault(require("simplebar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainForm = document.querySelector("#main_url");
var titleInput = document.querySelector("#input-title");
var urlInput = document.querySelector("#input-url");
var mainTextarea = document.querySelector("#textarea-main");
var consoleContainer = document.querySelector(".console-container");
var codeBlock = document.querySelector(".mockup-code");
var consoleWindow = document.querySelector("#console");
var iframeBlock = document.querySelector(".iframe-block");
var infoBlock = document.querySelector(".info");
var objectivesBlock = document.querySelector(".objectives-block");
var stompClient = null;
var uuid = (0, _StringUtils.create_UUID)();
var scroll;

function connect() {
  var socket = new _sockjs.default("https://api.autotests.cloud/ws"); // todo add exception
  // const socket = new SockJS("http://localhost:8080/ws"); // todo add exception

  stompClient = _stomp.Stomp.over(socket);
  stompClient.connect({}, function (status) {
    console.log("Connected: " + status);
    stompClient.subscribe("/topic/".concat(uuid), function (message) {
      console.log("Message: " + message); // todo add exception

      addSocketEvent(JSON.parse(message.body));
    });
  });
}

function addSocketEvent(message) {
  var scrollContent = document.querySelector(".simplebar-content");
  var pre = document.createElement("pre");
  pre.setAttribute("data-prefix", message.prefix);

  switch (message.contentType) {
    case "info":
      pre.className = "list-auto flex";
      pre.innerHTML = "<code>".concat(message.content, "</code>");
      break;

    case "generated":
      pre.className = "text-warning flex";
      pre.innerHTML = "<code>".concat(message.content, "<a target=\"_blank\" class=\"green-link\" href=\"").concat(message.url, "\">").concat(message.urlText, "</a></div></code>");
      break;

    case "launched":
      pre.className = "text-warning flex";
      pre.innerHTML = "<code>".concat(message.content, "<a target=\"_blank\" class=\"green-link\" href=\"").concat(message.url, "\">").concat(message.urlText, "</a> </code> <label class=\"loader\"></label>");
      break;

    case "finished":
      pre.className = "text-warning flex";
      pre.innerHTML = "<code>".concat(message.content, "<a target=\"_blank\" class=\"green-link\" href=\"").concat(message.url, "\">").concat(message.urlText, "</a></div></code>");
      document.querySelector(".loader").remove();
      break;

    case "in progress":
      pre.className = "text-warning flex";
      pre.innerHTML = "<code>".concat(message.content, " </code>");
      break;

    case "can-automate":
      pre.className = "flex";
      pre.innerHTML = "<code>".concat(message.content, "</code>");
      break;

    case "telegram-info":
      pre.className = "flex";
      pre.innerHTML = "<code>".concat(message.content, "<a target=\"_blank\" class=\"blue-link\" href=\"").concat(message.url, "\">").concat(message.urlText, "</a> \uD83D\uDC48</code>");
      break;

    case "telegram-notification":
      pre.className = "flex";
      pre.innerHTML = "<code> </code>";
      displayNotification(message.content);
      break;

    case "empty":
      pre.className = "list-auto flex";
      pre.innerHTML = "<code> </code>";
      break;

    case "error":
      pre.className = "text-error flex";
      pre.innerHTML = "<code>".concat(message.content, "</code>");
      break;
  }

  scrollContent.append(pre);
  scroll.getScrollElement().scrollTo({
    top: 5000,
    behavior: "smooth"
  });
}

function displayNotification(messagePath) {
  iframeBlock.innerHTML = "<iframe id=\"telegram-post-autotests_cloud-17\" class=\"telegram-iframe w-full h-full h-80\"\n          src=\"https://t.me/".concat(messagePath, "?embed=1&discussion=1&comments_limit=5&dark=1\"></iframe>");
}

var initForm = function initForm() {
  connect();

  function submitForm(event) {
    event.preventDefault();
    var formData = new FormData(mainForm);
    var values = Object.fromEntries(formData.entries());

    if (values.url && values["g-recaptcha-response"]) {
      // if (values.url) {
      values.price = "free";
      values.email = "admin@qa.guru";
      values.captcha = values["g-recaptcha-response"];
      delete values["g-recaptcha-response"];
      console.log(values);
      stompClient.send("/app/orders/".concat(uuid), {}, JSON.stringify(values));
      consoleContainer.classList.remove("hidden");
      mainForm.classList.add("hidden");
      infoBlock.classList.add("hidden");
      objectivesBlock.classList.remove("objectives-block--disabled"); // document
      //   .querySelector("#telegram-post-autotests_cloud-17")
      //   .classList.remove("hidden");

      scroll = new _simplebar.default(consoleWindow, {
        autoHide: false
      });

      function add() {
        var pre = document.createElement("pre");
        var scrollContent = document.querySelector(".simplebar-content");
        pre.setAttribute("data-prefix", "$");
        pre.innerHTML = "<code>npm i daisyui</code>";
        scrollContent.append(pre);
        scroll.getScrollElement().scrollTo({
          top: 5000,
          behavior: "smooth"
        }); // scroll.getScrollElement().scrollTop = scroll.getScrollElement().scrollHeight;
      } // window.setInterval(add, 2500);


      mainForm.reset();
    } else {
      // if (!mainTextarea.value) {
      //   mainTextarea.classList.add("border-red-500");
      // }
      // if (!titleInput.value) {
      //   titleInput.classList.add("border-red-500");
      // }
      if (!urlInput.value) {
        urlInput.classList.add("border-red-500");
      }

      setTimeout(function () {
        // mainTextarea.classList.remove("border-red-500");
        // titleInput.classList.remove("border-red-500");
        urlInput.classList.remove("border-red-500");
      }, 2000);
    }
  }

  mainForm.addEventListener("submit", submitForm);
};

exports.initForm = initForm;
},{"../sockets/sockjs.min":"js/sockets/sockjs.min.js","../sockets/stomp.min":"js/sockets/stomp.min.js","../utils/StringUtils":"js/utils/StringUtils.js","simplebar":"../node_modules/simplebar/dist/simplebar.esm.js"}],"js/modules/AbstractComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractComponent = void 0;

var _StringUtils = require("../utils/StringUtils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AbstractComponent = /*#__PURE__*/function () {
  function AbstractComponent() {
    _classCallCheck(this, AbstractComponent);

    this._element = null;
  }

  _createClass(AbstractComponent, [{
    key: "getElement",
    value: function getElement() {
      if (!this._element) {
        this._element = (0, _StringUtils.createElement)(this.getTemplate());
      }

      return this._element;
    }
  }, {
    key: "removeElement",
    value: function removeElement() {
      if (this._element) {
        this._element = null;
      }
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      throw Error("Abstract method not implemented");
    }
  }, {
    key: "addEvent",
    value: function addEvent(eventName, callback) {
      this.getElement().addEventListener(eventName, callback);
    }
  }]);

  return AbstractComponent;
}();

exports.AbstractComponent = AbstractComponent;
},{"../utils/StringUtils":"js/utils/StringUtils.js"}],"js/modules/Testcase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Testcase = void 0;

var _AbstractComponent2 = require("./AbstractComponent");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Testcase = /*#__PURE__*/function (_AbstractComponent) {
  _inherits(Testcase, _AbstractComponent);

  var _super = _createSuper(Testcase);

  function Testcase(number) {
    var _this;

    _classCallCheck(this, Testcase);

    _this = _super.call(this);
    _this._number = number;
    _this._addRemoveButton = _this._addRemoveButton();
    return _this;
  }

  _createClass(Testcase, [{
    key: "_addRemoveButton",
    value: function _addRemoveButton() {
      var _this2 = this;

      var removeButton = this.getElement().querySelector("button");
      removeButton.addEventListener("click", function () {
        _this2._element.remove();
      });
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      return "<fieldset class=\"testcase testcase--added mb-4\">\n    <div class=\"form-control mb-4\">        \n        <div class=\"flex space-x-2\">\n        <input type=\"text\" placeholder=\"Name your test case\" class=\"input input-bordered w-full\"\n        name=\"testcase_".concat(this._number, "\">\n            <button class=\"btn btn--red\" onclick=\"event.preventDefault()\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"\n                    class=\"inline-block w-4 h-4 stroke-current\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n                        d=\"M6 18L18 6M6 6l12 12\"></path>\n                </svg>\n            </button>\n        </div>\n    </div>\n\n    <div class=\"form-control form-control--scenario\">\n        <textarea class=\"textarea textarea--real relative textarea-bordered h-36 max-h-44 mb-4\"\n            placeholder=\"scenario-").concat(this._number, "\" name=\"scenario_").concat(this._number, "\"></textarea>\n    </div>\n</fieldset>");
    }
  }]);

  return Testcase;
}(_AbstractComponent2.AbstractComponent);

exports.Testcase = Testcase;
},{"./AbstractComponent":"js/modules/AbstractComponent.js"}],"js/modules/initTestForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTestForm = void 0;

var _Testcase = require("./Testcase");

var objectiveForm = document.querySelector("#objective");
var scenarioFormControl = document.querySelector(".form-control--scenario");
var scenarioButton = document.querySelector("#scenario_btn");
var scenarioCount = 1;

var initTestForm = function initTestForm() {
  var textarea = objectiveForm.querySelector("textarea");
  OverlayScrollbars(textarea, {
    className: "os-theme-light"
  });

  function submitForm(event) {
    event.preventDefault();

    if (!validateForm()) {
      var formData = new FormData(objectiveForm);
      var values = Object.fromEntries(formData.entries());
      console.log(values);
      clearForm();
    }
  }

  function validateForm() {
    var allInputs = objectiveForm.querySelectorAll("input");
    var allTextareas = objectiveForm.querySelectorAll(".textarea--real");
    var validateFlag = [];
    allInputs.forEach(function (input) {
      if (!!input.value === false) {
        validateFlag.push(false);
        input.classList.add("border-red-500");
        setTimeout(function () {
          input.classList.remove("border-red-500");
        }, 2000);
      } else {
        validateFlag.push(true);
      }
    });
    allTextareas.forEach(function (textarea) {
      if (textarea.querySelector("textarea")) {
        console.log(textarea.querySelector("textarea").value);
      }

      if (textarea.querySelector("textarea") !== null && !!textarea.querySelector("textarea").value === false) {
        validateFlag.push(false);
        textarea.classList.add("border-red-500");
        setTimeout(function () {
          textarea.classList.remove("border-red-500");
        }, 2000);
      } else {
        validateFlag.push(true);
      }
    });
    return validateFlag.includes(false);
  }

  function clearForm() {
    var allAddedTests = document.querySelectorAll(".testcase--added");
    allAddedTests.forEach(function (element) {
      element.remove();
    });
    objectiveForm.reset();
    scenarioCount = 1;
  }

  function addNewScenario(event) {
    event.preventDefault();
    scenarioCount++;
    var newTestcase = new _Testcase.Testcase(scenarioCount);
    var textarea = newTestcase.getElement().querySelector("textarea");
    OverlayScrollbars(textarea, {
      className: "os-theme-light"
    });
    scenarioButton.before(newTestcase.getElement());
  }

  objectiveForm.addEventListener("submit", submitForm);
  scenarioButton.addEventListener("click", addNewScenario);
};

exports.initTestForm = initTestForm;
},{"./Testcase":"js/modules/Testcase.js"}],"js/modules/LocalLang.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LocalLang = /*#__PURE__*/function () {
  function LocalLang() {
    _classCallCheck(this, LocalLang);
  }

  _createClass(LocalLang, null, [{
    key: "saveLocalLang",
    value: function saveLocalLang(language) {
      var langs;

      if (localStorage.getItem("langs") === null) {
        langs = [];
      } else {
        langs = JSON.parse(localStorage.getItem("langs"));
      }

      langs.push(language);
      localStorage.setItem("langs", JSON.stringify(langs));
    }
  }, {
    key: "getLocalLang",
    value: function getLocalLang() {
      var langs;

      if (localStorage.getItem("langs") === null) {
        langs = [];
      } else {
        langs = JSON.parse(localStorage.getItem("langs"));
      }

      var lang = langs[langs.length - 1];
      return lang;
    }
  }, {
    key: "getDictionary",
    value: function getDictionary() {
      return {
        en_lang: {
          // title: "Test automation as a Service",
          // alert_success: "Automation has started!",
          description: "1. Generate FREE autotests for your site",
          title_2: "2. Describe your tests",
          test_title: "Test title",
          scenario_button: "Add new scenario <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"\n        class=\"inline-block w-4 h-4 ml-1 stroke-current transform rotate-45\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n            d=\"M6 18L18 6M6 6l12 12\"></path>\n    </svg>",
          test_button: "Send test",
          // test_url: "Enter your sire URL",
          textarea: "Open 'https://github.com/login' \n\nSet username 'Alex' \nSet password '12%#5f'\nSubmit form \n\nVerify successful authorization as 'Alex'",
          checkout_button: "Generate!" // copyright: `<a target="_blank" class="green-link" href="https://qa.guru">qa.guru</a>
          //     copyright`,

        },
        ru_lang: {
          // title: "Тест аутомейшн эс а сервис",
          // alert_success: "Аутомэйшн хэс стартед!",
          description: "1. \u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0435 \u0430\u0432\u0442\u043E\u0442\u0435\u0441\u0442\u044B \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430",
          title_2: "2. \u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448\u0438 \u0442\u0435\u0441\u0442\u044B",
          test_title: "Название теста",
          scenario_button: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"\n        class=\"inline-block w-4 h-4 ml-1 stroke-current transform rotate-45\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\n            d=\"M6 18L18 6M6 6l12 12\"></path>\n    </svg>",
          test_button: "Отправить тест",
          // test_url: "Введите URL вашего сайта",
          textarea: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C 'https://github.com/login' \n\n\u0412\u0432\u0435\u0441\u0442\u0438 \u043B\u043E\u0433\u0438\u043D 'Alex' \n\u0412\u0432\u0435\u0441\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C '12%#5f' \n\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0444\u043E\u0440\u043C\u0443 \n\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0443\u0441\u043F\u0435\u0448\u043D\u0443\u044E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044E \u043F\u043E\u0434 'Alex'",
          checkout_button: "Автоматизировать!" // copyright: `<a target="_blank" class="green-link" href="https://qa.guru">qa.guru</a>
          //     копирайт`,

        }
      };
    }
  }]);

  return LocalLang;
}();

var _default = LocalLang;
exports.default = _default;
},{}],"js/modules/initLanguage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLanguage = void 0;

var _LocalLang = _interopRequireDefault(require("./LocalLang"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initLanguage = function initLanguage() {
  document.addEventListener("DOMContentLoaded", changeLanguage);
  var languageButtons = document.querySelectorAll(".translate");
  var blocksForTranslate = document.querySelectorAll(".lang");
  languageButtons.forEach(function (button) {
    button.addEventListener("click", changeLanguage);
  });

  function changeLanguage() {
    var blocksForTranslate = document.querySelectorAll(".lang");
    var lang = this.tagName === undefined ? _LocalLang.default.getLocalLang() : this.getAttribute("id");
    blocksForTranslate.forEach(function (block) {
      var currentBlock = block.getAttribute("key");

      if (block.tagName !== "TEXTAREA") {
        block.innerHTML = _LocalLang.default.getDictionary()[lang][currentBlock];
      }

      if (block.getAttribute("placeholder") !== null) {
        block.setAttribute("placeholder", _LocalLang.default.getDictionary()[lang][currentBlock]);
      }
    });

    _LocalLang.default.saveLocalLang(lang);

    languageButtons.forEach(function (button) {
      button.classList.remove("translate--active");

      if (button.id === _LocalLang.default.getLocalLang()) {
        button.classList.add("translate--active");
      }
    });

    if (this.id === _LocalLang.default.getLocalLang()) {
      this.classList.add("translate--active");
    } // console.log(LocalLang.getDictionary()[LocalLang.getLocalLang()]);

  }
};

exports.initLanguage = initLanguage;
},{"./LocalLang":"js/modules/LocalLang.js"}],"js/modules/initDisco.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDisco = void 0;

var initDisco = function initDisco() {
  // const mainContainer = document.querySelector("#app");
  var consoleContainer = document.querySelector(".console-container"); // const console = document.querySelector("#console");

  var mainForm = document.querySelector("#main_url");
  var mainTitle = document.querySelector("h1");
  var discoBtn = document.querySelector(".tools__item--disco");
  var catParty = document.querySelector("#party"); // const discoElementBanana = document.querySelectorAll(
  //   ".disco-element--banana"
  // );
  // const discoElementWoman = document.querySelectorAll(".disco-element--woman");
  // const dancers = document.querySelectorAll(".disco-element");

  var mainTitleText;
  var danceInterval;
  var colorInterval;
  var danceFlag = true;
  discoBtn.addEventListener("click", function () {
    if (danceFlag) {
      startDisco();
    } else {
      stopDisco();
    }
  });

  function startDisco() {
    mainTitleText = mainTitle.innerHTML;
    mainTitle.innerHTML = "Test automation as a <span class=\"disco__word disco__word--1\">D</span><span class=\"disco__word disco__word--2\">i</span><span class=\"disco__word disco__word--3\">s</span><span class=\"disco__word disco__word--4\">c</span><span class=\"disco__word disco__word--5\">o</span>"; // const rand = (multi) => {
    //   return parseInt(multi * Math.random(), 10);
    // };
    // let ww = window.innerWidth / 2;
    // let wh = window.innerHeight;
    // let constraint = Math.min(ww, wh);
    // function move() {
    //   dancers.forEach((dancer) => {
    //     let w = rand(constraint);
    //
    //     let x = rand(ww - w);
    //     let y = rand(wh - w);
    //
    //     dancer.style.height = w / 3 + "px";
    //     dancer.style.top = y + "px";
    //     dancer.style.left = x + ww / 4 + "px";
    //
    //     dancer.style.transition = rand(100) + 2000 + "ms";
    //   });
    // }
    // move();

    catParty.classList.remove("hidden");
    consoleContainer.classList.add("hidden");
    mainForm.classList.add("hidden"); // discoElementBanana.forEach((element) => {
    //   element.classList.remove("hidden");
    // });
    // discoElementWoman.forEach((element) => {
    //   element.classList.remove("hidden");
    // });

    colorInterval = window.setInterval(changeColors, 500); // danceInterval = window.setInterval(move, 1500);

    danceFlag = false;
  }

  function stopDisco() {
    var iframe = document.querySelector("iframe-block iframe");
    mainTitle.innerHTML = mainTitleText; // discoElementBanana.forEach((element) => {
    //   element.classList.add("hidden");
    // });
    // discoElementWoman.forEach((element) => {
    //   element.classList.add("hidden");
    // });

    if (iframe) {
      consoleContainer.classList.remove("hidden");
    } else {
      mainForm.classList.remove("hidden");
    }

    catParty.classList.add("hidden");
    danceFlag = true;
    clearInterval(danceInterval);
    clearInterval(colorInterval);
  }

  function randColor(elem) {
    var r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256),
        color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
    elem.style.color = color;
  }

  function changeColors() {
    var allDiscoLetters = document.querySelectorAll(".disco__word");
    allDiscoLetters.forEach(function (element) {
      randColor(element);
    });
  }
};

exports.initDisco = initDisco;
},{}],"../node_modules/SimpleBar/dist/simplebar.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.for-each");

require("core-js/modules/web.dom-collections.for-each");

var _canUseDom = _interopRequireDefault(require("can-use-dom"));

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _lodash2 = _interopRequireDefault(require("lodash.debounce"));

var _lodash3 = _interopRequireDefault(require("lodash.memoize"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.function.name");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SimpleBar.js - v5.3.3
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */
// Helper function to retrieve options from element attributes
var getOptions = function getOptions(obj) {
  var options = Array.prototype.reduce.call(obj, function (acc, attribute) {
    var option = attribute.name.match(/data-simplebar-(.+)/);

    if (option) {
      var key = option[1].replace(/\W+(.)/g, function (x, chr) {
        return chr.toUpperCase();
      });

      switch (attribute.value) {
        case 'true':
          acc[key] = true;
          break;

        case 'false':
          acc[key] = false;
          break;

        case undefined:
          acc[key] = true;
          break;

        default:
          acc[key] = attribute.value;
      }
    }

    return acc;
  }, {});
  return options;
};

function getElementWindow(element) {
  if (!element || !element.ownerDocument || !element.ownerDocument.defaultView) {
    return window;
  }

  return element.ownerDocument.defaultView;
}

function getElementDocument(element) {
  if (!element || !element.ownerDocument) {
    return document;
  }

  return element.ownerDocument;
}

var cachedScrollbarWidth = null;
var cachedDevicePixelRatio = null;

if (_canUseDom.default) {
  window.addEventListener('resize', function () {
    if (cachedDevicePixelRatio !== window.devicePixelRatio) {
      cachedDevicePixelRatio = window.devicePixelRatio;
      cachedScrollbarWidth = null;
    }
  });
}

function scrollbarWidth(el) {
  if (cachedScrollbarWidth === null) {
    var document = getElementDocument(el);

    if (typeof document === 'undefined') {
      cachedScrollbarWidth = 0;
      return cachedScrollbarWidth;
    }

    var body = document.body;
    var box = document.createElement('div');
    box.classList.add('simplebar-hide-scrollbar');
    body.appendChild(box);
    var width = box.getBoundingClientRect().right;
    body.removeChild(box);
    cachedScrollbarWidth = width;
  }

  return cachedScrollbarWidth;
}

var SimpleBar = /*#__PURE__*/function () {
  function SimpleBar(element, options) {
    var _this = this;

    this.onScroll = function () {
      var elWindow = getElementWindow(_this.el);

      if (!_this.scrollXTicking) {
        elWindow.requestAnimationFrame(_this.scrollX);
        _this.scrollXTicking = true;
      }

      if (!_this.scrollYTicking) {
        elWindow.requestAnimationFrame(_this.scrollY);
        _this.scrollYTicking = true;
      }
    };

    this.scrollX = function () {
      if (_this.axis.x.isOverflowing) {
        _this.showScrollbar('x');

        _this.positionScrollbar('x');
      }

      _this.scrollXTicking = false;
    };

    this.scrollY = function () {
      if (_this.axis.y.isOverflowing) {
        _this.showScrollbar('y');

        _this.positionScrollbar('y');
      }

      _this.scrollYTicking = false;
    };

    this.onMouseEnter = function () {
      _this.showScrollbar('x');

      _this.showScrollbar('y');
    };

    this.onMouseMove = function (e) {
      _this.mouseX = e.clientX;
      _this.mouseY = e.clientY;

      if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
        _this.onMouseMoveForAxis('x');
      }

      if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
        _this.onMouseMoveForAxis('y');
      }
    };

    this.onMouseLeave = function () {
      _this.onMouseMove.cancel();

      if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
        _this.onMouseLeaveForAxis('x');
      }

      if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
        _this.onMouseLeaveForAxis('y');
      }

      _this.mouseX = -1;
      _this.mouseY = -1;
    };

    this.onWindowResize = function () {
      // Recalculate scrollbarWidth in case it's a zoom
      _this.scrollbarWidth = _this.getScrollbarWidth();

      _this.hideNativeScrollbar();
    };

    this.hideScrollbars = function () {
      _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
      _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();

      if (!_this.isWithinBounds(_this.axis.y.track.rect)) {
        _this.axis.y.scrollbar.el.classList.remove(_this.classNames.visible);

        _this.axis.y.isVisible = false;
      }

      if (!_this.isWithinBounds(_this.axis.x.track.rect)) {
        _this.axis.x.scrollbar.el.classList.remove(_this.classNames.visible);

        _this.axis.x.isVisible = false;
      }
    };

    this.onPointerEvent = function (e) {
      var isWithinTrackXBounds, isWithinTrackYBounds;
      _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
      _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();

      if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
        isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
      }

      if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
        isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
      } // If any pointer event is called on the scrollbar


      if (isWithinTrackXBounds || isWithinTrackYBounds) {
        // Preventing the event's default action stops text being
        // selectable during the drag.
        e.preventDefault(); // Prevent event leaking

        e.stopPropagation();

        if (e.type === 'mousedown') {
          if (isWithinTrackXBounds) {
            _this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect();

            if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) {
              _this.onDragStart(e, 'x');
            } else {
              _this.onTrackClick(e, 'x');
            }
          }

          if (isWithinTrackYBounds) {
            _this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect();

            if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) {
              _this.onDragStart(e, 'y');
            } else {
              _this.onTrackClick(e, 'y');
            }
          }
        }
      }
    };

    this.drag = function (e) {
      var eventOffset;
      var track = _this.axis[_this.draggedAxis].track;
      var trackSize = track.rect[_this.axis[_this.draggedAxis].sizeAttr];
      var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
      var contentSize = _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollSizeAttr];
      var hostSize = parseInt(_this.elStyles[_this.axis[_this.draggedAxis].sizeAttr], 10);
      e.preventDefault();
      e.stopPropagation();

      if (_this.draggedAxis === 'y') {
        eventOffset = e.pageY;
      } else {
        eventOffset = e.pageX;
      } // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).


      var dragPos = eventOffset - track.rect[_this.axis[_this.draggedAxis].offsetAttr] - _this.axis[_this.draggedAxis].dragOffset; // Convert the mouse position into a percentage of the scrollbar height/width.

      var dragPerc = dragPos / (trackSize - scrollbar.size); // Scroll the content by the same percentage.

      var scrollPos = dragPerc * (contentSize - hostSize); // Fix browsers inconsistency on RTL

      if (_this.draggedAxis === 'x') {
        scrollPos = _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted ? scrollPos - (trackSize + scrollbar.size) : scrollPos;
        scrollPos = _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted ? -scrollPos : scrollPos;
      }

      _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
    };

    this.onEndDrag = function (e) {
      var elDocument = getElementDocument(_this.el);
      var elWindow = getElementWindow(_this.el);
      e.preventDefault();
      e.stopPropagation();

      _this.el.classList.remove(_this.classNames.dragging);

      elDocument.removeEventListener('mousemove', _this.drag, true);
      elDocument.removeEventListener('mouseup', _this.onEndDrag, true);
      _this.removePreventClickId = elWindow.setTimeout(function () {
        // Remove these asynchronously so we still suppress click events
        // generated simultaneously with mouseup.
        elDocument.removeEventListener('click', _this.preventClick, true);
        elDocument.removeEventListener('dblclick', _this.preventClick, true);
        _this.removePreventClickId = null;
      });
    };

    this.preventClick = function (e) {
      e.preventDefault();
      e.stopPropagation();
    };

    this.el = element;
    this.minScrollbarWidth = 20;
    this.options = Object.assign({}, SimpleBar.defaultOptions, {}, options);
    this.classNames = Object.assign({}, SimpleBar.defaultOptions.classNames, {}, this.options.classNames);
    this.axis = {
      x: {
        scrollOffsetAttr: 'scrollLeft',
        sizeAttr: 'width',
        scrollSizeAttr: 'scrollWidth',
        offsetSizeAttr: 'offsetWidth',
        offsetAttr: 'left',
        overflowAttr: 'overflowX',
        dragOffset: 0,
        isOverflowing: true,
        isVisible: false,
        forceVisible: false,
        track: {},
        scrollbar: {}
      },
      y: {
        scrollOffsetAttr: 'scrollTop',
        sizeAttr: 'height',
        scrollSizeAttr: 'scrollHeight',
        offsetSizeAttr: 'offsetHeight',
        offsetAttr: 'top',
        overflowAttr: 'overflowY',
        dragOffset: 0,
        isOverflowing: true,
        isVisible: false,
        forceVisible: false,
        track: {},
        scrollbar: {}
      }
    };
    this.removePreventClickId = null; // Don't re-instantiate over an existing one

    if (SimpleBar.instances.has(this.el)) {
      return;
    }

    this.recalculate = (0, _lodash.default)(this.recalculate.bind(this), 64);
    this.onMouseMove = (0, _lodash.default)(this.onMouseMove.bind(this), 64);
    this.hideScrollbars = (0, _lodash2.default)(this.hideScrollbars.bind(this), this.options.timeout);
    this.onWindowResize = (0, _lodash2.default)(this.onWindowResize.bind(this), 64, {
      leading: true
    });
    SimpleBar.getRtlHelpers = (0, _lodash3.default)(SimpleBar.getRtlHelpers);
    this.init();
  }
  /**
   * Static properties
   */

  /**
   * Helper to fix browsers inconsistency on RTL:
   *  - Firefox inverts the scrollbar initial position
   *  - IE11 inverts both scrollbar position and scrolling offset
   * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
   */


  SimpleBar.getRtlHelpers = function getRtlHelpers() {
    var dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
    var scrollbarDummyEl = dummyDiv.firstElementChild;
    document.body.appendChild(scrollbarDummyEl);
    var dummyContainerChild = scrollbarDummyEl.firstElementChild;
    scrollbarDummyEl.scrollLeft = 0;
    var dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
    var dummyContainerChildOffset = SimpleBar.getOffset(dummyContainerChild);
    scrollbarDummyEl.scrollLeft = 999;
    var dummyContainerScrollOffsetAfterScroll = SimpleBar.getOffset(dummyContainerChild);
    return {
      // determines if the scrolling is responding with negative values
      isRtlScrollingInverted: dummyContainerOffset.left !== dummyContainerChildOffset.left && dummyContainerChildOffset.left - dummyContainerScrollOffsetAfterScroll.left !== 0,
      // determines if the origin scrollbar position is inverted or not (positioned on left or right)
      isRtlScrollbarInverted: dummyContainerOffset.left !== dummyContainerChildOffset.left
    };
  };

  SimpleBar.getOffset = function getOffset(el) {
    var rect = el.getBoundingClientRect();
    var elDocument = getElementDocument(el);
    var elWindow = getElementWindow(el);
    return {
      top: rect.top + (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
      left: rect.left + (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
    };
  };

  var _proto = SimpleBar.prototype;

  _proto.init = function init() {
    // Save a reference to the instance, so we know this DOM node has already been instancied
    SimpleBar.instances.set(this.el, this); // We stop here on server-side

    if (_canUseDom.default) {
      this.initDOM();
      this.scrollbarWidth = this.getScrollbarWidth();
      this.recalculate();
      this.initListeners();
    }
  };

  _proto.initDOM = function initDOM() {
    var _this2 = this; // make sure this element doesn't have the elements yet


    if (Array.prototype.filter.call(this.el.children, function (child) {
      return child.classList.contains(_this2.classNames.wrapper);
    }).length) {
      // assume that element has his DOM already initiated
      this.wrapperEl = this.el.querySelector("." + this.classNames.wrapper);
      this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector("." + this.classNames.contentWrapper);
      this.contentEl = this.options.contentNode || this.el.querySelector("." + this.classNames.contentEl);
      this.offsetEl = this.el.querySelector("." + this.classNames.offset);
      this.maskEl = this.el.querySelector("." + this.classNames.mask);
      this.placeholderEl = this.findChild(this.wrapperEl, "." + this.classNames.placeholder);
      this.heightAutoObserverWrapperEl = this.el.querySelector("." + this.classNames.heightAutoObserverWrapperEl);
      this.heightAutoObserverEl = this.el.querySelector("." + this.classNames.heightAutoObserverEl);
      this.axis.x.track.el = this.findChild(this.el, "." + this.classNames.track + "." + this.classNames.horizontal);
      this.axis.y.track.el = this.findChild(this.el, "." + this.classNames.track + "." + this.classNames.vertical);
    } else {
      // Prepare DOM
      this.wrapperEl = document.createElement('div');
      this.contentWrapperEl = document.createElement('div');
      this.offsetEl = document.createElement('div');
      this.maskEl = document.createElement('div');
      this.contentEl = document.createElement('div');
      this.placeholderEl = document.createElement('div');
      this.heightAutoObserverWrapperEl = document.createElement('div');
      this.heightAutoObserverEl = document.createElement('div');
      this.wrapperEl.classList.add(this.classNames.wrapper);
      this.contentWrapperEl.classList.add(this.classNames.contentWrapper);
      this.offsetEl.classList.add(this.classNames.offset);
      this.maskEl.classList.add(this.classNames.mask);
      this.contentEl.classList.add(this.classNames.contentEl);
      this.placeholderEl.classList.add(this.classNames.placeholder);
      this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl);
      this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);

      while (this.el.firstChild) {
        this.contentEl.appendChild(this.el.firstChild);
      }

      this.contentWrapperEl.appendChild(this.contentEl);
      this.offsetEl.appendChild(this.contentWrapperEl);
      this.maskEl.appendChild(this.offsetEl);
      this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
      this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
      this.wrapperEl.appendChild(this.maskEl);
      this.wrapperEl.appendChild(this.placeholderEl);
      this.el.appendChild(this.wrapperEl);
    }

    if (!this.axis.x.track.el || !this.axis.y.track.el) {
      var track = document.createElement('div');
      var scrollbar = document.createElement('div');
      track.classList.add(this.classNames.track);
      scrollbar.classList.add(this.classNames.scrollbar);
      track.appendChild(scrollbar);
      this.axis.x.track.el = track.cloneNode(true);
      this.axis.x.track.el.classList.add(this.classNames.horizontal);
      this.axis.y.track.el = track.cloneNode(true);
      this.axis.y.track.el.classList.add(this.classNames.vertical);
      this.el.appendChild(this.axis.x.track.el);
      this.el.appendChild(this.axis.y.track.el);
    }

    this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector("." + this.classNames.scrollbar);
    this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector("." + this.classNames.scrollbar);

    if (!this.options.autoHide) {
      this.axis.x.scrollbar.el.classList.add(this.classNames.visible);
      this.axis.y.scrollbar.el.classList.add(this.classNames.visible);
    }

    this.el.setAttribute('data-simplebar', 'init');
  };

  _proto.initListeners = function initListeners() {
    var _this3 = this;

    var elWindow = getElementWindow(this.el); // Event listeners

    if (this.options.autoHide) {
      this.el.addEventListener('mouseenter', this.onMouseEnter);
    }

    ['mousedown', 'click', 'dblclick'].forEach(function (e) {
      _this3.el.addEventListener(e, _this3.onPointerEvent, true);
    });
    ['touchstart', 'touchend', 'touchmove'].forEach(function (e) {
      _this3.el.addEventListener(e, _this3.onPointerEvent, {
        capture: true,
        passive: true
      });
    });
    this.el.addEventListener('mousemove', this.onMouseMove);
    this.el.addEventListener('mouseleave', this.onMouseLeave);
    this.contentWrapperEl.addEventListener('scroll', this.onScroll); // Browser zoom triggers a window resize

    elWindow.addEventListener('resize', this.onWindowResize); // Hack for https://github.com/WICG/ResizeObserver/issues/38

    var resizeObserverStarted = false;
    var resizeObserver = elWindow.ResizeObserver || _resizeObserverPolyfill.default;
    this.resizeObserver = new resizeObserver(function () {
      if (!resizeObserverStarted) return;

      _this3.recalculate();
    });
    this.resizeObserver.observe(this.el);
    this.resizeObserver.observe(this.contentEl);
    elWindow.requestAnimationFrame(function () {
      resizeObserverStarted = true;
    }); // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.

    this.mutationObserver = new elWindow.MutationObserver(this.recalculate);
    this.mutationObserver.observe(this.contentEl, {
      childList: true,
      subtree: true,
      characterData: true
    });
  };

  _proto.recalculate = function recalculate() {
    var elWindow = getElementWindow(this.el);
    this.elStyles = elWindow.getComputedStyle(this.el);
    this.isRtl = this.elStyles.direction === 'rtl';
    var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
    var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1;
    var contentElOffsetWidth = this.contentEl.offsetWidth;
    var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
    var elOverflowX = this.elStyles.overflowX;
    var elOverflowY = this.elStyles.overflowY;
    this.contentEl.style.padding = this.elStyles.paddingTop + " " + this.elStyles.paddingRight + " " + this.elStyles.paddingBottom + " " + this.elStyles.paddingLeft;
    this.wrapperEl.style.margin = "-" + this.elStyles.paddingTop + " -" + this.elStyles.paddingRight + " -" + this.elStyles.paddingBottom + " -" + this.elStyles.paddingLeft;
    var contentElScrollHeight = this.contentEl.scrollHeight;
    var contentElScrollWidth = this.contentEl.scrollWidth;
    this.contentWrapperEl.style.height = isHeightAuto ? 'auto' : '100%'; // Determine placeholder size

    this.placeholderEl.style.width = isWidthAuto ? contentElOffsetWidth + "px" : 'auto';
    this.placeholderEl.style.height = contentElScrollHeight + "px";
    var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
    this.axis.x.isOverflowing = contentElScrollWidth > contentElOffsetWidth;
    this.axis.y.isOverflowing = contentElScrollHeight > contentWrapperElOffsetHeight; // Set isOverflowing to false if user explicitely set hidden overflow

    this.axis.x.isOverflowing = elOverflowX === 'hidden' ? false : this.axis.x.isOverflowing;
    this.axis.y.isOverflowing = elOverflowY === 'hidden' ? false : this.axis.y.isOverflowing;
    this.axis.x.forceVisible = this.options.forceVisible === 'x' || this.options.forceVisible === true;
    this.axis.y.forceVisible = this.options.forceVisible === 'y' || this.options.forceVisible === true;
    this.hideNativeScrollbar(); // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)

    var offsetForXScrollbar = this.axis.x.isOverflowing ? this.scrollbarWidth : 0;
    var offsetForYScrollbar = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
    this.axis.x.isOverflowing = this.axis.x.isOverflowing && contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
    this.axis.y.isOverflowing = this.axis.y.isOverflowing && contentElScrollHeight > contentWrapperElOffsetHeight - offsetForXScrollbar;
    this.axis.x.scrollbar.size = this.getScrollbarSize('x');
    this.axis.y.scrollbar.size = this.getScrollbarSize('y');
    this.axis.x.scrollbar.el.style.width = this.axis.x.scrollbar.size + "px";
    this.axis.y.scrollbar.el.style.height = this.axis.y.scrollbar.size + "px";
    this.positionScrollbar('x');
    this.positionScrollbar('y');
    this.toggleTrackVisibility('x');
    this.toggleTrackVisibility('y');
  }
  /**
   * Calculate scrollbar size
   */
  ;

  _proto.getScrollbarSize = function getScrollbarSize(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    if (!this.axis[axis].isOverflowing) {
      return 0;
    }

    var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
    var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
    var scrollbarSize;
    var scrollbarRatio = trackSize / contentSize; // Calculate new height/position of drag handle.

    scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);

    if (this.options.scrollbarMaxSize) {
      scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
    }

    return scrollbarSize;
  };

  _proto.positionScrollbar = function positionScrollbar(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    if (!this.axis[axis].isOverflowing) {
      return;
    }

    var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
    var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
    var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
    var scrollbar = this.axis[axis].scrollbar;
    var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
    scrollOffset = axis === 'x' && this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted ? -scrollOffset : scrollOffset;
    var scrollPourcent = scrollOffset / (contentSize - hostSize);
    var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
    handleOffset = axis === 'x' && this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted ? handleOffset + (trackSize - scrollbar.size) : handleOffset;
    scrollbar.el.style.transform = axis === 'x' ? "translate3d(" + handleOffset + "px, 0, 0)" : "translate3d(0, " + handleOffset + "px, 0)";
  };

  _proto.toggleTrackVisibility = function toggleTrackVisibility(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    var track = this.axis[axis].track.el;
    var scrollbar = this.axis[axis].scrollbar.el;

    if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
      track.style.visibility = 'visible';
      this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'scroll';
    } else {
      track.style.visibility = 'hidden';
      this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'hidden';
    } // Even if forceVisible is enabled, scrollbar itself should be hidden


    if (this.axis[axis].isOverflowing) {
      scrollbar.style.display = 'block';
    } else {
      scrollbar.style.display = 'none';
    }
  };

  _proto.hideNativeScrollbar = function hideNativeScrollbar() {
    this.offsetEl.style[this.isRtl ? 'left' : 'right'] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-" + this.scrollbarWidth + "px" : 0;
    this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-" + this.scrollbarWidth + "px" : 0;
  }
  /**
   * On scroll event handling
   */
  ;

  _proto.onMouseMoveForAxis = function onMouseMoveForAxis(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    this.axis[axis].track.rect = this.axis[axis].track.el.getBoundingClientRect();
    this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
    var isWithinScrollbarBoundsX = this.isWithinBounds(this.axis[axis].scrollbar.rect);

    if (isWithinScrollbarBoundsX) {
      this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
    } else {
      this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
    }

    if (this.isWithinBounds(this.axis[axis].track.rect)) {
      this.showScrollbar(axis);
      this.axis[axis].track.el.classList.add(this.classNames.hover);
    } else {
      this.axis[axis].track.el.classList.remove(this.classNames.hover);
    }
  };

  _proto.onMouseLeaveForAxis = function onMouseLeaveForAxis(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    this.axis[axis].track.el.classList.remove(this.classNames.hover);
    this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
  };
  /**
   * Show scrollbar
   */


  _proto.showScrollbar = function showScrollbar(axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    var scrollbar = this.axis[axis].scrollbar.el;

    if (!this.axis[axis].isVisible) {
      scrollbar.classList.add(this.classNames.visible);
      this.axis[axis].isVisible = true;
    }

    if (this.options.autoHide) {
      this.hideScrollbars();
    }
  }
  /**
   * Hide Scrollbar
   */
  ;
  /**
   * on scrollbar handle drag movement starts
   */


  _proto.onDragStart = function onDragStart(e, axis) {
    if (axis === void 0) {
      axis = 'y';
    }

    var elDocument = getElementDocument(this.el);
    var elWindow = getElementWindow(this.el);
    var scrollbar = this.axis[axis].scrollbar; // Measure how far the user's mouse is from the top of the scrollbar drag handle.

    var eventOffset = axis === 'y' ? e.pageY : e.pageX;
    this.axis[axis].dragOffset = eventOffset - scrollbar.rect[this.axis[axis].offsetAttr];
    this.draggedAxis = axis;
    this.el.classList.add(this.classNames.dragging);
    elDocument.addEventListener('mousemove', this.drag, true);
    elDocument.addEventListener('mouseup', this.onEndDrag, true);

    if (this.removePreventClickId === null) {
      elDocument.addEventListener('click', this.preventClick, true);
      elDocument.addEventListener('dblclick', this.preventClick, true);
    } else {
      elWindow.clearTimeout(this.removePreventClickId);
      this.removePreventClickId = null;
    }
  }
  /**
   * Drag scrollbar handle
   */
  ;

  _proto.onTrackClick = function onTrackClick(e, axis) {
    var _this4 = this;

    if (axis === void 0) {
      axis = 'y';
    }

    if (!this.options.clickOnTrack) return;
    var elWindow = getElementWindow(this.el);
    this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
    var scrollbar = this.axis[axis].scrollbar;
    var scrollbarOffset = scrollbar.rect[this.axis[axis].offsetAttr];
    var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
    var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
    var t = axis === 'y' ? this.mouseY - scrollbarOffset : this.mouseX - scrollbarOffset;
    var dir = t < 0 ? -1 : 1;
    var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;

    var scrollTo = function scrollTo() {
      if (dir === -1) {
        if (scrolled > scrollSize) {
          var _this4$contentWrapper;

          scrolled -= _this4.options.clickOnTrackSpeed;

          _this4.contentWrapperEl.scrollTo((_this4$contentWrapper = {}, _this4$contentWrapper[_this4.axis[axis].offsetAttr] = scrolled, _this4$contentWrapper));

          elWindow.requestAnimationFrame(scrollTo);
        }
      } else {
        if (scrolled < scrollSize) {
          var _this4$contentWrapper2;

          scrolled += _this4.options.clickOnTrackSpeed;

          _this4.contentWrapperEl.scrollTo((_this4$contentWrapper2 = {}, _this4$contentWrapper2[_this4.axis[axis].offsetAttr] = scrolled, _this4$contentWrapper2));

          elWindow.requestAnimationFrame(scrollTo);
        }
      }
    };

    scrollTo();
  }
  /**
   * Getter for content element
   */
  ;

  _proto.getContentElement = function getContentElement() {
    return this.contentEl;
  }
  /**
   * Getter for original scrolling element
   */
  ;

  _proto.getScrollElement = function getScrollElement() {
    return this.contentWrapperEl;
  };

  _proto.getScrollbarWidth = function getScrollbarWidth() {
    // Try/catch for FF 56 throwing on undefined computedStyles
    try {
      // Detect browsers supporting CSS scrollbar styling and do not calculate
      if (getComputedStyle(this.contentWrapperEl, '::-webkit-scrollbar').display === 'none' || 'scrollbarWidth' in document.documentElement.style || '-ms-overflow-style' in document.documentElement.style) {
        return 0;
      } else {
        return scrollbarWidth(this.el);
      }
    } catch (e) {
      return scrollbarWidth(this.el);
    }
  };

  _proto.removeListeners = function removeListeners() {
    var _this5 = this;

    var elWindow = getElementWindow(this.el); // Event listeners

    if (this.options.autoHide) {
      this.el.removeEventListener('mouseenter', this.onMouseEnter);
    }

    ['mousedown', 'click', 'dblclick'].forEach(function (e) {
      _this5.el.removeEventListener(e, _this5.onPointerEvent, true);
    });
    ['touchstart', 'touchend', 'touchmove'].forEach(function (e) {
      _this5.el.removeEventListener(e, _this5.onPointerEvent, {
        capture: true,
        passive: true
      });
    });
    this.el.removeEventListener('mousemove', this.onMouseMove);
    this.el.removeEventListener('mouseleave', this.onMouseLeave);

    if (this.contentWrapperEl) {
      this.contentWrapperEl.removeEventListener('scroll', this.onScroll);
    }

    elWindow.removeEventListener('resize', this.onWindowResize);

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    } // Cancel all debounced functions


    this.recalculate.cancel();
    this.onMouseMove.cancel();
    this.hideScrollbars.cancel();
    this.onWindowResize.cancel();
  }
  /**
   * UnMount mutation observer and delete SimpleBar instance from DOM element
   */
  ;

  _proto.unMount = function unMount() {
    this.removeListeners();
    SimpleBar.instances.delete(this.el);
  }
  /**
   * Check if mouse is within bounds
   */
  ;

  _proto.isWithinBounds = function isWithinBounds(bbox) {
    return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
  }
  /**
   * Find element children matches query
   */
  ;

  _proto.findChild = function findChild(el, query) {
    var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    return Array.prototype.filter.call(el.children, function (child) {
      return matches.call(child, query);
    })[0];
  };

  return SimpleBar;
}();

SimpleBar.defaultOptions = {
  autoHide: true,
  forceVisible: false,
  clickOnTrack: true,
  clickOnTrackSpeed: 40,
  classNames: {
    contentEl: 'simplebar-content',
    contentWrapper: 'simplebar-content-wrapper',
    offset: 'simplebar-offset',
    mask: 'simplebar-mask',
    wrapper: 'simplebar-wrapper',
    placeholder: 'simplebar-placeholder',
    scrollbar: 'simplebar-scrollbar',
    track: 'simplebar-track',
    heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
    heightAutoObserverEl: 'simplebar-height-auto-observer',
    visible: 'simplebar-visible',
    horizontal: 'simplebar-horizontal',
    vertical: 'simplebar-vertical',
    hover: 'simplebar-hover',
    dragging: 'simplebar-dragging'
  },
  scrollbarMinSize: 25,
  scrollbarMaxSize: 0,
  timeout: 1000
};
SimpleBar.instances = new WeakMap();

SimpleBar.initDOMLoadedElements = function () {
  document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
  window.removeEventListener('load', this.initDOMLoadedElements);
  Array.prototype.forEach.call(document.querySelectorAll('[data-simplebar]'), function (el) {
    if (el.getAttribute('data-simplebar') !== 'init' && !SimpleBar.instances.has(el)) new SimpleBar(el, getOptions(el.attributes));
  });
};

SimpleBar.removeObserver = function () {
  this.globalObserver.disconnect();
};

SimpleBar.initHtmlApi = function () {
  this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this); // MutationObserver is IE11+

  if (typeof MutationObserver !== 'undefined') {
    // Mutation observer to observe dynamically added elements
    this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
    this.globalObserver.observe(document, {
      childList: true,
      subtree: true
    });
  } // Taken from jQuery `ready` function
  // Instantiate elements already present on the page


  if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
    // Handle it asynchronously to allow scripts the opportunity to delay init
    window.setTimeout(this.initDOMLoadedElements);
  } else {
    document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
    window.addEventListener('load', this.initDOMLoadedElements);
  }
};

SimpleBar.handleMutations = function (mutations) {
  mutations.forEach(function (mutation) {
    Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
      if (addedNode.nodeType === 1) {
        if (addedNode.hasAttribute('data-simplebar')) {
          !SimpleBar.instances.has(addedNode) && new SimpleBar(addedNode, getOptions(addedNode.attributes));
        } else {
          Array.prototype.forEach.call(addedNode.querySelectorAll('[data-simplebar]'), function (el) {
            if (el.getAttribute('data-simplebar') !== 'init' && !SimpleBar.instances.has(el)) new SimpleBar(el, getOptions(el.attributes));
          });
        }
      }
    });
    Array.prototype.forEach.call(mutation.removedNodes, function (removedNode) {
      if (removedNode.nodeType === 1) {
        if (removedNode.hasAttribute('[data-simplebar="init"]')) {
          SimpleBar.instances.has(removedNode) && SimpleBar.instances.get(removedNode).unMount();
        } else {
          Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), function (el) {
            SimpleBar.instances.has(el) && SimpleBar.instances.get(el).unMount();
          });
        }
      }
    });
  });
};

SimpleBar.getOptions = getOptions;
/**
 * HTML API
 * Called only in a browser env.
 */

if (_canUseDom.default) {
  SimpleBar.initHtmlApi();
}

var _default = SimpleBar;
exports.default = _default;
},{"core-js/modules/es.array.for-each":"../node_modules/core-js/modules/es.array.for-each.js","core-js/modules/web.dom-collections.for-each":"../node_modules/core-js/modules/web.dom-collections.for-each.js","can-use-dom":"../node_modules/can-use-dom/index.js","core-js/modules/es.array.filter":"../node_modules/core-js/modules/es.array.filter.js","core-js/modules/es.array.iterator":"../node_modules/core-js/modules/es.array.iterator.js","core-js/modules/es.object.assign":"../node_modules/core-js/modules/es.object.assign.js","core-js/modules/es.object.to-string":"../node_modules/core-js/modules/es.object.to-string.js","core-js/modules/es.parse-int":"../node_modules/core-js/modules/es.parse-int.js","core-js/modules/es.string.iterator":"../node_modules/core-js/modules/es.string.iterator.js","core-js/modules/es.weak-map":"../node_modules/core-js/modules/es.weak-map.js","core-js/modules/web.dom-collections.iterator":"../node_modules/core-js/modules/web.dom-collections.iterator.js","lodash.throttle":"../node_modules/lodash.throttle/index.js","lodash.debounce":"../node_modules/lodash.debounce/index.js","lodash.memoize":"../node_modules/lodash.memoize/index.js","resize-observer-polyfill":"../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js","core-js/modules/es.array.reduce":"../node_modules/core-js/modules/es.array.reduce.js","core-js/modules/es.function.name":"../node_modules/core-js/modules/es.function.name.js","core-js/modules/es.regexp.exec":"../node_modules/core-js/modules/es.regexp.exec.js","core-js/modules/es.string.match":"../node_modules/core-js/modules/es.string.match.js","core-js/modules/es.string.replace":"../node_modules/core-js/modules/es.string.replace.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/simplebar/dist/simplebar.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/libs/OverlayScrollbars.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.13.0
 *
 * Copyright KingSora | Rene Haas.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 02.08.2020
 */
(function (global, factory) {
  if (typeof define === 'function' && define.amd) define(function () {
    return factory(global, global.document, undefined);
  });else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') module.exports = factory(global, global.document, undefined);else factory(global, global.document, undefined);
})(typeof window !== 'undefined' ? window : this, function (window, document, undefined) {
  'use strict';

  var PLUGINNAME = 'OverlayScrollbars';
  var TYPES = {
    o: 'object',
    f: 'function',
    a: 'array',
    s: 'string',
    b: 'boolean',
    n: 'number',
    u: 'undefined',
    z: 'null' //d : 'date',
    //e : 'error',
    //r : 'regexp',
    //y : 'symbol'

  };
  var LEXICON = {
    c: 'class',
    s: 'style',
    i: 'id',
    l: 'length',
    p: 'prototype',
    ti: 'tabindex',
    oH: 'offsetHeight',
    cH: 'clientHeight',
    sH: 'scrollHeight',
    oW: 'offsetWidth',
    cW: 'clientWidth',
    sW: 'scrollWidth',
    hOP: 'hasOwnProperty',
    bCR: 'getBoundingClientRect'
  };

  var VENDORS = function () {
    //https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix
    var jsCache = {};
    var cssCache = {};
    var cssPrefixes = ['-webkit-', '-moz-', '-o-', '-ms-'];
    var jsPrefixes = ['WebKit', 'Moz', 'O', 'MS'];

    function firstLetterToUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return {
      _cssPrefixes: cssPrefixes,
      _jsPrefixes: jsPrefixes,
      _cssProperty: function _cssProperty(name) {
        var result = cssCache[name];
        if (cssCache[LEXICON.hOP](name)) return result;
        var uppercasedName = firstLetterToUpper(name);
        var elmStyle = document.createElement('div')[LEXICON.s];
        var resultPossibilities;
        var i = 0;
        var v;
        var currVendorWithoutDashes;

        for (; i < cssPrefixes.length; i++) {
          currVendorWithoutDashes = cssPrefixes[i].replace(/-/g, '');
          resultPossibilities = [name, //transition
          cssPrefixes[i] + name, //-webkit-transition
          currVendorWithoutDashes + uppercasedName, //webkitTransition
          firstLetterToUpper(currVendorWithoutDashes) + uppercasedName //WebkitTransition
          ];

          for (v = 0; v < resultPossibilities[LEXICON.l]; v++) {
            if (elmStyle[resultPossibilities[v]] !== undefined) {
              result = resultPossibilities[v];
              break;
            }
          }
        }

        cssCache[name] = result;
        return result;
      },
      _cssPropertyValue: function _cssPropertyValue(property, values, suffix) {
        var name = property + ' ' + values;
        var result = cssCache[name];
        if (cssCache[LEXICON.hOP](name)) return result;
        var dummyStyle = document.createElement('div')[LEXICON.s];
        var possbleValues = values.split(' ');
        var preparedSuffix = suffix || '';
        var i = 0;
        var v = -1;
        var prop;

        for (; i < possbleValues[LEXICON.l]; i++) {
          for (; v < VENDORS._cssPrefixes[LEXICON.l]; v++) {
            prop = v < 0 ? possbleValues[i] : VENDORS._cssPrefixes[v] + possbleValues[i];
            dummyStyle.cssText = property + ':' + prop + preparedSuffix;

            if (dummyStyle[LEXICON.l]) {
              result = prop;
              break;
            }
          }
        }

        cssCache[name] = result;
        return result;
      },
      _jsAPI: function _jsAPI(name, isInterface, fallback) {
        var i = 0;
        var result = jsCache[name];

        if (!jsCache[LEXICON.hOP](name)) {
          result = window[name];

          for (; i < jsPrefixes[LEXICON.l]; i++) {
            result = result || window[(isInterface ? jsPrefixes[i] : jsPrefixes[i].toLowerCase()) + firstLetterToUpper(name)];
          }

          jsCache[name] = result;
        }

        return result || fallback;
      }
    };
  }();

  var COMPATIBILITY = function () {
    function windowSize(x) {
      return x ? window.innerWidth || document.documentElement[LEXICON.cW] || document.body[LEXICON.cW] : window.innerHeight || document.documentElement[LEXICON.cH] || document.body[LEXICON.cH];
    }

    function bind(func, thisObj) {
      if (_typeof(func) != TYPES.f) {
        throw "Can't bind function!"; // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        //throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var proto = LEXICON.p;
      var aArgs = Array[proto].slice.call(arguments, 2);

      var fNOP = function fNOP() {};

      var fBound = function fBound() {
        return func.apply(this instanceof fNOP ? this : thisObj, aArgs.concat(Array[proto].slice.call(arguments)));
      };

      if (func[proto]) fNOP[proto] = func[proto]; // Function.prototype doesn't have a prototype property

      fBound[proto] = new fNOP();
      return fBound;
    }

    return {
      /**
       * Gets the current window width.
       * @returns {Number|number} The current window width in pixel.
       */
      wW: bind(windowSize, 0, true),

      /**
       * Gets the current window height.
       * @returns {Number|number} The current window height in pixel.
       */
      wH: bind(windowSize, 0),

      /**
       * Gets the MutationObserver Object or undefined if not supported.
       * @returns {MutationObserver|*|undefined} The MutationsObserver Object or undefined.
       */
      mO: bind(VENDORS._jsAPI, 0, 'MutationObserver', true),

      /**
       * Gets the ResizeObserver Object or undefined if not supported.
       * @returns {MutationObserver|*|undefined} The ResizeObserver Object or undefined.
       */
      rO: bind(VENDORS._jsAPI, 0, 'ResizeObserver', true),

      /**
       * Gets the RequestAnimationFrame method or it's corresponding polyfill.
       * @returns {*|Function} The RequestAnimationFrame method or it's corresponding polyfill.
       */
      rAF: bind(VENDORS._jsAPI, 0, 'requestAnimationFrame', false, function (func) {
        return window.setTimeout(func, 1000 / 60);
      }),

      /**
       * Gets the CancelAnimationFrame method or it's corresponding polyfill.
       * @returns {*|Function} The CancelAnimationFrame method or it's corresponding polyfill.
       */
      cAF: bind(VENDORS._jsAPI, 0, 'cancelAnimationFrame', false, function (id) {
        return window.clearTimeout(id);
      }),

      /**
       * Gets the current time.
       * @returns {number} The current time.
       */
      now: function now() {
        return Date.now && Date.now() || new Date().getTime();
      },

      /**
       * Stops the propagation of the given event.
       * @param event The event of which the propagation shall be stoped.
       */
      stpP: function stpP(event) {
        if (event.stopPropagation) event.stopPropagation();else event.cancelBubble = true;
      },

      /**
       * Prevents the default action of the given event.
       * @param event The event of which the default action shall be prevented.
       */
      prvD: function prvD(event) {
        if (event.preventDefault && event.cancelable) event.preventDefault();else event.returnValue = false;
      },

      /**
       * Gets the pageX and pageY values of the given mouse event.
       * @param event The mouse event of which the pageX and pageX shall be got.
       * @returns {{x: number, y: number}} x = pageX value, y = pageY value.
       */
      page: function page(event) {
        event = event.originalEvent || event;
        var strPage = 'page';
        var strClient = 'client';
        var strX = 'X';
        var strY = 'Y';
        var target = event.target || event.srcElement || document;
        var eventDoc = target.ownerDocument || document;
        var doc = eventDoc.documentElement;
        var body = eventDoc.body; //if touch event return return pageX/Y of it

        if (event.touches !== undefined) {
          var touch = event.touches[0];
          return {
            x: touch[strPage + strX],
            y: touch[strPage + strY]
          };
        } // Calculate pageX/Y if not native supported


        if (!event[strPage + strX] && event[strClient + strX] && event[strClient + strX] != null) {
          return {
            x: event[strClient + strX] + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0),
            y: event[strClient + strY] + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
          };
        }

        return {
          x: event[strPage + strX],
          y: event[strPage + strY]
        };
      },

      /**
       * Gets the clicked mouse button of the given mouse event.
       * @param event The mouse event of which the clicked button shal be got.
       * @returns {number} The number of the clicked mouse button. (0 : none | 1 : leftButton | 2 : middleButton | 3 : rightButton)
       */
      mBtn: function mBtn(event) {
        var button = event.button;
        if (!event.which && button !== undefined) return button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;else return event.which;
      },

      /**
       * Checks whether a item is in the given array and returns its index.
       * @param item The item of which the position in the array shall be determined.
       * @param arr The array.
       * @returns {number} The zero based index of the item or -1 if the item isn't in the array.
       */
      inA: function inA(item, arr) {
        for (var i = 0; i < arr[LEXICON.l]; i++) {
          //Sometiems in IE a "SCRIPT70" Permission denied error occurs if HTML elements in a iFrame are compared
          try {
            if (arr[i] === item) return i;
          } catch (e) {}
        }

        return -1;
      },

      /**
       * Returns true if the given value is a array.
       * @param arr The potential array.
       * @returns {boolean} True if the given value is a array, false otherwise.
       */
      isA: function isA(arr) {
        var def = Array.isArray;
        return def ? def(arr) : this.type(arr) == TYPES.a;
      },

      /**
       * Determine the internal JavaScript [[Class]] of the given object.
       * @param obj The object of which the type shall be determined.
       * @returns {string} The type of the given object.
       */
      type: function type(obj) {
        if (obj === undefined) return obj + '';
        if (obj === null) return obj + '';
        return Object[LEXICON.p].toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
      },
      bind: bind
      /**
       * Gets the vendor-prefixed CSS property by the given name.
       * For example the given name is "transform" and you're using a old Firefox browser then the returned value would be "-moz-transform".
       * If the browser doesn't need a vendor-prefix, then the returned string is the given name.
       * If the browser doesn't support the given property name at all (not even with a vendor-prefix) the returned value is null.
       * @param propName The unprefixed CSS property name.
       * @returns {string|null} The vendor-prefixed CSS property or null if the browser doesn't support the given CSS property.
       cssProp: function(propName) {
          return VENDORS._cssProperty(propName);
      }
      */

    };
  }();

  var MATH = Math;
  var JQUERY = window.jQuery;

  var EASING = function () {
    var _easingsMath = {
      p: MATH.PI,
      c: MATH.cos,
      s: MATH.sin,
      w: MATH.pow,
      t: MATH.sqrt,
      n: MATH.asin,
      a: MATH.abs,
      o: 1.70158
    };
    /*
     x : current percent (0 - 1),
     t : current time (duration * percent),
     b : start value (from),
     c : end value (to),
     d : duration
      easingName : function(x, t, b, c, d) { return easedValue; }
     */

    return {
      swing: function swing(x, t, b, c, d) {
        return 0.5 - _easingsMath.c(x * _easingsMath.p) / 2;
      },
      linear: function linear(x, t, b, c, d) {
        return x;
      },
      easeInQuad: function easeInQuad(x, t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      easeOutQuad: function easeOutQuad(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOutQuad: function easeInOutQuad(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b;
      },
      easeInCubic: function easeInCubic(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      easeOutCubic: function easeOutCubic(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOutCubic: function easeInOutCubic(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;
      },
      easeInQuart: function easeInQuart(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
      },
      easeOutQuart: function easeOutQuart(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOutQuart: function easeInOutQuart(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t * t * t + b : -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      },
      easeInQuint: function easeInQuint(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOutQuint: function easeOutQuint(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOutQuint: function easeInOutQuint(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t * t * t * t + b : c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      },
      easeInSine: function easeInSine(x, t, b, c, d) {
        return -c * _easingsMath.c(t / d * (_easingsMath.p / 2)) + c + b;
      },
      easeOutSine: function easeOutSine(x, t, b, c, d) {
        return c * _easingsMath.s(t / d * (_easingsMath.p / 2)) + b;
      },
      easeInOutSine: function easeInOutSine(x, t, b, c, d) {
        return -c / 2 * (_easingsMath.c(_easingsMath.p * t / d) - 1) + b;
      },
      easeInExpo: function easeInExpo(x, t, b, c, d) {
        return t == 0 ? b : c * _easingsMath.w(2, 10 * (t / d - 1)) + b;
      },
      easeOutExpo: function easeOutExpo(x, t, b, c, d) {
        return t == d ? b + c : c * (-_easingsMath.w(2, -10 * t / d) + 1) + b;
      },
      easeInOutExpo: function easeInOutExpo(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * _easingsMath.w(2, 10 * (t - 1)) + b;
        return c / 2 * (-_easingsMath.w(2, -10 * --t) + 2) + b;
      },
      easeInCirc: function easeInCirc(x, t, b, c, d) {
        return -c * (_easingsMath.t(1 - (t /= d) * t) - 1) + b;
      },
      easeOutCirc: function easeOutCirc(x, t, b, c, d) {
        return c * _easingsMath.t(1 - (t = t / d - 1) * t) + b;
      },
      easeInOutCirc: function easeInOutCirc(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? -c / 2 * (_easingsMath.t(1 - t * t) - 1) + b : c / 2 * (_easingsMath.t(1 - (t -= 2) * t) + 1) + b;
      },
      easeInElastic: function easeInElastic(x, t, b, c, d) {
        var s = _easingsMath.o;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;

        if (a < _easingsMath.a(c)) {
          a = c;
          s = p / 4;
        } else s = p / (2 * _easingsMath.p) * _easingsMath.n(c / a);

        return -(a * _easingsMath.w(2, 10 * (t -= 1)) * _easingsMath.s((t * d - s) * (2 * _easingsMath.p) / p)) + b;
      },
      easeOutElastic: function easeOutElastic(x, t, b, c, d) {
        var s = _easingsMath.o;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;

        if (a < _easingsMath.a(c)) {
          a = c;
          s = p / 4;
        } else s = p / (2 * _easingsMath.p) * _easingsMath.n(c / a);

        return a * _easingsMath.w(2, -10 * t) * _easingsMath.s((t * d - s) * (2 * _easingsMath.p) / p) + c + b;
      },
      easeInOutElastic: function easeInOutElastic(x, t, b, c, d) {
        var s = _easingsMath.o;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);

        if (a < _easingsMath.a(c)) {
          a = c;
          s = p / 4;
        } else s = p / (2 * _easingsMath.p) * _easingsMath.n(c / a);

        if (t < 1) return -.5 * (a * _easingsMath.w(2, 10 * (t -= 1)) * _easingsMath.s((t * d - s) * (2 * _easingsMath.p) / p)) + b;
        return a * _easingsMath.w(2, -10 * (t -= 1)) * _easingsMath.s((t * d - s) * (2 * _easingsMath.p) / p) * .5 + c + b;
      },
      easeInBack: function easeInBack(x, t, b, c, d, s) {
        s = s || _easingsMath.o;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      easeOutBack: function easeOutBack(x, t, b, c, d, s) {
        s = s || _easingsMath.o;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      easeInOutBack: function easeInOutBack(x, t, b, c, d, s) {
        s = s || _easingsMath.o;
        return (t /= d / 2) < 1 ? c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b : c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
      },
      easeInBounce: function easeInBounce(x, t, b, c, d) {
        return c - this.easeOutBounce(x, d - t, 0, c, d) + b;
      },
      easeOutBounce: function easeOutBounce(x, t, b, c, d) {
        var o = 7.5625;

        if ((t /= d) < 1 / 2.75) {
          return c * (o * t * t) + b;
        } else if (t < 2 / 2.75) {
          return c * (o * (t -= 1.5 / 2.75) * t + .75) + b;
        } else if (t < 2.5 / 2.75) {
          return c * (o * (t -= 2.25 / 2.75) * t + .9375) + b;
        } else {
          return c * (o * (t -= 2.625 / 2.75) * t + .984375) + b;
        }
      },
      easeInOutBounce: function easeInOutBounce(x, t, b, c, d) {
        return t < d / 2 ? this.easeInBounce(x, t * 2, 0, c, d) * .5 + b : this.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
      }
    };
    /*
     *
     * TERMS OF USE - EASING EQUATIONS
     * 
     * Open source under the BSD License. 
     * 
     * Copyright Â© 2001 Robert Penner
     * All rights reserved.
     * 
     * Redistribution and use in source and binary forms, with or without modification, 
     * are permitted provided that the following conditions are met:
     * 
     * Redistributions of source code must retain the above copyright notice, this list of 
     * conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright notice, this list 
     * of conditions and the following disclaimer in the documentation and/or other materials 
     * provided with the distribution.
     * 
     * Neither the name of the author nor the names of contributors may be used to endorse 
     * or promote products derived from this software without specific prior written permission.
     * 
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
     * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
     *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
     * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
     * OF THE POSSIBILITY OF SUCH DAMAGE. 
     *
     */
  }();

  var FRAMEWORK = function () {
    var _rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
    var _strSpace = ' ';
    var _strEmpty = '';
    var _strScrollLeft = 'scrollLeft';
    var _strScrollTop = 'scrollTop';
    var _animations = [];
    var _type = COMPATIBILITY.type;
    var _cssNumber = {
      animationIterationCount: true,
      columnCount: true,
      fillOpacity: true,
      flexGrow: true,
      flexShrink: true,
      fontWeight: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      widows: true,
      zIndex: true,
      zoom: true
    };

    function extend() {
      var src,
          copyIsArray,
          copy,
          name,
          options,
          clone,
          target = arguments[0] || {},
          i = 1,
          length = arguments[LEXICON.l],
          deep = false; // Handle a deep copy situation

      if (_type(target) == TYPES.b) {
        deep = target;
        target = arguments[1] || {}; // skip the boolean and the target

        i = 2;
      } // Handle case when target is a string or something (possible in deep copy)


      if (_type(target) != TYPES.o && !_type(target) == TYPES.f) {
        target = {};
      } // extend jQuery itself if only one argument is passed


      if (length === i) {
        target = FakejQuery;
        --i;
      }

      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
          // Extend the base object
          for (name in options) {
            src = target[name];
            copy = options[name]; // Prevent never-ending loop

            if (target === copy) {
              continue;
            } // Recurse if we're merging plain objects or arrays


            if (deep && copy && (isPlainObject(copy) || (copyIsArray = COMPATIBILITY.isA(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && COMPATIBILITY.isA(src) ? src : [];
              } else {
                clone = src && isPlainObject(src) ? src : {};
              } // Never move original objects, clone them


              target[name] = extend(deep, clone, copy); // Don't bring in undefined values
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      } // Return the modified object


      return target;
    }

    ;

    function inArray(item, arr, fromIndex) {
      for (var i = fromIndex || 0; i < arr[LEXICON.l]; i++) {
        if (arr[i] === item) return i;
      }

      return -1;
    }

    function isFunction(obj) {
      return _type(obj) == TYPES.f;
    }

    ;

    function isEmptyObject(obj) {
      for (var name in obj) {
        return false;
      }

      return true;
    }

    ;

    function isPlainObject(obj) {
      if (!obj || _type(obj) != TYPES.o) return false;
      var key;
      var proto = LEXICON.p;
      var hasOwnProperty = Object[proto].hasOwnProperty;
      var hasOwnConstructor = hasOwnProperty.call(obj, 'constructor');
      var hasIsPrototypeOf = obj.constructor && obj.constructor[proto] && hasOwnProperty.call(obj.constructor[proto], 'isPrototypeOf');

      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }

      for (key in obj) {
        /**/
      }

      return _type(key) == TYPES.u || hasOwnProperty.call(obj, key);
    }

    ;

    function _each(obj, callback) {
      var i = 0;

      if (isArrayLike(obj)) {
        for (; i < obj[LEXICON.l]; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) break;
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) break;
        }
      }

      return obj;
    }

    ;

    function isArrayLike(obj) {
      var length = !!obj && [LEXICON.l] in obj && obj[LEXICON.l];

      var t = _type(obj);

      return isFunction(t) ? false : t == TYPES.a || length === 0 || _type(length) == TYPES.n && length > 0 && length - 1 in obj;
    }

    function stripAndCollapse(value) {
      var tokens = value.match(_rnothtmlwhite) || [];
      return tokens.join(_strSpace);
    }

    function matches(elem, selector) {
      var nodeList = (elem.parentNode || document).querySelectorAll(selector) || [];
      var i = nodeList[LEXICON.l];

      while (i--) {
        if (nodeList[i] == elem) return true;
      }

      return false;
    }

    function insertAdjacentElement(el, strategy, child) {
      if (COMPATIBILITY.isA(child)) {
        for (var i = 0; i < child[LEXICON.l]; i++) {
          insertAdjacentElement(el, strategy, child[i]);
        }
      } else if (_type(child) == TYPES.s) el.insertAdjacentHTML(strategy, child);else el.insertAdjacentElement(strategy, child.nodeType ? child : child[0]);
    }

    function setCSSVal(el, prop, val) {
      try {
        if (el[LEXICON.s][prop] !== undefined) el[LEXICON.s][prop] = parseCSSVal(prop, val);
      } catch (e) {}
    }

    function parseCSSVal(prop, val) {
      if (!_cssNumber[prop.toLowerCase()] && _type(val) == TYPES.n) val += 'px';
      return val;
    }

    function startNextAnimationInQ(animObj, removeFromQ) {
      var index;
      var nextAnim;
      if (removeFromQ !== false) animObj.q.splice(0, 1);

      if (animObj.q[LEXICON.l] > 0) {
        nextAnim = animObj.q[0];

        _animate(animObj.el, nextAnim.props, nextAnim.duration, nextAnim.easing, nextAnim.complete, true);
      } else {
        index = inArray(animObj, _animations);
        if (index > -1) _animations.splice(index, 1);
      }
    }

    function setAnimationValue(el, prop, value) {
      if (prop === _strScrollLeft || prop === _strScrollTop) el[prop] = value;else setCSSVal(el, prop, value);
    }

    function _animate(el, props, options, easing, complete, guaranteedNext) {
      var hasOptions = isPlainObject(options);
      var from = {};
      var to = {};
      var i = 0;
      var key;
      var animObj;
      var start;
      var progress;
      var step;
      var specialEasing;
      var duration;

      if (hasOptions) {
        easing = options.easing;
        start = options.start;
        progress = options.progress;
        step = options.step;
        specialEasing = options.specialEasing;
        complete = options.complete;
        duration = options.duration;
      } else duration = options;

      specialEasing = specialEasing || {};
      duration = duration || 400;
      easing = easing || 'swing';
      guaranteedNext = guaranteedNext || false;

      for (; i < _animations[LEXICON.l]; i++) {
        if (_animations[i].el === el) {
          animObj = _animations[i];
          break;
        }
      }

      if (!animObj) {
        animObj = {
          el: el,
          q: []
        };

        _animations.push(animObj);
      }

      for (key in props) {
        if (key === _strScrollLeft || key === _strScrollTop) from[key] = el[key];else from[key] = FakejQuery(el).css(key);
      }

      for (key in from) {
        if (from[key] !== props[key] && props[key] !== undefined) to[key] = props[key];
      }

      if (!isEmptyObject(to)) {
        var timeNow;
        var end;
        var percent;
        var fromVal;
        var toVal;
        var easedVal;
        var timeStart;

        var _frame;

        var elapsed;
        var qPos = guaranteedNext ? 0 : inArray(qObj, animObj.q);
        var qObj = {
          props: to,
          duration: hasOptions ? options : duration,
          easing: easing,
          complete: complete
        };

        if (qPos === -1) {
          qPos = animObj.q[LEXICON.l];
          animObj.q.push(qObj);
        }

        if (qPos === 0) {
          if (duration > 0) {
            timeStart = COMPATIBILITY.now();

            _frame = function frame() {
              timeNow = COMPATIBILITY.now();
              elapsed = timeNow - timeStart;
              end = qObj.stop || elapsed >= duration;
              percent = 1 - (MATH.max(0, timeStart + duration - timeNow) / duration || 0);

              for (key in to) {
                fromVal = parseFloat(from[key]);
                toVal = parseFloat(to[key]);
                easedVal = (toVal - fromVal) * EASING[specialEasing[key] || easing](percent, percent * duration, 0, 1, duration) + fromVal;
                setAnimationValue(el, key, easedVal);

                if (isFunction(step)) {
                  step(easedVal, {
                    elem: el,
                    prop: key,
                    start: fromVal,
                    now: easedVal,
                    end: toVal,
                    pos: percent,
                    options: {
                      easing: easing,
                      speacialEasing: specialEasing,
                      duration: duration,
                      complete: complete,
                      step: step
                    },
                    startTime: timeStart
                  });
                }
              }

              if (isFunction(progress)) progress({}, percent, MATH.max(0, duration - elapsed));

              if (end) {
                startNextAnimationInQ(animObj);
                if (isFunction(complete)) complete();
              } else qObj.frame = COMPATIBILITY.rAF()(_frame);
            };

            qObj.frame = COMPATIBILITY.rAF()(_frame);
          } else {
            for (key in to) {
              setAnimationValue(el, key, to[key]);
            }

            startNextAnimationInQ(animObj);
          }
        }
      } else if (guaranteedNext) startNextAnimationInQ(animObj);
    }

    function _stop(el, clearQ, jumpToEnd) {
      var animObj;
      var qObj;
      var key;
      var i = 0;

      for (; i < _animations[LEXICON.l]; i++) {
        animObj = _animations[i];

        if (animObj.el === el) {
          if (animObj.q[LEXICON.l] > 0) {
            qObj = animObj.q[0];
            qObj.stop = true;
            COMPATIBILITY.cAF()(qObj.frame);
            animObj.q.splice(0, 1);
            if (jumpToEnd) for (key in qObj.props) {
              setAnimationValue(el, key, qObj.props[key]);
            }
            if (clearQ) animObj.q = [];else startNextAnimationInQ(animObj, false);
          }

          break;
        }
      }
    }

    function elementIsVisible(el) {
      return !!(el[LEXICON.oW] || el[LEXICON.oH] || el.getClientRects()[LEXICON.l]);
    }

    function FakejQuery(selector) {
      if (arguments[LEXICON.l] === 0) return this;
      var base = new FakejQuery();
      var elements = selector;
      var i = 0;
      var elms;
      var el;

      if (_type(selector) == TYPES.s) {
        elements = [];

        if (selector.charAt(0) === '<') {
          el = document.createElement('div');
          el.innerHTML = selector;
          elms = el.children;
        } else {
          elms = document.querySelectorAll(selector);
        }

        for (; i < elms[LEXICON.l]; i++) {
          elements.push(elms[i]);
        }
      }

      if (elements) {
        if (_type(elements) != TYPES.s && (!isArrayLike(elements) || elements === window || elements === elements.self)) elements = [elements];

        for (i = 0; i < elements[LEXICON.l]; i++) {
          base[i] = elements[i];
        }

        base[LEXICON.l] = elements[LEXICON.l];
      }

      return base;
    }

    ;
    FakejQuery[LEXICON.p] = {
      //EVENTS:
      on: function on(eventName, handler) {
        eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];
        var eventNameLength = eventName[LEXICON.l];
        var i = 0;
        var el;
        return this.each(function () {
          el = this;

          try {
            if (el.addEventListener) {
              for (; i < eventNameLength; i++) {
                el.addEventListener(eventName[i], handler);
              }
            } else if (el.detachEvent) {
              for (; i < eventNameLength; i++) {
                el.attachEvent('on' + eventName[i], handler);
              }
            }
          } catch (e) {}
        });
      },
      off: function off(eventName, handler) {
        eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];
        var eventNameLength = eventName[LEXICON.l];
        var i = 0;
        var el;
        return this.each(function () {
          el = this;

          try {
            if (el.removeEventListener) {
              for (; i < eventNameLength; i++) {
                el.removeEventListener(eventName[i], handler);
              }
            } else if (el.detachEvent) {
              for (; i < eventNameLength; i++) {
                el.detachEvent('on' + eventName[i], handler);
              }
            }
          } catch (e) {}
        });
      },
      one: function one(eventName, handler) {
        eventName = (eventName || _strEmpty).match(_rnothtmlwhite) || [_strEmpty];
        return this.each(function () {
          var el = FakejQuery(this);
          FakejQuery.each(eventName, function (i, oneEventName) {
            var oneHandler = function oneHandler(e) {
              handler.call(this, e);
              el.off(oneEventName, oneHandler);
            };

            el.on(oneEventName, oneHandler);
          });
        });
      },
      trigger: function trigger(eventName) {
        var el;
        var event;
        return this.each(function () {
          el = this;

          if (document.createEvent) {
            event = document.createEvent('HTMLEvents');
            event.initEvent(eventName, true, false);
            el.dispatchEvent(event);
          } else {
            el.fireEvent('on' + eventName);
          }
        });
      },
      //DOM NODE INSERTING / REMOVING:
      append: function append(child) {
        return this.each(function () {
          insertAdjacentElement(this, 'beforeend', child);
        });
      },
      prepend: function prepend(child) {
        return this.each(function () {
          insertAdjacentElement(this, 'afterbegin', child);
        });
      },
      before: function before(child) {
        return this.each(function () {
          insertAdjacentElement(this, 'beforebegin', child);
        });
      },
      after: function after(child) {
        return this.each(function () {
          insertAdjacentElement(this, 'afterend', child);
        });
      },
      remove: function remove() {
        return this.each(function () {
          var el = this;
          var parentNode = el.parentNode;
          if (parentNode != null) parentNode.removeChild(el);
        });
      },
      unwrap: function unwrap() {
        var parents = [];
        var i;
        var el;
        var parent;
        this.each(function () {
          parent = this.parentNode;
          if (inArray(parent, parents) === -1) parents.push(parent);
        });

        for (i = 0; i < parents[LEXICON.l]; i++) {
          el = parents[i];
          parent = el.parentNode;

          while (el.firstChild) {
            parent.insertBefore(el.firstChild, el);
          }

          parent.removeChild(el);
        }

        return this;
      },
      wrapAll: function wrapAll(wrapperHTML) {
        var i;
        var nodes = this;
        var wrapper = FakejQuery(wrapperHTML)[0];
        var deepest = wrapper;
        var parent = nodes[0].parentNode;
        var previousSibling = nodes[0].previousSibling;

        while (deepest.childNodes[LEXICON.l] > 0) {
          deepest = deepest.childNodes[0];
        }

        for (i = 0; nodes[LEXICON.l] - i; deepest.firstChild === nodes[0] && i++) {
          deepest.appendChild(nodes[i]);
        }

        var nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild;
        parent.insertBefore(wrapper, nextSibling);
        return this;
      },
      wrapInner: function wrapInner(wrapperHTML) {
        return this.each(function () {
          var el = FakejQuery(this);
          var contents = el.contents();
          if (contents[LEXICON.l]) contents.wrapAll(wrapperHTML);else el.append(wrapperHTML);
        });
      },
      wrap: function wrap(wrapperHTML) {
        return this.each(function () {
          FakejQuery(this).wrapAll(wrapperHTML);
        });
      },
      //DOM NODE MANIPULATION / INFORMATION:
      css: function css(styles, val) {
        var el;
        var key;
        var cptStyle;
        var getCptStyle = window.getComputedStyle;

        if (_type(styles) == TYPES.s) {
          if (val === undefined) {
            el = this[0];
            cptStyle = getCptStyle ? getCptStyle(el, null) : el.currentStyle[styles]; //https://bugzilla.mozilla.org/show_bug.cgi?id=548397 can be null sometimes if iframe with display: none (firefox only!)

            return getCptStyle ? cptStyle != null ? cptStyle.getPropertyValue(styles) : el[LEXICON.s][styles] : cptStyle;
          } else {
            return this.each(function () {
              setCSSVal(this, styles, val);
            });
          }
        } else {
          return this.each(function () {
            for (key in styles) {
              setCSSVal(this, key, styles[key]);
            }
          });
        }
      },
      hasClass: function hasClass(className) {
        var elem,
            i = 0;
        var classNamePrepared = _strSpace + className + _strSpace;
        var classList;

        while (elem = this[i++]) {
          classList = elem.classList;
          if (classList && classList.contains(className)) return true;else if (elem.nodeType === 1 && (_strSpace + stripAndCollapse(elem.className + _strEmpty) + _strSpace).indexOf(classNamePrepared) > -1) return true;
        }

        return false;
      },
      addClass: function addClass(className) {
        var classes;
        var elem;
        var cur;
        var curValue;
        var clazz;
        var finalValue;
        var supportClassList;
        var elmClassList;
        var i = 0;
        var v = 0;

        if (className) {
          classes = className.match(_rnothtmlwhite) || [];

          while (elem = this[i++]) {
            elmClassList = elem.classList;
            if (supportClassList === undefined) supportClassList = elmClassList !== undefined;

            if (supportClassList) {
              while (clazz = classes[v++]) {
                elmClassList.add(clazz);
              }
            } else {
              curValue = elem.className + _strEmpty;
              cur = elem.nodeType === 1 && _strSpace + stripAndCollapse(curValue) + _strSpace;

              if (cur) {
                while (clazz = classes[v++]) {
                  if (cur.indexOf(_strSpace + clazz + _strSpace) < 0) cur += clazz + _strSpace;
                }

                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) elem.className = finalValue;
              }
            }
          }
        }

        return this;
      },
      removeClass: function removeClass(className) {
        var classes;
        var elem;
        var cur;
        var curValue;
        var clazz;
        var finalValue;
        var supportClassList;
        var elmClassList;
        var i = 0;
        var v = 0;

        if (className) {
          classes = className.match(_rnothtmlwhite) || [];

          while (elem = this[i++]) {
            elmClassList = elem.classList;
            if (supportClassList === undefined) supportClassList = elmClassList !== undefined;

            if (supportClassList) {
              while (clazz = classes[v++]) {
                elmClassList.remove(clazz);
              }
            } else {
              curValue = elem.className + _strEmpty;
              cur = elem.nodeType === 1 && _strSpace + stripAndCollapse(curValue) + _strSpace;

              if (cur) {
                while (clazz = classes[v++]) {
                  while (cur.indexOf(_strSpace + clazz + _strSpace) > -1) {
                    cur = cur.replace(_strSpace + clazz + _strSpace, _strSpace);
                  }
                }

                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) elem.className = finalValue;
              }
            }
          }
        }

        return this;
      },
      hide: function hide() {
        return this.each(function () {
          this[LEXICON.s].display = 'none';
        });
      },
      show: function show() {
        return this.each(function () {
          this[LEXICON.s].display = 'block';
        });
      },
      attr: function attr(attrName, value) {
        var i = 0;
        var el;

        while (el = this[i++]) {
          if (value === undefined) return el.getAttribute(attrName);
          el.setAttribute(attrName, value);
        }

        return this;
      },
      removeAttr: function removeAttr(attrName) {
        return this.each(function () {
          this.removeAttribute(attrName);
        });
      },
      offset: function offset() {
        var el = this[0];
        var rect = el[LEXICON.bCR]();
        var scrollLeft = window.pageXOffset || document.documentElement[_strScrollLeft];
        var scrollTop = window.pageYOffset || document.documentElement[_strScrollTop];
        return {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft
        };
      },
      position: function position() {
        var el = this[0];
        return {
          top: el.offsetTop,
          left: el.offsetLeft
        };
      },
      scrollLeft: function scrollLeft(value) {
        var i = 0;
        var el;

        while (el = this[i++]) {
          if (value === undefined) return el[_strScrollLeft];
          el[_strScrollLeft] = value;
        }

        return this;
      },
      scrollTop: function scrollTop(value) {
        var i = 0;
        var el;

        while (el = this[i++]) {
          if (value === undefined) return el[_strScrollTop];
          el[_strScrollTop] = value;
        }

        return this;
      },
      val: function val(value) {
        var el = this[0];
        if (!value) return el.value;
        el.value = value;
        return this;
      },
      //DOM TRAVERSAL / FILTERING:
      first: function first() {
        return this.eq(0);
      },
      last: function last() {
        return this.eq(-1);
      },
      eq: function eq(index) {
        return FakejQuery(this[index >= 0 ? index : this[LEXICON.l] + index]);
      },
      find: function find(selector) {
        var children = [];
        var i;
        this.each(function () {
          var el = this;
          var ch = el.querySelectorAll(selector);

          for (i = 0; i < ch[LEXICON.l]; i++) {
            children.push(ch[i]);
          }
        });
        return FakejQuery(children);
      },
      children: function children(selector) {
        var children = [];
        var el;
        var ch;
        var i;
        this.each(function () {
          ch = this.children;

          for (i = 0; i < ch[LEXICON.l]; i++) {
            el = ch[i];

            if (selector) {
              if (el.matches && el.matches(selector) || matches(el, selector)) children.push(el);
            } else children.push(el);
          }
        });
        return FakejQuery(children);
      },
      parent: function parent(selector) {
        var parents = [];
        var parent;
        this.each(function () {
          parent = this.parentNode;
          if (selector ? FakejQuery(parent).is(selector) : true) parents.push(parent);
        });
        return FakejQuery(parents);
      },
      is: function is(selector) {
        var el;
        var i;

        for (i = 0; i < this[LEXICON.l]; i++) {
          el = this[i];
          if (selector === ':visible') return elementIsVisible(el);
          if (selector === ':hidden') return !elementIsVisible(el);
          if (el.matches && el.matches(selector) || matches(el, selector)) return true;
        }

        return false;
      },
      contents: function contents() {
        var contents = [];
        var childs;
        var i;
        this.each(function () {
          childs = this.childNodes;

          for (i = 0; i < childs[LEXICON.l]; i++) {
            contents.push(childs[i]);
          }
        });
        return FakejQuery(contents);
      },
      each: function each(callback) {
        return _each(this, callback);
      },
      //ANIMATION:
      animate: function animate(props, duration, easing, complete) {
        return this.each(function () {
          _animate(this, props, duration, easing, complete);
        });
      },
      stop: function stop(clearQ, jump) {
        return this.each(function () {
          _stop(this, clearQ, jump);
        });
      }
    };
    extend(FakejQuery, {
      extend: extend,
      inArray: inArray,
      isEmptyObject: isEmptyObject,
      isPlainObject: isPlainObject,
      each: _each
    });
    return FakejQuery;
  }();

  var INSTANCES = function () {
    var _targets = [];
    var _instancePropertyString = '__overlayScrollbars__';
    /**
     * Register, unregister or get a certain (or all) instances.
     * Register: Pass the target and the instance.
     * Unregister: Pass the target and null.
     * Get Instance: Pass the target from which the instance shall be got.
     * Get Targets: Pass no arguments.
     * @param target The target to which the instance shall be registered / from which the instance shall be unregistered / the instance shall be got
     * @param instance The instance.
     * @returns {*|void} Returns the instance from the given target.
     */

    return function (target, instance) {
      var argLen = arguments[LEXICON.l];

      if (argLen < 1) {
        //return all targets
        return _targets;
      } else {
        if (instance) {
          //register instance
          target[_instancePropertyString] = instance;

          _targets.push(target);
        } else {
          var index = COMPATIBILITY.inA(target, _targets);

          if (index > -1) {
            if (argLen > 1) {
              //unregister instance
              delete target[_instancePropertyString];

              _targets.splice(index, 1);
            } else {
              //get instance from target
              return _targets[index][_instancePropertyString];
            }
          }
        }
      }
    };
  }();

  var PLUGIN = function () {
    var _plugin;

    var _pluginsGlobals;

    var _pluginsAutoUpdateLoop;

    var _pluginsExtensions = [];

    var _pluginsOptions = function () {
      var type = COMPATIBILITY.type;
      var possibleTemplateTypes = [TYPES.b, //boolean
      TYPES.n, //number
      TYPES.s, //string
      TYPES.a, //array
      TYPES.o, //object
      TYPES.f, //function
      TYPES.z //null
      ];
      var restrictedStringsSplit = ' ';
      var restrictedStringsPossibilitiesSplit = ':';
      var classNameAllowedValues = [TYPES.z, TYPES.s];
      var numberAllowedValues = TYPES.n;
      var booleanNullAllowedValues = [TYPES.z, TYPES.b];
      var booleanTrueTemplate = [true, TYPES.b];
      var booleanFalseTemplate = [false, TYPES.b];
      var callbackTemplate = [null, [TYPES.z, TYPES.f]];
      var updateOnLoadTemplate = [['img'], [TYPES.s, TYPES.a, TYPES.z]];
      var inheritedAttrsTemplate = [['style', 'class'], [TYPES.s, TYPES.a, TYPES.z]];
      var resizeAllowedValues = 'n:none b:both h:horizontal v:vertical';
      var overflowBehaviorAllowedValues = 'v-h:visible-hidden v-s:visible-scroll s:scroll h:hidden';
      var scrollbarsVisibilityAllowedValues = 'v:visible h:hidden a:auto';
      var scrollbarsAutoHideAllowedValues = 'n:never s:scroll l:leave m:move';
      var optionsDefaultsAndTemplate = {
        className: ['os-theme-dark', classNameAllowedValues],
        //null || string
        resize: ['none', resizeAllowedValues],
        //none || both  || horizontal || vertical || n || b || h || v
        sizeAutoCapable: booleanTrueTemplate,
        //true || false
        clipAlways: booleanTrueTemplate,
        //true || false
        normalizeRTL: booleanTrueTemplate,
        //true || false
        paddingAbsolute: booleanFalseTemplate,
        //true || false
        autoUpdate: [null, booleanNullAllowedValues],
        //true || false || null
        autoUpdateInterval: [33, numberAllowedValues],
        //number
        updateOnLoad: updateOnLoadTemplate,
        //string || array || null
        nativeScrollbarsOverlaid: {
          showNativeScrollbars: booleanFalseTemplate,
          //true || false
          initialize: booleanTrueTemplate //true || false

        },
        overflowBehavior: {
          x: ['scroll', overflowBehaviorAllowedValues],
          //visible-hidden  || visible-scroll || hidden || scroll || v-h || v-s || h || s
          y: ['scroll', overflowBehaviorAllowedValues] //visible-hidden  || visible-scroll || hidden || scroll || v-h || v-s || h || s

        },
        scrollbars: {
          visibility: ['auto', scrollbarsVisibilityAllowedValues],
          //visible || hidden || auto || v || h || a
          autoHide: ['never', scrollbarsAutoHideAllowedValues],
          //never || scroll || leave || move || n || s || l || m
          autoHideDelay: [800, numberAllowedValues],
          //number
          dragScrolling: booleanTrueTemplate,
          //true || false
          clickScrolling: booleanFalseTemplate,
          //true || false
          touchSupport: booleanTrueTemplate,
          //true || false
          snapHandle: booleanFalseTemplate //true || false

        },
        textarea: {
          dynWidth: booleanFalseTemplate,
          //true || false
          dynHeight: booleanFalseTemplate,
          //true || false
          inheritedAttrs: inheritedAttrsTemplate //string || array || null

        },
        callbacks: {
          onInitialized: callbackTemplate,
          //null || function
          onInitializationWithdrawn: callbackTemplate,
          //null || function
          onDestroyed: callbackTemplate,
          //null || function
          onScrollStart: callbackTemplate,
          //null || function
          onScroll: callbackTemplate,
          //null || function
          onScrollStop: callbackTemplate,
          //null || function
          onOverflowChanged: callbackTemplate,
          //null || function
          onOverflowAmountChanged: callbackTemplate,
          //null || function
          onDirectionChanged: callbackTemplate,
          //null || function
          onContentSizeChanged: callbackTemplate,
          //null || function
          onHostSizeChanged: callbackTemplate,
          //null || function
          onUpdated: callbackTemplate //null || function

        }
      };

      var convert = function convert(template) {
        var recursive = function recursive(obj) {
          var key;
          var val;
          var valType;

          for (key in obj) {
            if (!obj[LEXICON.hOP](key)) continue;
            val = obj[key];
            valType = type(val);
            if (valType == TYPES.a) obj[key] = val[template ? 1 : 0];else if (valType == TYPES.o) obj[key] = recursive(val);
          }

          return obj;
        };

        return recursive(FRAMEWORK.extend(true, {}, optionsDefaultsAndTemplate));
      };

      return {
        _defaults: convert(),
        _template: convert(true),

        /**
         * Validates the passed object by the passed template.
         * @param obj The object which shall be validated.
         * @param template The template which defines the allowed values and types.
         * @param writeErrors True if errors shall be logged to the console.
         * @param diffObj If a object is passed then only valid differences to this object will be returned.
         * @returns {{}} A object which contains two objects called "default" and "prepared" which contains only the valid properties of the passed original object and discards not different values compared to the passed diffObj.
         */
        _validate: function _validate(obj, template, writeErrors, diffObj) {
          var validatedOptions = {};
          var validatedOptionsPrepared = {};
          var objectCopy = FRAMEWORK.extend(true, {}, obj);
          var inArray = FRAMEWORK.inArray;
          var isEmptyObj = FRAMEWORK.isEmptyObject;

          var checkObjectProps = function checkObjectProps(data, template, diffData, validatedOptions, validatedOptionsPrepared, prevPropName) {
            for (var prop in template) {
              if (template[LEXICON.hOP](prop) && data[LEXICON.hOP](prop)) {
                var isValid = false;
                var isDiff = false;
                var templateValue = template[prop];
                var templateValueType = type(templateValue);
                var templateIsComplex = templateValueType == TYPES.o;
                var templateTypes = !COMPATIBILITY.isA(templateValue) ? [templateValue] : templateValue;
                var dataDiffValue = diffData[prop];
                var dataValue = data[prop];
                var dataValueType = type(dataValue);
                var propPrefix = prevPropName ? prevPropName + '.' : '';
                var error = "The option \"" + propPrefix + prop + "\" wasn't set, because";
                var errorPossibleTypes = [];
                var errorRestrictedStrings = [];
                var restrictedStringValuesSplit;
                var restrictedStringValuesPossibilitiesSplit;
                var isRestrictedValue;
                var mainPossibility;
                var currType;
                var i;
                var v;
                var j;
                dataDiffValue = dataDiffValue === undefined ? {} : dataDiffValue; //if the template has a object as value, it means that the options are complex (verschachtelt)

                if (templateIsComplex && dataValueType == TYPES.o) {
                  validatedOptions[prop] = {};
                  validatedOptionsPrepared[prop] = {};
                  checkObjectProps(dataValue, templateValue, dataDiffValue, validatedOptions[prop], validatedOptionsPrepared[prop], propPrefix + prop);
                  FRAMEWORK.each([data, validatedOptions, validatedOptionsPrepared], function (index, value) {
                    if (isEmptyObj(value[prop])) {
                      delete value[prop];
                    }
                  });
                } else if (!templateIsComplex) {
                  for (i = 0; i < templateTypes[LEXICON.l]; i++) {
                    currType = templateTypes[i];
                    templateValueType = type(currType); //if currtype is string and starts with restrictedStringPrefix and end with restrictedStringSuffix

                    isRestrictedValue = templateValueType == TYPES.s && inArray(currType, possibleTemplateTypes) === -1;

                    if (isRestrictedValue) {
                      errorPossibleTypes.push(TYPES.s); //split it into a array which contains all possible values for example: ["y:yes", "n:no", "m:maybe"]

                      restrictedStringValuesSplit = currType.split(restrictedStringsSplit);
                      errorRestrictedStrings = errorRestrictedStrings.concat(restrictedStringValuesSplit);

                      for (v = 0; v < restrictedStringValuesSplit[LEXICON.l]; v++) {
                        //split the possible values into their possibiliteis for example: ["y", "yes"] -> the first is always the mainPossibility
                        restrictedStringValuesPossibilitiesSplit = restrictedStringValuesSplit[v].split(restrictedStringsPossibilitiesSplit);
                        mainPossibility = restrictedStringValuesPossibilitiesSplit[0];

                        for (j = 0; j < restrictedStringValuesPossibilitiesSplit[LEXICON.l]; j++) {
                          //if any possibility matches with the dataValue, its valid
                          if (dataValue === restrictedStringValuesPossibilitiesSplit[j]) {
                            isValid = true;
                            break;
                          }
                        }

                        if (isValid) break;
                      }
                    } else {
                      errorPossibleTypes.push(currType);

                      if (dataValueType === currType) {
                        isValid = true;
                        break;
                      }
                    }
                  }

                  if (isValid) {
                    isDiff = dataValue !== dataDiffValue;
                    if (isDiff) validatedOptions[prop] = dataValue;
                    if (isRestrictedValue ? inArray(dataDiffValue, restrictedStringValuesPossibilitiesSplit) < 0 : isDiff) validatedOptionsPrepared[prop] = isRestrictedValue ? mainPossibility : dataValue;
                  } else if (writeErrors) {
                    console.warn(error + " it doesn't accept the type [ " + dataValueType.toUpperCase() + " ] with the value of \"" + dataValue + "\".\r\n" + "Accepted types are: [ " + errorPossibleTypes.join(', ').toUpperCase() + " ]." + (errorRestrictedStrings[length] > 0 ? "\r\nValid strings are: [ " + errorRestrictedStrings.join(', ').split(restrictedStringsPossibilitiesSplit).join(', ') + " ]." : ''));
                  }

                  delete data[prop];
                }
              }
            }
          };

          checkObjectProps(objectCopy, template, diffObj || {}, validatedOptions, validatedOptionsPrepared); //add values which aren't specified in the template to the finished validated object to prevent them from being discarded

          /*
          if(keepForeignProps) {
              FRAMEWORK.extend(true, validatedOptions, objectCopy);
              FRAMEWORK.extend(true, validatedOptionsPrepared, objectCopy);
          }
          */

          if (!isEmptyObj(objectCopy) && writeErrors) console.warn('The following options are discarded due to invalidity:\r\n' + window.JSON.stringify(objectCopy, null, 2));
          return {
            _default: validatedOptions,
            _prepared: validatedOptionsPrepared
          };
        }
      };
    }();
    /**
     * Initializes the object which contains global information about the plugin and each instance of it.
     */


    function initOverlayScrollbarsStatics() {
      if (!_pluginsGlobals) _pluginsGlobals = new OverlayScrollbarsGlobals(_pluginsOptions._defaults);
      if (!_pluginsAutoUpdateLoop) _pluginsAutoUpdateLoop = new OverlayScrollbarsAutoUpdateLoop(_pluginsGlobals);
    }
    /**
     * The global object for the OverlayScrollbars objects. It contains resources which every OverlayScrollbars object needs. This object is initialized only once: if the first OverlayScrollbars object gets initialized.
     * @param defaultOptions
     * @constructor
     */


    function OverlayScrollbarsGlobals(defaultOptions) {
      var _base = this;

      var strOverflow = 'overflow';
      var strHidden = 'hidden';
      var strScroll = 'scroll';
      var bodyElement = FRAMEWORK('body');
      var scrollbarDummyElement = FRAMEWORK('<div id="os-dummy-scrollbar-size"><div></div></div>');
      var scrollbarDummyElement0 = scrollbarDummyElement[0];
      var dummyContainerChild = FRAMEWORK(scrollbarDummyElement.children('div').eq(0));
      bodyElement.append(scrollbarDummyElement);
      scrollbarDummyElement.hide().show(); //fix IE8 bug (incorrect measuring)

      var nativeScrollbarSize = calcNativeScrollbarSize(scrollbarDummyElement0);
      var nativeScrollbarIsOverlaid = {
        x: nativeScrollbarSize.x === 0,
        y: nativeScrollbarSize.y === 0
      };

      var msie = function () {
        var ua = window.navigator.userAgent;
        var strIndexOf = 'indexOf';
        var strSubString = 'substring';
        var msie = ua[strIndexOf]('MSIE ');
        var trident = ua[strIndexOf]('Trident/');
        var edge = ua[strIndexOf]('Edge/');
        var rv = ua[strIndexOf]('rv:');
        var result;
        var parseIntFunc = parseInt; // IE 10 or older => return version number

        if (msie > 0) result = parseIntFunc(ua[strSubString](msie + 5, ua[strIndexOf]('.', msie)), 10); // IE 11 => return version number
        else if (trident > 0) result = parseIntFunc(ua[strSubString](rv + 3, ua[strIndexOf]('.', rv)), 10); // Edge (IE 12+) => return version number
          else if (edge > 0) result = parseIntFunc(ua[strSubString](edge + 5, ua[strIndexOf]('.', edge)), 10); // other browser

        return result;
      }();

      FRAMEWORK.extend(_base, {
        defaultOptions: defaultOptions,
        msie: msie,
        autoUpdateLoop: false,
        autoUpdateRecommended: !COMPATIBILITY.mO(),
        nativeScrollbarSize: nativeScrollbarSize,
        nativeScrollbarIsOverlaid: nativeScrollbarIsOverlaid,
        nativeScrollbarStyling: function () {
          var result = false;
          scrollbarDummyElement.addClass('os-viewport-native-scrollbars-invisible');

          try {
            result = scrollbarDummyElement.css('scrollbar-width') === 'none' && (msie > 9 || !msie) || window.getComputedStyle(scrollbarDummyElement0, '::-webkit-scrollbar').getPropertyValue('display') === 'none';
          } catch (ex) {} //fix opera bug: scrollbar styles will only appear if overflow value is scroll or auto during the activation of the style.
          //and set overflow to scroll
          //scrollbarDummyElement.css(strOverflow, strHidden).hide().css(strOverflow, strScroll).show();
          //return (scrollbarDummyElement0[LEXICON.oH] - scrollbarDummyElement0[LEXICON.cH]) === 0 && (scrollbarDummyElement0[LEXICON.oW] - scrollbarDummyElement0[LEXICON.cW]) === 0;


          return result;
        }(),
        overlayScrollbarDummySize: {
          x: 30,
          y: 30
        },
        cssCalc: VENDORS._cssPropertyValue('width', 'calc', '(1px)') || null,
        restrictedMeasuring: function () {
          //https://bugzilla.mozilla.org/show_bug.cgi?id=1439305
          //since 1.11.0 always false -> fixed via CSS (hopefully)
          scrollbarDummyElement.css(strOverflow, strHidden);
          var scrollSize = {
            w: scrollbarDummyElement0[LEXICON.sW],
            h: scrollbarDummyElement0[LEXICON.sH]
          };
          scrollbarDummyElement.css(strOverflow, 'visible');
          var scrollSize2 = {
            w: scrollbarDummyElement0[LEXICON.sW],
            h: scrollbarDummyElement0[LEXICON.sH]
          };
          return scrollSize.w - scrollSize2.w !== 0 || scrollSize.h - scrollSize2.h !== 0;
        }(),
        rtlScrollBehavior: function () {
          scrollbarDummyElement.css({
            'overflow-y': strHidden,
            'overflow-x': strScroll,
            'direction': 'rtl'
          }).scrollLeft(0);
          var dummyContainerOffset = scrollbarDummyElement.offset();
          var dummyContainerChildOffset = dummyContainerChild.offset(); //https://github.com/KingSora/OverlayScrollbars/issues/187

          scrollbarDummyElement.scrollLeft(-999);
          var dummyContainerChildOffsetAfterScroll = dummyContainerChild.offset();
          return {
            //origin direction = determines if the zero scroll position is on the left or right side
            //'i' means 'invert' (i === true means that the axis must be inverted to be correct)
            //true = on the left side
            //false = on the right side
            i: dummyContainerOffset.left === dummyContainerChildOffset.left,
            //negative = determines if the maximum scroll is positive or negative
            //'n' means 'negate' (n === true means that the axis must be negated to be correct)
            //true = negative
            //false = positive
            n: dummyContainerChildOffset.left !== dummyContainerChildOffsetAfterScroll.left
          };
        }(),
        supportTransform: !!VENDORS._cssProperty('transform'),
        supportTransition: !!VENDORS._cssProperty('transition'),
        supportPassiveEvents: function () {
          var supportsPassive = false;

          try {
            window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
              get: function get() {
                supportsPassive = true;
              }
            }));
          } catch (e) {}

          return supportsPassive;
        }(),
        supportResizeObserver: !!COMPATIBILITY.rO(),
        supportMutationObserver: !!COMPATIBILITY.mO()
      });
      scrollbarDummyElement.removeAttr(LEXICON.s).remove(); //Catch zoom event:

      (function () {
        if (nativeScrollbarIsOverlaid.x && nativeScrollbarIsOverlaid.y) return;
        var abs = MATH.abs;
        var windowWidth = COMPATIBILITY.wW();
        var windowHeight = COMPATIBILITY.wH();
        var windowDpr = getWindowDPR();

        var onResize = function onResize() {
          if (INSTANCES().length > 0) {
            var newW = COMPATIBILITY.wW();
            var newH = COMPATIBILITY.wH();
            var deltaW = newW - windowWidth;
            var deltaH = newH - windowHeight;
            if (deltaW === 0 && deltaH === 0) return;
            var deltaWRatio = MATH.round(newW / (windowWidth / 100.0));
            var deltaHRatio = MATH.round(newH / (windowHeight / 100.0));
            var absDeltaW = abs(deltaW);
            var absDeltaH = abs(deltaH);
            var absDeltaWRatio = abs(deltaWRatio);
            var absDeltaHRatio = abs(deltaHRatio);
            var newDPR = getWindowDPR();
            var deltaIsBigger = absDeltaW > 2 && absDeltaH > 2;
            var difference = !differenceIsBiggerThanOne(absDeltaWRatio, absDeltaHRatio);
            var dprChanged = newDPR !== windowDpr && windowDpr > 0;
            var isZoom = deltaIsBigger && difference && dprChanged;
            var oldScrollbarSize = _base.nativeScrollbarSize;
            var newScrollbarSize;

            if (isZoom) {
              bodyElement.append(scrollbarDummyElement);
              newScrollbarSize = _base.nativeScrollbarSize = calcNativeScrollbarSize(scrollbarDummyElement[0]);
              scrollbarDummyElement.remove();

              if (oldScrollbarSize.x !== newScrollbarSize.x || oldScrollbarSize.y !== newScrollbarSize.y) {
                FRAMEWORK.each(INSTANCES(), function () {
                  if (INSTANCES(this)) INSTANCES(this).update('zoom');
                });
              }
            }

            windowWidth = newW;
            windowHeight = newH;
            windowDpr = newDPR;
          }
        };

        function differenceIsBiggerThanOne(valOne, valTwo) {
          var absValOne = abs(valOne);
          var absValTwo = abs(valTwo);
          return !(absValOne === absValTwo || absValOne + 1 === absValTwo || absValOne - 1 === absValTwo);
        }

        function getWindowDPR() {
          var dDPI = window.screen.deviceXDPI || 0;
          var sDPI = window.screen.logicalXDPI || 1;
          return window.devicePixelRatio || dDPI / sDPI;
        }

        FRAMEWORK(window).on('resize', onResize);
      })();

      function calcNativeScrollbarSize(measureElement) {
        return {
          x: measureElement[LEXICON.oH] - measureElement[LEXICON.cH],
          y: measureElement[LEXICON.oW] - measureElement[LEXICON.cW]
        };
      }
    }
    /**
     * The object which manages the auto update loop for all OverlayScrollbars objects. This object is initialized only once: if the first OverlayScrollbars object gets initialized.
     * @constructor
     */


    function OverlayScrollbarsAutoUpdateLoop(globals) {
      var _base = this;

      var _inArray = FRAMEWORK.inArray;
      var _getNow = COMPATIBILITY.now;
      var _strAutoUpdate = 'autoUpdate';

      var _strAutoUpdateInterval = _strAutoUpdate + 'Interval';

      var _strLength = LEXICON.l;
      var _loopingInstances = [];
      var _loopingInstancesIntervalCache = [];
      var _loopIsActive = false;
      var _loopIntervalDefault = 33;
      var _loopInterval = _loopIntervalDefault;

      var _loopTimeOld = _getNow();

      var _loopID;
      /**
       * The auto update loop which will run every 50 milliseconds or less if the update interval of a instance is lower than 50 milliseconds.
       */


      var loop = function loop() {
        if (_loopingInstances[_strLength] > 0 && _loopIsActive) {
          _loopID = COMPATIBILITY.rAF()(function () {
            loop();
          });

          var timeNew = _getNow();

          var timeDelta = timeNew - _loopTimeOld;
          var lowestInterval;
          var instance;
          var instanceOptions;
          var instanceAutoUpdateAllowed;
          var instanceAutoUpdateInterval;
          var now;

          if (timeDelta > _loopInterval) {
            _loopTimeOld = timeNew - timeDelta % _loopInterval;
            lowestInterval = _loopIntervalDefault;

            for (var i = 0; i < _loopingInstances[_strLength]; i++) {
              instance = _loopingInstances[i];

              if (instance !== undefined) {
                instanceOptions = instance.options();
                instanceAutoUpdateAllowed = instanceOptions[_strAutoUpdate];
                instanceAutoUpdateInterval = MATH.max(1, instanceOptions[_strAutoUpdateInterval]);
                now = _getNow();

                if ((instanceAutoUpdateAllowed === true || instanceAutoUpdateAllowed === null) && now - _loopingInstancesIntervalCache[i] > instanceAutoUpdateInterval) {
                  instance.update('auto');
                  _loopingInstancesIntervalCache[i] = new Date(now += instanceAutoUpdateInterval);
                }

                lowestInterval = MATH.max(1, MATH.min(lowestInterval, instanceAutoUpdateInterval));
              }
            }

            _loopInterval = lowestInterval;
          }
        } else {
          _loopInterval = _loopIntervalDefault;
        }
      };
      /**
       * Add OverlayScrollbars instance to the auto update loop. Only successful if the instance isn't already added.
       * @param instance The instance which shall be updated in a loop automatically.
       */


      _base.add = function (instance) {
        if (_inArray(instance, _loopingInstances) === -1) {
          _loopingInstances.push(instance);

          _loopingInstancesIntervalCache.push(_getNow());

          if (_loopingInstances[_strLength] > 0 && !_loopIsActive) {
            _loopIsActive = true;
            globals.autoUpdateLoop = _loopIsActive;
            loop();
          }
        }
      };
      /**
       * Remove OverlayScrollbars instance from the auto update loop. Only successful if the instance was added before.
       * @param instance The instance which shall be updated in a loop automatically.
       */


      _base.remove = function (instance) {
        var index = _inArray(instance, _loopingInstances);

        if (index > -1) {
          //remove from loopingInstances list
          _loopingInstancesIntervalCache.splice(index, 1);

          _loopingInstances.splice(index, 1); //correct update loop behavior


          if (_loopingInstances[_strLength] === 0 && _loopIsActive) {
            _loopIsActive = false;
            globals.autoUpdateLoop = _loopIsActive;

            if (_loopID !== undefined) {
              COMPATIBILITY.cAF()(_loopID);
              _loopID = -1;
            }
          }
        }
      };
    }
    /**
     * A object which manages the scrollbars visibility of the target element.
     * @param pluginTargetElement The element from which the scrollbars shall be hidden.
     * @param options The custom options.
     * @param extensions The custom extensions.
     * @param globals
     * @param autoUpdateLoop
     * @returns {*}
     * @constructor
     */


    function OverlayScrollbarsInstance(pluginTargetElement, options, extensions, globals, autoUpdateLoop) {
      //shortcuts
      var type = COMPATIBILITY.type;
      var inArray = FRAMEWORK.inArray;
      var each = FRAMEWORK.each; //make correct instanceof

      var _base = new _plugin();

      var _frameworkProto = FRAMEWORK[LEXICON.p]; //if passed element is no HTML element: skip and return

      if (!isHTMLElement(pluginTargetElement)) return; //if passed element is already initialized: set passed options if there are any and return its instance

      if (INSTANCES(pluginTargetElement)) {
        var inst = INSTANCES(pluginTargetElement);
        inst.options(options);
        return inst;
      } //globals:


      var _nativeScrollbarIsOverlaid;

      var _overlayScrollbarDummySize;

      var _rtlScrollBehavior;

      var _autoUpdateRecommended;

      var _msieVersion;

      var _nativeScrollbarStyling;

      var _cssCalc;

      var _nativeScrollbarSize;

      var _supportTransition;

      var _supportTransform;

      var _supportPassiveEvents;

      var _supportResizeObserver;

      var _supportMutationObserver;

      var _restrictedMeasuring; //general readonly:


      var _initialized;

      var _destroyed;

      var _isTextarea;

      var _isBody;

      var _documentMixed;

      var _domExists; //general:


      var _isBorderBox;

      var _sizeAutoObserverAdded;

      var _paddingX;

      var _paddingY;

      var _borderX;

      var _borderY;

      var _marginX;

      var _marginY;

      var _isRTL;

      var _sleeping;

      var _contentBorderSize = {};
      var _scrollHorizontalInfo = {};
      var _scrollVerticalInfo = {};
      var _viewportSize = {};
      var _nativeScrollbarMinSize = {}; //naming:	

      var _strMinusHidden = '-hidden';
      var _strMarginMinus = 'margin-';
      var _strPaddingMinus = 'padding-';
      var _strBorderMinus = 'border-';
      var _strTop = 'top';
      var _strRight = 'right';
      var _strBottom = 'bottom';
      var _strLeft = 'left';
      var _strMinMinus = 'min-';
      var _strMaxMinus = 'max-';
      var _strWidth = 'width';
      var _strHeight = 'height';
      var _strFloat = 'float';
      var _strEmpty = '';
      var _strAuto = 'auto';
      var _strSync = 'sync';
      var _strScroll = 'scroll';
      var _strHundredPercent = '100%';
      var _strX = 'x';
      var _strY = 'y';
      var _strDot = '.';
      var _strSpace = ' ';
      var _strScrollbar = 'scrollbar';
      var _strMinusHorizontal = '-horizontal';
      var _strMinusVertical = '-vertical';

      var _strScrollLeft = _strScroll + 'Left';

      var _strScrollTop = _strScroll + 'Top';

      var _strMouseTouchDownEvent = 'mousedown touchstart';
      var _strMouseTouchUpEvent = 'mouseup touchend touchcancel';
      var _strMouseTouchMoveEvent = 'mousemove touchmove';
      var _strMouseEnter = 'mouseenter';
      var _strMouseLeave = 'mouseleave';
      var _strKeyDownEvent = 'keydown';
      var _strKeyUpEvent = 'keyup';
      var _strSelectStartEvent = 'selectstart';
      var _strTransitionEndEvent = 'transitionend webkitTransitionEnd oTransitionEnd';
      var _strResizeObserverProperty = '__overlayScrollbarsRO__'; //class names:	

      var _cassNamesPrefix = 'os-';

      var _classNameHTMLElement = _cassNamesPrefix + 'html';

      var _classNameHostElement = _cassNamesPrefix + 'host';

      var _classNameHostElementForeign = _classNameHostElement + '-foreign';

      var _classNameHostTextareaElement = _classNameHostElement + '-textarea';

      var _classNameHostScrollbarHorizontalHidden = _classNameHostElement + '-' + _strScrollbar + _strMinusHorizontal + _strMinusHidden;

      var _classNameHostScrollbarVerticalHidden = _classNameHostElement + '-' + _strScrollbar + _strMinusVertical + _strMinusHidden;

      var _classNameHostTransition = _classNameHostElement + '-transition';

      var _classNameHostRTL = _classNameHostElement + '-rtl';

      var _classNameHostResizeDisabled = _classNameHostElement + '-resize-disabled';

      var _classNameHostScrolling = _classNameHostElement + '-scrolling';

      var _classNameHostOverflow = _classNameHostElement + '-overflow';

      var _classNameHostOverflow = _classNameHostElement + '-overflow';

      var _classNameHostOverflowX = _classNameHostOverflow + '-x';

      var _classNameHostOverflowY = _classNameHostOverflow + '-y';

      var _classNameTextareaElement = _cassNamesPrefix + 'textarea';

      var _classNameTextareaCoverElement = _classNameTextareaElement + '-cover';

      var _classNamePaddingElement = _cassNamesPrefix + 'padding';

      var _classNameViewportElement = _cassNamesPrefix + 'viewport';

      var _classNameViewportNativeScrollbarsInvisible = _classNameViewportElement + '-native-scrollbars-invisible';

      var _classNameViewportNativeScrollbarsOverlaid = _classNameViewportElement + '-native-scrollbars-overlaid';

      var _classNameContentElement = _cassNamesPrefix + 'content';

      var _classNameContentArrangeElement = _cassNamesPrefix + 'content-arrange';

      var _classNameContentGlueElement = _cassNamesPrefix + 'content-glue';

      var _classNameSizeAutoObserverElement = _cassNamesPrefix + 'size-auto-observer';

      var _classNameResizeObserverElement = _cassNamesPrefix + 'resize-observer';

      var _classNameResizeObserverItemElement = _cassNamesPrefix + 'resize-observer-item';

      var _classNameResizeObserverItemFinalElement = _classNameResizeObserverItemElement + '-final';

      var _classNameTextInherit = _cassNamesPrefix + 'text-inherit';

      var _classNameScrollbar = _cassNamesPrefix + _strScrollbar;

      var _classNameScrollbarTrack = _classNameScrollbar + '-track';

      var _classNameScrollbarTrackOff = _classNameScrollbarTrack + '-off';

      var _classNameScrollbarHandle = _classNameScrollbar + '-handle';

      var _classNameScrollbarHandleOff = _classNameScrollbarHandle + '-off';

      var _classNameScrollbarUnusable = _classNameScrollbar + '-unusable';

      var _classNameScrollbarAutoHidden = _classNameScrollbar + '-' + _strAuto + _strMinusHidden;

      var _classNameScrollbarCorner = _classNameScrollbar + '-corner';

      var _classNameScrollbarCornerResize = _classNameScrollbarCorner + '-resize';

      var _classNameScrollbarCornerResizeB = _classNameScrollbarCornerResize + '-both';

      var _classNameScrollbarCornerResizeH = _classNameScrollbarCornerResize + _strMinusHorizontal;

      var _classNameScrollbarCornerResizeV = _classNameScrollbarCornerResize + _strMinusVertical;

      var _classNameScrollbarHorizontal = _classNameScrollbar + _strMinusHorizontal;

      var _classNameScrollbarVertical = _classNameScrollbar + _strMinusVertical;

      var _classNameDragging = _cassNamesPrefix + 'dragging';

      var _classNameThemeNone = _cassNamesPrefix + 'theme-none';

      var _classNamesDynamicDestroy = [_classNameViewportNativeScrollbarsInvisible, _classNameViewportNativeScrollbarsOverlaid, _classNameScrollbarTrackOff, _classNameScrollbarHandleOff, _classNameScrollbarUnusable, _classNameScrollbarAutoHidden, _classNameScrollbarCornerResize, _classNameScrollbarCornerResizeB, _classNameScrollbarCornerResizeH, _classNameScrollbarCornerResizeV, _classNameDragging].join(_strSpace); //callbacks:	


      var _callbacksInitQeueue = []; //attrs viewport shall inherit from target	

      var _viewportAttrsFromTarget = [LEXICON.ti]; //options:	

      var _defaultOptions;

      var _currentOptions;

      var _currentPreparedOptions; //extensions:	


      var _extensions = {};
      var _extensionsPrivateMethods = 'added removed on contract'; //update	

      var _lastUpdateTime;

      var _swallowedUpdateHints = {};

      var _swallowedUpdateTimeout;

      var _swallowUpdateLag = 42;
      var _updateOnLoadEventName = 'load';
      var _updateOnLoadElms = []; //DOM elements:	

      var _windowElement;

      var _documentElement;

      var _htmlElement;

      var _bodyElement;

      var _targetElement; //the target element of this OverlayScrollbars object	


      var _hostElement; //the host element of this OverlayScrollbars object -> may be the same as targetElement	


      var _sizeAutoObserverElement; //observes size auto changes	


      var _sizeObserverElement; //observes size and padding changes	


      var _paddingElement; //manages the padding	


      var _viewportElement; //is the viewport of our scrollbar model	


      var _contentElement; //the element which holds the content	


      var _contentArrangeElement; //is needed for correct sizing of the content element (only if native scrollbars are overlays)	


      var _contentGlueElement; //has always the size of the content element	


      var _textareaCoverElement; //only applied if target is a textarea element. Used for correct size calculation and for prevention of uncontrolled scrolling	


      var _scrollbarCornerElement;

      var _scrollbarHorizontalElement;

      var _scrollbarHorizontalTrackElement;

      var _scrollbarHorizontalHandleElement;

      var _scrollbarVerticalElement;

      var _scrollbarVerticalTrackElement;

      var _scrollbarVerticalHandleElement;

      var _windowElementNative;

      var _documentElementNative;

      var _targetElementNative;

      var _hostElementNative;

      var _sizeAutoObserverElementNative;

      var _sizeObserverElementNative;

      var _paddingElementNative;

      var _viewportElementNative;

      var _contentElementNative; //Cache:	


      var _hostSizeCache;

      var _contentScrollSizeCache;

      var _arrangeContentSizeCache;

      var _hasOverflowCache;

      var _hideOverflowCache;

      var _widthAutoCache;

      var _heightAutoCache;

      var _cssBoxSizingCache;

      var _cssPaddingCache;

      var _cssBorderCache;

      var _cssMarginCache;

      var _cssDirectionCache;

      var _cssDirectionDetectedCache;

      var _paddingAbsoluteCache;

      var _clipAlwaysCache;

      var _contentGlueSizeCache;

      var _overflowBehaviorCache;

      var _overflowAmountCache;

      var _ignoreOverlayScrollbarHidingCache;

      var _autoUpdateCache;

      var _sizeAutoCapableCache;

      var _contentElementScrollSizeChangeDetectedCache;

      var _hostElementSizeChangeDetectedCache;

      var _scrollbarsVisibilityCache;

      var _scrollbarsAutoHideCache;

      var _scrollbarsClickScrollingCache;

      var _scrollbarsDragScrollingCache;

      var _resizeCache;

      var _normalizeRTLCache;

      var _classNameCache;

      var _oldClassName;

      var _textareaAutoWrappingCache;

      var _textareaInfoCache;

      var _textareaSizeCache;

      var _textareaDynHeightCache;

      var _textareaDynWidthCache;

      var _bodyMinSizeCache;

      var _updateAutoCache = {}; //MutationObserver:	

      var _mutationObserverHost;

      var _mutationObserverContent;

      var _mutationObserverHostCallback;

      var _mutationObserverContentCallback;

      var _mutationObserversConnected;

      var _mutationObserverAttrsTextarea = ['wrap', 'cols', 'rows'];

      var _mutationObserverAttrsHost = [LEXICON.i, LEXICON.c, LEXICON.s, 'open'].concat(_viewportAttrsFromTarget); //events:	


      var _destroyEvents = []; //textarea:	

      var _textareaHasFocus; //scrollbars:	


      var _scrollbarsAutoHideTimeoutId;

      var _scrollbarsAutoHideMoveTimeoutId;

      var _scrollbarsAutoHideDelay;

      var _scrollbarsAutoHideNever;

      var _scrollbarsAutoHideScroll;

      var _scrollbarsAutoHideMove;

      var _scrollbarsAutoHideLeave;

      var _scrollbarsHandleHovered;

      var _scrollbarsHandlesDefineScrollPos; //resize	


      var _resizeNone;

      var _resizeBoth;

      var _resizeHorizontal;

      var _resizeVertical; //==== Event Listener ====//	

      /**	
       * Adds or removes a event listener from the given element. 	
       * @param element The element to which the event listener shall be applied or removed.	
       * @param eventNames The name(s) of the events.	
       * @param listener The method which shall be called.	
       * @param remove True if the handler shall be removed, false or undefined if the handler shall be added.	
       * @param passiveOrOptions The options for the event.
       */


      function setupResponsiveEventListener(element, eventNames, listener, remove, passiveOrOptions) {
        var collected = COMPATIBILITY.isA(eventNames) && COMPATIBILITY.isA(listener);
        var method = remove ? 'removeEventListener' : 'addEventListener';
        var onOff = remove ? 'off' : 'on';
        var events = collected ? false : eventNames.split(_strSpace);
        var i = 0;
        var passiveOrOptionsIsObj = FRAMEWORK.isPlainObject(passiveOrOptions);
        var passive = _supportPassiveEvents && (passiveOrOptionsIsObj ? passiveOrOptions._passive : passiveOrOptions) || false;
        var capture = passiveOrOptionsIsObj && (passiveOrOptions._capture || false);
        var nativeParam = _supportPassiveEvents ? {
          passive: passive,
          capture: capture
        } : capture;

        if (collected) {
          for (; i < eventNames[LEXICON.l]; i++) {
            setupResponsiveEventListener(element, eventNames[i], listener[i], remove, passiveOrOptions);
          }
        } else {
          for (; i < events[LEXICON.l]; i++) {
            if (_supportPassiveEvents) {
              element[0][method](events[i], listener, nativeParam);
            } else {
              element[onOff](events[i], listener);
            }
          }
        }
      }

      function addDestroyEventListener(element, eventNames, listener, passive) {
        setupResponsiveEventListener(element, eventNames, listener, false, passive);

        _destroyEvents.push(COMPATIBILITY.bind(setupResponsiveEventListener, 0, element, eventNames, listener, true, passive));
      } //==== Resize Observer ====//

      /**
       * Adds or removes a resize observer from the given element.
       * @param targetElement The element to which the resize observer shall be added or removed.
       * @param onElementResizedCallback The callback which is fired every time the resize observer registers a size change or false / undefined if the resizeObserver shall be removed.
       */


      function setupResizeObserver(targetElement, onElementResizedCallback) {
        if (targetElement) {
          var resizeObserver = COMPATIBILITY.rO();
          var strAnimationStartEvent = 'animationstart mozAnimationStart webkitAnimationStart MSAnimationStart';
          var strChildNodes = 'childNodes';
          var constScroll = 3333333;

          var callback = function callback() {
            targetElement[_strScrollTop](constScroll)[_strScrollLeft](_isRTL ? _rtlScrollBehavior.n ? -constScroll : _rtlScrollBehavior.i ? 0 : constScroll : constScroll);

            onElementResizedCallback();
          }; //add resize observer:


          if (onElementResizedCallback) {
            if (_supportResizeObserver) {
              var element = targetElement.addClass('observed').append(generateDiv(_classNameResizeObserverElement)).contents()[0];
              var observer = element[_strResizeObserverProperty] = new resizeObserver(callback);
              observer.observe(element);
            } else {
              if (_msieVersion > 9 || !_autoUpdateRecommended) {
                targetElement.prepend(generateDiv(_classNameResizeObserverElement, generateDiv({
                  c: _classNameResizeObserverItemElement,
                  dir: 'ltr'
                }, generateDiv(_classNameResizeObserverItemElement, generateDiv(_classNameResizeObserverItemFinalElement)) + generateDiv(_classNameResizeObserverItemElement, generateDiv({
                  c: _classNameResizeObserverItemFinalElement,
                  style: 'width: 200%; height: 200%'
                })))));
                var observerElement = targetElement[0][strChildNodes][0][strChildNodes][0];
                var shrinkElement = FRAMEWORK(observerElement[strChildNodes][1]);
                var expandElement = FRAMEWORK(observerElement[strChildNodes][0]);
                var expandElementChild = FRAMEWORK(expandElement[0][strChildNodes][0]);
                var widthCache = observerElement[LEXICON.oW];
                var heightCache = observerElement[LEXICON.oH];
                var isDirty;
                var rAFId;
                var currWidth;
                var currHeight;
                var factor = 2;
                var nativeScrollbarSize = globals.nativeScrollbarSize; //care don't make changes to this object!!!

                var reset = function reset() {
                  /*
                   var sizeResetWidth = observerElement[LEXICON.oW] + nativeScrollbarSize.x * factor + nativeScrollbarSize.y * factor + _overlayScrollbarDummySize.x + _overlayScrollbarDummySize.y;
                   var sizeResetHeight = observerElement[LEXICON.oH] + nativeScrollbarSize.x * factor + nativeScrollbarSize.y * factor + _overlayScrollbarDummySize.x + _overlayScrollbarDummySize.y;
                   var expandChildCSS = {};
                   expandChildCSS[_strWidth] = sizeResetWidth;
                   expandChildCSS[_strHeight] = sizeResetHeight;
                   expandElementChild.css(expandChildCSS);
                     expandElement[_strScrollLeft](sizeResetWidth)[_strScrollTop](sizeResetHeight);
                   shrinkElement[_strScrollLeft](sizeResetWidth)[_strScrollTop](sizeResetHeight);
                   */
                  expandElement[_strScrollLeft](constScroll)[_strScrollTop](constScroll);

                  shrinkElement[_strScrollLeft](constScroll)[_strScrollTop](constScroll);
                };

                var onResized = function onResized() {
                  rAFId = 0;
                  if (!isDirty) return;
                  widthCache = currWidth;
                  heightCache = currHeight;
                  callback();
                };

                var onScroll = function onScroll(event) {
                  currWidth = observerElement[LEXICON.oW];
                  currHeight = observerElement[LEXICON.oH];
                  isDirty = currWidth != widthCache || currHeight != heightCache;

                  if (event && isDirty && !rAFId) {
                    COMPATIBILITY.cAF()(rAFId);
                    rAFId = COMPATIBILITY.rAF()(onResized);
                  } else if (!event) onResized();

                  reset();

                  if (event) {
                    COMPATIBILITY.prvD(event);
                    COMPATIBILITY.stpP(event);
                  }

                  return false;
                };

                var expandChildCSS = {};
                var observerElementCSS = {};
                setTopRightBottomLeft(observerElementCSS, _strEmpty, [-((nativeScrollbarSize.y + 1) * factor), nativeScrollbarSize.x * -factor, nativeScrollbarSize.y * -factor, -((nativeScrollbarSize.x + 1) * factor)]);
                FRAMEWORK(observerElement).css(observerElementCSS);
                expandElement.on(_strScroll, onScroll);
                shrinkElement.on(_strScroll, onScroll);
                targetElement.on(strAnimationStartEvent, function () {
                  onScroll(false);
                }); //lets assume that the divs will never be that large and a constant value is enough

                expandChildCSS[_strWidth] = constScroll;
                expandChildCSS[_strHeight] = constScroll;
                expandElementChild.css(expandChildCSS);
                reset();
              } else {
                var attachEvent = _documentElementNative.attachEvent;
                var isIE = _msieVersion !== undefined;

                if (attachEvent) {
                  targetElement.prepend(generateDiv(_classNameResizeObserverElement));
                  findFirst(targetElement, _strDot + _classNameResizeObserverElement)[0].attachEvent('onresize', callback);
                } else {
                  var obj = _documentElementNative.createElement(TYPES.o);

                  obj.setAttribute(LEXICON.ti, '-1');
                  obj.setAttribute(LEXICON.c, _classNameResizeObserverElement);

                  obj.onload = function () {
                    var wnd = this.contentDocument.defaultView;
                    wnd.addEventListener('resize', callback);
                    wnd.document.documentElement.style.display = 'none';
                  };

                  obj.type = 'text/html';
                  if (isIE) targetElement.prepend(obj);
                  obj.data = 'about:blank';
                  if (!isIE) targetElement.prepend(obj);
                  targetElement.on(strAnimationStartEvent, callback);
                }
              }
            }

            if (targetElement[0] === _sizeObserverElementNative) {
              var directionChanged = function directionChanged() {
                var dir = _hostElement.css('direction');

                var css = {};
                var scrollLeftValue = 0;
                var result = false;

                if (dir !== _cssDirectionDetectedCache) {
                  if (dir === 'ltr') {
                    css[_strLeft] = 0;
                    css[_strRight] = _strAuto;
                    scrollLeftValue = constScroll;
                  } else {
                    css[_strLeft] = _strAuto;
                    css[_strRight] = 0;
                    scrollLeftValue = _rtlScrollBehavior.n ? -constScroll : _rtlScrollBehavior.i ? 0 : constScroll;
                  } //execution order is important for IE!!!


                  _sizeObserverElement.children().eq(0).css(css);

                  _sizeObserverElement[_strScrollLeft](scrollLeftValue)[_strScrollTop](constScroll);

                  _cssDirectionDetectedCache = dir;
                  result = true;
                }

                return result;
              };

              directionChanged();
              addDestroyEventListener(targetElement, _strScroll, function (event) {
                if (directionChanged()) update();
                COMPATIBILITY.prvD(event);
                COMPATIBILITY.stpP(event);
                return false;
              });
            }
          } //remove resize observer:
          else {
              if (_supportResizeObserver) {
                var element = targetElement.contents()[0];
                var resizeObserverObj = element[_strResizeObserverProperty];

                if (resizeObserverObj) {
                  resizeObserverObj.disconnect();
                  delete element[_strResizeObserverProperty];
                }
              } else {
                remove(targetElement.children(_strDot + _classNameResizeObserverElement).eq(0));
              }
            }
        }
      }
      /**
       * Freezes or unfreezes the given resize observer.
       * @param targetElement The element to which the target resize observer is applied.
       * @param freeze True if the resize observer shall be frozen, false otherwise.
       
      function freezeResizeObserver(targetElement, freeze) {
          if (targetElement !== undefined) {
              if(freeze) {
                  if (_supportResizeObserver) {
                      var element = targetElement.contents()[0];
                      element[_strResizeObserverProperty].unobserve(element);
                  }
                  else {
                      targetElement = targetElement.children(_strDot + _classNameResizeObserverElement).eq(0);
                      var w = targetElement.css(_strWidth);
                      var h = targetElement.css(_strHeight);
                      var css = {};
                      css[_strWidth] = w;
                      css[_strHeight] = h;
                      targetElement.css(css);
                  }
              }
              else {
                  if (_supportResizeObserver) {
                      var element = targetElement.contents()[0];
                      element[_strResizeObserverProperty].observe(element);
                  }
                  else {
                      var css = { };
                      css[_strHeight] = _strEmpty;
                      css[_strWidth] = _strEmpty;
                      targetElement.children(_strDot + _classNameResizeObserverElement).eq(0).css(css);
                  }
              }
          }
      }
      */
      //==== Mutation Observers ====//

      /**
       * Creates MutationObservers for the host and content Element if they are supported.
       */


      function createMutationObservers() {
        if (_supportMutationObserver) {
          var mutationObserverContentLag = 11;
          var mutationObserver = COMPATIBILITY.mO();
          var contentLastUpdate = COMPATIBILITY.now();
          var mutationTarget;
          var mutationAttrName;
          var mutationIsClass;
          var oldMutationVal;
          var newClassVal;
          var hostClassNameRegex;
          var contentTimeout;
          var now;
          var sizeAuto;
          var action;

          _mutationObserverHostCallback = function _mutationObserverHostCallback(mutations) {
            var doUpdate = false;
            var doUpdateForce = false;
            var mutation;
            var mutatedAttrs = [];

            if (_initialized && !_sleeping) {
              each(mutations, function () {
                mutation = this;
                mutationTarget = mutation.target;
                mutationAttrName = mutation.attributeName;
                mutationIsClass = mutationAttrName === LEXICON.c;
                oldMutationVal = mutation.oldValue;
                newClassVal = mutationTarget.className;

                if (_domExists && mutationIsClass && !doUpdateForce) {
                  // if old class value contains _classNameHostElementForeign and new class value doesn't
                  if (oldMutationVal.indexOf(_classNameHostElementForeign) > -1 && newClassVal.indexOf(_classNameHostElementForeign) < 0) {
                    hostClassNameRegex = createHostClassNameRegExp(true);
                    _hostElementNative.className = newClassVal.split(_strSpace).concat(oldMutationVal.split(_strSpace).filter(function (name) {
                      return name.match(hostClassNameRegex);
                    })).join(_strSpace);
                    doUpdate = doUpdateForce = true;
                  }
                }

                if (!doUpdate) {
                  doUpdate = mutationIsClass ? hostClassNamesChanged(oldMutationVal, newClassVal) : mutationAttrName === LEXICON.s ? oldMutationVal !== mutationTarget[LEXICON.s].cssText : true;
                }

                mutatedAttrs.push(mutationAttrName);
              });
              updateViewportAttrsFromTarget(mutatedAttrs);
              if (doUpdate) _base.update(doUpdateForce || _strAuto);
            }

            return doUpdate;
          };

          _mutationObserverContentCallback = function _mutationObserverContentCallback(mutations) {
            var doUpdate = false;
            var mutation;

            if (_initialized && !_sleeping) {
              each(mutations, function () {
                mutation = this;
                doUpdate = isUnknownMutation(mutation);
                return !doUpdate;
              });

              if (doUpdate) {
                now = COMPATIBILITY.now();
                sizeAuto = _heightAutoCache || _widthAutoCache;

                action = function action() {
                  if (!_destroyed) {
                    contentLastUpdate = now; //if cols, rows or wrap attr was changed

                    if (_isTextarea) textareaUpdate();
                    if (sizeAuto) update();else _base.update(_strAuto);
                  }
                };

                clearTimeout(contentTimeout);
                if (mutationObserverContentLag <= 0 || now - contentLastUpdate > mutationObserverContentLag || !sizeAuto) action();else contentTimeout = setTimeout(action, mutationObserverContentLag);
              }
            }

            return doUpdate;
          };

          _mutationObserverHost = new mutationObserver(_mutationObserverHostCallback);
          _mutationObserverContent = new mutationObserver(_mutationObserverContentCallback);
        }
      }
      /**
       * Connects the MutationObservers if they are supported.
       */


      function connectMutationObservers() {
        if (_supportMutationObserver && !_mutationObserversConnected) {
          _mutationObserverHost.observe(_hostElementNative, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: _mutationObserverAttrsHost
          });

          _mutationObserverContent.observe(_isTextarea ? _targetElementNative : _contentElementNative, {
            attributes: true,
            attributeOldValue: true,
            subtree: !_isTextarea,
            childList: !_isTextarea,
            characterData: !_isTextarea,
            attributeFilter: _isTextarea ? _mutationObserverAttrsTextarea : _mutationObserverAttrsHost
          });

          _mutationObserversConnected = true;
        }
      }
      /**
       * Disconnects the MutationObservers if they are supported.
       */


      function disconnectMutationObservers() {
        if (_supportMutationObserver && _mutationObserversConnected) {
          _mutationObserverHost.disconnect();

          _mutationObserverContent.disconnect();

          _mutationObserversConnected = false;
        }
      } //==== Events of elements ====//

      /**
       * This method gets called every time the host element gets resized. IMPORTANT: Padding changes are detected too!!
       * It refreshes the hostResizedEventArgs and the hostSizeResizeCache.
       * If there are any size changes, the update method gets called.
       */


      function hostOnResized() {
        if (!_sleeping) {
          var changed;
          var hostSize = {
            w: _sizeObserverElementNative[LEXICON.sW],
            h: _sizeObserverElementNative[LEXICON.sH]
          };
          changed = checkCache(hostSize, _hostElementSizeChangeDetectedCache);
          _hostElementSizeChangeDetectedCache = hostSize;
          if (changed) update({
            _hostSizeChanged: true
          });
        }
      }
      /**
       * The mouse enter event of the host element. This event is only needed for the autoHide feature.
       */


      function hostOnMouseEnter() {
        if (_scrollbarsAutoHideLeave) refreshScrollbarsAutoHide(true);
      }
      /**
       * The mouse leave event of the host element. This event is only needed for the autoHide feature.
       */


      function hostOnMouseLeave() {
        if (_scrollbarsAutoHideLeave && !_bodyElement.hasClass(_classNameDragging)) refreshScrollbarsAutoHide(false);
      }
      /**
       * The mouse move event of the host element. This event is only needed for the autoHide "move" feature.
       */


      function hostOnMouseMove() {
        if (_scrollbarsAutoHideMove) {
          refreshScrollbarsAutoHide(true);
          clearTimeout(_scrollbarsAutoHideMoveTimeoutId);
          _scrollbarsAutoHideMoveTimeoutId = setTimeout(function () {
            if (_scrollbarsAutoHideMove && !_destroyed) refreshScrollbarsAutoHide(false);
          }, 100);
        }
      }
      /**
       * Prevents text from deselection if attached to the document element on the mousedown event of a DOM element.
       * @param event The select start event.
       */


      function documentOnSelectStart(event) {
        COMPATIBILITY.prvD(event);
        return false;
      }
      /**	
       * A callback which will be called after a element has loaded.	
       */


      function updateOnLoadCallback(event) {
        var elm = FRAMEWORK(event.target);
        eachUpdateOnLoad(function (i, updateOnLoadSelector) {
          if (elm.is(updateOnLoadSelector)) {
            update({
              _contentSizeChanged: true
            });
          }
        });
      }
      /**
      * Adds or removes mouse & touch events of the host element. (for handling auto-hiding of the scrollbars)
      * @param destroy Indicates whether the events shall be added or removed.
      */


      function setupHostMouseTouchEvents(destroy) {
        if (!destroy) setupHostMouseTouchEvents(true);
        setupResponsiveEventListener(_hostElement, _strMouseTouchMoveEvent.split(_strSpace)[0], hostOnMouseMove, !_scrollbarsAutoHideMove || destroy, true);
        setupResponsiveEventListener(_hostElement, [_strMouseEnter, _strMouseLeave], [hostOnMouseEnter, hostOnMouseLeave], !_scrollbarsAutoHideLeave || destroy, true); //if the plugin is initialized and the mouse is over the host element, make the scrollbars visible

        if (!_initialized && !destroy) _hostElement.one('mouseover', hostOnMouseEnter);
      } //==== Update Detection ====//

      /**
       * Measures the min width and min height of the body element and refreshes the related cache.
       * @returns {boolean} True if the min width or min height has changed, false otherwise.
       */


      function bodyMinSizeChanged() {
        var bodyMinSize = {};

        if (_isBody && _contentArrangeElement) {
          bodyMinSize.w = parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus + _strWidth));
          bodyMinSize.h = parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus + _strHeight));
          bodyMinSize.c = checkCache(bodyMinSize, _bodyMinSizeCache);
          bodyMinSize.f = true; //flag for "measured at least once"
        }

        _bodyMinSizeCache = bodyMinSize;
        return !!bodyMinSize.c;
      }
      /**
       * Returns true if the class names really changed (new class without plugin host prefix)
       * @param oldClassNames The old ClassName string or array.
       * @param newClassNames The new ClassName string or array.
       * @returns {boolean} True if the class names has really changed, false otherwise.
       */


      function hostClassNamesChanged(oldClassNames, newClassNames) {
        var currClasses = _typeof(newClassNames) == TYPES.s ? newClassNames.split(_strSpace) : [];
        var oldClasses = _typeof(oldClassNames) == TYPES.s ? oldClassNames.split(_strSpace) : [];
        var diff = getArrayDifferences(oldClasses, currClasses); // remove none theme from diff list to prevent update

        var idx = inArray(_classNameThemeNone, diff);
        var i;
        var regex;
        if (idx > -1) diff.splice(idx, 1);

        if (diff[LEXICON.l] > 0) {
          regex = createHostClassNameRegExp(true, true);

          for (i = 0; i < diff.length; i++) {
            if (!diff[i].match(regex)) {
              return true;
            }
          }
        }

        return false;
      }
      /**
       * Returns true if the given mutation is not from a from the plugin generated element. If the target element is a textarea the mutation is always unknown.
       * @param mutation The mutation which shall be checked.
       * @returns {boolean} True if the mutation is from a unknown element, false otherwise.
       */


      function isUnknownMutation(mutation) {
        var attributeName = mutation.attributeName;
        var mutationTarget = mutation.target;
        var mutationType = mutation.type;
        var strClosest = 'closest';
        if (mutationTarget === _contentElementNative) return attributeName === null;

        if (mutationType === 'attributes' && (attributeName === LEXICON.c || attributeName === LEXICON.s) && !_isTextarea) {
          //ignore className changes by the plugin	
          if (attributeName === LEXICON.c && FRAMEWORK(mutationTarget).hasClass(_classNameHostElement)) return hostClassNamesChanged(mutation.oldValue, mutationTarget.className); //only do it of browser support it natively	

          if (_typeof(mutationTarget[strClosest]) != TYPES.f) return true;
          if (mutationTarget[strClosest](_strDot + _classNameResizeObserverElement) !== null || mutationTarget[strClosest](_strDot + _classNameScrollbar) !== null || mutationTarget[strClosest](_strDot + _classNameScrollbarCorner) !== null) return false;
        }

        return true;
      }
      /**
       * Returns true if the content size was changed since the last time this method was called.
       * @returns {boolean} True if the content size was changed, false otherwise.
       */


      function updateAutoContentSizeChanged() {
        if (_sleeping) return false;
        var contentMeasureElement = getContentMeasureElement();
        var textareaValueLength = _isTextarea && _widthAutoCache && !_textareaAutoWrappingCache ? _targetElement.val().length : 0;
        var setCSS = !_mutationObserversConnected && _widthAutoCache && !_isTextarea;
        var css = {};
        var float;
        var bodyMinSizeC;
        var changed;
        var contentElementScrollSize;

        if (setCSS) {
          float = _contentElement.css(_strFloat);
          css[_strFloat] = _isRTL ? _strRight : _strLeft;
          css[_strWidth] = _strAuto;

          _contentElement.css(css);
        }

        contentElementScrollSize = {
          w: contentMeasureElement[LEXICON.sW] + textareaValueLength,
          h: contentMeasureElement[LEXICON.sH] + textareaValueLength
        };

        if (setCSS) {
          css[_strFloat] = float;
          css[_strWidth] = _strHundredPercent;

          _contentElement.css(css);
        }

        bodyMinSizeC = bodyMinSizeChanged();
        changed = checkCache(contentElementScrollSize, _contentElementScrollSizeChangeDetectedCache);
        _contentElementScrollSizeChangeDetectedCache = contentElementScrollSize;
        return changed || bodyMinSizeC;
      }
      /**
       * Returns true when a attribute which the MutationObserver would observe has changed.  
       * @returns {boolean} True if one of the attributes which a MutationObserver would observe has changed, false or undefined otherwise.
       */


      function meaningfulAttrsChanged() {
        if (_sleeping || _mutationObserversConnected) return;
        var elem;
        var curr;
        var cache;
        var changedAttrs = [];
        var checks = [{
          _elem: _hostElement,
          _attrs: _mutationObserverAttrsHost.concat(':visible')
        }, {
          _elem: _isTextarea ? _targetElement : undefined,
          _attrs: _mutationObserverAttrsTextarea
        }];
        each(checks, function (index, check) {
          elem = check._elem;

          if (elem) {
            each(check._attrs, function (index, attr) {
              curr = attr.charAt(0) === ':' ? elem.is(attr) : elem.attr(attr);
              cache = _updateAutoCache[attr];

              if (checkCache(curr, cache)) {
                changedAttrs.push(attr);
              }

              _updateAutoCache[attr] = curr;
            });
          }
        });
        updateViewportAttrsFromTarget(changedAttrs);
        return changedAttrs[LEXICON.l] > 0;
      }
      /**
       * Checks is a CSS Property of a child element is affecting the scroll size of the content.
       * @param propertyName The CSS property name.
       * @returns {boolean} True if the property is affecting the content scroll size, false otherwise.
       */


      function isSizeAffectingCSSProperty(propertyName) {
        if (!_initialized) return true;
        var flexGrow = 'flex-grow';
        var flexShrink = 'flex-shrink';
        var flexBasis = 'flex-basis';
        var affectingPropsX = [_strWidth, _strMinMinus + _strWidth, _strMaxMinus + _strWidth, _strMarginMinus + _strLeft, _strMarginMinus + _strRight, _strLeft, _strRight, 'font-weight', 'word-spacing', flexGrow, flexShrink, flexBasis];
        var affectingPropsXContentBox = [_strPaddingMinus + _strLeft, _strPaddingMinus + _strRight, _strBorderMinus + _strLeft + _strWidth, _strBorderMinus + _strRight + _strWidth];
        var affectingPropsY = [_strHeight, _strMinMinus + _strHeight, _strMaxMinus + _strHeight, _strMarginMinus + _strTop, _strMarginMinus + _strBottom, _strTop, _strBottom, 'line-height', flexGrow, flexShrink, flexBasis];
        var affectingPropsYContentBox = [_strPaddingMinus + _strTop, _strPaddingMinus + _strBottom, _strBorderMinus + _strTop + _strWidth, _strBorderMinus + _strBottom + _strWidth];
        var _strS = 's';
        var _strVS = 'v-s';
        var checkX = _overflowBehaviorCache.x === _strS || _overflowBehaviorCache.x === _strVS;
        var checkY = _overflowBehaviorCache.y === _strS || _overflowBehaviorCache.y === _strVS;
        var sizeIsAffected = false;

        var checkPropertyName = function checkPropertyName(arr, name) {
          for (var i = 0; i < arr[LEXICON.l]; i++) {
            if (arr[i] === name) return true;
          }

          return false;
        };

        if (checkY) {
          sizeIsAffected = checkPropertyName(affectingPropsY, propertyName);
          if (!sizeIsAffected && !_isBorderBox) sizeIsAffected = checkPropertyName(affectingPropsYContentBox, propertyName);
        }

        if (checkX && !sizeIsAffected) {
          sizeIsAffected = checkPropertyName(affectingPropsX, propertyName);
          if (!sizeIsAffected && !_isBorderBox) sizeIsAffected = checkPropertyName(affectingPropsXContentBox, propertyName);
        }

        return sizeIsAffected;
      } //==== Update ====//

      /**
       * Sets the attribute values of the viewport element to the values from the target element.
       * The value of a attribute is only set if the attribute is whitelisted.
       * @attrs attrs The array of attributes which shall be set or undefined if all whitelisted shall be set.
       */


      function updateViewportAttrsFromTarget(attrs) {
        attrs = attrs || _viewportAttrsFromTarget;
        each(attrs, function (index, attr) {
          if (COMPATIBILITY.inA(attr, _viewportAttrsFromTarget) > -1) {
            var targetAttr = _targetElement.attr(attr);

            if (type(targetAttr) == TYPES.s) {
              _viewportElement.attr(attr, targetAttr);
            } else {
              _viewportElement.removeAttr(attr);
            }
          }
        });
      }
      /**
       * Updates the variables and size of the textarea element, and manages the scroll on new line or new character.
       */


      function textareaUpdate() {
        if (!_sleeping) {
          var wrapAttrOff = !_textareaAutoWrappingCache;
          var minWidth = _viewportSize.w;
          var minHeight = _viewportSize.h;
          var css = {};
          var doMeasure = _widthAutoCache || wrapAttrOff;
          var origWidth;
          var width;
          var origHeight;
          var height; //reset min size

          css[_strMinMinus + _strWidth] = _strEmpty;
          css[_strMinMinus + _strHeight] = _strEmpty; //set width auto

          css[_strWidth] = _strAuto;

          _targetElement.css(css); //measure width


          origWidth = _targetElementNative[LEXICON.oW];
          width = doMeasure ? MATH.max(origWidth, _targetElementNative[LEXICON.sW] - 1) : 1;
          /*width += (_widthAutoCache ? _marginX + (!_isBorderBox ? wrapAttrOff ? 0 : _paddingX + _borderX : 0) : 0);*/
          //set measured width

          css[_strWidth] = _widthAutoCache ? _strAuto
          /*width*/
          : _strHundredPercent;
          css[_strMinMinus + _strWidth] = _strHundredPercent; //set height auto

          css[_strHeight] = _strAuto;

          _targetElement.css(css); //measure height


          origHeight = _targetElementNative[LEXICON.oH];
          height = MATH.max(origHeight, _targetElementNative[LEXICON.sH] - 1); //append correct size values

          css[_strWidth] = width;
          css[_strHeight] = height;

          _textareaCoverElement.css(css); //apply min width / min height to prevent textarea collapsing


          css[_strMinMinus + _strWidth] = minWidth
          /*+ (!_isBorderBox && _widthAutoCache ? _paddingX + _borderX : 0)*/
          ;
          css[_strMinMinus + _strHeight] = minHeight
          /*+ (!_isBorderBox && _heightAutoCache ? _paddingY + _borderY : 0)*/
          ;

          _targetElement.css(css);

          return {
            _originalWidth: origWidth,
            _originalHeight: origHeight,
            _dynamicWidth: width,
            _dynamicHeight: height
          };
        }
      }
      /**
       * Updates the plugin and DOM to the current options.
       * This method should only be called if a update is 100% required.
       * @param updateHints A objects which contains hints for this update:
       * {
       *   _hostSizeChanged : boolean,
       *   _contentSizeChanged : boolean,
       *   _force : boolean,                             == preventSwallowing
       *   _changedOptions : { },                        == preventSwallowing && preventSleep
      *  }
       */


      function update(updateHints) {
        clearTimeout(_swallowedUpdateTimeout);
        updateHints = updateHints || {};
        _swallowedUpdateHints._hostSizeChanged |= updateHints._hostSizeChanged;
        _swallowedUpdateHints._contentSizeChanged |= updateHints._contentSizeChanged;
        _swallowedUpdateHints._force |= updateHints._force;
        var now = COMPATIBILITY.now();
        var hostSizeChanged = !!_swallowedUpdateHints._hostSizeChanged;
        var contentSizeChanged = !!_swallowedUpdateHints._contentSizeChanged;
        var force = !!_swallowedUpdateHints._force;
        var changedOptions = updateHints._changedOptions;
        var swallow = _swallowUpdateLag > 0 && _initialized && !_destroyed && !force && !changedOptions && now - _lastUpdateTime < _swallowUpdateLag && !_heightAutoCache && !_widthAutoCache;
        var displayIsHidden;
        if (swallow) _swallowedUpdateTimeout = setTimeout(update, _swallowUpdateLag); //abort update due to:
        //destroyed
        //swallowing
        //sleeping
        //host is hidden or has false display

        if (_destroyed || swallow || _sleeping && !changedOptions || _initialized && !force && (displayIsHidden = _hostElement.is(':hidden')) || _hostElement.css('display') === 'inline') return;
        _lastUpdateTime = now;
        _swallowedUpdateHints = {}; //if scrollbar styling is possible and native scrollbars aren't overlaid the scrollbar styling will be applied which hides the native scrollbars completely.

        if (_nativeScrollbarStyling && !(_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)) {
          //native scrollbars are hidden, so change the values to zero
          _nativeScrollbarSize.x = 0;
          _nativeScrollbarSize.y = 0;
        } else {
          //refresh native scrollbar size (in case of zoom)
          _nativeScrollbarSize = extendDeep({}, globals.nativeScrollbarSize);
        } // Scrollbar padding is needed for firefox, because firefox hides scrollbar automatically if the size of the div is too small.
        // The calculation: [scrollbar size +3 *3]
        // (+3 because of possible decoration e.g. borders, margins etc., but only if native scrollbar is NOT a overlaid scrollbar)
        // (*3 because (1)increase / (2)decrease -button and (3)resize handle)


        _nativeScrollbarMinSize = {
          x: (_nativeScrollbarSize.x + (_nativeScrollbarIsOverlaid.x ? 0 : 3)) * 3,
          y: (_nativeScrollbarSize.y + (_nativeScrollbarIsOverlaid.y ? 0 : 3)) * 3
        };
        changedOptions = changedOptions || {}; //freezeResizeObserver(_sizeObserverElement, true);
        //freezeResizeObserver(_sizeAutoObserverElement, true);

        var checkCacheAutoForce = function checkCacheAutoForce() {
          return checkCache.apply(this, [].slice.call(arguments).concat([force]));
        }; //save current scroll offset


        var currScroll = {
          x: _viewportElement[_strScrollLeft](),
          y: _viewportElement[_strScrollTop]()
        };
        var currentPreparedOptionsScrollbars = _currentPreparedOptions.scrollbars;
        var currentPreparedOptionsTextarea = _currentPreparedOptions.textarea; //scrollbars visibility:

        var scrollbarsVisibility = currentPreparedOptionsScrollbars.visibility;
        var scrollbarsVisibilityChanged = checkCacheAutoForce(scrollbarsVisibility, _scrollbarsVisibilityCache); //scrollbars autoHide:

        var scrollbarsAutoHide = currentPreparedOptionsScrollbars.autoHide;
        var scrollbarsAutoHideChanged = checkCacheAutoForce(scrollbarsAutoHide, _scrollbarsAutoHideCache); //scrollbars click scrolling

        var scrollbarsClickScrolling = currentPreparedOptionsScrollbars.clickScrolling;
        var scrollbarsClickScrollingChanged = checkCacheAutoForce(scrollbarsClickScrolling, _scrollbarsClickScrollingCache); //scrollbars drag scrolling

        var scrollbarsDragScrolling = currentPreparedOptionsScrollbars.dragScrolling;
        var scrollbarsDragScrollingChanged = checkCacheAutoForce(scrollbarsDragScrolling, _scrollbarsDragScrollingCache); //className

        var className = _currentPreparedOptions.className;
        var classNameChanged = checkCacheAutoForce(className, _classNameCache); //resize

        var resize = _currentPreparedOptions.resize;
        var resizeChanged = checkCacheAutoForce(resize, _resizeCache) && !_isBody; //body can't be resized since the window itself acts as resize possibility.
        //paddingAbsolute

        var paddingAbsolute = _currentPreparedOptions.paddingAbsolute;
        var paddingAbsoluteChanged = checkCacheAutoForce(paddingAbsolute, _paddingAbsoluteCache); //clipAlways

        var clipAlways = _currentPreparedOptions.clipAlways;
        var clipAlwaysChanged = checkCacheAutoForce(clipAlways, _clipAlwaysCache); //sizeAutoCapable

        var sizeAutoCapable = _currentPreparedOptions.sizeAutoCapable && !_isBody; //body can never be size auto, because it shall be always as big as the viewport.

        var sizeAutoCapableChanged = checkCacheAutoForce(sizeAutoCapable, _sizeAutoCapableCache); //showNativeScrollbars

        var ignoreOverlayScrollbarHiding = _currentPreparedOptions.nativeScrollbarsOverlaid.showNativeScrollbars;
        var ignoreOverlayScrollbarHidingChanged = checkCacheAutoForce(ignoreOverlayScrollbarHiding, _ignoreOverlayScrollbarHidingCache); //autoUpdate

        var autoUpdate = _currentPreparedOptions.autoUpdate;
        var autoUpdateChanged = checkCacheAutoForce(autoUpdate, _autoUpdateCache); //overflowBehavior

        var overflowBehavior = _currentPreparedOptions.overflowBehavior;
        var overflowBehaviorChanged = checkCacheAutoForce(overflowBehavior, _overflowBehaviorCache, force); //dynWidth:

        var textareaDynWidth = currentPreparedOptionsTextarea.dynWidth;
        var textareaDynWidthChanged = checkCacheAutoForce(_textareaDynWidthCache, textareaDynWidth); //dynHeight:

        var textareaDynHeight = currentPreparedOptionsTextarea.dynHeight;
        var textareaDynHeightChanged = checkCacheAutoForce(_textareaDynHeightCache, textareaDynHeight); //scrollbars visibility

        _scrollbarsAutoHideNever = scrollbarsAutoHide === 'n';
        _scrollbarsAutoHideScroll = scrollbarsAutoHide === 's';
        _scrollbarsAutoHideMove = scrollbarsAutoHide === 'm';
        _scrollbarsAutoHideLeave = scrollbarsAutoHide === 'l'; //scrollbars autoHideDelay

        _scrollbarsAutoHideDelay = currentPreparedOptionsScrollbars.autoHideDelay; //old className

        _oldClassName = _classNameCache; //resize

        _resizeNone = resize === 'n';
        _resizeBoth = resize === 'b';
        _resizeHorizontal = resize === 'h';
        _resizeVertical = resize === 'v'; //normalizeRTL

        _normalizeRTLCache = _currentPreparedOptions.normalizeRTL; //ignore overlay scrollbar hiding

        ignoreOverlayScrollbarHiding = ignoreOverlayScrollbarHiding && _nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y; //refresh options cache

        _scrollbarsVisibilityCache = scrollbarsVisibility;
        _scrollbarsAutoHideCache = scrollbarsAutoHide;
        _scrollbarsClickScrollingCache = scrollbarsClickScrolling;
        _scrollbarsDragScrollingCache = scrollbarsDragScrolling;
        _classNameCache = className;
        _resizeCache = resize;
        _paddingAbsoluteCache = paddingAbsolute;
        _clipAlwaysCache = clipAlways;
        _sizeAutoCapableCache = sizeAutoCapable;
        _ignoreOverlayScrollbarHidingCache = ignoreOverlayScrollbarHiding;
        _autoUpdateCache = autoUpdate;
        _overflowBehaviorCache = extendDeep({}, overflowBehavior);
        _textareaDynWidthCache = textareaDynWidth;
        _textareaDynHeightCache = textareaDynHeight;
        _hasOverflowCache = _hasOverflowCache || {
          x: false,
          y: false
        }; //set correct class name to the host element

        if (classNameChanged) {
          removeClass(_hostElement, _oldClassName + _strSpace + _classNameThemeNone);
          addClass(_hostElement, className !== undefined && className !== null && className.length > 0 ? className : _classNameThemeNone);
        } //set correct auto Update


        if (autoUpdateChanged) {
          if (autoUpdate === true || autoUpdate === null && _autoUpdateRecommended) {
            disconnectMutationObservers();
            autoUpdateLoop.add(_base);
          } else {
            autoUpdateLoop.remove(_base);
            connectMutationObservers();
          }
        } //activate or deactivate size auto capability


        if (sizeAutoCapableChanged) {
          if (sizeAutoCapable) {
            if (_contentGlueElement) {
              _contentGlueElement.show();
            } else {
              _contentGlueElement = FRAMEWORK(generateDiv(_classNameContentGlueElement));

              _paddingElement.before(_contentGlueElement);
            }

            if (_sizeAutoObserverAdded) {
              _sizeAutoObserverElement.show();
            } else {
              _sizeAutoObserverElement = FRAMEWORK(generateDiv(_classNameSizeAutoObserverElement));
              _sizeAutoObserverElementNative = _sizeAutoObserverElement[0];

              _contentGlueElement.before(_sizeAutoObserverElement);

              var oldSize = {
                w: -1,
                h: -1
              };
              setupResizeObserver(_sizeAutoObserverElement, function () {
                var newSize = {
                  w: _sizeAutoObserverElementNative[LEXICON.oW],
                  h: _sizeAutoObserverElementNative[LEXICON.oH]
                };

                if (checkCache(newSize, oldSize)) {
                  if (_initialized && _heightAutoCache && newSize.h > 0 || _widthAutoCache && newSize.w > 0) {
                    update();
                  } else if (_initialized && !_heightAutoCache && newSize.h === 0 || !_widthAutoCache && newSize.w === 0) {
                    update();
                  }
                }

                oldSize = newSize;
              });
              _sizeAutoObserverAdded = true; //fix heightAuto detector bug if height is fixed but contentHeight is 0.
              //the probability this bug will ever happen is very very low, thats why its ok if we use calc which isn't supported in IE8.

              if (_cssCalc !== null) _sizeAutoObserverElement.css(_strHeight, _cssCalc + '(100% + 1px)');
            }
          } else {
            if (_sizeAutoObserverAdded) _sizeAutoObserverElement.hide();
            if (_contentGlueElement) _contentGlueElement.hide();
          }
        } //if force, update all resizeObservers too


        if (force) {
          _sizeObserverElement.find('*').trigger(_strScroll);

          if (_sizeAutoObserverAdded) _sizeAutoObserverElement.find('*').trigger(_strScroll);
        } //display hidden:


        displayIsHidden = displayIsHidden === undefined ? _hostElement.is(':hidden') : displayIsHidden; //textarea AutoWrapping:

        var textareaAutoWrapping = _isTextarea ? _targetElement.attr('wrap') !== 'off' : false;
        var textareaAutoWrappingChanged = checkCacheAutoForce(textareaAutoWrapping, _textareaAutoWrappingCache); //detect direction:

        var cssDirection = _hostElement.css('direction');

        var cssDirectionChanged = checkCacheAutoForce(cssDirection, _cssDirectionCache); //detect box-sizing:

        var boxSizing = _hostElement.css('box-sizing');

        var boxSizingChanged = checkCacheAutoForce(boxSizing, _cssBoxSizingCache); //detect padding:

        var padding = getTopRightBottomLeftHost(_strPaddingMinus); //width + height auto detecting var:

        var sizeAutoObserverElementBCRect; //exception occurs in IE8 sometimes (unknown exception)

        try {
          sizeAutoObserverElementBCRect = _sizeAutoObserverAdded ? _sizeAutoObserverElementNative[LEXICON.bCR]() : null;
        } catch (ex) {
          return;
        }

        _isRTL = cssDirection === 'rtl';
        _isBorderBox = boxSizing === 'border-box';
        var isRTLLeft = _isRTL ? _strLeft : _strRight;
        var isRTLRight = _isRTL ? _strRight : _strLeft; //detect width auto:

        var widthAutoResizeDetection = false;
        var widthAutoObserverDetection = _sizeAutoObserverAdded && _hostElement.css(_strFloat) !== 'none'
        /*|| _isTextarea */
        ? MATH.round(sizeAutoObserverElementBCRect.right - sizeAutoObserverElementBCRect.left) === 0 && (!paddingAbsolute ? _hostElementNative[LEXICON.cW] - _paddingX > 0 : true) : false;

        if (sizeAutoCapable && !widthAutoObserverDetection) {
          var tmpCurrHostWidth = _hostElementNative[LEXICON.oW];

          var tmpCurrContentGlueWidth = _contentGlueElement.css(_strWidth);

          _contentGlueElement.css(_strWidth, _strAuto);

          var tmpNewHostWidth = _hostElementNative[LEXICON.oW];

          _contentGlueElement.css(_strWidth, tmpCurrContentGlueWidth);

          widthAutoResizeDetection = tmpCurrHostWidth !== tmpNewHostWidth;

          if (!widthAutoResizeDetection) {
            _contentGlueElement.css(_strWidth, tmpCurrHostWidth + 1);

            tmpNewHostWidth = _hostElementNative[LEXICON.oW];

            _contentGlueElement.css(_strWidth, tmpCurrContentGlueWidth);

            widthAutoResizeDetection = tmpCurrHostWidth !== tmpNewHostWidth;
          }
        }

        var widthAuto = (widthAutoObserverDetection || widthAutoResizeDetection) && sizeAutoCapable && !displayIsHidden;
        var widthAutoChanged = checkCacheAutoForce(widthAuto, _widthAutoCache);
        var wasWidthAuto = !widthAuto && _widthAutoCache; //detect height auto:

        var heightAuto = _sizeAutoObserverAdded && sizeAutoCapable && !displayIsHidden ? MATH.round(sizeAutoObserverElementBCRect.bottom - sizeAutoObserverElementBCRect.top) === 0 :
        /* && (!paddingAbsolute && (_msieVersion > 9 || !_msieVersion) ? true : true) */
        false;
        var heightAutoChanged = checkCacheAutoForce(heightAuto, _heightAutoCache);
        var wasHeightAuto = !heightAuto && _heightAutoCache; //detect border:
        //we need the border only if border box and auto size

        var updateBorderX = widthAuto && _isBorderBox || !_isBorderBox;
        var updateBorderY = heightAuto && _isBorderBox || !_isBorderBox;
        var border = getTopRightBottomLeftHost(_strBorderMinus, '-' + _strWidth, !updateBorderX, !updateBorderY); //detect margin:

        var margin = getTopRightBottomLeftHost(_strMarginMinus); //vars to apply correct css

        var contentElementCSS = {};
        var contentGlueElementCSS = {}; //funcs

        var getHostSize = function getHostSize() {
          //has to be clientSize because offsetSize respect borders
          return {
            w: _hostElementNative[LEXICON.cW],
            h: _hostElementNative[LEXICON.cH]
          };
        };

        var getViewportSize = function getViewportSize() {
          //viewport size is padding container because it never has padding, margin and a border
          //determine zoom rounding error -> sometimes scrollWidth/Height is smaller than clientWidth/Height
          //if this happens add the difference to the viewportSize to compensate the rounding error
          return {
            w: _paddingElementNative[LEXICON.oW] + MATH.max(0, _contentElementNative[LEXICON.cW] - _contentElementNative[LEXICON.sW]),
            h: _paddingElementNative[LEXICON.oH] + MATH.max(0, _contentElementNative[LEXICON.cH] - _contentElementNative[LEXICON.sH])
          };
        }; //set info for padding


        var paddingAbsoluteX = _paddingX = padding.l + padding.r;
        var paddingAbsoluteY = _paddingY = padding.t + padding.b;
        paddingAbsoluteX *= paddingAbsolute ? 1 : 0;
        paddingAbsoluteY *= paddingAbsolute ? 1 : 0;
        padding.c = checkCacheAutoForce(padding, _cssPaddingCache); //set info for border

        _borderX = border.l + border.r;
        _borderY = border.t + border.b;
        border.c = checkCacheAutoForce(border, _cssBorderCache); //set info for margin

        _marginX = margin.l + margin.r;
        _marginY = margin.t + margin.b;
        margin.c = checkCacheAutoForce(margin, _cssMarginCache); //refresh cache

        _textareaAutoWrappingCache = textareaAutoWrapping;
        _cssDirectionCache = cssDirection;
        _cssBoxSizingCache = boxSizing;
        _widthAutoCache = widthAuto;
        _heightAutoCache = heightAuto;
        _cssPaddingCache = padding;
        _cssBorderCache = border;
        _cssMarginCache = margin; //IEFix direction changed

        if (cssDirectionChanged && _sizeAutoObserverAdded) _sizeAutoObserverElement.css(_strFloat, isRTLRight); //apply padding:

        if (padding.c || cssDirectionChanged || paddingAbsoluteChanged || widthAutoChanged || heightAutoChanged || boxSizingChanged || sizeAutoCapableChanged) {
          var paddingElementCSS = {};
          var textareaCSS = {};
          var paddingValues = [padding.t, padding.r, padding.b, padding.l];
          setTopRightBottomLeft(contentGlueElementCSS, _strMarginMinus, [-padding.t, -padding.r, -padding.b, -padding.l]);

          if (paddingAbsolute) {
            setTopRightBottomLeft(paddingElementCSS, _strEmpty, paddingValues);
            setTopRightBottomLeft(_isTextarea ? textareaCSS : contentElementCSS, _strPaddingMinus);
          } else {
            setTopRightBottomLeft(paddingElementCSS, _strEmpty);
            setTopRightBottomLeft(_isTextarea ? textareaCSS : contentElementCSS, _strPaddingMinus, paddingValues);
          }

          _paddingElement.css(paddingElementCSS);

          _targetElement.css(textareaCSS);
        } //viewport size is padding container because it never has padding, margin and a border.


        _viewportSize = getViewportSize(); //update Textarea

        var textareaSize = _isTextarea ? textareaUpdate() : false;

        var textareaSizeChanged = _isTextarea && checkCacheAutoForce(textareaSize, _textareaSizeCache);

        var textareaDynOrigSize = _isTextarea && textareaSize ? {
          w: textareaDynWidth ? textareaSize._dynamicWidth : textareaSize._originalWidth,
          h: textareaDynHeight ? textareaSize._dynamicHeight : textareaSize._originalHeight
        } : {};
        _textareaSizeCache = textareaSize; //fix height auto / width auto in cooperation with current padding & boxSizing behavior:

        if (heightAuto && (heightAutoChanged || paddingAbsoluteChanged || boxSizingChanged || padding.c || border.c)) {
          contentElementCSS[_strHeight] = _strAuto;
        } else if (heightAutoChanged || paddingAbsoluteChanged) {
          contentElementCSS[_strHeight] = _strHundredPercent;
        }

        if (widthAuto && (widthAutoChanged || paddingAbsoluteChanged || boxSizingChanged || padding.c || border.c || cssDirectionChanged)) {
          contentElementCSS[_strWidth] = _strAuto;
          contentGlueElementCSS[_strMaxMinus + _strWidth] = _strHundredPercent; //IE Fix
        } else if (widthAutoChanged || paddingAbsoluteChanged) {
          contentElementCSS[_strWidth] = _strHundredPercent;
          contentElementCSS[_strFloat] = _strEmpty;
          contentGlueElementCSS[_strMaxMinus + _strWidth] = _strEmpty; //IE Fix
        }

        if (widthAuto) {
          //textareaDynOrigSize.w || _strAuto :: doesnt works because applied margin will shift width
          contentGlueElementCSS[_strWidth] = _strAuto;
          contentElementCSS[_strWidth] = VENDORS._cssPropertyValue(_strWidth, 'max-content intrinsic') || _strAuto;
          contentElementCSS[_strFloat] = isRTLRight;
        } else {
          contentGlueElementCSS[_strWidth] = _strEmpty;
        }

        if (heightAuto) {
          //textareaDynOrigSize.h || _contentElementNative[LEXICON.cH] :: use for anti scroll jumping
          contentGlueElementCSS[_strHeight] = textareaDynOrigSize.h || _contentElementNative[LEXICON.cH];
        } else {
          contentGlueElementCSS[_strHeight] = _strEmpty;
        }

        if (sizeAutoCapable) _contentGlueElement.css(contentGlueElementCSS);

        _contentElement.css(contentElementCSS); //CHECKPOINT HERE ~


        contentElementCSS = {};
        contentGlueElementCSS = {}; //if [content(host) client / scroll size, or target element direction, or content(host) max-sizes] changed, or force is true

        if (hostSizeChanged || contentSizeChanged || textareaSizeChanged || cssDirectionChanged || boxSizingChanged || paddingAbsoluteChanged || widthAutoChanged || widthAuto || heightAutoChanged || heightAuto || ignoreOverlayScrollbarHidingChanged || overflowBehaviorChanged || clipAlwaysChanged || resizeChanged || scrollbarsVisibilityChanged || scrollbarsAutoHideChanged || scrollbarsDragScrollingChanged || scrollbarsClickScrollingChanged || textareaDynWidthChanged || textareaDynHeightChanged || textareaAutoWrappingChanged) {
          var strOverflow = 'overflow';
          var strOverflowX = strOverflow + '-x';
          var strOverflowY = strOverflow + '-y';
          var strHidden = 'hidden';
          var strVisible = 'visible'; //Reset the viewport (very important for natively overlaid scrollbars and zoom change
          //don't change the overflow prop as it is very expensive and affects performance !A LOT!

          if (!_nativeScrollbarStyling) {
            var viewportElementResetCSS = {};
            var resetXTmp = _hasOverflowCache.y && _hideOverflowCache.ys && !ignoreOverlayScrollbarHiding ? _nativeScrollbarIsOverlaid.y ? _viewportElement.css(isRTLLeft) : -_nativeScrollbarSize.y : 0;
            var resetBottomTmp = _hasOverflowCache.x && _hideOverflowCache.xs && !ignoreOverlayScrollbarHiding ? _nativeScrollbarIsOverlaid.x ? _viewportElement.css(_strBottom) : -_nativeScrollbarSize.x : 0;
            setTopRightBottomLeft(viewportElementResetCSS, _strEmpty);

            _viewportElement.css(viewportElementResetCSS);
          } //measure several sizes:


          var contentMeasureElement = getContentMeasureElement(); //in Firefox content element has to have overflow hidden, else element margins aren't calculated properly, this element prevents this bug, but only if scrollbars aren't overlaid

          var contentSize = {
            //use clientSize because natively overlaidScrollbars add borders
            w: textareaDynOrigSize.w || contentMeasureElement[LEXICON.cW],
            h: textareaDynOrigSize.h || contentMeasureElement[LEXICON.cH]
          };
          var scrollSize = {
            w: contentMeasureElement[LEXICON.sW],
            h: contentMeasureElement[LEXICON.sH]
          }; //apply the correct viewport style and measure viewport size

          if (!_nativeScrollbarStyling) {
            viewportElementResetCSS[_strBottom] = wasHeightAuto ? _strEmpty : resetBottomTmp;
            viewportElementResetCSS[isRTLLeft] = wasWidthAuto ? _strEmpty : resetXTmp;

            _viewportElement.css(viewportElementResetCSS);
          }

          _viewportSize = getViewportSize(); //measure and correct several sizes

          var hostSize = getHostSize();
          var hostAbsoluteRectSize = {
            w: hostSize.w - _marginX - _borderX - (_isBorderBox ? 0 : _paddingX),
            h: hostSize.h - _marginY - _borderY - (_isBorderBox ? 0 : _paddingY)
          };
          var contentGlueSize = {
            //client/scrollSize + AbsolutePadding -> because padding is only applied to the paddingElement if its absolute, so you have to add it manually
            //hostSize is clientSize -> so padding should be added manually, right? FALSE! Because content glue is inside hostElement, so we don't have to worry about padding
            w: MATH.max((widthAuto ? contentSize.w : scrollSize.w) + paddingAbsoluteX, hostAbsoluteRectSize.w),
            h: MATH.max((heightAuto ? contentSize.h : scrollSize.h) + paddingAbsoluteY, hostAbsoluteRectSize.h)
          };
          contentGlueSize.c = checkCacheAutoForce(contentGlueSize, _contentGlueSizeCache);
          _contentGlueSizeCache = contentGlueSize; //apply correct contentGlue size

          if (sizeAutoCapable) {
            //size contentGlue correctly to make sure the element has correct size if the sizing switches to auto
            if (contentGlueSize.c || heightAuto || widthAuto) {
              contentGlueElementCSS[_strWidth] = contentGlueSize.w;
              contentGlueElementCSS[_strHeight] = contentGlueSize.h; //textarea-sizes are already calculated correctly at this point

              if (!_isTextarea) {
                contentSize = {
                  //use clientSize because natively overlaidScrollbars add borders
                  w: contentMeasureElement[LEXICON.cW],
                  h: contentMeasureElement[LEXICON.cH]
                };
              }
            }

            var textareaCoverCSS = {};

            var setContentGlueElementCSSfunction = function setContentGlueElementCSSfunction(horizontal) {
              var scrollbarVars = getScrollbarVars(horizontal);
              var wh = scrollbarVars._w_h;
              var strWH = scrollbarVars._width_height;
              var autoSize = horizontal ? widthAuto : heightAuto;
              var borderSize = horizontal ? _borderX : _borderY;
              var paddingSize = horizontal ? _paddingX : _paddingY;
              var marginSize = horizontal ? _marginX : _marginY;
              var viewportSize = _viewportSize[wh] - borderSize - marginSize - (_isBorderBox ? 0 : paddingSize); //make contentGlue size -1 if element is not auto sized, to make sure that a resize event happens when the element shrinks

              if (!autoSize || !autoSize && border.c) contentGlueElementCSS[strWH] = hostAbsoluteRectSize[wh] - 1; //if size is auto and host is smaller than size as min size, make content glue size -1 to make sure size changes will be detected (this is only needed if padding is 0)

              if (autoSize && contentSize[wh] < viewportSize && (horizontal && _isTextarea ? !textareaAutoWrapping : true)) {
                if (_isTextarea) textareaCoverCSS[strWH] = parseToZeroOrNumber(_textareaCoverElement.css(strWH)) - 1;
                contentGlueElementCSS[strWH] -= 1;
              } //make sure content glue size is at least 1


              if (contentSize[wh] > 0) contentGlueElementCSS[strWH] = MATH.max(1, contentGlueElementCSS[strWH]);
            };

            setContentGlueElementCSSfunction(true);
            setContentGlueElementCSSfunction(false);
            if (_isTextarea) _textareaCoverElement.css(textareaCoverCSS);

            _contentGlueElement.css(contentGlueElementCSS);
          }

          if (widthAuto) contentElementCSS[_strWidth] = _strHundredPercent;
          if (widthAuto && !_isBorderBox && !_mutationObserversConnected) contentElementCSS[_strFloat] = 'none'; //apply and reset content style

          _contentElement.css(contentElementCSS);

          contentElementCSS = {}; //measure again, but this time all correct sizes:

          var contentScrollSize = {
            w: contentMeasureElement[LEXICON.sW],
            h: contentMeasureElement[LEXICON.sH]
          };
          contentScrollSize.c = contentSizeChanged = checkCacheAutoForce(contentScrollSize, _contentScrollSizeCache);
          _contentScrollSizeCache = contentScrollSize; //refresh viewport size after correct measuring

          _viewportSize = getViewportSize();
          hostSize = getHostSize();
          hostSizeChanged = checkCacheAutoForce(hostSize, _hostSizeCache);
          _hostSizeCache = hostSize;
          var hideOverflowForceTextarea = _isTextarea && (_viewportSize.w === 0 || _viewportSize.h === 0);
          var previousOverflowAmount = _overflowAmountCache;
          var overflowBehaviorIsVS = {};
          var overflowBehaviorIsVH = {};
          var overflowBehaviorIsS = {};
          var overflowAmount = {};
          var hasOverflow = {};
          var hideOverflow = {};
          var canScroll = {};

          var viewportRect = _paddingElementNative[LEXICON.bCR]();

          var setOverflowVariables = function setOverflowVariables(horizontal) {
            var scrollbarVars = getScrollbarVars(horizontal);
            var scrollbarVarsInverted = getScrollbarVars(!horizontal);
            var xyI = scrollbarVarsInverted._x_y;
            var xy = scrollbarVars._x_y;
            var wh = scrollbarVars._w_h;
            var widthHeight = scrollbarVars._width_height;
            var scrollMax = _strScroll + scrollbarVars._Left_Top + 'Max';
            var fractionalOverflowAmount = viewportRect[widthHeight] ? MATH.abs(viewportRect[widthHeight] - _viewportSize[wh]) : 0;
            var checkFractionalOverflowAmount = previousOverflowAmount && previousOverflowAmount[xy] > 0 && _viewportElementNative[scrollMax] === 0;
            overflowBehaviorIsVS[xy] = overflowBehavior[xy] === 'v-s';
            overflowBehaviorIsVH[xy] = overflowBehavior[xy] === 'v-h';
            overflowBehaviorIsS[xy] = overflowBehavior[xy] === 's';
            overflowAmount[xy] = MATH.max(0, MATH.round((contentScrollSize[wh] - _viewportSize[wh]) * 100) / 100);
            overflowAmount[xy] *= hideOverflowForceTextarea || checkFractionalOverflowAmount && fractionalOverflowAmount > 0 && fractionalOverflowAmount < 1 ? 0 : 1;
            hasOverflow[xy] = overflowAmount[xy] > 0; //hideOverflow:
            //x || y : true === overflow is hidden by "overflow: scroll" OR "overflow: hidden"
            //xs || ys : true === overflow is hidden by "overflow: scroll"

            hideOverflow[xy] = overflowBehaviorIsVS[xy] || overflowBehaviorIsVH[xy] ? hasOverflow[xyI] && !overflowBehaviorIsVS[xyI] && !overflowBehaviorIsVH[xyI] : hasOverflow[xy];
            hideOverflow[xy + 's'] = hideOverflow[xy] ? overflowBehaviorIsS[xy] || overflowBehaviorIsVS[xy] : false;
            canScroll[xy] = hasOverflow[xy] && hideOverflow[xy + 's'];
          };

          setOverflowVariables(true);
          setOverflowVariables(false);
          overflowAmount.c = checkCacheAutoForce(overflowAmount, _overflowAmountCache);
          _overflowAmountCache = overflowAmount;
          hasOverflow.c = checkCacheAutoForce(hasOverflow, _hasOverflowCache);
          _hasOverflowCache = hasOverflow;
          hideOverflow.c = checkCacheAutoForce(hideOverflow, _hideOverflowCache);
          _hideOverflowCache = hideOverflow; //if native scrollbar is overlay at x OR y axis, prepare DOM

          if (_nativeScrollbarIsOverlaid.x || _nativeScrollbarIsOverlaid.y) {
            var borderDesign = 'px solid transparent';
            var contentArrangeElementCSS = {};
            var arrangeContent = {};
            var arrangeChanged = force;
            var setContentElementCSS;

            if (hasOverflow.x || hasOverflow.y) {
              arrangeContent.w = _nativeScrollbarIsOverlaid.y && hasOverflow.y ? contentScrollSize.w + _overlayScrollbarDummySize.y : _strEmpty;
              arrangeContent.h = _nativeScrollbarIsOverlaid.x && hasOverflow.x ? contentScrollSize.h + _overlayScrollbarDummySize.x : _strEmpty;
              arrangeChanged = checkCacheAutoForce(arrangeContent, _arrangeContentSizeCache);
              _arrangeContentSizeCache = arrangeContent;
            }

            if (hasOverflow.c || hideOverflow.c || contentScrollSize.c || cssDirectionChanged || widthAutoChanged || heightAutoChanged || widthAuto || heightAuto || ignoreOverlayScrollbarHidingChanged) {
              contentElementCSS[_strMarginMinus + isRTLRight] = contentElementCSS[_strBorderMinus + isRTLRight] = _strEmpty;

              setContentElementCSS = function setContentElementCSS(horizontal) {
                var scrollbarVars = getScrollbarVars(horizontal);
                var scrollbarVarsInverted = getScrollbarVars(!horizontal);
                var xy = scrollbarVars._x_y;
                var strDirection = horizontal ? _strBottom : isRTLLeft;
                var invertedAutoSize = horizontal ? heightAuto : widthAuto;

                if (_nativeScrollbarIsOverlaid[xy] && hasOverflow[xy] && hideOverflow[xy + 's']) {
                  contentElementCSS[_strMarginMinus + strDirection] = invertedAutoSize ? ignoreOverlayScrollbarHiding ? _strEmpty : _overlayScrollbarDummySize[xy] : _strEmpty;
                  contentElementCSS[_strBorderMinus + strDirection] = (horizontal ? !invertedAutoSize : true) && !ignoreOverlayScrollbarHiding ? _overlayScrollbarDummySize[xy] + borderDesign : _strEmpty;
                } else {
                  arrangeContent[scrollbarVarsInverted._w_h] = contentElementCSS[_strMarginMinus + strDirection] = contentElementCSS[_strBorderMinus + strDirection] = _strEmpty;
                  arrangeChanged = true;
                }
              };

              if (_nativeScrollbarStyling) {
                addRemoveClass(_viewportElement, _classNameViewportNativeScrollbarsInvisible, !ignoreOverlayScrollbarHiding);
              } else {
                setContentElementCSS(true);
                setContentElementCSS(false);
              }
            }

            if (ignoreOverlayScrollbarHiding) {
              arrangeContent.w = arrangeContent.h = _strEmpty;
              arrangeChanged = true;
            }

            if (arrangeChanged && !_nativeScrollbarStyling) {
              contentArrangeElementCSS[_strWidth] = hideOverflow.y ? arrangeContent.w : _strEmpty;
              contentArrangeElementCSS[_strHeight] = hideOverflow.x ? arrangeContent.h : _strEmpty;

              if (!_contentArrangeElement) {
                _contentArrangeElement = FRAMEWORK(generateDiv(_classNameContentArrangeElement));

                _viewportElement.prepend(_contentArrangeElement);
              }

              _contentArrangeElement.css(contentArrangeElementCSS);
            }

            _contentElement.css(contentElementCSS);
          }

          var viewportElementCSS = {};
          var paddingElementCSS = {};
          var setViewportCSS;

          if (hostSizeChanged || hasOverflow.c || hideOverflow.c || contentScrollSize.c || overflowBehaviorChanged || boxSizingChanged || ignoreOverlayScrollbarHidingChanged || cssDirectionChanged || clipAlwaysChanged || heightAutoChanged) {
            viewportElementCSS[isRTLRight] = _strEmpty;

            setViewportCSS = function setViewportCSS(horizontal) {
              var scrollbarVars = getScrollbarVars(horizontal);
              var scrollbarVarsInverted = getScrollbarVars(!horizontal);
              var xy = scrollbarVars._x_y;
              var XY = scrollbarVars._X_Y;
              var strDirection = horizontal ? _strBottom : isRTLLeft;

              var reset = function reset() {
                viewportElementCSS[strDirection] = _strEmpty;
                _contentBorderSize[scrollbarVarsInverted._w_h] = 0;
              };

              if (hasOverflow[xy] && hideOverflow[xy + 's']) {
                viewportElementCSS[strOverflow + XY] = _strScroll;

                if (ignoreOverlayScrollbarHiding || _nativeScrollbarStyling) {
                  reset();
                } else {
                  viewportElementCSS[strDirection] = -(_nativeScrollbarIsOverlaid[xy] ? _overlayScrollbarDummySize[xy] : _nativeScrollbarSize[xy]);
                  _contentBorderSize[scrollbarVarsInverted._w_h] = _nativeScrollbarIsOverlaid[xy] ? _overlayScrollbarDummySize[scrollbarVarsInverted._x_y] : 0;
                }
              } else {
                viewportElementCSS[strOverflow + XY] = _strEmpty;
                reset();
              }
            };

            setViewportCSS(true);
            setViewportCSS(false); // if the scroll container is too small and if there is any overflow with no overlay scrollbar (and scrollbar styling isn't possible), 
            // make viewport element greater in size (Firefox hide Scrollbars fix)
            // because firefox starts hiding scrollbars on too small elements
            // with this behavior the overflow calculation may be incorrect or the scrollbars would appear suddenly
            // https://bugzilla.mozilla.org/show_bug.cgi?id=292284

            if (!_nativeScrollbarStyling && (_viewportSize.h < _nativeScrollbarMinSize.x || _viewportSize.w < _nativeScrollbarMinSize.y) && (hasOverflow.x && hideOverflow.x && !_nativeScrollbarIsOverlaid.x || hasOverflow.y && hideOverflow.y && !_nativeScrollbarIsOverlaid.y)) {
              viewportElementCSS[_strPaddingMinus + _strTop] = _nativeScrollbarMinSize.x;
              viewportElementCSS[_strMarginMinus + _strTop] = -_nativeScrollbarMinSize.x;
              viewportElementCSS[_strPaddingMinus + isRTLRight] = _nativeScrollbarMinSize.y;
              viewportElementCSS[_strMarginMinus + isRTLRight] = -_nativeScrollbarMinSize.y;
            } else {
              viewportElementCSS[_strPaddingMinus + _strTop] = viewportElementCSS[_strMarginMinus + _strTop] = viewportElementCSS[_strPaddingMinus + isRTLRight] = viewportElementCSS[_strMarginMinus + isRTLRight] = _strEmpty;
            }

            viewportElementCSS[_strPaddingMinus + isRTLLeft] = viewportElementCSS[_strMarginMinus + isRTLLeft] = _strEmpty; //if there is any overflow (x OR y axis) and this overflow shall be hidden, make overflow hidden, else overflow visible

            if (hasOverflow.x && hideOverflow.x || hasOverflow.y && hideOverflow.y || hideOverflowForceTextarea) {
              //only hide if is Textarea
              if (_isTextarea && hideOverflowForceTextarea) {
                paddingElementCSS[strOverflowX] = paddingElementCSS[strOverflowY] = strHidden;
              }
            } else {
              if (!clipAlways || overflowBehaviorIsVH.x || overflowBehaviorIsVS.x || overflowBehaviorIsVH.y || overflowBehaviorIsVS.y) {
                //only un-hide if Textarea
                if (_isTextarea) {
                  paddingElementCSS[strOverflowX] = paddingElementCSS[strOverflowY] = _strEmpty;
                }

                viewportElementCSS[strOverflowX] = viewportElementCSS[strOverflowY] = strVisible;
              }
            }

            _paddingElement.css(paddingElementCSS);

            _viewportElement.css(viewportElementCSS);

            viewportElementCSS = {}; //force soft redraw in webkit because without the scrollbars will may appear because DOM wont be redrawn under special conditions

            if ((hasOverflow.c || boxSizingChanged || widthAutoChanged || heightAutoChanged) && !(_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y)) {
              var elementStyle = _contentElementNative[LEXICON.s];
              var dump;
              elementStyle.webkitTransform = 'scale(1)';
              elementStyle.display = 'run-in';
              dump = _contentElementNative[LEXICON.oH];
              elementStyle.display = _strEmpty; //|| dump; //use dump to prevent it from deletion if minify

              elementStyle.webkitTransform = _strEmpty;
            }
            /*
            //force hard redraw in webkit if native overlaid scrollbars shall appear
            if (ignoreOverlayScrollbarHidingChanged && ignoreOverlayScrollbarHiding) {
                _hostElement.hide();
                var dump = _hostElementNative[LEXICON.oH];
                _hostElement.show();
            }
            */

          } //change to direction RTL and width auto Bugfix in Webkit
          //without this fix, the DOM still thinks the scrollbar is LTR and thus the content is shifted to the left


          contentElementCSS = {};

          if (cssDirectionChanged || widthAutoChanged || heightAutoChanged) {
            if (_isRTL && widthAuto) {
              var floatTmp = _contentElement.css(_strFloat);

              var posLeftWithoutFloat = MATH.round(_contentElement.css(_strFloat, _strEmpty).css(_strLeft, _strEmpty).position().left);

              _contentElement.css(_strFloat, floatTmp);

              var posLeftWithFloat = MATH.round(_contentElement.position().left);
              if (posLeftWithoutFloat !== posLeftWithFloat) contentElementCSS[_strLeft] = posLeftWithoutFloat;
            } else {
              contentElementCSS[_strLeft] = _strEmpty;
            }
          }

          _contentElement.css(contentElementCSS); //handle scroll position


          if (_isTextarea && contentSizeChanged) {
            var textareaInfo = getTextareaInfo();

            if (textareaInfo) {
              var textareaRowsChanged = _textareaInfoCache === undefined ? true : textareaInfo._rows !== _textareaInfoCache._rows;
              var cursorRow = textareaInfo._cursorRow;
              var cursorCol = textareaInfo._cursorColumn;
              var widestRow = textareaInfo._widestRow;
              var lastRow = textareaInfo._rows;
              var lastCol = textareaInfo._columns;
              var cursorPos = textareaInfo._cursorPosition;
              var cursorMax = textareaInfo._cursorMax;
              var cursorIsLastPosition = cursorPos >= cursorMax && _textareaHasFocus;
              var textareaScrollAmount = {
                x: !textareaAutoWrapping && cursorCol === lastCol && cursorRow === widestRow ? _overflowAmountCache.x : -1,
                y: (textareaAutoWrapping ? cursorIsLastPosition || textareaRowsChanged && (previousOverflowAmount ? currScroll.y === previousOverflowAmount.y : false) : (cursorIsLastPosition || textareaRowsChanged) && cursorRow === lastRow) ? _overflowAmountCache.y : -1
              };
              currScroll.x = textareaScrollAmount.x > -1 ? _isRTL && _normalizeRTLCache && _rtlScrollBehavior.i ? 0 : textareaScrollAmount.x : currScroll.x; //if inverted, scroll to 0 -> normalized this means to max scroll offset.

              currScroll.y = textareaScrollAmount.y > -1 ? textareaScrollAmount.y : currScroll.y;
            }

            _textareaInfoCache = textareaInfo;
          }

          if (_isRTL && _rtlScrollBehavior.i && _nativeScrollbarIsOverlaid.y && hasOverflow.x && _normalizeRTLCache) currScroll.x += _contentBorderSize.w || 0;
          if (widthAuto) _hostElement[_strScrollLeft](0);
          if (heightAuto) _hostElement[_strScrollTop](0);

          _viewportElement[_strScrollLeft](currScroll.x)[_strScrollTop](currScroll.y); //scrollbars management:


          var scrollbarsVisibilityVisible = scrollbarsVisibility === 'v';
          var scrollbarsVisibilityHidden = scrollbarsVisibility === 'h';
          var scrollbarsVisibilityAuto = scrollbarsVisibility === 'a';

          var refreshScrollbarsVisibility = function refreshScrollbarsVisibility(showX, showY) {
            showY = showY === undefined ? showX : showY;
            refreshScrollbarAppearance(true, showX, canScroll.x);
            refreshScrollbarAppearance(false, showY, canScroll.y);
          }; //manage class name which indicates scrollable overflow


          addRemoveClass(_hostElement, _classNameHostOverflow, hideOverflow.x || hideOverflow.y);
          addRemoveClass(_hostElement, _classNameHostOverflowX, hideOverflow.x);
          addRemoveClass(_hostElement, _classNameHostOverflowY, hideOverflow.y); //add or remove rtl class name for styling purposes except when its body, then the scrollbar stays

          if (cssDirectionChanged && !_isBody) {
            addRemoveClass(_hostElement, _classNameHostRTL, _isRTL);
          } //manage the resize feature (CSS3 resize "polyfill" for this plugin)


          if (_isBody) addClass(_hostElement, _classNameHostResizeDisabled);

          if (resizeChanged) {
            addRemoveClass(_hostElement, _classNameHostResizeDisabled, _resizeNone);
            addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResize, !_resizeNone);
            addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeB, _resizeBoth);
            addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeH, _resizeHorizontal);
            addRemoveClass(_scrollbarCornerElement, _classNameScrollbarCornerResizeV, _resizeVertical);
          } //manage the scrollbars general visibility + the scrollbar interactivity (unusable class name)


          if (scrollbarsVisibilityChanged || overflowBehaviorChanged || hideOverflow.c || hasOverflow.c || ignoreOverlayScrollbarHidingChanged) {
            if (ignoreOverlayScrollbarHiding) {
              if (ignoreOverlayScrollbarHidingChanged) {
                removeClass(_hostElement, _classNameHostScrolling);

                if (ignoreOverlayScrollbarHiding) {
                  refreshScrollbarsVisibility(false);
                }
              }
            } else if (scrollbarsVisibilityAuto) {
              refreshScrollbarsVisibility(canScroll.x, canScroll.y);
            } else if (scrollbarsVisibilityVisible) {
              refreshScrollbarsVisibility(true);
            } else if (scrollbarsVisibilityHidden) {
              refreshScrollbarsVisibility(false);
            }
          } //manage the scrollbars auto hide feature (auto hide them after specific actions)


          if (scrollbarsAutoHideChanged || ignoreOverlayScrollbarHidingChanged) {
            setupHostMouseTouchEvents(!_scrollbarsAutoHideLeave && !_scrollbarsAutoHideMove);
            refreshScrollbarsAutoHide(_scrollbarsAutoHideNever, !_scrollbarsAutoHideNever);
          } //manage scrollbars handle length & offset - don't remove!


          if (hostSizeChanged || overflowAmount.c || heightAutoChanged || widthAutoChanged || resizeChanged || boxSizingChanged || paddingAbsoluteChanged || ignoreOverlayScrollbarHidingChanged || cssDirectionChanged) {
            refreshScrollbarHandleLength(true);
            refreshScrollbarHandleOffset(true);
            refreshScrollbarHandleLength(false);
            refreshScrollbarHandleOffset(false);
          } //manage interactivity


          if (scrollbarsClickScrollingChanged) refreshScrollbarsInteractive(true, scrollbarsClickScrolling);
          if (scrollbarsDragScrollingChanged) refreshScrollbarsInteractive(false, scrollbarsDragScrolling); //callbacks:

          dispatchCallback('onDirectionChanged', {
            isRTL: _isRTL,
            dir: cssDirection
          }, cssDirectionChanged);
          dispatchCallback('onHostSizeChanged', {
            width: _hostSizeCache.w,
            height: _hostSizeCache.h
          }, hostSizeChanged);
          dispatchCallback('onContentSizeChanged', {
            width: _contentScrollSizeCache.w,
            height: _contentScrollSizeCache.h
          }, contentSizeChanged);
          dispatchCallback('onOverflowChanged', {
            x: hasOverflow.x,
            y: hasOverflow.y,
            xScrollable: hideOverflow.xs,
            yScrollable: hideOverflow.ys,
            clipped: hideOverflow.x || hideOverflow.y
          }, hasOverflow.c || hideOverflow.c);
          dispatchCallback('onOverflowAmountChanged', {
            x: overflowAmount.x,
            y: overflowAmount.y
          }, overflowAmount.c);
        } //fix body min size


        if (_isBody && _bodyMinSizeCache && (_hasOverflowCache.c || _bodyMinSizeCache.c)) {
          //its possible that no min size was measured until now, because the content arrange element was just added now, in this case, measure now the min size.
          if (!_bodyMinSizeCache.f) bodyMinSizeChanged();
          if (_nativeScrollbarIsOverlaid.y && _hasOverflowCache.x) _contentElement.css(_strMinMinus + _strWidth, _bodyMinSizeCache.w + _overlayScrollbarDummySize.y);
          if (_nativeScrollbarIsOverlaid.x && _hasOverflowCache.y) _contentElement.css(_strMinMinus + _strHeight, _bodyMinSizeCache.h + _overlayScrollbarDummySize.x);
          _bodyMinSizeCache.c = false;
        }

        if (_initialized && changedOptions.updateOnLoad) {
          updateElementsOnLoad();
        } //freezeResizeObserver(_sizeObserverElement, false);
        //freezeResizeObserver(_sizeAutoObserverElement, false);


        dispatchCallback('onUpdated', {
          forced: force
        });
      }
      /**
       * Updates the found elements of which the load event shall be handled.
       */


      function updateElementsOnLoad() {
        if (!_isTextarea) {
          eachUpdateOnLoad(function (i, updateOnLoadSelector) {
            _contentElement.find(updateOnLoadSelector).each(function (i, el) {
              // if element doesn't have a updateOnLoadCallback applied
              if (COMPATIBILITY.inA(el, _updateOnLoadElms) < 0) {
                _updateOnLoadElms.push(el);

                FRAMEWORK(el).off(_updateOnLoadEventName, updateOnLoadCallback).on(_updateOnLoadEventName, updateOnLoadCallback);
              }
            });
          });
        }
      } //==== Options ====//

      /**
       * Sets new options but doesn't call the update method.
       * @param newOptions The object which contains the new options.
       * @returns {*} A object which contains the changed options.
       */


      function setOptions(newOptions) {
        var validatedOpts = _pluginsOptions._validate(newOptions, _pluginsOptions._template, true, _currentOptions);

        _currentOptions = extendDeep({}, _currentOptions, validatedOpts._default);
        _currentPreparedOptions = extendDeep({}, _currentPreparedOptions, validatedOpts._prepared);
        return validatedOpts._prepared;
      } //==== Structure ====//

      /**
       * Builds or destroys the wrapper and helper DOM elements.
       * @param destroy Indicates whether the DOM shall be build or destroyed.
       */

      /**
       * Builds or destroys the wrapper and helper DOM elements.
       * @param destroy Indicates whether the DOM shall be build or destroyed.
       */


      function setupStructureDOM(destroy) {
        var strParent = 'parent';
        var classNameResizeObserverHost = 'os-resize-observer-host';
        var classNameTextareaElementFull = _classNameTextareaElement + _strSpace + _classNameTextInherit;
        var textareaClass = _isTextarea ? _strSpace + _classNameTextInherit : _strEmpty;
        var adoptAttrs = _currentPreparedOptions.textarea.inheritedAttrs;
        var adoptAttrsMap = {};

        var applyAdoptedAttrs = function applyAdoptedAttrs() {
          var applyAdoptedAttrsElm = destroy ? _targetElement : _hostElement;
          each(adoptAttrsMap, function (key, value) {
            if (type(value) == TYPES.s) {
              if (key == LEXICON.c) applyAdoptedAttrsElm.addClass(value);else applyAdoptedAttrsElm.attr(key, value);
            }
          });
        };

        var hostElementClassNames = [_classNameHostElement, _classNameHostElementForeign, _classNameHostTextareaElement, _classNameHostResizeDisabled, _classNameHostRTL, _classNameHostScrollbarHorizontalHidden, _classNameHostScrollbarVerticalHidden, _classNameHostTransition, _classNameHostScrolling, _classNameHostOverflow, _classNameHostOverflowX, _classNameHostOverflowY, _classNameThemeNone, _classNameTextareaElement, _classNameTextInherit, _classNameCache].join(_strSpace);
        var hostElementCSS = {}; //get host element as first element, because that's the most upper element and required for the other elements

        _hostElement = _hostElement || (_isTextarea ? _domExists ? _targetElement[strParent]()[strParent]()[strParent]()[strParent]() : FRAMEWORK(generateDiv(_classNameHostTextareaElement)) : _targetElement);
        _contentElement = _contentElement || selectOrGenerateDivByClass(_classNameContentElement + textareaClass);
        _viewportElement = _viewportElement || selectOrGenerateDivByClass(_classNameViewportElement + textareaClass);
        _paddingElement = _paddingElement || selectOrGenerateDivByClass(_classNamePaddingElement + textareaClass);
        _sizeObserverElement = _sizeObserverElement || selectOrGenerateDivByClass(classNameResizeObserverHost);
        _textareaCoverElement = _textareaCoverElement || (_isTextarea ? selectOrGenerateDivByClass(_classNameTextareaCoverElement) : undefined); //add this class to workaround class changing issues with UI frameworks especially Vue

        if (_domExists) addClass(_hostElement, _classNameHostElementForeign); //on destroy, remove all generated class names from the host element before collecting the adopted attributes 
        //to prevent adopting generated class names

        if (destroy) removeClass(_hostElement, hostElementClassNames); //collect all adopted attributes

        adoptAttrs = type(adoptAttrs) == TYPES.s ? adoptAttrs.split(_strSpace) : adoptAttrs;

        if (COMPATIBILITY.isA(adoptAttrs) && _isTextarea) {
          each(adoptAttrs, function (i, v) {
            if (type(v) == TYPES.s) {
              adoptAttrsMap[v] = destroy ? _hostElement.attr(v) : _targetElement.attr(v);
            }
          });
        }

        if (!destroy) {
          if (_isTextarea) {
            if (!_currentPreparedOptions.sizeAutoCapable) {
              hostElementCSS[_strWidth] = _targetElement.css(_strWidth);
              hostElementCSS[_strHeight] = _targetElement.css(_strHeight);
            }

            if (!_domExists) _targetElement.addClass(_classNameTextInherit).wrap(_hostElement); //jQuery clones elements in wrap functions, so we have to select them again

            _hostElement = _targetElement[strParent]().css(hostElementCSS);
          }

          if (!_domExists) {
            //add the correct class to the target element
            addClass(_targetElement, _isTextarea ? classNameTextareaElementFull : _classNameHostElement); //wrap the content into the generated elements to create the required DOM

            _hostElement.wrapInner(_contentElement).wrapInner(_viewportElement).wrapInner(_paddingElement).prepend(_sizeObserverElement); //jQuery clones elements in wrap functions, so we have to select them again


            _contentElement = findFirst(_hostElement, _strDot + _classNameContentElement);
            _viewportElement = findFirst(_hostElement, _strDot + _classNameViewportElement);
            _paddingElement = findFirst(_hostElement, _strDot + _classNamePaddingElement);

            if (_isTextarea) {
              _contentElement.prepend(_textareaCoverElement);

              applyAdoptedAttrs();
            }
          }

          if (_nativeScrollbarStyling) addClass(_viewportElement, _classNameViewportNativeScrollbarsInvisible);
          if (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y) addClass(_viewportElement, _classNameViewportNativeScrollbarsOverlaid);
          if (_isBody) addClass(_htmlElement, _classNameHTMLElement);
          _sizeObserverElementNative = _sizeObserverElement[0];
          _hostElementNative = _hostElement[0];
          _paddingElementNative = _paddingElement[0];
          _viewportElementNative = _viewportElement[0];
          _contentElementNative = _contentElement[0];
          updateViewportAttrsFromTarget();
        } else {
          if (_domExists && _initialized) {
            //clear size observer
            _sizeObserverElement.children().remove(); //remove the style property and classes from already generated elements


            each([_paddingElement, _viewportElement, _contentElement, _textareaCoverElement], function (i, elm) {
              if (elm) {
                removeClass(elm.removeAttr(LEXICON.s), _classNamesDynamicDestroy);
              }
            }); //add classes to the host element which was removed previously to match the expected DOM

            addClass(_hostElement, _isTextarea ? _classNameHostTextareaElement : _classNameHostElement);
          } else {
            //remove size observer
            remove(_sizeObserverElement); //unwrap the content to restore DOM

            _contentElement.contents().unwrap().unwrap().unwrap();

            if (_isTextarea) {
              _targetElement.unwrap();

              remove(_hostElement);
              remove(_textareaCoverElement);
              applyAdoptedAttrs();
            }
          }

          if (_isTextarea) _targetElement.removeAttr(LEXICON.s);
          if (_isBody) removeClass(_htmlElement, _classNameHTMLElement);
        }
      }
      /**
       * Adds or removes all wrapper elements interactivity events.
       * @param destroy Indicates whether the Events shall be added or removed.
       */


      function setupStructureEvents() {
        var textareaKeyDownRestrictedKeyCodes = [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 123, //F1 to F12
        33, 34, //page up, page down
        37, 38, 39, 40, //left, up, right, down arrows
        16, 17, 18, 19, 20, 144 //Shift, Ctrl, Alt, Pause, CapsLock, NumLock
        ];
        var textareaKeyDownKeyCodesList = [];
        var textareaUpdateIntervalID;
        var scrollStopTimeoutId;
        var scrollStopDelay = 175;
        var strFocus = 'focus';

        function updateTextarea(doClearInterval) {
          textareaUpdate();

          _base.update(_strAuto);

          if (doClearInterval && _autoUpdateRecommended) clearInterval(textareaUpdateIntervalID);
        }

        function textareaOnScroll(event) {
          _targetElement[_strScrollLeft](_rtlScrollBehavior.i && _normalizeRTLCache ? 9999999 : 0);

          _targetElement[_strScrollTop](0);

          COMPATIBILITY.prvD(event);
          COMPATIBILITY.stpP(event);
          return false;
        }

        function textareaOnDrop(event) {
          setTimeout(function () {
            if (!_destroyed) updateTextarea();
          }, 50);
        }

        function textareaOnFocus() {
          _textareaHasFocus = true;
          addClass(_hostElement, strFocus);
        }

        function textareaOnFocusout() {
          _textareaHasFocus = false;
          textareaKeyDownKeyCodesList = [];
          removeClass(_hostElement, strFocus);
          updateTextarea(true);
        }

        function textareaOnKeyDown(event) {
          var keyCode = event.keyCode;

          if (inArray(keyCode, textareaKeyDownRestrictedKeyCodes) < 0) {
            if (!textareaKeyDownKeyCodesList[LEXICON.l]) {
              updateTextarea();
              textareaUpdateIntervalID = setInterval(updateTextarea, 1000 / 60);
            }

            if (inArray(keyCode, textareaKeyDownKeyCodesList) < 0) textareaKeyDownKeyCodesList.push(keyCode);
          }
        }

        function textareaOnKeyUp(event) {
          var keyCode = event.keyCode;
          var index = inArray(keyCode, textareaKeyDownKeyCodesList);

          if (inArray(keyCode, textareaKeyDownRestrictedKeyCodes) < 0) {
            if (index > -1) textareaKeyDownKeyCodesList.splice(index, 1);
            if (!textareaKeyDownKeyCodesList[LEXICON.l]) updateTextarea(true);
          }
        }

        function contentOnTransitionEnd(event) {
          if (_autoUpdateCache === true) return;
          event = event.originalEvent || event;
          if (isSizeAffectingCSSProperty(event.propertyName)) _base.update(_strAuto);
        }

        function viewportOnScroll(event) {
          if (!_sleeping) {
            if (scrollStopTimeoutId !== undefined) clearTimeout(scrollStopTimeoutId);else {
              if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove) refreshScrollbarsAutoHide(true);
              if (!nativeOverlayScrollbarsAreActive()) addClass(_hostElement, _classNameHostScrolling);
              dispatchCallback('onScrollStart', event);
            } //if a scrollbars handle gets dragged, the mousemove event is responsible for refreshing the handle offset
            //because if CSS scroll-snap is used, the handle offset gets only refreshed on every snap point
            //this looks laggy & clunky, it looks much better if the offset refreshes with the mousemove

            if (!_scrollbarsHandlesDefineScrollPos) {
              refreshScrollbarHandleOffset(true);
              refreshScrollbarHandleOffset(false);
            }

            dispatchCallback('onScroll', event);
            scrollStopTimeoutId = setTimeout(function () {
              if (!_destroyed) {
                //OnScrollStop:
                clearTimeout(scrollStopTimeoutId);
                scrollStopTimeoutId = undefined;
                if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove) refreshScrollbarsAutoHide(false);
                if (!nativeOverlayScrollbarsAreActive()) removeClass(_hostElement, _classNameHostScrolling);
                dispatchCallback('onScrollStop', event);
              }
            }, scrollStopDelay);
          }
        }

        if (_isTextarea) {
          if (_msieVersion > 9 || !_autoUpdateRecommended) {
            addDestroyEventListener(_targetElement, 'input', updateTextarea);
          } else {
            addDestroyEventListener(_targetElement, [_strKeyDownEvent, _strKeyUpEvent], [textareaOnKeyDown, textareaOnKeyUp]);
          }

          addDestroyEventListener(_targetElement, [_strScroll, 'drop', strFocus, strFocus + 'out'], [textareaOnScroll, textareaOnDrop, textareaOnFocus, textareaOnFocusout]);
        } else {
          addDestroyEventListener(_contentElement, _strTransitionEndEvent, contentOnTransitionEnd);
        }

        addDestroyEventListener(_viewportElement, _strScroll, viewportOnScroll, true);
      } //==== Scrollbars ====//

      /**
       * Builds or destroys all scrollbar DOM elements (scrollbar, track, handle)
       * @param destroy Indicates whether the DOM shall be build or destroyed.
       */


      function setupScrollbarsDOM(destroy) {
        var selectOrGenerateScrollbarDOM = function selectOrGenerateScrollbarDOM(isHorizontal) {
          var scrollbarClassName = isHorizontal ? _classNameScrollbarHorizontal : _classNameScrollbarVertical;
          var scrollbar = selectOrGenerateDivByClass(_classNameScrollbar + _strSpace + scrollbarClassName, true);
          var track = selectOrGenerateDivByClass(_classNameScrollbarTrack, scrollbar);
          var handle = selectOrGenerateDivByClass(_classNameScrollbarHandle, scrollbar);

          if (!_domExists && !destroy) {
            scrollbar.append(track);
            track.append(handle);
          }

          return {
            _scrollbar: scrollbar,
            _track: track,
            _handle: handle
          };
        };

        function resetScrollbarDOM(isHorizontal) {
          var scrollbarVars = getScrollbarVars(isHorizontal);
          var scrollbar = scrollbarVars._scrollbar;
          var track = scrollbarVars._track;
          var handle = scrollbarVars._handle;

          if (_domExists && _initialized) {
            each([scrollbar, track, handle], function (i, elm) {
              removeClass(elm.removeAttr(LEXICON.s), _classNamesDynamicDestroy);
            });
          } else {
            remove(scrollbar || selectOrGenerateScrollbarDOM(isHorizontal)._scrollbar);
          }
        }

        var horizontalElements;
        var verticalElements;

        if (!destroy) {
          horizontalElements = selectOrGenerateScrollbarDOM(true);
          verticalElements = selectOrGenerateScrollbarDOM();
          _scrollbarHorizontalElement = horizontalElements._scrollbar;
          _scrollbarHorizontalTrackElement = horizontalElements._track;
          _scrollbarHorizontalHandleElement = horizontalElements._handle;
          _scrollbarVerticalElement = verticalElements._scrollbar;
          _scrollbarVerticalTrackElement = verticalElements._track;
          _scrollbarVerticalHandleElement = verticalElements._handle;

          if (!_domExists) {
            _paddingElement.after(_scrollbarVerticalElement);

            _paddingElement.after(_scrollbarHorizontalElement);
          }
        } else {
          resetScrollbarDOM(true);
          resetScrollbarDOM();
        }
      }
      /**
       * Initializes all scrollbar interactivity events. (track and handle dragging, clicking, scrolling)
       * @param isHorizontal True if the target scrollbar is the horizontal scrollbar, false if the target scrollbar is the vertical scrollbar.
       */


      function setupScrollbarEvents(isHorizontal) {
        var scrollbarVars = getScrollbarVars(isHorizontal);
        var scrollbarVarsInfo = scrollbarVars._info;
        var insideIFrame = _windowElementNative.top !== _windowElementNative;
        var xy = scrollbarVars._x_y;
        var XY = scrollbarVars._X_Y;
        var scroll = _strScroll + scrollbarVars._Left_Top;
        var strActive = 'active';
        var strSnapHandle = 'snapHandle';
        var strClickEvent = 'click';
        var scrollDurationFactor = 1;
        var increaseDecreaseScrollAmountKeyCodes = [16, 17]; //shift, ctrl

        var trackTimeout;
        var mouseDownScroll;
        var mouseDownOffset;
        var mouseDownInvertedScale;

        function getPointerPosition(event) {
          return _msieVersion && insideIFrame ? event['screen' + XY] : COMPATIBILITY.page(event)[xy]; //use screen coordinates in EDGE & IE because the page values are incorrect in frames.
        }

        function getPreparedScrollbarsOption(name) {
          return _currentPreparedOptions.scrollbars[name];
        }

        function increaseTrackScrollAmount() {
          scrollDurationFactor = 0.5;
        }

        function decreaseTrackScrollAmount() {
          scrollDurationFactor = 1;
        }

        function stopClickEventPropagation(event) {
          COMPATIBILITY.stpP(event);
        }

        function documentKeyDown(event) {
          if (inArray(event.keyCode, increaseDecreaseScrollAmountKeyCodes) > -1) increaseTrackScrollAmount();
        }

        function documentKeyUp(event) {
          if (inArray(event.keyCode, increaseDecreaseScrollAmountKeyCodes) > -1) decreaseTrackScrollAmount();
        }

        function onMouseTouchDownContinue(event) {
          var originalEvent = event.originalEvent || event;
          var isTouchEvent = originalEvent.touches !== undefined;
          return _sleeping || _destroyed || nativeOverlayScrollbarsAreActive() || !_scrollbarsDragScrollingCache || isTouchEvent && !getPreparedScrollbarsOption('touchSupport') ? false : COMPATIBILITY.mBtn(event) === 1 || isTouchEvent;
        }

        function documentDragMove(event) {
          if (onMouseTouchDownContinue(event)) {
            var trackLength = scrollbarVarsInfo._trackLength;
            var handleLength = scrollbarVarsInfo._handleLength;
            var scrollRange = scrollbarVarsInfo._maxScroll;
            var scrollRaw = (getPointerPosition(event) - mouseDownOffset) * mouseDownInvertedScale;
            var scrollDeltaPercent = scrollRaw / (trackLength - handleLength);
            var scrollDelta = scrollRange * scrollDeltaPercent;
            scrollDelta = isFinite(scrollDelta) ? scrollDelta : 0;
            if (_isRTL && isHorizontal && !_rtlScrollBehavior.i) scrollDelta *= -1;

            _viewportElement[scroll](MATH.round(mouseDownScroll + scrollDelta));

            if (_scrollbarsHandlesDefineScrollPos) refreshScrollbarHandleOffset(isHorizontal, mouseDownScroll + scrollDelta);
            if (!_supportPassiveEvents) COMPATIBILITY.prvD(event);
          } else documentMouseTouchUp(event);
        }

        function documentMouseTouchUp(event) {
          event = event || event.originalEvent;
          setupResponsiveEventListener(_documentElement, [_strMouseTouchMoveEvent, _strMouseTouchUpEvent, _strKeyDownEvent, _strKeyUpEvent, _strSelectStartEvent], [documentDragMove, documentMouseTouchUp, documentKeyDown, documentKeyUp, documentOnSelectStart], true);
          COMPATIBILITY.rAF()(function () {
            setupResponsiveEventListener(_documentElement, strClickEvent, stopClickEventPropagation, true, {
              _capture: true
            });
          });
          if (_scrollbarsHandlesDefineScrollPos) refreshScrollbarHandleOffset(isHorizontal, true);
          _scrollbarsHandlesDefineScrollPos = false;
          removeClass(_bodyElement, _classNameDragging);
          removeClass(scrollbarVars._handle, strActive);
          removeClass(scrollbarVars._track, strActive);
          removeClass(scrollbarVars._scrollbar, strActive);
          mouseDownScroll = undefined;
          mouseDownOffset = undefined;
          mouseDownInvertedScale = 1;
          decreaseTrackScrollAmount();

          if (trackTimeout !== undefined) {
            _base.scrollStop();

            clearTimeout(trackTimeout);
            trackTimeout = undefined;
          }

          if (event) {
            var rect = _hostElementNative[LEXICON.bCR]();

            var mouseInsideHost = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom; //if mouse is outside host element

            if (!mouseInsideHost) hostOnMouseLeave();
            if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove) refreshScrollbarsAutoHide(false);
          }
        }

        function onHandleMouseTouchDown(event) {
          if (onMouseTouchDownContinue(event)) onHandleMouseTouchDownAction(event);
        }

        function onHandleMouseTouchDownAction(event) {
          mouseDownScroll = _viewportElement[scroll]();
          mouseDownScroll = isNaN(mouseDownScroll) ? 0 : mouseDownScroll;
          if (_isRTL && isHorizontal && !_rtlScrollBehavior.n || !_isRTL) mouseDownScroll = mouseDownScroll < 0 ? 0 : mouseDownScroll;
          mouseDownInvertedScale = getHostElementInvertedScale()[xy];
          mouseDownOffset = getPointerPosition(event);
          _scrollbarsHandlesDefineScrollPos = !getPreparedScrollbarsOption(strSnapHandle);
          addClass(_bodyElement, _classNameDragging);
          addClass(scrollbarVars._handle, strActive);
          addClass(scrollbarVars._scrollbar, strActive);
          setupResponsiveEventListener(_documentElement, [_strMouseTouchMoveEvent, _strMouseTouchUpEvent, _strSelectStartEvent], [documentDragMove, documentMouseTouchUp, documentOnSelectStart]);
          COMPATIBILITY.rAF()(function () {
            setupResponsiveEventListener(_documentElement, strClickEvent, stopClickEventPropagation, false, {
              _capture: true
            });
          });
          if (_msieVersion || !_documentMixed) COMPATIBILITY.prvD(event);
          COMPATIBILITY.stpP(event);
        }

        function onTrackMouseTouchDown(event) {
          if (onMouseTouchDownContinue(event)) {
            var handleToViewportRatio = scrollbarVars._info._handleLength / Math.round(MATH.min(1, _viewportSize[scrollbarVars._w_h] / _contentScrollSizeCache[scrollbarVars._w_h]) * scrollbarVars._info._trackLength);
            var scrollDistance = MATH.round(_viewportSize[scrollbarVars._w_h] * handleToViewportRatio);
            var scrollBaseDuration = 270 * handleToViewportRatio;
            var scrollFirstIterationDelay = 400 * handleToViewportRatio;

            var trackOffset = scrollbarVars._track.offset()[scrollbarVars._left_top];

            var ctrlKey = event.ctrlKey;
            var instantScroll = event.shiftKey;
            var instantScrollTransition = instantScroll && ctrlKey;
            var isFirstIteration = true;
            var easing = 'linear';
            var decreaseScroll;
            var finishedCondition;

            var scrollActionFinsished = function scrollActionFinsished(transition) {
              if (_scrollbarsHandlesDefineScrollPos) refreshScrollbarHandleOffset(isHorizontal, transition);
            };

            var scrollActionInstantFinished = function scrollActionInstantFinished() {
              scrollActionFinsished();
              onHandleMouseTouchDownAction(event);
            };

            var scrollAction = function scrollAction() {
              if (!_destroyed) {
                var mouseOffset = (mouseDownOffset - trackOffset) * mouseDownInvertedScale;
                var handleOffset = scrollbarVarsInfo._handleOffset;
                var trackLength = scrollbarVarsInfo._trackLength;
                var handleLength = scrollbarVarsInfo._handleLength;
                var scrollRange = scrollbarVarsInfo._maxScroll;
                var currScroll = scrollbarVarsInfo._currentScroll;
                var scrollDuration = scrollBaseDuration * scrollDurationFactor;
                var timeoutDelay = isFirstIteration ? MATH.max(scrollFirstIterationDelay, scrollDuration) : scrollDuration;
                var instantScrollPosition = scrollRange * ((mouseOffset - handleLength / 2) / (trackLength - handleLength)); // 100% * positionPercent

                var rtlIsNormal = _isRTL && isHorizontal && (!_rtlScrollBehavior.i && !_rtlScrollBehavior.n || _normalizeRTLCache);
                var decreaseScrollCondition = rtlIsNormal ? handleOffset < mouseOffset : handleOffset > mouseOffset;
                var scrollObj = {};
                var animationObj = {
                  easing: easing,
                  step: function step(now) {
                    if (_scrollbarsHandlesDefineScrollPos) {
                      _viewportElement[scroll](now); //https://github.com/jquery/jquery/issues/4340


                      refreshScrollbarHandleOffset(isHorizontal, now);
                    }
                  }
                };
                instantScrollPosition = isFinite(instantScrollPosition) ? instantScrollPosition : 0;
                instantScrollPosition = _isRTL && isHorizontal && !_rtlScrollBehavior.i ? scrollRange - instantScrollPosition : instantScrollPosition; //_base.scrollStop();

                if (instantScroll) {
                  _viewportElement[scroll](instantScrollPosition); //scroll instantly to new position


                  if (instantScrollTransition) {
                    //get the scroll position after instant scroll (in case CSS Snap Points are used) to get the correct snapped scroll position
                    //and the animation stops at the correct point
                    instantScrollPosition = _viewportElement[scroll](); //scroll back to the position before instant scrolling so animation can be performed

                    _viewportElement[scroll](currScroll);

                    instantScrollPosition = rtlIsNormal && _rtlScrollBehavior.i ? scrollRange - instantScrollPosition : instantScrollPosition;
                    instantScrollPosition = rtlIsNormal && _rtlScrollBehavior.n ? -instantScrollPosition : instantScrollPosition;
                    scrollObj[xy] = instantScrollPosition;

                    _base.scroll(scrollObj, extendDeep(animationObj, {
                      duration: 130,
                      complete: scrollActionInstantFinished
                    }));
                  } else scrollActionInstantFinished();
                } else {
                  decreaseScroll = isFirstIteration ? decreaseScrollCondition : decreaseScroll;
                  finishedCondition = rtlIsNormal ? decreaseScroll ? handleOffset + handleLength >= mouseOffset : handleOffset <= mouseOffset : decreaseScroll ? handleOffset <= mouseOffset : handleOffset + handleLength >= mouseOffset;

                  if (finishedCondition) {
                    clearTimeout(trackTimeout);

                    _base.scrollStop();

                    trackTimeout = undefined;
                    scrollActionFinsished(true);
                  } else {
                    trackTimeout = setTimeout(scrollAction, timeoutDelay);
                    scrollObj[xy] = (decreaseScroll ? '-=' : '+=') + scrollDistance;

                    _base.scroll(scrollObj, extendDeep(animationObj, {
                      duration: scrollDuration
                    }));
                  }

                  isFirstIteration = false;
                }
              }
            };

            if (ctrlKey) increaseTrackScrollAmount();
            mouseDownInvertedScale = getHostElementInvertedScale()[xy];
            mouseDownOffset = COMPATIBILITY.page(event)[xy];
            _scrollbarsHandlesDefineScrollPos = !getPreparedScrollbarsOption(strSnapHandle);
            addClass(_bodyElement, _classNameDragging);
            addClass(scrollbarVars._track, strActive);
            addClass(scrollbarVars._scrollbar, strActive);
            setupResponsiveEventListener(_documentElement, [_strMouseTouchUpEvent, _strKeyDownEvent, _strKeyUpEvent, _strSelectStartEvent], [documentMouseTouchUp, documentKeyDown, documentKeyUp, documentOnSelectStart]);
            scrollAction();
            COMPATIBILITY.prvD(event);
            COMPATIBILITY.stpP(event);
          }
        }

        function onTrackMouseTouchEnter(event) {
          //make sure both scrollbars will stay visible if one scrollbar is hovered if autoHide is "scroll" or "move".
          _scrollbarsHandleHovered = true;
          if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove) refreshScrollbarsAutoHide(true);
        }

        function onTrackMouseTouchLeave(event) {
          _scrollbarsHandleHovered = false;
          if (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove) refreshScrollbarsAutoHide(false);
        }

        function onScrollbarMouseTouchDown(event) {
          COMPATIBILITY.stpP(event);
        }

        addDestroyEventListener(scrollbarVars._handle, _strMouseTouchDownEvent, onHandleMouseTouchDown);
        addDestroyEventListener(scrollbarVars._track, [_strMouseTouchDownEvent, _strMouseEnter, _strMouseLeave], [onTrackMouseTouchDown, onTrackMouseTouchEnter, onTrackMouseTouchLeave]);
        addDestroyEventListener(scrollbarVars._scrollbar, _strMouseTouchDownEvent, onScrollbarMouseTouchDown);

        if (_supportTransition) {
          addDestroyEventListener(scrollbarVars._scrollbar, _strTransitionEndEvent, function (event) {
            if (event.target !== scrollbarVars._scrollbar[0]) return;
            refreshScrollbarHandleLength(isHorizontal);
            refreshScrollbarHandleOffset(isHorizontal);
          });
        }
      }
      /**
       * Shows or hides the given scrollbar and applied a class name which indicates if the scrollbar is scrollable or not.
       * @param isHorizontal True if the horizontal scrollbar is the target, false if the vertical scrollbar is the target.
       * @param shallBeVisible True if the scrollbar shall be shown, false if hidden.
       * @param canScroll True if the scrollbar is scrollable, false otherwise.
       */


      function refreshScrollbarAppearance(isHorizontal, shallBeVisible, canScroll) {
        var scrollbarHiddenClassName = isHorizontal ? _classNameHostScrollbarHorizontalHidden : _classNameHostScrollbarVerticalHidden;
        var scrollbarElement = isHorizontal ? _scrollbarHorizontalElement : _scrollbarVerticalElement;
        addRemoveClass(_hostElement, scrollbarHiddenClassName, !shallBeVisible);
        addRemoveClass(scrollbarElement, _classNameScrollbarUnusable, !canScroll);
      }
      /**
       * Autoshows / autohides both scrollbars with.
       * @param shallBeVisible True if the scrollbars shall be autoshown (only the case if they are hidden by a autohide), false if the shall be auto hidden.
       * @param delayfree True if the scrollbars shall be hidden without a delay, false or undefined otherwise.
       */


      function refreshScrollbarsAutoHide(shallBeVisible, delayfree) {
        clearTimeout(_scrollbarsAutoHideTimeoutId);

        if (shallBeVisible) {
          //if(_hasOverflowCache.x && _hideOverflowCache.xs)
          removeClass(_scrollbarHorizontalElement, _classNameScrollbarAutoHidden); //if(_hasOverflowCache.y && _hideOverflowCache.ys)

          removeClass(_scrollbarVerticalElement, _classNameScrollbarAutoHidden);
        } else {
          var anyActive;
          var strActive = 'active';

          var hide = function hide() {
            if (!_scrollbarsHandleHovered && !_destroyed) {
              anyActive = _scrollbarHorizontalHandleElement.hasClass(strActive) || _scrollbarVerticalHandleElement.hasClass(strActive);
              if (!anyActive && (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove || _scrollbarsAutoHideLeave)) addClass(_scrollbarHorizontalElement, _classNameScrollbarAutoHidden);
              if (!anyActive && (_scrollbarsAutoHideScroll || _scrollbarsAutoHideMove || _scrollbarsAutoHideLeave)) addClass(_scrollbarVerticalElement, _classNameScrollbarAutoHidden);
            }
          };

          if (_scrollbarsAutoHideDelay > 0 && delayfree !== true) _scrollbarsAutoHideTimeoutId = setTimeout(hide, _scrollbarsAutoHideDelay);else hide();
        }
      }
      /**
       * Refreshes the handle length of the given scrollbar.
       * @param isHorizontal True if the horizontal scrollbar handle shall be refreshed, false if the vertical one shall be refreshed.
       */


      function refreshScrollbarHandleLength(isHorizontal) {
        var handleCSS = {};
        var scrollbarVars = getScrollbarVars(isHorizontal);
        var scrollbarVarsInfo = scrollbarVars._info;
        var digit = 1000000; //get and apply intended handle length

        var handleRatio = MATH.min(1, _viewportSize[scrollbarVars._w_h] / _contentScrollSizeCache[scrollbarVars._w_h]);
        handleCSS[scrollbarVars._width_height] = MATH.floor(handleRatio * 100 * digit) / digit + '%'; //the last * digit / digit is for flooring to the 4th digit

        if (!nativeOverlayScrollbarsAreActive()) scrollbarVars._handle.css(handleCSS); //measure the handle length to respect min & max length

        scrollbarVarsInfo._handleLength = scrollbarVars._handle[0]['offset' + scrollbarVars._Width_Height];
        scrollbarVarsInfo._handleLengthRatio = handleRatio;
      }
      /**
       * Refreshes the handle offset of the given scrollbar.
       * @param isHorizontal True if the horizontal scrollbar handle shall be refreshed, false if the vertical one shall be refreshed.
       * @param scrollOrTransition The scroll position of the given scrollbar axis to which the handle shall be moved or a boolean which indicates whether a transition shall be applied. If undefined or boolean if the current scroll-offset is taken. (if isHorizontal ? scrollLeft : scrollTop)
       */


      function refreshScrollbarHandleOffset(isHorizontal, scrollOrTransition) {
        var transition = type(scrollOrTransition) == TYPES.b;
        var transitionDuration = 250;
        var isRTLisHorizontal = _isRTL && isHorizontal;
        var scrollbarVars = getScrollbarVars(isHorizontal);
        var scrollbarVarsInfo = scrollbarVars._info;
        var strTranslateBrace = 'translate(';

        var strTransform = VENDORS._cssProperty('transform');

        var strTransition = VENDORS._cssProperty('transition');

        var nativeScroll = isHorizontal ? _viewportElement[_strScrollLeft]() : _viewportElement[_strScrollTop]();
        var currentScroll = scrollOrTransition === undefined || transition ? nativeScroll : scrollOrTransition; //measure the handle length to respect min & max length

        var handleLength = scrollbarVarsInfo._handleLength;
        var trackLength = scrollbarVars._track[0]['offset' + scrollbarVars._Width_Height];
        var handleTrackDiff = trackLength - handleLength;
        var handleCSS = {};
        var transformOffset;
        var translateValue; //DONT use the variable '_contentScrollSizeCache[scrollbarVars._w_h]' instead of '_viewportElement[0]['scroll' + scrollbarVars._Width_Height]'
        // because its a bit behind during the small delay when content size updates
        //(delay = mutationObserverContentLag, if its 0 then this var could be used)

        var maxScroll = (_viewportElementNative[_strScroll + scrollbarVars._Width_Height] - _viewportElementNative['client' + scrollbarVars._Width_Height]) * (_rtlScrollBehavior.n && isRTLisHorizontal ? -1 : 1); //* -1 if rtl scroll max is negative

        var getScrollRatio = function getScrollRatio(base) {
          return isNaN(base / maxScroll) ? 0 : MATH.max(0, MATH.min(1, base / maxScroll));
        };

        var getHandleOffset = function getHandleOffset(scrollRatio) {
          var offset = handleTrackDiff * scrollRatio;
          offset = isNaN(offset) ? 0 : offset;
          offset = isRTLisHorizontal && !_rtlScrollBehavior.i ? trackLength - handleLength - offset : offset;
          offset = MATH.max(0, offset);
          return offset;
        };

        var scrollRatio = getScrollRatio(nativeScroll);
        var unsnappedScrollRatio = getScrollRatio(currentScroll);
        var handleOffset = getHandleOffset(unsnappedScrollRatio);
        var snappedHandleOffset = getHandleOffset(scrollRatio);
        scrollbarVarsInfo._maxScroll = maxScroll;
        scrollbarVarsInfo._currentScroll = nativeScroll;
        scrollbarVarsInfo._currentScrollRatio = scrollRatio;

        if (_supportTransform) {
          transformOffset = isRTLisHorizontal ? -(trackLength - handleLength - handleOffset) : handleOffset; //in px
          //transformOffset = (transformOffset / trackLength * 100) * (trackLength / handleLength); //in %

          translateValue = isHorizontal ? strTranslateBrace + transformOffset + 'px, 0)' : strTranslateBrace + '0, ' + transformOffset + 'px)';
          handleCSS[strTransform] = translateValue; //apply or clear up transition

          if (_supportTransition) handleCSS[strTransition] = transition && MATH.abs(handleOffset - scrollbarVarsInfo._handleOffset) > 1 ? getCSSTransitionString(scrollbarVars._handle) + ', ' + (strTransform + _strSpace + transitionDuration + 'ms') : _strEmpty;
        } else handleCSS[scrollbarVars._left_top] = handleOffset; //only apply css if offset has changed and overflow exists.


        if (!nativeOverlayScrollbarsAreActive()) {
          scrollbarVars._handle.css(handleCSS); //clear up transition


          if (_supportTransform && _supportTransition && transition) {
            scrollbarVars._handle.one(_strTransitionEndEvent, function () {
              if (!_destroyed) scrollbarVars._handle.css(strTransition, _strEmpty);
            });
          }
        }

        scrollbarVarsInfo._handleOffset = handleOffset;
        scrollbarVarsInfo._snappedHandleOffset = snappedHandleOffset;
        scrollbarVarsInfo._trackLength = trackLength;
      }
      /**
       * Refreshes the interactivity of the given scrollbar element.
       * @param isTrack True if the track element is the target, false if the handle element is the target.
       * @param value True for interactivity false for no interactivity.
       */


      function refreshScrollbarsInteractive(isTrack, value) {
        var action = value ? 'removeClass' : 'addClass';
        var element1 = isTrack ? _scrollbarHorizontalTrackElement : _scrollbarHorizontalHandleElement;
        var element2 = isTrack ? _scrollbarVerticalTrackElement : _scrollbarVerticalHandleElement;
        var className = isTrack ? _classNameScrollbarTrackOff : _classNameScrollbarHandleOff;
        element1[action](className);
        element2[action](className);
      }
      /**
       * Returns a object which is used for fast access for specific variables.
       * @param isHorizontal True if the horizontal scrollbar vars shall be accessed, false if the vertical scrollbar vars shall be accessed.
       * @returns {{wh: string, WH: string, lt: string, _wh: string, _lt: string, t: *, h: *, c: {}, s: *}}
       */


      function getScrollbarVars(isHorizontal) {
        return {
          _width_height: isHorizontal ? _strWidth : _strHeight,
          _Width_Height: isHorizontal ? 'Width' : 'Height',
          _left_top: isHorizontal ? _strLeft : _strTop,
          _Left_Top: isHorizontal ? 'Left' : 'Top',
          _x_y: isHorizontal ? _strX : _strY,
          _X_Y: isHorizontal ? 'X' : 'Y',
          _w_h: isHorizontal ? 'w' : 'h',
          _l_t: isHorizontal ? 'l' : 't',
          _track: isHorizontal ? _scrollbarHorizontalTrackElement : _scrollbarVerticalTrackElement,
          _handle: isHorizontal ? _scrollbarHorizontalHandleElement : _scrollbarVerticalHandleElement,
          _scrollbar: isHorizontal ? _scrollbarHorizontalElement : _scrollbarVerticalElement,
          _info: isHorizontal ? _scrollHorizontalInfo : _scrollVerticalInfo
        };
      } //==== Scrollbar Corner ====//

      /**
       * Builds or destroys the scrollbar corner DOM element.
       * @param destroy Indicates whether the DOM shall be build or destroyed.
       */


      function setupScrollbarCornerDOM(destroy) {
        _scrollbarCornerElement = _scrollbarCornerElement || selectOrGenerateDivByClass(_classNameScrollbarCorner, true);

        if (!destroy) {
          if (!_domExists) {
            _hostElement.append(_scrollbarCornerElement);
          }
        } else {
          if (_domExists && _initialized) {
            removeClass(_scrollbarCornerElement.removeAttr(LEXICON.s), _classNamesDynamicDestroy);
          } else {
            remove(_scrollbarCornerElement);
          }
        }
      }
      /**
       * Initializes all scrollbar corner interactivity events.
       */


      function setupScrollbarCornerEvents() {
        var insideIFrame = _windowElementNative.top !== _windowElementNative;
        var mouseDownPosition = {};
        var mouseDownSize = {};
        var mouseDownInvertedScale = {};
        var reconnectMutationObserver;

        function documentDragMove(event) {
          if (onMouseTouchDownContinue(event)) {
            var pageOffset = getCoordinates(event);
            var hostElementCSS = {};
            if (_resizeHorizontal || _resizeBoth) hostElementCSS[_strWidth] = mouseDownSize.w + (pageOffset.x - mouseDownPosition.x) * mouseDownInvertedScale.x;
            if (_resizeVertical || _resizeBoth) hostElementCSS[_strHeight] = mouseDownSize.h + (pageOffset.y - mouseDownPosition.y) * mouseDownInvertedScale.y;

            _hostElement.css(hostElementCSS);

            COMPATIBILITY.stpP(event);
          } else {
            documentMouseTouchUp(event);
          }
        }

        function documentMouseTouchUp(event) {
          var eventIsTrusted = event !== undefined;
          setupResponsiveEventListener(_documentElement, [_strSelectStartEvent, _strMouseTouchMoveEvent, _strMouseTouchUpEvent], [documentOnSelectStart, documentDragMove, documentMouseTouchUp], true);
          removeClass(_bodyElement, _classNameDragging);
          if (_scrollbarCornerElement.releaseCapture) _scrollbarCornerElement.releaseCapture();

          if (eventIsTrusted) {
            if (reconnectMutationObserver) connectMutationObservers();

            _base.update(_strAuto);
          }

          reconnectMutationObserver = false;
        }

        function onMouseTouchDownContinue(event) {
          var originalEvent = event.originalEvent || event;
          var isTouchEvent = originalEvent.touches !== undefined;
          return _sleeping || _destroyed ? false : COMPATIBILITY.mBtn(event) === 1 || isTouchEvent;
        }

        function getCoordinates(event) {
          return _msieVersion && insideIFrame ? {
            x: event.screenX,
            y: event.screenY
          } : COMPATIBILITY.page(event);
        }

        addDestroyEventListener(_scrollbarCornerElement, _strMouseTouchDownEvent, function (event) {
          if (onMouseTouchDownContinue(event) && !_resizeNone) {
            if (_mutationObserversConnected) {
              reconnectMutationObserver = true;
              disconnectMutationObservers();
            }

            mouseDownPosition = getCoordinates(event);
            mouseDownSize.w = _hostElementNative[LEXICON.oW] - (!_isBorderBox ? _paddingX : 0);
            mouseDownSize.h = _hostElementNative[LEXICON.oH] - (!_isBorderBox ? _paddingY : 0);
            mouseDownInvertedScale = getHostElementInvertedScale();
            setupResponsiveEventListener(_documentElement, [_strSelectStartEvent, _strMouseTouchMoveEvent, _strMouseTouchUpEvent], [documentOnSelectStart, documentDragMove, documentMouseTouchUp]);
            addClass(_bodyElement, _classNameDragging);
            if (_scrollbarCornerElement.setCapture) _scrollbarCornerElement.setCapture();
            COMPATIBILITY.prvD(event);
            COMPATIBILITY.stpP(event);
          }
        });
      } //==== Utils ====//

      /**
       * Calls the callback with the given name. The Context of this callback is always _base (this).
       * @param name The name of the target which shall be called.
       * @param args The args with which the callback shall be called.
       * @param dependent Boolean which decides whether the callback shall be fired, undefined is like a "true" value.
       */


      function dispatchCallback(name, args, dependent) {
        if (dependent === false) return;

        if (_initialized) {
          var callback = _currentPreparedOptions.callbacks[name];
          var extensionOnName = name;
          var ext;
          if (extensionOnName.substr(0, 2) === 'on') extensionOnName = extensionOnName.substr(2, 1).toLowerCase() + extensionOnName.substr(3);
          if (type(callback) == TYPES.f) callback.call(_base, args);
          each(_extensions, function () {
            ext = this;
            if (type(ext.on) == TYPES.f) ext.on(extensionOnName, args);
          });
        } else if (!_destroyed) _callbacksInitQeueue.push({
          n: name,
          a: args
        });
      }
      /**
       * Sets the "top, right, bottom, left" properties, with a given prefix, of the given css object.
       * @param targetCSSObject The css object to which the values shall be applied.
       * @param prefix The prefix of the "top, right, bottom, left" css properties. (example: 'padding-' is a valid prefix)
       * @param values A array of values which shall be applied to the "top, right, bottom, left" -properties. The array order is [top, right, bottom, left].
       * If this argument is undefined the value '' (empty string) will be applied to all properties.
       */


      function setTopRightBottomLeft(targetCSSObject, prefix, values) {
        prefix = prefix || _strEmpty;
        values = values || [_strEmpty, _strEmpty, _strEmpty, _strEmpty];
        targetCSSObject[prefix + _strTop] = values[0];
        targetCSSObject[prefix + _strRight] = values[1];
        targetCSSObject[prefix + _strBottom] = values[2];
        targetCSSObject[prefix + _strLeft] = values[3];
      }
      /**
       * Gets the "top, right, bottom, left" CSS properties of the CSS property with the given prefix from the host element.
       * @param prefix The prefix of the "top, right, bottom, left" css properties. (example: 'padding-' is a valid prefix)
       * @param suffix The suffix of the "top, right, bottom, left" css properties. (example: 'border-' is a valid prefix with '-width' is a valid suffix)
       * @param zeroX True if the x axis shall be 0.
       * @param zeroY True if the y axis shall be 0.
       * @returns {{}} The object which contains the numbers of the read CSS properties.
       */


      function getTopRightBottomLeftHost(prefix, suffix, zeroX, zeroY) {
        suffix = suffix || _strEmpty;
        prefix = prefix || _strEmpty;
        return {
          t: zeroY ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strTop + suffix)),
          r: zeroX ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strRight + suffix)),
          b: zeroY ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strBottom + suffix)),
          l: zeroX ? 0 : parseToZeroOrNumber(_hostElement.css(prefix + _strLeft + suffix))
        };
      }
      /**
       * Returns the computed CSS transition string from the given element.
       * @param element The element from which the transition string shall be returned.
       * @returns {string} The CSS transition string from the given element.
       */


      function getCSSTransitionString(element) {
        var transitionStr = VENDORS._cssProperty('transition');

        var assembledValue = element.css(transitionStr);
        if (assembledValue) return assembledValue;
        var regExpString = '\\s*(' + '([^,(]+(\\(.+?\\))?)+' + ')[\\s,]*';
        var regExpMain = new RegExp(regExpString);
        var regExpValidate = new RegExp('^(' + regExpString + ')+$');
        var properties = 'property duration timing-function delay'.split(' ');
        var result = [];
        var strResult;
        var valueArray;
        var i = 0;
        var j;

        var splitCssStyleByComma = function splitCssStyleByComma(str) {
          strResult = [];
          if (!str.match(regExpValidate)) return str;

          while (str.match(regExpMain)) {
            strResult.push(RegExp.$1);
            str = str.replace(regExpMain, _strEmpty);
          }

          return strResult;
        };

        for (; i < properties[LEXICON.l]; i++) {
          valueArray = splitCssStyleByComma(element.css(transitionStr + '-' + properties[i]));

          for (j = 0; j < valueArray[LEXICON.l]; j++) {
            result[j] = (result[j] ? result[j] + _strSpace : _strEmpty) + valueArray[j];
          }
        }

        return result.join(', ');
      }
      /**
       * Generates a Regular Expression which matches with a string which starts with 'os-host'.
       * @param {boolean} withCurrClassNameOption The Regular Expression also matches if the string is the current ClassName option (multiple values splitted by space possible).
       * @param {boolean} withOldClassNameOption The Regular Expression also matches if the string is the old ClassName option (multiple values splitted by space possible).
       */


      function createHostClassNameRegExp(withCurrClassNameOption, withOldClassNameOption) {
        var i;
        var split;
        var appendix;

        var appendClasses = function appendClasses(classes, condition) {
          appendix = '';

          if (condition && _typeof(classes) == TYPES.s) {
            split = classes.split(_strSpace);

            for (i = 0; i < split[LEXICON.l]; i++) {
              appendix += '|' + split[i] + '$';
            } // split[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') for escaping regex characters

          }

          return appendix;
        };

        return new RegExp('(^' + _classNameHostElement + '([-_].+|)$)' + appendClasses(_classNameCache, withCurrClassNameOption) + appendClasses(_oldClassName, withOldClassNameOption), 'g');
      }
      /**
       * Calculates the host-elements inverted scale. (invertedScale = 1 / scale)
       * @returns {{x: number, y: number}} The scale of the host-element.
       */


      function getHostElementInvertedScale() {
        var rect = _paddingElementNative[LEXICON.bCR]();

        return {
          x: _supportTransform ? 1 / (MATH.round(rect.width) / _paddingElementNative[LEXICON.oW]) || 1 : 1,
          y: _supportTransform ? 1 / (MATH.round(rect.height) / _paddingElementNative[LEXICON.oH]) || 1 : 1
        };
      }
      /**
       * Checks whether the given object is a HTMLElement.
       * @param o The object which shall be checked.
       * @returns {boolean} True the given object is a HTMLElement, false otherwise.
       */


      function isHTMLElement(o) {
        var strOwnerDocument = 'ownerDocument';
        var strHTMLElement = 'HTMLElement';
        var wnd = o && o[strOwnerDocument] ? o[strOwnerDocument].parentWindow || window : window;
        return _typeof(wnd[strHTMLElement]) == TYPES.o ? o instanceof wnd[strHTMLElement] : //DOM2
        o && _typeof(o) == TYPES.o && o !== null && o.nodeType === 1 && _typeof(o.nodeName) == TYPES.s;
      }
      /**
       * Compares 2 arrays and returns the differences between them as a array.
       * @param a1 The first array which shall be compared.
       * @param a2 The second array which shall be compared.
       * @returns {Array} The differences between the two arrays.
       */


      function getArrayDifferences(a1, a2) {
        var a = [];
        var diff = [];
        var i;
        var k;

        for (i = 0; i < a1.length; i++) {
          a[a1[i]] = true;
        }

        for (i = 0; i < a2.length; i++) {
          if (a[a2[i]]) delete a[a2[i]];else a[a2[i]] = true;
        }

        for (k in a) {
          diff.push(k);
        }

        return diff;
      }
      /**
       * Returns Zero or the number to which the value can be parsed.
       * @param value The value which shall be parsed.
       * @param toFloat Indicates whether the number shall be parsed to a float.
       */


      function parseToZeroOrNumber(value, toFloat) {
        var num = toFloat ? parseFloat(value) : parseInt(value, 10);
        return isNaN(num) ? 0 : num;
      }
      /**
       * Gets several information of the textarea and returns them as a object or undefined if the browser doesn't support it.
       * @returns {{cursorRow: Number, cursorCol, rows: Number, cols: number, wRow: number, pos: number, max : number}} or undefined if not supported.
       */


      function getTextareaInfo() {
        //read needed values
        var textareaCursorPosition = _targetElementNative.selectionStart;
        if (textareaCursorPosition === undefined) return;

        var textareaValue = _targetElement.val();

        var textareaLength = textareaValue[LEXICON.l];
        var textareaRowSplit = textareaValue.split('\n');
        var textareaLastRow = textareaRowSplit[LEXICON.l];
        var textareaCurrentCursorRowSplit = textareaValue.substr(0, textareaCursorPosition).split('\n');
        var widestRow = 0;
        var textareaLastCol = 0;
        var cursorRow = textareaCurrentCursorRowSplit[LEXICON.l];
        var cursorCol = textareaCurrentCursorRowSplit[textareaCurrentCursorRowSplit[LEXICON.l] - 1][LEXICON.l];
        var rowCols;
        var i; //get widest Row and the last column of the textarea

        for (i = 0; i < textareaRowSplit[LEXICON.l]; i++) {
          rowCols = textareaRowSplit[i][LEXICON.l];

          if (rowCols > textareaLastCol) {
            widestRow = i + 1;
            textareaLastCol = rowCols;
          }
        }

        return {
          _cursorRow: cursorRow,
          //cursorRow
          _cursorColumn: cursorCol,
          //cursorCol
          _rows: textareaLastRow,
          //rows
          _columns: textareaLastCol,
          //cols
          _widestRow: widestRow,
          //wRow
          _cursorPosition: textareaCursorPosition,
          //pos
          _cursorMax: textareaLength //max

        };
      }
      /**
       * Determines whether native overlay scrollbars are active.
       * @returns {boolean} True if native overlay scrollbars are active, false otherwise.
       */


      function nativeOverlayScrollbarsAreActive() {
        return _ignoreOverlayScrollbarHidingCache && _nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y;
      }
      /**
       * Gets the element which is used to measure the content size.
       * @returns {*} TextareaCover if target element is textarea else the ContentElement.
       */


      function getContentMeasureElement() {
        return _isTextarea ? _textareaCoverElement[0] : _contentElementNative;
      }
      /**
       * Generates a string which represents a HTML div with the given classes or attributes.
       * @param classesOrAttrs The class of the div as string or a object which represents the attributes of the div. (The class attribute can also be written as "className".)
       * @param content The content of the div as string.
       * @returns {string} The concated string which represents a HTML div and its content.
       */


      function generateDiv(classesOrAttrs, content) {
        return '<div ' + (classesOrAttrs ? type(classesOrAttrs) == TYPES.s ? 'class="' + classesOrAttrs + '"' : function () {
          var key;
          var attrs = _strEmpty;

          if (FRAMEWORK.isPlainObject(classesOrAttrs)) {
            for (key in classesOrAttrs) {
              attrs += (key === 'c' ? 'class' : key) + '="' + classesOrAttrs[key] + '" ';
            }
          }

          return attrs;
        }() : _strEmpty) + '>' + (content || _strEmpty) + '</div>';
      }
      /**
       * Selects or generates a div with the given class attribute.
       * @param className The class names (divided by spaces) of the div which shall be selected or generated.
       * @param selectParentOrOnlyChildren The parent element from which of the element shall be selected. (if undefined or boolean its hostElement)
       * If its a boolean it decides whether only the children of the host element shall be selected.
       * @returns {*} The generated or selected element.
       */


      function selectOrGenerateDivByClass(className, selectParentOrOnlyChildren) {
        var onlyChildren = type(selectParentOrOnlyChildren) == TYPES.b;
        var selectParent = onlyChildren ? _hostElement : selectParentOrOnlyChildren || _hostElement;
        return _domExists && !selectParent[LEXICON.l] ? null : _domExists ? selectParent[onlyChildren ? 'children' : 'find'](_strDot + className.replace(/\s/g, _strDot)).eq(0) : FRAMEWORK(generateDiv(className));
      }
      /**
       * Gets the value of the given property from the given object.
       * @param obj The object from which the property value shall be got.
       * @param path The property of which the value shall be got.
       * @returns {*} Returns the value of the searched property or undefined of the property wasn't found.
       */


      function getObjectPropVal(obj, path) {
        var splits = path.split(_strDot);
        var i = 0;
        var val;

        for (; i < splits.length; i++) {
          if (!obj[LEXICON.hOP](splits[i])) return;
          val = obj[splits[i]];
          if (i < splits.length && type(val) == TYPES.o) obj = val;
        }

        return val;
      }
      /**
       * Sets the value of the given property from the given object.
       * @param obj The object from which the property value shall be set.
       * @param path The property of which the value shall be set.
       * @param val The value of the property which shall be set.
       */


      function setObjectPropVal(obj, path, val) {
        var splits = path.split(_strDot);
        var splitsLength = splits.length;
        var i = 0;
        var extendObj = {};
        var extendObjRoot = extendObj;

        for (; i < splitsLength; i++) {
          extendObj = extendObj[splits[i]] = i + 1 < splitsLength ? {} : val;
        }

        FRAMEWORK.extend(obj, extendObjRoot, true);
      }
      /**	
       * Runs a action for each selector inside the updateOnLoad option.	
       * @param {Function} action The action for each updateOnLoad selector, the arguments the function takes is the index and the value (the selector).	
       */


      function eachUpdateOnLoad(action) {
        var updateOnLoad = _currentPreparedOptions.updateOnLoad;
        updateOnLoad = type(updateOnLoad) == TYPES.s ? updateOnLoad.split(_strSpace) : updateOnLoad;

        if (COMPATIBILITY.isA(updateOnLoad) && !_destroyed) {
          each(updateOnLoad, action);
        }
      } //==== Utils Cache ====//

      /**
       * Compares two values or objects and returns true if they aren't equal.
       * @param current The first value or object which shall be compared.
       * @param cache The second value or object which shall be compared.
       * @param force If true the returned value is always true.
       * @returns {boolean} True if both values or objects aren't equal or force is true, false otherwise.
       */


      function checkCache(current, cache, force) {
        if (force) return force;

        if (type(current) == TYPES.o && type(cache) == TYPES.o) {
          for (var prop in current) {
            if (prop !== 'c') {
              if (current[LEXICON.hOP](prop) && cache[LEXICON.hOP](prop)) {
                if (checkCache(current[prop], cache[prop])) return true;
              } else {
                return true;
              }
            }
          }
        } else {
          return current !== cache;
        }

        return false;
      } //==== Shortcuts ====//

      /**
       * jQuery extend method shortcut with a appended "true" as first argument.
       */


      function extendDeep() {
        return FRAMEWORK.extend.apply(this, [true].concat([].slice.call(arguments)));
      }
      /**
       * jQuery addClass method shortcut.
       */


      function addClass(el, classes) {
        return _frameworkProto.addClass.call(el, classes);
      }
      /**
       * jQuery removeClass method shortcut.
       */


      function removeClass(el, classes) {
        return _frameworkProto.removeClass.call(el, classes);
      }
      /**
       * Adds or removes the given classes dependent on the boolean value. True for add, false for remove.
       */


      function addRemoveClass(el, classes, doAdd) {
        return doAdd ? addClass(el, classes) : removeClass(el, classes);
      }
      /**
       * jQuery remove method shortcut.
       */


      function remove(el) {
        return _frameworkProto.remove.call(el);
      }
      /**
       * Finds the first child element with the given selector of the given element.
       * @param el The root element from which the selector shall be valid.
       * @param selector The selector of the searched element.
       * @returns {*} The first element which is a child of the given element and matches the givens selector.
       */


      function findFirst(el, selector) {
        return _frameworkProto.find.call(el, selector).eq(0);
      } //==== API ====//

      /**
       * Puts the instance to sleep. It wont respond to any changes in the DOM and won't update. Scrollbar Interactivity is also disabled as well as the resize handle.
       * This behavior can be reset by calling the update method.
       */


      _base.sleep = function () {
        _sleeping = true;
      };
      /**
       * Updates the plugin and DOM to the current options.
       * This method should only be called if a update is 100% required.
       * @param force True if every property shall be updated and the cache shall be ignored.
       * !INTERNAL USAGE! : force can be a string "auto", "sync" or "zoom" too
       * if "auto" then before a real update the content size and host element attributes gets checked, and if they changed only then the update method will be called.
       * if "sync" then the async update process (MutationObserver or UpdateLoop) gets synchronized and a corresponding update takes place if one was needed due to pending changes.
       * if "zoom" then a update takes place where it's assumed that content and host size changed
       * @returns {boolean|undefined} 
       * If force is "sync" then a boolean is returned which indicates whether a update was needed due to pending changes.
       * If force is "auto" then a boolean is returned whether a update was needed due to attribute or size changes.
       * undefined otherwise.
       */


      _base.update = function (force) {
        if (_destroyed) return;
        var attrsChanged;
        var contentSizeC;
        var isString = type(force) == TYPES.s;
        var doUpdateAuto;
        var mutHost;
        var mutContent;

        if (isString) {
          if (force === _strAuto) {
            attrsChanged = meaningfulAttrsChanged();
            contentSizeC = updateAutoContentSizeChanged();
            doUpdateAuto = attrsChanged || contentSizeC;

            if (doUpdateAuto) {
              update({
                _contentSizeChanged: contentSizeC,
                _changedOptions: _initialized ? undefined : _currentPreparedOptions
              });
            }
          } else if (force === _strSync) {
            if (_mutationObserversConnected) {
              mutHost = _mutationObserverHostCallback(_mutationObserverHost.takeRecords());
              mutContent = _mutationObserverContentCallback(_mutationObserverContent.takeRecords());
            } else {
              mutHost = _base.update(_strAuto);
            }
          } else if (force === 'zoom') {
            update({
              _hostSizeChanged: true,
              _contentSizeChanged: true
            });
          }
        } else {
          force = _sleeping || force;
          _sleeping = false;
          if (!_base.update(_strSync) || force) update({
            _force: force
          });
        }

        updateElementsOnLoad();
        return doUpdateAuto || mutHost || mutContent;
      };
      /**
       Gets or sets the current options. The update method will be called automatically if new options were set.
       * @param newOptions If new options are given, then the new options will be set, if new options aren't given (undefined or a not a plain object) then the current options will be returned.
       * @param value If new options is a property path string, then this value will be used to set the option to which the property path string leads.
       * @returns {*}
       */


      _base.options = function (newOptions, value) {
        var option = {};
        var changedOps; //return current options if newOptions are undefined or empty

        if (FRAMEWORK.isEmptyObject(newOptions) || !FRAMEWORK.isPlainObject(newOptions)) {
          if (type(newOptions) == TYPES.s) {
            if (arguments.length > 1) {
              setObjectPropVal(option, newOptions, value);
              changedOps = setOptions(option);
            } else return getObjectPropVal(_currentOptions, newOptions);
          } else return _currentOptions;
        } else {
          changedOps = setOptions(newOptions);
        }

        if (!FRAMEWORK.isEmptyObject(changedOps)) {
          update({
            _changedOptions: changedOps
          });
        }
      };
      /**
       * Restore the DOM, disconnects all observers, remove all resize observers and put the instance to sleep.
       */


      _base.destroy = function () {
        if (_destroyed) return; //remove this instance from auto update loop

        autoUpdateLoop.remove(_base); //disconnect all mutation observers

        disconnectMutationObservers(); //remove all resize observers

        setupResizeObserver(_sizeObserverElement);
        setupResizeObserver(_sizeAutoObserverElement); //remove all extensions

        for (var extName in _extensions) {
          _base.removeExt(extName);
        } //remove all 'destroy' events


        while (_destroyEvents[LEXICON.l] > 0) {
          _destroyEvents.pop()();
        } //remove all events from host element


        setupHostMouseTouchEvents(true); //remove all helper / detection elements

        if (_contentGlueElement) remove(_contentGlueElement);
        if (_contentArrangeElement) remove(_contentArrangeElement);
        if (_sizeAutoObserverAdded) remove(_sizeAutoObserverElement); //remove all generated DOM

        setupScrollbarsDOM(true);
        setupScrollbarCornerDOM(true);
        setupStructureDOM(true); //remove all generated image load events

        for (var i = 0; i < _updateOnLoadElms[LEXICON.l]; i++) {
          FRAMEWORK(_updateOnLoadElms[i]).off(_updateOnLoadEventName, updateOnLoadCallback);
        }

        _updateOnLoadElms = undefined;
        _destroyed = true;
        _sleeping = true; //remove this instance from the instances list

        INSTANCES(pluginTargetElement, 0);
        dispatchCallback('onDestroyed'); //remove all properties and methods
        //for (var property in _base)
        //    delete _base[property];
        //_base = undefined;
      };
      /**
       * Scrolls to a given position or element.
       * @param coordinates
       * 1. Can be "coordinates" which looks like:
       *    { x : ?, y : ? } OR          Object with x and y properties
       *    { left : ?, top : ? } OR     Object with left and top properties
       *    { l : ?, t : ? } OR          Object with l and t properties
       *    [ ?, ? ] OR                  Array where the first two element are the coordinates (first is x, second is y)
       *    ?                            A single value which stays for both axis
       *    A value can be a number, a string or a calculation.
       *
       *    Operators:
       *    [NONE]  The current scroll will be overwritten by the value.
       *    '+='    The value will be added to the current scroll offset
       *    '-='    The value will be subtracted from the current scroll offset
       *    '*='    The current scroll wil be multiplicated by the value.
       *    '/='    The current scroll wil be divided by the value.
       *
       *    Units:
       *    [NONE]  The value is the final scroll amount.                   final = (value * 1)
       *    'px'    Same as none
       *    '%'     The value is dependent on the current scroll value.     final = ((currentScrollValue / 100) * value)
       *    'vw'    The value is multiplicated by the viewport width.       final = (value * viewportWidth)
       *    'vh'    The value is multiplicated by the viewport height.      final = (value * viewportHeight)
       *
       *    example final values:
       *    200, '200px', '50%', '1vw', '1vh', '+=200', '/=1vw', '*=2px', '-=5vh', '+=33%', '+= 50% - 2px', '-= 1vw - 50%'
       *
       * 2. Can be a HTML or jQuery element:
       *    The final scroll offset is the offset (without margin) of the given HTML / jQuery element.
       *
       * 3. Can be a object with a HTML or jQuery element with additional settings:
       *    {
       *      el : [HTMLElement, jQuery element],             MUST be specified, else this object isn't valid.
       *      scroll : [string, array, object],               Default value is 'always'.
       *      block : [string, array, object],                Default value is 'begin'.
       *      margin : [number, boolean, array, object]       Default value is false.
       *    }
       *
       *    Possible scroll settings are:
       *    'always'      Scrolls always.
       *    'ifneeded'    Scrolls only if the element isnt fully in view.
       *    'never'       Scrolls never.
       *
       *    Possible block settings are:
       *    'begin'   Both axis shall be docked to the "begin" edge. - The element will be docked to the top and left edge of the viewport.
       *    'end'     Both axis shall be docked to the "end" edge. - The element will be docked to the bottom and right edge of the viewport. (If direction is RTL to the bottom and left edge.)
       *    'center'  Both axis shall be docked to "center". - The element will be centered in the viewport.
       *    'nearest' The element will be docked to the nearest edge(s).
       *
       *    Possible margin settings are: -- The actual margin of the element wont be affect, this option affects only the final scroll offset.
       *    [BOOLEAN]                                         If true the css margin of the element will be used, if false no margin will be used.
       *    [NUMBER]                                          The margin will be used for all edges.
       *
       * @param duration The duration of the scroll animation, OR a jQuery animation configuration object.
       * @param easing The animation easing.
       * @param complete The animation complete callback.
       * @returns {{
       *   position: {x: number, y: number},
       *   ratio: {x: number, y: number},
       *   max: {x: number, y: number},
       *   handleOffset: {x: number, y: number},
       *   handleLength: {x: number, y: number},
       *   handleLengthRatio: {x: number, y: number}, t
       *   rackLength: {x: number, y: number},
       *   isRTL: boolean,
       *   isRTLNormalized: boolean
       *  }}
       */


      _base.scroll = function (coordinates, duration, easing, complete) {
        if (arguments.length === 0 || coordinates === undefined) {
          var infoX = _scrollHorizontalInfo;
          var infoY = _scrollVerticalInfo;
          var normalizeInvert = _normalizeRTLCache && _isRTL && _rtlScrollBehavior.i;
          var normalizeNegate = _normalizeRTLCache && _isRTL && _rtlScrollBehavior.n;
          var scrollX = infoX._currentScroll;
          var scrollXRatio = infoX._currentScrollRatio;
          var maxScrollX = infoX._maxScroll;
          scrollXRatio = normalizeInvert ? 1 - scrollXRatio : scrollXRatio;
          scrollX = normalizeInvert ? maxScrollX - scrollX : scrollX;
          scrollX *= normalizeNegate ? -1 : 1;
          maxScrollX *= normalizeNegate ? -1 : 1;
          return {
            position: {
              x: scrollX,
              y: infoY._currentScroll
            },
            ratio: {
              x: scrollXRatio,
              y: infoY._currentScrollRatio
            },
            max: {
              x: maxScrollX,
              y: infoY._maxScroll
            },
            handleOffset: {
              x: infoX._handleOffset,
              y: infoY._handleOffset
            },
            handleLength: {
              x: infoX._handleLength,
              y: infoY._handleLength
            },
            handleLengthRatio: {
              x: infoX._handleLengthRatio,
              y: infoY._handleLengthRatio
            },
            trackLength: {
              x: infoX._trackLength,
              y: infoY._trackLength
            },
            snappedHandleOffset: {
              x: infoX._snappedHandleOffset,
              y: infoY._snappedHandleOffset
            },
            isRTL: _isRTL,
            isRTLNormalized: _normalizeRTLCache
          };
        }

        _base.update(_strSync);

        var normalizeRTL = _normalizeRTLCache;
        var coordinatesXAxisProps = [_strX, _strLeft, 'l'];
        var coordinatesYAxisProps = [_strY, _strTop, 't'];
        var coordinatesOperators = ['+=', '-=', '*=', '/='];
        var durationIsObject = type(duration) == TYPES.o;
        var completeCallback = durationIsObject ? duration.complete : complete;
        var i;
        var finalScroll = {};
        var specialEasing = {};
        var doScrollLeft;
        var doScrollTop;
        var animationOptions;
        var strEnd = 'end';
        var strBegin = 'begin';
        var strCenter = 'center';
        var strNearest = 'nearest';
        var strAlways = 'always';
        var strNever = 'never';
        var strIfNeeded = 'ifneeded';
        var strLength = LEXICON.l;
        var settingsAxis;
        var settingsScroll;
        var settingsBlock;
        var settingsMargin;
        var finalElement;
        var elementObjSettingsAxisValues = [_strX, _strY, 'xy', 'yx'];
        var elementObjSettingsBlockValues = [strBegin, strEnd, strCenter, strNearest];
        var elementObjSettingsScrollValues = [strAlways, strNever, strIfNeeded];
        var coordinatesIsElementObj = coordinates[LEXICON.hOP]('el');
        var possibleElement = coordinatesIsElementObj ? coordinates.el : coordinates;
        var possibleElementIsJQuery = possibleElement instanceof FRAMEWORK || JQUERY ? possibleElement instanceof JQUERY : false;
        var possibleElementIsHTMLElement = possibleElementIsJQuery ? false : isHTMLElement(possibleElement);

        var updateScrollbarInfos = function updateScrollbarInfos() {
          if (doScrollLeft) refreshScrollbarHandleOffset(true);
          if (doScrollTop) refreshScrollbarHandleOffset(false);
        };

        var proxyCompleteCallback = type(completeCallback) != TYPES.f ? undefined : function () {
          updateScrollbarInfos();
          completeCallback();
        };

        function checkSettingsStringValue(currValue, allowedValues) {
          for (i = 0; i < allowedValues[strLength]; i++) {
            if (currValue === allowedValues[i]) return true;
          }

          return false;
        }

        function getRawScroll(isX, coordinates) {
          var coordinateProps = isX ? coordinatesXAxisProps : coordinatesYAxisProps;
          coordinates = type(coordinates) == TYPES.s || type(coordinates) == TYPES.n ? [coordinates, coordinates] : coordinates;
          if (COMPATIBILITY.isA(coordinates)) return isX ? coordinates[0] : coordinates[1];else if (type(coordinates) == TYPES.o) {
            //decides RTL normalization "hack" with .n
            //normalizeRTL = type(coordinates.n) == TYPES.b ? coordinates.n : normalizeRTL; 
            for (i = 0; i < coordinateProps[strLength]; i++) {
              if (coordinateProps[i] in coordinates) return coordinates[coordinateProps[i]];
            }
          }
        }

        function getFinalScroll(isX, rawScroll) {
          var isString = type(rawScroll) == TYPES.s;
          var operator;
          var amount;
          var scrollInfo = isX ? _scrollHorizontalInfo : _scrollVerticalInfo;
          var currScroll = scrollInfo._currentScroll;
          var maxScroll = scrollInfo._maxScroll;
          var mult = ' * ';
          var finalValue;
          var isRTLisX = _isRTL && isX;
          var normalizeShortcuts = isRTLisX && _rtlScrollBehavior.n && !normalizeRTL;
          var strReplace = 'replace';
          var evalFunc = eval;
          var possibleOperator;

          if (isString) {
            //check operator
            if (rawScroll[strLength] > 2) {
              possibleOperator = rawScroll.substr(0, 2);
              if (inArray(possibleOperator, coordinatesOperators) > -1) operator = possibleOperator;
            } //calculate units and shortcuts


            rawScroll = operator ? rawScroll.substr(2) : rawScroll;
            rawScroll = rawScroll[strReplace](/min/g, 0) //'min' = 0%
            [strReplace](/</g, 0) //'<'   = 0%
            [strReplace](/max/g, (normalizeShortcuts ? '-' : _strEmpty) + _strHundredPercent) //'max' = 100%
            [strReplace](/>/g, (normalizeShortcuts ? '-' : _strEmpty) + _strHundredPercent) //'>'   = 100%
            [strReplace](/px/g, _strEmpty)[strReplace](/%/g, mult + maxScroll * (isRTLisX && _rtlScrollBehavior.n ? -1 : 1) / 100.0)[strReplace](/vw/g, mult + _viewportSize.w)[strReplace](/vh/g, mult + _viewportSize.h);
            amount = parseToZeroOrNumber(isNaN(rawScroll) ? parseToZeroOrNumber(evalFunc(rawScroll), true).toFixed() : rawScroll);
          } else {
            amount = rawScroll;
          }

          if (amount !== undefined && !isNaN(amount) && type(amount) == TYPES.n) {
            var normalizeIsRTLisX = normalizeRTL && isRTLisX;
            var operatorCurrScroll = currScroll * (normalizeIsRTLisX && _rtlScrollBehavior.n ? -1 : 1);
            var invert = normalizeIsRTLisX && _rtlScrollBehavior.i;
            var negate = normalizeIsRTLisX && _rtlScrollBehavior.n;
            operatorCurrScroll = invert ? maxScroll - operatorCurrScroll : operatorCurrScroll;

            switch (operator) {
              case '+=':
                finalValue = operatorCurrScroll + amount;
                break;

              case '-=':
                finalValue = operatorCurrScroll - amount;
                break;

              case '*=':
                finalValue = operatorCurrScroll * amount;
                break;

              case '/=':
                finalValue = operatorCurrScroll / amount;
                break;

              default:
                finalValue = amount;
                break;
            }

            finalValue = invert ? maxScroll - finalValue : finalValue;
            finalValue *= negate ? -1 : 1;
            finalValue = isRTLisX && _rtlScrollBehavior.n ? MATH.min(0, MATH.max(maxScroll, finalValue)) : MATH.max(0, MATH.min(maxScroll, finalValue));
          }

          return finalValue === currScroll ? undefined : finalValue;
        }

        function getPerAxisValue(value, valueInternalType, defaultValue, allowedValues) {
          var resultDefault = [defaultValue, defaultValue];
          var valueType = type(value);
          var valueArrLength;
          var valueArrItem; //value can be [ string, or array of two strings ]

          if (valueType == valueInternalType) {
            value = [value, value];
          } else if (valueType == TYPES.a) {
            valueArrLength = value[strLength];
            if (valueArrLength > 2 || valueArrLength < 1) value = resultDefault;else {
              if (valueArrLength === 1) value[1] = defaultValue;

              for (i = 0; i < valueArrLength; i++) {
                valueArrItem = value[i];

                if (type(valueArrItem) != valueInternalType || !checkSettingsStringValue(valueArrItem, allowedValues)) {
                  value = resultDefault;
                  break;
                }
              }
            }
          } else if (valueType == TYPES.o) value = [value[_strX] || defaultValue, value[_strY] || defaultValue];else value = resultDefault;

          return {
            x: value[0],
            y: value[1]
          };
        }

        function generateMargin(marginTopRightBottomLeftArray) {
          var result = [];
          var currValue;
          var currValueType;
          var valueDirections = [_strTop, _strRight, _strBottom, _strLeft];

          for (i = 0; i < marginTopRightBottomLeftArray[strLength]; i++) {
            if (i === valueDirections[strLength]) break;
            currValue = marginTopRightBottomLeftArray[i];
            currValueType = type(currValue);
            if (currValueType == TYPES.b) result.push(currValue ? parseToZeroOrNumber(finalElement.css(_strMarginMinus + valueDirections[i])) : 0);else result.push(currValueType == TYPES.n ? currValue : 0);
          }

          return result;
        }

        if (possibleElementIsJQuery || possibleElementIsHTMLElement) {
          //get settings
          var margin = coordinatesIsElementObj ? coordinates.margin : 0;
          var axis = coordinatesIsElementObj ? coordinates.axis : 0;
          var scroll = coordinatesIsElementObj ? coordinates.scroll : 0;
          var block = coordinatesIsElementObj ? coordinates.block : 0;
          var marginDefault = [0, 0, 0, 0];
          var marginType = type(margin);
          var marginLength;
          finalElement = possibleElementIsJQuery ? possibleElement : FRAMEWORK(possibleElement);

          if (finalElement[strLength] > 0) {
            //margin can be [ boolean, number, array of 2, array of 4, object ]
            if (marginType == TYPES.n || marginType == TYPES.b) margin = generateMargin([margin, margin, margin, margin]);else if (marginType == TYPES.a) {
              marginLength = margin[strLength];
              if (marginLength === 2) margin = generateMargin([margin[0], margin[1], margin[0], margin[1]]);else if (marginLength >= 4) margin = generateMargin(margin);else margin = marginDefault;
            } else if (marginType == TYPES.o) margin = generateMargin([margin[_strTop], margin[_strRight], margin[_strBottom], margin[_strLeft]]);else margin = marginDefault; //block = type(block) === TYPES.b ? block ? [ strNearest, strBegin ] : [ strNearest, strEnd ] : block;

            settingsAxis = checkSettingsStringValue(axis, elementObjSettingsAxisValues) ? axis : 'xy';
            settingsScroll = getPerAxisValue(scroll, TYPES.s, strAlways, elementObjSettingsScrollValues);
            settingsBlock = getPerAxisValue(block, TYPES.s, strBegin, elementObjSettingsBlockValues);
            settingsMargin = margin;
            var viewportScroll = {
              l: _scrollHorizontalInfo._currentScroll,
              t: _scrollVerticalInfo._currentScroll
            }; // use padding element instead of viewport element because padding element has never padding, margin or position applied.

            var viewportOffset = _paddingElement.offset(); //get coordinates


            var elementOffset = finalElement.offset();
            var doNotScroll = {
              x: settingsScroll.x == strNever || settingsAxis == _strY,
              y: settingsScroll.y == strNever || settingsAxis == _strX
            };
            elementOffset[_strTop] -= settingsMargin[0];
            elementOffset[_strLeft] -= settingsMargin[3];
            var elementScrollCoordinates = {
              x: MATH.round(elementOffset[_strLeft] - viewportOffset[_strLeft] + viewportScroll.l),
              y: MATH.round(elementOffset[_strTop] - viewportOffset[_strTop] + viewportScroll.t)
            };

            if (_isRTL) {
              if (!_rtlScrollBehavior.n && !_rtlScrollBehavior.i) elementScrollCoordinates.x = MATH.round(viewportOffset[_strLeft] - elementOffset[_strLeft] + viewportScroll.l);
              if (_rtlScrollBehavior.n && normalizeRTL) elementScrollCoordinates.x *= -1;
              if (_rtlScrollBehavior.i && normalizeRTL) elementScrollCoordinates.x = MATH.round(viewportOffset[_strLeft] - elementOffset[_strLeft] + (_scrollHorizontalInfo._maxScroll - viewportScroll.l));
            } //measuring is required


            if (settingsBlock.x != strBegin || settingsBlock.y != strBegin || settingsScroll.x == strIfNeeded || settingsScroll.y == strIfNeeded || _isRTL) {
              var measuringElm = finalElement[0];
              var rawElementSize = _supportTransform ? measuringElm[LEXICON.bCR]() : {
                width: measuringElm[LEXICON.oW],
                height: measuringElm[LEXICON.oH]
              };
              var elementSize = {
                w: rawElementSize[_strWidth] + settingsMargin[3] + settingsMargin[1],
                h: rawElementSize[_strHeight] + settingsMargin[0] + settingsMargin[2]
              };

              var finalizeBlock = function finalizeBlock(isX) {
                var vars = getScrollbarVars(isX);
                var wh = vars._w_h;
                var lt = vars._left_top;
                var xy = vars._x_y;
                var blockIsEnd = settingsBlock[xy] == (isX ? _isRTL ? strBegin : strEnd : strEnd);
                var blockIsCenter = settingsBlock[xy] == strCenter;
                var blockIsNearest = settingsBlock[xy] == strNearest;
                var scrollNever = settingsScroll[xy] == strNever;
                var scrollIfNeeded = settingsScroll[xy] == strIfNeeded;
                var vpSize = _viewportSize[wh];
                var vpOffset = viewportOffset[lt];
                var elSize = elementSize[wh];
                var elOffset = elementOffset[lt];
                var divide = blockIsCenter ? 2 : 1;
                var elementCenterOffset = elOffset + elSize / 2;
                var viewportCenterOffset = vpOffset + vpSize / 2;
                var isInView = elSize <= vpSize && elOffset >= vpOffset && elOffset + elSize <= vpOffset + vpSize;
                if (scrollNever) doNotScroll[xy] = true;else if (!doNotScroll[xy]) {
                  if (blockIsNearest || scrollIfNeeded) {
                    doNotScroll[xy] = scrollIfNeeded ? isInView : false;
                    blockIsEnd = elSize < vpSize ? elementCenterOffset > viewportCenterOffset : elementCenterOffset < viewportCenterOffset;
                  }

                  elementScrollCoordinates[xy] -= blockIsEnd || blockIsCenter ? (vpSize / divide - elSize / divide) * (isX && _isRTL && normalizeRTL ? -1 : 1) : 0;
                }
              };

              finalizeBlock(true);
              finalizeBlock(false);
            }

            if (doNotScroll.y) delete elementScrollCoordinates.y;
            if (doNotScroll.x) delete elementScrollCoordinates.x;
            coordinates = elementScrollCoordinates;
          }
        }

        finalScroll[_strScrollLeft] = getFinalScroll(true, getRawScroll(true, coordinates));
        finalScroll[_strScrollTop] = getFinalScroll(false, getRawScroll(false, coordinates));
        doScrollLeft = finalScroll[_strScrollLeft] !== undefined;
        doScrollTop = finalScroll[_strScrollTop] !== undefined;

        if ((doScrollLeft || doScrollTop) && (duration > 0 || durationIsObject)) {
          if (durationIsObject) {
            duration.complete = proxyCompleteCallback;

            _viewportElement.animate(finalScroll, duration);
          } else {
            animationOptions = {
              duration: duration,
              complete: proxyCompleteCallback
            };

            if (COMPATIBILITY.isA(easing) || FRAMEWORK.isPlainObject(easing)) {
              specialEasing[_strScrollLeft] = easing[0] || easing.x;
              specialEasing[_strScrollTop] = easing[1] || easing.y;
              animationOptions.specialEasing = specialEasing;
            } else {
              animationOptions.easing = easing;
            }

            _viewportElement.animate(finalScroll, animationOptions);
          }
        } else {
          if (doScrollLeft) _viewportElement[_strScrollLeft](finalScroll[_strScrollLeft]);
          if (doScrollTop) _viewportElement[_strScrollTop](finalScroll[_strScrollTop]);
          updateScrollbarInfos();
        }
      };
      /**
       * Stops all scroll animations.
       * @returns {*} The current OverlayScrollbars instance (for chaining).
       */


      _base.scrollStop = function (param1, param2, param3) {
        _viewportElement.stop(param1, param2, param3);

        return _base;
      };
      /**
       * Returns all relevant elements.
       * @param elementName The name of the element which shall be returned.
       * @returns {{target: *, host: *, padding: *, viewport: *, content: *, scrollbarHorizontal: {scrollbar: *, track: *, handle: *}, scrollbarVertical: {scrollbar: *, track: *, handle: *}, scrollbarCorner: *} | *}
       */


      _base.getElements = function (elementName) {
        var obj = {
          target: _targetElementNative,
          host: _hostElementNative,
          padding: _paddingElementNative,
          viewport: _viewportElementNative,
          content: _contentElementNative,
          scrollbarHorizontal: {
            scrollbar: _scrollbarHorizontalElement[0],
            track: _scrollbarHorizontalTrackElement[0],
            handle: _scrollbarHorizontalHandleElement[0]
          },
          scrollbarVertical: {
            scrollbar: _scrollbarVerticalElement[0],
            track: _scrollbarVerticalTrackElement[0],
            handle: _scrollbarVerticalHandleElement[0]
          },
          scrollbarCorner: _scrollbarCornerElement[0]
        };
        return type(elementName) == TYPES.s ? getObjectPropVal(obj, elementName) : obj;
      };
      /**
       * Returns a object which describes the current state of this instance.
       * @param stateProperty A specific property from the state object which shall be returned.
       * @returns {{widthAuto, heightAuto, overflowAmount, hideOverflow, hasOverflow, contentScrollSize, viewportSize, hostSize, autoUpdate} | *}
       */


      _base.getState = function (stateProperty) {
        function prepare(obj) {
          if (!FRAMEWORK.isPlainObject(obj)) return obj;
          var extended = extendDeep({}, obj);

          var changePropertyName = function changePropertyName(from, to) {
            if (extended[LEXICON.hOP](from)) {
              extended[to] = extended[from];
              delete extended[from];
            }
          };

          changePropertyName('w', _strWidth); //change w to width

          changePropertyName('h', _strHeight); //change h to height

          delete extended.c; //delete c (the 'changed' prop)

          return extended;
        }

        ;
        var obj = {
          destroyed: !!prepare(_destroyed),
          sleeping: !!prepare(_sleeping),
          autoUpdate: prepare(!_mutationObserversConnected),
          widthAuto: prepare(_widthAutoCache),
          heightAuto: prepare(_heightAutoCache),
          padding: prepare(_cssPaddingCache),
          overflowAmount: prepare(_overflowAmountCache),
          hideOverflow: prepare(_hideOverflowCache),
          hasOverflow: prepare(_hasOverflowCache),
          contentScrollSize: prepare(_contentScrollSizeCache),
          viewportSize: prepare(_viewportSize),
          hostSize: prepare(_hostSizeCache),
          documentMixed: prepare(_documentMixed)
        };
        return type(stateProperty) == TYPES.s ? getObjectPropVal(obj, stateProperty) : obj;
      };
      /**
       * Gets all or specific extension instance.
       * @param extName The name of the extension from which the instance shall be got.
       * @returns {{}} The instance of the extension with the given name or undefined if the instance couldn't be found.
       */


      _base.ext = function (extName) {
        var result;

        var privateMethods = _extensionsPrivateMethods.split(' ');

        var i = 0;

        if (type(extName) == TYPES.s) {
          if (_extensions[LEXICON.hOP](extName)) {
            result = extendDeep({}, _extensions[extName]);

            for (; i < privateMethods.length; i++) {
              delete result[privateMethods[i]];
            }
          }
        } else {
          result = {};

          for (i in _extensions) {
            result[i] = extendDeep({}, _base.ext(i));
          }
        }

        return result;
      };
      /**
       * Adds a extension to this instance.
       * @param extName The name of the extension which shall be added.
       * @param extensionOptions The extension options which shall be used.
       * @returns {{}} The instance of the added extension or undefined if the extension couldn't be added properly.
       */


      _base.addExt = function (extName, extensionOptions) {
        var registeredExtensionObj = _plugin.extension(extName);

        var instance;
        var instanceAdded;
        var instanceContract;
        var contractResult;
        var contractFulfilled = true;

        if (registeredExtensionObj) {
          if (!_extensions[LEXICON.hOP](extName)) {
            instance = registeredExtensionObj.extensionFactory.call(_base, extendDeep({}, registeredExtensionObj.defaultOptions), FRAMEWORK, COMPATIBILITY);

            if (instance) {
              instanceContract = instance.contract;

              if (type(instanceContract) == TYPES.f) {
                contractResult = instanceContract(window);
                contractFulfilled = type(contractResult) == TYPES.b ? contractResult : contractFulfilled;
              }

              if (contractFulfilled) {
                _extensions[extName] = instance;
                instanceAdded = instance.added;
                if (type(instanceAdded) == TYPES.f) instanceAdded(extensionOptions);
                return _base.ext(extName);
              }
            }
          } else return _base.ext(extName);
        } else console.warn("A extension with the name \"" + extName + "\" isn't registered.");
      };
      /**
       * Removes a extension from this instance.
       * @param extName The name of the extension which shall be removed.
       * @returns {boolean} True if the extension was removed, false otherwise e.g. if the extension wasn't added before.
       */


      _base.removeExt = function (extName) {
        var instance = _extensions[extName];
        var instanceRemoved;

        if (instance) {
          delete _extensions[extName];
          instanceRemoved = instance.removed;
          if (type(instanceRemoved) == TYPES.f) instanceRemoved();
          return true;
        }

        return false;
      };
      /**
       * Constructs the plugin.
       * @param targetElement The element to which the plugin shall be applied.
       * @param options The initial options of the plugin.
       * @param extensions The extension(s) which shall be added right after the initialization.
       * @returns {boolean} True if the plugin was successfully initialized, false otherwise.
       */


      function construct(targetElement, options, extensions) {
        _defaultOptions = globals.defaultOptions;
        _nativeScrollbarStyling = globals.nativeScrollbarStyling;
        _nativeScrollbarSize = extendDeep({}, globals.nativeScrollbarSize);
        _nativeScrollbarIsOverlaid = extendDeep({}, globals.nativeScrollbarIsOverlaid);
        _overlayScrollbarDummySize = extendDeep({}, globals.overlayScrollbarDummySize);
        _rtlScrollBehavior = extendDeep({}, globals.rtlScrollBehavior); //parse & set options but don't update

        setOptions(extendDeep({}, _defaultOptions, options));
        _cssCalc = globals.cssCalc;
        _msieVersion = globals.msie;
        _autoUpdateRecommended = globals.autoUpdateRecommended;
        _supportTransition = globals.supportTransition;
        _supportTransform = globals.supportTransform;
        _supportPassiveEvents = globals.supportPassiveEvents;
        _supportResizeObserver = globals.supportResizeObserver;
        _supportMutationObserver = globals.supportMutationObserver;
        _restrictedMeasuring = globals.restrictedMeasuring;
        _documentElement = FRAMEWORK(targetElement.ownerDocument);
        _documentElementNative = _documentElement[0];
        _windowElement = FRAMEWORK(_documentElementNative.defaultView || _documentElementNative.parentWindow);
        _windowElementNative = _windowElement[0];
        _htmlElement = findFirst(_documentElement, 'html');
        _bodyElement = findFirst(_htmlElement, 'body');
        _targetElement = FRAMEWORK(targetElement);
        _targetElementNative = _targetElement[0];
        _isTextarea = _targetElement.is('textarea');
        _isBody = _targetElement.is('body');
        _documentMixed = _documentElementNative !== document;
        /* On a div Element The if checks only whether:
         * - the targetElement has the class "os-host"
         * - the targetElement has a a child with the class "os-padding"
         * 
         * If that's the case, its assumed the DOM has already the following structure:
         * (The ".os-host" element is the targetElement)
         *
         *  <div class="os-host">
         *      <div class="os-resize-observer-host"></div>
         *      <div class="os-padding">
         *          <div class="os-viewport">
         *              <div class="os-content"></div>
         *          </div>
         *      </div>
         *      <div class="os-scrollbar os-scrollbar-horizontal ">
         *          <div class="os-scrollbar-track">
         *              <div class="os-scrollbar-handle"></div>
         *          </div>
         *      </div>
         *      <div class="os-scrollbar os-scrollbar-vertical">
         *          <div class="os-scrollbar-track">
         *              <div class="os-scrollbar-handle"></div>
         *          </div>
         *      </div>
         *      <div class="os-scrollbar-corner"></div>
         *  </div>
         *
         * =====================================================================================
         * 
         * On a Textarea Element The if checks only whether:
         * - the targetElement has the class "os-textarea" 
         * - the targetElement is inside a element with the class "os-content" 
         * 
         * If that's the case, its assumed the DOM has already the following structure:
         * (The ".os-textarea" (textarea) element is the targetElement)
         *
         *  <div class="os-host-textarea">
         *      <div class="os-resize-observer-host"></div>
         *      <div class="os-padding os-text-inherit">
         *          <div class="os-viewport os-text-inherit">
         *              <div class="os-content os-text-inherit">
         *                  <div class="os-textarea-cover"></div>
         *                  <textarea class="os-textarea os-text-inherit"></textarea>
         *              </div>
         *          </div>
         *      </div>
         *      <div class="os-scrollbar os-scrollbar-horizontal ">
         *          <div class="os-scrollbar-track">
         *              <div class="os-scrollbar-handle"></div>
         *          </div>
         *      </div>
         *      <div class="os-scrollbar os-scrollbar-vertical">
         *          <div class="os-scrollbar-track">
         *              <div class="os-scrollbar-handle"></div>
         *          </div>
         *      </div>
         *      <div class="os-scrollbar-corner"></div>
         *  </div>
         */

        _domExists = _isTextarea ? _targetElement.hasClass(_classNameTextareaElement) && _targetElement.parent().hasClass(_classNameContentElement) : _targetElement.hasClass(_classNameHostElement) && _targetElement.children(_strDot + _classNamePaddingElement)[LEXICON.l];
        var initBodyScroll;

        var _bodyMouseTouchDownListener; //check if the plugin hasn't to be initialized


        if (_nativeScrollbarIsOverlaid.x && _nativeScrollbarIsOverlaid.y && !_currentPreparedOptions.nativeScrollbarsOverlaid.initialize) {
          dispatchCallback('onInitializationWithdrawn');

          if (_domExists) {
            setupStructureDOM(true);
            setupScrollbarsDOM(true);
            setupScrollbarCornerDOM(true);
          }

          _destroyed = true;
          _sleeping = true;
          return _base;
        }

        if (_isBody) {
          initBodyScroll = {};
          initBodyScroll.l = MATH.max(_targetElement[_strScrollLeft](), _htmlElement[_strScrollLeft](), _windowElement[_strScrollLeft]());
          initBodyScroll.t = MATH.max(_targetElement[_strScrollTop](), _htmlElement[_strScrollTop](), _windowElement[_strScrollTop]());

          _bodyMouseTouchDownListener = function bodyMouseTouchDownListener() {
            _viewportElement.removeAttr(LEXICON.ti);

            setupResponsiveEventListener(_viewportElement, _strMouseTouchDownEvent, _bodyMouseTouchDownListener, true, true);
          };
        } //build OverlayScrollbars DOM


        setupStructureDOM();
        setupScrollbarsDOM();
        setupScrollbarCornerDOM(); //create OverlayScrollbars events

        setupStructureEvents();
        setupScrollbarEvents(true);
        setupScrollbarEvents(false);
        setupScrollbarCornerEvents(); //create mutation observers

        createMutationObservers(); //build resize observer for the host element

        setupResizeObserver(_sizeObserverElement, hostOnResized);

        if (_isBody) {
          //apply the body scroll to handle it right in the update method
          _viewportElement[_strScrollLeft](initBodyScroll.l)[_strScrollTop](initBodyScroll.t); //set the focus on the viewport element so you dont have to click on the page to use keyboard keys (up / down / space) for scrolling


          if (document.activeElement == targetElement && _viewportElementNative.focus) {
            //set a tabindex to make the viewportElement focusable
            _viewportElement.attr(LEXICON.ti, '-1');

            _viewportElementNative.focus();
            /* the tabindex has to be removed due to;
             * If you set the tabindex attribute on an <div>, then its child content cannot be scrolled with the arrow keys unless you set tabindex on the content, too
             * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
             */


            setupResponsiveEventListener(_viewportElement, _strMouseTouchDownEvent, _bodyMouseTouchDownListener, false, true);
          }
        } //update for the first time & initialize cache


        _base.update(_strAuto); //the plugin is initialized now!


        _initialized = true;
        dispatchCallback('onInitialized'); //call all callbacks which would fire before the initialized was complete

        each(_callbacksInitQeueue, function (index, value) {
          dispatchCallback(value.n, value.a);
        });
        _callbacksInitQeueue = []; //add extensions

        if (type(extensions) == TYPES.s) extensions = [extensions];
        if (COMPATIBILITY.isA(extensions)) each(extensions, function (index, value) {
          _base.addExt(value);
        });else if (FRAMEWORK.isPlainObject(extensions)) each(extensions, function (key, value) {
          _base.addExt(key, value);
        }); //add the transition class for transitions AFTER the first update & AFTER the applied extensions (for preventing unwanted transitions)

        setTimeout(function () {
          if (_supportTransition && !_destroyed) addClass(_hostElement, _classNameHostTransition);
        }, 333);
        return _base;
      }

      if (_plugin.valid(construct(pluginTargetElement, options, extensions))) {
        INSTANCES(pluginTargetElement, _base);
      }

      return _base;
    }
    /**
     * Initializes a new OverlayScrollbarsInstance object or changes options if already initialized or returns the current instance.
     * @param pluginTargetElements The elements to which the Plugin shall be initialized.
     * @param options The custom options with which the plugin shall be initialized.
     * @param extensions The extension(s) which shall be added right after initialization.
     * @returns {*}
     */


    _plugin = window[PLUGINNAME] = function (pluginTargetElements, options, extensions) {
      if (arguments[LEXICON.l] === 0) return this;
      var arr = [];
      var optsIsPlainObj = FRAMEWORK.isPlainObject(options);
      var inst;
      var result; //pluginTargetElements is null or undefined

      if (!pluginTargetElements) return optsIsPlainObj || !options ? result : arr;
      /*
         pluginTargetElements will be converted to:
         1. A jQueryElement Array
         2. A HTMLElement Array
         3. A Array with a single HTML Element
         so pluginTargetElements is always a array.
      */

      pluginTargetElements = pluginTargetElements[LEXICON.l] != undefined ? pluginTargetElements : [pluginTargetElements[0] || pluginTargetElements];
      initOverlayScrollbarsStatics();

      if (pluginTargetElements[LEXICON.l] > 0) {
        if (optsIsPlainObj) {
          FRAMEWORK.each(pluginTargetElements, function (i, v) {
            inst = v;
            if (inst !== undefined) arr.push(OverlayScrollbarsInstance(inst, options, extensions, _pluginsGlobals, _pluginsAutoUpdateLoop));
          });
        } else {
          FRAMEWORK.each(pluginTargetElements, function (i, v) {
            inst = INSTANCES(v);
            if (options === '!' && _plugin.valid(inst) || COMPATIBILITY.type(options) == TYPES.f && options(v, inst)) arr.push(inst);else if (options === undefined) arr.push(inst);
          });
        }

        result = arr[LEXICON.l] === 1 ? arr[0] : arr;
      }

      return result;
    };
    /**
     * Returns a object which contains global information about the plugin and each instance of it.
     * The returned object is just a copy, that means that changes to the returned object won't have any effect to the original object.
     */


    _plugin.globals = function () {
      initOverlayScrollbarsStatics();
      var globals = FRAMEWORK.extend(true, {}, _pluginsGlobals);
      delete globals['msie'];
      return globals;
    };
    /**
     * Gets or Sets the default options for each new plugin initialization.
     * @param newDefaultOptions The object with which the default options shall be extended.
     */


    _plugin.defaultOptions = function (newDefaultOptions) {
      initOverlayScrollbarsStatics();
      var currDefaultOptions = _pluginsGlobals.defaultOptions;
      if (newDefaultOptions === undefined) return FRAMEWORK.extend(true, {}, currDefaultOptions); //set the new default options

      _pluginsGlobals.defaultOptions = FRAMEWORK.extend(true, {}, currDefaultOptions, _pluginsOptions._validate(newDefaultOptions, _pluginsOptions._template, true, currDefaultOptions)._default);
    };
    /**
     * Checks whether the passed instance is a non-destroyed OverlayScrollbars instance.
     * @param osInstance The potential OverlayScrollbars instance which shall be checked.
     * @returns {boolean} True if the passed value is a non-destroyed OverlayScrollbars instance, false otherwise.
     */


    _plugin.valid = function (osInstance) {
      return osInstance instanceof _plugin && !osInstance.getState().destroyed;
    };
    /**
     * Registers, Unregisters or returns a extension.
     * Register: Pass the name and the extension. (defaultOptions is optional)
     * Unregister: Pass the name and anything except a function as extension parameter.
     * Get extension: Pass the name of the extension which shall be got.
     * Get all extensions: Pass no arguments.
     * @param extensionName The name of the extension which shall be registered, unregistered or returned.
     * @param extension A function which generates the instance of the extension or anything other to remove a already registered extension.
     * @param defaultOptions The default options which shall be used for the registered extension.
     */


    _plugin.extension = function (extensionName, extension, defaultOptions) {
      var extNameTypeString = COMPATIBILITY.type(extensionName) == TYPES.s;
      var argLen = arguments[LEXICON.l];
      var i = 0;

      if (argLen < 1 || !extNameTypeString) {
        //return a copy of all extension objects
        return FRAMEWORK.extend(true, {
          length: _pluginsExtensions[LEXICON.l]
        }, _pluginsExtensions);
      } else if (extNameTypeString) {
        if (COMPATIBILITY.type(extension) == TYPES.f) {
          //register extension
          _pluginsExtensions.push({
            name: extensionName,
            extensionFactory: extension,
            defaultOptions: defaultOptions
          });
        } else {
          for (; i < _pluginsExtensions[LEXICON.l]; i++) {
            if (_pluginsExtensions[i].name === extensionName) {
              if (argLen > 1) _pluginsExtensions.splice(i, 1); //remove extension
              else return FRAMEWORK.extend(true, {}, _pluginsExtensions[i]); //return extension with the given name
            }
          }
        }
      }
    };

    return _plugin;
  }();

  if (JQUERY && JQUERY.fn) {
    /**
     * The jQuery initialization interface.
     * @param options The initial options for the construction of the plugin. To initialize the plugin, this option has to be a object! If it isn't a object, the instance(s) are returned and the plugin wont be initialized.
     * @param extensions The extension(s) which shall be added right after initialization.
     * @returns {*} After initialization it returns the jQuery element array, else it returns the instance(s) of the elements which are selected.
     */
    JQUERY.fn.overlayScrollbars = function (options, extensions) {
      var _elements = this;

      if (JQUERY.isPlainObject(options)) {
        JQUERY.each(_elements, function () {
          PLUGIN(this, options, extensions);
        });
        return _elements;
      } else return PLUGIN(_elements, options);
    };
  }

  return PLUGIN;
});
},{}],"styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./img\\tenor.gif":[["tenor.160d12b8.gif","img/tenor.gif"],"img/tenor.gif"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _general = _interopRequireDefault(require("daisyui/dist/resets/general"));

var _initForm = require("./js/modules/initForm");

var _initTestForm = require("./js/modules/initTestForm");

var _initLanguage = require("./js/modules/initLanguage");

var _initDisco = require("./js/modules/initDisco");

require("SimpleBar");

require("simplebar/dist/simplebar.css");

require("./js/libs/OverlayScrollbars");

require("./styles.css");

require("./styles.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _initForm.initForm)();
(0, _initTestForm.initTestForm)();
(0, _initLanguage.initLanguage)();
(0, _initDisco.initDisco)();
},{"daisyui/dist/resets/general":"../node_modules/daisyui/dist/resets/general.js","./js/modules/initForm":"js/modules/initForm.js","./js/modules/initTestForm":"js/modules/initTestForm.js","./js/modules/initLanguage":"js/modules/initLanguage.js","./js/modules/initDisco":"js/modules/initDisco.js","SimpleBar":"../node_modules/SimpleBar/dist/simplebar.esm.js","simplebar/dist/simplebar.css":"../node_modules/simplebar/dist/simplebar.css","./js/libs/OverlayScrollbars":"js/libs/OverlayScrollbars.js","./styles.css":"styles.css","./styles.scss":"styles.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60208" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map