import multer from 'multer';
import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';    

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        return cb(new Error('Only images are allowed'), false);
    }
    cb(null, true);
};

const handleMultipartData = multer({ fileFilter: imageFilter, limits: { fileSize: 1000000 * 10 } }).single("profileImage"); // ==> name will be same as name specify in swaggerui configuration // 1000000*10 means 10MB

export const profileUpload = async (req, res, next) => {
    handleMultipartData(req, res, async (err) => {
        if (err) {
            res.status(400).json({ msgs: err.message });
        }
        else {
            const fileBuffer = req.file.buffer;
            // console.log('fileBuffer====>', fileBuffer)

            if (!fileBuffer) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            cloudinaryV2.uploader.upload_stream({ resource_type: 'auto' },
                (error, result) => {
                    if (result && result.secure_url) {
                        req.body.profileImage = result.secure_url;
                        // res.json(req.body)
                        next();
                    } else {
                        res.status(400).json(error ? {error: error.message} : {type: "Error", message: 'Image upload failed'});
                    }
                }
            ).end(fileBuffer); // it will provide image to cloudinary from buffer
        }
    });
}
