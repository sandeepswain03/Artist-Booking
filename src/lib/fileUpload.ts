import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const handleFileUpload = async (files:any, directory:any) => {
  let filePaths = [];
  for (let file of files) {
    if (file instanceof File) {
      const byteData = await file.arrayBuffer();
      const buffer = Buffer.from(byteData);
      const ext = path.extname(file.name);
      const fileName = `${uuidv4()}${ext}`; // Generate a new name with uuid
      const filePath = path.join(directory, fileName);
      await writeFile(filePath, buffer);
      filePaths.push(`/uploads/${fileName}`); // Return the new path
    }
  }
  return filePaths;
};