// 모델정의는 interface 또는 class를 사용할 수 있다.
// interface : 변수의 타입만 체크
// class : 변수의 타입 체크 + 인스턴스 생성 가능

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}
