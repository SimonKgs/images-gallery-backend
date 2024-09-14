import multer from 'multer';
import path from 'path';

// Configuring file system storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/'); // folder to store the files
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// Validate the type of the file
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    console.log("allowed");
    cb(null, true);
  } else {
    console.log("not allowed");
    cb(new Error('File type doesn\'t allow'), false);
  }
};

// Init multer configuration
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5 MB per file
});

// upload a single image
export const uploadMiddleware = upload.single('image');
