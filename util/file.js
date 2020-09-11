const fs = require("fs");

exports.read = (file, cb) => {
  fs.readFile(file, (err, fileContent) => {
    if (err) {
      cb(null);
      return;
    }
    cb(JSON.parse(fileContent));
  });
};

exports.write = (file, content) => {
  fs.writeFile(file, JSON.stringify(content, null, 2), (err) => {
    console.error(err);
  });
}