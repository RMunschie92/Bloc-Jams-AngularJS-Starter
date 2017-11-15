(function () {
  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;

    /*
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /*
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };


    /*
    * @function playSong
    * @desc Plays audio file currently stored in currentBuzzObject and sets song.playing state value to true
    * @param {Object} song
    */
    var playSong = function(song) {
        currentBuzzObject.play();
        song.playing = true;
    };

    /*
    * @function SongPlayer.song
    * @desc If currentSong is not equal to song it calls setSong and playSong, and if currentSong is equal to song AND the currentBuzzObject is paused, it calls playSong
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (currentSong === song) {
          if (currentBuzzObject.isPaused()) {
            playSong(song);
          }
        }
    };

    /*
    * @function SongPlayer.pause
    * @desc Pauses audio file and sets song.playing to false
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  };

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();