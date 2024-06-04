import multer from "multer";

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const filetypes = /img|jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

export default upload;