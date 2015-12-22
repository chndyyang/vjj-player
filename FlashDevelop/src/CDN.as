package
{
	import com.adobe.crypto.MD5;

	public class CDN
	{
		//帝联CDN
		public static const DILIAN:uint = 1;
		//ucloudCDN
		public static const UCLOUD:uint = 2;

		public static var isNeedCDN:Boolean = true;
		public static var playType:uint;
		public static var kValue:String;
		public static var tValue:String;
		public static var domain:String;

		/**
		 * 获取真实的防盗链url
		 * 根据类型以及传入的url，经过一定的算法计算出真实的url来
		 * @param url			url地址
		 * @param type		类型
		 */
		public static function getAntiTheftLinkURL(url:String, type:uint):String
		{
			var temp:String;
			var isHasWen:Boolean = false;
			playType = type;
			switch(type)
			{
				case UCLOUD:
				{
					temp = url;
					if(url.indexOf("?") >= 0)
					{
						temp = url.split("?")[0];
						isHasWen = true;
					}

					temp = temp.split("http://")[1];
					domain = temp.substring(0, temp.indexOf("/"));
					temp = temp.substring(temp.indexOf("/"), temp.length);

					var now:Date = new Date();
					now.hours += 2;

					tValue = uint(now.getTime() / 1000) + "";
					kValue = MD5.hash("xueban@#$87d" + temp + tValue);
					kValue = kValue.substr(8, 16);

					return url + (isHasWen ? "&" : "?") + "k=" + kValue +"&t=" + tValue;
					break;
				}

				default:
				{
					break;
				}
			}
			return "";
		}
	}
}