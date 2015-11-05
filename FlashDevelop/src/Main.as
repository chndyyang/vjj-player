package
{
	
	import com.vjj.VjjApp;
	import com.vjj.events.VideoJSEvent;
	import com.vjj.structs.ExternalEventName;
	import com.vjj.structs.ExternalErrorEventName;
	import com.vjj.Base64;
	
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.external.ExternalInterface;
	import flash.geom.Rectangle;
	import flash.system.Security;
	import flash.ui.ContextMenu;
	import flash.ui.ContextMenuItem;
	import flash.utils.ByteArray;
	import flash.utils.Timer;
	import flash.utils.setTimeout;
	
	import org.mangui.hls.utils.Log;
	
	[SWF(backgroundColor = "#000000", frameRate = "60", width = "480", height = "270")]
	public class Main extends Sprite
	{
		private var _app:VjjApp;
		private var _stageSizeTimer:Timer;
		
		public function Main()
		{
			_stageSizeTimer = new Timer(250);
			_stageSizeTimer.addEventListener(TimerEvent.TIMER, onStageSizeTimerTick);
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		}
		
		private function init():void
		{
			Security.allowDomain("*");
			Security.allowInsecureDomain("*");
			
			if (ExternalInterface.available)
			{
				registerExternalMethods();
			}
			
			_app = new VjjApp();
			addChild(_app);
			
			_app.model.stageRect = new Rectangle(0, 0, stage.stageWidth, stage.stageHeight);
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
			_app.model.autoplay = false;
			_app.model.preload = 'auto';
			
			ExternalInterface.call('vjjFlash.onReady', ExternalInterface.objectID);
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
