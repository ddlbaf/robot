/**
 * Created by dudedu on 15/11/26.
 */
var app = {
	init: function(){
		this.checkPc();
		this.bindEvent();
	},
	bindEvent : function(){
		$('#btnHeaderNav').on('tap', function(e){
			var $parent = $(this).parent();
			if($parent.hasClass('show-nav')){
				$parent.removeClass('show-nav');
			}else{
				$parent.addClass('show-nav');
			}
		})
	},
	getAg : function(){
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		//var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isAndroid){
			return 'android';
		}else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iPhone') > -1){
			return 'ios';
		}else{
			return 'pc';
		}
	},
	checkAPP : function(){
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){ //微信
			return 'weixin';
		}else if(ua.match(/WeiBo/i) == 'weibo'){ //微博
			return 'weibo';
		}else if(ua.match(/QQ/i) == 'qq'){  //QQ
			return 'qq';
		}else{
			return 'unknow';
		}
	},
	checkPc : function(){
		(function(){
			//判断是否移动端
			var isPc = function(){
				var userAgentInfo = navigator.userAgent;
				var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
				var flag = true;
				for (var v = 0; v < Agents.length; v++) {
					if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
				}
				return flag;
			}();
			if(isPc){
				var host = location.host;
				var path = location.pathname;
				location.href = 'http://' + host + path.substring(2);
			}
		})();
	},
	getParam : function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  r[2]; return null;
	}
}

app.init();


