import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { Repository } from 'typeorm';

export interface PostModel {
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
    title: '역사적이며 엄청나게 대단한 락밴드',
    content: '린킨파크',
    likeCount: 1000000,
    commentCount: 9999999,
  },

  {
    id: 2,
    author: 'rock_korea_official',
    title: '역사적이며 엄청나게 대단한 락밴드2',
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

// 프로바이더(DI하는 클래스)로 사용하고 싶은 클래스는 @Injectable()로 선언,
// 이후 module 파일의 porivders 배열에 넣어준다.
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async gletAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(author: string, title: string, content: string) {
    // create : 저장할 객체를 생성한다
    // save : 객체를 저장한다(create 메서드에서 생성한 객체로)
    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });
    const newPost = await this.postsRepository.save(post);

    // 응답은 새로 만들어진 post를 반환한다.
    return newPost;
  }

  async patchPost(
    postId: number,
    author: string,
    title: string,
    content: string,
  ) {
    // save의 기능
    // 1) 만약데이터가 존재하지 않는다면(id기준으로)새로 생성한다.
    // 2) 만약 데이터가 존재한다면(같은 id의 값이 존재한다면)존재하던 값을 업데이트 한다.

    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException();
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

    const newPost = await this.postsRepository.save(post);

    posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));

    return post;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    // id가 존재하지 않을 경우
    if (!post) {
      throw new NotFoundException();
    }

    // post중에서 post.id 가 id와 다른 값을 필터링함.
    // deledt할 id와 같은 값을 가진 post를 제외한 post들만 이용해서 새로운 posts를 만듬
    await this.postsRepository.delete(postId);
    return postId;
  }
}
