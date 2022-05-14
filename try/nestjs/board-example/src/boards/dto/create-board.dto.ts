// DTO 작성시 클래스를 이용하면, 인터페이스와 다르게 런타임에서 작동하기 때문에
// 파이프 같은 기능을 이용할 떄 더 유용함

import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty() // 이와 같이 사용하고 Pipe를 지정해주면 인수의 유효성 체크가 가능 (파이프 없으면 적용 X)
  title: string;

  @IsNotEmpty()
  description: string;
}
