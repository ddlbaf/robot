$(document).ready(function(){

    instructions.init();
})


var instructions = {
	init : function(){
		
		instructions.resize();

		$(window).resize(instructions.resize);
	},
	resize : function(){
		var width = $(window).width();
		if(width < 1100){
			$('body').addClass('small-instructions');
		}else if(width < 900){
			$('body').addClass('smallest-instructions');
		}else{
			$('body').attr('class', 'instructions');
		}
	}
}




