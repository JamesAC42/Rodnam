function printPage(){
	window.print();
}	
$(document).ready(function(){
	$(".note-container").slideDown("slow");
	$(".toolbar li a").mouseenter(function(){
		$(this).animate({
			"margin-right":"+=20px"
		})
	}).mouseleave(function(){
		$(this).animate({
			"margin-right":"-=20px"
		})
	})
	$('#delete-button').on('click', function () {
        return confirm('Are you sure?');
    });
})