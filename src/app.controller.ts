import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/* 
  author : String;
  title : String;
  content : string;
  likeCount : number;
  commentCount : number

*/

interface Post{
  author : String;
  title : String;
  content : string;
  likeCount : number;
  commentCount : number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPost(): Post {
    return {
      author : "newjeans_officeal",
      title : "title",
      content: "content",
      likeCount : 1000000,
      commentCount : 9999999
    };
  }
}
