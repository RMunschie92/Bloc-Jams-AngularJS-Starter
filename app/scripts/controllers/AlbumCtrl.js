(function() {
  function AlbumCtrl() {
    this.albumData = angular.copy(albumPicasso);
    console.log(this.albumData.songs);
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();
