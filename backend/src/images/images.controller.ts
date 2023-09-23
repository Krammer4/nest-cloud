import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger/dist';

@Controller('images')
@ApiTags('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  allImages() {
    return this.imagesService.findAll();
  }
  @Get(':id')
  oneImage(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Query('title') title: string,
  ) {
    return this.imagesService.create(file, title);
  }

  @Delete()
  deleteImage(@Query('id') id: string) {
    return this.imagesService.remove(id);
  }

  @Patch()
  editImageTitle(@Query('id') id: string, @Query('title') title: string) {
    return this.imagesService.editTitle(id, title);
  }
}
