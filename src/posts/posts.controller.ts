import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

// 새로운 터미널, nest g resource / posts 로 생성했더니 와 익 ㅔ뭐야
// 자동으로 만들어지네

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET/posts
  // 모든 post를 다 가져온다.

  @Get()
  getPosts() {
    return this.postsService.gletAllPosts();
  }
  // 2) GET/posts/:id
  // id에 해당되는 post를 가져온다
  // 예를들어 id=1인 경우 ids가 1인 포스트를 가져온다

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  // 3) POST /posts
  // 포스트를 생성한다
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(
      author, title, content,
    )
  }

  // 4) Patch /posts/:id
  // id에 해당되는 POST를 변경한다.

  @Patch(':id')
  patchPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.patchPost(
      +id, author, title, content,
    );
  }

  // 5) DELETE /posts/:id
  // id에 있는 POST를 삭제한다.
  @Delete(':id')
  deletePost(@Param('id') id: string,) {

   return this.postsService.deletePost(+id);
  }
}
