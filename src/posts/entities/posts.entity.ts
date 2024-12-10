import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 이 클래스를 테이블로..?
@Entity()
export class PostsModel{

  // pk, auto increment
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  content: string;
  
  @Column()
  likeCount: number;
  
  @Column()
  commentCount: number;

}