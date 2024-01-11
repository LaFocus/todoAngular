"use strict";
(self.webpackChunktodolist = self.webpackChunktodolist || []).push([
  [179],
  {
    752: () => {
      let pe = null,
        Xn = 1;
      function ce(e) {
        const t = pe;
        return (pe = e), t;
      }
      function ff(e) {
        if ((!ao(e) || e.dirty) && (e.dirty || e.lastCleanEpoch !== Xn)) {
          if (!e.producerMustRecompute(e) && !qa(e))
            return (e.dirty = !1), void (e.lastCleanEpoch = Xn);
          e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = Xn);
        }
      }
      function qa(e) {
        er(e);
        for (let t = 0; t < e.producerNode.length; t++) {
          const n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
          if (r !== n.version || (ff(n), r !== n.version)) return !0;
        }
        return !1;
      }
      function Si(e, t) {
        if (
          ((function _f(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          er(e),
          1 === e.liveConsumerNode.length)
        )
          for (let r = 0; r < e.producerNode.length; r++)
            Si(e.producerNode[r], e.producerIndexOfThis[r]);
        const n = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
          (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          t < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[t],
            o = e.liveConsumerNode[t];
          er(o), (o.producerIndexOfThis[r] = t);
        }
      }
      function ao(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function er(e) {
        (e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= []);
      }
      let Df = null;
      function _e(e) {
        return "function" == typeof e;
      }
      function Ef(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Ya = Ef(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Ka(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class bt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (_e(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Ya ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Mf(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Ya ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Ya(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Mf(t);
            else {
              if (t instanceof bt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Ka(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Ka(n, t), t instanceof bt && t._removeParent(this);
        }
      }
      bt.EMPTY = (() => {
        const e = new bt();
        return (e.closed = !0), e;
      })();
      const If = bt.EMPTY;
      function bf(e) {
        return (
          e instanceof bt ||
          (e && "closed" in e && _e(e.remove) && _e(e.add) && _e(e.unsubscribe))
        );
      }
      function Mf(e) {
        _e(e) ? e() : e.unsubscribe();
      }
      const Mn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Ni = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Ni;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Ni;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Sf(e) {
        Ni.setTimeout(() => {
          const { onUnhandledError: t } = Mn;
          if (!t) throw e;
          t(e);
        });
      }
      function Nf() {}
      const ow = Ja("C", void 0, void 0);
      function Ja(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Sn = null;
      function Ti(e) {
        if (Mn.useDeprecatedSynchronousErrorHandling) {
          const t = !Sn;
          if ((t && (Sn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Sn;
            if (((Sn = null), n)) throw r;
          }
        } else e();
      }
      class Xa extends bt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), bf(t) && t.add(this))
              : (this.destination = dw);
        }
        static create(t, n, r) {
          return new uo(t, n, r);
        }
        next(t) {
          this.isStopped
            ? tu(
                (function sw(e) {
                  return Ja("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? tu(
                (function iw(e) {
                  return Ja("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? tu(ow, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const uw = Function.prototype.bind;
      function eu(e, t) {
        return uw.call(e, t);
      }
      class lw {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Ai(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Ai(r);
            }
          else Ai(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Ai(n);
            }
        }
      }
      class uo extends Xa {
        constructor(t, n, r) {
          let o;
          if ((super(), _e(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Mn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && eu(t.next, i),
                  error: t.error && eu(t.error, i),
                  complete: t.complete && eu(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new lw(o);
        }
      }
      function Ai(e) {
        Mn.useDeprecatedSynchronousErrorHandling
          ? (function aw(e) {
              Mn.useDeprecatedSynchronousErrorHandling &&
                Sn &&
                ((Sn.errorThrown = !0), (Sn.error = e));
            })(e)
          : Sf(e);
      }
      function tu(e, t) {
        const { onStoppedNotification: n } = Mn;
        n && Ni.setTimeout(() => n(e, t));
      }
      const dw = {
          closed: !0,
          next: Nf,
          error: function cw(e) {
            throw e;
          },
          complete: Nf,
        },
        nu =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function ru(e) {
        return e;
      }
      let He = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function hw(e) {
              return (
                (e && e instanceof Xa) ||
                ((function fw(e) {
                  return e && _e(e.next) && _e(e.error) && _e(e.complete);
                })(e) &&
                  bf(e))
              );
            })(n)
              ? n
              : new uo(n, r, o);
            return (
              Ti(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Af(r))((o, i) => {
              const s = new uo({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [nu]() {
            return this;
          }
          pipe(...n) {
            return (function Tf(e) {
              return 0 === e.length
                ? ru
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = Af(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Af(e) {
        var t;
        return null !== (t = e ?? Mn.Promise) && void 0 !== t ? t : Promise;
      }
      const pw = Ef(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let xi = (() => {
        class e extends He {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new xf(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new pw();
          }
          next(n) {
            Ti(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Ti(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Ti(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? If
              : ((this.currentObservers = null),
                i.push(n),
                new bt(() => {
                  (this.currentObservers = null), Ka(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new He();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new xf(t, n)), e;
      })();
      class xf extends xi {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : If;
        }
      }
      function Nn(e) {
        return (t) => {
          if (
            (function gw(e) {
              return _e(e?.lift);
            })(t)
          )
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function sn(e, t, n, r, o) {
        return new mw(e, t, n, r, o);
      }
      class mw extends Xa {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function ou(e, t) {
        return Nn((n, r) => {
          let o = 0;
          n.subscribe(
            sn(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function an(e) {
        return this instanceof an ? ((this.v = e), this) : new an(e);
      }
      function Rf(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function uu(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const kf = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Lf(e) {
        return _e(e?.then);
      }
      function Vf(e) {
        return _e(e[nu]);
      }
      function jf(e) {
        return Symbol.asyncIterator && _e(e?.[Symbol.asyncIterator]);
      }
      function Bf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Hf = (function Vw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function $f(e) {
        return _e(e?.[Hf]);
      }
      function Uf(e) {
        return (function Pf(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof an
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield an(n.read());
              if (o) return yield an(void 0);
              yield yield an(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Gf(e) {
        return _e(e?.getReader);
      }
      function Mt(e) {
        if (e instanceof He) return e;
        if (null != e) {
          if (Vf(e))
            return (function jw(e) {
              return new He((t) => {
                const n = e[nu]();
                if (_e(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (kf(e))
            return (function Bw(e) {
              return new He((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Lf(e))
            return (function Hw(e) {
              return new He((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Sf);
              });
            })(e);
          if (jf(e)) return zf(e);
          if ($f(e))
            return (function $w(e) {
              return new He((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Gf(e))
            return (function Uw(e) {
              return zf(Uf(e));
            })(e);
        }
        throw Bf(e);
      }
      function zf(e) {
        return new He((t) => {
          (function Gw(e, t) {
            var n, r, o, i;
            return (function Of(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Rf(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function un(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Wf(e, t, n = 1 / 0) {
        return _e(t)
          ? Wf((r, o) => ou((i, s) => t(r, i, o, s))(Mt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Nn((r, o) =>
              (function zw(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let v = !1;
                    Mt(n(g, c++)).subscribe(
                      sn(
                        t,
                        (_) => {
                          o?.(_), i ? h(_) : t.next(_);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (l--; u.length && l < r; ) {
                                const _ = u.shift();
                                s ? un(t, s, () => p(_)) : p(_);
                              }
                              f();
                            } catch (_) {
                              t.error(_);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    sn(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      const qf = new He((e) => e.complete());
      function lu(e) {
        return e[e.length - 1];
      }
      function Zf(e) {
        return (function Zw(e) {
          return e && _e(e.schedule);
        })(lu(e))
          ? e.pop()
          : void 0;
      }
      function Qf(e, t = 0) {
        return Nn((n, r) => {
          n.subscribe(
            sn(
              r,
              (o) => un(r, e, () => r.next(o), t),
              () => un(r, e, () => r.complete(), t),
              (o) => un(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Yf(e, t = 0) {
        return Nn((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Kf(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new He((n) => {
          un(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            un(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function cu(e, t) {
        return t
          ? (function nE(e, t) {
              if (null != e) {
                if (Vf(e))
                  return (function Kw(e, t) {
                    return Mt(e).pipe(Yf(t), Qf(t));
                  })(e, t);
                if (kf(e))
                  return (function Xw(e, t) {
                    return new He((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Lf(e))
                  return (function Jw(e, t) {
                    return Mt(e).pipe(Yf(t), Qf(t));
                  })(e, t);
                if (jf(e)) return Kf(e, t);
                if ($f(e))
                  return (function eE(e, t) {
                    return new He((n) => {
                      let r;
                      return (
                        un(n, t, () => {
                          (r = e[Hf]()),
                            un(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => _e(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Gf(e))
                  return (function tE(e, t) {
                    return Kf(Uf(e), t);
                  })(e, t);
              }
              throw Bf(e);
            })(e, t)
          : Mt(e);
      }
      function rE(...e) {
        const t = Zf(e),
          n = (function Yw(e, t) {
            return "number" == typeof lu(e) ? e.pop() : t;
          })(e, 1 / 0),
          r = e;
        return r.length
          ? 1 === r.length
            ? Mt(r[0])
            : (function Ww(e = 1 / 0) {
                return Wf(ru, e);
              })(n)(cu(r, t))
          : qf;
      }
      class oE extends xi {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function Jf(e = {}) {
        const {
          connector: t = () => new xi(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let s,
            a,
            u,
            l = 0,
            c = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = u = void 0), (c = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return Nn((g, v) => {
            l++, !d && !c && f();
            const _ = (u = u ?? t());
            v.add(() => {
              l--, 0 === l && !d && !c && (a = du(p, o));
            }),
              _.subscribe(v),
              !s &&
                l > 0 &&
                ((s = new uo({
                  next: (y) => _.next(y),
                  error: (y) => {
                    (d = !0), f(), (a = du(h, n, y)), _.error(y);
                  },
                  complete: () => {
                    (c = !0), f(), (a = du(h, r)), _.complete();
                  },
                })),
                Mt(g).subscribe(s));
          })(i);
        };
      }
      function du(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new uo({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return Mt(t(...n)).subscribe(r);
      }
      function uE(e, t) {
        return e === t;
      }
      function Z(e) {
        for (let t in e) if (e[t] === Z) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Oi(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function De(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(De).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function fu(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const lE = Z({ __forward_ref__: Z });
      function ee(e) {
        return (
          (e.__forward_ref__ = ee),
          (e.toString = function () {
            return De(this());
          }),
          e
        );
      }
      function M(e) {
        return Fi(e) ? e() : e;
      }
      function Fi(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(lE) &&
          e.__forward_ref__ === ee
        );
      }
      function hu(e) {
        return e && !!e.ɵproviders;
      }
      const Xf = "https://g.co/ng/security#xss";
      class C extends Error {
        constructor(t, n) {
          super(
            (function tr(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      const lo = Z({ ɵcmp: Z }),
        pu = Z({ ɵdir: Z }),
        gu = Z({ ɵpipe: Z }),
        eh = Z({ ɵmod: Z }),
        Gt = Z({ ɵfac: Z }),
        co = Z({ __NG_ELEMENT_ID__: Z }),
        th = Z({ __NG_ENV_ID__: Z });
      function T(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function mu(e, t) {
        throw new C(-201, !1);
      }
      function Ke(e, t) {
        null == e &&
          (function S(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function B(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function zt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Pi(e) {
        return nh(e, ki) || nh(e, rh);
      }
      function nh(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Ri(e) {
        return e && (e.hasOwnProperty(yu) || e.hasOwnProperty(yE))
          ? e[yu]
          : null;
      }
      const ki = Z({ ɵprov: Z }),
        yu = Z({ ɵinj: Z }),
        rh = Z({ ngInjectableDef: Z }),
        yE = Z({ ngInjectorDef: Z });
      var L = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })(L || {});
      let vu;
      function Je(e) {
        const t = vu;
        return (vu = e), t;
      }
      function ih(e, t, n) {
        const r = Pi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & L.Optional
          ? null
          : void 0 !== t
          ? t
          : void mu(De(e));
      }
      const te = globalThis;
      class I {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = B({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const fo = {},
        Eu = "__NG_DI_FLAG__",
        Li = "ngTempTokenPath",
        DE = /\n/gm,
        ah = "__source";
      let nr;
      function cn(e) {
        const t = nr;
        return (nr = e), t;
      }
      function EE(e, t = L.Default) {
        if (void 0 === nr) throw new C(-203, !1);
        return null === nr
          ? ih(e, void 0, t)
          : nr.get(e, t & L.Optional ? null : void 0, t);
      }
      function j(e, t = L.Default) {
        return (
          (function oh() {
            return vu;
          })() || EE
        )(M(e), t);
      }
      function G(e, t = L.Default) {
        return j(e, Vi(t));
      }
      function Vi(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Iu(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = M(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new C(900, !1);
            let o,
              i = L.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = IE(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(j(o, i));
          } else t.push(j(r));
        }
        return t;
      }
      function ho(e, t) {
        return (e[Eu] = t), (e.prototype[Eu] = t), e;
      }
      function IE(e) {
        return e[Eu];
      }
      function Wt(e) {
        return { toString: e }.toString();
      }
      var ji = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })(ji || {}),
        mt = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })(mt || {});
      const St = {},
        H = [];
      function lh(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      function bu(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            dh(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function ch(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function dh(e) {
        return 64 === e.charCodeAt(0);
      }
      function po(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  fh(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function fh(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      const hh = "ng-template";
      function SE(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== lh(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function ph(e) {
        return 4 === e.type && e.value !== hh;
      }
      function NE(e, t, n) {
        return t === (4 !== e.type || n ? e.value : hh);
      }
      function TE(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function OE(e) {
            for (let t = 0; t < e.length; t++) if (ch(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !NE(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (yt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!SE(e.attrs, l, n)) {
                    if (yt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = AE(8 & r ? "class" : u, o, ph(e), n);
                if (-1 === d) {
                  if (yt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== lh(h, l, 0)) || (2 & r && l !== f)) {
                    if (yt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !yt(r) && !yt(u)) return !1;
            if (s && yt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return yt(r) || s;
      }
      function yt(e) {
        return 0 == (1 & e);
      }
      function AE(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function FE(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function gh(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (TE(e, t[r], n)) return !0;
        return !1;
      }
      function mh(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function RE(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !yt(s) && ((t += mh(i, o)), (o = "")),
              (r = s),
              (i = i || !yt(r));
          n++;
        }
        return "" !== o && (t += mh(i, o)), t;
      }
      function rr(e) {
        return Wt(() => {
          const t = vh(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === ji.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || mt.Emulated,
              styles: e.styles || H,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          _h(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = Bi(r, !1)),
            (n.pipeDefs = Bi(r, !0)),
            (n.id = (function HE(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(n)),
            n
          );
        });
      }
      function VE(e) {
        return R(e) || Ie(e);
      }
      function jE(e) {
        return null !== e;
      }
      function dn(e) {
        return Wt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || H,
          declarations: e.declarations || H,
          imports: e.imports || H,
          exports: e.exports || H,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function yh(e, t) {
        if (null == e) return St;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function O(e) {
        return Wt(() => {
          const t = vh(e);
          return _h(t), t;
        });
      }
      function R(e) {
        return e[lo] || null;
      }
      function Ie(e) {
        return e[pu] || null;
      }
      function xe(e) {
        return e[gu] || null;
      }
      function vh(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || St,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || H,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: yh(e.inputs, t),
          outputs: yh(e.outputs),
          debugInfo: null,
        };
      }
      function _h(e) {
        e.features?.forEach((t) => t(e));
      }
      function Bi(e, t) {
        if (!e) return null;
        const n = t ? xe : VE;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(jE);
      }
      const de = 0,
        D = 1,
        b = 2,
        se = 3,
        vt = 4,
        ke = 5,
        Nt = 6,
        or = 7,
        J = 8,
        $e = 9,
        ir = 10,
        A = 11,
        go = 12,
        Dh = 13,
        sr = 14,
        le = 15,
        mo = 16,
        ar = 17,
        Tt = 18,
        yo = 19,
        Ch = 20,
        fn = 21,
        Hi = 22,
        An = 23,
        x = 25,
        Mu = 1,
        At = 7,
        ur = 9,
        ge = 10;
      var lr = (function (e) {
        return (
          (e[(e.None = 0)] = "None"),
          (e[(e.HasTransplantedViews = 2)] = "HasTransplantedViews"),
          (e[(e.HasChildViewsToRefresh = 4)] = "HasChildViewsToRefresh"),
          e
        );
      })(lr || {});
      function Oe(e) {
        return Array.isArray(e) && "object" == typeof e[Mu];
      }
      function Ae(e) {
        return Array.isArray(e) && !0 === e[Mu];
      }
      function Su(e) {
        return 0 != (4 & e.flags);
      }
      function xn(e) {
        return e.componentOffset > -1;
      }
      function Ui(e) {
        return 1 == (1 & e.flags);
      }
      function _t(e) {
        return !!e.template;
      }
      function Nu(e) {
        return 0 != (512 & e[b]);
      }
      function On(e, t) {
        return e.hasOwnProperty(Gt) ? e[Gt] : null;
      }
      class zE {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function qt() {
        return bh;
      }
      function bh(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = qE), WE;
      }
      function WE() {
        const e = Sh(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === St) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function qE(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            Sh(e) ||
            (function ZE(e, t) {
              return (e[Mh] = t);
            })(e, { previous: St, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new zE(u && u.currentValue, t, a === St)), (e[r] = t);
      }
      qt.ngInherit = !0;
      const Mh = "__ngSimpleChanges__";
      function Sh(e) {
        return e[Mh] || null;
      }
      const xt = function (e, t, n) {};
      function ne(e) {
        for (; Array.isArray(e); ) e = e[de];
        return e;
      }
      function _o(e, t) {
        return ne(t[e]);
      }
      function Ue(e, t) {
        return ne(t[e.index]);
      }
      function Do(e, t) {
        return e.data[t];
      }
      function ot(e, t) {
        const n = t[e];
        return Oe(n) ? n : n[de];
      }
      function Fu(e) {
        return 128 == (128 & e[b]);
      }
      function Ot(e, t) {
        return null == t ? null : e[t];
      }
      function Ah(e) {
        e[ar] = 0;
      }
      function XE(e) {
        1024 & e[b] || ((e[b] |= 1024), Fu(e) && Gi(e));
      }
      function Oh(e) {
        return 9216 & e[b] || e[An]?.dirty;
      }
      function Fh(e) {
        Oh(e) && Gi(e);
      }
      function Gi(e) {
        let t = e[se];
        for (
          ;
          null !== t &&
          !(
            (Ae(t) && t[b] & lr.HasChildViewsToRefresh) ||
            (Oe(t) && 8192 & t[b])
          );

        ) {
          if (Ae(t)) t[b] |= lr.HasChildViewsToRefresh;
          else if (((t[b] |= 8192), !Fu(t))) break;
          t = t[se];
        }
      }
      const N = {
        lFrame: Uh(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function Rh() {
        return N.bindingsEnabled;
      }
      function m() {
        return N.lFrame.lView;
      }
      function V() {
        return N.lFrame.tView;
      }
      function it(e) {
        return (N.lFrame.contextLView = e), e[J];
      }
      function st(e) {
        return (N.lFrame.contextLView = null), e;
      }
      function Y() {
        let e = kh();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function kh() {
        return N.lFrame.currentTNode;
      }
      function Ft(e, t) {
        const n = N.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Ru() {
        return N.lFrame.isParent;
      }
      function ku() {
        N.lFrame.isParent = !1;
      }
      function Pt() {
        return N.lFrame.bindingIndex++;
      }
      function cI(e, t) {
        const n = N.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Lu(t);
      }
      function Lu(e) {
        N.lFrame.currentDirectiveIndex = e;
      }
      function ju(e) {
        N.lFrame.currentQueryIndex = e;
      }
      function fI(e) {
        const t = e[D];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[ke] : null;
      }
      function Hh(e, t, n) {
        if (n & L.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & L.Host ||
              ((o = fI(i)), null === o || ((i = i[sr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (N.lFrame = $h());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Bu(e) {
        const t = $h(),
          n = e[D];
        (N.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function $h() {
        const e = N.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Uh(e) : t;
      }
      function Uh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Gh() {
        const e = N.lFrame;
        return (
          (N.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const zh = Gh;
      function Hu() {
        const e = Gh();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Le() {
        return N.lFrame.selectedIndex;
      }
      function Fn(e) {
        N.lFrame.selectedIndex = e;
      }
      let qh = !0;
      function Wi() {
        return qh;
      }
      function hn(e) {
        qh = e;
      }
      function qi(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            u && (e.viewHooks ??= []).push(-n, u),
            l &&
              ((e.viewHooks ??= []).push(n, l),
              (e.viewCheckHooks ??= []).push(n, l)),
            null != c && (e.destroyHooks ??= []).push(n, c);
        }
      }
      function Zi(e, t, n) {
        Zh(e, t, 3, n);
      }
      function Qi(e, t, n, r) {
        (3 & e[b]) === n && Zh(e, t, n, r);
      }
      function $u(e, t) {
        let n = e[b];
        (3 & n) === t && ((n &= 16383), (n += 1), (e[b] = n));
      }
      function Zh(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[ar] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[ar] += 65536),
              (a < i || -1 == i) &&
                (_I(e, n, t, u), (e[ar] = (4294901760 & e[ar]) + u + 2)),
              u++;
      }
      function Qh(e, t) {
        xt(4, e, t);
        const n = ce(null);
        try {
          t.call(e);
        } finally {
          ce(n), xt(5, e, t);
        }
      }
      function _I(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        o
          ? e[b] >> 14 < e[ar] >> 16 &&
            (3 & e[b]) === t &&
            ((e[b] += 16384), Qh(a, i))
          : Qh(a, i);
      }
      const fr = -1;
      class wo {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Gu(e) {
        return e !== fr;
      }
      function Eo(e) {
        return 32767 & e;
      }
      function Io(e, t) {
        let n = (function II(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[sr]), n--;
        return r;
      }
      let zu = !0;
      function Yi(e) {
        const t = zu;
        return (zu = e), t;
      }
      const Yh = 255,
        Kh = 5;
      let bI = 0;
      const Rt = {};
      function Ki(e, t) {
        const n = Jh(e, t);
        if (-1 !== n) return n;
        const r = t[D];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Wu(r.data, e),
          Wu(t, null),
          Wu(r.blueprint, null));
        const o = Ji(e, t),
          i = e.injectorIndex;
        if (Gu(o)) {
          const s = Eo(o),
            a = Io(o, t),
            u = a[D].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function Wu(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Jh(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ji(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = ip(o)), null === r)) return fr;
          if ((n++, (o = o[sr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return fr;
      }
      function qu(e, t, n) {
        !(function MI(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(co) && (r = n[co]),
            null == r && (r = n[co] = bI++);
          const o = r & Yh;
          t.data[e + (o >> Kh)] |= 1 << o;
        })(e, t, n);
      }
      function Xh(e, t, n) {
        if (n & L.Optional || void 0 !== e) return e;
        mu();
      }
      function ep(e, t, n, r) {
        if (
          (n & L.Optional && void 0 === r && (r = null),
          !(n & (L.Self | L.Host)))
        ) {
          const o = e[$e],
            i = Je(void 0);
          try {
            return o ? o.get(t, r, n & L.Optional) : ih(t, r, n & L.Optional);
          } finally {
            Je(i);
          }
        }
        return Xh(r, 0, n);
      }
      function tp(e, t, n, r = L.Default, o) {
        if (null !== e) {
          if (2048 & t[b] && !(r & L.Self)) {
            const s = (function xI(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 2048 & s[b] && !(512 & s[b]);

              ) {
                const a = np(i, s, n, r | L.Self, Rt);
                if (a !== Rt) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[Ch];
                  if (l) {
                    const c = l.get(n, Rt, r);
                    if (c !== Rt) return c;
                  }
                  (u = ip(s)), (s = s[sr]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Rt);
            if (s !== Rt) return s;
          }
          const i = np(e, t, n, r, Rt);
          if (i !== Rt) return i;
        }
        return ep(t, n, r, o);
      }
      function np(e, t, n, r, o) {
        const i = (function TI(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(co) ? e[co] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & Yh : AI) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Hh(t, e, r)) return r & L.Host ? Xh(o, 0, r) : ep(t, n, r, o);
          try {
            let s;
            if (((s = i(r)), null != s || r & L.Optional)) return s;
            mu();
          } finally {
            zh();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Jh(e, t),
            u = fr,
            l = r & L.Host ? t[le][ke] : null;
          for (
            (-1 === a || r & L.SkipSelf) &&
            ((u = -1 === a ? Ji(e, t) : t[a + 8]),
            u !== fr && op(r, !1)
              ? ((s = t[D]), (a = Eo(u)), (t = Io(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[D];
            if (rp(i, a, c.data)) {
              const d = NI(a, t, n, s, r, l);
              if (d !== Rt) return d;
            }
            (u = t[a + 8]),
              u !== fr && op(r, t[D].data[a + 8] === l) && rp(i, a, t)
                ? ((s = c), (a = Eo(u)), (t = Io(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function NI(e, t, n, r, o, i) {
        const s = t[D],
          a = s.data[e + 8],
          c = (function Xi(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && _t(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? xn(a) && zu : r != s && 0 != (3 & a.type),
            o & L.Host && i === a
          );
        return null !== c ? Pn(t, s, c, a) : Rt;
      }
      function Pn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function DI(e) {
            return e instanceof wo;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function dE(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new C(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function U(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : T(e);
              })(i[n])
            );
          const a = Yi(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? Je(s.injectImpl) : null;
          Hh(e, r, L.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function vI(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = bh(t);
                    (n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== l && Je(l), Yi(a), (s.resolving = !1), zh();
          }
        }
        return o;
      }
      function rp(e, t, n) {
        return !!(n[t + (e >> Kh)] & (1 << e));
      }
      function op(e, t) {
        return !(e & L.Self || (e & L.Host && t));
      }
      class be {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return tp(this._tNode, this._lView, t, Vi(r), n);
        }
      }
      function AI() {
        return new be(Y(), m());
      }
      function Zu(e) {
        return Fi(e)
          ? () => {
              const t = Zu(M(e));
              return t && t();
            }
          : On(e);
      }
      function ip(e) {
        const t = e[D],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[ke] : null;
      }
      const mr = "__parameters__";
      function vr(e, t, n) {
        return Wt(() => {
          const r = (function Yu(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(mr)
                ? u[mr]
                : Object.defineProperty(u, mr, { value: [] })[mr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      function Dr(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Dr(n, t) : t(n)));
      }
      function ap(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function es(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function at(e, t, n) {
        let r = Cr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function up(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Ju(e, t) {
        const n = Cr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Cr(e, t) {
        return (function lp(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const el = ho(vr("Optional"), 8),
        tl = ho(vr("SkipSelf"), 4),
        No = new I("ENVIRONMENT_INITIALIZER"),
        hp = new I("INJECTOR", -1),
        rl = new I("INJECTOR_DEF_TYPES");
      class rs {
        get(t, n = fo) {
          if (n === fo) {
            const r = new Error(`NullInjectorError: No provider for ${De(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function XI(...e) {
        return { ɵproviders: gp(0, e), ɵfromNgModule: !0 };
      }
      function gp(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        const i = (s) => {
          n.push(s);
        };
        return (
          Dr(t, (s) => {
            const a = s;
            os(a, i, [], r) && ((o ||= []), o.push(a));
          }),
          void 0 !== o && mp(o, i),
          n
        );
      }
      function mp(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { ngModule: r, providers: o } = e[n];
          ol(o, (i) => {
            t(i, r);
          });
        }
      }
      function os(e, t, n, r) {
        if (!(e = M(e))) return !1;
        let o = null,
          i = Ri(e);
        const s = !i && R(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = Ri(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) os(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                Dr(i.imports, (c) => {
                  os(c, t, n, r) && ((l ||= []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && mp(l, t);
            }
            if (!a) {
              const l = On(o) || (() => new o());
              t({ provide: o, useFactory: l, deps: H }, o),
                t({ provide: rl, useValue: o, multi: !0 }, o),
                t({ provide: No, useValue: () => j(o), multi: !0 }, o);
            }
            const u = i.providers;
            if (null != u && !a) {
              const l = e;
              ol(u, (c) => {
                t(c, l);
              });
            }
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function ol(e, t) {
        for (let n of e)
          hu(n) && (n = n.ɵproviders), Array.isArray(n) ? ol(n, t) : t(n);
      }
      const eb = Z({ provide: String, useValue: Z });
      function il(e) {
        return null !== e && "object" == typeof e && eb in e;
      }
      function Rn(e) {
        return "function" == typeof e;
      }
      const sl = new I("Set Injector scope."),
        is = {},
        nb = {};
      let al;
      function ss() {
        return void 0 === al && (al = new rs()), al;
      }
      class Yt {}
      class Er extends Yt {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            ll(t, (s) => this.processProvider(s)),
            this.records.set(hp, Ir(void 0, this)),
            o.has("environment") && this.records.set(Yt, Ir(void 0, this));
          const i = this.records.get(sl);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(rl, H, L.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = cn(this),
            r = Je(void 0);
          try {
            return t();
          } finally {
            cn(n), Je(r);
          }
        }
        get(t, n = fo, r = L.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(th)))
            return t[th](this);
          r = Vi(r);
          const i = cn(this),
            s = Je(void 0);
          try {
            if (!(r & L.SkipSelf)) {
              let u = this.records.get(t);
              if (void 0 === u) {
                const l =
                  (function ab(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof I)
                    );
                  })(t) && Pi(t);
                (u = l && this.injectableDefInScope(l) ? Ir(ul(t), is) : null),
                  this.records.set(t, u);
              }
              if (null != u) return this.hydrate(t, u);
            }
            return (r & L.Self ? ss() : this.parent).get(
              t,
              (n = r & L.Optional && n === fo ? null : n)
            );
          } catch (a) {
            if ("NullInjectorError" === a.name) {
              if (((a[Li] = a[Li] || []).unshift(De(t)), i)) throw a;
              return (function bE(e, t, n, r) {
                const o = e[Li];
                throw (
                  (t[ah] && o.unshift(t[ah]),
                  (e.message = (function ME(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = De(t);
                    if (Array.isArray(t)) o = t.map(De).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : De(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      DE,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Li] = null),
                  e)
                );
              })(a, t, "R3InjectorError", this.source);
            }
            throw a;
          } finally {
            Je(s), cn(i);
          }
        }
        resolveInjectorInitializers() {
          const t = cn(this),
            n = Je(void 0);
          try {
            const o = this.get(No, H, L.Self);
            for (const i of o) i();
          } finally {
            cn(t), Je(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(De(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(t) {
          let n = Rn((t = M(t))) ? t : M(t && t.provide);
          const r = (function ob(e) {
            return il(e) ? Ir(void 0, e.useValue) : Ir(_p(e), is);
          })(t);
          if (Rn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Ir(void 0, is, !0)),
              (o.factory = () => Iu(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === is && ((n.value = nb), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function sb(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = M(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function ul(e) {
        const t = Pi(e),
          n = null !== t ? t.factory : On(e);
        if (null !== n) return n;
        if (e instanceof I) throw new C(204, !1);
        if (e instanceof Function)
          return (function rb(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function Mo(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new C(204, !1))
              );
            const n = (function mE(e) {
              return (e && (e[ki] || e[rh])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new C(204, !1);
      }
      function _p(e, t, n) {
        let r;
        if (Rn(e)) {
          const o = M(e);
          return On(o) || ul(o);
        }
        if (il(e)) r = () => M(e.useValue);
        else if (
          (function vp(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...Iu(e.deps || []));
        else if (
          (function yp(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => j(M(e.useExisting));
        else {
          const o = M(e && (e.useClass || e.provide));
          if (
            !(function ib(e) {
              return !!e.deps;
            })(e)
          )
            return On(o) || ul(o);
          r = () => new o(...Iu(e.deps));
        }
        return r;
      }
      function Ir(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function ll(e, t) {
        for (const n of e)
          Array.isArray(n) ? ll(n, t) : n && hu(n) ? ll(n.ɵproviders, t) : t(n);
      }
      function Ep(e, t = null, n = null, r) {
        const o = Ip(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Ip(e, t = null, n = null, r, o = new Set()) {
        const i = [n || H, XI(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : De(e))),
          new Er(i, t || ss(), r || null, o)
        );
      }
      let fl,
        dt = (() => {
          class e {
            static #e = (this.THROW_IF_NOT_FOUND = fo);
            static #t = (this.NULL = new rs());
            static create(n, r) {
              if (Array.isArray(n)) return Ep({ name: "" }, r, n, "");
              {
                const o = n.name ?? "";
                return Ep({ name: o }, n.parent, n.providers, o);
              }
            }
            static #n = (this.ɵprov = B({
              token: e,
              providedIn: "any",
              factory: () => j(hp),
            }));
            static #r = (this.__NG_ELEMENT_ID__ = -1);
          }
          return e;
        })();
      const us = new I("AppId", { providedIn: "root", factory: () => mb }),
        mb = "ng",
        Mp = new I("Platform Initializer"),
        br = new I("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        Sp = new I("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function pn() {
              if (void 0 !== fl) return fl;
              if (typeof document < "u") return document;
              throw new C(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      function fs(e) {
        return 128 == (128 & e.flags);
      }
      var yn = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })(yn || {});
      const Mb = /^>|^->|<!--|-->|--!>|<!-$/g,
        Sb = /(<|>)/g,
        Nb = "\u200b$1\u200b";
      const yl = new Map();
      let Tb = 0;
      const _l = "__ngContext__";
      function je(e, t) {
        Oe(t)
          ? ((e[_l] = t[yo]),
            (function xb(e) {
              yl.set(e[yo], e);
            })(t))
          : (e[_l] = t);
      }
      let Dl;
      function Cl(e, t) {
        return Dl(e, t);
      }
      function Fo(e) {
        const t = e[se];
        return Ae(t) ? t[se] : t;
      }
      function zp(e) {
        return qp(e[go]);
      }
      function Wp(e) {
        return qp(e[vt]);
      }
      function qp(e) {
        for (; null !== e && !Ae(e); ) e = e[vt];
        return e;
      }
      function Sr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Ae(r) ? (i = r) : Oe(r) && ((s = !0), (r = r[de]));
          const a = ne(r);
          0 === e && null !== n
            ? null == o
              ? Kp(t, n, a)
              : Ln(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Ln(t, n, a, o || null, !0)
            : 2 === e
            ? (function _s(e, t, n) {
                const r = ys(e, t);
                r &&
                  (function Yb(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function Xb(e, t, n, r, o) {
                const i = n[At];
                i !== ne(n) && Sr(t, e, r, i, o);
                for (let a = ge; a < n.length; a++) {
                  const u = n[a];
                  ko(u[D], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function wl(e, t) {
        return e.createComment(
          (function Lp(e) {
            return e.replace(Mb, (t) => t.replace(Sb, Nb));
          })(t)
        );
      }
      function gs(e, t, n) {
        return e.createElement(t, n);
      }
      function Qp(e, t) {
        const n = e[ur],
          r = n.indexOf(t);
        n.splice(r, 1);
      }
      function Po(e, t) {
        if (e.length <= ge) return;
        const n = ge + t,
          r = e[n];
        if (r) {
          const o = r[mo];
          null !== o && o !== e && Qp(o, r), t > 0 && (e[n - 1][vt] = r[vt]);
          const i = es(e, ge + t);
          !(function $b(e, t) {
            ko(e, t, t[A], 2, null, null), (t[de] = null), (t[ke] = null);
          })(r[D], r);
          const s = i[Tt];
          null !== s && s.detachView(i[D]),
            (r[se] = null),
            (r[vt] = null),
            (r[b] &= -129);
        }
        return r;
      }
      function ms(e, t) {
        if (!(256 & t[b])) {
          const n = t[A];
          t[An] &&
            (function yf(e) {
              if ((er(e), ao(e)))
                for (let t = 0; t < e.producerNode.length; t++)
                  Si(e.producerNode[t], e.producerIndexOfThis[t]);
              (e.producerNode.length =
                e.producerLastReadVersion.length =
                e.producerIndexOfThis.length =
                  0),
                e.liveConsumerNode &&
                  (e.liveConsumerNode.length =
                    e.liveConsumerIndexOfThis.length =
                      0);
            })(t[An]),
            n.destroyNode && ko(e, t, n, 3, null, null),
            (function zb(e) {
              let t = e[go];
              if (!t) return El(e[D], e);
              for (; t; ) {
                let n = null;
                if (Oe(t)) n = t[go];
                else {
                  const r = t[ge];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[vt] && t !== e; )
                    Oe(t) && El(t[D], t), (t = t[se]);
                  null === t && (t = e), Oe(t) && El(t[D], t), (n = t && t[vt]);
                }
                t = n;
              }
            })(t);
        }
      }
      function El(e, t) {
        if (!(256 & t[b])) {
          (t[b] &= -129),
            (t[b] |= 256),
            (function Qb(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof wo)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        xt(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          xt(5, a, u);
                        }
                      }
                    else {
                      xt(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        xt(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function Zb(e, t) {
              const n = e.cleanup,
                r = t[or];
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
                  } else n[i].call(r[n[i + 1]]);
              null !== r && (t[or] = null);
              const o = t[fn];
              if (null !== o) {
                t[fn] = null;
                for (let i = 0; i < o.length; i++) (0, o[i])();
              }
            })(e, t),
            1 === t[D].type && t[A].destroy();
          const n = t[mo];
          if (null !== n && Ae(t[se])) {
            n !== t[se] && Qp(n, t);
            const r = t[Tt];
            null !== r && r.detachView(e);
          }
          !(function Ob(e) {
            yl.delete(e[yo]);
          })(t);
        }
      }
      function Il(e, t, n) {
        return (function Yp(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[de];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === mt.None || i === mt.Emulated) return null;
            }
            return Ue(r, n);
          }
        })(e, t.parent, n);
      }
      function Ln(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Kp(e, t, n) {
        e.appendChild(t, n);
      }
      function Jp(e, t, n, r, o) {
        null !== r ? Ln(e, t, n, r, o) : Kp(e, t, n);
      }
      function ys(e, t) {
        return e.parentNode(t);
      }
      let bl,
        tg = function eg(e, t, n) {
          return 40 & e.type ? Ue(e, n) : null;
        };
      function vs(e, t, n, r) {
        const o = Il(e, r, t),
          i = t[A],
          a = (function Xp(e, t, n) {
            return tg(e, t, n);
          })(r.parent || t[ke], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Jp(i, o, n[u], a, !1);
          else Jp(i, o, n, a, !1);
        void 0 !== bl && bl(i, r, t, n, o);
      }
      function Ro(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Ue(t, e);
          if (4 & n) return Ml(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Ro(e, r);
            {
              const o = e[t.index];
              return Ae(o) ? Ml(-1, o) : ne(o);
            }
          }
          if (32 & n) return Cl(t, e)() || ne(e[t.index]);
          {
            const r = rg(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Ro(Fo(e[le]), r)
              : Ro(e, t.next);
          }
        }
        return null;
      }
      function rg(e, t) {
        return null !== t ? e[le][ke].projection[t.projection] : null;
      }
      function Ml(e, t) {
        const n = ge + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[D].firstChild;
          if (null !== o) return Ro(r, o);
        }
        return t[At];
      }
      function Sl(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && je(ne(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) Sl(e, t, n.child, r, o, i, !1), Sr(t, e, o, a, i);
            else if (32 & u) {
              const l = Cl(n, r);
              let c;
              for (; (c = l()); ) Sr(t, e, o, c, i);
              Sr(t, e, o, a, i);
            } else 16 & u ? ig(e, t, r, n, o, i) : Sr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function ko(e, t, n, r, o, i) {
        Sl(n, r, e.firstChild, t, o, i, !1);
      }
      function ig(e, t, n, r, o, i) {
        const s = n[le],
          u = s[ke].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) Sr(t, e, o, u[l], i);
        else {
          let l = u;
          const c = s[se];
          fs(r) && (l.flags |= 128), Sl(e, t, l, c, o, i, !0);
        }
      }
      function sg(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function ag(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && bu(e, t, r),
          null !== o && sg(e, t, o),
          null !== i &&
            (function tM(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      class dg {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Xf})`;
        }
      }
      function vn(e) {
        return e instanceof dg ? e.changingThisBreaksApplicationSecurity : e;
      }
      const pM = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var Tr = (function (e) {
        return (
          (e[(e.NONE = 0)] = "NONE"),
          (e[(e.HTML = 1)] = "HTML"),
          (e[(e.STYLE = 2)] = "STYLE"),
          (e[(e.SCRIPT = 3)] = "SCRIPT"),
          (e[(e.URL = 4)] = "URL"),
          (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
          e
        );
      })(Tr || {});
      function Pl(e) {
        const t = (function jo() {
          const e = m();
          return e && e[ir].sanitizer;
        })();
        return t
          ? t.sanitize(Tr.URL, e) || ""
          : (function Lo(e, t) {
              const n = (function cM(e) {
                return (e instanceof dg && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(`Required a safe ${t}, got a ${n} (see ${Xf})`);
              }
              return n === t;
            })(e, "URL")
          ? vn(e)
          : (function Al(e) {
              return (e = String(e)).match(pM) ? e : "unsafe:" + e;
            })(T(e));
      }
      let _g = (e, t, n) => null;
      function $l(e, t, n = !1) {
        return _g(e, t, n);
      }
      class kM {}
      class wg {}
      class VM {
        resolveComponentFactory(t) {
          throw (function LM(e) {
            const t = Error(`No component factory found for ${De(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Ns = (() => {
        class e {
          static #e = (this.NULL = new VM());
        }
        return e;
      })();
      function jM() {
        return Or(Y(), m());
      }
      function Or(e, t) {
        return new Dt(Ue(e, t));
      }
      let Dt = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
          static #e = (this.__NG_ELEMENT_ID__ = jM);
        }
        return e;
      })();
      class Ig {}
      let Vn = (() => {
          class e {
            constructor() {
              this.destroyNode = null;
            }
            static #e = (this.__NG_ELEMENT_ID__ = () =>
              (function HM() {
                const e = m(),
                  n = ot(Y().index, e);
                return (Oe(n) ? n : e)[A];
              })());
          }
          return e;
        })(),
        $M = (() => {
          class e {
            static #e = (this.ɵprov = B({
              token: e,
              providedIn: "root",
              factory: () => null,
            }));
          }
          return e;
        })();
      class Ts {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const UM = new Ts("17.0.5"),
        zl = {};
      function As(e) {
        return (
          !!Wl(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Wl(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      class Mg {
        constructor() {}
        supports(t) {
          return As(t);
        }
        create(t) {
          return new ZM(t);
        }
      }
      const qM = (e, t) => t;
      class ZM {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || qM);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Ng(r, o, i)) ? n : r,
              a = Ng(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !As(t))) throw new C(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function WM(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new QM(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Sg()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Sg()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class QM {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class YM {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Sg {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new YM()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Ng(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class Tg {
        constructor() {}
        supports(t) {
          return t instanceof Map || Wl(t);
        }
        create() {
          return new KM();
        }
      }
      class KM {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Wl(t))) throw new C(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new JM(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class JM {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Ag() {
        return new xs([new Mg()]);
      }
      let xs = (() => {
        class e {
          static #e = (this.ɵprov = B({
            token: e,
            providedIn: "root",
            factory: Ag,
          }));
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Ag()),
              deps: [[e, new tl(), new el()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new C(901, !1);
          }
        }
        return e;
      })();
      function xg() {
        return new $o([new Tg()]);
      }
      let $o = (() => {
        class e {
          static #e = (this.ɵprov = B({
            token: e,
            providedIn: "root",
            factory: xg,
          }));
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || xg()),
              deps: [[e, new tl(), new el()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new C(901, !1);
          }
        }
        return e;
      })();
      function Uo(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          null !== i && r.push(ne(i)), Ae(i) && Og(i, r);
          const s = n.type;
          if (8 & s) Uo(e, t, n.child, r);
          else if (32 & s) {
            const a = Cl(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = rg(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = Fo(t[le]);
              Uo(u[D], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      function Og(e, t) {
        for (let n = ge; n < e.length; n++) {
          const r = e[n],
            o = r[D].firstChild;
          null !== o && Uo(r[D], r, o, t);
        }
        e[At] !== e[de] && t.push(e[At]);
      }
      let Fg = [];
      const r0 = {
        version: 0,
        lastCleanEpoch: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
        consumerOnSignalRead: () => {},
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: (e) => {
          Gi(e.lView);
        },
        consumerOnSignalRead() {
          this.lView[An] = this;
        },
      };
      function ql(e) {
        return e.ngOriginalError;
      }
      class Jt {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && ql(t);
          for (; n && ql(n); ) n = ql(n);
          return n || null;
        }
      }
      const kg = new I("", { providedIn: "root", factory: () => !1 }),
        F = {};
      function Se(e) {
        Bg(V(), m(), Le() + e, !1);
      }
      function Bg(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[b])) {
            const i = e.preOrderCheckHooks;
            null !== i && Zi(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && Qi(t, i, 0, n);
          }
        Fn(n);
      }
      function w(e, t = L.Default) {
        const n = m();
        return null === n ? j(e, t) : tp(Y(), n, M(e), t);
      }
      function Fs(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[de] = o),
          (d[b] = 140 | r),
          (null !== l || (e && 2048 & e[b])) && (d[b] |= 2048),
          Ah(d),
          (d[se] = d[sr] = e),
          (d[J] = n),
          (d[ir] = s || (e && e[ir])),
          (d[A] = a || (e && e[A])),
          (d[$e] = u || (e && e[$e]) || null),
          (d[ke] = i),
          (d[yo] = (function Ab() {
            return Tb++;
          })()),
          (d[Nt] = c),
          (d[Ch] = l),
          (d[le] = 2 == t.type ? e[le] : d),
          d
        );
      }
      function Fr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Zl(e, t, n, r, o) {
            const i = kh(),
              s = Ru(),
              u = (e.data[t] = (function v0(e, t, n, r, o, i) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  (function dr() {
                    return null !== N.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function lI() {
              return N.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function Co() {
            const e = N.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Ft(i, !0), i;
      }
      function Go(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Hg(e, t, n, r, o) {
        const i = Le(),
          s = 2 & r;
        try {
          Fn(-1),
            s && t.length > x && Bg(e, t, x, !1),
            xt(s ? 2 : 0, o),
            n(r, o);
        } finally {
          Fn(i), xt(s ? 3 : 1, o);
        }
      }
      function Ql(e, t, n) {
        if (Su(t)) {
          const r = ce(null);
          try {
            const i = t.directiveEnd;
            for (let s = t.directiveStart; s < i; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            ce(r);
          }
        }
      }
      function Yl(e, t, n) {
        Rh() &&
          ((function b0(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            xn(n) &&
              (function O0(e, t, n) {
                const r = Ue(t, e),
                  o = $g(n);
                let s = 16;
                n.signals ? (s = 4096) : n.onPush && (s = 64);
                const a = Ps(
                  e,
                  Fs(
                    e,
                    o,
                    null,
                    s,
                    r,
                    t,
                    null,
                    e[ir].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null
                  )
                );
                e[t.index] = a;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || Ki(n, t),
              je(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = Pn(t, e, a, n);
              je(l, t),
                null !== s && F0(0, a - o, l, u, 0, s),
                _t(u) && (ot(n.index, t)[J] = Pn(t, e, a, n));
            }
          })(e, t, n, Ue(n, t)),
          64 == (64 & n.flags) && qg(e, t, n));
      }
      function Kl(e, t, n = Ue) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function $g(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Jl(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function Jl(e, t, n, r, o, i, s, a, u, l, c) {
        const d = x + r,
          f = d + o,
          h = (function f0(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : F);
            return n;
          })(d, f),
          p = "function" == typeof l ? l() : l;
        return (h[D] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: c,
        });
      }
      let Ug = (e) => null;
      function Gg(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? zg(n, t, o, i)
              : r.hasOwnProperty(o) && zg(n, t, r[o], i);
          }
        return n;
      }
      function zg(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Xl(e, t, n, r) {
        if (Rh()) {
          const o = null === r ? null : { "": -1 },
            i = (function S0(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (gh(t, s.selectors, !1))
                    if ((r || (r = []), _t(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          ec(e, t, a.length);
                      } else r.unshift(s), ec(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && Wg(e, t, n, s, o, a),
            o &&
              (function N0(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new C(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = po(n.mergedAttrs, n.attrs);
      }
      function Wg(e, t, n, r, o, i) {
        for (let l = 0; l < r.length; l++) qu(Ki(n, t), e, r[l].type);
        !(function A0(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = Go(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          (n.mergedAttrs = po(n.mergedAttrs, c.hostAttrs)),
            x0(e, n, t, u, c),
            T0(u, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++;
        }
        !(function _0(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = Gg(d.inputs, c, u, f ? f.inputs : null)),
              (l = Gg(d.outputs, c, l, p));
            const g = null === u || null === s || ph(t) ? null : P0(u, c, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = l);
        })(e, n, i);
      }
      function qg(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function dI() {
            return N.lFrame.currentDirectiveIndex;
          })();
        try {
          Fn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = t[a];
            Lu(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                M0(u, l);
          }
        } finally {
          Fn(-1), Lu(s);
        }
      }
      function M0(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function ec(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function T0(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          _t(t) && (n[""] = e);
        }
      }
      function x0(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = On(o.type)),
          s = new wo(i, _t(o), w);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function E0(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function I0(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, Go(e, n, o.hostVars, F), o);
      }
      function F0(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) Zg(r, n, s[a++], s[a++], s[a++]);
      }
      function Zg(e, t, n, r, o) {
        const i = ce(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(r) && (o = s[r].call(t, o)),
            null !== e.setInput ? e.setInput(t, o, n, r) : (t[r] = o);
        } finally {
          ce(i);
        }
      }
      function P0(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function Qg(e, t, n, r) {
        return [e, !0, 0, t, null, r, null, n, null, null];
      }
      function Yg(e, t) {
        const n = e.contentQueries;
        if (null !== n) {
          const r = ce(null);
          try {
            for (let o = 0; o < n.length; o += 2) {
              const s = n[o + 1];
              if (-1 !== s) {
                const a = e.data[s];
                ju(n[o]), a.contentQueries(2, t[s], s);
              }
            }
          } finally {
            ce(r);
          }
        }
      }
      function Ps(e, t) {
        return e[go] ? (e[Dh][vt] = t) : (e[go] = t), (e[Dh] = t), t;
      }
      function nc(e, t, n) {
        ju(0);
        const r = ce(null);
        try {
          t(e, n);
        } finally {
          ce(r);
        }
      }
      function Rs(e, t) {
        const n = e[$e],
          r = n ? n.get(Jt, null) : null;
        r && r.handleError(t);
      }
      function rc(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++];
          Zg(e.data[s], t[s], r, a, o);
        }
      }
      function em(e, t, n, r) {
        const o = t[b];
        if (256 == (256 & o)) return;
        t[ir].inlineEffectRunner?.flush(), Bu(t);
        let s = null,
          a = null;
        (function L0(e) {
          return 2 !== e.type;
        })(e) &&
          ((a = (function e0(e) {
            return (
              e[An] ??
              (function t0(e) {
                const t = Fg.pop() ?? Object.create(r0);
                return (t.lView = e), t;
              })(e)
            );
          })(t)),
          (s = (function gf(e) {
            return e && (e.nextProducerIndex = 0), ce(e);
          })(a)));
        try {
          Ah(t),
            (function Vh(e) {
              return (N.lFrame.bindingIndex = e);
            })(e.bindingStartIndex),
            null !== n && Hg(e, t, n, 2, r);
          const u = 3 == (3 & o);
          if (u) {
            const d = e.preOrderCheckHooks;
            null !== d && Zi(t, d, null);
          } else {
            const d = e.preOrderHooks;
            null !== d && Qi(t, d, 0, null), $u(t, 0);
          }
          if (
            ((function V0(e) {
              for (let t = zp(e); null !== t; t = Wp(t)) {
                if (!(t[b] & lr.HasTransplantedViews)) continue;
                const n = t[ur];
                for (let r = 0; r < n.length; r++) {
                  XE(n[r]);
                }
              }
            })(t),
            tm(t, 0),
            null !== e.contentQueries && Yg(e, t),
            u)
          ) {
            const d = e.contentCheckHooks;
            null !== d && Zi(t, d);
          } else {
            const d = e.contentHooks;
            null !== d && Qi(t, d, 1), $u(t, 1);
          }
          !(function d0(e, t) {
            const n = e.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const o = n[r];
                  if (o < 0) Fn(~o);
                  else {
                    const i = o,
                      s = n[++r],
                      a = n[++r];
                    cI(s, i), a(2, t[i]);
                  }
                }
              } finally {
                Fn(-1);
              }
          })(e, t);
          const l = e.components;
          null !== l && om(t, l, 0);
          const c = e.viewQuery;
          if ((null !== c && nc(2, c, r), u)) {
            const d = e.viewCheckHooks;
            null !== d && Zi(t, d);
          } else {
            const d = e.viewHooks;
            null !== d && Qi(t, d, 2), $u(t, 2);
          }
          if ((!0 === e.firstUpdatePass && (e.firstUpdatePass = !1), t[Hi])) {
            for (const d of t[Hi]) d();
            t[Hi] = null;
          }
          t[b] &= -73;
        } catch (u) {
          throw (Gi(t), u);
        } finally {
          null !== a &&
            ((function mf(e, t) {
              if (
                (ce(t),
                e &&
                  void 0 !== e.producerNode &&
                  void 0 !== e.producerIndexOfThis &&
                  void 0 !== e.producerLastReadVersion)
              ) {
                if (ao(e))
                  for (
                    let n = e.nextProducerIndex;
                    n < e.producerNode.length;
                    n++
                  )
                    Si(e.producerNode[n], e.producerIndexOfThis[n]);
                for (; e.producerNode.length > e.nextProducerIndex; )
                  e.producerNode.pop(),
                    e.producerLastReadVersion.pop(),
                    e.producerIndexOfThis.pop();
              }
            })(a, s),
            (function n0(e) {
              e.lView[An] !== e && ((e.lView = null), Fg.push(e));
            })(a)),
            Hu();
        }
      }
      function tm(e, t) {
        for (let n = zp(e); null !== n; n = Wp(n)) {
          n[b] &= ~lr.HasChildViewsToRefresh;
          for (let r = ge; r < n.length; r++) nm(n[r], t);
        }
      }
      function j0(e, t, n) {
        nm(ot(t, e), n);
      }
      function nm(e, t) {
        Fu(e) && rm(e, t);
      }
      function rm(e, t) {
        const r = e[D],
          o = e[b],
          i = e[An];
        let s = !!(0 === t && 16 & o);
        if (
          ((s ||= !!(64 & o && 0 === t)),
          (s ||= !!(1024 & o)),
          (s ||= !(!i?.dirty || !qa(i))),
          i && (i.dirty = !1),
          (e[b] &= -9217),
          s)
        )
          em(r, e, r.template, e[J]);
        else if (8192 & o) {
          tm(e, 1);
          const a = r.components;
          null !== a && om(e, a, 1);
        }
      }
      function om(e, t, n) {
        for (let r = 0; r < t.length; r++) j0(e, t[r], n);
      }
      function zo(e) {
        for (; e; ) {
          e[b] |= 64;
          const t = Fo(e);
          if (Nu(e) && !t) return e;
          e = t;
        }
        return null;
      }
      class Wo {
        get rootNodes() {
          const t = this._lView,
            n = t[D];
          return Uo(n, t, n.firstChild, []);
        }
        constructor(t, n, r = !0) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this.notifyErrorHandler = r),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[J];
        }
        set context(t) {
          this._lView[J] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[b]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[se];
            if (Ae(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Po(t, r), es(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          ms(this._lView[D], this._lView);
        }
        onDestroy(t) {
          !(function zi(e, t) {
            if (256 == (256 & e[b])) throw new C(911, !1);
            null === e[fn] && (e[fn] = []), e[fn].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          zo(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[b] &= -129;
        }
        reattach() {
          Fh(this._lView), (this._lView[b] |= 128);
        }
        detectChanges() {
          !(function oc(e, t = !0) {
            const n = e[ir],
              r = n.rendererFactory,
              o = n.afterRenderEventManager;
            r.begin?.(), o?.begin();
            try {
              const s = e[D];
              em(s, e, s.template, e[J]),
                (function k0(e) {
                  let t = 0;
                  for (; Oh(e); ) {
                    if (100 === t) throw new C(103, !1);
                    t++, rm(e, 1);
                  }
                })(e);
            } catch (s) {
              throw (t && Rs(e, s), s);
            } finally {
              r.end?.(), n.inlineEffectRunner?.flush(), o?.end();
            }
          })(this._lView, this.notifyErrorHandler);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function Gb(e, t) {
              ko(e, t, t[A], 2, null, null);
            })(this._lView[D], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = t;
        }
      }
      let ic = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = B0);
        }
        return e;
      })();
      function B0(e) {
        return (function H0(e, t, n) {
          if (xn(e) && !n) {
            const r = ot(e.index, t);
            return new Wo(r, r);
          }
          return 47 & e.type ? new Wo(t[le], t) : null;
        })(Y(), m(), 16 == (16 & e));
      }
      function ac(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const me = class K0 extends xi {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = ac(i)), o && (o = ac(o)), s && (s = ac(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof bt && t.add(a), a;
        }
      };
      function sm(...e) {}
      class ae {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new me(!1)),
            (this.onMicrotaskEmpty = new me(!1)),
            (this.onStable = new me(!1)),
            (this.onError = new me(!1)),
            typeof Zone > "u")
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function J0() {
              const e = "function" == typeof te.requestAnimationFrame;
              let t = te[e ? "requestAnimationFrame" : "setTimeout"],
                n = te[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && t && n) {
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
                const o = n[Zone.__symbol__("OriginalDelegate")];
                o && (n = o);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function tS(e) {
              const t = () => {
                !(function eS(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(te, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                lc(e),
                                (e.isCheckStableRunning = !0),
                                uc(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    lc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  if (
                    (function rS(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      );
                    })(a)
                  )
                    return n.invokeTask(o, i, s, a);
                  try {
                    return am(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      um(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return am(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), um(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          lc(e),
                          uc(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ae.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (ae.isInAngularZone()) throw new C(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, X0, sm, sm);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const X0 = {};
      function uc(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function lc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function am(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function um(e) {
        e._nesting--, uc(e);
      }
      class nS {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new me()),
            (this.onMicrotaskEmpty = new me()),
            (this.onStable = new me()),
            (this.onError = new me());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const lm = new I("", { providedIn: "root", factory: cm });
      function cm() {
        const e = G(ae);
        let t = !0;
        return rE(
          new He((o) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete();
              });
          }),
          new He((o) => {
            let i;
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                ae.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              ae.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              i.unsubscribe(), s.unsubscribe();
            };
          }).pipe(Jf())
        );
      }
      let ks = (() => {
        class e {
          constructor() {
            (this.renderDepth = 0),
              (this.handler = null),
              (this.internalCallbacks = []);
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++;
          }
          end() {
            if ((this.renderDepth--, 0 === this.renderDepth)) {
              for (const n of this.internalCallbacks) n();
              (this.internalCallbacks.length = 0), this.handler?.execute();
            }
          }
          ngOnDestroy() {
            this.handler?.destroy(),
              (this.handler = null),
              (this.internalCallbacks.length = 0);
          }
          static #e = (this.ɵprov = B({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function sS(e, t) {
        const n = ot(t, e),
          r = n[D];
        !(function aS(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const o = n[de];
        null !== o && null === n[Nt] && (n[Nt] = $l(o, n[$e])), cc(r, n, n[J]);
      }
      function cc(e, t, n) {
        Bu(t);
        try {
          const r = e.viewQuery;
          null !== r && nc(1, r, n);
          const o = e.template;
          null !== o && Hg(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Yg(e, t),
            e.staticViewQueries && nc(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function uS(e, t) {
              for (let n = 0; n < t.length; n++) sS(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[b] &= -5), Hu();
        }
      }
      function Ls(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = fu(o, a))
              : 2 == i && (r = fu(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      class gm extends Ns {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = R(t);
          return new qo(n, this.ngModule);
        }
      }
      function mm(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class cS {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Vi(r);
          const o = this.injector.get(t, zl, r);
          return o !== zl || n === zl ? o : this.parentInjector.get(t, n, r);
        }
      }
      class qo extends wg {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = mm(t.inputs);
          if (null !== n)
            for (const o of r)
              n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
          return r;
        }
        get outputs() {
          return mm(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function kE(e) {
              return e.map(RE).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Yt ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new cS(t, i) : t,
            a = s.get(Ig, null);
          if (null === a) throw new C(407, !1);
          const c = {
              rendererFactory: a,
              sanitizer: s.get($M, null),
              inlineEffectRunner: null,
              afterRenderEventManager: s.get(ks, null),
            },
            d = a.createRenderer(null, this.componentDef),
            f = this.componentDef.selectors[0][0] || "div",
            h = r
              ? (function h0(e, t, n, r) {
                  const i = r.get(kg, !1) || n === mt.ShadowDom,
                    s = e.selectRootElement(t, i);
                  return (
                    (function p0(e) {
                      Ug(e);
                    })(s),
                    s
                  );
                })(d, r, this.componentDef.encapsulation, s)
              : gs(
                  d,
                  f,
                  (function lS(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(f)
                ),
            v = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let _ = null;
          null !== h && (_ = $l(h, s, !0));
          const y = Jl(0, null, null, 1, 0, null, null, null, null, null, null),
            E = Fs(null, y, null, v, null, null, c, d, s, null, _);
          let P, k;
          Bu(E);
          try {
            const he = this.componentDef;
            let Kn,
              df = null;
            he.findHostDirectiveDefs
              ? ((Kn = []),
                (df = new Map()),
                he.findHostDirectiveDefs(he, Kn, df),
                Kn.push(he))
              : (Kn = [he]);
            const gk = (function fS(e, t) {
                const n = e[D],
                  r = x;
                return (e[r] = t), Fr(n, r, 2, "#host", null);
              })(E, h),
              mk = (function hS(e, t, n, r, o, i, s) {
                const a = o[D];
                !(function pS(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = po(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Ls(t, t.mergedAttrs, !0), null !== n && ag(r, n, t));
                })(r, e, t, s);
                let u = null;
                null !== t && (u = $l(t, o[$e]));
                const l = i.rendererFactory.createRenderer(t, n);
                let c = 16;
                n.signals ? (c = 4096) : n.onPush && (c = 64);
                const d = Fs(
                  o,
                  $g(n),
                  null,
                  c,
                  o[e.index],
                  e,
                  i,
                  l,
                  null,
                  null,
                  u
                );
                return (
                  a.firstCreatePass && ec(a, e, r.length - 1),
                  Ps(o, d),
                  (o[e.index] = d)
                );
              })(gk, h, he, Kn, E, c, d);
            (k = Do(y, x)),
              h &&
                (function mS(e, t, n, r) {
                  if (r) bu(e, n, ["ng-version", UM.full]);
                  else {
                    const { attrs: o, classes: i } = (function LE(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!yt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && bu(e, n, o),
                      i && i.length > 0 && sg(e, n, i.join(" "));
                  }
                })(d, he, h, r),
              void 0 !== n &&
                (function yS(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(k, this.ngContentSelectors, n),
              (P = (function gS(e, t, n, r, o, i) {
                const s = Y(),
                  a = o[D],
                  u = Ue(s, o);
                Wg(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  je(Pn(o, a, s.directiveStart + c, s), o);
                qg(a, o, s), u && je(u, o);
                const l = Pn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[J] = o[J] = l), null !== i)) for (const c of i) c(l, t);
                return Ql(a, s, e), l;
              })(mk, he, Kn, df, E, [vS])),
              cc(y, E, null);
          } finally {
            Hu();
          }
          return new dS(this.componentType, P, Or(k, E), E, k);
        }
      }
      class dS extends kM {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new Wo(o, void 0, !1)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const i = this._rootLView;
            rc(i[D], i, o, t, n),
              this.previousInputValues.set(t, n),
              zo(ot(this._tNode.index, i));
          }
        }
        get injector() {
          return new be(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function vS() {
        const e = Y();
        qi(m()[D], e);
      }
      function Q(e) {
        let t = (function ym(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (_t(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new C(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = Vs(e.inputs)),
                (s.inputTransforms = Vs(e.inputTransforms)),
                (s.declaredInputs = Vs(e.declaredInputs)),
                (s.outputs = Vs(e.outputs));
              const a = o.hostBindings;
              a && wS(e, a);
              const u = o.viewQuery,
                l = o.contentQueries;
              if (
                (u && DS(e, u),
                l && CS(e, l),
                Oi(e.inputs, o.inputs),
                Oi(e.declaredInputs, o.declaredInputs),
                Oi(e.outputs, o.outputs),
                null !== o.inputTransforms &&
                  (null === s.inputTransforms && (s.inputTransforms = {}),
                  Oi(s.inputTransforms, o.inputTransforms)),
                _t(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === Q && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function _S(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = po(o.hostAttrs, (n = po(n, o.hostAttrs))));
          }
        })(r);
      }
      function Vs(e) {
        return e === St ? {} : e === H ? [] : e;
      }
      function DS(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function CS(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function wS(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function Ce(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Bs(e, t) {
        return (e << 17) | (t << 2);
      }
      function _n(e) {
        return (e >> 17) & 32767;
      }
      function dc(e) {
        return 2 | e;
      }
      function $n(e) {
        return (131068 & e) >> 2;
      }
      function fc(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function hc(e) {
        return 1 | e;
      }
      function Am(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? _n(i) : $n(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          PS(e[a], t) && ((u = !0), (e[a + 1] = r ? hc(c) : dc(c))),
            (a = r ? _n(c) : $n(c));
        }
        u && (e[n + 1] = r ? dc(i) : hc(i));
      }
      function PS(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Cr(e, t) >= 0)
        );
      }
      function Fe(e, t, n) {
        const r = m();
        return (
          Ce(r, Pt(), t) &&
            (function lt(e, t, n, r, o, i, s, a) {
              const u = Ue(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? (rc(e, n, c, r, o),
                  xn(t) &&
                    (function C0(e, t) {
                      const n = ot(t, e);
                      16 & n[b] || (n[b] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function D0(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(
              V(),
              (function ie() {
                const e = N.lFrame;
                return Do(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[A],
              n,
              !1
            ),
          Fe
        );
      }
      function pc(e, t, n, r, o) {
        const s = o ? "class" : "style";
        rc(e, n, t.inputs[s], s, r);
      }
      function Hs(e, t) {
        return (
          (function Ct(e, t, n, r) {
            const o = m(),
              i = V(),
              s = (function Qt(e) {
                const t = N.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function jm(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[Le()],
                    s = (function Vm(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function Um(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function US(e, t, n, r) {
                      const o = (function Vu(e) {
                        const t = N.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = Qo((n = gc(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = gc(o, e, t, n, r)), null === i)) {
                            let u = (function GS(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== $n(r)) return e[_n(r)];
                            })(e, t, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = gc(null, e, t, u[1], r)),
                              (u = Qo(u, t.attrs, r)),
                              (function zS(e, t, n, r) {
                                e[_n(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, u));
                          } else
                            i = (function WS(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Qo(r, e[i].hostAttrs, n);
                              return Qo(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function OS(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = _n(s),
                        u = $n(s);
                      e[r] = n;
                      let c,
                        l = !1;
                      if (
                        (Array.isArray(n)
                          ? ((c = n[1]),
                            (null === c || Cr(n, c) > 0) && (l = !0))
                          : (c = n),
                        o)
                      )
                        if (0 !== u) {
                          const f = _n(e[a + 1]);
                          (e[r + 1] = Bs(f, a)),
                            0 !== f && (e[f + 1] = fc(e[f + 1], r)),
                            (e[a + 1] = (function AS(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = Bs(a, 0)),
                            0 !== a && (e[a + 1] = fc(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = Bs(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = fc(e[u + 1], r)),
                          (u = r);
                      l && (e[r + 1] = dc(e[r + 1])),
                        Am(e, c, r, !0),
                        Am(e, c, r, !1),
                        (function FS(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            Cr(i, t) >= 0 &&
                            (n[r + 1] = hc(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = Bs(a, u)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== F &&
                Ce(o, s, t) &&
                (function Hm(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    l = u[a + 1],
                    c = (function xS(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? $m(u, t, n, o, $n(l), s)
                      : void 0;
                  $s(c) ||
                    ($s(i) ||
                      ((function TS(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = $m(u, null, n, o, a, s))),
                    (function eM(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : yn.DashCase;
                        null == o
                          ? e.removeStyle(n, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= yn.Important)),
                            e.setStyle(n, r, o, i));
                      }
                    })(r, s, _o(Le(), n), o, i));
                })(
                  i,
                  i.data[Le()],
                  o,
                  o[A],
                  e,
                  (o[s + 1] = (function YS(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = De(vn(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          Hs
        );
      }
      function gc(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Qo(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Qo(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                at(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function $m(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = n[o + 1];
          f === F && (f = d ? H : void 0);
          let h = d ? Ju(f, r) : c === r ? f : void 0;
          if ((l && !$s(h) && (h = Ju(u, r)), $s(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? _n(p) : $n(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = Ju(u, r));
        }
        return a;
      }
      function $s(e) {
        return void 0 !== e;
      }
      function zr(e, t) {
        return !t || fs(e);
      }
      function ei(e, t, n, r = !0) {
        const o = t[D];
        if (
          ((function Wb(e, t, n, r) {
            const o = ge + r,
              i = n.length;
            r > 0 && (n[o - 1][vt] = t),
              r < i - ge
                ? ((t[vt] = n[o]), ap(n, ge + r, t))
                : (n.push(t), (t[vt] = null)),
              (t[se] = n);
            const s = t[mo];
            null !== s &&
              n !== s &&
              (function qb(e, t) {
                const n = e[ur];
                t[le] !== t[se][se][le] && (e[b] |= lr.HasTransplantedViews),
                  null === n ? (e[ur] = [t]) : n.push(t);
              })(s, t);
            const a = t[Tt];
            null !== a && a.insertView(e), Fh(t), (t[b] |= 128);
          })(o, t, e, n),
          r)
        ) {
          const i = Ml(n, e),
            s = t[A],
            a = ys(s, e[At]);
          null !== a &&
            (function Ub(e, t, n, r, o, i) {
              (r[de] = o), (r[ke] = t), ko(e, r, n, 1, o, i);
            })(o, e[ke], s, t, a, i);
        }
      }
      let Bt = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = AN);
        }
        return e;
      })();
      function AN() {
        return (function ny(e, t) {
          let n;
          const r = t[e.index];
          return (
            Ae(r)
              ? (n = r)
              : ((n = Qg(r, t, null, e)), (t[e.index] = n), Ps(t, n)),
            ry(n, t, e, r),
            new ey(n, e, t)
          );
        })(Y(), m());
      }
      const xN = Bt,
        ey = class extends xN {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Or(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new be(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ji(this._hostTNode, this._hostLView);
            if (Gu(t)) {
              const n = Io(t, this._hostLView),
                r = Eo(t);
              return new be(n[D].data[r + 8], n);
            }
            return new be(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = ty(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - ge;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const a = t.createEmbeddedViewImpl(n || {}, i, null);
            return this.insertImpl(a, o, zr(this._hostTNode, null)), a;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function bo(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const p = n || {};
              (a = p.index),
                (r = p.injector),
                (o = p.projectableNodes),
                (i = p.environmentInjector || p.ngModuleRef);
            }
            const u = s ? t : new qo(R(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const g = (s ? l : this.parentInjector).get(Yt, null);
              g && (i = g);
            }
            R(u.componentType ?? {});
            const h = u.create(l, o, null, i);
            return this.insertImpl(h.hostView, a, zr(this._hostTNode, null)), h;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !0);
          }
          insertImpl(t, n, r) {
            const o = t._lView;
            if (
              (function JE(e) {
                return Ae(e[se]);
              })(o)
            ) {
              const a = this.indexOf(t);
              if (-1 !== a) this.detach(a);
              else {
                const u = o[se],
                  l = new ey(u, u[ke], u[se]);
                l.detach(l.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            return (
              ei(s, o, i, r), t.attachToViewContainerRef(), ap(Ic(s), i, t), t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = ty(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Po(this._lContainer, n);
            r && (es(Ic(this._lContainer), n), ms(r[D], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Po(this._lContainer, n);
            return r && null != es(Ic(this._lContainer), n) ? new Wo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function ty(e) {
        return e[8];
      }
      function Ic(e) {
        return e[8] || (e[8] = []);
      }
      let ry = function iy(e, t, n, r) {
          if (e[At]) return;
          let o;
          (o =
            8 & n.type
              ? ne(r)
              : (function ON(e, t) {
                  const n = e[A],
                    r = n.createComment(""),
                    o = Ue(t, e);
                  return (
                    Ln(
                      n,
                      ys(n, o),
                      r,
                      (function Kb(e, t) {
                        return e.nextSibling(t);
                      })(n, o),
                      !1
                    ),
                    r
                  );
                })(t, n)),
            (e[At] = o);
        },
        bc = (e, t, n) => !1;
      function Ht(e, t, n, r, o, i, s, a) {
        const u = m(),
          l = V(),
          c = e + x,
          d = l.firstCreatePass
            ? (function kN(e, t, n, r, o, i, s, a, u) {
                const l = t.consts,
                  c = Fr(t, e, 4, s || null, Ot(l, a));
                Xl(t, n, c, Ot(l, u)), qi(t, c);
                const d = (c.tView = Jl(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l,
                  null
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, l, u, t, n, r, o, i, s)
            : l.data[c];
        Ft(d, !1);
        const f = sy(l, u, d, e);
        Wi() && vs(l, u, f, d), je(f, u);
        const h = Qg(f, u, f, d);
        return (
          (u[c] = h),
          Ps(u, h),
          (function oy(e, t, n) {
            return bc(e, t, n);
          })(h, d, u),
          Ui(d) && Yl(l, u, d),
          null != s && Kl(u, d, a),
          Ht
        );
      }
      let sy = function ay(e, t, n, r) {
        return hn(!0), t[A].createComment("");
      };
      function q(e, t, n, r) {
        const o = m(),
          i = V(),
          s = x + e,
          a = o[A],
          u = i.firstCreatePass
            ? (function bT(e, t, n, r, o, i) {
                const s = t.consts,
                  u = Fr(t, e, 2, r, Ot(s, o));
                return (
                  Xl(t, n, u, Ot(s, i)),
                  null !== u.attrs && Ls(u, u.attrs, !1),
                  null !== u.mergedAttrs && Ls(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          l = Ay(i, o, u, a, t, e);
        o[s] = l;
        const c = Ui(u);
        return (
          Ft(u, !0),
          ag(a, l, u),
          32 != (32 & u.flags) && Wi() && vs(i, o, l, u),
          0 ===
            (function eI() {
              return N.lFrame.elementDepthCount;
            })() && je(l, o),
          (function tI() {
            N.lFrame.elementDepthCount++;
          })(),
          c && (Yl(i, o, u), Ql(i, u, o)),
          null !== r && Kl(o, u),
          q
        );
      }
      function $() {
        let e = Y();
        Ru() ? ku() : ((e = e.parent), Ft(e, !1));
        const t = e;
        (function rI(e) {
          return N.skipHydrationRootTNode === e;
        })(t) &&
          (function aI() {
            N.skipHydrationRootTNode = null;
          })(),
          (function nI() {
            N.lFrame.elementDepthCount--;
          })();
        const n = V();
        return (
          n.firstCreatePass && (qi(n, e), Su(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function wI(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            pc(n, t, m(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function EI(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            pc(n, t, m(), t.stylesWithoutHost, !1),
          $
        );
      }
      function $t(e, t, n, r) {
        return q(e, t, n, r), $(), $t;
      }
      let Ay = (e, t, n, r, o, i) => (
        hn(!0),
        gs(
          r,
          o,
          (function Wh() {
            return N.lFrame.currentNamespace;
          })()
        )
      );
      function Js(e, t, n) {
        const r = m(),
          o = V(),
          i = e + x,
          s = o.firstCreatePass
            ? (function NT(e, t, n, r, o) {
                const i = t.consts,
                  s = Ot(i, r),
                  a = Fr(t, e, 8, "ng-container", s);
                return (
                  null !== s && Ls(a, s, !0),
                  Xl(t, n, a, Ot(i, o)),
                  null !== t.queries && t.queries.elementStart(t, a),
                  a
                );
              })(i, o, r, t, n)
            : o.data[i];
        Ft(s, !0);
        const a = Oy(o, r, s, e);
        return (
          (r[i] = a),
          Wi() && vs(o, r, a, s),
          je(a, r),
          Ui(s) && (Yl(o, r, s), Ql(o, s, r)),
          null != n && Kl(r, s),
          Js
        );
      }
      function Xs() {
        let e = Y();
        const t = V();
        return (
          Ru() ? ku() : ((e = e.parent), Ft(e, !1)),
          t.firstCreatePass && (qi(t, e), Su(e) && t.queries.elementEnd(e)),
          Xs
        );
      }
      let Oy = (e, t, n, r) => (hn(!0), wl(t[A], ""));
      function Gn() {
        return m();
      }
      const Xr = "en-US";
      let Ly = Xr;
      function oa(e) {
        return !!e && "function" == typeof e.then;
      }
      function uv(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function K(e, t, n, r) {
        const o = m(),
          i = V(),
          s = Y();
        return (
          (function cv(e, t, n, r, o, i, s) {
            const a = Ui(r),
              l =
                e.firstCreatePass &&
                (function Jg(e) {
                  return e.cleanup || (e.cleanup = []);
                })(e),
              c = t[J],
              d = (function Kg(e) {
                return e[or] || (e[or] = []);
              })(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = Ue(r, t),
                v = s ? s(g) : g,
                _ = d.length,
                y = s ? (P) => s(ne(P[r.index])) : r.index;
              let E = null;
              if (
                (!s &&
                  a &&
                  (E = (function SA(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[or],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== E)
              )
                ((E.__ngLastListenerFn__ || E).__ngNextListenerFn__ = i),
                  (E.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = fv(r, t, c, i, !1);
                const P = n.listen(v, o, i);
                d.push(i, P), l && l.push(o, y, _, _ + 1);
              }
            } else i = fv(r, t, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let v = 0; v < g; v += 2) {
                  const k = t[p[v]][p[v + 1]].subscribe(i),
                    he = d.length;
                  d.push(i, k), l && l.push(o, r.index, he, -(he + 1));
                }
            }
          })(i, o, o[A], s, e, t, r),
          K
        );
      }
      function dv(e, t, n, r) {
        try {
          return xt(6, t, n), !1 !== n(r);
        } catch (o) {
          return Rs(e, o), !1;
        } finally {
          xt(7, t, n);
        }
      }
      function fv(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          zo(e.componentOffset > -1 ? ot(e.index, t) : t);
          let u = dv(t, n, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = dv(t, n, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && s.preventDefault(), u;
        };
      }
      function Pe(e = 1) {
        return (function hI(e) {
          return (N.lFrame.contextLView = (function xh(e, t) {
            for (; e > 0; ) (t = t[sr]), e--;
            return t;
          })(e, N.lFrame.contextLView))[J];
        })(e);
      }
      function We(e, t = "") {
        const n = m(),
          r = V(),
          o = e + x,
          i = r.firstCreatePass ? Fr(r, o, 1, t, null) : r.data[o],
          s = Ov(r, n, i, t, e);
        (n[o] = s), Wi() && vs(r, n, s, i), Ft(i, !1);
      }
      let Ov = (e, t, n, r, o) => (
        hn(!0),
        (function ps(e, t) {
          return e.createText(t);
        })(t[A], r)
      );
      function eo(e) {
        return ia("", e, ""), eo;
      }
      function ia(e, t, n) {
        const r = m(),
          o = (function Rr(e, t, n, r) {
            return Ce(e, Pt(), n) ? t + T(n) + r : F;
          })(r, e, t, n);
        return (
          o !== F &&
            (function Xt(e, t, n) {
              const r = _o(t, e);
              !(function Zp(e, t, n) {
                e.setValue(t, n);
              })(e[A], r, n);
            })(r, Le(), o),
          ia
        );
      }
      function jc(e, t, n, r, o) {
        if (((e = M(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) jc(e[i], t, n, r, o);
        else {
          const i = V(),
            s = m(),
            a = Y();
          let u = Rn(e) ? e : M(e.provide);
          const l = _p(e),
            c = 1048575 & a.providerIndexes,
            d = a.directiveStart,
            f = a.providerIndexes >> 20;
          if (Rn(e) || !e.multi) {
            const h = new wo(l, o, w),
              p = Hc(u, t, o ? c : c + f, d);
            -1 === p
              ? (qu(Ki(a, s), i, u),
                Bc(i, e, t.length),
                t.push(u),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = Hc(u, t, c + f, d),
              p = Hc(u, t, c, c + f),
              v = p >= 0 && n[p];
            if ((o && !v) || (!o && !(h >= 0 && n[h]))) {
              qu(Ki(a, s), i, u);
              const _ = (function WA(e, t, n, r, o) {
                const i = new wo(e, n, w);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  Hv(i, o, r && !n),
                  i
                );
              })(o ? zA : GA, n.length, o, r, l);
              !o && v && (n[p].providerFactory = _),
                Bc(i, e, t.length, 0),
                t.push(u),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                n.push(_),
                s.push(_);
            } else Bc(i, e, h > -1 ? h : p, Hv(n[o ? p : h], l, !o && r));
            !o && r && v && n[p].componentProviders++;
          }
        }
      }
      function Bc(e, t, n, r) {
        const o = Rn(t),
          i = (function tb(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const u = (i ? M(t.useClass) : t).prototype.ngOnDestroy;
          if (u) {
            const l = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = l.indexOf(n);
              -1 === c ? l.push(n, [r, u]) : l[c + 1].push(r, u);
            } else l.push(n, u);
          }
        }
      }
      function Hv(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function Hc(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function GA(e, t, n, r) {
        return $c(this.multi, []);
      }
      function zA(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Pn(n, n[D], this.providerFactory.index, r);
          (i = a.slice(0, s)), $c(o, i);
          for (let u = s; u < a.length; u++) i.push(a[u]);
        } else (i = []), $c(o, i);
        return i;
      }
      function $c(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function ue(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function UA(e, t, n) {
              const r = V();
              if (r.firstCreatePass) {
                const o = _t(e);
                jc(n, r.data, r.blueprint, o, !0),
                  jc(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class Wn {}
      class qA {}
      class Uc extends Wn {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new gm(this));
          const o = (function Re(e, t) {
            const n = e[eh] || null;
            if (!n && !0 === t)
              throw new Error(
                `Type ${De(e)} does not have '\u0275mod' property.`
              );
            return n;
          })(t);
          (this._bootstrapComponents = (function ut(e) {
            return e instanceof Function ? e() : e;
          })(o.bootstrap)),
            (this._r3Injector = Ip(
              t,
              n,
              [
                { provide: Wn, useValue: this },
                { provide: Ns, useValue: this.componentFactoryResolver },
                ...r,
              ],
              De(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Gc extends qA {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Uc(this.moduleType, t, []);
        }
      }
      function Yv(e, t, n, r) {
        return (function Kv(e, t, n, r, o, i) {
          const s = t + n;
          return Ce(e, s, o)
            ? (function Lt(e, t, n) {
                return (e[t] = n);
              })(e, s + 1, i ? r.call(i, o) : r(o))
            : (function li(e, t) {
                const n = e[t];
                return n === F ? void 0 : n;
              })(e, s + 1);
        })(
          m(),
          (function Ge() {
            const e = N.lFrame;
            let t = e.bindingRootIndex;
            return (
              -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
              t
            );
          })(),
          e,
          t,
          n,
          r
        );
      }
      Symbol;
      let tn = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = Nx);
        }
        return e;
      })();
      const Mx = tn,
        Sx = class extends Mx {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n);
          }
          createEmbeddedViewImpl(t, n, r) {
            const o = (function Xo(e, t, n, r) {
              const o = t.tView,
                a = Fs(
                  e,
                  o,
                  n,
                  4096 & e[b] ? 4096 : 16,
                  null,
                  t,
                  null,
                  null,
                  null,
                  r?.injector ?? null,
                  r?.dehydratedView ?? null
                );
              a[mo] = e[t.index];
              const l = e[Tt];
              return (
                null !== l && (a[Tt] = l.createEmbeddedView(o)), cc(o, a, n), a
              );
            })(this._declarationLView, this._declarationTContainer, t, {
              injector: n,
              dehydratedView: r,
            });
            return new Wo(o);
          }
        };
      function Nx() {
        return (function ua(e, t) {
          return 4 & e.type ? new Sx(t, e, Or(e, t)) : null;
        })(Y(), m());
      }
      const aO = new I("Application Initializer");
      let nd = (() => {
        class e {
          constructor() {
            (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((n, r) => {
                (this.resolve = n), (this.reject = r);
              })),
              (this.appInits = G(aO, { optional: !0 }) ?? []);
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [];
            for (const o of this.appInits) {
              const i = o();
              if (oa(i)) n.push(i);
              else if (uv(i)) {
                const s = new Promise((a, u) => {
                  i.subscribe({ complete: a, error: u });
                });
                n.push(s);
              }
            }
            const r = () => {
              (this.done = !0), this.resolve();
            };
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = B({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const nn = new I("LocaleId", {
        providedIn: "root",
        factory: () =>
          G(nn, L.Optional | L.SkipSelf) ||
          (function lO() {
            return (typeof $localize < "u" && $localize.locale) || Xr;
          })(),
      });
      let gO = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new oE(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = B({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const S_ = new I(""),
        da = new I("");
      let sd,
        od = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                sd ||
                  ((function HO(e) {
                    sd = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ae.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(j(ae), j(id), j(da));
            });
            static #t = (this.ɵprov = B({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        id = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return sd?.findTestabilityInTree(this, n, r) ?? null;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = B({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            }));
          }
          return e;
        })(),
        Cn = null;
      const N_ = new I("AllowMultipleToken"),
        ad = new I("PlatformDestroyListeners"),
        T_ = new I("appBootstrapListener");
      function O_(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new I(r);
        return (i = []) => {
          let s = ud();
          if (!s || s.injector.get(N_, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function GO(e) {
                  if (Cn && !Cn.get(N_, !1)) throw new C(400, !1);
                  (function A_() {
                    !(function ew(e) {
                      Df = e;
                    })(() => {
                      throw new C(600, !1);
                    });
                  })(),
                    (Cn = e);
                  const t = e.get(P_);
                  (function x_(e) {
                    e.get(Mp, null)?.forEach((n) => n());
                  })(e);
                })(
                  (function F_(e = [], t) {
                    return dt.create({
                      name: t,
                      providers: [
                        { provide: sl, useValue: "platform" },
                        { provide: ad, useValue: new Set([() => (Cn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function WO(e) {
            const t = ud();
            if (!t) throw new C(401, !1);
            return t;
          })();
        };
      }
      function ud() {
        return Cn?.get(P_) ?? null;
      }
      let P_ = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function qO(e = "zone.js", t) {
              return "noop" === e ? new nS() : "zone.js" === e ? new ae(t) : e;
            })(
              r?.ngZone,
              (function R_(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return o.run(() => {
              const i = (function QA(e, t, n) {
                  return new Uc(e, t, n);
                })(
                  n.moduleType,
                  this.injector,
                  (function B_(e) {
                    return [
                      { provide: ae, useFactory: e },
                      {
                        provide: No,
                        multi: !0,
                        useFactory: () => {
                          const t = G(QO, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: j_, useFactory: ZO },
                      { provide: lm, useFactory: cm },
                    ];
                  })(() => o)
                ),
                s = i.injector.get(Jt, null);
              return (
                o.runOutsideAngular(() => {
                  const a = o.onError.subscribe({
                    next: (u) => {
                      s.handleError(u);
                    },
                  });
                  i.onDestroy(() => {
                    fa(this._modules, i), a.unsubscribe();
                  });
                }),
                (function k_(e, t, n) {
                  try {
                    const r = n();
                    return oa(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(s, o, () => {
                  const a = i.injector.get(nd);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function Vy(e) {
                          Ke(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Ly = e.toLowerCase().replace(/_/g, "-"));
                        })(i.injector.get(nn, Xr) || Xr),
                        this._moduleDoBootstrap(i),
                        i
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = L_({}, r);
            return (function $O(e, t, n) {
              const r = new Gc(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(hi);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new C(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(ad, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(j(dt));
          });
          static #t = (this.ɵprov = B({
            token: e,
            factory: e.ɵfac,
            providedIn: "platform",
          }));
        }
        return e;
      })();
      function L_(e, t) {
        return Array.isArray(t) ? t.reduce(L_, e) : { ...e, ...t };
      }
      let hi = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = G(j_)),
              (this.zoneIsStable = G(lm)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = G(gO).hasPendingTasks.pipe(
                (function sE(e, t) {
                  return Nn((n, r) => {
                    let o = null,
                      i = 0,
                      s = !1;
                    const a = () => s && !o && r.complete();
                    n.subscribe(
                      sn(
                        r,
                        (u) => {
                          o?.unsubscribe();
                          let l = 0;
                          const c = i++;
                          Mt(e(u, c)).subscribe(
                            (o = sn(
                              r,
                              (d) => r.next(t ? t(u, d, c, l++) : d),
                              () => {
                                (o = null), a();
                              }
                            ))
                          );
                        },
                        () => {
                          (s = !0), a();
                        }
                      )
                    );
                  });
                })((n) =>
                  n
                    ? (function iE(...e) {
                        return cu(e, Zf(e));
                      })(!1)
                    : this.zoneIsStable
                ),
                (function aE(e, t = ru) {
                  return (
                    (e = e ?? uE),
                    Nn((n, r) => {
                      let o,
                        i = !0;
                      n.subscribe(
                        sn(r, (s) => {
                          const a = t(s);
                          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
                        })
                      );
                    })
                  );
                })(),
                Jf()
              )),
              (this._injector = G(Yt));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof wg;
            if (!this._injector.get(nd).done)
              throw (
                (!o &&
                  (function Tn(e) {
                    const t = R(e) || Ie(e) || xe(e);
                    return null !== t && t.standalone;
                  })(n),
                new C(405, !1))
              );
            let s;
            (s = o ? n : this._injector.get(Ns).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function UO(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Wn),
              l = s.create(dt.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(S_, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  fa(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            fa(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(T_, []);
            [...this._bootstrapListeners, ...r].forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => fa(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = B({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function fa(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const j_ = new I("", {
        providedIn: "root",
        factory: () => G(Jt).handleError.bind(void 0),
      });
      function ZO() {
        const e = G(ae),
          t = G(Jt);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let QO = (() => {
        class e {
          constructor() {
            (this.zone = G(ae)), (this.applicationRef = G(hi));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = B({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const n1 = O_(null, "core", []);
      let r1 = (() => {
        class e {
          constructor(n) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(j(hi));
          });
          static #t = (this.ɵmod = dn({ type: e }));
          static #n = (this.ɵinj = zt({}));
        }
        return e;
      })();
      let _d = null;
      function mi() {
        return _d;
      }
      class M1 {}
      const Zn = new I("DocumentToken");
      class gF {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let _D = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new gF(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), DD(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              DD(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(w(Bt), w(tn), w(xs));
          });
          static #t = (this.ɵdir = O({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          }));
        }
        return e;
      })();
      function DD(e, t) {
        e.context.$implicit = t.item;
      }
      let Aa = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new mF()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            CD("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            CD("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(w(Bt), w(tn));
          });
          static #t = (this.ɵdir = O({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          }));
        }
        return e;
      })();
      class mF {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function CD(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${De(t)}'.`
          );
      }
      let ED = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngEl = n),
                (this._differs = r),
                (this._renderer = o),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(n) {
              (this._ngStyle = n),
                !this._differ &&
                  n &&
                  (this._differ = this._differs.find(n).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const n = this._differ.diff(this._ngStyle);
                n && this._applyChanges(n);
              }
            }
            _setStyle(n, r) {
              const [o, i] = n.split("."),
                s = -1 === o.indexOf("-") ? void 0 : yn.DashCase;
              null != r
                ? this._renderer.setStyle(
                    this._ngEl.nativeElement,
                    o,
                    i ? `${r}${i}` : r,
                    s
                  )
                : this._renderer.removeStyle(this._ngEl.nativeElement, o, s);
            }
            _applyChanges(n) {
              n.forEachRemovedItem((r) => this._setStyle(r.key, null)),
                n.forEachAddedItem((r) =>
                  this._setStyle(r.key, r.currentValue)
                ),
                n.forEachChangedItem((r) =>
                  this._setStyle(r.key, r.currentValue)
                );
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(w(Dt), w($o), w(Vn));
            });
            static #t = (this.ɵdir = O({
              type: e,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
              standalone: !0,
            }));
          }
          return e;
        })(),
        UF = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dn({ type: e }));
            static #n = (this.ɵinj = zt({}));
          }
          return e;
        })();
      function MD(e) {
        return "server" === e;
      }
      class yP extends M1 {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class kd extends yP {
        static makeCurrent() {
          !(function b1(e) {
            _d || (_d = e);
          })(new kd());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function vP() {
            return (
              (Di = Di || document.querySelector("base")),
              Di ? Di.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function _P(e) {
                return new URL(e, "http://a").pathname;
              })(n);
        }
        resetBaseElement() {
          Di = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function fF(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Di = null,
        CP = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = B({ token: e, factory: e.ɵfac }));
          }
          return e;
        })();
      const Ld = new I("EventManagerPlugins");
      let AD = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n);
            if (r) return r;
            if (((r = this._plugins.find((i) => i.supports(n))), !r))
              throw new C(5101, !1);
            return this._eventNameToPlugin.set(n, r), r;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(j(Ld), j(ae));
          });
          static #t = (this.ɵprov = B({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class xD {
        constructor(t) {
          this._doc = t;
        }
      }
      const Vd = "ng-app-id";
      let OD = (() => {
        class e {
          constructor(n, r, o, i = {}) {
            (this.doc = n),
              (this.appId = r),
              (this.nonce = o),
              (this.platformId = i),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = MD(i)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((r) => r.remove()), n.clear());
            for (const r of this.getAllStyles()) this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${Vd}="${this.appId}"]`
            );
            if (n?.length) {
              const r = new Map();
              return (
                n.forEach((o) => {
                  null != o.textContent && r.set(o.textContent, o);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(n, r) {
            const o = this.styleRef;
            if (o.has(n)) {
              const i = o.get(n);
              return (i.usage += r), i.usage;
            }
            return o.set(n, { usage: r, elements: [] }), r;
          }
          getStyleElement(n, r) {
            const o = this.styleNodesInDOM,
              i = o?.get(r);
            if (i?.parentNode === n)
              return o.delete(r), i.removeAttribute(Vd), i;
            {
              const s = this.doc.createElement("style");
              return (
                this.nonce && s.setAttribute("nonce", this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute(Vd, this.appId),
                n.appendChild(s),
                s
              );
            }
          }
          addStyleToHost(n, r) {
            const o = this.getStyleElement(n, r),
              i = this.styleRef,
              s = i.get(r)?.elements;
            s ? s.push(o) : i.set(r, { elements: [o], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(j(Zn), j(us), j(Sp, 8), j(br));
          });
          static #t = (this.ɵprov = B({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const jd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Bd = /%COMP%/g,
        bP = new I("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !0,
        });
      function PD(e, t) {
        return t.map((n) => n.replace(Bd, e));
      }
      let RD = (() => {
        class e {
          constructor(n, r, o, i, s, a, u, l = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestroy = i),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = u),
              (this.nonce = l),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = MD(a)),
              (this.defaultRenderer = new Hd(n, s, u, this.platformIsServer));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === mt.ShadowDom &&
              (r = { ...r, encapsulation: mt.Emulated });
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof LD
                ? o.applyToHost(n)
                : o instanceof $d && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.doc,
                a = this.ngZone,
                u = this.eventManager,
                l = this.sharedStylesHost,
                c = this.removeStylesOnCompDestroy,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case mt.Emulated:
                  i = new LD(u, l, r, this.appId, c, s, a, d);
                  break;
                case mt.ShadowDom:
                  return new TP(u, l, n, r, s, a, this.nonce, d);
                default:
                  i = new $d(u, l, r, c, s, a, d);
              }
              o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(
              j(AD),
              j(OD),
              j(us),
              j(bP),
              j(Zn),
              j(br),
              j(ae),
              j(Sp)
            );
          });
          static #t = (this.ɵprov = B({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class Hd {
        constructor(t, n, r, o) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.throwOnSyntheticProps = !0),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(jd[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (kD(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (kD(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new C(-5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = jd[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = jd[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (yn.DashCase | yn.Important)
            ? t.style.setProperty(n, r, o & yn.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & yn.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          null != t && (t[n] = r);
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            "string" == typeof t &&
            !(t = mi().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ("__ngUnwrap__" === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function kD(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class TP extends Hd {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, u),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const l = PD(o.id, o.styles);
          for (const c of l) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = c),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class $d extends Hd {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = u ? PD(u, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class LD extends $d {
        constructor(t, n, r, o, i, s, a, u) {
          const l = o + "-" + r.id;
          super(t, n, r, i, s, a, u, l),
            (this.contentAttr = (function MP(e) {
              return "_ngcontent-%COMP%".replace(Bd, e);
            })(l)),
            (this.hostAttr = (function SP(e) {
              return "_nghost-%COMP%".replace(Bd, e);
            })(l));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let AP = (() => {
        class e extends xD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(j(Zn));
          });
          static #t = (this.ɵprov = B({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const VD = ["alt", "control", "meta", "shift"],
        xP = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        OP = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let FP = (() => {
        class e extends xD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => mi().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              VD.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = xP[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                VD.forEach((s) => {
                  s !== o && (0, OP[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(j(Zn));
          });
          static #t = (this.ɵprov = B({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const LP = O_(n1, "browser", [
          { provide: br, useValue: "browser" },
          {
            provide: Mp,
            useValue: function PP() {
              kd.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Zn,
            useFactory: function kP() {
              return (
                (function gb(e) {
                  fl = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        VP = new I(""),
        HD = [
          {
            provide: da,
            useClass: class DP {
              addToWindow(t) {
                (te.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i) throw new C(5103, !1);
                  return i;
                }),
                  (te.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (te.getAllAngularRootElements = () => t.getAllRootElements()),
                  te.frameworkStabilizers || (te.frameworkStabilizers = []),
                  te.frameworkStabilizers.push((r) => {
                    const o = te.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach((u) => {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? mi().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: S_, useClass: od, deps: [ae, id, da] },
          { provide: od, useClass: od, deps: [ae, id, da] },
        ],
        $D = [
          { provide: sl, useValue: "root" },
          {
            provide: Jt,
            useFactory: function RP() {
              return new Jt();
            },
            deps: [],
          },
          { provide: Ld, useClass: AP, multi: !0, deps: [Zn, ae, br] },
          { provide: Ld, useClass: FP, multi: !0, deps: [Zn] },
          RD,
          OD,
          AD,
          { provide: Ig, useExisting: RD },
          { provide: class ZF {}, useClass: CP, deps: [] },
          [],
        ];
      let jP = (() => {
        class e {
          constructor(n) {}
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [{ provide: us, useValue: n.appId }],
            };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(j(VP, 12));
          });
          static #t = (this.ɵmod = dn({ type: e }));
          static #n = (this.ɵinj = zt({
            providers: [...$D, ...HD],
            imports: [UF, r1],
          }));
        }
        return e;
      })();
      typeof window < "u" && window;
      const { isArray: WP } = Array,
        { getPrototypeOf: qP, prototype: ZP, keys: QP } = Object;
      const { isArray: JP } = Array;
      function tR(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function nR(...e) {
        const t = (function Qw(e) {
            return _e(lu(e)) ? e.pop() : void 0;
          })(e),
          { args: n, keys: r } = (function YP(e) {
            if (1 === e.length) {
              const t = e[0];
              if (WP(t)) return { args: t, keys: null };
              if (
                (function KP(e) {
                  return e && "object" == typeof e && qP(e) === ZP;
                })(t)
              ) {
                const n = QP(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e),
          o = new He((i) => {
            const { length: s } = n;
            if (!s) return void i.complete();
            const a = new Array(s);
            let u = s,
              l = s;
            for (let c = 0; c < s; c++) {
              let d = !1;
              Mt(n[c]).subscribe(
                sn(
                  i,
                  (f) => {
                    d || ((d = !0), l--), (a[c] = f);
                  },
                  () => u--,
                  void 0,
                  () => {
                    (!u || !d) && (l || i.next(r ? tR(r, a) : a), i.complete());
                  }
                )
              );
            }
          });
        return t
          ? o.pipe(
              (function eR(e) {
                return ou((t) =>
                  (function XP(e, t) {
                    return JP(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(t)
            )
          : o;
      }
      let WD = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(w(Vn), w(Dt));
            });
            static #t = (this.ɵdir = O({ type: e }));
          }
          return e;
        })(),
        Qn = (() => {
          class e extends WD {
            static #e = (this.ɵfac = (() => {
              let n;
              return function (o) {
                return (
                  n ||
                  (n = (function Ve(e) {
                    return Wt(() => {
                      const t = e.prototype.constructor,
                        n = t[Gt] || Zu(t),
                        r = Object.prototype;
                      let o = Object.getPrototypeOf(e.prototype).constructor;
                      for (; o && o !== r; ) {
                        const i = o[Gt] || Zu(o);
                        if (i && i !== n) return i;
                        o = Object.getPrototypeOf(o);
                      }
                      return (i) => new i();
                    });
                  })(e))
                )(o || e);
              };
            })());
            static #t = (this.ɵdir = O({ type: e, features: [Q] }));
          }
          return e;
        })();
      const Ut = new I("NgValueAccessor"),
        oR = { provide: Ut, useExisting: ee(() => Ci), multi: !0 },
        sR = new I("CompositionEventMode");
      let Ci = (() => {
        class e extends WD {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function iR() {
                  const e = mi() ? mi().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(w(Vn), w(Dt), w(sR, 8));
          });
          static #t = (this.ɵdir = O({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (r, o) {
              1 & r &&
                K("input", function (s) {
                  return o._handleInput(s.target.value);
                })("blur", function () {
                  return o.onTouched();
                })("compositionstart", function () {
                  return o._compositionStart();
                })("compositionend", function (s) {
                  return o._compositionEnd(s.target.value);
                });
            },
            features: [ue([oR]), Q],
          }));
        }
        return e;
      })();
      const Be = new I("NgValidators"),
        In = new I("NgAsyncValidators");
      function rC(e) {
        return null != e;
      }
      function oC(e) {
        return oa(e) ? cu(e) : e;
      }
      function iC(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function sC(e, t) {
        return t.map((n) => n(e));
      }
      function aC(e) {
        return e.map((t) =>
          (function uR(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function Gd(e) {
        return null != e
          ? (function uC(e) {
              if (!e) return null;
              const t = e.filter(rC);
              return 0 == t.length
                ? null
                : function (n) {
                    return iC(sC(n, t));
                  };
            })(aC(e))
          : null;
      }
      function zd(e) {
        return null != e
          ? (function lC(e) {
              if (!e) return null;
              const t = e.filter(rC);
              return 0 == t.length
                ? null
                : function (n) {
                    return nR(sC(n, t).map(oC)).pipe(ou(iC));
                  };
            })(aC(e))
          : null;
      }
      function cC(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function Wd(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Pa(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function hC(e, t) {
        const n = Wd(t);
        return (
          Wd(e).forEach((o) => {
            Pa(n, o) || n.push(o);
          }),
          n
        );
      }
      function pC(e, t) {
        return Wd(t).filter((n) => !Pa(e, n));
      }
      class gC {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = Gd(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = zd(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t = void 0) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class Ye extends gC {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class bn extends gC {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class mC {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let qd = (() => {
        class e extends mC {
          constructor(n) {
            super(n);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(w(bn, 2));
          });
          static #t = (this.ɵdir = O({
            type: e,
            selectors: [
              ["", "formControlName", ""],
              ["", "ngModel", ""],
              ["", "formControl", ""],
            ],
            hostVars: 14,
            hostBindings: function (r, o) {
              2 & r &&
                Hs("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)(
                  "ng-pristine",
                  o.isPristine
                )("ng-dirty", o.isDirty)("ng-valid", o.isValid)(
                  "ng-invalid",
                  o.isInvalid
                )("ng-pending", o.isPending);
            },
            features: [Q],
          }));
        }
        return e;
      })();
      const wi = "VALID",
        ka = "INVALID",
        io = "PENDING",
        Ei = "DISABLED";
      function La(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class DC {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === wi;
        }
        get invalid() {
          return this.status === ka;
        }
        get pending() {
          return this.status == io;
        }
        get disabled() {
          return this.status === Ei;
        }
        get enabled() {
          return this.status !== Ei;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(hC(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(hC(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(pC(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(pC(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return Pa(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return Pa(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = io),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = Ei),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = wi),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === wi || this.status === io) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Ei : wi;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = io), (this._hasOwnPendingAsyncValidator = !0);
            const n = oC(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
            ? null
            : n.reduce((r, o) => r && r._find(o), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new me()), (this.statusChanges = new me());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Ei
            : this.errors
            ? ka
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(io)
            ? io
            : this._anyControlsHaveStatus(ka)
            ? ka
            : wi;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          La(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function hR(e) {
              return Array.isArray(e) ? Gd(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function pR(e) {
              return Array.isArray(e) ? zd(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      const so = new I("CallSetDisabledState", {
          providedIn: "root",
          factory: () => Va,
        }),
        Va = "always";
      function Ii(e, t, n = Va) {
        (function Xd(e, t) {
          const n = (function dC(e) {
            return e._rawValidators;
          })(e);
          null !== t.validator
            ? e.setValidators(cC(n, t.validator))
            : "function" == typeof n && e.setValidators([n]);
          const r = (function fC(e) {
            return e._rawAsyncValidators;
          })(e);
          null !== t.asyncValidator
            ? e.setAsyncValidators(cC(r, t.asyncValidator))
            : "function" == typeof r && e.setAsyncValidators([r]);
          const o = () => e.updateValueAndValidity();
          Ha(t._rawValidators, o), Ha(t._rawAsyncValidators, o);
        })(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === n) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function yR(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && CC(e, t);
            });
          })(e, t),
          (function _R(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function vR(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && CC(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function mR(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function Ha(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function CC(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function IC(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function bC(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const MC = class extends DC {
          constructor(t = null, n, r) {
            super(
              (function Yd(e) {
                return (La(e) ? e.validators : e) || null;
              })(n),
              (function Kd(e, t) {
                return (La(t) ? t.asyncValidators : e) || null;
              })(r, n)
            ),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(t),
              this._setUpdateStrategy(n),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              La(n) &&
                (n.nonNullable || n.initialValueIsDefault) &&
                (this.defaultValue = bC(t) ? t.value : t);
          }
          setValue(t, n = {}) {
            (this.value = this._pendingValue = t),
              this._onChange.length &&
                !1 !== n.emitModelToViewChange &&
                this._onChange.forEach((r) =>
                  r(this.value, !1 !== n.emitViewToModelChange)
                ),
              this.updateValueAndValidity(n);
          }
          patchValue(t, n = {}) {
            this.setValue(t, n);
          }
          reset(t = this.defaultValue, n = {}) {
            this._applyFormState(t),
              this.markAsPristine(n),
              this.markAsUntouched(n),
              this.setValue(this.value, n),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(t) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(t) {
            this._onChange.push(t);
          }
          _unregisterOnChange(t) {
            IC(this._onChange, t);
          }
          registerOnDisabledChange(t) {
            this._onDisabledChange.push(t);
          }
          _unregisterOnDisabledChange(t) {
            IC(this._onDisabledChange, t);
          }
          _forEachChild(t) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(t) {
            bC(t)
              ? ((this.value = this._pendingValue = t.value),
                t.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = t);
          }
        },
        SR = { provide: bn, useExisting: ee(() => Ua) },
        TC = (() => Promise.resolve())();
      let Ua = (() => {
          class e extends bn {
            constructor(n, r, o, i, s, a) {
              super(),
                (this._changeDetectorRef = s),
                (this.callSetDisabledState = a),
                (this.control = new MC()),
                (this._registered = !1),
                (this.name = ""),
                (this.update = new me()),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function nf(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === Ci
                        ? (n = i)
                        : (function wR(e) {
                            return Object.getPrototypeOf(e.constructor) === Qn;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function tf(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              Ii(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              TC.then(() => {
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(n) {
              const r = n.isDisabled.currentValue,
                o =
                  0 !== r &&
                  (function vd(e) {
                    return "boolean" == typeof e
                      ? e
                      : null != e && "false" !== e;
                  })(r);
              TC.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function ja(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(
                w(Ye, 9),
                w(Be, 10),
                w(In, 10),
                w(Ut, 10),
                w(ic, 8),
                w(so, 8)
              );
            });
            static #t = (this.ɵdir = O({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [ue([SR]), Q, qt],
            }));
          }
          return e;
        })(),
        xC = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dn({ type: e }));
            static #n = (this.ɵinj = zt({}));
          }
          return e;
        })(),
        JR = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dn({ type: e }));
            static #n = (this.ɵinj = zt({ imports: [xC] }));
          }
          return e;
        })(),
        ek = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: so, useValue: n.callSetDisabledState ?? Va },
                ],
              };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dn({ type: e }));
            static #n = (this.ɵinj = zt({ imports: [JR] }));
          }
          return e;
        })();
      function tk(e, t) {
        if (1 & e) {
          const n = Gn();
          q(0, "div", 4)(1, "button", 5),
            We(2, "RU"),
            $(),
            q(3, "h3", 6),
            We(4, "\u0417\u0430\u043c\u0435\u0442\u043a\u0438"),
            $(),
            q(5, "button", 7),
            K("click", function () {
              return it(n), st(Pe().openSearchMode());
            }),
            $t(6, "img", 8),
            $()();
        }
      }
      function nk(e, t) {
        if (1 & e) {
          const n = Gn();
          q(0, "div", 9)(1, "button", 10),
            K("click", function () {
              return it(n), st((Pe().searchActivated = !1));
            }),
            $t(2, "img", 11),
            $(),
            q(3, "input", 12, 13),
            K("ngModelChange", function (o) {
              return it(n), st((Pe().searchInput = o));
            })("input", function () {
              return it(n), st(Pe().onEmitSearch());
            }),
            $(),
            q(5, "button", 14),
            K("click", function () {
              it(n);
              const o = (function wv(e) {
                return (function cr(e, t) {
                  return e[t];
                })(
                  (function uI() {
                    return N.lFrame.contextLView;
                  })(),
                  x + e
                );
              })(4);
              return st(Pe().logSearchElement(o));
            }),
            We(6, "click"),
            $(),
            q(7, "button", 10),
            K("click", function () {
              return it(n), st((Pe().searchInput = ""));
            }),
            $t(8, "img", 15),
            $()();
        }
        if (2 & e) {
          const n = Pe();
          Se(3), Fe("ngModel", n.searchInput);
        }
      }
      let rk = (() => {
          class e {
            constructor() {
              (this.searchActivated = !1),
                (this.emitSearch = new me()),
                (this.searchInput = ""),
                (this.navbar = ["Home", "About", "Contacts", "Reviews"]);
            }
            openSearchMode() {
              this.searchActivated = !0;
            }
            onEmitSearch() {
              this.emitSearch.emit(this.searchInput);
            }
            logSearchElement(n) {
              console.log(n.value);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = rr({
              type: e,
              selectors: [["app-header"]],
              outputs: { emitSearch: "emitSearch" },
              decls: 4,
              vars: 2,
              consts: [
                [1, "header"],
                [1, "header-inner"],
                ["class", "header-inner-top", 4, "ngIf"],
                ["class", "header-inner-searchArea", 4, "ngIf"],
                [1, "header-inner-top"],
                [1, "header-inner-top__langBtn"],
                [1, "header-inner-top__title"],
                [1, "header-inner-top__searchBtn", 3, "click"],
                ["src", "../../assets/images/searchIcon.svg", "alt", ""],
                [1, "header-inner-searchArea"],
                [1, "header-inner-searchArea__btn", 3, "click"],
                ["src", "../../assets/images/cancelSearchBtn.svg", "alt", ""],
                [
                  "type",
                  "text",
                  "placeholder",
                  "\u041f\u043e\u0438\u0441\u043a...",
                  1,
                  "header-inner-searchArea__input",
                  3,
                  "ngModel",
                  "ngModelChange",
                  "input",
                ],
                ["searchElement", ""],
                [3, "click"],
                ["src", "../../assets/images/closeSearch.svg", "alt", ""],
              ],
              template: function (r, o) {
                1 & r &&
                  (q(0, "header", 0)(1, "div", 1),
                  Ht(2, tk, 7, 0, "div", 2)(3, nk, 9, 1, "div", 3),
                  $()()),
                  2 & r &&
                    (Se(2),
                    Fe("ngIf", !o.searchActivated),
                    Se(1),
                    Fe("ngIf", o.searchActivated));
              },
              dependencies: [Aa, Ci, qd, Ua],
              styles: [
                ".header[_ngcontent-%COMP%]{background:#F3EDF7;box-shadow:0 1px 3px #0000004d,0 4px 4px #00000040;margin-bottom:30px}.header-inner-top[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:14px 16px}.header-inner-top__langBtn[_ngcontent-%COMP%], .header-inner-top__searchBtn[_ngcontent-%COMP%]{background:none;outline:none;border:none;font-size:25px}.header-inner-top__title[_ngcontent-%COMP%]{font-family:RM,sans-serif;font-size:22px;font-style:normal;font-weight:400;line-height:28px}.header-inner-searchArea[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:14px}.header-inner-searchArea__input[_ngcontent-%COMP%]{background:none;outline:none;border:none;width:50%;display:flex;justify-content:flex-start;padding:15px;color:#1c1b1f;font-family:RR,sans-serif;font-size:18px;font-weight:400;line-height:28px}.header-inner-searchArea__input[_ngcontent-%COMP%]::placeholder{color:#9d9d9d;text-align:left;font-family:RR,sans-serif;font-size:16px;font-style:normal;font-weight:400;line-height:20px}.header-inner-searchArea__btn[_ngcontent-%COMP%]{background:none;border:none}",
              ],
            }));
          }
          return e;
        })(),
        ok = (() => {
          class e {
            constructor() {
              (this.emitIndex = new me()),
                (this.noteDeleted = new me()),
                (this.storage = localStorage);
            }
            deleteNote() {
              let n = JSON.parse(this.storage.getItem("notes")) || [];
              n.splice(this.i, 1),
                this.storage.setItem("notes", JSON.stringify(n)),
                this.noteDeleted.emit();
            }
            editNote() {
              JSON.parse(this.storage.getItem("notes")),
                this.emitIndex.emit(this.i);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = rr({
              type: e,
              selectors: [["app-mainNote"]],
              inputs: { note: "note", i: "i" },
              outputs: { emitIndex: "emitIndex", noteDeleted: "noteDeleted" },
              decls: 15,
              vars: 3,
              consts: [
                [1, "mainNote"],
                [1, "mainNote-inner"],
                [1, "mainNote-inner__title"],
                [1, "mainNote-inner__date"],
                [1, "mainNote-inner__text"],
                [1, "mainNote-inner-btns"],
                [1, "mainNote-inner-btns__edit", 3, "click"],
                [
                  "src",
                  "../../../assets/images/editIcon.svg",
                  "alt",
                  "",
                  "srcset",
                  "",
                ],
                [1, "mainNote-inner-btns__delete", 3, "click"],
                [
                  "src",
                  "../../../assets/images/deleteItem.svg",
                  "alt",
                  "",
                  "srcset",
                  "",
                ],
              ],
              template: function (r, o) {
                1 & r &&
                  (q(0, "div", 0)(1, "div", 1)(2, "h4", 2),
                  We(3),
                  $(),
                  q(4, "p", 3),
                  We(5),
                  $(),
                  q(6, "p", 4),
                  We(7),
                  $(),
                  q(8, "div", 5)(9, "button", 6),
                  K("click", function () {
                    return o.editNote();
                  }),
                  $t(10, "img", 7),
                  We(
                    11,
                    " \u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c "
                  ),
                  $(),
                  q(12, "button", 8),
                  K("click", function () {
                    return o.deleteNote();
                  }),
                  $t(13, "img", 9),
                  We(14, " \u0423\u0434\u0430\u043b\u0438\u0442\u044c "),
                  $()()()()),
                  2 & r &&
                    (Se(3),
                    eo(o.note.name),
                    Se(2),
                    eo(o.note.date),
                    Se(2),
                    eo(o.note.value));
              },
              styles: [
                ".mainNote[_ngcontent-%COMP%]{border-radius:16px;background:linear-gradient(0deg,rgba(103,80,164,.05) 0%,rgba(103,80,164,.05) 100%),#FFFBFE;box-shadow:0 1px 3px 1px #00000026,0 1px 2px #0000004d}.mainNote-inner[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;padding:16px}.mainNote-inner__title[_ngcontent-%COMP%]{color:#1c1b1f;font-family:RM,sans-serif;font-size:16px;font-style:normal;font-weight:500;line-height:24px;letter-spacing:.1px}.mainNote-inner__date[_ngcontent-%COMP%]{color:#cac4d0;font-family:RR,sans-serif;font-size:14px;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.25px;margin-bottom:16px}.mainNote-inner__text[_ngcontent-%COMP%]{color:#49454f;font-family:RR,sans-serif;font-size:14px;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.25px;margin-bottom:17px;width:90%}.mainNote-inner-btns[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:flex-end}.mainNote-inner-btns__edit[_ngcontent-%COMP%]{color:#6750a4;text-align:center;font-family:RM,sans-serif;font-size:14px;font-style:normal;font-weight:500;line-height:20px;letter-spacing:.1px;text-transform:uppercase;padding:10px 12px;border:none;background:none;transition:.2s;display:flex;align-items:center;gap:8px}@media screen and (max-width: 400px){.mainNote-inner-btns__edit[_ngcontent-%COMP%]{font-size:11px}}.mainNote-inner-btns__edit[_ngcontent-%COMP%]:hover{border-radius:5px;background:#E6DDFF}.mainNote-inner-btns__delete[_ngcontent-%COMP%]{color:#cf1b1b;text-align:center;font-family:RM,sans-serif;font-size:14px;font-style:normal;font-weight:500;line-height:20px;letter-spacing:.1px;text-transform:uppercase;border:none;background:none;padding:10px 12px;transition:.2s;display:flex;align-items:center;gap:8px}@media screen and (max-width: 400px){.mainNote-inner-btns__delete[_ngcontent-%COMP%]{font-size:11px}}.mainNote-inner-btns__delete[_ngcontent-%COMP%]:hover{border-radius:5px;background:#FFE1E1}@media screen and (max-width: 400px){.mainNote-inner-btns[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:15px}}",
              ],
            }));
          }
          return e;
        })();
      function ik(e, t) {
        if (1 & e) {
          const n = Gn();
          q(0, "button", 8),
            K("click", function () {
              it(n);
              const o = Pe();
              return st(o.addNote(o.noteName, o.noteValue));
            }),
            We(1, "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"),
            $();
        }
      }
      function sk(e, t) {
        if (1 & e) {
          const n = Gn();
          q(0, "button", 8),
            K("click", function () {
              it(n);
              const o = Pe();
              return st(o.editNote(o.currItemIndex, o.noteName, o.noteValue));
            }),
            We(
              1,
              "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"
            ),
            $();
        }
      }
      let ak = (() => {
        class e {
          constructor() {
            (this.modal = !0),
              (this.storage = localStorage),
              (this.noteName = ""),
              (this.noteValue = ""),
              (this.currItemIndex = ""),
              (this.addBtn = !0),
              (this.modalChanged = new me()),
              (this.noteEdited = new me());
          }
          addNote(n, r) {
            let o = JSON.parse(this.storage.getItem("notes")) || [],
              i = {
                name: n,
                value: r,
                date: `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`,
              };
            o.push(i),
              this.storage.setItem("notes", JSON.stringify(o)),
              (this.noteName = ""),
              (this.noteValue = ""),
              this.noteEdited.emit();
          }
          editNote(n, r, o) {
            let i = JSON.parse(this.storage.getItem("notes")) || [];
            (i[n].name = r),
              (i[n].value = o),
              this.storage.setItem("notes", JSON.stringify(i)),
              console.log(n, r, o),
              this.noteEdited.emit();
          }
          closeModal() {
            this.modal = !1;
          }
          onModalChanged() {
            this.modalChanged.emit(this.modal);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = rr({
            type: e,
            selectors: [["app-editNote"]],
            inputs: { currItemIndex: "currItemIndex", addBtn: "addBtn" },
            outputs: { modalChanged: "modalChanged", noteEdited: "noteEdited" },
            decls: 11,
            vars: 5,
            consts: [
              [1, "editNote"],
              [1, "editNote-inner"],
              [1, "editNote-inner__title"],
              [
                "type",
                "text",
                "placeholder",
                "Title",
                1,
                "editNote-inner__name",
                "editNote-inner__input",
                3,
                "ngModel",
                "ngModelChange",
              ],
              [
                "type",
                "text",
                "placeholder",
                "Content",
                1,
                "editNote-inner__value",
                "editNote-inner__input",
                3,
                "ngModel",
                "ngModelChange",
              ],
              [1, "editNote-inner-btns"],
              [1, "editNote-inner-btns__cancel", 3, "click"],
              ["class", "editNote-inner-btns__add", 3, "click", 4, "ngIf"],
              [1, "editNote-inner-btns__add", 3, "click"],
            ],
            template: function (r, o) {
              1 & r &&
                (q(0, "div", 0)(1, "div", 1)(2, "h3", 2),
                We(3),
                $(),
                q(4, "input", 3),
                K("ngModelChange", function (s) {
                  return (o.noteName = s);
                }),
                $(),
                q(5, "input", 4),
                K("ngModelChange", function (s) {
                  return (o.noteValue = s);
                }),
                $(),
                q(6, "div", 5)(7, "button", 6),
                K("click", function () {
                  return o.closeModal(), o.onModalChanged();
                }),
                We(8, "\u041e\u0442\u043c\u0435\u043d\u0430"),
                $(),
                Ht(9, ik, 2, 0, "button", 7)(10, sk, 2, 0, "button", 7),
                $()()()),
                2 & r &&
                  (Se(3),
                  ia(
                    "",
                    o.addBtn
                      ? "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"
                      : "\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c",
                    " \u0417\u0430\u043c\u0435\u0442\u043a\u0443"
                  ),
                  Se(1),
                  Fe("ngModel", o.noteName),
                  Se(1),
                  Fe("ngModel", o.noteValue),
                  Se(4),
                  Fe("ngIf", o.addBtn),
                  Se(1),
                  Fe("ngIf", !o.addBtn));
            },
            dependencies: [Aa, Ci, qd, Ua],
            styles: [
              ".editNote[_ngcontent-%COMP%]{background:white;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.35);height:100vh;width:100vw;position:fixed;top:0;left:0}.editNote-inner[_ngcontent-%COMP%]{border-radius:20px;padding:24px;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:16px;width:312px;height:288px;background:#EEE8F4}.editNote-inner__title[_ngcontent-%COMP%]{color:#1c1b1f;font-family:RR,sans-serif;font-size:24px;font-style:normal;font-weight:400;line-height:32px}.editNote-inner__input[_ngcontent-%COMP%]{padding:8px 32px;border:none;outline:none;border-bottom:2px solid black;border-radius:4px 4px 0 0;background:var(--m-3-sys-light-surface-variant, #E7E0EC)}.editNote-inner__input[_ngcontent-%COMP%]::placeholder{color:#49454f;font-family:RR,sans-serif;font-size:16px;font-style:normal;font-weight:400;line-height:24px;letter-spacing:.5px}.editNote-inner-btns[_ngcontent-%COMP%]{width:100%;margin-top:8px;display:flex;justify-content:flex-end;gap:6px}.editNote-inner-btns__cancel[_ngcontent-%COMP%]{color:#cf1b1b;text-align:center;font-family:RM,sans-serif;font-size:14px;font-weight:500;line-height:20px;text-transform:uppercase;background:none;border:none;outline:none;padding:10px 12px}.editNote-inner-btns__cancel[_ngcontent-%COMP%]:hover{background:#FFE1E1}.editNote-inner-btns__add[_ngcontent-%COMP%]{color:#6750a4;text-align:center;font-family:RM,sans-serif;font-size:14px;font-weight:500;line-height:20px;text-transform:uppercase;background:none;border:none;outline:none;padding:10px 12px}.editNote-inner-btns__add[_ngcontent-%COMP%]:hover{background:#E6DDFF}",
            ],
          }));
        }
        return e;
      })();
      function uk(e, t) {
        if (1 & e) {
          const n = Gn();
          q(0, "app-mainNote", 13),
            K("emitIndex", function (o) {
              return it(n), st(Pe(2).onItemClicked(o));
            })("noteDeleted", function () {
              return it(n), st(Pe(2).onNoteDeleted());
            }),
            $();
        }
        if (2 & e) {
          const n = Pe(),
            o = n.index;
          Fe("note", n.$implicit)("i", o);
        }
      }
      function lk(e, t) {
        if (
          (1 & e && (Js(0, 11), Ht(1, uk, 1, 2, "app-mainNote", 12), Xs()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = Pe();
          Se(1),
            Fe(
              "ngIf",
              "" === r.searchInput ||
                (n.name.toLowerCase().includes(r.searchInput) && n.isVisible)
            );
        }
      }
      function ck(e, t) {
        if (1 & e) {
          const n = Gn();
          q(0, "app-editNote", 14),
            K("modalChanged", function (o) {
              return it(n), st(Pe().onModalChanged(o));
            })("noteEdited", function () {
              return it(n), st(Pe().onNoteEditedorAdded());
            }),
            $();
        }
        if (2 & e) {
          const n = Pe();
          Fe("currItemIndex", n.currItemIndex)("addBtn", n.addBtn);
        }
      }
      const dk = (e) => ({ "grid-template-columns": e });
      let fk = (() => {
          class e {
            constructor() {
              (this.storage = localStorage),
                (this.notesArr = []),
                (this.currItemIndex = 0),
                (this.addBtn = !0),
                (this.grid = !0),
                (this.searchInput = "");
            }
            onModalChanged(n) {
              (this.modal = n), console.log(this.modal);
            }
            openModal() {
              (this.modal = !0), (this.addBtn = !0);
            }
            onItemClicked(n) {
              (this.currItemIndex = n),
                (this.modal = !0),
                (this.addBtn = !1),
                console.log(this.currItemIndex);
            }
            changeView() {
              this.grid = !this.grid;
            }
            onNoteDeleted() {
              this.notesArr = this.getUpdatedNotes();
            }
            onNoteEditedorAdded() {
              (this.notesArr = this.getUpdatedNotes()), (this.modal = !1);
            }
            getUpdatedNotes() {
              return JSON.parse(this.storage.getItem("notes")) || [];
            }
            ngOnInit() {
              this.notesArr = this.getUpdatedNotes();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = rr({
              type: e,
              selectors: [["app-main"]],
              inputs: { searchInput: "searchInput" },
              decls: 14,
              vars: 7,
              consts: [
                [1, "main"],
                [1, "main-inner", "container"],
                [1, "main-inner-top"],
                [1, "main-inner-top__title"],
                [1, "main-inner-top__modeToggleBtn", 3, "click"],
                ["alt", "", 3, "src"],
                [1, "main-inner-notes", 3, "ngStyle"],
                ["class", "main-inner-notes__item", 4, "ngFor", "ngForOf"],
                [1, "main-inner__addBtn", 3, "click"],
                ["src", "../../assets/images/addBtnIcon.svg", "alt", ""],
                [
                  3,
                  "currItemIndex",
                  "addBtn",
                  "modalChanged",
                  "noteEdited",
                  4,
                  "ngIf",
                ],
                [1, "main-inner-notes__item"],
                [
                  "d",
                  "",
                  3,
                  "note",
                  "i",
                  "emitIndex",
                  "noteDeleted",
                  4,
                  "ngIf",
                ],
                ["d", "", 3, "note", "i", "emitIndex", "noteDeleted"],
                [3, "currItemIndex", "addBtn", "modalChanged", "noteEdited"],
              ],
              template: function (r, o) {
                1 & r &&
                  (q(0, "main", 0)(1, "div", 1)(2, "div", 2)(3, "h3", 3),
                  We(
                    4,
                    "\u0412\u0441\u0435 \u0437\u0430\u043c\u0435\u0442\u043a\u0438"
                  ),
                  $(),
                  q(5, "button", 4),
                  K("click", function () {
                    return o.changeView();
                  }),
                  $t(6, "img", 5),
                  q(7, "span"),
                  We(8),
                  $()()(),
                  q(9, "div", 6),
                  Ht(10, lk, 2, 1, "ng-container", 7),
                  $(),
                  q(11, "button", 8),
                  K("click", function () {
                    return o.openModal();
                  }),
                  $t(12, "img", 9),
                  $()(),
                  Ht(13, ck, 1, 2, "app-editNote", 10),
                  $()),
                  2 & r &&
                    (Se(6),
                    Fe(
                      "src",
                      o.grid
                        ? "../../assets/images/modeToggleList.svg"
                        : "../../assets/images/modeToggleGrid.svg",
                      Pl
                    ),
                    Se(2),
                    eo(
                      o.grid
                        ? "\u0421\u043f\u0438\u0441\u043e\u043a"
                        : "\u0421\u0435\u0442\u043a\u0430"
                    ),
                    Se(1),
                    Fe("ngStyle", Yv(5, dk, o.grid ? "1fr 1fr 1fr" : "1fr")),
                    Se(1),
                    Fe("ngForOf", o.notesArr),
                    Se(3),
                    Fe("ngIf", o.modal));
              },
              dependencies: [_D, Aa, ED, ok, ak],
              styles: [
                ".main-inner-top[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px}@media screen and (max-width: 712px){.main-inner-top[_ngcontent-%COMP%]{justify-content:center}}.main-inner-top__title[_ngcontent-%COMP%]{color:#323232;font-family:RR,sans-serif;font-size:22px;font-style:normal;font-weight:400;line-height:28px}.main-inner-top__modeToggleBtn[_ngcontent-%COMP%]{border-radius:16px;padding:16px;border:none;display:flex;align-items:center;gap:12px;background:linear-gradient(0deg,rgba(103,80,164,.11) 0%,rgba(103,80,164,.11) 100%),#FFFBFE;box-shadow:0 1px 3px #0000004d,0 4px 8px 3px #00000026}@media screen and (max-width: 712px){.main-inner-top__modeToggleBtn[_ngcontent-%COMP%]{display:none}}.main-inner-top__modeToggleBtn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#6750a4;text-align:center;font-family:RR,sans-serif;font-size:14px;font-style:normal;font-weight:500;line-height:20px;letter-spacing:.1px}.main-inner-notes[_ngcontent-%COMP%]{display:grid;gap:24px}@media screen and (max-width: 1110px){.main-inner-notes[_ngcontent-%COMP%]{grid-template-columns:1fr 1fr!important}}@media screen and (max-width: 712px){.main-inner-notes[_ngcontent-%COMP%]{grid-template-columns:1fr!important}}.main-inner__addBtn[_ngcontent-%COMP%]{border:none;border-radius:16px;padding:16px;position:fixed;bottom:30px;right:30px;background:linear-gradient(0deg,rgba(103,80,164,.11) 0%,rgba(103,80,164,.11) 100%),#FFFBFE;box-shadow:4px 4px 8px #223c5040}",
              ],
            }));
          }
          return e;
        })(),
        hk = (() => {
          class e {
            constructor() {
              (this.title = "todolist"), (this.searchInput = "");
            }
            ngOnInit() {
              localStorage.getItem("notes") ||
                localStorage.setItem("notes", "[]");
            }
            onSearchEmitted(n) {
              this.searchInput = n;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = rr({
              type: e,
              selectors: [["app-root"]],
              decls: 3,
              vars: 1,
              consts: [
                [3, "emitSearch"],
                [3, "searchInput"],
              ],
              template: function (r, o) {
                1 & r &&
                  (q(0, "div")(1, "app-header", 0),
                  K("emitSearch", function (s) {
                    return o.onSearchEmitted(s);
                  }),
                  $(),
                  $t(2, "app-main", 1),
                  $()),
                  2 & r && (Se(2), Fe("searchInput", o.searchInput));
              },
              dependencies: [rk, fk],
            }));
          }
          return e;
        })(),
        pk = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dn({ type: e, bootstrap: [hk] }));
            static #n = (this.ɵinj = zt({ imports: [jP, ek] }));
          }
          return e;
        })();
      LP()
        .bootstrapModule(pk)
        .catch((e) => console.error(e));
    },
  },
  (Ga) => {
    Ga((Ga.s = 752));
  },
]);
