(function() {
  function AlbumCtrl() {
    this.albumData = [];
    this.albumData.push(albumPicasso);
    this.songData = albumPicasso.songs;
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();
