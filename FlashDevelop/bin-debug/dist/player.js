this["Player"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(6), __webpack_require__(15), __webpack_require__(16), __webpack_require__(17), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_RESULT__ = function(utils, analyze_video, MobileVideo, H5Video, LetvVideo, CztvVideo, MangoVideo, LoadingComponent) {
	  var VenvyPLayer;
	  return VenvyPLayer = (function() {
	    function VenvyPLayer(parentContainer, params) {
	      this.parentContainer = parentContainer;
	      this.params = params;
	      this.parentContainer = utils.parseToJquery(this.parentContainer);
	      this.stamp = new Date().getTime();
	      this.cur_play_video = 0;
	      this.mute_flag = false;
	      this.first_to_play = true;
	      this.error_test_step = 5;
	      this.error_test = 5;
	      this.loadingComponent = void 0;
	      this.render();
	      this.cur_play_video = this.container;
	      this.container.get(0).tabIndex = 0;
	      this.model = {};
	    }

	    VenvyPLayer.prototype.insert_dots = function(dots) {
	      if (this.videoController.insertDots) {
	        return this.videoController.insertDots(dots);
	      }
	    };

	    VenvyPLayer.prototype.check_dot = function(id) {
	      if (this.videoController.checkDot) {
	        return this.videoController.checkDot(id);
	      }
	    };

	    VenvyPLayer.prototype.init = function(video_url, time1, params) {
	      this.video_url = video_url;
	      this.time = time1;
	      this.params = params;
	      if (navigator.userAgent.match(/iPhone|iPad|Android/)) {
	        this.videoController = new MobileVideo(this, this.video_url, this.time);
	      } else {
	        if (/^\$.+cloudletv$/.test(this.video_url)) {
	          this.videoController = new LetvVideo(this, this.video_url, this.time);
	        } else if (/^\$.+cztv$/.test(this.video_url)) {
	          this.videoController = new CztvVideo(this, this.video_url, this.time);
	        } else if (/^\$.+hunantv$/.test(this.video_url)) {
	          this.videoController = new MangoVideo(this, this.video_url, this.time);
	        } else {
	          this.videoController = new H5Video(this, this.video_url, this.time);
	        }
	      }
	      this.cur_format = this.params.auto_format === true ? 'auto' : this.params.force_format || 'HD';
	      return analyze_video(this.video_url, this.params, this.analyze_success.bind(this));
	    };

	    VenvyPLayer.prototype.analyze_success = function(err, seg, total_time, cur_site) {
	      if (err != null) {
	        this.videoController.player_control_bar.showLoading('解析视频错误');
	        if (this.params.parse_error_callback != null) {
	          this.params.parse_error_callback();
	        }
	        return;
	      }
	      this.is_consing = false;
	      this.cur_address = seg;
	      this.total_time = total_time;
	      this.cur_site = cur_site;
	      return this.videoController.init(this.cur_address, this.total_time, this.cur_site);
	    };

	    VenvyPLayer.prototype.render = function() {
	      var chi;
	      chi = "<div class='container" + this.stamp + "' style='height:100%;width:100%;position:relative;background:black'></div>";
	      this.parentContainer.append(chi);
	      return this.container = this.parentContainer.find(".container" + this.stamp);
	    };

	    VenvyPLayer.prototype.play = function() {
	      return this.videoController.play(true);
	    };

	    VenvyPLayer.prototype.pause = function() {
	      return this.videoController.pause(true);
	    };

	    VenvyPLayer.prototype.jumpTo = function(thetime) {
	      return this.videoController.jump(thetime);
	    };

	    VenvyPLayer.prototype.set_src = function(new_video_url, time) {
	      var n;
	      n = new VenvyPLayer(this.parentContainer, this.params);
	      n.show_loading();
	      n.init(new_video_url, time, this.params);
	      this.destroy();
	      return n;
	    };

	    VenvyPLayer.prototype.destroy = function() {
	      clearInterval(this.videoController.buffing);
	      return this.container.remove();
	    };

	    VenvyPLayer.prototype.get_total_time = function() {
	      return this.videoController.total_time || 0;
	    };

	    VenvyPLayer.prototype.show_loading = function() {
	      return this.loadingComponent = new LoadingComponent(this);
	    };

	    VenvyPLayer.prototype.hide_loading = function() {
	      if (this.loadingComponent) {
	        return this.loadingComponent.destory();
	      }
	    };

	    VenvyPLayer.prototype.get_time = function() {
	      return this.videoController.getCurtime();
	    };

	    VenvyPLayer.prototype.hide_the_player_bar = function() {
	      return this.videoController.hidePlayerControlBar();
	    };

	    VenvyPLayer.prototype.show_the_player_bar = function() {
	      return this.videoController.showPlayerControlBar();
	    };

	    VenvyPLayer.prototype.start_keypress_event = function() {
	      return this.videoController.setKeyEventStart();
	    };

	    VenvyPLayer.prototype.end_keypress_event = function() {
	      return this.videoController.setKeyEventStop();
	    };

	    VenvyPLayer.prototype.is_pause = function() {
	      return this.videoController.isPause();
	    };

	    VenvyPLayer.prototype.get_video_proportion = function() {
	      return this.videoController.getVideoProportion();
	    };

	    VenvyPLayer.prototype.get_current_video = function() {
	      return this.videoController.getCurrentVideo();
	    };

	    VenvyPLayer.prototype.getNow = function(isTotal) {
	      return this.videoController.getNow(isTotal);
	    };

	    return VenvyPLayer;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var CHARACTERS, CHARMAP, INVALID_CHARACTERS, InvalidSequenceError, ajax, base64_decode, base64_encode, callbackCount, callbackHandle, callbackPrefix, canPlayM3U8, char, exitfullscreen, fix_the_format, format_time, fromCharCode, fullscreen, get_videojjparse_url, i, isElement, isString, isjQuery, j, joinUrl, jsonp, len1, load_css, noop, parseToJquery, parse_search, queryString, ref, timeoutDelay;
	  isElement = function(o) {
	    if (typeof HTMLElement === 'object') {
	      return o instanceof HTMLElement;
	    } else {
	      return o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
	    }
	  };
	  isjQuery = function(o) {
	    return o instanceof $;
	  };
	  isString = function(o) {
	    return (typeof o === 'string') && o.constructor === String;
	  };
	  parseToJquery = function(container) {
	    var cc;
	    cc = (function() {
	      switch (false) {
	        case (isElement(container)) !== true:
	          return $(container);
	        case (isjQuery(container)) !== true:
	          return container;
	        case (isString(container)) !== true:
	          return $("#" + container);
	      }
	    })();
	    if (cc != null) {
	      cc.css({
	        'overflow': 'hidden',
	        'background': 'black'
	      });
	      if ((cc.css('position')) === 'static') {
	        cc.css('position', 'relative');
	      }
	    }
	    return cc;
	  };
	  fromCharCode = String.fromCharCode;
	  CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	  INVALID_CHARACTERS = /[^a-z\d\+\=\/]/ig;
	  CHARMAP = {};
	  ref = CHARACTERS.split('');
	  for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	    char = ref[i];
	    CHARMAP[char] = i;
	  }
	  InvalidSequenceError = (function(superClass) {
	    extend(InvalidSequenceError, superClass);

	    InvalidSequenceError.prototype.name = 'InvalidSequence';

	    function InvalidSequenceError(char) {
	      if (char) {
	        this.message = "\"" + char + "\" is an invalid Base64 character";
	      } else {
	        this.message = 'Invalid bytes sequence';
	      }
	    }

	    return InvalidSequenceError;

	  })(Error);
	  base64_decode = function(input) {
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4, length, output;
	    output = '';
	    i = 0;
	    length = input.length;
	    if (length % 4) {
	      throw new InvalidSequenceError;
	    }
	    while (i < length) {
	      enc1 = CHARMAP[input.charAt(i++)];
	      enc2 = CHARMAP[input.charAt(i++)];
	      enc3 = CHARMAP[input.charAt(i++)];
	      enc4 = CHARMAP[input.charAt(i++)];
	      chr1 = (enc1 << 2) | (enc2 >> 4);
	      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	      chr3 = ((enc3 & 3) << 6) | enc4;
	      output += fromCharCode(chr1);
	      if (enc3 !== 64) {
	        output += fromCharCode(chr2);
	      }
	      if (enc4 !== 64) {
	        output += fromCharCode(chr3);
	      }
	    }
	    return output;
	  };
	  base64_encode = function(str) {
	    var base64EncodeChars, c1, c2, c3, len, string;
	    c1 = void 0;
	    c2 = void 0;
	    c3 = void 0;
	    base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	    i = 0;
	    len = str.length;
	    string = '';
	    while (i < len) {
	      c1 = str.charCodeAt(i++) & 0xff;
	      if (i === len) {
	        string += base64EncodeChars.charAt(c1 >> 2);
	        string += base64EncodeChars.charAt((c1 & 0x3) << 4);
	        string += '==';
	        break;
	      }
	      c2 = str.charCodeAt(i++);
	      if (i === len) {
	        string += base64EncodeChars.charAt(c1 >> 2);
	        string += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
	        string += base64EncodeChars.charAt((c2 & 0xF) << 2);
	        string += '=';
	        break;
	      }
	      c3 = str.charCodeAt(i++);
	      string += base64EncodeChars.charAt(c1 >> 2);
	      string += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
	      string += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
	      string += base64EncodeChars.charAt(c3 & 0x3F);
	    }
	    return string;
	  };
	  format_time = function(s) {
	    var seconds;
	    seconds = parseInt(s);
	    return Math.floor(seconds / 60).toString().replace(/^([0-9])$/, '0$1') + ':' + Math.floor(seconds % 60).toString().replace(/^([0-9])$/, '0$1');
	  };
	  fullscreen = function(container_dom) {
	    container_dom = container_dom[0];
	    if (container_dom.requestFullscreen) {
	      return container_dom.requestFullscreen();
	    } else if (container_dom.mozRequestFullScreen) {
	      return container_dom.mozRequestFullScreen();
	    } else if (container_dom.webkitRequestFullScreen) {
	      return container_dom.webkitRequestFullScreen();
	    } else if (container_dom.msRequestFullscreen) {
	      return container_dom.msRequestFullscreen();
	    } else {
	      $(container_dom).css({
	        'position': 'fixed',
	        'left': 0,
	        'top': 0
	      }).parent().css({
	        'z-index': 2147483647
	      });
	      window.fullScreen = $(container_dom);
	      $(document).trigger('fullscreenChange');
	      return $('body').css('overflow', 'hidden');
	    }
	  };
	  exitfullscreen = function() {
	    if (document.exitFullscreen) {
	      return document.exitFullscreen();
	    } else if (document.msExitFullscreen) {
	      return document.msExitFullscreen();
	    } else if (document.mozCancelFullScreen) {
	      return document.mozCancelFullScreen();
	    } else if (document.webkitCancelFullScreen) {
	      return document.webkitCancelFullScreen();
	    } else {
	      window.fullScreen.css({
	        'position': 'relative'
	      }).parent().css({
	        'z-index': '1'
	      });
	      $('body').css('overflow', 'auto');
	      window.fullScreen = null;
	      return $(document).trigger('fullscreenChange');
	    }
	  };
	  fix_the_format = function(s) {
	    switch (s) {
	      case 'SD':
	        return '标清';
	      case 'HD':
	        return '高清';
	      case 'SuperHD':
	        return '超清';
	    }
	    return s;
	  };
	  load_css = function(s) {
	    return $("<link/>", {
	      rel: "stylesheet",
	      type: "text/css",
	      href: "/css/" + s + ".css"
	    }).appendTo("head");
	  };
	  parse_search = function(s) {
	    var r;
	    r = {};
	    s = s.substring(1, s.length);
	    s.split('&').forEach(function(n) {
	      var a;
	      a = n.split('=');
	      return r[a[0]] = a[1];
	    });
	    return r;
	  };
	  noop = function() {};
	  get_videojjparse_url = function() {
	    var s;
	    s = parse_search(window.location.search);
	    return s['videojjhost'] || 'test.videojj.com:18080';
	  };
	  queryString = function(obj) {
	    var key, query, value;
	    query = [];
	    for (key in obj) {
	      value = obj[key];
	      if (obj.hasOwnProperty(key)) {
	        query.push([key, value].join('='));
	      }
	    }
	    return query.join('&');
	  };
	  callbackPrefix = 'MAMA2_HTTP_JSONP_CALLBACK';
	  callbackCount = 0;
	  timeoutDelay = 10000;
	  callbackHandle = function() {
	    return callbackPrefix + callbackCount++;
	  };
	  jsonp = function(url, callback, callbackKey) {
	    var _callbackHandle, script, timeoutTimer;
	    console.log('query url', url);
	    callbackKey = callbackKey || 'callback';
	    _callbackHandle = callbackHandle();
	    window[_callbackHandle] = function(rs) {
	      clearTimeout(timeoutDelay);
	      window[_callbackHandle] = noop;
	      callback(rs);
	      return document.body.removeChild(script);
	    };
	    timeoutTimer = setTimeout((function() {
	      return window[_callbackHandle](-1);
	    }), timeoutDelay);
	    script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url + (url.indexOf('?') === -1 ? '?' : '&') + callbackKey + '=' + _callbackHandle;
	    return document.body.appendChild(script);
	  };
	  joinUrl = function(url, queryString) {
	    if (queryString.length === 0) {
	      return url;
	    }
	    return url + (url.indexOf('?') === -1 ? '?' : '&') + queryString;
	  };
	  ajax = function(options) {
	    var callback, contentType, context, method, query, url, xhr;
	    url = options.url || '';
	    query = queryString(options.param || {});
	    method = options.method || 'GET';
	    callback = options.callback || function() {};
	    contentType = options.contentType || 'json';
	    context = options.context || null;
	    if (options.jsonp) {
	      return jsonp(joinUrl(url, query), callback.bind(context), typeof options.jsonp === 'string' ? options.jsonp : void 0);
	    }
	    xhr = new XMLHttpRequest();
	    if (method.toLowerCase() === 'get') {
	      url = joinUrl(url, query);
	      query = '';
	    }
	    xhr.open(method, url, true);
	    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	    xhr.send(query);
	    return xhr.onreadystatechange = function() {
	      var data, e, error;
	      if (xhr.readyState === 4) {
	        if (xhr.status === 200) {
	          data = xhr.responseText;
	          if (contentType.toLowerCase() === 'json') {
	            try {
	              data = JSON.parse(data);
	            } catch (error) {
	              e = error;
	              data = -1;
	            }
	            return callback.call(context, data);
	          } else {
	            return callback.call(context, -1);
	          }
	        }
	      }
	    };
	  };
	  canPlayM3U8 = function() {
	    return true;
	  };
	  return {
	    get_videojjparse_url: get_videojjparse_url,
	    load_css: load_css,
	    parseToJquery: parseToJquery,
	    base64_encode: base64_encode,
	    base64_decode: base64_decode,
	    format_time: format_time,
	    fullscreen: fullscreen,
	    exitfullscreen: exitfullscreen,
	    fix_the_format: fix_the_format,
	    ajax: ajax,
	    canPlayM3U8: canPlayM3U8
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(utils, youku) {
	  var analyze_video;
	  analyze_video = function(video_url, args, callback) {
	    var ATTEMPT_MAX, Appkey, _i, cur_site, headers, host, params, parse_video, parse_video_2, segs, total_time;
	    ATTEMPT_MAX = 0;
	    if (args.need_analyze === true) {
	      switch (args.site) {
	        case 'plu':
	          _i = 0;
	          parse_video = function(video_url, callback) {
	            return $.ajax({
	              type: 'get',
	              url: video_url,
	              dataType: 'json',
	              timeout: 10000,
	              async: true,
	              success: function(data) {
	                var a, cur_site, j, len, n_clearify, out, ref, total_time;
	                ref = data.urls;
	                for (j = 0, len = ref.length; j < len; j++) {
	                  a = ref[j];
	                  cur_site = 'plu';
	                  total_time = 0;
	                  out = a.Resolution.split('x');
	                  n_clearify = +out[1];
	                  if (n_clearify >= 1080) {
	                    segs['1080p'] = [
	                      {
	                        url: a.SecurityUrl + "?a=0",
	                        seconds: 0,
	                        size: 0,
	                        number: 0
	                      }
	                    ];
	                  }
	                  if (n_clearify >= 720) {
	                    segs['720p'] = [
	                      {
	                        url: a.SecurityUrl + "?a=0",
	                        seconds: 0,
	                        size: 0,
	                        number: 0
	                      }
	                    ];
	                  }
	                  if (n_clearify >= 480) {
	                    segs.SuperHD = [
	                      {
	                        url: a.SecurityUrl + "?a=0",
	                        seconds: 0,
	                        size: 0,
	                        number: 0
	                      }
	                    ];
	                  }
	                  if (n_clearify >= 360) {
	                    segs.SD = [
	                      {
	                        url: a.SecurityUrl + "?a=0",
	                        seconds: 0,
	                        size: 0,
	                        number: 0
	                      }
	                    ];
	                  }
	                  if (n_clearify < 360) {
	                    segs.SD = [
	                      {
	                        url: a.SecurityUrl + "?a=0",
	                        seconds: 0,
	                        size: 0,
	                        number: 0
	                      }
	                    ];
	                  }
	                }
	                return callback(null, segs, total_time, cur_site);
	              },
	              error: function(err) {
	                return setTimeout(function() {
	                  if (_i < ATTEMPT_MAX) {
	                    parse_video(video_url, callback);
	                    return _i++;
	                  } else {
	                    return callback(err);
	                  }
	                }, 500);
	              }
	            });
	          };
	          return parse_video(video_url, callback);
	        default:
	          Appkey = utils.base64_encode(args.Appkey);
	          headers = {};
	          headers.Appkey = Appkey;
	          _i = 0;
	          host = utils.get_videojjparse_url();
	          if ((video_url.indexOf('#videoId=')) === 0) {
	            params = {
	              videoId: video_url.substring(video_url.indexOf('=') + 1).trim()
	            };
	          } else {
	            params = {
	              url: utils.base64_encode(video_url)
	            };
	          }
	          parse_video_2 = function(video_url, callback) {
	            return $.ajax({
	              type: 'get',
	              url: 'http://' + host + '/api/videos/parse',
	              dataType: 'json',
	              timeout: 2000,
	              async: true,
	              data: params,
	              headers: headers,
	              success: function(data) {
	                var cur_site, total_time;
	                data = data.msg;
	                if (data != null) {
	                  if (data.error != null) {
	                    return setTimeout(function() {
	                      if (_i < ATTEMPT_MAX) {
	                        parse_video_2(video_url, callback);
	                        return _i++;
	                      } else {
	                        return callback(data.error);
	                      }
	                    }, 500);
	                  } else {
	                    cur_site = data.site;
	                    total_time = data.time_length;
	                    Object.keys(data.segs).forEach(function(k) {
	                      return data.segs[k].forEach(function(n, i) {
	                        n.seconds = n.seconds || 0;
	                        n.size = n.size || 0;
	                        return n.number = n.number || i;
	                      });
	                    });
	                    return callback(null, data.segs, total_time, cur_site);
	                  }
	                }
	              },
	              error: function(err) {
	                return setTimeout(function() {
	                  if (_i < ATTEMPT_MAX) {
	                    parse_video_2(video_url, callback);
	                    return _i++;
	                  } else {
	                    return callback(err);
	                  }
	                }, 500);
	              }
	            });
	          };
	          return parse_video_2(video_url, callback);
	      }
	    } else {
	      segs = {};
	      cur_site = args.site;
	      total_time = 0;
	      segs.HD = [
	        {
	          url: video_url,
	          seconds: 0,
	          size: 0,
	          number: 0
	        }
	      ];
	      return callback(null, segs, total_time, cur_site);
	    }
	  };
	  return analyze_video;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(utils) {
	  var canPlayM3U8, log, parse;
	  canPlayM3U8 = true;
	  log = function(msg) {
	    return console.log(msg);
	  };
	  parse = function(_id, callback) {
	    var D, E, F, T, U, decode64, mk_a3, mk_a4, na, rs, sid, token, userCache_a1, userCache_a2;
	    decode64 = utils.base64_decode;
	    na = function(a) {
	      var b, c, e, f, h, i;
	      if (!a) {
	        return "";
	      }
	      a = a.toString();
	      c = void 0;
	      b = void 0;
	      f = void 0;
	      i = void 0;
	      e = void 0;
	      h = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
	      i = a.length;
	      f = 0;
	      e = "";
	      while (f < i) {
	        while (true) {
	          c = h[a.charCodeAt(f++) & 255];
	          if (!(f < i && -1 === c)) {
	            break;
	          }
	        }
	        if (-1 === c) {
	          break;
	        }
	        while (true) {
	          b = h[a.charCodeAt(f++) & 255];
	          if (!(f < i && -1 === b)) {
	            break;
	          }
	        }
	        if (-1 === b) {
	          break;
	        }
	        e += String.fromCharCode(c << 2 | (b & 48) >> 4);
	        while (true) {
	          c = a.charCodeAt(f++) & 255;
	          if (61 === c) {
	            return e;
	          }
	          c = h[c];
	          if (!(f < i && -1 === c)) {
	            break;
	          }
	        }
	        if (-1 === c) {
	          break;
	        }
	        e += String.fromCharCode((b & 15) << 4 | (c & 60) >> 2);
	        while (true) {
	          b = a.charCodeAt(f++) & 255;
	          if (61 === b) {
	            return e;
	          }
	          b = h[b];
	          if (!(f < i && -1 === b)) {
	            break;
	          }
	        }
	        if (-1 === b) {
	          break;
	        }
	        e += String.fromCharCode((c & 3) << 6 | b);
	      }
	      return e;
	    };
	    D = function(a) {
	      var b, c, e, f, g, h;
	      if (!a) {
	        return "";
	      }
	      a = a.toString();
	      c = void 0;
	      b = void 0;
	      f = void 0;
	      e = void 0;
	      g = void 0;
	      h = void 0;
	      f = a.length;
	      b = 0;
	      c = "";
	      while (b < f) {
	        e = a.charCodeAt(b++) & 255;
	        if (b === f) {
	          c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2);
	          c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((e & 3) << 4);
	          c += "==";
	          break;
	        }
	        g = a.charCodeAt(b++);
	        if (b === f) {
	          c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2);
	          c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((e & 3) << 4 | (g & 240) >> 4);
	          c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((g & 15) << 2);
	          c += "=";
	          break;
	        }
	        h = a.charCodeAt(b++);
	        c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2);
	        c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((e & 3) << 4 | (g & 240) >> 4);
	        c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((g & 15) << 2 | (h & 192) >> 6);
	        c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(h & 63);
	      }
	      return c;
	    };
	    E = function(a, c) {
	      var b, e, f, h, i, q;
	      b = [];
	      f = 0;
	      i = void 0;
	      e = '';
	      h = 0;
	      while (256 > h) {
	        b[h] = h;
	        h++;
	      }
	      h = 0;
	      while (256 > h) {
	        f = (f + b[h] + a.charCodeAt(h % a.length)) % 256;
	        i = b[h];
	        b[h] = b[f];
	        b[f] = i;
	        h++;
	      }
	      q = 0;
	      f = 0;
	      h = 0;
	      while (q < c.length) {
	        h = (h + 1) % 256;
	        f = (f + b[h]) % 256;
	        i = b[h];
	        b[h] = b[f];
	        b[f] = i;
	        e += String.fromCharCode(c.charCodeAt(q) ^ b[(b[h] + b[f]) % 256]);
	        q++;
	      }
	      return e;
	    };
	    F = function(a, c) {
	      var b, e, f, i;
	      b = [];
	      f = 0;
	      while (f < a.length) {
	        i = 0;
	        i = ("a" <= a[f] && "z" >= a[f] ? a[f].charCodeAt(0) - 97 : a[f] - 0 + 26);
	        e = 0;
	        while (36 > e) {
	          if (c[e] === i) {
	            i = e;
	            break;
	          }
	          e++;
	        }
	        b[f] = (25 < i ? i - 26 : String.fromCharCode(i + 97));
	        f++;
	      }
	      return b.join("");
	    };
	    T = function(a, c) {
	      var b, f, g, h, i, q, results;
	      this._sid = sid;
	      this._seed = a.seed;
	      this._fileType = c;
	      b = new U(this._seed);
	      this._streamFileIds = a.streamfileids;
	      this._videoSegsDic = {};
	      results = [];
	      for (c in a.segs) {
	        f = [];
	        i = 0;
	        g = 0;
	        while (g < a.segs[c].length) {
	          h = a.segs[c][g];
	          q = {};
	          q.no = h.no;
	          q.size = h.size;
	          q.seconds = h.seconds;
	          h.k && (q.key = h.k);
	          q.fileId = this.getFileId(a.streamfileids, c, parseInt(g), b);
	          q.type = c;
	          q.src = this.getVideoSrc(h.no, a, c, q.fileId);
	          f[i++] = q;
	          g++;
	        }
	        results.push(this._videoSegsDic[c] = f);
	      }
	      return results;
	    };
	    U = function(a) {
	      this._randomSeed = a;
	      return this.cg_hun();
	    };
	    log("开始解析youku视频地址");
	    mk_a3 = "b4et";
	    mk_a4 = "boa4";
	    userCache_a1 = "4";
	    userCache_a2 = "1";
	    rs = void 0;
	    sid = void 0;
	    token = void 0;
	    U.prototype = {
	      cg_hun: function() {
	        var a, b, c, f, results;
	        this._cgStr = "";
	        a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890";
	        c = a.length;
	        b = 0;
	        results = [];
	        while (b < c) {
	          f = parseInt(this.ran() * a.length);
	          this._cgStr += a.charAt(f);
	          a = a.split(a.charAt(f)).join("");
	          results.push(b++);
	        }
	        return results;
	      },
	      cg_fun: function(a) {
	        var b, c;
	        a = a.split("*");
	        c = "";
	        b = 0;
	        while (b < a.length - 1) {
	          c += this._cgStr.charAt(a[b]);
	          b++;
	        }
	        return c;
	      },
	      ran: function() {
	        this._randomSeed = (211 * this._randomSeed + 30031) % 65536;
	        return this._randomSeed / 65536;
	      }
	    };
	    T.prototype = {
	      getFileId: function(a, c, b, f) {
	        var i, streamFid;
	        for (i in a) {
	          if (i === c) {
	            streamFid = a[i];
	            break;
	          }
	        }
	        if ("" === streamFid) {
	          return "";
	        }
	        c = f.cg_fun(streamFid);
	        a = c.slice(0, 8);
	        b = b.toString(16);
	        1 === b.length && (b = "0" + b);
	        b = b.toUpperCase();
	        c = c.slice(10, c.length);
	        return a + b + c;
	      },
	      getVideoSrc: function(a, c, d, f, i, g) {
	        var h, k, l, q;
	        if (!c.videoid || !d) {
	          return "";
	        }
	        h = {
	          flv: 0,
	          flvhd: 0,
	          mp4: 1,
	          hd2: 2,
	          "3gphd": 1,
	          "3gp": 0
	        };
	        [
	          {
	            d: d
	          }
	        ];
	        q = {
	          flv: "flv",
	          mp4: "mp4",
	          hd2: "flv",
	          "3gphd": "mp4",
	          "3gp": "flv"
	        };
	        [
	          {
	            d: d
	          }
	        ];
	        k = a.toString(16);
	        1 === k.length && (k = "0" + k);
	        l = c.segs[d][a].seconds;
	        a = c.segs[d][a].k;
	        if ("" === a || -1 === a) {
	          a = c.key2 + c.key1;
	        }
	        d = "";
	        c.show && (d = (c.show.show_paid ? "&ypremium=1" : "&ymovie=1"));
	        c = "/player/getFlvPath/sid/" + sid + "_" + k + "/st/" + q + "/fileid/" + f + "?K=" + a + "&hd=" + h + "&myp=0&ts=" + l + "&ypp=0" + d;
	        f = encodeURIComponent(D(E(F(mk_a4 + "poz" + userCache_a2, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), sid + "_" + f + "_" + token)));
	        c = c + ("&ep=" + f) + "&ctype=12&ev=1" + ("&token=" + token);
	        c += "&oip=" + rs.data[0].ip;
	        return "http://k.youku.com" + (c + ((i ? "/password/" + i : "") + (g ? g : "")));
	      }
	    };
	    return utils.ajax({
	      url: "http://play.youku.com/play/get.json?vid=" + _id + "&ct=12",
	      jsonp: true,
	      callback: function(param) {
	        var a, c, ep, oip, source, t;
	        if (param === -1) {
	          log("解析youku视频地址失败", 2);
	        }
	        rs = param;
	        a = param.data;
	        c = E(F(mk_a3 + "o0b" + userCache_a1, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), utils.base64_decode(a.security.encrypt_string));
	        c = c.split("_");
	        sid = c[0];
	        token = c[1];
	        if (canPlayM3U8 && navigator.userAgent.indexOf("PlayStation") === -1) {
	          ep = encodeURIComponent(D(E(F(mk_a4 + "poz" + userCache_a2, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), sid + "_" + _id + "_" + token)));
	          oip = a.ip;
	          source = [["SuperHD", "http://pl.youku.com/playlist/m3u8?vid=" + _id + "&type=hd2&ctype=12&keyframe=1&ep=" + ep + "&sid=" + sid + "&token=" + token + "&ev=1&oip=" + oip], ["HD", "http://pl.youku.com/playlist/m3u8?vid=" + _id + "&type=mp4&ctype=12&keyframe=1&ep=" + ep + "&sid=" + sid + "&token=" + token + "&ev=1&oip=" + oip], ["SD", "http://pl.youku.com/playlist/m3u8?vid=" + _id + "&type=flv&ctype=12&keyframe=1&ep=" + ep + "&sid=" + sid + "&token=" + token + "&ev=1&oip=" + oip]];
	          log("解析youku视频地址成功 " + source.map(function(item) {
	            return "<a href=" + item[1] + ">" + item[0] + "</a>";
	          }).join(" "), 2);
	          return callback(source);
	        } else {
	          t = new T(a);
	          source = [["SD", t._videoSegsDic["3gphd"][0].src]];
	          log("解析youku视频地址成功 " + source.map(function(item) {
	            return "<a href=" + item[1] + ">" + item[0] + "</a>";
	          }).join(" "), 2);
	          return callback(source);
	        }
	      }
	    });
	  };
	  return {
	    parse: parse
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(utils, MobileControlBar) {
	  var $bar, $fsBtn, $playBtn, $seekerRange, $style, $timeCurrent, $timeTotal, MobileVideo;
	  $bar = null;
	  $playBtn = null;
	  $fsBtn = null;
	  $seekerRange = null;
	  $timeTotal = null;
	  $timeCurrent = null;
	  $style = null;
	  MobileVideo = (function() {
	    function MobileVideo(venvyPlayer, video_url, time1, cur_url) {
	      this.venvyPlayer = venvyPlayer;
	      this.video_url = video_url;
	      this.time = time1;
	      this.cur_url = cur_url;
	      $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">');
	    }

	    MobileVideo.prototype.init = function(cur_address, total_time, cur_site) {
	      var key;
	      this.cur_address = cur_address;
	      this.total_time = total_time;
	      this.cur_site = cur_site;
	      if (this.cur_url == null) {
	        switch (this.cur_site) {
	          case 'plu':
	            this.cur_url = this.cur_address.SD[0].url;
	            this.total_time = this.cur_address.SD[0].seconds;
	            break;
	          case 'youku':
	            if (this.cur_address['Mobile-m3u8-MP4-HD']) {
	              key = 'Mobile-m3u8-MP4-HD';
	            } else if (this.cur_address['Mobile-m3u8-SuperHD']) {
	              key = 'Mobile-m3u8-SuperHD';
	            } else {
	              key = 'Mobile-m3u8-SD';
	            }
	            this.cur_url = this.cur_address[key][0].url;
	            this.total_time = this.cur_address[key][0].seconds;
	            break;
	          case 'letv':
	            this.cur_url = this.cur_address['m3u8-HD'][0].url;
	            this.total_time = this.cur_address['m3u8-HD'][0].seconds;
	            break;
	          case 'qq':
	            this.cur_url = this.cur_address['SD'][0].url;
	            this.total_time = this.cur_address['SD'][0].seconds;
	            break;
	          case 'hunantv':
	            this.cur_url = this.cur_address['Mobile-MP4-HD'][0].url;
	            this.total_time = this.cur_address['Mobile-MP4-HD'][0].seconds;
	            break;
	          case 'tudou':
	            this.cur_url = this.cur_address['Mobile-m3u8-SD'][0].url;
	            this.total_time = this.cur_address['Mobile-m3u8p-SD'][0].seconds;
	            break;
	          case 'sohu':
	            this.cur_url = this.cur_address.SD[0].url;
	            this.total_time = this.cur_address.SD[0].seconds;
	            break;
	          case 'pptv':
	            this.cur_url = this.cur_address.SD[0].url;
	            this.total_time = this.cur_address.SD[0].seconds;
	            break;
	          default:
	            this.cur_url = this.cur_address.HD[0].url;
	            this.total_time = this.cur_address.HD[0].seconds;
	        }
	      }
	      this.video_end_prefix_called = false;
	      if (/MicroMessenger|Chrome/.test(navigator.userAgent)) {
	        this.MicroMessenger = true;
	        this.render();
	      } else {
	        this.renderNative();
	      }
	      this.event();
	      return this.isfullscrren = false;
	    };

	    MobileVideo.prototype.renderNative = function() {
	      var $cur_player;
	      this.venvyPlayer.container.append(MobileControlBar.renderNative(this.cur_url));
	      $cur_player = this.venvyPlayer.container.find('.cur_player');
	      this.jvideo = $cur_player;
	      return this.video = this.jvideo[0];
	    };

	    MobileVideo.prototype.render = function() {
	      var $cur_player;
	      this.venvyPlayer.container.append(MobileControlBar.html(this.cur_url));
	      $cur_player = this.venvyPlayer.container.find('.cur_player');
	      this.jvideo = $cur_player;
	      this.video = this.jvideo[0];
	      $bar = this.venvyPlayer.container.find('.mobile-control-bar');
	      $playBtn = $bar.find('.mobile-play-btn');
	      $fsBtn = $bar.find('.mobile-fullscreen-btn');
	      $seekerRange = $bar.find('.mobile-seeker-range');
	      $timeCurrent = $bar.find('.mobile-time-current');
	      return $timeTotal = $bar.find('.mobile-time-total');
	    };

	    MobileVideo.prototype.event = function() {
	      var hide_delay, self;
	      self = this;
	      this.jvideo.on('play', function() {
	        if (self.venvyPlayer.params.play_callback != null) {
	          return self.venvyPlayer.params.play_callback();
	        }
	      }).on('pause', function() {
	        if (self.venvyPlayer.params.pause_callback != null) {
	          return self.venvyPlayer.params.pause_callback();
	        }
	      }).on('seeked', function() {
	        if (self.venvyPlayer.params.start_seek_callback != null) {
	          self.venvyPlayer.params.start_seek_callback();
	        }
	        return self.play();
	      }).on('loadeddata', function() {
	        if (self.time) {
	          self.video.currentTime = self.time;
	        }
	        self.total_time = self.video.duration;
	        if (self.MicroMessenger) {
	          $timeTotal.text(utils.format_time(self.total_time));
	        }
	        if (self.venvyPlayer.params.loaded_callback != null) {
	          self.venvyPlayer.params.loaded_callback();
	        }
	        if (self.venvyPlayer.params.load_and_pause === false) {
	          return self.play();
	        }
	      }).on('timeupdate', function() {
	        var nowt;
	        nowt = self.video.currentTime;
	        self._handleTimeupdate(nowt);
	        if ((self.venvyPlayer.params.video_end_prefix_seconds != null) && self.total_time - nowt - self.venvyPlayer.params.video_end_prefix_seconds <= 0) {
	          if ((self.venvyPlayer.params.stop_callback != null) && self.video_end_prefix_called === false) {
	            self.venvyPlayer.params.stop_callback();
	          }
	          return self.video_end_prefix_called = true;
	        }
	      }).on('ended', function() {
	        if (self.venvyPlayer.params.stop_callback != null) {
	          return self.venvyPlayer.params.stop_callback();
	        }
	      });
	      if (this.MicroMessenger) {
	        $style = $('<style/>', {
	          'class': 'mobile-style'
	        }).append(MobileControlBar.style(0)).appendTo('head');
	        hide_delay = null;
	        $('.player_for_user').on('touchstart touchmove touchend', function(evt) {
	          clearTimeout(hide_delay);
	          if ($bar.hasClass('show') === false) {
	            self._showBar();
	          }
	          return hide_delay = setTimeout(function() {
	            return self._hideBar();
	          }, 2000);
	        });
	        $fsBtn.on('touchstart', function() {
	          return self._toggleFullScreen(self.isfullscrren);
	        });
	        $playBtn.on('touchstart', function() {
	          if (self.video.paused === true) {
	            return self.play();
	          } else {
	            return self.pause();
	          }
	        });
	        $seekerRange.on('change', function(evt) {
	          self.pause();
	          return self.video.currentTime = parseInt($(this).val()) / 10000 * self.total_time;
	        }).on('update', function() {
	          $style.html(MobileControlBar.style($(this).val()));
	          return $timeCurrent.text(utils.format_time(self.video.currentTime));
	        }).on('input', function() {
	          self.pause();
	          return $timeCurrent.text(utils.format_time(parseInt($(this).val()) / 10000 * self.total_time));
	        }).on('touchstart touchmove touchend', function(evt) {
	          evt.stopPropagation();
	          clearTimeout(hide_delay);
	          return hide_delay = setTimeout(function() {
	            return self._hideBar();
	          }, 1000);
	        });
	        return $(window).on('orientationchange', function(evt) {
	          if (window.orientation === 90 || window.orientation === -90) {
	            if (self.isfullscrren === false) {
	              return self._toggleFullScreen(false);
	            }
	          }
	        });
	      }
	    };

	    MobileVideo.prototype._handleTimeupdate = function(time) {
	      var val;
	      if (this.MicroMessenger) {
	        val = time / this.total_time * 10000;
	        return $seekerRange.val(val).trigger('update');
	      }
	    };

	    MobileVideo.prototype._showBar = function() {
	      if (this.MicroMessenger) {
	        $bar.addClass('show');
	        if (self.venvyPlayer.params.show_bar_callback && !$bar.hasClass('show')) {
	          return self.venvyPlayer.params.show_bar_callback();
	        }
	      }
	    };

	    MobileVideo.prototype._hideBar = function() {
	      if (this.MicroMessenger) {
	        $bar.removeClass('show');
	        if (self.venvyPlayer.params.hide_bar_callback && $bar.hasClass('show')) {
	          return self.venvyPlayer.params.hide_bar_callback();
	        }
	      }
	    };

	    MobileVideo.prototype._toggleFullScreen = function(isFS) {
	      if (isFS === true) {
	        this.isfullscrren = false;
	        $fsBtn.html('&#xe601;');
	        this.venvyPlayer.container.css({
	          'position': 'relative'
	        });
	        if (self.venvyPlayer.params.exitfullscreen_callback != null) {
	          return self.venvyPlayer.params.exitfullscreen_callback();
	        }
	      } else {
	        this.isfullscrren = true;
	        $fsBtn.html('&#xe600;');
	        this.venvyPlayer.container.css({
	          'position': 'fixed',
	          'left': 0,
	          'top': 0
	        });
	        if (self.venvyPlayer.params.fullscreen_callback != null) {
	          return self.venvyPlayer.params.fullscreen_callback();
	        }
	      }
	    };

	    MobileVideo.prototype.pause = function() {
	      this.video.pause();
	      if (this.MicroMessenger) {
	        return $playBtn.html('&#xe603;');
	      }
	    };

	    MobileVideo.prototype.play = function() {
	      this.video.play();
	      if (this.MicroMessenger) {
	        return $playBtn.html('&#xe602;');
	      }
	    };

	    MobileVideo.prototype.jump = function(t) {
	      return this.video.currentTime = t;
	    };

	    MobileVideo.prototype.remove = function() {
	      return this.jvideo.remove();
	    };

	    MobileVideo.prototype.showPlayerControlBar = function() {
	      return this._showBar();
	    };

	    MobileVideo.prototype.hidePlayerControlBar = function() {
	      return this._hideBar();
	    };

	    MobileVideo.prototype.getCurtime = function() {
	      if (this.video) {
	        return this.video.currentTime;
	      } else {
	        return this.time || 0;
	      }
	    };

	    MobileVideo.prototype.getVideoProportion = function() {
	      return this.video.videoWidth / this.video.videoHeight;
	    };

	    MobileVideo.prototype.getCurrentVideo = function() {
	      return this.video;
	    };

	    MobileVideo.prototype.isPause = function() {
	      return this.video.paused;
	    };

	    return MobileVideo;

	  })();
	  return MobileVideo;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var html, renderNative, style;
	  renderNative = function(url) {
	    return "<video id='video1' webkit-playsinline class='venvy_videos cur_player' src='" + url + "' preload='auto' autoplay controls></video>";
	  };
	  html = function(url) {
	    return "<div class='player_for_user' oncontextmenu='return false' style='position:absolute;z-index:30;height:100%;width:100%;color:white'>\n</div>\n<video id='video1' webkit-playsinline class='venvy_videos cur_player' src='" + url + "' preload='auto' autoplay></video>\n<div class=\"mobile-control-bar\">\n  <button class=\"mobile-play-btn player_control_bar_iconfont\">&#xe603;</button>\n  <div class=\"mobile-time-current\">00:00</div>\n  <div class=\"mobile-seeker\">\n    <input class=\"mobile-seeker-range\" type=\"range\" value=\"0\" min=\"0\" max=\"10000\" step=\"1\" />\n  </div>\n  <div class=\"mobile-time-total\"></div>\n  <button class=\"mobile-fullscreen-btn player_control_bar_iconfont\">&#xe601;</button>\n</div>";
	  };
	  style = function(val) {
	    return ".mobile-seeker-range::-webkit-slider-runnable-track {\n  background-image: linear-gradient(to right, rgb(9, 209, 177) " + (parseInt(val) / 100) + "%, rgba(48, 40, 44, .5) " + (parseInt(val) / 100) + "%, rgba(48, 40, 44, 0.5) 100%);\n}";
	  };
	  return {
	    renderNative: renderNative,
	    html: html,
	    style: style
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(9), __webpack_require__(10), __webpack_require__(11), __webpack_require__(12), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(add_video_clarity, create_play_list, HtmlVideoPlayer, FlashPlayer, PlayerControlBar, utils) {
	  var H5Video;
	  H5Video = (function() {
	    function H5Video(venvyPlayer, video_url, time1) {
	      this.venvyPlayer = venvyPlayer;
	      this.video_url = video_url;
	      this.time = time1;
	      this.self = this;
	      this.curtime = this.time || 0;
	      this.ended = 0;
	      this.isend = false;
	      this.playcalled = false;
	      this.players = [];
	      this.lastplayer = void 0;
	      this.buffing = void 0;
	      this.firstVideoLoaded = false;
	      this.video_end_profix_called = false;
	      this.SKINLIST = {
	        0: 'base',
	        1: 'technology',
	        2: 'gradual'
	      };
	      this.LEGELFORMAT = ['1080p', '720p', 'SuperHD', 'HD', 'SD'];
	      this.video_format_list = [];
	      this.stalled_try_count = 10;
	      this.player_control_bar = new PlayerControlBar(this.venvyPlayer, this.venvyPlayer.params);
	      if (this.venvyPlayer.params.skin_select >= 0) {
	        this.load_css(this.venvyPlayer.params.skin_select);
	      } else {
	        this.load_css(0);
	      }
	      if (this.venvyPlayer.params.editor_mode === (typeof true !== "undefined" && true !== null)) {
	        this.venvyPlayer.container.find('.is_buffering').remove();
	      }
	      if (this.venvyPlayer.params.is_live === true) {
	        this.player_control_bar.hideProgress();
	      }
	    }

	    H5Video.prototype.init = function(cur_address, total_time, cur_site) {
	      var _x, self;
	      this.cur_address = cur_address;
	      this.total_time = total_time;
	      this.cur_site = cur_site;
	      self = this;
	      this.player_control_bar.video_controller_register(this);
	      if (this.venvyPlayer.need_to_return_clarify !== false) {
	        add_video_clarity(this.venvyPlayer, this.cur_address);
	        this.venvyPlayer.need_to_return_clarify = false;
	        Object.keys(this.cur_address).forEach(function(n) {
	          if (n !== self.venvyPlayer.cur_format && indexOf.call(self.LEGELFORMAT, n) >= 0) {
	            return self.video_format_list.push(n);
	          }
	        });
	      }
	      this._loadResource(this.venvyPlayer.cur_format);
	      _x = this._changeCurplay(this.curtime);
	      this.curplayer.load();
	      this.curplayer.show();
	      return this.curplayer.jump(_x);
	    };

	    H5Video.prototype.insertDots = function(dots) {
	      return this.player_control_bar.insertDots(dots);
	    };

	    H5Video.prototype.checkDot = function(id) {
	      return this.player_control_bar.checkDot(id);
	    };

	    H5Video.prototype.load_css = function(num) {
	      return this.player_control_bar.player_control_bar.addClass('skin_' + num);
	    };

	    H5Video.prototype.getCurrentVideo = function() {
	      return this.curplayer.getCurrentVideo();
	    };

	    H5Video.prototype.setKeyEventStop = function() {
	      return this.player_control_bar.setKeyEventStop();
	    };

	    H5Video.prototype.setKeyEventStart = function() {
	      return this.player_control_bar.setKeyEventStart();
	    };

	    H5Video.prototype.getCurtime = function() {
	      return this.curtime;
	    };

	    H5Video.prototype.getNow = function(isTotal) {
	      var offset;
	      if (this.curplayer.video.hasOwnProperty('get')) {
	        if (isTotal) {
	          return this.curplayer.getCurrentTime();
	        } else {
	          return this.curplayer.video.get('currentTime');
	        }
	      } else if (this.curplayer.video.hasOwnProperty('getProperty')) {
	        if (isTotal) {
	          return this.curplayer.getCurrentTime();
	        } else {
	          return this.curplayer.video.getProperty('currentTime');
	        }
	      } else {
	        offset = this._getOffsetSecond();
	        if (isTotal) {
	          return offset + this.curplayer.video.currentTime;
	        } else {
	          return this.curplayer.video.currentTime;
	        }
	      }
	    };

	    H5Video.prototype.mute = function() {
	      var i, len, p, ref;
	      ref = this.players;
	      for (i = 0, len = ref.length; i < len; i++) {
	        p = ref[i];
	        p.mute();
	      }
	      return this.player_control_bar.mute();
	    };

	    H5Video.prototype.unmute = function() {
	      var i, len, p, ref;
	      ref = this.players;
	      for (i = 0, len = ref.length; i < len; i++) {
	        p = ref[i];
	        p.unmute();
	      }
	      return this.player_control_bar.unmute();
	    };

	    H5Video.prototype.changeVolume = function(vol) {
	      var i, len, p, ref;
	      if (vol > 1) {
	        vol = 1;
	      }
	      if (vol < 0) {
	        vol = 0;
	      }
	      ref = this.players;
	      for (i = 0, len = ref.length; i < len; i++) {
	        p = ref[i];
	        if (vol !== 0) {
	          p.unmute();
	        }
	        p.volume(vol);
	      }
	      return this.player_control_bar.changeVolume(vol);
	    };

	    H5Video.prototype.getVolume = function() {
	      return this.curplayer.getVolume();
	    };

	    H5Video.prototype.showSmallPic = function(time, cb) {
	      var hop, pic_x, pic_y, picture_num, picture_time, self, slice, small_pic, u, vid;
	      self = this;
	      switch (this.cur_site) {
	        case 'qq':
	          if (this.total_time < 300) {
	            hop = 2;
	          } else if (this.total_time >= 300 && this.total_time < 600) {
	            hop = 5;
	          } else if (this.total_time >= 600) {
	            hop = 10;
	          }
	          slice = this.curplayer.getUrl().split('?');
	          if (slice[0]) {
	            slice = slice[0].split('/');
	            slice = slice[slice.length - 1].split('.');
	            if (slice[0]) {
	              vid = slice[0];
	            }
	          }
	          time += hop;
	          picture_num = parseInt(time / (hop * 25)) + 1;
	          picture_time = parseInt(time % (hop * 25));
	          pic_y = 450 - parseInt(picture_time / (hop * 5)) * 90;
	          pic_x = 800 - parseInt((picture_time % (hop * 5)) / hop) * 160;
	          u = "http://video.qpic.cn/video_caps/0/" + vid + ".q2." + picture_num + ".jpg/0";
	          small_pic = $("<img src=" + u + "></img>");
	          return small_pic.on('load', function() {
	            self.player_control_bar.player_control_bar_picture.css({
	              'background-image': "url(" + u + ")",
	              'background-position-x': pic_x + 'px',
	              'background-position-y': pic_y + 'px'
	            });
	            return cb(null, small_pic);
	          });
	        default:
	          return cb(null, false);
	      }
	    };

	    H5Video.prototype._loadResource = function(format) {
	      var c, flash, i, len, ref;
	      this.venvyPlayer.cur_format = format;
	      this.play_list = create_play_list(this.venvyPlayer, this.cur_address);
	      if (this.play_list.length !== 0) {
	        this.cur_source_format = this.play_list.cur_source_format;
	        this.venvyPlayer.cur_source_format = this.cur_source_format;
	        this.cur_list = this.play_list.cur_list;
	        this.total_time = this.play_list.total_time;
	        this.total_video = this.play_list.total_video;
	      } else {
	        if (this.venvyPlayer.error_test > 0) {
	          this._loadResource(format);
	          this.venvyPlayer.error_test--;
	        } else {
	          this.player_control_bar.showLoading('解析视频错误');
	          if (this.venvyPlayer.params.parse_error_callback != null) {
	            this.venvyPlayer.params.parse_error_callback();
	          }
	        }
	        return;
	      }
	      if (this.venvyPlayer.params.force_flash === true) {
	        this.cur_source_format = 'flv';
	      }
	      switch (this.cur_source_format) {
	        case 'flv':
	          flash = document.getElementById('venvyFlash');
	          if (flash) {
	            flash.remove();
	          }
	          if (!window.venvyFlash) {
	            window.venvyFlash = {
	              waitForSwf: function(vol) {
	                var dom, fn;
	                dom = document.getElementById('venvyFlash');
	                fn = 'window.venvyFlash.waitForSwf(' + vol + ')';
	                if (dom.hasOwnProperty('setProperty')) {
	                  dom.setProperty('list', window.venvyFlash.el.video_params);
	                  if (vol) {
	                    return dom.setProperty('volume', vol);
	                  }
	                } else {
	                  return setTimeout(fn, 100);
	                }
	              },
	              onEvent: function(id, eventName, data) {
	                if (/loadeddata|play|timeupdate|waiting|error|ended/.test(eventName)) {
	                  return window.venvyFlash.el.trigger(eventName, data);
	                }
	              },
	              el: null
	            };
	            window.vjjFlash = {
	              meta: false,
	              onReady: function() {
	                var _url, arr, connect, stream;
	                if (/m3u8/.test(this.el.video_params[0].url)) {
	                  if (/cztvlive$/.test(this.el.video_params[0].url)) {
	                    arr = this.el.video_params[0].url.split('$');
	                    _url = arr[1] + "," + arr[2];
	                  } else {
	                    _url = this.el.video_params[0].url;
	                  }
	                  console.debug(_url);
	                  this.el.video.set('mode', 'HLS');
	                  return this.el.video.set('src', _url);
	                } else if (/^rtmp/.test(this.el.video_params[0].url)) {
	                  arr = this.el.video_params[0].url.split('/');
	                  stream = arr.pop() || arr.pop();
	                  connect = arr.join('/');
	                  this.el.video.set('mode', 'RTMP');
	                  this.el.video.set('src', {
	                    connectionURL: connect,
	                    streamURL: stream
	                  });
	                  return this.el.H5Video.player_control_bar.hideProgress();
	                }
	              },
	              onEvent: function(id, evt, data) {
	                switch (evt) {
	                  case 'loadedmetadata':
	                    this.meta = true;
	                    return this.el.trigger('loadeddata');
	                  case 'play':
	                  case 'ended':
	                  case 'timeupdate':
	                  case 'seeked':
	                  case 'canplaythrough':
	                  case 'waiting':
	                  case 'canplay':
	                    return this.el.trigger(evt);
	                }
	              },
	              onError: function(id, evt) {
	                return console.error(evt);
	              },
	              el: null
	            };
	          }
	          if (/m3u8|^rtmp/.test(this.cur_list[0].url)) {
	            if (/cztvlive$/.test(this.cur_list[0].url)) {
	              return this.players = [new FlashPlayer(this.venvyPlayer, this.self, this.cur_list, 'cztv_live')];
	            } else {
	              return this.players = [new FlashPlayer(this.venvyPlayer, this.self, this.cur_list, 'vjj-swf')];
	            }
	          } else {
	            return this.players = [new FlashPlayer(this.venvyPlayer, this.self, this.cur_list)];
	          }
	          break;
	        default:
	          ref = this.cur_list;
	          for (i = 0, len = ref.length; i < len; i++) {
	            c = ref[i];
	            this.players.push(new HtmlVideoPlayer(this.venvyPlayer, this.self, c));
	          }
	          return this.venvyPlayer.error_test = this.venvyPlayer.error_test_step * this.cur_list.length;
	      }
	    };

	    H5Video.prototype.changeFormat = function(format) {
	      var _x, i, ismute, j, len, len1, p, ref, ref1, volume;
	      this.player_control_bar.hideStalled();
	      if (format === this.venvyPlayer.cur_format) {
	        return;
	      }
	      this.player_control_bar.showFormatChange(format);
	      this.lastplayer = this.curplayer;
	      volume = this.lastplayer.getVolume();
	      ismute = this.lastplayer.getMuted();
	      ref = this.players;
	      for (i = 0, len = ref.length; i < len; i++) {
	        p = ref[i];
	        if (this.lastplayer !== p) {
	          p.remove();
	        }
	      }
	      this.players = [];
	      this._loadResource(format);
	      _x = this._changeCurplay(this.curtime);
	      this.curplayer.jump(_x);
	      this.curplayer.load();
	      ref1 = this.players;
	      for (j = 0, len1 = ref1.length; j < len1; j++) {
	        p = ref1[j];
	        p.volume(volume);
	      }
	      this.curplayer.volume(volume);
	      if (ismute) {
	        return this.curplayer.mute();
	      }
	    };

	    H5Video.prototype.hidePlayerControlBar = function() {
	      return this.player_control_bar.hidePlayerControlBar();
	    };

	    H5Video.prototype.showPlayerControlBar = function() {
	      return this.player_control_bar.showPlayerControlBar();
	    };

	    H5Video.prototype.getVideoProportion = function() {
	      return this.curplayer.getVideoProportion();
	    };

	    H5Video.prototype.getEnd = function() {
	      return this.isend;
	    };

	    H5Video.prototype.setEnd = function(end) {
	      return this.isend = end;
	    };

	    H5Video.prototype.getBuffered = function() {
	      var last_time;
	      if (this.ended > 0) {
	        last_time = this.players.slice(0, +(this.ended - 1) + 1 || 9e9).reduce(function(p, n) {
	          return p + n.video_params.seconds;
	        }, 0);
	      } else {
	        last_time = 0;
	      }
	      return last_time + this.curplayer.getBuffered();
	    };

	    H5Video.prototype.isPause = function() {
	      return this.curplayer.getPaused();
	    };

	    H5Video.prototype.playorpause = function() {
	      var res;
	      res = this.curplayer.getPaused();
	      if (res === true) {
	        this.play(true);
	      } else {
	        this.pause(true);
	      }
	      return res;
	    };

	    H5Video.prototype.play = function(iscb) {
	      if (iscb == null) {
	        iscb = false;
	      }
	      if (this.isend === true) {
	        this.jump(0);
	        this.ended = 0;
	        this.isend = false;
	      }
	      if (iscb === true && (this.venvyPlayer.params.play_callback != null)) {
	        this.venvyPlayer.params.play_callback();
	      }
	      this.curplayer.play();
	      this.preload();
	      return this.player_control_bar.play_control_bar_toggle(true);
	    };

	    H5Video.prototype.pause = function(iscb) {
	      if (iscb == null) {
	        iscb = false;
	      }
	      this.curplayer.pause();
	      this.player_control_bar.play_control_bar_toggle(false);
	      if (iscb === true && (this.venvyPlayer.params.pause_callback != null)) {
	        return this.venvyPlayer.params.pause_callback();
	      }
	    };

	    H5Video.prototype.preload = function() {
	      if (this.ended + 1 < this.players.length && this.players[this.ended + 1].isloaded() !== true) {
	        return this.players[this.ended + 1].load();
	      }
	    };

	    H5Video.prototype._getOffsetSecond = function() {
	      var last_time;
	      if (this.ended > 0) {
	        last_time = this.players.slice(0, +(this.ended - 1) + 1 || 9e9).reduce(function(p, n) {
	          return p + n.video_params.seconds;
	        }, 0);
	      } else {
	        last_time = 0;
	      }
	      return last_time;
	    };

	    H5Video.prototype._getCurrentSecond = function(jumptime) {
	      var _x, i, len, p, ref;
	      _x = parseFloat(jumptime);
	      ref = this.players;
	      for (i = 0, len = ref.length; i < len; i++) {
	        p = ref[i];
	        if (_x < p.video_params.seconds) {
	          break;
	        }
	        _x = _x - p.video_params.seconds;
	      }
	      return _x;
	    };

	    H5Video.prototype._changeCurplay = function(jumptime) {
	      var _i, _x, i, len, p, ref;
	      _x = parseFloat(jumptime);
	      _i = -1;
	      this.curplayer = this.players[0];
	      ref = this.players;
	      for (i = 0, len = ref.length; i < len; i++) {
	        p = ref[i];
	        if (_x < p.video_params.seconds) {
	          this.ended = _i + 1;
	          this.curplayer = p;
	          break;
	        }
	        _x = _x - p.video_params.seconds;
	        _i++;
	      }
	      return _x;
	    };

	    H5Video.prototype.jump = function(jumptime) {
	      var _x, self;
	      if (this.isend === true) {
	        this.isend = false;
	      }
	      self = this;
	      if (self.venvyPlayer.params.start_seek_callback != null) {
	        self.venvyPlayer.params.start_seek_callback();
	      }
	      _x = this._changeCurplay(jumptime);
	      return this.curplayer.jump(_x);
	    };

	    H5Video.prototype._next = function() {
	      this.curplayer = this.players[this.ended];
	      this.curplayer.jump(0);
	      this._reflushplayer();
	      return this.curplayer.play();
	    };

	    H5Video.prototype._reflushplayer = function() {
	      var i, len, p, ref, results;
	      this.curplayer.show();
	      ref = this.players;
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        p = ref[i];
	        if (p !== this.curplayer) {
	          results.push(p.hide());
	        } else {
	          results.push(void 0);
	        }
	      }
	      return results;
	    };

	    H5Video.prototype.onended = function(time, p) {
	      this.ended += 1;
	      if (this.ended === this.total_video) {
	        this.isend = true;
	        this.player_control_bar.play_control_bar_toggle(false);
	        if (this.venvyPlayer.params.stop_callback != null) {
	          return this.venvyPlayer.params.stop_callback();
	        }
	      }
	      return this._next();
	    };

	    H5Video.prototype.oncanplay = function(p) {};

	    H5Video.prototype.onpause = function(p) {};

	    H5Video.prototype.onplay = function(p) {};

	    H5Video.prototype.onwaiting = function(p) {
	      var a, self;
	      self = this;
	      a = self._getCurrentSecond(this.curtime);
	      if (this.buffing === void 0) {
	        return this.buffing = setInterval(function() {
	          var b, cur_result;
	          b = self.curplayer.getBuffered();
	          cur_result = (100 - ((a - b) / 8) * 100) % 100;
	          cur_result = cur_result % 100;
	          if (cur_result < 0) {
	            cur_result = 0;
	          }
	          if (cur_result >= 100) {
	            cur_result = 100;
	          }
	          return self.player_control_bar.bufferingPercent(cur_result);
	        }, 100);
	      }
	    };

	    H5Video.prototype.onvideoerror = function(p) {
	      var self;
	      self = this;
	      if (this.venvyPlayer.error_test > 0) {
	        return setTimeout(function() {
	          var now_format;
	          if (self.venvyPlayer.error_test === 1 && self.video_format_list.length > 0) {
	            now_format = self.video_format_list.pop();
	            self.changeFormat(now_format);
	            self.venvyPlayer.error_test = 5;
	          }
	          self.curplayer.load();
	          if (self.curplayer.getPaused() !== true) {
	            self.curplayer.play();
	          }
	          return self.venvyPlayer.error_test--;
	        }, 500);
	      } else {
	        clearInterval(this.buffing);
	        this.buffing = void 0;
	        this.player_control_bar.hideBufferingPercent();
	        this.player_control_bar.showLoading('解析视频错误');
	        if (this.venvyPlayer.params.parse_error_callback != null) {
	          return this.venvyPlayer.params.parse_error_callback();
	        }
	      }
	    };

	    H5Video.prototype.ontimeupdate = function(time, p) {
	      var last_time;
	      last_time = this._getOffsetSecond();
	      this.curtime = last_time + time;
	      if (this.total_time === 0) {
	        this.total_time = p.getTotalTime();
	      }
	      if ((this.lastplayer == null) && p === this.curplayer) {
	        this._reflushplayer();
	        this.player_control_bar.updateProcessBar(last_time + time);
	      }
	      if (this.buffing != null) {
	        clearInterval(this.buffing);
	        this.buffing = void 0;
	        this.player_control_bar.hideBufferingPercent();
	      }
	      if ((this.venvyPlayer.params.video_end_prefix_seconds != null) && this.total_time - this.curtime <= this.venvyPlayer.params.video_end_prefix_seconds) {
	        if ((this.venvyPlayer.params.stop_callback != null) && this.video_end_profix_called === false) {
	          this.venvyPlayer.params.stop_callback();
	        }
	        return this.video_end_profix_called = true;
	      }
	    };

	    H5Video.prototype.onstalled = function(p) {
	      if (this.venvyPlayer.cur_format !== 'SD' && indexOf.call(Object.keys(this.cur_address), 'SD') >= 0) {
	        return this.player_control_bar.showStalled();
	      }
	    };

	    H5Video.prototype.onloadeddata = function(p) {
	      if ((this.lastplayer != null) && this.lastplayer !== this.curplayer) {
	        this.curplayer.show();
	        this.lastplayer.hide();
	        if (this.lastplayer.getPaused() !== true) {
	          this.curplayer.play();
	        }
	        this.lastplayer.remove();
	        this.player_control_bar.hideFormatChange();
	        this.lastplayer = void 0;
	      }
	      this.player_control_bar.hideLoading();
	      if (this.firstVideoLoaded === false) {
	        if (this.venvyPlayer.params.loaded_callback != null) {
	          this.venvyPlayer.params.loaded_callback();
	        }
	        this.firstVideoLoaded = true;
	      }
	      if (this.curplayer === p && this.venvyPlayer.params.load_and_pause !== true && this.venvyPlayer.params.editor_mode !== true) {
	        return this.play(true);
	      }
	    };

	    return H5Video;

	  })();
	  return H5Video;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(fix_json_to_normal) {
	  var add_video_clarity;
	  add_video_clarity = function(VideoPlayer, cur_address) {
	    var $player_control_bar_format, $player_control_bar_format_1080p, $player_control_bar_format_720p, $player_control_bar_format_button, $player_control_bar_format_high, $player_control_bar_format_normal, $player_control_bar_format_select, $player_control_bar_format_super, all_address, is_auto;
	    $player_control_bar_format_button = VideoPlayer.container.find('.player_control_bar_format_button');
	    $player_control_bar_format = VideoPlayer.container.find('.player_control_bar_format');
	    $player_control_bar_format_select = VideoPlayer.container.find('.player_control_bar_format_select');
	    $player_control_bar_format_1080p = VideoPlayer.container.find('.player_control_bar_format_1080p');
	    $player_control_bar_format_720p = VideoPlayer.container.find('.player_control_bar_format_720p');
	    $player_control_bar_format_super = VideoPlayer.container.find('.player_control_bar_format_super');
	    $player_control_bar_format_high = VideoPlayer.container.find('.player_control_bar_format_high');
	    $player_control_bar_format_normal = VideoPlayer.container.find('.player_control_bar_format_normal');
	    all_address = fix_json_to_normal(VideoPlayer, cur_address);
	    is_auto = VideoPlayer.cur_format;
	    if (VideoPlayer.cur_site !== 'tudou') {
	      if (($.inArray('SD', Object.keys(all_address))) !== -1) {
	        $player_control_bar_format_normal.css({
	          'display': 'block'
	        });
	      }
	      if (($.inArray('SuperHD', Object.keys(all_address))) !== -1) {
	        $player_control_bar_format_super.css({
	          'display': 'block'
	        });
	        if (is_auto === 'auto') {
	          VideoPlayer.cur_format = 'SuperHD';
	          $player_control_bar_format_button.contents().first().replaceWith('超清');
	        }
	      } else {
	        VideoPlayer.cur_format = 'HD';
	        $player_control_bar_format_button.contents().first().replaceWith('高清');
	      }
	      if (($.inArray('HD', Object.keys(all_address))) !== -1) {
	        $player_control_bar_format_high.css({
	          'display': 'block'
	        });
	      } else {
	        VideoPlayer.cur_format = 'SD';
	        $player_control_bar_format_button.contents().first().replaceWith('标清');
	      }
	      if (($.inArray('720p', Object.keys(all_address))) !== -1) {
	        $player_control_bar_format_720p.css({
	          'display': 'block'
	        });
	        if (is_auto === 'auto') {
	          VideoPlayer.cur_format = '720p';
	          $player_control_bar_format_button.contents().first().replaceWith('720p');
	        }
	      }
	      if (($.inArray('1080p', Object.keys(all_address))) !== -1) {
	        $player_control_bar_format_1080p.css({
	          'display': 'block'
	        });
	        if (is_auto === 'auto') {
	          VideoPlayer.cur_format = '1080p';
	          return $player_control_bar_format_button.contents().first().replaceWith('1080p');
	        }
	      }
	    } else {
	      return VideoPlayer.cur_format = 'HD';
	    }
	  };
	  return add_video_clarity;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var fix_json_to_normal;
	  fix_json_to_normal = function(VideoPlayer, cur_address) {
	    var site;
	    site = VideoPlayer.cur_site;
	    if (($.inArray('BLUE', Object.keys(cur_address))) !== -1) {
	      cur_address['1080p'] = cur_address.BLUE;
	      delete cur_address.BLUE;
	    }
	    if (($.inArray('720P', Object.keys(cur_address))) !== -1) {
	      cur_address['SuperHD'] = cur_address['720P'];
	      delete cur_address['720P'];
	    }
	    if (($.inArray('Orignal', Object.keys(cur_address))) !== -1) {
	      cur_address['1080p'] = cur_address.Orignal;
	      delete cur_address.Orignal;
	    }
	    if (($.inArray('3GP-HD', Object.keys(cur_address))) !== -1) {
	      cur_address.SD = cur_address['3GP-HD'];
	      delete cur_address['3GP-HD'];
	    }
	    if (site === 'youku') {
	      if (($.inArray('MP4-HD', Object.keys(cur_address))) !== -1) {
	        cur_address.HD = cur_address['MP4-HD'];
	        delete cur_address['MP4-HD'];
	      }
	    }
	    if (($.inArray('1080P', Object.keys(cur_address))) !== -1) {
	      cur_address['1080p'] = cur_address['1080P'];
	      delete cur_address['1080P'];
	    }
	    if (($.inArray('Mobile-MP4-SD', Object.keys(cur_address))) !== -1) {
	      cur_address['HD'] = cur_address['Mobile-MP4-SD'];
	      delete cur_address['Mobile-MP4-SD'];
	    }
	    if (($.inArray('Mobile-MP4-1080P', Object.keys(cur_address))) !== -1) {
	      cur_address['1080p'] = cur_address['Mobile-MP4-1080P'];
	    }
	    if (($.inArray('Mobile-MP4-HD', Object.keys(cur_address))) !== -1) {
	      cur_address['HD'] = cur_address['Mobile-MP4-HD'];
	    }
	    if (($.inArray('Mobile-MP4-SuperHD', Object.keys(cur_address))) !== -1) {
	      cur_address['SuperHD'] = cur_address['Mobile-MP4-SuperHD'];
	    }
	    if (($.inArray('Mobile-MP4-SuperHD', Object.keys(cur_address))) !== -1 && ($.inArray('Mobile-MP4-HD', Object.keys(cur_address))) === -1) {
	      cur_address['SD'] = cur_address['Mobile-MP4-SuperHD'];
	      delete cur_address['SuperHD'];
	    }
	    if (($.inArray('MP4', Object.keys(cur_address))) !== -1) {
	      cur_address['SD'] = cur_address['MP4'];
	      delete cur_address['MP4'];
	    }
	    if (($.inArray('FLV', Object.keys(cur_address))) !== -1) {
	      cur_address['SD'] = cur_address['FLV'];
	      delete cur_address['FLV'];
	    }
	    if (($.inArray('', Object.keys(cur_address))) !== -1) {
	      cur_address['SuperHD'] = cur_address[''];
	      delete cur_address[''];
	    }
	    return cur_address;
	  };
	  return fix_json_to_normal;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var create_play_list;
	  create_play_list = function(VideoPlayer, cur_address) {
	    var cur_list, cur_source_format, first_open_flag, i, len, site, total_time, total_video, video_slice;
	    first_open_flag = VideoPlayer.params.first_open_flag;
	    cur_source_format = void 0;
	    cur_list = cur_address[VideoPlayer.cur_format];
	    if (site === 'hunantv' || site === 'letv') {
	      cur_list[0].seconds = real_totaltime;
	    }
	    total_time = 0;
	    for (i = 0, len = cur_list.length; i < len; i++) {
	      video_slice = cur_list[i];
	      if (video_slice.seconds > 60000) {
	        video_slice.seconds = video_slice.seconds / 1000;
	      } else {
	        video_slice.seconds = video_slice.seconds || 0;
	      }
	      total_time += video_slice.seconds;
	    }
	    total_video = cur_list.length;
	    site = VideoPlayer.cur_site;
	    if (/(iqiyi)/.test(site)) {
	      VideoPlayer.params.parse_error_callback();
	      return 0;
	    } else if (/(youku)/.test(site)) {
	      if (cur_list[0].url.match(/flv|m3u8/) != null) {
	        cur_source_format = 'flv';
	      } else {
	        cur_source_format = 'mp4';
	      }
	    } else if (/(plu)/.test(site)) {
	      if ((cur_list[0].url.substr(-7)) === 'flv?a=0') {
	        cur_source_format = 'flv';
	      } else {
	        cur_source_format = 'mp4';
	      }
	    } else if (/(tudou)/.test(site)) {
	      if (cur_list[0].url.match('/f4v/') != null) {
	        VideoPlayer.params.parse_error_callback();
	        return 0;
	      } else {
	        cur_source_format = 'mp4';
	      }
	    } else if (/(qq)/.test(site)) {
	      if (cur_list[0].url.match('flv') != null) {
	        total_time = real_totaltime;
	        cur_source_format = 'flv';
	      } else {
	        cur_source_format = 'mp4';
	      }
	    } else if (/flv$|m3u8|^rtmp/.test(cur_list[0].url)) {
	      cur_source_format = 'flv';
	    } else {
	      cur_source_format = 'mp4';
	    }
	    return {
	      cur_source_format: cur_source_format,
	      cur_list: cur_list,
	      total_video: total_video,
	      total_time: total_time
	    };
	  };
	  return create_play_list;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var HtmlVideoPlayer;
	  HtmlVideoPlayer = (function() {
	    function HtmlVideoPlayer(VenvyPlayer, H5Video1, video_params) {
	      this.VenvyPlayer = VenvyPlayer;
	      this.H5Video = H5Video1;
	      this.video_params = video_params;
	      this.self = this;
	      this._isloaded = false;
	      this._isbind = false;
	      this.render();
	      this.setEvent();
	    }

	    HtmlVideoPlayer.prototype.render = function() {
	      this.video = document.createElement('video');
	      this.jvideo = $(this.video);
	      this.jvideo.css({
	        'z-index': -1
	      });
	      this.jvideo.addClass('venvy_videos');
	      if (!navigator.userAgent.match(/Firefox/)) {
	        this.jvideo.attr({
	          'poster': this.VenvyPlayer.params.video_poster
	        });
	      }
	      this.VenvyPlayer.container.append(this.video);
	      this.video.volume = this.VenvyPlayer.cur_volume || 1;
	      this.jvideo.attr('src', this.video_params.url);
	      return this.jvideo.attr({
	        'preload': 'none'
	      });
	    };

	    HtmlVideoPlayer.prototype.setEvent = function() {
	      var H5Video, jvideo, self;
	      H5Video = this.H5Video;
	      jvideo = this.jvideo;
	      self = this;
	      this.jvideo.on('loadeddata', function() {
	        if (H5Video.onloadeddata != null) {
	          return H5Video.onloadeddata(self);
	        }
	      });
	      this.jvideo.on('stalled', function() {
	        if (H5Video.onstalled != null) {
	          return H5Video.onstalled(self);
	        }
	      });
	      this.jvideo.one('play', function() {
	        if (H5Video.onplay != null) {
	          return H5Video.onplay(self);
	        }
	      });
	      this.jvideo.on('timeupdate', function() {
	        if (H5Video.ontimeupdate != null) {
	          return H5Video.ontimeupdate(jvideo[0].currentTime, self);
	        }
	      });
	      this.jvideo.on('ended', function() {
	        if (H5Video.onended != null) {
	          return H5Video.onended(jvideo[0].currentTime, self);
	        }
	      });
	      this.jvideo.on('waiting', function() {
	        if (H5Video.onwaiting != null) {
	          return H5Video.onwaiting(self);
	        }
	      });
	      this.jvideo.on('error', function() {
	        if (H5Video.onvideoerror != null) {
	          return H5Video.onvideoerror(self);
	        }
	      });
	      this._isbind = true;
	    };

	    HtmlVideoPlayer.prototype.isloaded = function() {
	      return this._isloaded;
	    };

	    HtmlVideoPlayer.prototype.loaded = function() {
	      return this._isloaded = true;
	    };

	    HtmlVideoPlayer.prototype.remove = function() {
	      return this.jvideo.remove();
	    };

	    HtmlVideoPlayer.prototype.mute = function() {
	      return this.jvideo[0].muted = true;
	    };

	    HtmlVideoPlayer.prototype.unmute = function() {
	      return this.jvideo[0].muted = false;
	    };

	    HtmlVideoPlayer.prototype.volume = function(vol) {
	      if (vol < 0) {
	        vol = 0;
	      }
	      if (vol > 1) {
	        vol = 1;
	      }
	      return this.jvideo[0].volume = vol;
	    };

	    HtmlVideoPlayer.prototype.play = function() {
	      return this.jvideo[0].play();
	    };

	    HtmlVideoPlayer.prototype.pause = function() {
	      return this.jvideo[0].pause();
	    };

	    HtmlVideoPlayer.prototype.load = function() {
	      this.jvideo[0].load();
	      return this._isloaded = true;
	    };

	    HtmlVideoPlayer.prototype.jump = function(time) {
	      var self;
	      self = this;
	      if (navigator.userAgent.match(/Chrome/) || this.jvideo[0].readyState) {
	        return this.jvideo[0].currentTime = time;
	      } else {
	        return setTimeout((function() {
	          return this.jump(time);
	        }).bind(self), 250);
	      }
	    };

	    HtmlVideoPlayer.prototype.show = function() {
	      var self;
	      self = this;
	      return this.jvideo.css({
	        'z-index': 2
	      });
	    };

	    HtmlVideoPlayer.prototype.hide = function() {
	      return this.jvideo.css({
	        'z-index': -1
	      });
	    };

	    HtmlVideoPlayer.prototype.getMuted = function() {
	      return this.jvideo[0].muted;
	    };

	    HtmlVideoPlayer.prototype.getTotalTime = function() {
	      return this.jvideo[0].duration;
	    };

	    HtmlVideoPlayer.prototype.getVolume = function() {
	      return this.jvideo[0].volume;
	    };

	    HtmlVideoPlayer.prototype.getCurrentTime = function() {
	      return this.jvideo[0].currentTime;
	    };

	    HtmlVideoPlayer.prototype.getBuffered = function() {
	      var _i, curbuffer;
	      curbuffer = 0;
	      _i = 0;
	      while (_i < this.jvideo[0].buffered.length) {
	        if (this.jvideo[0].currentTime >= this.jvideo[0].buffered.start(_i) && this.jvideo[0].currentTime <= this.jvideo[0].buffered.end(_i)) {
	          curbuffer = this.jvideo[0].buffered.end(_i);
	          break;
	        }
	        _i++;
	      }
	      return curbuffer;
	    };

	    HtmlVideoPlayer.prototype.getVideoProportion = function() {
	      var h, w;
	      w = this.jvideo[0].videoWidth;
	      h = this.jvideo[0].videoHeight;
	      return w / h;
	    };

	    HtmlVideoPlayer.prototype.getUrl = function() {
	      return this.video_params.url;
	    };

	    HtmlVideoPlayer.prototype.getPaused = function() {
	      return this.jvideo[0].paused;
	    };

	    HtmlVideoPlayer.prototype.getCurrentVideo = function() {
	      return this.jvideo[0];
	    };

	    return HtmlVideoPlayer;

	  })();
	  return HtmlVideoPlayer;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var FlashPlayer;
	  return FlashPlayer = (function() {
	    var total_time;

	    total_time = 0;

	    function FlashPlayer(VenvyPlayer, H5Video, video_params, test) {
	      var i, j, len, ref;
	      this.VenvyPlayer = VenvyPlayer;
	      this.H5Video = H5Video;
	      this.video_params = video_params;
	      this.test = test;
	      this.render();
	      this.loaded = false;
	      this.canplay = false;
	      if (this.test) {
	        window.vjjFlash.el = this;
	      } else {
	        window.venvyFlash.el = this;
	      }
	      ref = this.video_params;
	      for (j = 0, len = ref.length; j < len; j++) {
	        i = ref[j];
	        total_time += i.seconds;
	      }
	      this.video_params.seconds = total_time;
	      this.index = 0;
	    }

	    FlashPlayer.prototype.render = function() {
	      var html, swf;
	      if (this.test) {
	        swf = "http://192.168.2.110:7000/cztv_live.swf";
	      } else {
	        swf = 'http://7xjfim.com2.z0.glb.qiniucdn.com/flvPlayer.swf';
	      }
	      html = "<object id=\"venvyFlash\" type=\"application/x-shockwave-flash\" data=\"" + swf + "\" wmode=\"opaque\">\n    <param name=\"quality\" value=\"high\" />\n    <param name=\"bgcolor\" value=\"#000000\" />\n    <param name=\"allowScriptAccess\" value=\"always\" />\n    <param name=\"allowFullScreen\" value=\"true\" />\n    <param name=\"allowInsecureDomain\" value=\"*\" />\n    <param name=\"allowDomain\" value=\"*\" />\n</object>";
	      this.jvideo = $(html).addClass('venvy_videos');
	      this.video = this.jvideo[0];
	      this.video.paused = true;
	      this.video.volume = 1;
	      return this.VenvyPlayer.container.append(this.jvideo);
	    };

	    FlashPlayer.prototype.trigger = function(eventName, info) {
	      switch (eventName) {
	        case 'canplaythrough':
	          if (this.video.get('mode') === 'RTMP') {
	            return this.video.play();
	          }
	          break;
	        case 'loadeddata':
	          this.H5Video.onloadeddata(this);
	          return this.isSeeking = 0;
	        case 'canplay':
	          return this.canplay = true;
	        case 'timeupdate':
	          if (!this.canplay || this.isSeeking > 0) {
	            return;
	          }
	          return this.H5Video.ontimeupdate(this.getCurrentTime(), this);
	        case 'seeked':
	          return this.isSeeking = 0;
	        case 'play':
	          this.video.paused = false;
	          this.loaded = true;
	          if (!this.test) {
	            this.canplay = true;
	          }
	          this.index = info.index;
	          return this.H5Video.onplay(this);
	        case 'waiting':
	          return this.H5Video.onwaiting(this);
	        case 'error':
	          console.error(info.msg);
	          return this.H5Video.onvideoerror(this);
	        case 'ended':
	          return this.H5Video.onended(this.getCurrentTime(), this);
	      }
	    };

	    FlashPlayer.prototype.isLoaded = function() {
	      return this.loaded;
	    };

	    FlashPlayer.prototype.remove = function() {
	      return this.jvideo.remove();
	    };

	    FlashPlayer.prototype.mute = function() {
	      if (this.test) {
	        return this.video.set('muted', true);
	      }
	      return this.video.setProperty('volume', 0);
	    };

	    FlashPlayer.prototype.unmute = function() {
	      if (this.test) {
	        return this.video.set('muted', false);
	      }
	      return this.video.setProperty('volume', this.video.volume);
	    };

	    FlashPlayer.prototype.play = function() {
	      if (this.loaded) {
	        this.video.resume();
	        return this.video.paused = false;
	      } else {
	        if (this.isSeeking) {
	          return this.jump(this.isSeeking);
	        } else {
	          return this.video.play();
	        }
	      }
	    };

	    FlashPlayer.prototype.pause = function() {
	      this.video.pause();
	      return this.video.paused = true;
	    };

	    FlashPlayer.prototype.load = function() {
	      return window.venvyFlash.waitForSwf();
	    };

	    FlashPlayer.prototype.volume = function(vol) {
	      this.video.volume = vol;
	      if (this.video.hasOwnProperty('play')) {
	        if (this.test) {
	          return this.video.set('volume', vol);
	        } else {
	          return this.video.setProperty('volume', vol);
	        }
	      } else {
	        return setTimeout((function() {
	          return this.volume(this.video.volume);
	        }).bind(this), 500);
	      }
	    };

	    FlashPlayer.prototype.jump = function(time) {
	      var _tmp, i, j, k, len, ref, results, t;
	      this.isSeeking = time;
	      if (this.test && this.video.hasOwnProperty('set')) {
	        this.pause();
	        return this.video.set('currentTime', time);
	      }
	      if (this.video.hasOwnProperty('jump') && time) {
	        _tmp = 0;
	        if (this.video_params.length >= 1) {
	          ref = this.video_params;
	          results = [];
	          for (i = j = 0, len = ref.length; j < len; i = ++j) {
	            k = ref[i];
	            _tmp += k.seconds;
	            if (time < _tmp) {
	              t = parseInt(time - _tmp + k.seconds);
	              this.index = i;
	              this.video.jump(t, i);
	              break;
	            } else {
	              results.push(void 0);
	            }
	          }
	          return results;
	        }
	      }
	    };

	    FlashPlayer.prototype.show = function() {
	      return this.jvideo.css({
	        'z-index': 2
	      });
	    };

	    FlashPlayer.prototype.hide = function() {
	      return this.jvideo.css({
	        'z-index': -1
	      });
	    };

	    FlashPlayer.prototype.getMuted = function() {
	      if (this.test) {
	        return this.video.get('muted');
	      } else {
	        return this.video.getProperty('volume') === 0;
	      }
	    };

	    FlashPlayer.prototype.getVolume = function() {
	      if (this.video.hasOwnProperty('play')) {
	        if (this.test) {
	          return this.video.get('volume');
	        } else {
	          return this.video.getProperty('volume');
	        }
	      }
	      return 1;
	    };

	    FlashPlayer.prototype.getUrl = function() {
	      return this.video.getProperty('url');
	    };

	    FlashPlayer.prototype.getPaused = function() {
	      return this.video.paused;
	    };

	    FlashPlayer.prototype.getCurrentTime = function() {
	      var i, j, offset, ref;
	      if (this.test) {
	        return this.video.get('currentTime');
	      }
	      if (this.isSeeking > 0) {
	        return this.isSeeking;
	      }
	      offset = 0;
	      if (this.index > 0) {
	        for (i = j = 0, ref = this.index - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	          offset += this.video_params[i].seconds;
	        }
	      }
	      return offset + this.video.getProperty('currentTime');
	    };

	    FlashPlayer.prototype.getBuffered = function() {
	      if (this.video.hasOwnProperty('play')) {
	        if (this.test) {
	          return this.video.get('buffered');
	        } else {
	          return this.video.getProperty('buffered');
	        }
	      } else {
	        return 0;
	      }
	    };

	    FlashPlayer.prototype.getTotalTime = function() {
	      if (total_time) {
	        return total_time;
	      } else {
	        if (this.test) {
	          return this.video.get('duration') || 0;
	        } else {
	          return this.video.getProperty('metadata').duration || 0;
	        }
	      }
	    };

	    FlashPlayer.prototype.getVideoProportion = function() {
	      if (this.test) {
	        return this.video.get('videoWidth') / this.video.get('videoHeight');
	      } else {
	        return this.video.getProperty('videoWidth') / this.video.getProperty('videoHeight');
	      }
	    };

	    FlashPlayer.prototype.getCurrentVideo = function() {
	      return this.video;
	    };

	    return FlashPlayer;

	  })();
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(13), __webpack_require__(1), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function(sonic, utils, TemplateControlBar) {
	  var PlayerControlBar;
	  PlayerControlBar = (function() {
	    function PlayerControlBar(venvyPlayer, params) {
	      this.venvyPlayer = venvyPlayer;
	      this.params = params;
	      this._render();
	      this.muted = false;
	      this.isonceBuffering = true;
	      this.z = void 0;
	      this.ishidebar = false;
	      this.iskeyevent = true;
	      this.former_player = this.venvyPlayer.container.find('.former_player');
	      this.player_for_user = this.venvyPlayer.container.find('.player_for_user');
	      this.player_control_bar = this.venvyPlayer.container.find('.player_control_bar');
	      this.player_control_bar_click = this.venvyPlayer.container.find('.player_control_bar_click');
	      this.player_control_bar_progress = this.venvyPlayer.container.find('.player_control_bar_progress');
	      this.player_control_bar_progress_played = this.venvyPlayer.container.find('.player_control_bar_progress_played');
	      this.player_control_bar_progress_buffer = this.venvyPlayer.container.find('.player_control_bar_progress_buffer');
	      this.player_control_bar_current = this.venvyPlayer.container.find('.player_control_bar_current');
	      this.player_control_bar_total = this.venvyPlayer.container.find('.player_control_bar_total');
	      this.player_control_bar_toggle = this.venvyPlayer.container.find('.player_control_bar_toggle');
	      this.player_control_bar_dot = this.venvyPlayer.container.find('.player_control_bar_dot');
	      this.player_control_bar_candrag = this.venvyPlayer.container.find('.player_control_bar_candrag');
	      this.player_control_bar_picture = this.venvyPlayer.container.find('.player_control_bar_picture');
	      this.player_control_bar_hover_time = this.venvyPlayer.container.find('.player_control_bar_hover_time');
	      this.player_control_bar_hint = this.venvyPlayer.container.find('.player_control_bar_hint');
	      this.player_control_bar_volume = this.venvyPlayer.container.find('.player_control_bar_volume');
	      this.player_control_bar_volume_bar = this.venvyPlayer.container.find('.player_control_bar_volume_bar');
	      this.player_control_bar_volume_click = this.venvyPlayer.container.find('.player_control_bar_volume_click');
	      this.player_control_bar_volume_show = this.venvyPlayer.container.find('.player_control_bar_volume_show');
	      this.player_control_bar_volume_button = this.venvyPlayer.container.find('.player_control_bar_volume_button');
	      this.player_control_bar_format = this.venvyPlayer.container.find('.player_control_bar_format');
	      this.player_control_bar_format_button = this.venvyPlayer.container.find('.player_control_bar_format_button');
	      this.player_control_bar_format_select = this.venvyPlayer.container.find('.player_control_bar_format_select');
	      this.player_control_bar_format_1080p = this.venvyPlayer.container.find('.player_control_bar_format_1080p');
	      this.player_control_bar_format_720p = this.venvyPlayer.container.find('.player_control_bar_format_720p');
	      this.player_control_bar_format_super = this.venvyPlayer.container.find('.player_control_bar_format_super');
	      this.player_control_bar_format_high = this.venvyPlayer.container.find('.player_control_bar_format_high');
	      this.player_control_bar_format_normal = this.venvyPlayer.container.find('.player_control_bar_format_normal');
	      this.player_control_bar_toSD = this.venvyPlayer.container.find('.player_control_bar_toSD');
	      this.player_control_bar_fullscreen = this.venvyPlayer.container.find('.player_control_bar_fullscreen');
	      this.player_control_bar_video_cover = this.venvyPlayer.container.find('.player_control_bar_video_cover');
	      this.is_buffering = this.venvyPlayer.container.find('.is_buffering');
	      this.is_buffering_inside = this.venvyPlayer.container.find('.is_buffering_inside');
	      this.is_buffering_percent = this.venvyPlayer.container.find('.is_buffering_percent');
	      this.player_control_bar_change = this.venvyPlayer.container.find('.player_control_bar_change');
	      this.player_control_bar_change_format = this.venvyPlayer.container.find('.player_control_bar_change_format');
	      this.right_menu = this.venvyPlayer.container.find('.right_menu');
	      this.right_menu_key_enable = this.venvyPlayer.container.find('.right_menu_key_enable');
	      this.right_window = this.venvyPlayer.container.find('.right_window');
	      this.right_window_input = this.venvyPlayer.container.find('.right_window_input');
	      this.right_menu_key_catch_iframe = this.venvyPlayer.container.find('.right_menu_key_catch_iframe');
	      this.right_menu_key_catch_address = this.venvyPlayer.container.find('.right_menu_key_catch_address');
	      this.right_menu_key_report_problem = this.venvyPlayer.container.find('.right_menu_key_report_problem');
	      this.right_window_button_click = this.venvyPlayer.container.find('.right_window_button_click');
	      this.is_buffering_inside.html(this.square.canvas).css({
	        height: '36px',
	        width: '36px',
	        'margin-top': '-50px',
	        'margin-left': '-18px',
	        'background': 'transparent'
	      });
	      this.square.play();
	      this._bind_events();
	    }

	    PlayerControlBar.prototype.video_controller_register = function(videoController) {
	      this.videoController = videoController;
	    };

	    PlayerControlBar.prototype.onceBuffering = function() {
	      this.is_buffering.css({
	        'background-color': 'rgba(0, 0, 0, 0.5)',
	        'z-index': 20
	      });
	      return this.isonceBuffering = false;
	    };

	    PlayerControlBar.prototype.bufferingPercent = function(s) {
	      this.is_buffering.css({
	        display: 'block'
	      });
	      return this.is_buffering_percent.html(parseInt(s) + '%');
	    };

	    PlayerControlBar.prototype.hideBufferingPercent = function() {
	      this.is_buffering.css({
	        display: 'none'
	      });
	      this.is_buffering_percent.html('');
	      return this.is_buffering_percent.css({
	        'margin-top': '0px'
	      });
	    };

	    PlayerControlBar.prototype.updateProcessBar = function(time) {
	      var curbuffer, curtime, pos, pos_buffer, self, total_time;
	      self = this;
	      curtime = time;
	      curbuffer = this.videoController.getBuffered();
	      total_time = this.videoController.total_time;
	      if (this.is_buffering.css('display') !== 'block') {
	        pos = curtime / total_time;
	        pos_buffer = curbuffer / total_time;
	        this.player_control_bar_progress_buffer.css({
	          width: pos_buffer * 100 + '%'
	        });
	        this.player_control_bar_current.html(utils.format_time(curtime));
	        if (!this.player_control_bar_progress.css('display') === 'none') {
	          this.player_control_bar_total.css({
	            display: 'block'
	          });
	        }
	        this.player_control_bar_total.html(utils.format_time(total_time));
	        this.player_control_bar_progress_buffer.css({
	          width: pos_buffer * 100 + '%'
	        });
	        this.player_control_bar_progress_played.css({
	          width: pos * 100 + '%'
	        });
	        return this.player_control_bar_dot.css({
	          left: pos * 100 + '%'
	        });
	      }
	    };

	    PlayerControlBar.prototype.insertDots = function(dots) {
	      var insert, self, total_time;
	      self = this;
	      dots = dots || [];
	      total_time = this.videoController.total_time;
	      insert = [];
	      dots.forEach(function(dot, i) {
	        if (dot.time < total_time) {
	          return insert.push("<div class='player_control_bar_white_dot' data-id='" + dot.id + "' data-text='" + dot.title + "' data-time='" + dot.time + "' style='width: 10px;height: 10px;z-index: 10;position: absolute;left: " + (dot.time / total_time * 100) + "%;top: 50%;margin-left: -5px;margin-top: -5px; cursor:pointer'>\n  <div class='player_control_bar_white_dot_inside'>\n  </div>\n</div>");
	        }
	      });
	      if (insert.length) {
	        this.player_control_bar_progress.prepend(insert.join(''));
	        return this.venvyPlayer.model.dots = this.player_control_bar_progress.find('.player_control_bar_white_dot');
	      }
	    };

	    PlayerControlBar.prototype.checkDot = function(id) {
	      return this.venvyPlayer.model.dots.filter(function() {
	        return $(this).data('id') === id;
	      }).addClass('checked');
	    };

	    PlayerControlBar.prototype.showBar = function() {
	      if (this.params.show_bar_callback && !this.player_control_bar.hasClass('show')) {
	        this.params.show_bar_callback();
	      }
	      return this.player_control_bar.addClass('show');
	    };

	    PlayerControlBar.prototype.hideBar = function() {
	      if (this.params.hide_bar_callback && this.player_control_bar.hasClass('show')) {
	        this.params.hide_bar_callback();
	      }
	      return this.player_control_bar.removeClass('show');
	    };

	    PlayerControlBar.prototype.showLoading = function() {
	      return this.is_buffering.css({
	        display: 'block'
	      });
	    };

	    PlayerControlBar.prototype.hideLoading = function() {
	      this.is_buffering.css({
	        display: 'none'
	      });
	      if (this.isonceBuffering) {
	        return this.onceBuffering();
	      }
	    };

	    PlayerControlBar.prototype.showStalled = function() {
	      var self;
	      if (this.z != null) {
	        return;
	      }
	      self = this;
	      this.player_control_bar_toSD.css({
	        display: 'block'
	      });
	      this.showLoading();
	      self.is_buffering.css({
	        'z-index': 14
	      });
	      this.videoController.pause();
	      return this.z = setTimeout(function() {
	        self.player_control_bar_toSD.css({
	          display: 'none'
	        });
	        self.hideLoading();
	        self.videoController.play();
	        return self.z = void 0;
	      }, 5000);
	    };

	    PlayerControlBar.prototype.hideStalled = function() {
	      if (this.z != null) {
	        clearTimeout(this.z);
	        this.player_control_bar_toSD.css({
	          display: 'none'
	        });
	        this.hideLoading();
	        this.videoController.play();
	        return this.z = void 0;
	      }
	    };

	    PlayerControlBar.prototype.changeVolume = function(vol) {
	      vol = parseFloat(vol.toFixed(1));
	      this.player_control_bar_volume_show.css({
	        height: vol * 100 + '%'
	      });
	      if (vol === 0) {
	        return this.mute();
	      } else {
	        return this.unmute();
	      }
	    };

	    PlayerControlBar.prototype.mute = function() {
	      this.muted = true;
	      this.player_control_bar_volume_button.contents().first().replaceWith('&#xe605;');
	      return this.player_control_bar_volume_show.css({
	        display: 'none'
	      });
	    };

	    PlayerControlBar.prototype.unmute = function() {
	      this.muted = false;
	      this.player_control_bar_volume_button.contents().first().replaceWith('&#xe604;');
	      return this.player_control_bar_volume_show.css({
	        display: 'block'
	      });
	    };

	    PlayerControlBar.prototype.showFormatChange = function(format) {
	      this.player_control_bar_change_format.html(utils.fix_the_format(format));
	      return this.player_control_bar_change.fadeIn(500);
	    };

	    PlayerControlBar.prototype.hideFormatChange = function() {
	      return this.player_control_bar_change.fadeOut(500);
	    };

	    PlayerControlBar.prototype.play_control_bar_toggle = function(res) {
	      if (res === true) {
	        return this.player_control_bar_toggle.html('&#xe602;');
	      } else {
	        return this.player_control_bar_toggle.html('&#xe603;');
	      }
	    };

	    PlayerControlBar.prototype.hideProgress = function() {
	      this.player_control_bar_progress.css('display', 'none');
	      this.player_control_bar_current.css('display', 'none');
	      return this.player_control_bar_total.css('display', 'none');
	    };

	    PlayerControlBar.prototype.hidePlayerControlBar = function() {
	      this.ishidebar = true;
	      return this.hideBar();
	    };

	    PlayerControlBar.prototype.showPlayerControlBar = function() {
	      this.ishidebar = false;
	      return this.showBar();
	    };

	    PlayerControlBar.prototype.setKeyEventStart = function() {
	      return this.iskeyevent = true;
	    };

	    PlayerControlBar.prototype.setKeyEventStop = function() {
	      return this.iskeyevent = false;
	    };

	    PlayerControlBar.prototype.showVolumeBar = function() {
	      return this.player_control_bar_volume_bar.css({
	        display: 'block'
	      });
	    };

	    PlayerControlBar.prototype.hideVolumeBar = function() {
	      return this.player_control_bar_volume_bar.css({
	        display: 'none'
	      });
	    };

	    PlayerControlBar.prototype.hideFormatSelect = function() {
	      return this.player_control_bar_format_select.css({
	        display: 'none'
	      });
	    };

	    PlayerControlBar.prototype._bind_events = function() {
	      var cancel_bar_timeout, cancel_volumebar_timeout, self, thetime;
	      self = this;
	      $(document).on('MSFullscreenChange webkitfullscreenchange mozfullscreenchange  fullscreenChange', function() {
	        var fs;
	        fs = document.webkitIsFullScreen || document.msFullscreenElement || document.fullScreenElement || document.mozFullScreen || window['fullScreen'] || window.navigator.standalone;
	        if (!fs) {
	          self.player_control_bar_fullscreen.html('&#xe601;');
	          if (self.params.exitfullscreen_callback != null) {
	            return self.params.exitfullscreen_callback();
	          }
	        } else {
	          self.player_control_bar_fullscreen.html('&#xe600;');
	          if (self.params.fullscreen_callback != null) {
	            return self.params.fullscreen_callback();
	          }
	        }
	      });
	      this.player_control_bar_progress.on('click mousemove mouseleave', '.player_control_bar_white_dot', function(e) {
	        var $this, _p_x, _text, _time, half, left, max, min;
	        $this = $(this);
	        _time = utils.format_time(parseInt($this.data('time')));
	        _text = $this.data('text');
	        switch (e.type) {
	          case 'click':
	            e.offsetX = e.pageX - self.player_control_bar_progress.offset().left;
	            return self.player_control_bar_click.trigger(e);
	          case 'mousemove':
	            e.stopPropagation();
	            self.player_control_bar_hover_time.text(_time + ' ' + _text);
	            _p_x = self.player_control_bar_progress[0].offsetLeft;
	            half = self.player_control_bar_hint.width() / 2;
	            left = $this.get(0).offsetLeft + e.offsetX - half + _p_x;
	            if (_p_x <= 15) {
	              min = 5 + _p_x;
	              max = self.player_control_bar_progress.width() - half * 2 + _p_x - 5;
	              if (left < min) {
	                left = min;
	              }
	              if (left > max) {
	                left = max;
	              }
	            }
	            if ($this.hasClass('checked')) {
	              self.player_control_bar_hint.addClass('checked');
	            }
	            return self.player_control_bar_hint.css({
	              display: 'block',
	              left: left
	            });
	          case 'mouseleave':
	            self.player_control_bar_hover_time.text(_time);
	            return self.player_control_bar_hint.removeClass('checked').css({
	              display: 'none'
	            });
	        }
	      });
	      cancel_bar_timeout = void 0;
	      self.venvyPlayer.container.on('mousemove', '.player_for_user, .venvy_videos', function() {
	        if (self.ishidebar === false) {
	          self.venvyPlayer.container.css({
	            'cursor': ''
	          });
	          clearTimeout(cancel_bar_timeout);
	          self.showBar();
	          return cancel_bar_timeout = setTimeout(function() {
	            if (self.venvyPlayer.params.editor_mode !== true) {
	              self.venvyPlayer.container.css({
	                'cursor': 'none'
	              });
	            }
	            return self.hideBar();
	          }, 1000);
	        }
	      });
	      this.player_control_bar.mouseenter(function() {
	        return clearTimeout(cancel_bar_timeout);
	      });
	      this.player_control_bar.mouseleave(function() {
	        return cancel_bar_timeout = setTimeout(function() {
	          if (self.venvyPlayer.params.editor_mode !== true) {
	            self.venvyPlayer.container.css({
	              'cursor': 'none'
	            });
	          }
	          return self.hideBar();
	        }, 1000);
	      });
	      this.player_control_bar_toggle.click(function() {
	        return self.videoController.playorpause();
	      });
	      this.player_control_bar_candrag.mouseenter(function() {
	        return self.player_control_bar_dot.css({
	          opacity: 1
	        });
	      }).mouseleave(function() {
	        return self.player_control_bar_dot.css({
	          opacity: 0
	        });
	      });
	      this.player_control_bar_dot.mousedown(function() {
	        var _nowTime, abs_length, padding, zeroX;
	        self.player_control_bar_toggle.html('&#xe603;');
	        self.videoController.pause();
	        abs_length = self.player_control_bar_click.width();
	        zeroX = self.player_control_bar_click.offset().left;
	        padding = parseFloat(self.player_control_bar_dot.css('padding-left'));
	        _nowTime = self.videoController.getCurtime();
	        $(document).on('mousemove', function(event) {
	          var dot_end, later_time, pos, realX;
	          realX = event.pageX;
	          dot_end = self.player_control_bar_dot.offset().left - zeroX + padding;
	          pos = dot_end / abs_length;
	          if (zeroX > realX) {
	            self.player_control_bar_dot.css({
	              left: 0
	            });
	          } else if (realX > zeroX + abs_length) {
	            self.player_control_bar_dot.css({
	              left: abs_length
	            });
	          } else {
	            self.player_control_bar_dot.css({
	              left: realX - zeroX
	            });
	          }
	          self.player_control_bar_progress_played.css({
	            width: self.player_control_bar_dot.css('left')
	          });
	          later_time = pos * self.videoController.total_time;
	          if (later_time < 0) {
	            later_time = 0;
	          }
	          _nowTime = later_time;
	          return self.player_control_bar_current.html(utils.format_time(later_time));
	        });
	        return $(document).one('mouseup', function() {
	          if (Math.abs(self.videoController.getCurtime() - _nowTime) > 1) {
	            self.videoController.jump(_nowTime);
	          }
	          if (self.venvyPlayer.params.editor_mode !== true) {
	            self.videoController.play();
	          }
	          return $(document).off('mousemove');
	        });
	      });
	      this.player_control_bar_click.click(function(event) {
	        var max, offset, per;
	        event.stopPropagation();
	        self.videoController.pause();
	        max = $(this).width();
	        offset = event.offsetX;
	        per = offset / max;
	        self.player_control_bar_dot.css({
	          left: offset
	        });
	        self.player_control_bar_progress_played.css({
	          width: offset
	        });
	        self.videoController.jump(self.videoController.total_time * per);
	        if (self.venvyPlayer.params.editor_mode !== true) {
	          return self.videoController.play();
	        }
	      }).mousemove(function(event) {
	        var _p_x, half, left, max, min, posX;
	        posX = event.offsetX / self.player_control_bar_click.width();
	        _p_x = self.player_control_bar_progress[0].offsetLeft;
	        self.player_control_bar_picture.hide();
	        self.player_control_bar_hover_time.html(utils.format_time(posX * self.videoController.total_time));
	        self.videoController.showSmallPic(parseInt(posX * self.videoController.total_time), function(err, small_pic) {
	          if (err != null) {
	            return self.venvyPlayer.params.parse_error_callback();
	          }
	          if (small_pic) {
	            self.player_control_bar_picture.show();
	            return self.player_control_bar_hover_time.css('width', '150px');
	          }
	        });
	        half = self.player_control_bar_hint.width() / 2;
	        left = event.offsetX - half + _p_x;
	        if (_p_x <= 15) {
	          min = 5 + _p_x;
	          max = self.player_control_bar_progress.width() - half * 2 + _p_x - 5;
	          if (left < min) {
	            left = min;
	          }
	          if (left > max) {
	            left = max;
	          }
	        }
	        return self.player_control_bar_hint.css({
	          left: left,
	          display: 'block'
	        });
	      }).mouseleave(function() {
	        return self.player_control_bar_hint.css({
	          display: 'none'
	        });
	      });
	      this.player_control_bar_volume.mouseenter(function() {
	        return self.showVolumeBar();
	      }).mouseleave(function() {
	        return self.hideVolumeBar();
	      });
	      this.player_control_bar_volume_bar.click(function(event) {
	        var max, offset, vol;
	        event.stopPropagation();
	        max = $(this).children('.player_control_bar_volume_control').height();
	        offset = $(this).height() - max;
	        vol = 1 - (event.offsetY - offset) / max;
	        return self.videoController.changeVolume(vol);
	      });
	      this.player_control_bar_volume_button.click(function() {
	        if (self.muted === false) {
	          return self.videoController.mute();
	        } else {
	          return self.videoController.unmute();
	        }
	      });
	      this.player_control_bar_fullscreen.click(function() {
	        var fs;
	        fs = document.webkitIsFullScreen || document.msFullscreenElement || document.fullScreenElement || document.mozFullScreen || window['fullScreen'] || window.navigator.standalone;
	        if (fs) {
	          return utils.exitfullscreen();
	        } else {
	          return utils.fullscreen(self.venvyPlayer.container);
	        }
	      });
	      this.player_for_user.click(function() {
	        if (self.params.editor_mode !== true) {
	          return self.videoController.playorpause();
	        }
	      });
	      this.player_control_bar_format.mouseenter(function() {
	        return self.player_control_bar_format_select.css({
	          display: 'block'
	        });
	      }).mouseleave(function() {
	        return self.hideFormatSelect();
	      });
	      this.player_control_bar_format_1080p.click(function() {
	        if (self.player_control_bar_change.css('display') !== 'block') {
	          self.videoController.changeFormat('1080p');
	          return self.player_control_bar_format_button.contents().first().replaceWith(utils.fix_the_format('1080p'));
	        }
	      });
	      this.player_control_bar_format_720p.click(function() {
	        if (self.player_control_bar_change.css('display') !== 'block') {
	          self.videoController.changeFormat('720p');
	          return self.player_control_bar_format_button.contents().first().replaceWith(utils.fix_the_format('720p'));
	        }
	      });
	      this.player_control_bar_format_super.click(function() {
	        if (self.player_control_bar_change.css('display') !== 'block') {
	          self.videoController.changeFormat('SuperHD');
	          return self.player_control_bar_format_button.contents().first().replaceWith(utils.fix_the_format('SuperHD'));
	        }
	      });
	      this.player_control_bar_format_high.click(function() {
	        if (self.player_control_bar_change.css('display') !== 'block') {
	          self.videoController.changeFormat('HD');
	          return self.player_control_bar_format_button.contents().first().replaceWith(utils.fix_the_format('HD'));
	        }
	      });
	      this.player_control_bar_format_normal.click(function() {
	        if (self.player_control_bar_change.css('display') !== 'block') {
	          self.videoController.changeFormat('SD');
	          return self.player_control_bar_format_button.contents().first().replaceWith(utils.fix_the_format('SD'));
	        }
	      });
	      this.player_control_bar_toSD.click(function() {
	        if (self.player_control_bar_change.css('display') !== 'block') {
	          self.hideStalled();
	          self.videoController.changeFormat('SD');
	          return self.player_control_bar_format_button.contents().first().replaceWith(utils.fix_the_format('SD'));
	        }
	      });
	      if (this.venvyPlayer.params.right_hand === true) {
	        this.player_for_user.mousedown(function(event) {
	          var video_cover, x, y, zeroX, zeroY;
	          video_cover = $(this);
	          zeroX = video_cover.offset().left;
	          zeroY = video_cover.offset().top;
	          x = event.pageX - zeroX;
	          y = event.pageY - zeroY;
	          if (x + self.right_menu.width() > video_cover.width()) {
	            x = x - self.right_menu.width();
	          }
	          if (y + self.right_menu.height() > video_cover.height()) {
	            y = y - self.right_menu.height();
	          }
	          if (event.which === 3) {
	            return self.right_menu.css({
	              display: 'block',
	              left: x,
	              top: y
	            });
	          } else {
	            self.right_menu.css({
	              display: 'none'
	            });
	            return self.right_window.css({
	              display: 'none'
	            });
	          }
	        });
	      }
	      this.right_menu_key_enable.click(function() {
	        return self.right_menu.css({
	          display: 'none'
	        });
	      });
	      this.right_menu_key_catch_address.click(function() {
	        self.right_window.css({
	          display: 'block'
	        });
	        self.right_window_input.val("http://wantv.me/iva/bookmark.html?v=" + self.venvyPlayer.video_url);
	        return self.right_window_input.focus().select();
	      });
	      this.right_menu_key_catch_iframe.click(function() {
	        self.right_window.css({
	          display: 'block'
	        });
	        self.right_window_input.val("<iframe height='100%' width='100%' scrolling='no' allowfullscreen src='http://wantv.me/iva/bookmark.html?v=" + self.venvyPlayer.video_url + "' frameborder='0' data-venvy-url='http://7u2n0p.com2.z0.glb.qiniucdn.com/ted301.jpg' id='venvy-frame-play' name='venvy-fram-play'></iframe>");
	        return self.right_window_input.focus().select();
	      });
	      this.right_window_button_click.click(function() {
	        return self.right_window.css({
	          display: 'none'
	        });
	      });
	      cancel_volumebar_timeout = void 0;
	      thetime = 0;
	      this.venvyPlayer.container.on('keyup', function(event) {
	        if (self.iskeyevent === true) {
	          switch (event.keyCode) {
	            case 37:
	              self.videoController.jump(self.videoController.getCurtime() - thetime);
	              if (self.venvyPlayer.params.editor_mode !== true) {
	                self.videoController.play(false);
	              }
	              thetime = 0;
	              return cancel_bar_timeout = setTimeout(function() {
	                if (self.venvyPlayer.params.editor_mode !== true) {
	                  self.venvyPlayer.container.css({
	                    'cursor': 'none'
	                  });
	                }
	                return self.hideBar();
	              }, 1000);
	            case 39:
	              self.videoController.jump(self.videoController.getCurtime() + thetime);
	              if (self.venvyPlayer.params.editor_mode !== true) {
	                self.videoController.play(false);
	              }
	              thetime = 0;
	              return cancel_bar_timeout = setTimeout(function() {
	                if (self.venvyPlayer.params.editor_mode !== true) {
	                  self.venvyPlayer.container.css({
	                    'cursor': 'none'
	                  });
	                }
	                return self.hideBar();
	              }, 1000);
	          }
	        }
	      });
	      return this.venvyPlayer.container.on('keydown', function(event) {
	        if (self.iskeyevent === true) {
	          switch (event.keyCode) {
	            case 32:
	              self.showBar();
	              clearTimeout(cancel_bar_timeout);
	              event.preventDefault();
	              event.stopPropagation();
	              self.videoController.playorpause();
	              return cancel_bar_timeout = setTimeout(function() {
	                if (self.venvyPlayer.params.editor_mode !== true) {
	                  self.venvyPlayer.container.css({
	                    'cursor': 'none'
	                  });
	                }
	                return self.hideBar();
	              }, 1000);
	            case 40:
	              self.showBar();
	              clearTimeout(cancel_bar_timeout);
	              clearTimeout(cancel_volumebar_timeout);
	              event.preventDefault();
	              event.stopPropagation();
	              self.showVolumeBar();
	              self.videoController.changeVolume(self.videoController.getVolume() - 0.1);
	              cancel_volumebar_timeout = setTimeout(self.hideVolumeBar.bind(self), 2000);
	              return cancel_bar_timeout = setTimeout(function() {
	                if (self.venvyPlayer.params.editor_mode !== true) {
	                  self.venvyPlayer.container.css({
	                    'cursor': 'none'
	                  });
	                }
	                return self.hideBar();
	              }, 1000);
	            case 38:
	              self.showBar();
	              clearTimeout(cancel_bar_timeout);
	              clearTimeout(cancel_volumebar_timeout);
	              event.preventDefault();
	              event.stopPropagation();
	              self.showVolumeBar();
	              self.videoController.changeVolume(self.videoController.getVolume() + 0.1);
	              cancel_volumebar_timeout = setTimeout(self.hideVolumeBar.bind(self), 2000);
	              return cancel_bar_timeout = setTimeout(function() {
	                if (self.venvyPlayer.params.editor_mode !== true) {
	                  self.venvyPlayer.container.css({
	                    'cursor': 'none'
	                  });
	                }
	                return self.hideBar();
	              }, 1000);
	            case 37:
	              self.showBar();
	              clearTimeout(cancel_bar_timeout);
	              event.preventDefault();
	              event.stopPropagation();
	              self.videoController.pause(false);
	              thetime += self.venvyPlayer.params.jump_step || 5;
	              if (self.videoController.getCurtime() - thetime <= 0) {
	                thetime = self.videoController.getCurtime();
	              }
	              return self.updateProcessBar(self.videoController.getCurtime() - thetime);
	            case 39:
	              self.showBar();
	              clearTimeout(cancel_bar_timeout);
	              event.preventDefault();
	              event.stopPropagation();
	              self.videoController.pause(false);
	              thetime += self.venvyPlayer.params.jump_step || 5;
	              if (thetime + self.videoController.getCurtime() >= self.videoController.total_time) {
	                thetime = self.videoController.total_time - self.videoController.getCurtime() - 5;
	              }
	              return self.updateProcessBar(self.videoController.getCurtime() + thetime);
	          }
	        }
	      });
	    };

	    PlayerControlBar.prototype._render = function() {
	      var $player_control_bar_logo;
	      this.venvyPlayer.container.append(TemplateControlBar(this.venvyPlayer.params));
	      $player_control_bar_logo = this.venvyPlayer.container.find('.player_control_bar_logo');
	      this.square = new Sonic({
	        width: 36,
	        height: 36,
	        stepsPerFrame: 1,
	        trailLength: 1,
	        pointDistance: 0.083,
	        backgroundColor: 'transparent',
	        strokeColor: '#FFFFFF',
	        fps: 12,
	        setup: function() {
	          this._.lineWidth = 2.8;
	        },
	        step: function(point, index) {
	          var _, angle, cx, cy;
	          cx = this.padding + 18;
	          cy = this.padding + 18;
	          _ = this._;
	          angle = Math.PI / 180 * point.progress * 360;
	          _.beginPath();
	          _.moveTo(point.x, point.y);
	          _.lineTo(Math.cos(angle) * 18 + cx, Math.sin(angle) * 18 + cy);
	          _.closePath();
	          return _.stroke();
	        },
	        path: [['arc', 18, 18, 9.1, 0, 360]]
	      });
	      $player_control_bar_logo = this.venvyPlayer.container.find('.player_control_bar_logo');
	      if (this.params.small_logo_url && this.params.small_logo_url !== '') {
	        if (/^(http|https)/.test(this.params.small_logo_url)) {
	          $player_control_bar_logo.attr('href', this.params.small_logo_url);
	        } else {
	          $player_control_bar_logo.attr('href', 'http://' + this.params.small_logo_url);
	        }
	      }
	      if (this.params.small_logo && this.params.small_logo !== '') {
	        return $player_control_bar_logo.children('.player_control_bar_logo_img').attr('src', "" + this.params.small_logo);
	      } else {
	        return $player_control_bar_logo.css({
	          'margin': '5px 15px 0 0'
	        });
	      }
	    };

	    return PlayerControlBar;

	  })();
	  return PlayerControlBar;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
	 * Sonic 0.2.1
	 * --
	 * https://github.com/padolsey/Sonic
	 * --
	 * This program is free software. It comes without any warranty, to
	 * the extent permitted by applicable law. You can redistribute it
	 * and/or modify it under the terms of the Do What The Fuck You Want
	 * To Public License, Version 2, as published by Sam Hocevar. See
	 * http://sam.zoy.org/wtfpl/COPYING for more details. */ 

	(function(){

		var emptyFn = function(){};

		function Sonic(d) {

			this.converter = d.converter;

			this.data = d.path || d.data;
			this.imageData = [];

			this.multiplier = d.multiplier || 1;
			this.padding = d.padding || 0;

			this.fps = d.fps || 25;

			this.stepsPerFrame = ~~d.stepsPerFrame || 1;
			this.trailLength = d.trailLength || 1;
			this.pointDistance = d.pointDistance || .05;

			this.domClass = d.domClass || 'sonic';

			this.backgroundColor = d.backgroundColor || 'rgba(0,0,0,0)';
			this.fillColor = d.fillColor;
			this.strokeColor = d.strokeColor;

			this.stepMethod = typeof d.step == 'string' ?
				stepMethods[d.step] :
				d.step || stepMethods.square;

			this._setup = d.setup || emptyFn;
			this._teardown = d.teardown || emptyFn;
			this._preStep = d.preStep || emptyFn;

			this.pixelRatio = d.pixelRatio || null;

			this.width = d.width;
			this.height = d.height;

			this.fullWidth = this.width + 2 * this.padding;
			this.fullHeight = this.height + 2 * this.padding;

			this.domClass = d.domClass || 'sonic';

			this.setup();

		}

		var argTypes = Sonic.argTypes = {
			DIM: 1,
			DEGREE: 2,
			RADIUS: 3,
			OTHER: 0
		};

		var argSignatures = Sonic.argSignatures = {
			arc: [1, 1, 3, 2, 2, 0],
			bezier: [1, 1, 1, 1, 1, 1, 1, 1],
			line: [1,1,1,1]
		};

		var pathMethods = Sonic.pathMethods = {
			bezier: function(t, p0x, p0y, p1x, p1y, c0x, c0y, c1x, c1y) {
				
			    t = 1-t;

			    var i = 1-t,
			        x = t*t,
			        y = i*i,
			        a = x*t,
			        b = 3 * x * i,
			        c = 3 * t * y,
			        d = y * i;

			    return [
			        a * p0x + b * c0x + c * c1x + d * p1x,
			        a * p0y + b * c0y + c * c1y + d * p1y
			    ]

			},
			arc: function(t, cx, cy, radius, start, end) {

			    var point = (end - start) * t + start;

			    var ret = [
			        (Math.cos(point) * radius) + cx,
			        (Math.sin(point) * radius) + cy
			    ];

			    ret.angle = point;
			    ret.t = t;

			    return ret;

			},
			line: function(t, sx, sy, ex, ey) {
				return [
					(ex - sx) * t + sx,
					(ey - sy) * t + sy
				]
			}
		};

		var stepMethods = Sonic.stepMethods = {
			
			square: function(point, i, f, color, alpha) {
				this._.fillRect(point.x - 3, point.y - 3, 6, 6);
			},

			fader: function(point, i, f, color, alpha) {

				this._.beginPath();

				if (this._last) {
					this._.moveTo(this._last.x, this._last.y);
				}

				this._.lineTo(point.x, point.y);
				this._.closePath();
				this._.stroke();

				this._last = point;

			}

		}

		Sonic.prototype = {

			calculatePixelRatio: function(){

				var devicePixelRatio = window.devicePixelRatio || 1;
				var backingStoreRatio = this._.webkitBackingStorePixelRatio
						|| this._.mozBackingStorePixelRatio
						|| this._.msBackingStorePixelRatio
						|| this._.oBackingStorePixelRatio
						|| this._.backingStorePixelRatio
						|| 1;

				return devicePixelRatio / backingStoreRatio;
			},

			setup: function() {

				var args,
					type,
					method,
					value,
					data = this.data;

				this.canvas = document.createElement('canvas');
				this._ = this.canvas.getContext('2d');

				if(this.pixelRatio == null){
					this.pixelRatio = this.calculatePixelRatio();
				}

				this.canvas.className = this.domClass;

				if(this.pixelRatio != 1){

					this.canvas.style.height = this.fullHeight + 'px';
					this.canvas.style.width = this.fullWidth + 'px';

					this.fullHeight *= this.pixelRatio;
					this.fullWidth  *= this.pixelRatio;

					this.canvas.height = this.fullHeight;
					this.canvas.width = this.fullWidth;

					this._.scale(this.pixelRatio, this.pixelRatio);

				}   else{

					this.canvas.height = this.fullHeight;
					this.canvas.width = this.fullWidth;

				}

				this.points = [];

				for (var i = -1, l = data.length; ++i < l;) {

					args = data[i].slice(1);
					method = data[i][0];

					if (method in argSignatures) for (var a = -1, al = args.length; ++a < al;) {

						type = argSignatures[method][a];
						value = args[a];

						switch (type) {
							case argTypes.RADIUS:
								value *= this.multiplier;
								break;
							case argTypes.DIM:
								value *= this.multiplier;
								value += this.padding;
								break;
							case argTypes.DEGREE:
								value *= Math.PI/180;
								break;
						};

						args[a] = value;

					}

					args.unshift(0);

					for (var r, pd = this.pointDistance, t = pd; t <= 1; t += pd) {
						
						// Avoid crap like 0.15000000000000002
						t = Math.round(t*1/pd) / (1/pd);

						args[0] = t;

						r = pathMethods[method].apply(null, args);

						this.points.push({
							x: r[0],
							y: r[1],
							progress: t
						});

					}

				}

				this.frame = 0;

				if (this.converter && this.converter.setup) {
					this.converter.setup(this);
				}

			},

			prep: function(frame) {

				if (frame in this.imageData) {
					return;
				}

				this._.clearRect(0, 0, this.fullWidth, this.fullHeight);
				this._.fillStyle = this.backgroundColor;
				this._.fillRect(0, 0, this.fullWidth, this.fullHeight);

				var points = this.points,
					pointsLength = points.length,
					pd = this.pointDistance,
					point,
					index,
					frameD;

				this._setup();

				for (var i = -1, l = pointsLength*this.trailLength; ++i < l && !this.stopped;) {

					index = frame + i;

					point = points[index] || points[index - pointsLength];

					if (!point) continue;

					this.alpha = Math.round(1000*(i/(l-1)))/1000;

					this._.globalAlpha = this.alpha;

					if (this.fillColor) {
						this._.fillStyle = this.fillColor;
					}
					if (this.strokeColor) {
						this._.strokeStyle = this.strokeColor;
					}

					frameD = frame/(this.points.length-1);
					indexD = i/(l-1);

					this._preStep(point, indexD, frameD);
					this.stepMethod(point, indexD, frameD);

				} 

				this._teardown();

				this.imageData[frame] = (
					this._.getImageData(0, 0, this.fullWidth, this.fullWidth)
				);

				return true;

			},

			draw: function() {
				
				if (!this.prep(this.frame)) {

					this._.clearRect(0, 0, this.fullWidth, this.fullWidth);

					this._.putImageData(
						this.imageData[this.frame],
						0, 0
					);

				}

				if (this.converter && this.converter.step) {
					this.converter.step(this);
				}

				if (!this.iterateFrame()) {
					if (this.converter && this.converter.teardown) {
						this.converter.teardown(this);
						this.converter = null;
					}
				}

			},

			iterateFrame: function() {
				
				this.frame += this.stepsPerFrame;
				
				if (this.frame >= this.points.length) {
					this.frame = 0;
					return false;
				}

				return true;

			},

			play: function() {

				this.stopped = false;

				var hoc = this;

				this.timer = setInterval(function(){
					hoc.draw();
				}, 1000 / this.fps);

			},
			stop: function() {

				this.stopped = true;
				this.timer && clearInterval(this.timer);

			}
		};

		window.Sonic = Sonic;

	}());


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var html;
	  html = function(params) {
	    var p;
	    if (params.loading_text !== void 0) {
	      p = params.loading_text;
	    } else {
	      p = '正在载入视频';
	    }
	    return "<div class='player_for_user' oncontextmenu='return false' style='position:absolute;z-index:30;height:100%;width:100%;color:white'></div>\n<div class='player_control_bar'>\n  <div class='player_control_bar_progress'>\n    <div class='player_control_bar_dot player_control_bar_candrag'>\n      <div class='player_control_bar_dot_inside'></div>\n      <div class='player_control_bar_dot_inside_dot'></div>\n    </div>\n    <div class='player_control_bar_progress_played'></div>\n    <div class='player_control_bar_progress_buffer'></div>\n    <div class='player_control_bar_click player_control_bar_candrag'></div>\n  </div>\n  <div class=\"player_control_bar_hint\">\n    <div class='player_control_bar_picture'></div>\n    <div class='player_control_bar_hover_time'></div>\n  </div>\n  <div class='player_control_bar_toggle player_control_bar_iconfont'>&#xe603;</div>\n  <div class='player_control_bar_current'>00:00</div>\n  <div class='player_control_bar_total'></div>\n  <a href='javascript:void(0)' class='player_control_bar_logo' target='_blank'>\n    <img class='player_control_bar_logo_img' src='http://7xjfim.com2.z0.glb.qiniucdn.com/iva2-logo-white.svg'>\n  </a>\n\n  <div class='player_control_bar_format_button player_control_bar_format'>高清\n    <div class='player_control_bar_format_select'>\n      <div class='player_control_bar_format_1080p item'>1080p</div>\n      <div class='player_control_bar_format_720p item'>720p</div>\n      <div class='player_control_bar_format_super item'>超清</div>\n      <div class='player_control_bar_format_high item'>高清</div>\n      <div class='player_control_bar_format_normal item'>标清</div>\n    </div>\n  </div>\n  <div class='player_control_bar_fullscreen player_control_bar_iconfont'>&#xe601;</div>\n  <div class='player_control_bar_volume_button player_control_bar_volume player_control_bar_iconfont'>&#xe604;\n    <div class='player_control_bar_volume_bar'>\n      <div class='player_control_bar_volume_control'>\n        <div class='player_control_bar_volume_show'></div>\n      </div>\n      <div class='player_control_bar_volume_click'></div>\n    </div>\n  </div>\n  <div class='player_control_bar_change'>正在为您切换到<a class='player_control_bar_change_format' style='color:#ff3030'>超清</a></div>\n  <div class='player_control_bar_toSD'>当前网络状态不佳，建议切换<a class='player_control_bar_change_toSD' style='color:#ff3030;cursor:pointer;'>标清</a>观看</div>\n</div>\n<div class='is_buffering' style='display:block;height:100%;width:100%;position:absolute;z-index:100;background-color:#202020;'>\n  <div class='is_buffering_inside' style='height:100px;width:100px;position:absolute;left:50%;top:50%;margin-left:-50px;margin-top:-70px;text-align:center;'>\n  </div>\n  <div class='is_buffering_percent' style='height:20px;width:30px;position:absolute;left:50%;top:50%;margin-left:-15px;text-align:center;margin-top:30px;color:white;font-size:0.9em'></div>\n</div>\n<div class='right_menu' oncontextmenu='return false'>\n  <div class='right_menu_key_enable right_menu_key_catch_address item'>获取视频地址</div>\n  <div class='right_menu_key_enable right_menu_key_catch_iframe item'>获取嵌入代码</div>\n  <div class='right_menu_key_enable item' onclick='window.open(\"mailto:luke@venvyvideo.cn;flyingpig@venvyvideo.cn\")'>报告播放问题</div>\n  <div class='right_menu_key_enable item' onclick='window.open(\"http://test.videojj.com:18080\")'>关于video++</div>\n</div>\n<div class='right_window'>\n  <input class='right_window_input' type='text'>\n  <div class='right_window_button'>\n    <div class='right_window_button_click'>关闭</div>\n  </div>\n</div>";
	  };
	  return html;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var $user, LetvVideo, isEnd;
	  isEnd = false;
	  $user = null;
	  return LetvVideo = (function() {
	    function LetvVideo(venvyPlayer, video_url, time) {
	      var self;
	      this.venvyPlayer = venvyPlayer;
	      this.video_url = video_url;
	      this.time = time;
	      self = this;
	      window.vjjFlash = function(evt, val) {
	        switch (evt) {
	          case 'videoStartReady':
	            if (self.venvyPlayer.params.loaded_callback != null) {
	              return self.venvyPlayer.params.loaded_callback();
	            }
	            break;
	          case 'videoStart':
	          case 'videoResume':
	            if (self.venvyPlayer.params.play_callback != null) {
	              return self.venvyPlayer.params.play_callback();
	            }
	            break;
	          case 'videoPause':
	            if (self.venvyPlayer.params.pause_callback != null) {
	              return self.venvyPlayer.params.pause_callback();
	            }
	            break;
	          case 'videoStop':
	            isEnd = true;
	            if (self.venvyPlayer.params.stop_callback != null) {
	              return self.venvyPlayer.params.stop_callback();
	            }
	            break;
	          case 'displayChange':
	            if (val === 'displayShow') {
	              return $user.css('display', 'none');
	            } else if (val === 'displayHide') {
	              return $user.css('display', 'block');
	            }
	        }
	      };
	    }

	    LetvVideo.prototype.init = function(cur_address, total_time, cur_site) {
	      this.cur_address = cur_address;
	      this.total_time = total_time;
	      this.cur_site = cur_site;
	      return this.render();
	    };

	    LetvVideo.prototype.render = function() {
	      var arr, uu, vu;
	      arr = this.cur_address.HD[0].url.split('$');
	      uu = arr[1];
	      vu = arr[2];
	      $user = $("<div class='player_for_user' oncontextmenu='return false' style='position:absolute;z-index:30;height:100%;width:100%;color:white'>\n</div>").css('height', parseInt(this.venvyPlayer.container.css('height')) - 40).appendTo(this.venvyPlayer.container).on('click', (function() {
	        if (this.isPause()) {
	          return this.play();
	        } else {
	          return this.pause();
	        }
	      }).bind(this));
	      this.venvyPlayer.container.append("<object id=\"letv-flash\" class=\"venvy_videos cur_player\" type=\"application/x-shockwave-flash\" data=\"http://yun.letv.com/bcloud.swf\" wmode=\"opaque\">\n    <param name=\"quality\" value=\"high\" />\n    <param name=\"bgcolor\" value=\"#000000\" />\n    <param name=\"allowScriptAccess\" value=\"always\" />\n    <param name=\"allowFullScreen\" value=\"true\" />\n    <param name=\"allowInsecureDomain\" value=\"*\" />\n    <param name=\"allowDomain\" value=\"*\" />\n    <param name=\"flashvars\" value=\"uu=" + uu + "&vu=" + vu + "&skinnable=1&callbackJs=vjjFlash&share=0&extend=0&definition=0\" />\n</object>");
	      this.jvideo = this.venvyPlayer.container.find('.cur_player');
	      return this.video = this.jvideo.get(0);
	    };

	    LetvVideo.prototype.play = function() {
	      if (isEnd) {
	        isEnd = false;
	        return this.video.replayVideo();
	      } else {
	        return this.video.resumeVideo();
	      }
	    };

	    LetvVideo.prototype.pause = function() {
	      return this.video.pauseVideo();
	    };

	    LetvVideo.prototype.jump = function(t) {
	      return this.video.seekTo(t);
	    };

	    LetvVideo.prototype.remove = function() {
	      return this.video.remove();
	    };

	    LetvVideo.prototype.getCurtime = function() {
	      return this.video.getVideoTime();
	    };

	    LetvVideo.prototype.hidePlayerControlBar = function() {};

	    LetvVideo.prototype.showPlayerControlBar = function() {};

	    LetvVideo.prototype.getVideoProportion = function() {
	      return null;
	    };

	    LetvVideo.prototype.getCurrenVideo = function() {
	      return this.video;
	    };

	    LetvVideo.prototype.isPause = function() {
	      return !this.video.getPlayState().playing;
	    };

	    return LetvVideo;

	  })();
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var $user, CztvVideo, isEnd;
	  isEnd = false;
	  $user = null;
	  return CztvVideo = (function() {
	    function CztvVideo(venvyPlayer, video_url, time) {
	      var self;
	      this.venvyPlayer = venvyPlayer;
	      this.video_url = video_url;
	      this.time = time;
	      self = this;
	      window.vjjFlash = function(evt, val) {
	        switch (evt) {
	          case 'videoStartReady':
	            if (self.venvyPlayer.params.loaded_callback != null) {
	              return self.venvyPlayer.params.loaded_callback();
	            }
	            break;
	          case 'videoStart':
	          case 'videoResume':
	            if (self.venvyPlayer.params.play_callback != null) {
	              return self.venvyPlayer.params.play_callback();
	            }
	            break;
	          case 'videoPause':
	            if (self.venvyPlayer.params.pause_callback != null) {
	              return self.venvyPlayer.params.pause_callback();
	            }
	            break;
	          case 'videoStop':
	            isEnd = true;
	            if (self.venvyPlayer.params.stop_callback != null) {
	              return self.venvyPlayer.params.stop_callback();
	            }
	            break;
	          case 'displayChange':
	            if (val === 'displayShow') {
	              $user.css('display', 'none');
	            } else if (val === 'displayHide') {
	              $user.css('display', 'block');
	            }
	            break;
	        }
	      };
	    }

	    CztvVideo.prototype.init = function(cur_address, total_time, cur_site) {
	      this.cur_address = cur_address;
	      this.total_time = total_time;
	      this.cur_site = cur_site;
	      return this.render();
	    };

	    CztvVideo.prototype.render = function() {
	      var arr, value;
	      arr = this.cur_address.HD[0].url.split('$');
	      value = arr[1];
	      $user = $("<div class='player_for_user' oncontextmenu='return false' style='position:absolute;z-index:30;height:100%;width:100%;color:white'>\n</div>").css('height', parseInt(this.venvyPlayer.container.css('height')) - 40).appendTo(this.venvyPlayer.container).on('click', (function() {
	        if (this.isPause()) {
	          return this.play();
	        } else {
	          return this.pause();
	        }
	      }).bind(this));
	      this.venvyPlayer.container.append("<object id=\"letv-flash\" class=\"venvy_videos cur_player\" type=\"application/x-shockwave-flash\" data=\"http://tv.cztv.com/bluetv/vod/XLPVP1124.swf\" wmode=\"opaque\">\n    <param name=\"quality\" value=\"high\" />\n    <param name=\"bgcolor\" value=\"#000000\" />\n    <param name=\"allowScriptAccess\" value=\"always\" />\n    <param name=\"allowFullScreen\" value=\"true\" />\n    <param name=\"allowInsecureDomain\" value=\"*\" />\n    <param name=\"allowDomain\" value=\"*\" />\n    <param name=\"flashvars\" value=\"" + value + "\" />\n</object>");
	      this.jvideo = this.venvyPlayer.container.find('.cur_player');
	      return this.video = this.jvideo.get(0);
	    };

	    CztvVideo.prototype.play = function() {
	      if (isEnd) {
	        isEnd = false;
	        return this.video.replayVideo();
	      } else {
	        return this.video.resumeVideo();
	      }
	    };

	    CztvVideo.prototype.pause = function() {
	      return this.video.pauseVideo();
	    };

	    CztvVideo.prototype.jump = function(t) {
	      return this.video.seekTo(t);
	    };

	    CztvVideo.prototype.remove = function() {
	      return this.video.remove();
	    };

	    CztvVideo.prototype.getCurtime = function() {
	      return this.video.getVideoTime();
	    };

	    CztvVideo.prototype.hidePlayerControlBar = function() {};

	    CztvVideo.prototype.showPlayerControlBar = function() {};

	    CztvVideo.prototype.getVideoProportion = function() {
	      return null;
	    };

	    CztvVideo.prototype.getCurrenVideo = function() {
	      return this.video;
	    };

	    CztvVideo.prototype.isPause = function() {
	      return !this.video.getPlayState().playing;
	    };

	    return CztvVideo;

	  })();
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var $user, MangoVideo, barTimer, isPause, showTimer;
	  isPause = false;
	  $user = null;
	  showTimer = null;
	  barTimer = null;
	  return MangoVideo = (function() {
	    function MangoVideo(venvyPlayer, video_url, time) {
	      var self;
	      this.venvyPlayer = venvyPlayer;
	      this.video_url = video_url;
	      this.time = time;
	      self = this;
	      window.vjjFlash = function(evt, val) {
	        switch (evt) {
	          case 'roll_out_video':
	            $user.css('display', 'none');
	            break;
	          case 'roll_over_video':
	            $user.css('display', 'block');
	            break;
	          case 'play_callback':
	            if (self.venvyPlayer.params.loaded_callback != null) {
	              return self.venvyPlayer.params.loaded_callback();
	            }
	            break;
	          case 'resume_callback':
	            isPause = false;
	            if (self.venvyPlayer.params.play_callback != null) {
	              return self.venvyPlayer.params.play_callback();
	            }
	            break;
	          case 'pause_callback':
	            isPause = true;
	            if (self.venvyPlayer.params.pause_callback != null) {
	              return self.venvyPlayer.params.pause_callback();
	            }
	            break;
	          case 'stop_callback':
	            if (self.venvyPlayer.params.stop_callback != null) {
	              return self.venvyPlayer.params.stop_callback();
	            }
	            break;
	          case 'show_bar_callback':
	            if (self.venvyPlayer.params.show_bar_callback != null) {
	              return self.venvyPlayer.params.show_bar_callback();
	            }
	            break;
	          case 'hide_bar_callback':
	            if (self.venvyPlayer.params.hide_bar_callback != null) {
	              return self.venvyPlayer.params.hide_bar_callback();
	            }
	            break;
	          case 'start_seek_callback':
	            if (self.venvyPlayer.params.start_seek_callback != null) {
	              return self.venvyPlayer.params.start_seek_callback();
	            }
	            break;
	          case 'fullscreen_callback':
	            if (self.venvyPlayer.params.fullscreen_callback != null) {
	              return self.venvyPlayer.params.fullscreen_callback();
	            }
	            break;
	          case 'exitfullscreen_callback':
	            if (self.venvyPlayer.params.exitfullscreen_callback != null) {
	              return self.venvyPlayer.params.exitfullscreen_callback();
	            }
	        }
	      };
	    }

	    MangoVideo.prototype.init = function(cur_address, total_time, cur_site) {
	      this.cur_address = cur_address;
	      this.total_time = total_time;
	      this.cur_site = cur_site;
	      return this.render();
	    };

	    MangoVideo.prototype.render = function() {
	      var href, self;
	      self = this;
	      href = this.cur_address.HD[0].url.replace(/^\$|\$hunantv$/g, '');
	      $user = $("<div class='player_for_user' oncontextmenu='return false' style='position:absolute;z-index:30;height:100%;width:100%;color:white;'>\n</div>").css('height', parseInt(this.venvyPlayer.container.css('height')) - 60).appendTo(this.venvyPlayer.container).on('click', (function() {
	        if (this.isPause()) {
	          return this.play();
	        } else {
	          return this.pause();
	        }
	      }).bind(this));
	      this.venvyPlayer.container.append("<object id=\"hunan-flash\" class=\"venvy_videos cur_player\" type=\"application/x-shockwave-flash\" data=\"" + href + "\" wmode=\"opaque\">\n    <param name=\"quality\" value=\"high\" />\n    <param name=\"bgcolor\" value=\"#000000\" />\n    <param name=\"allowScriptAccess\" value=\"always\" />\n    <param name=\"allowFullScreen\" value=\"true\" />\n    <param name=\"allowInsecureDomain\" value=\"*\" />\n    <param name=\"allowDomain\" value=\"*\" />\n</object>");
	      this.jvideo = this.venvyPlayer.container.find('.cur_player');
	      this.video = this.jvideo.get(0);
	      if (self.venvyPlayer.params.logined !== true) {
	        return this.jvideo.on('mouseenter', function() {
	          return $user.css('display', 'none');
	        }).on('mouseleave', function() {
	          return $user.css('display', 'block');
	        });
	      }
	    };

	    MangoVideo.prototype.play = function() {
	      return this.video.resume();
	    };

	    MangoVideo.prototype.pause = function() {
	      return this.video.pause();
	    };

	    MangoVideo.prototype.jump = function(t) {};

	    MangoVideo.prototype.remove = function() {
	      return this.video.remove();
	    };

	    MangoVideo.prototype.getCurtime = function() {
	      return this.video.get_time();
	    };

	    MangoVideo.prototype.hidePlayerControlBar = function() {
	      return this.video.hide_the_player_bar();
	    };

	    MangoVideo.prototype.showPlayerControlBar = function() {
	      return this.video.show_the_player_bar();
	    };

	    MangoVideo.prototype.getVideoProportion = function() {
	      return null;
	    };

	    MangoVideo.prototype.getCurrenVideo = function() {
	      return this.video;
	    };

	    MangoVideo.prototype.isPause = function() {
	      return isPause;
	    };

	    return MangoVideo;

	  })();
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = function(TemplateLoading) {
	  var LoadingComponent;
	  return LoadingComponent = (function() {
	    function LoadingComponent(venvyPlayer) {
	      this.venvyPlayer = venvyPlayer;
	      this._render();
	      this.is_buffering = this.venvyPlayer.container.find('.loading_component');
	      this.is_buffering_text = this.is_buffering.find('.loading_text');
	      this.is_buffering_inside = this.is_buffering.find('.loading_inside');
	    }

	    LoadingComponent.prototype.destory = function() {
	      return this.is_buffering.remove();
	    };

	    LoadingComponent.prototype._render = function() {
	      return this.venvyPlayer.container.append(TemplateLoading(this.venvyPlayer.params));
	    };

	    return LoadingComponent;

	  })();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var html;
	  html = function(params) {
	    var logo, p;
	    if (params.loading_text !== void 0) {
	      p = params.loading_text;
	    } else {
	      p = '正在载入视频';
	    }
	    logo = params.logo || 'http://7xjfim.com2.z0.glb.qiniucdn.com/iva2-logo-white.svg';
	    return "<div class='loading_component' style='display:block;height:100%;width:100%;position:absolute;z-index:101;background-color:#202020;'>\n  <div class='loading_inside'>\n    <img class='loading_inside_logo' width='55' src='" + logo + "'>\n  </div>\n  <div class='loading_text' style='height:20px;width:300px;position:absolute;left:50%;top:50%;margin-left:-150px;margin-top:70px;text-align:center;color:#e1e1e1;font-size:12px;font-style:italic;'>" + p + "</div>\n  <div class='loading_percent' style='height:20px;width:30px;position:absolute;left:50%;top:50%;margin-left:-15px;text-align:center;margin-top:30px;color:white;font-size:0.9em'></div>\n</div>";
	  };
	  return html;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);console.info("Player update at: Thu Nov 26 2015 18:23:52 GMT+0800 (CST)")