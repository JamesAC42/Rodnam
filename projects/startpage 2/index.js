
$(document).ready(()=>{
    /*
    $(".link-icon").on("mouseenter", function(e){
        let $img = $(e.target).find("img")
        let url = $img.attr("src");
        let name = url.slice(8).split(".")[0];
        let src = "./icons/" + name + "-white.png";
        $img.attr("src", src);
    }).on("mouseleave", function(e){
        let $img = $(e.target).find("img")
        let url = $img.attr("src");
        let name = url.slice(8).split("-")[0];
        let src = "./icons/" + name + ".png";
        $img.attr("src", src);
    });
    */
    $("#searchbar").on("keyup", function(e){
        console.log(e);
        console.log(e.which); //13 is enter
        console.log($(e.target).val());
        let val = $(e.target).val();
        if(e.which === 13){
            if(val.indexOf(".") !== -1){
                $(location).attr('href', "http://" + val)
            }else{
                let params = val.split(" ").join("+");
                let url = "https://www.google.com/search?q=" + params;
                $(location).attr('href', url)
            }
        }
    });
})