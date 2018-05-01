jQuery(function($){
    let activeCat = "songs";
    let activeIndex = "";
    let queue = [];
    let activeSong;

    const shuffle = (array) => {
        let newArray = array.slice(0);
        let j = 0;
        let temp = null;
        for(let i = newArray.length - 1; i > 0; i-=1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = newArray[i];
            newArray[i] = newArray[j];
            newArray[j] = temp;
        }
        return newArray;
    }

    let App = {
        start: function() {
            this.data = {};
            this.audio = document.getElementById("audio-src");
            this.playing = false;
            this.shuffle = false;
            this.loop = false;
            this.queueVisible = false;
            this.currentTime;
            this.volumeSave = 1;
            this.newPlaylist = false;
            this.getMusicData();
            this.bind();
            //this.setBackground();
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
            $(".loop img").on("click", this.toggleLoop.bind(this));
            $(".skip-back").on("click", this.previous.bind(this));
            $(".skip-forward").on("click", this.next.bind(this));
            $(".volume-icon").on("click", this.toggleMute.bind(this));
            $(".queue img").on("click", this.toggleQueue.bind(this));
            $(".shuffle img").on("click", this.toggleShuffle.bind(this));
            $(".new-playlist-submit").on("click", this.addPlaylist.bind(this));
            $(".new-playlist-toggle").on("click", this.toggleNewPlaylist.bind(this));
        },
        setBackground: function() {
            let bgNumber = Math.floor(Math.random() * 13);
            let bg = "url('background/bg" + bgNumber + ".jpg')";
            $(".view-background").css("background-image", bg);
        },
        renderIndex: function(e) {
            let indexName = $(e.target).text();
            activeIndex = indexName;
            $("#index-name").text(indexName);
            $("#index-music-list").empty();
            let index = data[activeCat][indexName];
            for(let id in index) {
                let music = data["all"][index[id]];
                let musicItem = 
                    '<div class="music-item music-item-index">';

                if(activeCat === "playlists") {
                    musicItem +=
                    '   <div class="music-item-delete" name="' + id + '"><img src="./icons/icons8-cancel-50.png"></div>';
                }
                musicItem +=
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
                    '       <div class="options-container">' +
                    '           <div class="options-container-inner"> ' +
                    '               <div class="tail"></div>' +
                    '               <div class="options-list options-list-index" name="' + id + '">' +
                    '                   <div class="add-to-playlist">Add to Playlist</div>' +
                    '                   <div class="add-to-queue">Add to Queue</div>' +
                    '                   <div class="play-next">Play Next</div>' +
                    '               </div>' +
                    '           </div>' +
                    '       </div>' + 
                    '       <img src="./icons/icons8-more-filled-50.png" alt="">' +
                    '   </div>' +
                    '</div>';
                $("#index-music-list").append(musicItem);
            }
            if(activeCat === "playlists") {
                $(".playlist-option").removeClass("panel-control-hidden");
            } else {
                $(".playlist-option").addClass("panel-control-hidden");
            }
            this.bindOptionsIndex();
            if(this.queueVisible) {
                $(".queue img").addClass("disabled");
                $(".view-inner").removeClass("view-inner-hidden");
                $(".queue-container").removeClass("queue-container-visible");
                this.queueVisible = false;
            }
        },
        bindOptionsIndex: function() {
            $(".music-item-index .music-item-title").on("click", this.changeSong.bind(this));
            $(".music-item-index .music-item-options").on("mouseenter", function() {
                $(this).children().addClass("options-container-visible");
            }).on("mouseleave", function() {
                $(this).children().removeClass("options-container-visible");
            });
            $(".options-list-index .add-to-playlist").on("click", this.showPlaylistSelect.bind(this));
            $(".options-list-index .add-to-queue").on("click", this.addToQueue.bind(this));
            $(".options-list-index .play-next").on("click", this.playNext.bind(this));
            $(".music-item-delete").on("click", this.removeFromPlaylist.bind(this));
        },
        renderQueue: function() {
            $("#queue-music-list").empty();
            for(let item in queue) {
                let music = data["all"][queue[item]];   
                let musicItem = '<div class="music-item music-item-queue ';
                if (item == activeSong) {
                    musicItem += "music-item-active";
                }
                musicItem += 
                    '">' +
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
                    '       <div class="options-container">' +
                    '           <div class="options-container-inner"> ' +
                    '               <div class="tail"></div>' +
                    '               <div class="options-list options-list-queue" name="' + item + '">' + 
                    '                   <div class="add-to-playlist">Add to Playlist</div>' +
                    '                   <div class="add-to-queue">Add to Queue</div>' +
                    '                   <div class="play-next">Play Next</div>' +
                    '               </div>' +
                    '           </div>' +
                    '       </div>' + 
                    '       <img src="./icons/icons8-more-filled-50.png" alt="">' +
                    '   </div>' +
                    '</div>';
                $("#queue-music-list").append(musicItem);
            }
            this.bindOptionsQueue();
        },
        bindOptionsQueue: function() {
            $(".music-item-queue .music-item-title").on("click", this.changeSong.bind(this));
            $(".music-item-queue .music-item-options").on("mouseenter", function() {
                $(this).children().addClass("options-container-visible");
            }).on("mouseleave", function() {
                $(this).children().removeClass("options-container-visible");
            });
            $(".options-list-queue .add-to-playlist").on("click", this.showPlaylistSelect.bind(this));
            $(".options-list-queue .add-to-queue").on("click", this.addToQueue.bind(this));
            $(".options-list-queue .play-next").on("click", this.playNext.bind(this));
        },
        setQueue: function() {
            let index = data[activeCat][activeIndex];
            if(this.shuffle) {
                let song = index[activeSong];
                let songName = data["all"][song].title;
                queue = shuffle(index);
                for(let item in queue) {
                    if(data["all"][queue[item]].title == songName) {
                        queue.splice(item, 1);
                    }
                }
                queue.splice(0, 0, song);
                activeSong = 0;
            }  else {
                queue = index;
            }
        },
        getMusicData: function() {
            let getData = new Promise((resolve, reject) => {
                $.post("/getSongs", {}, result => {
                    data = JSON.parse(result);
                    let i = 0;
                    for(let category in data) {
                        for(let item in data[category]) {
                            if(item){
                                let entry = "<li>" + item + "</li>";
                                $(".sidebar-list ul").eq(i).append(entry); 
                            }
                        }
                        i++
                        if(i === 5) break;
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
                let music = data["all"][index[s]];
                if(music.title == song) {
                    this.audio.src = music.path;
                    this.audio.load();
                    $(".song-title").text(song);
                    $(".song-artist").text(music.artist);
                    activeSong = s;
                    this.play();
                }
            }
            this.setQueue();
            this.renderQueue();
        },
        pause: function() {
            if(activeSong === undefined) return false;
            this.audio.pause();
            this.playing = false;
            $(".toggle-play img").attr("src", "./icons/icons8-circled-play-filled-50.png");
        },
        play: function() {
            if(activeSong === undefined) return false;
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
                $(e.target).addClass("disabled");
            } else {
                $(e.target).removeClass("disabled");
            }
            this.loop = !this.loop;
            this.audio.loop = this.loop;
        },
        toggleShuffle: function(e) {
            $(e.target).toggleClass("disabled");
            this.shuffle = !this.shuffle;
        },
        playIndex: function() {
            if(activeIndex !== "") {
                if(this.shuffle) {
                    activeSong = Math.floor(Math.random(data[activeCat][activeIndex].length));
                } else {
                    activeSong = 0;
                }
                this.setQueue();
                this.renderQueue();
                let song = data["all"][data[activeCat][activeIndex][activeSong]];
                this.audio.src = song.path;
                this.audio.load();
                this.play();
                $(".song-title").text(song.title);
                $(".song-artist").text(song.artist);
                return;
            } else {
                return;
            }
        },
        next: function() {
            let title;
            let artist;
            if(activeSong == queue.length - 1 || activeSong == undefined) {
                activeSong = undefined;
                queue = [];
                this.resetSeek();
                title = "";
                artist = "";
            } else {
                activeSong++;
                let song = data["all"][queue[activeSong]];
                this.audio.src = song.path;
                this.audio.load();
                this.play();
                title = song.title;
                artist = song.artist;
            }
            $(".song-title").text(title);
            $(".song-artist").text(artist);
            this.renderQueue();
            this.renderControls();
        },
        previous: function() {
            let title;
            let artist;
            if(this.audio.currentTime < 2 && activeSong >= 0) {
                activeSong--;
                let song = data["all"][queue[activeSong]];
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
            this.renderQueue();
            this.renderControls();
        },
        toggleQueue: function(e) {
            if(this.queueVisible) {
                $(e.target).addClass("disabled");
                $(".view-inner").removeClass("view-inner-hidden");
                $(".queue-container").removeClass("queue-container-visible");
            } else {
                $(e.target).removeClass("disabled");
                $(".view-inner").addClass("view-inner-hidden");
                $(".queue-container").addClass("queue-container-visible");
            }
            this.queueVisible = !this.queueVisible;
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
            this.renderVolume(percent);
        },
        renderVolume: function(volume) {
            if(volume === 0) {
                $(".volume-icon").attr("src", "./icons/icons8-mute-50.png");
            } else if(volume < 0.5) {
                $(".volume-icon").attr("src", "./icons/icons8-low-volume-50.png");
            } else {
                $(".volume-icon").attr("src", "./icons/icons8-audio-50.png");
            }
            $(".volume-bar-inner").css("width", Math.floor(100 * volume) + "%");
        },
        toggleMute: function(e) {
            if(this.audio.volume == 0) {
                this.audio.volume = this.volumeSave;
            } else {
                this.volumeSave = this.audio.volume;
                this.audio.volume = 0;
            }
            this.renderVolume(this.audio.volume);
        },
        addToPlaylist: function(e) {
            let number = $(e.target).parent().attr("name");
            let index;
            if(this.queueVisible) {
                index = queue;
            } else {
                index = data[activeCat][activeIndex];
            }
            let song = index[number];
            index
        },
        addToQueue: function(e) {
            let number = $(e.target).parent().attr("name");
            let index;
            if(this.queueVisible) {
                index = queue;
            } else {
                index = data[activeCat][activeIndex];
            }
            let song = index[number];
            queue.push(song);
            this.renderQueue();
            $("#success-message-text").text("Added to queue.");
            $(".success-message").addClass("success-message-visible")
            setTimeout(() => {
                $(".success-message").removeClass("success-message-visible");
            }, 2000);
        },
        playNext: function(e) {
            let number = $(e.target).parent().attr("name");
            let index;
            if(this.queueVisible) {
                index = queue;
            } else {
                index = data[activeCat][activeIndex];
            }
            let song = index[number];
            queue.splice(activeSong + 1, 0, song);
            this.renderQueue();
            $("#success-message-text").text("Song playing next.");
            $(".success-message").addClass("success-message-visible")
            setTimeout(() => {
                $(".success-message").removeClass("success-message-visible");
            }, 2000);
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
            if(activeSong === undefined) {
                $(".control-buttons div").addClass("control-disabled");
            } else {
                $(".control-buttons div").removeClass("control-disabled");
            }
        },
        resetSeek: function() {
            this.audio.src = "";
            this.audio.load();
            $(".current-time, .song-time").text("00:00");
            $(".seek-bar-inner").css("width","0%");
        },
        toggleNewPlaylist: function() {
            $(".new-playlist-form").toggleClass("new-playlist-form-visible");
            $("#playlist-list-outer").toggleClass("sidebar-list-short");
        },
        showPlaylistSelect: function() {

        },
        addPlaylist: function() {
            let playlistName = $(".new-playlist-name").val();
            if(playlistName == "") {
                return;
            }
            $.post("/addPlaylist", {playlistName}, callback => {
                let item = $("<li>" + playlistName + "</li>");
                item.on("click", this.renderIndex.bind(this));
                $("#playlist-list").append(item);
                data["playlists"][playlistName] = [];
                $(".new-playlist-name").val("");
            });
        },
        removePlaylist: function() {

        },
        editPlaylistName: function() {

        },
        removeFromPlaylist: function(e) {
            let name = $(e.target).attr("name");
            $.post("/removeFromPlaylist", {activeIndex, name}, results => {
                data[activeCat][activeIndex].splice(name, 1);
            });
        }
    }
    App.start();
});
