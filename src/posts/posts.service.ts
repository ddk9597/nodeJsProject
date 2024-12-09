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
    private readonly postsRepository: Repository<PostsModel>
  ){}

  async gletAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { 
        id, 
      },
      
    });

    if(!post){
      throw new NotFoundException();
    }

    return post;
  }

  createPost(
    author:string, title: string, content: string

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


  patchPost(
    postId:number, author:string, title:string, content:string,
  ){
    const post = posts.find((post) => post.id === postId);

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

    posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));

    return post;
  }


  deletePost(postId:number){
    const post = posts.find((post) => post.id === postId);

    // id가 존재하지 않을 경우
    if (!post) {
      throw new NotFoundException();
    }

    // post중에서 post.id 가 id와 다른 값을 필터링함.
    // deledt할 id와 같은 값을 가진 post를 제외한 post들만 이용해서 새로운 posts를 만듬
    posts = posts.filter((post) => post.id !== postId);

    return postId;
  }
 

}
