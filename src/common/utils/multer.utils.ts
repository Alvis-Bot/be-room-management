
import { HttpException, HttpStatus } from "@nestjs/common";
import { extname ,  } from 'path';
import { v4 as uuid } from 'uuid';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from "multer";

import * as fs from "fs";
import * as process from "process";
export enum UploadTypesEnum {
  ANY = 'jpg|jpeg|png|gif|pdf|docx|doc|xlsx|xls',
  IMAGES = 'jpg|jpeg|png|gif',
  DOCS = 'pdf|docx|doc|xlsx|xls',
  IMAGES_AND_VIDEOS = 'jpg|jpeg|png|gif|mp4|mov|avi|wmv|flv|3gp|mkv',
}


export class MulterUtils{
  /**
   * Config for allowed files
   *
   * @static
   * @param {UploadTypesEnum} filesAllowed
   * @returns
   * @memberof MulterUtils
   */
  static getConfig(filesAllowed: UploadTypesEnum) {
    return {
      // Enable file size limits
      // limits: {
      //   fileSize: +process.env.MAX_FILE_SIZE * 1024 * 1024,
      // },
      // Check the mimetypes to allow for upload
      fileFilter: (req: any, file: any, cb: any) => {
        console.log(file.mimetype);
        if (file.mimetype.match(`/(${filesAllowed})$`)) {
          // Allow storage of file
          cb(null, true);
        } else {
          // Reject file
          cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
      },
      // Storage properties
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = 'uploads'
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        // File modification details
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }
  }

  static deleteFile(image: string) {
    if (existsSync(`${process.env.UPLOAD_LOCATION}/${image}`)) {
      fs.unlinkSync(`${process.env.UPLOAD_LOCATION}/${image}`);
    }
  }
}