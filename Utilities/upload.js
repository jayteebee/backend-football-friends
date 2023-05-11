const multer = require("multer");
const path = require("path");

// Setting up Disk Storage (as opposed to Cloud etc)
// Destination for uploads will be the uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");

    // // Use this section if relative path causes issues
    //     const uploadsDir = path.join(__dirname, "../uploads");
    //     cb(null, uploadsDir);
    // },
    // Giving the uploaded file a unique name
    filename: (req, file, cb) => {
      const uniqueFileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueFileName + "-" + file.originalname);
    };
  },
});

// Filtering out disallowed filetypes
// mime = Multipurpose Internet Mail Extensions = filetype
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedFileTypes.includes(file.mimetype)) {
    // if the uploaded filetype is one of the allowed file types, pass true as the callback parameter, otherwise: else statement
    cb(null, true);
  } else {
    cb(new Error("Invalid File Type"));
  }
};

// Multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

module.exports = upload;
