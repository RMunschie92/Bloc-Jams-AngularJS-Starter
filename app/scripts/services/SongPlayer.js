(function () {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /*
    * @var currentAlbum
    * @desc calls getAlbum() and stores album in currentAlbum
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

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
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
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
    * @function getSongIndex
    * @desc Returns indexOf song currently being played within currentAlbum
    * @param {Object} song
    * @ returns {Number} Index of current song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /*
    * @desc Active song object from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /*
    * @function SongPlayer.play
    * @desc If SongPlayer.currentSong is not equal to song it calls setSong and playSong, and if SongPlayer.currentSong is equal to song AND the currentBuzzObject is paused, it calls playSong
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /*
    * @function SongPlayer.previous
    * @desc declares variable to find current index of the song changes currentSong to the previous song on album
    * @param {Object} song
    * @returns {Number} currentSongIndex - 1
    */
    SongPlayer.previous = function(song) {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  };

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
