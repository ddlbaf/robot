$(document).ready(function(){

    announce.init();
})


var announce = {
    init : function(){
        announce.pageCache = {};
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
        var $parent = $(this).parent();
        $parent.parent().children('li').removeClass('on');
        $parent.addClass('on');
        announce.getData(index);
    },
    getData : function(index){
        var source   = $("#li-template").html();
        var template = Handlebars.compile(source);
        var page = parseInt(global.getParam('page')) || 1;
        var _data = {};
        var tax_id = index || global.getParam('tax_id');
        if(tax_id){
            _data = {tax_id : tax_id};
        }
        if(tax_id && announce.pageCache[tax_id]){

        }
        config = {
            type : 'GET',
            url : 'http://api.yg-ai.com/posts',
            data : _data,
            dataType : 'json',
            success : function(data){
                var nodes = Array.prototype.slice.call(data);
                var $div = $('<div></div>');
                var content  = '';
                var size = 4;
                var len = nodes.length;
                var opts = $('#page').page({
                    id : 'page',
                    len : len,
                    pageSize : size,
                    page : page
                });
                var first = (page - 1) * size;
                var last = first + size > len ? len : first + size;
                for(var i=first; i<last; i++){
                    var node = nodes[i];
                    $div.html(node.post_content);
                    var context = {id: node.ID, title: node.post_title, date: node.post_date.substring(0, 10), desc: $div.text().substring(0, 55)}
                    var html = template(context);
                    content += html;
                }
                $('#list').html(content);
            },
            error : function(e){
                console.log(e);
            }
        }
        console.log(_data);
        $.ajax(config);
    }
}
