import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value);
    console.log(`[pipe:parse-int] ${value} -> ${val}`);
    if (isNaN(val)) {
      throw new BadRequestException('Validation Failed');
    }
    return val;
  }
}
