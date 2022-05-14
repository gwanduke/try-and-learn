import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'board-app',
  entities: [__dirname + '/../**/*{js,ts}'], // 엔티티를 이용해 DB 생성할 예정
  synchronize: true, // 앱이 다시 시작할 때, 엔티티에 수정이 생기면 DB도 Drop하고 반영
};
