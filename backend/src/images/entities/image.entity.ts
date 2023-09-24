import { CommentEntity } from 'src/comments/entities/comment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  filename: string;

  @Column()
  publishedAt: Date;

  @OneToMany(() => CommentEntity, (comment) => comment.image, { cascade: true })
  comments: CommentEntity[];
}
