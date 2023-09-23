import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {}

  async createComment(text: string, imageId: number) {
    return this.commentRepo.save({
      text: text,
      publishedAt: new Date(),
      image: { id: imageId },
    });
  }

  findAll() {
    return `This action returns all comments`;
  }
}
