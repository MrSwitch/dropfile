// Silverlightjs see http://code.msdn.microsoft.com/silverlightjs
//v4.0.50401.0
if (!window.Silverlight) window.Silverlight = {}; Silverlight._silverlightCount = 0; Silverlight.__onSilverlightInstalledCalled = false; Silverlight.fwlinkRoot = "http://go2.microsoft.com/fwlink/?LinkID="; Silverlight.__installationEventFired = false; Silverlight.onGetSilverlight = null; Silverlight.onSilverlightInstalled = function () { window.location.reload(false) }; Silverlight.isInstalled = function (b) { if (b == undefined) b = null; var a = false, m = null; try { var i = null, j = false; if (window.ActiveXObject) try { i = new ActiveXObject("AgControl.AgControl"); if (b === null) a = true; else if (i.IsVersionSupported(b)) a = true; i = null } catch (l) { j = true } else j = true; if (j) { var k = navigator.plugins["Silverlight Plug-In"]; if (k) if (b === null) a = true; else { var h = k.description; if (h === "1.0.30226.2") h = "2.0.30226.2"; var c = h.split("."); while (c.length > 3) c.pop(); while (c.length < 4) c.push(0); var e = b.split("."); while (e.length > 4) e.pop(); var d, g, f = 0; do { d = parseInt(e[f]); g = parseInt(c[f]); f++ } while (f < e.length && d === g); if (d <= g && !isNaN(d)) a = true } } } catch (l) { a = false } return a }; Silverlight.WaitForInstallCompletion = function () { if (!Silverlight.isBrowserRestartRequired && Silverlight.onSilverlightInstalled) { try { navigator.plugins.refresh() } catch (a) { } if (Silverlight.isInstalled(null) && !Silverlight.__onSilverlightInstalledCalled) { Silverlight.onSilverlightInstalled(); Silverlight.__onSilverlightInstalledCalled = true } else setTimeout(Silverlight.WaitForInstallCompletion, 3e3) } }; Silverlight.__startup = function () { navigator.plugins.refresh(); Silverlight.isBrowserRestartRequired = Silverlight.isInstalled(null); if (!Silverlight.isBrowserRestartRequired) { Silverlight.WaitForInstallCompletion(); if (!Silverlight.__installationEventFired) { Silverlight.onInstallRequired(); Silverlight.__installationEventFired = true } } else if (window.navigator.mimeTypes) { var b = navigator.mimeTypes["application/x-silverlight-2"], c = navigator.mimeTypes["application/x-silverlight-2-b2"], d = navigator.mimeTypes["application/x-silverlight-2-b1"], a = d; if (c) a = c; if (!b && (d || c)) { if (!Silverlight.__installationEventFired) { Silverlight.onUpgradeRequired(); Silverlight.__installationEventFired = true } } else if (b && a) if (b.enabledPlugin && a.enabledPlugin) if (b.enabledPlugin.description != a.enabledPlugin.description) if (!Silverlight.__installationEventFired) { Silverlight.onRestartRequired(); Silverlight.__installationEventFired = true } } if (!Silverlight.disableAutoStartup) if (window.removeEventListener) window.removeEventListener("load", Silverlight.__startup, false); else window.detachEvent("onload", Silverlight.__startup) }; if (!Silverlight.disableAutoStartup) if (window.addEventListener) window.addEventListener("load", Silverlight.__startup, false); else window.attachEvent("onload", Silverlight.__startup); Silverlight.createObject = function (m, f, e, k, l, h, j) { var d = {}, a = k, c = l; d.version = a.version; a.source = m; d.alt = a.alt; if (h) a.initParams = h; if (a.isWindowless && !a.windowless) a.windowless = a.isWindowless; if (a.framerate && !a.maxFramerate) a.maxFramerate = a.framerate; if (e && !a.id) a.id = e; delete a.ignoreBrowserVer; delete a.inplaceInstallPrompt; delete a.version; delete a.isWindowless; delete a.framerate; delete a.data; delete a.src; delete a.alt; if (Silverlight.isInstalled(d.version)) { for (var b in c) if (c[b]) { if (b == "onLoad" && typeof c[b] == "function" && c[b].length != 1) { var i = c[b]; c[b] = function (a) { return i(document.getElementById(e), j, a) } } var g = Silverlight.__getHandlerName(c[b]); if (g != null) { a[b] = g; c[b] = null } else throw "typeof events." + b + " must be 'function' or 'string'"; } slPluginHTML = Silverlight.buildHTML(a) } else slPluginHTML = Silverlight.buildPromptHTML(d); if (f) f.innerHTML = slPluginHTML; else return slPluginHTML }; Silverlight.buildHTML = function (a) { var b = []; b.push('<object type="application/x-silverlight" data="data:application/x-silverlight,"'); if (a.id != null) b.push(' id="' + Silverlight.HtmlAttributeEncode(a.id) + '"'); if (a.width != null) b.push(' width="' + a.width + '"'); if (a.height != null) b.push(' height="' + a.height + '"'); b.push(" >"); delete a.id; delete a.width; delete a.height; for (var c in a) if (a[c]) b.push('<param name="' + Silverlight.HtmlAttributeEncode(c) + '" value="' + Silverlight.HtmlAttributeEncode(a[c]) + '" />'); b.push("</object>"); return b.join("") }; Silverlight.createObjectEx = function (b) { var a = b, c = Silverlight.createObject(a.source, a.parentElement, a.id, a.properties, a.events, a.initParams, a.context); if (a.parentElement == null) return c }; Silverlight.buildPromptHTML = function (b) { var a = "", d = Silverlight.fwlinkRoot, c = b.version; if (b.alt) a = b.alt; else { if (!c) c = ""; a = "<a href='javascript:Silverlight.getSilverlight(\"{1}\");' style='text-decoration: none;'><img src='{2}' alt='Get Microsoft Silverlight' style='border-style: none'/></a>"; a = a.replace("{1}", c); a = a.replace("{2}", d + "108181") } return a }; Silverlight.getSilverlight = function (e) { if (Silverlight.onGetSilverlight) Silverlight.onGetSilverlight(); var b = "", a = String(e).split("."); if (a.length > 1) { var c = parseInt(a[0]); if (isNaN(c) || c < 2) b = "1.0"; else b = a[0] + "." + a[1] } var d = ""; if (b.match(/^\d+\056\d+$/)) d = "&v=" + b; Silverlight.followFWLink("149156" + d) }; Silverlight.followFWLink = function (a) { top.location = Silverlight.fwlinkRoot + String(a) }; Silverlight.HtmlAttributeEncode = function (c) { var a, b = ""; if (c == null) return null; for (var d = 0; d < c.length; d++) { a = c.charCodeAt(d); if (a > 96 && a < 123 || a > 64 && a < 91 || a > 43 && a < 58 && a != 47 || a == 95) b = b + String.fromCharCode(a); else b = b + "&#" + a + ";" } return b }; Silverlight.default_error_handler = function (e, b) { var d, c = b.ErrorType; d = b.ErrorCode; var a = "\nSilverlight error message     \n"; a += "ErrorCode: " + d + "\n"; a += "ErrorType: " + c + "       \n"; a += "Message: " + b.ErrorMessage + "     \n"; if (c == "ParserError") { a += "XamlFile: " + b.xamlFile + "     \n"; a += "Line: " + b.lineNumber + "     \n"; a += "Position: " + b.charPosition + "     \n" } else if (c == "RuntimeError") { if (b.lineNumber != 0) { a += "Line: " + b.lineNumber + "     \n"; a += "Position: " + b.charPosition + "     \n" } a += "MethodName: " + b.methodName + "     \n" } alert(a) }; Silverlight.__cleanup = function () { for (var a = Silverlight._silverlightCount - 1; a >= 0; a--) window["__slEvent" + a] = null; Silverlight._silverlightCount = 0; if (window.removeEventListener) window.removeEventListener("unload", Silverlight.__cleanup, false); else window.detachEvent("onunload", Silverlight.__cleanup) }; Silverlight.__getHandlerName = function (b) { var a = ""; if (typeof b == "string") a = b; else if (typeof b == "function") { if (Silverlight._silverlightCount == 0) if (window.addEventListener) window.addEventListener("unload", Silverlight.__cleanup, false); else window.attachEvent("onunload", Silverlight.__cleanup); var c = Silverlight._silverlightCount++; a = "__slEvent" + c; window[a] = b } else a = null; return a }; Silverlight.onRequiredVersionAvailable = function () { }; Silverlight.onRestartRequired = function () { }; Silverlight.onUpgradeRequired = function () { }; Silverlight.onInstallRequired = function () { }; Silverlight.IsVersionAvailableOnError = function (d, a) { var b = false; try { if (a.ErrorCode == 8001 && !Silverlight.__installationEventFired) { Silverlight.onUpgradeRequired(); Silverlight.__installationEventFired = true } else if (a.ErrorCode == 8002 && !Silverlight.__installationEventFired) { Silverlight.onRestartRequired(); Silverlight.__installationEventFired = true } else if (a.ErrorCode == 5014 || a.ErrorCode == 2106) { if (Silverlight.__verifySilverlight2UpgradeSuccess(a.getHost())) b = true } else b = true } catch (c) { } return b }; Silverlight.IsVersionAvailableOnLoad = function (b) { var a = false; try { if (Silverlight.__verifySilverlight2UpgradeSuccess(b.getHost())) a = true } catch (c) { } return a }; Silverlight.__verifySilverlight2UpgradeSuccess = function (d) { var c = false, b = "4.0.50401", a = null; try { if (d.IsVersionSupported(b + ".99")) { a = Silverlight.onRequiredVersionAvailable; c = true } else if (d.IsVersionSupported(b + ".0")) a = Silverlight.onRestartRequired; else a = Silverlight.onUpgradeRequired; if (a && !Silverlight.__installationEventFired) { a(); Silverlight.__installationEventFired = true } } catch (e) { } return c };

/**
* slDropFile
* This adds the File Api drop function to elements.
* By including this script file into your page your site will be able to support file drop on elements with className "sldrop" on browsers which do not natively support the File API
*
* @author Andrew Dodson
* @since Deceminator 2010
*/

/**
* Does the browser not have the FileReader already
*/
(function(){

    if (("FileReader" in window)){
        return;
    }

    /**
     * Create the Silverlight Overlay, this will be moved into position once drop occurs
     */
    var div = document.createElement('div');
    Silverlight.createObjectEx({
        source: "ClientBin/slDropFile.xap",
        parentElement: div,
        id: "SilverlightControl",
        properties: {
            width: "100%",
            height: "100%",
            version: "2.0",
            background: "#FFFFFF"
            //   isWindowless:"True",
            //   background: "#00FFFFFF"
        }
    });
    document.getElementsByTagName('body')[0].appendChild(div);

    // Position the silverlight container iniitally
    var sl = document.getElementById("SilverlightControl").parentNode;
    sl.style.display = 'block';
    sl.style.position = 'absolute';
    sl.style.width = sl.style.height = "10px";
    hide();

    function hide(e) {
        sl.style.left = sl.style.top = "-10000px";
    }

    /**
    * DragEnter + Event delegation,
    * When a drag enter event occurs if the current target is a drop zone overlay element with the Silverlight app.
    */
    document.ondragenter = function (event) {
        //IE doesn't pass in the event object
        event = event || window.event;

        //IE uses srcElement as the target
        var el = event.target || event.srcElement;

        //If this element does not have a drop event attached to it then we hide the widget
        if (!((("ondrop" in el) && el.ondrop && el.ondrop.toString().match('.files')) || el.className.match(/sldropzone/i))) {
            // Ensure that the silverlight widget is offscreen
            hide();
            return;
        }

        // Use the dragover events to keep the silver light widget under the mouse cursor
        el.ondragover = function (e) {
            e = e || window.event;
            // Define pageX and pageY if the window doesn't already have them defined.
            if (!("pageX" in e)) {
                e.pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                e.pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            // Update the position of the silverlight widget
            sl.style.top = (e.pageY - 5) + "px";
            sl.style.left = (e.pageX - 5) + "px";
        };


        /**
        * Add Callback which will be triggered via silverlight
        */
        window.dropFile = function () {
            // Instantly hide the SilverLight Application
            hide(true);
            // Drop the file
            // We are trying to recreate an event here... 
            // this is very hacky and means we have to recreate everything in a typical event otherwise we can break code
            var dataTransfer = { files: [] };

            for (var i = 0; i < arguments.length; i++) {
                     // filename
                var name = arguments[i].split(',')[0],
                    // data
                    base64 = arguments[i].split(',')[1],
                    // mime type based upon extension
                    mime = { png: "image/png",
                        jpg: "image/jpeg",
                        jpeg: "image/jpeg",
                        gif: "image/gif"
                    }[name.match(/[^\.]*$/)[0]] || "";

                dataTransfer.files[i] = { name: name, size: base64.length, data: base64, type : mime }
            }

            // dispatch events
            try {
                // IE9,FF3<>FF3.5
                var dropEvent = document.createEvent("DragEvent");
                dropEvent.initDragEvent("drop", true, true, window, 0,
	                                        0, 0, 0, 0,
                //event.screenX, event.screenY, event.clientX, event.clientY, 
	                                        false, false, false, false,
                //event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 
	                                        0, null, dataTransfer);
                el.dispatchEvent(dropEvent);
            }
            catch (e) {
                // <=IE8, <FF3
                var dropEvent = document.createEventObject();
                dropEvent.files = dataTransfer.files;

                if (el.fireEvent) {
                    el.fireEvent('ondrop', dropEvent);
                } else if (el.dispatchEvent) {
                    el.dispatchEvent(dropEvent);
                } else throw ("Whoops could not trigger the drop event");
            }
        };

    }

    /**
    * Add FileReader to the window object
    */
    window.FileReader = function () {
        this.onload,this.result;
        this.readAsDataURL = function (file) {
            // Use the extension from the filename to determine the MIME-TYPE
            this.read("data:" + file.type + ";base64," + file.data);
        };

        this.readAsBinaryString = function(file){
            this.read(atob(file.data));
        };
        this.readAsText = function(file, encoding){
            this.read(atob(file.data));
        };

        // Generic response
        // Passes a fake ProgressEvent
        this.read = function(result,opt){
            this.result = result;
            if (this.onload) {
                this.onload({
                    target: { result: result },
                });
            }
            else throw ("Please define the onload event handler first");
        };
    };


})();


/**
 * Base64 Encoding as documented at...
 * http://www.webtoolkit.info/javascript-base64.html
 */
(function(){
    if( "atob" in window ){
        return;
    }

    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    window.btoa = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    };

    // public method for decoding
    window.atob = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;
    };
    var Base64 = {
        // private method for UTF-8 encoding
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        // private method for UTF-8 decoding
        _utf8_decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while ( i < utftext.length ) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }
    }
})();