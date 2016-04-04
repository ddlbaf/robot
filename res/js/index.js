$(document).ready(function(){

    index.init();
})

var index = {

	init : function(){
		index.bindEvent();
		index.curBanner = 0;
		index.timer = null;
		$('.banner-li').width($(window).width());
		index.bannerLen = $('#bannerUl li').size();
		index.setBannerHeight();
		index.setTimer();
		
	},
	bindEvent : function(){
		$('#tabUl li').on('click', function(){
			index.curBanner = $(this).index();
			index.showBanner();
			clearInterval(index.timer);
			index.timer = null;
			index.setTimer();
		});


		$(window).resize(function(){
			$('.banner-li').width($(window).width());
		});
	},
	showBanner : function(){
		var left = index.curBanner * '100';
		$('#bannerUl').animate({marginLeft: '-' + left + '%'});
		$('#tabUl li').removeClass('on');
		$('#tabUl li').eq(index.curBanner).addClass('on');
	},
	setTimer : function(){
		index.timer = setInterval(function(){
			index.curBanner ++;
			if(index.curBanner >= index.bannerLen){
				index.curBanner = 0;
			}
			index.showBanner();
		}, 6000);
	},
	setBannerHeight : function(){
		var height = $(window).height() - $('#header').outerHeight();
		if(height > 730) height = 730;
		$('#banner').height(height);
	}
}








