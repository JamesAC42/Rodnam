jQuery(function($){
    let activeCat = "songs";
    let activeIndex = "";
    let App = {
        start: function() {
            this.data = {};
            this.audio = document.getElementById("audio-src");
            this.playing = false;
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

                $(".sidebar-content").removeClass("sidebar-content-active");
                let name = $(this).attr("name");
                activeCat = name;
                let content = "sidebar-" + name;
                $("#" + content).addClass("sidebar-content-active");
            });
            $(".toggle-play img").on("click", this.togglePlay.bind(this));
        },
        renderIndex: function(e) {
            let indexName = $(e.target).text();
            activeIndex = indexName;
            $(".panel-title").text(indexName);
            this.activeIndex = indexName;
            $(".music-list").empty();
            let index = data[activeCat][indexName];
            for(let item in index) {
                let music = index[item];
                let musicItem = 
                    '<div class="music-item">' +
                    '   <div class="music-item-info info-padding"></div>' +
                    '   <div class="music-item-info music-item-title">' +
                            music.title +
                    '</div>' +
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
            $(".music-item").on("click", this.changeSong.bind(this));
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
        changeSong: function(e) {
            let song = $(e.target).text();
            let index = data[activeCat][activeIndex];
            for(let s in index) {
                if(index[s].title == song) {
                    this.audio.src = index[s].path;
                    this.audio.load();
                    this.play();
                    $(".song-title").text(song);
                    $(".song-artist").text(index[s].artist);
                    return;
                }
            }
        },
        pause: function() {
            this.audio.pause();
            this.playing = false;
            $(".toggle-play img").attr("src", "./icons/icons8-circled-play-filled-50.png");
        },
        play: function() {
            this.audio.play();
            this.playing = true;
            $(".toggle-play img").attr("src", "./icons/icons8-pause-button-filled-50.png");
        },
        togglePlay: function() {
            if(this.playing) {
                this.pause();
            } else {
                this.play();
            }
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
