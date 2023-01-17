import { HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance, ClassConstructor, ClassTransformOptions } from 'class-transformer';
import { CommandEvent } from '@readme/shared-types'
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { extname, resolve } from 'path';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V, groups?: string[]) {
  const options: ClassTransformOptions = { excludeExtraneousValues: true };
  if (groups) {
    options.groups = [...groups];
  }

  return plainToInstance(someDto, plainObject, options);
}

export function getMongoConnectionString({ username, password, host, port, databaseName, authDatabase }): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}
export function createEvent(commandEvent: CommandEvent) {
  return { cmd: commandEvent };
}

export function getMulterOptions() {
  return {
    storage: diskStorage({
      destination: (req: Request, _file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
        const folderName = req.user['sub'];
        const folderPath = resolve(__dirname, process.env.FILE_UPLOAD_DEST, folderName);
        const isFolderExists = existsSync(folderPath) || mkdirSync(folderPath, { recursive: true });

        if (isFolderExists) {
          return callback(null, folderPath);
        }

        return callback(new HttpException('Error while attempt to create file', HttpStatus.BAD_REQUEST,), '');
      },
      filename: (_req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
        const name = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        const randomName = Array(4)
          .fill(null)
          .map(() => Math.round(Math.random() * 10).toString(10))
          .join('');
        callback(null, `${name}${randomName}${fileExtName}`)
      },
    }),
    fileFilter: (_req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
      if (!file.originalname.match(new RegExp(process.env.FILE_EXT_REGEXP))) {
        return callback(
          new HttpException(
            'Not allowed file extension',
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }

      return callback(null, true);
    },
  }
}
