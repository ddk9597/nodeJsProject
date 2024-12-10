import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './posts/entities/posts.entity';

// imports : 다른 모듈을 불러올 때 사용한다.
@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      // DB타입 연결
      // 생성한 db와 정확하게 일치하게 설정해줘야한다.
      // 민감한 user 정보는 환경변수를 설정하여 연결하는게 좋다.
      // 지금은 이렇게라도 연결해보자.
      type : 'postgres',
      host : '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        PostsModel,
      ],
      synchronize: true,
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
