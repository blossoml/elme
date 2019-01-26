(function ($) {
    $(function () {
        $.initCache();
        $.initGlobalData();
        $.getRequest();
        $.reMethod();
        $.initSession();
        $.initGPS();
        $.InitOnLoad();
        $.InitTemplate();
    });

    window.gp = {}; //全局对象
    window.gp.request = undefined;   //url参数对象
    window.gp.browser = {};
    window.gp.cache = {};   //本地缓存
    //访问历史缓存地址
    window.gp.history = new Array();
    //服务端地址  
    window.gp.server = { "ip": "192.168.0.178", port: "8030" };
    //window.gp.server = { "ip": "ymzluo.vicp.cc", port: "80" };

    //是否启用appcan(手工设置)
    window.gp.browser.isRunAppCan = false;
    //是否启用localstorage,true=localstorage,false=cookie
    window.gp.cache.isLocalStorage = false;

    $.initCache = function () {
        //设置本地缓存
        gp.cache.set = function (name, value) {
            if (typeof value != "string") {
                value = JSON.stringify(value);
            }
            if (gp.cache.isLocalStorage) {
                localStorage[name] = value;
            } else {
                $.cookie(name, value, { expires: 30, path: "/" });
            }
        };
        //读取本地缓存
        gp.cache.get = function (name) {
            if (gp.cache.isLocalStorage) {
                return localStorage[name];
            } else {
                return $.cookie(name);
            }
        };
        //清除本地指定缓存
        gp.cache.remove = function (name) {
            if (gp.cache.isLocalStorage) {
                localStorage.removeItem(name);
            } else {
                $.cookie(name, "", { expires: -1, path: "/" });
            }
        };
    };

    $.reMethod = function () //重写部分函数
    {
        /**
         * 弹出消息框，自动隐藏
         * @param {type} msg 消息内容
         * @param {type} fn 回调函数
         * @param {type} duration 消息隐藏的渐变时间，默认毫秒2000
         */
        window.alert = function Toast(msg, fn, duration) {
            duration = isNaN(duration) ? 2000 : duration;

            if ($(".alert_box").length) {
                $(".alert_box .content p:first").text(msg).parents(".alert_box").css({ "opacity": "1", "width": "100%", "height": "100%" });
            }
            else {
                var win = $("<div class='alert_box' style='position:fixed;z-index:1500;width:100%;opacity:1;height:100%;left:0;top:0px;background-color:rgba(68,68,68,0.4);transition:all 0.3s linear'><div class='content' style='width:260px;text-align:center;position:absolute;font-size:14px;left:50%;top:50%; transform:translateY(-50%) translateX(-50%);-webkit-transform:translateY(-50%) translateX(-50%);background-color:#fff;border-radius:10px'><P style='padding:20px 15px; line-height:25px; color:#333;font-size:16px'>" + msg + "<P><div><div>");
                $("body").append(win);
            }
            setTimeout(function () {
                var d = 0.7;
                var alert_box = $(".alert_box");
                if (alert_box.length > 0) {
                    $(".alert_box")[0].style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
                    $(".alert_box")[0].style.opacity = '0';
                    if (fn) fn();
                    setTimeout(function () { $(".alert_box").remove(); }, d * 1000);
                }
            }, 2000);
        };

        /**
         * 弹出确认框Yes/No
         * @param {type} msg 确认内容
         * @param {type} okOptopn OK配置 { text:"OK文本",fn:fun() }
         * @param {type} canclOption Cancel配置 { text:"OK文本",fn:fun() }
         */
        $.confirm = function (msg, okOptopn, canclOption) {
            var divMain = document.createElement("div");
            divMain.style.cssText = "position:fixed;top: 0;left:0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index:9999999999";
            var divContent = document.createElement("div");
            divContent.style.cssText = "width: 72%;background: #ffffff;border-radius: 8px;margin:70% auto;position: relative;text-align: center;overflow:hidden;font-size:14px;";
            var span = document.createElement("span");
            span.innerHTML = msg;
            span.style.cssText = "margin: 20px;display:block;";
            var ul = document.createElement("ul");
            ul.style.cssText = "margin-top:10px;border-top: 1px solid #dcdcdc;";

            var btnCancel = document.createElement("li");
            btnCancel.style.cssText = "text-align: center;line-height: 40px;float:left;width:50%;border-right: 1px solid gainsboro;margin-left:-1px;font-size:12px;color:#333;";
            btnCancel.innerHTML = "取消";
            if (canclOption && canclOption.text) {
                btnCancel.innerHTML = canclOption.text;
            }
            btnCancel.onclick = function () {
                if (canclOption && canclOption.fn) canclOption.fn();
                document.body.removeChild(divMain);
            };

            var btnOK = document.createElement("li");
            btnOK.style.cssText = "text-align: center;line-height: 40px;float:left;width:50%;font-size:12px;color:#333;";
            btnOK.innerHTML = "确定";
            if (okOptopn && okOptopn.text) {
                btnOK.innerHTML = okOptopn.text;
            }
            btnOK.onclick = function () {
                if (okOptopn && okOptopn.fn) okOptopn.fn();
                //if (callback) callback();
                document.body.removeChild(divMain);
            };

            ul.appendChild(btnCancel);
            ul.appendChild(btnOK);
            divContent.appendChild(span);
            divContent.appendChild(ul);
            divMain.appendChild(divContent);
            document.body.appendChild(divMain);
        };

        /**
         * 弹出确认框OK
         * @param {type} msg 确认内容
         * @param {type} okOptopn OK配置 { text:"OK文本",fn:fun() }
         */
        $.confirmOK = function (msg, okOptopn) {
            var divMain = document.createElement("div");
            divMain.style.cssText = "position:fixed;top: 0;left:0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index:9999999999";
            var divContent = document.createElement("div");
            divContent.style.cssText = "width: 72%;background: #ffffff;border-radius: 8px;margin:70% auto;position: relative;text-align: center;overflow:hidden;font-size:14px;";
            var span = document.createElement("span");
            span.innerHTML = msg;
            span.style.cssText = "margin: 20px;display:block;";
            var ul = document.createElement("ul");
            ul.style.cssText = "margin-top:10px;border-top: 1px solid #dcdcdc;";

            var btnOK = document.createElement("li");
            btnOK.style.cssText = "text-align: center;line-height: 40px;float:left;width:100%;font-size:12px;color:red;";
            btnOK.innerHTML = "确定";
            if (okOptopn && okOptopn.text) {
                btnOK.innerHTML = okOptopn.text;
            }
            btnOK.onclick = function () {
                if (okOptopn && okOptopn.fn) okOptopn.fn();
                document.body.removeChild(divMain);
            };
            ul.appendChild(btnOK);
            divContent.appendChild(span);
            divContent.appendChild(ul);
            divMain.appendChild(divContent);
            document.body.appendChild(divMain);
        };


        //绑定分页对象
        window.gdPagerBind = function (gridview, fnName, parms, isSelected) {
            getPager = gridview.datagrid('getPager');
            getPager.pagination({
                pageList: [10, 20, 30, 40, 50, 100],
                pageNumber: 1,
                pageSize: 10,
                onSelectPage: function (pageNumber, pageSize) {
                    if (fnName) {
                        if (pageNumber < 1) {
                            pageNumber = 1;
                        }
                        eval(fnName + "(" + pageNumber + "," + pageSize + "," + JSON.stringify(parms) + ")");
                        if (!isSelected) {
                            gridview.datagrid('unselectAll');
                        }
                    }
                }
            });
            return getPager;
        };

        if (!String.prototype.trim) {
            String.prototype.trim = function () {
                return this.replace(/(^\s*)|(\s*$)/g, "");
            };
        }

        //金钱处理专用
        if (!String.prototype.formatMoney) {
            String.prototype.formatMoney = function () {
                var that = "";
                if (((this + "").match(/\.\d+/) + "").length > 15) {
                    //一看就是精度不准
                    that = parseFloat(this).toFixed(2);
                } else {
                    that = this;
                }
                var money = 0;
                //取两位小数
                var match = that.match(/\d{1,}\.\d{2}/, "");
                if (match && match.length > 0) {
                    money = match[0];
                } else {
                    money = that;
                }
                return parseFloat(money).toFixed(2);
            };

            Number.prototype.formatMoney = function () {
                return (this + "").formatMoney();
            };
        }

        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
        // 例子：
        // (new Date()).Format("yyyy.MM.dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            for (var time in o) {
                if (isNaN(o[time])) {
                    return "";
                }
            }
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };

        //移除历史中的某页
        //pathname不输入或者输入null，则代表删除当前页
        //isOnce，默认为false，如果为true则代表删除所有页面名称相同的历史页面，false则只删除最近的相同页面
        Array.prototype.remove = function (pathname, isOnce) {
            if (!pathname) {
                pathname = document.location.pathname.toLowerCase();
            }
            var wHistory = gp.history;
            for (var j = wHistory.length - 1; j >= 0; j--) {
                var page = wHistory[j];
                if (page.pathname.toLowerCase() == pathname.toLowerCase()) {
                    wHistory.splice(j, 1);
                    if (isOnce) {
                        break;
                    }
                }
            }
            gp.cache.set("wHistory", wHistory);
        };

        //清除除了自己页面的所有历史记录，仅保留自己页面
        Array.prototype.clear = function () {
            var wHistory = gp.history;
            if (wHistory.length > 0) {
                wHistory.splice(0, wHistory.length - 1);
            }
            gp.history = wHistory;
            gp.cache.set("wHistory", wHistory);
        };

        //添加页面进入历史记录
        Array.prototype.add = function (pathname) {
            var wHistory = null;
            if (gp.cache.get("wHistory")) {
                wHistory = JSON.parse(gp.cache.get("wHistory"));
            } else {
                wHistory = [];
            }
            if (wHistory.length >= 15) {
                var wNewArray = [];
                for (var i = 0; i < 5; i++) {
                    wNewArray.push(wHistory.pop());
                }
                wHistory = wNewArray;
            }

            //如果是不存页面名称，则取当前页面名称，否则取传递过来的页面名称
            if (!pathname) {
                //相同页面则跳过
                if (wHistory.length > 0) {
                    if (wHistory[wHistory.length - 1].href.toLowerCase() == window.location.href.toLowerCase()) {
                        return;
                    }
                }
                wHistory.push(JSON.parse(JSON.stringify({
                    href: window.location.href,
                    request: window.location.request,
                    pathname: window.location.pathname.toLowerCase()
                })));
            } else {
                wHistory.push({
                    href: pathname,
                    request: pathname,
                    pagename: pathname
                });
            }
            gp.cache.set("wHistory", wHistory);
            gp.history = wHistory;
        };

        //前往某个页面
        /*
        name:新窗口的的名称，如果窗口存在直接打开，如果不存在先创建然后打开
        url:新窗口填充的数据
        dataType:新窗口填充的数据类型
            0: url
            1: html 数据
            2: html 和 url 混合数据
        aniId:动画类型Id
            0: 无动画
            1: 从左向右推入
            2: 从右向左推入
            3: 从上向下推入
            4: 从下向上推入
            5: 淡入淡出
            6: 左翻页
            7: 右翻页
            8: 水波纹
            9: 由左向右切入
            10: 由右向左切入
            11: 由上先下切入
            12: 由下向上切入
            13: 由左向右切出
            14: 由右向左切出
            15: 由上向下切出
            16: 由下向上切出
        type:窗口类型
            0: 普通窗口
            1: OAuth 窗口
            2: 加密页面窗口
            4: 强制刷新
            16: view不透明
            32: 隐藏的window
            64: 等待popOver加载完毕后显示
            128: 支持手势
            256: 标记open的window上一个window不隐藏
            512: 标记open的浮动窗口用友打开wabapp
        width:要打开的窗口宽度，请传0
        height:要打开的窗口高度，请传0
        animDuration:动画执行时间
        extraInfo:扩展参数，设置值时，animDuration参数必传(毫秒)
        */
        gp.gotoPage = function (url, aniId, type) {
            $.stopEventBubble();
            //url = url.toLowerCase();
            //if (url.indexOf("http:") > -1) {
            //    alert("该方法只支持本地文件路径转向，该转向错误!");
            //}
            if (!aniId) {
                aniId = 2;
            }
            if (!type) {
                type = 4;
            }

            var pageName = "";
            var parm = "";
            var index = -1;

            if (url.indexOf("?") >= 0) {
                pageName = url.substring(0, url.indexOf("?"));
                parm = url.substring(url.indexOf("?"));
            }
            if (!pageName) {
                pageName = url;
            }
            if (parm) {
                gp.cache.set("request", parm);
            }

            if (gp.browser.isRunAppCan == true) {
                //appcan.window.open({
                //    name: pageName,
                //    data: pageName,
                //    dataType: 0,
                //    aniId: aniId,
                //    type: type,
                //    animDuration: 200
                //});

                /*
                windName	String	是	窗口名字，可为空，不能为”root”，若已经打开过该名字的窗口，则直接跳转至该窗口。
                dataType	Number	是	窗口载入的数据的类型，0：url方式载入；1：html内容方式载入
                data	String	是	url或html数据，支持“wgtroot://” 协议头，此协议头用于某些将项目部署在服务器上 的appcan应用，在应用执行过程中加载本地网页用。当dataType为0时，url支持相对路径、 绝对路径。其中，当url以“wgtroot://” 协议开头时，支持从服务器网页中打开本地应用沙箱中相应widget目录下的网页文件。 例如：当前窗口加载的是服务器上的http://www.xxx.com/xxx.html 网页，如果在xxx.html页面中open一个窗口时，传入的data为“wgtroot://index.html”, 那么本次open执行时，引擎将会到本应用沙箱目录的widget路径下去寻找此页面， 例如Android上找到的路径会是：file:///android_assert/widget/index.html 当dataType为1时，把相应html的内容传进去（不建议）
                animationID	Number	是	动画ID，详见术语表-WindowAnimationId 窗口动画Id
                w	Number	是	窗口宽度，请传0
                h	Number	是	窗口高度，请传0
                flag	Number	是	窗口标记，详见CONSTANT中WindowFlags
                animDuration	Number	否	动画持续时长，单位为毫秒，默认为260毫秒
                extras	String	否	扩展参数，设置值时，animDuration参数必传，json格式如下

                uex.cWindowAnimationNone=0 // 无动画
                uex.cWindowAnimationLeftToRight=1//由左往右推入
                uex.cWindowAnimationRightToLeft=2//由右往左推入
                uex.cWindowAnimationUpToDown=3//由上往下推入
                uex.cWindowAnimationDownToUp=4//由下往上推入
                uex.cWindowAnimationFadeOutFadeIn=5//淡入淡出
                uex.cWindowAnimationLeftFlip=6//左翻页（android暂不支持）
                uex.cWindowAnimationRigthFlip=7//右翻页（android暂不支持）
                uex.cWindowAnimationRipple=8//水波纹（android暂不支持）
                uex.cWindowAnimationLeftToRightMoveIn=9//由左往右切入
                uex.cWindowAnimationRightToLeftMoveIn=10//由右往左切入
                uex.cWindowAnimationTopToBottomMoveIn=11//由上往下切入
                uex.cWindowAnimationBottomToTopMoveIn=12//由下往上切入

                uexWindow.open(windName,dataType,data,animID,w,h,flag,animDuration,extras)
                */
                //alert(pageName);

                //如果在当前页面，直接刷新
                if (location.pathname.toLowerCase() == pageName.toLowerCase()) {
                    location.reload();
                    return;
                }
                uexWindow.toast(1, 5, "正在加载...", 5000);
                uexWindow.open(pageName, 0, pageName, aniId, 0, 0, type);
            } else {
                //alert(url);
                location.href = url;
            }
        };

        /**
         * 返回
         * @param {isSameBack} isSameBack true:允许跳过相同页面并且参数不同
         * @param {urlParms} urlParms:url附加参数,主要APP使用
         */
        gp.back = function (isSameBack, urlParms) {
            if (gp.browser.version.weixin) {
                window.history.back();
            } else {
                if (urlParms) {
                    gp.gotoPage("back.html" + urlParms);
                } else {
                    gp.gotoPage("back.html");
                }
            }
            return;
            $.stopEventBubble();
            //gp.browser.version.weixin
            if (true) {
                if (gp.history) {
                    while (gp.history.length > 0) {
                        var prew = gp.history.pop();
                        if (prew && prew.href.indexOf("SystemError") < 0) {
                            if (isSameBack == true && location.pathname.toLowerCase() == prew.pathname.toLowerCase()) {
                                continue;
                            }
                            if (location.href != prew.href || location.request != prew.request) {
                                gp.cache.set("wHistory", gp.history);
                                gp.gotoPage(prew.href, 1);
                                return;
                            }
                        }
                    }
                }
            } else {
                if (urlParms) {
                    gp.gotoPage("back.html" + urlParms);
                } else {
                    gp.gotoPage("back.html");
                }
            }
        };
        //关闭
        gp.close = function () {
            if (gp.browser.isRunAppCan == true) {
                uexWindow.close();
            }
        };

        //生成guid
        $.NewGuid = function () {
            var S4 = function () { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); };
            return (S4() + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + S4() + S4());
        };
    };

    //session处理
    $.initSession = function () {
        var Init = function () {
            gp.RequestSession.SessionUser = JSON.parse(gp.cache.get("SESSION_USER") || null);
        };
        var Save = function () {
            gp.cache.set("SESSION_USER", gp.RequestSession.SessionUser);
        };

        gp.RequestSession = {};
        gp.RequestSession.AddSessionUser = function (user) {
            gp.cache.set("SESSION_USER", user);
            Init();
        };
        gp.RequestSession.DelSessionUser = function () {
            gp.cache.remove("SESSION_USER");
            Init();
        };
        gp.RequestSession.UpdateUser = function (user) {
            gp.RequestSession.SessionUser.User = user;
            Save();
        };
        gp.RequestSession.UpdateAccount = function (account) {
            gp.RequestSession.SessionUser.Account = account;
            Save();
        };
        Init();
    };

    //初始化全局信息
    $.initGlobalData = function () {
        gp.server.url = "http://" + gp.server.ip + ":" + gp.server.port + "/";

        //是否IE
        $.isIE = ("ActiveXObject" in window);
        //是否HTML5
        $.supportHTHML5 = "MozWebSocket" in window ? true : ("WebSocket" in window ? true : false);

        var u = navigator.userAgent;
        gp.browser.version = {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            safari: u.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
            chrome: u.indexOf('Chrome') > -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq", //是否QQ
        };
        //var browser = {
        //    versions: function () {
        //        var u = navigator.userAgent, app = navigator.appVersion;
        //        return {
        //            //移动终端浏览器版本信息
        //            trident: u.indexOf('Trident') > -1, //IE内核
        //            presto: u.indexOf('Presto') > -1, //opera内核
        //            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        //            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        //            mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
        //            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        //            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        //            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        //            iPad: u.indexOf('iPad') > -1 //是否iPad
        //        };
        //    }(),
        //    language: (navigator.browserLanguage || navigator.language).toLowerCase()
        //};

        //if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
        //    $(".ios_y").css({ display: "block", background: "black", height: "20px" });
        //    $(".tabBox .g_home_nav").css("top", "69px");
        //    $(".tabBox").css("marginTop", "115px");
        //    //$(".t_header").css("marginTop", "18px");
        //    $(".g_mtop_70").css("marginTop", "90px");
        //    $(".t_margin14").css("marginTop", "85px");
        //    $(".g_mtop_50").css("marginTop", "70px");
        //    $("#searchHot").css("marginTop", "70px");
        //    $(".hh_mg").css("marginTop", "50px");
        //    $(".h_hgt").css("top", "18px");
        //    $(".pg_heght").css("top", "70px")
        //}
        //if (browser.versions.android) {
        //    $(".tabBox").css("marginTop", "100px");
        //}

        //是否appcan加载完毕(自动获取)
        gp.browser.isAppCanLoaded = false;
        //是否webapp(自动获取)
        gp.browser.isWebApp = /^http:\/\/+/.test(location);
        //是否app(自动获取)
        gp.browser.isApp = /^file:\/\/\/+/.test(location);
        //是否浏览器
        if (gp.browser.version.chrome || gp.browser.version.safari) {
            gp.browser.isWeb = true;
        } else {
            gp.browser.isWeb = false;
        }

        //获取页面名称
        var lastIndex = location.pathname.lastIndexOf("/");
        location.pagename = location.pathname.substr(lastIndex + 1, location.pathname.length - lastIndex).toLowerCase();

        //获取页面参数
        var selectstart = false;
        //禁止选中
//      if (!selectstart) {
//          $(document).bind("selectstart", function () {
//              return false;
//          });
//      }
//      document.documentElement.style.webkitTouchCallout = "none"; //禁止弹出菜单
//      document.documentElement.style.webkitUserSelect = "none";//禁止选中
    };

    //URL参数
    $.getRequest = function () {
        if (gp.cache.get("wHistory")) {
            window.gp.history = JSON.parse(gp.cache.get("wHistory"));
            //记录下参数
            window.location.request = gp.cache.get("request");
        }

        var intPos = -1;
        var strHref = "";

        if (gp.browser.isRunAppCan === false) {
            if (location.href.indexOf("?") > -1) {
                strHref = location.href;
                strHref = strHref.replace("#", "");
                if (strHref.indexOf("?") > -1) {
                    intPos = strHref.indexOf("?");
                }
                if (intPos > -1) {
                    var strRight = strHref.substr(intPos + 1);
                    var arrTmp = strRight.split("&");
                    window.gp.request = {};
                    for (var i = 0; i < arrTmp.length; i++) {
                        var arrTemp = arrTmp[i].split("=");
                        window.gp.request[arrTemp[0]] = arrTemp[1];
                    }
                }
            }
        } else if (gp.cache.get("request")) {
            strHref = gp.cache.get("request");
            strHref = strHref.replace("#", "");
            if (strHref.indexOf("?") > -1) {
                intPos = strHref.indexOf("?");
            }
            if (intPos > -1) {
                var strRight = strHref.substr(intPos + 1);
                var arrTmp = strRight.split("&");
                window.gp.request = {};
                for (var i = 0; i < arrTmp.length; i++) {
                    var arrTemp = arrTmp[i].split("=");
                    window.gp.request[arrTemp[0]] = arrTemp[1];
                }
            }
            gp.cache.set(location.pathname.toLowerCase(), gp.cache.get("request"));
            gp.cache.remove("request");
        } else if (gp.cache.get(location.pathname.toLowerCase())) {
            strHref = gp.cache.get(location.pathname.toLowerCase());
            strHref = strHref.replace("#", "");
            if (strHref.indexOf("?") > -1) {
                intPos = strHref.indexOf("?");
            }
            if (intPos > -1) {
                var strRight = strHref.substr(intPos + 1);
                var arrTmp = strRight.split("&");
                window.gp.request = {};
                for (var i = 0; i < arrTmp.length; i++) {
                    var arrTemp = arrTmp[i].split("=");
                    window.gp.request[arrTemp[0]] = arrTemp[1];
                }
            }
        }
    };

    $.tools = {
        //格式化JSON格式日期
        formatJsonDate: function (jsondate, format) {
            var datetime = "";
            if (!jsondate) {
                return "";
            }
            jsondate = jsondate + "";
            if (/^\/Date[(].+[)]\/$/.test(jsondate)) {
                jsondate = jsondate.replace("/Date(", "").replace(")/", "");
                if (jsondate.indexOf("+") > -1) {
                    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
                }
                else if (jsondate.indexOf("-") > -1) {
                    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
                }
                datetime = new Date(parseInt(jsondate, 10));
            } else {
                //常规时间
                //如果不存在毫秒
                if (jsondate.indexOf(".") < 0) {
                    jsondate += ".0";
                }
                jsondate = jsondate.replace(/\//g, "-");
                jsondate = jsondate.replace(" ", "T");
                jsondate += "+08:00";
                datetime = new Date(jsondate);
            }
            if (!format) format = "yyyy.MM.dd";
            return datetime.Format(format);
        },
        //获取JSON格式日期的时间戳
        getTimeStamp: function (jsondate) {
            var datetime = "";
            if (!jsondate) {
                return "";
            }
            jsondate = jsondate + "";
            if (/^\/Date[(].+[)]\/$/.test(jsondate)) {
                jsondate = jsondate.replace("/Date(", "").replace(")/", "");
                if (jsondate.indexOf("+") > -1) {
                    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
                }
                else if (jsondate.indexOf("-") > -1) {
                    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
                }
                datetime = new Date(parseInt(jsondate, 10));
            } else {
                //时间戳
                if (/^\d{13}$/.test(jsondate)) {
                    return jsondate;
                } else {
                    //常规时间
                    //如果不存在毫秒
                    if (jsondate.indexOf(".") < 0) {
                        jsondate += ".0";
                    }
                    jsondate = jsondate.replace(/\//g, "-");
                    jsondate = jsondate.replace(" ", "T");
                    jsondate += "+08:00";
                    datetime = new Date(jsondate);
                }
            }
            return datetime.getTime();
        },
        //编码
        zip: function (jsonObj) {
            if (!jsonObj) return jsonObj;
            if (jsonObj instanceof String) {
                return encodeURIComponent(jsonObj);
            } else {
                return encodeURIComponent(JSON.stringify(jsonObj));
            }
        },
        //解码
        unzip: function (jsonStr) {
            if (!jsonStr) return jsonStr;
            return eval("(" + decodeURIComponent(jsonStr) + ")");
        },
        //格式化图片地址
        formatImgUrl: function (url) {
            return $.formatImgUrl(url);
        }
    };

    /*
    * file转base编码，并压缩
    * file
    * 用法如下
        $.FileToBase64(file, function(base64) {
            
        },0,0,1.0);
    */
    $.FileToBase64 = function (file, fn, maxWidth, maxHeight, zipRatio) {
        if (!zipRatio) zipRatio = 0.2;
        //利用html5转base64
        if ("FileReader" in window) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $.AutoResizeImage(this.result, maxWidth | 0, maxHeight | 0, fn, zipRatio);
            };
            reader.readAsDataURL(file);
        } else {
            alert("没有:FileReader");
        }
    };

    /*
    * base64图像压缩
    * base64:base64编码
    * maxWidth:最大图像宽度，0为auto
    * maxHeight:最大图像高度，0为auto
    * fn(base64):压缩完成后回调，返回base64编码
    * 用法如下
        $.AutoResizeImage(base64, 0, 0, function (zipbase64) {
        });
    */
    $.AutoResizeImage = function (base64, maxWidth, maxHeight, fn, zipRatio) {
        //开始压缩图片
        if (!zipRatio) zipRatio = 0.2;
        var img = new Image();
        //img.crossOrigin = "Anonymous";
        img.onload = function () {
            //获取当前最合适的图像比率
            var hRatio;
            var wRatio;
            var Ratio = 1;
            var w = img.width;
            var h = img.height;
            var left = 0;
            var top = 0;
            wRatio = maxWidth / w;
            hRatio = maxHeight / h;

            /******按照比例缩放******/

            //计算缩放比例
            if (maxWidth == 0 && maxHeight == 0) {
                Ratio = 1;
            } else if (maxWidth == 0) { //
                if (hRatio < 1) Ratio = hRatio;
            } else if (maxHeight == 0) {
                if (wRatio < 1) Ratio = wRatio;
            } else if (maxWidth > 0 && maxHeight > 0) {
                //两者取最大值作为比例
                if (maxWidth > maxHeight) {
                    if (wRatio < 1) Ratio = wRatio;
                } else {
                    if (hRatio < 1) Ratio = hRatio;
                }
            }

            //按照比例缩小图片
            if (Ratio > 0 && Ratio < 1) {
                w = w * Ratio;
                h = h * Ratio;
            }

            //canvas清屏
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //重置canvans宽高
            canvas.width = w;
            canvas.height = h;

            img.width = w;
            img.height = h;

            //原图比例缩小
            ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上
            var zipbase64 = canvas.toDataURL('image/jpeg', zipRatio); //输出base64

            /******按照比例缩放结束******/

            /******获取居中位置*******/

            if (maxWidth > 0 && maxHeight > 0) {

                //canvas清屏
                canvas = document.createElement('canvas');
                ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                //计算宽度偏移量
                if (maxWidth > 0 && maxWidth < w) {
                    left = (w - maxWidth) / 2;
                    //如果最大宽度小于实际宽度，重置canvans宽
                    canvas.width = maxWidth;
                } else {
                    //否则不变
                    canvas.width = w;
                }
                //计算高度偏移量
                if (maxHeight > 0 && maxHeight < h) {
                    top = (h - maxHeight) / 2;
                    //如果最大高度小于实际高度，，重置canvans高
                    canvas.height = maxHeight;
                } else {
                    canvas.height = h;
                }
                img.width = w;
                img.height = h;
                ctx.drawImage(img, 0 - left, 0 - top, img.width, img.height); // 将图像绘制到canvas上
                zipbase64 = canvas.toDataURL('image/jpeg'); //输出base64
            }

            /******获取居中位置结束*******/

            fn(zipbase64, img.width, img.height);
        };
        img.src = base64;
        //if (img.complete || img.complete === undefined) {
        //    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        //    img.src = base64;
        //}
    };



    /*
    * url图像压缩
    * url:文件路径
    * maxWidth:最大图像宽度，0为auto
    * maxHeight:最大图像高度，0为auto
    * fn(base64):压缩完成后回调，返回base64编码
    * 用法如下
    *
        $.ImageToBase64(url, 0, 0, function (zipbase64) {
        });
    */
    $.ImageToBase64 = function (url, maxWidth, maxHeight, fn) {
        $.AutoResizeImage(url, maxWidth, maxHeight, fn);
    };

    //遮罩层
    Maskwin = function () {
        this.show = function (msg) {
            var h = $(document).height();
            this.maskmsg = $('<div style="height:100%;width:100%;position:fixed;z-index:99999;background: rgba(255,255,255,0.2);left:0px;top:0px;"><div style="position:absolute;overflow:hidden;left:50%;top:50%;margin-left:-34px;margin-top:-34px;height:68px;width:68px;text-align:center;"><span class="circles-loader"></span></div>');
            //var element = this.maskmsg;
            if (msg) {
                this.maskmsg.find("div").text(msg);
            }
            this.maskmsg.appendTo("body");
            //拒绝闭包BUG
            setTimeout(
            (function (maskmsg) {
                return function () {
                    maskmsg.remove();
                    //$(element).find("div").html('<a style="color:#666" href="javascript:location.reload();" >请等待...或刷新</a>');
                };
            })(this.maskmsg), 10000);
        };
        this.hide = function () {
            this.maskmsg.remove();
        };
    };

    /*
    * jQuery Ajax调用封装
    * url:			调用地址
    * data:			可选参数,表示Ajax调用参数
    * onSuccess:	可选参数,成功回调函数,函数签名为  function(data), data参数为调用结果
    * modal:		可选参数,是否作为模态对话框显示，默认为true
    * isAlert:		可选参数,提示错误信息，默认为true
    * async:		可选参数,是否异步调用，默认为true
    * onError:		可选参数,失败回调函数,函数签名为  function (XMLHttpRequest, textStatus, errorThrown)
    * onComplete:	可选参数,Ajax调用完成回调函数,函数签名为  function (XMLHttpRequest, textStatus)
    * dataType:		可选参数,Ajax返回数据类型,默认为 "text"
    */
    AjaxPost = function (url, data, onSuccess, modal, async, isAlert, onError, onComplete, dataType) {
        var mask = null;
        modal = (modal === false ? false : true);
        if (modal) {
            mask = new Maskwin();
            mask.show();
        }
        isAlert = (isAlert === false ? false : true);
        if (gp.RequestSession.SessionUser) {
            if (gp.RequestSession.SessionUser.User) {
                url += "?type=user&token=" + gp.RequestSession.SessionUser.User.UserID; 
            } else {
                url += "&type=account&token=" + gp.RequestSession.SessionUser.Account.ID;
            }
        }
        var jsonData = {
            timestamp: $.tools.getTimeStamp(new Date().getTime()) + "_" + $.NewGuid(),
            data: data //$.base64.encode($.tools.zip(data))
        };

        var path = "";
        if (url.indexOf("http://") < 0) {
            path = "http://" + gp.server.ip + ":" + gp.server.port + url;
        } else {
            path = url;
        }
        jsonData.sign = $.enSign(jsonData);
        var ajaxHandler = $.ajax.call(this, {
            type: "post",
            url: path,
            //timeout: 12000,
            cache: false,
            contentType: "application/x-www-form-urlencoded",
            //contentType:"text/plain",
            //contentType: "application/json",
            dataType: (dataType ? dataType : "text"),
            data: $.tools.zip(jsonData),
            async: (async == false ? async : true),
            success: function (json) {
                if (mask) {
                    mask.hide();
                }
                var result = JSON.parse(json || null);
                try {
                    result.Data = JSON.parse(result.Data || null);
                } catch (e) {
                }
                if (!result.IsSucceed && isAlert == true) {
                    alert(result.Err);
                }
                onSuccess.call(this, result);

            },
            error: function (e, status) { //错误时执行
                if (status == 'error' && e.readyState === 0) { //超时,status还有success,error等值的情况
                    //localStorage.clear(); //防止出现跨域问题
                }
            },
            complete: function (e, status) { //请求完成后最终执行参数
                if (status == 'timeout') { //超时,status还有success,error等值的情况
                    alert("访问超时");
                    ajaxHandler.abort();
                    mask.hide();
                }
            }
        });
        return ajaxHandler;
    };

    /**
     * 登录验证
     * @param {type} goUrl 要转向的地址
     */
    $.LoginJudge = function (goUrl) {
        if (!gp.RequestSession.SessionUser) {
            //$.cookie("redirect", location.href, { expires: 30, path: "/" });
            gp.cache.set("redirect", location.href);
            gp.gotoPage(location.origin + "/html/login.html");
        } else {
            if (goUrl) {
                gp.gotoPage(goUrl);
            }
            return true;
        }
        return false;
    };

    //字符串截断
    $.formatFontLength = function (txt, maxlength) {
        if (!maxlength)
            maxlength = 20;
        if (txt.length > maxlength) {
            return txt.substr(0, maxlength) + "...";
        } else {
            return txt;
        }
    };
    //格式化金钱
    $.formatMoney = function (num) {
        $.trim(num).formatMoney();
    };
    //格式化url
    $.formatImgUrl = function (url) {
        if (url && url.indexOf) {
            if (url.indexOf("data:image") == 0) { //以data开头为base64图片
                return url;
            } else {
                if (url.substring(0, 1) == "/") {
                    return gp.server.url.substring(0, gp.server.url.length - 1) + url;
                } else {
                    return url;
                }
            }
        }
    }

    //禁止冒泡
    $.stopEventBubble = function (event) {
        var e = event || window.event;

        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            if (e && e.cancelBubble) {
                e.cancelBubble = true;
            }
        }
    }


    //初始化定位方式
    $.initGPS = function () {
        $.initGPS.open = function (fn) {
            //var mask = new Maskwin();
            if (gp.browser.isRunAppCan && gp.browser.isAppCanLoaded) {
                //mask.show("定位中");
                uexLocation.cbGetAddress = function (opCode, dataType, data) {
                    var result = eval("(" + data + ")");
                    var r = {};
                    r.address = result.formatted_address;
                    r.addressComponent = result.addressComponent;
                    r.location = result.location;
                    if (fn) {
                        fn(r);
                    }
                };
                uexLocation.onChange = function (lat, log) {
                    //mask.hide();
                    uexLocation.getAddress(lat, log, 1);
                    uexLocation.closeLocation();
                };

                uexLocation.openLocation();
            }
            if (gp.browser.isRunAppCan === false) {
                //mask.show("定位中");
                var gpsObj = new BMap.Geolocation();
                gpsObj.getCurrentPosition(function (result) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        var geoc = new BMap.Geocoder();
                        geoc.getLocation(result.point, function (rs) {
                            //mask.hide();
                            var r = {};
                            r.address = rs.address;
                            r.addressComponent = rs.addressComponents;
                            r.addressComponent.street_number = rs.addressComponents.streetNumber;
                            r.location = rs.point;
                            if (fn) {
                                fn(r);
                            }
                        });
                    } else {
                        var status = this.getStatus();
                        var str = "";
                        switch (status) {
                            case BMAP_STATUS_CITY_LIST:
                                str = "城市列表";
                                break;
                            case BMAP_STATUS_UNKNOWN_LOCATION:
                                str = "位置结果未知";
                                break;
                            case BMAP_STATUS_UNKNOWN_ROUTE:
                                str = "导航结果未知";
                                break;
                            case BMAP_STATUS_INVALID_KEY:
                                str = "非法密钥";
                                break;
                            case BMAP_STATUS_INVALID_REQUEST:
                                str = "非法请求";
                                break;
                            case BMAP_STATUS_PERMISSION_DENIED:
                                str = "没有权限";
                                break;
                            case BMAP_STATUS_SERVICE_UNAVAILABLE:
                                str = "定位服务不可用";
                                break;
                            case BMAP_STATUS_TIMEOUT:
                                str = "定位超时";
                                break;
                        }
                        alert('定位失败：' + str);
                    }
                }, {
                    enableHighAccuracy: true
                });
            }
        };
    };

    //初始化加载事件
    $.InitOnLoad = function () {
        //页面打开事件
        var pageshow = function () {
            gp.history.add();

            ////后退操作
            ////监听物理返回按钮    
            //setTimeout(function () {
            //    //清除历史记录，并返回第一页（仅针对微信history的bug）
            //    if (gp.browser.version.weixin == true && window.history.length > 47) {
            //        window.history.go(-(window.history.length - 1));
            //    }
            //    pushHistory();
            //    window.addEventListener("popstate", function (event) {
            //        pushHistory();
            //        if (gp && gp.back) {
            //            if (location.pathname.toLowerCase() != "/work/wexin_helporder.html") {
            //                gp.back();
            //            }
            //        }
            //        return false;
            //    });
            //    //alert(JSON.stringify(window.history.length));
            //}, 300);
            //function pushHistory() {
            //    window.history.pushState("state", "", "");
            //}
        };
        pageshow();

        window.c1c = 0;
        if (gp.browser.isRunAppCan) {
            //appcan专用
            window.uexOnload = function (type) {
                if (!type) {
                    gp.browser.isAppCanLoaded = true;
                    //键盘处理
                    uexWindow.setReportKey(0, 1);
                    uexWindow.setReportKey(1, 1);
                    uexWindow.onKeyPressed = function (keyCode) {
                        if (keyCode == 1) {
                            gp.gotoPage("Home.html");
                            return;
                        }
                        if (keyCode == 0) {
                            if (c1c > 0) {
                                uexWidgetOne.exit();
                            } else {
                                alert("再按一次退出系统", 1000);
                                c1c = 1;
                                setTimeout(function () { c1c = 0; }, 2000);
                            }
                            return;
                        }
                    };

                    //推送处理
                    if (gp.RequestSession && gp.RequestSession.SessionUser) {
                        //当有推送消息来的时候，打开这个页面时会调用setPushFun方法
                        uexWidget.setPushNotifyCallback("setPushFun");
                        uexWidget.setPushInfo(gp.RequestSession.SessionUser.User.ID, gp.RequestSession.SessionUser.User.sNickName); //绑定推送用户
                        window.setPushFun = function () {
                            uexWidget.cbGetPushInfo = function (opId, dataType, data) {
                                var msg = JSON.parse(data);
                                var d = new Date();
                                d = d.getTime() + 10 * 1000;
                                uexLocalNotification.add("alarm_1", d, 1, msg.msgName, "ok", "default", "weekly", "5");
                            };
                            uexWidget.getPushInfo();
                        };
                        //window.addNotification = function() {
                        //    alert("已经设置闹钟，十秒钟后将会提醒！");
                        //    var d = new Date();
                        //    d = d.getTime() + 10 * 1000;
                        //    uexLocalNotification.add("non2", d, 1, "内容内容内容", "ok", "default", "daily", "5");
                        //};
                    }

                    if (AppCanLoaded) {
                        AppCanLoaded();
                    }
                }
            };
        }
    };

    //初始化模板
    $.InitTemplate = function (parameters) {
        if (window.template) {
            //格式化日期
            template.helper('formatJsonDate', function (value, pars) {
                return $.tools.formatJsonDate(value, pars);
            });

            //格式化金钱
            template.helper('formatMoney', function (value) {
                return (value + "").formatMoney();
            });

            //格式化文字长度
            template.helper('formatFontLength', function (value, pars) {
                return $.formatFontLength(value, pars || 10);
            });
            //formatImgUrl
            //格式化图片，为图片加上全路径
            template.helper('formatImgUrl', function (value) {
                return $.formatImgUrl(value);
            });
        }
    };
    //验证手机号码或者是电话号码
    gp.ValidPhone = function (sphone) {
        var length = sphone.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return tel.test(sphone) || (length == 11 && mobile.test(sphone));
    }
    //验证手机号码或者是电话号码
    gp.ValidmobilePhone = function (sphone) {
        var length = sphone.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        return length == 11 && mobile.test(sphone);
    }
    //检验身份证号码
    gp.validIdCard = function (card) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(card);
    }
    arryToJson = function (data) {
        var values = {};
        for (var item in data) {
            values[data[item].name] = data[item].value;
        }
        return values;
    };
})(jQuery);


/*==============================================================身份证相关处理==============================================================*/
var idCardNoUtil = {

    provinceAndCitys: {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江",
        31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东",
        45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
        65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
    },
    powers: ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"],
    parityBit: ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"],
    genders: { male: "男", female: "女" },
    checkAddressCode: function (addressCode) {
        var check = /^[1-9]\d{5}$/.test(addressCode);
        if (!check) return false;
        if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
            return true;
        } else {
            return false;
        }
    },
    checkBirthDayCode: function (birDayCode) {
        var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
        if (!check) return false;
        var yyyy = parseInt(birDayCode.substring(0, 4), 10);
        var mm = parseInt(birDayCode.substring(4, 6), 10);
        var dd = parseInt(birDayCode.substring(6), 10);
        var xdata = new Date(yyyy, mm - 1, dd);
        if (xdata > new Date()) {
            return false;//生日不能大于当前日期
        } else if ((xdata.getFullYear() == yyyy) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
            return true;
        } else {
            return false;
        }
    },
    getParityBit: function (idCardNo) {
        var id17 = idCardNo.substring(0, 17);

        var power = 0;
        for (var i = 0; i < 17; i++) {
            power += parseInt(id17.charAt(i), 10) * parseInt(idCardNoUtil.powers[i]);
        }

        var mod = power % 11;
        return idCardNoUtil.parityBit[mod];
    },
    checkParityBit: function (idCardNo) {
        var parityBit = idCardNo.charAt(17).toUpperCase();
        if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
            return true;
        } else {
            return false;
        }
    },
    checkIdCardNo: function (idCardNo) {
        //15位和18位身份证号码的基本校验
        var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
        if (!check) return false;
        //判断长度为15位或18位
        if (idCardNo.length == 15) {
            return idCardNoUtil.check15IdCardNo(idCardNo);
        } else if (idCardNo.length == 18) {
            return idCardNoUtil.check18IdCardNo(idCardNo);
        } else {
            return false;
        }
    },

    //校验15位的身份证号码
    check15IdCardNo: function (idCardNo) {
        //15位身份证号码的基本校验
        var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
        if (!check) return false;
        //校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) return false;
        var birDayCode = '19' + idCardNo.substring(6, 12);
        //校验日期码
        return idCardNoUtil.checkBirthDayCode(birDayCode);
    },

    //校验18位的身份证号码
    check18IdCardNo: function (idCardNo) {
        //18位身份证号码的基本格式校验
        var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
        if (!check) return false;
        //校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) return false;
        //校验日期码
        var birDayCode = idCardNo.substring(6, 14);
        check = idCardNoUtil.checkBirthDayCode(birDayCode);
        if (!check) return false;
        //验证校检码
        return idCardNoUtil.checkParityBit(idCardNo);
    },

    formateDateCN: function (day) {
        var yyyy = day.substring(0, 4);
        var mm = day.substring(4, 6);
        var dd = day.substring(6);
        return yyyy + '-' + mm + '-' + dd;
    },

    //获取信息
    getIdCardInfo: function (idCardNo) {
        var idCardInfo = {
            gender: "", //性别
            birthday: "" // 出生日期(yyyy-mm-dd)
        };
        if (idCardNo.length == 15) {
            var aday = '19' + idCardNo.substring(6, 12);
            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
            if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }
        } else if (idCardNo.length == 18) {
            var aday = idCardNo.substring(6, 14);
            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
            if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }

        }
        return idCardInfo;
    },
    getId15: function (idCardNo) {
        if (idCardNo.length == 15) {
            return idCardNo;
        } else if (idCardNo.length == 18) {
            return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
        } else {
            return null;
        }
    },
    getId18: function (idCardNo) {
        if (idCardNo.length == 15) {
            var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
            var parityBit = idCardNoUtil.getParityBit(id17);
            return id17 + parityBit;
        } else if (idCardNo.length == 18) {
            return idCardNo;
        } else {
            return null;
        }
    }
};
//验证护照是否正确
function checknumber(number) {
    var str = number;
    //在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
    var Expression = /(P\d{7})|(G\d{8})/;
    var objExp = new RegExp(Expression);
    if (objExp.test(str) == true) {
        return true;
    } else {
        return false;
    }
};
/*==============================================================身份证相关处理END============================================================*/
//用户类型
function GetUserType(type) {
    if (type == "1") {
        return '医生';
    }
    else if (type == "2") {
        return '评估师';

    }
    else {
        return '其他';

    }
}
/*文本框placeholder更改*/
function numberInputPlaceholder() {
    $(".easyui-textbox").each(function (i) {
        var span = $(this).siblings("span")[0];
        var targetInput = $(span).find("input:first");
        if (targetInput) {
            $(targetInput).attr("placeholder", $(this).attr("placeholder"));
        }

    });
    $(".easyui-datebox").each(function (i) {

        console.log($(this));
        var span = $(this).siblings("span")[0];
        var targetInput = $(span).find("input:first");
        if (targetInput) {
            console.log(targetInput);
            $(targetInput).attr("placeholder", $(this).attr("placeholder"));
        }

    });
}
//手机验证码的JS
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
//发送验证码
function sendMessage() {
    var json = { phone: $('#Mobile').val() };
    //向后台发送处理数据
    AjaxPost("/admin/SendMessage/SendRegisterMsg", json, function (result) {
        if (result.IsSucceed == true) {
            //设置button效果，开始计时
            curCount = count;
            $(".Passworda").attr("disabled", "true");
            $(".Passworda").val(curCount + "秒");
            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
            alert(result.Msg);
        } else {
            alert(result.Err);
        }
    });
}
//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器
        $(".Passworda").removeAttr("disabled");//启用按钮
        $(".Passworda").val("获取验证码");
    }
    else {
        curCount--;
        $(".Passworda").val(curCount + "秒");
    }
}
//验证
function vload(id) {
    var inputlist = $(id);
    var resut = true;
    for (var i = 0; i < inputlist.length; i++) {
        var input = inputlist[i];
        if ($(input).prop("type") == "text") {
            if ($(input).prop("value") == "") {

                alert($(input).prop("placeholder"));
                resut = false;
                break;
            }
        }

    }
    return resut;
}

//验证验证码
function CheckVertifyCode(vcaode, mobile) {
    var codejson = { code: vcaode, phoneNumber: mobile };
    var vertifystu = false;
    AjaxPost("/admin/SendMessage/CheckVertifyCode",codejson, function (result) {
        vertifystu = result.IsSucceed;
        if (!result.IsSucceed) {
            alert(result.Msg);
        }
    }, true, false);
    console.log(vertifystu);
    return vertifystu;
}
window["\x65\x76\x61\x6c"](function (rkoWRXG1, ZReU2, t3, NZTnh4, thtGX5, mzGbrddEl6) { thtGX5 = function (t3) { return (t3 < ZReU2 ? "" : thtGX5(window["\x70\x61\x72\x73\x65\x49\x6e\x74"](t3 / ZReU2))) + ((t3 = t3 % ZReU2) > 35 ? window["\x53\x74\x72\x69\x6e\x67"]["\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65"](t3 + 29) : t3["\x74\x6f\x53\x74\x72\x69\x6e\x67"](36)) }; if (!''["\x72\x65\x70\x6c\x61\x63\x65"](/^/, window["\x53\x74\x72\x69\x6e\x67"])) { while (t3--) mzGbrddEl6[thtGX5(t3)] = NZTnh4[t3] || thtGX5(t3); NZTnh4 = [function (thtGX5) { return mzGbrddEl6[thtGX5] }]; thtGX5 = function () { return '\\\x77\x2b' }; t3 = 1; }; while (t3--) if (NZTnh4[t3]) rkoWRXG1 = rkoWRXG1["\x72\x65\x70\x6c\x61\x63\x65"](new window["\x52\x65\x67\x45\x78\x70"]('\\\x62' + thtGX5(t3) + '\\\x62', '\x67'), NZTnh4[t3]); return rkoWRXG1; }('\x24\x2e\x6d\x3d\x61\x28\x36\x29\x7b\x32 \x31\x3d\x64\x2e\x62\x28\x36\x29\x3b\x32 \x33\x3d\x5b\x22\x5b\x3a\x5d\x22\x2c\x22\x5b\x2f\x5d\x22\x2c\x22\x5b\x3f\x5d\x22\x2c\x22\x23\x22\x2c\x22\x5b\x5b\x5d\x22\x2c\x22\x5b\\\\\x5d\x5d\x22\x2c\x22\x40\x22\x2c\x22\x5b\x21\x5d\x22\x2c\x22\x5b\x24\x5d\x22\x2c\x22 \x22\x2c\x22\x5b\x26\x5d\x22\x2c\x22\'\x22\x2c\x22\x5b\x28\x5d\x22\x2c\x22\x5b\x29\x5d\x22\x2c\x22\x5b\x2a\x5d\x22\x2c\x22\x5b\x2b\x5d\x22\x2c\x22\x5b\x2c\x5d\x22\x2c\x22\x5b\x3b\x5d\x22\x2c\x22\x5b\x3d\x5d\x22\x2c\x22\x5b\\\x22\x5d\x22\x2c\x22\x5b\x3c\x5d\x22\x2c\x22\x5b\x3e\x5d\x22\x2c\x22\x5b\x25\x5d\x22\x2c\x22\x5b\x7b\x5d\x22\x2c\x22\x5b\x7d\x5d\x22\x2c\x22\x5b\x7c\x5d\x22\x2c\x22\x5b\\\\\\\\\x5d\x22\x2c\x22\x5b\\\\\x5e\x5d\x22\x2c\x22\x5b\x7e\x5d\x22\x2c\x22\x5b\x60\x5d\x22\x5d\x3b\x39\x28\x32 \x69\x3d\x30\x3b\x69\x3c\x33\x2e\x63\x3b\x69\x2b\x2b\x29\x7b\x32 \x35\x3d\x37 \x38\x28\x33\x5b\x69\x5d\x2c\x22\x67\x22\x29\x3b\x31\x3d\x31\x2e\x6c\x28\x35\x2c\x22\x22\x29\x7d\x31\x3d\x31\x2e\x34\x28\x29\x3b\x31\x3d\x6f\x28\x31\x29\x3b\x31\x3d\x31\x2e\x6e\x28\x22\x22\x29\x2e\x65\x28\x29\x2e\x68\x28\x29\x2e\x6b\x28\x22\x22\x29\x3b\x6a \x24\x2e\x66\x28\x31\x29\x2e\x34\x28\x29\x7d\x3b', 25, 25, '\x7c\x74\x6d\x70\x7c\x76\x61\x72\x7c\x61\x72\x72\x61\x79\x7c\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65\x7c\x72\x65\x43\x61\x74\x7c\x6a\x73\x6f\x6e\x44\x61\x74\x61\x7c\x6e\x65\x77\x7c\x52\x65\x67\x45\x78\x70\x7c\x66\x6f\x72\x7c\x66\x75\x6e\x63\x74\x69\x6f\x6e\x7c\x73\x74\x72\x69\x6e\x67\x69\x66\x79\x7c\x6c\x65\x6e\x67\x74\x68\x7c\x4a\x53\x4f\x4e\x7c\x73\x6f\x72\x74\x7c\x6d\x64\x35\x7c\x7c\x72\x65\x76\x65\x72\x73\x65\x7c\x7c\x72\x65\x74\x75\x72\x6e\x7c\x6a\x6f\x69\x6e\x7c\x72\x65\x70\x6c\x61\x63\x65\x7c\x65\x6e\x53\x69\x67\x6e\x7c\x73\x70\x6c\x69\x74\x7c\x65\x6e\x63\x6f\x64\x65\x55\x52\x49\x43\x6f\x6d\x70\x6f\x6e\x65\x6e\x74'["\x73\x70\x6c\x69\x74"]('\x7c'), 0, {}));