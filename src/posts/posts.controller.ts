import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

// 새로운 터미널, nest g resource / posts 로 생성했더니 와 익 ㅔ뭐야
// 자동으로 만들어지네

interface PostModel {
  id : number;
  author : string;
  title : string;
  content : string;
  likeCount : number;
  commentCount : number;
}

let posts : PostModel[] = [

  {
    id : 1,
    author : "newjeans_officeal",
    title : "개쩌는 대단한 엄청나게 대단한 락밴드",
    content: "린킨파크",
    likeCount : 1000000,
    commentCount : 9999999
  } ,

  {
    id : 2,
    author : "newjeans_officeal",
    title : "개쩌는 대단한 엄청나게 대단한 락밴드2",
    content: "펄잼",
    likeCount : 1000000,
    commentCount : 9999999
  } ,

  {
    id : 3,
    author : "blackPink_officeal",
    title : "로제",
    content: "아파트아파틍ㅍㅌㅍㅇㅌ",
    likeCount : 1000000,
    commentCount : 9999999
  }
]

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET/posts
  // 모든 post를 다 가져온다.

  @Get()
  getPosts() {
    return posts;
  }
  // 2) GET/posts/:id
  // id에 해당되는 post를 가져온다
  // 예를들어 id=1인 경우 ids가 1인 포스트를 가져온다

 // 3) POST /post
 // 포스트를 생성한다
 
 // 4) PUT /posts/:id
  // id에 해당되는 POST를 변경한다.

  // 5) DELETE /posts/:id
  // id에 있는 POST를 삭제한다.

  




}
