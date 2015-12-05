var remote = require('electron').remote;
var dialog = remote.require('dialog');
var Saver = remote.require('./Saver');

var fs = remote.require('fs-extra');

var file;

var holder = document.getElementById('holder');
var save_button = document.getElementById('save-button');
var img_two = document.getElementById('image-two');

save_button.onclick = function() {
  dialog.showSaveDialog(
    { 
      title: img_two.src,
      properties: [ 'saveFile' ],
      filters: [
        { name: 'Images (png)', extensions: ['png'] }
      ],
    }, function(file) {
      console.log(file);
      fs.copySync('./tmp/un-minified/tmp-lossy.png', file);
    });
}

holder.ondragover = function () {
  this.classList.add('active');
  return false;
};
holder.ondragleave = holder.ondragend = function () {
  this.classList.remove('active');
  return false;
};
holder.ondrop = function (e) {
  e.preventDefault();
  var file = e.dataTransfer.files[0];
  perform(file);
  
  return false;
};

holder.onclick = function(e) {
  dialog.showOpenDialog(
    { 
      properties: [ 'openFile' ],
      filters: [
        { name: 'Images (jpg, png)', extensions: ['jpg', 'png'] }
      ],
    },
    function (file) {
      perform(file[0]);
    }  
  );
}

function toggleItems() {
  var hides = document.getElementsByClassName('hide-after-load');
  
  for (var i = 0; i < hides.length; i++) {
    hides[i].style.display = 'none';
  }
  
}

function perform(file) {
  document.getElementById('image-one').src = file;
  document.getElementById('image-two').src = '';
  document.querySelector('.loader').style.display = 'block';
  document.getElementById('save-button').style.display = 'none';
  var img = new Saver(file);
  toggleItems();
  
  img.compress(function(imgUrl, message) {
    document.getElementById('image-two').src = imgUrl;
    document.getElementById('save-button').style.display = 'block';
    document.querySelector('.loader').style.display = 'none';   
  });
}