jQuery(function($){
    
    let App = {
        start: function() {
            this.data = {};
            this.activeCat = "songs";
            this.activeIndex = "";
            this.getMusicData();
            this.bind();
        },
        bind: function() {
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
        },
        renderIndex: function(e) {
            let indexName = $(e.target).text();
            $(".panel-title").text(indexName);
            this.activeIndex = indexName;
            $(".music-list").empty();
            let index = data[this.activeCat][indexName];
            for(let item in index) {
                let music = index[item];
                let musicItem = 
                    '<div class="music-item">' +
                    '   <div class="music-item-info info-padding"></div>' +
                    '   <div class="music-item-info music-item-title">' +
                            music.title +
                    '   </div>' +
                    '   <div class="music-item-info info-padding"></div>' +
                    '   <div class="music-item-info music-item-artist">' +
                            music.artist +
                    '   </div>' +
                    '   <div class="music-item-info info-padding"></div>' +
                    '   <div class="music-item-info music-item-album">' +
                            music.album +
                    '   </div>' +
                    '   <div class="music-item-options">' +
                    '      <img src="./icons/icons8-more-filled-50.png" alt="">' +
                    '   </div>' +
                    '</div>';
                $(".music-list").append(musicItem);
            }
        },
        getMusicData: function() {
            let getData = new Promise((resolve, reject) => {
                $.post("/getSongs", {}, result => {
                    data = JSON.parse(result);
                    let i = 0;
                    for(let category in data) {
                        for(let item in data[category]) {
                            let entry = "<li>" + item + "</li>";
                            $(".sidebar-list ul").eq(i).append(entry); 
                        }
                        i++
                    }
                    resolve(true);
                });
            });
            getData.then(result => {
                $(".sidebar-list ul li").on("click", this.renderIndex.bind(this));
            });
        },
        pause: function() {

        },
        play: function() {

        },
        next: function() {

        },
        previous: function() {

        },
        seek: function() {

        },
        adjustVolume: function() {

        }
    }
    App.start();
});
