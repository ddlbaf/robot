/**
 * Created by dudedu on 16/2/9.
 */
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
    if(!isPc){
        var host = location.host;
        var path = location.pathname;
        location.href = 'http://' + host + '/m' + path;
    }else{
        $('#container').removeClass('v-hidden');
    }

    var init = function(){

        var $top = $('<a href="javascript:;" id="back-to-top" style="display: none;" class="scrolltop"></a>');
        $('body').append($top);
        $(window).scroll(function(){
            var scrolltop = $(window).scrollTop();
            var bodyHeight = $('body').outerHeight();
            var winHeight = $(window).outerHeight();
            if (scrolltop > 100){
                if(scrolltop > bodyHeight - winHeight - 170){
                    $top.addClass('bottom');
                }else{
                    $top.removeClass('bottom');
                }
                $top.fadeIn(500);
            }
            else
            {
                $top.fadeOut(500);
            }
        });

        $top.bind('click', function(){
            $('body,html').animate({scrollTop:0},500);
            return false;
        })
    }

    init();

})();

var global = {
    getParam : function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  r[2]; return null;
    }
}







