import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload to Cloudinary
const uploadOnCloudinary = async (localFilePath: string) => {
    try {
        if (!localFilePath) return null;
        
        // Set static path for public/uploads directory
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        const normalizedPath = path.join(uploadsDir, path.basename(localFilePath));
        
        const res = await cloudinary.uploader.upload(normalizedPath, {
            resource_type: 'auto',
        });
        
        // Delete the local file
        // fs.unlinkSync(normalizedPath);
        
        return res;
    } catch (error) {
        // Remove the locally saved temporary file as the upload operation failed
        if (localFilePath) {
            const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
            const normalizedPath = path.join(uploadsDir, path.basename(localFilePath));
            fs.unlinkSync(normalizedPath);
        }
        return error;
    }
}

// Delete from Cloudinary
const deleteFromCloudinary = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        return error;
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };
