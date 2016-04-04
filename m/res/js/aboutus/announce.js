$(document).ready(function(){

    announce.init();
})


var announce = {
    init : function(){
        announce.bindEvent();
        announce.getData();
    },
    bindEvent : function(){
        $('body').delegate('.js-click', 'click', function(e){
            var handler = $(this).data('handler');
            announce[handler] && announce[handler].call(this);
        })
    },
    announceTab : function(e){
        var index = $(this).data('index');
        var $lis = $(this).parent().parent().children();
        $lis.removeClass('on');
        $lis.eq(index).addClass('on');
        announce.getData(index);
    },
    getData : function(index){
        var source   = $("#li-template").html();
        var template = Handlebars.compile(source);
        var $div = $('<div></div>')
        var _data = {};
        var tax_id = index || app.getParam('tax_id');
        if(tax_id){
            _data = {tax_id : tax_id};
        }

        config = {
            type : 'GET',
            url : 'http://api.yg-ai.com/posts',
            data : _data,
            dataType : 'json',
            success : function(data){
                var nodes = data;
                var content  = '';
                var size = 4;
                var len = nodes.length;

                var first = 0;
                var last = nodes.length>size ? size : nodes.length;

                for(var i=first; i<last; i++){
                    if(nodes[i].ID != 1){
                        var node = nodes[i];
                        $div.html(node.post_content);
                        var context = {id: node.ID, title: node.post_title, date: node.post_date.substring(0, 10), desc: $div.text()}
                        var html = template(context);
                        content += html;
                    }
                }
                $('#list').html(content);
            },
            error : function(e){
                console.log(e);
            }
        }
        $.ajax(config);
    }
}
