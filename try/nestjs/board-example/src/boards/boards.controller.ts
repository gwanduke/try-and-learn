import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipoe } from './pipes/board-status-validation.pipe';

// IDEA:
// controller는 읽을 수 있게 구성되어야한다.
// 복잡한 로직은 Service로 이동 (rails에서 model에 작성하는 방식과 유사)

@Controller('boards')
export class BoardsController {
  // nodejs에서 DI는 클래스의 constructor를 이용함
  // private를 이용하면 암묵적으로 멤버변수가 선언되고 할당됨
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id1') id: string) {
    const found = this.boardsService.getBoardById(id);

    if (!found) {
      throw new NotFoundException(`Cant't find by id ${id}`);
    }

    return found;
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    const found = this.boardsService.getBoardById(id);

    if (!found) {
      throw new NotFoundException(`Cant't find by id ${id}`);
    }

    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipoe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
