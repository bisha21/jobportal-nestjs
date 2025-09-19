import { Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  uploadFile(
    file: Express.Multer.File,
    folder = 'profilePictures',
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error)
            return reject(
              new Error(error.message || 'Cloudinary upload failed'),
            );
          resolve(result?.secure_url||'');
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
