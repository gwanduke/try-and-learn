import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

let id = 0;

// Injectable 데코레이터가 있어, 다른 컴포넌트에서 이 서비스를 사용할 수 있게됨
@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const board: Board = {
      id: String(id++),
      title: createBoardDto.title,
      description: createBoardDto.description,
      status: BoardStatus.PRIVATE,
    };

    this.boards.push(board);

    return board;
  }
}
