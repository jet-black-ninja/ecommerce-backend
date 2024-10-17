import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: 'dmoztl9ct',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

// Image upload utility function
async function imageUploadUtil(file: string) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });

  return result;
}
const upload = multer({ storage });
export { upload, imageUploadUtil };
