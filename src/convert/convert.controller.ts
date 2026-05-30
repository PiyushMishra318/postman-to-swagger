import { Body, Controller, Post } from '@nestjs/common';
import { ConvertService } from './convert.service';

@Controller('convert')
export class ConvertController {
  constructor(private readonly convertService: ConvertService) {}

  @Post()
  convert(@Body() collection: Record<string, unknown>) {
    return this.convertService.convertPostmanToSwagger(collection);
  }
}
