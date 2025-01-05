import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, 'public/uploads'); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, 
});

export default uploadFile;
