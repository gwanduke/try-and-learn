import { Module } from '@nestjs/common';

// `nest g controller boards --no-spec`로 생성시 등록까지 자동으로 해주는 클라스...
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
