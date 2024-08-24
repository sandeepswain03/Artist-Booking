import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getUploadPath = (localFilePath: string) => {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  return path.join(uploadsDir, path.basename(localFilePath));
};

const uploadOnCloudinary = async (localFilePath: string) => {
  if (!localFilePath) return null;

  const normalizedPath = getUploadPath(localFilePath);

  try {
    const res = await cloudinary.uploader.upload(normalizedPath, {
      resource_type: 'auto',
    });
    fs.unlinkSync(normalizedPath);
    return res;
  } catch (error) {
    fs.unlinkSync(normalizedPath);
    return error;
  }
};

const deleteFromCloudinary = async (publicId: string) => {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    return error;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
