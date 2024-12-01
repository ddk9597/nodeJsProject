import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

// nest g resource / posts
// 터미널에 명령어를 입력하면 posts로 시작되는 엔드포인트들을 관리하는
// 와우 개편함; 이게 바로 nest cli
// 관련 있는 모듈까리 묶어가지고 코드를 관리하게 된다..

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
