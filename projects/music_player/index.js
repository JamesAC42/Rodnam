jQuery(function($){
    let visibleCat = "songs";
    let activeCat = "";
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
            this.pendingSong = undefined;
            this.addBulk = false;
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
                visibleCat = name;
                let content = "sidebar-" + name;
                $("#" + content).addClass("sidebar-content-active");
            });
            $(".toggle-play img").on("click", this.togglePlay.bind(this));
            $(".panel-play").on("click", this.playIndex.bind(this));
            $(".volume-bar").on("click", this.adjustVolume.bind(this));
            $(".seek-bar").on("click", this.seek.bind(this));
            $(".seek-bar").on("mouseenter mousemove", this.showSeekHover.bind(this));
            $(".seek-bar").on("mouseleave", this.hideSeekHover.bind(this));
            $(".loop img").on("click", this.toggleLoop.bind(this));
            $(".skip-back").on("click", this.previous.bind(this));
            $(".skip-forward").on("click", this.next.bind(this));
            $(".volume-icon").on("click", this.toggleMute.bind(this));
            $(".queue img").on("click", this.toggleQueue.bind(this));
            $(".shuffle img").on("click", this.toggleShuffle.bind(this));
            $(".new-playlist-submit").on("click", this.addPlaylist.bind(this));
            $("#panel-addtoplaylist").on("click", this.showPlaylistSelect.bind(this, [true]))
            $(".new-playlist-toggle").on("click", this.toggleNewPlaylist.bind(this));
            $(".exit-button").on("click", this.hidePlaylistSelect.bind(this));
            $("#panel-delete").on("click", this.removePlaylist.bind(this));
            $(".block").on("click", this.hidePlaylistSelect.bind(this));
            $("#panel-addtoqueue").on("click", this.addToQueueBulk.bind(this));
            $("#panel-playnext").on("click", this.playNextBulk.bind(this));
        },
        setBackground: function() {
            let bgNumber = Math.floor(Math.random() * 13);
            let bg = "url('background/bg" + bgNumber + ".jpg')";
            $(".view-background").css("background-image", bg);
        },
        renderIndexEvent: function(e) {
            let indexName = $(e.target).text();
            activeCat = visibleCat;
            activeIndex = indexName;
            $("#index-name").text(indexName);
            this.renderIndex(activeCat, indexName);
        },
        renderIndex: function(catName, indexName) {
            $("#index-music-list").empty();
            let index = data[catName][indexName];
            for(let id in index) {
                let music = data["all"][index[id]];
                let musicItem = 
                    '<div class="music-item music-item-index" name="' + id + '">';

                if(activeCat === "playlists") {
                    musicItem +=
                    '   <div class="music-item-delete"><img src="./icons/icons8-cancel-50.png"></div>';
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
            if(catName === "playlists") {
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
            $(".options-list-index .add-to-playlist").on("click", this.showPlaylistSelect.bind(this, [false]));
            $(".options-list-index .add-to-queue").on("click", this.addToQueue.bind(this));
            $(".options-list-index .play-next").on("click", this.playNext.bind(this));
            $(".music-item-delete img").on("click", this.removeFromPlaylist.bind(this));
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
                    '" name="' + item + '">' +
                    '   <div class="queue-item-delete"><img src="./icons/icons8-cancel-50.png"></div>' +
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
            $(".music-item-queue .music-item-title").on("click", this.skipToSong.bind(this));
            $(".music-item-queue .music-item-options").on("mouseenter", function() {
                $(this).children().addClass("options-container-visible");
            }).on("mouseleave", function() {
                $(this).children().removeClass("options-container-visible");
            });
            $(".options-list-queue .add-to-playlist").on("click", this.showPlaylistSelect.bind(this, [false]));
            $(".options-list-queue .add-to-queue").on("click", this.addToQueue.bind(this));
            $(".options-list-queue .play-next").on("click", this.playNext.bind(this));
            $(".queue-item-delete img").on("click", this.removeFromQueue.bind(this));
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
                                if(category === "playlists"){
                                    $(".playlist-select-list ul").append(entry);
                                } 
                            }
                        }
                        i++
                        if(i === 5) break;
                    }
                    resolve(true);
                });
            });
            getData.then(result => {
                $(".playlist-select-list ul li").on("click", this.addToPlaylist.bind(this));
                $(".sidebar-list ul li").on("click", this.renderIndexEvent.bind(this));
            });
        },
        changeSong: function(e) {
            let number = $(e.target).parent().attr("name");
            let index = data[activeCat][activeIndex];
            let id = index[number];
            let song = data["all"][id];
            this.audio.src = song.path;
            this.audio.load();
            $(".song-title").text(song.title);
            $(".song-artist").text(song.artist);
            activeSong = parseInt(number);
            this.play();
            this.setQueue();
            this.renderQueue();
        },
        skipToSong: function(e) {
            let number = $(e.target).parent().attr("name");
            let id = queue[number];
            let song = data["all"][id];
            this.audio.src = song.path;
            this.audio.load();
            $(".song-title").text(song.title);
            $(".song-artist").text(song.artist);
            activeSong = parseInt(number);
            this.play();
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
                    activeSong = Math.floor(Math.random() * data[activeCat][activeIndex].length);
                } else {
                    activeSong = 0;
                }
                this.setQueue();
                this.renderQueue();
                let song = data["all"][queue[activeSong]];
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
        showSeekHover: function(e) {
            if(activeSong == undefined) return;

            let x = e.pageX - $(e.target).offset().left;
            let width = $(".seek-bar").width();
            let percent = x / width;
            let duration = this.audio.duration;
            let seekTime = duration * percent;
            let minutes = Math.floor(seekTime / 60);
            let seconds = Math.floor(seekTime % 60);

            let transform = "translateX(" + (x + 10) + "px) translateY(-45px)";

            $(".seek-hover").css("transform", transform);
            $(".seek-hover").addClass("seek-hover-visible");

            if(minutes < 10) minutes = "0" + minutes;
            if(seconds < 10) seconds = "0" + seconds;
            $(".seek-hover-time").text(minutes + ":" + seconds);

            $(".seek-bar, .seek-bar-inner").addClass("seek-bar-grow");
        },
        hideSeekHover: function(e) {
            $(".seek-hover").removeClass("seek-hover-visible");
            $(".seek-bar, .seek-bar-inner").removeClass("seek-bar-grow");
        },
        seek: function(e) {
            let x = e.pageX - $(e.target).offset().left;
            let width = $(".seek-bar").width();
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
            let width = $(".volume-bar").width();
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
            let playlist = $(e.target).text();
            let index = data[activeCat][activeIndex];
            let songs = [];
            if(!this.addBulk) {
                if(this.queueVisible) {
                    songs.push(queue[this.pendingSong]);
                } else {
                    songs.push(index[this.pendingSong]);
                }
            } else {
                if(this.shuffle) {
                    songs = shuffle(index);
                } else {
                    songs = index;
                }
            }
            $.post("/addToPlaylist", {playlist, "songs":JSON.stringify(songs)}, results => {
                data["playlists"][playlist] = data["playlists"][playlist].concat(songs);
                this.hidePlaylistSelect();
                $("#success-message-text").text("Added to playlist.");
                $(".success-message").addClass("success-message-visible")
                setTimeout(() => {
                    $(".success-message").removeClass("success-message-visible");
                }, 2000);
                if(activeCat == "playlists" && activeIndex == playlist) {
                    this.renderIndex(activeCat, activeIndex);
                }
            });
        },
        successMessage: function(message) {
            $("#success-message-text").text(message);
            $(".success-message").addClass("success-message-visible")
            setTimeout(() => {
                $(".success-message").removeClass("success-message-visible");
            }, 2000);
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
            this.successMessage("Added to queue.");
        },
        addToQueueBulk: function(e) {
            if(activeIndex == "") return;
            let index = data[activeCat][activeIndex];
            let songs;
            if(this.shuffle) {
                songs = shuffle(index);
            } else {
                songs = index;
            }
            queue = queue.concat(songs);
            this.renderQueue();
            this.successMessage("Added to queue.");
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
            this.successMessage("Song playing next.");
        },
        playNextBulk: function(e) {
            if(activeIndex == "") return;
            let index = data[activeCat][activeIndex];
            let songs;
            if(this.shuffle) {
                songs = shuffle(index);
            } else {
                songs = index;
            }
            for(let i = 0; i < songs.length; i++) {
                let pos = activeSong + 1 + i;
                queue.splice(pos, 0, songs[i]);
            }
            this.renderQueue();
            this.successMessage("Songs playing next.");
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
        showPlaylistSelect: function(args, e) {
            if(activeIndex == "") return;
            this.addBulk = args[0];
            if(!this.addBulk) {
                let number = $(e.target).parent().attr("name");
                this.pendingSong = number;
            }
            $(".playlist-select").addClass("playlist-select-visible");
            $(".block").addClass("block-visible");
        },
        hidePlaylistSelect: function() {
            $(".playlist-select").removeClass("playlist-select-visible");
            $(".block").removeClass("block-visible");
        },
        addPlaylist: function() {
            let playlistName = $(".new-playlist-name").val();
            if(playlistName == "") {
                return;
            }
            if(data["playlists"][playlistName] !== undefined) {
                alert("Playlist with that name already exists");
                $(".new-playlist-name").val("");
                return;
            }
            $.post("/addPlaylist", {playlistName}, callback => {
                let listItem = $("<li>" + playlistName + "</li>");
                listItem.on("click", this.renderIndexEvent.bind(this));
                $("#playlist-list").append(listItem);

                let selectItem = $("<li>" + playlistName + "</li>");
                selectItem.on("click", this.addToPlaylist.bind(this));
                $(".playlist-select-list ul").append(selectItem);

                data["playlists"][playlistName] = [];
                $(".new-playlist-name").val("");
            });
        },
        removePlaylist: function() {
            if(confirm("Delete this playlist?")) {
                $.post("/deletePlaylist", {playlist:activeIndex}, result => {
                    delete data["playlists"][activeIndex];
                    $("#index-name").text("");
                    activeIndex = undefined;
                    $("#index-music-list").empty();
                    $("#playlist-list").empty();
                    $(".playlist-select-list ul").empty();
                    for(let playlist in data["playlists"]) {
                        $(".playlist-select-list ul").append("<li>" + playlist + "</li>")
                        $("#playlist-list").append("<li>" + playlist + "</li>");
                    }
                    $(".playlist-select-list ul li").on("click", this.addToPlaylist.bind(this));
                    $("#playlist-list li").on("click", this.renderIndexEvent.bind(this));
                });
            }
        },
        editPlaylistName: function() {

        },
        removeFromPlaylist: function(e) {
            let number = $(e.target).parent().parent().attr("name");
            $.post("/removeFromPlaylist", {activeIndex, number}, results => {
                data["playlists"][activeIndex].splice(number, 1);
                this.renderIndex("playlists", activeIndex);
            });
        },
        removeFromQueue: function(e) {
            let number = $(e.target).parent().parent().attr("name");
            if(activeSong == number) {
                this.next();
            }
            if(activeSong > number) {
                activeSong--;
            }
            queue.splice(number, 1);
            this.renderQueue();
        }
    }
    App.start();
});
