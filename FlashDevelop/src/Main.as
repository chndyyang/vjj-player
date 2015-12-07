package
{
	
	import com.adobe.crypto.MD5;
	import com.videojj.MeiTuanAccredit;
	import com.videojj.WebUtils;
	import com.vjj.Base64;
	import com.vjj.VjjApp;
	import com.vjj.events.VideoJSEvent;
	import com.vjj.structs.ExternalErrorEventName;
	import com.vjj.structs.ExternalEventName;
	
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.MouseEvent;
	import flash.events.SecurityErrorEvent;
	import flash.events.TimerEvent;
	import flash.external.ExternalInterface;
	import flash.geom.Rectangle;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.system.Security;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	import flash.utils.Timer;
	import flash.utils.setTimeout;
	
	[SWF(backgroundColor = "#000000", frameRate = "60", width = "480", height = "270")]
	public class Main extends Sprite
	{
		private var _app:VjjApp;
		private var _stageSizeTimer:Timer;
		
		private var _accreditSuc:Function;

		private var onAccSucFunName:String;
		
		private var _domainDic:Dictionary;

		public function Main()
		{
			_domainDic = new Dictionary();

			_stageSizeTimer = new Timer(250);
			_stageSizeTimer.addEventListener(TimerEvent.TIMER, onStageSizeTimerTick);
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		}
		
		private function init():void
		{
			Security.allowDomain("*");
			Security.allowInsecureDomain("*");
			
			onAccSucFunName = stage.loaderInfo.parameters["callback"];
			
			if (ExternalInterface.available)
			{
				registerExternalMethods();
			}
			
			_app = new VjjApp();
			addChild(_app);
			
			_app.model.stageRect = new Rectangle(0, 0, stage.stageWidth, stage.stageHeight);
		}
		
		/**
		 * 获取防盗链url hls4.l.cztv.com,channel01,360p
		 * @param cdn cdn域名 如hls4.l.cztv.com
		 * @param channelID 频道id 如channel01
		 * @param quality 视频清晰度 如360p
		 * http://hls4.l.cztv.com/channels/lantian/channel01/m3u8:360p?k=5a9462eb329c14baf6762fb07758a77e&t=1448506624
		 */
		private function get_Anti_theft_Link(cdn:String, channelID:String, quality:String=""):String
		{
			var url:String = cdn;
			var now:Date = new Date();
			var timeStamp:String = uint(now.getTime() / 1000) + "";
			var channelStr:String;

			var domainStr:String = url;
			domainStr = domainStr.split("http://")[1];
			domainStr = domainStr.split("/")[0];
			if (domainStr.indexOf(":") >= 0) 
			{
				domainStr = domainStr.substr(0, domainStr.indexOf(":"));
			}

			channelStr = cdn.split("http://")[1];
			if (_domainDic[domainStr] != null &&
				_domainDic[domainStr] == CDN.DILIAN) 
			{
				channelStr = "cztv/" + channelStr.split("/")[1]  + "/";
			}
			else
			{
				channelStr = "cztv/" + channelStr.substring(0, channelStr.indexOf("/"));
			}

			url += "?k=" + MD5.hash(channelStr + channelID + timeStamp) + "&t=" + timeStamp;

			return url;
		}
		
		private function getAntiTheftLinkByArray(arr:Array):void
		{
			if(arr == null) 	return;
			var url:String;
			if(arr.length > 1)
			{
				 url = get_Anti_theft_Link(arr[0], arr[1]);	
			}
			else
			{
				var domainStr:String = arr[0];
				domainStr = domainStr.split("http://")[1];
				domainStr = domainStr.split("/")[0];
				if (domainStr.indexOf(":") >= 0) 
				{
					domainStr = domainStr.substr(0, domainStr.indexOf(":"));
				}
				if(_domainDic[domainStr] == 1)
				{
					url = get_Anti_theft_Link(arr[0], "live");
				}
				else
				{
					url = arr[0];
				}
			}
			
			onRequestAccredit(url);
		}

		/**
		 * @Title: onRequestAccredit
		 * @Description: 准备请求授权
		 * @param: path		完整路径http://v3.cztv.com/cztv/vod/2015/11/20/6D563A2F35034166B8A70B2E1B4AAD18/h264_800k_mp4.mp4_playlist.m3u8
		 * @param: acckey	美团颁发的acckey
		 * @param: serkey	美团颁发的serkey
		 * @return: return_type
		 * @throws
		 */
		private function onRequestAccredit(path:String,
										   acckey:String="d9f1ead3e90c42af89841bcfa78fe628",
										   serkey:String ="474b801062b34061aaf4f9c3af0ae4df"):void
		{
			MeiTuanAccredit.ins.accreditCallback = onRequestSuccess;
			MeiTuanAccredit.ins.requestAccedit(path, acckey, serkey);
		}
		
		private function onRequestSuccess(resultObj:Object):void
		{
			
			var str:String = encodeURI(resultObj.path + (resultObj.path.indexOf("?") ? "&" : "?") + "X-MSSA-Token=" + 
				resultObj.token + "&X-MSSA-Identity=videojjplayer&X-MSSA-Path=" + resultObj.keypath);

			_app.model.src = str;
		}
		
		private function registerExternalMethods():void
		{
			try
			{
				ExternalInterface.addCallback("get", onGetPropertyCalled);
				ExternalInterface.addCallback("set", onSetPropertyCalled);
				ExternalInterface.addCallback("play", onPlayCalled);
				ExternalInterface.addCallback("pause", onPauseCalled);
				ExternalInterface.addCallback("resume", onResumeCalled);
				ExternalInterface.addCallback("stop", onStopCalled);
				ExternalInterface.addCallback("jump", onJumpCalled);
				
				//ExternalInterface.addCallback("requestAccredit", onRequestAccredit);
			}
			catch (e:SecurityError)
			{
				if (loaderInfo.parameters.debug != undefined && loaderInfo.parameters.debug == "true")
				{
					throw new SecurityError(e.message);
				}
			}
			catch (e:Error)
			{
				if (loaderInfo.parameters.debug != undefined && loaderInfo.parameters.debug == "true")
				{
					throw new Error(e.message);
				}
			}
			finally
			{
			}
			setTimeout(finish, 50);
		}
		
		private function finish():void
		{
			//_app.model.parameters = loaderInfo.parameters;
			
			_app.model.jsEventProxyName = 'vjjFlash.onEvent';
			_app.model.jsErrorEventProxyName = 'vjjFlash.onError';
			_app.model.autoplay = true;
			_app.model.preload = 'auto';
			
			var l:URLLoader = new URLLoader();
			l.addEventListener(Event.COMPLETE, onCom);
			l.addEventListener(IOErrorEvent.IO_ERROR, onError);
			l.addEventListener(SecurityErrorEvent.SECURITY_ERROR, onError);
			l.load(new URLRequest("domain.xml"));
			
			function onCom(event:Event):void
			{
				var xml:XML = XML(event.target.data);
				var list:XMLList = xml.domains.(@type=="1").domain;
				for each (var item:XML in list) 
				{
					_domainDic[String(item.@id)] = 1;
				}

				if (ExternalInterface.available) 
				{
					ExternalInterface.call('vjjFlash.onReady', ExternalInterface.objectID);
					ExternalInterface.call("console.log", "meituan xinlan cdn test");
					
					var url:String = "http://hls1.l.cztv.com:554/rcztvlive/live/index.m3u8";
					getAntiTheftLinkByArray([url]);
				}
			}
			
			function onError(event:Event):void
			{
				trace(event.toString());
			}
		}
		
		private function onAddedToStage(e:Event):void
		{
			stage.addEventListener(MouseEvent.CLICK, onStageClick);
			stage.addEventListener(Event.RESIZE, onStageResize);
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			_stageSizeTimer.start();
		}
		
		private function onStageSizeTimerTick(e:TimerEvent):void
		{
			if (stage.stageWidth > 0 && stage.stageHeight > 0)
			{
				_stageSizeTimer.stop();
				_stageSizeTimer.removeEventListener(TimerEvent.TIMER, onStageSizeTimerTick);
				init();
			}
		}
		
		private function onStageResize(e:Event):void
		{
			if (_app != null)
			{
				_app.model.stageRect = new Rectangle(0, 0, stage.stageWidth, stage.stageHeight);
				_app.model.broadcastEvent(new VideoJSEvent(VideoJSEvent.STAGE_RESIZE, {}));
			}
		}
		
		private function onAppendBufferCalled(base64str:String):void
		{
			var bytes:ByteArray = Base64.decode(base64str);
			
			_app.model.appendBuffer(bytes);
		}
		
		private function onEchoCalled(pResponse:* = null):*
		{
			return pResponse;
		}
		
		private function onEndOfStreamCalled():*
		{
			_app.model.endOfStream();
		}
		
		private function onAbortCalled():*
		{
			_app.model.abort();
		}
		
		private function onDiscontinuityCalled():*
		{
			_app.model.discontinuity();
		}
		
		private function onGetPropertyCalled(pPropertyName:String = ""):*
		{
			switch (pPropertyName)
			{
			case "mode":
				return _app.model.mode;
				break;
			case "metadata": 
				return _app.model.metadata;
				break;
			case "duration": 
				return _app.model.duration;
				break;
			case "src": 
				return _app.model.src;
				break;
			case "currentTime": 
				return _app.model.time;
				break;
			case "ended": 
				return _app.model.hasEnded;
				break;
			case "volume": 
				return _app.model.volume;
				break;
			case "muted": 
				return _app.model.muted;
				break;
			case "paused": 
				return _app.model.paused;
				break;
			case "seeking": 
				return _app.model.seeking;
				break;
			case "networkState": 
				return _app.model.networkState;
				break;
			case "readyState": 
				return _app.model.readyState;
				break;
			case "buffered": 
				return _app.model.buffered;
				break;
			case "bufferedBytesStart": 
				return 0;
				break;
			case "bufferedBytesEnd": 
				return _app.model.bufferedBytesEnd;
				break;
			case "bytesTotal": 
				return _app.model.bytesTotal;
				break;
			case "videoWidth": 
				return _app.model.videoWidth;
				break;
			case "videoHeight": 
				return _app.model.videoHeight;
				break;
			}
			return null;
		}

		private function onSetPropertyCalled(pPropertyName:String = "", pValue:* = null):void
		{
			switch (pPropertyName)
			{
			case "mode": 
				_app.model.mode = pValue;
				break;
			case "src":
				_app.model.src = pValue;
				break;
			case "presrc":
				var url_arr:Array = String(pValue).split(",");
				getAntiTheftLinkByArray(url_arr);
				break;
			case "currentTime": 
				_app.model.seekBySeconds(Number(pValue));
				break;
			case "muted": 
				_app.model.muted = _app.model.humanToBoolean(pValue);
				break;
			case "volume": 
				_app.model.volume = Number(pValue);
				break;
			default: 
				_app.model.broadcastErrorEventExternally(ExternalErrorEventName.PROPERTY_NOT_FOUND, pPropertyName);
				break;
			}
		}
		
		private function onAutoplayCalled(pAutoplay:* = false):void
		{
			_app.model.autoplay = _app.model.humanToBoolean(pAutoplay);
		}
		
		private function onLoadCalled():void
		{
			_app.model.load();
		}
		
		private function onPlayCalled():void
		{
			_app.model.play();
		}
		
		private function onPauseCalled():void
		{
			_app.model.pause();
		}
		
		private function onResumeCalled():void
		{
			_app.model.resume();
		}
		
		private function onStopCalled():void
		{
			_app.model.stop();
		}
		
		private function onUncaughtError(e:Event):void
		{
			e.preventDefault();
		}
		
		private function onStageClick(e:MouseEvent):void
		{
			_app.model.broadcastEventExternally(ExternalEventName.ON_STAGE_CLICK);
		}
	
		private function onJumpCalled(time:Number,index:int):void
		{
			_app.model.jump(time, index);
		}
	}
}
