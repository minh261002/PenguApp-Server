import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); 
    const filename = `${file.fieldname}-${Date.now()}${ext}`; 
    cb(null, filename);
  },
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
});

export default uploadFile;
