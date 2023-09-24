export interface Image {
  id: number;
  filename: string;
  publishedAt: Date;
  title: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  publishedAt: Date;
  text: string;
}
