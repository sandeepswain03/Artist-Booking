import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (file: File) => {
  if (!file) return null;
  const buffer = await file.arrayBuffer();
  const base64File = Buffer.from(buffer).toString('base64');
  const dataURI = `data:${file.type};base64,${base64File}`;
  
  try {
    const res = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
    });
    return res;
  } catch (error) {
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

export { deleteFromCloudinary, uploadOnCloudinary };

