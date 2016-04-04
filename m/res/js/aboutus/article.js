$(document).ready(function(){
    article.init();
})

var article = {
    init : function(){

        var id = app.getParam('id');
        if(id){
            article.getArticle(id);
            article.getLink(id);
        }else{
            location.href = 'announce.html';
        }
    },
    getArticle : function(id){
        var source   = $("#article-template").html();
        var template = Handlebars.compile(source);

        config = {
            type : 'GET',
            url : 'http://api.yg-ai.com/posts/' + id,
            dataType : 'json',
            success : function(data){
                var node = data;
                var context = {author: node.post_author, tax :node.taxs[0].name, title: node.post_title, date: node.post_date.substring(0, 10), cnt: node.post_content}
                var html = template(context);

                $('#article').html(html);
            },
            error : function(e){
                console.log(e);
            }
        }
        $.ajax(config);
    },
    getLink : function(id){
        var cache = {};
        var source   = $("#link-template").html();
        var template = Handlebars.compile(source);

        config = {
            type : 'GET',
            url : 'http://api.yg-ai.com/posts',
            dataType : 'json',
            success : function(data){
                var nodes = data;
                for(var i = 0; i<nodes.length; i++){
                    var node = nodes[i];
                    if(node.ID == id){
                        var prev = nodes[i-1];
                        var next = nodes[i+1];
                        //获取前一页
                        if(!prev){
                            cache.prev = {
                                title : '没有了',
                                url : 'javascript:;'
                            }
                        }else{
                            cache.prev = {
                                title : prev.post_title,
                                url : '?id=' + prev.ID
                            }
                        }
                        //获取后一页
                        if(!next){
                            cache.next = {
                                title : '没有了',
                                url : 'javascript:;'
                            }
                        }else{
                            cache.next = {
                                title : next.post_title,
                                url : '?id=' + next.ID
                            }
                        }
                    }
                }
                var context = {prevTitle: cache.prev.title, prevUrl: cache.prev.url, nextTitle: cache.next.title, nextUrl: cache.next.url}
                var html = template(context);
                $('#link').html(html);
            },
            error : function(e){
                console.log(e);
            }
        }
        $.ajax(config);
    }
}