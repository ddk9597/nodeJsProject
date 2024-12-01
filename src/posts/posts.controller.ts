import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

// 새로운 터미널, nest g resource / posts 로 생성했더니 와 익 ㅔ뭐야
// 자동으로 만들어지네

interface Post{
  author : String;
  title : String;
  content : string;
  likeCount : number;
  commentCount : number;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPost(): Post {
    return {
      author : "newjeans_officeal",
      title : "뉴진스 민지",
      content: "공룡 민지",
      likeCount : 1000000,
      commentCount : 9999999
    };
  }

}
