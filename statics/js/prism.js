/* PrismJS 1.15.0
https://prismjs.com/download.html#themes=prism&languages=bash+python&plugins=command-line */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
        var e = /\blang(?:uage)?-([\w-]+)\b/i, t = 0, n = _self.Prism = {
            manual: _self.Prism && _self.Prism.manual,
            disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
            util: {
                encode: function (e) {
                    return e instanceof r ? new r(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                }, type: function (e) {
                    return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                }, objId: function (e) {
                    return e.__id || Object.defineProperty(e, "__id", {value: ++t}), e.__id
                }, clone: function (e, t) {
                    var r = n.util.type(e);
                    switch (t = t || {}, r) {
                        case"Object":
                            if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                            var a = {};
                            t[n.util.objId(e)] = a;
                            for (var l in e) e.hasOwnProperty(l) && (a[l] = n.util.clone(e[l], t));
                            return a;
                        case"Array":
                            if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                            var a = [];
                            return t[n.util.objId(e)] = a, e.forEach(function (e, r) {
                                a[r] = n.util.clone(e, t)
                            }), a
                    }
                    return e
                }
            },
            languages: {
                extend: function (e, t) {
                    var r = n.util.clone(n.languages[e]);
                    for (var a in t) r[a] = t[a];
                    return r
                }, insertBefore: function (e, t, r, a) {
                    a = a || n.languages;
                    var l = a[e];
                    if (2 == arguments.length) {
                        r = arguments[1];
                        for (var i in r) r.hasOwnProperty(i) && (l[i] = r[i]);
                        return l
                    }
                    var o = {};
                    for (var s in l) if (l.hasOwnProperty(s)) {
                        if (s == t) for (var i in r) r.hasOwnProperty(i) && (o[i] = r[i]);
                        o[s] = l[s]
                    }
                    var u = a[e];
                    return a[e] = o, n.languages.DFS(n.languages, function (t, n) {
                        n === u && t != e && (this[t] = o)
                    }), o
                }, DFS: function (e, t, r, a) {
                    a = a || {};
                    for (var l in e) e.hasOwnProperty(l) && (t.call(e, l, e[l], r || l), "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || a[n.util.objId(e[l])] || (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, a)) : (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, a)))
                }
            },
            plugins: {},
            highlightAll: function (e, t) {
                n.highlightAllUnder(document, e, t)
            },
            highlightAllUnder: function (e, t, r) {
                var a = {
                    callback: r,
                    selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                };
                n.hooks.run("before-highlightall", a);
                for (var l, i = a.elements || e.querySelectorAll(a.selector), o = 0; l = i[o++];) n.highlightElement(l, t === !0, a.callback)
            },
            highlightElement: function (t, r, a) {
                for (var l, i, o = t; o && !e.test(o.className);) o = o.parentNode;
                o && (l = (o.className.match(e) || [, ""])[1].toLowerCase(), i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, t.parentNode && (o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l));
                var s = t.textContent, u = {element: t, language: l, grammar: i, code: s};
                if (n.hooks.run("before-sanity-check", u), !u.code || !u.grammar) return u.code && (n.hooks.run("before-highlight", u), u.element.textContent = u.code, n.hooks.run("after-highlight", u)), n.hooks.run("complete", u), void 0;
                if (n.hooks.run("before-highlight", u), r && _self.Worker) {
                    var g = new Worker(n.filename);
                    g.onmessage = function (e) {
                        u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, n.hooks.run("after-highlight", u), n.hooks.run("complete", u), a && a.call(u.element)
                    }, g.postMessage(JSON.stringify({language: u.language, code: u.code, immediateClose: !0}))
                } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, n.hooks.run("after-highlight", u), n.hooks.run("complete", u), a && a.call(t)
            },
            highlight: function (e, t, a) {
                var l = {code: e, grammar: t, language: a};
                return n.hooks.run("before-tokenize", l), l.tokens = n.tokenize(l.code, l.grammar), n.hooks.run("after-tokenize", l), r.stringify(n.util.encode(l.tokens), l.language)
            },
            matchGrammar: function (e, t, r, a, l, i, o) {
                var s = n.Token;
                for (var u in r) if (r.hasOwnProperty(u) && r[u]) {
                    if (u == o) return;
                    var g = r[u];
                    g = "Array" === n.util.type(g) ? g : [g];
                    for (var c = 0; c < g.length; ++c) {
                        var h = g[c], f = h.inside, d = !!h.lookbehind, m = !!h.greedy, p = 0, y = h.alias;
                        if (m && !h.pattern.global) {
                            var v = h.pattern.toString().match(/[imuy]*$/)[0];
                            h.pattern = RegExp(h.pattern.source, v + "g")
                        }
                        h = h.pattern || h;
                        for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
                            var w = t[b];
                            if (t.length > e.length) return;
                            if (!(w instanceof s)) {
                                if (m && b != t.length - 1) {
                                    h.lastIndex = k;
                                    var _ = h.exec(e);
                                    if (!_) break;
                                    for (var j = _.index + (d ? _[1].length : 0), P = _.index + _[0].length, A = b, x = k, O = t.length; O > A && (P > x || !t[A].type && !t[A - 1].greedy); ++A) x += t[A].length, j >= x && (++b, k = x);
                                    if (t[b] instanceof s) continue;
                                    I = A - b, w = e.slice(k, x), _.index -= k
                                } else {
                                    h.lastIndex = 0;
                                    var _ = h.exec(w), I = 1
                                }
                                if (_) {
                                    d && (p = _[1] ? _[1].length : 0);
                                    var j = _.index + p, _ = _[0].slice(p), P = j + _.length, N = w.slice(0, j),
                                        S = w.slice(P), C = [b, I];
                                    N && (++b, k += N.length, C.push(N));
                                    var E = new s(u, f ? n.tokenize(_, f) : _, y, _, m);
                                    if (C.push(E), S && C.push(S), Array.prototype.splice.apply(t, C), 1 != I && n.matchGrammar(e, t, r, b, k, !0, u), i) break
                                } else if (i) break
                            }
                        }
                    }
                }
            },
            tokenize: function (e, t) {
                var r = [e], a = t.rest;
                if (a) {
                    for (var l in a) t[l] = a[l];
                    delete t.rest
                }
                return n.matchGrammar(e, r, t, 0, 0, !1), r
            },
            hooks: {
                all: {}, add: function (e, t) {
                    var r = n.hooks.all;
                    r[e] = r[e] || [], r[e].push(t)
                }, run: function (e, t) {
                    var r = n.hooks.all[e];
                    if (r && r.length) for (var a, l = 0; a = r[l++];) a(t)
                }
            }
        }, r = n.Token = function (e, t, n, r, a) {
            this.type = e, this.content = t, this.alias = n, this.length = 0 | (r || "").length, this.greedy = !!a
        };
        if (r.stringify = function (e, t, a) {
            if ("string" == typeof e) return e;
            if ("Array" === n.util.type(e)) return e.map(function (n) {
                return r.stringify(n, t, e)
            }).join("");
            var l = {
                type: e.type,
                content: r.stringify(e.content, t, a),
                tag: "span",
                classes: ["token", e.type],
                attributes: {},
                language: t,
                parent: a
            };
            if (e.alias) {
                var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
                Array.prototype.push.apply(l.classes, i)
            }
            n.hooks.run("wrap", l);
            var o = Object.keys(l.attributes).map(function (e) {
                return e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"'
            }).join(" ");
            return "<" + l.tag + ' class="' + l.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + l.content + "</" + l.tag + ">"
        }, !_self.document) return _self.addEventListener ? (n.disableWorkerMessageHandler || _self.addEventListener("message", function (e) {
            var t = JSON.parse(e.data), r = t.language, a = t.code, l = t.immediateClose;
            _self.postMessage(n.highlight(a, n.languages[r], r)), l && _self.close()
        }, !1), _self.Prism) : _self.Prism;
        var a = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
        return a && (n.filename = a.src, n.manual || a.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism
    }();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
!function (e) {
    var t = {
        variable: [{
            pattern: /\$?\(\([\s\S]+?\)\)/,
            inside: {
                variable: [{pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0}, /^\$\(\(/],
                number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
                operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                punctuation: /\(\(?|\)\)?|,|;/
            }
        }, {
            pattern: /\$\([^)]+\)|`[^`]+`/,
            greedy: !0,
            inside: {variable: /^\$\(|^`|\)$|`$/}
        }, /\$(?:[\w#?*!@]+|\{[^}]+\})/i]
    };
    e.languages.bash = {
        shebang: {pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/, alias: "important"},
        comment: {pattern: /(^|[^"{\\])#.*/, lookbehind: !0},
        string: [{
            pattern: /((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,
            lookbehind: !0,
            greedy: !0,
            inside: t
        }, {pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/, greedy: !0, inside: t}],
        variable: t.variable,
        "function": {
            pattern: /(^|[\s;|&])(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|[\s;|&])/,
            lookbehind: !0
        },
        keyword: {
            pattern: /(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,
            lookbehind: !0
        },
        "boolean": {pattern: /(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/, lookbehind: !0},
        operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
    };
    var a = t.variable[1].inside;
    a.string = e.languages.bash.string, a["function"] = e.languages.bash["function"], a.keyword = e.languages.bash.keyword, a["boolean"] = e.languages.bash["boolean"], a.operator = e.languages.bash.operator, a.punctuation = e.languages.bash.punctuation, e.languages.shell = e.languages.bash
}(Prism);
Prism.languages.python = {
    comment: {pattern: /(^|[^\\])#.*/, lookbehind: !0},
    "triple-quoted-string": {pattern: /("""|''')[\s\S]+?\1/, greedy: !0, alias: "string"},
    string: {pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0},
    "function": {pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0},
    "class-name": {pattern: /(\bclass\s+)\w+/i, lookbehind: !0},
    keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    "boolean": /\b(?:True|False|None)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
    punctuation: /[{}[\];(),.:]/
};
!function () {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var e = /\s*\bcommand-line\b\s*/;
        Prism.hooks.add("before-highlight", function (a) {
            if (a.vars = a.vars || {}, a.vars["command-line"] = a.vars["command-line"] || {}, a.vars["command-line"].complete || !a.code) return a.vars["command-line"].complete = !0, void 0;
            var n = a.element.parentNode;
            if (!n || !/pre/i.test(n.nodeName) || !e.test(n.className) && !e.test(a.element.className)) return a.vars["command-line"].complete = !0, void 0;
            if (a.element.querySelector(".command-line-prompt")) return a.vars["command-line"].complete = !0, void 0;
            var t = a.code.split("\n");
            a.vars["command-line"].numberOfLines = t.length, a.vars["command-line"].outputLines = [];
            var r = n.getAttribute("data-output"), s = n.getAttribute("data-filter-output");
            if (r || "" === r) {
                r = r.split(",");
                for (var o = 0; o < r.length; o++) {
                    var m = r[o].split("-"), i = parseInt(m[0], 10), l = 2 === m.length ? parseInt(m[1], 10) : i;
                    if (!isNaN(i) && !isNaN(l)) {
                        1 > i && (i = 1), l > t.length && (l = t.length), i--, l--;
                        for (var d = i; l >= d; d++) a.vars["command-line"].outputLines[d] = t[d], t[d] = ""
                    }
                }
            } else if (s) for (var o = 0; o < t.length; o++) 0 === t[o].indexOf(s) && (a.vars["command-line"].outputLines[o] = t[o].slice(s.length), t[o] = "");
            a.code = t.join("\n")
        }), Prism.hooks.add("before-insert", function (e) {
            if (e.vars = e.vars || {}, e.vars["command-line"] = e.vars["command-line"] || {}, !e.vars["command-line"].complete) {
                for (var a = e.highlightedCode.split("\n"), n = 0; n < e.vars["command-line"].outputLines.length; n++) e.vars["command-line"].outputLines.hasOwnProperty(n) && (a[n] = e.vars["command-line"].outputLines[n]);
                e.highlightedCode = a.join("\n")
            }
        }), Prism.hooks.add("complete", function (a) {
            if (a.vars = a.vars || {}, a.vars["command-line"] = a.vars["command-line"] || {}, !a.vars["command-line"].complete) {
                var n = a.element.parentNode;
                e.test(a.element.className) && (a.element.className = a.element.className.replace(e, " ")), e.test(n.className) || (n.className += " command-line");
                var t = function (e, a) {
                    return (n.getAttribute(e) || a).replace(/"/g, "&quot")
                }, r = new Array(a.vars["command-line"].numberOfLines + 1), s = t("data-prompt", "");
                if ("" !== s) r = r.join('<span data-prompt="' + s + '"></span>'); else {
                    var o = t("data-user", "user"), m = t("data-host", "localhost");
                    r = r.join('<span data-user="' + o + '" data-host="' + m + '"></span>')
                }
                var i = document.createElement("span");
                i.className = "command-line-prompt", i.innerHTML = r;
                for (var l = 0; l < a.vars["command-line"].outputLines.length; l++) if (a.vars["command-line"].outputLines.hasOwnProperty(l)) {
                    var d = i.children[l];
                    d.removeAttribute("data-user"), d.removeAttribute("data-host"), d.removeAttribute("data-prompt")
                }
                a.element.insertBefore(i, a.element.firstChild), a.vars["command-line"].complete = !0
            }
        })
    }
}();
