import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const bufferStream = new Readable();
            bufferStream.push(file.buffer); // Push file buffer
            bufferStream.push(null); // End the stream

            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'HolyWays' }, // Optional folder
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result.secure_url); // Return the Cloudinary URL
                }
            );
            bufferStream.pipe(uploadStream); // Pipe buffer to Cloudinary
        });
    }
}
