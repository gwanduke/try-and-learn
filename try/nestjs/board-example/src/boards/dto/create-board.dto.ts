// DTO 작성시 클래스를 이용하면, 인터페이스와 다르게 런타임에서 작동하기 때문에
// 파이프 같은 기능을 이용할 떄 더 유용함

export class CreateBoardDto {
  title: string;
  description: string;
}
