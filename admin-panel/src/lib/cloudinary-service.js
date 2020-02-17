import cloudinary from 'cloudinary';
import logger from '@logger';
import { cloudinaryConfig } from '../config';

class CloudinaryService {
  constructor() {
    this.cloudinary = cloudinary.config(cloudinaryConfig);
  }

  upload(fileStream, options = {}) {
    fileStream.on('error', logger.error);

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        (result, error) => (error ? reject(error) : resolve(result)),
        options,
      );

      fileStream.pipe(stream);
    });
  }
}

export default new CloudinaryService();
