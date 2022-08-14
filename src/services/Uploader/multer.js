import multer from 'multer';
import path from 'path';

// const uploader = multer({ dest: path.join(__dirname, '../../uploads/') });
const storage = multer.memoryStorage();
const uploader = multer({ storage: storage });

export default uploader;
