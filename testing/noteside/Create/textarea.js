var autoSave = true;
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
function updateFontSetting(){
	$("#text_area").css({"font-family":$("#fontfamily-select").val()});
	$("#text_area").css({"font-size":$("#fontsize-select").val()});
	$("#text_area").css({"line-height":$("#spacing-select").val() + "em"})
}
function buttonConfirm(button, text){
	var originalText = $(button).text();
	$(button).text(text);
	$(button).animate({"width":"100px"},function(){
		$(this).delay(200).animate({"width":"80px"},function(){
			$(this).text(originalText);
		});
	})
}
function save(manual){
	if(manual =='manual'){
		buttonConfirm("#save-button","Saved!");
	}
	localStorage.textValue = $("#text_area").val();
	localStorage.title = $("#title-input").val();
	localStorage.chapter = $("#section-input").val();
	localStorage.className = $("#class-input").val();
	localStorage.teacher = $("#teacher-input").val();
	localStorage.fontfamily = $("#fontfamily-select").val();
	localStorage.fontsize = $("#fontsize-select").val();
	localStorage.spacing = $("#spacing-select").val();
	localStorage.noteHidden = $("#hide-note-btn").val();
	localStorage.noteProtected = $("#protect-note-bnt").val();
	localStorage.autoSave = $("#auto-save-btn").val();
}
function loadSave(){
	$("#fontfamily-select").val("Ubuntu Mono");
	$("#fontsize-select").val("16");
	$("spacing-select").val("1");
	if(typeof(Storage) !== "undefined"){
		$("#text_area").val(localStorage.textValue);
		$("#title-input").val(localStorage.title);
		$("#section-input").val(localStorage.chapter);
		$("#class-input").val(localStorage.className);
		$("#teacher-input").val(localStorage.teacher);
		var fontfamilySet = (typeof(localStorage.fontfamily) !== "string") ? "Ubuntu Mono" : localStorage.fontfamily;
		$("#fontfamily-select").val(fontfamilySet);
		var fontsizeSet = (typeof(localStorage.fontsize) !== "string") ? "16" : localStorage.fontsize;
		$("#fontsize-select").val(fontsizeSet);
		var spacingSet = (typeof(localStorage.spacing) !== "string") ? "1" : localStorage.spacing;
		$("#spacing-select").val(spacingSet);
		if(localStorage.noteHidden == "private"){
			hideNoteToggle();
		}
		if(localStorage.noteProtected == "protected"){
			protectNoteToggle();
		}
		if(localStorage.autoSave == "off"){
			toggleAutoSave();
		}
		updateFontSetting();
		countAll();
	}else{
		$("#fontfamily-select").val("Ubuntu Mono");
		$("#fontsize-select").val("16");
		$("spacing-select").val("1");
	}
}
function wipeSave(){
	if(confirm("Do you want to remove your saves?")){
		localStorage.removeItem("textValue");
		localStorage.removeItem("title");
		localStorage.removeItem("chapter");
		localStorage.removeItem("className");
		localStorage.removeItem("teacher");
		localStorage.removeItem("fontfamily");
		localStorage.removeItem("fontsize");
		localStorage.removeItem("spacing");
		localStorage.removeItem("noteHidden");
		localStorage.removeItem("noteProtected");
		localStorage.removeItem("autoSave");
		buttonConfirm("#wipe-save-button","Cleared!");
	}
}
function toggleAutoSave(){
	autoSave = !autoSave;
	var $autoButton = jQuery("#auto-save-btn");
	if($autoButton.val() == "on"){
		$autoButton.val("off");
		$autoButton.css({"background-color":" #ED9C0E","color":"white"});
		$autoButton.text("Off");
	}else{
		$autoButton.val("on");
		$autoButton.css({"background-color":" #49AABC","color":"black"});
		$autoButton.text("On");
	}
}
function hideNoteToggle(){
	var $hideButton = jQuery("#hide-note-btn");
	if($hideButton.val() == "public"){
		$hideButton.val("private");
		$hideButton.css({"background-color":" #49AABC","color":"black"});
		$hideButton.text("On");
	}else{
		$hideButton.val("public");
		$hideButton.css({"background-color":" #ED9C0E","color":"white"});
		$hideButton.text("Off");
	}
}
function protectNoteToggle(){
	var $protectButton = $("#protect-note-btn");
	if($protectButton.val() == "unprotected"){
		$protectButton.val("protected");
		$protectButton.css({"background-color":" #49AABC","color":"black"});
		$protectButton.text("On");
		$("#protectedPasswordRow").show("fast");
	}else{
		$protectButton.val("unprotected");
		$protectButton.css({"background-color":" #ED9C0E","color":"white"});
		$protectButton.text("Off");
		$("#protectedPasswordRow").hide("fast");
		$("#protectedPassword").val("");
	}
}
function wipeEditor(){
	if(confirm("Do you want to clear the editor?")){
		$("#text_area").val("");
	}
}
window.onload = function startSave(){
	autoSaveInterval();
}
function autoSaveInterval(){
	window.setInterval(function(){
		if(autoSave){save("auto")}
	},30000)
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
	var sidebar_out = false;
	loadSave();
	$("#protectedPasswordRow").hide("fast");
	$("#protectedPassword").val("");
	function toggleSidebar(){
		if(!sidebar_out){
			$("body").css({"background-color":"#004e66"});
			$("#text_area").css({"background-color":"#D1D1D1"});
			$(".format-li a").css({"background-color":"#058BA4"});
			$(".sidebar-tab").css({"background-color":"#F0F2F9","color":"#000000"});
			$(".pointer-end-tab").css({"border-left":"20px solid #F0F2F9"});
			$(".navbar-div, .navbar li a").css({"background-color":"#1c7097"});
			sidebar_out = true;
		}else{
			$("body").css({"background-color":"#00607D"});
			$("#text_area").css({"background-color":"#ffffff"});
			$(".format-li a").css({"background-color":"#06BEE1"});
			$(".sidebar-tab").css({"background-color":"#6074C7","color":"#ffffff"});
			$(".pointer-end-tab").css({"border-left":"20px solid #6074C7"});
			$(".navbar-div, .navbar li a").css({"background-color":"#2183B1"});
			sidebar_out = false;
		}
	}
	$(".dropdown-content a").mouseenter(function(){
		$(this).css({"background-color":"f1f178"});
	}).mouseleave(function(){
		$(this).css({"background-color":"69C4DB"});
	})
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
	$("#fontfamily-select, #fontsize-select, #spacing-select").change(function(){
		updateFontSetting();
	});
	$(".btn").mousedown(function(){
		$(this).css({"margin-top":"+=5px"});
	}).mouseup(function(){
		$(this).css({"margin-top":"-=5px"});
	})

	$(".format-insert").mousedown(function(){
		$(this).css({"padding-top":"+=5px"});
	}).mouseup(function(){
		$(this).css({"padding-top":"-=5px"});
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
})