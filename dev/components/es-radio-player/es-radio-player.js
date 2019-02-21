require('../../common/js/libs/jquery.ajax-cross-origin.min');
//require('../../../node_modules/mediaelement/build/mediaelement-and-player.min');
//const io = require('socket.io')();


export default class EsRadioPlayer{
    constructor(){
        this.mediaPlayer = {};
        this.playButton = document.querySelector(".es-radio-player__button-container");
        this.radioProgramName = document.querySelector(".es-radio-player__programm-name");
        this.radioComposititon = document.querySelector(".es-radio-player__composition");
        this.isPlaying = false;
        this.init();
    }
    init(){

        this.playButton.addEventListener("click", (event) => {
            if(this.isPlaying === false) {
                this.mediaPlayer.play();
                this.isPlaying = true;
                this.playButton.querySelector(".button-play__triangle").style.opacity = "0";
                this.playButton.querySelector(".button-play__paused").style.opacity = "1";
            }
            else{
                this.mediaPlayer.pause();
                this.isPlaying = false;
                this.playButton.querySelector(".button-play__triangle").style.opacity = "1";
                this.playButton.querySelector(".button-play__paused").style.opacity = "0";
            }
        });

        this.getPlayListSocket();
        //this.getPlayList();
        //setTimeout(this.getPlayList.bind(this), 1000);

        this.mediaPlayer = new MediaElement('es-radio-player__audio', {
        success: function(mediaElement, originalNode) {
            // mediaElement.display = 'none';
            // originalNode.display = 'none';
            //mediaElement.play();
        }
        });
    }

    getPlayListSocket(){
        // var socketUrl = document.location.protocol + '//mplb.emg.fm';
        let socketUrl = 'http://mplb.emg.fm';
        let currentNamespace = '/current';
        let codeEuropaPlusFederal = 'ep:federal';
        let filterEuropaPlusStation = function(data){
            return (data.code == codeEuropaPlusFederal) ? true : false;
        };

        var renderCurrentTrack = function(playlistItem){
            this.radioProgramName.textContent = "В эфире:";
            this.radioComposititon.textContent = playlistItem.item.artist + " " + playlistItem.item.song;
        }.bind(this);

        var connectToNamespace = function(namespace, label){
            var opts = {};
            var socket = io(socketUrl + namespace, opts);

            socket.on('data', function(data){
                var filteredData = data.filter(filterEuropaPlusStation);
                filteredData.forEach(renderCurrentTrack);
                // console.log('['+label+'] data', namespace, filteredData);
            });

            socket.on('began', function(data){
                if (! filterEuropaPlusStation(data)) {
                    return;
                }
                renderCurrentTrack(data);
                // console.log('['+label+'] began', namespace, data);
            });

            return socket;
        };

        window.currentSocket = connectToNamespace(currentNamespace, "currentSocket");
    }

    getPlayList(){
        $.ajax({
            crossOrigin: true,
            url: "http://www.europaplus.ru/online/air/1.air.js",
            type: "GET",
            dataType: "json",
            cache: false,
            success: function(playListData){
                let playList = $.parseJSON(playListData);
                this.radioProgramName.textContent = playList.djs[0].prog.name;
                this.radioComposititon.textContent = playList.artist + " " + playList.song;
            }.bind(this)
        });
    }
}