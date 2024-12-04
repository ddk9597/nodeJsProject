import { Injectable } from '@nestjs/common';

// service 파일은 왜 필요한가?
// controller는 최전방에서 가장 앞에서 요청이 어디로 가야할 진 함수를 라우팅해주는 역할.
// 컨트롤러는 그 역할만 해주면 되고 그 역할만 해야 한다.

// 로직을 컨트롤러 단위에서 하지말아라. 이런 로직들은 service파일에 전부 정의를 해서 
// controller는 이 서비스 파일을 불러오는 방식으로만 사용해라.
// 컨트롤러는 일단 요청을 받고서 정확한 함수로 연결하는 역할.
// 로직은 서비스 파일에서 작성하고.
// Spring Boot MVC 패턴이랑 같네


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
