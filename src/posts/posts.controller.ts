import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

// 새로운 터미널, nest g resource / posts 로 생성했더니 와 익 ㅔ뭐야
// 자동으로 만들어지네

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'rock_korea_official',
    title: '개쩌는 대단한 엄청나게 대단한 락밴드',
    content: '린킨파크',
    likeCount: 1000000,
    commentCount: 9999999,
  },

  {
    id: 2,
    author: 'rock_korea_official',
    title: '개쩌는 대단한 엄청나게 대단한 락밴드2',
    content: '펄잼',
    likeCount: 1000000,
    commentCount: 9999999,
  },

  {
    id: 3,
    author: 'oasisOfficial',
    title: '형온다',
    content: '싸우지말고 잘들 놀고 있어라.',
    likeCount: 1000000,
    commentCount: 9999999,
  },
];

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

  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);

    // 에러를 반환하는 방법
    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  // 3) POST /posts
  // 포스트를 생성한다
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author: author, // k:v가 같은 string인 경우 author로만 해도 됨
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };
    posts = [...posts, post];

    // 응답은 새로 만들어진 post를 반환한다.
    return post;
  }

  // 4) Patch /posts/:id
  // id에 해당되는 POST를 변경한다.

  @Patch(':id')
  patchPost(
    @Param('id') id: string,
    // ? 를 붙임으로서 파라미터가 필수값이 아니어도 됨을 명시.
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      post.author = author;
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map(prevPost => prevPost.id === +id ? post : prevPost);
  }

  // 5) DELETE /posts/:id
  // id에 있는 POST를 삭제한다.
}
