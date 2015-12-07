/**
 * @ClassName MeiTuanAccredit.as
 * @Description 新蓝美团鉴权授权
 * All rights Reserved, Designed By Video++
 * CopyRight Copyright(C) 2015
 * Company www.videojj.com
 * @author Dennis
 * @version V1.0
 * @Date 2015-11-27 14:47:57
 */
package com.videojj
{
	import com.adobe.crypto.MD5;
	import com.videojj.HttpRequest;
	
	import flash.external.ExternalInterface;
	import flash.net.URLRequestHeader;
	import flash.net.URLRequestMethod;
	import flash.system.Security;
	
	import net.fdream.io.HTTPResponse;

	public class MeiTuanAccredit
	{
		public var accreditCallback:Function;

		private static var _ins:MeiTuanAccredit;

		private static const MAC_STR:String = "videojjplayer";
		private static const ACCREDIT_URL:String = "auth-req.mtmss.com";
		private static const BASE_ACCKEY:String = "68d3e9b0effa4974accc50ca04ec3bce";
		private static const BASE_SECKEY:String = "b4a02742bfe74647a2bb1f1e8cbea75b";
		
		private static var CDN_URL:String = "v3.cztv.com";

		private var _playPath:String;
		private var _keyPath:String;
		private var _accKey:String;
		private var _serKey:String;

		private var _token:String;

		public function MeiTuanAccredit()
		{
			Security.allowDomain("*");
			Security.allowInsecureDomain("*");
		}
		
		public static function get ins():MeiTuanAccredit
		{
			if(_ins == null)
			{
				_ins = new MeiTuanAccredit();
			}
			
			return _ins;
		}

		/**
		 * @Title: analyzeLink
		 * @Description: 分析链接地址
		 * @param: link 链接地址
		 * @return: return_type   
		 * @throws
		 */
		private function analyzeLink(link:String):void
		{
			//http://v3.cztv.com/cztv/vod/2015/11/20/6D563A2F35034166B8A70B2E1B4AAD18/h264_800k_mp4.mp4_playlist.m3u8
			var str:String = link.slice(link.indexOf("http://") + 7);
			str = str.slice(0, str.lastIndexOf("/"));
			CDN_URL = str.slice(0, str.indexOf("/"));
			_keyPath = str.split(CDN_URL)[1];
			
		}

		/**
		 * 根据发来的参数md5后请求云授权
		 * @param	accessKey	美团云颁发的AccessKey
		 * @param	secretKey	美团云颁发的SecretKey
		 * @param	path		资源path前缀 如/channels/lantian/channel01
		 * 						如果只对m3u8文件鉴权的话，path就用m3u8文件的全路径
		 * @param	mac		video++player 这个字段不用发送
		 */
		public function requestAccedit(path:String,
									   accessKey:String,
									   secretKey:String,
									   mac:String=MAC_STR):void
		{
			Security.loadPolicyFile("xmlsocket://" + ACCREDIT_URL + ":843");

			_playPath = path;
			trace(_playPath);
			analyzeLink(_playPath);
			_accKey = accessKey;
			_serKey = MD5.hash(secretKey+_keyPath);
			trace(_serKey, _keyPath, mac);

			var hs:HttpRequest = new HttpRequest("http://" + ACCREDIT_URL + "/", URLRequestMethod.GET);
			hs.addHeader(new URLRequestHeader("X-MSSA-AccessKey", _accKey));
			hs.addHeader(new URLRequestHeader("X-MSSA-Identity", mac));
			hs.addHeader(new URLRequestHeader("X-MSSA-PathSign", _serKey));
			hs.sucCallbackFun = onRequestSuccess;
			hs.failedCallbackFun = onRequestFailed;
			hs.request();
			var result:Object = new Object();
			
			function onRequestSuccess(response:HTTPResponse):void {
				result.status = response.status;
				result.content = response.body;
				_token = response.headers['X-Mssa-Token'];
				result.token = _token;
				result.path = _playPath;
				result.keypath = _keyPath;
				LogToJS("acc completeHandler: " + response.status + ', ' + response.headers['Content-Type']);
				LogToJS('acc content: ' + response.body);
				LogToJS("acc key " +  _token);
				
				if(accreditCallback != null)
				{
					accreditCallback(result);
				}
			}
			
			function onRequestFailed(event:*):void{
				LogToJS(event);
			}
		}
		
		public function requestCDN():void
		{
			/*
			var request:HttpRequest = new HttpRequest(_playPath, URLRequestMethod.GET);
			request.addHeader( new URLRequestHeader("X-MSSA-Identity", MAC_STR) );
			request.addHeader( new URLRequestHeader("X-MSSA-Token", _token));
			request.addHeader( new URLRequestHeader("X-MSSA-Path", _keyPath) );
			request.sucCallbackFun = onRequestSuccess;
			
			request.request();

			var _resultObj:Object;
			function onRequestSuccess(response:HTTPResponse):void {
				_resultObj = new Object();
				_resultObj.status = response.status;
				_resultObj.body = response.body;
				LogToJS("completeHandler: " + response.status + ', ' + response.headers['Content-Type']);
				
			}
			*/
		}
		
		private function LogToJS(str:String):void
		{
			if(ExternalInterface.available)
				ExternalInterface.call('console.log', str);
			trace(str);
		}
	}
}