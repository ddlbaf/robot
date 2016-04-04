(function ($) {
	var page = 1;
	var methods = {
		init : function(opts){

	        return this.each(function () {

	            var $this = $(this);
	            var result = methods.setPage(opts.pageSize , opts.page , opts.len);
	            result.id = opts.id;
	            methods.renderPage(result);
	            methods.bindEvent(opts);
	        });

		},
		bindEvent : function(opts){
			$('#'+opts.id+' .arr-left').bind('click', function(e){
				e.preventDefault();
				if(!$('#'+opts.id+' .arr-left').hasClass('arr-left-disable')){
					if(--opts.page < 1){
						opts.page = 1;
					}

					page = opts.page;
				}
			});

			$('#'+opts.id+' .arr-right').bind('click', function(e){
				e.preventDefault();
				if(!$('#'+opts.id+' .arr-right').hasClass('arr-right-disable')){
					opts.page++;

					page = opts.page;

				}
			});
		},
		setPage : function(size, page, len){
			var result = {};
			var status = 0;
			var maxPage = Math.ceil(len/size) || 1;
			if(page > maxPage) {
				page = maxPage;
			}
			var curLen = page * size;

			//获取最大页和最小页
			if(0 > maxPage){
				return;
			}else if(maxPage < 8){
				curPage = 1;
				lastPage = maxPage;
			}else{
				curPage = +page;
				if(maxPage < curPage + 5){
					curPage = maxPage - 4;
					lastPage = maxPage;
					status  = 1;
				}else if(maxPage >= curPage + 5 && curPage > 5){
					lastPage = curPage + 3;
					status  = 3;
				}else{
					curPage = 1;
					lastPage = curPage + 5;
					status  = 2;
				}
			}

			return {
				curPage : curPage,
				lastPage : lastPage,
				maxPage : maxPage,
				status : status,
				page : +page,
				size : size
			}
		},
		renderPage : function(opts){
			var $content = $('<ul class="pages-ul clearfix"></ul>');
			var $lastPage = '';
			$content.html('');
			var html = '<li class="page-li"><a class="page-a arr-left" href="#none">上一页</a></li>';
			console.log(opts);
			if(1 == opts.status || 3 == opts.status){
				html += '<li class="page-li"><a class="page-a" href="?page=1">1</a></li>';
				html += '<li class="page-li"><a class="page-dot">&bull;&bull;&bull;</a></li>';
			}

			for(var i=opts.curPage; i<opts.lastPage+1; i++){
				if(i == opts.page){
					html += '<li class="page-li on"><a class="page-a" href="?page=' + i + '">' + i + '</a></li>';
				}else{
					html += '<li class="page-li"><a class="page-a" href="?page=' + i + '">' + i + '</a></li>';
				}
			}
			if(2 == opts.status || 3 == opts.status){
				html += '<li class="page-li"><a class="page-dot" href="#none">&bull;&bull;&bull;</a></li>';
				html += '<li class="page-li"><a class="page-a" href="?page=' + i + '">' + opts.maxPage + '</a></li>';
			}

			html += $lastPage;
			html += '<li class="page-li"><a class="page-a arr-right" href="#none">下一页</a></li>';
			$content.append(html);

			$('#'+opts.id).html($('<div class="pages-wrap"></div>').html($content));

			if(opts.page <= 1){
				$('#'+opts.id+' .arr-left').addClass('arr-left-disable');
			}
            if(opts.page >= opts.maxPage){
				$('#'+opts.id+' .arr-right').addClass('arr-right-disable');
			}

			return opts;
		}
	}


    $.fn.page = function () {

    	var method = arguments[0];

        // 方法调用
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.page');
        }
    };
})(jQuery);