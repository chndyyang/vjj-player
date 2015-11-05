package com.vjj
{
	
	import com.vjj.providers.HTTPVideoProvider;
	import com.vjj.events.VideoJSEvent;
	import com.vjj.events.VideoPlaybackEvent;
	import com.vjj.providers.FLVProvider;
	import com.vjj.providers.RTMPVideoProvider;
	import com.vjj.providers.HLSProvider;
	import com.vjj.structs.ExternalErrorEventName;
	import com.vjj.structs.ExternalEventName;
	import com.vjj.structs.PlayerMode;
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.external.ExternalInterface;
	import flash.geom.Rectangle;
	import flash.media.SoundMixer;
	import flash.media.SoundTransform;
	import flash.media.Video;
	import flash.utils.ByteArray;
	
	import org.mangui.hls.utils.Log;
	
	public class VjjModel extends EventDispatcher
	{
		
		private var _masterVolume:SoundTransform;
		private var _videoReference:Video;
		private var _lastSetVolume:Number = 1;
		private var _provider:*;
		
		// accessible properties
		private var _mode:String;
		private var _stageRect:Rectangle;
		private var _jsEventProxyName:String = "";
		private var _jsErrorEventProxyName:String = "";
		private var _backgroundColor:Number = 0;
		private var _backgroundAlpha:Number = 0;
		private var _volume:Number = 1;
		private var _autoplay:Boolean = false;
		private var _preload:String = "auto";
		private var _loop:Boolean = false;
		private var _src:*;
		private var _poster:String = "";
		private var _parameters:Object;
		
		private static var _instance:VjjModel;
		
		public function VjjModel(pLock:SingletonLock)
		{
			if (!pLock is SingletonLock)
			{
				throw new Error("Invalid Singleton access.  Use VideoJSModel.getInstance()!");
			}
			else
			{
				_masterVolume = new SoundTransform();
				_stageRect = new Rectangle(0, 0, 100, 100);
			}
		}
		
		public static function getInstance():VjjModel
		{
			if (_instance === null)
			{
				_instance = new VjjModel(new SingletonLock());
			}
			return _instance;
		}
		
		public function get mode():String
		{
			return _mode;
		}
		
		public function set mode(pMode:String):void
		{
			_mode = pMode;
		}
		
		public function get jsEventProxyName():String
		{
			return _jsEventProxyName;
		}
		
		public function set jsEventProxyName(pName:String):void
		{
			_jsEventProxyName = cleanEIString(pName);
		}
		
		public function get jsErrorEventProxyName():String
		{
			return _jsErrorEventProxyName;
		}
		
		public function set jsErrorEventProxyName(pName:String):void
		{
			_jsErrorEventProxyName = cleanEIString(pName);
		}
		
		public function get stageRect():Rectangle
		{
			return _stageRect;
		}
		
		public function set stageRect(pRect:Rectangle):void
		{
			_stageRect = pRect;
		}
		
		public function appendBuffer(bytes:ByteArray):void
		{
			_provider.appendBuffer(bytes);
		}
		
		public function endOfStream():void
		{
			_provider.endOfStream();
		}
		
		public function abort():void
		{
			_provider.abort();
		}
		
		public function discontinuity():void
		{
			_provider.discontinuity();
		}
		
		public function get backgroundColor():Number
		{
			return _backgroundColor;
		}
		
		public function set backgroundColor(pColor:Number):void
		{
			if (pColor < 0)
			{
				_backgroundColor = 0;
			}
			else
			{
				_backgroundColor = pColor;
				broadcastEvent(new VideoPlaybackEvent(VideoJSEvent.BACKGROUND_COLOR_SET, {}));
			}
		}
		
		public function get backgroundAlpha():Number
		{
			return _backgroundAlpha;
		}
		
		public function set backgroundAlpha(pAlpha:Number):void
		{
			if (pAlpha < 0)
			{
				_backgroundAlpha = 0;
			}
			else
			{
				_backgroundAlpha = pAlpha;
			}
		}
		
		public function get videoReference():Video
		{
			return _videoReference;
		}
		
		public function set videoReference(pVideo:Video):void
		{
			_videoReference = pVideo;
		}
		
		public function get metadata():Object
		{
			if (_provider)
			{
				return cleanObject(_provider.metadata);
			}
			return {};
		}
		
		public function get volume():Number
		{
			return _volume;
		}
		
		public function set volume(pVolume:Number):void
		{
			if (pVolume >= 0 && pVolume <= 1)
			{
				_volume = pVolume;
			}
			else
			{
				_volume = 1;
			}
			_masterVolume.volume = _volume;
			SoundMixer.soundTransform = _masterVolume;
			_lastSetVolume = _volume;
			broadcastEventExternally(ExternalEventName.ON_VOLUME_CHANGE, _volume);
		}
		
		public function get duration():Number
		{
			if (_provider)
			{
				return _provider.duration;
			}
			return 0;
		}
		
		public function set duration(value:Number):void
		{
			if (_provider && _provider is HTTPVideoProvider)
			{
				(_provider as HTTPVideoProvider).duration = value;
			}
		}
		
		public function get autoplay():Boolean
		{
			return _autoplay;
		}
		
		public function set autoplay(pValue:Boolean):void
		{
			_autoplay = pValue;
		}
		
		public function get src():*
		{
			return cleanObject(_src);
		}
		
		public function set src(pValue:*):void
		{
			_src = pValue;
			broadcastEventExternally(ExternalEventName.ON_SRC_CHANGE, _src);
			initProvider();
			if (_autoplay)
			{
				_provider.play();
			}
			else if (_preload == "auto")
			{
				_provider.load();
			}
		}
		
		public function get poster():String
		{
			return _poster;
		}
		
		public function set poster(pValue:String):void
		{
			_poster = pValue;
			broadcastEvent(new VideoJSEvent(VideoJSEvent.POSTER_SET));
		}
		
		public function get parameters():Object
		{
			return _parameters;
		}
		
		public function set parameters(pValue:Object):void
		{
			_parameters = pValue;
		}
		
		public function get hasEnded():Boolean
		{
			if (_provider)
			{
				return _provider.ended;
			}
			return false;
		}
		
		/**
		 * Returns the playhead position of the current video, in seconds.
		 * @return
		 *
		 */
		public function get time():Number
		{
			if (_provider)
			{
				return _provider.time;
			}
			return 0;
		}
		
		public function get muted():Boolean
		{
			return (_volume == 0);
		}
		
		public function set muted(pValue:Boolean):void
		{
			if (pValue)
			{
				var __lastSetVolume:Number = _lastSetVolume;
				volume = 0;
				_lastSetVolume = __lastSetVolume;
			}
			else
			{
				volume = _lastSetVolume;
			}
		}
		
		public function get seeking():Boolean
		{
			if (_provider)
			{
				return _provider.seeking;
			}
			return false;
		}
		
		public function get networkState():int
		{
			if (_provider)
			{
				return _provider.networkState;
			}
			return 0;
		}
		
		public function get readyState():int
		{
			if (_provider)
			{
				return _provider.readyState;
			}
			return 0;
		
		}
		
		public function get preload():String
		{
			return _preload;
		}
		
		public function set preload(pValue:String):void
		{
			_preload = pValue;
		}
		
		public function get loop():Boolean
		{
			return _loop;
		}
		
		public function set loop(pValue:Boolean):void
		{
			_loop = pValue;
		}
		
		public function get buffered():Number
		{
			if (_provider)
			{
				return _provider.buffered;
			}
			return 0;
		}
		
		/**
		 * Returns the total number of bytes loaded for the current video.
		 * @return
		 *
		 */
		public function get bufferedBytesEnd():int
		{
			if (_provider)
			{
				return _provider.bufferedBytesEnd;
			}
			return 0;
		}
		
		/**
		 * Returns the total size of the current video, in bytes.
		 * @return
		 *
		 */
		public function get bytesTotal():int
		{
			if (_provider)
			{
				return _provider.bytesTotal;
			}
			return 0;
		}
		
		/**
		 * Returns the pixel width of the currently playing video as interpreted by the decompressor.
		 * @return
		 *
		 */
		public function get videoWidth():int
		{
			if (_videoReference != null)
			{
				return _videoReference.videoWidth;
			}
			else
			{
				return 0;
			}
		}
		
		/**
		 * Returns the pixel height of the currently playing video as interpreted by the decompressor.
		 * @return
		 *
		 */
		public function get videoHeight():int
		{
			if (_videoReference != null)
			{
				return _videoReference.videoHeight;
			}
			else
			{
				return 0;
			}
		}
		
		public function get playing():Boolean
		{
			if (_provider)
			{
				return _provider.playing;
			}
			return false;
		}
		
		public function get paused():Boolean
		{
			if (_provider)
			{
				return _provider.paused;
			}
			return true;
		}
		
		/**
		 * Allows this model to act as a centralized event bus to which other classes can subscribe.
		 *
		 * @param e
		 *
		 */
		public function broadcastEvent(e:Event):void
		{
			dispatchEvent(e);
		}
		
		/**
		 * This is an internal proxy that allows instances in this swf to broadcast events to a JS proxy function, if one is defined.
		 * @param args
		 *
		 */
		public function broadcastEventExternally(... args):void
		{
			if (_jsEventProxyName != "")
			{
				if (ExternalInterface.available)
				{
					var __incomingArgs:* = args as Array;
					var __newArgs:Array = [_jsEventProxyName, ExternalInterface.objectID].concat(__incomingArgs);
					var __sanitizedArgs:Array = cleanObject(__newArgs);
					ExternalInterface.call.apply(null, __sanitizedArgs);
				}
			}
		}
		
		/**
		 * This is an internal proxy that allows instances in this swf to broadcast error events to a JS proxy function, if one is defined.
		 * @param args
		 *
		 */
		public function broadcastErrorEventExternally(... args):void
		{
			if (_jsErrorEventProxyName != "")
			{
				if (ExternalInterface.available)
				{
					var __incomingArgs:* = args as Array;
					var __newArgs:Array = [_jsErrorEventProxyName, ExternalInterface.objectID].concat(__incomingArgs);
					var __sanitizedArgs:Array = cleanObject(__newArgs);
					ExternalInterface.call.apply(null, __newArgs);
				}
			}
		}
		
		public function jump(time:Number, index:int):void
		{
			if (_mode == PlayerMode.FLV && _provider) {
				_provider.jump(time, index);
			}
		}
		
		/**
		 * Loads the video in a paused state.
		 *
		 */
		public function load():void
		{
			if (_provider)
			{
				_provider.load();
			}
		}
		
		/**
		 * Loads the video and begins playback immediately.
		 *
		 */
		public function play():void
		{
			if (_provider)
			{
				_provider.play();
			}
		}
		
		/**
		 * Pauses video playback.
		 *
		 */
		public function pause():void
		{
			if (_provider)
			{
				_provider.pause();
			}
		}
		
		/**
		 * Resumes video playback.
		 *
		 */
		public function resume():void
		{
			if (_provider)
			{
				_provider.resume();
			}
		}
		
		/**
		 * Seeks the currently playing video to the closest keyframe prior to the value provided.
		 * @param pValue
		 *
		 */
		public function seekBySeconds(pValue:Number):void
		{
			if (_provider)
			{
				_provider.seekBySeconds(pValue);
			}
		}
		
		/**
		 * Seeks the currently playing video to the closest keyframe prior to the percent value provided.
		 * @param pValue A float from 0 to 1 that represents the desired seek percent.
		 *
		 */
		public function seekByPercent(pValue:Number):void
		{
			if (_provider)
			{
				_provider.seekByPercent(pValue);
			}
		}
		
		/**
		 * Stops video playback, clears the video element, and stops any loading proceeses.
		 *
		 */
		public function stop():void
		{
			if (_provider)
			{
				_provider.stop();
			}
		}
		
		/**
		 * Returns the number of stream levels that this content has.
		 */
		public function get numberOfLevels():int
		{
			if (_provider)
			{
				return _provider.numberOfLevels;
			}
			return 1;
		}
		
		/**
		 * Returns the currently used stream level.
		 */
		public function get level():int
		{
			if (_provider)
			{
				return _provider.level;
			}
			return 0;
		}
		
		/**
		 * Select the stream level.
		 * If -1 is specified, it means auto selection.
		 * If a level is specified (0-based index), that level is used and auto selection is disabled.
		 */
		public function set level(pLevel:int):void
		{
			if (_provider)
			{
				_provider.level = pLevel;
			}
		}
		
		/**
		 * Returns whether auto selection is currently enabled or not.
		 */
		public function get autoLevelEnabled():Boolean
		{
			if (_provider)
			{
				return _provider.autoLevelEnabled;
			}
			return false;
		}
		
		public function hexToNumber(pHex:String):Number
		{
			var __number:Number = 0;
			// clean it up
			if (pHex.indexOf("#") != -1)
			{
				pHex = pHex.slice(pHex.indexOf("#") + 1);
			}
			if (pHex.length == 6)
			{
				__number = Number("0x" + pHex);
			}
			return __number;
		}
		
		public function humanToBoolean(pValue:*):Boolean
		{
			if (String(pValue) == "true" || String(pValue) == "1")
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		
		/**
		 * Removes dangerous characters from a user-provided string that will be passed to ExternalInterface.call()
		 *
		 */
		public function cleanEIString(pString:String):String
		{
			return pString.replace(/[^A-Za-z0-9_.]/gi, "");
		}
		
		/**
		 * Recursive function to sanitize an object (or array) before passing to ExternalInterface.call()
		 */
		private function cleanObject(obj:*):*
		{
			if (obj is String)
			{
				return obj.split("\\").join("\\\\");
			}
			else if (obj is Array)
			{
				var __sanitizedArray:Array = new Array();
				
				for each (var __item:* in obj)
				{
					__sanitizedArray.push(cleanObject(__item));
				}
				
				return __sanitizedArray;
			}
			else if (typeof(obj) == 'object')
			{
				var __sanitizedObject:Object = new Object();
				
				for (var __i:* in obj)
				{
					__sanitizedObject[__i] = cleanObject(obj[__i]);
				}
				
				return __sanitizedObject;
			}
			else
			{
				return obj;
			}
		}
		
		private function initProvider():void
		{
			if (_provider)
			{
				_provider.die();
				_provider = null;
			}
			var __src:Object = { };
			switch (_mode)
			{
			case PlayerMode.HDL: 
				_provider = new HTTPVideoProvider();
				__src = {path: _src};
				break;
			case PlayerMode.FLV: 
				_provider = new FLVProvider();
				__src = {path: _src, index: 0};
				break;
			case PlayerMode.HLS: 
				_provider = new HLSProvider();
				__src = {m3u8: _src, parameters:{}};
				break;
			case PlayerMode.RTMP: 
				__src = _src;
				_provider = new RTMPVideoProvider();
				break;
			default: 
				broadcastErrorEventExternally(ExternalErrorEventName.UNSUPPORTED_MODE);
			}
			_provider.attachVideo(_videoReference);
			_provider.init(__src, _autoplay);
		}
	}
}

class SingletonLock
{
}
