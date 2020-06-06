const fs = require("fs");
const path = require("path");

const listFilesRecursively = (dir, filelist = {}) => {
  fs.readdirSync(dir).forEach((file) => {
    if (file === "index.js") return;
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? listFilesRecursively(path.join(dir, file), filelist)
      : (filelist = { ...filelist, [file.slice(0, -3)]: path.join(dir, file) });
  });
  return filelist;
};

const fileList = listFilesRecursively(__dirname);

module.exports = Object.keys(fileList).reduce((exports, command) => {
  exports[command] = require(fileList[command]);
  return exports;
}, {});
