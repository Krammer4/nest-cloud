import { Injectable, NotFoundException, Patch } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private repository: Repository<ImageEntity>,
  ) {}

  findAll() {
    return this.repository.find({
      relations: ['comments'],
      order: {
        publishedAt: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return this.repository.findOne({
      where: {
        id: Number(id),
      },
      relations: ['comments'],
      order: {
        comments: {
          publishedAt: 'DESC',
        },
      },
    });
  }

  create(file: Express.Multer.File, title: string) {
    return this.repository.save({
      filename: file.filename,
      publishedAt: new Date(),
      title: title,
    });
  }

  async remove(id: string) {
    const image = await this.repository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!image) throw new NotFoundException('Изображение не найдено');

    await this.repository.remove(image);
  }

  async editTitle(id: string, title: string) {
    const image = await this.repository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!image) throw new NotFoundException('Изображение не найдено');

    await this.repository.update(image, {
      title: title,
    });
  }

  async download(filename, res) {
    try {
      const filePath = `./uploads/${filename}`;
      const fileStream = fs.createReadStream(filePath);

      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

      fileStream.pipe(res);
    } catch (error) {
      console.error('Ошибка при скачивании файла', error);
      res.status(500).send('Ошибка при скачивании файла');
    }
  }
}
