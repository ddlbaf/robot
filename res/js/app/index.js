/**
 * Created by dudedu on 16/3/5.
 */
var index = {
    init : function(){
        index.bindEvent();
    },
    bindEvent : function(){


        $('.js_download').hover(function(e){
            var type = $(this).data('type');
            $('#download_' + type).removeClass('hide');
        })

        $('.js_download').mouseout(function(e){
            $('.download_code').addClass('hide');
        })
    }
}


index.init();

