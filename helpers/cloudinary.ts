const cloudinary = require('cloudinary').v2;
import multer from 'multer';

cloudinary.config({
    cloud_name:'',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type: 'auto',
    })

    return result;
}

const upload = multer({storage});

export default {
    upload,
    imageUploadUtil
}