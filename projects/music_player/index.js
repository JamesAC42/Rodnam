$(document).ready(function() {
    $(".sidebar-icon").on("mouseover", function() {
        $(".sidebar-icon").removeClass("sidebar-icon-hover");
        $(this).addClass("sidebar-icon-hover");
    });
    $(".sidebar-icon").on("mouseleave", function() {
        $(this).removeClass("sidebar-icon-hover");
    });
    $(".sidebar-icon").on("click", function() {
        $(".sidebar-icon").removeClass("sidebar-icon-active");
        $(this).removeClass("sidebar-icon-hover");
        $(this).addClass("sidebar-icon-active");
    });
    $(".sidebar-icon").on("click", function() {
        $(".sidebar-content").removeClass("sidebar-content-active");
        let name = $(this).attr("name");
        let content = "sidebar-" + name;
        $("#" + content).addClass("sidebar-content-active");
    });
});