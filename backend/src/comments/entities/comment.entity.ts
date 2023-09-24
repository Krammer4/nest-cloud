import { ImageEntity } from 'src/images/entities/image.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  publishedAt: Date;

  @ManyToOne(() => ImageEntity, (image) => image.comments, {
    onDelete: 'CASCADE',
  })
  image: ImageEntity;
}
