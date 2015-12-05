var fs = require('fs-extra');
var exec = require('child_process').exec;

var Saver = function(fileUrl) {
    this.url = fileUrl;
}

Saver.prototype.compress = function(callback) {
  fs.copySync(this.url, './tmp/un-minified/tmp.jpg');
  
  child = exec('lossypng ./tmp/un-minified/tmp.jpg',
  function (error, stdout, stderr) {
    console.log(stdout);
    if (stdout) {
      callback('./tmp/un-minified/tmp-lossy.png', stdout);
    }
  });
}

module.exports = Saver;
