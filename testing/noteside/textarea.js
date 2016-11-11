function insertForm(markdown){
	var $txt = jQuery("#text_area");
    var caretPos = $txt[0].selectionStart;
    var textAreaTxt = $txt.val();
    var txtToAdd = markdown;
    $txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
}
function insertLink(){
	var url = prompt("URL (https://...)");
	var hypertext = prompt("Hyperlink");
	insertForm(" [" + hypertext + "](" + url + ") ");
}
$("#text_area").keydown(function(e) {
	if(e.keyCode === 9) { // tab was pressed
		// get caret position/selection
		var start = this.selectionStart;
			end = this.selectionEnd;

		var $this = $(this);

		// set textarea value to: text before caret + tab + text after caret
		$this.val($this.val().substring(0, start)
					+ "\t"
					+ $this.val().substring(end));

		// put caret at right position again
		this.selectionStart = this.selectionEnd = start + 1;

		// prevent the focus lose
		return false;
	}
});
$(document).ready(function(){
	/*
	$(".header-insert").hide();
	$("#headers-toggle, .header-insert").mouseenter(function(){
		$( ".header-insert" ).first().show(150, function showNext() {
			$( this ).next( ".header-insert" ).show(150, showNext );
		});
	})
	
	$("#headers-toggle, .header-insert").mouseleave( function() {
		if ($('.header-insert:hover').length == 0) {
			$( ".header-insert" ).first().hide(150, function showNext() {
				$( this ).next( ".header-insert" ).hide(150, showNext );
			});
		}
	});
	*/
	var sidebar_out = false;
	function toggleSidebar(){
		if(!sidebar_out){
			$("body").css({"background-color":"#D1D1D1"});
			$("#text_area").css({"background-color":"#D1D1D1"});
			$("li a").css({"background-color":"#058BA4"});
			$(".sidebar-tab").css({"background-color":"#F0F2F9","color":"#000000"});
			$(".pointer-end-tab").css({"border-left":"20px solid #F0F2F9"});
			sidebar_out = true;
		}else{
			$("body").css({"background-color":"#ffffff"});
			$("#text_area").css({"background-color":"#ffffff"});
			$("li a").css({"background-color":"#06BEE1"});
			$(".sidebar-tab").css({"background-color":"#6074C7","color":"#ffffff"});
			$(".pointer-end-tab").css({"border-left":"20px solid #6074C7"});
			sidebar_out = false;
		}
	}
	
	$(".header-insert").animate({width:'toggle'},50);
	$("#header-outer-ctrl").mouseenter(function(){
		$( ".header-insert" ).first().animate({width:'toggle'},150,function showNext() {
			$( this ).next( ".header-insert" ).animate({width:'toggle'},150, showNext );
		});
	})
	$("#header-outer-ctrl").mouseleave(function(){
		$( ".header-insert" ).first().animate({width:'toggle'},150,function showNext() {
			$( this ).next( ".header-insert" ).animate({width:'toggle'},150, showNext );
		});
	})
	/*
	$("#headers-div").mouseleave( function() {
		if ($("#headers-toggle").length != 0) {
			$("#headers-div").animate({width:'toggle'},300);
		}
	});*/
	$(".sidebar-window").each(function() {
		$(this).animate({width:'toggle'},50);
	});
	
	$("#counter-tab").click(function(){
		$(this).parent().find(".sidebar-window").animate({width:'toggle'},200).animate({width:'-=40px'},80).animate({width:'+=40px'},60).animate({width:'-=20px'},40).animate({width:'+=20px'},10);
		$("#info-tab").animate({opacity: 'toggle'},60);
		toggleSidebar();
	});
	$("#info-tab").click(function(){
		$(this).parent().find(".sidebar-window").animate({width:'toggle'},200).animate({width:'-=40px'},80).animate({width:'+=40px'},60).animate({width:'-=20px'},40).animate({width:'+=20px'},10);
		toggleSidebar();
	});
	
	$("#fontfamily-select").change(function(){
		$("#text_area").css({"font-family":$(this).val()});
	});
	
	$("#fontsize-select").change(function(){
		$("#text_area").css({"font-size":$(this).val()});
	});
	$(".btn").mousedown(function(){
		$(this).animate({"margin-top":"+=5px"});
	}).mouseup(function(){
		$(this).animate({"margin-top":"-=5px"});
	})
	
	$("#text_area").keyup(function(){
		countAll();
	});
	$(".sidebar-tab").mouseenter(function(){
		if(!sidebar_out){
			$(this).animate({"width":"+=10px"});
		}
	}).mouseleave(function(){
		if(!sidebar_out){
			$(this).animate({"width":"-=10px"});
		}
	})
	$("li a").mouseenter(function(){
		$(this).css({"background-color":"#06BEE1"});
	}).mouseleave(function(){
		$(this).css({"background-color":"#69C4DB"});
	})
})