import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipoe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: string, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value}는 유효한 상태가 아닙니다.`);
    }

    console.log('value', value); // 처리가된 인자의값
    console.log('value', metadata); // 인자에 대한 메타데이터 (메서드는 무엇인지 등...)

    return value;
  }

  private isStatusValid(status: string) {
    const index = this.StatusOptions.indexOf(status as BoardStatus);
    return index !== -1;
  }
}
