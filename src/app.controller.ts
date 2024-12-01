import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/* 
  author : String;
  title : String;
  content : string;
  likeCount : number;
  commentCount : number;

*/

// 자동으로 생성되고 기본으로 주어지는 app.controller

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
}
