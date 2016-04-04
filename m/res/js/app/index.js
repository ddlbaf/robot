/**
 * Created by dudedu on 16/3/1.
 */
var index = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        $('#download').on('tap', function(e){
            var device = app.getAg();
            var a = app.checkAPP();
            if(a == 'weixin'){
                location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yugong.appandroidxiaoai';
            }else{
                if(device == 'ios'){
                    location.href = 'https://itunes.apple.com/cn/app/hui-ba/id1066738633?mt=8';
                }else if(device == 'android'){
                    location.href = 'http://android.myapp.com/myapp/detail.htm?apkName=com.yugong.appandroidxiaoai';
                }
            }
        });

        $('#download').on('touchstart', function(e){
            $(this).addClass('press');
        });

        $('#download').on('touchend', function(e){
            $(this).removeClass('press');
        });
    }
}

index.init();
