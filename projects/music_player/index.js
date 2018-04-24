jQuery(function($){
    let activeCat = "songs";
    let activeIndex = "";
    let queue = [];
    let activeSong;
    let App = {
        start: function() {
            this.data = {};
            this.audio = document.getElementById("audio-src");
            this.playing = false;
            this.shuffle = false;
            this.loop = false;
            this.currentTime;
            this.getMusicData();
            this.bind();
            setInterval(() => {
                this.updateTime();
                this.endCondition();
            }, 100);
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
            $(".panel-play").on("click", this.playIndex.bind(this));
            $(".volume-bar").on("click", this.adjustVolume.bind(this));
            $(".seek-bar").on("click", this.seek.bind(this));
            $(".loop").on("click", this.toggleLoop.bind(this));
            $(".skip-back").on("click", this.previous.bind(this));
            $(".skip-forward").on("click", this.next.bind(this));
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
            if(activeCat === "playlists") {
                $(".panel-option").removeClass("panel-control-hidden");
            } else {
                $(".panel-option").addClass("panel-control-hidden");
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
                    $(".song-title").text(song);
                    $(".song-artist").text(index[s].artist);
                    if(this.shuffle) {
                        queue = index; //.shuffle();
                    } else {
                        queue = index;
                    }
                    activeSong = s;
                    this.play();
                    return;
                }
            }
        },
        pause: function() {
            if(!activeSong) return false;
            this.audio.pause();
            this.playing = false;
            $(".toggle-play img").attr("src", "./icons/icons8-circled-play-filled-50.png");
        },
        play: function() {
            if(!activeSong) return false;
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
        toggleLoop: function(e) {
            if(this.loop) {
                $(e.target).addClass("loop-disabled");
                this.loop = false;
                this.audio.loop = false;
            } else {
                $(e.target).removeClass("loop-disabled");
                this.loop = true;
                this.audio.loop = true;
            }
        },
        playIndex: function() {
            if(activeIndex !== "") {
                let song = data[activeCat][activeIndex][0];
                this.audio.src = song.path;
                this.audio.load();
                this.play();
                $(".song-title").text(song.title);
                $(".song-artist").text(song.artist);
                return;
            } else {
                return false;
            }
        },
        next: function() {
            let title;
            let artist;
            if(activeSong == queue.length - 1) {
                activeSong = undefined;
                this.pause();
                this.resetSeek();
                title = "";
                artist = "";
            } else {
                activeSong++;
                let song = queue[activeSong];
                this.audio.src = song.path;
                this.audio.load();
                this.play();
                title = song.title;
                artist = song.artist;
            }
            $(".song-title").text(title);
            $(".song-artist").text(artist);
            return;
        },
        previous: function() {
            let title;
            let artist;
            if(this.audio.currentTime < 2 && activeSong >= 0) {
                activeSong--;
                let song = queue[activeSong];
                this.audio.src = song.path;
                this.audio.load();
                this.play();
                title = song.title;
                artist = song.artist;
            } else {
                this.seekTo(0);
            }
            $(".song-title").text(title);
            $(".song-artist").text(artist);
            return;
        },
        seek: function(e) {
            let x = e.pageX - $(e.target).offset().left;
            let width = $(e.target).width();
            let percent = x / width;
            let duration = this.audio.duration;
            let seekTime = duration * percent;
            this.seekTo(seekTime);
        },
        seekTo: function(time) {
            let duration = this.audio.duration;
            let percent = time / duration;
            this.audio.currentTime = time;
            let targetWidth = Math.floor(percent * 100);
            $(".seek-bar-inner").css("width", targetWidth + "%");
        },
        adjustVolume: function(e) {
            let x = e.pageX - $(e.target).offset().left;
            let width = $(e.target).width();
            let percent = x / width;
            this.audio.volume = percent;
            let targetWidth = Math.floor(percent * 100);
            $(".volume-bar-inner").css("width", targetWidth + "%");
        },
        updateTime: function() {
            if(this.playing) {
                let current_minutes = Math.floor(this.audio.currentTime / 60);
                if (current_minutes < 10) current_minutes = "0" + current_minutes;
                let current_seconds = Math.floor(this.audio.currentTime % 60);
                if (current_seconds < 10) current_seconds = "0" + current_seconds;
                let current_time = current_minutes + ":" + current_seconds;
                $(".current-time").text(current_time);
                
                let total_time
                if(!Number.isNaN(this.audio.duration)) {
                    let total_minutes = Math.floor(this.audio.duration / 60);
                    if (total_minutes < 10) total_minutes = "0" + total_minutes;
                    let total_seconds = Math.floor(this.audio.duration % 60);
                    if (total_seconds < 10) total_seconds = "0" + total_seconds;
                    total_time = total_minutes + ":" + total_seconds;
                } else {
                    total_time = "00:00";
                }    
                $(".song-time").text(total_time);
                let percent = Math.round((this.audio.currentTime / this.audio.duration) * 100, 3);
                $(".seek-bar-inner").css("width", percent + "%");
            }
            this.renderControls();
        },
        endCondition: function() {
            if(this.audio.ended) {
                this.next();
            }
        },
        renderControls: function() {
            if(!activeSong) {
                $(".control-buttons div").addClass("control-disabled");
            } else {
                $(".control-buttons div").removeClass("control-disabled");
            }
        },
        resetSeek: function() {
            $(".current-time, .song-time").text("00:00");
            $(".seek-bar-inner").css("width","0%");
        }
    }
    App.start();
});
