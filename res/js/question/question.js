$(document).ready(function(){

    question.init();
})


var question = {
	init : function(){
		question.questionCache = [];
		question.bindEvent();
		var id = global.getParam('id') || 1;
		question.getQuestion(id);
	},
	bindEvent : function(){
		$('#questionList').delegate('.js-click', 'click', function(e){
			var handler = $(this).data('handler');
			question[handler] && question[handler].call(this);
		})
	},
	getQuestion : function(index){
		config = {
			type : 'GET',
			url : '../data/question' + index + '.json',
			dataType : 'json',
			success : function(data){
				question.questionCache[index] = data;
				question.renderQuestion(data);
			},
			error : function(e){
				console.log(e);
			}
		}
		$.ajax(config);
	},
	renderQuestion : function(data){
		var source   = $("#question-li-template").html();
		var template = Handlebars.compile(source);
		var content = '';

		for(var i=0; i<data.length; i++){
			var node = data[i];
			var context = {title: node.title, date: node.date, desc: node.desc}
			var html = template(context);
			content += html;
		}

		$('#questionCntUl').html(content);
	},
	showQuestionDetail : function(){
		var title = $(this).text();
		var desc = $(this).next().html();
		$('#questionDetailTitle').text(title);
		$('#questionDetailAns').html(desc);
		$('#questionDetail').removeClass('hide');
		$('#questionCnt').addClass('hide');
	},
	showQuestionCnt : function(){
		$('#questionDetail').addClass('hide');
		$('#questionCnt').removeClass('hide');
	},
	showQuestionTab : function(){
		var tab = $(this).data('index');
		if(question[tab]){
			question.renderQuestion(question[tab]);
		}else{
			question.getQuestion(tab);
		}
		$('#questionTab a').removeClass('on');
		$(this).addClass('on');
	}
}




