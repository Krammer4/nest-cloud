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
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
  @Get('/download/:filename')
  downloadImage(@Param('filename') filename: string, @Res() res: Response) {
    return this.imagesService.download(filename, res);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        titles: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  })
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('titles') titles: string[],
  ) {
    return this.imagesService.create(files, titles);
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
